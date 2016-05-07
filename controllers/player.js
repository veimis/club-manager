// Controller module for a team page showing the players of the club

// Dependencies
var cmUtils = require('../lib/club_manager_utils.js');

module.exports = function(pb) {
  // Pencilblue dependencies
  var util = pb.util;
  
  // Create the controller
  function PlayerController(){};
  
  // Inherits from base controller: accessors for template service, 
  // localization service, request and response handlers.
  util.inherits(PlayerController, pb.BaseController);

  ///////////////////////////////////////////////////////////////////
  // Render player template
  // Render is executed within a domain context and errors thrown 
  //  will result in an error page.
  // cb = callback(result)
  ///////////////////////////////////////////////////////////////////
  PlayerController.prototype.render = function(cb) {
    const self = this;
    console.log(self.query.name);
    
    cmUtils.defaultTemplateValues(pb, self, function(err) {
      self.ts.load('player', function(err, result) {
        if(util.isError(err)) {
          throw err;
        }

        cb({content: result});
      });
    });
  };

  ///////////////////////////////////////////////////////////////////
  // Register routes
  // Pencilblue will call getRoutes() for each controller in the
  // controllers folder during initialization to regiser handlers
  // for the routes.
  ///////////////////////////////////////////////////////////////////
  PlayerController.getRoutes = function(cb) {
    var routes = [
      {
        method: 'get',
        path: '/club-manager/player/',
        auth_required: false,
        content_type: 'text/html'
        // handler is not defined, defaults to render()
      }
    ];

    cb(null, routes);
  };

 return PlayerController;
};
