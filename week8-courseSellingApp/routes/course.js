const { Router } = require("express");
const courseRouter = Router();
const { courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

courseRouter.post("/purchase",userMiddleware, async(req,res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId:userId,
        courseId:courseId
    });
    res.json({
        msg:"Succesfully bought the course"
    });
})

courseRouter.get("/preview", async (req,res) =>{     // show all the available courses
    const allcourses = await courseModel.find({}); //sending an empty object to find will return all things(courses) in the coursemodel
    res.json({
        allcourses
    })
});

module.exports = {
    courseRouter:courseRouter
};