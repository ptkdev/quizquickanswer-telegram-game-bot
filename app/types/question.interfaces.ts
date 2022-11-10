/**
 * Question Interfaces
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
import type { VotersInterface } from "@app/types/voters.interfaces";

/**
 * Question Interface
 * =====================
 *
 *
 * @interface [QuestionInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
 *
 * @param { string } user_id - user id from telegram
 * @param { number } upvotes - user good questions count
 * @param { number } downvotes - user bad questions count
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
	 * @interface [QuestionsInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { string } user_id - user id from telegram
	 *
	 */
	user_id: number | string;
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { string } upvotes - user good questions count
	 *
	 */
	upvotes_2021?: number;
	upvotes_2022?: number;
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { number } downvotes - user bad questions count
	 *
	 */
	downvotes_2021?: number;
	downvotes_2022?: number;
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { string } group_id - user group id
	 *
	 */
	group_id: number;
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { string } error - error message
	 *
	 */
	error?: string;
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 * @param { VotersInterface } voters - users that have voted on the current question;
	 *
	 */
	voters: VotersInterface;
}
