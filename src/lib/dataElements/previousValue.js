'use strict';

var window = require("@adobe/reactor-window");


module.exports = function(settings) {
  var pv = "";
  try{
    window.localStorage.getItem(settings.name)&&(pv = decodeURI(window.localStorage.getItem(settings.name))),
    window.localStorage.setItem(settings.name, settings.details);
  }catch(e){
    return null;
  }
  return pv; 
};
