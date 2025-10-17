const { createAction } = require("../services/doctor.service");

const createDoctor = async(req, res) => {

    try {
        const result = await createAction(req.body, req.file);
        if(!result){
            return res.status(409).json({ error: "Doctor already exists" });
            //@delete the recently uploaded photo for this entry
        }
        res.status(201).json({ message : "New Doctor Created Successfully."});
    } catch (error) {
        res.status(400).json({ message : error })
    }
}

module.exports = {  createDoctor }