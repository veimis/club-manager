// Exports club manager season module

// Dependencies
var async = require('async');
var cmUtils = require('./club_manager_utils.js');

function Season(){}
var dbName = 'cm_season';

// Add new custom object type
// cos = pencilblue custom object service
// util =  pencilblue utilities
// cb = callback(error, boolean)
Season.install = function(cos, util, cb) {
	// Custom object fields
	var season = {
		name: dbName,
		fields: {
			name: { field_type: 'text' },
      startDate: { field_type: 'date' },
      endDate: { field_type: 'date' },
			description: { field_type: 'wysiwyg' },
			team: { field_type: 'peer_object', object_type: 'custom:cm_team' }
		}
	};

	return cmUtils.createCustomObjectType(cos, util, dbName, season, cb);
};

// Clear season objects and remove custom object type
// cos = pencilblue custom object service
// util = pencilblue utilities
// cb = callback(error, boolean)
Season.uninstall = function(cos, util, cb) {
	return cmUtils.removeCustomObjectType(cos, util, dbName, cb); 
};

module.exports = Season;
