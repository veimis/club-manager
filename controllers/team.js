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
    cmPlayer.getAll(cos, util, function(err, data) {
      if(util.isError(err)) {
        throw err;
      }

      // Register angular objects
      var angularData = { 
        players: data,
        selected: data[0]
      };
      var angularObjects = pb.ClientJs.getAngularObjects(angularData);
      self.ts.registerLocal('angular_objects', new pb.TemplateValue(angularObjects, false));
			
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

