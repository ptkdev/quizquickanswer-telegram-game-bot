/* eslint-disable indent */
import configs from "../../../configs/config";
import type { TelegramUserInterface } from "../../../../app/types/databases.type";
import Mongoose from "mongoose";


let database: Mongoose.connection;

/**
 * MongoDB Connection
 * =====================
 * Connects to mongo DB 
 *
 */
export const connect: any = () => {
    if (database) {
        return;
    }
    Mongoose.connect(configs.database.URL, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    database = Mongoose.connection;
    database.once("open", async () => {
        console.log("Connected to database");
    });
    database.on("error", () => {
        console.log("Error connecting to database");
    });
};


/**
 * MongoDB Disconnection
 * =====================
 * Disconnect to mongo DB
 *
 */
export const disconnect: any = () => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
};

