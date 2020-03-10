let jwt = require('jsonwebtoken');
let config = require('./config');
let MongoHandler = require('./mongoHandler');

module.exports = class HandlerGenerator {
    login (req, res) {
      let username = req.body.username;
      let password = req.body.password;

     
      if (username && password) {
        MongoHandler.getdata({username,password},function(err,user){
          if(err || user == null){
            res.statusCode = 403;
            res.json({
              success: false,
              message: 'Incorrect username or password'
            });
          }else{
            
            let token = jwt.sign({username: username},
              config.secret,
              { 
                expiresIn: '24h' // expires in 24 hours
              }
            );
            // return the JWT token for the future API calls
            res.json({
              success: true,
              message: 'Authentication successful!',
              token: token
            });
          }
  
        })
      } else {
        res.statusCode = 400;
        res.json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    }
    index (req, res) {
      res.json({
        success: true,
        message: 'Index page'
      });
    }
  }
  