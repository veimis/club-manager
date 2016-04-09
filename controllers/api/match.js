// Inherit from pb base api controller

const matchStats = require('../../lib/match_statistics.js');

module.exports = function(pb) {
  // Pencilblue dependencies
  const util = pb.util;

  function MatchApiController(){}
  util.inherits(MatchApiController, pb.BaseApiController);

  // Register controller routes 
  MatchApiController.getRoutes = function(cb) {
    const routes = [{
      method: "post",
      path: "/club-manager/api/stats",
      auth_required: true,
      content_type: 'application/json',
      request_body: ['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'],
      handler: 'saveStats'
    }];

    cb(null, routes);
  };

  // Save new statistics
  MatchApiController.prototype.saveStats = function(cb) {
    matchStats.save(this.body, new pb.DAO(), util, function(err, result) {
      cb({});
    });
  };

  return MatchApiController;
}
