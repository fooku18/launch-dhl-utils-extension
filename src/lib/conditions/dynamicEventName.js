'use strict';

module.exports = function(settings, event) {
  return event&&event.eventInfo&&event.eventInfo.eventName == settings.condition || !1;
};