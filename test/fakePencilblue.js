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

    return pb;
}

