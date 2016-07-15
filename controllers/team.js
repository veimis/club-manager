// Controller module for a team showing the feed of articles for a team

// Dependencies
const cmTeam = require('../lib/team.js');
const cmSeason = require('../lib/season.js');
const async = require('async');

module.exports = function(pb) {
  const util = pb.util;
  
  // Create the controller
  function TeamController(){};

  // Inherit from base controller: Accessors for template service,
  // localization service, request and response handlers.
  util.inherits(TeamController, pb.BaseController);

  ////////////////////////////////////////////////////////////////////
  // 
  // Pencilblue will call getRoutes() for each controller in the 
  // controllers folder during initialization to register handlers
  // for the routes.
  //
  ////////////////////////////////////////////////////////////////////
  TeamController.getRoutes = function(cb) {
    const routes = [{
      method: 'get',
      path: '/club-manager/',
      auth_required: false,
      content_type: 'text/html'
      // handler is not defined, defaults to render()
    }];

    cb(null, routes);
  };

  ////////////////////////////////////////////////////////////////////
  // 
  // Query data and load team template.
  //
  ////////////////////////////////////////////////////////////////////
  TeamController.prototype.render = function(cb) {
    const self = this;

    if(util.isNullOrUndefined(self.query.team)) {
      throw new Error("Team is not specified in the url query");
    }

    const cos = new pb.CustomObjectService();
    async.waterfall([
      function(cb) {
        cmTeam.getId(cos, util, self.query.team, cb);
      },
      function(teamId, cb) {
        cmSeason.getByTeam(cos, util, teamId.toString(), cb); 
      }
    ], function(err, seasons) {
      const angularData = {
        team: self.query.team,
        seasons: seasons
      };

      // Register angular objects for the template
      const angularObjects = pb.ClientJs.getAngularObjects(angularData);
      self.ts.registerLocal('angular_objects', new pb.TemplateValue(angularObjects, false));
      
      // Register angular controller 
      var ok = self.ts.registerLocal('angular', function(flag, cb) {
        var angularData = pb.ClientJs.getAngularController({}, ['ngSanitize']);
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
  
  return TeamController;
};
