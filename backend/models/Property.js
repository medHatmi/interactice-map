const mongoose = require('mongoose')

const PropertySchema = new mongoose.Schema(
    {
        bl_latitude:{
            type:Number,
            required: true
        },
        tr_latitude:{
            type:Number,
            required: true
        },
        bl_longitude:{
            type:Number,
            required: true
        },
        tr_longitude:{
            type:Number,
            required: true
        },
        latitude:{
            type:Number,
            required: true
        },
        longitude:{
            type:Number,
            required: true
        },
        number:{
            type:Number,
            required: true
        },
        street:{
            type:String,
            required: true
        },
        city:{
            type:String,
            required: true
        },
        country:{
            type:String,
            required: true
        },
        province:{
            type:String,
            required: true
        },
        postalCode:{
            type:String,
            required: true
        },

    },
    {timestamps: true}
)
module.exports = mongoose.model('Property', PropertySchema)