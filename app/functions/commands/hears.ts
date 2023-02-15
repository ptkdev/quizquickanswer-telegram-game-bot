/**
 * Telegraf Hears
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 * 				  Alessandro Di Maria [@ImAl3x03] (https://github.com/ImAl3x03)
 *
 * @license: MIT License
 *
 */
import { InlineKeyboard } from "grammy";
import bot from "@app/core/token";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";
import { similarity } from "@app/functions/utils/utils";
import { vote } from "@app/functions/utils/vote";

import type { MasterInterface } from "@app/types/master.interfaces";
import type { QuestionsInterface } from "@app/types/question.interfaces";

/**
 * hears: any taxt from bot chat
 * =====================
 * Listen any text user write
 *
 */
const hears = async (): Promise<void> => {
	bot.on("message:text", async (ctx) => {
		logger.info("hears: text", "hears.ts:on(text)");
		const lang = await telegram.api.message.getLanguage(ctx);

		if (telegram.api.message.getChatID(ctx) > 0) {
			// is chat with bot
			const master: MasterInterface = await db.master.get({
				username: telegram.api.message.getUsername(ctx),
			});
			logger.debug(`master: ${JSON.stringify(master)}`);
			logger.debug(`${master?.username} === ${telegram.api.message.getUsername(ctx)}`);
			if (master?.username === telegram.api.message.getUsername(ctx)) {
				const [text, ...hint] = telegram.api.message.getText(ctx).split("##");

				const json = telegram.api.message.getFullUser(ctx);
				json.question = text.trim()?.toLowerCase() || "";
				json.description = hint.map((ele: string) => {
					return ele.trim() || "";
				});
				json.group_id = master?.group_id || 0;
				json.message_thread_id = master?.message_thread_id;
				json.count = 0;

				if (json.question === undefined || json.question === "") {
					await telegram.api.message.send(
						ctx,
						telegram.api.message.getChatID(ctx),
						translate(lang.language, "hears_missing_question"),
					);
				} else if (json.description === undefined || json.description.every((ele: string) => ele === "")) {
					await telegram.api.message.send(
						ctx,
						telegram.api.message.getChatID(ctx),
						translate(lang.language, "hears_missing_tip"),
					);
				} else {
					if (master?.win_message_id > 0) {
						await telegram.api.message.removeMessageMarkup(master?.group_id, master?.win_message_id);
					}

					if (master?.pin_id > 0) {
						await telegram.api.message.unpin(ctx, master?.group_id, master?.pin_id);
					}

					await db.master.update({ username: telegram.api.message.getUsername(ctx) }, json);

					const master_in_multi_groups = await db.master.getMultiple({
						username: telegram.api.message.getUsername(ctx),
					});

					master_in_multi_groups.forEach(async (master_in_group) => {
						const quiz = await telegram.api.message.send(
							ctx,
							master_in_group?.group_id,
							`⏱ ${json.description[0] || ""}`,
							{
								message_thread_id: master_in_group.message_thread_id,
							},
						);

						await telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate(lang.language, "hears_question_success"),
						);

						if (quiz) {
							await telegram.api.message.pin(ctx, master_in_group?.group_id, quiz?.message_id, {
								disable_notification: true,
								message_thread_id: master_in_group.message_thread_id,
							});

							master_in_group.pin_id = quiz?.message_id || 0;
							await db.master.update(
								{ username: telegram.api.message.getUsername(ctx) },
								master_in_group,
							);
						} else {
							await db.master.remove({
								group_id: master_in_group?.group_id,
							});
						}
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

			const hint = master.count / 15;

			if (master.count % 15 === 0 && hint >= 1 && hint < master.description.length) {
				await telegram.api.message.send(ctx, master?.group_id || 0, master.description[hint]);
			}

			if (telegram.api.message.getText(ctx).trim().toLowerCase() == master?.question?.trim()?.toLowerCase()) {
				if (telegram.api.message.getUsername(ctx)) {
					const user_score: MasterInterface = await db.scores.get({
						group_id: telegram.api.message.getChatID(ctx),
						id: telegram.api.message.getUserID(ctx),
					});

					logger.debug(`user_score: ${JSON.stringify(user_score)}`);

					const user_questions: QuestionsInterface = await db.questions.get({
						group_id: telegram.api.message.getChatID(ctx),
						user_id: telegram.api.message.getUserID(ctx),
					});

					const buttons = new InlineKeyboard();
					buttons.text(`👍 0`, `upvote ${master.id}`);
					buttons.text(`👎 0`, `downvote ${master.id}`);

					const win_message = await telegram.api.message.send(
						ctx,
						master?.group_id,
						translate(lang.language, "hears_win", {
							first_name: telegram.api.message.getUserFirstName(ctx),
							username: telegram.api.message.getUsername(ctx),
							bot_username: telegram.api.bot.getUsername(ctx),
							master: master.username,
							answer: master.question,
							tip: master.description[0],
							score: user_questions
								? (user_score?.[`score_${new Date().getFullYear()}`] || 0) +
								  10 +
								  user_questions[`upvotes_${new Date().getFullYear()}`] -
								  user_questions[`downvotes_${new Date().getFullYear()}`]
								: (user_score?.[`score_${new Date().getFullYear()}`] || 0) + 10,
						}),
						{ reply_markup: buttons, parse_mode: "HTML" },
					);

					if (master?.win_message_id > 0) {
						await telegram.api.message.removeMessageMarkup(master?.group_id, master?.win_message_id);
					}

					if (master?.pin_id > 0) {
						await telegram.api.message.unpin(ctx, master?.group_id, master?.pin_id);
					}

					const json: MasterInterface = telegram.api.message.getFullUser(ctx);
					json.question = "";
					json.description = [];
					json.group_id = telegram.api.message.getChatID(ctx);
					json.win_message_id = win_message?.message_id || 0;
					json.message_thread_id = telegram.api.message.getThreadID(ctx);

					await db.master.update({ group_id: telegram.api.message.getChatID(ctx) }, json);

					if (user_score.group_id < 0) {
						user_score[`score_${new Date().getFullYear()}`] += 10;
						user_score[`score_${new Date().getMonth() + 1}_${new Date().getFullYear()}`] += 10;
						await db.scores.update(
							{
								group_id: telegram.api.message.getChatID(ctx),
								id: telegram.api.message.getUserID(ctx),
							},
							user_score,
						);
					} else {
						const json_score: MasterInterface = telegram.api.message.getFullUser(ctx);
						json_score[`score_${new Date().getFullYear()}`] = 10;
						json_score[`score_${new Date().getMonth() + 1}_${new Date().getFullYear()}`] += 10;
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
			} else {
				master.count++;
				await db.master.update({ group_id: telegram.api.message.getChatID(ctx) }, master);
			}

			const similarityPercentage: number = similarity(
				telegram.api.message.getText(ctx).trim().toLowerCase(),
				master?.question?.trim()?.toLowerCase() || "",
			);

			if (
				similarityPercentage >= 0.7 &&
				telegram.api.message.getText(ctx).trim().toLowerCase().split("").length > 4
			) {
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

	bot.callbackQuery(/upvote (.*)/, async (ctx) => {
		const match: any = ctx.match;

		await vote(ctx, "upvote", match.input.replace("upvote ", ""));
	});

	bot.callbackQuery(/downvote (.*)/, async (ctx) => {
		const match: any = ctx.match;

		await vote(ctx, "downvote", match.input.replace("downvote ", ""));
	});
};

export { hears };
export default hears;
