import { config } from "dotenv";

config();

export default {
	telegram: {
		// from @botfather on telegram
		token: process.env.BOT_TOKEN || "1234:asdfghjkl",
	},

	mode: "poll", // or webhook
	webhook: {
		url: process.env.BOT_WEBHOOK_URL || "https://sample.host.com:8443",
		port: process.env.BOT_WEBHOOK_PORT || 8443,
		certs_path: process.env.BOT_WEBHOOK_CERTS_PATH || "certs",
		self_signed: process.env.BOT_WEBHOOK_SELF_SIGNED || true,
	},

	// mongodb
	database: { URL: process.env.MONGODB || "mongodb://localhost:27017/quizquickanswerdb" },

	// Debug
	debug: process.env.DEBUG || "disabled",

	// LOGS
	// https://github.com/ptkdev/ptkdev-logger
	logger: {
		path: {
			debug_log: "./logs/debug.log",
			error_log: "./logs/errors.log",
		},
		language: "en",
		colors: true,
		debug: process.env.LOGGER || "enabled",
		info: process.env.LOGGER || "enabled",
		warning: process.env.LOGGER || "enabled",
		error: process.env.LOGGER || "enabled",
		sponsor: process.env.LOGGER || "enabled",
		write: process.env.LOGGER_WRITE || false,
		type: "log",
	},
};
