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

const getUsername = (ctx: any): string => {
	const username = ctx?.update?.message?.from?.username;

	return username?.trim()?.toLowerCase() || "";
};

const getUserID = (ctx: any): string => {
	const username = ctx?.update?.message?.from?.id;

	return username || 0;
};

const getUserFirstName = (ctx: any): string => {
	const username = ctx?.update?.message?.from?.first_name;

	return username?.trim() || "";
};

const getFullUser = (ctx: any): any => {
	const from = ctx?.update?.message?.from || {};

	from.username = getUsername(ctx);
	from.question = "";
	from.description = "";
	from.score = 0;

	return from;
};

const getGroupID = (ctx: any): number => {
	return ctx?.update.message?.chat?.id || ctx?.message?.chat?.id || 0;
};

const getText = (ctx: any): string => {
	return ctx?.update?.message?.text || ctx?.message?.text || "";
};

const send = async (ctx: any, group_id: number, text: string, options: any = { parse_mode: "HTML" }): Promise<any> => {
	if (group_id && text) {
		let message;

		try {
			message = await ctx.telegram.sendMessage(group_id, text, options);
			return message;
		} catch (err: any) {
			logger.error(JSON.stringify(err), "message.ts:send()");
		}
	}
};

const sendPhoto = async (
	ctx: any,
	group_id: number,
	photo: string,
	options: any = { parse_mode: "HTML" },
): Promise<any> => {
	if (group_id && photo) {
		let message;

		try {
			message = await ctx.telegram.sendPhoto(group_id, photo, options);
			return message;
		} catch (err: any) {
			logger.error(JSON.stringify(err), "message.ts:send()");
		}
	}
};

const pin = async (
	ctx: any,
	group_id: number,
	message_id: number,
	options: any = { disable_notification: true },
): Promise<void> => {
	logger.debug(`group_id: ${group_id}`, "message.ts:pin()");
	logger.debug(`message_id: ${message_id}`, "message.ts:pin()");

	if (group_id && message_id) {
		try {
			await ctx.telegram.pinChatMessage(group_id, message_id, options);
		} catch (err: any) {
			logger.error(JSON.stringify(err), "message.ts:pin()");
		}
	}
};

export { getFullUser, getUsername, getGroupID, getText, getUserID, getUserFirstName, send, pin, sendPhoto };
export default { getFullUser, getUsername, getGroupID, getText, getUserID, getUserFirstName, send, pin, sendPhoto };
