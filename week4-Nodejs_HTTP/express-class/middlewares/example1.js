const express = require('express');
const app = express();

function isOldEnough(req,res,next){
    const age= req.query.age;
    if(age >= 14){
        next();
    }
    else{
        res.json({
            msg:"Sorru you are not of the age"
        });
    }
}

app.use(isOldEnough);  //if all the below routes wants to use the middleware we can do this or also individually write in the route

app.get("/ride1",(req,res) => {
    res.json({
        msg:"Succesfully riden ride1"
    });
})

app.get("/ride2",(req,res) => {
    res.json({
        msg:"Succesfully riden ride2"
    });
})


app.listen(3000);