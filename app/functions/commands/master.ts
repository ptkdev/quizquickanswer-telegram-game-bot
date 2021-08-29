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
import bot from "@app/functions/telegraf";
import translate from "@app/functions/translate";

import db from "@app/functions/common/api/database";
import telegram from "@app/functions/common/api/telegram";

import { TelegramUserInterface } from "@app/types/databases.type";

/**
 * command: /master
 * =====================
 * Set master game
 *
 */
const master = async (): Promise<void> => {
	bot.command("master", async (ctx) => {
		if ((await telegram.api.message.getGroupID(ctx)) < 0) {
			// is group chat
			if (
				(await telegram.api.message.getText(ctx)).trim() === "/master" ||
				(await telegram.api.message.getText(ctx)).trim() === "/master@QuizQuickAnswerBot"
			) {
				ctx.telegram.sendMessage(await telegram.api.message.getGroupID(ctx), translate("master_command_empty"));
			} else {
				const username = (await telegram.api.message.getText(ctx))
					.replace("/master ", "")
					.replace("@", "")
					.trim();

				const json = {
					id: 0,
					is_bot: false,
					first_name: "",
					username: username,
					language_code: "",
					question: "",
					description: "",
					group_id: await telegram.api.message.getGroupID(ctx),
				};

				const master: TelegramUserInterface = await db.master.getMaster({
					group_id: await telegram.api.message.getGroupID(ctx),
				});
				if (master) {
					await db.master.updateMaster({}, json);
				} else {
					await db.master.addMaster(json);
				}
				ctx.telegram.sendMessage(
					await telegram.api.message.getGroupID(ctx),
					translate("master_command_success", {
						username: username,
						bot_username: ctx.botInfo.username,
					}),
				);
			}
		} else {
			ctx.telegram.sendMessage(await telegram.api.message.getGroupID(ctx), translate("command_only_group"));
		}
	});
};

export { master };
export default master;
