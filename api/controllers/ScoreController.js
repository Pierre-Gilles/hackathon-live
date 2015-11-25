/**
 * ScoreController
 *
 * @description :: Server-side logic for managing Scores
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var sqlGetScores = 'SELECT MAX(points) as points, team.id, team.name, team.repository '
				+ 'FROM score '
				+ 'JOIN team ON (score.team = team.id) '
				+ 'GROUP BY team.id '
				+ 'ORDER BY points DESC; ';
				
var sqlGetOneScores = 'SELECT MAX(points) as points, team.id, team.name, team.repository '
				+ 'FROM score '
				+ 'JOIN team ON (score.team = team.id) '
				+ 'WHERE team.id = ? '
				+ 'GROUP BY team.id '
				+ 'ORDER BY points DESC; ';


module.exports = {
	
	index: function(req, res) {
		Score.query(sqlGetScores, [], function(err, scores) {
			if(err) return res.serverError(err);
			
			return res.json(scores);
		});
	},
	
	create: function(req, res){
		
		Score.query(sqlGetOneScores, [req.param('team')], function(err, scores){
			if(err) return res.serverError(err);
			
			if(!scores.length) return res.notFound();
			
			var newPoints = parseInt(scores[0].points) + parseInt(req.param('points'));
			
			Score.create({team: req.param('team'), points: newPoints}, function(err, score){
				if(err) return res.serverError(err);
				
				// send a broadcast message to all connected clients
              	sails.sockets.blast('newScore', score);
				
				return res.status(201).json(score);
			});
		});
	}
	
};

