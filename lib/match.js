// Exports club manager match module

// Dependencies
var async = require('async');
var cmUtils = require('./club_manager_utils.js');

function Match(){}
var dbName = 'cm_match';

// Add custom object type
// cos = pencilblue custom object service
// util = pencilblue utilities
// cb = callback(error, boolean)
Match.install = function(cos, util, cb) {
	// Custom object fields
	var matchReport = {
		name: dbName,
		fields: {
			title: { field_type: 'text' },
			date: { field_type: 'date' },
			season: { field_type: 'peer_object', object_type: 'custom:cm_season' },
			description: { field_type: 'wysiwyg' },
			players: { field_type: 'child_objects', object_type: 'custom:cm_player' }
		}
	};

	return cmUtils.createCustomObjectType(cos, util, dbName, matchReport, cb);
};

// Clear match objects and remove custom object type
// cos = pencilblue custom object service
// util = pencilblue utilities
// cb = callback(error, boolean)
Match.uninstall = function(cos, util, cb) {
	return cmUtils.removeCustomObjectType(cos, util, dbName, cb);
};

// Query all matches from the database
// cos = pencilblue custom object service
// util = pencilblue utilities
// cb = callback(err, data)
Match.getAll = function(cos, util, cb) {
	var selection = ['name', 'title', 'date', 'description', 'players', 'season'];
	cmUtils.queryCustomObjects(cos, util, dbName, selection, function(err, data) {
    // Fetch all players for each match 
    // So it's a 2-dimensional parallel fetch
    // For each match, fetch children.
    // Replace the old match with the match that includes the child objects.
    // After all queries are complete call the 'master' cb with the data.
    cmUtils.getCustomObjectTypeId(cos, util, dbName, function(err, typeId) {
      async.each(data, function(match, cb) {
        // Set fetch depth to 2: Includes player images (media objects).
        var options = { fetch_depth: 2 };
        cos.fetchChildren(match, options, typeId.toString(), function(err, object) {
          // If found, the match is overwritten with 
          // the object that includes the child objects.
          cb(err);
        }); 
      }, function(err) {
        cb(err, data);
      });
    });
  });
};

// Query all matches of the given season
Match.loadBySeason = function(seasonId, cos, util, cb) {
  cmUtils.getCustomObjectTypeId(cos, util, dbName, function(err, typeId) {
    cos.loadBy(typeId.toString(), {season: seasonId}, function(err, matches) {
      cb(err, matches);
    });
  });
}

// Query Match by name. Custom object name field is unique.
// name:  Match name
// cos: pencilblue custom object service instance
// util: pencilblue utilites
// cb = callback(error, data)
// data:  {match, season, players}
Match.loadByName = function(name, cos, util, cb) {
  // Load Match type id
  cmUtils.getCustomObjectTypeId(cos, util, dbName, function(error, typeId) {
    // Load match data
    cos.loadByName(typeId.toString(), name, function(error, match) {
      if(util.isError(error)) {
        cb(error);
      }

      // Load season
      cos.loadById(match.season, function(err, season) {
        // Create return data object
        var data = {
          match: match,
          season: season,
          players: []
        };

        // Load players and add players to return data
        async.each(match.players, function(playerId, cb) {
          cos.loadById(playerId, function(err, player) {
            data.players.push(player);
            cb();
          });
        }, function(err) {
          cb(err, data);
        });
      });
    });
  });
};

module.exports = Match;
