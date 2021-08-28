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
 * Get Score
 * =====================
 * Ccore from DB with group_id and username of user
 *
 * @param {number} group_id - chat id to retrieve
 * @param {username} username - username to retrieve
 *
 * @return {TelegramUserInterface} score - from DB
 */
const getUserScore = async (group_id: number, username: string): Promise<void> => {
	const score = await query.findOne({ group_id, username }, function (err) {
		if (err) {
			return err;
		}
	});

	return score;
};

export { getUserScore };
export default getUserScore;
