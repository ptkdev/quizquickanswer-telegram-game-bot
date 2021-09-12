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
import type { TelegramUserInterface } from "../../../types/databases.type";
import { getEmptyTelegramUserInterface } from "@app/functions/utils/utils";
import { logger } from "@app/functions/utils/logger";

const schema = new Schema<TelegramUserInterface>({
	id: { type: Number, default: 0 },
	is_bot: { type: Boolean, default: false },
	first_name: { type: String, default: "" },
	username: { type: String, default: "" },
	language_code: { type: String, default: "en" },
	group_id: { type: Number, default: 0 },
	score: { type: Number, default: 0 },
});

const query = model<TelegramUserInterface>("Scores", schema, "scores");

/**
 * Scores CRUD
 * =====================
 * Add score to DB
 *
 * @param {TelegramUserInterface} user - user with score to add
 */
const add = async (user: TelegramUserInterface): Promise<void> => {
	try {
		const doc = new query(user);
		await doc.save();
	} catch (error: any) {
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
		query.findOneAndDelete(search, function (err) {
			if (err) {
				return err;
			}
			logger.info("User with score deleted");
		});
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "scores.ts:remove()");
	}
};

/**
 * Scores CRUD
 * =====================
 * Update score from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @param {TelegramUserInterface} user - user info with score to update
 */
const update = async (
	search: Record<string, number | string | boolean>,
	user: TelegramUserInterface,
): Promise<void> => {
	try {
		query.findOneAndUpdate(search, user, function (err) {
			if (err) {
				return err;
			}
		});
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "scores.ts:update()");
	}
};

/**
 * Scores CRUD
 * =====================
 * Get user with score from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {TelegramUserInterface} user.

 */
const get = async (search: Record<string, number | string | boolean>): Promise<TelegramUserInterface> => {
	try {
		const user = await query.findOne(search, function (error: string) {
			if (error) {
				return getEmptyTelegramUserInterface(error);
			}
		});

		return user;
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "scores.ts:get()");
	}
	return getEmptyTelegramUserInterface("");
};

/**
 * Scores CRUD
 * =====================
 * Get multiple user with score from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {TelegramUserInterface[]} user.

 */
const getMultiple = async (search: Record<string, number | string | boolean>): Promise<TelegramUserInterface[]> => {
	try {
		const user = await query.find(search, function (error: string) {
			if (error) {
				return getEmptyTelegramUserInterface(error);
			}
		});
		return user || [];
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "scores.ts:getMultiple()");
	}

	return [];
};

export { getMultiple, get, update, remove, add };
export default { getMultiple, get, update, remove, add };
