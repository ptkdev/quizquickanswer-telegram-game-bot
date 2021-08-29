import { QuestionsInterface, TelegramUserInterface } from "@app/types/databases.type";

/**
 * Get emoji helper
 * =====================
 * Get an emoji by indexes position
 *
 * @param {number} index - index refered to the top 10 position
 * @return {string} medal_emoji - emoji
 */
export const getTopScoreEmoji = (index: number): string => {
	let medal_emoji = "";
	switch (index) {
		case 0:
			medal_emoji = "🥇";
			break;
		case 1:
			medal_emoji = "🥈";
			break;
		case 2:
			medal_emoji = "🥉";
			break;
		case 3:
			medal_emoji = "4️⃣";
			break;
		case 4:
			medal_emoji = "5️⃣";
			break;
		case 5:
			medal_emoji = "6️⃣";
			break;
		case 6:
			medal_emoji = "7️⃣";
			break;
		case 7:
			medal_emoji = "8️⃣";
			break;
		case 8:
			medal_emoji = "9️⃣";
			break;
		case 9:
			medal_emoji = "💩";
			break;
	}
	return medal_emoji;
};

/**
 * Get empty telegram user with error
 * =====================
 * Get an object of telegram user with all the field empty and relative error
 *
 * @param {any} error - error message
 * @return {TelegramUserInterface} user - empty telegram user
 */
export const getEmptyTelegramUserInterface = (error: any): TelegramUserInterface => {
	return {
		id: 0,
		is_bot: false,
		first_name: "",
		username: "",
		language_code: "",
		group_id: 0,
		question: "",
		description: "",
		error,
	};
};

/**
 * Get empty Question interface with error
 * =====================
 * Get an object of questions interface with all the field empty and relative error
 *
 * @param {any} error - error message
 * @return {QuestionsInterface} question - empty telegram user
 */
export const getEmptyQuestionsInterface = (error: any): QuestionsInterface => {
	return {
		username: "",
		group_id: 0,
		good_questions: 0,
		bad_questions: 0,
		error,
	};
};
