'use strict';

var document = require("@adobe/reactor-document");


module.exports = function(settings, event) {
  setTimeout(function(){
    document.dispatchEvent(new CustomEvent(settings.name, {detail: settings.detail}));
  }, 0);
};
