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
import type { Context } from "grammy";

const getUsername = (ctx: Context): string => {
	return ctx?.me?.username || "";
};

const getInfo = (ctx: Context): Context["me"] => {
	return ctx?.me || {};
};

export { getUsername, getInfo };
export default { getUsername, getInfo };
