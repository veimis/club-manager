// Fake pencilblue module for tests

module.exports = function PB(config) {
    var pb = {};

    // Fake utils
    pb.util = {
      inherits: function(){}
    };

    // Fake admin navigation service
    pb.AdminSubnavService = {
      registerFor: function(){}
    };

    // Fake custom object service
    pb.CustomObjectService = function(){};

    return pb;
}

