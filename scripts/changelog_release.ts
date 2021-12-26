/**
 * Version
 * =====================
 * Increment package.json version
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import * as fs from "fs";

if (fs.existsSync("./CHANGELOG.md")) {
	fs.readFile("./CHANGELOG.md", "utf8", (err, data) => {
		if (err) {
			console.log(err);
		}

		const changelog = data.match(/\n([\s\S]*)-->\n/gm);
		changelog?.forEach((c) => {
			fs.writeFile("./CHANGELOG_RELEASE.txt", c, function writeJSON(err) {
				if (err) {
					console.log(err);
				}
			});
		});
	});
}
