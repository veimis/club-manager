// Export admin module

// Dependencies
var async = require('async');
var match = require('./match.js');
var matchStats = require('./match_statistics.js');

function clubManagerAdmin(){}

// Get data required in the admin view.
clubManagerAdmin.getAdminData = function(cos, util, dao, cb) {
  var data = {stats: []};
  match.getAll(cos, util, function(err, matches) {
    data.matches = matches;
    async.each(data.matches, function(match, cb) {
      matchStats.loadByMatch(match._id, dao, util, function(err, stats) {
          console.log(match._id, stats);
          if(!util.isError(err)) {
            data.stats.push(stats);
          }
          cb(err);
        });
      }, 
      cb(err, data)
    );
  });
}

module.exports = clubManagerAdmin;
