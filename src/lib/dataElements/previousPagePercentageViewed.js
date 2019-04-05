'use strict';

var window = require("@adobe/reactor-window");
var check = require("../../utils/check");
var initValues;

module.exports = function(settings) {
  var bootstrap = function(){
    var W = window, EL = W.addEventListener, AE = W.attachEvent, E = ['load', 'unload', 'scroll', 'resize', 'zoom', 'keyup', 'mouseup', 'touchend', 'orientationchange', 'pan'];
    var n = settings.details;
    var s_PPVid = n;
    var s_PPVi;
    var s_PPVt;
    var s_PPVg = function (r) {
      var k = 's_ppv',
      p = k + 'l',
      c = window.sessionStorage.getItem(r?k:p)||"",
      a = c.indexOf(',') > -1 ? c.split(',', 9) : [''],
      i,
      l = a.length;
      for (i = 0; i < 9; i++)
        a[i] = !r && i < l ? parseInt(a[i]) || 0 : 0;
      if (l < 9 || typeof a[8] != 'string')
        a[8] = '';
      if (r) {
        window.sessionStorage.setItem(p, c);
        window.sessionStorage.setItem(k, '?')
      }
      return a
    };
    var s_PPVevent = function (e) {
      var W = window,
      D = document,
      B = D.body,
      E = D.documentElement,
      S = window.screen || 0,
      Ho = 'offsetHeight',
      Hs = 'scrollHeight',
      Ts = 'scrollTop',
      Wc = 'clientWidth',
      Hc = 'clientHeight',
      C = 100,
      M = Math,
      J = 'object',
      N = 'number',
      e = e && typeof e == J ? e.type || '' : '';
      if (!e.indexOf('on'))
        e = e.substring(2);
      s_PPVi = s_PPVi || 0;
      if (s_PPVt && !e) {
        clearTimeout(s_PPVt);
        s_PPVt = 0;
        if (s_PPVi < 2)
          s_PPVi++
      }
      var h = M.max(B[Hs] || E[Hs], B[Ho] || E[Ho], B[Hc] || E[Hc]),
      X = W.innerWidth || E[Wc] || B[Wc] || 0,
      Y = W.innerHeight || E[Hc] || B[Hc] || 0,
      x = S ? S.width : 0,
      y = S ? S.height : 0,
      r = M.round(C * (W.devicePixelRatio || 1)) / C,
      b = (D.pageYOffset || E[Ts] || B[Ts] || 0) + Y,
      p = h > 0 && b > 0 ? M.round(C * b / h) : 0,
      O = W.orientation,
      o = !isNaN(O) ? M.abs(o) % 180 : Y > X ? 0 : 90,
      L = e == 'load' || s_PPVi < 1,
      a = s_PPVg(L),
      V = function (i, v, f, n) {
        var x = i;
        i = parseInt(typeof a == J && a.length > i ? a[i] : '0') || 0;
        v = typeof v != N ? i : v;
        v = f || v > i ? v : i;
        return n ? v : v > C ? C : v < 0 ? 0 : v
      };
      if (new RegExp('(iPod|iPad|iPhone)').exec(navigator.userAgent || '') && o) {
        o = x;
        x = y;
        y = o
      }
      o = o ? 'P' : 'L';
      a[8] = L ? '' : a[8].substring(0, 1);
      window.sessionStorage.setItem('s_ppv', V(0, p, L) + ',' + (L || !V(1) ? p : V(1)) + ',' + V(2, b, L, 1) + ',' + X + ',' + Y + ',' + x + ',' + y + ',' + r + ',' + a[8] + (a[8] == o ? '' : o))
      if(s_PPVi<1)
        window.sessionStorage.setItem('s_ppvl', V(0, p, L) + ',' + (L || !V(1) ? p : V(1)) + ',' + V(2, b, L, 1) + ',' + X + ',' + Y + ',' + x + ',' + y + ',' + r + ',' + a[8] + (a[8] == o ? '' : o))
      if (!s_PPVt && e != 'unload')
        s_PPVt = setTimeout(s_PPVevent, 333)
    };
    /** attach listener */
    try{
      for (var f = s_PPVevent, i = 0; i < E.length; i++)
        if (EL)
          EL(E[i], f, false);
        else if (AE)
          AE('on' + E[i], f);
    }catch(e){console.log()}
    f();
  }
  var set = function () {
    var a = ['s_ppv', 's_ppvl'], b, c, d;
    b = window.sessionStorage.getItem(a[0])||"",
    c = window.sessionStorage.getItem(a[1])||"",
    b = b.indexOf(',') > -1 ? b.split(',', 9) : [''],
    c = c.indexOf(',') > -1 ? c.split(',', 9) : [''];
    initValues = [b,c];
  };
  if(!check.sessionStorageCheck)return!1;
  if(!initValues){
    return set(), bootstrap(),
    settings.details!=="initial"?initValues[0][0]:initValues[1][0];
  }
  return settings.details!=="initial"?initValues[0][0]:initValues[1][0];
};