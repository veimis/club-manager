// Tests for match controller 

var expect = require('chai').expect;
var MatchController = require('../controllers/match.js');
var fakePb = require('./fakePencilblue.js');

describe('Match controller', function(){
  describe('#require', function(){
    it('Should have the correct properties', function() {
      const matchController= new MatchController(new fakePb());
      expect(matchController).to.have.a.property('prototype');
      expect(matchController).to.have.a.property('getRoutes');
      expect(matchController.prototype).to.have.a.property('render');
    });
  });
});



