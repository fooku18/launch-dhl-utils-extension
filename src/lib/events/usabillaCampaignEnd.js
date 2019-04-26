'use strict';

var window = require("@adobe/reactor-window");
var listVarBuilder = require("../../utils/listVarBuilder");

module.exports = function(settings, trigger) {
  window.usabilla_live("setEventCallback", function(category, action, label, value) {
      if(action!=="Campaign:Open")return;
      window.addEventListener("message", function(event){
          if(!/d6tizftlrpuof\.cloudfront\.net/.test(event.origin)) {
              return;
          }
          try{
              var data = JSON.parse(event.data), listVar;
              if(data.type === "pageSwitch"&&data.end) {
                  // create listVar if campaign has data on it
                  if(data.data)
                      listVar = listVarBuilder(label, data.data);
                  trigger({nativeEvent: event.nativeEvent, feedbackData: listVar||""});
              }
          }catch(e){}
      })
  });
};
