/**
 * Migration script for the database.
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import configs from "../app/configs/config";
import { Schema, model, connect, disconnect } from "mongoose";
import type { TelegramUserInterface, GameInterface, QuestionsInterface } from "../app/types/databases.type";

const user_schema = new Schema<TelegramUserInterface>({
	id: { type: String },
	is_bot: { type: Boolean },
	first_name: { type: String },
	username: { type: String },
	launguage_code: String,
});

const master_schema = new Schema<TelegramUserInterface>({
	id: { type: String },
	is_bot: { type: Boolean },
	first_name: { type: String },
	username: { type: String },
	launguage_code: String,
	question: String,
	description: String,
	group_id: Number,
});

const scores_schema = new Schema<TelegramUserInterface>({
	id: { type: String },
	is_bot: { type: Boolean },
	first_name: { type: String },
	username: { type: String },
	launguage_code: String,
	group_id: Number,
	score: Number,
});

const questions_schema = new Schema<QuestionsInterface>({
	username: { type: String },
	good_questions: { type: Number },
	bad_questions: { type: Number },
	group_id: { type: Number },
});

const user_model = model<TelegramUserInterface>("Users", user_schema, "users");
const master_model = model<GameInterface>("Master", master_schema, "master");
const score_model = model<TelegramUserInterface>("Scores", scores_schema, "scores");
const questions_model = model<QuestionsInterface>("Questions", questions_schema, "questions");

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

(async function insertJSON(): Promise<void> {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const json1 = require("../databases/game.json");
	Object.keys(json1).forEach((key) =>
		getModel("master").insertMany(json1[key], function (err) {
			if (err) {
				console.log(err);
			}
		}),
	);

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const json2 = require("../databases/users.json");
	Object.keys(json2).forEach((key) =>
		getModel("users").insertMany(json2[key], function (err) {
			if (err) {
				console.log(err);
			}
		}),
	);

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const json3 = require("../databases/questions.json");
	Object.keys(json3).forEach((key) =>
		getModel("questions").insertMany(json3[key], function (err) {
			if (err) {
				console.log(err);
			}
		}),
	);

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const json4 = require("../databases/scores.json");
	Object.keys(json4).forEach((key) =>
		getModel("scores").insertMany(json4[key], function (err) {
			if (err) {
				console.log(err);
			}
		}),
	);

	console.log(`Migration completed`);
})();

process.on("SIGINT", async function (params) {
	await disconnect();
	process.exit(0);
});
