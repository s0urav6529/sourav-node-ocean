const { Doctor } = require("../model/init");
const { helper } = require("../utils/init");

const createAction = async( data,file ) => {

    const slug = helper.generateSlug(data.name);
    const exists = await Doctor.exists({ slug : slug });
    if(exists){
        //@doctor already exist with this slug
        return null;
    }

    return await Doctor.create({
        ...data,
        slug,
        image : file ? file.location : "Image not available",
    });
}

module.exports = { createAction }