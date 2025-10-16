const s3Upload = require("./common/s3Upload");
const otpSent = require("./common/otpSent");

const validation = require("./common/validation.middleware");
const doctorMiddleware = require("./doctor.middleware");
const sessionMiddleware = require("./common/session.middleware")

module.exports = {  s3Upload, 
                    otpSent,
                    validation,
                    doctorMiddleware,
                    sessionMiddleware
                }