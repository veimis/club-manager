// Tests for club manager admin controller 

var expect = require('chai').expect;
var AdminController = require('../controllers/admin.js');
var fakePb = require('./fakePencilblue.js');

describe('Admin controller', function(){
  describe('#require', function(){
    it('Should have the correct properties', function() {
      var adminController= new AdminController(new fakePb());
      expect(adminController).to.have.a.property('prototype');
      expect(adminController.prototype).to.have.a.property('render');
      expect(adminController).to.have.a.property('getRoutes');
      expect(adminController.prototype).to.have.a.property('getTabs');
      expect(adminController).to.have.a.property('getSubNavItems');
    });
  });
});


