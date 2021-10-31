/**
 * Telegraf Hears
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { Markup } from "telegraf";
import bot from "@app/core/telegraf";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";
import { TelegramUserInterface, QuestionsInterface, MasterInterface } from "@app/types/databases.type";

import logger from "@app/functions/utils/logger";
import { similarity } from "../utils/utils";

/**
 * hears: any taxt from bot chat
 * =====================
 * Listen any text user write
 *
 */
const hears = async (): Promise<void> => {
	bot.on("text", async (ctx) => {
		logger.info("hears: text", "hears.ts:on(text)");
		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		if (telegram.api.message.getChatID(ctx) > 0) {
			// is chat with bot
			const master: MasterInterface = await db.master.get({
				username: telegram.api.message.getUsername(ctx),
			});
			logger.debug(`master: ${JSON.stringify(master)}`);
			logger.debug(`${master?.username} === ${telegram.api.message.getUsername(ctx)}`);
			if (master?.username === telegram.api.message.getUsername(ctx)) {
				const text = telegram.api.message.getText(ctx).split("-");

				const json = telegram.api.message.getFullUser(ctx);
				json.question = text[0]?.trim()?.toLowerCase() || "";
				json.description = text[1]?.trim() || "";
				json.group_id = master?.group_id || 0;

				if (json.question === undefined || json.question === "") {
					await telegram.api.message.send(
						ctx,
						telegram.api.message.getChatID(ctx),
						translate(lang.language, "hears_missing_question"),
					);
				} else if (json.description === undefined || json.description === "") {
					await telegram.api.message.send(
						ctx,
						telegram.api.message.getChatID(ctx),
						translate(lang.language, "hears_missing_tip"),
					);
				} else {
					await db.master.update({}, json);

					const quiz = await telegram.api.message.send(
						ctx,
						master.group_id,
						`⏱ ${json.description || ""}`,
						Markup.inlineKeyboard([
							[Markup.button.callback(`👍 0`, "upvote"), Markup.button.callback(`👎 0`, "downvote")],
						]),
					);
					await telegram.api.message.pin(ctx, master?.group_id, quiz?.message_id, {
						disable_notification: true,
					});
				}
			} else {
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "haers_not_you_master"),
				);
			}
		}

		if (telegram.api.message.getChatID(ctx) < 0) {
			// is group
			const master: MasterInterface = await db.master.get({
				group_id: telegram.api.message.getChatID(ctx),
			});

			if (telegram.api.message.getText(ctx).trim().toLowerCase() == master?.question?.trim()?.toLowerCase()) {
				if (telegram.api.message.getUsername(ctx)) {
					const user_score: TelegramUserInterface = await db.scores.get({
						group_id: telegram.api.message.getChatID(ctx),
						id: telegram.api.message.getUserID(ctx),
					});

					logger.debug(`user_score: ${JSON.stringify(user_score)}`);

					const user_questions: QuestionsInterface = await db.questions.get({
						group_id: telegram.api.message.getChatID(ctx),
						user_id: telegram.api.message.getUserID(ctx),
					});

					await telegram.api.message.send(
						ctx,
						master?.group_id,
						translate(lang.language, "hears_win", {
							first_name: telegram.api.message.getUserFirstName(ctx),
							username: telegram.api.message.getUsername(ctx),
							bot_username: telegram.api.bot.getUsername(ctx),
							answer: telegram.api.message.getText(ctx),
							score: user_questions
								? (user_score?.score || 0) + 10 + user_questions.upvotes - user_questions.downvotes
								: (user_score?.score || 0) + 10,
						}),
					);

					const json: MasterInterface = telegram.api.message.getFullUser(ctx);
					json.question = "";
					json.description = "";
					json.group_id = telegram.api.message.getChatID(ctx);
					await db.master.update({ group_id: telegram.api.message.getChatID(ctx) }, json);

					if (user_score.group_id < 0) {
						user_score.score += 10;
						await db.scores.update(
							{
								group_id: telegram.api.message.getChatID(ctx),
								id: telegram.api.message.getUserID(ctx),
							},
							user_score,
						);
					} else {
						const json_score: TelegramUserInterface = telegram.api.message.getFullUser(ctx);
						json_score.score = 10;
						await db.scores.add(json_score);
					}
				} else {
					await telegram.api.message.send(
						ctx,
						master?.group_id || 0,
						translate(lang.language, "hears_win_but_not_master", {
							first_name: telegram.api.message.getUserFirstName(ctx),
							master_first_name: master.first_name,
							master_username: master.username,
						}),
					);
				}
				return;
			}

			const similarityPercentage: number = similarity(
				telegram.api.message.getText(ctx).trim().toLowerCase(),
				master?.question?.trim()?.toLowerCase() || "",
			);

			if (similarityPercentage >= 0.8) {
				await telegram.api.message.send(
					ctx,
					master.group_id,
					translate(lang.language, "hot_answer", {
						first_name: telegram.api.message.getUserFirstName(ctx),
						username: telegram.api.message.getUsername(ctx),
					}),
				);
			}
		}
	});

	bot.action("upvote", async (ctx) => {
		await vote(ctx, "upvote");
	});
	bot.action("downvote", async (ctx) => {
		await vote(ctx, "downvote");
	});
};

const vote = async (ctx, type): Promise<void> => {
	const lang = await db.settings.get({
		group_id: telegram.api.message.getChatID(ctx),
	});

	if (telegram.api.message.getChatID(ctx) < 0) {
		// is group chat

		const { id: user_id }: MasterInterface = await db.master.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		const voter_user_id = telegram.api.message.getUserIDFromAction(ctx);
		const message_id = telegram.api.message.getMessageIDFromAction(ctx);

		// If it's a self vote (Comment this part for debugging)
		if (user_id === voter_user_id) {
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "goodquestion_not_autovote"),
			);
			return;
		}

		if (user_id && user_id !== "") {
			const group_id = telegram.api.message.getChatID(ctx);
			const is_upvote = type === "upvote";

			const user_questions: QuestionsInterface = await db.questions.get({
				group_id: telegram.api.message.getChatID(ctx),
				user_id,
			});

			if (user_questions.group_id < 0) {
				// if voted user is in the question DB

				const same_message: boolean = user_questions.voters.message_id === message_id;
				// If the voter user has already voted this question/message

				if (
					same_message &&
					(is_upvote
						? user_questions?.voters?.users?.upvotes?.some((u) => u === voter_user_id)
						: user_questions?.voters?.users?.downvotes?.some((u) => u === voter_user_id))
				) {
					return;
				}

				if (is_upvote) {
					user_questions.upvotes += 1;
				} else {
					user_questions.downvotes += 1;
				}
				user_questions.voters = {
					message_id,
					users: same_message
						? is_upvote
							? {
									...user_questions.voters.users,
									upvotes: [...user_questions.voters.users.upvotes, voter_user_id],
							  }
							: {
									...user_questions.voters.users,
									downvotes: [...user_questions.voters.users.downvotes, voter_user_id],
							  }
						: {
								upvotes: is_upvote ? [voter_user_id] : [],
								downvotes: is_upvote ? [] : [voter_user_id],
						  },
				};
				await db.questions.update({ group_id, user_id }, user_questions);

				ctx.editMessageReplyMarkup({
					inline_keyboard: [
						[
							Markup.button.callback(
								`👍 ${user_questions?.voters?.users?.upvotes?.length || 0} `,
								"upvote",
							),
							Markup.button.callback(
								`👎 ${user_questions?.voters?.users?.downvotes?.length || 0} `,
								"downvote",
							),
						],
					],
				});
			} else {
				const json = {
					user_id,
					upvotes: is_upvote ? 1 : 0,
					downvotes: is_upvote ? 0 : 1,
					group_id: group_id,
					voters: {
						message_id,
						users: {
							upvotes: is_upvote ? [voter_user_id] : [],
							downvotes: is_upvote ? [] : [voter_user_id],
						},
					},
				};
				await db.questions.add(json);

				ctx.editMessageReplyMarkup({
					inline_keyboard: [
						[
							Markup.button.callback(`👍 ${is_upvote ? 1 : 0} `, "upvote"),
							Markup.button.callback(`👎 ${is_upvote ? 0 : 1}`, "downvote"),
						],
					],
				});
			}
		}
	} else {
		await telegram.api.message.send(
			ctx,
			telegram.api.message.getChatID(ctx),
			translate(lang.language, "command_only_group"),
		);
	}
};

export { hears };
export default hears;
