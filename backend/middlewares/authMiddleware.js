const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            success: false,
            message: "Unauthorized access"
        })
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        else{
            req.user = decoded;
            next();
        }
    });
}