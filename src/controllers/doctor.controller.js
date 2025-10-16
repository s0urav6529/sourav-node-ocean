const { Doctor } = require("../../models/modelExporter");
const { functions } = require("../../utilities/utilityExporter");

const createDoctor = async(req, res) => {

    try {

        const { name, institute, fees, specialityId, availableFromDay, availableToDay, 
            availableFromTime, availableToTime, experience, biography  } = req.body;

        const slug = functions.generateSlug(name);

        let doctor = await Doctor.findOne({ slug });

        if(doctor){
            res.status(400).json("Already Exist");

            //@delete the recently uploaded photo for this entry

        }else{

            doctor = new Doctor({
                name,
                institute,
                image : req.file ? req.file.location : "Image not available",
                fees,
                specialityId,
                availableFromDay,
                availableToDay,
                availableFromTime,
                availableToTime,
                experience,
                biography,
                slug
            });

            await doctor.save();

            res.status(201).json({ message : "New Doctor Created Successfully !", data : doctor });
        }

    } catch (error) {
        res.status(400).json({ message : error })
    }
}

module.exports = {  createDoctor }