'use strict';

var window = require("@adobe/reactor-window");

var clickEventSequence = require("../../utils/clickEventMap");

module.exports = function(settings, trigger) {
  clickEventSequence.addEvent(function(e){
    var m = e.target.matches || e.target.matchesSelector || e.target.mozMatchesSelector || e.target.msMatchesSelector || e.target.oMatchesSelector || e.target.webkitMatchesSelector;
    var data = JSON.parse(e.target.getAttribute("data-tracking"));
    var context = Object.assign({nativeEvent: e, element: e.target, }, data);
    trigger(context);
    if(settings.selector&&m.call(e.target, settings.selector))return!1;
    if(e.target.tagName.toLowerCase() == "a"){
      e.preventDefault();
      var loc = e.target.getAttribute("href");
      setTimeout(function(){
        window.location = loc;
      }, 250);
    }
  });
};