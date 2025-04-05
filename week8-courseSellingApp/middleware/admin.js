const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const decode = jwt.verify(token,JWT_ADMIN_PASSWORD);

    if(decode){
        req.userId = decode.id;
        next();
    }else{
        res.status(403).json({
            msg:"This admin is not authorized"
        });
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}


// {
//     "title":"gym",
//     "description":"learn about gym",
//     "price":10,
//     "imageUrl":"htpps..dsasdasd"
// }