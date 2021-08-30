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
		});
		database = Mongoose.connection;
		logger.info("Connected to database");
	} catch (err) {
		logger.error(`Failed to connect to MongoDB - ${err}`);
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
			logger.info("Disconnected from database");
			process.exit(0);
		});
	} catch (err) {
		logger.error(`Failed to disconnect from MongoDB - ${err}`);
	}
};

export { connectDB, disconnectDB };
export default { connectDB, disconnectDB };
