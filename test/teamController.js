// Tests for team controller 

var expect = require('chai').expect;
var TeamController = require('../controllers/team.js');
var fakePb = require('./fakePencilblue.js');

describe('Team controller', function(){
  describe('#require', function(){
    it('Should have the correct properties', function() {
      const teamController= new TeamController(new fakePb());
      expect(teamController).to.have.a.property('prototype');
      expect(teamController).to.have.a.property('getRoutes');
      expect(teamController.prototype).to.have.a.property('render');
    });
  });
});



