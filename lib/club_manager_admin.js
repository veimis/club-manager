// Export admin module

// Dependencies
var match = require('./match.js');
var matchStats = require('./match_statistics.js');

function clubManagerAdmin(){}

// Get data required in the admin view.
clubManagerAdmin.getAdminData = function(cos, util, dao, cb) {
  var data = {stats: "test"};
  match.getAll(cos, util, function(err, matches) {
    data.matches = matches;
    cb(null, data);
  });
}

module.exports = clubManagerAdmin;
