const { validationResult } = require("express-validator");

//@validate
const validate = async(req, res, next) => {

    try {
        //@check the validation result
        const errors = validationResult(req);

        //@if errors occurs during validation
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() });
        }
        else{
            //@validation complete
            next();
        }
    } catch (error) {
        return res.status(400).json({ error,message:"Error during validation !" });
    }
}

//@exports
module.exports = { validate };