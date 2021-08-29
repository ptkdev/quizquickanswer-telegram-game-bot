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
import bot from "@app/functions/telegraf";
import translate from "@app/functions/translate";

import telegram from "@app/functions/common/api/telegram";

/**
 * command: /start
 * =====================
 * Send welcome message
 *
 */
const start = async (): Promise<void> => {
	bot.start(async (ctx) => {
		databases.writeUser(ctx.update.message.from);

		if ((await telegram.api.message.getGroupID(ctx)) < 0) {
			// is group chat
			ctx.telegram.sendMessage(
				await telegram.api.message.getGroupID(ctx),
				translate("start_command_group", {
					username: await telegram.api.message.getUsername(ctx),
				}),
			);
		} else {
			ctx.telegram.sendMessage(await telegram.api.message.getGroupID(ctx), translate("start_command_private"));
		}
	});
};

export { start };
export default start;
