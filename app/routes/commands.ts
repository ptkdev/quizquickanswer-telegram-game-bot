import start from "@app/functions/commands/start";
import master from "@app/functions/commands/master";
import score from "@app/functions/commands/score";
import groups from "@app/functions/commands/groups";
import top10 from "@app/functions/commands/top10";
import launch from "@app/functions/commands/launch";
import hears from "@app/functions/commands/hears";
import hearsPhoto from "@app/functions/commands/hearsphoto";
import settings from "@app/functions/commands/settings";
import actions from "@app/functions/commands/actions";

const commands = {
	start,
	master,
	score,
	groups,
	top10,
	launch,
	hears,
	settings,
	hearsPhoto,
	actions,
};

export { start, master, score, groups, top10, launch, hears, settings, hearsPhoto, actions };
export default commands;
