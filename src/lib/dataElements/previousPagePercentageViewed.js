'use strict';

var window = require("@adobe/reactor-window");


module.exports = function(settings) {
  var max_scroll_depth = 0,
    calc_percentage_scrolled = function(){
      return parseInt((window.scrollY / (Math.max(document.documentElement.scrollHeight, document.documentElement.offsetHeight) - document.documentElement.clientHeight))*100);
    }
  var cb = function(e){
    window.requestAnimationFrame(function(){
      var current_percentage = calc_percentage_scrolled();
      if(max_scroll_depth < current_percentage){
        max_scroll_depth = current_percentage;
        try{
          window.sessionStorage.setItem(settings.details, max_scroll_depth);
        }catch(e){
          window._satellite&&
            window._satellite.logger.error(e);
        }
        if(current_percentage == 100)
          window.removeEventListener("scroll", cb);
      }
    });
  }
  // we start to listen to scroll events here for the current page again
  window.addEventListener("scroll", cb);
  // clear and return the locally saved scroll depth of last page
  var scroll_depth_last_page = window.sessionStorage.getItem(settings.details) || null;
  return window.sessionStorage.removeItem(settings.details), scroll_depth_last_page;
};