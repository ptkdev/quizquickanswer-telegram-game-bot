/**
 * Settings database
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

import type { SettingsInterface } from "@app/types/settings.interfaces";

const schema = new Schema<SettingsInterface>({
	group_id: { type: Number, default: 0 },
	language: { type: String, default: "auto" },
	pin_message: { type: Boolean, default: true },
});

const query = model<SettingsInterface>("Settings", schema, "settings");

/**
 * Settings CRUD
 * =====================
 * Add settings to DB
 *
 * @param {SettingsInterface} settings - settings to add
 */
const add = async (settings: SettingsInterface): Promise<void> => {
	try {
		const doc = new query(settings);
		await doc.save();
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "settings.ts:add()");
	}
};

/**
 * Settings CRUD
 * =====================
 * Remove settings from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 */
const remove = async (search: Record<string, number | string | boolean>): Promise<void> => {
	try {
		await query.findOneAndDelete(search);
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "settings.ts:remove()");
	}
};

/**
 * Settings CRUD
 * =====================
 * Update settings from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @param {SettingsInterface} settings - settings info to update
 */
const update = async (
	search: Record<string, number | string | boolean>,
	settings: SettingsInterface,
): Promise<void> => {
	try {
		await query.findOneAndUpdate(search, settings);
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "settings.ts:update()");
	}
};

/**
 * Settings CRUD
 * =====================
 * Get settings from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {SettingsInterface[]} settings.

 */
const get = async (search: Record<string, number | string | boolean>): Promise<SettingsInterface> => {
	try {
		const settings = await query.findOne(search, function (error: string) {
			if (error) {
				logger.error(JSON.stringify(error || ""), "settings.ts:get()");
			}
		});

		return (await settings) || new query().toJSON();
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "settings.ts:get()");
	}
	return new query().toJSON();
};

export { get, update, remove, add };
export default { get, update, remove, add };
