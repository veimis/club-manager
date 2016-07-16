// Controller module for a team showing the feed of articles for a team

// Dependencies
const cmTeam = require('../lib/team.js');
const cmSeason = require('../lib/season.js');
const async = require('async');

module.exports = function(pb) {
  const util = pb.util;
  
  // Create the controller
  function TeamController(){};

  // Inherit from base controller: Accessors for template service,
  // localization service, request and response handlers.
  util.inherits(TeamController, pb.BaseController);

  ////////////////////////////////////////////////////////////////////
  // 
  // Pencilblue will call getRoutes() for each controller in the 
  // controllers folder during initialization to register handlers
  // for the routes.
  //
  ////////////////////////////////////////////////////////////////////
  TeamController.getRoutes = function(cb) {
    const routes = [{
      method: 'get',
      path: '/club-manager/',
      auth_required: false,
      content_type: 'text/html'
      // handler is not defined, defaults to render()
    }];

    cb(null, routes);
  };

  ////////////////////////////////////////////////////////////////////
  // 
  // Query data and load team template.
  //
  ////////////////////////////////////////////////////////////////////
  TeamController.prototype.render = function(cb) {
    const self = this;

    if(util.isNullOrUndefined(self.query.team)) {
      throw new Error("Team is not specified in the url query");
    }

    async.parallel({
      articles: function(cb) {
        self.getArticles(cb);
      },
      matches: function(cb) {
        self.getMatches(cb);
      },
      seasons: function(cb) {
        const cos = new pb.CustomObjectService();
        
        // Get seasons linked to the given team.
        async.waterfall([
          function(waterfallCb) {
            cmTeam.getId(cos, util, self.query.team, waterfallCb);
          },
          function(teamId, waterfallCb) {
            cmSeason.getByTeam(cos, util, teamId.toString(), waterfallCb); 
          }
        ], function(err, seasons) {
          cb(err, seasons); // parallel callback
        });
      }
    }, function(err, results) {
      // Process data and load template.
      console.log(results.matches);
      
      const angularData = {
        team: self.query.team,
        seasons: results.seasons,
        articles: results.articles
      };

      // Register angular objects for the template
      const angularObjects = pb.ClientJs.getAngularObjects(angularData);
      self.ts.registerLocal('angular_objects', new pb.TemplateValue(angularObjects, false));
      
      // Register angular controller 
      var ok = self.ts.registerLocal('angular', function(flag, cb) {
        var angularData = pb.ClientJs.getAngularController({}, ['ngSanitize']);
        cb(null, angularData);
      }); 


      // Load team template
      self.ts.load('team', function(err, result) {
        if(util.isError(err)) {
          throw err;
        }
        cb({content: result});
      }); 
    });
  };

  ////////////////////////////////////////////////////////////////////
  //
  // Query latest articles
  // 
  ////////////////////////////////////////////////////////////////////
  TeamController.prototype.getArticles = function(cb) {
    const options = {
      order: {'publish_date': -1},
      limit: 5
    };
    const articleService = new pb.ArticleServiceV2();
    articleService.getAll(options, cb);
  }

  ////////////////////////////////////////////////////////////////////
  // 
  // Query latest match reports
  // 
  ////////////////////////////////////////////////////////////////////
  TeamController.prototype.getMatches = function(cb) {
    cb(null);
  }
  
  return TeamController;
};
