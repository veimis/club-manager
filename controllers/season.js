// Controller module for a season showing the match reports of the season

// Dependencies
var cmSeason = require('../lib/season.js');
var cmMatch = require('../lib/match.js');
var cmUtils = require('../lib/club_manager_utils.js');

module.exports = function(pb) {
	// Pencilblue dependencies
	var util = pb.util;
	var BaseController = pb.BaseController;

	// Create the controller
	function SeasonController(){};

	// Inherits from base controller: accessors for template service,
	// localization service, request and response handlers
	util.inherits(SeasonController, BaseController);

	// Register routes
	SeasonController.getRoutes = function(cb) {
		var routes = [
			{
				method: 'get',
				path: '/club-manager/season/',
				auth_required: false,
				content_type: 'text/html'
				// handler is not defined, defaults to render()
			}
		];
		cb(null, routes);
	};	
  
  // Render season template
	// cb = callback(result)
	SeasonController.prototype.render = function(cb) {	
		var self = this;
		var cos = new pb.CustomObjectService();

    if(self.query.name) {
      cmSeason.loadByName(self.query.name, cos, util, function(err, season) {
        console.log(season);
        cmMatch.loadBySeason(season._id, cos, util, function(err, matches) {
          // TODO not getting matches yet, season query works
          console.log(matches);
        });
      });
    }

    cmMatch.getAll(cos, util, function(err, matches) {
      if(util.isError(err)) {
        throw err;
      }
    
      renderSeason(self, matches, util, cmUtils, cb);
	  });
	};

  // Render given matches using the season template.
  // controller:  This controller, not sure how the scope works here.
  // matches: Matches that will be renderd
  // util:  Pencilblue utilites
  // cmUtils: Club manager utilities
  // cb = callback(result)
  function renderSeason(controller, matches, util, cmUtils, cb) {
    cmUtils.defaultTemplateValues(pb, controller, function(err) {
      var ok = controller.ts.registerLocal('angular', function(flag, cb){
        var objects = {
          matches: matches
        };

        var angularData = pb.ClientJs.getAngularController(objects, ['ngSanitize']);
        cb(null, angularData);
      });

      if(!ok) {
        throw new Error('Failed to register angular controller');
      }

      controller.ts.load('season', function(err, result) {
        if(util.isError(err)) {
          throw err;
        }
        cb({content: result});
      });
    });
  }
	
  return SeasonController;
};
