/**
 * Version
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/token";
import v from "@app/configs/version.json";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";

/**
 * command: /version
 * =====================
 * Get the version of the bot
 *
 */
const version = async (): Promise<void> => {
	bot.command("version", async (ctx) => {
		logger.info("command: /version", "version.ts:version()");

		await telegram.api.message.send(
			ctx,
			telegram.api.message.getChatID(ctx),
			`v${v?.semver || "0.0.0"} (${v?.hash || ""})`,
		);
	});
};

export { version };
export default version;
