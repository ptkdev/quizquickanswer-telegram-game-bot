/**
 * Wrapper telegram api (botInfo)
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */

const botUsername = async (ctx: any): Promise<string> => {
	return ctx.botInfo?.username || "";
};

const botInfo = async (ctx: any): Promise<any> => {
	return ctx.botInfo;
};

export { botUsername, botInfo };
export default { botUsername, botInfo };
