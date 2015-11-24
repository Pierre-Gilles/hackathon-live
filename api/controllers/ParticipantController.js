/**
 * ParticipantController
 *
 * @description :: Server-side logic for managing participants
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	create: function(req, res){
		Participant.create({name: req.param('name'), team: req.param('team')}, function(err, participant){
			if(err) return res.badRequest(err);
			
			return res.status(201).json(participant);
		});
	}
	
};

