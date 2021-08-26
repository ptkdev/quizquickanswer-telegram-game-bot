import commands from "@app/routes/commands";

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
	await commands.quit();
	await commands.start();
	await commands.master();
	await commands.top10();
	await commands.score();
	await commands.voteQuestion();
	await commands.hears();

	await commands.launch();
})();
