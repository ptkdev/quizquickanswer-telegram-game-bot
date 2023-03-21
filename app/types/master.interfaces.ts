/**
 * Master Interfaces
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */

/**
 * Master User Interface
 * =====================
 *
 *
 * @interface [MasterUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
 *
 * @param { number } id - telegram id
 * @param { boolean } is_bot - is user a bot
 * @param { string } first_name - user name from telegram
 * @param { string } username - user username from telegram
 * @param { string } language_code - user code language from OS
 * @param { string } question - user submitted question
 * @param { string } description - user submitted question tip
 * @param { number } score - user current score
 * @param { number } group_id - users group id
 * @param { string } error - error message
 *
 */
export interface MasterInterface {
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { string } id - telegram id
	 *
	 */
	id: number | string;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { boolean } is_bot - is user a bot
	 *
	 */
	is_bot?: boolean;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { string } first_name - user name from telegram
	 *
	 */
	first_name?: string;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { string } username - user username from telegram
	 *
	 */
	username?: string;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { string } language_code - user code language from OS
	 *
	 */
	language_code?: string;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { string } question - user submitted question
	 *
	 */
	question?: string;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { string } description - user submitted question tip
	 *
	 */
	description?: string;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { number } score - user current score
	 *
	 */
	score_2021: number;
	score_2022: number;
	score_2023: number;
	score_2024: number;
	score_2025: number;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { number } pin_id - message pinned id
	 *
	 */
	pin_id: number;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { number } group_id - users group id
	 *
	 */
	group_id: number;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { number } win_message_id - id of win message
	 *
	 */
	win_message_id: number;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { number } message_thread_id - thread id if group is a topic
	 *
	 */
	message_thread_id: number;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { string } timezone - timezone
	 *
	 */
	timezone: string;
	off: boolean;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { string } error - error message
	 *
	 */
	error?: string;
}
