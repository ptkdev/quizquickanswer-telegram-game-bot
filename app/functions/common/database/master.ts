import { Schema, model } from "mongoose";
import type { TelegramUserInterface } from "@app/types/databases.type";
import type { GameInterface } from "@app/types/game.type.js";

const schema = new Schema<GameInterface>({
	id: { type: String, required: true },
	is_bot: { type: Boolean, required: true },
	first_name: { type: String, required: true },
	username: { type: String, required: true },
	launguage_code: String,
	question: String,
	description: String,
	group_id: Number,
});

const query = model<TelegramUserInterface>("User", schema);

/**
 * Get Master from telegram chat_id
 * =====================
 * Get master from DB
 *
 * @param {number} group_id - chat id to retrieve
 *
 * @return {TelegramUserInterface} - master from DB
 *
 */
const getMasterFromChatID = async (group_id: number): Promise<void> => {
	const master = await query.findOne({ group_id }, function (err) {
		if (err) {
			return err;
		}
	});

	return master;
};

/**
 * Get Master from telegram username
 * =====================
 * Get master from DB
 *
 * @param {string} username - username to retrieve
 *
 * @return {TelegramUserInterface} - master from DB
 *
 */
const getMasterFromUsername = async (username: number): Promise<void> => {
	const master = await query.findOne({ username }, function (err) {
		if (err) {
			return err;
		}
	});
	return master;
};

export { getMasterFromUsername, getMasterFromChatID };
export default { getMasterFromUsername, getMasterFromChatID };
