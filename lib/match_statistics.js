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

// Clear match statistics objects and remove custom object type
// cos = pencilblue custom object service
// util = pencilblue utilities
// cb = callback(error, boolean)
MatchStatistics.uninstall = function (cos, util, cb) {
	return cmUtils.removeCustomObjectType(cos, util, dbName, cb); 
};

// Query match statistics for a match
// match:
// cos = pencilblue custom object service
// util = pencilblue utilities
// cb = callback(error, data)
MatchStatistics.loadByMatch = function(match, cos, util, cb) {
  var options = {
    where: {match: match.toString()}
  };
  cmUtils.queryCustomObjects(cos, util, dbName, options, function(err, data) {
	cmUtils.fetchChildren(cos, util, dbName, data, 1, cb);
  });
};

module.exports = MatchStatistics;


