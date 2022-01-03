import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const execSyncWrapper = (command) => {
	let stdout: string | null = null;
	try {
		stdout = execSync(command).toString().trim();
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
	}
	return stdout;
};

const main = () => {
	const gitBranch = execSyncWrapper("git rev-parse --abbrev-ref HEAD");
	const gitCommitHash = execSyncWrapper("git rev-parse --short=7 HEAD");

	const obj = {
		gitBranch,
		gitCommitHash,
	};

	const filePath = path.resolve("app/configs", "version.json");
	const fileContents = JSON.stringify(obj, null, 2);

	fs.writeFileSync(filePath, fileContents);
	// eslint-disable-next-line no-console
	console.log(`Wrote the following contents to ${filePath}\n${fileContents}`);
};

main();
