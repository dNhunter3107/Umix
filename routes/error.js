var express = require('express');
var router = express.Router();
var index = require('../controllers/index');

/* Index */
// router.get('/', index.index);

router.get('/indexHelp', function(req, res) { res.render('indexHelp'); });

module.exports = router;