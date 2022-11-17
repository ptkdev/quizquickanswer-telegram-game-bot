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
import bot from "@app/core/token";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";
import { vote } from "@app/functions/utils/vote";

import type { MasterInterface } from "@app/types/master.interfaces";

/**
 * hearsPhoto: any photo from bot chat
 * =====================
 * Listen any photo user send
 *
 */
const hearsPhoto = async (): Promise<void> => {
	bot.on("message:photo", async (ctx) => {
		logger.info("hears: photo", "hears.ts:on(photo)");
		const lang = await telegram.api.message.getLanguage(ctx);

		if (telegram.api.message.getChatID(ctx) > 0) {
			// is chat with bot
			const master: MasterInterface = await db.master.get({
				username: telegram.api.message.getUsername(ctx),
			});

			const photo_id = telegram.api.message.getPhotoFileID(ctx);

			if (master?.username === telegram.api.message.getUsername(ctx)) {
				const text = telegram.api.message.getPhotoCaption(ctx).split("##");
				if (text !== undefined) {
					const json = telegram.api.message.getFullUser(ctx);
					json.question = text[0]?.trim()?.toLowerCase() || "";
					json.description = text[1]?.trim() || "";
					json.group_id = master?.group_id || 0;
					json.message_thread_id = master?.message_thread_id;

					if (json.question === undefined || json.question === "") {
						await telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate(lang.language, "hears_missing_question"),
						);
					} else if (json.description === undefined || json.description === "") {
						await telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate(lang.language, "hears_missing_tip"),
						);
					} else {
						if (master?.pin_id > 0) {
							await telegram.api.message.unpin(ctx, master?.group_id, master?.pin_id);
						}

						await db.master.update({ username: telegram.api.message.getUsername(ctx) }, json);

						const master_in_multi_groups = await db.master.getMultiple({
							username: telegram.api.message.getUsername(ctx),
						});

						master_in_multi_groups.forEach(async (master_in_group) => {
							const quiz = await telegram.api.message.sendPhoto(
								ctx,
								master_in_group?.group_id,
								photo_id,
								{
									caption: `⏱ ${json.description || ""}`,
									reply_markup: {
										inline_keyboard: [
											[
												{ text: `👍 0`, callback_data: "upvote" },
												{ text: `👎 0`, callback_data: "downvote" },
											],
										],
									},
									message_thread_id: master_in_group.message_thread_id,
								},
							);

							if (quiz) {
								await telegram.api.message.pin(ctx, master_in_group?.group_id, quiz?.message_id, {
									disable_notification: true,
									message_thread_id: master_in_group.message_thread_id,
								});

								master_in_group.pin_id = quiz?.message_id || 0;
								await db.master.update(
									{ username: telegram.api.message.getUsername(ctx) },
									master_in_group,
								);
							} else {
								await db.master.remove({
									group_id: master_in_group?.group_id,
								});

								await telegram.api.message.unpin(
									ctx,
									master_in_group?.group_id,
									master_in_group?.pin_id,
								);

								await telegram.api.message.removeMessageMarkup(
									master_in_group?.group_id,
									master_in_group?.pin_id,
								);
							}
						});
					}
				} else {
					await telegram.api.message.send(
						ctx,
						telegram.api.message.getChatID(ctx),
						translate(lang.language, "hears_missing_photo_caption"),
					);
				}
			} else {
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "hears_not_you_master"),
				);
			}
		}
	});

	bot.callbackQuery("upvote", async (ctx) => {
		await vote(ctx, "upvote");
	});
	bot.callbackQuery("downvote", async (ctx) => {
		await vote(ctx, "downvote");
	});
};

export { hearsPhoto };
export default hearsPhoto;
