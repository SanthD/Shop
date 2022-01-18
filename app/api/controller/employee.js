const Employee = require('../modal/emplyee');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth     = require('../middleware/auth');
const converter = require('json-2-csv');
let fs = require('fs')

exports.getAllEmployee  = (req,res,next)=>{
    Employee.find({})
    .populate('deparatment','name')
    .then(result=>{
        console.log(result)
        res.status(200)
         .json({Employees:result})
    })
    .catch(err=>{
        console.log(err)
    })       
}

exports.getSingleEmployee = (req,res,next)=>{
    const id = req.params.empId;
    Employee.findById(id)
    .populate('deparatment','name')
    .populate('Manager','name Role EmployeeId')
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

exports.createEmployee = (req,res,nex)=>{
console.log(req.body)
console.log(req.file)
    const hash = bcrypt.hash(req.body.password,10, (error,hash)=>{
        if(error){
            console.log(error)
        }else{
            const employee = new Employee({
                _id: new mongoose.Types.ObjectId(),
                name : req.body.name,
                Role: req.body.Role,
                deparatment:req.body.deparatment,
            Manager:req.body.Manager,
            DateOFBirth: new Date(req.body.DateOFBirth),
            DateOfJoining: new Date(req.body.DateOfJoining),
            email:req.body.email,
            ProfileImage: req.file.path,
            password: hash
            });
            employee.save()
            .then(doc =>{
                res.status(201)
                .json({
                    message:"Employee Created",
                    Employee:doc
                })
            })
            .catch(err=>{
                res.status(500)
                .json(err)
            })
        }
    });   
};

exports.editEmployee = (req,res,next)=>{
    const id = req.params.empId;
    Employee.findById(id)
    .then(doc =>{
        console.log(doc)
        if(doc.length< 0){
            res.status(401).json({
                message:" User not found"
            })
        }else{
            const hash = bcrypt.hash(req.body.password,10, (error,hash)=>{
                if(error){
                    console.log(error)
                }else{
                    const updateOps = new Employee({
                        name:req.body.name,
                        Role: req.body.Role,
                        deparatment:req.body.deparatment,
                       Manager:req.body.Manager,
                       DateOFBirth: new Date(req.body.DateOFBirth),
                       DateOfJoining: new Date(req.body.DateOfJoining),
                       email:req.body.email,
                       password:hash
                    });
                    console.log(updateOps);
                    Employee.updateOne({ _id: id}, {$set : updateOps })
                    .then(result =>{
                        res.status(200).json({
                            message:" Employee  Updated Sucessfully !",
                            result:result
                        })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message:err
                        })
                    })
                }
            }); 
        }
    })
    .catch(err=>{
        res.status(500).json(err)
    })
    
}

exports.editProfilePic = (req,res,next)=>{
    console.log(req.file)
    const id = req.params.empId;
    const updateOps = {
        ProfileImage:req.file.path
    };
    console.log(updateOps);
    Employee.updateOne({ _id: id}, {$set : updateOps })
    .then(result =>{
        res.status(201).json({
            message:" Employee  Updated Sucessfully !",
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            message:err
        })
    })
   
}

exports.deleteEmployee = (req,res,next) => {
    const id = req.params.empId;
    Employee.remove({ _id:id } )
    .then(result => {
            res.status(200).json(result)       
    })
    .cath(err => { 
        res.status(500).json({
            message:err
        })
    });
}

exports.signinUser = (req,res,next)=>{
    Employee.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length < 1){
           return res.status(401).json({
                message:"Auth failed"
            });
        }

        bcrypt.compare(req.body.password,user[0].password,(err,result) => {
            if(err){
               return res.status(401).json({
                    message:"Auth Faiiled"
                });
            }

            if(result){
             const token =  jwt.sign({
                    email:user[0].email,
                    empId:user[0]._id
                },
                '!@#$qwer', // scerect key
                {
                    expiresIn:"1h"
                });
               return res.status(200).json({
                    message:"Auth Sucess",
                    token:token
                });
            }

          res.status(401).json({
                message:"Auth Faiiled"
            });
        })
    })
    .catch(err=>{
        res.status(500)
        .json(err)
    })
}

exports.createExport =  (req,res,next)=>{
    Employee.find({})
    .populate('deparatment','name')
    .then(result=>{
    //   console.log(result);
      if(result>0){
          empExport = fs.fs.createWriteStream()
             }
    })
    .catch(err=>{
        console.log(err)
    })       
}

