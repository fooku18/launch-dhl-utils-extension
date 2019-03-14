var window = require('@adobe/reactor-window');

module.exports = function(path){
    if(!path||typeof(path)!="string")return!1;
    var parts = path.split("."),
        current = window,
        node, idx, re;
    while(node = parts.shift()){
        (re = node.match(/\[(\d)\]/)) && 
        (idx = re[1], node = node.replace(re[0],""));
        current = idx ? current[node][idx] : current[node];
        idx = !1;
        if(!current)break;
    }
    return current;
}