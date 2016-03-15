var express = require('express'),
  router = express.Router();

router.use('/*', function(req, res){
  res.render('index.html');
});

module.exports = router;