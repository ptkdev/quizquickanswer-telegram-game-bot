import quit from "@app/functions/commands/quit";
import start from "@app/functions/commands/start";
import master from "@app/functions/commands/master";
import score from "@app/functions/commands/score";
import top10 from "@app/functions/commands/top10";
import voteQuestion from "@app/functions/commands/votequestion";
import launch from "@app/functions/commands/launch";
import hears from "@app/functions/commands/hears";
import hearsPhoto from "@app/functions/commands/hearsphoto";
import admin from "@app/functions/commands/admin";
import settings from "@app/functions/commands/settings";
import actions from "@app/functions/commands/actions";

const commands = {
	quit,
	start,
	master,
	score,
	top10,
	voteQuestion,
	launch,
	hears,
	settings,
	hearsPhoto,
	admin,
	actions,
};

export { quit, start, master, score, top10, voteQuestion, launch, hears, settings, hearsPhoto, admin, actions };
export default commands;
