'use strict';

module.exports = function(settings, event) {
  // var ev = event && (event.element || event.nativeEvent&&event.nativeEvent.target || event.detail);
  // if(!ev)return"";
  // ev = event.element||(event.nativeEvent&&event.nativeEvent.target)||event.detail&&event;
  // var src = (ev.detail&&ev.detail.linkUrl)||(ev.getAttribute&&ev.getAttribute("href")||"");
  // if(!src)return src;
  if(!event)return;
  var src;
  if(event.detail && event.detail.linkUrl){
    src = event.detail.linkUrl;
  }else if (event.element && event.element.getAttribute && event.element.getAttribute("href")){
    src = event.element.getAttribute("href");
  }else if (event.nativeEvent && event.nativeEvent.target && event.nativeEvent.target.getAttribute && event.nativeEvent.target.getAttribute("href")){
    src = event.nativeEvent.target.getAttribute("href");
  }else{
    return;
  }
  src = src.replace(/^http(s)?:\/\//,"");
  src = src.replace(/\?.*$/,"");
  if(src[src.length-1] === "/")src=src.substr(0,src.length-1);
  var paths = src.split("/");
  var base = paths.slice(0, paths.length-1).join("/");
  if(!base&&paths.length>1)
    base = "/";
  return settings.details==="base"?base:paths[paths.length-1];
};