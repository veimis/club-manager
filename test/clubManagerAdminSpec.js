// Tests for club manager admin module 

var expect = require('chai').expect;

describe('Admin lib module', function(){
  describe('#require', function(){
    it('Should have the correct properties', function() {
      var clubManagerAdmin = require('../lib/club_manager_admin.js');
      expect(clubManagerAdmin).to.have.a.property('getAdminData');
    });
  });
});



