/**
 * /badquestion and /goodquestion
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
					? `*Votazione andata a buon fine*\\! 🗳 \n\n*Complimenti @${username}* hai ricevuto un voto *positivo*, ottima domanda\\! 🔥\n\nIl tuo punteggio è di *${combinedPoints}* punt${combinedPoints === 1 ? "o" : "i"
					}\\! ⚽️`
					: `*Votazione andata a buon fine*\\! 🗳 \n\n@*${username}* hai ricevuto un voto *negativo*, puoi fare di meglio la prossima volta\\. 💩 \n\nIl tuo punteggio è di *${combinedPoints}* punt${combinedPoints === 1 ? "o" : "i"
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

export { voteQuestion };
export default voteQuestion;
