
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , fs   = require('fs')
  , path = require('path');

var app = module.exports = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

if (process.env.BUILD) {
  app.render('fr', function (err, resp) {
    fs.writeFileSync('fr.html', resp);
  });

  app.render('en', function (err, resp) {
    fs.writeFileSync('en.html', resp);
  });
} else {

  app.get('/', routes.en);
  app.get('/en.html', routes.en);
  app.get('/fr.html', routes.fr);

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });

}
