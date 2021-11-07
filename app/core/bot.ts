import db from "@routes/api/database";
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
import logger from "@app/functions/utils/logger";

(async () => {
	logger.info("Bot is starting...", "bot.ts:main()");

	await db.connection.connectDB();

	await commands.quit();
	await commands.start();
	await commands.admin();
	await commands.actions();
	await commands.master();
	await commands.top10();
	await commands.score();
	await commands.settings();
	await commands.hears();
	await commands.hearsPhoto();

	await commands.launch();
})();

process.on("SIGINT", async function () {
	// on CTRL-C
	await db.connection.disconnectDB();
});

process.once("SIGUSR2", async function () {
	// On nodemon refresh
	await db.connection.disconnectDB();
});

process.on("uncaughtException", function (error) {
	console.log("An error uncaughtException has occured. error is: %s", error);
	console.log("Process will restart now.");
	process.exit(1);
});

process.on("unhandledRejection", function (error) {
	console.log("An error unhandledRejection has occured. error is: %s", error);
	console.log("Process will restart now.");
	process.exit(1);
});
