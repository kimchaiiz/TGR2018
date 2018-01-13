var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;



var temperature = new Schema({
    teamID: {
        type: Number
    },
    sensID: {
        type: String
    },
    val: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
});





var accelerometer = new Schema({
    teamID: {
        type: Number
    },
    sensID: {
        type: String
    },
    val_x: {
        type: String
    },
    val_y: {
        type: String
    },
    val_z: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
});



var din = new Schema({
    teamID: {
        type: Number
    },
    sensID: {
        type: String
    },
    val: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
});
var alert = new Schema({
    teamID: {
        type: Number
    },
    alert: {
        type: String
    },

    date: {
        type: String,
        default: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        
    }
});


module.exports = {

    temperature: mongoose.model('temperature', temperature),

    accelerometer: mongoose.model('accelerometer', accelerometer),
    din: mongoose.model('din', din),
    alert: mongoose.model('alert', alert)

}