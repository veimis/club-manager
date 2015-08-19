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
  // Render is executed within a domain context and errors thrown 
  //  will result in an error page.
  // cb = callback(result)
  TeamController.prototype.render = function(cb) {
    var self = this;
    var cos = new pb.CustomObjectService();
    var player = cmPlayer();
 
    // Query all players
    player.getPlayers(cos, util, function(err, data) {
      if(util.isError(err)) {
        throw err;
      }

      // Register angular controller
      self.ts.registerLocal('angular', function(flag, cb) {
        var objects = {
          players: data,
        };
        var angularData = pb.ClientJs.getAngularController(objects, []);
        cb(null, angularData);
      });
      // Load team template
      self.ts.load('team', function(err, result) {
        if(util.isError(err)) {
          throw err;
        }
	    cb({content: result});
	  });
    }); 
  };
  
  // Register routes
  TeamController.getRoutes = function(cb) {
    var routes = [
      {
        method: 'get',
        path: '/club-manager/team',
        auth_required: false,
        content_type: 'text/html'
        // handler is not defined, defaults to render()
      }
    ];
    cb(null, routes);
  };
 
  return TeamController;
};

