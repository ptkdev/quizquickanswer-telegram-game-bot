/**
 * Master
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
 * command: /master
 * =====================
 * Set master game
 *
 */
const master = async (): Promise<void> => {
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

export { master };
export default master;
