/**
 * Translate
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import translations from "@app/routes/translations";

interface TranslateParamsInterface {
	username?: string;
	bot_username?: string;
	first_name?: string;
	master_first_name?: string;
	master_username?: string;
	text?: string;
	emoji?: string;
	answer?: string;
	score?: number;
}

/**
 * Replace Params
 * =====================
 * If translation text is: hi {name} how are you?
 * This function replace {name} token with correct value
 *
 * @param {string} text - text of current phrase to translate (mandatory)
 * @param {Object} language_params - object with token to replace, example: {name:"alex"} (mandatory)
 *
 * @return {string} text - text with replaced token
 *
 */
const replaceParams = (text: string, language_params: TranslateParamsInterface): string => {
	for (const [key, value] of Object.entries(language_params)) {
		text = text.replace(`##${key}##`, value);
	}

	return text;
};

/**
 * Check
 * =====================
 * Check if exist translation in selected language, if not exist get string of phrase from "en" translation
 *
 * @param {string} language_id - key of translation phrase from /translations/*.json (mandatory)
 *
 * @return {string} text - text of available translation
 *
 */
const check = (language_id: string): string => {
	return translations["it"][language_id]; // TODO: Get from "settings" database
};

/**
 * Translate
 * =====================
 * Get correct translation
 *
 * @param {string} language_id - key of translation phrase from /translations/*.json (mandatory)
 * @param {Object} language_params - object with token to replace, example: {name:"alex"} (optional)
 *
 * @return {string} text - text of available translation
 *
 */
const translate = (language_id: string, language_params?: TranslateParamsInterface): string => {
	let text = "";
	text = check(language_id);
	if (language_params) {
		text = replaceParams(text, language_params);
	}

	return text;
};

export { translate };
export default translate;
