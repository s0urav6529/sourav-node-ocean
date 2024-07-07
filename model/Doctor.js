const { mongoose , Schema } = require('mongoose');

const doctorSchema = mongoose.Schema({

        name : {
            type : String,
            required : true
        },
        institute : {
            type : String,
            required : true
        },
        image : {
            type : String,
        },
        fees : {
            type : Number,
            default : 0
        },
        specialityId : {
            type : Schema.ObjectId,
            ref : "specialist",
            required : true
        },
        availableFromDay : {
            type : String
        },
        availableToDay : {
            type : String
        },
        availableFromTime : {
            type : String
        },
        availableToTime : {
            type : String
        },
        experience: {
            type: Number,
            default : 0
        },
        biography : {
            type : String
        },
        avgRating : {
            type : Number,
            default : 0
        },
        slug : {
            type : String,
            unique : true
        }
    },{
        toJSON : {
            transform : function(doc, ret){
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
            }
        },
        timestamps : true
});

module.exports = mongoose.model('doctor', doctorSchema);