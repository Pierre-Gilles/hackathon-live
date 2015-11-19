/**
* Team.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    
    name:{
      type: 'string',
      required: true
    },
    
    // repository full_name
    // example : "Pierre-Gilles/hackathon-live"
    repository: {
      type:'string'
    },
    
    participants: {
      collection: 'Participant',
      via: 'team'
    },
    
    scores: {
      collection: 'Score',
      via: 'team'
    }
   
  }
};

