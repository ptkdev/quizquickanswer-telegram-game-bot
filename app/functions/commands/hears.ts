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
import { CronJob } from "cron";
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
	const cron_run: boolean[] = [];
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
				const text = telegram.api.message.getText(ctx).split("##");

				const json = telegram.api.message.getFullUser(ctx);
				json.question = text[0]?.trim()?.toLowerCase() || "";
				json.description = text[1]?.trim() || "";
				json.group_id = master?.group_id || 0;
				json.message_thread_id = master?.message_thread_id;

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
							`⏱ ${json.description || ""}`,
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

			if (cron_run[`${telegram.api.message.getChatID(ctx)}`] === undefined && master.timezone !== "") {
				cron_run[`${telegram.api.message.getChatID(ctx)}`] = true;
				new CronJob(
					"59 23 * * 0-4",
					async function () {
						telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate(lang.language, "master_off"),
						);

						const json = {
							id: "0",
							is_bot: false,
							first_name: telegram.api.bot.getUsername(ctx),
							username: telegram.api.bot.getUsername(ctx),
							language_code: "",
							question: "",
							description: "Night Mode, Bot Spento",
							score_2021: 0,
							score_2022: 0,
							score_2023: 0,
							score_1_2023: 0,
							score_2_2023: 0,
							score_3_2023: 0,
							score_4_2023: 0,
							score_5_2023: 0,
							score_6_2023: 0,
							score_7_2023: 0,
							score_8_2023: 0,
							score_9_2023: 0,
							score_10_2023: 0,
							score_11_2023: 0,
							score_12_2023: 0,
							score_2024: 0,
							score_1_2024: 0,
							score_2_2024: 0,
							score_3_2024: 0,
							score_4_2024: 0,
							score_5_2024: 0,
							score_6_2024: 0,
							score_7_2024: 0,
							score_8_2024: 0,
							score_9_2024: 0,
							score_10_2024: 0,
							score_11_2024: 0,
							score_12_2024: 0,
							score_2025: 0,
							score_1_2025: 0,
							score_2_2025: 0,
							score_3_2025: 0,
							score_4_2025: 0,
							score_5_2025: 0,
							score_6_2025: 0,
							score_7_2025: 0,
							score_8_2025: 0,
							score_9_2025: 0,
							score_10_2025: 0,
							score_11_2025: 0,
							score_12_2025: 0,
							pin_id: 0,
							win_message_id: 0,
							timezone: "Europe/Rome",
							off: true,
							group_id: telegram.api.message.getChatID(ctx),
							message_thread_id: telegram.api.message.getThreadID(ctx),
						};

						await db.master.update({ group_id: telegram.api.message.getChatID(ctx) }, json);
					},
					null,
					true,
					"Europe/Rome",
				);

				new CronJob(
					"0 1 * * 6,0",
					async function () {
						telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate(lang.language, "master_off"),
						);

						const json = {
							id: "0",
							is_bot: false,
							first_name: telegram.api.bot.getUsername(ctx),
							username: telegram.api.bot.getUsername(ctx),
							language_code: "",
							question: "",
							description: "Night Mode, Bot Spento",
							score_2021: 0,
							score_2022: 0,
							score_2023: 0,
							score_1_2023: 0,
							score_2_2023: 0,
							score_3_2023: 0,
							score_4_2023: 0,
							score_5_2023: 0,
							score_6_2023: 0,
							score_7_2023: 0,
							score_8_2023: 0,
							score_9_2023: 0,
							score_10_2023: 0,
							score_11_2023: 0,
							score_12_2023: 0,
							score_2024: 0,
							score_1_2024: 0,
							score_2_2024: 0,
							score_3_2024: 0,
							score_4_2024: 0,
							score_5_2024: 0,
							score_6_2024: 0,
							score_7_2024: 0,
							score_8_2024: 0,
							score_9_2024: 0,
							score_10_2024: 0,
							score_11_2024: 0,
							score_12_2024: 0,
							score_2025: 0,
							score_1_2025: 0,
							score_2_2025: 0,
							score_3_2025: 0,
							score_4_2025: 0,
							score_5_2025: 0,
							score_6_2025: 0,
							score_7_2025: 0,
							score_8_2025: 0,
							score_9_2025: 0,
							score_10_2025: 0,
							score_11_2025: 0,
							score_12_2025: 0,
							pin_id: 0,
							win_message_id: 0,
							timezone: "Europe/Rome",
							off: true,
							group_id: telegram.api.message.getChatID(ctx),
							message_thread_id: telegram.api.message.getThreadID(ctx),
						};

						await db.master.update({ group_id: telegram.api.message.getChatID(ctx) }, json);
					},
					null,
					true,
					"Europe/Rome",
				);

				new CronJob(
					"0 9 * * *",
					async function () {
						telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate(lang.language, "master_on"),
						);

						const programming_languages = [
							"Java",
							"Python",
							"JavaScript",
							"Ruby",
							"C#",
							"Swift",
							"Kotlin",
							"Go",
							"TypeScript",
							"PHP",
							"Rust",
							"Scala",
							"C++",
							"Dart",
							"Lua",
							"R",
							"MATLAB",
							"Julia",
							"Perl",
							"Objective-C",
							"Visual Basic",
							"Groovy",
							"Shell",
							"Haskell",
							"F#",
							"Erlang",
							"Lisp",
							"Clojure",
							"Prolog",
							"SQL",
							"Kotlin",
							"COBOL",
							"Fortran",
							"Pascal",
							"Ada",
							"Assembly",
							"BASIC",
							"Smalltalk",
							"Tcl",
							"Scheme",
							"Swift",
							"Objective-C",
							"C",
							"PowerShell",
							"Visual Basic .NET",
							"Delphi",
							"ActionScript",
							"Scratch",
						];

						const json = {
							id: "0",
							is_bot: false,
							first_name: telegram.api.bot.getUsername(ctx),
							username: telegram.api.bot.getUsername(ctx),
							language_code: "",
							question: programming_languages[Math.floor(Math.random() * programming_languages.length)],
							description: "linguaggio di programmazione",
							score_2021: 0,
							score_2022: 0,
							score_2023: 0,
							score_1_2023: 0,
							score_2_2023: 0,
							score_3_2023: 0,
							score_4_2023: 0,
							score_5_2023: 0,
							score_6_2023: 0,
							score_7_2023: 0,
							score_8_2023: 0,
							score_9_2023: 0,
							score_10_2023: 0,
							score_11_2023: 0,
							score_12_2023: 0,
							score_2024: 0,
							score_1_2024: 0,
							score_2_2024: 0,
							score_3_2024: 0,
							score_4_2024: 0,
							score_5_2024: 0,
							score_6_2024: 0,
							score_7_2024: 0,
							score_8_2024: 0,
							score_9_2024: 0,
							score_10_2024: 0,
							score_11_2024: 0,
							score_12_2024: 0,
							score_2025: 0,
							score_1_2025: 0,
							score_2_2025: 0,
							score_3_2025: 0,
							score_4_2025: 0,
							score_5_2025: 0,
							score_6_2025: 0,
							score_7_2025: 0,
							score_8_2025: 0,
							score_9_2025: 0,
							score_10_2025: 0,
							score_11_2025: 0,
							score_12_2025: 0,
							pin_id: 0,
							win_message_id: 0,
							timezone: "Europe/Rome",
							off: false,
							group_id: telegram.api.message.getChatID(ctx),
							message_thread_id: telegram.api.message.getThreadID(ctx),
						};

						await db.master.update({ group_id: telegram.api.message.getChatID(ctx) }, json);
					},
					null,
					true,
					"Europe/Rome",
				);
			}

			if (master.off) {
				return;
			}

			const username = telegram.api.message.getUsername(ctx);

			if (master.username === username) {
				return;
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
							tip: master.description,
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
					json.description = "";
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
