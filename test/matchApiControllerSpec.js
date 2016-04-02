// Tests for match api controller 

var expect = require('chai').expect;
var MatchApiController = require('../controllers/api/match.js');
var fakePb = require('./fakePencilblue.js');

describe('Match api controller', function(){
  describe('#require', function(){
    it('Should have the correct properties', function() {
      var matchApiController= new MatchApiController(new fakePb());
      expect(matchApiController).to.have.a.property('prototype');
    });
  });
});



