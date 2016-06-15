var express = require('express');
var handlebars = require('express-handlebars').create({default: 'main'});
var mysql = require('./library/database.js');
var request = require('request');
var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.set('port', 3000);

app.get('/', function(req, res, next){
	var context = {};
	mysql.pool.query('SELECT * FROM "workout"', function (err, rows, fields){
		if (err){
		next(err);
		return;
		}
	var list = [];
	for (var x in rows){
		list.push({'name' : rows[x].workName, 'reps' : rows[x].reps, 'weight' : rows[x].weight, 'date' : rows[x].date, 'lbs' : rows[x].lbs, 'id' : rows[x].id})
	}
	context.workout = list;
	res.render('home', context);
	});
});

app.get('/insert', function(req,res,next){
	var context = {};
	mysql.pool.query('INSERT INTO "workout" ("name", "reps", "weight", "date", "lbs") VALUES (?, ?, ?, ?, ?)', [req.query.workName, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result){
	 if (err){
                next(err);
                return;
                }
	context.workout = result.insertId;
	res.send(JSON.stringify(context));
	});
});

app.get('/new', function(req,res,next){
	var context = {};
	mysql.pool.query('SELECT * FROM "workout" WHERE id = ?', [req.query.id], function(err, rows, fields){
	 if (err){
                next(err);
                return;
                }
	var list = [];
	for (var x in rows){
		list.push({'name' : rows[x].workName, 'reps' : rows[x].reps, 'weight' : rows[x].weight, 'date' : rows[x].date, 'lbs' : rows[x].lbs, 'id' : rows[x].id})
}

	context.workout = list[0];
	res.render('update', context);
});
});

app.get('/updating', function(req, res, next) {
	var context = {};
	mysql.pool.query('UPDATE "workout" SET workName=?, reps=?, weight=?, date=?, lbs=? WHERE id=?', [req.query.workName, req.query.reps, req.query.weight, req.query.date, req.query.lbs, req.query.id], function(err,result){
		mysql.pool.query('SELECT * FROM "workout"', function(err, rows, fields){
			 if (err){
		                next(err);
                		return;
                	}
	var list = [];
	for (var x in rows){
		list.push({ 'name' : rows[x].workName, 'reps' : rows[x].reps, 'weight' : rows[x].weight, 'date' : rows[x].date, 'lbs' : rows[x].lbs, 'id' : rows[x].id})
}
	context.workout = list;
	res.render('home', context);
});
});
});

app.get('/delete', function(req, res, next){
	var context = {};
	mysql.pool.query('DELETE FROM "workout" WHERE id = ?', [req.query.id], function(err,result){
		 if (err){
                                next(err);
                                return;
                        }
	mysql.pool.query('SELECT * FROM "workout"', function(err, rows, fields){
		 if (err){
                                next(err);
                                return;
                        }
		context.results = JSON.stringify(rows);
		res.render('home', context);
});
});
});

	
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workout", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workout("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});
 
app.use(function(req, res){
	res.status(404);
	res.render(404);
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render(500);
});

app.listen(app.get('port'), function(){
	console.log("Started");
});
