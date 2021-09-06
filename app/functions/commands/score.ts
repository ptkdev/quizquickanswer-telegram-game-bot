/**
 * Score
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/telegraf";
import translate from "@translations/translate";

import db from "@routes/api/database";
import telegram from "@routes/api/telegram";

import { QuestionsInterface, TelegramUserInterface } from "@app/types/databases.type";

import logger from "@app/functions/utils/logger";

/**
 * command: /score
 * =====================
 * Get user score
 *
 */
const score = async (): Promise<void> => {
	bot.command("score", async (ctx) => {
		logger.info("command: /score", "score.ts:score()");

		if (telegram.api.message.getGroupID(ctx) < 0) {
			// is group chat
			if (
				telegram.api.message.getText(ctx).trim() === "/score" ||
				telegram.api.message.getText(ctx).trim() === `/score@${telegram.api.bot.getUsername(ctx)}`
			) {
				const score: TelegramUserInterface = await db.scores.get({
					group_id: telegram.api.message.getGroupID(ctx),
					id: telegram.api.message.getUserID(ctx),
				});
				const user_questions: QuestionsInterface = await db.questions.get({
					group_id: telegram.api.message.getGroupID(ctx),
					username: telegram.api.message.getUsername(ctx),
				});

				if (user_questions) {
					score.score += user_questions.good_questions - user_questions.bad_questions;
				}
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getGroupID(ctx),
					translate("score_command_show", {
						first_name: telegram.api.message.getUserFirstName(ctx) || "",
						username: telegram.api.message.getUsername(ctx) || "",
						score: score?.score || 0,
					}),
				);
			} else {
				const username = telegram.api.message
					.getText(ctx)
					.replace("/score ", "")
					.replace(`/score@${telegram.api.bot.getUsername(ctx)}`, "")
					.replace("@", "")
					.trim();

				const score: TelegramUserInterface = await db.scores.get({
					group_id: telegram.api.message.getGroupID(ctx),
					username,
				});
				const user_questions: QuestionsInterface = await db.questions.get({
					group_id: telegram.api.message.getGroupID(ctx),
					username,
				});

				if (user_questions) {
					score.score += user_questions.good_questions - user_questions.bad_questions;
				}

				await telegram.api.message.send(
					ctx,
					telegram.api.message.getGroupID(ctx),
					translate("score_command_show_with_username", {
						username: username,
						score: score?.score || 0,
					}),
				);
			}
		} else {
			await telegram.api.message.send(ctx, telegram.api.message.getGroupID(ctx), translate("command_only_group"));
		}
	});
};

export { score };
export default score;
