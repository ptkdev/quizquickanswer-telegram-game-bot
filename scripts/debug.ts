/**
 * Disable debug
 * =====================
 * Check if configs/config.js has debug to off
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import * as fs from "fs";
import * as shell from "shelljs";
import { argv } from "yargs";

declare const __dirname: string;

const path = `${__dirname}/../app/configs/config.js`;

if (fs.existsSync(path)) {
	if (argv.enable) {
		shell.sed("-i", "process.env.DEBUG \\|\\| false", "process.env.DEBUG \\|\\| true", path);
	} else {
		shell.sed("-i", "process.env.DEBUG \\|\\| true", '"process.env.DEBUG \\|\\| false', path);
	}
}
