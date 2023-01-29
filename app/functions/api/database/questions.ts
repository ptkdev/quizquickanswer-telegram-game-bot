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
import { logger } from "@app/functions/utils/logger";

import type { QuestionsInterface } from "@app/types/question.interfaces";

const schema = new Schema<QuestionsInterface>({
	user_id: { type: String, default: 0 },
	group_id: { type: Number, default: 0 },
	upvotes_2021: { type: Number, default: 0 },
	downvotes_2021: { type: Number, default: 0 },
	upvotes_2022: { type: Number, default: 0 },
	downvotes_2022: { type: Number, default: 0 },
	upvotes_2023: { type: Number, default: 0 },
	downvotes_2023: { type: Number, default: 0 },
	upvotes_1_2023: { type: Number, default: 0 },
	downvotes_1_2023: { type: Number, default: 0 },
	upvotes_2_2023: { type: Number, default: 0 },
	downvotes_2_2023: { type: Number, default: 0 },
	upvotes_3_2023: { type: Number, default: 0 },
	downvotes_3_2023: { type: Number, default: 0 },
	upvotes_4_2023: { type: Number, default: 0 },
	downvotes_4_2023: { type: Number, default: 0 },
	upvotes_5_2023: { type: Number, default: 0 },
	downvotes_5_2023: { type: Number, default: 0 },
	upvotes_6_2023: { type: Number, default: 0 },
	downvotes_6_2023: { type: Number, default: 0 },
	upvotes_7_2023: { type: Number, default: 0 },
	downvotes_7_2023: { type: Number, default: 0 },
	upvotes_8_2023: { type: Number, default: 0 },
	downvotes_8_2023: { type: Number, default: 0 },
	upvotes_9_2023: { type: Number, default: 0 },
	downvotes_9_2023: { type: Number, default: 0 },
	upvotes_10_2023: { type: Number, default: 0 },
	downvotes_10_2023: { type: Number, default: 0 },
	upvotes_11_2023: { type: Number, default: 0 },
	downvotes_11_2023: { type: Number, default: 0 },
	upvotes_12_2023: { type: Number, default: 0 },
	downvotes_12_2023: { type: Number, default: 0 },
	upvotes_2024: { type: Number, default: 0 },
	downvotes_2024: { type: Number, default: 0 },
	upvotes_1_2024: { type: Number, default: 0 },
	downvotes_1_2024: { type: Number, default: 0 },
	upvotes_2_2024: { type: Number, default: 0 },
	downvotes_2_2024: { type: Number, default: 0 },
	upvotes_3_2024: { type: Number, default: 0 },
	downvotes_3_2024: { type: Number, default: 0 },
	upvotes_4_2024: { type: Number, default: 0 },
	downvotes_4_2024: { type: Number, default: 0 },
	upvotes_5_2024: { type: Number, default: 0 },
	downvotes_5_2024: { type: Number, default: 0 },
	upvotes_6_2024: { type: Number, default: 0 },
	downvotes_6_2024: { type: Number, default: 0 },
	upvotes_7_2024: { type: Number, default: 0 },
	downvotes_7_2024: { type: Number, default: 0 },
	upvotes_8_2024: { type: Number, default: 0 },
	downvotes_8_2024: { type: Number, default: 0 },
	upvotes_9_2024: { type: Number, default: 0 },
	downvotes_9_2024: { type: Number, default: 0 },
	upvotes_10_2024: { type: Number, default: 0 },
	downvotes_10_2024: { type: Number, default: 0 },
	upvotes_11_2024: { type: Number, default: 0 },
	downvotes_11_2024: { type: Number, default: 0 },
	upvotes_12_2024: { type: Number, default: 0 },
	downvotes_12_2024: { type: Number, default: 0 },
	upvotes_2025: { type: Number, default: 0 },
	downvotes_2025: { type: Number, default: 0 },
	upvotes_1_2025: { type: Number, default: 0 },
	downvotes_1_2025: { type: Number, default: 0 },
	upvotes_2_2025: { type: Number, default: 0 },
	downvotes_2_2025: { type: Number, default: 0 },
	upvotes_3_2025: { type: Number, default: 0 },
	downvotes_3_2025: { type: Number, default: 0 },
	upvotes_4_2025: { type: Number, default: 0 },
	downvotes_4_2025: { type: Number, default: 0 },
	upvotes_5_2025: { type: Number, default: 0 },
	downvotes_5_2025: { type: Number, default: 0 },
	upvotes_6_2025: { type: Number, default: 0 },
	downvotes_6_2025: { type: Number, default: 0 },
	upvotes_7_2025: { type: Number, default: 0 },
	downvotes_7_2025: { type: Number, default: 0 },
	upvotes_8_2025: { type: Number, default: 0 },
	downvotes_8_2025: { type: Number, default: 0 },
	upvotes_9_2025: { type: Number, default: 0 },
	downvotes_9_2025: { type: Number, default: 0 },
	upvotes_10_2025: { type: Number, default: 0 },
	downvotes_10_2025: { type: Number, default: 0 },
	upvotes_11_2025: { type: Number, default: 0 },
	downvotes_11_2025: { type: Number, default: 0 },
	upvotes_12_2025: { type: Number, default: 0 },
	downvotes_12_2025: { type: Number, default: 0 },
	voters: { type: Object, default: { message_id: 0, users: { upvotes: [], downvotes: [] } } },
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
	} catch (error: unknown) {
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
		await query.findOneAndDelete(search);
	} catch (error: unknown) {
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
		await query.findOneAndUpdate(search, user);
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "question.ts:update()");
	}
};

/**
 * Questions CRUD
 * =====================
 * Get user with questions from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {MasterInterface} user.
 *
 */
const get = async (search: Record<string, number | string | boolean>): Promise<QuestionsInterface> => {
	try {
		const user = await query.findOne(search);

		return (await user) || new query().toJSON();
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "question.ts:get()");
	}

	return new query().toJSON();
};

export { get, update, remove, add };
export default { get, update, remove, add };
