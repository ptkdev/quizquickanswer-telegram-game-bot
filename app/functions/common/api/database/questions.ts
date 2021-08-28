/* eslint-disable indent */
import { Schema, model } from "mongoose";
import type { QuestionsInterface } from "../../../../types/databases.type";

const schema = new Schema<QuestionsInterface>({
	username: { type: String, required: true },
	group_id: { type: Number, required: true },
	good_questions: { type: Number, required: true },
	bad_questions: { type: Number, required: true },
});

const questions_model = model<QuestionsInterface>("Questions", schema);

/**
 * Questions CRUD
 * =====================
 * Add question to DB
 *
 * @param {QuestionsInterface} user - user with questions to add
 */
export const addQuestion = async (user: QuestionsInterface): Promise<void> => {
	const doc = new questions_model(user);
	await doc.save();

	console.log("User with questions created");
};

/**
 * Questions CRUD
 * =====================
 * Delete question from DB
 *
 * @param {number} username - username to remove
 */
export const deleteQuestion = async (username: string): Promise<void> => {
	questions_model.findOneAndDelete({ username }, function (err, user) {
		if (err) {
			return err;
		}
		console.log("User with questions deleted");
	});
};

/**
 * Questions CRUD
 * =====================
 * Update questions from DB
 *
 * @param {number} username - username to update
 * @param {QuestionsInterface} user - user info with questions to update
 */
export const updateQuestion = async (username: string, user: QuestionsInterface): Promise<void> => {
	questions_model.findOneAndUpdate({ username }, user, function (err, user) {
		if (err) {
			return err;
		}
		console.log(`User updated`);
	});
};

/**
 * Questions CRUD
 * =====================
 * Get user with questions from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {TelegramUserInterface} user.
 *  */
export const getQuestion = async (search: Record<string, number | string | boolean>): Promise<QuestionsInterface> => {
	const user = await questions_model.findOne(search, function (err) {
		if (err) {
			return err;
		}
	});
	return user;
};