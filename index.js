const mysql = require('mysql');
const express = require('express');
var app = express();
var path=require('path');
const bodyParser= require('body-parser');

app.use(bodyParser.json());


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password :'',
    database : 'contact'
});

mysqlConnection.connect((err)=>{
    if(!err)
    {
        console.log('db connected');
    }
    else
    {
        console.log(JSON.stringify(err,undefined,2));
    }
});

app.listen(3000,()=>{
    console.log('Express server is running at port no 3000');
});

// get all contact from the database.
app.get('/contact',(req,res)=>{
    mysqlConnection.query('SELECT * FROM people',(err,rows,fields)=>{
        if(!err)
        // console.log(rows);
        res.send(rows);
        else
        console.log(err);
    });
});

// get contact according top id
app.get('/contact/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM people where id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        // console.log(rows);
        res.send(rows);
        else
        console.log(err);
    });
});

//  get contact according to id
app.delete('/contact/delete/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM people where id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        // console.log(rows);
        res.send("Deleted Successfully");
        else
        console.log(err);
    });
});

