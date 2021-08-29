import { connectDB, disconnectDB } from "@app/functions/common/api/database/connect";
import commands from "@app/routes/commands";

/**
 * Start bot
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
(async () => {
	await connectDB();

	await commands.quit();
	await commands.start();
	await commands.master();
	await commands.top10();
	await commands.score();
	await commands.voteQuestion();
	await commands.hears();

	await commands.launch();
})();

process.on("SIGINT", async function (params) {
	// on Cntr-C
	await disconnectDB();
});

process.once("SIGUSR2", async function () {
	// On nodemon refresh
	await disconnectDB();
});
