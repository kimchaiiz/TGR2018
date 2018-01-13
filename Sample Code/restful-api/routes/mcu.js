var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');
var https = require('https');


var users = [
{id: 1,
name: "node"},
{id: 2,
name: "js"},
{id: 3,
name: "matlab"}
];

router.get('/', function(req,res,next){
	res.render('mcu',{users:users});
});

router.get('/getall',function(req,res,next){
	res.locals.myMCU = null;
	res.render('mcu',{
		users: users,
	});
});

router.get('/:id',function(req,res,next){
	res.locals.myMCU = null;
	res.render('mcu',{
		users: users[id],
	});
});


router.post('/showresponse',function(req,res){
	console.log('start');
	var mcu = {
	name: req.body.name,
	id: req.body.id

	}
	console.log(mcu);

});

router.get('/',function(req,res,next){
	request('url',function(error){
		var data = JSON.parse(body);
	});
});

router.get('/getTeam/:teamID',function(){

});

function get_data(teamID){
	var agent = new https.Agent({
		host: 'loraiot.cattlecom.com',
		port: '443',
		path: '/',
		rejectUnauthorized: false
	});
	var options = ({
		method: 'GET'
	});
}

module.exports = router;