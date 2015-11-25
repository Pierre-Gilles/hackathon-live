

var sqlGetOneScores = 'SELECT points, team.id, team.name, team.repository '
				+ 'FROM score '
				+ 'JOIN team ON (score.team = team.id) '
				+ 'WHERE team.id = ? '
				+ 'GROUP BY team.id '
				+ 'ORDER BY score.createdAt DESC; ';

module.exports = {
	updateTeamScore: function(repo, points , cb){
		Team.findOne({repository: repo}, function(err, team){
			if(err) return cb(err);
			
			if(!team) return cb('No team found');
			
			Score.query(sqlGetOneScores, [team.id], function(err, scores){
				if(err) return cb(err);
				console.log(scores);
				if(!scores.length) {
					scores[0] = {
						points: 0
					};
				}
				console.log(points);
				points = points + scores[0].points/2;
				Score.create({team: team.id, points: points}, cb);
			});
		});
	}	
};