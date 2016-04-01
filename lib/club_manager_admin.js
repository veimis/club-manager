// Export admin module

// Dependencies
var matchStats = require('./match_statistics.js');

function clubManagerAdmin(){}

clubManagerAdmin.getAdminData = function(cb) {
  var data = {stats: "test"};
  cb(null, data);
}

module.exports = clubManagerAdmin;
