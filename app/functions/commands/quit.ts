/**
 * Quit
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import bot from "@app/functions/telegraf";

import telegram from "@app/functions/common/api/telegram";

/**
 * command: /quit
 * =====================
 * If user exit from bot
 *
 */
const quit = async (): Promise<void> => {
	bot.command("quit", async (ctx) => {
		ctx.telegram.leaveChat(await telegram.api.message.getGroupID(ctx));
		ctx.leaveChat();
	});
};

export { quit };
export default quit;
