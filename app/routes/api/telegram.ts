/**
 * Router Wrapper telegram api (message)
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */

import message from "@app/functions/api/telegram/message";
import bot from "@app/functions/api/telegram/bot";

const telegram = {
	api: {
		message: message,
		bot: bot,
	},
};

export { telegram };
export default telegram;
