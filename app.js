
// Middleware dependencies
var express = require('express');
session = require('express-session'),
  bodyParser = require('body-parser'),
  passwordHash = require('password-hash'),
  fixtures = require('pow-mongodb-fixtures'),
  db = require('./src/scripts/db.js');

// Modules dependencies
var config = require('./config'),
  routesApi = require('./src/scripts/routes/routes.api'),
  routesStatic = require('./src/scripts/routes/routes.static');

var myFixtures = fixtures.connect(config.bd.bd_name, {
  host: config.bd.host,
  port: config.bd.port
});

// Server options

app = express();

//app.set('views', __dirname + '/views');
//app.engine('html', require('ejs').renderFile);
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/app', express.static(__dirname + '/app'));
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json	());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname ));

// User custom router for API
app.use('/api', routesApi);
app.use('/', routesStatic);

// Load test data in BD
myFixtures.clearAndLoad(config.bd.fixtures, function(){

  // Connect to BD
  db.connect('mongodb://'+ config.bd.host +':' + config.bd.port + '/' + config.bd.bd_name, function() {
    console.log('Connected to MongoDB');

    var dbPointer = db.db();

    // Start listen server
    app.listen(config.server.port,function(){
      console.log("App Started on PORT 3000");
    });
  });
});