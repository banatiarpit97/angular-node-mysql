const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "my-secret-key");
        req.userDetails = {email:decodedToken.email, user_id:decodedToken.user_id};
        next();
    }
    catch(err){
        console.log(err)
        res.status(401).json({
            message: "Authentication failed",
            err: "authentication unsuccessful"
        })
    }
}