//@external module
const userRoute = require("express").Router();

//@internal module
const { userValidation, 
        validation} = require("../../middlewares/middlewareExporter");

userRoute
        .use(userValidation.validationRules, validation.validate);

userRoute
        .route("/send-otp")
        .post()

userRoute
        .route("/verify-otp")
        .post()

//@exports
module.exports = userRoute;