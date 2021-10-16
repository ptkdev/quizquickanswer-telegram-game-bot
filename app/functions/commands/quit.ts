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
import bot from "@app/core/telegraf";

import telegram from "@routes/api/telegram";

import logger from "@app/functions/utils/logger";

/**
 * command: /quit
 * =====================
 * If user exit from bot
 *
 */
const quit = async (): Promise<void> => {
	bot.command("quit", async (ctx) => {
		logger.info("command: /quit", "quit.ts:quit()");

		ctx.telegram.leaveChat(telegram.api.message.getChatID(ctx));
		ctx.leaveChat();
	});
};

export { quit };
export default quit;
