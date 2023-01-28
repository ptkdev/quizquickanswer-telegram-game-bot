import start from "@app/functions/commands/start";
import master from "@app/functions/commands/master";
import score from "@app/functions/commands/score";
import groups from "@app/functions/commands/groups";
import ping from "@app/functions/commands/ping";
import show from "@app/functions/commands/show";
import top10 from "@app/functions/commands/top10";
import topDaily from "@app/functions/commands/top_daily";
import topMonthly from "@app/functions/commands/top_monthly";
import topYearly from "@app/functions/commands/top_yearly";
import launch from "@app/functions/commands/launch";
import hears from "@app/functions/commands/hears";
import hearsPhoto from "@app/functions/commands/hearsphoto";
import settings from "@app/functions/commands/settings";
import actions from "@app/functions/commands/actions";
import version from "@app/functions/commands/version";

const commands = {
	start,
	master,
	score,
	groups,
	ping,
	show,
	top10,
	topDaily,
	topMonthly,
	topYearly,
	launch,
	hears,
	settings,
	hearsPhoto,
	actions,
	version,
};

export {
	start,
	master,
	score,
	groups,
	ping,
	show,
	top10,
	topDaily,
	topMonthly,
	topYearly,
	launch,
	hears,
	settings,
	hearsPhoto,
	actions,
	version,
};
export default commands;
