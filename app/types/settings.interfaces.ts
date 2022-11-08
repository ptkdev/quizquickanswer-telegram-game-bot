/**
 * Settings Interfaces
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */

/**
 * SettingsInterface
 * =====================
 *
 * @interface [SettingsInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/types/game.interfaces.ts)
 *
 * @param { string } language - language
 * @param { boolean } pin_message - pin message to the chat
 * @param { number } group_id - group id fron user playing
 *
 */
export interface SettingsInterface {
	/**
	 * SettingsInterface
	 * =====================
	 *
	 * @param { string } language - language
	 *
	 */
	language: string;
	/**
	 * SettingsInterface
	 * =====================
	 *
	 * @param { string } pin_message - pin message to the chat
	 *
	 */
	pin_message: boolean;
	/**
	 * SettingsInterface
	 * =====================
	 *
	 * @param { number } group_id - group id fron user playing
	 *
	 */
	group_id: number;
}
