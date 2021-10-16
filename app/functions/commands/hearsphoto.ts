/**
 * Telegraf Hears
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

import logger from "@app/functions/utils/logger";

/**
 * hearsPhoto: any photo from bot chat
 * =====================
 * Listen any photo user send
 *
 */
const hearsPhoto = async (): Promise<void> => {
	bot.on("photo", async (ctx) => {
		logger.info("hears: photo", "hears.ts:on(photo)");
		if (telegram.api.message.getChatID(ctx) > 0) {
			// is chat with bot
			const master: TelegramUserInterface = await db.master.get({
				username: telegram.api.message.getUsername(ctx),
			});

			const photo_id = telegram.api.message.getPhotoFileID(ctx);

			if (master?.username === telegram.api.message.getUsername(ctx)) {
				const text = telegram.api.message.getPhotoCaption(ctx).split("-");
				if (text !== undefined) {
					const json = telegram.api.message.getFullUser(ctx);
					json.question = text[0]?.trim()?.toLowerCase() || "";
					json.description = text[1]?.trim() || "";
					json.group_id = master?.group_id || 0;

					if (json.question === undefined || json.question === "") {
						await telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate("hears_missing_question"),
						);
					} else if (json.description === undefined || json.description === "") {
						await telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate("hears_missing_tip"),
						);
					} else {
						await db.master.update({}, json);

						const quiz = await telegram.api.message.sendPhoto(ctx, master.group_id, photo_id, {
							caption: `⏱ ${json.description || ""}`,
						});
						await telegram.api.message.pin(ctx, master?.group_id, quiz?.message_id, {
							disable_notification: true,
						});
					}
				} else {
					await telegram.api.message.send(
						ctx,
						telegram.api.message.getChatID(ctx),
						translate("hears_missing_photo_caption"),
					);
				}
			} else {
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate("hears_not_you_master"),
				);
			}
		}
	});
};

export { hearsPhoto };
export default hearsPhoto;
