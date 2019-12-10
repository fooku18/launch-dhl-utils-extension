'use strict';


module.exports = function(settings) {
  return ~[0,6].indexOf(new Date().getDay())? "Weekend" : "Weekday";
};
