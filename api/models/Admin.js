/**
* Admin.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcryptjs');

module.exports = {

  attributes: {
    
    name: {
      type:'string',
      required:true,
      unique: true
    },
    
    password: {
      type:'string',
      required:true
    }

  },
  
  beforeCreate: function (values, next) {

      bcrypt.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
        if (err) return next(err);
        
        values.password = encryptedPassword;
        next();
      });
      
  }
};

