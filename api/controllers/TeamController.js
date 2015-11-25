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
			
			var repo = team.repository.split("/");
			GithubService.getNbOfCommits(repo[0], repo[1], function(err, points){
				if(err){
					return res.status(500).json(err);
				} else {
					Score.create({team: team.id, points: points }, function(err, score ){
						if(err) return res.status(500).json(err);
						
						// send a broadcast message to all connected clients
						sails.sockets.blast('newTeam', {
							id: team.id,
							name: team.name,
							repository: team.repository,
							points: score.points
						});
						
						return res.status(201).json(team);
					});
				}
			});
			
			
		});
	},
	
	
	modifyRepo: function(req, res){
		Team.update({id: req.param('id')}, {repository: req.param('repository')}, function(err, team){
			if(err) return res.badRequest(err);
			
			return res.json(team);
		});
	}
	
};

