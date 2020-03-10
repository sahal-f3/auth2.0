const mongoose = require('mongoose');
let connectionString = require('./config').dbUrl;
let Users = require('./model/users').Users;

module.exports = function(){
    mongoose.connect(connectionString,{ useNewUrlParser: true , useUnifiedTopology: true});

    mongoose.connection.on('connected', function(){
        console.log("Mongoose default connection is open to ",connectionString);
    });

    mongoose.connection.on('error', function(err){
        console.log("Mongoose default connection has occured "+err+" error");
    });

    mongoose.connection.on('disconnected', function(){
        console.log("Mongoose default connection is disconnected");
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        });
    });

    function getdata(req,next){
        Users.findOne(req, function(err,user){
            next(err,user)
        });
    }

    return {getdata};
}()