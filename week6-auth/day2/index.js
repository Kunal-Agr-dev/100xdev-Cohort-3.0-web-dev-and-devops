//adding a authetication middleware that verifies is the user is logged in or not if not then cut it 

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hiyou";

app.use(express.static("public"));

//for converting req data to json
app.use(express.json());

const users=[];

function logger (req,res,next){
    console.log(req.method + " - Request came !")
    next();
}

app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/index.html");  //frontend part ko idhar se connect kr diya like jaise hi localhost:3000 search krenge backend server strt krne ke badd then woh yeh file ko return krega 
})

app.post("/signup",logger, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //so that people cant signup twice
    if(users.find(u=>u.usename == username)){
        res.json({
            msg:"Cannot sign up twice"
        })
        return;
    }
    users.push( {
        username,
        password
    })
    res.json({
        msg:"Sign up was succesfull"
    })
});

app.post("/signin",logger, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password); 

    if (user) {
        const token = jwt.sign({
            username:user.username,  //the thing u want to encode in the token we write it here
            password:user.password
        },JWT_SECRET);
        //anyone can decode this token u can check this in jwt.io
        res.json({
            token:token
        })
    } 
    else {
        res.status(403).json({
            message: "Invalid username or password"
        })
    }
});

function auth(req,res,next){
    const token = req.headers.token;
    if(token){
        jwt.verify(token,JWT_SECRET,(err,decoded) =>{
            if(decoded){
                req.username = decoded.username; //changes the req of /me
                next();
            }else{
                res.status(401).json({    //401 -> req is not authenticat
                    msg:"unauthorised"
                })
            }
        });
    }else{
        res.status(401).json({
            msg:"not logged in"
        })
    }
}

app.get("/me",logger,auth,(req,res) => {
    const user = users.find(user => user.username == req.username);

    if(user){
        res.json({
            username :user.username
        });
    }
    else{
        res.json({
            msg:"Invalid token"
        });
    }
})
 
app.listen(3000);

