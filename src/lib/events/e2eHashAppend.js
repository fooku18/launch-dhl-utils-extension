'use strict';

var window = require("@adobe/reactor-window");

var matchStringBuilder = function(settings){
  var cssString = "[href*='###']";
  var cssFull = [];
  settings.forEach(function(l){
    cssFull.push(cssString.replace("###", l));
  })
  return cssFull.join(",");
}

var parentA = function(e) {
  for (; e; ) {
    var t = e.tagName;
    if (t && "a" === t.toLowerCase()) {
        return e.getAttribute("href")&&e;
    }
    e = e.parentNode
  }
}

var matchesSelector = function(e, t){
  var n = e.matches || e.msMatchesSelector;
  if (n)
    try {
      return n.call(e, t)
    } catch (r) {
      return i.logger.warn("Matching element failed. " + t + " is not a valid selector."),
      !1
    }
  return !1
}

/* init e2e token on page load */
;(function(){
  var e2em = window.location.search.match(/s_e2eid=([\w\d]+)(&|$)?/);
  var e2es = window.sessionStorage.getItem("s_e2eid");
  var generateUserString = function(){
    var load = {
      source: window.location.hostname,
      random: new Date() + "|" + Math.random().toString()
    }
    return btoa(JSON.stringify(load));
  } 
  /* e2eid hierarchie: 
    * 1. e2eid token from window.location.search parameter
    * 2. get token from sessionStorage
    * 3. create new token from random number and timestamp
  */
  var e2eid = e2em&&e2em[1] || e2es || generateUserString();
  return window.sessionStorage.setItem("s_e2eid", e2eid), e2eid;
})();

module.exports = function(settings, trigger) {
  var cssFull = matchStringBuilder(settings.domains);
  /* execute before core.click.js in event chain in order to amend the outgoing href link */
  window.addEventListener("click", function(e){
    var t = parentA(e.target);
    if(t&&matchesSelector(t, cssFull)&&!t.getAttribute("href").match(/s_e2eid/)){
      var href = t.getAttribute("href").match(/\?/) ?
            t.getAttribute("href") + (window.sessionStorage.getItem("s_e2eid") ? "&s_e2eid=" + window.sessionStorage.getItem("s_e2eid") : "")
        :
            t.getAttribute("href") + (window.sessionStorage.getItem("s_e2eid") ? "?s_e2eid=" + window.sessionStorage.getItem("s_e2eid") : "");
      t.setAttribute("href", href), trigger({nativeEvent: e, element: t});
    }
  }, !0);
}