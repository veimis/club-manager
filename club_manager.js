// Main module for club manager plugin.

module.exports = function ClubManagerPlugin(pb){

	// PencilBlue dependencies
	var util = pb.util;

    // Club manager dependencies
    var cmPlayer = require('cm_player_module');

	/* Plugin to manage sports club content */
	function ClubManager(){}

	/* Called when the application is being installed for the first time.
	 * @param cb A callback that must be called upon completion. 
	 * 	cb(Error, Boolean).
	 * The result shoud be TRUE for success and FALSE on failure.
	 */
	ClubManager.onInstall = function(cb) {
		var cos = new pb.CustomObjectService();
		
		// Create player custom object.
		var player = cmPlayer();
 		return player.install(cos, util, cb);
		
		// TODO Create team custom object. 
		// TODO Create club custom object.
	};

	/* Called when the application is unsinstalling this plugin.
	 * The plugin should make every effort to clean up any plugin-specific 
	 * dabase items or any in function overrides it makes.
	 * @param cb A callback that must be called upon completion. 
	 * 	cb(Error, Boolean). 
	 * The result should be TRUE for success and FALSE on failure.
	 */
	ClubManager.onUninstall = function(cb) {
		var cos = new pb.CustomObjectService();
		var player = cmPlayer();
        player.uninstall(cos, util, cb);

     	// TODO Remove team custom object and clear db.
		// TODO Remove club custom object and clear db.
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
          id: 'club-manager',
          title: 'Club manager',
          icon: 'cogs',
          href: '/club-manager/admin',
          access: pb.SecurityService.ACCESS_EDITOR,
          children: [
            {
              id: 'club-manager-management',
              title: 'Management',
              icon: 'cogs',
              href: '/club-manager/admin',
              access: pb.SecurityService.ACCESS_EDITOR
            },
            {
              id: 'club-manager-match-report',
              title: 'Match reports',
              icon: 'cogs',
              href: '/club-manager/admin/match-report',
              access: pb.SecurityService.ACCESS_EDITOR
            }
          ]
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
