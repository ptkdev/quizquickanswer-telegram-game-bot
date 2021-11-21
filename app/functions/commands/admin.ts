/**
 * Admin
 * =====================
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
import db from "@routes/api/database";

import logger from "@app/functions/utils/logger";

const admin = async (): Promise<void> => {
	bot.command("admin", async (ctx) => {
		logger.info("command: /admin", "admin.ts:admin()");
		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		if (telegram.api.message.getChatID(ctx) > 0) {
			// is bot chat
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "admin_welcome"),
				{
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: translate(lang.language, "action_send_messagge_all_groups"),
									callback_data: "message_all_groups",
								},
								{
									text: translate(lang.language, "action_set_user_score"),
									callback_data: "set_user_score",
								},
							],
						],
					},
				},
			);
		}
	});
};

export { admin };
export default admin;
