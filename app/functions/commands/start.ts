/**
 * Start
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/telegraf";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";

import logger from "@app/functions/utils/logger";

/**
 * command: /start
 * =====================
 * Send welcome message
 *
 */
const start = async (): Promise<void> => {
	bot.start(async (ctx) => {
		logger.info("command: /start", "start.ts:start()");

		db.users.add(telegram.api.message.getFullUser(ctx));

		if (telegram.api.message.getGroupID(ctx) < 0) {
			// is group chat
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getGroupID(ctx),
				translate("start_command_group", {
					username: telegram.api.message.getUsername(ctx),
				}),
			);
		} else {
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getGroupID(ctx),
				translate("start_command_private"),
			);
		}
	});
};

export { start };
export default start;
