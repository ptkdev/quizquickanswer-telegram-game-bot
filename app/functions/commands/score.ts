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
import bot from "@app/functions/telegraf";
import translate from "@app/functions/translate";

import db from "@app/functions/common/api/database";
import telegram from "@app/functions/common/api/telegram";

import { QuestionsInterface, TelegramUserInterface } from "@app/types/databases.type";

/**
 * command: /score
 * =====================
 * Get user score
 *
 */
const score = async (): Promise<void> => {
	bot.command("score", async (ctx) => {
		if ((await telegram.api.message.getGroupID(ctx)) < 0) {
			// is group chat
			if (
				(await telegram.api.message.getText(ctx)).trim() === "/score" ||
				(await telegram.api.message.getText(ctx)).trim() === "/score@QuizQuickAnswerBot"
			) {
				const score: TelegramUserInterface = await db.scores.getScore({
					group_id: await telegram.api.message.getGroupID(ctx),
					id: ctx.update.message.from.id,
				});
				const user_questions: QuestionsInterface = await db.questions.getQuestion({
					group_id: await telegram.api.message.getGroupID(ctx),
					username: await telegram.api.message.getUsername(ctx),
				});

				if (user_questions) {
					score.score += user_questions.good_questions - user_questions.bad_questions;
				}
				ctx.telegram.sendMessage(
					await telegram.api.message.getGroupID(ctx),
					translate("score_command_show", {
						first_name: ctx.update.message.from.first_name || "",
						username: (await telegram.api.message.getUsername(ctx)) || "",
						score: score?.score || 0,
					}),
					{ parse_mode: "MarkdownV2" },
				);
			} else {
				const username = (await telegram.api.message.getText(ctx))
					.replace("/score ", "")
					.replace("/score@QuizQuickAnswerBot", "")
					.replace("@", "")
					.trim();

				const score: TelegramUserInterface = await db.scores.getScore({
					group_id: await telegram.api.message.getGroupID(ctx),
					username,
				});
				const user_questions: QuestionsInterface = await db.questions.getQuestion({
					group_id: await telegram.api.message.getGroupID(ctx),
					username,
				});

				if (user_questions) {
					score.score += user_questions.good_questions - user_questions.bad_questions;
				}

				ctx.telegram.sendMessage(
					await telegram.api.message.getGroupID(ctx),
					translate("score_command_show_with_username", {
						username: username,
						score: score?.score || 0,
					}),
					{ parse_mode: "MarkdownV2" },
				);
			}
		} else {
			ctx.telegram.sendMessage(await telegram.api.message.getGroupID(ctx), translate("command_only_group"));
		}
	});
};

export { score };
export default score;
