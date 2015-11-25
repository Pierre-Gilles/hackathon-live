/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
	
	
	index: function(req, res){
		return res.view('admin');	
	},
	
	
	create: function(req, res) {
		if (!req.param('name') || !req.param('password')) {
			return res.badRequest();
		}
		
		Admin.create({name: req.param('name'),password: req.param('password')}, function(err, admin){
			if(err) return res.serverError();
			
			delete admin.password;
			var token = jwt.sign({ id: admin.id }, sails.config.jwt.secret);
			admin.token = token;
			
			return res.json(admin);
		});
	},
	
	login: function(req, res) {
		
		if (!req.param('name') || !req.param('password')) {
			return res.badRequest();
		}
		
		Admin.findOne({name:req.param('name')}, function(err, admin){
			
			if(err) return res.badRequest(err);
			
			if(!admin){
				res.status(422);
				return res.json({error:'Admin not found'});
			}
			
			// Compare password from the form params to the encrypted password of the user found.
			bcrypt.compare(req.param('password'), admin.password, function(err, valid) {
				if (err) return next(err);

				// If the password from the form doesn't match the password from the database...
				if (!valid) {
					
					res.forbidden();
					return;
				}
				
				var token = jwt.sign({ id: admin.id }, sails.config.jwt.secret);
				
				return res.json({token:token});

				
			});
		});
	}
	
};

