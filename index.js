
/**
 * Module dependencies.
 */

var express = require('express');
var superagent = require('superagent');
var consolidate = require('consolidate');

var app = express();

//Configure template engine
app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

var user = 'azat_co';
var story_slug = 'kazan';

var api_key = "";
var username = "";
var _token = "";

app.get('/', function(req, res){
	superagent.get("http://api.storify.com/v1/stories/" + user + "/" + story_slug)
	.query({
		api_key: api_key,
		username: username,
		_token: _token
	})
	.set({ Accept: 'application/json' })
	.end(function(e, storifyResponse) {
		if(e) next(e);
		return res.render('index', storifyResponse.body.content);
	});
});

app.listen(3001);

/*
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/
