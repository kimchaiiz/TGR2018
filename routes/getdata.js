var express = require('express');
var router = express.Router();
var request = require('request');
var https = require('https');
var mongoose = require('mongoose');
var schema = require('../models/schema');
var temperature = schema.temperature;
var accelerometer = schema.accelerometer;
var din = schema.din;



router.get('/', function(req, res, next) {


    // 
    get_all_team();


    // var sensorType = req.params.sensorType;
    //res.redirect("/getdata/2");

});




function get_data_by_team(team_id) {

  request('http://10.0.0.10/api/temperature/' + team_id + '/1', function(error, response, body) {

    if (body.substr(0, 2) != "<h") {
      //  console.log(body);
      var status = JSON.parse(body).statusCode;
      //var json = JSON.parse(body).data.isT

      if (status == "00") {

        temp_data = JSON.parse(body).data;
        var data = new temperature({
          teamID: team_id,
          sensID: temp_data[0].sensID,
          val: temp_data[0].val,
          date: temp_data[0].date
        });
        var query = {
          date: data.date
        };
        temperature.update(query,data,{upsert:true},function(error,raw){
          if(error) return error;
        });

        //data.update({date:data.date},data,{upsert:true});
        console.log("add: temp", temp_data, team_id);
      }
    }
  });

  // //get acc
  request('http://10.0.0.10/api/accelerometer/' + team_id + '/1', function(error, response, body) {
    //var team = _team;
    if (body.substr(0, 2) != "<h") {
      var status = JSON.parse(body).statusCode;

      //  var json = body.isJSON();
      if (status == "00") {

        acc_data = JSON.parse(body).data;

        var data = new accelerometer({
          teamID: team_id,
          sensID: acc_data[0].sensID,
          val_x: acc_data[0].val_x,
          val_y: acc_data[0].val_y,
          val_z: acc_data[0].val_z,
          date: acc_data[0].date
        });
        var query = {
          date: data.date
        };
        // accelerometer.update(query,data,{upsert:true},function(err,raw){
        //   if(error) return handlerError(err);
        //   res.redirect("show/accelerometer");
        // });
        //data.save();
        accelerometer.update(query,data,{upsert:true},function(error,raw){
          if(error) return error;
        });
        console.log("add: acc", acc_data, team_id);
      }

    }

  });

  //setInterval(function() {  }, 100  );
  //function get_din_by_id(team_id){
  // get digital input 1
  request('http://10.0.0.10/api/din1/' + team_id + '/1', function(error, response, body) {
    //var team = _team;
    if (body.substr(0, 2) != "<h") {
      var status = JSON.parse(body).statusCode;
      //  var json = body.isJSON();
      //console.log(status);
      if (status == "00") {


        din_data = JSON.parse(body).data;
        var data = new din({
          teamID: team_id,
          sensID: din_data[0].sensID,
          val: din_data[0].val,
          date: din_data[0].date
        });
        var query = {
          date: data.date
        };
        // din.update(query,data,{upsert:true},function(err,raw){
        //   if(error) return handlerError(err);
        //   res.redirect("show/din");
        // });
        //data.save();

        din.update(query,data,{upsert:true},function(error,raw){
          if(error) return error;
        });
        console.log("add: din", din_data, team_id);
      }
    }

  });
  //  console.log(team_id);

  //}
}



function get_all_team() {

  for (var i = 11; i < 30; i++) {
    var team_id = i;

    get_data_by_team(team_id);


  }
  setTimeout(function() {
    for (var i = 30; i < 62; i++) {
      var team_id = i;

      get_data_by_team(team_id);


    }
  }, 2000);



  setTimeout(function() {
    for (var i = 40; i < 62; i++) {
      var team_id = i;

      get_data_by_team(team_id);


    }
  }, 4000);


}

module.exports = router;


module.exports = router;