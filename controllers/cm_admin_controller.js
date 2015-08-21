// Controller module for the club manager settings

module.exports = function(pb) {
  // Pencilblue dependencies
  var util = pb.util;
  var BaseController = pb.BaseController;
  
  // Create the controller
  function AdminController(){};
  
  // Inherits from base controller: accessors for template service, 
  // localization service, request and response handlers.
  util.inherits(AdminController, BaseController);
  
  // Subnavigation key
  var SUB_NAV_KEY = 'club_manager_index';
  
  // Render admin page
  // Render is executed within a domain context and errors thrown 
  // therefore errors will be handled and result in an error page.
  // cb = callback(result)
  AdminController.prototype.render = function(cb) {
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
      
    self.ts.load('/admin/club_manager_admin', function(err, result) {
      cb({content: result});
    });
  };
  
  // Register routes
  AdminController.getRoutes = function(cb) {
    var routes = [
      {
        method: 'get',
        path: '/club-manager/admin',
        auth_required: true,
        content_type: 'text/html',
        // handler is not defined, defaults to render()
      }
    ];
    cb(null, routes);
  }; 

  AdminController.prototype.getTabs = function() {
    return [
      {
        active: 'active',
        href: '#teams',
        icon: 'users',
        title: 'Teams'
      },
      {
        href: '#players',
        icon: 'user',
        title: 'Players'
      },
      {
        href: '#seasons',
        icon: 'trophy',
        title: 'Seasons'
      }
    ];
  };

  AdminController.getSubNavItems = function(key, ls, data) {
    return [
      {
        name: 'manage_club',
        title: 'Manage club',
        icon: 'refresh',
        href: '/club-manager/admin'
      }
    ];
  };

  // Register club manager admin subnavigation
  pb.AdminSubnavService.registerFor(SUB_NAV_KEY, AdminController.getSubNavItems);
 
  return AdminController;
};
