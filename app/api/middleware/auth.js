const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        console.log(" Headers Data", req.headers.authorization)
        const token = req.headers.authorization.split(" ")[1];
        console.log("Auth Token ==>", token)
        const decoded = jwt.verify(token, '!@#$qwer');
        req.userData = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            message:"Auth Failed"
        })
    }
};