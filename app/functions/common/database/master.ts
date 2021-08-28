/* eslint-disable indent */
import { Schema, model } from "mongoose";
import type { TelegramUserInterface } from "../../../types/databases.type";

const schema = new Schema<TelegramUserInterface>({
	id: { type: String, required: true },
	is_bot: { type: Boolean, required: true },
	first_name: { type: String, required: false },
	username: { type: String, required: true },
	launguage_code: String,
	group_id: { type: Number, required: true },
});

const master_model = model<TelegramUserInterface>("Master", schema);

/**
 * Master CRUD
 * =====================
 * Add master to DB
 *
 * @param {TelegramUserInterface} user - user master to add
 */
export const addMaster = async (user: TelegramUserInterface): Promise<void> => {
	try {
		const doc = new master_model(user);
		await doc.save();

		console.log("Master created");
	} catch (error) {
		console.log(error);
	}
};

/**
 * Master CRUD
 * =====================
 * Delete master from DB
 *
 * @param {string} id - user id to remove
 */
export const deleteMaster = async (id: string): Promise<void> => {
	try {
		master_model.findOneAndDelete({ id }, function (err) {
			if (err) {
				return err;
			}
		});
	} catch (error) {
		console.log(error);
	}
};

/**
 * Master CRUD
 * =====================
 * Update master from DB
 *
 * @param {unknown} search - search condition e.g {id:"123"}
 * @param {TelegramUserInterface} user - data to update
 */
export const updateMaster = async (search: unknown, user: TelegramUserInterface): Promise<void> => {
	try {
		master_model.findOneAndUpdate(search, user, function (err) {
			if (err) {
				return err;
			}
		});
		console.log("Master updated");
	} catch (error) {
		console.log(error);
	}
};

/**
 * Master CRUD
 * =====================
 * Get master from DB
 *
 * @param {Record<string, number>} search - search condition e.g {id:"123"}
 * @return {TelegramUserInterface} user.
 */
export const getMaster = async (search: Record<string, unknown>): Promise<TelegramUserInterface> => {
	try {
		const user = await master_model.findOne(search, function (err) {
			if (err) {
				return err;
			}
		});
		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
};
