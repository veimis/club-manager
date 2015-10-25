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
	
    // Get and register navigation
    self.getNavigation(function(themeSettings, navigation, accountButtons) {
      self.ts.registerLocal('navigation', new pb.TemplateValue(navigation, false));
      self.ts.registerLocal('account_buttons', new pb.TemplateValue(accountButtons, false));
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

  // Get navigation
  // Copy from pencilblue/controllers/index.js
  SeasonController.prototype.getNavigation = function(cb) {
      var options = {
          currUrl: this.req.url,
          session: this.session,
          ls: this.ls,
          activeTheme: this.activeTheme
      };
      
      var menuService = new pb.TopMenuService();
      menuService.getNavItems(options, function(err, navItems) {
          if (util.isError(err)) {
              pb.log.error('Index: %s', err.stack);
          }
          cb(navItems.themeSettings, navItems.navigation, navItems.accountButtons);
      });
  };

	
	return SeasonController;
};
