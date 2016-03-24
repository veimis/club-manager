// Tests for club manager utils module

var expect = require('chai').expect;

describe('Club manager utilities', function(){
  describe('#require', function(){
    it('Should have the correct properties', function() {
      var cmUtils = require('../lib/club_manager_utils.js');
      expect(cmUtils).to.have.a.property('createCustomObjectType');
      expect(cmUtils).to.have.a.property('removeCustomObjectType');
      expect(cmUtils).to.have.a.property('queryCustomObjects');
      expect(cmUtils).to.have.a.property('fetchChildren');
      expect(cmUtils).to.have.a.property('getCustomObjectTypeId');
      expect(cmUtils).to.have.a.property('defaultTemplateValues');
    });
  });
});

