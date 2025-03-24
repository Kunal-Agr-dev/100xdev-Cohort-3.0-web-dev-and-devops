//express app that we will use to generate an authenticated backend 
const express = require("express");
const app = express();

app.use(express.json());

let users = [];
//this returns a random long token
function generateToken(){
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let token = [];
    for(let i=0;i<32;i++)
        token += options[Math.floor(Math.random()*options.length)];
    return token;
}

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

    //let user = null;
    // for(let i=0;i<users.length;i++){
    //     if(users[i].username === username && users[i].password === password){
    //         user = users[i];
    //         break;  
    //     }   
    // }

    if (user) {
        const token = generateToken();
        user.token = token;
        res.json({
            token
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
    const user = users.find(user => user.token == token);
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