const { verifyToken } = require("../../utils/helper.util");


const isLogin = async(req,res,next) => {
    
    try {

        let token = req.get('Authorization');

        if(token){
            token = token.split(' ')[1];
            token = verifyToken(token);

            if(token){
                req.account = token.data;
                next();
            }
            else {
                res.status(401).json({ message: "Unauthorized access" });
            }
        }else{
            res.status(401).json({ message: "Unauthorized access" });
        }
    } catch (error) {
        res.status(401).json({ message: "Unauthorized access" });
    }
}

const isLogout = async(req,res,next) => {

    try {
        
        let token = req.get('Authorization');

        if(!token){
            next();
        }else{
            token = token.split(' ')[1];
            token = verifyToken(token);

            if(!token){
                next();
            }else{
                res.status(401).json({ message: "You are already logged in" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { isLogin, isLogout };