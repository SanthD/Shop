const express = require('express');
const router = express.Router();
const EmployeeController = require('../controller/employee');
const multer   = require('multer');
const Authorization = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null,'./uploads/');
    },
    filename : function(req,file,cb){
        cb(null, new Date().toISOString()+file.originalname);
    }
});

const fileFilter = (req,file,cb)=>{
   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true) 
   }else{
    cb(null,false)
   }
}

const uploads = multer({storage:storage,limits:{
    size:1024*1024*5
},fileFilter:fileFilter});


router.get('/', EmployeeController.getAllEmployee);
router.get('/creatEmpExport', EmployeeController.createExport);
router.get('/:empId', EmployeeController.getSingleEmployee);

router.post('/',uploads.single('ProfileImage'), EmployeeController.createEmployee);

router.patch('/:empId',Authorization,EmployeeController.editEmployee);

router.patch('/ProfilePic/:empId',Authorization,uploads.single('ProfileImage'), EmployeeController.editProfilePic);

router.delete('/:empId',Authorization,EmployeeController.deleteEmployee);

router.post('/signin', EmployeeController.signinUser);


module.exports = router;