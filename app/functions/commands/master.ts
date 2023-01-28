/**
 * Master
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/token";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";

import type { QuestionsInterface } from "@app/types/question.interfaces";
import type { MasterInterface } from "@app/types/master.interfaces";

/**
 * command: /master
 * =====================
 * Set master game
 *
 */
const master = async (): Promise<void> => {
	bot.command("master", async (ctx) => {
		logger.info("command: /master", "master.ts:master()");
		const lang = await telegram.api.message.getLanguage(ctx);

		const username = telegram.api.message.getText(ctx).replace("/master ", "").replace("@", "").trim();

		if (telegram.api.message.getChatID(ctx) < 0) {
			// is group chat
			if (
				telegram.api.message.getText(ctx).trim() === "/master" ||
				telegram.api.message.getText(ctx).trim() === `/master@${telegram.api.bot.getUsername(ctx)}`
			) {
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "master_command_empty"),
				);
			} else if (username === "off") {
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "master_off"),
				);
			} else {
				const json = {
					id: "0",
					is_bot: false,
					first_name: "",
					username: username,
					language_code: "",
					question: "",
					description: "",
					score_2021: 0,
					score_2022: 0,
					score_2023: 0,
					score_2024: 0,
					score_2025: 0,
					pin_id: 0,
					win_message_id: 0,
					group_id: telegram.api.message.getChatID(ctx),
					message_thread_id: telegram.api.message.getThreadID(ctx),
				};

				const master: MasterInterface = await db.master.get({
					group_id: telegram.api.message.getChatID(ctx),
				});

				if (master?.win_message_id > 0) {
					await telegram.api.message.removeMessageMarkup(master?.group_id, master?.win_message_id);
				}

				if (master?.pin_id > 0) {
					await telegram.api.message.unpin(ctx, master?.group_id, master?.pin_id);
				}

				if (master.username === telegram.api.message.getUsername(ctx)) {
					const user_questions: QuestionsInterface = await db.questions.get({
						group_id: telegram.api.message.getChatID(ctx),
						user_id: telegram.api.message.getUserID(ctx),
					});

					user_questions[`downvotes_${new Date().getFullYear()}`] += 15;

					await db.questions.update(
						{ group_id: telegram.api.message.getChatID(ctx), user_id: telegram.api.message.getUserID(ctx) },
						user_questions,
					);

					await telegram.api.message.send(
						ctx,
						telegram.api.message.getChatID(ctx),
						translate(lang.language, "master_command_penality", {
							username: master.username,
							bot_username: telegram.api.bot.getUsername(ctx),
						}),
					);
				}

				logger.debug(`master:${JSON.stringify(master)}`);
				if (master.group_id < 0) {
					await db.master.update({ group_id: telegram.api.message.getChatID(ctx) }, json);
				} else {
					await db.master.add(json);
				}
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "master_command_success", {
						username: username,
						bot_username: telegram.api.bot.getUsername(ctx),
					}),
				);
			}
		} else {
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "command_only_group"),
			);
		}
	});
};

export { master };
export default master;
