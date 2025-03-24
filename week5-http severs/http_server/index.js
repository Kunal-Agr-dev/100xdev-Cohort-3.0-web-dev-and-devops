const express = require("express");

const app = express();

//in add,sub,divide u need to convert the string into int using parseInt


app.get("/sum", function(req, res) {  //using params-> ("/sum/:first/:second") 
    const a = paresInt(req.query.a);            //const a = parseInt(req.params.first)
    const b = paresInt(req.query.b);            //const b = parseInt(req.params.second)
    res.json({                                  
        ans: a + b
    })
})

app.get("/multiply", function(req, res) {
    const a = (req.query.a);
    const b = (req.query.b);   //in multiple u dont need parse as->{"2" * "2" = "4"}
    res.json({
        ans: a * b
    })
})

app.get("/divide", function(req, res) {
    const a = paresInt(req.query.a);
    const b = paresInt(req.query.b);
    res.json({
        ans: a / b
    })

})

app.get("/subtract", function(req, res) {
    const a = paresInt(req.query.a);
    const b = paresInt(req.query.b);
    res.json({
        ans: a - b
    })
})

app.listen(3000);