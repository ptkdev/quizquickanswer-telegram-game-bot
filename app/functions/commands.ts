/**
 * Telegraf Commands
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import bot from "@app/functions/telegraf";
import translate from "@app/functions/translate";
import * as databases from "@app/functions/databases";

import lowdb from "lowdb";
import lowdbFileSync from "lowdb/adapters/FileSync";
import configs from "@configs/config";
import { getTopScoreEmoji } from "../utils/utils";

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
 * command: /quit
 * =====================
 * If user exit from bot
 *
 */
const quit = async (): Promise<void> => {
	bot.command("quit", (ctx) => {
		ctx.telegram.leaveChat(ctx.message.chat.id);
		ctx.leaveChat();
	});
};

/**
 * command: /master
 * =====================
 * Set master game
 *
 */
const setMaster = async (): Promise<void> => {
	bot.command("master", (ctx) => {
		if (ctx.message.chat.id < 0) {
			// is group chat
			if (ctx.update.message.text.trim() === "/master" || ctx.update.message.text.trim() === "/master@QuizQuickAnswerBot") {
				ctx.telegram.sendMessage(ctx.message.chat.id, translate("master_command_empty"));
			} else {
				const username = ctx.update.message.text.replace("/master ", "").replace("@", "").trim();

				const json = {
					id: 0,
					is_bot: false,
					first_name: "",
					username: username,
					language_code: "",
					question: "",
					description: "",
					group_id: ctx.message.chat.id,
				};

				store.game = lowdb(new lowdbFileSync(configs.databases.game));
				if (store.game.get("master").find({ group_id: ctx.message.chat.id }).value()) {
					store.game.get("master").find({ group_id: ctx.message.chat.id }).assign(json).write();
				} else {
					store.game.get("master").push(json).write();
				}
				ctx.telegram.sendMessage(
					ctx.message.chat.id,
					translate("master_command_success", {
						username: username,
						bot_username: ctx.botInfo.username,
					}),
				);
			}
		} else {
			ctx.telegram.sendMessage(ctx.message.chat.id, translate("command_only_group"));
		}
	});
};

/**
 * command: /score
 * =====================
 * Get user score
 *
 */
const getScoreUser = async (): Promise<void> => {
	bot.command("score", (ctx) => {
		if (ctx.message.chat.id < 0) {
			// is group chat
			if (ctx.update.message.text.trim() === "/score" || ctx.update.message.text.trim() === "/score@QuizQuickAnswerBot") {
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
				const username = ctx.update.message.text.replace("/score ", "").replace("/score@QuizQuickAnswerBot", "").replace("@", "").trim();

				store.scores = lowdb(new lowdbFileSync(configs.databases.scores));
				store.scores.defaults({ scores: [] }).write();

				store.questions = lowdb(new lowdbFileSync(configs.databases.questions));
				store.questions.defaults({ questions: [] }).write();

				const score = store.scores.get("scores").find({ group_id: ctx.message.chat.id, username }).value();
				const user_questions = store.questions.get("questions").find({ group_id: ctx.message.chat.id, username }).value();

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

const getTopScores = async (): Promise<void> => {
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
					return `${getTopScoreEmoji(index)} *${s.first_name}* \\(@${s.username}\\) \\- *${s.score}* punt${s.score === 1 ? "o" : "i"} \n\n`;
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

const voteQuestion = async (): Promise<void> => {
	bot.command(["badquestion", "goodquestion"], (ctx) => {
		if (ctx.message.chat.id < 0) {
			// is group chat

			const username = ctx.update.message.text.replace("/goodquestion", "").replace("/badquestion", "").replace("@", "").trim();
			if (username === ctx.update.message.from.username) {
				ctx.telegram.sendMessage(ctx.message.chat.id, translate("goodquestion_not_autovote"), {
					parse_mode: "MarkdownV2",
				});
				return;
			}

			if (username !== "") {
				store.questions = lowdb(new lowdbFileSync(configs.databases.questions));
				store.questions.defaults({ questions: [] }).write();

				store.scores = lowdb(new lowdbFileSync(configs.databases.scores));
				store.scores.defaults({ scores: [] }).write();

				const group_id = ctx.update.message.chat.id;
				const is_good_question = ctx.update.message.text.split(" ")[0] === "/goodquestion";

				const user_questions = store.questions.get("questions").find({ group_id: ctx.message.chat.id, username });
				const user_score = store.scores.get("scores").find({ group_id: ctx.message.chat.id, username }).value()?.score || 0;

				if (user_questions.value()) {
					// if voted user is in the question DB
					store.questions
						.get("questions")
						.find({ group_id, username })
						.assign({
							...user_questions.value(),
							...(is_good_question
								? {
										good_questions: user_questions.value().good_questions + 1,
								  }
								: {
										bad_questions: user_questions.value().bad_questions + 1,
								  }),
						})
						.write();
				} else {
					const json = {
						username: username,
						good_questions: 0,
						bad_questions: 0,
						group_id: group_id,
					};

					store.questions
						.get("questions")
						.push({
							...json,
							...(is_good_question ? { good_questions: 1 } : { bad_questions: 1 }),
						})
						.write();
				}

				const combinedPoints = user_score + user_questions.value().good_questions - user_questions.value().bad_questions;
				const message = is_good_question
					? `*Votazione andata a buon fine*\\! 🗳 \n\n*Complimenti @${username}* hai ricevuto un voto *positivo*, ottima domanda\\! 🔥\n\nIl tuo punteggio è di *${combinedPoints}* punt${
							combinedPoints === 1 ? "o" : "i"
					  }\\! ⚽️`
					: `*Votazione andata a buon fine*\\! 🗳 \n\n@*${username}* hai ricevuto un voto *negativo*, puoi fare di meglio la prossima volta\\. 💩 \n\nIl tuo punteggio è di *${combinedPoints}* punt${
							combinedPoints === 1 ? "o" : "i"
					  }\\! ⚽️`;
				ctx.telegram.sendMessage(ctx.message.chat.id, message, {
					parse_mode: "MarkdownV2",
				});
			}
		} else {
			ctx.telegram.sendMessage(ctx.message.chat.id, translate("command_only_group"));
		}
	});
};

/**
 * command: /start
 * =====================
 * Send welcome message
 *
 */
const start = async (): Promise<void> => {
	bot.start(async (ctx) => {
		databases.writeUser(ctx.update.message.from);

		if (ctx.message.chat.id < 0) {
			// is group chat
			ctx.telegram.sendMessage(
				ctx.message.chat.id,
				translate("start_command_group", {
					username: ctx.update.message.from.username,
				}),
			);
		} else {
			ctx.telegram.sendMessage(ctx.message.chat.id, translate("start_command_private"));
		}
	});
};

/**
 * Run bot
 * =====================
 * Send welcome message
 *
 */
const launch = async (): Promise<void> => {
	bot.launch();
};

export { launch, quit, setMaster, getScoreUser, start, getTopScores, voteQuestion };
export default launch;
