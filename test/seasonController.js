// Tests for season controller 

var expect = require('chai').expect;
var SeasonController = require('../controllers/season.js');
var fakePb = require('./fakePencilblue.js');

describe('Season controller', function(){
  describe('#require', function(){
    it('Should have the correct properties', function() {
      const seasonController= new SeasonController(new fakePb());
      expect(seasonController).to.have.a.property('prototype');
      expect(seasonController).to.have.a.property('getRoutes');
      expect(seasonController.prototype).to.have.a.property('render');
    });
  });
});



