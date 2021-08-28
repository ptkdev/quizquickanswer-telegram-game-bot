import configs from "@configs/config";
import Mongoose from "mongoose";

let database: Mongoose.Connection;

/**
 * MongoDB Connection
 * =====================
 * Connects to mongo DB
 *
 */
const connectDB = async (): Promise<void> => {
	if (database) {
		console.log("trying to connect but have already a connection");
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
const disconnectDB = async (): Promise<void> => {
	if (!database) {
		console.log("tried to disconnect but dont have connections");
		return;
	}
	try {
		await Mongoose.disconnect(() => {
			console.log("Disconnected from database");
			process.exit(0);
		});
	} catch (err) {
		console.log("Failed to disconnect from MongoDB - ", err);
	}
};

export { connectDB, disconnectDB };
export default { connectDB, disconnectDB };
