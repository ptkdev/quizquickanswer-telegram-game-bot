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
import { TelegramUserInterface, QuestionsInterface } from "@app/types/databases.type";

/**
 * hears: any taxt from bot chat
 * =====================
 * Listen any text user write
 *
 */
const hears = async (): Promise<void> => {
	bot.on("text", async (ctx) => {
		if (ctx.message.chat.id > 0) {
			// is chat with bot
			const master: TelegramUserInterface = await db.master.get({ username: ctx.update.message.from.username });

			if (master?.username === ctx.update.message.from.username) {
				const text = ctx.update.message.text.split("-");

				const json: TelegramUserInterface = ctx.update.message.from;
				json.question = text[0]?.trim()?.toLowerCase();
				json.description = text[1]?.trim();
				json.group_id = master.group_id;

				if (json.question === undefined || json.question === "") {
					ctx.telegram.sendMessage(ctx.message.chat.id, translate("hears_missing_question"));
				} else if (json.description === undefined || json.description === "") {
					ctx.telegram.sendMessage(ctx.message.chat.id, translate("hears_missing_tip"));
				} else {
					await db.master.update({}, json);

					const quiz = await ctx.telegram.sendMessage(master.group_id, `⏱ ${json.description || ""}`);
					ctx.telegram.pinChatMessage(master.group_id, quiz.message_id, { disable_notification: true });
				}
			} else {
				ctx.telegram.sendMessage(ctx.message.chat.id, translate("hears_not_you_master"));
			}
		}

		if (ctx.message.chat.id < 0) {
			// is group
			const master: TelegramUserInterface = await db.master.get({ group_id: ctx.message.chat.id });

			if (ctx.update.message.text.trim().toLowerCase() == master.question.trim().toLowerCase()) {
				if (ctx.update.message.from.username) {
					const user_score: TelegramUserInterface = await db.scores.get({
						group_id: master.group_id,
						id: ctx.update.message.from.id,
					});

					const user_questions: QuestionsInterface = await db.questions.get({
						group_id: ctx.message.chat.id,
						username: ctx.update.message.from.username,
					});

					ctx.telegram.sendMessage(
						master.group_id,
						translate("hears_win", {
							first_name: ctx.update.message.from.first_name,
							username: ctx.update.message.from.username,
							bot_username: ctx.botInfo.username,
							answer: ctx.update.message.text.trim(),
							score: user_questions
								? (user_score?.score || 0) +
								  10 +
								  user_questions.good_questions -
								  user_questions.bad_questions
								: (user_score?.score || 0) + 10,
						}),
					);

					const json: TelegramUserInterface = ctx.update.message.from;
					json.question = "";
					json.description = "";
					json.group_id = ctx.message.chat.id;
					await db.master.update({ group_id: ctx.message.chat.id }, json);

					if (user_score) {
						user_score.score += 10;
						await db.scores.update(
							{
								group_id: master.group_id,
								id: ctx.update.message.from.id,
							},
							user_score,
						);
					} else {
						const json_score: TelegramUserInterface = ctx.update.message.from;
						json_score.score = 10;
						await db.scores.add(json_score);
					}
				} else {
					ctx.telegram.sendMessage(
						master.group_id,
						translate("hears_win_but_not_master", {
							first_name: ctx.update.message.from.first_name,
							master_first_name: master.first_name,
							master_username: master.username,
						}),
					);
				}
			}
		}
	});
};

export { hears };
export default hears;
