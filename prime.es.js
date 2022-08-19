(function() {
  const t = /* @__PURE__ */ new WeakMap(), e = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), b = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), p = /* @__PURE__ */ new WeakMap(), m = { attributes: !0, attributeFilter: ["disabled"] }, y = new MutationObserver((k) => {
    for (const u of k) {
      const v = u.target;
      if (v.constructor.formAssociated) {
        const V = v.hasAttribute("disabled");
        v.toggleAttribute("internals-disabled", V), V ? v.setAttribute("aria-disabled", "true") : v.removeAttribute("aria-disabled"), v.formDisabledCallback && v.formDisabledCallback.apply(v, [V]);
      }
    }
  }), g = (k) => {
    n.get(k).forEach((v) => {
      v.remove();
    }), n.set(k, []);
  }, R = (k, u) => {
    const v = document.createElement("input");
    return v.type = "hidden", v.name = k.getAttribute("name"), k.after(v), n.get(u).push(v), v;
  }, L = (k, u) => {
    n.set(u, []);
    const v = k.hasAttribute("disabled");
    k.toggleAttribute("internals-disabled", v), y.observe(k, m);
  }, P = (k, u) => {
    if (u.length) {
      Array.from(u).forEach((V) => V.addEventListener("click", k.focus.bind(k)));
      let v = u[0].id;
      u[0].id || (v = `${u[0].htmlFor}_Label`, u[0].id = v), k.setAttribute("aria-labelledby", v);
    }
  }, x = (k) => {
    const u = Array.from(k.elements).filter((U) => U.validity).map((U) => U.validity.valid), v = l.get(k) || [], V = Array.from(v).filter((U) => U.isConnected).map((U) => r.get(U).validity.valid), X = [...u, ...V].includes(!1);
    k.toggleAttribute("internals-invalid", X), k.toggleAttribute("internals-valid", !X);
  }, T = (k) => {
    x(N(k.target));
  }, C = (k) => {
    x(N(k.target));
  }, j = (k) => {
    const u = k.target, v = l.get(u);
    u.noValidate || v.size && (Array.from(v).reverse().map((U) => r.get(U).reportValidity()).includes(!1) ? (k.stopImmediatePropagation(), k.stopPropagation(), k.preventDefault()) : p.get(u) && p.get(u).call(u, k) === !1 && k.preventDefault());
  }, z = (k) => {
    const u = l.get(k.target);
    u && u.size && u.forEach((v) => {
      v.constructor.formAssociated && v.formResetCallback && v.formResetCallback.apply(v);
    });
  }, w = (k, u, v) => {
    if (u) {
      u.onsubmit && (p.set(u, u.onsubmit.bind(u)), u.onsubmit = null);
      const V = l.get(u);
      if (V)
        V.add(k);
      else {
        const X = /* @__PURE__ */ new Set();
        X.add(k), l.set(u, X), u.addEventListener("submit", j), u.addEventListener("reset", z), u.addEventListener("input", T), u.addEventListener("change", C);
      }
      s.set(u, { ref: k, internals: v }), k.constructor.formAssociated && k.formAssociatedCallback && setTimeout(() => {
        k.formAssociatedCallback.apply(k, [u]);
      }, 0), x(u);
    }
  }, N = (k) => {
    let u = k.parentNode;
    return u && u.tagName !== "FORM" && (u = N(u)), u;
  }, H = (k, u, v = DOMException) => {
    if (!k.constructor.formAssociated)
      throw new v(u);
  }, ne = (k, u, v) => {
    const V = l.get(k);
    return V && V.size && V.forEach((X) => {
      r.get(X)[v]() || (u = !1);
    }), u;
  }, F = (k) => {
    if (k.constructor.formAssociated) {
      const u = r.get(k), { labels: v, form: V } = u;
      P(k, v), w(k, V, u);
    }
  }, Y = {
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
  }, fe = (k, u) => {
    for (let v in Y) {
      u[v] = null;
      let V = null;
      const X = Y[v];
      Object.defineProperty(u, v, {
        get() {
          return V;
        },
        set(U) {
          V = U, k.isConnected ? k.setAttribute(X, U) : c.set(k, u);
        }
      });
    }
  };
  class de {
    constructor() {
      this.badInput = !1, this.customError = !1, this.patternMismatch = !1, this.rangeOverflow = !1, this.rangeUnderflow = !1, this.stepMismatch = !1, this.tooLong = !1, this.tooShort = !1, this.typeMismatch = !1, this.valid = !0, this.valueMissing = !1, Object.seal(this);
    }
  }
  const pe = (k) => (k.badInput = !1, k.customError = !1, k.patternMismatch = !1, k.rangeOverflow = !1, k.rangeUnderflow = !1, k.stepMismatch = !1, k.tooLong = !1, k.tooShort = !1, k.typeMismatch = !1, k.valid = !0, k.valueMissing = !1, k), ke = (k, u, v) => (k.valid = xe(u), Object.keys(u).forEach((V) => k[V] = u[V]), v && x(v), k), xe = (k) => {
    let u = !0;
    for (let v in k)
      v !== "valid" && k[v] !== !1 && (u = !1);
    return u;
  };
  function ge(k) {
    const u = r.get(k), { form: v } = u;
    w(k, v, u), P(k, u.labels);
  }
  function we(k) {
    k.forEach((u) => {
      const { addedNodes: v, removedNodes: V } = u, X = Array.from(v), U = Array.from(V);
      X.forEach((Z) => {
        if (r.has(Z) && Z.constructor.formAssociated && ge(Z), c.has(Z)) {
          const le = c.get(Z);
          Object.keys(Y).filter((ce) => le[ce] !== null).forEach((ce) => {
            Z.setAttribute(Y[ce], le[ce]);
          }), c.delete(Z);
        }
        if (Z.localName === "form") {
          const le = l.get(Z), se = document.createTreeWalker(Z, NodeFilter.SHOW_ELEMENT, {
            acceptNode(S) {
              return r.has(S) && !le?.has(S) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
          });
          let ce = se.nextNode();
          for (; ce; )
            ge(ce), ce = se.nextNode();
        }
      }), U.forEach((Z) => {
        const le = r.get(Z);
        le && n.get(le) && g(le), o.has(Z) && o.get(Z).disconnect();
      });
    });
  }
  function De(k) {
    k.forEach((u) => {
      const { removedNodes: v } = u;
      v.forEach((V) => {
        const X = f.get(u.target);
        r.has(V) && F(V), X.disconnect();
      });
    });
  }
  const He = (k) => {
    const u = new MutationObserver(De);
    u.observe(k, { childList: !0 }), f.set(k, u);
  };
  new MutationObserver(we);
  const Oe = {
    childList: !0,
    subtree: !0
  }, Re = /* @__PURE__ */ new WeakMap();
  class ye extends Set {
    static get isPolyfilled() {
      return !0;
    }
    constructor(u) {
      if (super(), !u || !u.tagName || u.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      Re.set(this, u);
    }
    add(u) {
      if (!/^--/.test(u) || typeof u != "string")
        throw new DOMException(`Failed to execute 'add' on 'CustomStateSet': The specified value ${u} must start with '--'.`);
      const v = super.add(u), V = Re.get(this);
      return V.toggleAttribute(`state${u}`, !0), V.part && V.part.add(`state${u}`), v;
    }
    clear() {
      for (let [u] of this.entries())
        this.delete(u);
      super.clear();
    }
    delete(u) {
      const v = super.delete(u), V = Re.get(this);
      return V.toggleAttribute(`state${u}`, !1), V.part && V.part.remove(`state${u}`), v;
    }
  }
  class je {
    constructor(u) {
      if (!u || !u.tagName || u.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      const v = u.getRootNode(), V = new de();
      this.states = new ye(u), t.set(this, u), e.set(this, V), r.set(u, this), fe(u, this), L(u, this), Object.seal(this), F(u), v instanceof DocumentFragment && He(v);
    }
    static get isPolyfilled() {
      return !0;
    }
    checkValidity() {
      const u = t.get(this);
      if (H(u, "Failed to execute 'checkValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const v = e.get(this);
      if (!v.valid) {
        const V = new Event("invalid", {
          bubbles: !1,
          cancelable: !0,
          composed: !1
        });
        u.dispatchEvent(V);
      }
      return v.valid;
    }
    get form() {
      const u = t.get(this);
      H(u, "Failed to read the 'form' property from 'ElementInternals': The target element is not a form-associated custom element.");
      let v;
      return u.constructor.formAssociated === !0 && (v = N(u)), v;
    }
    get labels() {
      const u = t.get(this);
      H(u, "Failed to read the 'labels' property from 'ElementInternals': The target element is not a form-associated custom element.");
      const v = u.getAttribute("id"), V = u.getRootNode();
      return V && v ? V.querySelectorAll(`[for=${v}]`) : [];
    }
    reportValidity() {
      const u = t.get(this);
      if (H(u, "Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const v = this.checkValidity(), V = b.get(this);
      if (V && !u.constructor.formAssociated)
        throw new DOMException("Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element.");
      return !v && V && (u.focus(), V.focus()), v;
    }
    setFormValue(u) {
      const v = t.get(this);
      if (H(v, "Failed to execute 'setFormValue' on 'ElementInternals': The target element is not a form-associated custom element."), g(this), u != null && !(u instanceof FormData)) {
        if (v.getAttribute("name")) {
          const V = R(v, this);
          V.value = u;
        }
      } else
        u != null && u instanceof FormData && Array.from(u).reverse().forEach(([V, X]) => {
          if (typeof X == "string") {
            const U = R(v, this);
            U.name = V, U.value = X;
          }
        });
      a.set(v, u);
    }
    setValidity(u, v, V) {
      const X = t.get(this);
      if (H(X, "Failed to execute 'setValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !u)
        throw new TypeError("Failed to execute 'setValidity' on 'ElementInternals': 1 argument required, but only 0 present.");
      b.set(this, V);
      const U = e.get(this), Z = {};
      for (const ce in u)
        Z[ce] = u[ce];
      Object.keys(Z).length === 0 && pe(U);
      const le = { ...U, ...Z };
      delete le.valid;
      const { valid: se } = ke(U, le, this.form);
      if (!se && !v)
        throw new DOMException("Failed to execute 'setValidity' on 'ElementInternals': The second argument should not be empty if one or more flags in the first argument are true.");
      i.set(this, se ? "" : v), X.toggleAttribute("internals-invalid", !se), X.toggleAttribute("internals-valid", se), X.setAttribute("aria-invalid", `${!se}`);
    }
    get shadowRoot() {
      const u = t.get(this), v = d.get(u);
      return v || null;
    }
    get validationMessage() {
      const u = t.get(this);
      return H(u, "Failed to read the 'validationMessage' property from 'ElementInternals': The target element is not a form-associated custom element."), i.get(this);
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
  function We() {
    if (!window.ElementInternals)
      return !1;
    class k extends HTMLElement {
      constructor() {
        super(), this.internals = this.attachInternals();
      }
    }
    const u = `element-internals-feature-detection-${Math.random().toString(36).replace(/[^a-z]+/g, "")}`;
    customElements.define(u, k);
    const v = new k();
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
    ].every((V) => V in v.internals);
  }
  if (We()) {
    if (!window.CustomStateSet) {
      window.CustomStateSet = ye;
      const k = HTMLElement.prototype.attachInternals;
      HTMLElement.prototype.attachInternals = function(...u) {
        const v = k.call(this, u);
        return v.states = new ye(this), v;
      };
    }
  } else {
    let k = function(...le) {
      const se = V.apply(this, le), ce = new MutationObserver(we);
      return d.set(this, se), window.ShadyDOM ? ce.observe(this, Oe) : ce.observe(se, Oe), o.set(this, ce), se;
    }, u = function(...le) {
      let se = U.apply(this, le);
      return ne(this, se, "checkValidity");
    }, v = function(...le) {
      let se = Z.apply(this, le);
      return ne(this, se, "reportValidity");
    };
    var ft = k, dt = u, Qe = v;
    window.ElementInternals = je, HTMLElement.prototype.attachInternals = function() {
      if (this.tagName.indexOf("-") === -1)
        throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': Unable to attach ElementInternals to non-custom elements.");
      if (r.has(this))
        throw new DOMException("DOMException: Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");
      return new je(this);
    };
    const V = Element.prototype.attachShadow;
    Element.prototype.attachShadow = k, new MutationObserver(we).observe(document.documentElement, Oe);
    const U = HTMLFormElement.prototype.checkValidity;
    HTMLFormElement.prototype.checkValidity = u;
    const Z = HTMLFormElement.prototype.reportValidity;
    HTMLFormElement.prototype.reportValidity = v, window.CustomStateSet || (window.CustomStateSet = ye);
  }
})();
function A() {
}
function vt(t) {
  return t();
}
function Mt() {
  return /* @__PURE__ */ Object.create(null);
}
function me(t) {
  t.forEach(vt);
}
function _t(t) {
  return typeof t == "function";
}
function An(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function ie(t, e) {
  return t != t ? e == e : t !== e;
}
function mr(t) {
  return Object.keys(t).length === 0;
}
function pr(t, ...e) {
  if (t == null)
    return A;
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const On = typeof window < "u";
let St = On ? () => window.performance.now() : () => Date.now(), Rn = On ? (t) => requestAnimationFrame(t) : A;
const Ve = /* @__PURE__ */ new Set();
function Tn(t) {
  Ve.forEach((e) => {
    e.c(t) || (Ve.delete(e), e.f());
  }), Ve.size !== 0 && Rn(Tn);
}
function gr(t) {
  let e;
  return Ve.size === 0 && Rn(Tn), {
    promise: new Promise((n) => {
      Ve.add(e = { c: t, f: n });
    }),
    abort() {
      Ve.delete(e);
    }
  };
}
function _(t, e) {
  t.appendChild(e);
}
function O(t, e, n) {
  t.insertBefore(e, n || null);
}
function I(t) {
  t.parentNode.removeChild(t);
}
function lt(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function E(t) {
  return document.createElement(t);
}
function Te(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function q(t) {
  return document.createTextNode(t);
}
function B() {
  return q(" ");
}
function kt() {
  return q("");
}
function W(t, e, n, r) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function Ue(t) {
  return function(e) {
    return e.preventDefault(), t.call(this, e);
  };
}
function nt(t) {
  return function(e) {
    return e.stopPropagation(), t.call(this, e);
  };
}
function h(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function he(t, e, n) {
  e in t ? t[e] = typeof t[e] == "boolean" && n === "" ? !0 : n : h(t, e, n);
}
function wr(t) {
  return Array.from(t.childNodes);
}
function J(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function be(t, e, n, r) {
  n === null ? t.style.removeProperty(e) : t.style.setProperty(e, n, r ? "important" : "");
}
function $(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
function ee(t) {
  const e = {};
  for (const n of t)
    e[n.name] = n.value;
  return e;
}
let qe;
function Ye(t) {
  qe = t;
}
function Fe() {
  if (!qe)
    throw new Error("Function called outside component initialization");
  return qe;
}
function yr(t) {
  Fe().$$.on_mount.push(t);
}
function vr(t) {
  Fe().$$.on_destroy.push(t);
}
function ht(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach((r) => r.call(this, e));
}
const Be = [], ue = [], tt = [], Ct = [], _r = Promise.resolve();
let mt = !1;
function kr() {
  mt || (mt = !0, _r.then(M));
}
function pt(t) {
  tt.push(t);
}
const bt = /* @__PURE__ */ new Set();
let $e = 0;
function M() {
  const t = qe;
  do {
    for (; $e < Be.length; ) {
      const e = Be[$e];
      $e++, Ye(e), xr(e.$$);
    }
    for (Ye(null), Be.length = 0, $e = 0; ue.length; )
      ue.pop()();
    for (let e = 0; e < tt.length; e += 1) {
      const n = tt[e];
      bt.has(n) || (bt.add(n), n());
    }
    tt.length = 0;
  } while (Be.length);
  for (; Ct.length; )
    Ct.pop()();
  mt = !1, bt.clear(), Ye(t);
}
function xr(t) {
  if (t.fragment !== null) {
    t.update(), me(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(pt);
  }
}
const Er = /* @__PURE__ */ new Set();
function Pn(t, e) {
  t && t.i && (Er.delete(t), t.i(e));
}
function Ke(t, e) {
  t.d(1), e.delete(t.key);
}
function Je(t, e, n, r, i, s, o, l, a, c, d, b) {
  let f = t.length, p = s.length, m = f;
  const y = {};
  for (; m--; )
    y[t[m].key] = m;
  const g = [], R = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Map();
  for (m = p; m--; ) {
    const C = b(i, s, m), j = n(C);
    let z = o.get(j);
    z ? r && z.p(C, e) : (z = c(j, C), z.c()), R.set(j, g[m] = z), j in y && L.set(j, Math.abs(m - y[j]));
  }
  const P = /* @__PURE__ */ new Set(), x = /* @__PURE__ */ new Set();
  function T(C) {
    Pn(C, 1), C.m(l, d), o.set(C.key, C), d = C.first, p--;
  }
  for (; f && p; ) {
    const C = g[p - 1], j = t[f - 1], z = C.key, w = j.key;
    C === j ? (d = C.first, f--, p--) : R.has(w) ? !o.has(z) || P.has(z) ? T(C) : x.has(w) ? f-- : L.get(z) > L.get(w) ? (x.add(z), T(C)) : (P.add(w), f--) : (a(j, o), f--);
  }
  for (; f--; ) {
    const C = t[f];
    R.has(C.key) || a(C, o);
  }
  for (; p; )
    T(g[p - 1]);
  return g;
}
function Mr(t, e, n, r) {
  const { fragment: i, on_mount: s, on_destroy: o, after_update: l } = t.$$;
  i && i.m(e, n), r || pt(() => {
    const a = s.map(vt).filter(_t);
    o ? o.push(...a) : me(a), t.$$.on_mount = [];
  }), l.forEach(pt);
}
function Sr(t, e) {
  const n = t.$$;
  n.fragment !== null && (me(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Cr(t, e) {
  t.$$.dirty[0] === -1 && (Be.push(t), kr(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function te(t, e, n, r, i, s, o, l = [-1]) {
  const a = qe;
  Ye(t);
  const c = t.$$ = {
    fragment: null,
    ctx: null,
    props: s,
    update: A,
    not_equal: i,
    bound: Mt(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (a ? a.$$.context : [])),
    callbacks: Mt(),
    dirty: l,
    skip_bound: !1,
    root: e.target || a.$$.root
  };
  o && o(c.root);
  let d = !1;
  if (c.ctx = n ? n(t, e.props || {}, (b, f, ...p) => {
    const m = p.length ? p[0] : f;
    return c.ctx && i(c.ctx[b], c.ctx[b] = m) && (!c.skip_bound && c.bound[b] && c.bound[b](m), d && Cr(t, b)), f;
  }) : [], c.update(), d = !0, me(c.before_update), c.fragment = r ? r(c.ctx) : !1, e.target) {
    if (e.hydrate) {
      const b = wr(e.target);
      c.fragment && c.fragment.l(b), b.forEach(I);
    } else
      c.fragment && c.fragment.c();
    e.intro && Pn(t.$$.fragment), Mr(t, e.target, e.anchor, e.customElement), M();
  }
  Ye(a);
}
let Q;
typeof HTMLElement == "function" && (Q = class extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const { on_mount: t } = this.$$;
    this.$$.on_disconnect = t.map(vt).filter(_t);
    for (const e in this.$$.slotted)
      this.appendChild(this.$$.slotted[e]);
  }
  attributeChangedCallback(t, e, n) {
    this[t] = n;
  }
  disconnectedCallback() {
    me(this.$$.on_disconnect);
  }
  $destroy() {
    Sr(this, 1), this.$destroy = A;
  }
  $on(t, e) {
    const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return n.push(e), () => {
      const r = n.indexOf(e);
      r !== -1 && n.splice(r, 1);
    };
  }
  $set(t) {
    this.$$set && !mr(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
});
const jn = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.invisible{visibility:hidden}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.left-0{left:0}.right-0{right:0}.top-1{top:.25rem}.bottom-auto{bottom:auto}.bottom-1{bottom:.25rem}.left-1\\/2{left:50%}.bottom-full{bottom:100%}.-top-0\\.5{top:-.125rem}.-top-0{top:-0px}.top-\\[calc\\(50\\%-9px\\)\\]{top:calc(50% - 9px)}.top-0{top:0}.right-0\\.5{right:.125rem}.bottom-0{bottom:0}.isolate{isolation:isolate}.z-10{z-index:10}.z-\\[2\\]{z-index:2}.z-\\[1\\]{z-index:1}.mx-auto{margin-left:auto;margin-right:auto}.-mt-px{margin-top:-1px}.-mt-0\\.5{margin-top:-.125rem}.-mt-0{margin-top:-0px}.mt-1{margin-top:.25rem}.mt-7{margin-top:1.75rem}.mb-3{margin-bottom:.75rem}.mt-px{margin-top:1px}.ml-px{margin-left:1px}.-mb-px{margin-bottom:-1px}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.hidden{display:none}.h-\\[60\\%\\]{height:60%}.h-full{height:100%}.h-0\\.5{height:.125rem}.h-0{height:0px}.h-5{height:1.25rem}.h-1{height:.25rem}.h-2{height:.5rem}.h-\\[4px\\]{height:4px}.h-4{height:1rem}.max-h-0{max-height:0px}.max-h-fit{max-height:fit-content}.max-h-36{max-height:9rem}.w-px{width:1px}.w-full{width:100%}.w-5{width:1.25rem}.w-\\[1px\\]{width:1px}.w-11{width:2.75rem}.w-4{width:1rem}.max-w-\\[14rem\\]{max-width:14rem}.flex-shrink-0{flex-shrink:0}.grow{flex-grow:1}.table-fixed{table-layout:fixed}.-translate-x-1\\/2{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\.5{--tw-translate-y: -.375rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1{--tw-translate-y: -.25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-1\\/2{--tw-translate-x: 50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-0{--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-6{--tw-translate-x: 1.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-rotate-\\[30deg\\]{--tw-rotate: -30deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-\\[30deg\\]{--tw-rotate: 30deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-180{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.cursor-not-allowed{cursor:not-allowed}.select-none{user-select:none}.appearance-none{appearance:none}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.place-content-center{place-content:center}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-3{gap:.75rem}.gap-2{gap:.5rem}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.text-ellipsis{text-overflow:ellipsis}.whitespace-nowrap{white-space:nowrap}.rounded-full{border-radius:9999px}.rounded-xl{border-radius:.75rem}.border{border-width:1px}.border-0{border-width:0px}.border-y{border-top-width:1px;border-bottom-width:1px}.border-l{border-left-width:1px}.border-l-4{border-left-width:4px}.border-b{border-bottom-width:1px}.border-r{border-right-width:1px}.border-black{--tw-border-opacity: 1;border-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-red\\/90{--tw-border-opacity: 1;border-color:rgb(190 48 38 / var(--tw-border-opacity))}.border-orange\\/90{--tw-border-opacity: 1;border-color:rgb(255 153 0 / var(--tw-border-opacity))}.border-green\\/90{--tw-border-opacity: 1;border-color:rgb(57 127 72 / var(--tw-border-opacity))}.border-blue\\/90{--tw-border-opacity: 1;border-color:rgb(4 86 129 / var(--tw-border-opacity))}.border-black\\/70{--tw-border-opacity: 1;border-color:rgb(85 85 85 / var(--tw-border-opacity))}.border-green\\/100{--tw-border-opacity: 1;border-color:rgb(41 91 51 / var(--tw-border-opacity))}.border-white{--tw-border-opacity: 1;border-color:rgb(255 255 255 / var(--tw-border-opacity))}.border-x-black{--tw-border-opacity: 1;border-left-color:rgb(0 0 0 / var(--tw-border-opacity));border-right-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-b-black{--tw-border-opacity: 1;border-bottom-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-t-black{--tw-border-opacity: 1;border-top-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-b-white{--tw-border-opacity: 1;border-bottom-color:rgb(255 255 255 / var(--tw-border-opacity))}.border-l-gray-300{--tw-border-opacity: 1;border-left-color:rgb(209 213 219 / var(--tw-border-opacity))}.border-r-gray-300{--tw-border-opacity: 1;border-right-color:rgb(209 213 219 / var(--tw-border-opacity))}.bg-green-200{--tw-bg-opacity: 1;background-color:rgb(187 247 208 / var(--tw-bg-opacity))}.bg-orange-200{--tw-bg-opacity: 1;background-color:rgb(254 215 170 / var(--tw-bg-opacity))}.bg-red-200{--tw-bg-opacity: 1;background-color:rgb(254 202 202 / var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}.bg-black\\/50{--tw-bg-opacity: 1;background-color:rgb(157 157 157 / var(--tw-bg-opacity))}.bg-gray-400{--tw-bg-opacity: 1;background-color:rgb(156 163 175 / var(--tw-bg-opacity))}.bg-green\\/80{--tw-bg-opacity: 1;background-color:rgb(73 162 92 / var(--tw-bg-opacity))}.bg-black\\/20{--tw-bg-opacity: 1;background-color:rgb(233 233 233 / var(--tw-bg-opacity))}.bg-red\\/90{--tw-bg-opacity: 1;background-color:rgb(190 48 38 / var(--tw-bg-opacity))}.bg-green\\/90{--tw-bg-opacity: 1;background-color:rgb(57 127 72 / var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-\\[\\#C4C4C4\\]{--tw-bg-opacity: 1;background-color:rgb(196 196 196 / var(--tw-bg-opacity))}.bg-slate-200{--tw-bg-opacity: 1;background-color:rgb(226 232 240 / var(--tw-bg-opacity))}.bg-yellow-100{--tw-bg-opacity: 1;background-color:rgb(254 249 195 / var(--tw-bg-opacity))}.p-3{padding:.75rem}.p-1{padding:.25rem}.p-2{padding:.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-0{padding-top:0;padding-bottom:0}.px-4{padding-left:1rem;padding-right:1rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-1\\.5{padding-left:.375rem;padding-right:.375rem}.px-1{padding-left:.25rem;padding-right:.25rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.pb-1{padding-bottom:.25rem}.pl-2\\.5{padding-left:.625rem}.pr-1{padding-right:.25rem}.pl-2{padding-left:.5rem}.text-left{text-align:left}.text-center{text-align:center}.text-xs{font-size:.75rem;line-height:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-base{font-size:1rem;line-height:1.5rem}.text-\\[15px\\]{font-size:15px}.text-\\[10px\\]{font-size:10px}.font-bold{font-weight:700}.font-normal{font-weight:400}.uppercase{text-transform:uppercase}.capitalize{text-transform:capitalize}.text-green-900{--tw-text-opacity: 1;color:rgb(20 83 45 / var(--tw-text-opacity))}.text-orange-900{--tw-text-opacity: 1;color:rgb(124 45 18 / var(--tw-text-opacity))}.text-red-900{--tw-text-opacity: 1;color:rgb(127 29 29 / var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity))}.text-black{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-black\\/70{--tw-text-opacity: 1;color:rgb(85 85 85 / var(--tw-text-opacity))}.text-red\\/90{--tw-text-opacity: 1;color:rgb(190 48 38 / var(--tw-text-opacity))}.text-neutral-600{--tw-text-opacity: 1;color:rgb(82 82 82 / var(--tw-text-opacity))}.opacity-50{opacity:.5}.opacity-0{opacity:0}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.outline-none{outline:2px solid transparent;outline-offset:2px}.ring-0{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.blur{--tw-blur: blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.drop-shadow-md{--tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / .07)) drop-shadow(0 2px 2px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-200{transition-duration:.2s}.duration-500{transition-duration:.5s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}*,input,button{font-family:Space Mono,monospace}:host{display:contents}:host([hidden]){display:none}[class^=icon-],[class*=" icon-"]{font-family:icons!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-error-outline:before{content:"\\e912"}.icon-warning:before{content:"\\e916"}.icon-disconnected:before{content:"\\e919"}.icon-send:before{content:"\\e91b"}.icon-undo:before{content:"\\e91c"}.icon-connected:before{content:"\\e91a"}.icon-download:before{content:"\\e913"}.icon-camera:before{content:"\\e914"}.icon-center:before{content:"\\e915"}.icon-arrow-up:before{content:"\\e917"}.icon-settings:before{content:"\\e918"}.icon-refresh:before{content:"\\e911"}.icon-info-outline:before{content:"\\e910"}.icon-pause-circle-filled:before{content:"\\e90e"}.icon-play-circle-filled:before{content:"\\e90f"}.icon-logout:before{content:"\\e900"}.icon-instagram:before{content:"\\e901"}.icon-social-medium:before{content:"\\e906"}.icon-copy:before{content:"\\e907"}.icon-save:before{content:"\\e909"}.icon-edit:before{content:"\\e90a";color:#555}.icon-stop-circle:before{content:"\\e903"}.icon-twitter:before{content:"\\e902"}.icon-linkedin:before{content:"\\e90b"}.icon-trash:before{content:"\\e905"}.icon-alert:before{content:"\\e904"}.icon-ask:before{content:"\\e908"}.icon-x:before{content:"\\e942"}.icon-chevron-down:before{content:"\\e90c"}.icon-checkmark:before{content:"\\e90d"}.first\\:ml-4:first-child{margin-left:1rem}.last\\:border-r:last-child{border-right-width:1px}.hover\\:bg-gray-300:hover{--tw-bg-opacity: 1;background-color:rgb(209 213 219 / var(--tw-bg-opacity))}.hover\\:bg-slate-200:hover{--tw-bg-opacity: 1;background-color:rgb(226 232 240 / var(--tw-bg-opacity))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}@media (prefers-reduced-motion: no-preference){.motion-safe\\:transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.motion-safe\\:transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}}
`;
let gt, zn = !1;
try {
  gt = new CSSStyleSheet(), gt.replaceSync(jn);
} catch {
  zn = !0;
}
const oe = () => {
  const t = Fe();
  if (zn) {
    const e = document.createElement("style");
    e.innerHTML = jn, t.shadowRoot.append(e);
  } else {
    const e = t.shadowRoot;
    e.adoptedStyleSheets = [gt];
  }
}, { base: At = "", query: Ot = "", workers: Wo = {} } = window.PRIME_CONFIG ?? {}, Ar = async () => {
  const t = new FontFace("icons", At ? `url(${At}/icons.woff2${Ot})` : `url(icons.woff2${Ot})`);
  await t.load(), document.fonts.add(t);
}, Or = "0.34.0", Le = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${Or}`, Ze = [], xt = (t, e) => `http://definitions/${t}-${e}.json`, Ln = (t = "") => t.split("/").pop(), Rr = (t, e) => {
  for (const n of Object.values(e.properties ?? []))
    n.type === "array" && n.items?.type ? n.description = `"array" of type "${n.items?.type}"` : n.type === "array" ? n.description = '"array" of type "object"' : n.description = `"${n.type}"`;
  return JSON.parse(JSON.stringify(e), (n, r) => {
    if (n === "$ref")
      return xt(t, Ln(r));
    if (n !== "$schema")
      return r;
  });
}, Tr = (t, e, n) => {
  const { $ref: r, definitions: i = {} } = e;
  for (const [s, o] of Object.entries(i))
    Ze.push({
      uri: xt(t, s),
      schema: Rr(t, o),
      ...Ln(r) === s ? { fileMatch: n } : void 0
    });
  window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: !0,
    schemas: Ze
  });
}, Pr = (t, e) => Ze.findIndex(({ uri: n }) => n === xt(t, e)), jr = (t, e) => {
  let n = !1;
  const { definitions: r = {} } = e;
  for (const i of Object.keys(r)) {
    const s = Pr(t, i);
    Ze.splice(s, 1), n = !0;
  }
  !n || window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: !0,
    schemas: Ze
  });
}, Rt = {
  addSchemas: Tr,
  removeSchemas: jr
}, ae = (t, e, n) => t.dispatchEvent(new CustomEvent(e, {
  composed: !0,
  bubbles: !0,
  detail: n
})), zr = /\s+|\r?\n|\r/g, Tt = (t) => t.replace(zr, "");
customElements.get("v-badge") ? console.warn("WARNING: Multiple instances of PRIME being imported.") : (Ar().catch((t) => console.error(t)), Promise.resolve().then(() => Ir), Promise.resolve().then(() => Dr), Promise.resolve().then(() => Xr), Promise.resolve().then(() => Jr), Promise.resolve().then(() => $r), Promise.resolve().then(() => ni), Promise.resolve().then(() => oi), Promise.resolve().then(() => ai), Promise.resolve().then(() => hi), Promise.resolve().then(() => vi), Promise.resolve().then(() => xi), Promise.resolve().then(() => ji), Promise.resolve().then(() => Ni), Promise.resolve().then(() => Hi), Promise.resolve().then(() => Yi), Promise.resolve().then(() => qi), Promise.resolve().then(() => Ji), Promise.resolve().then(() => $i), Promise.resolve().then(() => no), Promise.resolve().then(() => oo), Promise.resolve().then(() => No), Promise.resolve().then(() => Ho));
var Vn = { exports: {} };
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
(function(t) {
  (function() {
    var e = {}.hasOwnProperty;
    function n() {
      for (var r = [], i = 0; i < arguments.length; i++) {
        var s = arguments[i];
        if (!!s) {
          var o = typeof s;
          if (o === "string" || o === "number")
            r.push(s);
          else if (Array.isArray(s)) {
            if (s.length) {
              var l = n.apply(null, s);
              l && r.push(l);
            }
          } else if (o === "object")
            if (s.toString === Object.prototype.toString)
              for (var a in s)
                e.call(s, a) && s[a] && r.push(a);
            else
              r.push(s.toString());
        }
      }
      return r.join(" ");
    }
    t.exports ? (n.default = n, t.exports = n) : window.classNames = n;
  })();
})(Vn);
const D = Vn.exports;
function Lr(t) {
  let e, n, r;
  return {
    c() {
      e = E("small"), n = q(t[0]), this.c = A, h(e, "class", r = D("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": t[1] === "green",
        "text-orange-900 bg-orange-200": t[1] === "orange",
        "text-red-900 bg-red-200": t[1] === "red",
        "text-gray-800 bg-gray-200": t[1] === "gray"
      }));
    },
    m(i, s) {
      O(i, e, s), _(e, n);
    },
    p(i, [s]) {
      s & 1 && J(n, i[0]), s & 2 && r !== (r = D("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": i[1] === "green",
        "text-orange-900 bg-orange-200": i[1] === "orange",
        "text-red-900 bg-red-200": i[1] === "red",
        "text-gray-800 bg-gray-200": i[1] === "gray"
      })) && h(e, "class", r);
    },
    i: A,
    o: A,
    d(i) {
      i && I(e);
    }
  };
}
function Vr(t, e, n) {
  let { label: r = "" } = e, { variant: i = "gray" } = e;
  return oe(), t.$$set = (s) => {
    "label" in s && n(0, r = s.label), "variant" in s && n(1, i = s.variant);
  }, [r, i];
}
class In extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, Vr, Lr, ie, { label: 0, variant: 1 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return ["label", "variant"];
  }
  get label() {
    return this.$$.ctx[0];
  }
  set label(e) {
    this.$$set({ label: e }), M();
  }
  get variant() {
    return this.$$.ctx[1];
  }
  set variant(e) {
    this.$$set({ variant: e }), M();
  }
}
customElements.define("v-badge", In);
const Ir = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: In
}, Symbol.toStringTag, { value: "Module" }));
function Pt(t, e, n) {
  const r = t.slice();
  return r[2] = e[n], r[4] = n, r;
}
function jt(t) {
  let e;
  return {
    c() {
      e = E("div"), e.innerHTML = `<div class="w-px h-[60%] border-l border-black -rotate-[30deg] -mt-px"></div> 
        <div class="w-px h-[60%] border-l border-black rotate-[30deg] -mt-0.5"></div> 
      `;
    },
    m(n, r) {
      O(n, e, r);
    },
    d(n) {
      n && I(e);
    }
  };
}
function zt(t, e) {
  let n, r = e[2] + "", i, s, o, l = e[4] !== e[0].length - 1 && jt();
  return {
    key: t,
    first: null,
    c() {
      n = E("small"), i = q(r), s = B(), l && l.c(), o = kt(), h(n, "class", "py1"), this.first = n;
    },
    m(a, c) {
      O(a, n, c), _(n, i), O(a, s, c), l && l.m(a, c), O(a, o, c);
    },
    p(a, c) {
      e = a, c & 1 && r !== (r = e[2] + "") && J(i, r), e[4] !== e[0].length - 1 ? l || (l = jt(), l.c(), l.m(o.parentNode, o)) : l && (l.d(1), l = null);
    },
    d(a) {
      a && I(n), a && I(s), l && l.d(a), a && I(o);
    }
  };
}
function Nr(t) {
  let e, n = [], r = /* @__PURE__ */ new Map(), i = t[0];
  const s = (o) => o[2];
  for (let o = 0; o < i.length; o += 1) {
    let l = Pt(t, i, o), a = s(l);
    r.set(a, n[o] = zt(a, l));
  }
  return {
    c() {
      e = E("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
      this.c = A, h(e, "class", "inline-flex gap-3 px-4 border border-black rounded-full");
    },
    m(o, l) {
      O(o, e, l);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
    },
    p(o, [l]) {
      l & 1 && (i = o[0], n = Je(n, l, s, 1, o, i, r, e, Ke, zt, null, Pt));
    },
    i: A,
    o: A,
    d(o) {
      o && I(e);
      for (let l = 0; l < n.length; l += 1)
        n[l].d();
    }
  };
}
function Fr(t, e, n) {
  let { crumbs: r = "" } = e;
  oe();
  let i;
  return t.$$set = (s) => {
    "crumbs" in s && n(1, r = s.crumbs);
  }, t.$$.update = () => {
    t.$$.dirty & 2 && n(0, i = r.split(",").map((s) => s.trim()));
  }, [i, r];
}
class Nn extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, Fr, Nr, ie, { crumbs: 1 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return ["crumbs"];
  }
  get crumbs() {
    return this.$$.ctx[1];
  }
  set crumbs(e) {
    this.$$set({ crumbs: e }), M();
  }
}
customElements.define("v-breadcrumbs", Nn);
const Dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nn
}, Symbol.toStringTag, { value: "Module" })), Me = (t, e) => t === "" || t === "true" || t === e;
function Lt(t) {
  let e, n;
  return {
    c() {
      e = E("i"), h(e, "aria-hidden", ""), h(e, "class", n = "icon-" + t[3] + " text-base");
    },
    m(r, i) {
      O(r, e, i);
    },
    p(r, i) {
      i & 8 && n !== (n = "icon-" + r[3] + " text-base") && h(e, "class", n);
    },
    d(r) {
      r && I(e);
    }
  };
}
function Hr(t) {
  let e, n, r, i, s, o, l, a = t[3] && Lt(t);
  return {
    c() {
      e = E("button"), a && a.c(), n = B(), r = E("span"), i = q(t[2]), this.c = A, h(r, "class", "mx-auto"), h(e, "type", t[0]), h(e, "class", s = D("flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": t[4],
        "bg-white border-black": t[1] === "primary",
        "bg-black border-white text-white": t[1] === "inverse-primary",
        "bg-red/90 text-white border-red/90": t[1] === "danger",
        "bg-green/90 border-green/90 text-white": t[1] === "success",
        "bg-white border-red/90 text-red/90": t[1] === "outline-danger"
      }));
    },
    m(c, d) {
      O(c, e, d), a && a.m(e, null), _(e, n), _(e, r), _(r, i), o || (l = W(e, "click", t[5]), o = !0);
    },
    p(c, [d]) {
      c[3] ? a ? a.p(c, d) : (a = Lt(c), a.c(), a.m(e, n)) : a && (a.d(1), a = null), d & 4 && J(i, c[2]), d & 1 && h(e, "type", c[0]), d & 18 && s !== (s = D("flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": c[4],
        "bg-white border-black": c[1] === "primary",
        "bg-black border-white text-white": c[1] === "inverse-primary",
        "bg-red/90 text-white border-red/90": c[1] === "danger",
        "bg-green/90 border-green/90 text-white": c[1] === "success",
        "bg-white border-red/90 text-red/90": c[1] === "outline-danger"
      })) && h(e, "class", s);
    },
    i: A,
    o: A,
    d(c) {
      c && I(e), a && a.d(), o = !1, l();
    }
  };
}
function Wr(t, e, n) {
  let { disabled: r } = e, { type: i = "button" } = e, { variant: s = "primary" } = e, { label: o = "" } = e, { icon: l = "" } = e, a;
  oe();
  const d = Fe().attachInternals(), b = () => {
    const { form: f } = d;
    f?.requestSubmit ? f.requestSubmit() : f?.submit();
  };
  return t.$$set = (f) => {
    "disabled" in f && n(6, r = f.disabled), "type" in f && n(0, i = f.type), "variant" in f && n(1, s = f.variant), "label" in f && n(2, o = f.label), "icon" in f && n(3, l = f.icon);
  }, t.$$.update = () => {
    t.$$.dirty & 64 && n(4, a = Me(r, "disabled"));
  }, [i, s, o, l, a, b, r];
}
class Br extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, Wr, Hr, ie, {
      disabled: 6,
      type: 0,
      variant: 1,
      label: 2,
      icon: 3
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return ["disabled", "type", "variant", "label", "icon"];
  }
  get disabled() {
    return this.$$.ctx[6];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), M();
  }
  get type() {
    return this.$$.ctx[0];
  }
  set type(e) {
    this.$$set({ type: e }), M();
  }
  get variant() {
    return this.$$.ctx[1];
  }
  set variant(e) {
    this.$$set({ variant: e }), M();
  }
  get label() {
    return this.$$.ctx[2];
  }
  set label(e) {
    this.$$set({ label: e }), M();
  }
  get icon() {
    return this.$$.ctx[3];
  }
  set icon(e) {
    this.$$set({ icon: e }), M();
  }
}
customElements.define("v-button-internal", Br);
class Yr extends customElements.get("v-button-internal") {
  static formAssociated = !0;
}
customElements.define("v-button", Yr);
const Xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
let et = "uninitialized";
const Vt = /* @__PURE__ */ new Set(), Ur = (t) => {
  if (et === "loaded")
    return t(window.monaco);
  if (Vt.add(t), et === "loading")
    return;
  et = "loading";
  const e = URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = {
      baseUrl: '${Le}/min/'
    };
    importScripts('${Le}/min/vs/base/worker/workerMain.js');
    importScripts('${Le}/min/vs/language/json/jsonWorker.js');
  `], { type: "text/javascript" })), n = () => {
    window.require.config({ paths: { vs: `${Le}/min/vs` } }), window.MonacoEnvironment = { getWorkerUrl: () => e }, window.require(["vs/editor/editor.main"], () => {
      for (const r of Vt)
        r(window.monaco);
      et = "loaded";
    });
  };
  {
    const r = document.createElement("script");
    r.addEventListener("load", n), r.async = !0, r.src = `${Le}/min/vs/loader.js`, document.head.append(r);
  }
}, qr = (t, e, n) => t <= e ? e : t >= n ? n : t, rt = (t, e, n, r) => {
  const i = (t - e) / (n - e) * 100;
  return Number.isNaN(i) || i <= 0 ? 0 : i >= 100 ? 100 : Number.parseFloat(i.toFixed(r));
}, It = (t) => {
  let e = 0, n = 0;
  if (t.length === 0)
    return e;
  for (let r = 0; r < t.length; r += 1)
    n = t.codePointAt(r), e = (e << 5) - e + n, e = Math.trunc(e);
  return e;
};
function Zr(t) {
  let e, n, r;
  return {
    c() {
      e = E("div"), this.c = A, h(e, "class", "w-full h-full relative isolate");
    },
    m(i, s) {
      O(i, e, s), t[12](e), n || (r = W(e, "input", t[1]), n = !0);
    },
    p: A,
    i: A,
    o: A,
    d(i) {
      i && I(e), t[12](null), n = !1, r();
    }
  };
}
function Kr(t, e, n) {
  let { value: r = "" } = e, { previous: i = "" } = e, { language: s } = e, { theme: o = "vs" } = e, { readonly: l = "false" } = e, { minimap: a = "false" } = e, { schema: c = "" } = e, { variant: d = "default" } = e, b, f, p, m, y, g, R;
  oe();
  const L = document.createElement("link");
  L.rel = "stylesheet", L.href = `${Le}/min/vs/editor/editor.main.min.css`, Fe().shadowRoot.append(L);
  const x = () => {
    if (!g)
      return;
    g.getModel()?.dispose();
    let Y;
    if (p) {
      const fe = String(It(c)), de = `http://${fe}.json/`, pe = window.monaco.Uri.parse(de);
      Rt.removeSchemas(fe, p), Rt.addSchemas(fe, p, [pe.toString()]), Y = window.monaco.editor.createModel(r, s, pe);
    } else
      Y = window.monaco.editor.createModel(r, s);
    ae(m, "update-model", { model: Y }), g.setModel(Y);
  }, T = () => {
    const F = y?.getModel();
    F?.modified.dispose(), F?.original.dispose(), y.setModel({
      original: window.monaco.editor.createModel(i, "json"),
      modified: window.monaco.editor.createModel(r, "json")
    });
  }, C = (F) => {
    F instanceof InputEvent && (F.preventDefault(), F.stopImmediatePropagation());
  }, j = () => ({
    value: r,
    language: s,
    theme: o,
    readOnly: b,
    minimap: { enabled: f },
    scrollbar: {
      verticalScrollbarSize: 3,
      horizontalScrollbarSize: 3,
      vertical: "auto",
      horizontal: "auto",
      alwaysConsumeMouseWheel: !1
    },
    scrollBeyondLastLine: !1
  }), z = () => {
    n(10, y = window.monaco.editor.createDiffEditor(m, { ...j(), readOnly: !0 })), y.setModel({
      original: window.monaco.editor.createModel(i, s),
      modified: window.monaco.editor.createModel(r, s)
    });
  }, w = (F) => {
    if (d === "diff")
      return z();
    n(11, g = F.editor.create(m, j())), g.onDidChangeModelContent(() => {
      ae(m, "input", { value: g?.getValue() });
    }), g.onDidBlurEditorWidget(() => {
      ae(m, "blur", { value: g?.getValue() }), N();
    }), g.layout(), x(), N();
  }, N = () => {
    const F = window.monaco.editor.getModelMarkers({}), Y = It(c), fe = F.filter((de) => de.resource.authority === `${Y}.json`);
    ae(m, "markers", { markers: fe });
  }, H = () => {
    if (!R && g && (R = new ResizeObserver(() => {
      g?.layout();
    })), R) {
      const F = g?.getDomNode() ?? m;
      R.observe(F);
    }
  };
  yr(() => {
    Ur(w);
  }), vr(() => {
    g?.getModel()?.dispose(), y?.dispose(), g?.dispose(), R.disconnect();
    const Y = g?.getDomNode() ?? m;
    ae(Y, "destroy");
  });
  function ne(F) {
    ue[F ? "unshift" : "push"](() => {
      m = F, n(0, m);
    });
  }
  return t.$$set = (F) => {
    "value" in F && n(2, r = F.value), "previous" in F && n(3, i = F.previous), "language" in F && n(4, s = F.language), "theme" in F && n(5, o = F.theme), "readonly" in F && n(6, l = F.readonly), "minimap" in F && n(7, a = F.minimap), "schema" in F && n(8, c = F.schema), "variant" in F && n(9, d = F.variant);
  }, t.$$.update = () => {
    if (t.$$.dirty & 256 && (p = c ? JSON.parse(c) : void 0), t.$$.dirty & 64 && (b = Me(l, "readonly")), t.$$.dirty & 128 && (f = Me(a, "minimap")), t.$$.dirty & 3076) {
      if (y)
        T(), H();
      else if (g) {
        x();
        const F = g?.getValue() ?? "";
        if (r !== void 0) {
          const Y = Tt(r);
          Tt(F) !== Y && (g?.setValue(r), g?.layout());
        }
        H();
      }
    }
  }, [
    m,
    C,
    r,
    i,
    s,
    o,
    l,
    a,
    c,
    d,
    y,
    g,
    ne
  ];
}
class Fn extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, Kr, Zr, ie, {
      value: 2,
      previous: 3,
      language: 4,
      theme: 5,
      readonly: 6,
      minimap: 7,
      schema: 8,
      variant: 9
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return [
      "value",
      "previous",
      "language",
      "theme",
      "readonly",
      "minimap",
      "schema",
      "variant"
    ];
  }
  get value() {
    return this.$$.ctx[2];
  }
  set value(e) {
    this.$$set({ value: e }), M();
  }
  get previous() {
    return this.$$.ctx[3];
  }
  set previous(e) {
    this.$$set({ previous: e }), M();
  }
  get language() {
    return this.$$.ctx[4];
  }
  set language(e) {
    this.$$set({ language: e }), M();
  }
  get theme() {
    return this.$$.ctx[5];
  }
  set theme(e) {
    this.$$set({ theme: e }), M();
  }
  get readonly() {
    return this.$$.ctx[6];
  }
  set readonly(e) {
    this.$$set({ readonly: e }), M();
  }
  get minimap() {
    return this.$$.ctx[7];
  }
  set minimap(e) {
    this.$$set({ minimap: e }), M();
  }
  get schema() {
    return this.$$.ctx[8];
  }
  set schema(e) {
    this.$$set({ schema: e }), M();
  }
  get variant() {
    return this.$$.ctx[9];
  }
  set variant(e) {
    this.$$set({ variant: e }), M();
  }
}
customElements.define("v-code-editor", Fn);
const Jr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fn
}, Symbol.toStringTag, { value: "Module" }));
function Nt(t) {
  let e, n;
  return {
    c() {
      e = E("h2"), n = q(t[1]), h(e, "class", "text-sm");
    },
    m(r, i) {
      O(r, e, i), _(e, n);
    },
    p(r, i) {
      i & 2 && J(n, r[1]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function Gr(t) {
  let e, n, r, i, s, o, l, a, c, d, b, f, p, m, y, g, R, L, P = t[1] && Nt(t);
  return {
    c() {
      e = E("div"), n = E("div"), r = E("div"), P && P.c(), i = B(), s = E("slot"), o = B(), l = E("div"), a = E("slot"), c = B(), d = Te("svg"), b = Te("polyline"), p = B(), m = E("div"), y = E("slot"), this.c = A, h(s, "name", "title"), h(r, "class", "flex items-center gap-2"), h(a, "name", "header"), h(b, "points", "6 9 12 15 18 9"), h(d, "class", f = D("transition-transform duration-200", {
        "rotate-0": !t[0],
        "rotate-180": t[0]
      })), h(d, "width", "24"), h(d, "height", "24"), h(d, "viewBox", "0 0 24 24"), h(d, "stroke", "currentColor"), h(d, "stroke-linejoin", "round"), h(d, "stroke-linecap", "round"), h(d, "fill", "none"), h(l, "class", "h-full flex items-center gap-3"), h(n, "class", "w-full py-1.5 px-4 flex items-center justify-between border text-black border-black bg-white cursor-pointer"), h(m, "class", g = D("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !t[0],
        "max-h-fit": t[0]
      })), h(e, "class", "relative w-full overflow-hidden");
    },
    m(x, T) {
      O(x, e, T), _(e, n), _(n, r), P && P.m(r, null), _(r, i), _(r, s), _(n, o), _(n, l), _(l, a), _(l, c), _(l, d), _(d, b), _(e, p), _(e, m), _(m, y), t[4](e), R || (L = W(n, "click", t[3]), R = !0);
    },
    p(x, [T]) {
      x[1] ? P ? P.p(x, T) : (P = Nt(x), P.c(), P.m(r, i)) : P && (P.d(1), P = null), T & 1 && f !== (f = D("transition-transform duration-200", {
        "rotate-0": !x[0],
        "rotate-180": x[0]
      })) && h(d, "class", f), T & 1 && g !== (g = D("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !x[0],
        "max-h-fit": x[0]
      })) && h(m, "class", g);
    },
    i: A,
    o: A,
    d(x) {
      x && I(e), P && P.d(), t[4](null), R = !1, L();
    }
  };
}
function Qr(t, e, n) {
  let { title: r = "" } = e, { open: i = !1 } = e, s;
  oe();
  const o = (a) => {
    a.target.getAttribute("slot") !== "header" && (n(0, i = !i), ae(s, "toggle", { open: i }));
  };
  function l(a) {
    ue[a ? "unshift" : "push"](() => {
      s = a, n(2, s);
    });
  }
  return t.$$set = (a) => {
    "title" in a && n(1, r = a.title), "open" in a && n(0, i = a.open);
  }, [i, r, s, o, l];
}
class Dn extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, Qr, Gr, ie, { title: 1, open: 0 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return ["title", "open"];
  }
  get title() {
    return this.$$.ctx[1];
  }
  set title(e) {
    this.$$set({ title: e }), M();
  }
  get open() {
    return this.$$.ctx[0];
  }
  set open(e) {
    this.$$set({ open: e }), M();
  }
}
customElements.define("v-collapse", Dn);
const $r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dn
}, Symbol.toStringTag, { value: "Module" }));
function ei(t) {
  let e, n, r, i, s, o, l, a;
  return {
    c() {
      e = E("div"), n = E("div"), n.innerHTML = '<slot name="target"></slot>', r = B(), i = E("div"), s = E("slot"), this.c = A, h(n, "class", "inline-block w-full"), h(s, "name", "content"), h(i, "class", o = D("absolute z-10", {
        "left-0": t[1],
        "right-0": t[1],
        "overflow-hidden": t[1],
        invisible: !t[2]
      })), h(e, "class", "relative inline-block w-full");
    },
    m(c, d) {
      O(c, e, d), _(e, n), _(e, r), _(e, i), _(i, s), t[6](e), l || (a = W(n, "click", t[3]), l = !0);
    },
    p(c, [d]) {
      d & 6 && o !== (o = D("absolute z-10", {
        "left-0": c[1],
        "right-0": c[1],
        "overflow-hidden": c[1],
        invisible: !c[2]
      })) && h(i, "class", o);
    },
    i: A,
    o: A,
    d(c) {
      c && I(e), t[6](null), l = !1, a();
    }
  };
}
function ti(t, e, n) {
  let { open: r = "false" } = e, { match: i = "false" } = e, s, o, l;
  oe();
  const a = () => {
    ae(s, "toggle", { open: !l });
  };
  function c(d) {
    ue[d ? "unshift" : "push"](() => {
      s = d, n(0, s);
    });
  }
  return t.$$set = (d) => {
    "open" in d && n(4, r = d.open), "match" in d && n(5, i = d.match);
  }, t.$$.update = () => {
    t.$$.dirty & 32 && n(1, o = Me(i, "match")), t.$$.dirty & 16 && n(2, l = Me(r, "open"));
  }, [s, o, l, a, r, i, c];
}
class Hn extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, ti, ei, ie, { open: 4, match: 5 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return ["open", "match"];
  }
  get open() {
    return this.$$.ctx[4];
  }
  set open(e) {
    this.$$set({ open: e }), M();
  }
  get match() {
    return this.$$.ctx[5];
  }
  set match(e) {
    this.$$set({ match: e }), M();
  }
}
customElements.define("v-dropdown", Hn);
const ni = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hn
}, Symbol.toStringTag, { value: "Module" }));
function ri(t) {
  let e, n;
  return {
    c() {
      e = E("i"), this.c = A, h(e, "aria-hidden", ""), h(e, "class", n = "icon-" + t[0] + " text-" + t[1]);
    },
    m(r, i) {
      O(r, e, i);
    },
    p(r, [i]) {
      i & 3 && n !== (n = "icon-" + r[0] + " text-" + r[1]) && h(e, "class", n);
    },
    i: A,
    o: A,
    d(r) {
      r && I(e);
    }
  };
}
function ii(t, e, n) {
  let { name: r = "" } = e, { size: i = "base" } = e;
  return oe(), t.$$set = (s) => {
    "name" in s && n(0, r = s.name), "size" in s && n(1, i = s.size);
  }, [r, i];
}
class Wn extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, ii, ri, ie, { name: 0, size: 1 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return ["name", "size"];
  }
  get name() {
    return this.$$.ctx[0];
  }
  set name(e) {
    this.$$set({ name: e }), M();
  }
  get size() {
    return this.$$.ctx[1];
  }
  set size(e) {
    this.$$set({ size: e }), M();
  }
}
customElements.define("v-icon", Wn);
const oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wn
}, Symbol.toStringTag, { value: "Module" }));
function si(t) {
  let e;
  return {
    c() {
      e = E("v-code-editor"), this.c = A, he(e, "value", t[2]), he(e, "theme", t[0]), he(e, "schema", t[1]), he(e, "minimap", t[3]), he(e, "language", "json");
    },
    m(n, r) {
      O(n, e, r);
    },
    p(n, [r]) {
      r & 4 && he(e, "value", n[2]), r & 1 && he(e, "theme", n[0]), r & 2 && he(e, "schema", n[1]), r & 8 && he(e, "minimap", n[3]);
    },
    i: A,
    o: A,
    d(n) {
      n && I(e);
    }
  };
}
function li(t, e, n) {
  let { theme: r = "vs" } = e, { schema: i = "" } = e, { value: s } = e, { minimap: o } = e;
  return t.$$set = (l) => {
    "theme" in l && n(0, r = l.theme), "schema" in l && n(1, i = l.schema), "value" in l && n(2, s = l.value), "minimap" in l && n(3, o = l.minimap);
  }, [r, i, s, o];
}
class Bn extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, li, si, ie, {
      theme: 0,
      schema: 1,
      value: 2,
      minimap: 3
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return ["theme", "schema", "value", "minimap"];
  }
  get theme() {
    return this.$$.ctx[0];
  }
  set theme(e) {
    this.$$set({ theme: e }), M();
  }
  get schema() {
    return this.$$.ctx[1];
  }
  set schema(e) {
    this.$$set({ schema: e }), M();
  }
  get value() {
    return this.$$.ctx[2];
  }
  set value(e) {
    this.$$set({ value: e }), M();
  }
  get minimap() {
    return this.$$.ctx[3];
  }
  set minimap(e) {
    this.$$set({ minimap: e }), M();
  }
}
customElements.define("v-json-editor", Bn);
const ai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bn
}, Symbol.toStringTag, { value: "Module" }));
function Ft(t) {
  let e, n, r;
  return {
    c() {
      e = E("p"), n = q(t[3]), h(e, "class", r = D("text-xs", {
        "inline whitespace-nowrap": t[6] === "left"
      }));
    },
    m(i, s) {
      O(i, e, s), _(e, n);
    },
    p(i, s) {
      s & 8 && J(n, i[3]), s & 64 && r !== (r = D("text-xs", {
        "inline whitespace-nowrap": i[6] === "left"
      })) && h(e, "class", r);
    },
    d(i) {
      i && I(e);
    }
  };
}
function Dt(t) {
  let e, n, r, i, s, o, l, a;
  return {
    c() {
      e = E("div"), n = E("button"), i = B(), s = E("button"), h(n, "aria-label", r = "Increment up by " + t[10]), h(n, "class", "icon-chevron-down rotate-180 text-[15px]"), h(s, "aria-label", o = "Increment down by " + t[10]), h(s, "class", "icon-chevron-down text-[15px]"), h(e, "class", "absolute right-0.5 bottom-0 cursor-pointer select-none flex flex-col");
    },
    m(c, d) {
      O(c, e, d), _(e, n), _(e, i), _(e, s), l || (a = [
        W(n, "click", t[16]),
        W(s, "click", t[17])
      ], l = !0);
    },
    p(c, d) {
      d & 1024 && r !== (r = "Increment up by " + c[10]) && h(n, "aria-label", r), d & 1024 && o !== (o = "Increment down by " + c[10]) && h(s, "aria-label", o);
    },
    d(c) {
      c && I(e), l = !1, me(a);
    }
  };
}
function ci(t) {
  let e, n, r, i, s, o, l, a, c, d, b = t[3] && Ft(t), f = (t[1] === "number" || t[1] === "integer") && Dt(t);
  return {
    c() {
      e = E("label"), b && b.c(), n = B(), r = E("input"), l = B(), f && f.c(), this.c = A, h(r, "type", i = t[1] === "integer" ? "number" : t[1]), h(r, "placeholder", t[2]), h(r, "name", t[5]), r.value = t[0], h(r, "pattern", s = t[1] === "integer" ? "[0-9]*" : void 0), r.readOnly = t[9], h(r, "class", "w-full py-1.5 px-2.5 border text-xs border-black bg-white outline-none appearance-none"), h(r, "step", o = t[11] ? t[4] : null), h(e, "class", a = D("relative flex gap-1 max-w-[14rem]", {
        "flex-col": t[6] === "top",
        "items-center": t[6] === "left"
      }));
    },
    m(p, m) {
      O(p, e, m), b && b.m(e, null), _(e, n), _(e, r), t[15](r), _(e, l), f && f.m(e, null), t[18](e), c || (d = W(r, "input", t[12]), c = !0);
    },
    p(p, [m]) {
      p[3] ? b ? b.p(p, m) : (b = Ft(p), b.c(), b.m(e, n)) : b && (b.d(1), b = null), m & 2 && i !== (i = p[1] === "integer" ? "number" : p[1]) && h(r, "type", i), m & 4 && h(r, "placeholder", p[2]), m & 32 && h(r, "name", p[5]), m & 1 && r.value !== p[0] && (r.value = p[0]), m & 2 && s !== (s = p[1] === "integer" ? "[0-9]*" : void 0) && h(r, "pattern", s), m & 512 && (r.readOnly = p[9]), m & 2064 && o !== (o = p[11] ? p[4] : null) && h(r, "step", o), p[1] === "number" || p[1] === "integer" ? f ? f.p(p, m) : (f = Dt(p), f.c(), f.m(e, null)) : f && (f.d(1), f = null), m & 64 && a !== (a = D("relative flex gap-1 max-w-[14rem]", {
        "flex-col": p[6] === "top",
        "items-center": p[6] === "left"
      })) && h(e, "class", a);
    },
    i: A,
    o: A,
    d(p) {
      p && I(e), b && b.d(), t[15](null), f && f.d(), t[18](null), c = !1, d();
    }
  };
}
function ui(t, e, n) {
  const i = Fe().attachInternals();
  let { type: s = "text" } = e, { placeholder: o = "" } = e, { readonly: l = "false" } = e, { label: a = "" } = e, { value: c = "" } = e, { step: d = "1" } = e, { name: b = "" } = e, { labelposition: f = "top" } = e, p, m, y, g, R, L;
  oe();
  const P = (w) => {
    w.preventDefault(), w.stopImmediatePropagation(), n(0, c = m.value), i.setFormValue(c), ae(p, "input", { value: c });
  }, x = (w) => {
    const N = Number.parseFloat(c || "0"), H = String(c).split(".").pop()?.length ?? 0;
    s === "number" ? n(0, c = n(8, m.value = (N + R * w).toFixed(Math.max(y, H)), m)) : s === "integer" && n(0, c = n(8, m.value = String(Math.round(N + R * w)), m)), i.setFormValue(c), ae(p, "input", { value: c });
  };
  function T(w) {
    ue[w ? "unshift" : "push"](() => {
      m = w, n(8, m);
    });
  }
  const C = () => x(1), j = () => x(-1);
  function z(w) {
    ue[w ? "unshift" : "push"](() => {
      p = w, n(7, p);
    });
  }
  return t.$$set = (w) => {
    "type" in w && n(1, s = w.type), "placeholder" in w && n(2, o = w.placeholder), "readonly" in w && n(14, l = w.readonly), "label" in w && n(3, a = w.label), "value" in w && n(0, c = w.value), "step" in w && n(4, d = w.step), "name" in w && n(5, b = w.name), "labelposition" in w && n(6, f = w.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 16 && (y = String(d).split(".").pop()?.length ?? 0), t.$$.dirty & 16384 && n(9, g = Me(l, "readonly")), t.$$.dirty & 16 && n(10, R = Number.parseFloat(d)), t.$$.dirty & 2 && n(11, L = s === "time" || s === "number");
  }, [
    c,
    s,
    o,
    a,
    d,
    b,
    f,
    p,
    m,
    g,
    R,
    L,
    P,
    x,
    l,
    T,
    C,
    j,
    z
  ];
}
class fi extends Q {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}</style>", te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, ui, ci, ie, {
      type: 1,
      placeholder: 2,
      readonly: 14,
      label: 3,
      value: 0,
      step: 4,
      name: 5,
      labelposition: 6
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
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
    this.$$set({ type: e }), M();
  }
  get placeholder() {
    return this.$$.ctx[2];
  }
  set placeholder(e) {
    this.$$set({ placeholder: e }), M();
  }
  get readonly() {
    return this.$$.ctx[14];
  }
  set readonly(e) {
    this.$$set({ readonly: e }), M();
  }
  get label() {
    return this.$$.ctx[3];
  }
  set label(e) {
    this.$$set({ label: e }), M();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), M();
  }
  get step() {
    return this.$$.ctx[4];
  }
  set step(e) {
    this.$$set({ step: e }), M();
  }
  get name() {
    return this.$$.ctx[5];
  }
  set name(e) {
    this.$$set({ name: e }), M();
  }
  get labelposition() {
    return this.$$.ctx[6];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), M();
  }
}
customElements.define("v-input-internal", fi);
class di extends customElements.get("v-input-internal") {
  static formAssociated = !0;
}
customElements.define("v-input", di);
const hi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function bi(t) {
  let e;
  return {
    c() {
      e = Te("path"), h(e, "d", "M6.33 3.66667H7.66666V5H6.33333V3.66667ZM6.33 6.33333H7.66666V10.3333H6.33333V6.33333ZM7 0.333334C3.31999 0.333334 0.333328 3.32 0.333328 7C0.333328 10.68 3.31999 13.6667 7 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.32 10.68 0.333334 7 0.333334ZM7 12.3333C4.06 12.3333 1.66666 9.94 1.66666 7C1.66666 4.06 4.06 1.66667 7 1.66667C9.93999 1.66667 12.3333 4.06 12.3333 7C12.3333 9.94 9.93999 12.3333 7 12.3333Z"), h(e, "fill", "#045681");
    },
    m(n, r) {
      O(n, e, r);
    },
    d(n) {
      n && I(e);
    }
  };
}
function mi(t) {
  let e;
  return {
    c() {
      e = Te("path"), h(e, "d", "M4 7.78L1.22 5L0.273331 5.94L4 9.66667L12 1.66667L11.06 0.726665L4 7.78Z"), h(e, "fill", "#397F48");
    },
    m(n, r) {
      O(n, e, r);
    },
    d(n) {
      n && I(e);
    }
  };
}
function pi(t) {
  let e;
  return {
    c() {
      e = Te("path"), h(e, "d", "M8 2.99333L13.02 11.6667H2.98L8 2.99333ZM8 0.333328L0.666672 13H15.3333L8 0.333328ZM8.66667 9.66666H7.33334V11H8.66667V9.66666ZM8.66667 5.66666H7.33334V8.33333H8.66667V5.66666Z"), h(e, "fill", "#FF9900");
    },
    m(n, r) {
      O(n, e, r);
    },
    d(n) {
      n && I(e);
    }
  };
}
function gi(t) {
  let e;
  return {
    c() {
      e = Te("path"), h(e, "d", "M6.33 9H7.66666V10.3333H6.33333V9ZM6.33 3.66666H7.66666V7.66666H6.33333V3.66666ZM6.99333 0.333328C3.31333 0.333328 0.333328 3.31999 0.333328 7C0.333328 10.68 3.31333 13.6667 6.99333 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.31999 10.68 0.333328 6.99333 0.333328ZM7 12.3333C4.05333 12.3333 1.66666 9.94666 1.66666 7C1.66666 4.05333 4.05333 1.66666 7 1.66666C9.94666 1.66666 12.3333 4.05333 12.3333 7C12.3333 9.94666 9.94666 12.3333 7 12.3333Z"), h(e, "fill", "#BE3026");
    },
    m(n, r) {
      O(n, e, r);
    },
    d(n) {
      n && I(e);
    }
  };
}
function Ht(t) {
  let e, n;
  return {
    c() {
      e = E("p"), n = q(t[1]), h(e, "class", "text-xs");
    },
    m(r, i) {
      O(r, e, i), _(e, n);
    },
    p(r, i) {
      i & 2 && J(n, r[1]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function wi(t) {
  let e, n, r, i, s, o, l, a, c;
  function d(m, y) {
    if (m[2] === "error")
      return gi;
    if (m[2] === "warning")
      return pi;
    if (m[2] === "success")
      return mi;
    if (m[2] === "info")
      return bi;
  }
  let b = d(t), f = b && b(t), p = t[1] && Ht(t);
  return {
    c() {
      e = E("div"), n = E("div"), r = Te("svg"), f && f.c(), i = B(), s = E("figure"), o = E("figcaption"), l = q(t[0]), a = B(), p && p.c(), this.c = A, h(r, "width", "14"), h(r, "height", "14"), h(r, "viewBox", "0 0 15 15"), h(r, "fill", "none"), h(r, "xmlns", "http://www.w3.org/2000/svg"), h(n, "class", "mt-1"), h(o, "class", "text-sm"), h(e, "class", c = D("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": t[3] === "gray",
        "bg-white": t[3] === "white",
        "border-red/90": t[2] === "error",
        "border-orange/90": t[2] === "warning",
        "border-green/90": t[2] === "success",
        "border-blue/90": t[2] === "info"
      }));
    },
    m(m, y) {
      O(m, e, y), _(e, n), _(n, r), f && f.m(r, null), _(e, i), _(e, s), _(s, o), _(o, l), _(s, a), p && p.m(s, null);
    },
    p(m, [y]) {
      b !== (b = d(m)) && (f && f.d(1), f = b && b(m), f && (f.c(), f.m(r, null))), y & 1 && J(l, m[0]), m[1] ? p ? p.p(m, y) : (p = Ht(m), p.c(), p.m(s, null)) : p && (p.d(1), p = null), y & 12 && c !== (c = D("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": m[3] === "gray",
        "bg-white": m[3] === "white",
        "border-red/90": m[2] === "error",
        "border-orange/90": m[2] === "warning",
        "border-green/90": m[2] === "success",
        "border-blue/90": m[2] === "info"
      })) && h(e, "class", c);
    },
    i: A,
    o: A,
    d(m) {
      m && I(e), f && f.d(), p && p.d();
    }
  };
}
function yi(t, e, n) {
  let { title: r = "" } = e, { message: i = "" } = e, { variant: s = "info" } = e, { background: o = "gray" } = e;
  return oe(), t.$$set = (l) => {
    "title" in l && n(0, r = l.title), "message" in l && n(1, i = l.message), "variant" in l && n(2, s = l.variant), "background" in l && n(3, o = l.background);
  }, [r, i, s, o];
}
class Yn extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, yi, wi, ie, {
      title: 0,
      message: 1,
      variant: 2,
      background: 3
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return ["title", "message", "variant", "background"];
  }
  get title() {
    return this.$$.ctx[0];
  }
  set title(e) {
    this.$$set({ title: e }), M();
  }
  get message() {
    return this.$$.ctx[1];
  }
  set message(e) {
    this.$$set({ message: e }), M();
  }
  get variant() {
    return this.$$.ctx[2];
  }
  set variant(e) {
    this.$$set({ variant: e }), M();
  }
  get background() {
    return this.$$.ctx[3];
  }
  set background(e) {
    this.$$set({ background: e }), M();
  }
}
customElements.define("v-notify", Yn);
const vi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yn
}, Symbol.toStringTag, { value: "Module" }));
function Wt(t, e, n) {
  const r = t.slice();
  return r[9] = e[n], r;
}
function Bt(t) {
  let e, n, r;
  return {
    c() {
      e = E("p"), n = q(t[1]), h(e, "class", r = D("text-xs", {
        "pb-1": t[2] === "top",
        inline: t[2] === "left"
      }));
    },
    m(i, s) {
      O(i, e, s), _(e, n);
    },
    p(i, s) {
      s & 2 && J(n, i[1]), s & 4 && r !== (r = D("text-xs", {
        "pb-1": i[2] === "top",
        inline: i[2] === "left"
      })) && h(e, "class", r);
    },
    d(i) {
      i && I(e);
    }
  };
}
function Yt(t) {
  let e, n = t[9] + "", r, i, s, o, l;
  function a() {
    return t[8](t[9]);
  }
  return {
    c() {
      e = E("button"), r = q(n), i = B(), h(e, "class", s = D("border-y border-l last:border-r border-black px-2 py-1 text-sm", {
        "bg-white": t[9] !== t[0],
        "bg-black text-white": t[9] === t[0]
      }));
    },
    m(c, d) {
      O(c, e, d), _(e, r), _(e, i), t[7](e), o || (l = W(e, "click", a), o = !0);
    },
    p(c, d) {
      t = c, d & 16 && n !== (n = t[9] + "") && J(r, n), d & 17 && s !== (s = D("border-y border-l last:border-r border-black px-2 py-1 text-sm", {
        "bg-white": t[9] !== t[0],
        "bg-black text-white": t[9] === t[0]
      })) && h(e, "class", s);
    },
    d(c) {
      c && I(e), t[7](null), o = !1, l();
    }
  };
}
function _i(t) {
  let e, n, r = t[1] && Bt(t), i = t[4], s = [];
  for (let o = 0; o < i.length; o += 1)
    s[o] = Yt(Wt(t, i, o));
  return {
    c() {
      e = E("label"), r && r.c(), n = B();
      for (let o = 0; o < s.length; o += 1)
        s[o].c();
      this.c = A;
    },
    m(o, l) {
      O(o, e, l), r && r.m(e, null), _(e, n);
      for (let a = 0; a < s.length; a += 1)
        s[a].m(e, null);
    },
    p(o, [l]) {
      if (o[1] ? r ? r.p(o, l) : (r = Bt(o), r.c(), r.m(e, n)) : r && (r.d(1), r = null), l & 57) {
        i = o[4];
        let a;
        for (a = 0; a < i.length; a += 1) {
          const c = Wt(o, i, a);
          s[a] ? s[a].p(c, l) : (s[a] = Yt(c), s[a].c(), s[a].m(e, null));
        }
        for (; a < s.length; a += 1)
          s[a].d(1);
        s.length = i.length;
      }
    },
    i: A,
    o: A,
    d(o) {
      o && I(e), r && r.d(), lt(s, o);
    }
  };
}
function ki(t, e, n) {
  let { label: r = "" } = e, { options: i = "" } = e, { selected: s = "" } = e, { labelposition: o = "top" } = e;
  oe();
  let l, a;
  const c = (f) => {
    n(0, s = f), ae(l, "input", { value: f });
  };
  function d(f) {
    ue[f ? "unshift" : "push"](() => {
      l = f, n(3, l);
    });
  }
  const b = (f) => c(f);
  return t.$$set = (f) => {
    "label" in f && n(1, r = f.label), "options" in f && n(6, i = f.options), "selected" in f && n(0, s = f.selected), "labelposition" in f && n(2, o = f.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 64 && n(4, a = i.split(",").map((f) => f.trim()));
  }, [
    s,
    r,
    o,
    l,
    a,
    c,
    i,
    d,
    b
  ];
}
class Xn extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, ki, _i, ie, {
      label: 1,
      options: 6,
      selected: 0,
      labelposition: 2
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return ["label", "options", "selected", "labelposition"];
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), M();
  }
  get options() {
    return this.$$.ctx[6];
  }
  set options(e) {
    this.$$set({ options: e }), M();
  }
  get selected() {
    return this.$$.ctx[0];
  }
  set selected(e) {
    this.$$set({ selected: e }), M();
  }
  get labelposition() {
    return this.$$.ctx[2];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), M();
  }
}
customElements.define("v-radio", Xn);
const xi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xn
}, Symbol.toStringTag, { value: "Module" })), Ei = (t, e) => t.localeCompare(e), Mi = (t, e) => {
  const n = {}, r = new RegExp(`^${e}`, "i"), i = new RegExp(e, "gi");
  for (const o of t) {
    let l = -1;
    const a = o.split(" ");
    for (let c = 0; c < a.length; c++) {
      const d = a[c];
      d.match(r) ? l = 0 : d.match(i) && (l = c + 1);
    }
    n[l] ? n[l].push(o) : n[l] = [o];
  }
  const s = [];
  for (const o of Object.keys(n)) {
    const l = (n[o] || []).sort(Ei);
    s.push(...l);
  }
  return s;
}, Si = (t) => {
  const { top: e, bottom: n } = t.getBoundingClientRect(), r = t.parentElement.getBoundingClientRect();
  return n < r.bottom && e > r.top;
}, Xt = (t, e) => t.includes(e), Ut = (t, e) => t.map((n) => {
  const r = n.match(new RegExp(e, "i"));
  if (r?.index !== void 0) {
    const i = n.slice(0, r.index), s = n.slice(r.index, r.index + e.length), o = n.slice(r.index + e.length);
    return {
      search: [i, s, o],
      option: n
    };
  }
  return {
    search: void 0,
    option: n
  };
});
function qt(t, e, n) {
  const r = t.slice();
  return r[46] = e[n].search, r[47] = e[n].option, r[49] = n, r;
}
function Zt(t, e, n) {
  const r = t.slice();
  return r[50] = e[n], r[52] = n, r;
}
function Kt(t, e, n) {
  const r = t.slice();
  return r[47] = e[n], r;
}
function Jt(t) {
  let e, n, r;
  return {
    c() {
      e = E("p"), n = q(t[2]), h(e, "class", r = D("text-xs", {
        "inline whitespace-nowrap": t[3] === "left"
      }));
    },
    m(i, s) {
      O(i, e, s), _(e, n);
    },
    p(i, s) {
      s[0] & 4 && J(n, i[2]), s[0] & 8 && r !== (r = D("text-xs", {
        "inline whitespace-nowrap": i[3] === "left"
      })) && h(e, "class", r);
    },
    d(i) {
      i && I(e);
    }
  };
}
function Gt(t) {
  let e, n = [], r = /* @__PURE__ */ new Map(), i = t[12];
  const s = (o) => o[47];
  for (let o = 0; o < i.length; o += 1) {
    let l = Kt(t, i, o), a = s(l);
    r.set(a, n[o] = Qt(a, l));
  }
  return {
    c() {
      e = E("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
      h(e, "class", "flex flex-wrap gap-2 p-1");
    },
    m(o, l) {
      O(o, e, l);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
    },
    p(o, l) {
      l[0] & 4198400 && (i = o[12], n = Je(n, l, s, 1, o, i, r, e, Ke, Qt, null, Kt));
    },
    d(o) {
      o && I(e);
      for (let l = 0; l < n.length; l += 1)
        n[l].d();
    }
  };
}
function Qt(t, e) {
  let n, r, i = e[47] + "", s, o, l, a, c, d;
  function b() {
    return e[36](e[47]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = E("div"), r = E("span"), s = q(i), o = B(), l = E("v-icon"), a = B(), he(l, "name", "x"), h(n, "class", "flex cursor-pointer items-center gap-1 rounded-xl bg-[#C4C4C4] py-0.5 px-2 text-[10px] hover:bg-gray-300"), this.first = n;
    },
    m(f, p) {
      O(f, n, p), _(n, r), _(r, s), _(n, o), _(n, l), _(n, a), c || (d = W(n, "click", b), c = !0);
    },
    p(f, p) {
      e = f, p[0] & 4096 && i !== (i = e[47] + "") && J(s, i);
    },
    d(f) {
      f && I(n), c = !1, d();
    }
  };
}
function Ci(t) {
  let e;
  return {
    c() {
      e = E("div"), e.textContent = "No matching results", h(e, "class", "flex py-1.5 px-2.5 justify-center text-xs");
    },
    m(n, r) {
      O(n, e, r);
    },
    p: A,
    d(n) {
      n && I(e);
    }
  };
}
function Ai(t) {
  let e, n = [], r = /* @__PURE__ */ new Map(), i, s, o, l = t[13];
  const a = (d) => d[47];
  for (let d = 0; d < l.length; d += 1) {
    let b = qt(t, l, d), f = a(b);
    r.set(f, n[d] = en(f, b));
  }
  let c = t[4] && tn(t);
  return {
    c() {
      e = E("div");
      for (let d = 0; d < n.length; d += 1)
        n[d].c();
      i = B(), c && c.c(), h(e, "class", "options-container flex max-h-36 flex-col overflow-y-auto");
    },
    m(d, b) {
      O(d, e, b);
      for (let f = 0; f < n.length; f += 1)
        n[f].m(e, null);
      _(e, i), c && c.m(e, null), t[38](e), s || (o = W(e, "mouseleave", t[18]), s = !0);
    },
    p(d, b) {
      b[0] & 25190417 && (l = d[13], n = Je(n, b, a, 1, d, l, r, e, Ke, en, i, qt)), d[4] ? c ? c.p(d, b) : (c = tn(d), c.c(), c.m(e, null)) : c && (c.d(1), c = null);
    },
    d(d) {
      d && I(e);
      for (let b = 0; b < n.length; b += 1)
        n[b].d();
      c && c.d(), t[38](null), s = !1, o();
    }
  };
}
function Oi(t) {
  let e = t[47] + "", n;
  return {
    c() {
      n = q(e);
    },
    m(r, i) {
      O(r, n, i);
    },
    p(r, i) {
      i[0] & 8192 && e !== (e = r[47] + "") && J(n, e);
    },
    d(r) {
      r && I(n);
    }
  };
}
function Ri(t) {
  let e, n = [], r = /* @__PURE__ */ new Map(), i = t[46];
  const s = (o) => o[52];
  for (let o = 0; o < i.length; o += 1) {
    let l = Zt(t, i, o), a = s(l);
    r.set(a, n[o] = $t(a, l));
  }
  return {
    c() {
      e = E("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
    },
    m(o, l) {
      O(o, e, l);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
    },
    p(o, l) {
      l[0] & 24576 && (i = o[46], n = Je(n, l, s, 1, o, i, r, e, Ke, $t, null, Zt));
    },
    d(o) {
      o && I(e);
      for (let l = 0; l < n.length; l += 1)
        n[l].d();
    }
  };
}
function $t(t, e) {
  let n, r = e[50] + "", i, s;
  return {
    key: t,
    first: null,
    c() {
      n = E("span"), i = q(r), h(n, "class", s = D({
        "bg-yellow-100": e[52] === 1 && e[14] !== e[49]
      })), this.first = n;
    },
    m(o, l) {
      O(o, n, l), _(n, i);
    },
    p(o, l) {
      e = o, l[0] & 8192 && r !== (r = e[50] + "") && J(i, r), l[0] & 24576 && s !== (s = D({
        "bg-yellow-100": e[52] === 1 && e[14] !== e[49]
      })) && h(n, "class", s);
    },
    d(o) {
      o && I(n);
    }
  };
}
function en(t, e) {
  let n, r, i, s, o, l, a, c;
  function d(m, y) {
    return m[46] ? Ri : Oi;
  }
  let b = d(e), f = b(e);
  function p() {
    return e[37](e[49]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = E("label"), r = E("input"), o = B(), f.c(), h(r, "tabindex", "-1"), h(r, "type", "checkbox"), h(r, "class", i = D("bg-black outline-none", e[4] ? "" : "hidden")), r.checked = s = Xt(e[0], Array.isArray(e[47]) ? e[47].join("") : e[47]), h(n, "class", l = D("flex w-full gap-2 text-ellipsis whitespace-nowrap px-2 py-1.5 text-xs", {
        "bg-slate-200": e[14] === e[49]
      })), this.first = n;
    },
    m(m, y) {
      O(m, n, y), _(n, r), _(n, o), f.m(n, null), a || (c = [
        W(r, "change", function() {
          _t(e[24].bind(null, Array.isArray(e[47]) ? e[47].join("") : e[47])) && e[24].bind(null, Array.isArray(e[47]) ? e[47].join("") : e[47]).apply(this, arguments);
        }),
        W(r, "input", nt(e[32])),
        W(r, "focus", nt(Ue(e[33]))),
        W(n, "mouseenter", p)
      ], a = !0);
    },
    p(m, y) {
      e = m, y[0] & 16 && i !== (i = D("bg-black outline-none", e[4] ? "" : "hidden")) && h(r, "class", i), y[0] & 8193 && s !== (s = Xt(e[0], Array.isArray(e[47]) ? e[47].join("") : e[47])) && (r.checked = s), b === (b = d(e)) && f ? f.p(e, y) : (f.d(1), f = b(e), f && (f.c(), f.m(n, null))), y[0] & 24576 && l !== (l = D("flex w-full gap-2 text-ellipsis whitespace-nowrap px-2 py-1.5 text-xs", {
        "bg-slate-200": e[14] === e[49]
      })) && h(n, "class", l);
    },
    d(m) {
      m && I(n), f.d(), a = !1, me(c);
    }
  };
}
function tn(t) {
  let e, n, r;
  return {
    c() {
      e = E("button"), e.textContent = "Clear all", h(e, "class", "w-full px-2 py-1 hover:bg-slate-200 text-xs text-left");
    },
    m(i, s) {
      O(i, e, s), n || (r = [
        W(e, "mouseenter", t[18]),
        W(e, "click", t[25])
      ], n = !0);
    },
    p: A,
    d(i) {
      i && I(e), n = !1, me(r);
    }
  };
}
function Ti(t) {
  let e, n, r, i, s, o, l, a, c, d, b, f, p, m, y, g, R, L, P, x = t[2] && Jt(t), T = t[12].length > 0 && Gt(t);
  function C(w, N) {
    return w[5].length > 0 ? Ai : Ci;
  }
  let j = C(t), z = j(t);
  return {
    c() {
      e = E("label"), x && x.c(), n = B(), r = E("v-dropdown"), i = E("div"), s = E("div"), o = E("input"), c = B(), d = E("button"), b = E("v-icon"), p = B(), T && T.c(), m = B(), y = E("div"), z.c(), this.c = A, h(o, "placeholder", t[1]), o.value = l = t[4] ? t[6] : t[0], o.readOnly = a = t[11] ? !0 : void 0, h(o, "type", "text"), h(o, "class", "grow text-xs border-0 bg-transparent outline-none appearance-none"), he(b, "name", "chevron-down"), h(d, "tabindex", "-1"), h(d, "class", f = D("grid place-content-center transition-transform duration-200", { "rotate-180": t[7] })), h(s, "class", "flex py-1.5 pl-2.5 pr-1"), h(i, "slot", "target"), h(i, "class", "w-full border border-black"), h(y, "slot", "content"), h(y, "class", "mt-1 border border-black bg-white drop-shadow-md"), he(r, "match", ""), he(r, "open", g = t[7] ? "" : void 0), h(e, "class", R = D("relative max-w-[14rem] w-full flex gap-1", {
        "flex-col": t[3] === "top",
        "items-center": t[3] === "left",
        "opacity-50 pointer-events-none": t[11]
      })), h(e, "tabindex", "-1");
    },
    m(w, N) {
      O(w, e, N), x && x.m(e, null), _(e, n), _(e, r), _(r, i), _(i, s), _(s, o), t[35](o), _(s, c), _(s, d), _(d, b), _(i, p), T && T.m(i, null), _(r, m), _(r, y), z.m(y, null), t[39](e), L || (P = [
        W(o, "input", Ue(t[16])),
        W(d, "click", t[21]),
        W(d, "focusin", nt(t[34])),
        W(e, "focusin", t[19]),
        W(e, "focusout", t[20]),
        W(e, "keyup", nt(Ue(t[17]))),
        W(e, "mousemove", t[40])
      ], L = !0);
    },
    p(w, N) {
      w[2] ? x ? x.p(w, N) : (x = Jt(w), x.c(), x.m(e, n)) : x && (x.d(1), x = null), N[0] & 2 && h(o, "placeholder", w[1]), N[0] & 81 && l !== (l = w[4] ? w[6] : w[0]) && o.value !== l && (o.value = l), N[0] & 2048 && a !== (a = w[11] ? !0 : void 0) && (o.readOnly = a), N[0] & 128 && f !== (f = D("grid place-content-center transition-transform duration-200", { "rotate-180": w[7] })) && h(d, "class", f), w[12].length > 0 ? T ? T.p(w, N) : (T = Gt(w), T.c(), T.m(i, null)) : T && (T.d(1), T = null), j === (j = C(w)) && z ? z.p(w, N) : (z.d(1), z = j(w), z && (z.c(), z.m(y, null))), N[0] & 128 && g !== (g = w[7] ? "" : void 0) && he(r, "open", g), N[0] & 2056 && R !== (R = D("relative max-w-[14rem] w-full flex gap-1", {
        "flex-col": w[3] === "top",
        "items-center": w[3] === "left",
        "opacity-50 pointer-events-none": w[11]
      })) && h(e, "class", R);
    },
    i: A,
    o: A,
    d(w) {
      w && I(e), x && x.d(), t[35](null), T && T.d(), z.d(), t[39](null), L = !1, me(P);
    }
  };
}
function Pi(t, e, n) {
  let { options: r = "" } = e, { value: i = "" } = e, { placeholder: s = "" } = e, { label: o = "" } = e, { variant: l = "single" } = e, { labelposition: a = "top" } = e, { disabled: c = "false" } = e, { exact: d = "false" } = e, b, f, p, m, y, g, R, L, P, x, T = "", C = !1, j = -1, z = !1;
  oe();
  const w = (u) => {
    z = u;
  }, N = (u, v) => u ? Mi(v, u) : v, H = (u) => {
    n(14, j = -1), n(10, p.scrollTop = 0, p), u.stopImmediatePropagation(), g ? n(6, T = f.value.trim()) : (n(0, i = f.value.trim()), ae(b, "input", { value: i }));
  }, ne = (u) => {
    switch (w(!0), u.key.toLowerCase()) {
      case "enter":
        return F();
      case "arrowup":
        return Y(-1);
      case "arrowdown":
        return Y(1);
      case "escape":
        return de();
    }
  }, F = () => {
    if (g) {
      const u = P[j];
      n(0, i = i.includes(u) ? [...L.filter((v) => v !== u)].toString() : [...L, u].toString()), f.focus();
    } else {
      if (j > -1)
        n(0, i = P[j]);
      else {
        const u = P.find((v) => v.toLowerCase() === i);
        u && n(0, i = u);
      }
      C && (f.blur(), ae(b, "input", { value: i }));
    }
  }, Y = (u) => {
    n(14, j += u), j < 0 ? n(14, j = P.length - 1) : j >= P.length && n(14, j = 0);
    const v = p.children[j];
    Si(v) === !1 && v.scrollIntoView();
  }, fe = () => {
    n(14, j = -1);
  }, de = () => {
    f.blur();
  }, pe = () => {
    C || (n(7, C = !0), f.focus());
  }, ke = (u) => {
    b.contains(u.relatedTarget) || (n(7, C = !1), n(14, j = -1));
  }, xe = () => {
    C ? n(7, C = !1) : f.focus();
  }, ge = (u) => {
    n(0, i = [...L.filter((v) => v !== u)].toString()), ae(b, "input", { value: i }), f.focus();
  }, we = (u) => {
    z || n(14, j = u);
  }, De = (u, v) => {
    const { checked: V } = v.target;
    if (g === !1 && i === u) {
      v.preventDefault(), n(7, C = !1);
      return;
    }
    n(0, i = V ? [...L, u].toString() : [...L.filter((X) => X !== u)].toString()), ae(b, "input", { value: i }), g ? f.focus() : n(7, C = !1);
  }, He = () => {
    n(0, i = ""), n(10, p.scrollTop = 0, p), ae(b, "input", { value: i });
  };
  function Oe(u) {
    ht.call(this, t, u);
  }
  function Re(u) {
    ht.call(this, t, u);
  }
  function ye(u) {
    ht.call(this, t, u);
  }
  function je(u) {
    ue[u ? "unshift" : "push"](() => {
      f = u, n(9, f);
    });
  }
  const We = (u) => ge(u), ft = (u) => we(u);
  function dt(u) {
    ue[u ? "unshift" : "push"](() => {
      p = u, n(10, p);
    });
  }
  function Qe(u) {
    ue[u ? "unshift" : "push"](() => {
      b = u, n(8, b);
    });
  }
  const k = () => w(!1);
  return t.$$set = (u) => {
    "options" in u && n(26, r = u.options), "value" in u && n(0, i = u.value), "placeholder" in u && n(1, s = u.placeholder), "label" in u && n(2, o = u.label), "variant" in u && n(27, l = u.variant), "labelposition" in u && n(3, a = u.labelposition), "disabled" in u && n(28, c = u.disabled), "exact" in u && n(29, d = u.exact);
  }, t.$$.update = () => {
    t.$$.dirty[0] & 268435456 && n(11, m = Me(c, "disabled")), t.$$.dirty[0] & 536870912 && n(30, y = Me(d, "exact")), t.$$.dirty[0] & 134217728 && n(4, g = l === "multiple"), t.$$.dirty[0] & 67108864 && n(31, R = r.split(",").map((u) => u.trim())), t.$$.dirty[0] & 1073741969 | t.$$.dirty[1] & 1 && (C || (g && n(6, T = ""), y && R.includes(i) === !1 && n(0, i = ""))), t.$$.dirty[0] & 17 && n(12, L = g ? i.split(",").filter(Boolean).map((u) => u.trim()) : []), t.$$.dirty[0] & 81 | t.$$.dirty[1] & 1 && n(5, P = N(g ? T : i, R)), t.$$.dirty[0] & 113 && n(13, x = g ? Ut(P, T) : Ut(P, i));
  }, [
    i,
    s,
    o,
    a,
    g,
    P,
    T,
    C,
    b,
    f,
    p,
    m,
    L,
    x,
    j,
    w,
    H,
    ne,
    fe,
    pe,
    ke,
    xe,
    ge,
    we,
    De,
    He,
    r,
    l,
    c,
    d,
    y,
    R,
    Oe,
    Re,
    ye,
    je,
    We,
    ft,
    dt,
    Qe,
    k
  ];
}
class Un extends Q {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>.options-container::-webkit-scrollbar{width:6px}.options-container::-webkit-scrollbar-track{background:transparent}.options-container::-webkit-scrollbar-thumb{background-color:black;border-radius:0;border:0 solid transparent}.options-container{scrollbar-width:thin;scrollbar-color:black transparent}</style>", te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, Pi, Ti, ie, {
      options: 26,
      value: 0,
      placeholder: 1,
      label: 2,
      variant: 27,
      labelposition: 3,
      disabled: 28,
      exact: 29
    }, null, [-1, -1]), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return [
      "options",
      "value",
      "placeholder",
      "label",
      "variant",
      "labelposition",
      "disabled",
      "exact"
    ];
  }
  get options() {
    return this.$$.ctx[26];
  }
  set options(e) {
    this.$$set({ options: e }), M();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), M();
  }
  get placeholder() {
    return this.$$.ctx[1];
  }
  set placeholder(e) {
    this.$$set({ placeholder: e }), M();
  }
  get label() {
    return this.$$.ctx[2];
  }
  set label(e) {
    this.$$set({ label: e }), M();
  }
  get variant() {
    return this.$$.ctx[27];
  }
  set variant(e) {
    this.$$set({ variant: e }), M();
  }
  get labelposition() {
    return this.$$.ctx[3];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), M();
  }
  get disabled() {
    return this.$$.ctx[28];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), M();
  }
  get exact() {
    return this.$$.ctx[29];
  }
  set exact(e) {
    this.$$set({ exact: e }), M();
  }
}
customElements.define("v-select", Un);
const ji = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Un
}, Symbol.toStringTag, { value: "Module" })), ze = [];
function zi(t, e = A) {
  let n;
  const r = /* @__PURE__ */ new Set();
  function i(l) {
    if (An(t, l) && (t = l, n)) {
      const a = !ze.length;
      for (const c of r)
        c[1](), ze.push(c, t);
      if (a) {
        for (let c = 0; c < ze.length; c += 2)
          ze[c][0](ze[c + 1]);
        ze.length = 0;
      }
    }
  }
  function s(l) {
    i(l(t));
  }
  function o(l, a = A) {
    const c = [l, a];
    return r.add(c), r.size === 1 && (n = e(i) || A), l(t), () => {
      r.delete(c), r.size === 0 && (n(), n = null);
    };
  }
  return { set: i, update: s, subscribe: o };
}
function nn(t) {
  return Object.prototype.toString.call(t) === "[object Date]";
}
function wt(t, e, n, r) {
  if (typeof n == "number" || nn(n)) {
    const i = r - n, s = (n - e) / (t.dt || 1 / 60), o = t.opts.stiffness * i, l = t.opts.damping * s, a = (o - l) * t.inv_mass, c = (s + a) * t.dt;
    return Math.abs(c) < t.opts.precision && Math.abs(i) < t.opts.precision ? r : (t.settled = !1, nn(n) ? new Date(n.getTime() + c) : n + c);
  } else {
    if (Array.isArray(n))
      return n.map((i, s) => wt(t, e[s], n[s], r[s]));
    if (typeof n == "object") {
      const i = {};
      for (const s in n)
        i[s] = wt(t, e[s], n[s], r[s]);
      return i;
    } else
      throw new Error(`Cannot spring ${typeof n} values`);
  }
}
function Li(t, e = {}) {
  const n = zi(t), { stiffness: r = 0.15, damping: i = 0.8, precision: s = 0.01 } = e;
  let o, l, a, c = t, d = t, b = 1, f = 0, p = !1;
  function m(g, R = {}) {
    d = g;
    const L = a = {};
    if (t == null || R.hard || y.stiffness >= 1 && y.damping >= 1)
      return p = !0, o = St(), c = g, n.set(t = d), Promise.resolve();
    if (R.soft) {
      const P = R.soft === !0 ? 0.5 : +R.soft;
      f = 1 / (P * 60), b = 0;
    }
    return l || (o = St(), p = !1, l = gr((P) => {
      if (p)
        return p = !1, l = null, !1;
      b = Math.min(b + f, 1);
      const x = {
        inv_mass: b,
        opts: y,
        settled: !0,
        dt: (P - o) * 60 / 1e3
      }, T = wt(x, c, t, d);
      return o = P, c = t, n.set(t = T), x.settled && (l = null), !x.settled;
    })), new Promise((P) => {
      l.promise.then(() => {
        L === a && P();
      });
    });
  }
  const y = {
    set: m,
    update: (g, R) => m(g(d, t), R),
    subscribe: n.subscribe,
    stiffness: r,
    damping: i,
    precision: s
  };
  return y;
}
function rn(t, e, n) {
  const r = t.slice();
  return r[53] = e[n], r[55] = n, r;
}
function on(t, e, n) {
  const r = t.slice();
  return r[6] = e[n], r[57] = n, r;
}
function sn(t) {
  let e, n;
  return {
    c() {
      e = E("p"), n = q(t[4]), h(e, "class", "text-xs");
    },
    m(r, i) {
      O(r, e, i), _(e, n);
    },
    p(r, i) {
      i[0] & 16 && J(n, r[4]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function ln(t) {
  let e, n;
  return {
    c() {
      e = E("span"), n = q(t[5]), h(e, "class", "floating-suffix");
    },
    m(r, i) {
      O(r, e, i), _(e, n);
    },
    p(r, i) {
      i[0] & 32 && J(n, r[5]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function an(t) {
  let e, n, r, i, s, o, l = t[6] + "", a, c, d, b, f, p, m, y, g, R, L, P = t[5] && ln(t);
  function x() {
    return t[37](t[57]);
  }
  return {
    c() {
      e = E("span"), n = E("span"), r = B(), i = E("span"), s = B(), o = E("span"), a = q(l), c = B(), P && P.c(), h(n, "class", "handle-bg absolute left-0 bottom-1 rounded-full opacity-50 h-full w-full transition-transform bg-gray-400"), h(i, "class", "absolute left-0 bottom-1 block rounded-full h-full w-full border border-black bg-white"), h(o, "class", d = D("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })), h(e, "role", "slider"), h(e, "class", "range absolute block h-5 w-5 top-1 bottom-auto -translate-x-1/2 -translate-y-1/2 z-[2]"), h(e, "data-handle", b = t[57]), be(e, "left", t[17][t[57]] + "%"), be(e, "z-index", t[15] === t[57] ? 3 : 2), h(e, "aria-valuemin", f = t[0] === !0 && t[57] === 1 ? t[9] : t[7]), h(e, "aria-valuemax", p = t[0] === !0 && t[57] === 0 ? t[10] : t[8]), h(e, "aria-valuenow", m = t[6]), h(e, "aria-valuetext", y = t[6]?.toString()), h(e, "aria-orientation", "horizontal"), h(e, "aria-disabled", t[2]), h(e, "disabled", t[2]), h(e, "tabindex", g = t[2] ? -1 : 0), $(e, "active", t[13] && t[15] === t[57]), $(e, "press", t[14] && t[15] === t[57]);
    },
    m(T, C) {
      O(T, e, C), _(e, n), _(e, r), _(e, i), _(e, s), _(e, o), _(o, a), _(o, c), P && P.m(o, null), R || (L = [
        W(e, "blur", t[20]),
        W(e, "focus", x)
      ], R = !0);
    },
    p(T, C) {
      t = T, C[0] & 1536 && l !== (l = t[6] + "") && J(a, l), t[5] ? P ? P.p(t, C) : (P = ln(t), P.c(), P.m(o, null)) : P && (P.d(1), P = null), C[0] & 40960 && d !== (d = D("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })) && h(o, "class", d), C[0] & 131072 && be(e, "left", t[17][t[57]] + "%"), C[0] & 32768 && be(e, "z-index", t[15] === t[57] ? 3 : 2), C[0] & 641 && f !== (f = t[0] === !0 && t[57] === 1 ? t[9] : t[7]) && h(e, "aria-valuemin", f), C[0] & 1281 && p !== (p = t[0] === !0 && t[57] === 0 ? t[10] : t[8]) && h(e, "aria-valuemax", p), C[0] & 1536 && m !== (m = t[6]) && h(e, "aria-valuenow", m), C[0] & 1536 && y !== (y = t[6]?.toString()) && h(e, "aria-valuetext", y), C[0] & 4 && h(e, "aria-disabled", t[2]), C[0] & 4 && h(e, "disabled", t[2]), C[0] & 4 && g !== (g = t[2] ? -1 : 0) && h(e, "tabindex", g), C[0] & 40960 && $(e, "active", t[13] && t[15] === t[57]), C[0] & 49152 && $(e, "press", t[14] && t[15] === t[57]);
    },
    d(T) {
      T && I(e), P && P.d(), R = !1, me(L);
    }
  };
}
function cn(t) {
  let e;
  return {
    c() {
      e = E("span"), h(e, "class", "absolute block transition duration-200 h-1 -top-0.5 select-none z-[1] bg-black"), be(e, "left", t[18](t[17]) + "%"), be(e, "right", t[19](t[17]) + "%");
    },
    m(n, r) {
      O(n, e, r);
    },
    p(n, r) {
      r[0] & 131072 && be(e, "left", n[18](n[17]) + "%"), r[0] & 131072 && be(e, "right", n[19](n[17]) + "%");
    },
    d(n) {
      n && I(e);
    }
  };
}
function un(t) {
  let e, n;
  return {
    c() {
      e = E("span"), n = q(t[5]), h(e, "class", "pipVal-suffix");
    },
    m(r, i) {
      O(r, e, i), _(e, n);
    },
    p(r, i) {
      i[0] & 32 && J(n, r[5]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function fn(t) {
  let e, n = Array.from({ length: t[12] + 1 }), r = [];
  for (let i = 0; i < n.length; i += 1)
    r[i] = hn(rn(t, n, i));
  return {
    c() {
      for (let i = 0; i < r.length; i += 1)
        r[i].c();
      e = kt();
    },
    m(i, s) {
      for (let o = 0; o < r.length; o += 1)
        r[o].m(i, s);
      O(i, e, s);
    },
    p(i, s) {
      if (s[0] & 70016) {
        n = Array.from({ length: i[12] + 1 });
        let o;
        for (o = 0; o < n.length; o += 1) {
          const l = rn(i, n, o);
          r[o] ? r[o].p(l, s) : (r[o] = hn(l), r[o].c(), r[o].m(e.parentNode, e));
        }
        for (; o < r.length; o += 1)
          r[o].d(1);
        r.length = n.length;
      }
    },
    d(i) {
      lt(r, i), i && I(e);
    }
  };
}
function dn(t) {
  let e;
  return {
    c() {
      e = E("span"), h(e, "class", "absolute h-[4px] w-[1px] top-[calc(50%-9px)] whitespace-nowrap transition bg-black/50"), be(e, "left", rt(t[16](t[55]), t[7], t[8], 2) + "%");
    },
    m(n, r) {
      O(n, e, r);
    },
    p(n, r) {
      r[0] & 65920 && be(e, "left", rt(n[16](n[55]), n[7], n[8], 2) + "%");
    },
    d(n) {
      n && I(e);
    }
  };
}
function hn(t) {
  let e = t[16](t[55]) !== t[7] && t[16](t[55]) !== t[8], n, r = e && dn(t);
  return {
    c() {
      r && r.c(), n = kt();
    },
    m(i, s) {
      r && r.m(i, s), O(i, n, s);
    },
    p(i, s) {
      s[0] & 65920 && (e = i[16](i[55]) !== i[7] && i[16](i[55]) !== i[8]), e ? r ? r.p(i, s) : (r = dn(i), r.c(), r.m(n.parentNode, n)) : r && (r.d(1), r = null);
    },
    d(i) {
      r && r.d(i), i && I(n);
    }
  };
}
function bn(t) {
  let e, n;
  return {
    c() {
      e = E("span"), n = q(t[5]), h(e, "class", "pipVal-suffix");
    },
    m(r, i) {
      O(r, e, i), _(e, n);
    },
    p(r, i) {
      i[0] & 32 && J(n, r[5]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function Vi(t) {
  let e, n, r, i, s, o, l, a, c, d, b, f, p, m, y, g, R, L = t[4] && sn(t), P = t[10] ? [t[9], t[10]] : [t[9]], x = [];
  for (let w = 0; w < P.length; w += 1)
    x[w] = an(on(t, P, w));
  let T = t[0] && cn(t), C = t[5] && un(t), j = t[3] && fn(t), z = t[5] && bn(t);
  return {
    c() {
      e = E("label"), L && L.c(), n = B(), r = E("div");
      for (let w = 0; w < x.length; w += 1)
        x[w].c();
      i = B(), T && T.c(), s = B(), o = E("div"), l = E("small"), a = q(t[7]), c = B(), C && C.c(), d = B(), j && j.c(), b = B(), f = E("small"), p = q(t[8]), m = B(), z && z.c(), this.c = A, h(l, "class", "absolute bottom-full left-0 -translate-x-1/2 mb-3 whitespace-nowrap"), h(f, "class", "absolute bottom-full right-0 translate-x-1/2 mb-3 whitespace-nowrap"), h(o, "class", "absolute h-2 left-0 right-0"), $(o, "disabled", t[2]), $(o, "focus", t[13]), h(r, "class", y = D("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": t[2] })), $(r, "range", t[0]), $(r, "focus", t[13]), $(r, "min", t[0] === "min"), $(r, "max", t[0] === "max"), h(e, "class", "flex flex-col gap-2");
    },
    m(w, N) {
      O(w, e, N), L && L.m(e, null), _(e, n), _(e, r);
      for (let H = 0; H < x.length; H += 1)
        x[H].m(r, null);
      _(r, i), T && T.m(r, null), _(r, s), _(r, o), _(o, l), _(l, a), _(l, c), C && C.m(l, null), _(o, d), j && j.m(o, null), _(o, b), _(o, f), _(f, p), _(f, m), z && z.m(f, null), t[38](r), g || (R = [
        W(window, "mousedown", t[24]),
        W(window, "touchstart", t[24]),
        W(window, "mousemove", t[25]),
        W(window, "touchmove", t[25]),
        W(window, "mouseup", t[26]),
        W(window, "touchend", t[27]),
        W(window, "keydown", t[28]),
        W(r, "mousedown", t[22]),
        W(r, "mouseup", t[23]),
        W(r, "touchstart", Ue(t[22])),
        W(r, "touchend", Ue(t[23]))
      ], g = !0);
    },
    p(w, N) {
      if (w[4] ? L ? L.p(w, N) : (L = sn(w), L.c(), L.m(e, n)) : L && (L.d(1), L = null), N[0] & 3336101) {
        P = w[10] ? [w[9], w[10]] : [w[9]];
        let H;
        for (H = 0; H < P.length; H += 1) {
          const ne = on(w, P, H);
          x[H] ? x[H].p(ne, N) : (x[H] = an(ne), x[H].c(), x[H].m(r, i));
        }
        for (; H < x.length; H += 1)
          x[H].d(1);
        x.length = P.length;
      }
      w[0] ? T ? T.p(w, N) : (T = cn(w), T.c(), T.m(r, s)) : T && (T.d(1), T = null), N[0] & 128 && J(a, w[7]), w[5] ? C ? C.p(w, N) : (C = un(w), C.c(), C.m(l, null)) : C && (C.d(1), C = null), w[3] ? j ? j.p(w, N) : (j = fn(w), j.c(), j.m(o, b)) : j && (j.d(1), j = null), N[0] & 256 && J(p, w[8]), w[5] ? z ? z.p(w, N) : (z = bn(w), z.c(), z.m(f, null)) : z && (z.d(1), z = null), N[0] & 4 && $(o, "disabled", w[2]), N[0] & 8192 && $(o, "focus", w[13]), N[0] & 4 && y !== (y = D("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": w[2] })) && h(r, "class", y), N[0] & 5 && $(r, "range", w[0]), N[0] & 8196 && $(r, "focus", w[13]), N[0] & 5 && $(r, "min", w[0] === "min"), N[0] & 5 && $(r, "max", w[0] === "max");
    },
    i: A,
    o: A,
    d(w) {
      w && I(e), L && L.d(), lt(x, w), T && T.d(), C && C.d(), j && j.d(), z && z.d(), t[38](null), g = !1, me(R);
    }
  };
}
function Ii(t, e, n) {
  let r, i, s = A, o = () => (s(), s = pr(xe, (S) => n(17, i = S)), xe);
  t.$$.on_destroy.push(() => s());
  let { slider: l } = e, { range: a = !1 } = e, { min: c } = e, { max: d } = e, { step: b } = e, { value: f } = e, { start: p } = e, { end: m } = e, { disabled: y = !1 } = e, { discrete: g = !0 } = e, { label: R = "" } = e, { suffix: L = "" } = e;
  oe();
  const P = { stiffness: 0.1, damping: 0.4 };
  let x, T, C, j, z, w, N, H = 0, ne = !1, F = !1, Y = !1, fe = !1, de = -1, pe, ke, xe;
  const ge = (S, K, re) => {
    if (S <= K)
      return K;
    if (S >= re)
      return re;
    const G = (S - K) % C;
    let Ee = S - G;
    return Math.abs(G) * 2 >= C && (Ee += G > 0 ? C : -C), Ee = qr(Ee, K, re), Number.parseFloat(Ee.toFixed(2));
  }, we = (S) => S.type.includes("touch") ? S.touches[0] : S, De = (S) => {
    const K = [...l.querySelectorAll(".handle")], re = K.includes(S), G = K.some((Ee) => Ee.contains(S));
    return re || G;
  }, He = (S) => a === "min" || a === "max" ? S.slice(0, 1) : a ? S.slice(0, 2) : S, Oe = () => {
    ke = l.getBoundingClientRect();
  }, Re = (S) => {
    const re = (S.clientX - ke.left) / ke.width * 100, G = (T - x) / 100 * re + x;
    let Ee = 0;
    return a && j === z ? G > z ? 1 : 0 : (a && (Ee = [j, z].indexOf([j, z].sort((hr, br) => Math.abs(G - hr) - Math.abs(G - br))[0])), Ee);
  }, ye = (S) => {
    const re = (S.clientX - ke.left) / ke.width * 100, G = (T - x) / 100 * re + x;
    je(de, G);
  }, je = (S, K) => {
    let re = S;
    const G = ge(K, x, T);
    return typeof re > "u" && (re = de), a && (re === 0 && G > z ? n(10, z = G) : re === 1 && G < j && n(9, j = G)), re === 0 && j !== G && n(9, j = G), re === 1 && z !== G && n(10, z = G), pe !== G && (le(), pe = G), re === 0 ? n(29, p = j.toString()) : re === 1 && n(30, m = z.toString()), G;
  }, We = (S) => a === "min" ? 0 : S[0], ft = (S) => a === "max" ? 0 : a === "min" ? 100 - S[0] : 100 - S[1], dt = () => {
    fe && (n(13, ne = !1), F = !1, n(14, Y = !1));
  }, Qe = (S) => {
    y || (n(15, de = S), n(13, ne = !0));
  }, k = (S) => {
    if (y)
      return;
    Oe();
    const K = S.target, re = we(S);
    n(13, ne = !0), F = !0, n(14, Y = !0), n(15, de = Re(re)), pe = ge(de === 0 ? j : z, x, T), S.type === "touchstart" && !K.matches(".pipVal") && ye(re);
  }, u = () => {
    n(14, Y = !1);
  }, v = (S) => {
    fe = !1, ne && S.target !== l && !l.contains(S.target) && n(13, ne = !1);
  }, V = (S) => {
    y || !F || (n(13, ne = !0), ye(we(S)));
  }, X = (S) => {
    if (!y) {
      const K = S.target;
      (F && K && K === l || l.contains(K)) && (n(13, ne = !0), !De(K) && !K.matches(".pipVal") && ye(we(S)));
    }
    F = !1, n(14, Y = !1);
  }, U = () => {
    F = !1, n(14, Y = !1);
  }, Z = (S) => {
    y || (S.target === l || l.contains(S.target)) && (fe = !0);
  }, le = () => {
    y || ae(l, "input", {
      activeHandle: de,
      previousValue: pe,
      value: de === 0 ? j : z,
      values: z ? [j, z].map((S) => ge(S, x, T)) : void 0
    });
  }, se = (S) => Qe(S);
  function ce(S) {
    ue[S ? "unshift" : "push"](() => {
      l = S, n(1, l);
    });
  }
  return t.$$set = (S) => {
    "slider" in S && n(1, l = S.slider), "range" in S && n(0, a = S.range), "min" in S && n(31, c = S.min), "max" in S && n(32, d = S.max), "step" in S && n(33, b = S.step), "value" in S && n(6, f = S.value), "start" in S && n(29, p = S.start), "end" in S && n(30, m = S.end), "disabled" in S && n(2, y = S.disabled), "discrete" in S && n(3, g = S.discrete), "label" in S && n(4, R = S.label), "suffix" in S && n(5, L = S.suffix);
  }, t.$$.update = () => {
    if (t.$$.dirty[1] & 2 && n(8, T = Number.parseFloat(d || "100")), t.$$.dirty[1] & 1 && n(7, x = Number.parseFloat(c || "0")), t.$$.dirty[1] & 4 && n(34, C = Number.parseFloat(b || "1")), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(35, w = (T - x) / C >= 100 ? (T - x) / 20 : 1), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(12, N = (T - x) / C), t.$$.dirty[0] & 128 | t.$$.dirty[1] & 24 && n(16, r = (S) => x + S * C * w), t.$$.dirty[0] & 536870976 | t.$$.dirty[1] & 3 && n(9, j = p || f ? Number.parseFloat(p || f) : (Number.parseFloat(c || "0") + Number.parseFloat(d || "100")) / 2), t.$$.dirty[0] & 1073741824 && n(10, z = m ? Number.parseFloat(m) : void 0), t.$$.dirty[0] & 1073741825 && n(0, a = typeof a == "string" ? a : m !== void 0), t.$$.dirty[0] & 3968 | t.$$.dirty[1] & 32) {
      n(9, j = ge(j, x, T));
      let S = [j];
      z && (n(10, z = ge(z, x, T)), S.push(z)), S = He(S), H !== S.length ? o(n(11, xe = Li(S.map((K) => rt(K, x, T, 2)), P))) : xe.set(S.map((K) => rt(K, x, T, 2))).catch((K) => console.error(K)), n(36, H = S.length);
    }
  }, [
    a,
    l,
    y,
    g,
    R,
    L,
    f,
    x,
    T,
    j,
    z,
    xe,
    N,
    ne,
    Y,
    de,
    r,
    i,
    We,
    ft,
    dt,
    Qe,
    k,
    u,
    v,
    V,
    X,
    U,
    Z,
    p,
    m,
    c,
    d,
    b,
    C,
    w,
    H,
    se,
    ce
  ];
}
class qn extends Q {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>.slider .range:hover .handle-bg{transform:scale(1.5)}.slider .range.active .handle-bg{transform:scale(2.0)}.slider .range.active .floating,.slider .range:hover .floating{opacity:1}</style>", te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, Ii, Vi, An, {
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
    }, null, [-1, -1]), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
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
    this.$$set({ slider: e }), M();
  }
  get range() {
    return this.$$.ctx[0];
  }
  set range(e) {
    this.$$set({ range: e }), M();
  }
  get min() {
    return this.$$.ctx[31];
  }
  set min(e) {
    this.$$set({ min: e }), M();
  }
  get max() {
    return this.$$.ctx[32];
  }
  set max(e) {
    this.$$set({ max: e }), M();
  }
  get step() {
    return this.$$.ctx[33];
  }
  set step(e) {
    this.$$set({ step: e }), M();
  }
  get value() {
    return this.$$.ctx[6];
  }
  set value(e) {
    this.$$set({ value: e }), M();
  }
  get start() {
    return this.$$.ctx[29];
  }
  set start(e) {
    this.$$set({ start: e }), M();
  }
  get end() {
    return this.$$.ctx[30];
  }
  set end(e) {
    this.$$set({ end: e }), M();
  }
  get disabled() {
    return this.$$.ctx[2];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), M();
  }
  get discrete() {
    return this.$$.ctx[3];
  }
  set discrete(e) {
    this.$$set({ discrete: e }), M();
  }
  get label() {
    return this.$$.ctx[4];
  }
  set label(e) {
    this.$$set({ label: e }), M();
  }
  get suffix() {
    return this.$$.ctx[5];
  }
  set suffix(e) {
    this.$$set({ suffix: e }), M();
  }
}
customElements.define("v-slider", qn);
const Ni = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qn
}, Symbol.toStringTag, { value: "Module" }));
function mn(t) {
  let e, n, r;
  return {
    c() {
      e = E("p"), n = q(t[1]), h(e, "class", r = D("text-xs", {
        "whitespace-nowrap": t[4] === "left"
      }));
    },
    m(i, s) {
      O(i, e, s), _(e, n);
    },
    p(i, s) {
      s & 2 && J(n, i[1]), s & 16 && r !== (r = D("text-xs", {
        "whitespace-nowrap": i[4] === "left"
      })) && h(e, "class", r);
    },
    d(i) {
      i && I(e);
    }
  };
}
function pn(t) {
  let e, n;
  return {
    c() {
      e = E("p"), n = q(t[0]), h(e, "class", "capitalize text-xs");
    },
    m(r, i) {
      O(r, e, i), _(e, n);
    },
    p(r, i) {
      i & 1 && J(n, r[0]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function Fi(t) {
  let e, n, r, i, s, o, l, a, c, d, b, f, p, m = t[1] && mn(t), y = t[3] === "annotated" && pn(t);
  return {
    c() {
      e = E("label"), m && m.c(), n = B(), r = E("button"), i = E("div"), s = E("span"), o = B(), l = E("input"), c = B(), y && y.c(), this.c = A, h(s, "class", "pointer-events-none relative inline-block border border-green/100 h-4 w-4 mt-px ml-px bg-white shadow transform ring-0 motion-safe:transition-transform ease-in-out duration-200"), $(s, "translate-x-0", !t[7]), $(s, "translate-x-6", t[7]), h(l, "name", t[2]), l.value = t[0], h(l, "class", "hidden"), h(l, "type", "checkbox"), l.checked = t[7], h(i, "class", a = D("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": t[7] })), h(r, "type", "button"), h(r, "class", "flex gap-1.5 items-center"), h(r, "role", "switch"), h(r, "aria-label", t[1]), h(r, "aria-checked", d = t[7] ? "true" : "false"), h(e, "class", b = D("flex gap-1", {
        "flex-col justify-start": t[4] === "top",
        "items-center": t[4] === "left",
        "opacity-50 pointer-events-none": t[8]
      }));
    },
    m(g, R) {
      O(g, e, R), m && m.m(e, null), _(e, n), _(e, r), _(r, i), _(i, s), _(i, o), _(i, l), t[11](l), _(r, c), y && y.m(r, null), t[12](e), f || (p = W(r, "click", t[9]), f = !0);
    },
    p(g, [R]) {
      g[1] ? m ? m.p(g, R) : (m = mn(g), m.c(), m.m(e, n)) : m && (m.d(1), m = null), R & 128 && $(s, "translate-x-0", !g[7]), R & 128 && $(s, "translate-x-6", g[7]), R & 4 && h(l, "name", g[2]), R & 1 && (l.value = g[0]), R & 128 && (l.checked = g[7]), R & 128 && a !== (a = D("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": g[7] })) && h(i, "class", a), g[3] === "annotated" ? y ? y.p(g, R) : (y = pn(g), y.c(), y.m(r, null)) : y && (y.d(1), y = null), R & 2 && h(r, "aria-label", g[1]), R & 128 && d !== (d = g[7] ? "true" : "false") && h(r, "aria-checked", d), R & 272 && b !== (b = D("flex gap-1", {
        "flex-col justify-start": g[4] === "top",
        "items-center": g[4] === "left",
        "opacity-50 pointer-events-none": g[8]
      })) && h(e, "class", b);
    },
    i: A,
    o: A,
    d(g) {
      g && I(e), m && m.d(), t[11](null), y && y.d(), t[12](null), f = !1, p();
    }
  };
}
function Di(t, e, n) {
  let { label: r = "" } = e, { name: i = "" } = e, { value: s = "off" } = e, { variant: o = "default" } = e, { disabled: l } = e, { labelposition: a = "top" } = e;
  oe();
  let c, d, b, f;
  const p = () => {
    n(0, s = b ? "off" : "on"), n(6, d.checked = b, d), ae(c, "input", { value: d.checked });
  };
  function m(g) {
    ue[g ? "unshift" : "push"](() => {
      d = g, n(6, d);
    });
  }
  function y(g) {
    ue[g ? "unshift" : "push"](() => {
      c = g, n(5, c);
    });
  }
  return t.$$set = (g) => {
    "label" in g && n(1, r = g.label), "name" in g && n(2, i = g.name), "value" in g && n(0, s = g.value), "variant" in g && n(3, o = g.variant), "disabled" in g && n(10, l = g.disabled), "labelposition" in g && n(4, a = g.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 1 && n(7, b = s === "on"), t.$$.dirty & 1024 && n(8, f = Me(l, "disabled"));
  }, [
    s,
    r,
    i,
    o,
    a,
    c,
    d,
    b,
    f,
    p,
    l,
    m,
    y
  ];
}
class Zn extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, Di, Fi, ie, {
      label: 1,
      name: 2,
      value: 0,
      variant: 3,
      disabled: 10,
      labelposition: 4
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return ["label", "name", "value", "variant", "disabled", "labelposition"];
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), M();
  }
  get name() {
    return this.$$.ctx[2];
  }
  set name(e) {
    this.$$set({ name: e }), M();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), M();
  }
  get variant() {
    return this.$$.ctx[3];
  }
  set variant(e) {
    this.$$set({ variant: e }), M();
  }
  get disabled() {
    return this.$$.ctx[10];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), M();
  }
  get labelposition() {
    return this.$$.ctx[4];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), M();
  }
}
customElements.define("v-switch", Zn);
const Hi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zn
}, Symbol.toStringTag, { value: "Module" }));
function gn(t, e, n) {
  const r = t.slice();
  return r[3] = e[n], r;
}
function wn(t) {
  let e;
  return {
    c() {
      e = E("col"), be(e, "width", t[3]);
    },
    m(n, r) {
      O(n, e, r);
    },
    p: A,
    d(n) {
      n && I(e);
    }
  };
}
function Wi(t) {
  let e, n, r, i, s, o = t[1], l = [];
  for (let a = 0; a < o.length; a += 1)
    l[a] = wn(gn(t, o, a));
  return {
    c() {
      e = E("table"), n = E("colgroup");
      for (let a = 0; a < l.length; a += 1)
        l[a].c();
      r = B(), i = E("slot"), this.c = A, h(e, "class", s = D("bg-white text-xs w-full", {
        "table-fixed": t[0] === "fixed"
      }));
    },
    m(a, c) {
      O(a, e, c), _(e, n);
      for (let d = 0; d < l.length; d += 1)
        l[d].m(n, null);
      _(e, r), _(e, i);
    },
    p(a, [c]) {
      if (c & 2) {
        o = a[1];
        let d;
        for (d = 0; d < o.length; d += 1) {
          const b = gn(a, o, d);
          l[d] ? l[d].p(b, c) : (l[d] = wn(b), l[d].c(), l[d].m(n, null));
        }
        for (; d < l.length; d += 1)
          l[d].d(1);
        l.length = o.length;
      }
      c & 1 && s !== (s = D("bg-white text-xs w-full", {
        "table-fixed": a[0] === "fixed"
      })) && h(e, "class", s);
    },
    i: A,
    o: A,
    d(a) {
      a && I(e), lt(l, a);
    }
  };
}
function Bi(t, e, n) {
  oe();
  let { variant: r = "" } = e, { cols: i = "" } = e;
  const s = i.split(",").map((o) => o.trim());
  return t.$$set = (o) => {
    "variant" in o && n(0, r = o.variant), "cols" in o && n(2, i = o.cols);
  }, [r, s, i];
}
class Kn extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, Bi, Wi, ie, { variant: 0, cols: 2 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return ["variant", "cols"];
  }
  get variant() {
    return this.$$.ctx[0];
  }
  set variant(e) {
    this.$$set({ variant: e }), M();
  }
  get cols() {
    return this.$$.ctx[2];
  }
  set cols(e) {
    this.$$set({ cols: e }), M();
  }
}
customElements.define("v-table", Kn);
const Yi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Kn
}, Symbol.toStringTag, { value: "Module" }));
function yn(t, e, n) {
  const r = t.slice();
  return r[8] = e[n], r[10] = n, r;
}
function vn(t, e) {
  let n, r, i = e[8] + "", s, o, l, a, c, d;
  function b() {
    return e[6](e[8]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = E("button"), r = E("div"), s = q(i), l = B(), h(r, "class", o = D({
        "-mb-px": e[8] !== e[0]
      })), h(n, "class", a = D("px-4 py-1 uppercase text-sm first:ml-4 ", {
        "bg-white border border-x-black border-t-black border-b-white font-bold -mb-px": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })), this.first = n;
    },
    m(f, p) {
      O(f, n, p), _(n, r), _(r, s), _(n, l), c || (d = W(n, "click", b), c = !0);
    },
    p(f, p) {
      e = f, p & 2 && i !== (i = e[8] + "") && J(s, i), p & 3 && o !== (o = D({
        "-mb-px": e[8] !== e[0]
      })) && h(r, "class", o), p & 11 && a !== (a = D("px-4 py-1 uppercase text-sm first:ml-4 ", {
        "bg-white border border-x-black border-t-black border-b-white font-bold -mb-px": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })) && h(n, "class", a);
    },
    d(f) {
      f && I(n), c = !1, d();
    }
  };
}
function Xi(t) {
  let e, n = [], r = /* @__PURE__ */ new Map(), i = t[1];
  const s = (o) => o[8];
  for (let o = 0; o < i.length; o += 1) {
    let l = yn(t, i, o), a = s(l);
    r.set(a, n[o] = vn(a, l));
  }
  return {
    c() {
      e = E("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
      this.c = A, h(e, "class", "w-full flex bg-black/20 border-b border-b-black");
    },
    m(o, l) {
      O(o, e, l);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
      t[7](e);
    },
    p(o, [l]) {
      l & 27 && (i = o[1], n = Je(n, l, s, 1, o, i, r, e, Ke, vn, null, yn));
    },
    i: A,
    o: A,
    d(o) {
      o && I(e);
      for (let l = 0; l < n.length; l += 1)
        n[l].d();
      t[7](null);
    }
  };
}
function Ui(t, e, n) {
  let r, i, { tabs: s = "" } = e, { selected: o = "" } = e, l;
  oe();
  const a = (b) => {
    n(0, o = b), ae(l, "input", { value: o });
  }, c = (b) => a(b);
  function d(b) {
    ue[b ? "unshift" : "push"](() => {
      l = b, n(2, l);
    });
  }
  return t.$$set = (b) => {
    "tabs" in b && n(5, s = b.tabs), "selected" in b && n(0, o = b.selected);
  }, t.$$.update = () => {
    t.$$.dirty & 32 && n(1, r = s.split(",").map((b) => b.trim())), t.$$.dirty & 3 && n(3, i = r.indexOf(o));
  }, [
    o,
    r,
    l,
    i,
    a,
    s,
    c,
    d
  ];
}
class Jn extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, Ui, Xi, ie, { tabs: 5, selected: 0 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return ["tabs", "selected"];
  }
  get tabs() {
    return this.$$.ctx[5];
  }
  set tabs(e) {
    this.$$set({ tabs: e }), M();
  }
  get selected() {
    return this.$$.ctx[0];
  }
  set selected(e) {
    this.$$set({ selected: e }), M();
  }
}
customElements.define("v-tabs", Jn);
const qi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jn
}, Symbol.toStringTag, { value: "Module" }));
function Zi(t) {
  let e;
  return {
    c() {
      e = E("tbody"), e.innerHTML = "<slot></slot>", this.c = A;
    },
    m(n, r) {
      O(n, e, r);
    },
    p: A,
    i: A,
    o: A,
    d(n) {
      n && I(e);
    }
  };
}
function Ki(t) {
  return oe(), [];
}
class Gn extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, Ki, Zi, ie, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-tbody", Gn);
const Ji = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gn
}, Symbol.toStringTag, { value: "Module" }));
function Gi(t) {
  let e;
  return {
    c() {
      e = E("th"), e.innerHTML = "<slot></slot>", this.c = A, h(e, "class", "p-2 text-neutral-600 font-normal overflow-hidden");
    },
    m(n, r) {
      O(n, e, r);
    },
    p: A,
    i: A,
    o: A,
    d(n) {
      n && I(e);
    }
  };
}
function Qi(t) {
  return oe(), [];
}
class Qn extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, Qi, Gi, ie, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-th", Qn);
const $i = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qn
}, Symbol.toStringTag, { value: "Module" }));
function eo(t) {
  let e;
  return {
    c() {
      e = E("td"), e.innerHTML = "<slot></slot>", this.c = A, h(e, "class", "p-2 overflow-hidden");
    },
    m(n, r) {
      O(n, e, r);
    },
    p: A,
    i: A,
    o: A,
    d(n) {
      n && I(e);
    }
  };
}
function to(t) {
  return oe(), [];
}
class $n extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, to, eo, ie, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-td", $n);
const no = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $n
}, Symbol.toStringTag, { value: "Module" }));
function ro(t) {
  let e;
  return {
    c() {
      e = E("thead"), e.innerHTML = "<slot></slot>", this.c = A, h(e, "class", "border-b border-black");
    },
    m(n, r) {
      O(n, e, r);
    },
    p: A,
    i: A,
    o: A,
    d(n) {
      n && I(e);
    }
  };
}
function io(t) {
  return oe(), [];
}
class er extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, io, ro, ie, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-thead", er);
const oo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: er
}, Symbol.toStringTag, { value: "Module" }));
function Ge(t) {
  return t.split("-")[0];
}
function Et(t) {
  return t.split("-")[1];
}
function at(t) {
  return ["top", "bottom"].includes(Ge(t)) ? "x" : "y";
}
function tr(t) {
  return t === "y" ? "height" : "width";
}
function _n(t, e, n) {
  let {
    reference: r,
    floating: i
  } = t;
  const s = r.x + r.width / 2 - i.width / 2, o = r.y + r.height / 2 - i.height / 2, l = at(e), a = tr(l), c = r[a] / 2 - i[a] / 2, d = Ge(e), b = l === "x";
  let f;
  switch (d) {
    case "top":
      f = {
        x: s,
        y: r.y - i.height
      };
      break;
    case "bottom":
      f = {
        x: s,
        y: r.y + r.height
      };
      break;
    case "right":
      f = {
        x: r.x + r.width,
        y: o
      };
      break;
    case "left":
      f = {
        x: r.x - i.width,
        y: o
      };
      break;
    default:
      f = {
        x: r.x,
        y: r.y
      };
  }
  switch (Et(e)) {
    case "start":
      f[l] -= c * (n && b ? -1 : 1);
      break;
    case "end":
      f[l] += c * (n && b ? -1 : 1);
      break;
  }
  return f;
}
const so = async (t, e, n) => {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: s = [],
    platform: o
  } = n, l = await (o.isRTL == null ? void 0 : o.isRTL(e));
  let a = await o.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: c,
    y: d
  } = _n(a, r, l), b = r, f = {}, p = 0;
  for (let m = 0; m < s.length; m++) {
    const {
      name: y,
      fn: g
    } = s[m], {
      x: R,
      y: L,
      data: P,
      reset: x
    } = await g({
      x: c,
      y: d,
      initialPlacement: r,
      placement: b,
      strategy: i,
      middlewareData: f,
      rects: a,
      platform: o,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (c = R ?? c, d = L ?? d, f = {
      ...f,
      [y]: {
        ...f[y],
        ...P
      }
    }, x && p <= 50) {
      p++, typeof x == "object" && (x.placement && (b = x.placement), x.rects && (a = x.rects === !0 ? await o.getElementRects({
        reference: t,
        floating: e,
        strategy: i
      }) : x.rects), {
        x: c,
        y: d
      } = _n(a, b, l)), m = -1;
      continue;
    }
  }
  return {
    x: c,
    y: d,
    placement: b,
    strategy: i,
    middlewareData: f
  };
};
function lo(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function ao(t) {
  return typeof t != "number" ? lo(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function it(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
async function nr(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: r,
    y: i,
    platform: s,
    rects: o,
    elements: l,
    strategy: a
  } = t, {
    boundary: c = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: b = "floating",
    altBoundary: f = !1,
    padding: p = 0
  } = e, m = ao(p), g = l[f ? b === "floating" ? "reference" : "floating" : b], R = it(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(g))) == null || n ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(l.floating)),
    boundary: c,
    rootBoundary: d,
    strategy: a
  })), L = it(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: b === "floating" ? {
      ...o.floating,
      x: r,
      y: i
    } : o.reference,
    offsetParent: await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating)),
    strategy: a
  }) : o[b]);
  return {
    top: R.top - L.top + m.top,
    bottom: L.bottom - R.bottom + m.bottom,
    left: R.left - L.left + m.left,
    right: L.right - R.right + m.right
  };
}
const co = Math.min, uo = Math.max;
function kn(t, e, n) {
  return uo(t, co(e, n));
}
const fo = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ot(t) {
  return t.replace(/left|right|bottom|top/g, (e) => fo[e]);
}
function ho(t, e, n) {
  n === void 0 && (n = !1);
  const r = Et(t), i = at(t), s = tr(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (o = ot(o)), {
    main: o,
    cross: ot(o)
  };
}
const bo = {
  start: "end",
  end: "start"
};
function xn(t) {
  return t.replace(/start|end/g, (e) => bo[e]);
}
function mo(t) {
  const e = ot(t);
  return [xn(t), e, xn(e)];
}
const po = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n;
      const {
        placement: r,
        middlewareData: i,
        rects: s,
        initialPlacement: o,
        platform: l,
        elements: a
      } = e, {
        mainAxis: c = !0,
        crossAxis: d = !0,
        fallbackPlacements: b,
        fallbackStrategy: f = "bestFit",
        flipAlignment: p = !0,
        ...m
      } = t, y = Ge(r), R = b || (y === o || !p ? [ot(o)] : mo(o)), L = [o, ...R], P = await nr(e, m), x = [];
      let T = ((n = i.flip) == null ? void 0 : n.overflows) || [];
      if (c && x.push(P[y]), d) {
        const {
          main: w,
          cross: N
        } = ho(r, s, await (l.isRTL == null ? void 0 : l.isRTL(a.floating)));
        x.push(P[w], P[N]);
      }
      if (T = [...T, {
        placement: r,
        overflows: x
      }], !x.every((w) => w <= 0)) {
        var C, j;
        const w = ((C = (j = i.flip) == null ? void 0 : j.index) != null ? C : 0) + 1, N = L[w];
        if (N)
          return {
            data: {
              index: w,
              overflows: T
            },
            reset: {
              placement: N
            }
          };
        let H = "bottom";
        switch (f) {
          case "bestFit": {
            var z;
            const ne = (z = T.map((F) => [F, F.overflows.filter((Y) => Y > 0).reduce((Y, fe) => Y + fe, 0)]).sort((F, Y) => F[1] - Y[1])[0]) == null ? void 0 : z[0].placement;
            ne && (H = ne);
            break;
          }
          case "initialPlacement":
            H = o;
            break;
        }
        if (r !== H)
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
async function go(t, e) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = t, s = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Ge(n), l = Et(n), a = at(n) === "x", c = ["left", "top"].includes(o) ? -1 : 1, d = s && a ? -1 : 1, b = typeof e == "function" ? e(t) : e;
  let {
    mainAxis: f,
    crossAxis: p,
    alignmentAxis: m
  } = typeof b == "number" ? {
    mainAxis: b,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...b
  };
  return l && typeof m == "number" && (p = l === "end" ? m * -1 : m), a ? {
    x: p * d,
    y: f * c
  } : {
    x: f * c,
    y: p * d
  };
}
const wo = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r
      } = e, i = await go(e, t);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
};
function yo(t) {
  return t === "x" ? "y" : "x";
}
const vo = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r,
        placement: i
      } = e, {
        mainAxis: s = !0,
        crossAxis: o = !1,
        limiter: l = {
          fn: (g) => {
            let {
              x: R,
              y: L
            } = g;
            return {
              x: R,
              y: L
            };
          }
        },
        ...a
      } = t, c = {
        x: n,
        y: r
      }, d = await nr(e, a), b = at(Ge(i)), f = yo(b);
      let p = c[b], m = c[f];
      if (s) {
        const g = b === "y" ? "top" : "left", R = b === "y" ? "bottom" : "right", L = p + d[g], P = p - d[R];
        p = kn(L, p, P);
      }
      if (o) {
        const g = f === "y" ? "top" : "left", R = f === "y" ? "bottom" : "right", L = m + d[g], P = m - d[R];
        m = kn(L, m, P);
      }
      const y = l.fn({
        ...e,
        [b]: p,
        [f]: m
      });
      return {
        ...y,
        data: {
          x: y.x - n,
          y: y.y - r
        }
      };
    }
  };
};
function rr(t) {
  return t && t.document && t.location && t.alert && t.setInterval;
}
function Ce(t) {
  if (t == null)
    return window;
  if (!rr(t)) {
    const e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function ve(t) {
  return Ce(t).getComputedStyle(t);
}
function Se(t) {
  return rr(t) ? "" : t ? (t.nodeName || "").toLowerCase() : "";
}
function ir() {
  const t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map((e) => e.brand + "/" + e.version).join(" ") : navigator.userAgent;
}
function _e(t) {
  return t instanceof Ce(t).HTMLElement;
}
function Ie(t) {
  return t instanceof Ce(t).Element;
}
function _o(t) {
  return t instanceof Ce(t).Node;
}
function Ne(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = Ce(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function ct(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r
  } = ve(t);
  return /auto|scroll|overlay|hidden/.test(e + r + n);
}
function ko(t) {
  return ["table", "td", "th"].includes(Se(t));
}
function or(t) {
  const e = /firefox/i.test(ir()), n = ve(t);
  return n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].includes(n.willChange) || e && n.willChange === "filter" || e && (n.filter ? n.filter !== "none" : !1);
}
function sr() {
  return !/^((?!chrome|android).)*safari/i.test(ir());
}
const En = Math.min, Xe = Math.max, st = Math.round;
function Pe(t, e, n) {
  var r, i, s, o;
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const l = t.getBoundingClientRect();
  let a = 1, c = 1;
  e && _e(t) && (a = t.offsetWidth > 0 && st(l.width) / t.offsetWidth || 1, c = t.offsetHeight > 0 && st(l.height) / t.offsetHeight || 1);
  const d = Ie(t) ? Ce(t) : window, b = !sr() && n, f = (l.left + (b && (r = (i = d.visualViewport) == null ? void 0 : i.offsetLeft) != null ? r : 0)) / a, p = (l.top + (b && (s = (o = d.visualViewport) == null ? void 0 : o.offsetTop) != null ? s : 0)) / c, m = l.width / a, y = l.height / c;
  return {
    width: m,
    height: y,
    top: p,
    right: f + m,
    bottom: p + y,
    left: f,
    x: f,
    y: p
  };
}
function Ae(t) {
  return ((_o(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function ut(t) {
  return Ie(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function lr(t) {
  return Pe(Ae(t)).left + ut(t).scrollLeft;
}
function xo(t) {
  const e = Pe(t);
  return st(e.width) !== t.offsetWidth || st(e.height) !== t.offsetHeight;
}
function Eo(t, e, n) {
  const r = _e(e), i = Ae(e), s = Pe(t, r && xo(e), n === "fixed");
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = {
    x: 0,
    y: 0
  };
  if (r || !r && n !== "fixed")
    if ((Se(e) !== "body" || ct(i)) && (o = ut(e)), _e(e)) {
      const a = Pe(e, !0);
      l.x = a.x + e.clientLeft, l.y = a.y + e.clientTop;
    } else
      i && (l.x = lr(i));
  return {
    x: s.left + o.scrollLeft - l.x,
    y: s.top + o.scrollTop - l.y,
    width: s.width,
    height: s.height
  };
}
function ar(t) {
  return Se(t) === "html" ? t : t.assignedSlot || t.parentNode || (Ne(t) ? t.host : null) || Ae(t);
}
function Mn(t) {
  return !_e(t) || ve(t).position === "fixed" ? null : Mo(t);
}
function Mo(t) {
  let {
    offsetParent: e
  } = t, n = t, r = !1;
  for (; n && n !== e; ) {
    const {
      assignedSlot: i
    } = n;
    if (i) {
      let s = i.offsetParent;
      if (ve(i).display === "contents") {
        const o = i.hasAttribute("style"), l = i.style.display;
        i.style.display = ve(n).display, s = i.offsetParent, i.style.display = l, o || i.removeAttribute("style");
      }
      n = i, e !== s && (e = s, r = !0);
    } else if (Ne(n) && n.host && r)
      break;
    n = Ne(n) && n.host || n.parentNode;
  }
  return e;
}
function So(t) {
  let e = ar(t);
  for (Ne(e) && (e = e.host); _e(e) && !["html", "body"].includes(Se(e)); ) {
    if (or(e))
      return e;
    {
      const n = e.parentNode;
      e = Ne(n) ? n.host : n;
    }
  }
  return null;
}
function yt(t) {
  const e = Ce(t);
  let n = Mn(t);
  for (; n && ko(n) && ve(n).position === "static"; )
    n = Mn(n);
  return n && (Se(n) === "html" || Se(n) === "body" && ve(n).position === "static" && !or(n)) ? e : n || So(t) || e;
}
function Sn(t) {
  if (_e(t))
    return {
      width: t.offsetWidth,
      height: t.offsetHeight
    };
  const e = Pe(t);
  return {
    width: e.width,
    height: e.height
  };
}
function Co(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: r
  } = t;
  const i = _e(n), s = Ae(n);
  if (n === s)
    return e;
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = {
    x: 0,
    y: 0
  };
  if ((i || !i && r !== "fixed") && ((Se(n) !== "body" || ct(s)) && (o = ut(n)), _e(n))) {
    const a = Pe(n, !0);
    l.x = a.x + n.clientLeft, l.y = a.y + n.clientTop;
  }
  return {
    ...e,
    x: e.x - o.scrollLeft + l.x,
    y: e.y - o.scrollTop + l.y
  };
}
function Ao(t, e) {
  const n = Ce(t), r = Ae(t), i = n.visualViewport;
  let s = r.clientWidth, o = r.clientHeight, l = 0, a = 0;
  if (i) {
    s = i.width, o = i.height;
    const c = sr();
    (c || !c && e === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: s,
    height: o,
    x: l,
    y: a
  };
}
function Oo(t) {
  var e;
  const n = Ae(t), r = ut(t), i = (e = t.ownerDocument) == null ? void 0 : e.body, s = Xe(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = Xe(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0);
  let l = -r.scrollLeft + lr(t);
  const a = -r.scrollTop;
  return ve(i || n).direction === "rtl" && (l += Xe(n.clientWidth, i ? i.clientWidth : 0) - s), {
    width: s,
    height: o,
    x: l,
    y: a
  };
}
function cr(t) {
  const e = ar(t);
  return ["html", "body", "#document"].includes(Se(e)) ? t.ownerDocument.body : _e(e) && ct(e) ? e : cr(e);
}
function ur(t, e) {
  var n;
  e === void 0 && (e = []);
  const r = cr(t), i = r === ((n = t.ownerDocument) == null ? void 0 : n.body), s = Ce(r), o = i ? [s].concat(s.visualViewport || [], ct(r) ? r : []) : r, l = e.concat(o);
  return i ? l : l.concat(ur(o));
}
function Ro(t, e) {
  const n = e.getRootNode == null ? void 0 : e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && Ne(n)) {
    let r = e;
    do {
      if (r && t === r)
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function To(t, e) {
  const n = Pe(t, !1, e === "fixed"), r = n.top + t.clientTop, i = n.left + t.clientLeft;
  return {
    top: r,
    left: i,
    x: i,
    y: r,
    right: i + t.clientWidth,
    bottom: r + t.clientHeight,
    width: t.clientWidth,
    height: t.clientHeight
  };
}
function Cn(t, e, n) {
  return e === "viewport" ? it(Ao(t, n)) : Ie(e) ? To(e, n) : it(Oo(Ae(t)));
}
function Po(t) {
  const e = ur(t), r = ["absolute", "fixed"].includes(ve(t).position) && _e(t) ? yt(t) : t;
  return Ie(r) ? e.filter((i) => Ie(i) && Ro(i, r) && Se(i) !== "body") : [];
}
function jo(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = t;
  const o = [...n === "clippingAncestors" ? Po(e) : [].concat(n), r], l = o[0], a = o.reduce((c, d) => {
    const b = Cn(e, d, i);
    return c.top = Xe(b.top, c.top), c.right = En(b.right, c.right), c.bottom = En(b.bottom, c.bottom), c.left = Xe(b.left, c.left), c;
  }, Cn(e, l, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
const zo = {
  getClippingRect: jo,
  convertOffsetParentRelativeRectToViewportRelativeRect: Co,
  isElement: Ie,
  getDimensions: Sn,
  getOffsetParent: yt,
  getDocumentElement: Ae,
  getElementRects: (t) => {
    let {
      reference: e,
      floating: n,
      strategy: r
    } = t;
    return {
      reference: Eo(e, yt(n), r),
      floating: {
        ...Sn(n),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => ve(t).direction === "rtl"
}, Lo = (t, e, n) => so(t, e, {
  platform: zo,
  ...n
});
function Vo(t) {
  let e, n, r, i, s, o, l;
  return {
    c() {
      e = E("div"), n = E("slot"), r = B(), i = E("div"), s = q(t[0]), this.c = A, h(i, "role", "tooltip"), h(i, "class", `
      absolute
      top-0
      left-0
      bg-white
      text-black
      text-left
      text-xs
      p-3
      border
      border-black
      z-10
    `), be(i, "transform", "translate(" + t[4] + "px, " + t[5] + "px)"), $(i, "invisible", t[3]), h(e, "class", "relative"), h(e, "aria-describedby", "tooltip");
    },
    m(a, c) {
      O(a, e, c), _(e, n), _(e, r), _(e, i), _(i, s), t[9](i), t[10](e), o || (l = [
        W(e, "mouseenter", t[6]),
        W(e, "mouseleave", t[7])
      ], o = !0);
    },
    p(a, [c]) {
      c & 1 && J(s, a[0]), c & 48 && be(i, "transform", "translate(" + a[4] + "px, " + a[5] + "px)"), c & 8 && $(i, "invisible", a[3]);
    },
    i: A,
    o: A,
    d(a) {
      a && I(e), t[9](null), t[10](null), o = !1, me(l);
    }
  };
}
function Io(t, e, n) {
  let { text: r = "" } = e, { location: i = "top" } = e, s, o, l = !0, a = 0, c = 0;
  const d = async () => {
    const y = await Lo(s, o, {
      placement: i,
      middleware: [po(), vo({ padding: 5 }), wo(10)]
    });
    n(4, a = y.x), n(5, c = y.y);
  }, b = async () => {
    await d(), n(3, l = !1);
  }, f = () => {
    n(3, l = !0);
  };
  oe();
  function p(y) {
    ue[y ? "unshift" : "push"](() => {
      o = y, n(2, o);
    });
  }
  function m(y) {
    ue[y ? "unshift" : "push"](() => {
      s = y, n(1, s);
    });
  }
  return t.$$set = (y) => {
    "text" in y && n(0, r = y.text), "location" in y && n(8, i = y.location);
  }, [
    r,
    s,
    o,
    l,
    a,
    c,
    b,
    f,
    i,
    p,
    m
  ];
}
class fr extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, Io, Vo, ie, { text: 0, location: 8 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return ["text", "location"];
  }
  get text() {
    return this.$$.ctx[0];
  }
  set text(e) {
    this.$$set({ text: e }), M();
  }
  get location() {
    return this.$$.ctx[8];
  }
  set location(e) {
    this.$$set({ location: e }), M();
  }
}
customElements.define("v-tooltip", fr);
const No = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fr
}, Symbol.toStringTag, { value: "Module" }));
function Fo(t) {
  let e;
  return {
    c() {
      e = E("tr"), e.innerHTML = "<slot></slot>", this.c = A, h(e, "class", "border-b");
    },
    m(n, r) {
      O(n, e, r);
    },
    p: A,
    i: A,
    o: A,
    d(n) {
      n && I(e);
    }
  };
}
function Do(t) {
  return oe(), [];
}
class dr extends Q {
  constructor(e) {
    super(), te(this, {
      target: this.shadowRoot,
      props: ee(this.attributes),
      customElement: !0
    }, Do, Fo, ie, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-tr", dr);
const Ho = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dr
}, Symbol.toStringTag, { value: "Module" }));
