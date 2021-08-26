/* eslint-disable indent */
import configs from "../app/configs/config";
import { Schema, model, connect } from "mongoose";
import type { TelegramUserInterface } from "../app/types/databases.type";


const schema = new Schema<TelegramUserInterface>({

    id: { type: String, required: true },
    is_bot: { type: Boolean, required: true },
    first_name: { type: String, required: true },
    username: { type: String, required: true },
    launguage_code: String

});


const user_model = model<TelegramUserInterface>("User", schema);


(async function (): Promise<void> {
    // 4. Connect to MongoDB
    await connect(configs.database.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
})();



/* (async function createUser() {  // Create User
    const doc = new user_model({
        id: "3",
        name: "Mario",
        email: "mario@initech.com",
        avatar: "https://i.imgur.com/dM7Thhn.png"
    });
    await doc.save();

    console.log("User Created"); // 'bill@initech.com'
})();
 */



/*
(async function deleteUser(id = 1): Promise<void> {  // Delete User
    user_model.findOneAndDelete({ id }, function (err, user) {
        if (err) {
            return err;
        }
        console.log("User deleted");

    });
})(); */


/*
(async function updateUser(id = 1): Promise<void> {  // Update User
    user_model.findOneAndUpdate({ id }, { name: "Francesco" }, function (err, user) {
        if (err) {
            return err;
        }
        console.log(`User updated`);

    });
})();
 */


/* (async function findUser(id = 2): Promise<void> {  // Find User

    user_model.findOne({ id }, function (err, user) {
        if (err) {
            return err;
        }
        console.log(`This is the user : ${user}`);
    });

})(); */


/* (async function findUsers(avatar = "https://i.imgur.com/dM7Thhn.png"): Promise<void> {  // Find Users

    user_model.find({ avatar }, function (err, users) {  // Come primo parametro mettere la condizione di ricerca es :{name: "pippo"}, o lasciare oggetto vuoto per trovarli tutti
        if (err) {
            return err;
        }
        console.log(`Those are the users: ${users}`);
    });


})(); */






