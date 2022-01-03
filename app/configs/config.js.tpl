module.exports = {
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
	debug: process.env.DEBUG || true,

	// LOGS
	logger: {
		path: {
			debug_log: "./logs/debug.log",
			error_log: "./logs/errors.log",
		},
		language: "en", // set language of log type, NOTE: please help with translations! (optional, default en - values: en|it|pl)
		colors: true, // enable/disable colors in terminal (optional, default enabled - values: true|enabled or false|disabled)
		debug: process.env.DEBUG || true, // enable/disable all logs with method debug (optional, default enabled - values: true|enabled or false|disabled)
		info: true, // enable/disable all logs with method info (optional, default enabled - values: true|enabled or false|disabled)
		warning: true, // enable/disable all logs with method warning (optional, default enabled -  values: true|enabled or false|disabled)
		error: true, // enable/disable all logs with method errors (optional, default enabled - values: true|enabled or false|disabled)
		sponsor: true, // enable/disable all logs with method sponsor (optional, default enabled - values: true|enabled or false|disabled)
		write: false, // write the logs into a file, you need set path values (optional, default disabled - values: true|enabled or false|disabled)
		type: "log", // format of logs in files (optional, default log - values: log|json)
	},
};
