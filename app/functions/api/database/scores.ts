/**
 * Scores database
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

import type { MasterInterface } from "@app/types/master.interfaces";

const schema = new Schema<MasterInterface>({
	id: { type: String, default: "0" },
	is_bot: { type: Boolean, default: false },
	first_name: { type: String, default: "" },
	username: { type: String, default: "" },
	language_code: { type: String, default: "en" },
	group_id: { type: Number, default: 0 },
	score_2021: { type: Number, default: 0 },
	score_2022: { type: Number, default: 0 },
	score_2023: { type: Number, default: 0 },
	score_1_2023: { type: Number, default: 0 },
	score_2_2023: { type: Number, default: 0 },
	score_3_2023: { type: Number, default: 0 },
	score_4_2023: { type: Number, default: 0 },
	score_5_2023: { type: Number, default: 0 },
	score_6_2023: { type: Number, default: 0 },
	score_7_2023: { type: Number, default: 0 },
	score_8_2023: { type: Number, default: 0 },
	score_9_2023: { type: Number, default: 0 },
	score_10_2023: { type: Number, default: 0 },
	score_11_2023: { type: Number, default: 0 },
	score_12_2023: { type: Number, default: 0 },
	score_2024: { type: Number, default: 0 },
	score_1_2024: { type: Number, default: 0 },
	score_2_2024: { type: Number, default: 0 },
	score_3_2024: { type: Number, default: 0 },
	score_4_2024: { type: Number, default: 0 },
	score_5_2024: { type: Number, default: 0 },
	score_6_2024: { type: Number, default: 0 },
	score_7_2024: { type: Number, default: 0 },
	score_8_2024: { type: Number, default: 0 },
	score_9_2024: { type: Number, default: 0 },
	score_10_2024: { type: Number, default: 0 },
	score_11_2024: { type: Number, default: 0 },
	score_12_2024: { type: Number, default: 0 },
	score_2025: { type: Number, default: 0 },
	score_1_2025: { type: Number, default: 0 },
	score_2_2025: { type: Number, default: 0 },
	score_3_2025: { type: Number, default: 0 },
	score_4_2025: { type: Number, default: 0 },
	score_5_2025: { type: Number, default: 0 },
	score_6_2025: { type: Number, default: 0 },
	score_7_2025: { type: Number, default: 0 },
	score_8_2025: { type: Number, default: 0 },
	score_9_2025: { type: Number, default: 0 },
	score_10_2025: { type: Number, default: 0 },
	score_11_2025: { type: Number, default: 0 },
	score_12_2025: { type: Number, default: 0 },
});

const query = model<MasterInterface>("Scores", schema, "scores");

/**
 * Scores CRUD
 * =====================
 * Add score to DB
 *
 * @param {MasterInterface} user - user with score to add
 */
const add = async (user: MasterInterface): Promise<void> => {
	try {
		const doc = new query(user);
		await doc.save();
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "scores.ts:add()");
	}
};

/**
 * Scores CRUD
 * =====================
 * Remove score from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 */
const remove = async (search: Record<string, number | string | boolean>): Promise<void> => {
	try {
		query.findOneAndDelete(search);
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "scores.ts:remove()");
	}
};

/**
 * Scores CRUD
 * =====================
 * Update score from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @param {MasterInterface} user - user info with score to update
 */
const update = async (search: Record<string, number | string | boolean>, user: MasterInterface): Promise<void> => {
	try {
		await query.findOneAndUpdate(search, user);
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "scores.ts:update()");
	}
};

/**
 * Scores CRUD
 * =====================
 * Get user with score from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {MasterInterface} user.

 */
const get = async (search: Record<string, number | string | boolean>): Promise<MasterInterface> => {
	try {
		const user = await query.findOne(search);

		return (await user) || new query().toJSON();
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "scores.ts:get()");
	}

	return new query().toJSON();
};

/**
 * Scores CRUD
 * =====================
 * Get multiple user with score from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {MasterInterface[]} user.

 */
const getMultiple = async (search: Record<string, number | string | boolean>): Promise<MasterInterface[]> => {
	try {
		const user = await query.find(search);
		return user || [];
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "scores.ts:getMultiple()");
	}

	return [];
};

export { getMultiple, get, update, remove, add };
export default { getMultiple, get, update, remove, add };
