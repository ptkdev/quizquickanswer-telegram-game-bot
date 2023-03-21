/**
 * Master database
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *				  Alessandro Di Maria [@ImAl3x03] (https://github.com/ImAl3x03)
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
	question: { type: String, default: "" },
	description: { type: String, default: "" },
	pin_id: { type: Number, default: 0 },
	timezone: { type: String, default: "" },
	win_message_id: { type: Number, default: 0 },
	message_thread_id: { type: Number, default: 0 },
	off: { type: Boolean, default: false },
});

const query = model<MasterInterface>("Master", schema, "master");

/**
 * Master CRUD
 * =====================
 * Add master to DB
 *
 * @param {MasterInterface} user - user master to add
 */
const add = async (user: MasterInterface): Promise<void> => {
	try {
		const doc = new query(user);
		await doc.save();
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "master.ts:add()");
	}
};

/**
 * Master CRUD
 * =====================
 * Remove master from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id: "123"}
 */
const remove = async (search: Record<string, number | string | boolean>): Promise<void> => {
	try {
		await query.findOneAndDelete(search);
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "master.ts:remove()");
	}
};

/**
 * Master CRUD
 * =====================
 * Update master from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id: "123"}
 * @param {MasterInterface} user - data to update
 */
const update = async (search: Record<string, number | string | boolean>, user: MasterInterface): Promise<void> => {
	try {
		await query.findOneAndUpdate(search, user);
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "master.ts:update()");
	}
};

/**
 * Master CRUD
 * =====================
 * Get master from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {MasterInterface} user.
 */
const get = async (search: Record<string, number | string | boolean>): Promise<MasterInterface> => {
	try {
		const user = query.findOne(search, function (error: string) {
			if (error) {
				logger.error(JSON.stringify(error || ""), "master.ts:get()");
			}
		});

		return (await user) || new query().toJSON();
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "master.ts:get()");
	}

	return new query().toJSON();
};

/**
 * Master CRUD
 * =====================
 * Get multiple masters DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {MasterInterface[]} user.

 */
const getMultiple = async (search: Record<string, number | string | boolean>): Promise<MasterInterface[]> => {
	try {
		const master = await query.find(search, function (error: string) {
			if (error) {
				logger.error(JSON.stringify(error || ""), "master.ts:getMultiple()");
			}
		});
		return (await master) || [];
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "master.ts:getMultiple()");
	}

	return [];
};

export { get, update, remove, add, getMultiple };
export default { get, update, remove, add, getMultiple };
