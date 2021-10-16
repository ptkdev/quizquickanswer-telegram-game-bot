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
import connection from "@app/functions/api/database/connection";
import master from "@app/functions/api/database/master";
import questions from "@app/functions/api/database/questions";
import scores from "@app/functions/api/database/scores";
import users from "@app/functions/api/database/users";
import settings from "@app/functions/api/database/settings";

const db = {
	connection: connection,
	master: master,
	questions: questions,
	scores: scores,
	users: users,
	settings: settings,
};

export { db };
export default db;
