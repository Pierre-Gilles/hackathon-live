

var sqlGetOneScores = 'SELECT MAX(points) as points, team.id, team.name, team.repository '
				+ 'FROM score '
				+ 'JOIN team ON (score.team = team.id) '
				+ 'WHERE team.id = ? '
				+ 'GROUP BY team.id '
				+ 'ORDER BY points DESC; ';

module.exports = {
	updateTeamScore: function(repo, points , cb){
		Team.find({repository: repo}, function(err, team){
			if(err) return cb(err);
			
			Score.query(sqlGetOneScores, [team.id], function(err, scores){
				if(err) return cb(err);
				
				points = points + parseInt(scores.points)/2;
				
				Score.create({team: team.id, points: points}, cb);
			});
		});
	}	
};