/* eslint-disable indent */
import configs from "../app/configs/config";
import { Schema, model, connect } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({

    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
});

// 3. Create a Model.
const UserModel = model<User>("User", schema);


(async function (): Promise<void> {
    // 4. Connect to MongoDB
    await connect(configs.database.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
})();



/* (async function createUser() {  // Create User
    const doc = new UserModel({
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
    UserModel.findOneAndDelete({ id }, function (err, user) {
        if (err) {
            return err;
        }
        console.log("User deleted");

    });
})(); */


/*
(async function updateUser(id = 1): Promise<void> {  // Update User
    UserModel.findOneAndUpdate({ id }, { name: "Francesco" }, function (err, user) {
        if (err) {
            return err;
        }
        console.log(`User updated`);

    });
})();
 */


/* (async function findUser(id = 2): Promise<void> {  // Find User

    UserModel.findOne({ id }, function (err, user) {
        if (err) {
            return err;
        }
        console.log(`This is the user : ${user}`);
    });

})(); */


/* (async function findUsers(avatar = "https://i.imgur.com/dM7Thhn.png"): Promise<void> {  // Find Users

    UserModel.find({ avatar }, function (err, users) {  // Come primo parametro mettere la condizione di ricerca es :{name: "pippo"}, o lasciare oggetto vuoto per trovarli tutti
        if (err) {
            return err;
        }
        console.log(`Those are the users: ${users}`);
    });


})(); */



