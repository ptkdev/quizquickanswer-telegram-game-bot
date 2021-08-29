/**
 * Master database
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

const schema = new Schema<TelegramUserInterface>({
	id: { type: String, required: true },
	is_bot: { type: Boolean, required: true },
	first_name: { type: String, required: false },
	username: { type: String, required: true },
	launguage_code: String,
	group_id: { type: Number, required: true },
	question: String,
	description: String,
});

const query = model<TelegramUserInterface>("Master", schema);

/**
 * Master CRUD
 * =====================
 * Add master to DB
 *
 * @param {TelegramUserInterface} user - user master to add
 */
const add = async (user: TelegramUserInterface): Promise<void> => {
	try {
		const doc = new query(user);
		await doc.save();
	} catch (error) {
		console.log(error);
	}
};

/**
 * Master CRUD
 * =====================
 * Remove master from DB
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
 * Master CRUD
 * =====================
 * Update master from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @param {TelegramUserInterface} user - data to update
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
	} catch (error) {
		console.log(error);
	}
};

/**
 * Master CRUD
 * =====================
 * Get master from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {TelegramUserInterface} user.
 */
const get = async (search: Record<string, number | string | boolean>): Promise<TelegramUserInterface> => {
	try {
		const user = await query.findOne(search, function (err) {
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

export { get, update, remove, add };
export default { get, update, remove, add };
