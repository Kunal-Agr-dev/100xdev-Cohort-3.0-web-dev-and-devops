const { Router } = require("express");    //or you can --->both does the same thing
                                          //const express = require("express");
                                          //const {Router} = express.Router();
const { userModel, purchaseModel, courseModel } = require("../db");
const userRouter = Router();

userRouter.post("/signup",(req,res) => {
    
});

userRouter.post("/signin",(req,res) => {

});

userRouter.get("/purchases",(req,res) => {

});

module.exports = {
    userRouter:userRouter
};