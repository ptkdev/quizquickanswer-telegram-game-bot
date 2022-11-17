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
import bot from "@app/core/token";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";

import { MasterInterface } from "@app/types/master.interfaces";
import { QuestionsInterface } from "@app/types/question.interfaces";

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
		const lang = await telegram.api.message.getLanguage(ctx);

		if (telegram.api.message.getChatID(ctx) < 0) {
			// is group chat
			if (
				telegram.api.message.getText(ctx).trim() === "/score" ||
				telegram.api.message.getText(ctx).trim() === `/score@${telegram.api.bot.getUsername(ctx)}`
			) {
				const score: MasterInterface = await db.scores.get({
					group_id: telegram.api.message.getChatID(ctx),
					id: telegram.api.message.getUserID(ctx),
				});
				const user_questions: QuestionsInterface = await db.questions.get({
					group_id: telegram.api.message.getChatID(ctx),
					user_id: telegram.api.message.getUserID(ctx),
				});

				if (user_questions) {
					score[`score_${new Date().getFullYear()}`] =
						score[`score_${new Date().getFullYear()}`] +
						user_questions[`upvotes_${new Date().getFullYear()}`] -
						user_questions[`downvotes_${new Date().getFullYear()}`];
				}

				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "score_command_show", {
						first_name: telegram.api.message.getUserFirstName(ctx) || "",
						username: telegram.api.message.getUsername(ctx) || "",
						score: score?.[`score_${new Date().getFullYear()}`] || 0,
					}),
				);
			} else {
				const username = telegram.api.message
					.getText(ctx)
					.replace("/score ", "")
					.replace(`/score@${telegram.api.bot.getUsername(ctx)}`, "")
					.replace("@", "")
					.trim();

				const score: MasterInterface = await db.scores.get({
					group_id: telegram.api.message.getChatID(ctx),
					username,
				});
				const user_questions: QuestionsInterface = await db.questions.get({
					group_id: telegram.api.message.getChatID(ctx),
					user_id: score.id,
				});

				if (user_questions) {
					score[`score_${new Date().getFullYear()}`] =
						score[`score_${new Date().getFullYear()}`] +
						user_questions[`upvotes_${new Date().getFullYear()}`] -
						user_questions[`downvotes_${new Date().getFullYear()}`];
				}

				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "score_command_show_with_username", {
						username: username,
						score: score?.[`score_${new Date().getFullYear()}`] || 0,
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

export { score };
export default score;
