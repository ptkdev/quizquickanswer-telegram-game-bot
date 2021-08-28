import connect from "@app/functions/common/api/database/connect";
import master from "@app/functions/common/api/database/master";
import questions from "@app/functions/common/api/database/questions";
import scores from "@app/functions/common/api/database/scores";
import users from "@app/functions/common/api/database/users";

const db = {
	connect: connect,
	master: master,
	questions: questions,
	scores: scores,
	users: users,
};

export { db };
export default db;
