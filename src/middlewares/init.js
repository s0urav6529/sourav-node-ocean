const s3Upload = require("./common/s3Upload");

const otp = require("./common/sslwirelessOTP.middleware");
const validation = require("./common/validation.middleware");
const doctorMiddleware = require("./doctor.middleware");
const sessionMiddleware = require("./common/session.middleware")

module.exports = {  s3Upload, 
                    otp,
                    validation,
                    doctorMiddleware,
                    sessionMiddleware
                }