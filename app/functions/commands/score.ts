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

import lowdb from "lowdb";
import lowdbFileSync from "lowdb/adapters/FileSync";
import configs from "@configs/config";

const store = { users: null, game: null, scores: null, questions: null };

store.scores = lowdb(new lowdbFileSync(configs.databases.scores));
store.scores.defaults({ scores: [] }).write();

store.users = lowdb(new lowdbFileSync(configs.databases.users));
store.users.defaults({ users: [] }).write();

store.game = lowdb(new lowdbFileSync(configs.databases.game));
store.game.defaults({ master: [] }).write();

store.questions = lowdb(new lowdbFileSync(configs.databases.questions));
store.questions.defaults({ questions: [] }).write();

/**
 * command: /score
 * =====================
 * Get user score
 *
 */
const score = async (): Promise<void> => {
	bot.command("score", (ctx) => {
		if (ctx.message.chat.id < 0) {
			// is group chat
			if (
				ctx.update.message.text.trim() === "/score" ||
				ctx.update.message.text.trim() === "/score@QuizQuickAnswerBot"
			) {
				store.scores = lowdb(new lowdbFileSync(configs.databases.scores));
				store.scores.defaults({ scores: [] }).write();

				store.questions = lowdb(new lowdbFileSync(configs.databases.questions));
				store.questions.defaults({ questions: [] }).write();

				const score = store.scores
					.get("scores")
					.find({
						group_id: ctx.message.chat.id,
						id: ctx.update.message.from.id,
					})
					.value();
				const user_questions = store.questions
					.get("questions")
					.find({
						group_id: ctx.message.chat.id,
						username: ctx.update.message.from.username,
					})
					.value();

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

				store.scores = lowdb(new lowdbFileSync(configs.databases.scores));
				store.scores.defaults({ scores: [] }).write();

				store.questions = lowdb(new lowdbFileSync(configs.databases.questions));
				store.questions.defaults({ questions: [] }).write();

				const score = store.scores.get("scores").find({ group_id: ctx.message.chat.id, username }).value();
				const user_questions = store.questions
					.get("questions")
					.find({ group_id: ctx.message.chat.id, username })
					.value();

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
