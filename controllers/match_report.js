// Controller module for the match report

module.exports = function(pb) {
  // Pencilblue dependencies
  var util = pb.util;
  var BaseController = pb.BaseController;
  
  // Create the controller
  function MatchReportController(){};
  
  // Inherits from base controller: accessors for template service, 
  // localization service, request and response handlers.
  util.inherits(MatchReportController, BaseController);
 
  // Subnavigation key
  var SUB_NAV_KEY = 'match_report_index';
  
  MatchReportController.prototype.render = function(cb) {
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
          
    self.ts.load('/admin/match_report', function(err, result) {
      cb({content: result});
    });
   
  };

  MatchReportController.getRoutes = function(cb) {
    var routes = [
      {
        method: 'get',
        path: '/club-manager/admin/match-report',
        auth_required: true,
        content_type: 'text/html',
        // handler is not defined, defaults to render()
      }
    ];

    cb(null, routes);
  };

  MatchReportController.prototype.getTabs = function() {
    return [
      {
        active: 'active',
        href: '#match-report',
        icon: 'file-o',
        title: 'Match report'
      }
    ];
  };

  MatchReportController.getSubNavItems = function(key, ls, data) {
    return [
      {
        name: 'match_report',
        title: 'Match report',
        icon: 'refresh',
        href: '/club-manager/admin/match-report'
      }
    ];
  };

  // Register match report subnavigation
  pb.AdminSubnavService.registerFor(SUB_NAV_KEY, MatchReportController.getSubNavItems);
 
  return MatchReportController;
};
