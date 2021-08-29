/**
 * Databases Interfaces
 * =====================
 *
 * Funny quiz game for telegram groups
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */

/**
 * Telegram User Interface
 * =====================
 *
 * @Context: telegram.api.message.getFullUser(ctx)
 *
 * @interface [TelegramUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
 *
 * @param { number } id - telegram
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
export interface TelegramUserInterface {
	/**
	 * Telegram User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { number } id - telegram
	 *
	 */
	id: number;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { boolean } is_bot - is user a bot
	 *
	 */
	is_bot?: boolean;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } first_name - user name from telegram
	 *
	 */
	first_name?: string;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } username - user username from telegram
	 *
	 */
	username?: string;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } language_code - user code language from OS
	 *
	 */
	language_code?: string;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } question - user submitted question
	 *
	 */
	question?: string;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } description - user submitted question tip
	 *
	 */
	description?: string;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { number } score - user current score
	 *
	 */
	score?: number;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { number } group_id - users group id
	 *
	 */
	group_id?: number;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } error - error message
	 *
	 */
	error?: string;
}

/**
 * Game Interface
 * =====================
 *
 *
 * @interface [GameInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
 *
 * @param { object } master - master of the game
 *
 */
export interface GameInterface {
	/**
	 * GameInterface
	 * =====================
	 *
	 * @interface [GameInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { object } - - master of the game
	 *
	 */
	master: TelegramUserInterface;
}

/**
 * Question Interface
 * =====================
 *
 *
 * @interface [QuestionInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
 *
 * @param { string } username - user username from telegram
 * @param { number } good_questions - user good questions count
 * @param { number } bad_questions - user bad questions count
 * @param { string } group_id - user group id
 * @param { string } error - error message;
 *
 */
export interface QuestionsInterface {
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } username - user username from telegram
	 *
	 */
	username?: string;
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } good_questions - user good questions count
	 *
	 */
	good_questions?: number;
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { number } bad_questions - user bad questions count
	 *
	 */
	bad_questions?: number;
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } group_id - user group id
	 *
	 */
	group_id?: number;
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } error - error message
	 *
	 */
	error?: string;
}
