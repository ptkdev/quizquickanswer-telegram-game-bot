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
import { logger } from "@app/functions/utils/logger";

import type { MasterInterface } from "@app/types/master.interfaces";
import type { GameInterface } from "@app/types/game.interfaces";

const schema = new Schema<GameInterface>({
	id: { type: String, default: "0" },
	is_bot: { type: Boolean, default: false },
	first_name: { type: String, default: "" },
	username: { type: String, default: "" },
	language_code: { type: String, default: "en" },
});

const query = model<MasterInterface>("User", schema, "users");

/**
 * Users CRUD
 * =====================
 * Add user to DB
 *
 * @param {MasterInterface} user - user to add
 */
const add = async (user: MasterInterface): Promise<void> => {
	try {
		const doc = new query(user);
		await doc.save();
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "users.ts:add()");
	}
};

/**
 * Users CRUD
 * =====================
 * Remove user from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 */
const remove = async (search: Record<string, number | string | boolean>): Promise<void> => {
	try {
		await query.findOneAndDelete(search);
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "users.ts:remove()");
	}
};

/**
 * Users CRUD
 * =====================
 * Update user from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @param {MasterInterface} user - user info to update
 */
const update = async (search: Record<string, number | string | boolean>, user: MasterInterface): Promise<void> => {
	try {
		await query.findOneAndUpdate(search, user);
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "users.ts:update()");
	}
};

/**
 * Users CRUD
 * =====================
 * Get user from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {MasterInterface[]} user.

 */
const get = async (search: Record<string, number | string | boolean>): Promise<MasterInterface> => {
	try {
		const user = await query.findOne(search, function (error: string) {
			if (error) {
				logger.error(JSON.stringify(error || ""), "users.ts:get()");
			}
		});

		return (await user) || new query().toJSON();
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "users.ts:get()");
	}

	return new query().toJSON();
};

export { get, update, remove, add };
export default { get, update, remove, add };
