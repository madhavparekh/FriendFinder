var express = require('express');
var expHandles = require('express-handlebars');
var mySQL = require('mysql');

//mysql
var connection = require('./dbConnection');

connection.connect((err) => {
  if (err) console.log(err);

  connection.query('select * from profiles', (err, res, fls)=>{
    console.log(res);
  });
});
