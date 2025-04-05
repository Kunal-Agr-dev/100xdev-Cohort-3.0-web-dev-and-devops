const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://kunal:Dookie%401@cluster0.qsvqnpt.mongodb.net/coursera-app");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    email:{type:String, unique:true},
    password:String,
    firstName:String,
    lastName:String
});

const courseSchema = new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId
});

const adminSchema = new Schema({
    email:{type:String, unique:true},
    password:String,
    firstName:String,
    lastName:String
});

const purchaseSchema = new Schema({
    courseId:ObjectId,
    userId:ObjectId
});


const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const courseModel = mongoose.model("course",courseSchema);
const purchaseModel = mongoose.model("purchase",purchaseSchema);

module.exports = {
    userModel:userModel,
    adminModel:adminModel,
    courseModel:courseModel,
    purchaseModel:purchaseModel
};