'use strict';

var time = require("../../utils/time");

module.exports = function(settings) {
  return ((new Date() - time.startTime())/1000).toFixed(0);
};
