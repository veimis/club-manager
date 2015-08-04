// Controller module for the team page showing the players of the club

module.exports = function(pb) {
  // Pencilblue dependencies
  var util = pb.util;
  var BaseController = pb.BaseController;
  
  // Create the controller
  function TeamController(){};
  // Inherits from base controller: accessors for template service, 
  // localization service, request and response handlers.
  util.inherits(TeamController, BaseController);

  TeamController.prototype.render = function(cb) {
    var output = {
      content_type: 'text/html',
      code: 200
    };
    this.ts.load('team', function(error, result) {
      output.content = result;
      cb(output);
    });
  };
  
  TeamController.getRoutes = function(cb) {
    var routes = [{
      method: 'get',
      path: "/club-manager/team",
      auth_required: false,
      content_type: 'text/html'
    }];
    cb(null, routes);
  };

  return TeamController;
};

