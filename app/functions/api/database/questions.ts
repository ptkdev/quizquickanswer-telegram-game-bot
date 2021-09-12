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
import type { QuestionsInterface } from "../../../types/databases.type";
import { getEmptyQuestionsInterface } from "@app/functions/utils/utils";
import { logger } from "@app/functions/utils/logger";

const schema = new Schema<QuestionsInterface>({
	username: { type: String, default: "" },
	group_id: { type: Number, default: 0 },
	good_questions: { type: Number, default: 0 },
	bad_questions: { type: Number, default: 0 },
});

const query = model<QuestionsInterface>("Questions", schema, "questions");

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
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "question.ts:add()");
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
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "question.ts:remove()");
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
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "question.ts:update()");
	}
};

/**
 * Questions CRUD
 * =====================
 * Get user with questions from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {TelegramUserInterface} user.
 *
 */
const get = async (search: Record<string, number | string | boolean>): Promise<QuestionsInterface> => {
	try {
		const user = await query.findOne(search, function (error: string) {
			if (error) {
				return getEmptyQuestionsInterface(error);
			}
		});

		return user;
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "question.ts:get()");
	}

	return getEmptyQuestionsInterface("");
};

export { get, update, remove, add };
export default { get, update, remove, add };
