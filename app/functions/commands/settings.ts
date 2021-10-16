/**
 * Settings
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { Markup } from "telegraf";
import bot from "@app/core/telegraf";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";

/**
 * command: /settings
 * =====================
 * Set language
 *
 */
const settings = async (): Promise<void> => {
	bot.command("settings", async (ctx) => {
		logger.info("command: /settings", "settings.ts:settings()");
		return await ctx.reply(
			translate("settings_command_options"),
			Markup.keyboard([[translate("settings_command_setlanguage")]])
				.oneTime()
				.resize(),
		);
	});

	bot.hears(translate("settings_command_setlanguage"), async (ctx) => {
		return await ctx.reply(
			translate("settings_command_switchlanguage"),
			Markup.keyboard([
				[translate("settings_command_language_english"), translate("settings_command_language_italian")],
			])
				.oneTime()
				.resize(),
		);
	});

	bot.hears(translate("settings_command_language_english"), async (ctx) => {
		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		if (lang.group_id !== 0) {
			await db.settings.update(
				{ group_id: telegram.api.message.getChatID(ctx) },
				{ group_id: telegram.api.message.getChatID(ctx), language: "en" },
			);
		} else {
			await db.settings.add({ group_id: telegram.api.message.getChatID(ctx), language: "en" });
		}

		await telegram.api.message.send(
			ctx,
			telegram.api.message.getChatID(ctx),
			translate("settings_command_current_english"),
		);
	});

	bot.hears(translate("settings_command_language_italian"), async (ctx) => {
		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		if (lang.group_id !== 0) {
			await db.settings.update(
				{ group_id: telegram.api.message.getChatID(ctx) },
				{ group_id: telegram.api.message.getChatID(ctx), language: "it" },
			);
		} else {
			await db.settings.add({ group_id: telegram.api.message.getChatID(ctx), language: "it" });
		}

		await telegram.api.message.send(
			ctx,
			telegram.api.message.getChatID(ctx),
			translate("settings_command_current_italian"),
		);
	});
};

export { settings };
export default settings;
