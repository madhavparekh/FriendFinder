var express = require('express');
var path = require('path');
var questions = require('../data/surveyQues');

var router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/survey', (req, res) => {
  res.render('survey', {
    questions: questions,
  });
});

module.exports = router;
