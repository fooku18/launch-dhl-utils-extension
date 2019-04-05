'use strict';

module.exports = function(settings) {
  console.log(settings.dc);
  _satellite.track(settings.dc);
};
