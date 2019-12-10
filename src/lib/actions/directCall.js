'use strict';

var window = require("@adobe/reactor-window");


module.exports = function(settings) {
  window._satellite&&
    window._satellite.track(settings.dc);
};
