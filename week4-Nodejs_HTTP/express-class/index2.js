//todo 
const express = require('express');
const app = express();

let todos = [];

app.use(express.json());

app.get("/",function(req,res){
    res.json({
        todos
    });
})

app.post("/",function(req,res){
    const todo = req.body.todo;
    todos.push(todo);
    res.json({
        msg:'todo added'
    });
})

//411
app.delete("/",function(req,res){
    if(todos){
        todos = [];
        res.json({
            msg:"all todos are done"
        });
    }
    else{
        res.status(411).json({
            msg:"todo list is empty"
        });
    }
})


app.listen(3001);