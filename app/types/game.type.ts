/**
 * GameInterface
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import { TelegramUserInterface } from "@app/types/databases.type.js";

/**
 * GameInterface
 * =====================
 *
 * @interface [GameInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/types/game.type.ts)
 *
 * @param { string } question - game question
 * @param { string } description - game tip
 * @param { number } group_id - group id fron user playing
 *
 */
export interface GameInterface extends TelegramUserInterface {
	/**
	 * GameInterface from TelegramUserInterface
	 * =====================
	 *
	 * @param { string } question - game question
	 *
	 */
	question?: string;
	/**
	 * GameInterface from TelegramUserInterface
	 * =====================
	 *
	 * @param { string } description - game tip
	 *
	 */
	description?: string;
	/**
	 * GameInterface from TelegramUserInterface
	 * =====================
	 *
	 * @param { number } group_id - group id fron user playing
	 *
	 */
	group_id?: number;
}
