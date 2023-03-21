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
	 */
	upvotes_2021?: number;
	upvotes_2022?: number;
	upvotes_2023?: number;
	upvotes_1_2023?: number;
	upvotes_2_2023?: number;
	upvotes_3_2023?: number;
	upvotes_4_2023?: number;
	upvotes_5_2023?: number;
	upvotes_6_2023?: number;
	upvotes_7_2023?: number;
	upvotes_8_2023?: number;
	upvotes_9_2023?: number;
	upvotes_10_2023?: number;
	upvotes_11_2023?: number;
	upvotes_12_2023?: number;
	upvotes_2024?: number;
	upvotes_1_2024?: number;
	upvotes_2_2024?: number;
	upvotes_3_2024?: number;
	upvotes_4_2024?: number;
	upvotes_5_2024?: number;
	upvotes_6_2024?: number;
	upvotes_7_2024?: number;
	upvotes_8_2024?: number;
	upvotes_9_2024?: number;
	upvotes_10_2024?: number;
	upvotes_11_2024?: number;
	upvotes_12_2024?: number;
	upvotes_2025?: number;
	upvotes_1_2025?: number;
	upvotes_2_2025?: number;
	upvotes_3_2025?: number;
	upvotes_4_2025?: number;
	upvotes_5_2025?: number;
	upvotes_6_2025?: number;
	upvotes_7_2025?: number;
	upvotes_8_2025?: number;
	upvotes_9_2025?: number;
	upvotes_10_2025?: number;
	upvotes_11_2025?: number;
	upvotes_12_2025?: number;
	/**
	 * Questions Interface
	 * =====================
	 *
	 * @interface [QuestionsUserInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/webcomponent/types/databases.interfaces.ts)
	 *
	 *
	 */
	downvotes_2021?: number;
	downvotes_2022?: number;
	downvotes_2023?: number;
	downvotes_1_2023?: number;
	downvotes_2_2023?: number;
	downvotes_3_2023?: number;
	downvotes_4_2023?: number;
	downvotes_5_2023?: number;
	downvotes_6_2023?: number;
	downvotes_7_2023?: number;
	downvotes_8_2023?: number;
	downvotes_9_2023?: number;
	downvotes_10_2023?: number;
	downvotes_11_2023?: number;
	downvotes_12_2023?: number;
	downvotes_2024?: number;
	downvotes_1_2024?: number;
	downvotes_2_2024?: number;
	downvotes_3_2024?: number;
	downvotes_4_2024?: number;
	downvotes_5_2024?: number;
	downvotes_6_2024?: number;
	downvotes_7_2024?: number;
	downvotes_8_2024?: number;
	downvotes_9_2024?: number;
	downvotes_10_2024?: number;
	downvotes_11_2024?: number;
	downvotes_12_2024?: number;
	downvotes_2025?: number;
	downvotes_1_2025?: number;
	downvotes_2_2025?: number;
	downvotes_3_2025?: number;
	downvotes_4_2025?: number;
	downvotes_5_2025?: number;
	downvotes_6_2025?: number;
	downvotes_7_2025?: number;
	downvotes_8_2025?: number;
	downvotes_9_2025?: number;
	downvotes_10_2025?: number;
	downvotes_11_2025?: number;
	downvotes_12_2025?: number;
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
