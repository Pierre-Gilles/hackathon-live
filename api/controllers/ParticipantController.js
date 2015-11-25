/**
 * ParticipantController
 *
 * @description :: Server-side logic for managing participants
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var sqlGet = 'SELECT participant.id, participant.name AS name, team.name AS team '
				+ 'FROM participant JOIN team ON (participant.team = team.id)';
module.exports = {
	
	
	index: function(req, res){
		Participant.query(sqlGet, [], function(err, participants){
			if(err) return res.serverError(err);
			
			return res.json(participants);
		});
	},
	
	create: function(req, res){
		console.log(req.params.all());
		Participant.create({name: req.param('name'), team: req.param('team')}, function(err, participant){
			console.log(err);
			if(err) return res.badRequest(err);
			
			return res.status(201).json(participant);
		});
	}
	
};

