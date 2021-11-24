/**
 * Show
 * =====================
 * Show current quiz and tip
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/token";
import translate from "@translations/translate";

import telegram from "@routes/api/telegram";

import logger from "@app/functions/utils/logger";

const show = async (): Promise<void> => {
	bot.command("show", async (ctx) => {
		logger.info("command: /show", "show.ts:show()");
		const lang = await telegram.api.message.getLanguage(ctx);
		if (telegram.api.message.getChatID(ctx) < 0) {
			// is group chat
			await ctx.reply(translate(lang.language, "groups_command"));
		} else {
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "command_only_group"),
			);
		}
	});
};

export { show };
export default show;
