/**
 * Score
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import bot from "@app/functions/telegraf";
import translate from "@app/functions/translate";
import { getScore } from "@app/functions/common/api/database/scores";
import { getQuestion } from "@app/functions/common/api/database/questions";
import { QuestionsInterface, TelegramUserInterface } from "@app/types/databases.type";

/**
 * command: /score
 * =====================
 * Get user score
 *
 */
const score = async (): Promise<void> => {
	bot.command("score", async (ctx) => {
		if (ctx.message.chat.id < 0) {
			// is group chat
			if (
				ctx.update.message.text.trim() === "/score" ||
				ctx.update.message.text.trim() === "/score@QuizQuickAnswerBot"
			) {
				const score: TelegramUserInterface = await getScore({
					group_id: ctx.message.chat.id,
					id: ctx.update.message.from.id,
				});
				const user_questions: QuestionsInterface = await getQuestion({
					group_id: ctx.message.chat.id,
					username: ctx.update.message.from.username,
				});

				if (user_questions) {
					score.score += user_questions.good_questions - user_questions.bad_questions;
				}
				ctx.telegram.sendMessage(
					ctx.message.chat.id,
					translate("score_command_show", {
						first_name: ctx.update.message.from.first_name || "",
						username: ctx.update.message.from.username || "",
						score: score?.score || 0,
					}),
					{ parse_mode: "MarkdownV2" },
				);
			} else {
				const username = ctx.update.message.text
					.replace("/score ", "")
					.replace("/score@QuizQuickAnswerBot", "")
					.replace("@", "")
					.trim();

				const score: TelegramUserInterface = await getScore({ group_id: ctx.message.chat.id, username });
				const user_questions: QuestionsInterface = await getQuestion({
					group_id: ctx.message.chat.id,
					username,
				});

				if (user_questions) {
					score.score += user_questions.good_questions - user_questions.bad_questions;
				}

				ctx.telegram.sendMessage(
					ctx.message.chat.id,
					translate("score_command_show_with_username", {
						username: username,
						score: score?.score || 0,
					}),
					{ parse_mode: "MarkdownV2" },
				);
			}
		} else {
			ctx.telegram.sendMessage(ctx.message.chat.id, translate("command_only_group"));
		}
	});
};

export { score };
export default score;
