const getUsername = async (ctx: any): Promise<string> => {
	const username = ctx.update.message.from?.username;

	return username?.trim()?.toLowerCase() || "";
};

const getFullUser = async (ctx: any): Promise<string> => {
	const from = ctx.update.message.from?.username;
	from.username = getUsername(ctx);
	from.question = "";
	from.description = "";
	from.score = 0;

	return from;
};

const getGroupID = async (ctx: any): Promise<number> => {
	return ctx.message?.chat?.id || 0;
};

const getCurrentGroupID = async (ctx: any): Promise<number> => {
	return ctx.update.message?.chat?.id || 0;
};

const getText = async (ctx: any): Promise<string> => {
	return ctx.update.message?.text || "";
};

export { getFullUser, getUsername, getGroupID, getCurrentGroupID, getText };
export default { getFullUser, getUsername, getGroupID, getCurrentGroupID, getText };
