// Tests for team module

var expect = require('chai').expect;

describe('Team', function(){
  describe('#require', function(){
    it('Should have the correct properties', function() {
      var player = require('../lib/team.js');
      expect(player).to.have.a.property('install');
      expect(player).to.have.a.property('uninstall');
      expect(player).to.have.a.property('getId');
      expect(player).to.have.a.property('getAll');
    });
  });
});
