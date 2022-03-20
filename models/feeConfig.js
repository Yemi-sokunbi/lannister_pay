const mongoose = require("mongoose");

let feeConfiguration_Schema = new mongoose.Schema({
    feeId: String, 
    currency: String,
    locale: String,
    feeEntity: String,
    entityProperty: String,
    feeType: String,
    feeValue: Number,
    feeValue2: Number
});


module.exports = mongoose.model("feeConfiguration", feeConfiguration_Schema);