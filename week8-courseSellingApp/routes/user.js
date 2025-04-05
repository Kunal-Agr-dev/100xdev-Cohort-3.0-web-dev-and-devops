const { Router } = require("express");    //or you can --->both does the same thing
//const express = require("express");
//const {Router} = express.Router();
const { userModel, purchaseModel, courseModel } = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");
const bcrypt = require("bcrypt");
const { z } = require("zod");

userRouter.post("/signup", async (req, res) => {
    try {
        const { email, password, firstname, lastname } = req.body;
        const hashedpassword = await bcrypt.hash(password, 5);

        //stricting the schema..
        const correctBody = z.object({
            email: z.string().min(5).max(100).email(),
            password: z.string().min(5).max(100).regex(/[A-z]/).regex(/[a-z]/).regex(/[0-9]/),
            firstname: z.string().min(5).max(100),
            lastname: z.string().min(5).max(100)
        })
        const parseData = correctBody.safeParse(req.body);
        if (!parseData.success) {
            res.status(403).json({
                msg: "Not correct schema",
                error: parseData.error
            });
        }

        await userModel.create({
            email: email,
            password: hashedpassword,
            firstName: firstname,
            lastName: lastname
        });
        res.json({
            msg: "Signup was succesfull"
        });
    } catch (e) {
        res.status(400).json({
            msg: "User already exist"
        });
    }
});

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const response = await userModel.findOne({
        email: email
    });
    const matchedpassword = await bcrypt.compare(password, response.password);

    if (response && matchedpassword) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_USER_PASSWORD);
        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            msg: "Incorrect credentials"
        });
    }
});

userRouter.get("/purchases", userMiddleware, async (req, res) => {        //get all the purchases
    const userId = req.userId;
    const purchases = await purchaseModel.find({
        userId
    });
    //this will only show the ids of the courses that the user bought to see the course detail do..

    const coursesData = await courseModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    })

    res.json({
        purchases: purchases,
        coursesData: coursesData
    })
});

module.exports = {
    userRouter: userRouter
};