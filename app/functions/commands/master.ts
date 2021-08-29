/**
 * Master
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

import { TelegramUserInterface } from "@app/types/databases.type";

/**
 * command: /master
 * =====================
 * Set master game
 *
 */
const master = async (): Promise<void> => {
	bot.command("master", async (ctx) => {
		if (telegram.api.message.getGroupID(ctx) < 0) {
			// is group chat
			if (
				telegram.api.message.getText(ctx).trim() === "/master" ||
				telegram.api.message.getText(ctx).trim() === `/master@${telegram.api.bot.getUsername(ctx)}`
			) {
				telegram.api.message.send(ctx, telegram.api.message.getGroupID(ctx), translate("master_command_empty"));
			} else {
				const username = telegram.api.message.getText(ctx).replace("/master ", "").replace("@", "").trim();

				const json = {
					id: 0,
					is_bot: false,
					first_name: "",
					username: username,
					language_code: "",
					question: "",
					description: "",
					group_id: telegram.api.message.getGroupID(ctx),
				};

				const master: TelegramUserInterface = await db.master.get({
					group_id: telegram.api.message.getGroupID(ctx),
				});
				if (master) {
					await db.master.update({}, json);
				} else {
					await db.master.add(json);
				}
				telegram.api.message.send(
					ctx,
					telegram.api.message.getGroupID(ctx),
					translate("master_command_success", {
						username: username,
						bot_username: telegram.api.bot.getUsername(ctx),
					}),
				);
			}
		} else {
			telegram.api.message.send(ctx, telegram.api.message.getGroupID(ctx), translate("command_only_group"));
		}
	});
};

export { master };
export default master;
