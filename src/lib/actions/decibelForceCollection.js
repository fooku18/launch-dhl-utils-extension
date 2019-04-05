'use strict';

var window = require("@adobe/reactor-window");

module.exports = function(settings) {
  if(window.decibelInsights)
    window.decibelInsights("setCollection", !0);
};
