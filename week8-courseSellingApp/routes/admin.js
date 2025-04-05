const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");         //also using different files makes the code more cleaner for ex if we want to add a middleware for admin routes only we can write it here but if we wrote all the logic in the main index.js file it would make the code less readable just making our life more hrader than it should be:(
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");


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

//try to fix this image url thing later
adminRouter.post("/course",adminMiddleware, async (req,res) =>{     //to add course
    const adminId = req.userId;
    const { title,descripttion,price,imageUrl } = req.body;

    const course = await courseModel.create({
        title:title,
        description:descripttion,
        price:price,
        imageUrl:imageUrl,
        creatorId:adminId
    });
    res.json({                          //this will send the id of the course by which it is sotred in the db
        msg:"course created",
        courseId:course._id
    })
});

adminRouter.put("/course",adminMiddleware, async (req,res) =>{    //to edit a course
    const adminId = req.userId;
    const { title,descripttion,price,imageUrl,courseId } = req.body;

    const course = await courseModel.updateOne({        //the first arguments wants the course ou want to change and the second one is the changes
        _id:courseId,                   //this 2 lines make sures that the course id that the admin sent is a course made by the same admin only 
        creatorId:adminId               //is prevents one crettor accessing other creator's courses
    }, {            
        title:title,
        description:descripttion,
        price:price,
        imageUrl:imageUrl,
    });
    res.json({
        msg:"Updated a course succesfully",
        courseId:course._id
    });
});

adminRouter.get("/course/bulk",adminMiddleware,async (req,res) =>{  //give all the courses of the creator
    const adminId = req.userId;
    const courses = await courseModel.find({   //find the courses that are creted by the admin
        creatorId:adminId
    });
    res.json({
        msg:"Your courses are..",
        courses:courses
    })
});

module.exports = {
    adminRouter:adminRouter
};