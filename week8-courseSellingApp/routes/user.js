const { Router } = require("express");    //or you can --->both does the same thing
                                          //const express = require("express");
                                          //const {Router} = express.Router();
const { userModel, purchaseModel, courseModel } = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../middleware/user");
const { userMiddleware } = require("../middleware/user");

userRouter.post("/signup",async (req,res) => {
    const {email,password,firstname,lastname} = req.body;
    await userModel.create({
        email:email,
        password:password,
        firstName:firstname,
        lastName:lastname
    });
    res.json({
        msg:"Signup was succesfull"
    });
});

userRouter.post("/signin", async (req,res) => {
    const {email,password} = req.body;
    const response = await userModel.findOne({
        email:email,
        password:password
    });
    if(response){
        const token = jwt.sign({
            id:response._id
        },JWT_USER_PASSWORD);
        res.json({
            token:token
        });
    }else{
        res.status(403).json({
            msg:"Incorrect credentials"
        });
    }
});

userRouter.get("/purchases",(req,res) => {

});

module.exports = {
    userRouter:userRouter
};