const s3Upload = require("./common/s3Upload");
const validation = require("./common/validation");
const otpSent = require("./common/otpSent");
const validationRules = require("./validationRules");

module.exports = {  s3Upload, 
                    validation,
                    otpSent,
                    validationRules
                }