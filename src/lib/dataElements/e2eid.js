'use strict';

module.exports = function(settings) {
  return !(window.sessionStorage.getItem("s_e2eid_f")) ? (window.sessionStorage.setItem("s_e2eid_f", !0), window.sessionStorage.getItem("s_e2eid")) : "";
};