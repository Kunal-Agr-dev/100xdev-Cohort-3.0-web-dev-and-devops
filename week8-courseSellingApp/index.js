const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use("/api/v1/user",userRouter);        //this is the cleaner way to import the user and course js routes   
app.use("/api/v1/course",courseRouter);     //advantage--> we dont need to write /user or /course in the routes as it is already mentioned here
app.use("/api/v1/admin",adminRouter);       //hence all the structuring(prefixing) happen over here




//this fucntions ensures the backend is connected to the db before it starts listening
async function main() {
    await mongoose.connect("mongodb+srv://kunal:Dookie%401@cluster0.qsvqnpt.mongodb.net/coursera-app");
    app.listen(3000);
    console.log("listening to port 3000");
}
main();