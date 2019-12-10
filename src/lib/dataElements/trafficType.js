'use strict';


module.exports = function(settings) {
  return window.sessionStorage && window.sessionStorage.getItem("s_trft_util") || null;
};