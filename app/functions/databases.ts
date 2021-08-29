/**
 * Database: lowdb
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import lowdb from "lowdb";
import lowdbFileSync from "lowdb/adapters/FileSync";
import configs from "@configs/config";

import type { TelegramUserInterface } from "@app/types/databases.type";

const store = { users: null, game: null };

store.users = lowdb(new lowdbFileSync(configs.databases.users));
store.users.defaults({ users: [] }).write();

store.game = lowdb(new lowdbFileSync(configs.databases.game));
store.game.defaults({ master: [] }).write();

/**
 * writeUser()
 * =====================
 * Write user information from telegram context to user database
 *
 * @Context: ctx.update.message.from
 *
 * @interface [TelegramUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
 *
 * @param { TelegramUserInterface } json - telegram user object
 *
 */
const writeUser = async (json: TelegramUserInterface): Promise<void> => {
	const user_id = store.users.get("users").find({ id: json.id }).value();

	if (user_id) {
		store.users.get("users").find({ id: user_id.id }).assign(json).write();
	} else {
		store.users.get("users").push(json).write();
	}
};

const getMasterFromChatID = async (chat_id: number): Promise<any> => {
	store.game = lowdb(new lowdbFileSync(configs.databases.game));
	const master = store.game.get("master").find({ group_id: chat_id }).value();

	return {
		username: master?.username,
		group_id: master?.group_id,
		question: master?.question,
	};
};

const getMasterFromName = async (username: string): Promise<any> => {
	store.game = lowdb(new lowdbFileSync(configs.databases.game));
	const master = store.game.get("master").find({ username: username }).value();

	return {
		username: master?.username,
		group_id: master?.group_id,
		question: master?.question,
	};
};

export { store, writeUser, getMasterFromChatID, getMasterFromName };
export default store;
