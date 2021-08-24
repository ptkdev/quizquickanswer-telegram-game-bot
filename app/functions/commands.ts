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
import * as databases from "@app/functions/databases";

import lowdb from "lowdb";
import lowdbFileSync from "lowdb/adapters/FileSync";
import configs from "@configs/config";

const store = { users: null, game: null, scores: null };

store.scores = lowdb(new lowdbFileSync(configs.databases.scores));
store.scores.defaults({ scores: [] }).write();

store.users = lowdb(new lowdbFileSync(configs.databases.users));
store.users.defaults({ users: [] }).write();

store.game = lowdb(new lowdbFileSync(configs.databases.game));
store.game.defaults({ master: [] }).write();

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

		if (ctx.message.chat.id < 0) { // is group chat
			if (ctx.update.message.text.trim() === "/master") {
				ctx.telegram.sendMessage(ctx.message.chat.id, `Inserisci un nickname, ad esempio: /master @ptkdev`);
			} else {
				const username = ctx.update.message.text.replace("/master ", "").replace("@", "").trim();

				const json = {
					"id": 0,
					"is_bot": false,
					"first_name": "",
					"username": username,
					"language_code": "",
					"question": "",
					"description": "",
					"group_id": ctx.message.chat.id
				};

				store.game = lowdb(new lowdbFileSync(configs.databases.game));
				if (store.game.get("master").find({ group_id: ctx.message.chat.id }).value()) {
					store.game.get("master").find({ group_id: ctx.message.chat.id }).assign(json).write();
				} else {
					store.game.get("master").push(json).write();
				}
				ctx.telegram.sendMessage(ctx.message.chat.id, `Ora sei diventato master @${username}! Contatta in privato @QuizQuickAnswerBot (clicca sul nickname) e scrivigli la parola o frase che gli altri devono indovinare, a seguire sempre nello stesso messaggio, aggiungi un trattino per dare un suggerimento, esempio:\n\nformichiere - animale bello con naso lungo`);
			}
		} else {
			ctx.telegram.sendMessage(ctx.message.chat.id, `Puoi usare questo comando solo in un gruppo telegram!`);
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

		if (ctx.message.chat.id < 0) { // is group chat
			if (ctx.update.message.text.trim() === "/score") {
				ctx.telegram.sendMessage(ctx.message.chat.id, `Inserisci un nickname, ad esempio: /score @ptkdev`);
			} else {
				const username = ctx.update.message.text.replace("/score ", "").replace("@", "").trim();

				store.scores = lowdb(new lowdbFileSync(configs.databases.scores));
				store.scores.defaults({ scores: [] }).write();
				const score = store.scores.get("scores").find({ group_id: ctx.message.chat.id, id: ctx.update.message.from.id }).value();
				ctx.telegram.sendMessage(ctx.message.chat.id, `${ctx.update.message.from.first_name} (@${username}) il tuo punteggio in questo gruppo è di ${score?.score || 0} punti!`);
			}
		} else {
			ctx.telegram.sendMessage(ctx.message.chat.id, `Puoi usare questo comando solo in un gruppo telegram!`);
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

		if (ctx.message.chat.id < 0) { // is group chat
			ctx.telegram.sendMessage(ctx.message.chat.id, `Prima di iniziare a giocare rendi questo bot amministratore. Successivamente diventa master lanciando il comando: /master @${ctx.update.message.from.username}`);
		} else {
			ctx.telegram.sendMessage(ctx.message.chat.id, `Scrivi la parola o frase che devono indovinare, un trattino, e poi il suggerimento. Tutto in un unico messaggio, esempio:\n\nformichiere - animale bello con naso lungo\n\nformichiere è la parola o frase che devono indovinare, dopo il trattino è il suggerimento che gli dai tu (animale bello con naso lungo).`);
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

export { launch, quit, setMaster, getScoreUser, start };
export default launch;
