/**
 * Top10
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

import telegram from "@routes/api/telegram";
import db from "@routes/api/database";
import { getTopScoreEmoji } from "@app/functions/utils/utils";
import { TelegramUserInterface, QuestionsInterface } from "@app/types/databases.type";

import logger from "@app/functions/utils/logger";

const top10 = async (): Promise<void> => {
	bot.command("top10", async (ctx) => {
		logger.info("command: /top10", "top10.ts:top10()");

		if (telegram.api.message.getGroupID(ctx) < 0) {
			// is group chat
			const top_scores: TelegramUserInterface[] = await db.scores.getMultiple({
				group_id: telegram.api.message.getGroupID(ctx),
			});

			let mapped_scores: TelegramUserInterface[] = await Promise.all(
				top_scores.map(async (s: TelegramUserInterface) => {
					const user_questions: QuestionsInterface = await db.questions.get({
						group_id: telegram.api.message.getGroupID(ctx),
						username: s?.username || "",
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
				await telegram.api.message.send(ctx, telegram.api.message.getGroupID(ctx), scores_message);
			} else {
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getGroupID(ctx),
					translate("top10_command_not_available"),
				);
			}
		} else {
			await telegram.api.message.send(ctx, telegram.api.message.getGroupID(ctx), translate("command_only_group"));
		}
	});
};

export { top10 };
export default top10;
