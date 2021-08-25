/**
 * Telegraf Hears
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import bot from "@app/functions/telegraf";
import lowdb from "lowdb";
import lowdbFileSync from "lowdb/adapters/FileSync";
import configs from "@configs/config";
import { getMasterFromChatID, getMasterFromName } from "./databases";

const store = { users: null, game: null, scores: null, questions: null };

store.scores = lowdb(new lowdbFileSync(configs.databases.scores));
store.scores.defaults({ scores: [] }).write();

store.questions = lowdb(new lowdbFileSync(configs.databases.questions));
store.questions.defaults({ questions: [] }).write();
/**
 * hears: any taxt from bot chat
 * =====================
 * Listen any text user write
 *
 */
const quiz = async (): Promise<void> => {
	bot.on("text", async (ctx) => {
		store.game = lowdb(new lowdbFileSync(configs.databases.game));

		if (ctx.message.chat.id > 0) { // is chat with bot
			const master = await getMasterFromName(ctx.update.message.from.username);

			if (master.username === ctx.update.message.from.username) {
				const text = ctx.update.message.text.split("-");

				const json: any = ctx.update.message.from;
				json.question = text[0]?.trim()?.toLowerCase();
				json.description = text[1]?.trim();
				json.group_id = master.group_id;

				if (json.question === undefined || json.question === "") {
					ctx.telegram.sendMessage(ctx.message.chat.id, `🤬 Aooo! Ma che cazzo stai a scrive? Ma sai leggere? Devi mettere prima la parola che devono indovinare, un trattino, e poi il suggerimento. Tutto in un unico messaggio, Esempio:\n\nformica - animale piccolissimo\n\nformica è la parola che devono indovinare, dopo il trattino è il suggerimento che gli dai tu (animale piccolissimo). Riprova e datti una svegliata!`);
				} else if (json.description === undefined || json.description === "") {
					ctx.telegram.sendMessage(ctx.message.chat.id, `🤬 Aooo! Hai dimenticato il cazzo di trattino. Ma sai leggere? Devi mettere prima la parola che devono indovinare, un trattino, e poi il suggerimento. Tutto in un unico messaggio, Esempio:\n\nformica - animale piccolissimo\n\nformica è la parola che devono indovinare, dopo il trattino è il suggerimento che gli dai tu (animale piccolissimo). Riprova e datti una svegliata!`);
				} else {
					store.game.get("master").find({ username: ctx.update.message.from.username }).assign(json).write();
					const quiz = await ctx.telegram.sendMessage(master.group_id, `⏱ ${json.description || ""}`);
					ctx.telegram.pinChatMessage(master.group_id, quiz.message_id, { disable_notification: true });
				}
			} else {
				ctx.telegram.sendMessage(ctx.message.chat.id, `📵 Non sei tu il master al momento, se è un errore puoi usare: /master @TUO_NICKNAME`);
			}
		}

		if (ctx.message.chat.id < 0) { // is group
			const master = await getMasterFromChatID(ctx.message.chat.id);

			if (ctx.update.message.text.trim().toLowerCase() == master.question.trim().toLowerCase()) {
				if (ctx.update.message.from.username) {
					store.scores = lowdb(new lowdbFileSync(configs.databases.scores));
					store.scores.defaults({ scores: [] }).write();
					const user_score = store.scores.get("scores").find({ group_id: master.group_id, id: ctx.update.message.from.id });

					store.questions = lowdb(new lowdbFileSync(configs.databases.questions));
					store.questions.defaults({ questions: [] }).write();
					const user_questions = store.questions.get("questions").find({ group_id: ctx.message.chat.id, username: ctx.update.message.from.username }).value();


					ctx.telegram.sendMessage(master.group_id, `🏆 *HAI VINTO* ${ctx.update.message.from.first_name} \\(@${ctx.update.message.from.username}\\)\\!\\!\\!\n\n✍️ La risposta giusta era: *${ctx.update.message.text.trim()}*\n👑 Ora sei il nuovo *master*\\! ⚽️ Il tuo punteggio é *${user_questions ? (user_score.value()?.score || 0) + 10 + user_questions.good_questions - user_questions.bad_questions : (user_score.value()?.score || 0) + 10}* 🔥\n\nContatta in privato @${ctx.botInfo.username} \\(clicca sul nickname\\) e segui le istruzioni\\.`, { parse_mode: "MarkdownV2" });

					const json: any = ctx.update.message.from;
					json.question = "";
					json.description = "";
					json.group_id = ctx.message.chat.id;
					store.game.get("master").find({ group_id: ctx.message.chat.id }).assign(json).write();

					if (user_score.value()) {
						user_score.assign({ score: user_score.value().score + 10 }).write();
					} else {
						const json_score: any = ctx.update.message.from;
						json_score.score = 10;
						store.scores.get("scores").push(json_score).write();
					}
				} else {
					ctx.telegram.sendMessage(master.group_id, `🏆 HAI VINTO ${ctx.update.message.from.first_name}!! Ma non puoi diventare master perchè non hai impostato un username su telegram. Vai nelle impostazioni di telegram, entra su modifica in alto e imposta un @nickname! Il master è rimasto ${master.first_name} (@${master.username}).`);
				}
			}
		}

	});
};


export { quiz };
export default { quiz };
