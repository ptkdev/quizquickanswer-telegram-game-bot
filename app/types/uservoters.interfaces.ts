/**
 * UserVoters Interfaces
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */

/**
 * UserVoters Interface
 * =====================
 *
 * @interface [UserVotersInterface](https://github.com/ptkdev/quizquickanswer-telegram-game-bot/blob/main/app/types/game.interfaces.ts)
 *
 * @param { string[]  } upvotes - user id of the voters that had upvoted
 * @param {  string[]  } downvotes - user id of the voters that had downvoted
 *
 */
export interface UserVotersInterface {
	/**
	 * UserVotersInterface
	 * =====================
	 *
	 * @param { string[]  } upvotes - user id of the voters that had upvoted
	 *
	 */
	upvotes: string[];
	/**
	 * UserVotersInterface
	 * =====================
	 *
	 * @param { string[]  } downvotes - user id of the voters that had downvoted
	 *
	 */
	downvotes: string[];
}
