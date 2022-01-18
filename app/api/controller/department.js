const Department = require('../modal/department');
const mongoose = require('mongoose');


exports.getAllDepartment  = (req,res,next)=>{
    Department.find({})
    .then(result=>{
        console.log(result)
        res.status(200)
         .json({Departments:result})
    })
    .catch(err=>{
        console.log(err)
    })       
 }

exports.getSingleDepartment = (req,res,next)=>{
    const id = req.params.empId;
    Department.findById(id)
    .exec()
    .then( doc => {
        console.log(doc);
        if(doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({
                message:"Product not found"
            })
        }
        
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            message:err
        })
    });
}

exports.createDepartment = (req,res,nex)=>{
    console.log(req.body)
    const department = new Department({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name,
    })
    department.save()
    .then(doc =>{
        res.status(201)
        .json({
            message:"Department Created",
            Department:doc
        })
    })
    .catch(err=>{
        res.status(500)
        .json(err)
    })
};

exports.editDepartment = (req,res,next)=>{
    const id = req.params.empId;
    const updateOps = new Department({
        name:req.body.name
    });
    console.log(updateOps);
    Department.updateOne({ _id: id}, {$set : updateOps })
    .exec()
    .then(result =>{

        res.status(200).json({
            message:" Product is Updated !",
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            message:err
        })
    })
   
}

exports.deleteDepartment = (req,res,next) => {
    const id = req.params.empId;
    Department.remove({ _id:id } )
    .then(result => {
            res.status(200).json(result)       
    })
    .cath(err => { 
        res.status(500).json({
            message:err
        })
    });
}

