const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors()); // app.use(cors()); //this will allow any url to send request to this backend

app.post("/sum", function(req, res) {  
    const a = parseInt(req.body.a);            
    const b = parseInt(req.body.b);
    res.json({                                  
        ans: a + b
    })
})

app.listen(3000);