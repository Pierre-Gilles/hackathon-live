/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	create: function(req, res) {
		Team.create({name: req.param('name'), repository: req.param('repository') }, function(err, repo){
			if(err) return res.badRequest(err);
			
			return res.status(201).json(repo);
		});
	}
	
};

