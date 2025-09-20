const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");         //also using different files makes the code more cleaner for ex if we want to add a middleware for admin routes only we can write it here but if we wrote all the logic in the main index.js file it would make the code less readable just making our life more hrader than it should be:(
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");
const bcrypt = require("bcrypt");
const { z } = require("zod");

adminRouter.post("/signup", async (req, res) => {
    try {
        const { email, password, firstname, lastname } = req.body;
        //bcrypting password
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

        await adminModel.create({
            email: email,
            password: hashedpassword,
            firstName: firstname,
            lastName: lastname
        });

        res.json({
            msg: "Singup was succesfull"
        })
    } catch (e) {
        res.status(400).json({
            msg: "User already exist"
        });
    }

});

adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const response = await adminModel.findOne({
        email: email
    })
    //comparing pass with hasedpass
    const matchedpassword = await bcrypt.compare(password, response.password);

    if (response && matchedpassword) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_ADMIN_PASSWORD);
        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            msg: "Incorrect credentials"
        });
    }
});

//try to fix this image url thing later
adminRouter.post("/course", adminMiddleware, async (req, res) => {     //to add course
    const adminId = req.userId;
    const { title, descripttion, price, imageUrl } = req.body;

    //stricting the schema
    const requiredBody = z.object({
        title: z.string(),
        description: z.string().min(3).max(100),
        imageUrl: z.string().min(2),
        price: z.number()
    })
    const parseData = requiredBody.safeParse(req.body);
    if (!parseData.success) {
        res.status(403).json({
            msg:"Schema is not correct",
            error:parseData.error
        })
    }

    const course = await courseModel.create({
        title: title,
        description: descripttion,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    });
    res.json({                          //this will send the id of the course by which it is sotred in the db
        msg: "course created",
        courseId: course._id
    })
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {    //to edit a course
    const adminId = req.userId;
    const { title, descripttion, price, imageUrl, courseId } = req.body;

    const course = await courseModel.updateOne({        //the first arguments wants the course ou want to change and the second one is the changes
        _id: courseId,                   //this 2 lines make sures that the course id that the admin sent is a course made by the same admin only 
        creatorId: adminId               //is prevents one crettor accessing other creator's courses
    }, {
        title: title,
        description: descripttion,
        price: price,
        imageUrl: imageUrl,
    });
    res.json({
        msg: "Updated a course succesfully",
        courseId: course._id
    });
    //not adding zod validation here becuase if creator only wants to change few things in the course then he will not have to write the whole schema
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {  //give all the courses of the creator
    const adminId = req.userId;
    const courses = await courseModel.find({   //find the courses that are creted by the admin
        creatorId: adminId
    });
    res.json({
        msg: "Your courses are..",
        courses: courses
    })
});

module.exports = {
    adminRouter: adminRouter
};