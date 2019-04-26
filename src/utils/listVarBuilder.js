"use strict";

module.exports = (c, d) => {
    var listVar = [];
    Object.keys(d).forEach(function(key){
        listVar.push(c+":"+key+":"+d[key]);
    })
    return listVar.join(",");
}