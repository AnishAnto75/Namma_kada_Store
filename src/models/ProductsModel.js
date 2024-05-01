import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    _id : {                     //
        type : String,
        required : true,
        trim : true,
        immutable : true
    },
    product_name : {            //
        type : String,
        required : true,
        trim : true
    },
    product_category : {        //
        type : String,
        required : true,
        trim : true
    },
    product_quantity : {        //
        type :String,
        trim : true
    },
    product_net_quantity : {    //
        type :Number,
        trim : true
    },
    product_mrp : {
        type : Number,
        trim : true
    },
    product_price : {
        type : Number,
        trim : true
    },
    product_brand : {           //
        type : String,
        trim : true
    },
    product_description :{
        type : String,
        trim : true
    },
    product_highlights :{
        type : String,
        trim : true
    },
    product_manufacture_date : {
        type : Date,
        trim : true
    },
    product_expire_date : {
        type : Date,
    },
    product_photos : {
        type : String,
    },
    product_purchase_cost : {
        type:Number,
        trim : true
    },
    product_landing_cost : {
        type:Number,
        trim : true
    },
    product_distributor : {
        type : String,
        trim : true
    },
    product_stock : {
        type : Number
    }
} , {
    timestamps : true
})

const Products = mongoose.model("Products" , productSchema )

export default Products