// Controller module for the team page showing the players of the club

// Dependencies
var async = require('async');

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
    // Get player type id and use it to find all player objects,
    // finally call cb
    async.waterfall([
      function getPlayerType(cb){
        cos.loadTypeByName('cm_player', function(err, playerType) {
          return cb(err, playerType._id);
        });
      },
      function getPlayerObjects(typeId, cb) {
        var selection = ['name', 'number', 'description'];
        cos.findByType(typeId.toString(), {select: selection}, 
          function(err, result) {
            return cb(err, result);
          }
        );
      }
    ], cb);
  }

  return TeamController;
};

