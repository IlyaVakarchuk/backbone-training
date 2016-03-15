var express = require('express'),
  router = express.Router(),
  thirdParty = require('../thirdParty');

router.post('/user',function(req,res) {
  sess=req.session;

  var password = passwordHash.generate(req.body.password),
    dbPointer = db.db();

  dbPointer.collection('users').find({email : req.body.email}).toArray(function (err, result) {
    if (err) {
      res.end('{"notice" : "Error", "message" : ' + err +'}');
    } else if (result.length) {
      if ((passwordHash.verify(req.body.password, result[0]['password']))) {
        req.session.email = req.body.email;
        var str = '{ "action" : "auth", "notice" : "Success", "email" : "' +result[0]['email'] + '", "likes" : "'+result[0]['likes'] +  '", "root" : "' + result[0]['root'] + '" }';
        res.end(str);
      } else {
        res.end('{"action" : "auth", "notice" : "Error", "message" : "Incorrect password"}');
      }
    } else {
      dbPointer.collection('users').insert({email : req.body.email ,
        password : password,
        likes : [],
        root : 0}, function(error, resl) {
          if (error) {
            res.end('{"action" : "auth", "notice" : "Error", "message" : ' + error +'}');
          } else {
            req.session.email = req.body.email;
            var str = '{"action" : "auth", "notice" : "Success", "email" : "' + req.body.email + '", "root" : "0" }';
            res.end(str);
          }
      });
    }
  });
});

router.get('/post/', function(req, res) {
  var dbPointer = db.db();

  dbPointer.collection('tabs').find().toArray(function (error, data) {
    if (error) {
      console.log(err);
      res.end('{"notice" : "Error", "message" : ' + err +'}');
    } else  {
      console.log(data);
      res.send(data);
    }
  });
});

router.delete('/post/:id', function(req, res) {
  var dbPointer = db.db();

  dbPointer.collection('tabs').deleteOne({'id' : req.params.id}, function (error, userdata) {
    if (error) {
      console.log(err);
      res.end('{"notice" : "Error", "message" : ' + err +'}');
    } else if (userdata.length) {
      var str = '{"action" : "delete", "notice" : "Success" }';
      res.end(str);
    }
  });
});

router.put('/post/:id', function(req, res) {
  var dbPointer = db.db();

  dbPointer.collection('tabs').find({ "id" : req.params.id }).toArray(function (error, data) {
    if (error) {

      console.log(err);
      res.end('{"notice" : "Error", "message" : ' + err +'}');
    } else  {
      var newLikeCount = 0, action;
      if (req.body.likeState) {
        newLikeCount = parseInt(req.body.like) + 1;
      } else {
        newLikeCount = parseInt(req.body.like) - 1;
      }
      console.log(req.params.id);
      dbPointer.collection('tabs').updateOne({ "id" : req.params.id  }, { $set: { "like": newLikeCount }},
        function(err, results) {
          if (req.body.likeState) {
            dbPointer.collection('users').updateOne({email : req.body.email}, {$push: { likes :req.params.id} },
              function(err2, res2) {
                  res.send('{"action" : "like"}');
              });
          } else {
            dbPointer.collection('users').updateOne({email : req.body.email}, {$pull: { likes :req.params.id} },
              function(err2, res2) {
                 
                  res.send('{"action" : "like"}');
              });
          }
          
        }); 
    }
  });
});

router.post('/logout',function(req,res) {
  req.session.destroy(function(err) {
    if(err){
      console.log(err);
    }
    else {
      res.send('{"action" : "logout"}');
    }
  });
});

module.exports = router;