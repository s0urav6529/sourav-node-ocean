const doctorRoute = require("express").Router();
const { doctorImageUpload } = require("../../utilities/utilityExporter");

doctorRoute
        .route("/")
        .post(doctorImageUpload.doctorImage, doctorValidation.validationRules, validation.validate, doctorController.createDoctor);

module.exports = doctorRoute;