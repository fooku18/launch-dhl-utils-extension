'use strict';
var w = require("@adobe/reactor-window");
var Promise = require('@adobe/reactor-promise')
var s = turbine.getSharedModule("adobe-analytics", "get-tracker")||function(){return new Promise(function(r){r(w.s||!1)})};

/** format vars for AppMeasurement instance
* @param {object} vars: js object with key, value pairs of var names and values
* @param {boolean} linkTrackVars: append vars to linkTrackVars in order to send with tl calls
*/
var setVar = function setVar(vars) {
    var linkTrackVars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    s().then(function(s){
        if(!s)return!1;
        Object.keys(vars).forEach(function (l) {
            s[l] = vars[l];
        });
        linkTrackVars && _setLinkTrackVar(Array.prototype.slice.call(Object.keys(vars)), "linkTrackVars");
    })
};

/** format event string for AppMeasurement instance
* @param {Array<string>} events: array of events to be tracked
* @param {boolean} linkTrackEvents: append events to linkTrackEvents in order to send with tl calls
*/
var setEvent = function setEvent(events) {
    var linkTrackEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    s().then(function(s){
        if(!s)return!1;
        var currentEvents = s.events && _cleanVals(s.events.split(",")) || [];
        var currentRawEvents = currentEvents.map(function (l) {
            return l.split("=")[0];
        });
        var rawEvents = events.map(function (l) {
            return l.split("=")[0];
        });
        events.forEach(function (l) {
            var rawEvent = l.split("=")[0];
            if (!~currentRawEvents.indexOf(rawEvent)) currentEvents.push(l);else currentEvents[currentRawEvents.indexOf(rawEvent)] = l;
        });
        s.events = currentEvents.join(",");
        if (linkTrackEvents) {
            _setLinkTrackVar(["events"], "linkTrackVars"), _setLinkTrackVar(Array.prototype.slice.call(rawEvents), "linkTrackEvents");
        }
    })
};

/** append var to s.linkTrackVars or s.linkTrackEvents
 * @private
 * @param {Array<string>} vars: vars to append to s.linkTrackVars or s.linkTrackEvents 
 * @param {string} type: one of linkTrackEvents or linkTrackVars
 */
var _setLinkTrackVar = function _setLinkTrackVar(vars, type) {
    s().then(function(s){
        s[type]||(s[type]="");
        var currentVars = [];
        currentVars = _cleanVals(s[type].split(",")) || [];
        vars.forEach(function (l) {
            if (!~currentVars.indexOf(l)) currentVars.push(l);
        });
        s[type] = currentVars.join(",");
    })
};

/** cleans array from empty values
 * @private
 * @param {Array<string>} vals: string values
 * @return {Array<string>} clean array without voids
 */
var _cleanVals = function _cleanVals(vals) {
  var clean = [];
  vals.forEach(function (l) {
    l !== "" && l && clean.push(l);
  });
  return clean;
};

/** export methods */
var exporter = {};
if(s)
    exporter = {
        setVar: setVar,
        setEvent: setEvent
    };
_satellite&&
    (_satellite.dhl_utils = exporter);
module.exports = exporter;