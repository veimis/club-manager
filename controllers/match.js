// Controller module for the match 

// Dependencies
var cmUtils = require('./../lib/club_manager_utils.js');

module.exports = function(pb) {
  // Pencilblue dependencies
  var util = pb.util;
  
  // Create the controller
  function MatchController(){};
  
  // Inherits from base controller: accessors for template service, 
  // localization service, request and response handlers.
  util.inherits(MatchController, pb.BaseController);
 
  // Subnavigation key
  var SUB_NAV_KEY = 'match_index';
  
  // Render admin view
  MatchController.prototype.render = function(cb) {
    var self = this;
 
    // Register angular controller 
    self.ts.registerLocal('angular', function(flag, cb) {
      var objects = {
        navigation: pb.AdminNavigation.get(self.session, ['dashboard'], self.localizationService), 
        pills: pb.AdminSubnavService.get(SUB_NAV_KEY, self.ls),
        access: self.session.authentication.admin_level,
        tabs: self.getTabs()
      };

      var angularData = pb.ClientJs.getAngularController(objects, []);
      cb(null, angularData);
    }); 
          
    self.ts.load('/admin/match', function(err, result) {
      cb({content: result});
    });
   
  };
 
  // Render match
  // @cb = callback(result)
  MatchController.prototype.renderMatch = function(cb) {
    var self = this;
    var cos = new pb.CustomObjectService();
    
    cos.loadById(self.pathVars.id, function(err, match) {
      // Register angular objects for match controller
      var angularData = {
        match: match
      };
      var angularObjects = pb.ClientJs.getAngularObjects(angularData);
      self.ts.registerLocal('angular_objects', new pb.TemplateValue(angularObjects, false));

      cmUtils.defaultTemplateValues(pb, self, function(err) {
        self.ts.load('match', function(err, result) {
          if(util.isError(err)) {
            throw err;
          }

          cb({content: result});
        });
      });
    });
  };

  MatchController.getRoutes = function(cb) {
    var routes = [
      {
        method: 'get',
        path: '/club-manager/admin/match',
        auth_required: true,
        content_type: 'text/html',
        // handler is not defined, defaults to render()
      },
      {
        method: 'get',
        path: '/club-manager/match/:id',
        auth_required: false,
        content_type: 'text/html',
        handler: 'renderMatch'
      }
    ];

    cb(null, routes);
  };

  MatchController.prototype.getTabs = function() {
    return [
      {
        active: 'active',
        href: '#match-report',
        icon: 'file-o',
        title: 'Match report'
      }
    ];
  };

  MatchController.getSubNavItems = function(key, ls, data) {
    return [
      {
        name: 'match_report',
        title: 'Match report',
        icon: 'refresh',
        href: '/club-manager/admin/match-report'
      }
    ];
  };

  // Register match subnavigation
  pb.AdminSubnavService.registerFor(SUB_NAV_KEY, MatchController.getSubNavItems);
 
  return MatchController;
};
