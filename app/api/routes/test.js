const express = require('express');
const router = express.Router();
router.post('/login',(req,res,next)=>{
    // testUser.create(req.body)
    // .then(result => res.status(201).json(result))
    // .catch(err => res.status(400).json(err))
    res.status(201).json({
        "mssage":'Reviced Data !',
        data:req.body
    })
});


module.exports = router;