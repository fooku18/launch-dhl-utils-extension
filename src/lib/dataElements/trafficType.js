'use strict';

var window = require("@adobe/reactor-window");
var internalTraffic = require("../../utils/internalTraffic");
var check = require("../../utils/check");

if(check.sessionStorageCheck&&!window.sessionStorage.getItem("s_trf"))
  try{
    internalTraffic("https://servicenow.dhl.com/").then(function(s){
      window.sessionStorage.setItem("s_trf", "i");
    }).catch(function(e){
      window.sessionStorage.setItem("s_trf", "e");
    });
  }catch(e){
    window.sessionStorage.setItem("s_trf", "e");
  }

module.exports = function(settings) {
  try{
    return window.sessionStorage.getItem("s_trf");
  }catch(e){
    return
  }
};