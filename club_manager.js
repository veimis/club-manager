// Main module for club manager plugin.

// Dependencies
var async = require('async');

module.exports = function ClubManagerPlugin(pb){

	// PencilBlue dependencies
	var util = pb.util;

  // Club manager dependencies
  var cmTeam = require('./lib/team.js');
  var cmPlayer = require('./lib/player.js');
  var cmSeason = require('./lib/season.js');
	var cmMatch = require('./lib/match.js');
  var cmMatchStatistics = require('./lib/match_statistics.js');

	/* Plugin to manage sports club content */
	function ClubManager(){}

  var TOP_MENU = 'club-manager';

	/* Called when the application is being installed for the first time.
	 * @param cb A callback that must be called upon completion. 
	 * 	cb(Error, Boolean).
	 * The result shoud be TRUE for success and FALSE on failure.
	 */
	ClubManager.onInstall = function(cb) {
		var cos = new pb.CustomObjectService();
		
    // The order of adding custom type is important as they
    // have dependencies to each other.
		async.series([
			function(cb) {
				// Create player custom object.
				cmPlayer.install(cos, util, cb);
			},
      function(cb) {
        // Create team custom object
        cmTeam.install(cos, util, cb);
      },
      function(cb) {
        // Create season custom object
        cmSeason.install(cos, util, cb);
      },
			function(cb) {
				// Create match custom object
				cmMatch.install(cos, util, cb);
			},
      function(cb) {
        // Create match statistics custom object
        cmMatchStatistics.install(cos, util, cb);
      }
		], cb);
	};

	/* Called when the application is unsinstalling this plugin.
	 * The plugin should make every effort to clean up any plugin-specific 
	 * dabase items or any in function overrides it makes.
	 * @param cb A callback that must be called upon completion. 
	 * 	cb(Error, Boolean). 
	 * The result should be TRUE for success and FALSE on failure.
	 */
	ClubManager.onUninstall = function(cb) {
		pb.AdminNavigation.remove(TOP_MENU);
		var cos = new pb.CustomObjectService();

    // The order may have importance, because of the dependencies
		async.series([
      function(cb) {
        cmMatchStatistics.uninstall(cos, util, cb);
      },
      function(cb){
				cmMatch.uninstall(cos, util, cb);
			},
      function(cb) {
        cmSeason.uninstall(cos, util, cb);
      },
      function(cb) {
				cmTeam.uninstall(cos, util, cb);
			},
      function(cb) {
				cmPlayer.uninstall(cos, util, cb);
			}
    ], cb);
	};

	/* 
	 * Called when the application is starting up. 
	 * The function is also called at the end of successful install.
	 * It is guaranteed taht all core PB services will be available
	 * including access to the core database.
	 * @param cb A callback that must be called upon completion. 
	 * 	cb(Error, Boolean). 
	 * The result should be TRUE for success and FALSE on failure.
	 */
	ClubManager.onStartup = function(cb) {
		// Modify admin navigation 
    // TODO create and open admin views on the panel
    pb.AdminNavigation.add({
      id: TOP_MENU,
      title: 'Club manager',
      icon: 'cog',
      href: '/club-manager/admin',
      access: pb.SecurityService.ACCESS_EDITOR,
    }); 

    // Add management to navigation
    pb.AdminNavigation.addChild(TOP_MENU, {
      id: 'club-manager-management',
      title: 'Management',
      icon: 'cogs',
      href: '/club-manager/admin',
      access: pb.SecurityService.ACCESS_EDITOR
    });

    // Add match reports to navigation
    pb.AdminNavigation.addChild(TOP_MENU, {
      id: 'club-manager-match-report',
      title: 'Match reports',
      icon: 'file-o',
      href: '/club-manager/admin/match-report',
      access: pb.SecurityService.ACCESS_EDITOR     
    }); 
        
    cb(null, true);
	};

	/* Called when the application is gracefully shutting down.
	 * No guarantees provided for how much time will be provided for the
	 * plugin to shut down. 
	 * @param cb A callback that must be called upon completion. 
	 * 	cb(Error, Boolean). 
	 * The result should be TRUE for success and FALSE on failure.
	 */
	ClubManager.onShutdown = function(cb) {
		cb(null, true);
	};

	// Exports
	return ClubManager;
};
