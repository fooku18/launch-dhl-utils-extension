'use strict';

var document = require("@adobe/reactor-document");

module.exports = function(settings, event) {
  document.dispatchEvent(new CustomEvent(settings.name), {detail: event});
};
