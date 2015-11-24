



module.exports = {
	updateTeamScore: function(repo, points , cb){
		Team.find({repository: repo}, function(err, team){
			if(err) return cb(err);
			
			Score.create({team: team.id, points: points}, cb);
		});
	}	
};