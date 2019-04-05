var window = require("@adobe/reactor-window");

var storageCheck = function(type){
    var dummy = "___q123hurtz321p___";
    try{
        window[type].setItem(dummy, 1);
        window[type].removeItem(dummy);
        return!0;
    }catch(e){
        turbine.logger.warn(type + " not supported by browser");
        return!1;
    }
}

var localStorageCheck = function(){
    return storageCheck("localStorage");
}

var sessionStorageCheck = function(){
    return storageCheck("sessionStorage");
}

module.exports = {
    localStorageCheck: localStorageCheck(),
    sessionStorageCheck: sessionStorageCheck()
}