// Tests for player module

var expect = require('chai').expect;

describe('Player', function(){
  describe('#require', function(){
    it('Should have the correct properties', function() {
      var player = require('../lib/player.js');
      expect(player).to.have.a.property('install');
      expect(player).to.have.a.property('uninstall');
      expect(player).to.have.a.property('getAll');
    });
  });
});
