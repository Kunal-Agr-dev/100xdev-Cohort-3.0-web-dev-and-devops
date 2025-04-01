//to structure our code better we put DB data here (we can also put it in index.js only)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    email:{type:String,unique:true}, // this ensures that one email id cannot sign up twice
    password:String,
    name:String
})

const Todo = new Schema({
    title:String,
    done:Boolean,
    userId:ObjectId
})

const UserModel = mongoose.model('user',User);
const TodoModel = mongoose.model('todos',Todo);

//now we have created this file seperately so we have to export this file so that we can use it in index.js file
//if we had created this file in that same file then there was no need to export 
module.exports = {
    UserModel : UserModel,
    TodoModel : TodoModel
};
