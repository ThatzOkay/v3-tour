import { defineComponent as ft, ref as Se, watch as Rt, computed as W, onMounted as vt, nextTick as Lt, onUnmounted as $t, createElementBlock as V, openBlock as H, normalizeStyle as Dt, normalizeClass as et, unref as ne, renderSlot as Te, createElementVNode as De, createCommentVNode as J, toDisplayString as oe, withModifiers as ke, reactive as jt, getCurrentInstance as dt, onBeforeUnmount as Nt, createBlock as Ft } from "vue";
const tt = {
  onStart: () => {
  },
  onPreviousStep: (e) => {
  },
  onNextStep: (e) => {
  },
  onStop: () => {
  },
  onSkip: () => {
  },
  onFinish: () => {
  }
}, q = {
  highlight: !1,
  labels: {
    buttonSkip: "Skip tour",
    buttonPrevious: "Previous",
    buttonNext: "Next",
    buttonStop: "Finish"
  },
  enabledButtons: {
    buttonSkip: !0,
    buttonPrevious: !0,
    buttonNext: !0,
    buttonStop: !0
  },
  startTimeout: 0,
  stopOnTargetNotFound: !0,
  useKeyboardNavigation: !0,
  enabledNavigationKeys: {
    escape: !0,
    arrowRight: !0,
    arrowLeft: !0
  },
  debug: !1
}, I = {
  classes: {
    active: "v-tour--active",
    targetHighlighted: "v-tour__target--highlighted",
    targetRelative: "v-tour__target--relative"
  },
  transition: "box-shadow 0s ease-in-out 0s"
}, Ht = {
  enableScrolling: !0,
  highlight: q.highlight,
  // By default use the global tour setting
  enabledButtons: q.enabledButtons,
  modifiers: [
    {
      name: "arrow",
      options: {
        element: ".v-step__arrow",
        padding: 10
      }
    },
    {
      name: "preventOverflow",
      options: {
        rootBoundary: "window",
        padding: 10
      }
    },
    {
      name: "offset",
      options: {
        offset: [0, 10]
      }
    }
  ],
  placement: "bottom"
}, je = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37,
  ESCAPE: 27
};
var Vt = function(t, r, o, n) {
  return t /= n / 2, t < 1 ? o / 2 * t * t + r : (t--, -o / 2 * (t * (t - 2) - 1) + r);
}, rt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
  return typeof e;
} : function(e) {
  return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _t = function() {
  var t = void 0, r = void 0, o = void 0, n = void 0, a = void 0, u = void 0, s = void 0, i = void 0, c = void 0, l = void 0, w = void 0, b = void 0;
  function d() {
    return window.scrollY || window.pageYOffset;
  }
  function O(v) {
    return v.getBoundingClientRect().top + r;
  }
  function m(v) {
    c || (c = v), l = v - c, w = a(l, r, s, i), window.scrollTo(0, w), l < i ? window.requestAnimationFrame(m) : x();
  }
  function x() {
    window.scrollTo(0, r + s), t && u && (t.setAttribute("tabindex", "-1"), t.focus()), typeof b == "function" && b(), c = !1;
  }
  function f(v) {
    var h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    switch (i = h.duration || 1e3, n = h.offset || 0, b = h.callback, a = h.easing || Vt, u = h.a11y || !1, r = d(), typeof v > "u" ? "undefined" : rt(v)) {
      // scroll from current position
      case "number":
        t = void 0, u = !1, o = r + v;
        break;
      // scroll to element (node)
      // bounding rect is relative to the viewport
      case "object":
        t = v, o = O(t);
        break;
      // scroll to element (selector)
      // bounding rect is relative to the viewport
      case "string":
        t = document.querySelector(v), o = O(t);
        break;
    }
    switch (s = o - r + n, rt(h.duration)) {
      // number in ms
      case "number":
        i = h.duration;
        break;
      // function passed the distance of the scroll
      case "function":
        i = h.duration(s);
        break;
    }
    window.requestAnimationFrame(m);
  }
  return f;
}, Mt = _t(), B = "top", D = "bottom", j = "right", C = "left", He = "auto", ge = [B, D, j, C], ae = "start", de = "end", It = "clippingParents", ht = "viewport", ce = "popper", Wt = "reference", ot = /* @__PURE__ */ ge.reduce(function(e, t) {
  return e.concat([t + "-" + ae, t + "-" + de]);
}, []), gt = /* @__PURE__ */ [].concat(ge, [He]).reduce(function(e, t) {
  return e.concat([t, t + "-" + ae, t + "-" + de]);
}, []), qt = "beforeRead", Ut = "read", Yt = "afterRead", zt = "beforeMain", Xt = "main", Kt = "afterMain", Gt = "beforeWrite", Qt = "write", Zt = "afterWrite", Jt = [qt, Ut, Yt, zt, Xt, Kt, Gt, Qt, Zt];
function M(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function L(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function te(e) {
  var t = L(e).Element;
  return e instanceof t || e instanceof Element;
}
function $(e) {
  var t = L(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Ve(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = L(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function er(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var o = t.styles[r] || {}, n = t.attributes[r] || {}, a = t.elements[r];
    !$(a) || !M(a) || (Object.assign(a.style, o), Object.keys(n).forEach(function(u) {
      var s = n[u];
      s === !1 ? a.removeAttribute(u) : a.setAttribute(u, s === !0 ? "" : s);
    }));
  });
}
function tr(e) {
  var t = e.state, r = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow), function() {
    Object.keys(t.elements).forEach(function(o) {
      var n = t.elements[o], a = t.attributes[o] || {}, u = Object.keys(t.styles.hasOwnProperty(o) ? t.styles[o] : r[o]), s = u.reduce(function(i, c) {
        return i[c] = "", i;
      }, {});
      !$(n) || !M(n) || (Object.assign(n.style, s), Object.keys(a).forEach(function(i) {
        n.removeAttribute(i);
      }));
    });
  };
}
const rr = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: er,
  effect: tr,
  requires: ["computeStyles"]
};
function _(e) {
  return e.split("-")[0];
}
var ee = Math.max, Ae = Math.min, ie = Math.round;
function Ne() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function mt() {
  return !/^((?!chrome|android).)*safari/i.test(Ne());
}
function se(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var o = e.getBoundingClientRect(), n = 1, a = 1;
  t && $(e) && (n = e.offsetWidth > 0 && ie(o.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && ie(o.height) / e.offsetHeight || 1);
  var u = te(e) ? L(e) : window, s = u.visualViewport, i = !mt() && r, c = (o.left + (i && s ? s.offsetLeft : 0)) / n, l = (o.top + (i && s ? s.offsetTop : 0)) / a, w = o.width / n, b = o.height / a;
  return {
    width: w,
    height: b,
    top: l,
    right: c + w,
    bottom: l + b,
    left: c,
    x: c,
    y: l
  };
}
function _e(e) {
  var t = se(e), r = e.offsetWidth, o = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - o) <= 1 && (o = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: o
  };
}
function bt(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && Ve(r)) {
    var o = t;
    do {
      if (o && e.isSameNode(o))
        return !0;
      o = o.parentNode || o.host;
    } while (o);
  }
  return !1;
}
function U(e) {
  return L(e).getComputedStyle(e);
}
function or(e) {
  return ["table", "td", "th"].indexOf(M(e)) >= 0;
}
function z(e) {
  return ((te(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Be(e) {
  return M(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Ve(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    z(e)
  );
}
function nt(e) {
  return !$(e) || // https://github.com/popperjs/popper-core/issues/837
  U(e).position === "fixed" ? null : e.offsetParent;
}
function nr(e) {
  var t = /firefox/i.test(Ne()), r = /Trident/i.test(Ne());
  if (r && $(e)) {
    var o = U(e);
    if (o.position === "fixed")
      return null;
  }
  var n = Be(e);
  for (Ve(n) && (n = n.host); $(n) && ["html", "body"].indexOf(M(n)) < 0; ) {
    var a = U(n);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
}
function me(e) {
  for (var t = L(e), r = nt(e); r && or(r) && U(r).position === "static"; )
    r = nt(r);
  return r && (M(r) === "html" || M(r) === "body" && U(r).position === "static") ? t : r || nr(e) || t;
}
function Me(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function fe(e, t, r) {
  return ee(e, Ae(t, r));
}
function ar(e, t, r) {
  var o = fe(e, t, r);
  return o > r ? r : o;
}
function yt() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function wt(e) {
  return Object.assign({}, yt(), e);
}
function xt(e, t) {
  return t.reduce(function(r, o) {
    return r[o] = e, r;
  }, {});
}
var ir = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, wt(typeof t != "number" ? t : xt(t, ge));
};
function sr(e) {
  var t, r = e.state, o = e.name, n = e.options, a = r.elements.arrow, u = r.modifiersData.popperOffsets, s = _(r.placement), i = Me(s), c = [C, j].indexOf(s) >= 0, l = c ? "height" : "width";
  if (!(!a || !u)) {
    var w = ir(n.padding, r), b = _e(a), d = i === "y" ? B : C, O = i === "y" ? D : j, m = r.rects.reference[l] + r.rects.reference[i] - u[i] - r.rects.popper[l], x = u[i] - r.rects.reference[i], f = me(a), v = f ? i === "y" ? f.clientHeight || 0 : f.clientWidth || 0 : 0, h = m / 2 - x / 2, g = w[d], S = v - b[l] - w[O], p = v / 2 - b[l] / 2 + h, y = fe(g, p, S), k = i;
    r.modifiersData[o] = (t = {}, t[k] = y, t.centerOffset = y - p, t);
  }
}
function ur(e) {
  var t = e.state, r = e.options, o = r.element, n = o === void 0 ? "[data-popper-arrow]" : o;
  n != null && (typeof n == "string" && (n = t.elements.popper.querySelector(n), !n) || bt(t.elements.popper, n) && (t.elements.arrow = n));
}
const lr = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: sr,
  effect: ur,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function ue(e) {
  return e.split("-")[1];
}
var pr = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function cr(e, t) {
  var r = e.x, o = e.y, n = t.devicePixelRatio || 1;
  return {
    x: ie(r * n) / n || 0,
    y: ie(o * n) / n || 0
  };
}
function at(e) {
  var t, r = e.popper, o = e.popperRect, n = e.placement, a = e.variation, u = e.offsets, s = e.position, i = e.gpuAcceleration, c = e.adaptive, l = e.roundOffsets, w = e.isFixed, b = u.x, d = b === void 0 ? 0 : b, O = u.y, m = O === void 0 ? 0 : O, x = typeof l == "function" ? l({
    x: d,
    y: m
  }) : {
    x: d,
    y: m
  };
  d = x.x, m = x.y;
  var f = u.hasOwnProperty("x"), v = u.hasOwnProperty("y"), h = C, g = B, S = window;
  if (c) {
    var p = me(r), y = "clientHeight", k = "clientWidth";
    if (p === L(r) && (p = z(r), U(p).position !== "static" && s === "absolute" && (y = "scrollHeight", k = "scrollWidth")), p = p, n === B || (n === C || n === j) && a === de) {
      g = D;
      var P = w && p === S && S.visualViewport ? S.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        p[y]
      );
      m -= P - o.height, m *= i ? 1 : -1;
    }
    if (n === C || (n === B || n === D) && a === de) {
      h = j;
      var T = w && p === S && S.visualViewport ? S.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        p[k]
      );
      d -= T - o.width, d *= i ? 1 : -1;
    }
  }
  var E = Object.assign({
    position: s
  }, c && pr), N = l === !0 ? cr({
    x: d,
    y: m
  }, L(r)) : {
    x: d,
    y: m
  };
  if (d = N.x, m = N.y, i) {
    var A;
    return Object.assign({}, E, (A = {}, A[g] = v ? "0" : "", A[h] = f ? "0" : "", A.transform = (S.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + m + "px)" : "translate3d(" + d + "px, " + m + "px, 0)", A));
  }
  return Object.assign({}, E, (t = {}, t[g] = v ? m + "px" : "", t[h] = f ? d + "px" : "", t.transform = "", t));
}
function fr(e) {
  var t = e.state, r = e.options, o = r.gpuAcceleration, n = o === void 0 ? !0 : o, a = r.adaptive, u = a === void 0 ? !0 : a, s = r.roundOffsets, i = s === void 0 ? !0 : s, c = {
    placement: _(t.placement),
    variation: ue(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: n,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, at(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: u,
    roundOffsets: i
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, at(Object.assign({}, c, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: i
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const vr = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: fr,
  data: {}
};
var Pe = {
  passive: !0
};
function dr(e) {
  var t = e.state, r = e.instance, o = e.options, n = o.scroll, a = n === void 0 ? !0 : n, u = o.resize, s = u === void 0 ? !0 : u, i = L(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && c.forEach(function(l) {
    l.addEventListener("scroll", r.update, Pe);
  }), s && i.addEventListener("resize", r.update, Pe), function() {
    a && c.forEach(function(l) {
      l.removeEventListener("scroll", r.update, Pe);
    }), s && i.removeEventListener("resize", r.update, Pe);
  };
}
const hr = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: dr,
  data: {}
};
var gr = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ee(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return gr[t];
  });
}
var mr = {
  start: "end",
  end: "start"
};
function it(e) {
  return e.replace(/start|end/g, function(t) {
    return mr[t];
  });
}
function Ie(e) {
  var t = L(e), r = t.pageXOffset, o = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: o
  };
}
function We(e) {
  return se(z(e)).left + Ie(e).scrollLeft;
}
function br(e, t) {
  var r = L(e), o = z(e), n = r.visualViewport, a = o.clientWidth, u = o.clientHeight, s = 0, i = 0;
  if (n) {
    a = n.width, u = n.height;
    var c = mt();
    (c || !c && t === "fixed") && (s = n.offsetLeft, i = n.offsetTop);
  }
  return {
    width: a,
    height: u,
    x: s + We(e),
    y: i
  };
}
function yr(e) {
  var t, r = z(e), o = Ie(e), n = (t = e.ownerDocument) == null ? void 0 : t.body, a = ee(r.scrollWidth, r.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), u = ee(r.scrollHeight, r.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), s = -o.scrollLeft + We(e), i = -o.scrollTop;
  return U(n || r).direction === "rtl" && (s += ee(r.clientWidth, n ? n.clientWidth : 0) - a), {
    width: a,
    height: u,
    x: s,
    y: i
  };
}
function qe(e) {
  var t = U(e), r = t.overflow, o = t.overflowX, n = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + n + o);
}
function Ot(e) {
  return ["html", "body", "#document"].indexOf(M(e)) >= 0 ? e.ownerDocument.body : $(e) && qe(e) ? e : Ot(Be(e));
}
function ve(e, t) {
  var r;
  t === void 0 && (t = []);
  var o = Ot(e), n = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = L(o), u = n ? [a].concat(a.visualViewport || [], qe(o) ? o : []) : o, s = t.concat(u);
  return n ? s : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    s.concat(ve(Be(u)))
  );
}
function Fe(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function wr(e, t) {
  var r = se(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function st(e, t, r) {
  return t === ht ? Fe(br(e, r)) : te(t) ? wr(t, r) : Fe(yr(z(e)));
}
function xr(e) {
  var t = ve(Be(e)), r = ["absolute", "fixed"].indexOf(U(e).position) >= 0, o = r && $(e) ? me(e) : e;
  return te(o) ? t.filter(function(n) {
    return te(n) && bt(n, o) && M(n) !== "body";
  }) : [];
}
function Or(e, t, r, o) {
  var n = t === "clippingParents" ? xr(e) : [].concat(t), a = [].concat(n, [r]), u = a[0], s = a.reduce(function(i, c) {
    var l = st(e, c, o);
    return i.top = ee(l.top, i.top), i.right = Ae(l.right, i.right), i.bottom = Ae(l.bottom, i.bottom), i.left = ee(l.left, i.left), i;
  }, st(e, u, o));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function St(e) {
  var t = e.reference, r = e.element, o = e.placement, n = o ? _(o) : null, a = o ? ue(o) : null, u = t.x + t.width / 2 - r.width / 2, s = t.y + t.height / 2 - r.height / 2, i;
  switch (n) {
    case B:
      i = {
        x: u,
        y: t.y - r.height
      };
      break;
    case D:
      i = {
        x: u,
        y: t.y + t.height
      };
      break;
    case j:
      i = {
        x: t.x + t.width,
        y: s
      };
      break;
    case C:
      i = {
        x: t.x - r.width,
        y: s
      };
      break;
    default:
      i = {
        x: t.x,
        y: t.y
      };
  }
  var c = n ? Me(n) : null;
  if (c != null) {
    var l = c === "y" ? "height" : "width";
    switch (a) {
      case ae:
        i[c] = i[c] - (t[l] / 2 - r[l] / 2);
        break;
      case de:
        i[c] = i[c] + (t[l] / 2 - r[l] / 2);
        break;
    }
  }
  return i;
}
function he(e, t) {
  t === void 0 && (t = {});
  var r = t, o = r.placement, n = o === void 0 ? e.placement : o, a = r.strategy, u = a === void 0 ? e.strategy : a, s = r.boundary, i = s === void 0 ? It : s, c = r.rootBoundary, l = c === void 0 ? ht : c, w = r.elementContext, b = w === void 0 ? ce : w, d = r.altBoundary, O = d === void 0 ? !1 : d, m = r.padding, x = m === void 0 ? 0 : m, f = wt(typeof x != "number" ? x : xt(x, ge)), v = b === ce ? Wt : ce, h = e.rects.popper, g = e.elements[O ? v : b], S = Or(te(g) ? g : g.contextElement || z(e.elements.popper), i, l, u), p = se(e.elements.reference), y = St({
    reference: p,
    element: h,
    placement: n
  }), k = Fe(Object.assign({}, h, y)), P = b === ce ? k : p, T = {
    top: S.top - P.top + f.top,
    bottom: P.bottom - S.bottom + f.bottom,
    left: S.left - P.left + f.left,
    right: P.right - S.right + f.right
  }, E = e.modifiersData.offset;
  if (b === ce && E) {
    var N = E[n];
    Object.keys(T).forEach(function(A) {
      var X = [j, D].indexOf(A) >= 0 ? 1 : -1, K = [B, D].indexOf(A) >= 0 ? "y" : "x";
      T[A] += N[K] * X;
    });
  }
  return T;
}
function Sr(e, t) {
  t === void 0 && (t = {});
  var r = t, o = r.placement, n = r.boundary, a = r.rootBoundary, u = r.padding, s = r.flipVariations, i = r.allowedAutoPlacements, c = i === void 0 ? gt : i, l = ue(o), w = l ? s ? ot : ot.filter(function(O) {
    return ue(O) === l;
  }) : ge, b = w.filter(function(O) {
    return c.indexOf(O) >= 0;
  });
  b.length === 0 && (b = w);
  var d = b.reduce(function(O, m) {
    return O[m] = he(e, {
      placement: m,
      boundary: n,
      rootBoundary: a,
      padding: u
    })[_(m)], O;
  }, {});
  return Object.keys(d).sort(function(O, m) {
    return d[O] - d[m];
  });
}
function kr(e) {
  if (_(e) === He)
    return [];
  var t = Ee(e);
  return [it(e), t, it(t)];
}
function Pr(e) {
  var t = e.state, r = e.options, o = e.name;
  if (!t.modifiersData[o]._skip) {
    for (var n = r.mainAxis, a = n === void 0 ? !0 : n, u = r.altAxis, s = u === void 0 ? !0 : u, i = r.fallbackPlacements, c = r.padding, l = r.boundary, w = r.rootBoundary, b = r.altBoundary, d = r.flipVariations, O = d === void 0 ? !0 : d, m = r.allowedAutoPlacements, x = t.options.placement, f = _(x), v = f === x, h = i || (v || !O ? [Ee(x)] : kr(x)), g = [x].concat(h).reduce(function(re, Y) {
      return re.concat(_(Y) === He ? Sr(t, {
        placement: Y,
        boundary: l,
        rootBoundary: w,
        padding: c,
        flipVariations: O,
        allowedAutoPlacements: m
      }) : Y);
    }, []), S = t.rects.reference, p = t.rects.popper, y = /* @__PURE__ */ new Map(), k = !0, P = g[0], T = 0; T < g.length; T++) {
      var E = g[T], N = _(E), A = ue(E) === ae, X = [B, D].indexOf(N) >= 0, K = X ? "width" : "height", R = he(t, {
        placement: E,
        boundary: l,
        rootBoundary: w,
        altBoundary: b,
        padding: c
      }), F = X ? A ? j : C : A ? D : B;
      S[K] > p[K] && (F = Ee(F));
      var be = Ee(F), G = [];
      if (a && G.push(R[N] <= 0), s && G.push(R[F] <= 0, R[be] <= 0), G.every(function(re) {
        return re;
      })) {
        P = E, k = !1;
        break;
      }
      y.set(E, G);
    }
    if (k)
      for (var ye = O ? 3 : 1, Ce = function(Y) {
        var pe = g.find(function(xe) {
          var Q = y.get(xe);
          if (Q)
            return Q.slice(0, Y).every(function(Re) {
              return Re;
            });
        });
        if (pe)
          return P = pe, "break";
      }, le = ye; le > 0; le--) {
        var we = Ce(le);
        if (we === "break") break;
      }
    t.placement !== P && (t.modifiersData[o]._skip = !0, t.placement = P, t.reset = !0);
  }
}
const Tr = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Pr,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ut(e, t, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - r.y,
    right: e.right - t.width + r.x,
    bottom: e.bottom - t.height + r.y,
    left: e.left - t.width - r.x
  };
}
function lt(e) {
  return [B, j, D, C].some(function(t) {
    return e[t] >= 0;
  });
}
function Er(e) {
  var t = e.state, r = e.name, o = t.rects.reference, n = t.rects.popper, a = t.modifiersData.preventOverflow, u = he(t, {
    elementContext: "reference"
  }), s = he(t, {
    altBoundary: !0
  }), i = ut(u, o), c = ut(s, n, a), l = lt(i), w = lt(c);
  t.modifiersData[r] = {
    referenceClippingOffsets: i,
    popperEscapeOffsets: c,
    isReferenceHidden: l,
    hasPopperEscaped: w
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": l,
    "data-popper-escaped": w
  });
}
const Ar = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Er
};
function Br(e, t, r) {
  var o = _(e), n = [C, B].indexOf(o) >= 0 ? -1 : 1, a = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, u = a[0], s = a[1];
  return u = u || 0, s = (s || 0) * n, [C, j].indexOf(o) >= 0 ? {
    x: s,
    y: u
  } : {
    x: u,
    y: s
  };
}
function Cr(e) {
  var t = e.state, r = e.options, o = e.name, n = r.offset, a = n === void 0 ? [0, 0] : n, u = gt.reduce(function(l, w) {
    return l[w] = Br(w, t.rects, a), l;
  }, {}), s = u[t.placement], i = s.x, c = s.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += i, t.modifiersData.popperOffsets.y += c), t.modifiersData[o] = u;
}
const Rr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Cr
};
function Lr(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = St({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const $r = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Lr,
  data: {}
};
function Dr(e) {
  return e === "x" ? "y" : "x";
}
function jr(e) {
  var t = e.state, r = e.options, o = e.name, n = r.mainAxis, a = n === void 0 ? !0 : n, u = r.altAxis, s = u === void 0 ? !1 : u, i = r.boundary, c = r.rootBoundary, l = r.altBoundary, w = r.padding, b = r.tether, d = b === void 0 ? !0 : b, O = r.tetherOffset, m = O === void 0 ? 0 : O, x = he(t, {
    boundary: i,
    rootBoundary: c,
    padding: w,
    altBoundary: l
  }), f = _(t.placement), v = ue(t.placement), h = !v, g = Me(f), S = Dr(g), p = t.modifiersData.popperOffsets, y = t.rects.reference, k = t.rects.popper, P = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, T = typeof P == "number" ? {
    mainAxis: P,
    altAxis: P
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, P), E = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, N = {
    x: 0,
    y: 0
  };
  if (p) {
    if (a) {
      var A, X = g === "y" ? B : C, K = g === "y" ? D : j, R = g === "y" ? "height" : "width", F = p[g], be = F + x[X], G = F - x[K], ye = d ? -k[R] / 2 : 0, Ce = v === ae ? y[R] : k[R], le = v === ae ? -k[R] : -y[R], we = t.elements.arrow, re = d && we ? _e(we) : {
        width: 0,
        height: 0
      }, Y = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : yt(), pe = Y[X], xe = Y[K], Q = fe(0, y[R], re[R]), Re = h ? y[R] / 2 - ye - Q - pe - T.mainAxis : Ce - Q - pe - T.mainAxis, Pt = h ? -y[R] / 2 + ye + Q + xe + T.mainAxis : le + Q + xe + T.mainAxis, Le = t.elements.arrow && me(t.elements.arrow), Tt = Le ? g === "y" ? Le.clientTop || 0 : Le.clientLeft || 0 : 0, Ue = (A = E?.[g]) != null ? A : 0, Et = F + Re - Ue - Tt, At = F + Pt - Ue, Ye = fe(d ? Ae(be, Et) : be, F, d ? ee(G, At) : G);
      p[g] = Ye, N[g] = Ye - F;
    }
    if (s) {
      var ze, Bt = g === "x" ? B : C, Ct = g === "x" ? D : j, Z = p[S], Oe = S === "y" ? "height" : "width", Xe = Z + x[Bt], Ke = Z - x[Ct], $e = [B, C].indexOf(f) !== -1, Ge = (ze = E?.[S]) != null ? ze : 0, Qe = $e ? Xe : Z - y[Oe] - k[Oe] - Ge + T.altAxis, Ze = $e ? Z + y[Oe] + k[Oe] - Ge - T.altAxis : Ke, Je = d && $e ? ar(Qe, Z, Ze) : fe(d ? Qe : Xe, Z, d ? Ze : Ke);
      p[S] = Je, N[S] = Je - Z;
    }
    t.modifiersData[o] = N;
  }
}
const Nr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: jr,
  requiresIfExists: ["offset"]
};
function Fr(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Hr(e) {
  return e === L(e) || !$(e) ? Ie(e) : Fr(e);
}
function Vr(e) {
  var t = e.getBoundingClientRect(), r = ie(t.width) / e.offsetWidth || 1, o = ie(t.height) / e.offsetHeight || 1;
  return r !== 1 || o !== 1;
}
function _r(e, t, r) {
  r === void 0 && (r = !1);
  var o = $(t), n = $(t) && Vr(t), a = z(t), u = se(e, n, r), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, i = {
    x: 0,
    y: 0
  };
  return (o || !o && !r) && ((M(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  qe(a)) && (s = Hr(t)), $(t) ? (i = se(t, !0), i.x += t.clientLeft, i.y += t.clientTop) : a && (i.x = We(a))), {
    x: u.left + s.scrollLeft - i.x,
    y: u.top + s.scrollTop - i.y,
    width: u.width,
    height: u.height
  };
}
function Mr(e) {
  var t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), o = [];
  e.forEach(function(a) {
    t.set(a.name, a);
  });
  function n(a) {
    r.add(a.name);
    var u = [].concat(a.requires || [], a.requiresIfExists || []);
    u.forEach(function(s) {
      if (!r.has(s)) {
        var i = t.get(s);
        i && n(i);
      }
    }), o.push(a);
  }
  return e.forEach(function(a) {
    r.has(a.name) || n(a);
  }), o;
}
function Ir(e) {
  var t = Mr(e);
  return Jt.reduce(function(r, o) {
    return r.concat(t.filter(function(n) {
      return n.phase === o;
    }));
  }, []);
}
function Wr(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function qr(e) {
  var t = e.reduce(function(r, o) {
    var n = r[o.name];
    return r[o.name] = n ? Object.assign({}, n, o, {
      options: Object.assign({}, n.options, o.options),
      data: Object.assign({}, n.data, o.data)
    }) : o, r;
  }, {});
  return Object.keys(t).map(function(r) {
    return t[r];
  });
}
var pt = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function ct() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(o) {
    return !(o && typeof o.getBoundingClientRect == "function");
  });
}
function Ur(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, o = r === void 0 ? [] : r, n = t.defaultOptions, a = n === void 0 ? pt : n;
  return function(s, i, c) {
    c === void 0 && (c = a);
    var l = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, pt, a),
      modifiersData: {},
      elements: {
        reference: s,
        popper: i
      },
      attributes: {},
      styles: {}
    }, w = [], b = !1, d = {
      state: l,
      setOptions: function(f) {
        var v = typeof f == "function" ? f(l.options) : f;
        m(), l.options = Object.assign({}, a, l.options, v), l.scrollParents = {
          reference: te(s) ? ve(s) : s.contextElement ? ve(s.contextElement) : [],
          popper: ve(i)
        };
        var h = Ir(qr([].concat(o, l.options.modifiers)));
        return l.orderedModifiers = h.filter(function(g) {
          return g.enabled;
        }), O(), d.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!b) {
          var f = l.elements, v = f.reference, h = f.popper;
          if (ct(v, h)) {
            l.rects = {
              reference: _r(v, me(h), l.options.strategy === "fixed"),
              popper: _e(h)
            }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach(function(T) {
              return l.modifiersData[T.name] = Object.assign({}, T.data);
            });
            for (var g = 0; g < l.orderedModifiers.length; g++) {
              if (l.reset === !0) {
                l.reset = !1, g = -1;
                continue;
              }
              var S = l.orderedModifiers[g], p = S.fn, y = S.options, k = y === void 0 ? {} : y, P = S.name;
              typeof p == "function" && (l = p({
                state: l,
                options: k,
                name: P,
                instance: d
              }) || l);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Wr(function() {
        return new Promise(function(x) {
          d.forceUpdate(), x(l);
        });
      }),
      destroy: function() {
        m(), b = !0;
      }
    };
    if (!ct(s, i))
      return d;
    d.setOptions(c).then(function(x) {
      !b && c.onFirstUpdate && c.onFirstUpdate(x);
    });
    function O() {
      l.orderedModifiers.forEach(function(x) {
        var f = x.name, v = x.options, h = v === void 0 ? {} : v, g = x.effect;
        if (typeof g == "function") {
          var S = g({
            state: l,
            name: f,
            instance: d,
            options: h
          }), p = function() {
          };
          w.push(S || p);
        }
      });
    }
    function m() {
      w.forEach(function(x) {
        return x();
      }), w = [];
    }
    return d;
  };
}
var Yr = [hr, $r, vr, rr, Rr, Tr, Nr, lr, Ar], zr = /* @__PURE__ */ Ur({
  defaultModifiers: Yr
});
const Xr = ["id"], Kr = {
  key: 0,
  class: "v-step__header"
}, Gr = ["innerHTML"], Qr = { class: "v-step__content" }, Zr = ["innerHTML"], Jr = { key: 1 }, eo = { class: "v-step__buttons" }, to = /* @__PURE__ */ ft({
  __name: "VStep",
  props: {
    step: {},
    previousStep: { type: Function },
    nextStep: { type: Function },
    stop: { type: Function },
    skip: { type: Function },
    finish: { type: Function },
    isFirst: { type: Boolean },
    isLast: { type: Boolean },
    labels: {},
    enabledButtons: {},
    highlight: { type: Boolean },
    stopOnFail: { type: Boolean },
    debug: { type: Boolean },
    ionic: { type: Boolean }
  },
  emits: ["targetNotFound"],
  setup(e, { expose: t, emit: r }) {
    const o = e;
    let n = Se();
    Rt(n, (p) => {
      o.debug && console.log('[Vue Tour] Floating styles for .v-step[id="' + a.value + '"]:', p);
    });
    const a = Se(o.step.target), u = Se(typeof o.step.target == "string" ? document.querySelector(o.step.target) : o.step.target), s = Se(null), i = W(() => ({
      ...Ht,
      highlight: o.highlight,
      enabledButtons: Object.assign({}, o.enabledButtons),
      labels: o.labels,
      ...o.step.params
      // Then use local step parameters if defined
    })), c = W(() => !o.step.target), l = () => {
      o.debug && (console.log("[Vue Tour] The target element " + o.step.target + ' of .v-step[id="' + a.value + '"] is:', u.value), console.log('[Vue Tour] The step element .v-step[id="' + a.value + '"] is:', s.value)), c.value && s.value ? document.body.appendChild(s.value) : u.value && s.value ? (w(), d(), zr(
        u.value,
        s.value,
        {
          modifiers: i.value.modifiers
        }
      )) : (o.debug && console.error("[Vue Tour] The target element " + o.step.target + ' of .v-step[id="' + a.value + '"] does not exist!'), S("targetNotFound", o.step), o.stopOnFail && stop());
    }, w = () => {
      if (i.value.enableScrolling)
        if (o.step.params && o.step.params.duration || o.step.params && o.step.params.offset) {
          let p = {
            duration: o.step.params.duration || 1e3,
            offset: o.step.params.offset || 0,
            callback: void 0,
            a11y: !1
          };
          u.value && (o.ionic ? v(p) : Mt(u.value, p));
        } else
          u.value?.scrollIntoView({ behavior: "smooth" });
    }, b = () => (o.debug && console.log(`[Vue Tour] Highlight is ${i.value.highlight ? "enabled" : "disabled"} for .v-step[id="${a.value}"]`), i.value.highlight), d = () => {
      if (b()) {
        document.body.classList.add(I.classes.active);
        const p = u.value;
        if (!p || !u.value) {
          console.error("[Vue Tour] Target element not found for highlight.");
          return;
        }
        const y = window.getComputedStyle(p).getPropertyValue("transition");
        y !== "all 0s ease 0s" && (u.value.style.transition = `${y}, ${I.transition}`), u.value.classList.add(I.classes.targetHighlighted), u.value.style.position || u.value.classList.add(I.classes.targetRelative);
      } else
        document.body.classList.remove(I.classes.active);
    }, O = () => {
      if (b()) {
        const p = u.value, y = u.value?.style.transition;
        u.value?.classList.remove(I.classes.targetHighlighted), u.value?.classList.remove(I.classes.targetRelative), p && y?.includes(I.transition) && setTimeout(() => {
          p.style.transition = y.replace(`, ${I.transition}`, "");
        }, 0);
      }
    }, m = (p) => i.value.enabledButtons.hasOwnProperty(p) ? i.value.enabledButtons[p] : !0, x = (p) => {
      if (!u.value)
        return console.error("[Vue Tour] Target element not found for offset calculation."), 0;
      let k = u.value.getBoundingClientRect().top;
      return p.offset && (k += p.offset), k;
    }, f = () => {
      const p = document.getElementsByClassName("ion-page");
      if (p.length) {
        const y = {};
        for (const P of p) {
          const E = window.getComputedStyle(P).zIndex;
          y[E] = P.querySelector("ion-content");
        }
        const k = Math.max(...Object.keys(y).map((P) => +P));
        return { el: y[k], pages: Object.keys(y).length };
      }
      return null;
    }, v = (p) => {
      const y = x(p), k = f();
      k ? k.el.scrollByPoint(0, y, p.duration || 1e3) : console.error("[Vue Tour] No Ion Content found for scrolling.");
    };
    vt(() => {
      console.log('[Vue Tour] Creating step for .v-step[id="' + a.value + '"] targeting ' + o.step.target), Lt(() => {
        l();
      });
    }), $t(() => {
      O();
    });
    const h = () => {
      o.stop();
    }, g = () => {
      o.stop();
    };
    t({ skip: h, finish: g });
    const S = r;
    return (p, y) => (H(), V("div", {
      class: et([{ "v-step--sticky": c.value }, "v-step"]),
      style: Dt(ne(n)),
      id: "v-step-" + a.value,
      ref_key: "stepRef",
      ref: s
    }, [
      Te(p.$slots, "header", {}, () => [
        p.step.header ? (H(), V("div", Kr, [
          p.step.header.title ? (H(), V("div", {
            key: 0,
            innerHTML: p.step.header.title
          }, null, 8, Gr)) : J("", !0)
        ])) : J("", !0)
      ], !0),
      Te(p.$slots, "content", {}, () => [
        De("div", Qr, [
          p.step.content ? (H(), V("div", {
            key: 0,
            innerHTML: p.step.content
          }, null, 8, Zr)) : (H(), V("div", Jr, "This is a demo step! The id of this step is " + oe(a.value) + " and it targets " + oe(p.step.target) + ".", 1))
        ])
      ], !0),
      Te(p.$slots, "actions", {}, () => [
        De("div", eo, [
          !p.isLast && m("buttonSkip") ? (H(), V("button", {
            key: 0,
            onClick: ke(h, ["prevent"]),
            class: "v-step__button v-step__button-skip"
          }, oe(i.value.labels?.buttonSkip), 1)) : J("", !0),
          !p.isFirst && m("buttonPrevious") ? (H(), V("button", {
            key: 1,
            onClick: y[0] || (y[0] = ke(
              //@ts-ignore
              (...k) => p.previousStep && p.previousStep(...k),
              ["prevent"]
            )),
            class: "v-step__button v-step__button-previous"
          }, oe(i.value.labels?.buttonPrevious), 1)) : J("", !0),
          !p.isLast && m("buttonNext") ? (H(), V("button", {
            key: 2,
            onClick: y[1] || (y[1] = ke(
              //@ts-ignore
              (...k) => p.nextStep && p.nextStep(...k),
              ["prevent"]
            )),
            class: "v-step__button v-step__button-next"
          }, oe(i.value.labels?.buttonNext), 1)) : J("", !0),
          p.isLast && m("buttonStop") ? (H(), V("button", {
            key: 3,
            onClick: ke(g, ["prevent"]),
            class: "v-step__button v-step__button-stop"
          }, oe(i.value.labels?.buttonStop), 1)) : J("", !0)
        ])
      ], !0),
      De("div", {
        class: et(["v-step__arrow", { "v-step__arrow--dark": p.step.header && p.step.header.title }]),
        "data-popper-arrow": ""
      }, null, 2)
    ], 14, Xr));
  }
}), ro = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [o, n] of t)
    r[o] = n;
  return r;
}, kt = /* @__PURE__ */ ro(to, [["__scopeId", "data-v-f4f6baf8"]]), oo = { class: "v-tour" }, no = /* @__PURE__ */ ft({
  __name: "VTour",
  props: {
    steps: {},
    name: {},
    options: { default: () => q },
    callbacks: { default: () => tt }
  },
  setup(e, { expose: t }) {
    const r = e, o = jt({ value: -1 }), n = W(() => ({
      ...q,
      ...r.options
    })), a = W(() => ({
      ...tt,
      ...r.callbacks
    }));
    vt(() => {
      const v = dt()?.appContext.config.globalProperties.$tours;
      v[r.name] = {
        start: c,
        previousStep: l,
        nextStep: w,
        stop: b,
        skip: d,
        finish: O,
        currentStep: o,
        steps: r.steps,
        customOptions: n,
        customCallbacks: a
      };
    }), Nt(() => {
      n.value.useKeyboardNavigation && window.removeEventListener("keyup", m);
    }), W(() => o.value > -1 && o.value < s.value);
    const u = W(() => o.value === 0), s = W(() => r.steps.length), i = W(() => o.value === r.steps.length - 1);
    W(() => r.steps[o.value]);
    const c = async (f) => {
      n.value.useKeyboardNavigation && window.addEventListener("keyup", m);
      const v = typeof f < "u" ? parseInt(f, 10) : 0;
      let h = r.steps[v];
      const g = () => new Promise((S) => {
        setTimeout(() => {
          a.value.onStart && a.value.onStart(), o.value = v, S();
        }, n.value.startTimeout);
      });
      if (typeof h.before < "u")
        try {
          await h.before("start");
        } catch (S) {
          return Promise.reject(S);
        }
      return await g(), Promise.resolve();
    }, l = async () => {
      let f = o.value - 1;
      const v = () => new Promise((h) => {
        a.value.onPreviousStep && a.value.onPreviousStep(o.value), o.value = f, h();
      });
      if (f > -1) {
        let h = r.steps[f];
        if (typeof h.before < "u")
          try {
            await h.before("previous");
          } catch (g) {
            return Promise.reject(g);
          }
        await v();
      }
      return Promise.resolve();
    }, w = async () => {
      let f = o.value + 1;
      const v = () => new Promise((h) => {
        a.value.onNextStep && a.value.onNextStep(o.value), o.value = f, h();
      });
      if (f < s.value && o.value !== -1) {
        let h = r.steps[f];
        if (typeof h.before < "u")
          try {
            await h.before("next");
          } catch (g) {
            return Promise.reject(g);
          }
        await v();
      }
      return Promise.resolve();
    }, b = () => {
      a.value.onStop && a.value.onStop(), document.body.classList.remove("v-tour--active"), o.value = -1;
    }, d = () => {
      a.value.onSkip && a.value.onSkip(), b();
    }, O = () => {
      a.value.onFinish && a.value.onFinish(), b();
    }, m = (f) => {
      switch (n.value.debug && console.log("[Vue Tour] A keyup event occured:", f), f.keyCode) {
        case je.ARROW_RIGHT:
          x("arrowRight") && w();
          break;
        case je.ARROW_LEFT:
          x("arrowLeft") && l();
          break;
        case je.ESCAPE:
          x("escape") && b();
          break;
      }
    }, x = (f) => {
      const { enabledNavigationKeys: v } = n.value;
      return v?.hasOwnProperty(f) ? v[f] : !0;
    };
    return t({ start: c, previousStep: l, nextStep: w, stop: b, skip: d, finish: O }), (f, v) => (H(), V("div", oo, [
      Te(f.$slots, "default", {
        currentStep: o.value,
        steps: f.steps,
        previousStep: l,
        nextStep: w,
        stop: b,
        skip: d,
        finish: O,
        isFirst: u.value,
        isLast: i.value,
        labels: n.value.labels,
        enabledButtons: n.value.enabledButtons,
        highlight: n.value.highlight,
        debug: n.value.debug
      }, () => [
        f.steps[o.value] ? (H(), Ft(kt, {
          step: f.steps[o.value],
          key: o.value,
          "previous-step": l,
          "next-step": w,
          stop: b,
          skip: d,
          finish: O,
          "is-first": u.value,
          "is-last": i.value,
          labels: {
            buttonPrevious: n.value.labels?.buttonPrevious ?? ne(q).labels.buttonPrevious,
            buttonNext: n.value.labels?.buttonNext ?? ne(q).labels.buttonNext,
            buttonSkip: n.value.labels?.buttonSkip ?? ne(q).labels.buttonSkip,
            buttonStop: n.value.labels?.buttonStop ?? ne(q).labels.buttonStop
          },
          "enabled-buttons": n.value.enabledButtons ?? ne(q).enabledButtons,
          highlight: n.value.highlight ?? !1,
          "stop-on-fail": n.value.stopOnTargetNotFound ?? !1,
          debug: n.value.debug ?? !1,
          ionic: n.value.ionic ?? !1,
          onTargetNotFound: v[0] || (v[0] = (h) => f.$emit("targetNotFound", h))
        }, null, 8, ["step", "is-first", "is-last", "labels", "enabled-buttons", "highlight", "stop-on-fail", "debug", "ionic"])) : J("", !0)
      ])
    ]));
  }
});
function io(e) {
  return {
    ...(dt()?.appContext.config.globalProperties.$tours)[e]
  };
}
const so = {
  install(e, t) {
    e.component("v-tour", no), e.component("v-step", kt), e.config.globalProperties.$tours = {};
  }
};
export {
  tt as DEFAULT_CALLBACKS,
  q as DEFAULT_OPTIONS,
  Ht as DEFAULT_STEP_OPTIONS,
  I as HIGHLIGHT,
  je as KEYS,
  kt as VStep,
  no as VTour,
  so as VueTour,
  io as useTour
};
