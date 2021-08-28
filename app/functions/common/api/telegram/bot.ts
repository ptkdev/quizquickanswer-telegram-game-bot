const botUsername = async (ctx: any): Promise<string> => {
	return ctx.botInfo?.username || "";
};

const botInfo = async (ctx: any): Promise<any> => {
	return ctx.botInfo;
};

export { botUsername, botInfo };
export default { botUsername, botInfo };
