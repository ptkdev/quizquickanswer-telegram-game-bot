/**
 * Actions
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/telegraf";
import telegram from "@routes/api/telegram";
import { sendMessageToAllGroups } from "@app/functions/utils/admin";
import translate from "@translations/translate";

import logger from "@app/functions/utils/logger";

const actions = async (): Promise<void> => {
	bot.action(["message_all_groups", "set_user_score"], async (ctx) => {
		logger.info(`action: ${telegram.api.message.getActionType(ctx)}`, "actions.ts:actions()");

		switch (telegram.api.message.getActionType(ctx)) {
			case "message_all_groups":
				await sendMessageToAllGroups(ctx);
				break;
			case "set_user_score":
				console.log(telegram.api.message.getGroupID(ctx), ctx.update.callback_query);
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getGroupID(ctx),
					translate("admin_set_user_score_info_request"),
				);
				break;
			default:
				break;
		}
	});
};

export { actions };
export default actions;
