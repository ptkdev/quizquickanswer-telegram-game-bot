/**
 * Voters Interfaces
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import type { UserVotersInterface } from "@app/types/uservoters.interfaces";

/**
 * Voters Interface
 * =====================
 *
 * @interface [VotersInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/types/game.interfaces.ts)
 *
 * @param { string | number } message_id - message id
 * @param {  string[] } voters - user id of the voters
 *
 */
export interface VotersInterface {
	/**
	 * VotersInterface
	 * =====================
	 *
	 * @param { number } message_id - id of the message/question
	 *
	 */
	message_id: number;
	/**
	 * VotersInterface
	 * =====================
	 *
	 * @param { UserVotersInterface } users - user id of the voters
	 *
	 */
	users: UserVotersInterface;
}
