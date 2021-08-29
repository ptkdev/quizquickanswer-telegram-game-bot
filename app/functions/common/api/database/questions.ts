/**
 * Question database
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { Schema, model } from "mongoose";
import type { QuestionsInterface } from "../../../../types/databases.type";

const schema = new Schema<QuestionsInterface>({
	username: { type: String, required: true },
	group_id: { type: Number, required: true },
	good_questions: { type: Number, required: true },
	bad_questions: { type: Number, required: true },
});

const query = model<QuestionsInterface>("Questions", schema);

/**
 * Questions CRUD
 * =====================
 * Add question to DB
 *
 * @param {QuestionsInterface} user - user with questions to add
 */
const add = async (user: QuestionsInterface): Promise<void> => {
	try {
		const doc = new query(user);
		await doc.save();
	} catch (error) {
		console.log(error);
	}
};

/**
 * Questions CRUD
 * =====================
 * Remove question from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 */
const remove = async (search: Record<string, number | string | boolean>): Promise<void> => {
	try {
		query.findOneAndDelete(search, function (err) {
			if (err) {
				return err;
			}
		});
	} catch (error) {
		console.log(error);
	}
};

/**
 * Questions CRUD
 * =====================
 * Update questions from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @param {QuestionsInterface} user - user info with questions to update
 */
const update = async (search: Record<string, number | string | boolean>, user: QuestionsInterface): Promise<void> => {
	try {
		query.findOneAndUpdate(search, user, function (err) {
			if (err) {
				return err;
			}
		});
	} catch (error) {
		console.log(error);
	}
};

/**
 * Questions CRUD
 * =====================
 * Get user with questions from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {TelegramUserInterface} user.
 *  */
const get = async (search: Record<string, number | string | boolean>): Promise<QuestionsInterface> => {
	try {
		const user = await query.findOne(search, function (err) {
			if (err) {
				return err;
			}
		});
		return user;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export { get, update, remove, add };
export default { get, update, remove, add };
