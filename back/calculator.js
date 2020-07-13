const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "get");
    next();
  });

app.listen(port, () => console.log(`Calculator listening at http://localhost:${port}`));

const operations = {
    "add" : (a,b) => a+b,
    "sub" : (a,b) => a-b,
    "mul" : (a,b) => a*b,
    "div" : (a,b) => a/b
}

function checkInput(a,b) {
    let error = {
        status: true,
        message: ''
    };
    return error;
}

app.get('/:operation', (req,res,next) => {
    let error;
    let op = req.params.operation;
    if (!(op in operations)) {
        error = new Error(`operation ${op} is not supported`);
        error.statusCode = 400;
        return next(error);
    }

    let a = req.query.val1;
    let b = req.query.val2;
    
    let regex = /^[\d]{1,20}(\.[\d]*)?$/;
    if (a === '' || b === '') {
        error = new Error('Empty input');
        error.statusCode = 400;
        return next(error);
    }
    else if (!a.match(regex) || !b.match(regex)){
        error = new Error('Incorrect input structure');
        error.statusCode = 400;
        return next(error);
    }


    try {
        a = Number(req.query.val1);
        b = Number(req.query.val2);
    } catch(err) {
        error = new Error(err);
        error.statusCode = 400;
        return next(error);
    }
    res.send(operations[op](a,b).toString());
});