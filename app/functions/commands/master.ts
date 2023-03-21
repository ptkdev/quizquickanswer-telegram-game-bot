/**
 * Master
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 * 				  Alessandro Di Maria [@ImAl3x03] (https://github.com/ImAl3x03)
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
				let master: MasterInterface = await db.master.get({
					group_id: telegram.api.message.getChatID(ctx),
				});

				if (master.off) {
					return;
				}

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
					group_id: telegram.api.message.getChatID(ctx),
					message_thread_id: telegram.api.message.getThreadID(ctx),
					off: master.off,
					timezone: master.timezone,
				};

				await db.master.update({ group_id: telegram.api.message.getChatID(ctx) }, json);

				master = await db.master.get({
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
					user_questions[`downvotes_${new Date().getMonth() + 1}_${new Date().getFullYear()}`] += 15;

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

				const memberId = Number(telegram.api.message.getUserID(ctx));

				const { user, status } = await ctx.getChatMember(memberId);

				logger.debug(`master:${JSON.stringify(master)}`);

				// Just checking if the user whose lauunching the command is an admin of the group or the current master
				if (status !== "creator" && status !== "administrator" && user?.username !== master?.username) {
					logger.error(`${user.username} wasn't authorized to change the master`);

					await telegram.api.message.send(
						ctx,
						telegram.api.message.getChatID(ctx),
						translate(lang.language, "not_authorized", {
							username: user.username,
						}),
					);

					return;
				}

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
