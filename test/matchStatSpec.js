// Tests for match statistics module

var expect = require('chai').expect;

describe('MatchStats', function(){
  describe('#require', function(){
    it('Should have the correct properties', function() {
      var match = require('../lib/match_statistics.js');
      expect(match).to.have.a.property('install');
      expect(match).to.have.a.property('uninstall');
      expect(match).to.have.a.property('loadByMatch');
    });
  });
});


