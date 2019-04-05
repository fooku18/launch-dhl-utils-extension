'use strict';

module.exports = function(settings, event) {
  if(!event||!(event.element||(event.nativeEvent&&event.nativeEvent.target)))return"";
  var ev = (event.element||event.nativeEvent.target);
  var src = ev.getAttribute("href")||"";
  if(!src)return src;
  if(src[src.length-1] === "/")src=src.substr(0,src.length-1);
  var paths = src.split("/");
  var base = paths.slice(0, paths.length-1).join("/");
  if(!base&&paths.length>1)
      base = "/";
  return settings.details==="base"?base:paths[paths.length-1];
};