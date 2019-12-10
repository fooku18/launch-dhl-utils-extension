'use strict';

var document = require("@adobe/reactor-document");


module.exports = function(settings) {
  if(window.fetch && !window.sessionStorage.getItem("s_trft_util")){
    window.fetch(settings.url, {mode: 'no-cors'})
      .then(function(r){
        window.sessionStorage.setItem("s_trft_util", "i");
      })
      .catch(function(err){
        window.sessionStorage.setItem("s_trft_util", "e");
      })
  }
};