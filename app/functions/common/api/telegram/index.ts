import message from "@app/functions/common/api/telegram/message";
import bot from "@app/functions/common/api/telegram/bot";

const telegram = {
	api: {
		message: message,
		bot: bot,
	},
};

export { telegram };
export default telegram;
