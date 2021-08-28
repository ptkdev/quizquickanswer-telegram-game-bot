/**
 * Master
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import bot from "@app/functions/telegraf";
import translate from "@app/functions/translate";
import { getMaster, addMaster, updateMaster } from "@app/functions/common/api/database/master";
import { TelegramUserInterface } from "@app/types/databases.type";

/**
 * command: /master
 * =====================
 * Set master game
 *
 */
const master = async (): Promise<void> => {
	bot.command("master", async (ctx) => {
		if (ctx.message.chat.id < 0) {
			// is group chat
			if (
				ctx.update.message.text.trim() === "/master" ||
				ctx.update.message.text.trim() === "/master@QuizQuickAnswerBot"
			) {
				ctx.telegram.sendMessage(ctx.message.chat.id, translate("master_command_empty"));
			} else {
				const username = ctx.update.message.text.replace("/master ", "").replace("@", "").trim();

				const json = {
					id: 0,
					is_bot: false,
					first_name: "",
					username: username,
					language_code: "",
					question: "",
					description: "",
					group_id: ctx.message.chat.id,
				};

				const master: TelegramUserInterface = await getMaster({ group_id: ctx.message.chat.id });
				if (master) {
					await updateMaster({}, json);
				} else {
					await addMaster(json);
				}
				ctx.telegram.sendMessage(
					ctx.message.chat.id,
					translate("master_command_success", {
						username: username,
						bot_username: ctx.botInfo.username,
					}),
				);
			}
		} else {
			ctx.telegram.sendMessage(ctx.message.chat.id, translate("command_only_group"));
		}
	});
};

export { master };
export default master;
