(function() {
  const t = /* @__PURE__ */ new WeakMap(), e = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), b = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), g = /* @__PURE__ */ new WeakMap(), p = { attributes: !0, attributeFilter: ["disabled"] }, w = new MutationObserver((E) => {
    for (const u of E) {
      const v = u.target;
      if (v.constructor.formAssociated) {
        const V = v.hasAttribute("disabled");
        v.toggleAttribute("internals-disabled", V), V ? v.setAttribute("aria-disabled", "true") : v.removeAttribute("aria-disabled"), v.formDisabledCallback && v.formDisabledCallback.apply(v, [V]);
      }
    }
  }), m = (E) => {
    n.get(E).forEach((v) => {
      v.remove();
    }), n.set(E, []);
  }, y = (E, u) => {
    const v = document.createElement("input");
    return v.type = "hidden", v.name = E.getAttribute("name"), E.after(v), n.get(u).push(v), v;
  }, k = (E, u) => {
    n.set(u, []);
    const v = E.hasAttribute("disabled");
    E.toggleAttribute("internals-disabled", v), w.observe(E, p);
  }, M = (E, u) => {
    if (u.length) {
      Array.from(u).forEach((V) => V.addEventListener("click", E.focus.bind(E)));
      let v = u[0].id;
      u[0].id || (v = `${u[0].htmlFor}_Label`, u[0].id = v), E.setAttribute("aria-labelledby", v);
    }
  }, x = (E) => {
    const u = Array.from(E.elements).filter((q) => q.validity).map((q) => q.validity.valid), v = l.get(E) || [], V = Array.from(v).filter((q) => q.isConnected).map((q) => r.get(q).validity.valid), U = [...u, ...V].includes(!1);
    E.toggleAttribute("internals-invalid", U), E.toggleAttribute("internals-valid", !U);
  }, z = (E) => {
    x(D(E.target));
  }, R = (E) => {
    x(D(E.target));
  }, j = (E) => {
    const u = E.target, v = l.get(u);
    u.noValidate || v.size && (Array.from(v).reverse().map((q) => r.get(q).reportValidity()).includes(!1) ? (E.stopImmediatePropagation(), E.stopPropagation(), E.preventDefault()) : g.get(u) && g.get(u).call(u, E) === !1 && E.preventDefault());
  }, L = (E) => {
    const u = l.get(E.target);
    u && u.size && u.forEach((v) => {
      v.constructor.formAssociated && v.formResetCallback && v.formResetCallback.apply(v);
    });
  }, S = (E, u, v) => {
    if (u) {
      u.onsubmit && (g.set(u, u.onsubmit.bind(u)), u.onsubmit = null);
      const V = l.get(u);
      if (V)
        V.add(E);
      else {
        const U = /* @__PURE__ */ new Set();
        U.add(E), l.set(u, U), u.addEventListener("submit", j), u.addEventListener("reset", L), u.addEventListener("input", z), u.addEventListener("change", R);
      }
      s.set(u, { ref: E, internals: v }), E.constructor.formAssociated && E.formAssociatedCallback && setTimeout(() => {
        E.formAssociatedCallback.apply(E, [u]);
      }, 0), x(u);
    }
  }, D = (E) => {
    let u = E.parentNode;
    return u && u.tagName !== "FORM" && (u = D(u)), u;
  }, W = (E, u, v = DOMException) => {
    if (!E.constructor.formAssociated)
      throw new v(u);
  }, N = (E, u, v) => {
    const V = l.get(E);
    return V && V.size && V.forEach((U) => {
      r.get(U)[v]() || (u = !1);
    }), u;
  }, F = (E) => {
    if (E.constructor.formAssociated) {
      const u = r.get(E), { labels: v, form: V } = u;
      M(E, v), S(E, V, u);
    }
  }, X = {
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
  }, fe = (E, u) => {
    for (let v in X) {
      u[v] = null;
      let V = null;
      const U = X[v];
      Object.defineProperty(u, v, {
        get() {
          return V;
        },
        set(q) {
          V = q, E.isConnected ? E.setAttribute(U, q) : c.set(E, u);
        }
      });
    }
  };
  class de {
    constructor() {
      this.badInput = !1, this.customError = !1, this.patternMismatch = !1, this.rangeOverflow = !1, this.rangeUnderflow = !1, this.stepMismatch = !1, this.tooLong = !1, this.tooShort = !1, this.typeMismatch = !1, this.valid = !0, this.valueMissing = !1, Object.seal(this);
    }
  }
  const pe = (E) => (E.badInput = !1, E.customError = !1, E.patternMismatch = !1, E.rangeOverflow = !1, E.rangeUnderflow = !1, E.stepMismatch = !1, E.tooLong = !1, E.tooShort = !1, E.typeMismatch = !1, E.valid = !0, E.valueMissing = !1, E), xe = (E, u, v) => (E.valid = Ee(u), Object.keys(u).forEach((V) => E[V] = u[V]), v && x(v), E), Ee = (E) => {
    let u = !0;
    for (let v in E)
      v !== "valid" && E[v] !== !1 && (u = !1);
    return u;
  };
  function ge(E) {
    const u = r.get(E), { form: v } = u;
    S(E, v, u), M(E, u.labels);
  }
  function we(E) {
    E.forEach((u) => {
      const { addedNodes: v, removedNodes: V } = u, U = Array.from(v), q = Array.from(V);
      U.forEach((K) => {
        if (r.has(K) && K.constructor.formAssociated && ge(K), c.has(K)) {
          const le = c.get(K);
          Object.keys(X).filter((ue) => le[ue] !== null).forEach((ue) => {
            K.setAttribute(X[ue], le[ue]);
          }), c.delete(K);
        }
        if (K.localName === "form") {
          const le = l.get(K), se = document.createTreeWalker(K, NodeFilter.SHOW_ELEMENT, {
            acceptNode(O) {
              return r.has(O) && !le?.has(O) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
          });
          let ue = se.nextNode();
          for (; ue; )
            ge(ue), ue = se.nextNode();
        }
      }), q.forEach((K) => {
        const le = r.get(K);
        le && n.get(le) && m(le), o.has(K) && o.get(K).disconnect();
      });
    });
  }
  function De(E) {
    E.forEach((u) => {
      const { removedNodes: v } = u;
      v.forEach((V) => {
        const U = d.get(u.target);
        r.has(V) && F(V), U.disconnect();
      });
    });
  }
  const He = (E) => {
    const u = new MutationObserver(De);
    u.observe(E, { childList: !0 }), d.set(E, u);
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
  class ze {
    constructor(u) {
      if (!u || !u.tagName || u.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      const v = u.getRootNode(), V = new de();
      this.states = new ye(u), t.set(this, u), e.set(this, V), r.set(u, this), fe(u, this), k(u, this), Object.seal(this), F(u), v instanceof DocumentFragment && He(v);
    }
    static get isPolyfilled() {
      return !0;
    }
    checkValidity() {
      const u = t.get(this);
      if (W(u, "Failed to execute 'checkValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
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
      W(u, "Failed to read the 'form' property from 'ElementInternals': The target element is not a form-associated custom element.");
      let v;
      return u.constructor.formAssociated === !0 && (v = D(u)), v;
    }
    get labels() {
      const u = t.get(this);
      W(u, "Failed to read the 'labels' property from 'ElementInternals': The target element is not a form-associated custom element.");
      const v = u.getAttribute("id"), V = u.getRootNode();
      return V && v ? V.querySelectorAll(`[for=${v}]`) : [];
    }
    reportValidity() {
      const u = t.get(this);
      if (W(u, "Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const v = this.checkValidity(), V = b.get(this);
      if (V && !u.constructor.formAssociated)
        throw new DOMException("Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element.");
      return !v && V && (u.focus(), V.focus()), v;
    }
    setFormValue(u) {
      const v = t.get(this);
      if (W(v, "Failed to execute 'setFormValue' on 'ElementInternals': The target element is not a form-associated custom element."), m(this), u != null && !(u instanceof FormData)) {
        if (v.getAttribute("name")) {
          const V = y(v, this);
          V.value = u;
        }
      } else
        u != null && u instanceof FormData && Array.from(u).reverse().forEach(([V, U]) => {
          if (typeof U == "string") {
            const q = y(v, this);
            q.name = V, q.value = U;
          }
        });
      a.set(v, u);
    }
    setValidity(u, v, V) {
      const U = t.get(this);
      if (W(U, "Failed to execute 'setValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !u)
        throw new TypeError("Failed to execute 'setValidity' on 'ElementInternals': 1 argument required, but only 0 present.");
      b.set(this, V);
      const q = e.get(this), K = {};
      for (const ue in u)
        K[ue] = u[ue];
      Object.keys(K).length === 0 && pe(q);
      const le = { ...q, ...K };
      delete le.valid;
      const { valid: se } = xe(q, le, this.form);
      if (!se && !v)
        throw new DOMException("Failed to execute 'setValidity' on 'ElementInternals': The second argument should not be empty if one or more flags in the first argument are true.");
      i.set(this, se ? "" : v), U.toggleAttribute("internals-invalid", !se), U.toggleAttribute("internals-valid", se), U.setAttribute("aria-invalid", `${!se}`);
    }
    get shadowRoot() {
      const u = t.get(this), v = f.get(u);
      return v || null;
    }
    get validationMessage() {
      const u = t.get(this);
      return W(u, "Failed to read the 'validationMessage' property from 'ElementInternals': The target element is not a form-associated custom element."), i.get(this);
    }
    get validity() {
      const u = t.get(this);
      return W(u, "Failed to read the 'validity' property from 'ElementInternals': The target element is not a form-associated custom element."), e.get(this);
    }
    get willValidate() {
      const u = t.get(this);
      return W(u, "Failed to read the 'willValidate' property from 'ElementInternals': The target element is not a form-associated custom element."), !(u.disabled || u.hasAttribute("disabled") || u.hasAttribute("readonly"));
    }
  }
  function We() {
    if (!window.ElementInternals)
      return !1;
    class E extends HTMLElement {
      constructor() {
        super(), this.internals = this.attachInternals();
      }
    }
    const u = `element-internals-feature-detection-${Math.random().toString(36).replace(/[^a-z]+/g, "")}`;
    customElements.define(u, E);
    const v = new E();
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
      const E = HTMLElement.prototype.attachInternals;
      HTMLElement.prototype.attachInternals = function(...u) {
        const v = E.call(this, u);
        return v.states = new ye(this), v;
      };
    }
  } else {
    let E = function(...le) {
      const se = V.apply(this, le), ue = new MutationObserver(we);
      return f.set(this, se), window.ShadyDOM ? ue.observe(this, Oe) : ue.observe(se, Oe), o.set(this, ue), se;
    }, u = function(...le) {
      let se = q.apply(this, le);
      return N(this, se, "checkValidity");
    }, v = function(...le) {
      let se = K.apply(this, le);
      return N(this, se, "reportValidity");
    };
    var dt = E, ht = u, $e = v;
    window.ElementInternals = ze, HTMLElement.prototype.attachInternals = function() {
      if (this.tagName.indexOf("-") === -1)
        throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': Unable to attach ElementInternals to non-custom elements.");
      if (r.has(this))
        throw new DOMException("DOMException: Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");
      return new ze(this);
    };
    const V = Element.prototype.attachShadow;
    Element.prototype.attachShadow = E, new MutationObserver(we).observe(document.documentElement, Oe);
    const q = HTMLFormElement.prototype.checkValidity;
    HTMLFormElement.prototype.checkValidity = u;
    const K = HTMLFormElement.prototype.reportValidity;
    HTMLFormElement.prototype.reportValidity = v, window.CustomStateSet || (window.CustomStateSet = ye);
  }
})();
function P() {
}
function kt(t) {
  return t();
}
function Ct() {
  return /* @__PURE__ */ Object.create(null);
}
function me(t) {
  t.forEach(kt);
}
function xt(t) {
  return typeof t == "function";
}
function Rn(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function ie(t, e) {
  return t != t ? e == e : t !== e;
}
function wr(t) {
  return Object.keys(t).length === 0;
}
function yr(t, ...e) {
  if (t == null)
    return P;
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const Pn = typeof window < "u";
let At = Pn ? () => window.performance.now() : () => Date.now(), Tn = Pn ? (t) => requestAnimationFrame(t) : P;
const Ve = /* @__PURE__ */ new Set();
function zn(t) {
  Ve.forEach((e) => {
    e.c(t) || (Ve.delete(e), e.f());
  }), Ve.size !== 0 && Tn(zn);
}
function vr(t) {
  let e;
  return Ve.size === 0 && Tn(zn), {
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
function T(t, e, n) {
  t.insertBefore(e, n || null);
}
function I(t) {
  t.parentNode.removeChild(t);
}
function at(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function C(t) {
  return document.createElement(t);
}
function Pe(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function Z(t) {
  return document.createTextNode(t);
}
function Y() {
  return Z(" ");
}
function Et() {
  return Z("");
}
function B(t, e, n, r) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function Ue(t) {
  return function(e) {
    return e.preventDefault(), t.call(this, e);
  };
}
function rt(t) {
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
function _r(t) {
  return Array.from(t.childNodes);
}
function G(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function be(t, e, n, r) {
  n === null ? t.style.removeProperty(e) : t.style.setProperty(e, n, r ? "important" : "");
}
function ee(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
function te(t) {
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
function jn(t) {
  Fe().$$.on_mount.push(t);
}
function kr(t) {
  Fe().$$.on_destroy.push(t);
}
function bt(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach((r) => r.call(this, e));
}
const Be = [], ce = [], nt = [], Ot = [], xr = Promise.resolve();
let pt = !1;
function Er() {
  pt || (pt = !0, xr.then(A));
}
function gt(t) {
  nt.push(t);
}
const mt = /* @__PURE__ */ new Set();
let et = 0;
function A() {
  const t = qe;
  do {
    for (; et < Be.length; ) {
      const e = Be[et];
      et++, Ye(e), Mr(e.$$);
    }
    for (Ye(null), Be.length = 0, et = 0; ce.length; )
      ce.pop()();
    for (let e = 0; e < nt.length; e += 1) {
      const n = nt[e];
      mt.has(n) || (mt.add(n), n());
    }
    nt.length = 0;
  } while (Be.length);
  for (; Ot.length; )
    Ot.pop()();
  pt = !1, mt.clear(), Ye(t);
}
function Mr(t) {
  if (t.fragment !== null) {
    t.update(), me(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(gt);
  }
}
const Sr = /* @__PURE__ */ new Set();
function Ln(t, e) {
  t && t.i && (Sr.delete(t), t.i(e));
}
function Ke(t, e) {
  t.d(1), e.delete(t.key);
}
function Je(t, e, n, r, i, s, o, l, a, c, f, b) {
  let d = t.length, g = s.length, p = d;
  const w = {};
  for (; p--; )
    w[t[p].key] = p;
  const m = [], y = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Map();
  for (p = g; p--; ) {
    const R = b(i, s, p), j = n(R);
    let L = o.get(j);
    L ? r && L.p(R, e) : (L = c(j, R), L.c()), y.set(j, m[p] = L), j in w && k.set(j, Math.abs(p - w[j]));
  }
  const M = /* @__PURE__ */ new Set(), x = /* @__PURE__ */ new Set();
  function z(R) {
    Ln(R, 1), R.m(l, f), o.set(R.key, R), f = R.first, g--;
  }
  for (; d && g; ) {
    const R = m[g - 1], j = t[d - 1], L = R.key, S = j.key;
    R === j ? (f = R.first, d--, g--) : y.has(S) ? !o.has(L) || M.has(L) ? z(R) : x.has(S) ? d-- : k.get(L) > k.get(S) ? (x.add(L), z(R)) : (M.add(S), d--) : (a(j, o), d--);
  }
  for (; d--; ) {
    const R = t[d];
    y.has(R.key) || a(R, o);
  }
  for (; g; )
    z(m[g - 1]);
  return m;
}
function Cr(t, e, n, r) {
  const { fragment: i, on_mount: s, on_destroy: o, after_update: l } = t.$$;
  i && i.m(e, n), r || gt(() => {
    const a = s.map(kt).filter(xt);
    o ? o.push(...a) : me(a), t.$$.on_mount = [];
  }), l.forEach(gt);
}
function Ar(t, e) {
  const n = t.$$;
  n.fragment !== null && (me(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Or(t, e) {
  t.$$.dirty[0] === -1 && (Be.push(t), Er(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function ne(t, e, n, r, i, s, o, l = [-1]) {
  const a = qe;
  Ye(t);
  const c = t.$$ = {
    fragment: null,
    ctx: null,
    props: s,
    update: P,
    not_equal: i,
    bound: Ct(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (a ? a.$$.context : [])),
    callbacks: Ct(),
    dirty: l,
    skip_bound: !1,
    root: e.target || a.$$.root
  };
  o && o(c.root);
  let f = !1;
  if (c.ctx = n ? n(t, e.props || {}, (b, d, ...g) => {
    const p = g.length ? g[0] : d;
    return c.ctx && i(c.ctx[b], c.ctx[b] = p) && (!c.skip_bound && c.bound[b] && c.bound[b](p), f && Or(t, b)), d;
  }) : [], c.update(), f = !0, me(c.before_update), c.fragment = r ? r(c.ctx) : !1, e.target) {
    if (e.hydrate) {
      const b = _r(e.target);
      c.fragment && c.fragment.l(b), b.forEach(I);
    } else
      c.fragment && c.fragment.c();
    e.intro && Ln(t.$$.fragment), Cr(t, e.target, e.anchor, e.customElement), A();
  }
  Ye(a);
}
let $;
typeof HTMLElement == "function" && ($ = class extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const { on_mount: t } = this.$$;
    this.$$.on_disconnect = t.map(kt).filter(xt);
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
    Ar(this, 1), this.$destroy = P;
  }
  $on(t, e) {
    const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return n.push(e), () => {
      const r = n.indexOf(e);
      r !== -1 && n.splice(r, 1);
    };
  }
  $set(t) {
    this.$$set && !wr(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
});
const Vn = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.invisible{visibility:hidden}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.left-0{left:0}.right-0{right:0}.top-1{top:.25rem}.bottom-auto{bottom:auto}.bottom-1{bottom:.25rem}.left-1\\/2{left:50%}.bottom-full{bottom:100%}.-top-0\\.5{top:-.125rem}.-top-0{top:-0px}.top-\\[calc\\(50\\%-9px\\)\\]{top:calc(50% - 9px)}.top-0{top:0}.right-0\\.5{right:.125rem}.bottom-0{bottom:0}.isolate{isolation:isolate}.z-10{z-index:10}.z-\\[2\\]{z-index:2}.z-\\[1\\]{z-index:1}.mx-auto{margin-left:auto;margin-right:auto}.-mt-px{margin-top:-1px}.-mt-0\\.5{margin-top:-.125rem}.-mt-0{margin-top:-0px}.mt-1{margin-top:.25rem}.mt-7{margin-top:1.75rem}.mb-3{margin-bottom:.75rem}.mt-px{margin-top:1px}.ml-px{margin-left:1px}.-mb-px{margin-bottom:-1px}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.hidden{display:none}.h-\\[60\\%\\]{height:60%}.h-full{height:100%}.h-0\\.5{height:.125rem}.h-0{height:0px}.h-5{height:1.25rem}.h-1{height:.25rem}.h-2{height:.5rem}.h-\\[4px\\]{height:4px}.h-4{height:1rem}.max-h-0{max-height:0px}.max-h-fit{max-height:fit-content}.max-h-36{max-height:9rem}.w-px{width:1px}.w-full{width:100%}.w-5{width:1.25rem}.w-\\[1px\\]{width:1px}.w-11{width:2.75rem}.w-4{width:1rem}.w-0{width:0px}.max-w-\\[14rem\\]{max-width:14rem}.flex-shrink-0{flex-shrink:0}.grow{flex-grow:1}.table-fixed{table-layout:fixed}.-translate-x-1\\/2{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\.5{--tw-translate-y: -.375rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1{--tw-translate-y: -.25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-1\\/2{--tw-translate-x: 50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-0{--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-6{--tw-translate-x: 1.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-rotate-\\[30deg\\]{--tw-rotate: -30deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-\\[30deg\\]{--tw-rotate: 30deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-180{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.cursor-not-allowed{cursor:not-allowed}.select-none{user-select:none}.appearance-none{appearance:none}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.place-content-center{place-content:center}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-3{gap:.75rem}.gap-2{gap:.5rem}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.text-ellipsis{text-overflow:ellipsis}.whitespace-nowrap{white-space:nowrap}.rounded-full{border-radius:9999px}.rounded-xl{border-radius:.75rem}.border{border-width:1px}.border-0{border-width:0px}.border-y{border-top-width:1px;border-bottom-width:1px}.border-l{border-left-width:1px}.border-l-4{border-left-width:4px}.border-b{border-bottom-width:1px}.border-r{border-right-width:1px}.border-black{--tw-border-opacity: 1;border-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-red\\/90{--tw-border-opacity: 1;border-color:rgb(190 48 38 / var(--tw-border-opacity))}.border-orange\\/90{--tw-border-opacity: 1;border-color:rgb(255 153 0 / var(--tw-border-opacity))}.border-green\\/90{--tw-border-opacity: 1;border-color:rgb(57 127 72 / var(--tw-border-opacity))}.border-blue\\/90{--tw-border-opacity: 1;border-color:rgb(4 86 129 / var(--tw-border-opacity))}.border-black\\/70{--tw-border-opacity: 1;border-color:rgb(85 85 85 / var(--tw-border-opacity))}.border-green\\/100{--tw-border-opacity: 1;border-color:rgb(41 91 51 / var(--tw-border-opacity))}.border-white{--tw-border-opacity: 1;border-color:rgb(255 255 255 / var(--tw-border-opacity))}.border-x-black{--tw-border-opacity: 1;border-left-color:rgb(0 0 0 / var(--tw-border-opacity));border-right-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-b-black{--tw-border-opacity: 1;border-bottom-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-t-black{--tw-border-opacity: 1;border-top-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-b-white{--tw-border-opacity: 1;border-bottom-color:rgb(255 255 255 / var(--tw-border-opacity))}.border-l-gray-300{--tw-border-opacity: 1;border-left-color:rgb(209 213 219 / var(--tw-border-opacity))}.border-r-gray-300{--tw-border-opacity: 1;border-right-color:rgb(209 213 219 / var(--tw-border-opacity))}.bg-green-200{--tw-bg-opacity: 1;background-color:rgb(187 247 208 / var(--tw-bg-opacity))}.bg-orange-200{--tw-bg-opacity: 1;background-color:rgb(254 215 170 / var(--tw-bg-opacity))}.bg-red-200{--tw-bg-opacity: 1;background-color:rgb(254 202 202 / var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}.bg-black\\/50{--tw-bg-opacity: 1;background-color:rgb(157 157 157 / var(--tw-bg-opacity))}.bg-gray-400{--tw-bg-opacity: 1;background-color:rgb(156 163 175 / var(--tw-bg-opacity))}.bg-green\\/80{--tw-bg-opacity: 1;background-color:rgb(73 162 92 / var(--tw-bg-opacity))}.bg-black\\/20{--tw-bg-opacity: 1;background-color:rgb(233 233 233 / var(--tw-bg-opacity))}.bg-red\\/90{--tw-bg-opacity: 1;background-color:rgb(190 48 38 / var(--tw-bg-opacity))}.bg-green\\/90{--tw-bg-opacity: 1;background-color:rgb(57 127 72 / var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-\\[\\#C4C4C4\\]{--tw-bg-opacity: 1;background-color:rgb(196 196 196 / var(--tw-bg-opacity))}.bg-slate-200{--tw-bg-opacity: 1;background-color:rgb(226 232 240 / var(--tw-bg-opacity))}.bg-yellow-100{--tw-bg-opacity: 1;background-color:rgb(254 249 195 / var(--tw-bg-opacity))}.p-3{padding:.75rem}.p-1{padding:.25rem}.p-2{padding:.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-0{padding-top:0;padding-bottom:0}.px-4{padding-left:1rem;padding-right:1rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-1\\.5{padding-left:.375rem;padding-right:.375rem}.px-1{padding-left:.25rem;padding-right:.25rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.pb-1{padding-bottom:.25rem}.pl-2\\.5{padding-left:.625rem}.pr-1{padding-right:.25rem}.pl-2{padding-left:.5rem}.text-left{text-align:left}.text-center{text-align:center}.text-xs{font-size:.75rem;line-height:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-base{font-size:1rem;line-height:1.5rem}.text-\\[15px\\]{font-size:15px}.text-\\[10px\\]{font-size:10px}.font-bold{font-weight:700}.font-normal{font-weight:400}.uppercase{text-transform:uppercase}.capitalize{text-transform:capitalize}.text-green-900{--tw-text-opacity: 1;color:rgb(20 83 45 / var(--tw-text-opacity))}.text-orange-900{--tw-text-opacity: 1;color:rgb(124 45 18 / var(--tw-text-opacity))}.text-red-900{--tw-text-opacity: 1;color:rgb(127 29 29 / var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity))}.text-black{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-black\\/70{--tw-text-opacity: 1;color:rgb(85 85 85 / var(--tw-text-opacity))}.text-red\\/90{--tw-text-opacity: 1;color:rgb(190 48 38 / var(--tw-text-opacity))}.text-orange-400{--tw-text-opacity: 1;color:rgb(251 146 60 / var(--tw-text-opacity))}.text-neutral-600{--tw-text-opacity: 1;color:rgb(82 82 82 / var(--tw-text-opacity))}.opacity-50{opacity:.5}.opacity-0{opacity:0}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.outline-none{outline:2px solid transparent;outline-offset:2px}.ring-0{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.blur{--tw-blur: blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.drop-shadow-md{--tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / .07)) drop-shadow(0 2px 2px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-200{transition-duration:.2s}.duration-500{transition-duration:.5s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}*,input,button{font-family:Space Mono,monospace}:host{display:contents}:host([hidden]){display:none}[class^=icon-],[class*=" icon-"]{font-family:icons!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-error-outline:before{content:"\\e912"}.icon-warning:before{content:"\\e916"}.icon-disconnected:before{content:"\\e919"}.icon-send:before{content:"\\e91b"}.icon-undo:before{content:"\\e91c"}.icon-connected:before{content:"\\e91a"}.icon-download:before{content:"\\e913"}.icon-camera:before{content:"\\e914"}.icon-center:before{content:"\\e915"}.icon-arrow-up:before{content:"\\e917"}.icon-settings:before{content:"\\e918"}.icon-refresh:before{content:"\\e911"}.icon-info-outline:before{content:"\\e910"}.icon-pause-circle-filled:before{content:"\\e90e"}.icon-play-circle-filled:before{content:"\\e90f"}.icon-logout:before{content:"\\e900"}.icon-instagram:before{content:"\\e901"}.icon-social-medium:before{content:"\\e906"}.icon-copy:before{content:"\\e907"}.icon-save:before{content:"\\e909"}.icon-edit:before{content:"\\e90a";color:#555}.icon-stop-circle:before{content:"\\e903"}.icon-twitter:before{content:"\\e902"}.icon-linkedin:before{content:"\\e90b"}.icon-trash:before{content:"\\e905"}.icon-alert:before{content:"\\e904"}.icon-ask:before{content:"\\e908"}.icon-x:before{content:"\\e942"}.icon-chevron-down:before{content:"\\e90c"}.icon-checkmark:before{content:"\\e90d"}.first\\:ml-4:first-child{margin-left:1rem}.last\\:border-r:last-child{border-right-width:1px}.hover\\:bg-gray-300:hover{--tw-bg-opacity: 1;background-color:rgb(209 213 219 / var(--tw-bg-opacity))}.hover\\:bg-slate-200:hover{--tw-bg-opacity: 1;background-color:rgb(226 232 240 / var(--tw-bg-opacity))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}@media (prefers-reduced-motion: no-preference){.motion-safe\\:transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.motion-safe\\:transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}}
`;
let wt, In = !1;
try {
  wt = new CSSStyleSheet(), wt.replaceSync(Vn);
} catch {
  In = !0;
}
const oe = () => {
  const t = Fe();
  if (In) {
    const e = document.createElement("style");
    e.innerHTML = Vn, t.shadowRoot.append(e);
  } else {
    const e = t.shadowRoot;
    e.adoptedStyleSheets = [wt];
  }
}, { base: Rt = "", query: Pt = "", workers: Yo = {} } = window.PRIME_CONFIG ?? {}, Rr = async () => {
  const t = new FontFace("icons", Rt ? `url(${Rt}/icons.woff2${Pt})` : `url(icons.woff2${Pt})`);
  await t.load(), document.fonts.add(t);
}, Pr = "0.34.0", Le = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${Pr}`, Ze = [], Mt = (t, e) => `http://definitions/${t}-${e}.json`, Nn = (t = "") => t.split("/").pop(), Tr = (t, e) => {
  for (const n of Object.values(e.properties ?? []))
    n.type === "array" && n.items?.type ? n.description = `"array" of type "${n.items?.type}"` : n.type === "array" ? n.description = '"array" of type "object"' : n.description = `"${n.type}"`;
  return JSON.parse(JSON.stringify(e), (n, r) => {
    if (n === "$ref")
      return Mt(t, Nn(r));
    if (n !== "$schema")
      return r;
  });
}, zr = (t, e, n) => {
  const { $ref: r, definitions: i = {} } = e;
  for (const [s, o] of Object.entries(i))
    Ze.push({
      uri: Mt(t, s),
      schema: Tr(t, o),
      ...Nn(r) === s ? { fileMatch: n } : void 0
    });
  window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: !0,
    schemas: Ze
  });
}, jr = (t, e) => Ze.findIndex(({ uri: n }) => n === Mt(t, e)), Lr = (t, e) => {
  let n = !1;
  const { definitions: r = {} } = e;
  for (const i of Object.keys(r)) {
    const s = jr(t, i);
    Ze.splice(s, 1), n = !0;
  }
  !n || window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: !0,
    schemas: Ze
  });
}, Tt = {
  addSchemas: zr,
  removeSchemas: Lr
}, ae = (t, e, n) => t.dispatchEvent(new CustomEvent(e, {
  composed: !0,
  bubbles: !0,
  detail: n
})), Vr = /\s+|\r?\n|\r/g, zt = (t) => t.replace(Vr, "");
customElements.get("v-badge") ? console.warn("WARNING: Multiple instances of PRIME being imported.") : (Rr().catch((t) => console.error(t)), Promise.resolve().then(() => Fr), Promise.resolve().then(() => Wr), Promise.resolve().then(() => qr), Promise.resolve().then(() => Qr), Promise.resolve().then(() => ti), Promise.resolve().then(() => ii), Promise.resolve().then(() => li), Promise.resolve().then(() => ui), Promise.resolve().then(() => mi), Promise.resolve().then(() => ki), Promise.resolve().then(() => Mi), Promise.resolve().then(() => Li), Promise.resolve().then(() => Di), Promise.resolve().then(() => Bi), Promise.resolve().then(() => Ui), Promise.resolve().then(() => Ki), Promise.resolve().then(() => Qi), Promise.resolve().then(() => to), Promise.resolve().then(() => io), Promise.resolve().then(() => lo), Promise.resolve().then(() => Do), Promise.resolve().then(() => Bo));
var Fn = { exports: {} };
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
})(Fn);
const H = Fn.exports;
function Ir(t) {
  let e, n, r;
  return {
    c() {
      e = C("small"), n = Z(t[0]), this.c = P, h(e, "class", r = H("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": t[1] === "green",
        "text-orange-900 bg-orange-200": t[1] === "orange",
        "text-red-900 bg-red-200": t[1] === "red",
        "text-gray-800 bg-gray-200": t[1] === "gray"
      }));
    },
    m(i, s) {
      T(i, e, s), _(e, n);
    },
    p(i, [s]) {
      s & 1 && G(n, i[0]), s & 2 && r !== (r = H("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": i[1] === "green",
        "text-orange-900 bg-orange-200": i[1] === "orange",
        "text-red-900 bg-red-200": i[1] === "red",
        "text-gray-800 bg-gray-200": i[1] === "gray"
      })) && h(e, "class", r);
    },
    i: P,
    o: P,
    d(i) {
      i && I(e);
    }
  };
}
function Nr(t, e, n) {
  let { label: r = "" } = e, { variant: i = "gray" } = e;
  return oe(), t.$$set = (s) => {
    "label" in s && n(0, r = s.label), "variant" in s && n(1, i = s.variant);
  }, [r, i];
}
class Dn extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, Nr, Ir, ie, { label: 0, variant: 1 }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
  }
  static get observedAttributes() {
    return ["label", "variant"];
  }
  get label() {
    return this.$$.ctx[0];
  }
  set label(e) {
    this.$$set({ label: e }), A();
  }
  get variant() {
    return this.$$.ctx[1];
  }
  set variant(e) {
    this.$$set({ variant: e }), A();
  }
}
customElements.define("v-badge", Dn);
const Fr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dn
}, Symbol.toStringTag, { value: "Module" }));
function jt(t, e, n) {
  const r = t.slice();
  return r[2] = e[n], r[4] = n, r;
}
function Lt(t) {
  let e;
  return {
    c() {
      e = C("div"), e.innerHTML = `<div class="w-px h-[60%] border-l border-black -rotate-[30deg] -mt-px"></div> 
        <div class="w-px h-[60%] border-l border-black rotate-[30deg] -mt-0.5"></div> 
      `;
    },
    m(n, r) {
      T(n, e, r);
    },
    d(n) {
      n && I(e);
    }
  };
}
function Vt(t, e) {
  let n, r = e[2] + "", i, s, o, l = e[4] !== e[0].length - 1 && Lt();
  return {
    key: t,
    first: null,
    c() {
      n = C("small"), i = Z(r), s = Y(), l && l.c(), o = Et(), h(n, "class", "py1"), this.first = n;
    },
    m(a, c) {
      T(a, n, c), _(n, i), T(a, s, c), l && l.m(a, c), T(a, o, c);
    },
    p(a, c) {
      e = a, c & 1 && r !== (r = e[2] + "") && G(i, r), e[4] !== e[0].length - 1 ? l || (l = Lt(), l.c(), l.m(o.parentNode, o)) : l && (l.d(1), l = null);
    },
    d(a) {
      a && I(n), a && I(s), l && l.d(a), a && I(o);
    }
  };
}
function Dr(t) {
  let e, n = [], r = /* @__PURE__ */ new Map(), i = t[0];
  const s = (o) => o[2];
  for (let o = 0; o < i.length; o += 1) {
    let l = jt(t, i, o), a = s(l);
    r.set(a, n[o] = Vt(a, l));
  }
  return {
    c() {
      e = C("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
      this.c = P, h(e, "class", "inline-flex gap-3 px-4 border border-black rounded-full");
    },
    m(o, l) {
      T(o, e, l);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
    },
    p(o, [l]) {
      l & 1 && (i = o[0], n = Je(n, l, s, 1, o, i, r, e, Ke, Vt, null, jt));
    },
    i: P,
    o: P,
    d(o) {
      o && I(e);
      for (let l = 0; l < n.length; l += 1)
        n[l].d();
    }
  };
}
function Hr(t, e, n) {
  let { crumbs: r = "" } = e;
  oe();
  let i;
  return t.$$set = (s) => {
    "crumbs" in s && n(1, r = s.crumbs);
  }, t.$$.update = () => {
    t.$$.dirty & 2 && n(0, i = r.split(",").map((s) => s.trim()));
  }, [i, r];
}
class Hn extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, Hr, Dr, ie, { crumbs: 1 }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
  }
  static get observedAttributes() {
    return ["crumbs"];
  }
  get crumbs() {
    return this.$$.ctx[1];
  }
  set crumbs(e) {
    this.$$set({ crumbs: e }), A();
  }
}
customElements.define("v-breadcrumbs", Hn);
const Wr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hn
}, Symbol.toStringTag, { value: "Module" })), ve = (t, e) => t === "" || t === "true" || t === e;
function It(t) {
  let e, n;
  return {
    c() {
      e = C("i"), h(e, "aria-hidden", ""), h(e, "class", n = "icon-" + t[3] + " text-base");
    },
    m(r, i) {
      T(r, e, i);
    },
    p(r, i) {
      i & 8 && n !== (n = "icon-" + r[3] + " text-base") && h(e, "class", n);
    },
    d(r) {
      r && I(e);
    }
  };
}
function Br(t) {
  let e, n, r, i, s, o, l, a = t[3] && It(t);
  return {
    c() {
      e = C("button"), a && a.c(), n = Y(), r = C("span"), i = Z(t[2]), this.c = P, h(r, "class", "mx-auto"), h(e, "type", t[0]), h(e, "class", s = H("flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": t[4],
        "bg-white border-black": t[1] === "primary",
        "bg-black border-white text-white": t[1] === "inverse-primary",
        "bg-red/90 text-white border-red/90": t[1] === "danger",
        "bg-green/90 border-green/90 text-white": t[1] === "success",
        "bg-white border-red/90 text-red/90": t[1] === "outline-danger"
      }));
    },
    m(c, f) {
      T(c, e, f), a && a.m(e, null), _(e, n), _(e, r), _(r, i), o || (l = B(e, "click", t[5]), o = !0);
    },
    p(c, [f]) {
      c[3] ? a ? a.p(c, f) : (a = It(c), a.c(), a.m(e, n)) : a && (a.d(1), a = null), f & 4 && G(i, c[2]), f & 1 && h(e, "type", c[0]), f & 18 && s !== (s = H("flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": c[4],
        "bg-white border-black": c[1] === "primary",
        "bg-black border-white text-white": c[1] === "inverse-primary",
        "bg-red/90 text-white border-red/90": c[1] === "danger",
        "bg-green/90 border-green/90 text-white": c[1] === "success",
        "bg-white border-red/90 text-red/90": c[1] === "outline-danger"
      })) && h(e, "class", s);
    },
    i: P,
    o: P,
    d(c) {
      c && I(e), a && a.d(), o = !1, l();
    }
  };
}
function Yr(t, e, n) {
  let { disabled: r } = e, { type: i = "button" } = e, { variant: s = "primary" } = e, { label: o = "" } = e, { icon: l = "" } = e, a;
  oe();
  const f = Fe().attachInternals(), b = () => {
    const { form: d } = f;
    d?.requestSubmit ? d.requestSubmit() : d?.submit();
  };
  return t.$$set = (d) => {
    "disabled" in d && n(6, r = d.disabled), "type" in d && n(0, i = d.type), "variant" in d && n(1, s = d.variant), "label" in d && n(2, o = d.label), "icon" in d && n(3, l = d.icon);
  }, t.$$.update = () => {
    t.$$.dirty & 64 && n(4, a = ve(r, "disabled"));
  }, [i, s, o, l, a, b, r];
}
class Xr extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, Yr, Br, ie, {
      disabled: 6,
      type: 0,
      variant: 1,
      label: 2,
      icon: 3
    }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
  }
  static get observedAttributes() {
    return ["disabled", "type", "variant", "label", "icon"];
  }
  get disabled() {
    return this.$$.ctx[6];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), A();
  }
  get type() {
    return this.$$.ctx[0];
  }
  set type(e) {
    this.$$set({ type: e }), A();
  }
  get variant() {
    return this.$$.ctx[1];
  }
  set variant(e) {
    this.$$set({ variant: e }), A();
  }
  get label() {
    return this.$$.ctx[2];
  }
  set label(e) {
    this.$$set({ label: e }), A();
  }
  get icon() {
    return this.$$.ctx[3];
  }
  set icon(e) {
    this.$$set({ icon: e }), A();
  }
}
customElements.define("v-button-internal", Xr);
class Ur extends customElements.get("v-button-internal") {
  static formAssociated = !0;
}
customElements.define("v-button", Ur);
const qr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
let tt = "uninitialized";
const Nt = /* @__PURE__ */ new Set(), Zr = (t) => {
  if (tt === "loaded")
    return t(window.monaco);
  if (Nt.add(t), tt === "loading")
    return;
  tt = "loading";
  const e = URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = {
      baseUrl: '${Le}/min/'
    };
    importScripts('${Le}/min/vs/base/worker/workerMain.js');
    importScripts('${Le}/min/vs/language/json/jsonWorker.js');
  `], { type: "text/javascript" })), n = () => {
    window.require.config({ paths: { vs: `${Le}/min/vs` } }), window.MonacoEnvironment = { getWorkerUrl: () => e }, window.require(["vs/editor/editor.main"], () => {
      for (const r of Nt)
        r(window.monaco);
      tt = "loaded";
    });
  };
  {
    const r = document.createElement("script");
    r.addEventListener("load", n), r.async = !0, r.src = `${Le}/min/vs/loader.js`, document.head.append(r);
  }
}, Kr = (t, e, n) => t <= e ? e : t >= n ? n : t, it = (t, e, n, r) => {
  const i = (t - e) / (n - e) * 100;
  return Number.isNaN(i) || i <= 0 ? 0 : i >= 100 ? 100 : Number.parseFloat(i.toFixed(r));
}, Ft = (t) => {
  let e = 0, n = 0;
  if (t.length === 0)
    return e;
  for (let r = 0; r < t.length; r += 1)
    n = t.codePointAt(r), e = (e << 5) - e + n, e = Math.trunc(e);
  return e;
};
function Jr(t) {
  let e, n, r;
  return {
    c() {
      e = C("div"), this.c = P, h(e, "class", "w-full h-full relative isolate");
    },
    m(i, s) {
      T(i, e, s), t[12](e), n || (r = B(e, "input", t[1]), n = !0);
    },
    p: P,
    i: P,
    o: P,
    d(i) {
      i && I(e), t[12](null), n = !1, r();
    }
  };
}
function Gr(t, e, n) {
  let { value: r = "" } = e, { previous: i = "" } = e, { language: s } = e, { theme: o = "vs" } = e, { readonly: l = "false" } = e, { minimap: a = "false" } = e, { schema: c = "" } = e, { variant: f = "default" } = e, b, d, g, p, w, m, y;
  oe();
  const k = document.createElement("link");
  k.rel = "stylesheet", k.href = `${Le}/min/vs/editor/editor.main.min.css`, Fe().shadowRoot.append(k);
  const x = () => {
    if (!m)
      return;
    m.getModel()?.dispose();
    let X;
    if (g) {
      const fe = String(Ft(c)), de = `http://${fe}.json/`, pe = window.monaco.Uri.parse(de);
      Tt.removeSchemas(fe, g), Tt.addSchemas(fe, g, [pe.toString()]), X = window.monaco.editor.createModel(r, s, pe);
    } else
      X = window.monaco.editor.createModel(r, s);
    ae(p, "update-model", { model: X }), m.setModel(X);
  }, z = () => {
    const F = w?.getModel();
    F?.modified.dispose(), F?.original.dispose(), w.setModel({
      original: window.monaco.editor.createModel(i, "json"),
      modified: window.monaco.editor.createModel(r, "json")
    });
  }, R = (F) => {
    F instanceof InputEvent && (F.preventDefault(), F.stopImmediatePropagation());
  }, j = () => ({
    value: r,
    language: s,
    theme: o,
    readOnly: b,
    minimap: { enabled: d },
    scrollbar: {
      verticalScrollbarSize: 3,
      horizontalScrollbarSize: 3,
      vertical: "auto",
      horizontal: "auto",
      alwaysConsumeMouseWheel: !1
    },
    scrollBeyondLastLine: !1
  }), L = () => {
    n(10, w = window.monaco.editor.createDiffEditor(p, { ...j(), readOnly: !0 })), w.setModel({
      original: window.monaco.editor.createModel(i, s),
      modified: window.monaco.editor.createModel(r, s)
    });
  }, S = (F) => {
    if (f === "diff")
      return L();
    n(11, m = F.editor.create(p, j())), m.onDidChangeModelContent(() => {
      ae(p, "input", { value: m?.getValue() });
    }), m.onDidBlurEditorWidget(() => {
      ae(p, "blur", { value: m?.getValue() }), D();
    }), m.layout(), x(), D();
  }, D = () => {
    const F = window.monaco.editor.getModelMarkers({}), X = Ft(c), fe = F.filter((de) => de.resource.authority === `${X}.json`);
    ae(p, "markers", { markers: fe });
  }, W = () => {
    if (!y && m && (y = new ResizeObserver(() => {
      m?.layout();
    })), y) {
      const F = m?.getDomNode() ?? p;
      y.observe(F);
    }
  };
  jn(() => {
    Zr(S);
  }), kr(() => {
    m?.getModel()?.dispose(), w?.dispose(), m?.dispose(), y.disconnect();
    const X = m?.getDomNode() ?? p;
    ae(X, "destroy");
  });
  function N(F) {
    ce[F ? "unshift" : "push"](() => {
      p = F, n(0, p);
    });
  }
  return t.$$set = (F) => {
    "value" in F && n(2, r = F.value), "previous" in F && n(3, i = F.previous), "language" in F && n(4, s = F.language), "theme" in F && n(5, o = F.theme), "readonly" in F && n(6, l = F.readonly), "minimap" in F && n(7, a = F.minimap), "schema" in F && n(8, c = F.schema), "variant" in F && n(9, f = F.variant);
  }, t.$$.update = () => {
    if (t.$$.dirty & 256 && (g = c ? JSON.parse(c) : void 0), t.$$.dirty & 64 && (b = ve(l, "readonly")), t.$$.dirty & 128 && (d = ve(a, "minimap")), t.$$.dirty & 3076) {
      if (w)
        z(), W();
      else if (m) {
        x();
        const F = m?.getValue() ?? "";
        if (r !== void 0) {
          const X = zt(r);
          zt(F) !== X && (m?.setValue(r), m?.layout());
        }
        W();
      }
    }
  }, [
    p,
    R,
    r,
    i,
    s,
    o,
    l,
    a,
    c,
    f,
    w,
    m,
    N
  ];
}
class Wn extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, Gr, Jr, ie, {
      value: 2,
      previous: 3,
      language: 4,
      theme: 5,
      readonly: 6,
      minimap: 7,
      schema: 8,
      variant: 9
    }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
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
    this.$$set({ value: e }), A();
  }
  get previous() {
    return this.$$.ctx[3];
  }
  set previous(e) {
    this.$$set({ previous: e }), A();
  }
  get language() {
    return this.$$.ctx[4];
  }
  set language(e) {
    this.$$set({ language: e }), A();
  }
  get theme() {
    return this.$$.ctx[5];
  }
  set theme(e) {
    this.$$set({ theme: e }), A();
  }
  get readonly() {
    return this.$$.ctx[6];
  }
  set readonly(e) {
    this.$$set({ readonly: e }), A();
  }
  get minimap() {
    return this.$$.ctx[7];
  }
  set minimap(e) {
    this.$$set({ minimap: e }), A();
  }
  get schema() {
    return this.$$.ctx[8];
  }
  set schema(e) {
    this.$$set({ schema: e }), A();
  }
  get variant() {
    return this.$$.ctx[9];
  }
  set variant(e) {
    this.$$set({ variant: e }), A();
  }
}
customElements.define("v-code-editor", Wn);
const Qr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wn
}, Symbol.toStringTag, { value: "Module" }));
function Dt(t) {
  let e, n;
  return {
    c() {
      e = C("h2"), n = Z(t[1]), h(e, "class", "text-sm");
    },
    m(r, i) {
      T(r, e, i), _(e, n);
    },
    p(r, i) {
      i & 2 && G(n, r[1]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function $r(t) {
  let e, n, r, i, s, o, l, a, c, f, b, d, g, p, w, m, y, k, M = t[1] && Dt(t);
  return {
    c() {
      e = C("div"), n = C("div"), r = C("div"), M && M.c(), i = Y(), s = C("slot"), o = Y(), l = C("div"), a = C("slot"), c = Y(), f = Pe("svg"), b = Pe("polyline"), g = Y(), p = C("div"), w = C("slot"), this.c = P, h(s, "name", "title"), h(r, "class", "flex items-center gap-2"), h(a, "name", "header"), h(b, "points", "6 9 12 15 18 9"), h(f, "class", d = H("transition-transform duration-200", {
        "rotate-0": !t[0],
        "rotate-180": t[0]
      })), h(f, "width", "24"), h(f, "height", "24"), h(f, "viewBox", "0 0 24 24"), h(f, "stroke", "currentColor"), h(f, "stroke-linejoin", "round"), h(f, "stroke-linecap", "round"), h(f, "fill", "none"), h(l, "class", "h-full flex items-center gap-3"), h(n, "class", "w-full py-1.5 px-4 flex items-center justify-between border text-black border-black bg-white cursor-pointer"), h(p, "class", m = H("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !t[0],
        "max-h-fit": t[0]
      })), h(e, "class", "relative w-full overflow-hidden");
    },
    m(x, z) {
      T(x, e, z), _(e, n), _(n, r), M && M.m(r, null), _(r, i), _(r, s), _(n, o), _(n, l), _(l, a), _(l, c), _(l, f), _(f, b), _(e, g), _(e, p), _(p, w), t[4](e), y || (k = B(n, "click", t[3]), y = !0);
    },
    p(x, [z]) {
      x[1] ? M ? M.p(x, z) : (M = Dt(x), M.c(), M.m(r, i)) : M && (M.d(1), M = null), z & 1 && d !== (d = H("transition-transform duration-200", {
        "rotate-0": !x[0],
        "rotate-180": x[0]
      })) && h(f, "class", d), z & 1 && m !== (m = H("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !x[0],
        "max-h-fit": x[0]
      })) && h(p, "class", m);
    },
    i: P,
    o: P,
    d(x) {
      x && I(e), M && M.d(), t[4](null), y = !1, k();
    }
  };
}
function ei(t, e, n) {
  let { title: r = "" } = e, { open: i = !1 } = e, s;
  oe();
  const o = (a) => {
    a.target.getAttribute("slot") !== "header" && (n(0, i = !i), ae(s, "toggle", { open: i }));
  };
  function l(a) {
    ce[a ? "unshift" : "push"](() => {
      s = a, n(2, s);
    });
  }
  return t.$$set = (a) => {
    "title" in a && n(1, r = a.title), "open" in a && n(0, i = a.open);
  }, [i, r, s, o, l];
}
class Bn extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, ei, $r, ie, { title: 1, open: 0 }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
  }
  static get observedAttributes() {
    return ["title", "open"];
  }
  get title() {
    return this.$$.ctx[1];
  }
  set title(e) {
    this.$$set({ title: e }), A();
  }
  get open() {
    return this.$$.ctx[0];
  }
  set open(e) {
    this.$$set({ open: e }), A();
  }
}
customElements.define("v-collapse", Bn);
const ti = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bn
}, Symbol.toStringTag, { value: "Module" }));
function ni(t) {
  let e, n, r, i, s, o, l, a;
  return {
    c() {
      e = C("div"), n = C("div"), n.innerHTML = '<slot name="target"></slot>', r = Y(), i = C("div"), s = C("slot"), this.c = P, h(n, "class", "inline-block w-full"), h(s, "name", "content"), h(i, "class", o = H("absolute z-10", {
        "left-0": t[1],
        "right-0": t[1],
        "overflow-hidden": t[1],
        invisible: !t[2]
      })), h(e, "class", "relative inline-block w-full");
    },
    m(c, f) {
      T(c, e, f), _(e, n), _(e, r), _(e, i), _(i, s), t[6](e), l || (a = B(n, "click", t[3]), l = !0);
    },
    p(c, [f]) {
      f & 6 && o !== (o = H("absolute z-10", {
        "left-0": c[1],
        "right-0": c[1],
        "overflow-hidden": c[1],
        invisible: !c[2]
      })) && h(i, "class", o);
    },
    i: P,
    o: P,
    d(c) {
      c && I(e), t[6](null), l = !1, a();
    }
  };
}
function ri(t, e, n) {
  let { open: r = "false" } = e, { match: i = "false" } = e, s, o, l;
  oe();
  const a = () => {
    ae(s, "toggle", { open: !l });
  };
  function c(f) {
    ce[f ? "unshift" : "push"](() => {
      s = f, n(0, s);
    });
  }
  return t.$$set = (f) => {
    "open" in f && n(4, r = f.open), "match" in f && n(5, i = f.match);
  }, t.$$.update = () => {
    t.$$.dirty & 32 && n(1, o = ve(i, "match")), t.$$.dirty & 16 && n(2, l = ve(r, "open"));
  }, [s, o, l, a, r, i, c];
}
class Yn extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, ri, ni, ie, { open: 4, match: 5 }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
  }
  static get observedAttributes() {
    return ["open", "match"];
  }
  get open() {
    return this.$$.ctx[4];
  }
  set open(e) {
    this.$$set({ open: e }), A();
  }
  get match() {
    return this.$$.ctx[5];
  }
  set match(e) {
    this.$$set({ match: e }), A();
  }
}
customElements.define("v-dropdown", Yn);
const ii = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yn
}, Symbol.toStringTag, { value: "Module" }));
function oi(t) {
  let e, n;
  return {
    c() {
      e = C("i"), this.c = P, h(e, "aria-hidden", ""), h(e, "class", n = "icon-" + t[0] + " text-" + t[1]);
    },
    m(r, i) {
      T(r, e, i);
    },
    p(r, [i]) {
      i & 3 && n !== (n = "icon-" + r[0] + " text-" + r[1]) && h(e, "class", n);
    },
    i: P,
    o: P,
    d(r) {
      r && I(e);
    }
  };
}
function si(t, e, n) {
  let { name: r = "" } = e, { size: i = "base" } = e;
  return oe(), t.$$set = (s) => {
    "name" in s && n(0, r = s.name), "size" in s && n(1, i = s.size);
  }, [r, i];
}
class Xn extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, si, oi, ie, { name: 0, size: 1 }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
  }
  static get observedAttributes() {
    return ["name", "size"];
  }
  get name() {
    return this.$$.ctx[0];
  }
  set name(e) {
    this.$$set({ name: e }), A();
  }
  get size() {
    return this.$$.ctx[1];
  }
  set size(e) {
    this.$$set({ size: e }), A();
  }
}
customElements.define("v-icon", Xn);
const li = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xn
}, Symbol.toStringTag, { value: "Module" }));
function ai(t) {
  let e;
  return {
    c() {
      e = C("v-code-editor"), this.c = P, he(e, "value", t[2]), he(e, "theme", t[0]), he(e, "schema", t[1]), he(e, "minimap", t[3]), he(e, "language", "json");
    },
    m(n, r) {
      T(n, e, r);
    },
    p(n, [r]) {
      r & 4 && he(e, "value", n[2]), r & 1 && he(e, "theme", n[0]), r & 2 && he(e, "schema", n[1]), r & 8 && he(e, "minimap", n[3]);
    },
    i: P,
    o: P,
    d(n) {
      n && I(e);
    }
  };
}
function ci(t, e, n) {
  let { theme: r = "vs" } = e, { schema: i = "" } = e, { value: s } = e, { minimap: o } = e;
  return t.$$set = (l) => {
    "theme" in l && n(0, r = l.theme), "schema" in l && n(1, i = l.schema), "value" in l && n(2, s = l.value), "minimap" in l && n(3, o = l.minimap);
  }, [r, i, s, o];
}
class Un extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, ci, ai, ie, {
      theme: 0,
      schema: 1,
      value: 2,
      minimap: 3
    }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
  }
  static get observedAttributes() {
    return ["theme", "schema", "value", "minimap"];
  }
  get theme() {
    return this.$$.ctx[0];
  }
  set theme(e) {
    this.$$set({ theme: e }), A();
  }
  get schema() {
    return this.$$.ctx[1];
  }
  set schema(e) {
    this.$$set({ schema: e }), A();
  }
  get value() {
    return this.$$.ctx[2];
  }
  set value(e) {
    this.$$set({ value: e }), A();
  }
  get minimap() {
    return this.$$.ctx[3];
  }
  set minimap(e) {
    this.$$set({ minimap: e }), A();
  }
}
customElements.define("v-json-editor", Un);
const ui = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Un
}, Symbol.toStringTag, { value: "Module" }));
function Ht(t) {
  let e, n, r;
  return {
    c() {
      e = C("p"), n = Z(t[3]), h(e, "class", r = H("text-xs capitalize", {
        "inline whitespace-nowrap": t[6] === "left",
        "opacity-50 pointer-events-none": t[11]
      }));
    },
    m(i, s) {
      T(i, e, s), _(e, n);
    },
    p(i, s) {
      s & 8 && G(n, i[3]), s & 2112 && r !== (r = H("text-xs capitalize", {
        "inline whitespace-nowrap": i[6] === "left",
        "opacity-50 pointer-events-none": i[11]
      })) && h(e, "class", r);
    },
    d(i) {
      i && I(e);
    }
  };
}
function Wt(t) {
  let e, n;
  return {
    c() {
      e = C("v-tooltip"), n = C("div"), h(n, "class", "icon-info-outline text-orange-400"), he(e, "text", t[7]);
    },
    m(r, i) {
      T(r, e, i), _(e, n);
    },
    p(r, i) {
      i & 128 && he(e, "text", r[7]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function Bt(t) {
  let e, n, r, i, s, o, l, a;
  return {
    c() {
      e = C("div"), n = C("button"), i = Y(), s = C("button"), h(n, "aria-label", r = "Increment up by " + t[12]), h(n, "class", "icon-chevron-down rotate-180 text-[15px]"), h(s, "aria-label", o = "Increment down by " + t[12]), h(s, "class", "icon-chevron-down text-[15px]"), h(e, "class", "absolute right-0.5 bottom-0 cursor-pointer select-none flex flex-col");
    },
    m(c, f) {
      T(c, e, f), _(e, n), _(e, i), _(e, s), l || (a = [
        B(n, "click", t[19]),
        B(s, "click", t[20])
      ], l = !0);
    },
    p(c, f) {
      f & 4096 && r !== (r = "Increment up by " + c[12]) && h(n, "aria-label", r), f & 4096 && o !== (o = "Increment down by " + c[12]) && h(s, "aria-label", o);
    },
    d(c) {
      c && I(e), l = !1, me(a);
    }
  };
}
function fi(t) {
  let e, n, r, i, s, o, l, a, c, f, b, d, g, p, w = t[3] && Ht(t), m = t[7] && Wt(t), y = (t[1] === "number" || t[1] === "integer") && Bt(t);
  return {
    c() {
      e = C("label"), n = C("div"), w && w.c(), r = Y(), m && m.c(), i = Y(), s = C("input"), b = Y(), y && y.c(), this.c = P, h(n, "class", "flex items-center gap-1.5"), h(s, "type", o = t[1] === "integer" ? "number" : t[1]), h(s, "placeholder", t[2]), h(s, "name", t[5]), s.value = t[0], h(s, "pattern", l = t[1] === "integer" ? "[0-9]*" : void 0), s.readOnly = a = t[10] || t[11], h(s, "class", c = H("w-full py-1.5 px-2.5 border text-xs border-black bg-white outline-none appearance-none", {
        "opacity-50 pointer-events-none": t[11]
      })), h(s, "step", f = t[13] ? t[4] : null), h(e, "class", d = H("relative flex gap-1 max-w-[14rem]", {
        "flex-col": t[6] === "top",
        "items-center": t[6] === "left"
      }));
    },
    m(k, M) {
      T(k, e, M), _(e, n), w && w.m(n, null), _(n, r), m && m.m(n, null), _(e, i), _(e, s), t[18](s), _(e, b), y && y.m(e, null), t[21](e), g || (p = B(s, "input", t[14]), g = !0);
    },
    p(k, [M]) {
      k[3] ? w ? w.p(k, M) : (w = Ht(k), w.c(), w.m(n, r)) : w && (w.d(1), w = null), k[7] ? m ? m.p(k, M) : (m = Wt(k), m.c(), m.m(n, null)) : m && (m.d(1), m = null), M & 2 && o !== (o = k[1] === "integer" ? "number" : k[1]) && h(s, "type", o), M & 4 && h(s, "placeholder", k[2]), M & 32 && h(s, "name", k[5]), M & 1 && s.value !== k[0] && (s.value = k[0]), M & 2 && l !== (l = k[1] === "integer" ? "[0-9]*" : void 0) && h(s, "pattern", l), M & 3072 && a !== (a = k[10] || k[11]) && (s.readOnly = a), M & 2048 && c !== (c = H("w-full py-1.5 px-2.5 border text-xs border-black bg-white outline-none appearance-none", {
        "opacity-50 pointer-events-none": k[11]
      })) && h(s, "class", c), M & 8208 && f !== (f = k[13] ? k[4] : null) && h(s, "step", f), k[1] === "number" || k[1] === "integer" ? y ? y.p(k, M) : (y = Bt(k), y.c(), y.m(e, null)) : y && (y.d(1), y = null), M & 64 && d !== (d = H("relative flex gap-1 max-w-[14rem]", {
        "flex-col": k[6] === "top",
        "items-center": k[6] === "left"
      })) && h(e, "class", d);
    },
    i: P,
    o: P,
    d(k) {
      k && I(e), w && w.d(), m && m.d(), t[18](null), y && y.d(), t[21](null), g = !1, p();
    }
  };
}
function di(t, e, n) {
  const i = Fe().attachInternals();
  let { type: s = "text" } = e, { placeholder: o = "" } = e, { readonly: l = "false" } = e, { disabled: a = "false" } = e, { label: c = "" } = e, { value: f = "" } = e, { step: b = "1" } = e, { name: d = "" } = e, { labelposition: g = "top" } = e, { tooltip: p = "" } = e, w, m, y, k, M, x, z;
  oe();
  const R = (N) => {
    N.preventDefault(), N.stopImmediatePropagation(), n(0, f = m.value), i.setFormValue(f), ae(w, "input", { value: f });
  }, j = (N) => {
    const F = Number.parseFloat(f || "0"), X = String(f).split(".").pop()?.length ?? 0;
    s === "number" ? n(0, f = n(9, m.value = (F + x * N).toFixed(Math.max(y, X)), m)) : s === "integer" && n(0, f = n(9, m.value = String(Math.round(F + x * N)), m)), i.setFormValue(f), ae(w, "input", { value: f });
  };
  function L(N) {
    ce[N ? "unshift" : "push"](() => {
      m = N, n(9, m);
    });
  }
  const S = () => j(1), D = () => j(-1);
  function W(N) {
    ce[N ? "unshift" : "push"](() => {
      w = N, n(8, w);
    });
  }
  return t.$$set = (N) => {
    "type" in N && n(1, s = N.type), "placeholder" in N && n(2, o = N.placeholder), "readonly" in N && n(16, l = N.readonly), "disabled" in N && n(17, a = N.disabled), "label" in N && n(3, c = N.label), "value" in N && n(0, f = N.value), "step" in N && n(4, b = N.step), "name" in N && n(5, d = N.name), "labelposition" in N && n(6, g = N.labelposition), "tooltip" in N && n(7, p = N.tooltip);
  }, t.$$.update = () => {
    t.$$.dirty & 16 && (y = String(b).split(".").pop()?.length ?? 0), t.$$.dirty & 65536 && n(10, k = ve(l, "readonly")), t.$$.dirty & 131072 && n(11, M = ve(a, "disabled")), t.$$.dirty & 16 && n(12, x = Number.parseFloat(b)), t.$$.dirty & 2 && n(13, z = s === "time" || s === "number");
  }, [
    f,
    s,
    o,
    c,
    b,
    d,
    g,
    p,
    w,
    m,
    k,
    M,
    x,
    z,
    R,
    j,
    l,
    a,
    L,
    S,
    D,
    W
  ];
}
class hi extends $ {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}</style>", ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, di, fi, ie, {
      type: 1,
      placeholder: 2,
      readonly: 16,
      disabled: 17,
      label: 3,
      value: 0,
      step: 4,
      name: 5,
      labelposition: 6,
      tooltip: 7
    }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
  }
  static get observedAttributes() {
    return [
      "type",
      "placeholder",
      "readonly",
      "disabled",
      "label",
      "value",
      "step",
      "name",
      "labelposition",
      "tooltip"
    ];
  }
  get type() {
    return this.$$.ctx[1];
  }
  set type(e) {
    this.$$set({ type: e }), A();
  }
  get placeholder() {
    return this.$$.ctx[2];
  }
  set placeholder(e) {
    this.$$set({ placeholder: e }), A();
  }
  get readonly() {
    return this.$$.ctx[16];
  }
  set readonly(e) {
    this.$$set({ readonly: e }), A();
  }
  get disabled() {
    return this.$$.ctx[17];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), A();
  }
  get label() {
    return this.$$.ctx[3];
  }
  set label(e) {
    this.$$set({ label: e }), A();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), A();
  }
  get step() {
    return this.$$.ctx[4];
  }
  set step(e) {
    this.$$set({ step: e }), A();
  }
  get name() {
    return this.$$.ctx[5];
  }
  set name(e) {
    this.$$set({ name: e }), A();
  }
  get labelposition() {
    return this.$$.ctx[6];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), A();
  }
  get tooltip() {
    return this.$$.ctx[7];
  }
  set tooltip(e) {
    this.$$set({ tooltip: e }), A();
  }
}
customElements.define("v-input-internal", hi);
class bi extends customElements.get("v-input-internal") {
  static formAssociated = !0;
}
customElements.define("v-input", bi);
const mi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function pi(t) {
  let e;
  return {
    c() {
      e = Pe("path"), h(e, "d", "M6.33 3.66667H7.66666V5H6.33333V3.66667ZM6.33 6.33333H7.66666V10.3333H6.33333V6.33333ZM7 0.333334C3.31999 0.333334 0.333328 3.32 0.333328 7C0.333328 10.68 3.31999 13.6667 7 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.32 10.68 0.333334 7 0.333334ZM7 12.3333C4.06 12.3333 1.66666 9.94 1.66666 7C1.66666 4.06 4.06 1.66667 7 1.66667C9.93999 1.66667 12.3333 4.06 12.3333 7C12.3333 9.94 9.93999 12.3333 7 12.3333Z"), h(e, "fill", "#045681");
    },
    m(n, r) {
      T(n, e, r);
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
      e = Pe("path"), h(e, "d", "M4 7.78L1.22 5L0.273331 5.94L4 9.66667L12 1.66667L11.06 0.726665L4 7.78Z"), h(e, "fill", "#397F48");
    },
    m(n, r) {
      T(n, e, r);
    },
    d(n) {
      n && I(e);
    }
  };
}
function wi(t) {
  let e;
  return {
    c() {
      e = Pe("path"), h(e, "d", "M8 2.99333L13.02 11.6667H2.98L8 2.99333ZM8 0.333328L0.666672 13H15.3333L8 0.333328ZM8.66667 9.66666H7.33334V11H8.66667V9.66666ZM8.66667 5.66666H7.33334V8.33333H8.66667V5.66666Z"), h(e, "fill", "#FF9900");
    },
    m(n, r) {
      T(n, e, r);
    },
    d(n) {
      n && I(e);
    }
  };
}
function yi(t) {
  let e;
  return {
    c() {
      e = Pe("path"), h(e, "d", "M6.33 9H7.66666V10.3333H6.33333V9ZM6.33 3.66666H7.66666V7.66666H6.33333V3.66666ZM6.99333 0.333328C3.31333 0.333328 0.333328 3.31999 0.333328 7C0.333328 10.68 3.31333 13.6667 6.99333 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.31999 10.68 0.333328 6.99333 0.333328ZM7 12.3333C4.05333 12.3333 1.66666 9.94666 1.66666 7C1.66666 4.05333 4.05333 1.66666 7 1.66666C9.94666 1.66666 12.3333 4.05333 12.3333 7C12.3333 9.94666 9.94666 12.3333 7 12.3333Z"), h(e, "fill", "#BE3026");
    },
    m(n, r) {
      T(n, e, r);
    },
    d(n) {
      n && I(e);
    }
  };
}
function Yt(t) {
  let e, n;
  return {
    c() {
      e = C("p"), n = Z(t[1]), h(e, "class", "text-xs");
    },
    m(r, i) {
      T(r, e, i), _(e, n);
    },
    p(r, i) {
      i & 2 && G(n, r[1]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function vi(t) {
  let e, n, r, i, s, o, l, a, c;
  function f(p, w) {
    if (p[2] === "error")
      return yi;
    if (p[2] === "warning")
      return wi;
    if (p[2] === "success")
      return gi;
    if (p[2] === "info")
      return pi;
  }
  let b = f(t), d = b && b(t), g = t[1] && Yt(t);
  return {
    c() {
      e = C("div"), n = C("div"), r = Pe("svg"), d && d.c(), i = Y(), s = C("figure"), o = C("figcaption"), l = Z(t[0]), a = Y(), g && g.c(), this.c = P, h(r, "width", "14"), h(r, "height", "14"), h(r, "viewBox", "0 0 15 15"), h(r, "fill", "none"), h(r, "xmlns", "http://www.w3.org/2000/svg"), h(n, "class", "mt-1"), h(o, "class", "text-sm"), h(e, "class", c = H("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": t[3] === "gray",
        "bg-white": t[3] === "white",
        "border-red/90": t[2] === "error",
        "border-orange/90": t[2] === "warning",
        "border-green/90": t[2] === "success",
        "border-blue/90": t[2] === "info"
      }));
    },
    m(p, w) {
      T(p, e, w), _(e, n), _(n, r), d && d.m(r, null), _(e, i), _(e, s), _(s, o), _(o, l), _(s, a), g && g.m(s, null);
    },
    p(p, [w]) {
      b !== (b = f(p)) && (d && d.d(1), d = b && b(p), d && (d.c(), d.m(r, null))), w & 1 && G(l, p[0]), p[1] ? g ? g.p(p, w) : (g = Yt(p), g.c(), g.m(s, null)) : g && (g.d(1), g = null), w & 12 && c !== (c = H("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": p[3] === "gray",
        "bg-white": p[3] === "white",
        "border-red/90": p[2] === "error",
        "border-orange/90": p[2] === "warning",
        "border-green/90": p[2] === "success",
        "border-blue/90": p[2] === "info"
      })) && h(e, "class", c);
    },
    i: P,
    o: P,
    d(p) {
      p && I(e), d && d.d(), g && g.d();
    }
  };
}
function _i(t, e, n) {
  let { title: r = "" } = e, { message: i = "" } = e, { variant: s = "info" } = e, { background: o = "gray" } = e;
  return oe(), t.$$set = (l) => {
    "title" in l && n(0, r = l.title), "message" in l && n(1, i = l.message), "variant" in l && n(2, s = l.variant), "background" in l && n(3, o = l.background);
  }, [r, i, s, o];
}
class qn extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, _i, vi, ie, {
      title: 0,
      message: 1,
      variant: 2,
      background: 3
    }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
  }
  static get observedAttributes() {
    return ["title", "message", "variant", "background"];
  }
  get title() {
    return this.$$.ctx[0];
  }
  set title(e) {
    this.$$set({ title: e }), A();
  }
  get message() {
    return this.$$.ctx[1];
  }
  set message(e) {
    this.$$set({ message: e }), A();
  }
  get variant() {
    return this.$$.ctx[2];
  }
  set variant(e) {
    this.$$set({ variant: e }), A();
  }
  get background() {
    return this.$$.ctx[3];
  }
  set background(e) {
    this.$$set({ background: e }), A();
  }
}
customElements.define("v-notify", qn);
const ki = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qn
}, Symbol.toStringTag, { value: "Module" }));
function Xt(t, e, n) {
  const r = t.slice();
  return r[9] = e[n], r;
}
function Ut(t) {
  let e, n, r;
  return {
    c() {
      e = C("p"), n = Z(t[1]), h(e, "class", r = H("text-xs", {
        "pb-1": t[2] === "top",
        inline: t[2] === "left"
      }));
    },
    m(i, s) {
      T(i, e, s), _(e, n);
    },
    p(i, s) {
      s & 2 && G(n, i[1]), s & 4 && r !== (r = H("text-xs", {
        "pb-1": i[2] === "top",
        inline: i[2] === "left"
      })) && h(e, "class", r);
    },
    d(i) {
      i && I(e);
    }
  };
}
function qt(t) {
  let e, n = t[9] + "", r, i, s, o, l;
  function a() {
    return t[8](t[9]);
  }
  return {
    c() {
      e = C("button"), r = Z(n), i = Y(), h(e, "class", s = H("capitalize border-y border-l last:border-r border-black px-2 py-1 text-xs", {
        "bg-white": t[9] !== t[0],
        "bg-black text-white": t[9] === t[0]
      }));
    },
    m(c, f) {
      T(c, e, f), _(e, r), _(e, i), t[7](e), o || (l = B(e, "click", a), o = !0);
    },
    p(c, f) {
      t = c, f & 16 && n !== (n = t[9] + "") && G(r, n), f & 17 && s !== (s = H("capitalize border-y border-l last:border-r border-black px-2 py-1 text-xs", {
        "bg-white": t[9] !== t[0],
        "bg-black text-white": t[9] === t[0]
      })) && h(e, "class", s);
    },
    d(c) {
      c && I(e), t[7](null), o = !1, l();
    }
  };
}
function xi(t) {
  let e, n, r = t[1] && Ut(t), i = t[4], s = [];
  for (let o = 0; o < i.length; o += 1)
    s[o] = qt(Xt(t, i, o));
  return {
    c() {
      e = C("label"), r && r.c(), n = Y();
      for (let o = 0; o < s.length; o += 1)
        s[o].c();
      this.c = P;
    },
    m(o, l) {
      T(o, e, l), r && r.m(e, null), _(e, n);
      for (let a = 0; a < s.length; a += 1)
        s[a].m(e, null);
    },
    p(o, [l]) {
      if (o[1] ? r ? r.p(o, l) : (r = Ut(o), r.c(), r.m(e, n)) : r && (r.d(1), r = null), l & 57) {
        i = o[4];
        let a;
        for (a = 0; a < i.length; a += 1) {
          const c = Xt(o, i, a);
          s[a] ? s[a].p(c, l) : (s[a] = qt(c), s[a].c(), s[a].m(e, null));
        }
        for (; a < s.length; a += 1)
          s[a].d(1);
        s.length = i.length;
      }
    },
    i: P,
    o: P,
    d(o) {
      o && I(e), r && r.d(), at(s, o);
    }
  };
}
function Ei(t, e, n) {
  let { label: r = "" } = e, { options: i = "" } = e, { selected: s = "" } = e, { labelposition: o = "top" } = e;
  oe();
  let l, a;
  const c = (d) => {
    n(0, s = d), ae(l, "input", { value: d });
  };
  function f(d) {
    ce[d ? "unshift" : "push"](() => {
      l = d, n(3, l);
    });
  }
  const b = (d) => c(d);
  return t.$$set = (d) => {
    "label" in d && n(1, r = d.label), "options" in d && n(6, i = d.options), "selected" in d && n(0, s = d.selected), "labelposition" in d && n(2, o = d.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 64 && n(4, a = i.split(",").map((d) => d.trim()));
  }, [
    s,
    r,
    o,
    l,
    a,
    c,
    i,
    f,
    b
  ];
}
class Zn extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, Ei, xi, ie, {
      label: 1,
      options: 6,
      selected: 0,
      labelposition: 2
    }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
  }
  static get observedAttributes() {
    return ["label", "options", "selected", "labelposition"];
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), A();
  }
  get options() {
    return this.$$.ctx[6];
  }
  set options(e) {
    this.$$set({ options: e }), A();
  }
  get selected() {
    return this.$$.ctx[0];
  }
  set selected(e) {
    this.$$set({ selected: e }), A();
  }
  get labelposition() {
    return this.$$.ctx[2];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), A();
  }
}
customElements.define("v-radio", Zn);
const Mi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zn
}, Symbol.toStringTag, { value: "Module" })), Si = (t, e) => t.localeCompare(e), Ci = (t, e) => {
  const n = {}, r = new RegExp(`^${e}`, "i"), i = new RegExp(e, "gi");
  for (const o of t) {
    let l = -1;
    const a = o.split(" ");
    for (let c = 0; c < a.length; c++) {
      const f = a[c];
      f.match(r) ? l = 0 : f.match(i) && (l = c + 1);
    }
    n[l] ? n[l].push(o) : n[l] = [o];
  }
  const s = [];
  for (const o of Object.keys(n)) {
    const l = (n[o] || []).sort(Si);
    s.push(...l);
  }
  return s;
}, Ai = (t) => {
  const { top: e, bottom: n } = t.getBoundingClientRect(), r = t.parentElement.getBoundingClientRect();
  return n < r.bottom && e > r.top;
}, Zt = (t, e) => t.includes(e), Kt = (t, e) => t.map((n) => {
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
function Jt(t, e, n) {
  const r = t.slice();
  return r[46] = e[n].search, r[47] = e[n].option, r[49] = n, r;
}
function Gt(t, e, n) {
  const r = t.slice();
  return r[50] = e[n], r[52] = n, r;
}
function Qt(t, e, n) {
  const r = t.slice();
  return r[47] = e[n], r;
}
function $t(t) {
  let e, n, r;
  return {
    c() {
      e = C("p"), n = Z(t[2]), h(e, "class", r = H("text-xs capitalize", {
        "inline whitespace-nowrap": t[3] === "left"
      }));
    },
    m(i, s) {
      T(i, e, s), _(e, n);
    },
    p(i, s) {
      s[0] & 4 && G(n, i[2]), s[0] & 8 && r !== (r = H("text-xs capitalize", {
        "inline whitespace-nowrap": i[3] === "left"
      })) && h(e, "class", r);
    },
    d(i) {
      i && I(e);
    }
  };
}
function en(t) {
  let e, n = [], r = /* @__PURE__ */ new Map(), i = t[12];
  const s = (o) => o[47];
  for (let o = 0; o < i.length; o += 1) {
    let l = Qt(t, i, o), a = s(l);
    r.set(a, n[o] = tn(a, l));
  }
  return {
    c() {
      e = C("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
      h(e, "class", "flex flex-wrap gap-2 p-1");
    },
    m(o, l) {
      T(o, e, l);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
    },
    p(o, l) {
      l[0] & 4198400 && (i = o[12], n = Je(n, l, s, 1, o, i, r, e, Ke, tn, null, Qt));
    },
    d(o) {
      o && I(e);
      for (let l = 0; l < n.length; l += 1)
        n[l].d();
    }
  };
}
function tn(t, e) {
  let n, r, i = e[47] + "", s, o, l, a, c, f;
  function b() {
    return e[36](e[47]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = C("div"), r = C("span"), s = Z(i), o = Y(), l = C("v-icon"), a = Y(), he(l, "name", "x"), h(n, "class", "flex cursor-pointer items-center gap-1 rounded-xl bg-[#C4C4C4] py-0.5 px-2 text-[10px] hover:bg-gray-300"), this.first = n;
    },
    m(d, g) {
      T(d, n, g), _(n, r), _(r, s), _(n, o), _(n, l), _(n, a), c || (f = B(n, "click", b), c = !0);
    },
    p(d, g) {
      e = d, g[0] & 4096 && i !== (i = e[47] + "") && G(s, i);
    },
    d(d) {
      d && I(n), c = !1, f();
    }
  };
}
function Oi(t) {
  let e;
  return {
    c() {
      e = C("div"), e.textContent = "No matching results", h(e, "class", "flex py-1.5 px-2.5 justify-center text-xs");
    },
    m(n, r) {
      T(n, e, r);
    },
    p: P,
    d(n) {
      n && I(e);
    }
  };
}
function Ri(t) {
  let e, n = [], r = /* @__PURE__ */ new Map(), i, s, o, l = t[13];
  const a = (f) => f[47];
  for (let f = 0; f < l.length; f += 1) {
    let b = Jt(t, l, f), d = a(b);
    r.set(d, n[f] = rn(d, b));
  }
  let c = t[4] && on(t);
  return {
    c() {
      e = C("div");
      for (let f = 0; f < n.length; f += 1)
        n[f].c();
      i = Y(), c && c.c(), h(e, "class", "options-container flex max-h-36 flex-col overflow-y-auto");
    },
    m(f, b) {
      T(f, e, b);
      for (let d = 0; d < n.length; d += 1)
        n[d].m(e, null);
      _(e, i), c && c.m(e, null), t[38](e), s || (o = B(e, "mouseleave", t[18]), s = !0);
    },
    p(f, b) {
      b[0] & 25190417 && (l = f[13], n = Je(n, b, a, 1, f, l, r, e, Ke, rn, i, Jt)), f[4] ? c ? c.p(f, b) : (c = on(f), c.c(), c.m(e, null)) : c && (c.d(1), c = null);
    },
    d(f) {
      f && I(e);
      for (let b = 0; b < n.length; b += 1)
        n[b].d();
      c && c.d(), t[38](null), s = !1, o();
    }
  };
}
function Pi(t) {
  let e = t[47] + "", n;
  return {
    c() {
      n = Z(e);
    },
    m(r, i) {
      T(r, n, i);
    },
    p(r, i) {
      i[0] & 8192 && e !== (e = r[47] + "") && G(n, e);
    },
    d(r) {
      r && I(n);
    }
  };
}
function Ti(t) {
  let e, n = [], r = /* @__PURE__ */ new Map(), i = t[46];
  const s = (o) => o[52];
  for (let o = 0; o < i.length; o += 1) {
    let l = Gt(t, i, o), a = s(l);
    r.set(a, n[o] = nn(a, l));
  }
  return {
    c() {
      e = C("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
    },
    m(o, l) {
      T(o, e, l);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
    },
    p(o, l) {
      l[0] & 24576 && (i = o[46], n = Je(n, l, s, 1, o, i, r, e, Ke, nn, null, Gt));
    },
    d(o) {
      o && I(e);
      for (let l = 0; l < n.length; l += 1)
        n[l].d();
    }
  };
}
function nn(t, e) {
  let n, r = e[50] + "", i, s;
  return {
    key: t,
    first: null,
    c() {
      n = C("span"), i = Z(r), h(n, "class", s = H({
        "bg-yellow-100": e[52] === 1 && e[14] !== e[49]
      })), this.first = n;
    },
    m(o, l) {
      T(o, n, l), _(n, i);
    },
    p(o, l) {
      e = o, l[0] & 8192 && r !== (r = e[50] + "") && G(i, r), l[0] & 24576 && s !== (s = H({
        "bg-yellow-100": e[52] === 1 && e[14] !== e[49]
      })) && h(n, "class", s);
    },
    d(o) {
      o && I(n);
    }
  };
}
function rn(t, e) {
  let n, r, i, s, o, l, a, c;
  function f(p, w) {
    return p[46] ? Ti : Pi;
  }
  let b = f(e), d = b(e);
  function g() {
    return e[37](e[49]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = C("label"), r = C("input"), o = Y(), d.c(), h(r, "tabindex", "-1"), h(r, "type", "checkbox"), h(r, "class", i = H("bg-black outline-none", e[4] ? "" : "hidden")), r.checked = s = Zt(e[0], Array.isArray(e[47]) ? e[47].join("") : e[47]), h(n, "class", l = H("flex w-full gap-2 text-ellipsis whitespace-nowrap px-2 py-1.5 text-xs", {
        "bg-slate-200": e[14] === e[49]
      })), this.first = n;
    },
    m(p, w) {
      T(p, n, w), _(n, r), _(n, o), d.m(n, null), a || (c = [
        B(r, "change", function() {
          xt(e[24].bind(null, Array.isArray(e[47]) ? e[47].join("") : e[47])) && e[24].bind(null, Array.isArray(e[47]) ? e[47].join("") : e[47]).apply(this, arguments);
        }),
        B(r, "input", rt(e[32])),
        B(r, "focus", rt(Ue(e[33]))),
        B(n, "mouseenter", g)
      ], a = !0);
    },
    p(p, w) {
      e = p, w[0] & 16 && i !== (i = H("bg-black outline-none", e[4] ? "" : "hidden")) && h(r, "class", i), w[0] & 8193 && s !== (s = Zt(e[0], Array.isArray(e[47]) ? e[47].join("") : e[47])) && (r.checked = s), b === (b = f(e)) && d ? d.p(e, w) : (d.d(1), d = b(e), d && (d.c(), d.m(n, null))), w[0] & 24576 && l !== (l = H("flex w-full gap-2 text-ellipsis whitespace-nowrap px-2 py-1.5 text-xs", {
        "bg-slate-200": e[14] === e[49]
      })) && h(n, "class", l);
    },
    d(p) {
      p && I(n), d.d(), a = !1, me(c);
    }
  };
}
function on(t) {
  let e, n, r;
  return {
    c() {
      e = C("button"), e.textContent = "Clear all", h(e, "class", "w-full px-2 py-1 hover:bg-slate-200 text-xs text-left");
    },
    m(i, s) {
      T(i, e, s), n || (r = [
        B(e, "mouseenter", t[18]),
        B(e, "click", t[25])
      ], n = !0);
    },
    p: P,
    d(i) {
      i && I(e), n = !1, me(r);
    }
  };
}
function zi(t) {
  let e, n, r, i, s, o, l, a, c, f, b, d, g, p, w, m, y, k, M, x = t[2] && $t(t), z = t[12].length > 0 && en(t);
  function R(S, D) {
    return S[5].length > 0 ? Ri : Oi;
  }
  let j = R(t), L = j(t);
  return {
    c() {
      e = C("label"), x && x.c(), n = Y(), r = C("v-dropdown"), i = C("div"), s = C("div"), o = C("input"), c = Y(), f = C("button"), b = C("v-icon"), g = Y(), z && z.c(), p = Y(), w = C("div"), L.c(), this.c = P, h(o, "placeholder", t[1]), o.value = l = t[4] ? t[6] : t[0], o.readOnly = a = t[11] ? !0 : void 0, h(o, "type", "text"), h(o, "class", "grow text-xs border-0 bg-transparent outline-none appearance-none"), he(b, "name", "chevron-down"), h(f, "tabindex", "-1"), h(f, "class", d = H("grid place-content-center transition-transform duration-200", { "rotate-180": t[7] })), h(s, "class", "flex py-1.5 pl-2.5 pr-1"), h(i, "slot", "target"), h(i, "class", "w-full border border-black"), h(w, "slot", "content"), h(w, "class", "mt-1 border border-black bg-white drop-shadow-md"), he(r, "match", ""), he(r, "open", m = t[7] ? "" : void 0), h(e, "class", y = H("relative max-w-[14rem] w-full flex gap-1", {
        "flex-col": t[3] === "top",
        "items-center": t[3] === "left",
        "opacity-50 pointer-events-none": t[11]
      })), h(e, "tabindex", "-1");
    },
    m(S, D) {
      T(S, e, D), x && x.m(e, null), _(e, n), _(e, r), _(r, i), _(i, s), _(s, o), t[35](o), _(s, c), _(s, f), _(f, b), _(i, g), z && z.m(i, null), _(r, p), _(r, w), L.m(w, null), t[39](e), k || (M = [
        B(o, "input", Ue(t[16])),
        B(f, "click", t[21]),
        B(f, "focusin", rt(t[34])),
        B(e, "focusin", t[19]),
        B(e, "focusout", t[20]),
        B(e, "keyup", rt(Ue(t[17]))),
        B(e, "mousemove", t[40])
      ], k = !0);
    },
    p(S, D) {
      S[2] ? x ? x.p(S, D) : (x = $t(S), x.c(), x.m(e, n)) : x && (x.d(1), x = null), D[0] & 2 && h(o, "placeholder", S[1]), D[0] & 81 && l !== (l = S[4] ? S[6] : S[0]) && o.value !== l && (o.value = l), D[0] & 2048 && a !== (a = S[11] ? !0 : void 0) && (o.readOnly = a), D[0] & 128 && d !== (d = H("grid place-content-center transition-transform duration-200", { "rotate-180": S[7] })) && h(f, "class", d), S[12].length > 0 ? z ? z.p(S, D) : (z = en(S), z.c(), z.m(i, null)) : z && (z.d(1), z = null), j === (j = R(S)) && L ? L.p(S, D) : (L.d(1), L = j(S), L && (L.c(), L.m(w, null))), D[0] & 128 && m !== (m = S[7] ? "" : void 0) && he(r, "open", m), D[0] & 2056 && y !== (y = H("relative max-w-[14rem] w-full flex gap-1", {
        "flex-col": S[3] === "top",
        "items-center": S[3] === "left",
        "opacity-50 pointer-events-none": S[11]
      })) && h(e, "class", y);
    },
    i: P,
    o: P,
    d(S) {
      S && I(e), x && x.d(), t[35](null), z && z.d(), L.d(), t[39](null), k = !1, me(M);
    }
  };
}
function ji(t, e, n) {
  let { options: r = "" } = e, { value: i = "" } = e, { placeholder: s = "" } = e, { label: o = "" } = e, { variant: l = "single" } = e, { labelposition: a = "top" } = e, { disabled: c = "false" } = e, { exact: f = "false" } = e, b, d, g, p, w, m, y, k, M, x, z = "", R = !1, j = -1, L = !1;
  oe();
  const S = (u) => {
    L = u;
  }, D = (u, v) => u ? Ci(v, u) : v, W = (u) => {
    n(14, j = -1), n(10, g.scrollTop = 0, g), u.stopImmediatePropagation(), m ? n(6, z = d.value.trim()) : (n(0, i = d.value.trim()), ae(b, "input", { value: i }));
  }, N = (u) => {
    switch (S(!0), u.key.toLowerCase()) {
      case "enter":
        return F();
      case "arrowup":
        return X(-1);
      case "arrowdown":
        return X(1);
      case "escape":
        return de();
    }
  }, F = () => {
    if (m) {
      const u = M[j];
      n(0, i = i.includes(u) ? [...k.filter((v) => v !== u)].toString() : [...k, u].toString()), d.focus();
    } else {
      if (j > -1)
        n(0, i = M[j]);
      else {
        const u = M.find((v) => v.toLowerCase() === i);
        u && n(0, i = u);
      }
      R && (d.blur(), ae(b, "input", { value: i }));
    }
  }, X = (u) => {
    n(14, j += u), j < 0 ? n(14, j = M.length - 1) : j >= M.length && n(14, j = 0);
    const v = g.children[j];
    Ai(v) === !1 && v.scrollIntoView();
  }, fe = () => {
    n(14, j = -1);
  }, de = () => {
    d.blur();
  }, pe = () => {
    R || (n(7, R = !0), d.focus());
  }, xe = (u) => {
    b.contains(u.relatedTarget) || (n(7, R = !1), n(14, j = -1));
  }, Ee = () => {
    R ? n(7, R = !1) : d.focus();
  }, ge = (u) => {
    n(0, i = [...k.filter((v) => v !== u)].toString()), ae(b, "input", { value: i }), d.focus();
  }, we = (u) => {
    L || n(14, j = u);
  }, De = (u, v) => {
    const { checked: V } = v.target;
    if (m === !1 && i === u) {
      v.preventDefault(), n(7, R = !1);
      return;
    }
    n(0, i = V ? [...k, u].toString() : [...k.filter((U) => U !== u)].toString()), ae(b, "input", { value: i }), m ? d.focus() : n(7, R = !1);
  }, He = () => {
    n(0, i = ""), n(10, g.scrollTop = 0, g), ae(b, "input", { value: i });
  };
  function Oe(u) {
    bt.call(this, t, u);
  }
  function Re(u) {
    bt.call(this, t, u);
  }
  function ye(u) {
    bt.call(this, t, u);
  }
  function ze(u) {
    ce[u ? "unshift" : "push"](() => {
      d = u, n(9, d);
    });
  }
  const We = (u) => ge(u), dt = (u) => we(u);
  function ht(u) {
    ce[u ? "unshift" : "push"](() => {
      g = u, n(10, g);
    });
  }
  function $e(u) {
    ce[u ? "unshift" : "push"](() => {
      b = u, n(8, b);
    });
  }
  const E = () => S(!1);
  return t.$$set = (u) => {
    "options" in u && n(26, r = u.options), "value" in u && n(0, i = u.value), "placeholder" in u && n(1, s = u.placeholder), "label" in u && n(2, o = u.label), "variant" in u && n(27, l = u.variant), "labelposition" in u && n(3, a = u.labelposition), "disabled" in u && n(28, c = u.disabled), "exact" in u && n(29, f = u.exact);
  }, t.$$.update = () => {
    t.$$.dirty[0] & 268435456 && n(11, p = ve(c, "disabled")), t.$$.dirty[0] & 536870912 && n(30, w = ve(f, "exact")), t.$$.dirty[0] & 134217728 && n(4, m = l === "multiple"), t.$$.dirty[0] & 67108864 && n(31, y = r.split(",").map((u) => u.trim())), t.$$.dirty[0] & 1073741969 | t.$$.dirty[1] & 1 && (R || (m && n(6, z = ""), w && y.includes(i) === !1 && n(0, i = ""))), t.$$.dirty[0] & 17 && n(12, k = m ? i.split(",").filter(Boolean).map((u) => u.trim()) : []), t.$$.dirty[0] & 81 | t.$$.dirty[1] & 1 && n(5, M = D(m ? z : i, y)), t.$$.dirty[0] & 113 && n(13, x = m ? Kt(M, z) : Kt(M, i));
  }, [
    i,
    s,
    o,
    a,
    m,
    M,
    z,
    R,
    b,
    d,
    g,
    p,
    k,
    x,
    j,
    S,
    W,
    N,
    fe,
    pe,
    xe,
    Ee,
    ge,
    we,
    De,
    He,
    r,
    l,
    c,
    f,
    w,
    y,
    Oe,
    Re,
    ye,
    ze,
    We,
    dt,
    ht,
    $e,
    E
  ];
}
class Kn extends $ {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>.options-container::-webkit-scrollbar{width:6px}.options-container::-webkit-scrollbar-track{background:transparent}.options-container::-webkit-scrollbar-thumb{background-color:black;border-radius:0;border:0 solid transparent}.options-container{scrollbar-width:thin;scrollbar-color:black transparent}</style>", ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, ji, zi, ie, {
      options: 26,
      value: 0,
      placeholder: 1,
      label: 2,
      variant: 27,
      labelposition: 3,
      disabled: 28,
      exact: 29
    }, null, [-1, -1]), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
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
    this.$$set({ options: e }), A();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), A();
  }
  get placeholder() {
    return this.$$.ctx[1];
  }
  set placeholder(e) {
    this.$$set({ placeholder: e }), A();
  }
  get label() {
    return this.$$.ctx[2];
  }
  set label(e) {
    this.$$set({ label: e }), A();
  }
  get variant() {
    return this.$$.ctx[27];
  }
  set variant(e) {
    this.$$set({ variant: e }), A();
  }
  get labelposition() {
    return this.$$.ctx[3];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), A();
  }
  get disabled() {
    return this.$$.ctx[28];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), A();
  }
  get exact() {
    return this.$$.ctx[29];
  }
  set exact(e) {
    this.$$set({ exact: e }), A();
  }
}
customElements.define("v-select", Kn);
const Li = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Kn
}, Symbol.toStringTag, { value: "Module" })), je = [];
function Vi(t, e = P) {
  let n;
  const r = /* @__PURE__ */ new Set();
  function i(l) {
    if (Rn(t, l) && (t = l, n)) {
      const a = !je.length;
      for (const c of r)
        c[1](), je.push(c, t);
      if (a) {
        for (let c = 0; c < je.length; c += 2)
          je[c][0](je[c + 1]);
        je.length = 0;
      }
    }
  }
  function s(l) {
    i(l(t));
  }
  function o(l, a = P) {
    const c = [l, a];
    return r.add(c), r.size === 1 && (n = e(i) || P), l(t), () => {
      r.delete(c), r.size === 0 && (n(), n = null);
    };
  }
  return { set: i, update: s, subscribe: o };
}
function sn(t) {
  return Object.prototype.toString.call(t) === "[object Date]";
}
function yt(t, e, n, r) {
  if (typeof n == "number" || sn(n)) {
    const i = r - n, s = (n - e) / (t.dt || 1 / 60), o = t.opts.stiffness * i, l = t.opts.damping * s, a = (o - l) * t.inv_mass, c = (s + a) * t.dt;
    return Math.abs(c) < t.opts.precision && Math.abs(i) < t.opts.precision ? r : (t.settled = !1, sn(n) ? new Date(n.getTime() + c) : n + c);
  } else {
    if (Array.isArray(n))
      return n.map((i, s) => yt(t, e[s], n[s], r[s]));
    if (typeof n == "object") {
      const i = {};
      for (const s in n)
        i[s] = yt(t, e[s], n[s], r[s]);
      return i;
    } else
      throw new Error(`Cannot spring ${typeof n} values`);
  }
}
function Ii(t, e = {}) {
  const n = Vi(t), { stiffness: r = 0.15, damping: i = 0.8, precision: s = 0.01 } = e;
  let o, l, a, c = t, f = t, b = 1, d = 0, g = !1;
  function p(m, y = {}) {
    f = m;
    const k = a = {};
    if (t == null || y.hard || w.stiffness >= 1 && w.damping >= 1)
      return g = !0, o = At(), c = m, n.set(t = f), Promise.resolve();
    if (y.soft) {
      const M = y.soft === !0 ? 0.5 : +y.soft;
      d = 1 / (M * 60), b = 0;
    }
    return l || (o = At(), g = !1, l = vr((M) => {
      if (g)
        return g = !1, l = null, !1;
      b = Math.min(b + d, 1);
      const x = {
        inv_mass: b,
        opts: w,
        settled: !0,
        dt: (M - o) * 60 / 1e3
      }, z = yt(x, c, t, f);
      return o = M, c = t, n.set(t = z), x.settled && (l = null), !x.settled;
    })), new Promise((M) => {
      l.promise.then(() => {
        k === a && M();
      });
    });
  }
  const w = {
    set: p,
    update: (m, y) => p(m(f, t), y),
    subscribe: n.subscribe,
    stiffness: r,
    damping: i,
    precision: s
  };
  return w;
}
function ln(t, e, n) {
  const r = t.slice();
  return r[53] = e[n], r[55] = n, r;
}
function an(t, e, n) {
  const r = t.slice();
  return r[6] = e[n], r[57] = n, r;
}
function cn(t) {
  let e, n;
  return {
    c() {
      e = C("p"), n = Z(t[4]), h(e, "class", "text-xs capitalize");
    },
    m(r, i) {
      T(r, e, i), _(e, n);
    },
    p(r, i) {
      i[0] & 16 && G(n, r[4]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function un(t) {
  let e, n;
  return {
    c() {
      e = C("span"), n = Z(t[5]), h(e, "class", "floating-suffix");
    },
    m(r, i) {
      T(r, e, i), _(e, n);
    },
    p(r, i) {
      i[0] & 32 && G(n, r[5]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function fn(t) {
  let e, n, r, i, s, o, l = t[6] + "", a, c, f, b, d, g, p, w, m, y, k, M = t[5] && un(t);
  function x() {
    return t[37](t[57]);
  }
  return {
    c() {
      e = C("span"), n = C("span"), r = Y(), i = C("span"), s = Y(), o = C("span"), a = Z(l), c = Y(), M && M.c(), h(n, "class", "handle-bg absolute left-0 bottom-1 rounded-full opacity-50 h-full w-full transition-transform bg-gray-400"), h(i, "class", "absolute left-0 bottom-1 block rounded-full h-full w-full border border-black bg-white"), h(o, "class", f = H("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })), h(e, "role", "slider"), h(e, "class", "range absolute block h-5 w-5 top-1 bottom-auto -translate-x-1/2 -translate-y-1/2 z-[2]"), h(e, "data-handle", b = t[57]), be(e, "left", t[17][t[57]] + "%"), be(e, "z-index", t[15] === t[57] ? 3 : 2), h(e, "aria-valuemin", d = t[0] === !0 && t[57] === 1 ? t[9] : t[7]), h(e, "aria-valuemax", g = t[0] === !0 && t[57] === 0 ? t[10] : t[8]), h(e, "aria-valuenow", p = t[6]), h(e, "aria-valuetext", w = t[6]?.toString()), h(e, "aria-orientation", "horizontal"), h(e, "aria-disabled", t[2]), h(e, "disabled", t[2]), h(e, "tabindex", m = t[2] ? -1 : 0), ee(e, "active", t[13] && t[15] === t[57]), ee(e, "press", t[14] && t[15] === t[57]);
    },
    m(z, R) {
      T(z, e, R), _(e, n), _(e, r), _(e, i), _(e, s), _(e, o), _(o, a), _(o, c), M && M.m(o, null), y || (k = [
        B(e, "blur", t[20]),
        B(e, "focus", x)
      ], y = !0);
    },
    p(z, R) {
      t = z, R[0] & 1536 && l !== (l = t[6] + "") && G(a, l), t[5] ? M ? M.p(t, R) : (M = un(t), M.c(), M.m(o, null)) : M && (M.d(1), M = null), R[0] & 40960 && f !== (f = H("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })) && h(o, "class", f), R[0] & 131072 && be(e, "left", t[17][t[57]] + "%"), R[0] & 32768 && be(e, "z-index", t[15] === t[57] ? 3 : 2), R[0] & 641 && d !== (d = t[0] === !0 && t[57] === 1 ? t[9] : t[7]) && h(e, "aria-valuemin", d), R[0] & 1281 && g !== (g = t[0] === !0 && t[57] === 0 ? t[10] : t[8]) && h(e, "aria-valuemax", g), R[0] & 1536 && p !== (p = t[6]) && h(e, "aria-valuenow", p), R[0] & 1536 && w !== (w = t[6]?.toString()) && h(e, "aria-valuetext", w), R[0] & 4 && h(e, "aria-disabled", t[2]), R[0] & 4 && h(e, "disabled", t[2]), R[0] & 4 && m !== (m = t[2] ? -1 : 0) && h(e, "tabindex", m), R[0] & 40960 && ee(e, "active", t[13] && t[15] === t[57]), R[0] & 49152 && ee(e, "press", t[14] && t[15] === t[57]);
    },
    d(z) {
      z && I(e), M && M.d(), y = !1, me(k);
    }
  };
}
function dn(t) {
  let e;
  return {
    c() {
      e = C("span"), h(e, "class", "absolute block transition duration-200 h-1 -top-0.5 select-none z-[1] bg-black"), be(e, "left", t[18](t[17]) + "%"), be(e, "right", t[19](t[17]) + "%");
    },
    m(n, r) {
      T(n, e, r);
    },
    p(n, r) {
      r[0] & 131072 && be(e, "left", n[18](n[17]) + "%"), r[0] & 131072 && be(e, "right", n[19](n[17]) + "%");
    },
    d(n) {
      n && I(e);
    }
  };
}
function hn(t) {
  let e, n;
  return {
    c() {
      e = C("span"), n = Z(t[5]), h(e, "class", "pipVal-suffix");
    },
    m(r, i) {
      T(r, e, i), _(e, n);
    },
    p(r, i) {
      i[0] & 32 && G(n, r[5]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function bn(t) {
  let e, n = Array.from({ length: t[12] + 1 }), r = [];
  for (let i = 0; i < n.length; i += 1)
    r[i] = pn(ln(t, n, i));
  return {
    c() {
      for (let i = 0; i < r.length; i += 1)
        r[i].c();
      e = Et();
    },
    m(i, s) {
      for (let o = 0; o < r.length; o += 1)
        r[o].m(i, s);
      T(i, e, s);
    },
    p(i, s) {
      if (s[0] & 70016) {
        n = Array.from({ length: i[12] + 1 });
        let o;
        for (o = 0; o < n.length; o += 1) {
          const l = ln(i, n, o);
          r[o] ? r[o].p(l, s) : (r[o] = pn(l), r[o].c(), r[o].m(e.parentNode, e));
        }
        for (; o < r.length; o += 1)
          r[o].d(1);
        r.length = n.length;
      }
    },
    d(i) {
      at(r, i), i && I(e);
    }
  };
}
function mn(t) {
  let e;
  return {
    c() {
      e = C("span"), h(e, "class", "absolute h-[4px] w-[1px] top-[calc(50%-9px)] whitespace-nowrap transition bg-black/50"), be(e, "left", it(t[16](t[55]), t[7], t[8], 2) + "%");
    },
    m(n, r) {
      T(n, e, r);
    },
    p(n, r) {
      r[0] & 65920 && be(e, "left", it(n[16](n[55]), n[7], n[8], 2) + "%");
    },
    d(n) {
      n && I(e);
    }
  };
}
function pn(t) {
  let e = t[16](t[55]) !== t[7] && t[16](t[55]) !== t[8], n, r = e && mn(t);
  return {
    c() {
      r && r.c(), n = Et();
    },
    m(i, s) {
      r && r.m(i, s), T(i, n, s);
    },
    p(i, s) {
      s[0] & 65920 && (e = i[16](i[55]) !== i[7] && i[16](i[55]) !== i[8]), e ? r ? r.p(i, s) : (r = mn(i), r.c(), r.m(n.parentNode, n)) : r && (r.d(1), r = null);
    },
    d(i) {
      r && r.d(i), i && I(n);
    }
  };
}
function gn(t) {
  let e, n;
  return {
    c() {
      e = C("span"), n = Z(t[5]), h(e, "class", "pipVal-suffix");
    },
    m(r, i) {
      T(r, e, i), _(e, n);
    },
    p(r, i) {
      i[0] & 32 && G(n, r[5]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function Ni(t) {
  let e, n, r, i, s, o, l, a, c, f, b, d, g, p, w, m, y, k = t[4] && cn(t), M = t[10] ? [t[9], t[10]] : [t[9]], x = [];
  for (let S = 0; S < M.length; S += 1)
    x[S] = fn(an(t, M, S));
  let z = t[0] && dn(t), R = t[5] && hn(t), j = t[3] && bn(t), L = t[5] && gn(t);
  return {
    c() {
      e = C("label"), k && k.c(), n = Y(), r = C("div");
      for (let S = 0; S < x.length; S += 1)
        x[S].c();
      i = Y(), z && z.c(), s = Y(), o = C("div"), l = C("small"), a = Z(t[7]), c = Y(), R && R.c(), f = Y(), j && j.c(), b = Y(), d = C("small"), g = Z(t[8]), p = Y(), L && L.c(), this.c = P, h(l, "class", "absolute bottom-full left-0 -translate-x-1/2 mb-3 whitespace-nowrap"), h(d, "class", "absolute bottom-full right-0 translate-x-1/2 mb-3 whitespace-nowrap"), h(o, "class", "absolute h-2 left-0 right-0"), ee(o, "disabled", t[2]), ee(o, "focus", t[13]), h(r, "class", w = H("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": t[2] })), ee(r, "range", t[0]), ee(r, "focus", t[13]), ee(r, "min", t[0] === "min"), ee(r, "max", t[0] === "max"), h(e, "class", "flex flex-col gap-2");
    },
    m(S, D) {
      T(S, e, D), k && k.m(e, null), _(e, n), _(e, r);
      for (let W = 0; W < x.length; W += 1)
        x[W].m(r, null);
      _(r, i), z && z.m(r, null), _(r, s), _(r, o), _(o, l), _(l, a), _(l, c), R && R.m(l, null), _(o, f), j && j.m(o, null), _(o, b), _(o, d), _(d, g), _(d, p), L && L.m(d, null), t[38](r), m || (y = [
        B(window, "mousedown", t[24]),
        B(window, "touchstart", t[24]),
        B(window, "mousemove", t[25]),
        B(window, "touchmove", t[25]),
        B(window, "mouseup", t[26]),
        B(window, "touchend", t[27]),
        B(window, "keydown", t[28]),
        B(r, "mousedown", t[22]),
        B(r, "mouseup", t[23]),
        B(r, "touchstart", Ue(t[22])),
        B(r, "touchend", Ue(t[23]))
      ], m = !0);
    },
    p(S, D) {
      if (S[4] ? k ? k.p(S, D) : (k = cn(S), k.c(), k.m(e, n)) : k && (k.d(1), k = null), D[0] & 3336101) {
        M = S[10] ? [S[9], S[10]] : [S[9]];
        let W;
        for (W = 0; W < M.length; W += 1) {
          const N = an(S, M, W);
          x[W] ? x[W].p(N, D) : (x[W] = fn(N), x[W].c(), x[W].m(r, i));
        }
        for (; W < x.length; W += 1)
          x[W].d(1);
        x.length = M.length;
      }
      S[0] ? z ? z.p(S, D) : (z = dn(S), z.c(), z.m(r, s)) : z && (z.d(1), z = null), D[0] & 128 && G(a, S[7]), S[5] ? R ? R.p(S, D) : (R = hn(S), R.c(), R.m(l, null)) : R && (R.d(1), R = null), S[3] ? j ? j.p(S, D) : (j = bn(S), j.c(), j.m(o, b)) : j && (j.d(1), j = null), D[0] & 256 && G(g, S[8]), S[5] ? L ? L.p(S, D) : (L = gn(S), L.c(), L.m(d, null)) : L && (L.d(1), L = null), D[0] & 4 && ee(o, "disabled", S[2]), D[0] & 8192 && ee(o, "focus", S[13]), D[0] & 4 && w !== (w = H("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": S[2] })) && h(r, "class", w), D[0] & 5 && ee(r, "range", S[0]), D[0] & 8196 && ee(r, "focus", S[13]), D[0] & 5 && ee(r, "min", S[0] === "min"), D[0] & 5 && ee(r, "max", S[0] === "max");
    },
    i: P,
    o: P,
    d(S) {
      S && I(e), k && k.d(), at(x, S), z && z.d(), R && R.d(), j && j.d(), L && L.d(), t[38](null), m = !1, me(y);
    }
  };
}
function Fi(t, e, n) {
  let r, i, s = P, o = () => (s(), s = yr(Ee, (O) => n(17, i = O)), Ee);
  t.$$.on_destroy.push(() => s());
  let { slider: l } = e, { range: a = !1 } = e, { min: c } = e, { max: f } = e, { step: b } = e, { value: d } = e, { start: g } = e, { end: p } = e, { disabled: w = !1 } = e, { discrete: m = !0 } = e, { label: y = "" } = e, { suffix: k = "" } = e;
  oe();
  const M = { stiffness: 0.1, damping: 0.4 };
  let x, z, R, j, L, S, D, W = 0, N = !1, F = !1, X = !1, fe = !1, de = -1, pe, xe, Ee;
  const ge = (O, J, re) => {
    if (O <= J)
      return J;
    if (O >= re)
      return re;
    const Q = (O - J) % R;
    let Me = O - Q;
    return Math.abs(Q) * 2 >= R && (Me += Q > 0 ? R : -R), Me = Kr(Me, J, re), Number.parseFloat(Me.toFixed(2));
  }, we = (O) => O.type.includes("touch") ? O.touches[0] : O, De = (O) => {
    const J = [...l.querySelectorAll(".handle")], re = J.includes(O), Q = J.some((Me) => Me.contains(O));
    return re || Q;
  }, He = (O) => a === "min" || a === "max" ? O.slice(0, 1) : a ? O.slice(0, 2) : O, Oe = () => {
    xe = l.getBoundingClientRect();
  }, Re = (O) => {
    const re = (O.clientX - xe.left) / xe.width * 100, Q = (z - x) / 100 * re + x;
    let Me = 0;
    return a && j === L ? Q > L ? 1 : 0 : (a && (Me = [j, L].indexOf([j, L].sort((pr, gr) => Math.abs(Q - pr) - Math.abs(Q - gr))[0])), Me);
  }, ye = (O) => {
    const re = (O.clientX - xe.left) / xe.width * 100, Q = (z - x) / 100 * re + x;
    ze(de, Q);
  }, ze = (O, J) => {
    let re = O;
    const Q = ge(J, x, z);
    return typeof re > "u" && (re = de), a && (re === 0 && Q > L ? n(10, L = Q) : re === 1 && Q < j && n(9, j = Q)), re === 0 && j !== Q && n(9, j = Q), re === 1 && L !== Q && n(10, L = Q), pe !== Q && (le(), pe = Q), re === 0 ? n(29, g = j.toString()) : re === 1 && n(30, p = L.toString()), Q;
  }, We = (O) => a === "min" ? 0 : O[0], dt = (O) => a === "max" ? 0 : a === "min" ? 100 - O[0] : 100 - O[1], ht = () => {
    fe && (n(13, N = !1), F = !1, n(14, X = !1));
  }, $e = (O) => {
    w || (n(15, de = O), n(13, N = !0));
  }, E = (O) => {
    if (w)
      return;
    Oe();
    const J = O.target, re = we(O);
    n(13, N = !0), F = !0, n(14, X = !0), n(15, de = Re(re)), pe = ge(de === 0 ? j : L, x, z), O.type === "touchstart" && !J.matches(".pipVal") && ye(re);
  }, u = () => {
    n(14, X = !1);
  }, v = (O) => {
    fe = !1, N && O.target !== l && !l.contains(O.target) && n(13, N = !1);
  }, V = (O) => {
    w || !F || (n(13, N = !0), ye(we(O)));
  }, U = (O) => {
    if (!w) {
      const J = O.target;
      (F && J && J === l || l.contains(J)) && (n(13, N = !0), !De(J) && !J.matches(".pipVal") && ye(we(O)));
    }
    F = !1, n(14, X = !1);
  }, q = () => {
    F = !1, n(14, X = !1);
  }, K = (O) => {
    w || (O.target === l || l.contains(O.target)) && (fe = !0);
  }, le = () => {
    w || ae(l, "input", {
      activeHandle: de,
      previousValue: pe,
      value: de === 0 ? j : L,
      values: L ? [j, L].map((O) => ge(O, x, z)) : void 0
    });
  }, se = (O) => $e(O);
  function ue(O) {
    ce[O ? "unshift" : "push"](() => {
      l = O, n(1, l);
    });
  }
  return t.$$set = (O) => {
    "slider" in O && n(1, l = O.slider), "range" in O && n(0, a = O.range), "min" in O && n(31, c = O.min), "max" in O && n(32, f = O.max), "step" in O && n(33, b = O.step), "value" in O && n(6, d = O.value), "start" in O && n(29, g = O.start), "end" in O && n(30, p = O.end), "disabled" in O && n(2, w = O.disabled), "discrete" in O && n(3, m = O.discrete), "label" in O && n(4, y = O.label), "suffix" in O && n(5, k = O.suffix);
  }, t.$$.update = () => {
    if (t.$$.dirty[1] & 2 && n(8, z = Number.parseFloat(f || "100")), t.$$.dirty[1] & 1 && n(7, x = Number.parseFloat(c || "0")), t.$$.dirty[1] & 4 && n(34, R = Number.parseFloat(b || "1")), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(35, S = (z - x) / R >= 100 ? (z - x) / 20 : 1), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(12, D = (z - x) / R), t.$$.dirty[0] & 128 | t.$$.dirty[1] & 24 && n(16, r = (O) => x + O * R * S), t.$$.dirty[0] & 536870976 | t.$$.dirty[1] & 3 && n(9, j = g || d ? Number.parseFloat(g || d) : (Number.parseFloat(c || "0") + Number.parseFloat(f || "100")) / 2), t.$$.dirty[0] & 1073741824 && n(10, L = p ? Number.parseFloat(p) : void 0), t.$$.dirty[0] & 1073741825 && n(0, a = typeof a == "string" ? a : p !== void 0), t.$$.dirty[0] & 3968 | t.$$.dirty[1] & 32) {
      n(9, j = ge(j, x, z));
      let O = [j];
      L && (n(10, L = ge(L, x, z)), O.push(L)), O = He(O), W !== O.length ? o(n(11, Ee = Ii(O.map((J) => it(J, x, z, 2)), M))) : Ee.set(O.map((J) => it(J, x, z, 2))).catch((J) => console.error(J)), n(36, W = O.length);
    }
  }, [
    a,
    l,
    w,
    m,
    y,
    k,
    d,
    x,
    z,
    j,
    L,
    Ee,
    D,
    N,
    X,
    de,
    r,
    i,
    We,
    dt,
    ht,
    $e,
    E,
    u,
    v,
    V,
    U,
    q,
    K,
    g,
    p,
    c,
    f,
    b,
    R,
    S,
    W,
    se,
    ue
  ];
}
class Jn extends $ {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>.slider .range:hover .handle-bg{transform:scale(1.5)}.slider .range.active .handle-bg{transform:scale(2.0)}.slider .range.active .floating,.slider .range:hover .floating{opacity:1}</style>", ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, Fi, Ni, Rn, {
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
    }, null, [-1, -1]), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
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
    this.$$set({ slider: e }), A();
  }
  get range() {
    return this.$$.ctx[0];
  }
  set range(e) {
    this.$$set({ range: e }), A();
  }
  get min() {
    return this.$$.ctx[31];
  }
  set min(e) {
    this.$$set({ min: e }), A();
  }
  get max() {
    return this.$$.ctx[32];
  }
  set max(e) {
    this.$$set({ max: e }), A();
  }
  get step() {
    return this.$$.ctx[33];
  }
  set step(e) {
    this.$$set({ step: e }), A();
  }
  get value() {
    return this.$$.ctx[6];
  }
  set value(e) {
    this.$$set({ value: e }), A();
  }
  get start() {
    return this.$$.ctx[29];
  }
  set start(e) {
    this.$$set({ start: e }), A();
  }
  get end() {
    return this.$$.ctx[30];
  }
  set end(e) {
    this.$$set({ end: e }), A();
  }
  get disabled() {
    return this.$$.ctx[2];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), A();
  }
  get discrete() {
    return this.$$.ctx[3];
  }
  set discrete(e) {
    this.$$set({ discrete: e }), A();
  }
  get label() {
    return this.$$.ctx[4];
  }
  set label(e) {
    this.$$set({ label: e }), A();
  }
  get suffix() {
    return this.$$.ctx[5];
  }
  set suffix(e) {
    this.$$set({ suffix: e }), A();
  }
}
customElements.define("v-slider", Jn);
const Di = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jn
}, Symbol.toStringTag, { value: "Module" }));
function wn(t) {
  let e, n, r;
  return {
    c() {
      e = C("p"), n = Z(t[1]), h(e, "class", r = H("text-xs capitalize", {
        "whitespace-nowrap": t[4] === "left"
      }));
    },
    m(i, s) {
      T(i, e, s), _(e, n);
    },
    p(i, s) {
      s & 2 && G(n, i[1]), s & 16 && r !== (r = H("text-xs capitalize", {
        "whitespace-nowrap": i[4] === "left"
      })) && h(e, "class", r);
    },
    d(i) {
      i && I(e);
    }
  };
}
function yn(t) {
  let e, n;
  return {
    c() {
      e = C("p"), n = Z(t[0]), h(e, "class", "capitalize text-xs");
    },
    m(r, i) {
      T(r, e, i), _(e, n);
    },
    p(r, i) {
      i & 1 && G(n, r[0]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function Hi(t) {
  let e, n, r, i, s, o, l, a, c, f, b, d, g, p = t[1] && wn(t), w = t[3] === "annotated" && yn(t);
  return {
    c() {
      e = C("label"), p && p.c(), n = Y(), r = C("button"), i = C("div"), s = C("span"), o = Y(), l = C("input"), c = Y(), w && w.c(), this.c = P, h(s, "class", "pointer-events-none relative inline-block border border-green/100 h-4 w-4 mt-px ml-px bg-white shadow transform ring-0 motion-safe:transition-transform ease-in-out duration-200"), ee(s, "translate-x-0", !t[7]), ee(s, "translate-x-6", t[7]), h(l, "name", t[2]), l.value = t[0], h(l, "class", "hidden"), h(l, "type", "checkbox"), l.checked = t[7], h(i, "class", a = H("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": t[7] })), h(r, "type", "button"), h(r, "class", "flex gap-1.5 items-center"), h(r, "role", "switch"), h(r, "aria-label", t[1]), h(r, "aria-checked", f = t[7] ? "true" : "false"), h(e, "class", b = H("flex gap-1", {
        "flex-col justify-start": t[4] === "top",
        "items-center": t[4] === "left",
        "opacity-50 pointer-events-none": t[8]
      }));
    },
    m(m, y) {
      T(m, e, y), p && p.m(e, null), _(e, n), _(e, r), _(r, i), _(i, s), _(i, o), _(i, l), t[11](l), _(r, c), w && w.m(r, null), t[12](e), d || (g = B(r, "click", t[9]), d = !0);
    },
    p(m, [y]) {
      m[1] ? p ? p.p(m, y) : (p = wn(m), p.c(), p.m(e, n)) : p && (p.d(1), p = null), y & 128 && ee(s, "translate-x-0", !m[7]), y & 128 && ee(s, "translate-x-6", m[7]), y & 4 && h(l, "name", m[2]), y & 1 && (l.value = m[0]), y & 128 && (l.checked = m[7]), y & 128 && a !== (a = H("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": m[7] })) && h(i, "class", a), m[3] === "annotated" ? w ? w.p(m, y) : (w = yn(m), w.c(), w.m(r, null)) : w && (w.d(1), w = null), y & 2 && h(r, "aria-label", m[1]), y & 128 && f !== (f = m[7] ? "true" : "false") && h(r, "aria-checked", f), y & 272 && b !== (b = H("flex gap-1", {
        "flex-col justify-start": m[4] === "top",
        "items-center": m[4] === "left",
        "opacity-50 pointer-events-none": m[8]
      })) && h(e, "class", b);
    },
    i: P,
    o: P,
    d(m) {
      m && I(e), p && p.d(), t[11](null), w && w.d(), t[12](null), d = !1, g();
    }
  };
}
function Wi(t, e, n) {
  let { label: r = "" } = e, { name: i = "" } = e, { value: s = "off" } = e, { variant: o = "default" } = e, { disabled: l } = e, { labelposition: a = "top" } = e;
  oe();
  let c, f, b, d;
  const g = () => {
    n(0, s = b ? "off" : "on"), n(6, f.checked = b, f), ae(c, "input", { value: f.checked });
  };
  function p(m) {
    ce[m ? "unshift" : "push"](() => {
      f = m, n(6, f);
    });
  }
  function w(m) {
    ce[m ? "unshift" : "push"](() => {
      c = m, n(5, c);
    });
  }
  return t.$$set = (m) => {
    "label" in m && n(1, r = m.label), "name" in m && n(2, i = m.name), "value" in m && n(0, s = m.value), "variant" in m && n(3, o = m.variant), "disabled" in m && n(10, l = m.disabled), "labelposition" in m && n(4, a = m.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 1 && n(7, b = s === "on"), t.$$.dirty & 1024 && n(8, d = ve(l, "disabled"));
  }, [
    s,
    r,
    i,
    o,
    a,
    c,
    f,
    b,
    d,
    g,
    l,
    p,
    w
  ];
}
class Gn extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, Wi, Hi, ie, {
      label: 1,
      name: 2,
      value: 0,
      variant: 3,
      disabled: 10,
      labelposition: 4
    }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
  }
  static get observedAttributes() {
    return ["label", "name", "value", "variant", "disabled", "labelposition"];
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), A();
  }
  get name() {
    return this.$$.ctx[2];
  }
  set name(e) {
    this.$$set({ name: e }), A();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), A();
  }
  get variant() {
    return this.$$.ctx[3];
  }
  set variant(e) {
    this.$$set({ variant: e }), A();
  }
  get disabled() {
    return this.$$.ctx[10];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), A();
  }
  get labelposition() {
    return this.$$.ctx[4];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), A();
  }
}
customElements.define("v-switch", Gn);
const Bi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gn
}, Symbol.toStringTag, { value: "Module" }));
function vn(t, e, n) {
  const r = t.slice();
  return r[3] = e[n], r;
}
function _n(t) {
  let e;
  return {
    c() {
      e = C("col"), be(e, "width", t[3]);
    },
    m(n, r) {
      T(n, e, r);
    },
    p: P,
    d(n) {
      n && I(e);
    }
  };
}
function Yi(t) {
  let e, n, r, i, s, o = t[1], l = [];
  for (let a = 0; a < o.length; a += 1)
    l[a] = _n(vn(t, o, a));
  return {
    c() {
      e = C("table"), n = C("colgroup");
      for (let a = 0; a < l.length; a += 1)
        l[a].c();
      r = Y(), i = C("slot"), this.c = P, h(e, "class", s = H("bg-white text-xs w-full", {
        "table-fixed": t[0] === "fixed"
      }));
    },
    m(a, c) {
      T(a, e, c), _(e, n);
      for (let f = 0; f < l.length; f += 1)
        l[f].m(n, null);
      _(e, r), _(e, i);
    },
    p(a, [c]) {
      if (c & 2) {
        o = a[1];
        let f;
        for (f = 0; f < o.length; f += 1) {
          const b = vn(a, o, f);
          l[f] ? l[f].p(b, c) : (l[f] = _n(b), l[f].c(), l[f].m(n, null));
        }
        for (; f < l.length; f += 1)
          l[f].d(1);
        l.length = o.length;
      }
      c & 1 && s !== (s = H("bg-white text-xs w-full", {
        "table-fixed": a[0] === "fixed"
      })) && h(e, "class", s);
    },
    i: P,
    o: P,
    d(a) {
      a && I(e), at(l, a);
    }
  };
}
function Xi(t, e, n) {
  oe();
  let { variant: r = "" } = e, { cols: i = "" } = e;
  const s = i.split(",").map((o) => o.trim());
  return t.$$set = (o) => {
    "variant" in o && n(0, r = o.variant), "cols" in o && n(2, i = o.cols);
  }, [r, s, i];
}
class Qn extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, Xi, Yi, ie, { variant: 0, cols: 2 }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
  }
  static get observedAttributes() {
    return ["variant", "cols"];
  }
  get variant() {
    return this.$$.ctx[0];
  }
  set variant(e) {
    this.$$set({ variant: e }), A();
  }
  get cols() {
    return this.$$.ctx[2];
  }
  set cols(e) {
    this.$$set({ cols: e }), A();
  }
}
customElements.define("v-table", Qn);
const Ui = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qn
}, Symbol.toStringTag, { value: "Module" }));
function kn(t, e, n) {
  const r = t.slice();
  return r[8] = e[n], r[10] = n, r;
}
function xn(t, e) {
  let n, r, i = e[8] + "", s, o, l, a, c, f;
  function b() {
    return e[6](e[8]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = C("button"), r = C("div"), s = Z(i), l = Y(), h(r, "class", o = H({
        "-mb-px": e[8] !== e[0]
      })), h(n, "class", a = H("px-4 py-1 uppercase text-sm first:ml-4 ", {
        "bg-white border border-x-black border-t-black border-b-white font-bold -mb-px": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })), this.first = n;
    },
    m(d, g) {
      T(d, n, g), _(n, r), _(r, s), _(n, l), c || (f = B(n, "click", b), c = !0);
    },
    p(d, g) {
      e = d, g & 2 && i !== (i = e[8] + "") && G(s, i), g & 3 && o !== (o = H({
        "-mb-px": e[8] !== e[0]
      })) && h(r, "class", o), g & 11 && a !== (a = H("px-4 py-1 uppercase text-sm first:ml-4 ", {
        "bg-white border border-x-black border-t-black border-b-white font-bold -mb-px": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })) && h(n, "class", a);
    },
    d(d) {
      d && I(n), c = !1, f();
    }
  };
}
function qi(t) {
  let e, n = [], r = /* @__PURE__ */ new Map(), i = t[1];
  const s = (o) => o[8];
  for (let o = 0; o < i.length; o += 1) {
    let l = kn(t, i, o), a = s(l);
    r.set(a, n[o] = xn(a, l));
  }
  return {
    c() {
      e = C("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
      this.c = P, h(e, "class", "w-full flex bg-black/20 border-b border-b-black");
    },
    m(o, l) {
      T(o, e, l);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
      t[7](e);
    },
    p(o, [l]) {
      l & 27 && (i = o[1], n = Je(n, l, s, 1, o, i, r, e, Ke, xn, null, kn));
    },
    i: P,
    o: P,
    d(o) {
      o && I(e);
      for (let l = 0; l < n.length; l += 1)
        n[l].d();
      t[7](null);
    }
  };
}
function Zi(t, e, n) {
  let r, i, { tabs: s = "" } = e, { selected: o = "" } = e, l;
  oe();
  const a = (b) => {
    n(0, o = b), ae(l, "input", { value: o });
  }, c = (b) => a(b);
  function f(b) {
    ce[b ? "unshift" : "push"](() => {
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
    f
  ];
}
class $n extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, Zi, qi, ie, { tabs: 5, selected: 0 }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
  }
  static get observedAttributes() {
    return ["tabs", "selected"];
  }
  get tabs() {
    return this.$$.ctx[5];
  }
  set tabs(e) {
    this.$$set({ tabs: e }), A();
  }
  get selected() {
    return this.$$.ctx[0];
  }
  set selected(e) {
    this.$$set({ selected: e }), A();
  }
}
customElements.define("v-tabs", $n);
const Ki = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $n
}, Symbol.toStringTag, { value: "Module" }));
function Ji(t) {
  let e;
  return {
    c() {
      e = C("tbody"), e.innerHTML = "<slot></slot>", this.c = P;
    },
    m(n, r) {
      T(n, e, r);
    },
    p: P,
    i: P,
    o: P,
    d(n) {
      n && I(e);
    }
  };
}
function Gi(t) {
  return oe(), [];
}
class er extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, Gi, Ji, ie, {}, null), e && e.target && T(e.target, this, e.anchor);
  }
}
customElements.define("v-tbody", er);
const Qi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: er
}, Symbol.toStringTag, { value: "Module" }));
function $i(t) {
  let e;
  return {
    c() {
      e = C("th"), e.innerHTML = "<slot></slot>", this.c = P, h(e, "class", "p-2 text-neutral-600 font-normal overflow-hidden");
    },
    m(n, r) {
      T(n, e, r);
    },
    p: P,
    i: P,
    o: P,
    d(n) {
      n && I(e);
    }
  };
}
function eo(t) {
  return oe(), [];
}
class tr extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, eo, $i, ie, {}, null), e && e.target && T(e.target, this, e.anchor);
  }
}
customElements.define("v-th", tr);
const to = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tr
}, Symbol.toStringTag, { value: "Module" }));
function no(t) {
  let e;
  return {
    c() {
      e = C("td"), e.innerHTML = "<slot></slot>", this.c = P, h(e, "class", "p-2 overflow-hidden");
    },
    m(n, r) {
      T(n, e, r);
    },
    p: P,
    i: P,
    o: P,
    d(n) {
      n && I(e);
    }
  };
}
function ro(t) {
  return oe(), [];
}
class nr extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, ro, no, ie, {}, null), e && e.target && T(e.target, this, e.anchor);
  }
}
customElements.define("v-td", nr);
const io = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nr
}, Symbol.toStringTag, { value: "Module" }));
function oo(t) {
  let e;
  return {
    c() {
      e = C("thead"), e.innerHTML = "<slot></slot>", this.c = P, h(e, "class", "border-b border-black");
    },
    m(n, r) {
      T(n, e, r);
    },
    p: P,
    i: P,
    o: P,
    d(n) {
      n && I(e);
    }
  };
}
function so(t) {
  return oe(), [];
}
class rr extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, so, oo, ie, {}, null), e && e.target && T(e.target, this, e.anchor);
  }
}
customElements.define("v-thead", rr);
const lo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rr
}, Symbol.toStringTag, { value: "Module" }));
function Ge(t) {
  return t.split("-")[0];
}
function ct(t) {
  return t.split("-")[1];
}
function Qe(t) {
  return ["top", "bottom"].includes(Ge(t)) ? "x" : "y";
}
function St(t) {
  return t === "y" ? "height" : "width";
}
function En(t, e, n) {
  let {
    reference: r,
    floating: i
  } = t;
  const s = r.x + r.width / 2 - i.width / 2, o = r.y + r.height / 2 - i.height / 2, l = Qe(e), a = St(l), c = r[a] / 2 - i[a] / 2, f = Ge(e), b = l === "x";
  let d;
  switch (f) {
    case "top":
      d = {
        x: s,
        y: r.y - i.height
      };
      break;
    case "bottom":
      d = {
        x: s,
        y: r.y + r.height
      };
      break;
    case "right":
      d = {
        x: r.x + r.width,
        y: o
      };
      break;
    case "left":
      d = {
        x: r.x - i.width,
        y: o
      };
      break;
    default:
      d = {
        x: r.x,
        y: r.y
      };
  }
  switch (ct(e)) {
    case "start":
      d[l] -= c * (n && b ? -1 : 1);
      break;
    case "end":
      d[l] += c * (n && b ? -1 : 1);
      break;
  }
  return d;
}
const ao = async (t, e, n) => {
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
    y: f
  } = En(a, r, l), b = r, d = {}, g = 0;
  for (let p = 0; p < s.length; p++) {
    const {
      name: w,
      fn: m
    } = s[p], {
      x: y,
      y: k,
      data: M,
      reset: x
    } = await m({
      x: c,
      y: f,
      initialPlacement: r,
      placement: b,
      strategy: i,
      middlewareData: d,
      rects: a,
      platform: o,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (c = y ?? c, f = k ?? f, d = {
      ...d,
      [w]: {
        ...d[w],
        ...M
      }
    }, x && g <= 50) {
      g++, typeof x == "object" && (x.placement && (b = x.placement), x.rects && (a = x.rects === !0 ? await o.getElementRects({
        reference: t,
        floating: e,
        strategy: i
      }) : x.rects), {
        x: c,
        y: f
      } = En(a, b, l)), p = -1;
      continue;
    }
  }
  return {
    x: c,
    y: f,
    placement: b,
    strategy: i,
    middlewareData: d
  };
};
function co(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function ir(t) {
  return typeof t != "number" ? co(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function ot(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
async function or(t, e) {
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
    rootBoundary: f = "viewport",
    elementContext: b = "floating",
    altBoundary: d = !1,
    padding: g = 0
  } = e, p = ir(g), m = l[d ? b === "floating" ? "reference" : "floating" : b], y = ot(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(m))) == null || n ? m : m.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(l.floating)),
    boundary: c,
    rootBoundary: f,
    strategy: a
  })), k = ot(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: b === "floating" ? {
      ...o.floating,
      x: r,
      y: i
    } : o.reference,
    offsetParent: await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating)),
    strategy: a
  }) : o[b]);
  return {
    top: y.top - k.top + p.top,
    bottom: k.bottom - y.bottom + p.bottom,
    left: y.left - k.left + p.left,
    right: k.right - y.right + p.right
  };
}
const uo = Math.min, fo = Math.max;
function vt(t, e, n) {
  return fo(t, uo(e, n));
}
const ho = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      element: n,
      padding: r = 0
    } = t ?? {}, {
      x: i,
      y: s,
      placement: o,
      rects: l,
      platform: a
    } = e;
    if (n == null)
      return {};
    const c = ir(r), f = {
      x: i,
      y: s
    }, b = Qe(o), d = ct(o), g = St(b), p = await a.getDimensions(n), w = b === "y" ? "top" : "left", m = b === "y" ? "bottom" : "right", y = l.reference[g] + l.reference[b] - f[b] - l.floating[g], k = f[b] - l.reference[b], M = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(n));
    let x = M ? b === "y" ? M.clientHeight || 0 : M.clientWidth || 0 : 0;
    x === 0 && (x = l.floating[g]);
    const z = y / 2 - k / 2, R = c[w], j = x - p[g] - c[m], L = x / 2 - p[g] / 2 + z, S = vt(R, L, j), N = (d === "start" ? c[w] : c[m]) > 0 && L !== S && l.reference[g] <= l.floating[g] ? L < R ? R - L : j - L : 0;
    return {
      [b]: f[b] - N,
      data: {
        [b]: S,
        centerOffset: L - S
      }
    };
  }
}), bo = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function st(t) {
  return t.replace(/left|right|bottom|top/g, (e) => bo[e]);
}
function mo(t, e, n) {
  n === void 0 && (n = !1);
  const r = ct(t), i = Qe(t), s = St(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (o = st(o)), {
    main: o,
    cross: st(o)
  };
}
const po = {
  start: "end",
  end: "start"
};
function Mn(t) {
  return t.replace(/start|end/g, (e) => po[e]);
}
function go(t) {
  const e = st(t);
  return [Mn(t), e, Mn(e)];
}
const wo = function(t) {
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
        crossAxis: f = !0,
        fallbackPlacements: b,
        fallbackStrategy: d = "bestFit",
        flipAlignment: g = !0,
        ...p
      } = t, w = Ge(r), y = b || (w === o || !g ? [st(o)] : go(o)), k = [o, ...y], M = await or(e, p), x = [];
      let z = ((n = i.flip) == null ? void 0 : n.overflows) || [];
      if (c && x.push(M[w]), f) {
        const {
          main: S,
          cross: D
        } = mo(r, s, await (l.isRTL == null ? void 0 : l.isRTL(a.floating)));
        x.push(M[S], M[D]);
      }
      if (z = [...z, {
        placement: r,
        overflows: x
      }], !x.every((S) => S <= 0)) {
        var R, j;
        const S = ((R = (j = i.flip) == null ? void 0 : j.index) != null ? R : 0) + 1, D = k[S];
        if (D)
          return {
            data: {
              index: S,
              overflows: z
            },
            reset: {
              placement: D
            }
          };
        let W = "bottom";
        switch (d) {
          case "bestFit": {
            var L;
            const N = (L = z.map((F) => [F, F.overflows.filter((X) => X > 0).reduce((X, fe) => X + fe, 0)]).sort((F, X) => F[1] - X[1])[0]) == null ? void 0 : L[0].placement;
            N && (W = N);
            break;
          }
          case "initialPlacement":
            W = o;
            break;
        }
        if (r !== W)
          return {
            reset: {
              placement: W
            }
          };
      }
      return {};
    }
  };
};
async function yo(t, e) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = t, s = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Ge(n), l = ct(n), a = Qe(n) === "x", c = ["left", "top"].includes(o) ? -1 : 1, f = s && a ? -1 : 1, b = typeof e == "function" ? e(t) : e;
  let {
    mainAxis: d,
    crossAxis: g,
    alignmentAxis: p
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
  return l && typeof p == "number" && (g = l === "end" ? p * -1 : p), a ? {
    x: g * f,
    y: d * c
  } : {
    x: d * c,
    y: g * f
  };
}
const vo = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r
      } = e, i = await yo(e, t);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
};
function _o(t) {
  return t === "x" ? "y" : "x";
}
const ko = function(t) {
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
          fn: (m) => {
            let {
              x: y,
              y: k
            } = m;
            return {
              x: y,
              y: k
            };
          }
        },
        ...a
      } = t, c = {
        x: n,
        y: r
      }, f = await or(e, a), b = Qe(Ge(i)), d = _o(b);
      let g = c[b], p = c[d];
      if (s) {
        const m = b === "y" ? "top" : "left", y = b === "y" ? "bottom" : "right", k = g + f[m], M = g - f[y];
        g = vt(k, g, M);
      }
      if (o) {
        const m = d === "y" ? "top" : "left", y = d === "y" ? "bottom" : "right", k = p + f[m], M = p - f[y];
        p = vt(k, p, M);
      }
      const w = l.fn({
        ...e,
        [b]: g,
        [d]: p
      });
      return {
        ...w,
        data: {
          x: w.x - n,
          y: w.y - r
        }
      };
    }
  };
};
function sr(t) {
  return t && t.document && t.location && t.alert && t.setInterval;
}
function Ce(t) {
  if (t == null)
    return window;
  if (!sr(t)) {
    const e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function _e(t) {
  return Ce(t).getComputedStyle(t);
}
function Se(t) {
  return sr(t) ? "" : t ? (t.nodeName || "").toLowerCase() : "";
}
function lr() {
  const t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map((e) => e.brand + "/" + e.version).join(" ") : navigator.userAgent;
}
function ke(t) {
  return t instanceof Ce(t).HTMLElement;
}
function Ie(t) {
  return t instanceof Ce(t).Element;
}
function xo(t) {
  return t instanceof Ce(t).Node;
}
function Ne(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = Ce(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function ut(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r
  } = _e(t);
  return /auto|scroll|overlay|hidden/.test(e + r + n);
}
function Eo(t) {
  return ["table", "td", "th"].includes(Se(t));
}
function ar(t) {
  const e = /firefox/i.test(lr()), n = _e(t);
  return n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].includes(n.willChange) || e && n.willChange === "filter" || e && (n.filter ? n.filter !== "none" : !1);
}
function cr() {
  return !/^((?!chrome|android).)*safari/i.test(lr());
}
const Sn = Math.min, Xe = Math.max, lt = Math.round;
function Te(t, e, n) {
  var r, i, s, o;
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const l = t.getBoundingClientRect();
  let a = 1, c = 1;
  e && ke(t) && (a = t.offsetWidth > 0 && lt(l.width) / t.offsetWidth || 1, c = t.offsetHeight > 0 && lt(l.height) / t.offsetHeight || 1);
  const f = Ie(t) ? Ce(t) : window, b = !cr() && n, d = (l.left + (b && (r = (i = f.visualViewport) == null ? void 0 : i.offsetLeft) != null ? r : 0)) / a, g = (l.top + (b && (s = (o = f.visualViewport) == null ? void 0 : o.offsetTop) != null ? s : 0)) / c, p = l.width / a, w = l.height / c;
  return {
    width: p,
    height: w,
    top: g,
    right: d + p,
    bottom: g + w,
    left: d,
    x: d,
    y: g
  };
}
function Ae(t) {
  return ((xo(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function ft(t) {
  return Ie(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function ur(t) {
  return Te(Ae(t)).left + ft(t).scrollLeft;
}
function Mo(t) {
  const e = Te(t);
  return lt(e.width) !== t.offsetWidth || lt(e.height) !== t.offsetHeight;
}
function So(t, e, n) {
  const r = ke(e), i = Ae(e), s = Te(t, r && Mo(e), n === "fixed");
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = {
    x: 0,
    y: 0
  };
  if (r || !r && n !== "fixed")
    if ((Se(e) !== "body" || ut(i)) && (o = ft(e)), ke(e)) {
      const a = Te(e, !0);
      l.x = a.x + e.clientLeft, l.y = a.y + e.clientTop;
    } else
      i && (l.x = ur(i));
  return {
    x: s.left + o.scrollLeft - l.x,
    y: s.top + o.scrollTop - l.y,
    width: s.width,
    height: s.height
  };
}
function fr(t) {
  return Se(t) === "html" ? t : t.assignedSlot || t.parentNode || (Ne(t) ? t.host : null) || Ae(t);
}
function Cn(t) {
  return !ke(t) || _e(t).position === "fixed" ? null : Co(t);
}
function Co(t) {
  let {
    offsetParent: e
  } = t, n = t, r = !1;
  for (; n && n !== e; ) {
    const {
      assignedSlot: i
    } = n;
    if (i) {
      let s = i.offsetParent;
      if (_e(i).display === "contents") {
        const o = i.hasAttribute("style"), l = i.style.display;
        i.style.display = _e(n).display, s = i.offsetParent, i.style.display = l, o || i.removeAttribute("style");
      }
      n = i, e !== s && (e = s, r = !0);
    } else if (Ne(n) && n.host && r)
      break;
    n = Ne(n) && n.host || n.parentNode;
  }
  return e;
}
function Ao(t) {
  let e = fr(t);
  for (Ne(e) && (e = e.host); ke(e) && !["html", "body"].includes(Se(e)); ) {
    if (ar(e))
      return e;
    {
      const n = e.parentNode;
      e = Ne(n) ? n.host : n;
    }
  }
  return null;
}
function _t(t) {
  const e = Ce(t);
  let n = Cn(t);
  for (; n && Eo(n) && _e(n).position === "static"; )
    n = Cn(n);
  return n && (Se(n) === "html" || Se(n) === "body" && _e(n).position === "static" && !ar(n)) ? e : n || Ao(t) || e;
}
function An(t) {
  if (ke(t))
    return {
      width: t.offsetWidth,
      height: t.offsetHeight
    };
  const e = Te(t);
  return {
    width: e.width,
    height: e.height
  };
}
function Oo(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: r
  } = t;
  const i = ke(n), s = Ae(n);
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
  if ((i || !i && r !== "fixed") && ((Se(n) !== "body" || ut(s)) && (o = ft(n)), ke(n))) {
    const a = Te(n, !0);
    l.x = a.x + n.clientLeft, l.y = a.y + n.clientTop;
  }
  return {
    ...e,
    x: e.x - o.scrollLeft + l.x,
    y: e.y - o.scrollTop + l.y
  };
}
function Ro(t, e) {
  const n = Ce(t), r = Ae(t), i = n.visualViewport;
  let s = r.clientWidth, o = r.clientHeight, l = 0, a = 0;
  if (i) {
    s = i.width, o = i.height;
    const c = cr();
    (c || !c && e === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: s,
    height: o,
    x: l,
    y: a
  };
}
function Po(t) {
  var e;
  const n = Ae(t), r = ft(t), i = (e = t.ownerDocument) == null ? void 0 : e.body, s = Xe(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = Xe(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0);
  let l = -r.scrollLeft + ur(t);
  const a = -r.scrollTop;
  return _e(i || n).direction === "rtl" && (l += Xe(n.clientWidth, i ? i.clientWidth : 0) - s), {
    width: s,
    height: o,
    x: l,
    y: a
  };
}
function dr(t) {
  const e = fr(t);
  return ["html", "body", "#document"].includes(Se(e)) ? t.ownerDocument.body : ke(e) && ut(e) ? e : dr(e);
}
function hr(t, e) {
  var n;
  e === void 0 && (e = []);
  const r = dr(t), i = r === ((n = t.ownerDocument) == null ? void 0 : n.body), s = Ce(r), o = i ? [s].concat(s.visualViewport || [], ut(r) ? r : []) : r, l = e.concat(o);
  return i ? l : l.concat(hr(o));
}
function To(t, e) {
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
function zo(t, e) {
  const n = Te(t, !1, e === "fixed"), r = n.top + t.clientTop, i = n.left + t.clientLeft;
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
function On(t, e, n) {
  return e === "viewport" ? ot(Ro(t, n)) : Ie(e) ? zo(e, n) : ot(Po(Ae(t)));
}
function jo(t) {
  const e = hr(t), r = ["absolute", "fixed"].includes(_e(t).position) && ke(t) ? _t(t) : t;
  return Ie(r) ? e.filter((i) => Ie(i) && To(i, r) && Se(i) !== "body") : [];
}
function Lo(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = t;
  const o = [...n === "clippingAncestors" ? jo(e) : [].concat(n), r], l = o[0], a = o.reduce((c, f) => {
    const b = On(e, f, i);
    return c.top = Xe(b.top, c.top), c.right = Sn(b.right, c.right), c.bottom = Sn(b.bottom, c.bottom), c.left = Xe(b.left, c.left), c;
  }, On(e, l, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
const Vo = {
  getClippingRect: Lo,
  convertOffsetParentRelativeRectToViewportRelativeRect: Oo,
  isElement: Ie,
  getDimensions: An,
  getOffsetParent: _t,
  getDocumentElement: Ae,
  getElementRects: (t) => {
    let {
      reference: e,
      floating: n,
      strategy: r
    } = t;
    return {
      reference: So(e, _t(n), r),
      floating: {
        ...An(n),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => _e(t).direction === "rtl"
}, Io = (t, e, n) => ao(t, e, {
  platform: Vo,
  ...n
});
function No(t) {
  let e, n, r, i, s, o, l, a, c;
  return {
    c() {
      e = C("div"), n = C("slot"), r = Y(), i = C("div"), s = C("div"), o = Y(), l = Z(t[0]), this.c = P, h(s, "class", "absolute triangle w-0 h-0"), h(i, "role", "tooltip"), h(i, "class", `
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
    `), be(i, "transform", "translate(" + t[5] + "px, " + t[6] + "px)"), ee(i, "invisible", t[4]), h(e, "class", "relative"), h(e, "aria-describedby", "tooltip");
    },
    m(f, b) {
      T(f, e, b), _(e, n), _(e, r), _(e, i), _(i, s), t[10](s), _(i, o), _(i, l), t[11](i), t[12](e), a || (c = [
        B(e, "mouseenter", t[7]),
        B(e, "mouseleave", t[8])
      ], a = !0);
    },
    p(f, [b]) {
      b & 1 && G(l, f[0]), b & 96 && be(i, "transform", "translate(" + f[5] + "px, " + f[6] + "px)"), b & 16 && ee(i, "invisible", f[4]);
    },
    i: P,
    o: P,
    d(f) {
      f && I(e), t[10](null), t[11](null), t[12](null), a = !1, me(c);
    }
  };
}
function Fo(t, e, n) {
  let { text: r = "" } = e, { location: i = "top" } = e, s, o, l, a = !0, c = 0, f = 0;
  const b = async () => {
    const y = await Io(s, o, {
      placement: i,
      middleware: [vo(7), wo(), ko({ padding: 5 }), ho({ element: l })]
    }), k = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right"
    }[y.placement.split("-")[0]], M = y.middlewareData.arrow?.x ?? 0, x = y.middlewareData.arrow?.y ?? 0;
    n(3, l.style.cssText = k === "right" || k === "left" ? `
      top: ${x}px;
      ${k}: ${M}px;
      margin-${k}: -10px;
      transform: ${k === "right" ? "rotate(90deg)" : "rotate(270deg)"};
    ` : `
      left: ${M}px;
      ${k}: ${x}px;
      margin-${k}: -6px;
      transform: ${k === "bottom" ? "rotate(180deg)" : ""};
    `, l), n(5, c = y.x), n(6, f = y.y);
  }, d = async () => {
    await b(), n(4, a = !1);
  }, g = () => {
    n(4, a = !0);
  };
  oe(), jn(b);
  function p(y) {
    ce[y ? "unshift" : "push"](() => {
      l = y, n(3, l);
    });
  }
  function w(y) {
    ce[y ? "unshift" : "push"](() => {
      o = y, n(2, o);
    });
  }
  function m(y) {
    ce[y ? "unshift" : "push"](() => {
      s = y, n(1, s);
    });
  }
  return t.$$set = (y) => {
    "text" in y && n(0, r = y.text), "location" in y && n(9, i = y.location);
  }, [
    r,
    s,
    o,
    l,
    a,
    c,
    f,
    d,
    g,
    i,
    p,
    w,
    m
  ];
}
class br extends $ {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>.triangle{border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid black}</style>", ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, Fo, No, ie, { text: 0, location: 9 }, null), e && (e.target && T(e.target, this, e.anchor), e.props && (this.$set(e.props), A()));
  }
  static get observedAttributes() {
    return ["text", "location"];
  }
  get text() {
    return this.$$.ctx[0];
  }
  set text(e) {
    this.$$set({ text: e }), A();
  }
  get location() {
    return this.$$.ctx[9];
  }
  set location(e) {
    this.$$set({ location: e }), A();
  }
}
customElements.define("v-tooltip", br);
const Do = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: br
}, Symbol.toStringTag, { value: "Module" }));
function Ho(t) {
  let e;
  return {
    c() {
      e = C("tr"), e.innerHTML = "<slot></slot>", this.c = P, h(e, "class", "border-b");
    },
    m(n, r) {
      T(n, e, r);
    },
    p: P,
    i: P,
    o: P,
    d(n) {
      n && I(e);
    }
  };
}
function Wo(t) {
  return oe(), [];
}
class mr extends $ {
  constructor(e) {
    super(), ne(this, {
      target: this.shadowRoot,
      props: te(this.attributes),
      customElement: !0
    }, Wo, Ho, ie, {}, null), e && e.target && T(e.target, this, e.anchor);
  }
}
customElements.define("v-tr", mr);
const Bo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mr
}, Symbol.toStringTag, { value: "Module" }));
