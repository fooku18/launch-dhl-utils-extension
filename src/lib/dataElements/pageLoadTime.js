'use strict';

var window = require("@adobe/reactor-window");

module.exports = function(settings) {
  var lt = "";
  if(typeof window.performance !== "undefined" && typeof window.performance.timing != "undefined"){
    lt = ((new Date() - window.performance.timing.navigationStart)/1000).toFixed(1);
  }
  return lt;
};
