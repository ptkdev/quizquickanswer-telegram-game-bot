/**
 * GameInterface
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import type { MasterInterface } from "@app/types/master.interfaces";

/**
 * GameInterface
 * =====================
 *
 * @interface [GameInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/types/game.interfaces.ts)
 *
 * @param { string } question - game question
 * @param { string } description - game tip
 * @param { number } group_id - group id fron user playing
 *
 */
export interface GameInterface extends MasterInterface {
	/**
	 * GameInterface from MasterInterface
	 * =====================
	 *
	 * @param { string } question - game question
	 *
	 */
	question?: string;
	/**
	 * GameInterface from MasterInterface
	 * =====================
	 *
	 * @param { string } description - game tip
	 *
	 */
	description?: string;
	/**
	 * GameInterface from MasterInterface
	 * =====================
	 *
	 * @param { number } group_id - group id fron user playing
	 *
	 */
	group_id: number;
}
