/**
 * Wrapper telegram api (message)
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import logger from "@app/functions/utils/logger";
import db from "@routes/api/database";

import type { Context, RawApi } from "grammy";
import type { MasterInterface } from "@app/types/master.interfaces";
import type { SettingsInterface } from "@app/types/settings.interfaces";
import { Other } from "grammy/out/core/api";

const getUsername = (ctx: Context): string => {
	const username = ctx?.update?.message?.from?.username;

	return username?.trim() || "";
};

const getUsernameFromAction = (ctx: Context): string => {
	const username = ctx?.update?.callback_query?.from?.username;

	return username?.trim() || "";
};
const getUserIDFromAction = (ctx: Context): string => {
	const id = ctx?.update?.callback_query?.from?.id;

	return `${id}` || "0";
};

const getUserID = (ctx: Context): string => {
	const id = ctx?.update?.message?.from?.id;

	return `${id}` || "0";
};

const getUserFirstName = (ctx: Context): string => {
	const first_name = ctx?.update?.message?.from?.first_name;

	return first_name?.trim() || "";
};

const getFullUser = (ctx: Context): MasterInterface => {
	const from = (ctx?.update?.message?.from as MasterInterface) || {};

	from.username = getUsername(ctx);
	from.question = "";
	from.description = "";
	from.score = 0;
	from.pin_id = 0;

	return from;
};

const getChatID = (ctx: Context): number => {
	return (
		ctx?.update?.message?.chat?.id || ctx?.message?.chat?.id || ctx?.update?.callback_query?.message?.chat?.id || 0
	);
};

const getActionType = (ctx: Context): string => {
	return ctx?.update?.callback_query?.data || "";
};

const getPhotoFileID = (ctx: Context, position = 0): string => {
	return ctx?.update?.message?.photo?.[position]?.file_id || "";
};

const getPhotoCaption = (ctx: Context): string => {
	return ctx?.update?.message?.caption || "";
};

const getText = (ctx: Context): string => {
	return ctx?.update?.message?.text || ctx?.message?.text || "";
};

const getMessageID = (ctx: Context): number => {
	return ctx?.update?.message?.message_id || ctx?.message?.message_id || 0;
};

const getMessageIDFromAction = (ctx: Context): number => {
	return ctx?.update?.callback_query?.message?.message_id || ctx?.message?.message_id || 0;
};

const getLanguage = async (ctx: Context): Promise<SettingsInterface> => {
	const lang = await db.settings.get({
		group_id: getChatID(ctx),
	});

	if (
		lang.language === "auto" &&
		(ctx?.update?.message?.from?.language_code === "en" || ctx?.update?.message?.from?.language_code === "it")
	) {
		lang.language = ctx?.update?.message?.from?.language_code;
	}

	return lang;
};

const send = async (
	ctx: Context,
	group_id: number,
	text: string,
	options: Other<RawApi, "sendPhoto", "photo"> = { parse_mode: "HTML" },
): Promise<Context["message"]> => {
	if (group_id && text) {
		let message;

		try {
			message = await ctx.api.sendMessage(group_id, text, options);
			return message;
		} catch (err: unknown) {
			logger.error(JSON.stringify(err), "message.ts:send()");
		}
	}
};

const sendPhoto = async (
	ctx: Context,
	group_id: number,
	photo: string,
	options: Other<RawApi, "sendPhoto", "photo"> | undefined = { parse_mode: "HTML" },
): Promise<Context["message"]> => {
	if (group_id && photo) {
		let message;

		try {
			message = await ctx.api.sendPhoto(group_id, photo, options);
			return message;
		} catch (err: unknown) {
			logger.error(JSON.stringify(err), "message.ts:send()");
		}
	}
};

const pin = async (
	ctx: Context,
	group_id: number,
	message_id: number,
	options: Other<RawApi, "sendPhoto", "photo"> = { disable_notification: true },
): Promise<void> => {
	logger.debug(`group_id: ${group_id}`, "message.ts:pin()");
	logger.debug(`message_id: ${message_id}`, "message.ts:pin()");

	if (group_id && message_id) {
		try {
			await ctx.api.pinChatMessage(group_id, message_id, options);
		} catch (err: unknown) {
			logger.error(JSON.stringify(err), "message.ts:pin()");
		}
	}
};

const unpin = async (ctx: Context, group_id: number, message_id: number): Promise<void> => {
	logger.debug(`group_id: ${group_id}`, "message.ts:unpin()");
	logger.debug(`message_id: ${message_id}`, "message.ts:unpin()");

	if (group_id && message_id) {
		try {
			await ctx.api.unpinChatMessage(group_id, message_id);
		} catch (err: unknown) {
			logger.error(JSON.stringify(err), "message.ts:unpin()");
		}
	}
};

export {
	getFullUser,
	getUsername,
	getChatID,
	getText,
	getLanguage,
	getUserID,
	getUserFirstName,
	send,
	pin,
	unpin,
	sendPhoto,
	getPhotoFileID,
	getPhotoCaption,
	getActionType,
	getUsernameFromAction,
	getMessageID,
	getUserIDFromAction,
	getMessageIDFromAction,
};
export default {
	getFullUser,
	getUsername,
	getChatID,
	getText,
	getLanguage,
	getUserID,
	getUserFirstName,
	send,
	pin,
	unpin,
	sendPhoto,
	getPhotoFileID,
	getPhotoCaption,
	getActionType,
	getUsernameFromAction,
	getMessageID,
	getUserIDFromAction,
	getMessageIDFromAction,
};
