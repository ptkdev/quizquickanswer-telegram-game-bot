/**
 * Ping
 * =====================
 * Ping send notify to all users for start game
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

const ping = async (): Promise<void> => {
	bot.command("ping", async (ctx) => {
		logger.info("command: /ping", "ping.ts:ping()");
		const lang = await telegram.api.message.getLanguage(ctx);

		if (telegram.api.message.getChatID(ctx) < 0) {
			// is group chat
			const message = await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "ping_command"),
			);

			if (message) {
				await telegram.api.message.pin(ctx, telegram.api.message.getChatID(ctx), message?.message_id, {
					disable_notification: false,
				});

				setTimeout(async function () {
					await telegram.api.message.unpin(ctx, telegram.api.message.getChatID(ctx), message?.message_id);
				}, 3000);
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

export { ping };
export default ping;
