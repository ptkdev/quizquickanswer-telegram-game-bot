/* eslint-disable indent */
import { Schema, model } from "mongoose";
import type { TelegramUserInterface } from "../../../types/databases.type";

const schema = new Schema<TelegramUserInterface>({
    id: { type: String, required: true },
    is_bot: { type: Boolean, required: true },
    first_name: { type: String, required: true },
    username: { type: String, required: true },
    launguage_code: String,
});

const user_model = model<TelegramUserInterface>("User", schema);

/**
 * Users CRUD 
 * =====================
 * Add user to DB
 *
 * @param {TelegramUserInterface} user - user to add
 */
export const addUser = async (user: TelegramUserInterface): Promise<void> => {
    const doc = new user_model(user);
    await doc.save();

    console.log("User Created");
};

/**
 * Users CRUD
 * =====================
 * Delete user from DB
 *
 * @param {number } id - user id to remove
 */
export const deleteUser = async (id: number): Promise<void> => {
    user_model.findOneAndDelete({ id }, function (err, user) {
        if (err) {
            return err;
        }
        console.log("User deleted");

    });
};

/**
 * Users CRUD
 * =====================
 * Update user from DB
 *
 * @param {number } id - user id to update
 * @param {TelegramUserInterface} user - user info to update
 */
export const updateUser = async (id: number, user: TelegramUserInterface): Promise<void> => {
    user_model.findOneAndUpdate({ id }, user, function (err, user) {
        if (err) {
            return err;
        }
        console.log(`User updated`);

    });
};

/**
 * Users CRUD
 * =====================
 * Get user from DB
 *
 * @param {number } id - user id to retrieve
 */
export const getUser = async (id: number): Promise<void> => {
    const user = await user_model.findOne({ id }, function (err, user) {
        if (err) {
            return err;
        }
    });
    console.log(user);
};



