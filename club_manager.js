// Main module for club manager plugin.

module.exports = function ClubManagerPlugin(pb){

	// PencilBlue dependencies
	var util = pb.util;

	/* Plugin to manage sports club content */
	function ClubManager(){}

	/* Called when the application is being installed for the first time.
	 * @param cb A callback that must be called upon completion. 
	 * 	cb(Error, Boolean).
	 * The result shoud be TRUE for success and FALSE on failure.
	 */
	ClubManager.onInstall = function(cb) {
		// Create player custom object.
		var cos = new pb.CustomObjectService();
			cos.loadTypeByName('cm_player', function(err, playerType){
				if(util.isError(err))
				{
					// Call to custom object service failed.
					return cb(err, false);
				}
				else if(!util.isNullOrUndefined(playerType))
				{
					// Custom type already exists.
					return cb(new Error("cm_player custom object already exists."),
								false);
				}

				var player = {
					name: 'cm_player',
					fields: {
						name: { field_type: 'text' },
						number: { field_type: 'text' },
						// Media is mandatory, not working yet //profilePicture: { field_type: 'peer_object', object_type: 'media' },
					description: { field_type: 'wysiwyg' }
				}
			};
			
			cos.saveType(player, function(err, result){
				return cb(err, !util.isError(err));
			});
		});
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
		// TODO Remove player custom object and clear db.
		var cos = new pb.CustomObjectService();

		cos.loadTypeByName('cm_player', function(err, playerType) {
			if(util.isNullOrUndefined(playerType))
			{
				return cb(err, !util.isError(err));
			}
			
			// Clear database
			cos.deleteForType(playerType, function(err, result)
			{
				if(util.isError(err))
				{
					return cb(err, !util.isError(err));
				}
				// Delete custom object type.
				cos.deleteTypeById(playerType._id.toString(), function(err)
				{
					return cb(err, !util.isError(err));	
				});
			});
		});
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
		// Modify admin navigation panel if needed.
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
