const { Router } = require("express");    //or you can --->both does the same thing
                                          //const express = require("express");
                                          //const {Router} = express.Router();
const { userModel, purchaseModel, courseModel } = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
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

userRouter.get("/purchases",userMiddleware, async (req,res) => {        //get all the purchases
    const userId = req.userId;
    const purchases = await purchaseModel.find({
        userId
    });
    //this will only show the ids of the courses that the user bought to see the course detail do..
    
    const coursesData = await courseModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    })

    res.json({
        purchases:purchases,
        coursesData:coursesData
    })
});

module.exports = {
    userRouter:userRouter
};