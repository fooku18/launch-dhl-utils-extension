'use strict';

var triggers = Object.assign({});
var event = require("../../utils/jspath");
var current = 0;

module.exports = function(settings, trigger) {
    var events = event(settings.path);
    if(!events){
        turbine.logger.error("JavaScript Variable \"window." + settings.path + " could not be found. Opting out for change listening...");
        return!1;
    }
    // insert key for settings.path triggers
    triggers[settings.path] = triggers[settings.path] || [];
    // callback on event push
    var cb = function(){
        if(events.length > current)
            (current = events.length), 
            triggers[settings.path].forEach(function(l){
                l({eventInfo: events[events.length-1]})
            });
        current = events.length;
    }
    // check events on pulse
    if(!triggers[settings.path].length)
        setInterval(cb, 500);
    triggers[settings.path].push(trigger);
};