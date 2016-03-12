// Exports match statistics module

// Dependencies
var cmUtils = require('./club_manager_utils.js');

function MatchStatistics(){}
var dbName = "cm_match_statistics";

// Add new custom object type
// cos = pencilblue custom object service
// util =  pencilblue utilities
// cb = callback(error, boolean)
MatchStatistics.install = function (cos, util, cb) {
	// Custom object fields
	var matchStatistics = {
		name: dbName,
		fields: {
      // TODO: Limit to goal, assist, booking
			type: { field_type: 'text' },
			player: { field_type: 'peer_object', object_type: 'custom:cm_player' },
      match: { field_type: 'peer_object', object_type: 'custom:cm_match' },
      // TODO should be minutes of game time
      time: { field_type: 'text'}
		}
	};

	return cmUtils.createCustomObjectType(cos, util, dbName, matchStatistics, cb);
};

// Clear player objects and remove custom object type
// cos = pencilblue custom object service
// util = pencilblue utilities
// cb = callback(error, boolean)
MatchStatistics.uninstall = function (cos, util, cb) {
	return cmUtils.removeCustomObjectType(cos, util, dbName, cb); 
};

module.exports = MatchStatistics;


