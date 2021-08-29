/**
 * Users database
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
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
 * Users CRUD
 * =====================
 * Add user to DB
 *
 * @param {TelegramUserInterface} user - user to add
 */
const addUser = async (user: TelegramUserInterface): Promise<void> => {
	const doc = new query(user);
	await doc.save();

	console.log("User Created");
};

/**
 * Users CRUD
 * =====================
 * Delete user from DB
 *
 * @param {number } id - user id to remove
 */
const deleteUser = async (id: number): Promise<void> => {
	query.findOneAndDelete({ id }, function (err, user) {
		if (err) {
			return err;
		}
		console.log("User deleted");
	});
};

/**
 * Users CRUD
 * =====================
 * Update user from DB
 *
 * @param {number } id - user id to update
 * @param {TelegramUserInterface} user - user info to update
 */
const updateUser = async (id: number, user: TelegramUserInterface): Promise<void> => {
	query.findOneAndUpdate({ id }, user, function (err, user) {
		if (err) {
			return err;
		}
		console.log(`User updated`);
	});
};

/**
 * Users CRUD
 * =====================
 * Get user from DB
 *
 * @param {number } id - user id to retrieve
 */
const getUser = async (id: number): Promise<void> => {
	const user = await query.findOne({ id }, function (err, user) {
		if (err) {
			return err;
		}
	});
	console.log(user);
};

export { getUser, updateUser, deleteUser, addUser };
export default { getUser, updateUser, deleteUser, addUser };
