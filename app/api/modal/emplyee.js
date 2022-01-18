const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate');

const EmployeeSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    EmployeeId: { type :String , 
    default:"ITC"+'_'+Math.random().toString(16).substring(2)},
    name:{ type:String, required:true, trim:true, minLength:3, maxLength:10},
    createdDate: { type:Date,default :new Date() },
    isActive:{ type:Boolean , default:true},
    Role:{type:String, required:true},
    deparatment:{ type:mongoose.Types.ObjectId, ref:"department", required:true},
    Manager:{ type:mongoose.Types.ObjectId, ref:"employee"},
    DateOfJoining:{ type:Date, required:true , default : new Date()},
    DateOFBirth:{ type: Date , required:true, min: '1960-01-01', max: '2002-01-01'},
    ProfileImage:{type:String },
    email :{ type : String, required : true, unique : true },
    password:{type:String, required: true ,minLength:5}
    });

//EmployeeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('employee',EmployeeSchema);