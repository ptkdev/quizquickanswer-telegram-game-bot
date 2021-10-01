{
	"server": {
		"port": 5000
	},
	"debug": true,
	"telegram": {
		"username": "BOT_USERNAME",
		"token": "BOT_TOKEN"
	},
	"database": { "URL": "mongodb://localhost:27017/quizquickanswerdb" },
	"logger": {
		"path": { "debug_log": "./logs/debug.log", "error_log": "./logs/errors.log" },
		"language": "en",
		"colors": "enabled",
		"debug": "enabled",
		"info": "enabled",
		"warning": "enabled",
		"error": "enabled",
		"sponsor": "enabled",
		"write": "disabled",
		"type": "log"
	}
}
