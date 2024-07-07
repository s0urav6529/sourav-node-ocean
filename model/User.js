//@external modules
const { mongoose, Schema } = require("mongoose");

//@Create customer schema
const userSchema = mongoose.Schema({

    name:{
        type : String,
    },
    email:{
        type : String,
    },
    birthOfDate : {
        type : String
    },
    phone:{
        type : String,
        required : true,
        unique: true
    },
    gender : {
        type : String,
        enum : ['Male','Female','Others'],
    },
    divisionId : {
        type : Schema.ObjectId,
        ref : 'division'
    },
    districtId : {
        type : Schema.ObjectId,
        ref : 'district'
    },
    occupation : {
        type : String,
        enum : ['Employee','Student','HouseWife','Farmer','Others']
    },
    weight:{
        type : Number,
    },
    bloodGroup : {
        type : String,
        enum : ['A+','A-','B+','B-','O+','O-','AB+','AB-']
    },
    otp : {
        type : String
    },
    otpExpiresAt: { 
        type: Date 
    }
},{
    toJSON : {
        transform : function(doc, ret){
            delete ret.role;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        }
    },
    timestamps: true
});

//@exports
module.exports = mongoose.model("user",userSchema);