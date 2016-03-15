(function(){
  var client = require('mongodb').MongoClient,
    mongodb;
  var assert = require('assert');

  module.exports =  {
    connect: function(dburl, callback) {
      client.connect(dburl,
        function(err, db){
          mongodb = db;
          if(callback) { callback(); }
        });
    },
    db: function() {
      return mongodb;
    }
  };
})();