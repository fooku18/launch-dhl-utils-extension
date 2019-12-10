'use strict';

var window = require("@adobe/reactor-window");


module.exports = function(settings) {
  var pt = "";
  try{
    var nd = typeof window.performance !== "undefined" && typeof window.performance.timing !== "undefined" && new Date(window.performance.timing.navigationStart) || new Date();
    var pd = window.sessionStorage.getItem("s_pt");
    pd&&(pt=((nd-new Date(decodeURI(pd)))/1000).toFixed(0));
    window.sessionStorage.setItem("s_pt", encodeURI(nd));
  }catch(e){
    return null;
  }
  return pt;
};
