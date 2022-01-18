const { string } = require('joi');
const mongoose = require('mongoose');
const DepartmentSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    name: { type: String, required:true, minLength:5, maxLength:35},
    createdDate: { type:Date,default :new Date() },
    isActive:{ type:Boolean , default:true}
});
module.exports = mongoose.model('department',DepartmentSchema);
