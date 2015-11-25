

var sqlGetOneScores = 'SELECT MAX(points) as points, team.id, team.name, team.repository '
				+ 'FROM score '
				+ 'JOIN team ON (score.team = team.id) '
				+ 'WHERE team.id = ? '
				+ 'GROUP BY team.id ';

module.exports = {
	/**
	 * Update the score of a specific repository 
	 * Score = newScore + oldScore/10
	 * */
	updateTeamScore: function(repo, points , cb){
		Team.findOne({repository: repo}, function(err, team){
			if(err) return cb(err);
			
			if(!team) return cb('No team found');
			
			Score.create({team: team.id, points: points}, cb);
		});
	}	
};