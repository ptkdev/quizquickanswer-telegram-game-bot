/**
 * Top10
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import bot from "@app/functions/telegraf";
import translate from "@app/functions/translate";
import { getMultipleScores } from "@app/functions/common/api/database/scores";
import { getQuestion } from "@app/functions/common/api/database/questions";

import { getTopScoreEmoji } from "@app/functions/common/utils/utils";
import { QuestionsInterface, TelegramUserInterface } from "@app/types/databases.type";

const top10 = async (): Promise<void> => {
	bot.command("top10", async (ctx) => {
		if (ctx.message.chat.id < 0) {
			// is group chat

			const top_scores: TelegramUserInterface[] = await getMultipleScores({ group_id: ctx.message.chat.id });

			let mapped_scores: TelegramUserInterface[] = await Promise.all(
				top_scores.map(async (s: TelegramUserInterface) => {
					const user_questions: QuestionsInterface = await getQuestion({
						group_id: ctx.message.chat.id,
						username: s.username,
					});

					if (user_questions) {
						s.score += user_questions.good_questions - user_questions.bad_questions;
					}
					return s;
				}),
			);

			mapped_scores = mapped_scores.sort((a, b) => b?.score - a?.score).slice(0, 10);

			const scores_message = mapped_scores
				.map((s: TelegramUserInterface, index: number) => {
					return translate("top10_command_list", {
						emoji: getTopScoreEmoji(index),
						first_name: s.first_name,
						username: s.username,
						score: s.score,
					});
				})
				.join("");

			if (scores_message) {
				ctx.telegram.sendMessage(ctx.message.chat.id, scores_message, {
					parse_mode: "MarkdownV2",
				});
			} else {
				ctx.telegram.sendMessage(ctx.message.chat.id, translate("top10_command_not_available"));
			}
		} else {
			ctx.telegram.sendMessage(ctx.message.chat.id, translate("command_only_group"));
		}
	});
};

export { top10 };
export default top10;
