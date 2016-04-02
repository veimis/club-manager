// Inherit from pb base api controller

module.exports = function(pb) {
  // Pencilblue dependencies
  var util = pb.util;

  function MatchApiController(){}
  util.inherits(MatchApiController, pb.BaseApiController);

  return MatchApiController;
}
