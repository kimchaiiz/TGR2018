var mongoose = require("mongoose");
var moment = require("moment");
var schema = require("../models/schema");
var temperature = schema.temperature;
var pressure = schema.pressure;
var humidity = schema.humidity;
var gyroscope = schema.gyroscope;
var accelerometer = schema.accelerometer;
var magnetometer = schema.magnetometer;
var din1 = schema.din;
var DataController = {};
var log = {
    "temperature": temperature,
    "pressure": pressure,
    "humidity": humidity,
    "gyroscope": gyroscope,
    "accelerometer": accelerometer,
    "magnetometer": magnetometer,
    "din1": din1
};

//show temp
DataController.temperature = function(req, res) {
    temperature.find().sort({_id:-1}).exec(function(err, Datas) {
        if (err) {
            console.log("Error:", err);
        } else {
            res.render("../views/temp", { Datas: Datas, type: "temperature" });
        }
    });
};

//show temp
DataController.din1 = function(req, res) {
    din1.find().sort({_id:-1}).exec(function(err, Datas) {
        if (err) {
            console.log("Error:", err);
        } else {
            res.render("../views/temp", { Datas: Datas, type: "din1" });
        }
    });
};

//show status
DataController.status = function(req,res){
    res.redirect("/alertmatlab!",{req,res});
}

// Show list of acc
DataController.accelerometer = function(req, res) {
    accelerometer.find().sort({_id:-1}).exec(function(err, Datas) {
        if (err) {
            console.log("Error:", err);
        } else {
            res.render("../views/acc", { Datas: Datas, type: "accelerometer" });
        }
    });
};

   var Accs 
    var Temps
    var Dins 

// Show list of time after 30 mins
DataController.time = function(start_time,end_time,res) {
    


    var instarthours = start_time.substr(0,2);
    var instartmins = start_time.substr(2,4);
    var instophours = end_time.substr(0,2);
    var instopmins = end_time.substr(2,4);

    var dateTimeStart = new Date();
    dateTimeStart = moment(dateTimeStart).set({ hours: instarthours, minute: instartmins });
    dateTimeStart = moment(dateTimeStart).format("YYYY-MM-DD HH:mm:ss");
    var dateTimeStop = new Date();
    dateTimeStop = moment(dateTimeStop).set({ hours: instophours, minute: instopmins });
    dateTimeStop = moment(dateTimeStop).format("YYYY-MM-DD HH:mm:ss");

    console.log(dateTimeStart);
    console.log(dateTimeStop);
    temperature.find({ 'date': { $gt: dateTimeStart, $lte: dateTimeStop } }).exec(function(err, Datas) {
        Temps =Datas;
        
    });
        accelerometer.find({ 'date': { $gt: dateTimeStart, $lte: dateTimeStop } }).exec(function(err, Datas) {
        Accs =Datas;
        
    });
            din1.find({ 'date': { $gt: dateTimeStart, $lte: dateTimeStop } }).exec(function(err, Datas) {
        Dins=Datas;
        
    });
            setTimeout(function(){
    
     res.send({Temps,Accs,Dins});

 },200);
};



module.exports = DataController;