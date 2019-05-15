var document = require("@adobe/reactor-document");

document.addEventListener("click", function(e){
    var m = e.target.matches || e.target.matchesSelector || e.target.mozMatchesSelector || e.target.msMatchesSelector || e.target.oMatchesSelector || e.target.webkitMatchesSelector;
    if(m.call(e.target, "[data-tracking]"))
        clickEventSequence.forEach(function(l){
            l(e);
        });
});

var clickEventSequence = [];

var addEvent = function(fun){
    clickEventSequence.push(fun);
}

module.exports = {
    addEvent: addEvent
}