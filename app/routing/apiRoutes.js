var express = require('express');
var path = require('path');

//mysql
var connection = require('../../dbConnection');

connection.connect((err) => {
  if (err) console.log(err);

  connection.query('select * from profiles', (err, res, fls) => {
    data = res;
  });
});

var router = express.Router();

router.get('/friends', (req, res) => {
  console.log(req.params);
  res.send(data);
});

module.exports = router;
