var GitHubApi = require("github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: false,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    timeout: 5000,
    headers: {
        "user-agent": "Hackathon UTC Live wall" // GitHub is happy with a unique user agent
    }
});

function stat(user, repo, cb){
	github.repos.getStatsCommitActivity({
		user: user,
		repo: repo
	}, cb);
}

module.exports = {
	
	// return number of commits of a given repo
	getNbOfCommits: function(user, repo, cb){
		stat(user, repo, function(err, res){
            if(err) return cb(err);
            
            var total = 0;
            for(var i = 0; i < res.length; i++){
                total += res[i].total;
            }
            
            cb(null, total);
        });
	}	
};