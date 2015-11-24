/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	create: function(req, res) {
		Team.create({name: req.param('name'), repository: req.param('repository') }, function(err, team){
			if(err) return res.badRequest(err);
			
			return res.status(201).json(team);
		});
	},
	
	
	modifyRepo: function(req, res){
		Team.update({id: req.param('id')}, {repository: req.param('repository')}, function(err, team){
			if(err) return res.badRequest(err);
			
			return res.json(team);
		});
	}
	
};

