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
	score: number;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { number } group_id - users group id
	 *
	 */
	group_id: number;
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
 * @param { VotersInterface } message - users that have voted on the current question;
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
	username: string;
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } good_questions - user good questions count
	 *
	 */
	good_questions: number;
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { number } bad_questions - user bad questions count
	 *
	 */
	bad_questions: number;
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } group_id - user group id
	 *
	 */
	group_id: number;
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
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { VotersInterface } voters - users that have voted on the current question;
	 *
	 */
	voters: VotersInterface;
}

/**
 * Master User Interface
 * =====================
 *
 *
 * @interface [MasterUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
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
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { number } id - telegram id
	 *
	 */
	id: number;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { boolean } is_bot - is user a bot
	 *
	 */
	is_bot: boolean;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } first_name - user name from telegram
	 *
	 */
	first_name: string;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } username - user username from telegram
	 *
	 */
	username: string;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } language_code - user code language from OS
	 *
	 */
	language_code: string;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } question - user submitted question
	 *
	 */
	question: string;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } description - user submitted question tip
	 *
	 */
	description: string;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { number } score - user current score
	 *
	 */
	score: number;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { number } group_id - users group id
	 *
	 */
	group_id: number;
	/**
	 * Master Interface
	 * =====================
	 *
	 * @interface [MasterInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } error - error message
	 *
	 */
	error?: string;
}

/**
 * SettingsInterface
 * =====================
 *
 * @interface [SettingsInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/types/game.type.ts)
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

/**
 * VotersInterface
 * =====================
 *
 * @interface [VotersInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/types/game.type.ts)
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
	 * @param { string | number } message_id - id of the message/question
	 *
	 */
	message_id: string | number;
	/**
	 * VotersInterface
	 * =====================
	 *
	 * @param { string[] } users - user id of the voters
	 *
	 */
	users: string[];
}
