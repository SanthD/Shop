// const converter = require('json-2-csv');
// const fs = require('fs');


// // read JSON from a file
// const todos = fs.createReadStream('todos.json');
// const exportData = JSON.parse(fs.readFileSync('todos.json'));

// // convert JSON array to CSV string
// (async () => {
//     try {
//         const csv = await converter.json2csvAsync(todos);

//         // print CSV string
//         console.log(csv);

//         // write CSV to a file
//         fs.writeFileSync('todos.csv', csv);

//     } catch (err) {
//         console.log(err);
//     }
// })();


// require json-2-csv module
const converter = require('json-2-csv');
const express = require('express');
const router  = express.Router();

// declare a JSON array
const todos = [
    {
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    },
    {
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
    },
    {
        "id": 3,
        "title": "fugiat veniam minus",
        "completed": false
    }];

// convert JSON array to CSV string

router.get('/',(req,res,next)=>{

   

    converter.json2csv(todos, (err, csv) => {
        if (err) {
            throw err;
        }
        res.status(201).sned({
            "mesaage":"CSV Created",
            data:csv
        })
        // print CSV string
        console.log(csv);
    });
})

module.exports = router;
