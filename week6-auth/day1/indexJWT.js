//express app that we will use to generate an authenticated backend using jwt
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "daslsndjkankjdnaljnskjdnsd"; //can be anything

app.use(express.json());

let users = [];

app.post("/signup", (req, res) => {
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
    console.log(users) // just to see which which users are there in the array after each request
});

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password); 

    if (user) {
        const token = jwt.sign({
            username:user.username  //the thing u want to encode in the token we write it here
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
    console.log(users) // just to see which which users are there in the array after each request
});

//creating authentication End point
app.get("/me", (req, res) => {
    const token = req.header.token;
    const userDetails = jwt.verify(token,JWT_SECRET); //the user after encoding the token is stored in the user
    //const userDetails = jwt.decode(token); this also decodes the token but causes vulnerablity as we are not verifying that this is our token only using jwt_secret

    //since the found the username only as the token contains only username we will have to search the data base (in this case its in memeory array to find other info like pass,etc) using its username
    const user = users.find(user => user.username == userDetails.username);
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
});

app.listen(3000);