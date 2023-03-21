/**
 * Show
 * =====================
 * Show current quiz and tip
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 * 				  Alessandro Di Maria [@ImAl3x03] (https://github.com/ImAl3x03)
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/token";
import translate from "@translations/translate";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";
import db from "@routes/api/database";

import type { MasterInterface } from "@app/types/master.interfaces";

const show = async (): Promise<void> => {
	bot.command("show", async (ctx) => {
		logger.info("command: /show", "show.ts:show()");
		const lang = await telegram.api.message.getLanguage(ctx);

		if (telegram.api.message.getChatID(ctx) < 0) {
			// is group chat

			const master: MasterInterface = await db.master.get({
				group_id: telegram.api.message.getChatID(ctx),
			});

			if (master.description === "") {
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "show_command_noquiz", {
						first_name: master?.first_name,
						username: master?.username,
					}),
				);
			} else {
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "show_command", {
						first_name: master?.first_name,
						username: master?.username,
						answer: master?.description,
					}),
				);
			}
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
