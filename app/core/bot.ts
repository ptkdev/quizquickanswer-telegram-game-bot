import { connect } from "@app/functions/common/database/index";
import { getUser } from "@app/functions/common/database/users";
import quit from "@app/functions/commands/quit";
import start from "@app/functions/commands/start";
import master from "@app/functions/commands/master";
import score from "@app/functions/commands/score";
import top10 from "@app/functions/commands/top10";
import voteQuestion from "@app/functions/commands/votequestion";
import launch from "@app/functions/commands/launch";
import hears from "@app/functions/hears";

/**
 * Start bot
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
(async () => {
	connect();
	await quit();
	await start();
	await master();
	await top10();
	await score();
	await voteQuestion();
	await hears();

	await launch();
})();
