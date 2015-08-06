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
      // TODO: create angular controller and display results in a list
      self.ts.registerLocal('cm_test', function(flag, cb) {
        cb(null, data[0].name);
      });
      var output = {
      content_type: 'text/html',
      code: 200
      };
      self.ts.load('team', function(error, result) {
        output.content = result;
	    cb(output);
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
      cos.findByType(playerType._id.toString(), function(err, result) {
        if(util.isError(err)) {
          return cb(err, false);
        }
        return cb(null, result);
      });
    });
  }

  return TeamController;
};

