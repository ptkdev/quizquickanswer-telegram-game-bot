/**
 * Connect to mongo
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import configs from "@configs/config";
import Mongoose from "mongoose";
import { logger } from "@app/functions/utils/logger";

let database: Mongoose.Connection;

/**
 * MongoDB Connection
 * =====================
 * Connects to mongo DB
 *
 */
const connectDB = async (): Promise<void> => {
	if (database) {
		logger.info("trying to connect but have already a connection");
		return;
	}
	try {
		await Mongoose.connect(configs.database.URL, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
			useCreateIndex: true,
			maxPoolSize: 100,
			keepAlive: true,
			keepAliveInitialDelay: 3600,
		});
		database = Mongoose.connection;
		logger.info("Connected to database", "connections.ts:connectDB()");
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "connections.ts:connectDB()");
	}
};

/**
 * MongoDB Disconnection
 * =====================
 * Disconnect to mongo DB
 *
 */
const disconnectDB = async (): Promise<void> => {
	if (!database) {
		logger.info("tried to disconnect but dont have connections");
		return;
	}
	try {
		await Mongoose.disconnect(() => {
			logger.info("Disconnected from database", "connections.ts:disconnectDB()");
			process.exit(0);
		});
	} catch (error: unknown) {
		logger.error(JSON.stringify(error || ""), "connections.ts:disconnectDB()");
	}
};

export { connectDB, disconnectDB };
export default { connectDB, disconnectDB };
