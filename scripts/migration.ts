/* eslint-disable indent */
import configs from "../app/configs/config";
import { Schema, model, connect } from "mongoose";
import type { TelegramUserInterface, GameInterface, QuestionsInterface } from "../app/types/databases.type";

const user_schema = new Schema<TelegramUserInterface>({
	id: { type: String, required: true },
	is_bot: { type: Boolean, required: true },
	first_name: { type: String, required: true },
	username: { type: String, required: true },
	launguage_code: String,
});
const master_schema = new Schema<TelegramUserInterface>({
	id: { type: String, required: true },
	is_bot: { type: Boolean, required: true },
	first_name: { type: String, required: true },
	username: { type: String, required: true },
	launguage_code: String,
	question: String,
	description: String,
	group_id: Number,
	score: Number,
});

const scores_schema = new Schema<TelegramUserInterface>({
	id: { type: String, required: true },
	is_bot: { type: Boolean, required: true },
	first_name: { type: String, required: true },
	username: { type: String, required: true },
	launguage_code: String,
	question: String,
	description: String,
	group_id: Number,
	score: Number,
});
const questions_schema = new Schema<QuestionsInterface>({
	username: { type: String, required: true },
	good_questions: { type: Number, required: true },
	bad_questions: { type: Number, required: true },
	group_id: { type: Number, required: true },
});

const user_model = model<TelegramUserInterface>("User", user_schema);
const master_model = model<GameInterface>("Master", master_schema);
const score_model = model<TelegramUserInterface>("Score", scores_schema);
const questions_model = model<QuestionsInterface>("Questions", questions_schema);

(async function (): Promise<void> {
	// 4. Connect to MongoDB
	await connect(configs.database.URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
})();

const getModel: any = (key) => {
	let model;

	console.log(key);
	switch (key) {
		case "users":
			model = user_model;
			break;
		case "questions":
			model = questions_model;
			break;
		case "master":
			model = master_model;
			break;
		case "scores":
			model = score_model;
			break;
	}
	return model;
};

(async function insertJSON(
	json = {
		// Inserire il JSON contenente gli user,master,score e questions
		users: [
			{
				id: 523350454,
				is_bot: false,
				first_name: "Ali",
				username: "ashd95",
				language_code: "it",
			},
			{
				id: 523350454,
				is_bot: false,
				first_name: "Ali",
				username: "ashd95",
				language_code: "it",
			},
			{
				id: 523350454,
				is_bot: false,
				first_name: "Ali",
				username: "ashd95",
				language_code: "it",
			},
			{
				id: 523350454,
				is_bot: false,
				first_name: "Ali",
				username: "ashd95",
				language_code: "it",
			},
			{
				id: 523350454,
				is_bot: false,
				first_name: "Ali",
				username: "ashd95",
				language_code: "it",
			},
		],
		master: [
			{
				id: 523350454,
				is_bot: false,
				first_name: "Ali",
				username: "ashd95",
				language_code: "it",
				question: "",
				description: "",
				group_id: -537763308,
			},
		],
		scores: [
			{
				id: 769630570,
				is_bot: false,
				first_name: "Vero",
				username: "DrVero",
				language_code: "it",
				question: "",
				description: "",
				group_id: -537763308,
				score: 10,
			},
			{
				id: 523350454,
				is_bot: false,
				first_name: "Ali",
				username: "ashd95",
				language_code: "it",
				question: "",
				description: "",
				group_id: -537763308,
				score: 50,
			},
		],
		questions: [
			{
				username: "DrVero",
				good_questions: 2,
				bad_questions: 3,
				group_id: -537763308,
			},
			{
				username: "ashd95",
				good_questions: 2,
				bad_questions: 0,
				group_id: -537763308,
			},
		],
	},
): Promise<void> {
	Object.keys(json).forEach((key) =>
		getModel(key).insertMany(json[key], function (err, users) {
			if (err) {
				return err;
			}
		}),
	);
	console.log(`Migration completed`);
})();
