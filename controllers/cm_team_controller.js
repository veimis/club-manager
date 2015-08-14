// Controller module for the team page showing the players of the club

// Dependencies
var cmPlayer = require('cm_player_module');

module.exports = function(pb) {
  // Pencilblue dependencies
  var util = pb.util;
  var BaseController = pb.BaseController;
  
  // Create the controller
  function TeamController(){};
  
  // Inherits from base controller: accessors for template service, 
  // localization service, request and response handlers.
  util.inherits(TeamController, BaseController);

  // Render team template
  TeamController.prototype.render = function(cb) {
    var self = this;
    var cos = new pb.CustomObjectService();
    var player = cmPlayer();
    player.getPlayers(cos, util, function(err, data) {
      self.ts.registerLocal('angular', function(flag, cb) {
        var objects = {
          players: data,
          test: false};
        var angularData = pb.ClientJs.getAngularController(objects, []);
        cb(null, angularData);
      });
 
      self.ts.load('team', function(error, result) {
        if(util.isError(error)) {
          throw error;
        }

	    cb({content: result});
	  });
    }); 
  };
  
  TeamController.getRoutes = function(cb) {
    var routes = [{
      method: 'get',
      path: "/club-manager/team",
      auth_required: false,
      content_type: 'text/html'
      // function is not defined, defaults to render
    }];
    cb(null, routes);
  };

  return TeamController;
};

