/**
 * admin
 * =====================
 * Admin
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import db from "@routes/api/database";
import logger from "./logger";

import type { MasterInterface } from "@app/types/master.interfaces";

/**
 * Send message to all groups
 * =====================
 * Send a message to all groups
 *
 * @param {number} index - index refered to the top 10 position
 * @param {any} ctx - Telegram context
 */
const sendMessageToAllGroups = async (): Promise<void> => {
	const masters: MasterInterface[] = await db.master.getMultiple({});
	const groups = masters
		.map((m) => m.group_id)
		.filter((elem, index, self) => {
			return index === self.indexOf(elem);
		});
	logger.info(groups.join(" "));
};

/**
 * Set specific user score
 * =====================
 * Set a specific score to an user in a specific group
 *
 * @param {any} ctx - Telegram context
 * @param {string} score - score to set
 * @param {string} group_id - group id where the score needs to be updated
 */
const setUserScore = async (): Promise<void> => {
	logger.info("setUserScore function");
};

export { sendMessageToAllGroups, setUserScore };
export default {
	sendMessageToAllGroups,
	setUserScore,
};
