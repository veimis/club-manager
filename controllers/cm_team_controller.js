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
    var self = this;
    this.getPlayers(function(err, data) {
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
    }];
    cb(null, routes);
  };

  TeamController.prototype.getPlayers = function getPlayers(cb) {
    var cos = new pb.CustomObjectService();
    // TODO use async
    cos.loadTypeByName('cm_player', function(err, playerType) {
      if(util.isError(err)) {
        return cb(err, false);
      }
      var selection = ['name', 'number', 'description'];
      cos.findByType(playerType._id.toString(), {select: selection}, function(err, result) {
        if(util.isError(err)) {
          return cb(err, false);
        }
        return cb(null, result);
      });
    });
  }

  return TeamController;
};

