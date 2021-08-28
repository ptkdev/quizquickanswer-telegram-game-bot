/* eslint-disable indent */
import { Schema, model } from "mongoose";
import type { TelegramUserInterface } from "../../../../types/databases.type";

const schema = new Schema<TelegramUserInterface>({
	id: { type: String, required: true },
	is_bot: { type: Boolean, required: true },
	first_name: { type: String, required: true },
	username: { type: String, required: true },
	launguage_code: String,
	question: String,
	description: String,
	group_id: { type: Number, required: true },
	score: { type: Number, required: true },
});

const query = model<TelegramUserInterface>("Scores", schema);

/**
 * Scores CRUD
 * =====================
 * Add score to DB
 *
 * @param {TelegramUserInterface} user - user with score to add
 */
const addScore = async (user: TelegramUserInterface): Promise<void> => {
	const doc = new query(user);
	await doc.save();

	console.log("User with score created");
};

/**
 * Scores CRUD
 * =====================
 * Delete score from DB
 *
 * @param {number } id - user id with score to remove
 */
const deleteScore = async (id: number): Promise<void> => {
	query.findOneAndDelete({ id }, function (err, user) {
		if (err) {
			return err;
		}
		console.log("User with score deleted");
	});
};

/**
 * Scores CRUD
 * =====================
 * Update score from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @param {TelegramUserInterface} user - user info with score to update
 */
const updateScore = async (
	search: Record<string, number | string | boolean>,
	user: TelegramUserInterface,
): Promise<void> => {
	query.findOneAndUpdate(search, user, function (err, user) {
		if (err) {
			return err;
		}
		console.log(`User updated`);
	});
};

/**
 * Scores CRUD
 * =====================
 * Get user with score from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {TelegramUserInterface} user.

 */
const getScore = async (search: Record<string, number | string | boolean>): Promise<TelegramUserInterface> => {
	try {
		const user = await query.findOne(search, function (err) {
			if (err) {
				return err;
			}
		});
		return user;
	} catch (error) {
		return error;
	}
};

/**
 * Scores CRUD
 * =====================
 * Get multiple user with score from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {TelegramUserInterface[]} user.

 */
const getMultipleScores = async (
	search: Record<string, number | string | boolean>,
): Promise<TelegramUserInterface[]> => {
	try {
		const user = await query.find(search, function (err) {
			if (err) {
				return err;
			}
		});
		return user || [];
	} catch (error) {
		return error;
	}
};

export { getMultipleScores, getScore, updateScore, deleteScore, addScore };
export default { getMultipleScores, getScore, updateScore, deleteScore, addScore };
