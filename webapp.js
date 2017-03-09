var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var config = require('./config');

var url = config.database;
var db;

app.set('port', process.env.PORT || 3000);

app.use(express.static('static'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing 



/*app.get('/', function (req, res) {
  res.send('Hello World from Hashnode - webapp.js!')
})*/

/*
  GET /api/bugs
  Get all the bugs (no filter)
*/
app.get('/api/bugs',function(req,res){

	
	db.collection('bugs').find().toArray(function(err,docs){
		assert.equal(null,err);
		console.log('bugs found in DB : ' + docs);	
		res.json(docs);
	});


	
});

/*
  POST /api/bugs
  Insert a new bug
*/
app.post('/api/bugs',function(req,res){
	/*let bug = req.body;
	console.log(bug);
	bug.id = mybugs.length + 1;
	mybugs.push(bug);
	console.log(mybugs);
	res.json(bug);*/
	
	let bug = req.body;
	//console.log('POST bug is : ' + JSON.stringify(bug));
	db.collection('bugs').insertOne(bug,function(err,result){
		assert.equal(err,null);
		//console.log('insertOne result is : ' + result);
		//console.log('insertOne insertedCount is : ' + result.insertedCount);
		var resultId = result.insertedId;
		db.collection('bugs').find({_id:resultId}).limit(1).toArray(function(err,docs){
			assert.equal(null,err);
			//console.log('new bug added in DB : ' + JSON.stringify(docs));	
			res.json(docs[0]);
		});
	});



});
/*
curl -X POST -F 'status=open' -F 'priority=very high' -F 'owner=Papito' -F 'title=New bug' http://localhost:3000/api/bugs
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d "{'json':{'data':'here'}}" http://theurl.com/to/post/to
curl  -X POST -d "{'json':{'status':'open','priority':'very high','owner':'Papito','title':'bug title yeah'}}" http://localhost:3000/api/bugs
*/
MongoClient.connect(url,function(err,mydb){
	assert.equal(null,err);
	db = mydb;
	console.log('DB Connected');
	app.listen(app.get('port'), function () {
	  console.log('Example app listening on port ' + app.get('port'));
	})
})
