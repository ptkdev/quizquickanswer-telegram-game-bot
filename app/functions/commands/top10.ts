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

import lowdb from "lowdb";
import lowdbFileSync from "lowdb/adapters/FileSync";
import configs from "@configs/config";
import { getTopScoreEmoji } from "@app/functions/common/utils/utils";

const store = { users: null, game: null, scores: null, questions: null };

store.scores = lowdb(new lowdbFileSync(configs.databases.scores));
store.scores.defaults({ scores: [] }).write();

store.users = lowdb(new lowdbFileSync(configs.databases.users));
store.users.defaults({ users: [] }).write();

store.game = lowdb(new lowdbFileSync(configs.databases.game));
store.game.defaults({ master: [] }).write();

store.questions = lowdb(new lowdbFileSync(configs.databases.questions));
store.questions.defaults({ questions: [] }).write();

const top10 = async (): Promise<void> => {
	bot.command("top10", (ctx) => {
		if (ctx.message.chat.id < 0) {
			// is group chat

			store.scores = lowdb(new lowdbFileSync(configs.databases.scores));
			store.scores.defaults({ scores: [] }).write();

			store.questions = lowdb(new lowdbFileSync(configs.databases.questions));
			store.questions.defaults({ questions: [] }).write();

			const top_scores = store.scores
				.get("scores")
				.filter({ group_id: ctx.message.chat.id })
				.map((s) => {
					const user_questions = store.questions
						.get("questions")
						.find({
							group_id: ctx.message.chat.id,
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

			store.questions = lowdb(new lowdbFileSync(configs.databases.questions));
			store.questions.defaults({ questions: [] }).write();

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
