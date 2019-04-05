'use strict';

module.exports = function(settings) {
  var a=new Date,b=[a.getSeconds(),a.getMinutes(),a.getHours()],c=b[0],d=b[1],e=b[2],f=11<e?"PM":"AM",g=e%12?e%12:12;return"".concat(g,":00 ").concat(f);
};
