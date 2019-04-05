'use strict';

var check = require("../../utils/check");
var window = require("@adobe/reactor-window");

module.exports = function(settings) {
  var pv = "";
  if(check.localStorageCheck)
    window.localStorage.getItem(settings.name)&&(pv = decodeURI(window.localStorage.getItem(settings.name))),
    window.localStorage.setItem(settings.name, settings.details);
  return pv; 
};
