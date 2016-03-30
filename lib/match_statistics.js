// Exports match statistics module

// Dependencies
var cmUtils = require('./club_manager_utils.js');

function MatchStatistics(){}
var dbName = "cm_match_statistics";

// Create collection for match statistics in database.
// _id
// type: goal/assist/booking
// match: match reference
// goal:
//  player: player reference
//  team: home/away
// assist:
//  player: player reference
//  goal: match event reference
// booking:
//  player: player reference
//  card: red/yellow
MatchStatistics.install = function(dao, util, cb) {
  dao.createEntity(dbName, {}, cb);
}

// Clear match statistics objects and remove custom object type
// cos = pencilblue custom object service
// util = pencilblue utilities
// cb = callback(error, boolean)
MatchStatistics.uninstall = function (cos, util, cb) {
// TODO
	return cmUtils.removeCustomObjectType(cos, util, dbName, cb); 
};

// Query match statistics for a match
// matchID: Match object database ID.
// cos = pencilblue custom object service
// util = pencilblue utilities
// cb = callback(error, data)
MatchStatistics.loadByMatch = function(matchId, cos, util, cb) {
  var options = {
    where: {match: matchId.toString()}
  };
  cmUtils.queryCustomObjects(cos, util, dbName, options, function(err, data) {
	cmUtils.fetchChildren(cos, util, dbName, data, 1, cb);
  });
};

module.exports = MatchStatistics;


