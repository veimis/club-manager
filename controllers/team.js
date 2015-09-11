// Controller module for a team page showing the players of the club

// Dependencies
var cmPlayer = require('player');

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
 
    // Query all players
    cmPlayer.getPlayers(cos, util, function(err, data) {
      if(util.isError(err)) {
        throw err;
      }

      // Register angular controller
      var ok = self.ts.registerLocal('angular', function(flag, cb) {
        var objects = {
          players: data,
          selected: data[0]
        };
        var angularData = pb.ClientJs.getAngularController(objects, []);
        cb(null, angularData);
      });
			if(!ok) {
				throw new Error('Failed to register angular controller');
			}
			
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

