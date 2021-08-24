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

const store = { users: null, game: null };

/**
 * hears: any taxt from bot chat
 * =====================
 * Listen any text user write
 *
 */
const quiz = async (): Promise<void> => {
	bot.on("text", async (ctx) => {
		store.game = lowdb(new lowdbFileSync(configs.databases.game));
		if (ctx.message.chat.id > 0) {
			const master = await getMasterFromName(ctx.update.message.from.username);

			if (master.username === ctx.update.message.from.username) {
				const text = ctx.update.message.text.split("-");

				const json: any = ctx.update.message.from;
				json.question = text[0]?.trim()?.toLowerCase();
				json.description = text[1]?.trim();
				json.group_id = master.group_id;

				if (json.question === undefined || json.question === "") {
					ctx.telegram.sendMessage(ctx.message.chat.id, `Aooo! Ma che cazzo stai a scrive? Ma sai leggere? Devi mettere prima la parola che devono indovinare, un trattino, e poi il suggerimento. Tutto in un unico messaggio, Esempio:\n\nformica - animale piccolissimo\n\nformica è la parola che devono indovinare, dopo il trattino è il suggerimento che gli dai tu (animale piccolissimo). Riprova e datti una svegliata!`);
				} else if (json.description === undefined || json.description === "") {
					ctx.telegram.sendMessage(ctx.message.chat.id, `Aooo! Hai dimenticato il cazzo di trattino. Ma sai leggere? Devi mettere prima la parola che devono indovinare, un trattino, e poi il suggerimento. Tutto in un unico messaggio, Esempio:\n\nformica - animale piccolissimo\n\nformica è la parola che devono indovinare, dopo il trattino è il suggerimento che gli dai tu (animale piccolissimo). Riprova e datti una svegliata!`);
				} else {
					store.game.get("master").find({ username: ctx.update.message.from.username }).assign(json).write();
					ctx.telegram.sendMessage(master.group_id, `3...2...1... VIA! Il master ha impostato la parola!\n\nSuggerimento: ${json.description || ""}`);
				}

			} else {
				ctx.telegram.sendMessage(ctx.message.chat.id, `Non sei tu il master al momento, se è un errore puoi usare: /master @TUO_NICKNAME`);
			}
		} else if (ctx.message.chat.id < 0) {
			const master = await getMasterFromChatID(ctx.message.chat.id);

			if (ctx.update.message.text.trim().toLowerCase() == master.question.trim().toLowerCase()) {
				ctx.telegram.sendMessage(master.group_id, `ESATTO ${ctx.update.message.from.first_name} (@${ctx.update.message.from.username})!!!\n\nLa risposta giusta era: ${ctx.update.message.text.trim()}\nOra sei il nuovo master!\n\nContatta in privato @QuizQuickAnswerBot (clicca sul nickname) e scrivigli la parola o frase che gli altri devono indovinare, a seguire sempre nello stesso messaggio, aggiungi un trattino per dare un suggerimento, esempio:\n\nformichiere - animale bello con naso lungo`);
				const json: any = ctx.update.message.from;
				json.question = "";
				json.description = "";
				json.group_id = ctx.message.chat.id;
				store.game.get("master").find({ group_id: ctx.message.chat.id }).assign(json).write();
			}
		}

	});
};


export { quiz };
export default { quiz };
