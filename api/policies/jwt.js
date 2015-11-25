/**
 * jwt
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any valid JWT
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  
  var token = req.headers['authorization'];

  // verify a token symmetric
  jwt.verify(token, sails.config.jwt.secret, function(err, decoded) {
      if(err) return res.forbidden();
    
      
      Admin.findOne({id: decoded.id}, function(err, user){
          if(err || !user) return res.forbidden();

          req.User = user;
          return next();
      });
  });
};
