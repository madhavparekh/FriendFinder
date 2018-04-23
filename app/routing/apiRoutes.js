var express = require('express');
var path = require('path');

//mysql
var connection = require('../../dbConnection');

var bestMatch = -1;
var bestMatchID = '';

connection.connect((err) => {
  if (err) console.log(err);
});

var router = express.Router();

router.get('/friends', (req, res) => {
  connection.query('select * from profiles', (err, data, fls) => {
    if (err) throw err;
    else res.send(data);
  });
});

router.post('/friends', (req, res) => {
  console.log(req.body);

  var surveyAns = Object.values(req.body)
    .slice(2)
    .map((e) => {
      return parseInt(e);
    });

  //query db and get all existing members
  connection.query('select * from profiles', (err, data, fls) => {
    if (err) throw err;
    else {
      //parse thru each row
      data.forEach((e) => {
        var existingSurveyAns = Object.values(e)
          .slice(3)
          .map((i) => {
            return parseInt(i);
          });

        runMatchAlgo(surveyAns, existingSurveyAns, e.id);
      });
      //display bff with Modal message
      getBffInfo(bestMatchID, req.body, res);

      //insert new user into db
      connection.query(
        `INSERT INTO profiles (name, picurl, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
        Object.values(req.body),
        (err, res, fls) => {
          if (err) throw err;
          else console.log(`DB updated`);
        }
      );
    }
  });
});

function getBffInfo(id, newUser, res) {
  connection.query(
    `SELECT name, picurl FROM profiles WHERE id=${id}`,
    (err, data, fls) => {
      if (err) throw err;
      else {
        var bff = {
          bffName: data[0].name,
          bffURL: data[0].picurl,
          newName: newUser.name,
          newURL: newUser.picURL,
        };
        res.render('bffmatch', bff);
      }
    }
  );
}

function runMatchAlgo(newUser, existingUser, id) {
  var matchIndx = 0;

  newUser.forEach((e, i) => {
    matchIndx += Math.abs(e - existingUser[i]);
  });

  if (bestMatch < 0 || bestMatch > matchIndx) {
    bestMatch = matchIndx;
    bestMatchID = id;
  }
}

module.exports = router;
