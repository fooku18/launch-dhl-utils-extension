"use strict";

var window = require("@adobe/reactor-window");
var Promise = require("@adobe/reactor-promise");
var fetchPoly = require("./fetchPolyfill");

var internalTraffic = function(url){
    try{
        var fetch = window.fetch || fetchPoly.fetch;
        return fetch(url, {mode:"no-cors"});
    }catch(e){
        return new Promise(function(res, rej){rej()});
    }
}

module.exports = internalTraffic