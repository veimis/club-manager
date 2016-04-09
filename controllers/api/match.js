// Inherit from pb base api controller

module.exports = function(pb) {
  // Pencilblue dependencies
  var util = pb.util;

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
    console.log(this.body);
  };

  return MatchApiController;
}
