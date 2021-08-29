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

const send = (ctx: any, group_id: number, text: string, options: any = null): any => {
	if (group_id && text) {
		const message = ctx.telegram.sendMessage(group_id, text, options);

		return message;
	}

	return 0;
};

export { getFullUser, getUsername, getGroupID, getText, getUserID, getUserFirstName, send };
export default { getFullUser, getUsername, getGroupID, getText, getUserID, getUserFirstName, send };
