// Tests for match module

var expect = require('chai').expect;

describe('Match', function(){
  describe('#require', function(){
    it('Should have the correct properties', function() {
      var match = require('../lib/match.js');
      expect(match).to.have.a.property('install');
      expect(match).to.have.a.property('uninstall');
      expect(match).to.have.a.property('getAll');
      expect(match).to.have.a.property('loadBySeason');
      expect(match).to.have.a.property('loadByName');
    });
  });
});

