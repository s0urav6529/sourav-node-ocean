//@function for create an Authentication token for an account using jwt
const generateAuthToken = (s1,s2,so_on) => {
    return jwt.sign({ s1,s2,so_on }, process.env.JWT_SECRET, { expiresIn: "14d" });
};

//@generate a slug from the given string
const generateSlug = (str) => {
    return str.toLowerCase().replace(/\s+/g, "-");
};

//@function for pagination
const pagination = async (pageNo,pageLimit,data)=>{

    try {
        const page = parseInt(pageNo) || 1;
        const limit = parseInt(pageLimit);
        const skip = (page - 1) * limit;

        return await data.skip(skip).limit(limit);
    
    } catch (error) {
        return error;
    }
}

//@function for regular expression string
const escapeString = function(str){
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"); 
};

//@function for generate OTP
const generateOTP = function (){
    return Math.floor(100000 + Math.random() * 900000).toString(); 
}

//@function for generate OTP
const generateRandomNumber = function (){
    return Math.floor(100000 + Math.random() * 900000).toString();
}


//@exports
module.exports = {  generateAuthToken,
    generateSlug,
    pagination,
    escapeString,
    generateOTP,
    generateRandomNumber
}