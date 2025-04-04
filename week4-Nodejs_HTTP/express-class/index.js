//creating HTTP server
//express
//creating a memory hospital (array-kidney-game)

const express = require("express");
const app = express();

let users = [{
    name:'jhon',
    kidneys:[{
        healthy:false
    }]
}];

app.use(express.json());

app.get("/",function(req,res){
    const jhonKidneys = users[0].kidneys;
    const numberOfKidneys = jhonKidneys.length;
    const healthyKidneys = jhonKidneys.filter(function(status){
        if(status.healthy) return status;
    });
    const numberOfHealthyKidneys = healthyKidneys.length;
    const numberOfUnhealthyKidneys = numberOfKidneys-numberOfHealthyKidneys;

    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
});

app.post("/",function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy:isHealthy
    });
    res.json({
        msg:"done!"
    })
});

// 411
app.put("/", function(req, res) {
    for (let i = 0; i<users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})

// removing all the unhealhty kidneys
app.delete("/", function(req, res) {
    if(isThereAtleastOneUnhealthyKidney()) {
        const newKidneys = users[0].kidneys.filter(function(status){
            if(status.healthy) return status;
        })
        // for (let i = 0; i<users[0].kidneys.length; i++) {
        //     if (users[0].kidneys[i].healthy) {
        //         newKidneys.push({
        //             healthy: true
        //         })
        //     }
        // }
        users[0].kidneys = newKidneys;
        res.json({msg: "done"})   
    } else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
})

function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for (let i = 0; i<users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney
}

app.listen(3000);
