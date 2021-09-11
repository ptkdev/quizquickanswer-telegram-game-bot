import { QuestionsInterface, TelegramUserInterface, MasterInterface } from "@app/types/databases.type";

/**
 * Get emoji helper
 * =====================
 * Get an emoji by indexes position
 *
 * @param {number} index - index refered to the top 10 position
 * @return {string} medal_emoji - emoji
 */
const getTopScoreEmoji = (index: number): string => {
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
const getEmptyTelegramUserInterface = (error: any): TelegramUserInterface => {
	return {
		id: 0,
		is_bot: false,
		first_name: "",
		username: "",
		language_code: "",
		group_id: 0,
		question: "",
		description: "",
		score: 0,
		error,
	};
};

/**
 * Get empty master user with error
 * =====================
 * Get an object of master user with all the field empty and relative error
 *
 * @param {any} error - error message
 * @return {MasterInterface} user - empty master user
 */
const getEmptyMasterInterface = (error: any): MasterInterface => {
	return {
		id: 0,
		is_bot: false,
		first_name: "",
		username: "",
		language_code: "",
		group_id: 0,
		question: "",
		description: "",
		score: 0,
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
const getEmptyQuestionsInterface = (error: any): QuestionsInterface => {
	return {
		username: "",
		group_id: 0,
		good_questions: 0,
		bad_questions: 0,
		error,
	};
};

/**
 * Get similarity of two words
 * =====================
 * Get a number from 0 to 1 representing the similarity of two words
 *
 * @param {string} s1 - First string
 * @param {string} s2 - Second string
 * @return {number} percentage - the value from 0 to 1 representing the similarity
 */
const similarity = (s1: string, s2: string): number => {
	let longer = s1;
	let shorter = s2;
	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}
	const longerLength: number = longer.length;
	if (longerLength == 0) {
		return 1.0;
	}
	return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength.toString());
};

function editDistance(s1: string, s2: string) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();

	const costs: number[] = [];
	for (let i = 0; i <= s1.length; i++) {
		let lastValue = i;
		for (let j = 0; j <= s2.length; j++) {
			if (i == 0) {
				costs[j] = j;
			} else {
				if (j > 0) {
					let newValue = costs[j - 1];
					if (s1.charAt(i - 1) != s2.charAt(j - 1)) {
						newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
					}
					costs[j - 1] = lastValue;
					lastValue = newValue;
				}
			}
		}
		if (i > 0) {
			costs[s2.length] = lastValue;
		}
	}
	return costs[s2.length];
}

export {
	getEmptyQuestionsInterface,
	getEmptyTelegramUserInterface,
	getEmptyMasterInterface,
	getTopScoreEmoji,
	similarity,
};
export default {
	getEmptyQuestionsInterface,
	getEmptyTelegramUserInterface,
	getEmptyMasterInterface,
	getTopScoreEmoji,
	similarity,
};
