import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
        city :{
            type : String,
            trim : true
        },
        pincode : {
            type : Number,
            trim : true
        },
        district : {
            type : String,
            trim : true
    },
        address : {
            type : String,
            trim : true
        }
}) 

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required :true,
        immutable : true
    },
    auth0Id: {
        type : String,
        required : true,
        immutable : true
    },
    name : {
        type : String ,
        required : true,
        trim : true
    },
    phoneNumber :{
        type : Number,
        trim : true
    },
    address :  addressSchema
},{
    timestamps : true ,
}
)

const User = mongoose.model("User" , userSchema)

export default User

