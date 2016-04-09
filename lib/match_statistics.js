// Exports match statistics module


function MatchStatistics(){}
var dbName = "cm_match_statistics";

// Create collection for match statistics in database.
// _id
// type: goal/assist/booking
// match: match reference
// time: time of the event
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
// TODO how to remove collection from mongo db using DAO?
	cb();
};

// Query match statistics for a match
// matchID: Match object database ID.
// dao = pencilblue data access object
// util = pencilblue utilities
// cb = callback(error, data)
MatchStatistics.loadByMatch = function(matchId, dao, util, cb) {
  dao.loadByValue("match", matchId, dbName, {}, cb);
};

// Save new statistics to persist database.
// data:  Object to persist.
// dao = pencilblue data access object
// util =  pencilblue utilities
// cb = callback(
MatchStatistics.save = function(data, dao, util, cb) {
  data.object_type = dbName;
  dao.save(data, cb);
};

module.exports = MatchStatistics;


