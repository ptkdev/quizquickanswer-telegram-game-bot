import configs from "@configs/config";
import Mongoose from "mongoose";

let database: Mongoose.connection;

/**
 * MongoDB Connection
 * =====================
 * Connects to mongo DB
 *
 */
export const connectDB = async (): Promise<void> => {
	if (database) {
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
		console.log("Connected to database");
	} catch (err) {
		console.log("Failed to connect to MongoDB - ", err);
	}
};

/**
 * MongoDB Disconnection
 * =====================
 * Disconnect to mongo DB
 *
 */
export const disconnectDB = async (): Promise<void> => {
	if (!database) {
		return;
	}
	try {
		Mongoose.disconnect();
		console.log("Disconnected from database");
	} catch (err) {
		console.log("Failed to disconnect from MongoDB - ", err);
	}
};
