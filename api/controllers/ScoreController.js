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

module.exports = {
	
	index: function(req, res) {
		Score.query(sqlGetScores, [], function(err, scores) {
			if(err) return res.serverError(err);
			
			return res.json(scores);
		});
	}
	
};

