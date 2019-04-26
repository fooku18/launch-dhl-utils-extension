'use strict';

module.exports = function(settings, event) {
  try{
    var ev = event.element||event.nativeEvent.target;
    var js = JSON.parse(ev.getAttribute("data-tracking"));
    event.clickType = js.type||"";
    event.clickTitle_en = js.title&&js.title.en||"";
  }catch(e){}
  return!0;
};