(function() {
  const t = /* @__PURE__ */ new WeakMap(), e = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), h = /* @__PURE__ */ new WeakMap(), m = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), p = /* @__PURE__ */ new WeakMap(), g = { attributes: !0, attributeFilter: ["disabled"] }, b = new MutationObserver((_) => {
    for (const u of _) {
      const w = u.target;
      if (w.constructor.formAssociated) {
        const R = w.hasAttribute("disabled");
        w.toggleAttribute("internals-disabled", R), R ? w.setAttribute("aria-disabled", "true") : w.removeAttribute("aria-disabled"), w.formDisabledCallback && w.formDisabledCallback.apply(w, [R]);
      }
    }
  }), V = (_) => {
    n.get(_).forEach((w) => {
      w.remove();
    }), n.set(_, []);
  }, x = (_, u) => {
    const w = document.createElement("input");
    return w.type = "hidden", w.name = _.getAttribute("name"), _.after(w), n.get(u).push(w), w;
  }, F = (_, u) => {
    n.set(u, []);
    const w = _.hasAttribute("disabled");
    _.toggleAttribute("internals-disabled", w), b.observe(_, g);
  }, T = (_, u) => {
    if (u.length) {
      Array.from(u).forEach((R) => R.addEventListener("click", _.focus.bind(_)));
      let w = u[0].id;
      u[0].id || (w = `${u[0].htmlFor}_Label`, u[0].id = w), _.setAttribute("aria-labelledby", w);
    }
  }, M = (_) => {
    const u = Array.from(_.elements).filter((W) => W.validity).map((W) => W.validity.valid), w = Array.from(o.get(_)).filter((W) => W.isConnected).map((W) => i.get(W).validity.valid), R = [...u, ...w].includes(!1);
    _.toggleAttribute("internals-invalid", R), _.toggleAttribute("internals-valid", !R);
  }, L = (_) => {
    M(z(_.target));
  }, P = (_) => {
    M(z(_.target));
  }, k = (_) => {
    const u = _.target, w = o.get(u);
    u.noValidate || w.size && (Array.from(w).reverse().map((te) => i.get(te).reportValidity()).includes(!1) ? (_.stopImmediatePropagation(), _.stopPropagation(), _.preventDefault()) : p.get(u) && p.get(u).call(u, _) === !1 && _.preventDefault());
  }, I = (_) => {
    const u = o.get(_.target);
    u && u.size && u.forEach((w) => {
      w.constructor.formAssociated && w.formResetCallback && w.formResetCallback.apply(w);
    });
  }, O = (_, u, w) => {
    if (u) {
      u.onsubmit && (p.set(u, u.onsubmit.bind(u)), u.onsubmit = null);
      const R = o.get(u);
      if (R)
        R.add(_);
      else {
        const W = /* @__PURE__ */ new Set();
        W.add(_), o.set(u, W), u.addEventListener("submit", k), u.addEventListener("reset", I), u.addEventListener("input", L), u.addEventListener("change", P);
      }
      l.set(u, { ref: _, internals: w }), _.constructor.formAssociated && _.formAssociatedCallback && setTimeout(() => {
        _.formAssociatedCallback.apply(_, [u]);
      }, 0), M(u);
    }
  }, z = (_) => {
    let u = _.parentNode;
    return u && u.tagName !== "FORM" && (u = z(u)), u;
  }, H = (_, u, w = DOMException) => {
    if (!_.constructor.formAssociated)
      throw new w(u);
  }, le = (_, u, w) => {
    const R = o.get(_);
    return R && R.size && R.forEach((W) => {
      i.get(W)[w]() || (u = !1);
    }), u;
  }, ae = (_) => {
    if (_.constructor.formAssociated) {
      const u = i.get(_), { labels: w, form: R } = u;
      T(_, w), O(_, R, u);
    }
  }, re = {
    ariaAtomic: "aria-atomic",
    ariaAutoComplete: "aria-autocomplete",
    ariaBusy: "aria-busy",
    ariaChecked: "aria-checked",
    ariaColCount: "aria-colcount",
    ariaColIndex: "aria-colindex",
    ariaColSpan: "aria-colspan",
    ariaCurrent: "aria-current",
    ariaDisabled: "aria-disabled",
    ariaExpanded: "aria-expanded",
    ariaHasPopup: "aria-haspopup",
    ariaHidden: "aria-hidden",
    ariaKeyShortcuts: "aria-keyshortcuts",
    ariaLabel: "aria-label",
    ariaLevel: "aria-level",
    ariaLive: "aria-live",
    ariaModal: "aria-modal",
    ariaMultiLine: "aria-multiline",
    ariaMultiSelectable: "aria-multiselectable",
    ariaOrientation: "aria-orientation",
    ariaPlaceholder: "aria-placeholder",
    ariaPosInSet: "aria-posinset",
    ariaPressed: "aria-pressed",
    ariaReadOnly: "aria-readonly",
    ariaRelevant: "aria-relevant",
    ariaRequired: "aria-required",
    ariaRoleDescription: "aria-roledescription",
    ariaRowCount: "aria-rowcount",
    ariaRowIndex: "aria-rowindex",
    ariaRowSpan: "aria-rowspan",
    ariaSelected: "aria-selected",
    ariaSetSize: "aria-setsize",
    ariaSort: "aria-sort",
    ariaValueMax: "aria-valuemax",
    ariaValueMin: "aria-valuemin",
    ariaValueNow: "aria-valuenow",
    ariaValueText: "aria-valuetext",
    role: "role"
  }, ye = (_, u) => {
    for (let w in re) {
      u[w] = null;
      let R = null;
      const W = re[w];
      Object.defineProperty(u, w, {
        get() {
          return R;
        },
        set(te) {
          R = te, _.isConnected ? _.setAttribute(W, te) : c.set(_, u);
        }
      });
    }
  };
  class fe {
    constructor() {
      this.badInput = !1, this.customError = !1, this.patternMismatch = !1, this.rangeOverflow = !1, this.rangeUnderflow = !1, this.stepMismatch = !1, this.tooLong = !1, this.tooShort = !1, this.typeMismatch = !1, this.valid = !0, this.valueMissing = !1, Object.seal(this);
    }
  }
  const Se = (_) => (_.badInput = !1, _.customError = !1, _.patternMismatch = !1, _.rangeOverflow = !1, _.rangeUnderflow = !1, _.stepMismatch = !1, _.tooLong = !1, _.tooShort = !1, _.typeMismatch = !1, _.valid = !0, _.valueMissing = !1, _), ve = (_, u, w) => (_.valid = ke(u), Object.keys(u).forEach((R) => _[R] = u[R]), w && M(w), _), ke = (_) => {
    let u = !0;
    for (let w in _)
      w !== "valid" && _[w] !== !1 && (u = !1);
    return u;
  };
  function he(_) {
    _.forEach((u) => {
      const { addedNodes: w, removedNodes: R } = u, W = Array.from(w), te = Array.from(R);
      W.forEach((q) => {
        if (i.has(q) && q.constructor.formAssociated) {
          const G = i.get(q), { form: ne } = G;
          O(q, ne, G), T(q, G.labels);
        }
        if (c.has(q)) {
          const G = c.get(q);
          Object.keys(re).filter((ce) => G[ce] !== null).forEach((ce) => {
            q.setAttribute(re[ce], G[ce]);
          }), c.delete(q);
        }
      }), te.forEach((q) => {
        const G = i.get(q);
        G && n.get(G) && V(G), r.has(q) && r.get(q).disconnect();
      });
    });
  }
  function Re(_) {
    _.forEach((u) => {
      const { removedNodes: w } = u;
      w.forEach((R) => {
        const W = d.get(u.target);
        i.has(R) && ae(R), W.disconnect();
      });
    });
  }
  const Ge = (_) => {
    const u = new MutationObserver(Re);
    u.observe(_, { childList: !0 }), d.set(_, u);
  };
  new MutationObserver(he);
  const Ve = {
    childList: !0,
    subtree: !0
  }, Le = /* @__PURE__ */ new WeakMap();
  class Ae extends Set {
    static get isPolyfilled() {
      return !0;
    }
    constructor(u) {
      if (super(), !u || !u.tagName || u.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      Le.set(this, u);
    }
    add(u) {
      if (!/^--/.test(u) || typeof u != "string")
        throw new DOMException(`Failed to execute 'add' on 'CustomStateSet': The specified value ${u} must start with '--'.`);
      const w = super.add(u), R = Le.get(this);
      return R.toggleAttribute(`state${u}`, !0), R.part && R.part.add(`state${u}`), w;
    }
    clear() {
      for (let [u] of this.entries())
        this.delete(u);
      super.clear();
    }
    delete(u) {
      const w = super.delete(u), R = Le.get(this);
      return R.toggleAttribute(`state${u}`, !1), R.part && R.part.remove(`state${u}`), w;
    }
  }
  class Ce {
    constructor(u) {
      if (!u || !u.tagName || u.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      const w = u.getRootNode(), R = new fe();
      this.states = new Ae(u), t.set(this, u), e.set(this, R), i.set(u, this), ye(u, this), F(u, this), Object.seal(this), ae(u), w instanceof DocumentFragment && Ge(w);
    }
    static get isPolyfilled() {
      return !0;
    }
    checkValidity() {
      const u = t.get(this);
      if (H(u, "Failed to execute 'checkValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const w = e.get(this);
      if (!w.valid) {
        const R = new Event("invalid", {
          bubbles: !1,
          cancelable: !0,
          composed: !1
        });
        u.dispatchEvent(R);
      }
      return w.valid;
    }
    get form() {
      const u = t.get(this);
      H(u, "Failed to read the 'form' property from 'ElementInternals': The target element is not a form-associated custom element.");
      let w;
      return u.constructor.formAssociated === !0 && (w = z(u)), w;
    }
    get labels() {
      const u = t.get(this);
      H(u, "Failed to read the 'labels' property from 'ElementInternals': The target element is not a form-associated custom element.");
      const w = u.getAttribute("id"), R = u.getRootNode();
      return R && w ? R.querySelectorAll(`[for=${w}]`) : [];
    }
    reportValidity() {
      const u = t.get(this);
      if (H(u, "Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const w = this.checkValidity(), R = m.get(this);
      if (R && !u.constructor.formAssociated)
        throw new DOMException("Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element.");
      return !w && R && (u.focus(), R.focus()), w;
    }
    setFormValue(u) {
      const w = t.get(this);
      if (H(w, "Failed to execute 'setFormValue' on 'ElementInternals': The target element is not a form-associated custom element."), V(this), u != null && !(u instanceof FormData)) {
        if (w.getAttribute("name")) {
          const R = x(w, this);
          R.value = u;
        }
      } else
        u != null && u instanceof FormData && u.forEach((R, W) => {
          if (typeof R == "string") {
            const te = x(w, this);
            te.name = W, te.value = R;
          }
        });
      a.set(w, u);
    }
    setValidity(u, w, R) {
      const W = t.get(this);
      if (H(W, "Failed to execute 'setValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !u)
        throw new TypeError("Failed to execute 'setValidity' on 'ElementInternals': 1 argument required, but only 0 present.");
      m.set(this, R);
      const te = e.get(this), q = {};
      for (const ce in u)
        q[ce] = u[ce];
      Object.keys(q).length === 0 && Se(te);
      const G = { ...te, ...q };
      delete G.valid;
      const { valid: ne } = ve(te, G, this.form);
      if (!ne && !w)
        throw new DOMException("Failed to execute 'setValidity' on 'ElementInternals': The second argument should not be empty if one or more flags in the first argument are true.");
      s.set(this, ne ? "" : w), W.toggleAttribute("internals-invalid", !ne), W.toggleAttribute("internals-valid", ne), W.setAttribute("aria-invalid", `${!ne}`);
    }
    get shadowRoot() {
      const u = t.get(this), w = h.get(u);
      return w || null;
    }
    get validationMessage() {
      const u = t.get(this);
      return H(u, "Failed to read the 'validationMessage' property from 'ElementInternals': The target element is not a form-associated custom element."), s.get(this);
    }
    get validity() {
      const u = t.get(this);
      return H(u, "Failed to read the 'validity' property from 'ElementInternals': The target element is not a form-associated custom element."), e.get(this);
    }
    get willValidate() {
      const u = t.get(this);
      return H(u, "Failed to read the 'willValidate' property from 'ElementInternals': The target element is not a form-associated custom element."), !(u.disabled || u.hasAttribute("disabled") || u.hasAttribute("readonly"));
    }
  }
  function Je() {
    if (!window.ElementInternals)
      return !1;
    class _ extends HTMLElement {
      constructor() {
        super(), this.internals = this.attachInternals();
      }
    }
    const u = `element-internals-feature-detection-${Math.random().toString(36).replace(/[^a-z]+/g, "")}`;
    customElements.define(u, _);
    const w = new _();
    return [
      "shadowRoot",
      "form",
      "willValidate",
      "validity",
      "validationMessage",
      "labels",
      "setFormValue",
      "setValidity",
      "checkValidity",
      "reportValidity"
    ].every((R) => R in w.internals);
  }
  if (Je()) {
    if (!window.CustomStateSet) {
      window.CustomStateSet = Ae;
      const _ = HTMLElement.prototype.attachInternals;
      HTMLElement.prototype.attachInternals = function(...u) {
        const w = _.call(this, u);
        return w.states = new Ae(this), w;
      };
    }
  } else {
    let _ = function(...G) {
      const ne = R.apply(this, G), ce = new MutationObserver(he);
      return h.set(this, ne), window.ShadyDOM ? ce.observe(this, Ve) : ce.observe(ne, Ve), r.set(this, ce), ne;
    }, u = function(...G) {
      let ne = te.apply(this, G);
      return le(this, ne, "checkValidity");
    }, w = function(...G) {
      let ne = q.apply(this, G);
      return le(this, ne, "reportValidity");
    };
    var Fn = _, Nn = u, Hn = w;
    window.ElementInternals = Ce, HTMLElement.prototype.attachInternals = function() {
      if (this.tagName.indexOf("-") === -1)
        throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': Unable to attach ElementInternals to non-custom elements.");
      if (i.has(this))
        throw new DOMException("DOMException: Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");
      return new Ce(this);
    };
    const R = Element.prototype.attachShadow;
    Element.prototype.attachShadow = _, new MutationObserver(he).observe(document.documentElement, Ve);
    const te = HTMLFormElement.prototype.checkValidity;
    HTMLFormElement.prototype.checkValidity = u;
    const q = HTMLFormElement.prototype.reportValidity;
    HTMLFormElement.prototype.reportValidity = w, window.CustomStateSet || (window.CustomStateSet = Ae);
  }
})();
function E() {
}
function lt(t) {
  return t();
}
function ht() {
  return /* @__PURE__ */ Object.create(null);
}
function pe(t) {
  t.forEach(lt);
}
function en(t) {
  return typeof t == "function";
}
function tn(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function ie(t, e) {
  return t != t ? e == e : t !== e;
}
function Wn(t) {
  return Object.keys(t).length === 0;
}
function Bn(t, ...e) {
  if (t == null)
    return E;
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const nn = typeof window < "u";
let mt = nn ? () => window.performance.now() : () => Date.now(), sn = nn ? (t) => requestAnimationFrame(t) : E;
const Te = /* @__PURE__ */ new Set();
function ln(t) {
  Te.forEach((e) => {
    e.c(t) || (Te.delete(e), e.f());
  }), Te.size !== 0 && sn(ln);
}
function Zn(t) {
  let e;
  return Te.size === 0 && sn(ln), {
    promise: new Promise((n) => {
      Te.add(e = { c: t, f: n });
    }),
    abort() {
      Te.delete(e);
    }
  };
}
function v(t, e) {
  t.appendChild(e);
}
function C(t, e, n) {
  t.insertBefore(e, n || null);
}
function N(t) {
  t.parentNode.removeChild(t);
}
function rt(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function A(t) {
  return document.createElement(t);
}
function Ee(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function X(t) {
  return document.createTextNode(t);
}
function D() {
  return X(" ");
}
function ot() {
  return X("");
}
function Z(t, e, n, i) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i);
}
function bt(t) {
  return function(e) {
    return e.preventDefault(), t.call(this, e);
  };
}
function f(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function qn(t) {
  return Array.from(t.childNodes);
}
function K(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function ue(t, e, n, i) {
  n === null ? t.style.removeProperty(e) : t.style.setProperty(e, n, i ? "important" : "");
}
function Y(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
function $(t) {
  const e = {};
  for (const n of t)
    e[n.name] = n.value;
  return e;
}
let Ne;
function Ie(t) {
  Ne = t;
}
function Xe() {
  if (!Ne)
    throw new Error("Function called outside component initialization");
  return Ne;
}
function Xn(t) {
  Xe().$$.on_mount.push(t);
}
const xe = [], oe = [], De = [], gt = [], Un = Promise.resolve();
let $e = !1;
function Yn() {
  $e || ($e = !0, Un.then(S));
}
function et(t) {
  De.push(t);
}
const Qe = /* @__PURE__ */ new Set();
let ze = 0;
function S() {
  const t = Ne;
  do {
    for (; ze < xe.length; ) {
      const e = xe[ze];
      ze++, Ie(e), Kn(e.$$);
    }
    for (Ie(null), xe.length = 0, ze = 0; oe.length; )
      oe.pop()();
    for (let e = 0; e < De.length; e += 1) {
      const n = De[e];
      Qe.has(n) || (Qe.add(n), n());
    }
    De.length = 0;
  } while (xe.length);
  for (; gt.length; )
    gt.pop()();
  $e = !1, Qe.clear(), Ie(t);
}
function Kn(t) {
  if (t.fragment !== null) {
    t.update(), pe(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(et);
  }
}
const Gn = /* @__PURE__ */ new Set();
function rn(t, e) {
  t && t.i && (Gn.delete(t), t.i(e));
}
function at(t, e) {
  t.d(1), e.delete(t.key);
}
function ct(t, e, n, i, s, l, r, o, a, c, h, m) {
  let d = t.length, p = l.length, g = d;
  const b = {};
  for (; g--; )
    b[t[g].key] = g;
  const V = [], x = /* @__PURE__ */ new Map(), F = /* @__PURE__ */ new Map();
  for (g = p; g--; ) {
    const P = m(s, l, g), k = n(P);
    let I = r.get(k);
    I ? i && I.p(P, e) : (I = c(k, P), I.c()), x.set(k, V[g] = I), k in b && F.set(k, Math.abs(g - b[k]));
  }
  const T = /* @__PURE__ */ new Set(), M = /* @__PURE__ */ new Set();
  function L(P) {
    rn(P, 1), P.m(o, h), r.set(P.key, P), h = P.first, p--;
  }
  for (; d && p; ) {
    const P = V[p - 1], k = t[d - 1], I = P.key, O = k.key;
    P === k ? (h = P.first, d--, p--) : x.has(O) ? !r.has(I) || T.has(I) ? L(P) : M.has(O) ? d-- : F.get(I) > F.get(O) ? (M.add(I), L(P)) : (T.add(O), d--) : (a(k, r), d--);
  }
  for (; d--; ) {
    const P = t[d];
    x.has(P.key) || a(P, r);
  }
  for (; p; )
    L(V[p - 1]);
  return V;
}
function Jn(t, e, n, i) {
  const { fragment: s, on_mount: l, on_destroy: r, after_update: o } = t.$$;
  s && s.m(e, n), i || et(() => {
    const a = l.map(lt).filter(en);
    r ? r.push(...a) : pe(a), t.$$.on_mount = [];
  }), o.forEach(et);
}
function Qn(t, e) {
  const n = t.$$;
  n.fragment !== null && (pe(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function $n(t, e) {
  t.$$.dirty[0] === -1 && (xe.push(t), Yn(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function ee(t, e, n, i, s, l, r, o = [-1]) {
  const a = Ne;
  Ie(t);
  const c = t.$$ = {
    fragment: null,
    ctx: null,
    props: l,
    update: E,
    not_equal: s,
    bound: ht(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (a ? a.$$.context : [])),
    callbacks: ht(),
    dirty: o,
    skip_bound: !1,
    root: e.target || a.$$.root
  };
  r && r(c.root);
  let h = !1;
  if (c.ctx = n ? n(t, e.props || {}, (m, d, ...p) => {
    const g = p.length ? p[0] : d;
    return c.ctx && s(c.ctx[m], c.ctx[m] = g) && (!c.skip_bound && c.bound[m] && c.bound[m](g), h && $n(t, m)), d;
  }) : [], c.update(), h = !0, pe(c.before_update), c.fragment = i ? i(c.ctx) : !1, e.target) {
    if (e.hydrate) {
      const m = qn(e.target);
      c.fragment && c.fragment.l(m), m.forEach(N);
    } else
      c.fragment && c.fragment.c();
    e.intro && rn(t.$$.fragment), Jn(t, e.target, e.anchor, e.customElement), S();
  }
  Ie(a);
}
let Q;
typeof HTMLElement == "function" && (Q = class extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const { on_mount: t } = this.$$;
    this.$$.on_disconnect = t.map(lt).filter(en);
    for (const e in this.$$.slotted)
      this.appendChild(this.$$.slotted[e]);
  }
  attributeChangedCallback(t, e, n) {
    this[t] = n;
  }
  disconnectedCallback() {
    pe(this.$$.on_disconnect);
  }
  $destroy() {
    Qn(this, 1), this.$destroy = E;
  }
  $on(t, e) {
    const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return n.push(e), () => {
      const i = n.indexOf(e);
      i !== -1 && n.splice(i, 1);
    };
  }
  $set(t) {
    this.$$set && !Wn(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
});
const { base: tt = "", query: nt = "" } = window.PRIME_CONFIG ?? {}, ut = document.createElement("link");
ut.rel = "stylesheet";
ut.href = `${tt ?? ""}/prime.css${nt}`;
const se = () => {
  const t = Xe();
  Xn(() => {
    const e = t.style.getPropertyValue("display");
    t.style.setProperty("display", "none");
    const n = ut.cloneNode();
    n.addEventListener("load", () => {
      e ? t.style.setProperty("display", e) : t.style.removeProperty("display");
    }), t.shadowRoot.prepend(n);
  });
}, ei = async () => {
  const t = new FontFace("icons", tt ? `url(${tt}/icons.woff2${nt})` : `url(icons.woff2${nt})`);
  await t.load(), document.fonts.add(t);
}, be = (t, e, n) => t.dispatchEvent(new CustomEvent(e, {
  composed: !0,
  bubbles: !0,
  detail: n
}));
customElements.get("v-badge") ? console.warn("WARNING: Multiple instances of PRIME being imported.") : (ei().catch((t) => console.error(t)), Promise.resolve().then(() => ii), Promise.resolve().then(() => ri), Promise.resolve().then(() => fi), Promise.resolve().then(() => mi), Promise.resolve().then(() => pi), Promise.resolve().then(() => yi), Promise.resolve().then(() => Si), Promise.resolve().then(() => Vi), Promise.resolve().then(() => Ii), Promise.resolve().then(() => Hi), Promise.resolve().then(() => Zi), Promise.resolve().then(() => Ui), Promise.resolve().then(() => Gi), Promise.resolve().then(() => $i), Promise.resolve().then(() => ts), Promise.resolve().then(() => ss), Promise.resolve().then(() => os), Promise.resolve().then(() => us), Promise.resolve().then(() => Ds), Promise.resolve().then(() => Zs));
var on = { exports: {} };
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
(function(t) {
  (function() {
    var e = {}.hasOwnProperty;
    function n() {
      for (var i = [], s = 0; s < arguments.length; s++) {
        var l = arguments[s];
        if (!!l) {
          var r = typeof l;
          if (r === "string" || r === "number")
            i.push(l);
          else if (Array.isArray(l)) {
            if (l.length) {
              var o = n.apply(null, l);
              o && i.push(o);
            }
          } else if (r === "object")
            if (l.toString === Object.prototype.toString)
              for (var a in l)
                e.call(l, a) && l[a] && i.push(a);
            else
              i.push(l.toString());
        }
      }
      return i.join(" ");
    }
    t.exports ? (n.default = n, t.exports = n) : window.classNames = n;
  })();
})(on);
const j = on.exports;
function ti(t) {
  let e, n, i;
  return {
    c() {
      e = A("small"), n = X(t[0]), this.c = E, f(e, "class", i = j("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": t[1] === "green",
        "text-orange-900 bg-orange-200": t[1] === "orange",
        "text-red-900 bg-red-200": t[1] === "red",
        "text-gray-800 bg-gray-200": t[1] === "gray"
      }));
    },
    m(s, l) {
      C(s, e, l), v(e, n);
    },
    p(s, [l]) {
      l & 1 && K(n, s[0]), l & 2 && i !== (i = j("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": s[1] === "green",
        "text-orange-900 bg-orange-200": s[1] === "orange",
        "text-red-900 bg-red-200": s[1] === "red",
        "text-gray-800 bg-gray-200": s[1] === "gray"
      })) && f(e, "class", i);
    },
    i: E,
    o: E,
    d(s) {
      s && N(e);
    }
  };
}
function ni(t, e, n) {
  let { label: i = "" } = e, { variant: s = "gray" } = e;
  return se(), t.$$set = (l) => {
    "label" in l && n(0, i = l.label), "variant" in l && n(1, s = l.variant);
  }, [i, s];
}
class an extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ni, ti, ie, { label: 0, variant: 1 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), S()));
  }
  static get observedAttributes() {
    return ["label", "variant"];
  }
  get label() {
    return this.$$.ctx[0];
  }
  set label(e) {
    this.$$set({ label: e }), S();
  }
  get variant() {
    return this.$$.ctx[1];
  }
  set variant(e) {
    this.$$set({ variant: e }), S();
  }
}
customElements.define("v-badge", an);
const ii = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: an
}, Symbol.toStringTag, { value: "Module" }));
function pt(t, e, n) {
  const i = t.slice();
  return i[2] = e[n], i[4] = n, i;
}
function _t(t) {
  let e;
  return {
    c() {
      e = A("div"), e.innerHTML = `<div class="w-px h-[60%] border-l border-black -rotate-[30deg] -mt-px"></div> 
        <div class="w-px h-[60%] border-l border-black rotate-[30deg] -mt-0.5"></div> 
      `;
    },
    m(n, i) {
      C(n, e, i);
    },
    d(n) {
      n && N(e);
    }
  };
}
function wt(t, e) {
  let n, i = e[2] + "", s, l, r, o = e[4] !== e[0].length - 1 && _t();
  return {
    key: t,
    first: null,
    c() {
      n = A("small"), s = X(i), l = D(), o && o.c(), r = ot(), f(n, "class", "py1"), this.first = n;
    },
    m(a, c) {
      C(a, n, c), v(n, s), C(a, l, c), o && o.m(a, c), C(a, r, c);
    },
    p(a, c) {
      e = a, c & 1 && i !== (i = e[2] + "") && K(s, i), e[4] !== e[0].length - 1 ? o || (o = _t(), o.c(), o.m(r.parentNode, r)) : o && (o.d(1), o = null);
    },
    d(a) {
      a && N(n), a && N(l), o && o.d(a), a && N(r);
    }
  };
}
function si(t) {
  let e, n = [], i = /* @__PURE__ */ new Map(), s = t[0];
  const l = (r) => r[2];
  for (let r = 0; r < s.length; r += 1) {
    let o = pt(t, s, r), a = l(o);
    i.set(a, n[r] = wt(a, o));
  }
  return {
    c() {
      e = A("div");
      for (let r = 0; r < n.length; r += 1)
        n[r].c();
      this.c = E, f(e, "class", "inline-flex gap-3 px-4 border border-black rounded-full");
    },
    m(r, o) {
      C(r, e, o);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
    },
    p(r, [o]) {
      o & 1 && (s = r[0], n = ct(n, o, l, 1, r, s, i, e, at, wt, null, pt));
    },
    i: E,
    o: E,
    d(r) {
      r && N(e);
      for (let o = 0; o < n.length; o += 1)
        n[o].d();
    }
  };
}
function li(t, e, n) {
  let { crumbs: i = "" } = e;
  se();
  let s;
  return t.$$set = (l) => {
    "crumbs" in l && n(1, i = l.crumbs);
  }, t.$$.update = () => {
    t.$$.dirty & 2 && n(0, s = i.split(",").map((l) => l.trim()));
  }, [s, i];
}
class cn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, li, si, ie, { crumbs: 1 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), S()));
  }
  static get observedAttributes() {
    return ["crumbs"];
  }
  get crumbs() {
    return this.$$.ctx[1];
  }
  set crumbs(e) {
    this.$$set({ crumbs: e }), S();
  }
}
customElements.define("v-breadcrumbs", cn);
const ri = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cn
}, Symbol.toStringTag, { value: "Module" }));
function yt(t) {
  let e, n;
  return {
    c() {
      e = A("i"), f(e, "aria-hidden", ""), f(e, "class", n = "icon-" + t[4] + " text-base");
    },
    m(i, s) {
      C(i, e, s);
    },
    p(i, s) {
      s & 16 && n !== (n = "icon-" + i[4] + " text-base") && f(e, "class", n);
    },
    d(i) {
      i && N(e);
    }
  };
}
function oi(t) {
  let e, n, i, s, l, r, o = t[4] && yt(t);
  return {
    c() {
      e = A("button"), o && o.c(), n = D(), i = X(t[3]), this.c = E, f(e, "type", t[1]), f(e, "class", s = j("flex items-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": t[0] === "true",
        "bg-white border-black": t[2] === "primary",
        "bg-red/90 text-white border-red/90": t[2] === "danger",
        "bg-green/90 border-green/90 text-white": t[2] === "success",
        "bg-white border-red/90 text-red/90": t[2] === "outline-danger"
      }));
    },
    m(a, c) {
      C(a, e, c), o && o.m(e, null), v(e, n), v(e, i), l || (r = Z(e, "click", t[5]), l = !0);
    },
    p(a, [c]) {
      a[4] ? o ? o.p(a, c) : (o = yt(a), o.c(), o.m(e, n)) : o && (o.d(1), o = null), c & 8 && K(i, a[3]), c & 2 && f(e, "type", a[1]), c & 5 && s !== (s = j("flex items-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": a[0] === "true",
        "bg-white border-black": a[2] === "primary",
        "bg-red/90 text-white border-red/90": a[2] === "danger",
        "bg-green/90 border-green/90 text-white": a[2] === "success",
        "bg-white border-red/90 text-red/90": a[2] === "outline-danger"
      })) && f(e, "class", s);
    },
    i: E,
    o: E,
    d(a) {
      a && N(e), o && o.d(), l = !1, r();
    }
  };
}
function ai(t, e, n) {
  let { disabled: i = "false" } = e, { type: s = "button" } = e, { variant: l = "primary" } = e, { label: r = "" } = e, { icon: o = "" } = e;
  se();
  const c = Xe().attachInternals(), h = () => {
    const { form: m } = c;
    m?.requestSubmit ? m.requestSubmit() : m?.submit();
  };
  return t.$$set = (m) => {
    "disabled" in m && n(0, i = m.disabled), "type" in m && n(1, s = m.type), "variant" in m && n(2, l = m.variant), "label" in m && n(3, r = m.label), "icon" in m && n(4, o = m.icon);
  }, [i, s, l, r, o, h];
}
class ci extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ai, oi, ie, {
      disabled: 0,
      type: 1,
      variant: 2,
      label: 3,
      icon: 4
    }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), S()));
  }
  static get observedAttributes() {
    return ["disabled", "type", "variant", "label", "icon"];
  }
  get disabled() {
    return this.$$.ctx[0];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), S();
  }
  get type() {
    return this.$$.ctx[1];
  }
  set type(e) {
    this.$$set({ type: e }), S();
  }
  get variant() {
    return this.$$.ctx[2];
  }
  set variant(e) {
    this.$$set({ variant: e }), S();
  }
  get label() {
    return this.$$.ctx[3];
  }
  set label(e) {
    this.$$set({ label: e }), S();
  }
  get icon() {
    return this.$$.ctx[4];
  }
  set icon(e) {
    this.$$set({ icon: e }), S();
  }
}
customElements.define("v-button-internal", ci);
class ui extends customElements.get("v-button-internal") {
  static formAssociated = !0;
}
customElements.define("v-button", ui);
const fi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function vt(t) {
  let e, n;
  return {
    c() {
      e = A("h2"), n = X(t[1]), f(e, "class", "text-sm");
    },
    m(i, s) {
      C(i, e, s), v(e, n);
    },
    p(i, s) {
      s & 2 && K(n, i[1]);
    },
    d(i) {
      i && N(e);
    }
  };
}
function di(t) {
  let e, n, i, s, l, r, o, a, c, h, m, d, p, g, b, V, x, F, T = t[1] && vt(t);
  return {
    c() {
      e = A("div"), n = A("div"), i = A("div"), T && T.c(), s = D(), l = A("slot"), r = D(), o = A("div"), a = A("slot"), c = D(), h = Ee("svg"), m = Ee("polyline"), p = D(), g = A("div"), b = A("slot"), this.c = E, f(l, "name", "title"), f(i, "class", "flex items-center gap-2"), f(a, "name", "header"), f(m, "points", "6 9 12 15 18 9"), f(h, "class", d = j("transition-transform duration-200", {
        "rotate-0": !t[0],
        "rotate-180": t[0]
      })), f(h, "width", "24"), f(h, "height", "24"), f(h, "viewBox", "0 0 24 24"), f(h, "stroke", "currentColor"), f(h, "stroke-linejoin", "round"), f(h, "stroke-linecap", "round"), f(h, "fill", "none"), f(o, "class", "h-full flex items-center gap-3"), f(n, "class", "w-full py-1.5 px-4 flex items-center justify-between border text-black border-black bg-white cursor-pointer"), f(g, "class", V = j("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !t[0],
        "max-h-fit": t[0]
      })), f(e, "class", "relative w-full overflow-hidden");
    },
    m(M, L) {
      C(M, e, L), v(e, n), v(n, i), T && T.m(i, null), v(i, s), v(i, l), v(n, r), v(n, o), v(o, a), v(o, c), v(o, h), v(h, m), v(e, p), v(e, g), v(g, b), t[4](e), x || (F = Z(n, "click", t[3]), x = !0);
    },
    p(M, [L]) {
      M[1] ? T ? T.p(M, L) : (T = vt(M), T.c(), T.m(i, s)) : T && (T.d(1), T = null), L & 1 && d !== (d = j("transition-transform duration-200", {
        "rotate-0": !M[0],
        "rotate-180": M[0]
      })) && f(h, "class", d), L & 1 && V !== (V = j("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !M[0],
        "max-h-fit": M[0]
      })) && f(g, "class", V);
    },
    i: E,
    o: E,
    d(M) {
      M && N(e), T && T.d(), t[4](null), x = !1, F();
    }
  };
}
function hi(t, e, n) {
  let { title: i = "" } = e, { open: s = !1 } = e, l;
  se();
  const r = (a) => {
    a.target.getAttribute("slot") !== "header" && (n(0, s = !s), be(l, "toggle", { open: s }));
  };
  function o(a) {
    oe[a ? "unshift" : "push"](() => {
      l = a, n(2, l);
    });
  }
  return t.$$set = (a) => {
    "title" in a && n(1, i = a.title), "open" in a && n(0, s = a.open);
  }, [s, i, l, r, o];
}
class un extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, hi, di, ie, { title: 1, open: 0 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), S()));
  }
  static get observedAttributes() {
    return ["title", "open"];
  }
  get title() {
    return this.$$.ctx[1];
  }
  set title(e) {
    this.$$set({ title: e }), S();
  }
  get open() {
    return this.$$.ctx[0];
  }
  set open(e) {
    this.$$set({ open: e }), S();
  }
}
customElements.define("v-collapse", un);
const mi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: un
}, Symbol.toStringTag, { value: "Module" }));
function bi(t) {
  let e, n, i, s, l, r, o, a;
  return {
    c() {
      e = A("div"), n = A("div"), n.innerHTML = '<slot name="target"></slot>', i = D(), s = A("div"), l = A("slot"), this.c = E, f(n, "class", "inline-block"), f(l, "name", "content"), f(s, "class", r = j("absolute z-10", {
        "left-0": t[1],
        "right-0": t[1],
        "overflow-hidden": t[1],
        invisible: !t[0]
      })), f(e, "class", "relative inline-block");
    },
    m(c, h) {
      C(c, e, h), v(e, n), v(e, i), v(e, s), v(s, l), t[4](e), o || (a = Z(n, "click", t[3]), o = !0);
    },
    p(c, [h]) {
      h & 3 && r !== (r = j("absolute z-10", {
        "left-0": c[1],
        "right-0": c[1],
        "overflow-hidden": c[1],
        invisible: !c[0]
      })) && f(s, "class", r);
    },
    i: E,
    o: E,
    d(c) {
      c && N(e), t[4](null), o = !1, a();
    }
  };
}
function gi(t, e, n) {
  let { open: i = null } = e, { match: s = null } = e, l;
  se();
  const r = () => {
    n(0, i = !i), be(l, "toggle", { open: i });
  };
  function o(a) {
    oe[a ? "unshift" : "push"](() => {
      l = a, n(2, l);
    });
  }
  return t.$$set = (a) => {
    "open" in a && n(0, i = a.open), "match" in a && n(1, s = a.match);
  }, t.$$.update = () => {
    t.$$.dirty & 2 && n(1, s = s === ""), t.$$.dirty & 1 && n(0, i = i === "" || i);
  }, [i, s, l, r, o];
}
class fn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, gi, bi, ie, { open: 0, match: 1 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), S()));
  }
  static get observedAttributes() {
    return ["open", "match"];
  }
  get open() {
    return this.$$.ctx[0];
  }
  set open(e) {
    this.$$set({ open: e }), S();
  }
  get match() {
    return this.$$.ctx[1];
  }
  set match(e) {
    this.$$set({ match: e }), S();
  }
}
customElements.define("v-dropdown", fn);
const pi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fn
}, Symbol.toStringTag, { value: "Module" }));
function _i(t) {
  let e, n;
  return {
    c() {
      e = A("i"), this.c = E, f(e, "aria-hidden", ""), f(e, "class", n = "icon-" + t[0] + " text-" + t[1]);
    },
    m(i, s) {
      C(i, e, s);
    },
    p(i, [s]) {
      s & 3 && n !== (n = "icon-" + i[0] + " text-" + i[1]) && f(e, "class", n);
    },
    i: E,
    o: E,
    d(i) {
      i && N(e);
    }
  };
}
function wi(t, e, n) {
  let { name: i = "" } = e, { size: s = "base" } = e;
  return se(), t.$$set = (l) => {
    "name" in l && n(0, i = l.name), "size" in l && n(1, s = l.size);
  }, [i, s];
}
class dn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, wi, _i, ie, { name: 0, size: 1 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), S()));
  }
  static get observedAttributes() {
    return ["name", "size"];
  }
  get name() {
    return this.$$.ctx[0];
  }
  set name(e) {
    this.$$set({ name: e }), S();
  }
  get size() {
    return this.$$.ctx[1];
  }
  set size(e) {
    this.$$set({ size: e }), S();
  }
}
customElements.define("v-icon", dn);
const yi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dn
}, Symbol.toStringTag, { value: "Module" }));
function kt(t) {
  let e, n, i;
  return {
    c() {
      e = A("p"), n = X(t[3]), f(e, "class", i = j("text-xs", {
        "inline whitespace-nowrap": t[5] === "left"
      }));
    },
    m(s, l) {
      C(s, e, l), v(e, n);
    },
    p(s, l) {
      l & 8 && K(n, s[3]), l & 32 && i !== (i = j("text-xs", {
        "inline whitespace-nowrap": s[5] === "left"
      })) && f(e, "class", i);
    },
    d(s) {
      s && N(e);
    }
  };
}
function Et(t) {
  let e, n, i, s, l, r, o, a;
  return {
    c() {
      e = A("div"), n = A("button"), s = D(), l = A("button"), f(n, "aria-label", i = "Increment up by " + t[9]), f(n, "class", "icon-chevron-down rotate-180 text-[15px]"), f(l, "aria-label", r = "Increment down by " + t[9]), f(l, "class", "icon-chevron-down text-[15px]"), f(e, "class", "absolute right-0.5 bottom-0 cursor-pointer select-none flex flex-col");
    },
    m(c, h) {
      C(c, e, h), v(e, n), v(e, s), v(e, l), o || (a = [
        Z(n, "click", t[15]),
        Z(l, "click", t[16])
      ], o = !0);
    },
    p(c, h) {
      h & 512 && i !== (i = "Increment up by " + c[9]) && f(n, "aria-label", i), h & 512 && r !== (r = "Increment down by " + c[9]) && f(l, "aria-label", r);
    },
    d(c) {
      c && N(e), o = !1, pe(a);
    }
  };
}
function vi(t) {
  let e, n, i, s, l, r, o, a = t[3] && kt(t), c = t[1] === "number" && Et(t);
  return {
    c() {
      e = A("label"), a && a.c(), n = D(), i = A("input"), s = D(), c && c.c(), this.c = E, f(i, "type", t[1]), f(i, "placeholder", t[2]), f(i, "name", t[4]), i.value = t[0], i.readOnly = t[8], f(i, "class", "w-full py-1.5 px-2.5 border text-xs border-black bg-white outline-none appearance-none"), f(e, "class", l = j("relative flex gap-1 max-w-[14rem]", {
        "flex-col": t[5] === "top",
        "items-center": t[5] === "left"
      }));
    },
    m(h, m) {
      C(h, e, m), a && a.m(e, null), v(e, n), v(e, i), t[14](i), v(e, s), c && c.m(e, null), t[17](e), r || (o = Z(i, "input", t[10]), r = !0);
    },
    p(h, [m]) {
      h[3] ? a ? a.p(h, m) : (a = kt(h), a.c(), a.m(e, n)) : a && (a.d(1), a = null), m & 2 && f(i, "type", h[1]), m & 4 && f(i, "placeholder", h[2]), m & 16 && f(i, "name", h[4]), m & 1 && i.value !== h[0] && (i.value = h[0]), m & 256 && (i.readOnly = h[8]), h[1] === "number" ? c ? c.p(h, m) : (c = Et(h), c.c(), c.m(e, null)) : c && (c.d(1), c = null), m & 32 && l !== (l = j("relative flex gap-1 max-w-[14rem]", {
        "flex-col": h[5] === "top",
        "items-center": h[5] === "left"
      })) && f(e, "class", l);
    },
    i: E,
    o: E,
    d(h) {
      h && N(e), a && a.d(), t[14](null), c && c.d(), t[17](null), r = !1, o();
    }
  };
}
function ki(t, e, n) {
  const s = Xe().attachInternals();
  let { type: l = "text" } = e, { placeholder: r = "" } = e, { readonly: o = "false" } = e, { label: a = "" } = e, { value: c = "" } = e, { step: h = "1" } = e, { name: m = "" } = e, { labelposition: d = "top" } = e, p, g, b, V;
  se();
  const x = (k) => {
    k.preventDefault(), k.stopImmediatePropagation(), n(0, c = g.value), s.setFormValue(c), be(p, "input", { value: c });
  }, F = (k) => {
    const I = Number.parseFloat(c || "0");
    n(0, c = n(7, g.value = String(I + V * k), g)), s.setFormValue(c), be(p, "input", { value: c });
  };
  function T(k) {
    oe[k ? "unshift" : "push"](() => {
      g = k, n(7, g);
    });
  }
  const M = () => F(1), L = () => F(-1);
  function P(k) {
    oe[k ? "unshift" : "push"](() => {
      p = k, n(6, p);
    });
  }
  return t.$$set = (k) => {
    "type" in k && n(1, l = k.type), "placeholder" in k && n(2, r = k.placeholder), "readonly" in k && n(12, o = k.readonly), "label" in k && n(3, a = k.label), "value" in k && n(0, c = k.value), "step" in k && n(13, h = k.step), "name" in k && n(4, m = k.name), "labelposition" in k && n(5, d = k.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 4096 && n(8, b = o === "readonly" || o === ""), t.$$.dirty & 8192 && n(9, V = Number.parseFloat(h));
  }, [
    c,
    l,
    r,
    a,
    m,
    d,
    p,
    g,
    b,
    V,
    x,
    F,
    o,
    h,
    T,
    M,
    L,
    P
  ];
}
class Ei extends Q {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}</style>", ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ki, vi, ie, {
      type: 1,
      placeholder: 2,
      readonly: 12,
      label: 3,
      value: 0,
      step: 13,
      name: 4,
      labelposition: 5
    }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), S()));
  }
  static get observedAttributes() {
    return [
      "type",
      "placeholder",
      "readonly",
      "label",
      "value",
      "step",
      "name",
      "labelposition"
    ];
  }
  get type() {
    return this.$$.ctx[1];
  }
  set type(e) {
    this.$$set({ type: e }), S();
  }
  get placeholder() {
    return this.$$.ctx[2];
  }
  set placeholder(e) {
    this.$$set({ placeholder: e }), S();
  }
  get readonly() {
    return this.$$.ctx[12];
  }
  set readonly(e) {
    this.$$set({ readonly: e }), S();
  }
  get label() {
    return this.$$.ctx[3];
  }
  set label(e) {
    this.$$set({ label: e }), S();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), S();
  }
  get step() {
    return this.$$.ctx[13];
  }
  set step(e) {
    this.$$set({ step: e }), S();
  }
  get name() {
    return this.$$.ctx[4];
  }
  set name(e) {
    this.$$set({ name: e }), S();
  }
  get labelposition() {
    return this.$$.ctx[5];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), S();
  }
}
customElements.define("v-input-internal", Ei);
class Mi extends customElements.get("v-input-internal") {
  static formAssociated = !0;
}
customElements.define("v-input", Mi);
const Si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function Ai(t) {
  let e;
  return {
    c() {
      e = Ee("path"), f(e, "d", "M6.33 3.66667H7.66666V5H6.33333V3.66667ZM6.33 6.33333H7.66666V10.3333H6.33333V6.33333ZM7 0.333334C3.31999 0.333334 0.333328 3.32 0.333328 7C0.333328 10.68 3.31999 13.6667 7 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.32 10.68 0.333334 7 0.333334ZM7 12.3333C4.06 12.3333 1.66666 9.94 1.66666 7C1.66666 4.06 4.06 1.66667 7 1.66667C9.93999 1.66667 12.3333 4.06 12.3333 7C12.3333 9.94 9.93999 12.3333 7 12.3333Z"), f(e, "fill", "#045681");
    },
    m(n, i) {
      C(n, e, i);
    },
    d(n) {
      n && N(e);
    }
  };
}
function Ci(t) {
  let e;
  return {
    c() {
      e = Ee("path"), f(e, "d", "M4 7.78L1.22 5L0.273331 5.94L4 9.66667L12 1.66667L11.06 0.726665L4 7.78Z"), f(e, "fill", "#397F48");
    },
    m(n, i) {
      C(n, e, i);
    },
    d(n) {
      n && N(e);
    }
  };
}
function Pi(t) {
  let e;
  return {
    c() {
      e = Ee("path"), f(e, "d", "M8 2.99333L13.02 11.6667H2.98L8 2.99333ZM8 0.333328L0.666672 13H15.3333L8 0.333328ZM8.66667 9.66666H7.33334V11H8.66667V9.66666ZM8.66667 5.66666H7.33334V8.33333H8.66667V5.66666Z"), f(e, "fill", "#FF9900");
    },
    m(n, i) {
      C(n, e, i);
    },
    d(n) {
      n && N(e);
    }
  };
}
function Ti(t) {
  let e;
  return {
    c() {
      e = Ee("path"), f(e, "d", "M6.33 9H7.66666V10.3333H6.33333V9ZM6.33 3.66666H7.66666V7.66666H6.33333V3.66666ZM6.99333 0.333328C3.31333 0.333328 0.333328 3.31999 0.333328 7C0.333328 10.68 3.31333 13.6667 6.99333 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.31999 10.68 0.333328 6.99333 0.333328ZM7 12.3333C4.05333 12.3333 1.66666 9.94666 1.66666 7C1.66666 4.05333 4.05333 1.66666 7 1.66666C9.94666 1.66666 12.3333 4.05333 12.3333 7C12.3333 9.94666 9.94666 12.3333 7 12.3333Z"), f(e, "fill", "#BE3026");
    },
    m(n, i) {
      C(n, e, i);
    },
    d(n) {
      n && N(e);
    }
  };
}
function Mt(t) {
  let e, n;
  return {
    c() {
      e = A("p"), n = X(t[1]), f(e, "class", "text-xs");
    },
    m(i, s) {
      C(i, e, s), v(e, n);
    },
    p(i, s) {
      s & 2 && K(n, i[1]);
    },
    d(i) {
      i && N(e);
    }
  };
}
function Oi(t) {
  let e, n, i, s, l, r, o, a, c;
  function h(g, b) {
    if (g[2] === "error")
      return Ti;
    if (g[2] === "warning")
      return Pi;
    if (g[2] === "success")
      return Ci;
    if (g[2] === "info")
      return Ai;
  }
  let m = h(t), d = m && m(t), p = t[1] && Mt(t);
  return {
    c() {
      e = A("div"), n = A("div"), i = Ee("svg"), d && d.c(), s = D(), l = A("figure"), r = A("figcaption"), o = X(t[0]), a = D(), p && p.c(), this.c = E, f(i, "width", "14"), f(i, "height", "14"), f(i, "viewBox", "0 0 15 15"), f(i, "fill", "none"), f(i, "xmlns", "http://www.w3.org/2000/svg"), f(n, "class", "mt-1"), f(r, "class", "text-sm"), f(e, "class", c = j("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": t[3] === "gray",
        "bg-white": t[3] === "white",
        "border-red/90": t[2] === "error",
        "border-orange/90": t[2] === "warning",
        "border-green/90": t[2] === "success",
        "border-blue/90": t[2] === "info"
      }));
    },
    m(g, b) {
      C(g, e, b), v(e, n), v(n, i), d && d.m(i, null), v(e, s), v(e, l), v(l, r), v(r, o), v(l, a), p && p.m(l, null);
    },
    p(g, [b]) {
      m !== (m = h(g)) && (d && d.d(1), d = m && m(g), d && (d.c(), d.m(i, null))), b & 1 && K(o, g[0]), g[1] ? p ? p.p(g, b) : (p = Mt(g), p.c(), p.m(l, null)) : p && (p.d(1), p = null), b & 12 && c !== (c = j("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": g[3] === "gray",
        "bg-white": g[3] === "white",
        "border-red/90": g[2] === "error",
        "border-orange/90": g[2] === "warning",
        "border-green/90": g[2] === "success",
        "border-blue/90": g[2] === "info"
      })) && f(e, "class", c);
    },
    i: E,
    o: E,
    d(g) {
      g && N(e), d && d.d(), p && p.d();
    }
  };
}
function Ri(t, e, n) {
  let { title: i = "" } = e, { message: s = "" } = e, { variant: l = "info" } = e, { background: r = "gray" } = e;
  return se(), t.$$set = (o) => {
    "title" in o && n(0, i = o.title), "message" in o && n(1, s = o.message), "variant" in o && n(2, l = o.variant), "background" in o && n(3, r = o.background);
  }, [i, s, l, r];
}
class hn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Ri, Oi, ie, {
      title: 0,
      message: 1,
      variant: 2,
      background: 3
    }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), S()));
  }
  static get observedAttributes() {
    return ["title", "message", "variant", "background"];
  }
  get title() {
    return this.$$.ctx[0];
  }
  set title(e) {
    this.$$set({ title: e }), S();
  }
  get message() {
    return this.$$.ctx[1];
  }
  set message(e) {
    this.$$set({ message: e }), S();
  }
  get variant() {
    return this.$$.ctx[2];
  }
  set variant(e) {
    this.$$set({ variant: e }), S();
  }
  get background() {
    return this.$$.ctx[3];
  }
  set background(e) {
    this.$$set({ background: e }), S();
  }
}
customElements.define("v-notify", hn);
const Vi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hn
}, Symbol.toStringTag, { value: "Module" }));
function St(t, e, n) {
  const i = t.slice();
  return i[9] = e[n], i;
}
function At(t) {
  let e, n, i;
  return {
    c() {
      e = A("p"), n = X(t[1]), f(e, "class", i = j("text-xs", {
        "pb-1": t[2] === "top",
        inline: t[2] === "left"
      }));
    },
    m(s, l) {
      C(s, e, l), v(e, n);
    },
    p(s, l) {
      l & 2 && K(n, s[1]), l & 4 && i !== (i = j("text-xs", {
        "pb-1": s[2] === "top",
        inline: s[2] === "left"
      })) && f(e, "class", i);
    },
    d(s) {
      s && N(e);
    }
  };
}
function Ct(t) {
  let e, n = t[9] + "", i, s, l, r, o;
  function a() {
    return t[8](t[9]);
  }
  return {
    c() {
      e = A("button"), i = X(n), s = D(), f(e, "class", l = j("border-y border-l last:border-r border-black px-2 py-1 text-sm", {
        "bg-white": t[9] !== t[0],
        "bg-black text-white": t[9] === t[0]
      }));
    },
    m(c, h) {
      C(c, e, h), v(e, i), v(e, s), t[7](e), r || (o = Z(e, "click", a), r = !0);
    },
    p(c, h) {
      t = c, h & 16 && n !== (n = t[9] + "") && K(i, n), h & 17 && l !== (l = j("border-y border-l last:border-r border-black px-2 py-1 text-sm", {
        "bg-white": t[9] !== t[0],
        "bg-black text-white": t[9] === t[0]
      })) && f(e, "class", l);
    },
    d(c) {
      c && N(e), t[7](null), r = !1, o();
    }
  };
}
function Li(t) {
  let e, n, i = t[1] && At(t), s = t[4], l = [];
  for (let r = 0; r < s.length; r += 1)
    l[r] = Ct(St(t, s, r));
  return {
    c() {
      e = A("label"), i && i.c(), n = D();
      for (let r = 0; r < l.length; r += 1)
        l[r].c();
      this.c = E;
    },
    m(r, o) {
      C(r, e, o), i && i.m(e, null), v(e, n);
      for (let a = 0; a < l.length; a += 1)
        l[a].m(e, null);
    },
    p(r, [o]) {
      if (r[1] ? i ? i.p(r, o) : (i = At(r), i.c(), i.m(e, n)) : i && (i.d(1), i = null), o & 57) {
        s = r[4];
        let a;
        for (a = 0; a < s.length; a += 1) {
          const c = St(r, s, a);
          l[a] ? l[a].p(c, o) : (l[a] = Ct(c), l[a].c(), l[a].m(e, null));
        }
        for (; a < l.length; a += 1)
          l[a].d(1);
        l.length = s.length;
      }
    },
    i: E,
    o: E,
    d(r) {
      r && N(e), i && i.d(), rt(l, r);
    }
  };
}
function xi(t, e, n) {
  let { label: i = "" } = e, { options: s = "" } = e, { selected: l = "" } = e, { labelposition: r = "top" } = e;
  se();
  let o, a;
  const c = (d) => {
    n(0, l = d), be(o, "input", { value: d });
  };
  function h(d) {
    oe[d ? "unshift" : "push"](() => {
      o = d, n(3, o);
    });
  }
  const m = (d) => c(d);
  return t.$$set = (d) => {
    "label" in d && n(1, i = d.label), "options" in d && n(6, s = d.options), "selected" in d && n(0, l = d.selected), "labelposition" in d && n(2, r = d.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 64 && n(4, a = s.split(",").map((d) => d.trim()));
  }, [
    l,
    i,
    r,
    o,
    a,
    c,
    s,
    h,
    m
  ];
}
class mn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, xi, Li, ie, {
      label: 1,
      options: 6,
      selected: 0,
      labelposition: 2
    }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), S()));
  }
  static get observedAttributes() {
    return ["label", "options", "selected", "labelposition"];
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), S();
  }
  get options() {
    return this.$$.ctx[6];
  }
  set options(e) {
    this.$$set({ options: e }), S();
  }
  get selected() {
    return this.$$.ctx[0];
  }
  set selected(e) {
    this.$$set({ selected: e }), S();
  }
  get labelposition() {
    return this.$$.ctx[2];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), S();
  }
}
customElements.define("v-radio", mn);
const Ii = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mn
}, Symbol.toStringTag, { value: "Module" }));
function Pt(t, e, n) {
  const i = t.slice();
  return i[12] = e[n], i;
}
function Tt(t) {
  let e, n, i;
  return {
    c() {
      e = A("p"), n = X(t[1]), f(e, "class", i = j("text-xs pb-1", {
        "pb-1": t[2] === "top",
        inline: t[2] === "left"
      }));
    },
    m(s, l) {
      C(s, e, l), v(e, n);
    },
    p(s, l) {
      l & 2 && K(n, s[1]), l & 4 && i !== (i = j("text-xs pb-1", {
        "pb-1": s[2] === "top",
        inline: s[2] === "left"
      })) && f(e, "class", i);
    },
    d(s) {
      s && N(e);
    }
  };
}
function Ot(t, e) {
  let n, i = e[12] + "", s, l, r, o;
  return {
    key: t,
    first: null,
    c() {
      n = A("option"), s = X(i), l = D(), n.selected = r = e[6] === e[12], n.__value = o = `
        ` + e[12] + `
      `, n.value = n.__value, this.first = n;
    },
    m(a, c) {
      C(a, n, c), v(n, s), v(n, l);
    },
    p(a, c) {
      e = a, c & 8 && i !== (i = e[12] + "") && K(s, i), c & 72 && r !== (r = e[6] === e[12]) && (n.selected = r), c & 8 && o !== (o = `
        ` + e[12] + `
      `) && (n.__value = o, n.value = n.__value);
    },
    d(a) {
      a && N(n);
    }
  };
}
function Fi(t) {
  let e, n, i, s, l = (t[0] || "Please select") + "", r, o, a = [], c = /* @__PURE__ */ new Map(), h, m, d = t[1] && Tt(t), p = t[3];
  const g = (b) => b[12];
  for (let b = 0; b < p.length; b += 1) {
    let V = Pt(t, p, b), x = g(V);
    c.set(x, a[b] = Ot(x, V));
  }
  return {
    c() {
      e = A("label"), d && d.c(), n = D(), i = A("select"), s = A("option"), r = X(l), o = D();
      for (let b = 0; b < a.length; b += 1)
        a[b].c();
      this.c = E, s.__value = "", s.value = s.__value, f(i, "class", j(Rt, "py-1 px-2.5 text-xs border border-black appearance-none rounded-none")), f(e, "class", j(Rt, "relative"));
    },
    m(b, V) {
      C(b, e, V), d && d.m(e, null), v(e, n), v(e, i), v(i, s), v(s, r), v(s, o);
      for (let x = 0; x < a.length; x += 1)
        a[x].m(i, null);
      t[10](i), t[11](e), h || (m = Z(i, "input", t[7]), h = !0);
    },
    p(b, [V]) {
      b[1] ? d ? d.p(b, V) : (d = Tt(b), d.c(), d.m(e, n)) : d && (d.d(1), d = null), V & 1 && l !== (l = (b[0] || "Please select") + "") && K(r, l), V & 72 && (p = b[3], a = ct(a, V, g, 1, b, p, c, i, at, Ot, null, Pt));
    },
    i: E,
    o: E,
    d(b) {
      b && N(e), d && d.d();
      for (let V = 0; V < a.length; V += 1)
        a[V].d();
      t[10](null), t[11](null), h = !1, m();
    }
  };
}
const Rt = "max-w-[14rem] w-full";
function Ni(t, e, n) {
  let { options: i = "" } = e, { value: s = "" } = e, { placeholder: l = "" } = e, { label: r = "" } = e, { labelposition: o = "top" } = e, a, c, h, m;
  se();
  const d = (b) => {
    b.preventDefault(), b.stopImmediatePropagation(), n(8, s = c.value.trim()), be(a, "input", { value: s });
  };
  function p(b) {
    oe[b ? "unshift" : "push"](() => {
      c = b, n(5, c), n(3, h), n(9, i);
    });
  }
  function g(b) {
    oe[b ? "unshift" : "push"](() => {
      a = b, n(4, a);
    });
  }
  return t.$$set = (b) => {
    "options" in b && n(9, i = b.options), "value" in b && n(8, s = b.value), "placeholder" in b && n(0, l = b.placeholder), "label" in b && n(1, r = b.label), "labelposition" in b && n(2, o = b.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 512 && n(3, h = i.split(",").map((b) => b.trim())), t.$$.dirty & 264 && n(6, m = h.find((b) => b === s) ?? "");
  }, [
    l,
    r,
    o,
    h,
    a,
    c,
    m,
    d,
    s,
    i,
    p,
    g
  ];
}
class bn extends Q {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>label{--select-chevron-color:black;--select-chevron-size:15px}label::after{content:'';position:absolute;background-color:var(--select-chevron-color);clip-path:polygon(25% 25%, 17.5% 32.5%, 40% 55%, 50% 65%, 60% 55%, 82.5% 32.5%, 75% 25%, 50% 50%);width:var(--select-chevron-size);height:var(--select-chevron-size);right:2px;bottom:2px}</style>", ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Ni, Fi, ie, {
      options: 9,
      value: 8,
      placeholder: 0,
      label: 1,
      labelposition: 2
    }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), S()));
  }
  static get observedAttributes() {
    return ["options", "value", "placeholder", "label", "labelposition"];
  }
  get options() {
    return this.$$.ctx[9];
  }
  set options(e) {
    this.$$set({ options: e }), S();
  }
  get value() {
    return this.$$.ctx[8];
  }
  set value(e) {
    this.$$set({ value: e }), S();
  }
  get placeholder() {
    return this.$$.ctx[0];
  }
  set placeholder(e) {
    this.$$set({ placeholder: e }), S();
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), S();
  }
  get labelposition() {
    return this.$$.ctx[2];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), S();
  }
}
customElements.define("v-select", bn);
const Hi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bn
}, Symbol.toStringTag, { value: "Module" })), Pe = [];
function ji(t, e = E) {
  let n;
  const i = /* @__PURE__ */ new Set();
  function s(o) {
    if (tn(t, o) && (t = o, n)) {
      const a = !Pe.length;
      for (const c of i)
        c[1](), Pe.push(c, t);
      if (a) {
        for (let c = 0; c < Pe.length; c += 2)
          Pe[c][0](Pe[c + 1]);
        Pe.length = 0;
      }
    }
  }
  function l(o) {
    s(o(t));
  }
  function r(o, a = E) {
    const c = [o, a];
    return i.add(c), i.size === 1 && (n = e(s) || E), o(t), () => {
      i.delete(c), i.size === 0 && (n(), n = null);
    };
  }
  return { set: s, update: l, subscribe: r };
}
function Vt(t) {
  return Object.prototype.toString.call(t) === "[object Date]";
}
function it(t, e, n, i) {
  if (typeof n == "number" || Vt(n)) {
    const s = i - n, l = (n - e) / (t.dt || 1 / 60), r = t.opts.stiffness * s, o = t.opts.damping * l, a = (r - o) * t.inv_mass, c = (l + a) * t.dt;
    return Math.abs(c) < t.opts.precision && Math.abs(s) < t.opts.precision ? i : (t.settled = !1, Vt(n) ? new Date(n.getTime() + c) : n + c);
  } else {
    if (Array.isArray(n))
      return n.map((s, l) => it(t, e[l], n[l], i[l]));
    if (typeof n == "object") {
      const s = {};
      for (const l in n)
        s[l] = it(t, e[l], n[l], i[l]);
      return s;
    } else
      throw new Error(`Cannot spring ${typeof n} values`);
  }
}
function zi(t, e = {}) {
  const n = ji(t), { stiffness: i = 0.15, damping: s = 0.8, precision: l = 0.01 } = e;
  let r, o, a, c = t, h = t, m = 1, d = 0, p = !1;
  function g(V, x = {}) {
    h = V;
    const F = a = {};
    if (t == null || x.hard || b.stiffness >= 1 && b.damping >= 1)
      return p = !0, r = mt(), c = V, n.set(t = h), Promise.resolve();
    if (x.soft) {
      const T = x.soft === !0 ? 0.5 : +x.soft;
      d = 1 / (T * 60), m = 0;
    }
    return o || (r = mt(), p = !1, o = Zn((T) => {
      if (p)
        return p = !1, o = null, !1;
      m = Math.min(m + d, 1);
      const M = {
        inv_mass: m,
        opts: b,
        settled: !0,
        dt: (T - r) * 60 / 1e3
      }, L = it(M, c, t, h);
      return r = T, c = t, n.set(t = L), M.settled && (o = null), !M.settled;
    })), new Promise((T) => {
      o.promise.then(() => {
        F === a && T();
      });
    });
  }
  const b = {
    set: g,
    update: (V, x) => g(V(h, t), x),
    subscribe: n.subscribe,
    stiffness: i,
    damping: s,
    precision: l
  };
  return b;
}
const Di = (t, e, n) => t <= e ? e : t >= n ? n : t, We = (t, e, n, i) => {
  const s = (t - e) / (n - e) * 100;
  return Number.isNaN(s) || s <= 0 ? 0 : s >= 100 ? 100 : Number.parseFloat(s.toFixed(i));
};
function Lt(t, e, n) {
  const i = t.slice();
  return i[53] = e[n], i[55] = n, i;
}
function xt(t, e, n) {
  const i = t.slice();
  return i[6] = e[n], i[57] = n, i;
}
function It(t) {
  let e, n;
  return {
    c() {
      e = A("p"), n = X(t[4]), f(e, "class", "text-xs");
    },
    m(i, s) {
      C(i, e, s), v(e, n);
    },
    p(i, s) {
      s[0] & 16 && K(n, i[4]);
    },
    d(i) {
      i && N(e);
    }
  };
}
function Ft(t) {
  let e, n;
  return {
    c() {
      e = A("span"), n = X(t[5]), f(e, "class", "floating-suffix");
    },
    m(i, s) {
      C(i, e, s), v(e, n);
    },
    p(i, s) {
      s[0] & 32 && K(n, i[5]);
    },
    d(i) {
      i && N(e);
    }
  };
}
function Nt(t) {
  let e, n, i, s, l, r, o = t[6] + "", a, c, h, m, d, p, g, b, V, x, F, T = t[5] && Ft(t);
  function M() {
    return t[37](t[57]);
  }
  return {
    c() {
      e = A("span"), n = A("span"), i = D(), s = A("span"), l = D(), r = A("span"), a = X(o), c = D(), T && T.c(), f(n, "class", "handle-bg absolute left-0 bottom-1 rounded-full opacity-50 h-full w-full transition-transform bg-gray-400"), f(s, "class", "absolute left-0 bottom-1 block rounded-full h-full w-full border border-black bg-white"), f(r, "class", h = j("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })), f(e, "role", "slider"), f(e, "class", "range absolute block h-5 w-5 top-1 bottom-auto -translate-x-1/2 -translate-y-1/2 z-[2]"), f(e, "data-handle", m = t[57]), ue(e, "left", t[17][t[57]] + "%"), ue(e, "z-index", t[15] === t[57] ? 3 : 2), f(e, "aria-valuemin", d = t[0] === !0 && t[57] === 1 ? t[9] : t[7]), f(e, "aria-valuemax", p = t[0] === !0 && t[57] === 0 ? t[10] : t[8]), f(e, "aria-valuenow", g = t[6]), f(e, "aria-valuetext", b = t[6]?.toString()), f(e, "aria-orientation", "horizontal"), f(e, "aria-disabled", t[2]), f(e, "disabled", t[2]), f(e, "tabindex", V = t[2] ? -1 : 0), Y(e, "active", t[13] && t[15] === t[57]), Y(e, "press", t[14] && t[15] === t[57]);
    },
    m(L, P) {
      C(L, e, P), v(e, n), v(e, i), v(e, s), v(e, l), v(e, r), v(r, a), v(r, c), T && T.m(r, null), x || (F = [
        Z(e, "blur", t[20]),
        Z(e, "focus", M)
      ], x = !0);
    },
    p(L, P) {
      t = L, P[0] & 1536 && o !== (o = t[6] + "") && K(a, o), t[5] ? T ? T.p(t, P) : (T = Ft(t), T.c(), T.m(r, null)) : T && (T.d(1), T = null), P[0] & 40960 && h !== (h = j("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })) && f(r, "class", h), P[0] & 131072 && ue(e, "left", t[17][t[57]] + "%"), P[0] & 32768 && ue(e, "z-index", t[15] === t[57] ? 3 : 2), P[0] & 641 && d !== (d = t[0] === !0 && t[57] === 1 ? t[9] : t[7]) && f(e, "aria-valuemin", d), P[0] & 1281 && p !== (p = t[0] === !0 && t[57] === 0 ? t[10] : t[8]) && f(e, "aria-valuemax", p), P[0] & 1536 && g !== (g = t[6]) && f(e, "aria-valuenow", g), P[0] & 1536 && b !== (b = t[6]?.toString()) && f(e, "aria-valuetext", b), P[0] & 4 && f(e, "aria-disabled", t[2]), P[0] & 4 && f(e, "disabled", t[2]), P[0] & 4 && V !== (V = t[2] ? -1 : 0) && f(e, "tabindex", V), P[0] & 40960 && Y(e, "active", t[13] && t[15] === t[57]), P[0] & 49152 && Y(e, "press", t[14] && t[15] === t[57]);
    },
    d(L) {
      L && N(e), T && T.d(), x = !1, pe(F);
    }
  };
}
function Ht(t) {
  let e;
  return {
    c() {
      e = A("span"), f(e, "class", "absolute block transition duration-200 h-1 -top-0.5 select-none z-[1] bg-black"), ue(e, "left", t[18](t[17]) + "%"), ue(e, "right", t[19](t[17]) + "%");
    },
    m(n, i) {
      C(n, e, i);
    },
    p(n, i) {
      i[0] & 131072 && ue(e, "left", n[18](n[17]) + "%"), i[0] & 131072 && ue(e, "right", n[19](n[17]) + "%");
    },
    d(n) {
      n && N(e);
    }
  };
}
function jt(t) {
  let e, n;
  return {
    c() {
      e = A("span"), n = X(t[5]), f(e, "class", "pipVal-suffix");
    },
    m(i, s) {
      C(i, e, s), v(e, n);
    },
    p(i, s) {
      s[0] & 32 && K(n, i[5]);
    },
    d(i) {
      i && N(e);
    }
  };
}
function zt(t) {
  let e, n = Array.from({ length: t[12] + 1 }), i = [];
  for (let s = 0; s < n.length; s += 1)
    i[s] = Wt(Lt(t, n, s));
  return {
    c() {
      for (let s = 0; s < i.length; s += 1)
        i[s].c();
      e = ot();
    },
    m(s, l) {
      for (let r = 0; r < i.length; r += 1)
        i[r].m(s, l);
      C(s, e, l);
    },
    p(s, l) {
      if (l[0] & 70016) {
        n = Array.from({ length: s[12] + 1 });
        let r;
        for (r = 0; r < n.length; r += 1) {
          const o = Lt(s, n, r);
          i[r] ? i[r].p(o, l) : (i[r] = Wt(o), i[r].c(), i[r].m(e.parentNode, e));
        }
        for (; r < i.length; r += 1)
          i[r].d(1);
        i.length = n.length;
      }
    },
    d(s) {
      rt(i, s), s && N(e);
    }
  };
}
function Dt(t) {
  let e;
  return {
    c() {
      e = A("span"), f(e, "class", "absolute h-[4px] w-[1px] top-[calc(50%-9px)] whitespace-nowrap transition bg-black/50"), ue(e, "left", We(t[16](t[55]), t[7], t[8], 2) + "%");
    },
    m(n, i) {
      C(n, e, i);
    },
    p(n, i) {
      i[0] & 65920 && ue(e, "left", We(n[16](n[55]), n[7], n[8], 2) + "%");
    },
    d(n) {
      n && N(e);
    }
  };
}
function Wt(t) {
  let e = t[16](t[55]) !== t[7] && t[16](t[55]) !== t[8], n, i = e && Dt(t);
  return {
    c() {
      i && i.c(), n = ot();
    },
    m(s, l) {
      i && i.m(s, l), C(s, n, l);
    },
    p(s, l) {
      l[0] & 65920 && (e = s[16](s[55]) !== s[7] && s[16](s[55]) !== s[8]), e ? i ? i.p(s, l) : (i = Dt(s), i.c(), i.m(n.parentNode, n)) : i && (i.d(1), i = null);
    },
    d(s) {
      i && i.d(s), s && N(n);
    }
  };
}
function Bt(t) {
  let e, n;
  return {
    c() {
      e = A("span"), n = X(t[5]), f(e, "class", "pipVal-suffix");
    },
    m(i, s) {
      C(i, e, s), v(e, n);
    },
    p(i, s) {
      s[0] & 32 && K(n, i[5]);
    },
    d(i) {
      i && N(e);
    }
  };
}
function Wi(t) {
  let e, n, i, s, l, r, o, a, c, h, m, d, p, g, b, V, x, F = t[4] && It(t), T = t[10] ? [t[9], t[10]] : [t[9]], M = [];
  for (let O = 0; O < T.length; O += 1)
    M[O] = Nt(xt(t, T, O));
  let L = t[0] && Ht(t), P = t[5] && jt(t), k = t[3] && zt(t), I = t[5] && Bt(t);
  return {
    c() {
      e = A("label"), F && F.c(), n = D(), i = A("div");
      for (let O = 0; O < M.length; O += 1)
        M[O].c();
      s = D(), L && L.c(), l = D(), r = A("div"), o = A("small"), a = X(t[7]), c = D(), P && P.c(), h = D(), k && k.c(), m = D(), d = A("small"), p = X(t[8]), g = D(), I && I.c(), this.c = E, f(o, "class", "absolute bottom-full left-0 -translate-x-1/2 mb-3 whitespace-nowrap"), f(d, "class", "absolute bottom-full right-0 translate-x-1/2 mb-3 whitespace-nowrap"), f(r, "class", "absolute h-2 left-0 right-0"), Y(r, "disabled", t[2]), Y(r, "focus", t[13]), f(i, "class", b = j("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": t[2] })), Y(i, "range", t[0]), Y(i, "focus", t[13]), Y(i, "min", t[0] === "min"), Y(i, "max", t[0] === "max"), f(e, "class", "flex flex-col gap-2");
    },
    m(O, z) {
      C(O, e, z), F && F.m(e, null), v(e, n), v(e, i);
      for (let H = 0; H < M.length; H += 1)
        M[H].m(i, null);
      v(i, s), L && L.m(i, null), v(i, l), v(i, r), v(r, o), v(o, a), v(o, c), P && P.m(o, null), v(r, h), k && k.m(r, null), v(r, m), v(r, d), v(d, p), v(d, g), I && I.m(d, null), t[38](i), V || (x = [
        Z(window, "mousedown", t[24]),
        Z(window, "touchstart", t[24]),
        Z(window, "mousemove", t[25]),
        Z(window, "touchmove", t[25]),
        Z(window, "mouseup", t[26]),
        Z(window, "touchend", t[27]),
        Z(window, "keydown", t[28]),
        Z(i, "mousedown", t[22]),
        Z(i, "mouseup", t[23]),
        Z(i, "touchstart", bt(t[22])),
        Z(i, "touchend", bt(t[23]))
      ], V = !0);
    },
    p(O, z) {
      if (O[4] ? F ? F.p(O, z) : (F = It(O), F.c(), F.m(e, n)) : F && (F.d(1), F = null), z[0] & 3336101) {
        T = O[10] ? [O[9], O[10]] : [O[9]];
        let H;
        for (H = 0; H < T.length; H += 1) {
          const le = xt(O, T, H);
          M[H] ? M[H].p(le, z) : (M[H] = Nt(le), M[H].c(), M[H].m(i, s));
        }
        for (; H < M.length; H += 1)
          M[H].d(1);
        M.length = T.length;
      }
      O[0] ? L ? L.p(O, z) : (L = Ht(O), L.c(), L.m(i, l)) : L && (L.d(1), L = null), z[0] & 128 && K(a, O[7]), O[5] ? P ? P.p(O, z) : (P = jt(O), P.c(), P.m(o, null)) : P && (P.d(1), P = null), O[3] ? k ? k.p(O, z) : (k = zt(O), k.c(), k.m(r, m)) : k && (k.d(1), k = null), z[0] & 256 && K(p, O[8]), O[5] ? I ? I.p(O, z) : (I = Bt(O), I.c(), I.m(d, null)) : I && (I.d(1), I = null), z[0] & 4 && Y(r, "disabled", O[2]), z[0] & 8192 && Y(r, "focus", O[13]), z[0] & 4 && b !== (b = j("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": O[2] })) && f(i, "class", b), z[0] & 5 && Y(i, "range", O[0]), z[0] & 8196 && Y(i, "focus", O[13]), z[0] & 5 && Y(i, "min", O[0] === "min"), z[0] & 5 && Y(i, "max", O[0] === "max");
    },
    i: E,
    o: E,
    d(O) {
      O && N(e), F && F.d(), rt(M, O), L && L.d(), P && P.d(), k && k.d(), I && I.d(), t[38](null), V = !1, pe(x);
    }
  };
}
function Bi(t, e, n) {
  let i, s, l = E, r = () => (l(), l = Bn(ke, (y) => n(17, s = y)), ke);
  t.$$.on_destroy.push(() => l());
  let { slider: o } = e, { range: a = !1 } = e, { min: c } = e, { max: h } = e, { step: m } = e, { value: d } = e, { start: p } = e, { end: g } = e, { disabled: b = !1 } = e, { discrete: V = !0 } = e, { label: x = "" } = e, { suffix: F = "" } = e;
  se();
  const T = { stiffness: 0.1, damping: 0.4 };
  let M, L, P, k, I, O, z, H = 0, le = !1, ae = !1, re = !1, ye = !1, fe = -1, Se, ve, ke;
  const he = (y, B, J) => {
    if (y <= B)
      return B;
    if (y >= J)
      return J;
    const U = (y - B) % P;
    let me = y - U;
    return Math.abs(U) * 2 >= P && (me += U > 0 ? P : -P), me = Di(me, B, J), Number.parseFloat(me.toFixed(2));
  }, Re = (y) => y.type.includes("touch") ? y.touches[0] : y, Ge = (y) => {
    const B = [...o.querySelectorAll(".handle")], J = B.includes(y), U = B.some((me) => me.contains(y));
    return J || U;
  }, Ve = (y) => a === "min" || a === "max" ? y.slice(0, 1) : a ? y.slice(0, 2) : y, Le = () => {
    ve = o.getBoundingClientRect();
  }, Ae = (y) => {
    const J = (y.clientX - ve.left) / ve.width * 100, U = (L - M) / 100 * J + M;
    let me = 0;
    return a && k === I ? U > I ? 1 : 0 : (a && (me = [k, I].indexOf([k, I].sort((zn, Dn) => Math.abs(U - zn) - Math.abs(U - Dn))[0])), me);
  }, Ce = (y) => {
    const J = (y.clientX - ve.left) / ve.width * 100, U = (L - M) / 100 * J + M;
    Je(fe, U);
  }, Je = (y, B) => {
    let J = y;
    const U = he(B, M, L);
    return typeof J > "u" && (J = fe), a && (J === 0 && U > I ? n(10, I = U) : J === 1 && U < k && n(9, k = U)), J === 0 && k !== U && n(9, k = U), J === 1 && I !== U && n(10, I = U), Se !== U && (ne(), Se = U), J === 0 ? n(29, p = k.toString()) : J === 1 && n(30, g = I.toString()), U;
  }, Fn = (y) => a === "min" ? 0 : y[0], Nn = (y) => a === "max" ? 0 : a === "min" ? 100 - y[0] : 100 - y[1], Hn = () => {
    ye && (n(13, le = !1), ae = !1, n(14, re = !1));
  }, _ = (y) => {
    b || (n(15, fe = y), n(13, le = !0));
  }, u = (y) => {
    if (b)
      return;
    Le();
    const B = y.target, J = Re(y);
    n(13, le = !0), ae = !0, n(14, re = !0), n(15, fe = Ae(J)), Se = he(fe === 0 ? k : I, M, L), y.type === "touchstart" && !B.matches(".pipVal") && Ce(J);
  }, w = () => {
    n(14, re = !1);
  }, R = (y) => {
    ye = !1, le && y.target !== o && !o.contains(y.target) && n(13, le = !1);
  }, W = (y) => {
    b || !ae || (n(13, le = !0), Ce(Re(y)));
  }, te = (y) => {
    if (!b) {
      const B = y.target;
      (ae && B && B === o || o.contains(B)) && (n(13, le = !0), !Ge(B) && !B.matches(".pipVal") && Ce(Re(y)));
    }
    ae = !1, n(14, re = !1);
  }, q = () => {
    ae = !1, n(14, re = !1);
  }, G = (y) => {
    b || (y.target === o || o.contains(y.target)) && (ye = !0);
  }, ne = () => {
    b || be(o, "input", {
      activeHandle: fe,
      previousValue: Se,
      value: fe === 0 ? k : I,
      values: I ? [k, I].map((y) => he(y, M, L)) : void 0
    });
  }, ce = (y) => _(y);
  function jn(y) {
    oe[y ? "unshift" : "push"](() => {
      o = y, n(1, o);
    });
  }
  return t.$$set = (y) => {
    "slider" in y && n(1, o = y.slider), "range" in y && n(0, a = y.range), "min" in y && n(31, c = y.min), "max" in y && n(32, h = y.max), "step" in y && n(33, m = y.step), "value" in y && n(6, d = y.value), "start" in y && n(29, p = y.start), "end" in y && n(30, g = y.end), "disabled" in y && n(2, b = y.disabled), "discrete" in y && n(3, V = y.discrete), "label" in y && n(4, x = y.label), "suffix" in y && n(5, F = y.suffix);
  }, t.$$.update = () => {
    if (t.$$.dirty[1] & 2 && n(8, L = Number.parseFloat(h || "100")), t.$$.dirty[1] & 1 && n(7, M = Number.parseFloat(c || "0")), t.$$.dirty[1] & 4 && n(34, P = Number.parseFloat(m || "1")), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(35, O = (L - M) / P >= 100 ? (L - M) / 20 : 1), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(12, z = (L - M) / P), t.$$.dirty[0] & 128 | t.$$.dirty[1] & 24 && n(16, i = (y) => M + y * P * O), t.$$.dirty[0] & 536870976 | t.$$.dirty[1] & 3 && n(9, k = p || d ? Number.parseFloat(p || d) : (Number.parseFloat(c || "0") + Number.parseFloat(h || "100")) / 2), t.$$.dirty[0] & 1073741824 && n(10, I = g ? Number.parseFloat(g) : void 0), t.$$.dirty[0] & 1073741825 && n(0, a = typeof a == "string" ? a : g !== void 0), t.$$.dirty[0] & 3968 | t.$$.dirty[1] & 32) {
      n(9, k = he(k, M, L));
      let y = [k];
      I && (n(10, I = he(I, M, L)), y.push(I)), y = Ve(y), H !== y.length ? r(n(11, ke = zi(y.map((B) => We(B, M, L, 2)), T))) : ke.set(y.map((B) => We(B, M, L, 2))).catch((B) => console.error(B)), n(36, H = y.length);
    }
  }, [
    a,
    o,
    b,
    V,
    x,
    F,
    d,
    M,
    L,
    k,
    I,
    ke,
    z,
    le,
    re,
    fe,
    i,
    s,
    Fn,
    Nn,
    Hn,
    _,
    u,
    w,
    R,
    W,
    te,
    q,
    G,
    p,
    g,
    c,
    h,
    m,
    P,
    O,
    H,
    ce,
    jn
  ];
}
class gn extends Q {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>.slider .range:hover .handle-bg{transform:scale(1.5)}.slider .range.active .handle-bg{transform:scale(2.0)}.slider .range.active .floating,.slider .range:hover .floating{opacity:1}</style>", ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Bi, Wi, tn, {
      slider: 1,
      range: 0,
      min: 31,
      max: 32,
      step: 33,
      value: 6,
      start: 29,
      end: 30,
      disabled: 2,
      discrete: 3,
      label: 4,
      suffix: 5
    }, null, [-1, -1]), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), S()));
  }
  static get observedAttributes() {
    return [
      "slider",
      "range",
      "min",
      "max",
      "step",
      "value",
      "start",
      "end",
      "disabled",
      "discrete",
      "label",
      "suffix"
    ];
  }
  get slider() {
    return this.$$.ctx[1];
  }
  set slider(e) {
    this.$$set({ slider: e }), S();
  }
  get range() {
    return this.$$.ctx[0];
  }
  set range(e) {
    this.$$set({ range: e }), S();
  }
  get min() {
    return this.$$.ctx[31];
  }
  set min(e) {
    this.$$set({ min: e }), S();
  }
  get max() {
    return this.$$.ctx[32];
  }
  set max(e) {
    this.$$set({ max: e }), S();
  }
  get step() {
    return this.$$.ctx[33];
  }
  set step(e) {
    this.$$set({ step: e }), S();
  }
  get value() {
    return this.$$.ctx[6];
  }
  set value(e) {
    this.$$set({ value: e }), S();
  }
  get start() {
    return this.$$.ctx[29];
  }
  set start(e) {
    this.$$set({ start: e }), S();
  }
  get end() {
    return this.$$.ctx[30];
  }
  set end(e) {
    this.$$set({ end: e }), S();
  }
  get disabled() {
    return this.$$.ctx[2];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), S();
  }
  get discrete() {
    return this.$$.ctx[3];
  }
  set discrete(e) {
    this.$$set({ discrete: e }), S();
  }
  get label() {
    return this.$$.ctx[4];
  }
  set label(e) {
    this.$$set({ label: e }), S();
  }
  get suffix() {
    return this.$$.ctx[5];
  }
  set suffix(e) {
    this.$$set({ suffix: e }), S();
  }
}
customElements.define("v-slider", gn);
const Zi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gn
}, Symbol.toStringTag, { value: "Module" }));
function Zt(t) {
  let e, n;
  return {
    c() {
      e = A("p"), n = X(t[0]), f(e, "class", "capitalize text-xs");
    },
    m(i, s) {
      C(i, e, s), v(e, n);
    },
    p(i, s) {
      s & 1 && K(n, i[0]);
    },
    d(i) {
      i && N(e);
    }
  };
}
function qi(t) {
  let e, n, i, s, l, r, o, a, c, h, m, d = t[3] === "labeled" && Zt(t);
  return {
    c() {
      e = A("label"), n = A("button"), i = A("span"), s = D(), l = A("input"), a = D(), d && d.c(), this.c = E, f(i, "class", "pointer-events-none relative inline-block border border-green/100 h-4 w-4 mt-px ml-px bg-white shadow transform ring-0 motion-safe:transition-transform ease-in-out duration-200"), Y(i, "translate-x-0", !t[6]), Y(i, "translate-x-6", t[6]), f(l, "name", t[2]), l.value = t[0], f(l, "class", "hidden"), f(l, "type", "checkbox"), l.checked = t[6], f(n, "type", "button"), f(n, "class", r = j("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": t[6] })), f(n, "role", "switch"), f(n, "aria-label", t[1]), f(n, "aria-checked", o = t[6] ? "true" : "false"), f(e, "class", c = j("flex items-center gap-1.5", {
        "opacity-50 pointer-events-none": t[7]
      }));
    },
    m(p, g) {
      C(p, e, g), v(e, n), v(n, i), v(n, s), v(n, l), t[10](l), v(e, a), d && d.m(e, null), t[11](e), h || (m = Z(n, "click", t[8]), h = !0);
    },
    p(p, [g]) {
      g & 64 && Y(i, "translate-x-0", !p[6]), g & 64 && Y(i, "translate-x-6", p[6]), g & 4 && f(l, "name", p[2]), g & 1 && (l.value = p[0]), g & 64 && (l.checked = p[6]), g & 64 && r !== (r = j("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": p[6] })) && f(n, "class", r), g & 2 && f(n, "aria-label", p[1]), g & 64 && o !== (o = p[6] ? "true" : "false") && f(n, "aria-checked", o), p[3] === "labeled" ? d ? d.p(p, g) : (d = Zt(p), d.c(), d.m(e, null)) : d && (d.d(1), d = null), g & 128 && c !== (c = j("flex items-center gap-1.5", {
        "opacity-50 pointer-events-none": p[7]
      })) && f(e, "class", c);
    },
    i: E,
    o: E,
    d(p) {
      p && N(e), t[10](null), d && d.d(), t[11](null), h = !1, m();
    }
  };
}
function Xi(t, e, n) {
  let { label: i = "" } = e, { name: s = "" } = e, { value: l = "off" } = e, { variant: r = "default" } = e, { disabled: o = "false" } = e;
  se();
  let a, c, h, m;
  const d = () => {
    n(0, l = h ? "off" : "on"), n(5, c.checked = h, c), be(a, "input", { value: c.checked });
  };
  function p(b) {
    oe[b ? "unshift" : "push"](() => {
      c = b, n(5, c);
    });
  }
  function g(b) {
    oe[b ? "unshift" : "push"](() => {
      a = b, n(4, a);
    });
  }
  return t.$$set = (b) => {
    "label" in b && n(1, i = b.label), "name" in b && n(2, s = b.name), "value" in b && n(0, l = b.value), "variant" in b && n(3, r = b.variant), "disabled" in b && n(9, o = b.disabled);
  }, t.$$.update = () => {
    t.$$.dirty & 1 && n(6, h = l === "on"), t.$$.dirty & 512 && n(7, m = o === "true");
  }, [
    l,
    i,
    s,
    r,
    a,
    c,
    h,
    m,
    d,
    o,
    p,
    g
  ];
}
class pn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Xi, qi, ie, {
      label: 1,
      name: 2,
      value: 0,
      variant: 3,
      disabled: 9
    }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), S()));
  }
  static get observedAttributes() {
    return ["label", "name", "value", "variant", "disabled"];
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), S();
  }
  get name() {
    return this.$$.ctx[2];
  }
  set name(e) {
    this.$$set({ name: e }), S();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), S();
  }
  get variant() {
    return this.$$.ctx[3];
  }
  set variant(e) {
    this.$$set({ variant: e }), S();
  }
  get disabled() {
    return this.$$.ctx[9];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), S();
  }
}
customElements.define("v-switch", pn);
const Ui = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pn
}, Symbol.toStringTag, { value: "Module" }));
function Yi(t) {
  let e;
  return {
    c() {
      e = A("table"), e.innerHTML = "<slot></slot>", this.c = E, f(e, "class", "bg-white table-fixed text-xs w-full");
    },
    m(n, i) {
      C(n, e, i);
    },
    p: E,
    i: E,
    o: E,
    d(n) {
      n && N(e);
    }
  };
}
function Ki(t) {
  return se(), [];
}
class _n extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Ki, Yi, ie, {}, null), e && e.target && C(e.target, this, e.anchor);
  }
}
customElements.define("v-table", _n);
const Gi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _n
}, Symbol.toStringTag, { value: "Module" }));
function qt(t, e, n) {
  const i = t.slice();
  return i[8] = e[n], i[10] = n, i;
}
function Xt(t, e) {
  let n, i = e[8] + "", s, l, r, o, a;
  function c() {
    return e[6](e[8]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = A("button"), s = X(i), l = D(), f(n, "class", r = j("px-4 py-1 uppercase text-sm first:ml-4", {
        "bg-white border border-x-black border-t-black border-b-white font-bold": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })), this.first = n;
    },
    m(h, m) {
      C(h, n, m), v(n, s), v(n, l), o || (a = Z(n, "click", c), o = !0);
    },
    p(h, m) {
      e = h, m & 2 && i !== (i = e[8] + "") && K(s, i), m & 11 && r !== (r = j("px-4 py-1 uppercase text-sm first:ml-4", {
        "bg-white border border-x-black border-t-black border-b-white font-bold": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })) && f(n, "class", r);
    },
    d(h) {
      h && N(n), o = !1, a();
    }
  };
}
function Ji(t) {
  let e, n = [], i = /* @__PURE__ */ new Map(), s = t[1];
  const l = (r) => r[8];
  for (let r = 0; r < s.length; r += 1) {
    let o = qt(t, s, r), a = l(o);
    i.set(a, n[r] = Xt(a, o));
  }
  return {
    c() {
      e = A("div");
      for (let r = 0; r < n.length; r += 1)
        n[r].c();
      this.c = E, f(e, "class", "w-full flex bg-black/20");
    },
    m(r, o) {
      C(r, e, o);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
      t[7](e);
    },
    p(r, [o]) {
      o & 27 && (s = r[1], n = ct(n, o, l, 1, r, s, i, e, at, Xt, null, qt));
    },
    i: E,
    o: E,
    d(r) {
      r && N(e);
      for (let o = 0; o < n.length; o += 1)
        n[o].d();
      t[7](null);
    }
  };
}
function Qi(t, e, n) {
  let i, s, { tabs: l = "" } = e, { selected: r = "" } = e, o;
  se();
  const a = (m) => {
    n(0, r = m), be(o, "input", { value: r });
  }, c = (m) => a(m);
  function h(m) {
    oe[m ? "unshift" : "push"](() => {
      o = m, n(2, o);
    });
  }
  return t.$$set = (m) => {
    "tabs" in m && n(5, l = m.tabs), "selected" in m && n(0, r = m.selected);
  }, t.$$.update = () => {
    t.$$.dirty & 32 && n(1, i = l.split(",").map((m) => m.trim())), t.$$.dirty & 3 && n(3, s = i.indexOf(r));
  }, [
    r,
    i,
    o,
    s,
    a,
    l,
    c,
    h
  ];
}
class wn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Qi, Ji, ie, { tabs: 5, selected: 0 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), S()));
  }
  static get observedAttributes() {
    return ["tabs", "selected"];
  }
  get tabs() {
    return this.$$.ctx[5];
  }
  set tabs(e) {
    this.$$set({ tabs: e }), S();
  }
  get selected() {
    return this.$$.ctx[0];
  }
  set selected(e) {
    this.$$set({ selected: e }), S();
  }
}
customElements.define("v-tabs", wn);
const $i = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wn
}, Symbol.toStringTag, { value: "Module" }));
function es(t) {
  let e;
  return {
    c() {
      e = A("tbody"), e.innerHTML = "<slot></slot>", this.c = E;
    },
    m(n, i) {
      C(n, e, i);
    },
    p: E,
    i: E,
    o: E,
    d(n) {
      n && N(e);
    }
  };
}
class yn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, null, es, ie, {}, null), e && e.target && C(e.target, this, e.anchor);
  }
}
customElements.define("v-tbody", yn);
const ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yn
}, Symbol.toStringTag, { value: "Module" }));
function ns(t) {
  let e;
  return {
    c() {
      e = A("th"), e.innerHTML = "<slot></slot>", this.c = E, f(e, "class", "p-2 text-left text-neutral-600 font-normal overflow-hidden");
    },
    m(n, i) {
      C(n, e, i);
    },
    p: E,
    i: E,
    o: E,
    d(n) {
      n && N(e);
    }
  };
}
function is(t) {
  return se(), [];
}
class vn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, is, ns, ie, {}, null), e && e.target && C(e.target, this, e.anchor);
  }
}
customElements.define("v-th", vn);
const ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vn
}, Symbol.toStringTag, { value: "Module" }));
function ls(t) {
  let e;
  return {
    c() {
      e = A("td"), e.innerHTML = "<slot></slot>", this.c = E, f(e, "class", "p-2 overflow-hidden");
    },
    m(n, i) {
      C(n, e, i);
    },
    p: E,
    i: E,
    o: E,
    d(n) {
      n && N(e);
    }
  };
}
function rs(t) {
  return se(), [];
}
class kn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, rs, ls, ie, {}, null), e && e.target && C(e.target, this, e.anchor);
  }
}
customElements.define("v-td", kn);
const os = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kn
}, Symbol.toStringTag, { value: "Module" }));
function as(t) {
  let e;
  return {
    c() {
      e = A("thead"), e.innerHTML = "<slot></slot>", this.c = E, f(e, "class", "border-b border-black");
    },
    m(n, i) {
      C(n, e, i);
    },
    p: E,
    i: E,
    o: E,
    d(n) {
      n && N(e);
    }
  };
}
function cs(t) {
  return se(), [];
}
class En extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, cs, as, ie, {}, null), e && e.target && C(e.target, this, e.anchor);
  }
}
customElements.define("v-thead", En);
const us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: En
}, Symbol.toStringTag, { value: "Module" }));
function He(t) {
  return t.split("-")[0];
}
function ft(t) {
  return t.split("-")[1];
}
function Ue(t) {
  return ["top", "bottom"].includes(He(t)) ? "x" : "y";
}
function Mn(t) {
  return t === "y" ? "height" : "width";
}
function Ut(t, e, n) {
  let {
    reference: i,
    floating: s
  } = t;
  const l = i.x + i.width / 2 - s.width / 2, r = i.y + i.height / 2 - s.height / 2, o = Ue(e), a = Mn(o), c = i[a] / 2 - s[a] / 2, h = He(e), m = o === "x";
  let d;
  switch (h) {
    case "top":
      d = {
        x: l,
        y: i.y - s.height
      };
      break;
    case "bottom":
      d = {
        x: l,
        y: i.y + i.height
      };
      break;
    case "right":
      d = {
        x: i.x + i.width,
        y: r
      };
      break;
    case "left":
      d = {
        x: i.x - s.width,
        y: r
      };
      break;
    default:
      d = {
        x: i.x,
        y: i.y
      };
  }
  switch (ft(e)) {
    case "start":
      d[o] -= c * (n && m ? -1 : 1);
      break;
    case "end":
      d[o] += c * (n && m ? -1 : 1);
      break;
  }
  return d;
}
const fs = async (t, e, n) => {
  const {
    placement: i = "bottom",
    strategy: s = "absolute",
    middleware: l = [],
    platform: r
  } = n, o = await (r.isRTL == null ? void 0 : r.isRTL(e));
  let a = await r.getElementRects({
    reference: t,
    floating: e,
    strategy: s
  }), {
    x: c,
    y: h
  } = Ut(a, i, o), m = i, d = {}, p = 0;
  for (let g = 0; g < l.length; g++) {
    const {
      name: b,
      fn: V
    } = l[g], {
      x,
      y: F,
      data: T,
      reset: M
    } = await V({
      x: c,
      y: h,
      initialPlacement: i,
      placement: m,
      strategy: s,
      middlewareData: d,
      rects: a,
      platform: r,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (c = x ?? c, h = F ?? h, d = {
      ...d,
      [b]: {
        ...d[b],
        ...T
      }
    }, M && p <= 50) {
      p++, typeof M == "object" && (M.placement && (m = M.placement), M.rects && (a = M.rects === !0 ? await r.getElementRects({
        reference: t,
        floating: e,
        strategy: s
      }) : M.rects), {
        x: c,
        y: h
      } = Ut(a, m, o)), g = -1;
      continue;
    }
  }
  return {
    x: c,
    y: h,
    placement: m,
    strategy: s,
    middlewareData: d
  };
};
function ds(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function hs(t) {
  return typeof t != "number" ? ds(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Be(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
async function Sn(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: i,
    y: s,
    platform: l,
    rects: r,
    elements: o,
    strategy: a
  } = t, {
    boundary: c = "clippingAncestors",
    rootBoundary: h = "viewport",
    elementContext: m = "floating",
    altBoundary: d = !1,
    padding: p = 0
  } = e, g = hs(p), V = o[d ? m === "floating" ? "reference" : "floating" : m], x = Be(await l.getClippingRect({
    element: (n = await (l.isElement == null ? void 0 : l.isElement(V))) == null || n ? V : V.contextElement || await (l.getDocumentElement == null ? void 0 : l.getDocumentElement(o.floating)),
    boundary: c,
    rootBoundary: h,
    strategy: a
  })), F = Be(l.convertOffsetParentRelativeRectToViewportRelativeRect ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: m === "floating" ? {
      ...r.floating,
      x: i,
      y: s
    } : r.reference,
    offsetParent: await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(o.floating)),
    strategy: a
  }) : r[m]);
  return {
    top: x.top - F.top + g.top,
    bottom: F.bottom - x.bottom + g.bottom,
    left: x.left - F.left + g.left,
    right: F.right - x.right + g.right
  };
}
const ms = Math.min, bs = Math.max;
function Yt(t, e, n) {
  return bs(t, ms(e, n));
}
const gs = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ze(t) {
  return t.replace(/left|right|bottom|top/g, (e) => gs[e]);
}
function ps(t, e, n) {
  n === void 0 && (n = !1);
  const i = ft(t), s = Ue(t), l = Mn(s);
  let r = s === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return e.reference[l] > e.floating[l] && (r = Ze(r)), {
    main: r,
    cross: Ze(r)
  };
}
const _s = {
  start: "end",
  end: "start"
};
function Kt(t) {
  return t.replace(/start|end/g, (e) => _s[e]);
}
function ws(t) {
  const e = Ze(t);
  return [Kt(t), e, Kt(e)];
}
const ys = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n;
      const {
        placement: i,
        middlewareData: s,
        rects: l,
        initialPlacement: r,
        platform: o,
        elements: a
      } = e, {
        mainAxis: c = !0,
        crossAxis: h = !0,
        fallbackPlacements: m,
        fallbackStrategy: d = "bestFit",
        flipAlignment: p = !0,
        ...g
      } = t, b = He(i), x = m || (b === r || !p ? [Ze(r)] : ws(r)), F = [r, ...x], T = await Sn(e, g), M = [];
      let L = ((n = s.flip) == null ? void 0 : n.overflows) || [];
      if (c && M.push(T[b]), h) {
        const {
          main: O,
          cross: z
        } = ps(i, l, await (o.isRTL == null ? void 0 : o.isRTL(a.floating)));
        M.push(T[O], T[z]);
      }
      if (L = [...L, {
        placement: i,
        overflows: M
      }], !M.every((O) => O <= 0)) {
        var P, k;
        const O = ((P = (k = s.flip) == null ? void 0 : k.index) != null ? P : 0) + 1, z = F[O];
        if (z)
          return {
            data: {
              index: O,
              overflows: L
            },
            reset: {
              placement: z
            }
          };
        let H = "bottom";
        switch (d) {
          case "bestFit": {
            var I;
            const le = (I = L.map((ae) => [ae, ae.overflows.filter((re) => re > 0).reduce((re, ye) => re + ye, 0)]).sort((ae, re) => ae[1] - re[1])[0]) == null ? void 0 : I[0].placement;
            le && (H = le);
            break;
          }
          case "initialPlacement":
            H = r;
            break;
        }
        if (i !== H)
          return {
            reset: {
              placement: H
            }
          };
      }
      return {};
    }
  };
};
async function vs(t, e) {
  const {
    placement: n,
    platform: i,
    elements: s
  } = t, l = await (i.isRTL == null ? void 0 : i.isRTL(s.floating)), r = He(n), o = ft(n), a = Ue(n) === "x", c = ["left", "top"].includes(r) ? -1 : 1, h = l && a ? -1 : 1, m = typeof e == "function" ? e(t) : e;
  let {
    mainAxis: d,
    crossAxis: p,
    alignmentAxis: g
  } = typeof m == "number" ? {
    mainAxis: m,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...m
  };
  return o && typeof g == "number" && (p = o === "end" ? g * -1 : g), a ? {
    x: p * h,
    y: d * c
  } : {
    x: d * c,
    y: p * h
  };
}
const ks = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: i
      } = e, s = await vs(e, t);
      return {
        x: n + s.x,
        y: i + s.y,
        data: s
      };
    }
  };
};
function Es(t) {
  return t === "x" ? "y" : "x";
}
const Ms = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: i,
        placement: s
      } = e, {
        mainAxis: l = !0,
        crossAxis: r = !1,
        limiter: o = {
          fn: (V) => {
            let {
              x,
              y: F
            } = V;
            return {
              x,
              y: F
            };
          }
        },
        ...a
      } = t, c = {
        x: n,
        y: i
      }, h = await Sn(e, a), m = Ue(He(s)), d = Es(m);
      let p = c[m], g = c[d];
      if (l) {
        const V = m === "y" ? "top" : "left", x = m === "y" ? "bottom" : "right", F = p + h[V], T = p - h[x];
        p = Yt(F, p, T);
      }
      if (r) {
        const V = d === "y" ? "top" : "left", x = d === "y" ? "bottom" : "right", F = g + h[V], T = g - h[x];
        g = Yt(F, g, T);
      }
      const b = o.fn({
        ...e,
        [m]: p,
        [d]: g
      });
      return {
        ...b,
        data: {
          x: b.x - n,
          y: b.y - i
        }
      };
    }
  };
};
function An(t) {
  return t && t.document && t.location && t.alert && t.setInterval;
}
function _e(t) {
  if (t == null)
    return window;
  if (!An(t)) {
    const e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function je(t) {
  return _e(t).getComputedStyle(t);
}
function ge(t) {
  return An(t) ? "" : t ? (t.nodeName || "").toLowerCase() : "";
}
function Cn() {
  const t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map((e) => e.brand + "/" + e.version).join(" ") : navigator.userAgent;
}
function de(t) {
  return t instanceof _e(t).HTMLElement;
}
function Oe(t) {
  return t instanceof _e(t).Element;
}
function Ss(t) {
  return t instanceof _e(t).Node;
}
function dt(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = _e(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Ye(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: i
  } = je(t);
  return /auto|scroll|overlay|hidden/.test(e + i + n);
}
function As(t) {
  return ["table", "td", "th"].includes(ge(t));
}
function Pn(t) {
  const e = /firefox/i.test(Cn()), n = je(t);
  return n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].includes(n.willChange) || e && n.willChange === "filter" || e && (n.filter ? n.filter !== "none" : !1);
}
function Tn() {
  return !/^((?!chrome|android).)*safari/i.test(Cn());
}
const Gt = Math.min, Fe = Math.max, qe = Math.round;
function Me(t, e, n) {
  var i, s, l, r;
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const o = t.getBoundingClientRect();
  let a = 1, c = 1;
  e && de(t) && (a = t.offsetWidth > 0 && qe(o.width) / t.offsetWidth || 1, c = t.offsetHeight > 0 && qe(o.height) / t.offsetHeight || 1);
  const h = Oe(t) ? _e(t) : window, m = !Tn() && n, d = (o.left + (m && (i = (s = h.visualViewport) == null ? void 0 : s.offsetLeft) != null ? i : 0)) / a, p = (o.top + (m && (l = (r = h.visualViewport) == null ? void 0 : r.offsetTop) != null ? l : 0)) / c, g = o.width / a, b = o.height / c;
  return {
    width: g,
    height: b,
    top: p,
    right: d + g,
    bottom: p + b,
    left: d,
    x: d,
    y: p
  };
}
function we(t) {
  return ((Ss(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function Ke(t) {
  return Oe(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function On(t) {
  return Me(we(t)).left + Ke(t).scrollLeft;
}
function Cs(t) {
  const e = Me(t);
  return qe(e.width) !== t.offsetWidth || qe(e.height) !== t.offsetHeight;
}
function Ps(t, e, n) {
  const i = de(e), s = we(e), l = Me(t, i && Cs(e), n === "fixed");
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const o = {
    x: 0,
    y: 0
  };
  if (i || !i && n !== "fixed")
    if ((ge(e) !== "body" || Ye(s)) && (r = Ke(e)), de(e)) {
      const a = Me(e, !0);
      o.x = a.x + e.clientLeft, o.y = a.y + e.clientTop;
    } else
      s && (o.x = On(s));
  return {
    x: l.left + r.scrollLeft - o.x,
    y: l.top + r.scrollTop - o.y,
    width: l.width,
    height: l.height
  };
}
function Rn(t) {
  return ge(t) === "html" ? t : t.assignedSlot || t.parentNode || (dt(t) ? t.host : null) || we(t);
}
function Jt(t) {
  return !de(t) || getComputedStyle(t).position === "fixed" ? null : t.offsetParent;
}
function Ts(t) {
  let e = Rn(t);
  for (dt(e) && (e = e.host); de(e) && !["html", "body"].includes(ge(e)); ) {
    if (Pn(e))
      return e;
    e = e.parentNode;
  }
  return null;
}
function st(t) {
  const e = _e(t);
  let n = Jt(t);
  for (; n && As(n) && getComputedStyle(n).position === "static"; )
    n = Jt(n);
  return n && (ge(n) === "html" || ge(n) === "body" && getComputedStyle(n).position === "static" && !Pn(n)) ? e : n || Ts(t) || e;
}
function Qt(t) {
  if (de(t))
    return {
      width: t.offsetWidth,
      height: t.offsetHeight
    };
  const e = Me(t);
  return {
    width: e.width,
    height: e.height
  };
}
function Os(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: i
  } = t;
  const s = de(n), l = we(n);
  if (n === l)
    return e;
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const o = {
    x: 0,
    y: 0
  };
  if ((s || !s && i !== "fixed") && ((ge(n) !== "body" || Ye(l)) && (r = Ke(n)), de(n))) {
    const a = Me(n, !0);
    o.x = a.x + n.clientLeft, o.y = a.y + n.clientTop;
  }
  return {
    ...e,
    x: e.x - r.scrollLeft + o.x,
    y: e.y - r.scrollTop + o.y
  };
}
function Rs(t, e) {
  const n = _e(t), i = we(t), s = n.visualViewport;
  let l = i.clientWidth, r = i.clientHeight, o = 0, a = 0;
  if (s) {
    l = s.width, r = s.height;
    const c = Tn();
    (c || !c && e === "fixed") && (o = s.offsetLeft, a = s.offsetTop);
  }
  return {
    width: l,
    height: r,
    x: o,
    y: a
  };
}
function Vs(t) {
  var e;
  const n = we(t), i = Ke(t), s = (e = t.ownerDocument) == null ? void 0 : e.body, l = Fe(n.scrollWidth, n.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0), r = Fe(n.scrollHeight, n.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0);
  let o = -i.scrollLeft + On(t);
  const a = -i.scrollTop;
  return je(s || n).direction === "rtl" && (o += Fe(n.clientWidth, s ? s.clientWidth : 0) - l), {
    width: l,
    height: r,
    x: o,
    y: a
  };
}
function Vn(t) {
  const e = Rn(t);
  return ["html", "body", "#document"].includes(ge(e)) ? t.ownerDocument.body : de(e) && Ye(e) ? e : Vn(e);
}
function Ln(t, e) {
  var n;
  e === void 0 && (e = []);
  const i = Vn(t), s = i === ((n = t.ownerDocument) == null ? void 0 : n.body), l = _e(i), r = s ? [l].concat(l.visualViewport || [], Ye(i) ? i : []) : i, o = e.concat(r);
  return s ? o : o.concat(Ln(r));
}
function Ls(t, e) {
  const n = e.getRootNode == null ? void 0 : e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && dt(n)) {
    let i = e;
    do {
      if (i && t === i)
        return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
function xs(t, e) {
  const n = Me(t, !1, e === "fixed"), i = n.top + t.clientTop, s = n.left + t.clientLeft;
  return {
    top: i,
    left: s,
    x: s,
    y: i,
    right: s + t.clientWidth,
    bottom: i + t.clientHeight,
    width: t.clientWidth,
    height: t.clientHeight
  };
}
function $t(t, e, n) {
  return e === "viewport" ? Be(Rs(t, n)) : Oe(e) ? xs(e, n) : Be(Vs(we(t)));
}
function Is(t) {
  const e = Ln(t), i = ["absolute", "fixed"].includes(je(t).position) && de(t) ? st(t) : t;
  return Oe(i) ? e.filter((s) => Oe(s) && Ls(s, i) && ge(s) !== "body") : [];
}
function Fs(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: i,
    strategy: s
  } = t;
  const r = [...n === "clippingAncestors" ? Is(e) : [].concat(n), i], o = r[0], a = r.reduce((c, h) => {
    const m = $t(e, h, s);
    return c.top = Fe(m.top, c.top), c.right = Gt(m.right, c.right), c.bottom = Gt(m.bottom, c.bottom), c.left = Fe(m.left, c.left), c;
  }, $t(e, o, s));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
const Ns = {
  getClippingRect: Fs,
  convertOffsetParentRelativeRectToViewportRelativeRect: Os,
  isElement: Oe,
  getDimensions: Qt,
  getOffsetParent: st,
  getDocumentElement: we,
  getElementRects: (t) => {
    let {
      reference: e,
      floating: n,
      strategy: i
    } = t;
    return {
      reference: Ps(e, st(n), i),
      floating: {
        ...Qt(n),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => je(t).direction === "rtl"
}, Hs = (t, e, n) => fs(t, e, {
  platform: Ns,
  ...n
});
function js(t) {
  let e, n, i, s, l, r, o;
  return {
    c() {
      e = A("div"), n = A("slot"), i = D(), s = A("div"), l = X(t[0]), this.c = E, f(s, "role", "tooltip"), f(s, "class", `
      absolute
      top-0
      left-0
      bg-white
      text-black
      text-left
      text-xs
      p-3
      border
      z-10
    `), ue(s, "transform", "translate(" + t[4] + "px, " + t[5] + "px)"), Y(s, "invisible", t[3]), f(e, "class", "relative"), f(e, "aria-describedby", "tooltip");
    },
    m(a, c) {
      C(a, e, c), v(e, n), v(e, i), v(e, s), v(s, l), t[9](s), t[10](e), r || (o = [
        Z(e, "mouseenter", t[6]),
        Z(e, "mouseleave", t[7])
      ], r = !0);
    },
    p(a, [c]) {
      c & 1 && K(l, a[0]), c & 48 && ue(s, "transform", "translate(" + a[4] + "px, " + a[5] + "px)"), c & 8 && Y(s, "invisible", a[3]);
    },
    i: E,
    o: E,
    d(a) {
      a && N(e), t[9](null), t[10](null), r = !1, pe(o);
    }
  };
}
function zs(t, e, n) {
  let { text: i = "" } = e, { location: s = "top" } = e, l, r, o = !0, a = 0, c = 0;
  const h = async () => {
    const b = await Hs(l, r, {
      placement: s,
      middleware: [ys(), Ms({ padding: 5 }), ks(10)]
    });
    n(4, a = b.x), n(5, c = b.y);
  }, m = async () => {
    await h(), n(3, o = !1);
  }, d = () => {
    n(3, o = !0);
  };
  se();
  function p(b) {
    oe[b ? "unshift" : "push"](() => {
      r = b, n(2, r);
    });
  }
  function g(b) {
    oe[b ? "unshift" : "push"](() => {
      l = b, n(1, l);
    });
  }
  return t.$$set = (b) => {
    "text" in b && n(0, i = b.text), "location" in b && n(8, s = b.location);
  }, [
    i,
    l,
    r,
    o,
    a,
    c,
    m,
    d,
    s,
    p,
    g
  ];
}
class xn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, zs, js, ie, { text: 0, location: 8 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), S()));
  }
  static get observedAttributes() {
    return ["text", "location"];
  }
  get text() {
    return this.$$.ctx[0];
  }
  set text(e) {
    this.$$set({ text: e }), S();
  }
  get location() {
    return this.$$.ctx[8];
  }
  set location(e) {
    this.$$set({ location: e }), S();
  }
}
customElements.define("v-tooltip", xn);
const Ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xn
}, Symbol.toStringTag, { value: "Module" }));
function Ws(t) {
  let e;
  return {
    c() {
      e = A("tr"), e.innerHTML = "<slot></slot>", this.c = E, f(e, "class", "border-b");
    },
    m(n, i) {
      C(n, e, i);
    },
    p: E,
    i: E,
    o: E,
    d(n) {
      n && N(e);
    }
  };
}
function Bs(t) {
  return se(), [];
}
class In extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Bs, Ws, ie, {}, null), e && e.target && C(e.target, this, e.anchor);
  }
}
customElements.define("v-tr", In);
const Zs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: In
}, Symbol.toStringTag, { value: "Module" }));
