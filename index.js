const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 6000;

const employeeRoute = require('./app/api/routes/employee');
const departmentRoute = require('./app/api/routes/department');
const exportRoute = require('./app/api/routes/createExports');
const tesingRoute = require('./app/api/routes/test');

const app = express();


// DB  Connection
mongoose.connect('mongodb://localhost:27017/ITC_Portal',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
},()=>console.log('DB Connected'));

mongoose.Promise = global.Promise;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/uploads",express.static('uploads'))
// Intilize route
app.use('/employee',employeeRoute);
app.use('/department',departmentRoute);
app.use('/createExports',exportRoute);
app.use('/test',tesingRoute);
//creatEmpExport
app.listen(PORT,()=>{
    console.log(`The Server is listening on ${PORT}`)
})