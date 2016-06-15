var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/show-data',function(req,res){
  var getArray = [];
  for (var info in req.query){
    getArray.push({'name':info,'value':req.query[info]})
  }
  var context = {};
  context.getInfo = getArray;
  context.myVar = "GET request received";
  res.render('show-data', context);
});


app.post('/show-data', function(req,res){
  var postArray = [];
  var postQuery = [];

  for (var info in req.query){
    postQuery.push({'name':info,'value':req.query[info]})
  }

  for (var info in req.body){
    postArray.push({'name':info,'value':req.body[info]})
  }

  var context = {};
  context.postInfo = postArray;
  context.postQ = postQuery;
  context.myVar = "POST request received";

  res.render('show-data', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});


