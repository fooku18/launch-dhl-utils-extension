'use strict';

var fetchPoly = require("../../utils/fetchPolyfill");
var document = require("@adobe/reactor-document");

var ce = function(){
  var en = "internal-traffic-fetch",
      event = document.createEvent("CustomEvent");
  event.initCustomEvent(en, !1, !1);
  document.dispatchEvent(event);
}

module.exports = function(settings) {
  if(!window.sessionStorage.getItem("s_trf")){
    var fetch = window.fetch || fetchPoly.fetch;
    fetch(settings.url, {mode: 'no-cors'})
      .then(function(r){
        window.sessionStorage.setItem("s_trf", "i");
      })
      .catch(function(err){
        window.sessionStorage.setItem("s_trf", "e");
      })
      .finally(function(){
        ce();
      });
  }else{
    ce();
  }
};