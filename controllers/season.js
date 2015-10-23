// Controller module for a season showing the match reports of the season

// Dependencies
var cmMatchReport = require('match_report');

module.exports = function(pb) {
	// Pencilblue dependencies
	var util = pb.util;
	var BaseController = pb.BaseController;

	// Create the controller
	function SeasonController(){};

	// Inherits from base controller: accessors for template service,
	// localization service, request and response handlers
	util.inherits(SeasonController, BaseController);

	// Render season template
	// cb = callback(result)
	SeasonController.prototype.render = function(cb) {	
		var self = this;
		var cos = new pb.CustomObjectService();
		
		// Query all match reports
		cmMatchReport.getAll(cos, util, function(err, data) {
			if(util.isError(err)) {
				throw err;
			}

			// Register angular controller
			var ok = self.ts.registerLocal('angular', function(flag, cb) {
				var objects = {
					matchReports: data
				};
				var angularData = pb.ClientJs.getAngularController(objects, ['ngSanitize']);
				cb(null, angularData);
			});
			if(!ok) {
				throw new Error('Failed to register angular controller');
			}

			// Load season template
			self.ts.load('season', function(err, result) {
				if(util.isError(err)) {
					throw err;
				}
				cb({content: result});
			});
		});
	};

	// Register routes
	SeasonController.getRoutes = function(cb) {
		var routes = [
			{
				method: 'get',
				path: '/club-manager/season',
				auth_required: false,
				content_type: 'text/html'
				// handler is not defined, defaults to render()
			}
		];
		cb(null, routes);
	};
	
	return SeasonController;
};
