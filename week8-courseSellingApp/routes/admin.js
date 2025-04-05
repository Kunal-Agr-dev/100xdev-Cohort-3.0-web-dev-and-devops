const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");         //also using different files makes the code more cleaner for ex if we want to add a middleware for admin routes only we can write it here but if we wrote all the logic in the main index.js file it would make the code less readable just making our life more hrader than it should be:(
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../middleware/admin");
const { adinMiddleware } = require("../middleware/admin");


adminRouter.post("/signup", async (req,res) =>{
    const { email, password, firstname, lastname } = req.body;

    await adminModel.create({
        email:email,
        password:password,
        firstName:firstname,
        lastName:lastname
    });

    res.json({
        msg:"Singup was succesfull"
    })
});                            

adminRouter.post("/signin", async (req,res) =>{
    const { email, password } = req.body;
    const response = await adminModel.findOne({
        email: email,
        password: password
    })
    if(response){
        const token = jwt.sign({
            id:response._id
        },JWT_ADMIN_PASSWORD);
        res.json({
            token:token
        });
    }else{
        res.status(403).json({
            msg:"Incorrect credentials"
        });
    }
});

adminRouter.post("/course",(req,res) =>{     //to add course

});

adminRouter.put("/course",(req,res) =>{    //to edit a course

});

adminRouter.get("/course/bulk",(req,res) =>{

});

module.exports = {
    adminRouter:adminRouter
};