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

import telegram from "@app/functions/common/api/telegram";
import db from "@app/functions/common/api/database";
import { getTopScoreEmoji } from "@app/functions/common/utils/utils";

const top10 = async (): Promise<void> => {
	bot.command("top10", async (ctx) => {
		if ((await telegram.api.message.getGroupID(ctx)) < 0) {
			// is group chat

			const top_scores = store.scores
				.get("scores")
				.filter({ group_id: await telegram.api.message.getGroupID(ctx) })
				.map(async (s) => {
					const user_questions = store.questions
						.get("questions")
						.find({
							group_id: await telegram.api.message.getGroupID(ctx),
							username: s.username,
						})
						.value();
					return user_questions
						? {
								...s,
								score: s.score + user_questions.good_questions - user_questions.bad_questions,
						  }
						: s;
				})
				.sort((a, b) => b?.score - a?.score)
				.slice(0, 10)
				.value();

			const scores_message = top_scores
				.map((s: any, index: number) => {
					return translate("top10_command_list", {
						emoji: getTopScoreEmoji(index),
						first_name: s.first_name,
						username: s.username,
						score: s.score,
					});
				})
				.join("");

			if (scores_message) {
				ctx.telegram.sendMessage(await telegram.api.message.getGroupID(ctx), scores_message, {
					parse_mode: "MarkdownV2",
				});
			} else {
				ctx.telegram.sendMessage(
					await telegram.api.message.getGroupID(ctx),
					translate("top10_command_not_available"),
				);
			}
		} else {
			ctx.telegram.sendMessage(await telegram.api.message.getGroupID(ctx), translate("command_only_group"));
		}
	});
};

export { top10 };
export default top10;
