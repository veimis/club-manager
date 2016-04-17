// Exports match statistics module


function MatchStatistics(){}
var dbName = "cm_match_statistics";

// Create collection for match statistics in database.
// _id
// type: goal/assist/booking
// match: match reference
// goal:
//  time: time of the event
//  player: player reference
//  team: home/away
// assist:
//  player: player reference
//  goal: match event reference
// booking:
//  time: time of the event
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
  const opts = {
    where: { matchId: matchId}
  };
  dao.q(dbName, opts, cb);
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

// Delete match statistics from database
// statId: Database ID of the statistic
// dao = pencilblue data access object
// util = pencilblue utilities
// cb = callback(error, number of records deleted)
MatchStatistics.delete = function(statId, dao, util, cb) {
  dao.deleteById(statId, dbName, cb);
};

module.exports = MatchStatistics;


