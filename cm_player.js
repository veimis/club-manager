// Exports club manager player module

module.exports = function cmPlayer() {
  function Player(){}
  
  // cb pencil blue callback
  // cos = pencilblue custom object service
  // util =  pencilblue utilities
  Player.install = function(cb, cos, util) {
	console.log('player installing...');
    cos.loadTypeByName('cm_player', function(err, playerType) {
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
  };

  Player.test = function() {
    console.log('player test');
  };

  return Player;
};
