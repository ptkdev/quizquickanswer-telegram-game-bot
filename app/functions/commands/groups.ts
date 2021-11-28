/**
 * Groups
 * =====================
 * Spam official groups
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { InlineKeyboard } from "grammy";
import bot from "@app/core/token";
import translate from "@translations/translate";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";

const groups = async (): Promise<void> => {
	bot.command("groups", async (ctx) => {
		logger.info("command: /groups", "groups.ts:groups()");
		const lang = await telegram.api.message.getLanguage(ctx);

		const buttons = new InlineKeyboard();

		buttons.url(translate(lang.language, "groups_button_official_english"), "https://t.me/QuizQuickAnswerGroup");
		buttons.row();
		buttons.url(translate(lang.language, "groups_button_official_italian"), "https://t.me/QuizQuickAnswerGroupITA");

		await telegram.api.message.send(
			ctx,
			telegram.api.message.getChatID(ctx),
			translate(lang.language, "groups_command"),
			{
				reply_markup: buttons,
				parse_mode: "HTML",
			},
		);
	});
};

export { groups };
export default groups;
