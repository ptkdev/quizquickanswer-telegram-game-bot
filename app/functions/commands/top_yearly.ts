/**
 * Top10 Yearly
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
import telegram from "@routes/api/telegram";
import db from "@routes/api/database";
import { getTopScoreEmoji } from "@app/functions/utils/utils";

import type { MasterInterface } from "@app/types/master.interfaces";
import type { QuestionsInterface } from "@app/types/question.interfaces";

import logger from "@app/functions/utils/logger";

const topYearly = async (): Promise<void> => {
	bot.command(["top2021", "top2022", "top2023", "top2024", "top2025"], async (ctx) => {
		logger.info("command: /topyearly", "topYearly.ts:topyearly()");
		const lang = await telegram.api.message.getLanguage(ctx);

		if (telegram.api.message.getChatID(ctx) < 0) {
			// is group chat
			const top_scores: MasterInterface[] = await db.scores.getMultiple({
				group_id: telegram.api.message.getChatID(ctx),
			});
			const year = ctx?.update?.message?.text?.substring(4, 8) || 2022;

			let mapped_scores: MasterInterface[] = await Promise.all(
				top_scores.map(async (s: MasterInterface) => {
					const user_questions: QuestionsInterface = await db.questions.get({
						group_id: telegram.api.message.getChatID(ctx),
						user_id: s?.id || "",
					});

					if (user_questions) {
						s[`score_${year}`] =
							s[`score_${year}`] +
							user_questions[`upvotes_${year}`] -
							user_questions[`downvotes_${year}`];
					}
					return s;
				}),
			);

			mapped_scores = mapped_scores.sort((a, b) => b?.[`score_${year}`] - a?.[`score_${year}`]).slice(0, 10);

			const scores_message = mapped_scores
				.map((s: MasterInterface, index: number) => {
					return translate(lang.language, "top10_command_list", {
						emoji: getTopScoreEmoji(index),
						first_name: s.first_name,
						username: s.username,
						score: s[`score_${year}`],
					});
				})
				.join("");

			if (scores_message) {
				await telegram.api.message.send(ctx, telegram.api.message.getChatID(ctx), scores_message);
			} else {
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "top10_command_not_available"),
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

export { topYearly };
export default topYearly;
