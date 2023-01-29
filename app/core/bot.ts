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
import db from "@routes/api/database";
import commands from "@app/routes/commands";
import logger from "@app/functions/utils/logger";

(async () => {
	logger.info("Bot is starting...", "bot.ts:main()");

	await db.connection.connectDB();

	await commands.start();
	await commands.actions();
	await commands.master();
	await commands.version();
	await commands.top10();
	await commands.topYearly();
	// await commands.topDaily();
	await commands.topMonthly();
	await commands.score();
	await commands.groups();
	await commands.ping();
	await commands.show();
	await commands.settings();
	await commands.hears();
	await commands.hearsPhoto();

	await commands.launch();
})();

process.on("SIGINT", async function () {
	// on CTRL-C
	await db.connection.disconnectDB();
	logger.info("Process will restart now.", "bot.ts:SIGINT");
});

process.once("SIGUSR2", async function () {
	// On nodemon refresh
	await db.connection.disconnectDB();
	logger.info("Process will restart now.", "bot.ts:SIGUSR2");
});

process.on("uncaughtException", function (error) {
	logger.error(
		`An error uncaughtException has occured. error is: ${JSON.stringify(error)}`,
		"bot.ts::uncaughtException",
	);
	logger.error("Process will restart now.", "bot.ts:uncaughtException");
	process.exit(1);
});

process.on("unhandledRejection", function (error) {
	logger.error(
		`An error unhandledRejection has occured. error is: ${JSON.stringify(error)}`,
		"bot.ts::unhandledRejection",
	);
	logger.error("Process will restart now.", "bot.ts:unhandledRejection");
	process.exit(1);
});
