(function() {
  const e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), b = /* @__PURE__ */ new WeakMap(), h = /* @__PURE__ */ new WeakMap(), p = /* @__PURE__ */ new WeakMap(), g = { attributes: !0, attributeFilter: ["disabled"] }, m = new MutationObserver((w) => {
    for (const f of w) {
      const y = f.target;
      if (y.constructor.formAssociated) {
        const O = y.hasAttribute("disabled");
        y.toggleAttribute("internals-disabled", O), O ? y.setAttribute("aria-disabled", "true") : y.removeAttribute("aria-disabled"), y.formDisabledCallback && y.formDisabledCallback.apply(y, [O]);
      }
    }
  }), R = (w) => {
    n.get(w).forEach((y) => {
      y.remove();
    }), n.set(w, []);
  }, V = (w, f) => {
    const y = document.createElement("input");
    return y.type = "hidden", y.name = w.getAttribute("name"), w.after(y), n.get(f).push(y), y;
  }, I = (w, f) => {
    n.set(f, []);
    const y = w.hasAttribute("disabled");
    w.toggleAttribute("internals-disabled", y), m.observe(w, g);
  }, T = (w, f) => {
    if (f.length) {
      Array.from(f).forEach((O) => O.addEventListener("click", w.focus.bind(w)));
      let y = f[0].id;
      f[0].id || (y = `${f[0].htmlFor}_Label`, f[0].id = y), w.setAttribute("aria-labelledby", y);
    }
  }, M = (w) => {
    const f = Array.from(w.elements).filter((W) => W.validity).map((W) => W.validity.valid), y = Array.from(l.get(w)).filter((W) => W.isConnected).map((W) => r.get(W).validity.valid), O = [...f, ...y].includes(!1);
    w.toggleAttribute("internals-invalid", O), w.toggleAttribute("internals-valid", !O);
  }, z = (w) => {
    M(D(w.target));
  }, C = (w) => {
    M(D(w.target));
  }, k = (w) => {
    const f = w.target, y = l.get(f);
    f.noValidate || y.size && (Array.from(y).reverse().map((nt) => r.get(nt).reportValidity()).includes(!1) ? (w.stopImmediatePropagation(), w.stopPropagation(), w.preventDefault()) : p.get(f) && p.get(f).call(f, w) === !1 && w.preventDefault());
  }, L = (w) => {
    const f = l.get(w.target);
    f && f.size && f.forEach((y) => {
      y.constructor.formAssociated && y.formResetCallback && y.formResetCallback.apply(y);
    });
  }, P = (w, f, y) => {
    if (f) {
      f.onsubmit && (p.set(f, f.onsubmit.bind(f)), f.onsubmit = null);
      const O = l.get(f);
      if (O)
        O.add(w);
      else {
        const W = /* @__PURE__ */ new Set();
        W.add(w), l.set(f, W), f.addEventListener("submit", k), f.addEventListener("reset", L), f.addEventListener("input", z), f.addEventListener("change", C);
      }
      s.set(f, { ref: w, internals: y }), w.constructor.formAssociated && w.formAssociatedCallback && setTimeout(() => {
        w.formAssociatedCallback.apply(w, [f]);
      }, 0), M(f);
    }
  }, D = (w) => {
    let f = w.parentNode;
    return f && f.tagName !== "FORM" && (f = D(f)), f;
  }, j = (w, f, y = DOMException) => {
    if (!w.constructor.formAssociated)
      throw new y(f);
  }, ot = (w, f, y) => {
    const O = l.get(w);
    return O && O.size && O.forEach((W) => {
      r.get(W)[y]() || (f = !1);
    }), f;
  }, at = (w) => {
    if (w.constructor.formAssociated) {
      const f = r.get(w), { labels: y, form: O } = f;
      T(w, y), P(w, O, f);
    }
  }, st = {
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
  }, vt = (w, f) => {
    for (let y in st) {
      f[y] = null;
      let O = null;
      const W = st[y];
      Object.defineProperty(f, y, {
        get() {
          return O;
        },
        set(nt) {
          O = nt, w.isConnected ? w.setAttribute(W, nt) : c.set(w, f);
        }
      });
    }
  };
  class ft {
    constructor() {
      this.badInput = !1, this.customError = !1, this.patternMismatch = !1, this.rangeOverflow = !1, this.rangeUnderflow = !1, this.stepMismatch = !1, this.tooLong = !1, this.tooShort = !1, this.typeMismatch = !1, this.valid = !0, this.valueMissing = !1, Object.seal(this);
    }
  }
  const Mt = (w) => (w.badInput = !1, w.customError = !1, w.patternMismatch = !1, w.rangeOverflow = !1, w.rangeUnderflow = !1, w.stepMismatch = !1, w.tooLong = !1, w.tooShort = !1, w.typeMismatch = !1, w.valid = !0, w.valueMissing = !1, w), _t = (w, f, y) => (w.valid = kt(f), Object.keys(f).forEach((O) => w[O] = f[O]), y && M(y), w), kt = (w) => {
    let f = !0;
    for (let y in w)
      y !== "valid" && w[y] !== !1 && (f = !1);
    return f;
  };
  function ht(w) {
    w.forEach((f) => {
      const { addedNodes: y, removedNodes: O } = f, W = Array.from(y), nt = Array.from(O);
      W.forEach((X) => {
        if (r.has(X) && X.constructor.formAssociated) {
          const G = r.get(X), { form: rt } = G;
          P(X, rt, G), T(X, G.labels);
        }
        if (c.has(X)) {
          const G = c.get(X);
          Object.keys(st).filter((ct) => G[ct] !== null).forEach((ct) => {
            X.setAttribute(st[ct], G[ct]);
          }), c.delete(X);
        }
      }), nt.forEach((X) => {
        const G = r.get(X);
        G && n.get(G) && R(G), o.has(X) && o.get(X).disconnect();
      });
    });
  }
  function Ot(w) {
    w.forEach((f) => {
      const { removedNodes: y } = f;
      y.forEach((O) => {
        const W = h.get(f.target);
        r.has(O) && at(O), W.disconnect();
      });
    });
  }
  const Gt = (w) => {
    const f = new MutationObserver(Ot);
    f.observe(w, { childList: !0 }), h.set(w, f);
  };
  new MutationObserver(ht);
  const Rt = {
    childList: !0,
    subtree: !0
  }, zt = /* @__PURE__ */ new WeakMap();
  class St extends Set {
    static get isPolyfilled() {
      return !0;
    }
    constructor(f) {
      if (super(), !f || !f.tagName || f.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      zt.set(this, f);
    }
    add(f) {
      if (!/^--/.test(f) || typeof f != "string")
        throw new DOMException(`Failed to execute 'add' on 'CustomStateSet': The specified value ${f} must start with '--'.`);
      const y = super.add(f), O = zt.get(this);
      return O.toggleAttribute(`state${f}`, !0), O.part && O.part.add(`state${f}`), y;
    }
    clear() {
      for (let [f] of this.entries())
        this.delete(f);
      super.clear();
    }
    delete(f) {
      const y = super.delete(f), O = zt.get(this);
      return O.toggleAttribute(`state${f}`, !1), O.part && O.part.remove(`state${f}`), y;
    }
  }
  class At {
    constructor(f) {
      if (!f || !f.tagName || f.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      const y = f.getRootNode(), O = new ft();
      this.states = new St(f), e.set(this, f), t.set(this, O), r.set(f, this), vt(f, this), I(f, this), Object.seal(this), at(f), y instanceof DocumentFragment && Gt(y);
    }
    static get isPolyfilled() {
      return !0;
    }
    checkValidity() {
      const f = e.get(this);
      if (j(f, "Failed to execute 'checkValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const y = t.get(this);
      if (!y.valid) {
        const O = new Event("invalid", {
          bubbles: !1,
          cancelable: !0,
          composed: !1
        });
        f.dispatchEvent(O);
      }
      return y.valid;
    }
    get form() {
      const f = e.get(this);
      j(f, "Failed to read the 'form' property from 'ElementInternals': The target element is not a form-associated custom element.");
      let y;
      return f.constructor.formAssociated === !0 && (y = D(f)), y;
    }
    get labels() {
      const f = e.get(this);
      j(f, "Failed to read the 'labels' property from 'ElementInternals': The target element is not a form-associated custom element.");
      const y = f.getAttribute("id"), O = f.getRootNode();
      return O && y ? O.querySelectorAll(`[for=${y}]`) : [];
    }
    reportValidity() {
      const f = e.get(this);
      if (j(f, "Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const y = this.checkValidity(), O = b.get(this);
      if (O && !f.constructor.formAssociated)
        throw new DOMException("Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element.");
      return !y && O && (f.focus(), O.focus()), y;
    }
    setFormValue(f) {
      const y = e.get(this);
      if (j(y, "Failed to execute 'setFormValue' on 'ElementInternals': The target element is not a form-associated custom element."), R(this), f != null && !(f instanceof FormData)) {
        if (y.getAttribute("name")) {
          const O = V(y, this);
          O.value = f;
        }
      } else
        f != null && f instanceof FormData && f.forEach((O, W) => {
          if (typeof O == "string") {
            const nt = V(y, this);
            nt.name = W, nt.value = O;
          }
        });
      a.set(y, f);
    }
    setValidity(f, y, O) {
      const W = e.get(this);
      if (j(W, "Failed to execute 'setValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !f)
        throw new TypeError("Failed to execute 'setValidity' on 'ElementInternals': 1 argument required, but only 0 present.");
      b.set(this, O);
      const nt = t.get(this), X = {};
      for (const ct in f)
        X[ct] = f[ct];
      Object.keys(X).length === 0 && Mt(nt);
      const G = { ...nt, ...X };
      delete G.valid;
      const { valid: rt } = _t(nt, G, this.form);
      if (!rt && !y)
        throw new DOMException("Failed to execute 'setValidity' on 'ElementInternals': The second argument should not be empty if one or more flags in the first argument are true.");
      i.set(this, rt ? "" : y), W.toggleAttribute("internals-invalid", !rt), W.toggleAttribute("internals-valid", rt), W.setAttribute("aria-invalid", `${!rt}`);
    }
    get shadowRoot() {
      const f = e.get(this), y = u.get(f);
      return y || null;
    }
    get validationMessage() {
      const f = e.get(this);
      return j(f, "Failed to read the 'validationMessage' property from 'ElementInternals': The target element is not a form-associated custom element."), i.get(this);
    }
    get validity() {
      const f = e.get(this);
      return j(f, "Failed to read the 'validity' property from 'ElementInternals': The target element is not a form-associated custom element."), t.get(this);
    }
    get willValidate() {
      const f = e.get(this);
      return j(f, "Failed to read the 'willValidate' property from 'ElementInternals': The target element is not a form-associated custom element."), !(f.disabled || f.hasAttribute("disabled") || f.hasAttribute("readonly"));
    }
  }
  function Jt() {
    if (!window.ElementInternals)
      return !1;
    class w extends HTMLElement {
      constructor() {
        super(), this.internals = this.attachInternals();
      }
    }
    const f = `element-internals-feature-detection-${Math.random().toString(36).replace(/[^a-z]+/g, "")}`;
    customElements.define(f, w);
    const y = new w();
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
    ].every((O) => O in y.internals);
  }
  if (Jt()) {
    if (!window.CustomStateSet) {
      window.CustomStateSet = St;
      const w = HTMLElement.prototype.attachInternals;
      HTMLElement.prototype.attachInternals = function(...f) {
        const y = w.call(this, f);
        return y.states = new St(this), y;
      };
    }
  } else {
    let w = function(...G) {
      const rt = O.apply(this, G), ct = new MutationObserver(ht);
      return u.set(this, rt), window.ShadyDOM ? ct.observe(this, Rt) : ct.observe(rt, Rt), o.set(this, ct), rt;
    }, f = function(...G) {
      let rt = nt.apply(this, G);
      return ot(this, rt, "checkValidity");
    }, y = function(...G) {
      let rt = X.apply(this, G);
      return ot(this, rt, "reportValidity");
    };
    var Hn = w, Dn = f, Wn = y;
    window.ElementInternals = At, HTMLElement.prototype.attachInternals = function() {
      if (this.tagName.indexOf("-") === -1)
        throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': Unable to attach ElementInternals to non-custom elements.");
      if (r.has(this))
        throw new DOMException("DOMException: Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");
      return new At(this);
    };
    const O = Element.prototype.attachShadow;
    Element.prototype.attachShadow = w, new MutationObserver(ht).observe(document.documentElement, Rt);
    const nt = HTMLFormElement.prototype.checkValidity;
    HTMLFormElement.prototype.checkValidity = f;
    const X = HTMLFormElement.prototype.reportValidity;
    HTMLFormElement.prototype.reportValidity = y, window.CustomStateSet || (window.CustomStateSet = St);
  }
})();
function E() {
}
function ie(e) {
  return e();
}
function fe() {
  return /* @__PURE__ */ Object.create(null);
}
function pt(e) {
  e.forEach(ie);
}
function nn(e) {
  return typeof e == "function";
}
function rn(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
function it(e, t) {
  return e != e ? t == t : e !== t;
}
function qn(e) {
  return Object.keys(e).length === 0;
}
function Zn(e, ...t) {
  if (e == null)
    return E;
  const n = e.subscribe(...t);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const on = typeof window < "u";
let de = on ? () => window.performance.now() : () => Date.now(), sn = on ? (e) => requestAnimationFrame(e) : E;
const Tt = /* @__PURE__ */ new Set();
function ln(e) {
  Tt.forEach((t) => {
    t.c(e) || (Tt.delete(t), t.f());
  }), Tt.size !== 0 && sn(ln);
}
function Un(e) {
  let t;
  return Tt.size === 0 && sn(ln), {
    promise: new Promise((n) => {
      Tt.add(t = { c: e, f: n });
    }),
    abort() {
      Tt.delete(t);
    }
  };
}
function v(e, t) {
  e.appendChild(t);
}
function A(e, t, n) {
  e.insertBefore(t, n || null);
}
function F(e) {
  e.parentNode.removeChild(e);
}
function qt(e, t) {
  for (let n = 0; n < e.length; n += 1)
    e[n] && e[n].d(t);
}
function S(e) {
  return document.createElement(e);
}
function xt(e) {
  return document.createElementNS("http://www.w3.org/2000/svg", e);
}
function q(e) {
  return document.createTextNode(e);
}
function H() {
  return q(" ");
}
function oe() {
  return q("");
}
function B(e, t, n, r) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r);
}
function he(e) {
  return function(t) {
    return t.preventDefault(), e.call(this, t);
  };
}
function d(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function Kn(e) {
  return Array.from(e.childNodes);
}
function K(e, t) {
  t = "" + t, e.wholeText !== t && (e.data = t);
}
function ut(e, t, n, r) {
  n === null ? e.style.removeProperty(t) : e.style.setProperty(t, n, r ? "important" : "");
}
function U(e, t, n) {
  e.classList[n ? "add" : "remove"](t);
}
function $(e) {
  const t = {};
  for (const n of e)
    t[n.name] = n.value;
  return t;
}
let Ft;
function Lt(e) {
  Ft = e;
}
function se() {
  if (!Ft)
    throw new Error("Function called outside component initialization");
  return Ft;
}
const Vt = [], lt = [], Dt = [], be = [], Gn = Promise.resolve();
let $t = !1;
function Jn() {
  $t || ($t = !0, Gn.then(x));
}
function te(e) {
  Dt.push(e);
}
const Qt = /* @__PURE__ */ new Set();
let Ht = 0;
function x() {
  const e = Ft;
  do {
    for (; Ht < Vt.length; ) {
      const t = Vt[Ht];
      Ht++, Lt(t), Qn(t.$$);
    }
    for (Lt(null), Vt.length = 0, Ht = 0; lt.length; )
      lt.pop()();
    for (let t = 0; t < Dt.length; t += 1) {
      const n = Dt[t];
      Qt.has(n) || (Qt.add(n), n());
    }
    Dt.length = 0;
  } while (Vt.length);
  for (; be.length; )
    be.pop()();
  $t = !1, Qt.clear(), Lt(e);
}
function Qn(e) {
  if (e.fragment !== null) {
    e.update(), pt(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(te);
  }
}
const $n = /* @__PURE__ */ new Set();
function an(e, t) {
  e && e.i && ($n.delete(e), e.i(t));
}
function le(e, t) {
  e.d(1), t.delete(e.key);
}
function ae(e, t, n, r, i, s, o, l, a, c, u, b) {
  let h = e.length, p = s.length, g = h;
  const m = {};
  for (; g--; )
    m[e[g].key] = g;
  const R = [], V = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Map();
  for (g = p; g--; ) {
    const C = b(i, s, g), k = n(C);
    let L = o.get(k);
    L ? r && L.p(C, t) : (L = c(k, C), L.c()), V.set(k, R[g] = L), k in m && I.set(k, Math.abs(g - m[k]));
  }
  const T = /* @__PURE__ */ new Set(), M = /* @__PURE__ */ new Set();
  function z(C) {
    an(C, 1), C.m(l, u), o.set(C.key, C), u = C.first, p--;
  }
  for (; h && p; ) {
    const C = R[p - 1], k = e[h - 1], L = C.key, P = k.key;
    C === k ? (u = C.first, h--, p--) : V.has(P) ? !o.has(L) || T.has(L) ? z(C) : M.has(P) ? h-- : I.get(L) > I.get(P) ? (M.add(L), z(C)) : (T.add(P), h--) : (a(k, o), h--);
  }
  for (; h--; ) {
    const C = e[h];
    V.has(C.key) || a(C, o);
  }
  for (; p; )
    z(R[p - 1]);
  return R;
}
function tr(e, t, n, r) {
  const { fragment: i, on_mount: s, on_destroy: o, after_update: l } = e.$$;
  i && i.m(t, n), r || te(() => {
    const a = s.map(ie).filter(nn);
    o ? o.push(...a) : pt(a), e.$$.on_mount = [];
  }), l.forEach(te);
}
function er(e, t) {
  const n = e.$$;
  n.fragment !== null && (pt(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);
}
function nr(e, t) {
  e.$$.dirty[0] === -1 && (Vt.push(e), Jn(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function tt(e, t, n, r, i, s, o, l = [-1]) {
  const a = Ft;
  Lt(e);
  const c = e.$$ = {
    fragment: null,
    ctx: null,
    props: s,
    update: E,
    not_equal: i,
    bound: fe(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (a ? a.$$.context : [])),
    callbacks: fe(),
    dirty: l,
    skip_bound: !1,
    root: t.target || a.$$.root
  };
  o && o(c.root);
  let u = !1;
  if (c.ctx = n ? n(e, t.props || {}, (b, h, ...p) => {
    const g = p.length ? p[0] : h;
    return c.ctx && i(c.ctx[b], c.ctx[b] = g) && (!c.skip_bound && c.bound[b] && c.bound[b](g), u && nr(e, b)), h;
  }) : [], c.update(), u = !0, pt(c.before_update), c.fragment = r ? r(c.ctx) : !1, t.target) {
    if (t.hydrate) {
      const b = Kn(t.target);
      c.fragment && c.fragment.l(b), b.forEach(F);
    } else
      c.fragment && c.fragment.c();
    t.intro && an(e.$$.fragment), tr(e, t.target, t.anchor, t.customElement), x();
  }
  Lt(a);
}
let Q;
typeof HTMLElement == "function" && (Q = class extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const { on_mount: e } = this.$$;
    this.$$.on_disconnect = e.map(ie).filter(nn);
    for (const t in this.$$.slotted)
      this.appendChild(this.$$.slotted[t]);
  }
  attributeChangedCallback(e, t, n) {
    this[e] = n;
  }
  disconnectedCallback() {
    pt(this.$$.on_disconnect);
  }
  $destroy() {
    er(this, 1), this.$destroy = E;
  }
  $on(e, t) {
    const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return n.push(t), () => {
      const r = n.indexOf(t);
      r !== -1 && n.splice(r, 1);
    };
  }
  $set(e) {
    this.$$set && !qn(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
});
const cn = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.invisible{visibility:hidden}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.left-0{left:0}.right-0{right:0}.top-1{top:.25rem}.bottom-auto{bottom:auto}.bottom-1{bottom:.25rem}.left-1\\/2{left:50%}.bottom-full{bottom:100%}.-top-0\\.5{top:-.125rem}.-top-0{top:-0px}.top-\\[calc\\(50\\%-9px\\)\\]{top:calc(50% - 9px)}.top-0{top:0}.right-0\\.5{right:.125rem}.bottom-0{bottom:0}.z-10{z-index:10}.z-\\[2\\]{z-index:2}.z-\\[1\\]{z-index:1}.-mt-px{margin-top:-1px}.-mt-0\\.5{margin-top:-.125rem}.-mt-0{margin-top:-0px}.mt-1{margin-top:.25rem}.mt-7{margin-top:1.75rem}.mb-3{margin-bottom:.75rem}.mt-px{margin-top:1px}.ml-px{margin-left:1px}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.hidden{display:none}.h-\\[60\\%\\]{height:60%}.h-full{height:100%}.h-0\\.5{height:.125rem}.h-0{height:0px}.h-5{height:1.25rem}.h-1{height:.25rem}.h-2{height:.5rem}.h-\\[4px\\]{height:4px}.h-4{height:1rem}.max-h-0{max-height:0px}.max-h-fit{max-height:fit-content}.w-px{width:1px}.w-full{width:100%}.w-5{width:1.25rem}.w-\\[1px\\]{width:1px}.w-11{width:2.75rem}.w-4{width:1rem}.max-w-\\[14rem\\]{max-width:14rem}.flex-shrink-0{flex-shrink:0}.table-fixed{table-layout:fixed}.-translate-x-1\\/2{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\.5{--tw-translate-y: -.375rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1{--tw-translate-y: -.25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-1\\/2{--tw-translate-x: 50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-0{--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-6{--tw-translate-x: 1.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-rotate-\\[30deg\\]{--tw-rotate: -30deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-\\[30deg\\]{--tw-rotate: 30deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-180{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.cursor-not-allowed{cursor:not-allowed}.select-none{user-select:none}.appearance-none{appearance:none}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-between{justify-content:space-between}.gap-3{gap:.75rem}.gap-2{gap:.5rem}.gap-1\\.5{gap:.375rem}.gap-1{gap:.25rem}.overflow-hidden{overflow:hidden}.whitespace-nowrap{white-space:nowrap}.rounded-full{border-radius:9999px}.rounded-none{border-radius:0}.border{border-width:1px}.border-y{border-top-width:1px;border-bottom-width:1px}.border-l{border-left-width:1px}.border-l-4{border-left-width:4px}.border-r{border-right-width:1px}.border-b{border-bottom-width:1px}.border-black{--tw-border-opacity: 1;border-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-red\\/90{--tw-border-opacity: 1;border-color:rgb(190 48 38 / var(--tw-border-opacity))}.border-orange\\/90{--tw-border-opacity: 1;border-color:rgb(255 153 0 / var(--tw-border-opacity))}.border-green\\/90{--tw-border-opacity: 1;border-color:rgb(57 127 72 / var(--tw-border-opacity))}.border-blue\\/90{--tw-border-opacity: 1;border-color:rgb(4 86 129 / var(--tw-border-opacity))}.border-black\\/70{--tw-border-opacity: 1;border-color:rgb(85 85 85 / var(--tw-border-opacity))}.border-green\\/100{--tw-border-opacity: 1;border-color:rgb(41 91 51 / var(--tw-border-opacity))}.border-x-black{--tw-border-opacity: 1;border-left-color:rgb(0 0 0 / var(--tw-border-opacity));border-right-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-t-black{--tw-border-opacity: 1;border-top-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-b-white{--tw-border-opacity: 1;border-bottom-color:rgb(255 255 255 / var(--tw-border-opacity))}.border-l-gray-300{--tw-border-opacity: 1;border-left-color:rgb(209 213 219 / var(--tw-border-opacity))}.border-r-gray-300{--tw-border-opacity: 1;border-right-color:rgb(209 213 219 / var(--tw-border-opacity))}.bg-green-200{--tw-bg-opacity: 1;background-color:rgb(187 247 208 / var(--tw-bg-opacity))}.bg-orange-200{--tw-bg-opacity: 1;background-color:rgb(254 215 170 / var(--tw-bg-opacity))}.bg-red-200{--tw-bg-opacity: 1;background-color:rgb(254 202 202 / var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}.bg-black\\/50{--tw-bg-opacity: 1;background-color:rgb(157 157 157 / var(--tw-bg-opacity))}.bg-gray-400{--tw-bg-opacity: 1;background-color:rgb(156 163 175 / var(--tw-bg-opacity))}.bg-green\\/80{--tw-bg-opacity: 1;background-color:rgb(73 162 92 / var(--tw-bg-opacity))}.bg-black\\/20{--tw-bg-opacity: 1;background-color:rgb(233 233 233 / var(--tw-bg-opacity))}.bg-red\\/90{--tw-bg-opacity: 1;background-color:rgb(190 48 38 / var(--tw-bg-opacity))}.bg-green\\/90{--tw-bg-opacity: 1;background-color:rgb(57 127 72 / var(--tw-bg-opacity))}.p-3{padding:.75rem}.p-2{padding:.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-0{padding-top:0;padding-bottom:0}.px-4{padding-left:1rem;padding-right:1rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-1\\.5{padding-left:.375rem;padding-right:.375rem}.px-1{padding-left:.25rem;padding-right:.25rem}.pb-1{padding-bottom:.25rem}.text-left{text-align:left}.text-center{text-align:center}.text-xs{font-size:.75rem;line-height:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-base{font-size:1rem;line-height:1.5rem}.text-\\[15px\\]{font-size:15px}.font-bold{font-weight:700}.font-normal{font-weight:400}.uppercase{text-transform:uppercase}.capitalize{text-transform:capitalize}.text-green-900{--tw-text-opacity: 1;color:rgb(20 83 45 / var(--tw-text-opacity))}.text-orange-900{--tw-text-opacity: 1;color:rgb(124 45 18 / var(--tw-text-opacity))}.text-red-900{--tw-text-opacity: 1;color:rgb(127 29 29 / var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity))}.text-black{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-black\\/70{--tw-text-opacity: 1;color:rgb(85 85 85 / var(--tw-text-opacity))}.text-red\\/90{--tw-text-opacity: 1;color:rgb(190 48 38 / var(--tw-text-opacity))}.text-neutral-600{--tw-text-opacity: 1;color:rgb(82 82 82 / var(--tw-text-opacity))}.opacity-50{opacity:.5}.opacity-0{opacity:0}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.outline-none{outline:2px solid transparent;outline-offset:2px}.ring-0{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-200{transition-duration:.2s}.duration-500{transition-duration:.5s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}*,input,button{font-family:Space Mono,monospace}:host{display:contents}[class^=icon-],[class*=" icon-"]{font-family:icons!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-error-outline:before{content:"\\e912"}.icon-warning:before{content:"\\e916"}.icon-disconnected:before{content:"\\e919"}.icon-send:before{content:"\\e91b"}.icon-undo:before{content:"\\e91c"}.icon-connected:before{content:"\\e91a"}.icon-download:before{content:"\\e913"}.icon-camera:before{content:"\\e914"}.icon-center:before{content:"\\e915"}.icon-arrow-up:before{content:"\\e917"}.icon-settings:before{content:"\\e918"}.icon-refresh:before{content:"\\e911"}.icon-info-outline:before{content:"\\e910"}.icon-pause-circle-filled:before{content:"\\e90e"}.icon-play-circle-filled:before{content:"\\e90f"}.icon-logout:before{content:"\\e900"}.icon-instagram:before{content:"\\e901"}.icon-social-medium:before{content:"\\e906"}.icon-copy:before{content:"\\e907"}.icon-save:before{content:"\\e909"}.icon-edit:before{content:"\\e90a";color:#555}.icon-stop-circle:before{content:"\\e903"}.icon-twitter:before{content:"\\e902"}.icon-linkedin:before{content:"\\e90b"}.icon-trash:before{content:"\\e905"}.icon-alert:before{content:"\\e904"}.icon-ask:before{content:"\\e908"}.icon-x:before{content:"\\e942"}.icon-chevron-down:before{content:"\\e90c"}.icon-checkmark:before{content:"\\e90d"}.first\\:ml-4:first-child{margin-left:1rem}.last\\:border-r:last-child{border-right-width:1px}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}@media (prefers-reduced-motion: no-preference){.motion-safe\\:transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.motion-safe\\:transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}}
`;
let ee, un = !1;
try {
  ee = new CSSStyleSheet(), ee.replaceSync(cn);
} catch {
  un = !0;
}
const et = () => {
  const e = se();
  if (un) {
    const t = document.createElement("style");
    t.innerHTML = cn, e.shadowRoot.append(t);
  } else
    e.shadowRoot.adoptedStyleSheets = [ee];
}, { base: me = "", query: ge = "" } = window.PRIME_CONFIG ?? {}, rr = async () => {
  const e = new FontFace("icons", me ? `url(${me}/icons.woff2${ge})` : `url(icons.woff2${ge})`);
  await e.load(), document.fonts.add(e);
}, mt = (e, t, n) => e.dispatchEvent(new CustomEvent(t, {
  composed: !0,
  bubbles: !0,
  detail: n
}));
customElements.get("v-badge") ? console.warn("WARNING: Multiple instances of PRIME being imported.") : (rr().catch((e) => console.error(e)), Promise.resolve().then(() => sr), Promise.resolve().then(() => cr), Promise.resolve().then(() => br), Promise.resolve().then(() => pr), Promise.resolve().then(() => vr), Promise.resolve().then(() => xr), Promise.resolve().then(() => Cr), Promise.resolve().then(() => Lr), Promise.resolve().then(() => Nr), Promise.resolve().then(() => Dr), Promise.resolve().then(() => Zr), Promise.resolve().then(() => Gr), Promise.resolve().then(() => $r), Promise.resolve().then(() => ni), Promise.resolve().then(() => oi), Promise.resolve().then(() => ai), Promise.resolve().then(() => fi), Promise.resolve().then(() => bi), Promise.resolve().then(() => Xi), Promise.resolve().then(() => Ui));
var fn = { exports: {} };
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
(function(e) {
  (function() {
    var t = {}.hasOwnProperty;
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
                t.call(s, a) && s[a] && r.push(a);
            else
              r.push(s.toString());
        }
      }
      return r.join(" ");
    }
    e.exports ? (n.default = n, e.exports = n) : window.classNames = n;
  })();
})(fn);
const N = fn.exports;
function ir(e) {
  let t, n, r;
  return {
    c() {
      t = S("small"), n = q(e[0]), this.c = E, d(t, "class", r = N("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": e[1] === "green",
        "text-orange-900 bg-orange-200": e[1] === "orange",
        "text-red-900 bg-red-200": e[1] === "red",
        "text-gray-800 bg-gray-200": e[1] === "gray"
      }));
    },
    m(i, s) {
      A(i, t, s), v(t, n);
    },
    p(i, [s]) {
      s & 1 && K(n, i[0]), s & 2 && r !== (r = N("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": i[1] === "green",
        "text-orange-900 bg-orange-200": i[1] === "orange",
        "text-red-900 bg-red-200": i[1] === "red",
        "text-gray-800 bg-gray-200": i[1] === "gray"
      })) && d(t, "class", r);
    },
    i: E,
    o: E,
    d(i) {
      i && F(t);
    }
  };
}
function or(e, t, n) {
  let { label: r = "" } = t, { variant: i = "gray" } = t;
  return et(), e.$$set = (s) => {
    "label" in s && n(0, r = s.label), "variant" in s && n(1, i = s.variant);
  }, [r, i];
}
class dn extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, or, ir, it, { label: 0, variant: 1 }, null), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
  }
  static get observedAttributes() {
    return ["label", "variant"];
  }
  get label() {
    return this.$$.ctx[0];
  }
  set label(t) {
    this.$$set({ label: t }), x();
  }
  get variant() {
    return this.$$.ctx[1];
  }
  set variant(t) {
    this.$$set({ variant: t }), x();
  }
}
customElements.define("v-badge", dn);
const sr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dn
}, Symbol.toStringTag, { value: "Module" }));
function pe(e, t, n) {
  const r = e.slice();
  return r[2] = t[n], r[4] = n, r;
}
function we(e) {
  let t;
  return {
    c() {
      t = S("div"), t.innerHTML = `<div class="w-px h-[60%] border-l border-black -rotate-[30deg] -mt-px"></div> 
        <div class="w-px h-[60%] border-l border-black rotate-[30deg] -mt-0.5"></div> 
      `;
    },
    m(n, r) {
      A(n, t, r);
    },
    d(n) {
      n && F(t);
    }
  };
}
function ye(e, t) {
  let n, r = t[2] + "", i, s, o, l = t[4] !== t[0].length - 1 && we();
  return {
    key: e,
    first: null,
    c() {
      n = S("small"), i = q(r), s = H(), l && l.c(), o = oe(), d(n, "class", "py1"), this.first = n;
    },
    m(a, c) {
      A(a, n, c), v(n, i), A(a, s, c), l && l.m(a, c), A(a, o, c);
    },
    p(a, c) {
      t = a, c & 1 && r !== (r = t[2] + "") && K(i, r), t[4] !== t[0].length - 1 ? l || (l = we(), l.c(), l.m(o.parentNode, o)) : l && (l.d(1), l = null);
    },
    d(a) {
      a && F(n), a && F(s), l && l.d(a), a && F(o);
    }
  };
}
function lr(e) {
  let t, n = [], r = /* @__PURE__ */ new Map(), i = e[0];
  const s = (o) => o[2];
  for (let o = 0; o < i.length; o += 1) {
    let l = pe(e, i, o), a = s(l);
    r.set(a, n[o] = ye(a, l));
  }
  return {
    c() {
      t = S("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
      this.c = E, d(t, "class", "inline-flex gap-3 px-4 border border-black rounded-full");
    },
    m(o, l) {
      A(o, t, l);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(t, null);
    },
    p(o, [l]) {
      l & 1 && (i = o[0], n = ae(n, l, s, 1, o, i, r, t, le, ye, null, pe));
    },
    i: E,
    o: E,
    d(o) {
      o && F(t);
      for (let l = 0; l < n.length; l += 1)
        n[l].d();
    }
  };
}
function ar(e, t, n) {
  let { crumbs: r = "" } = t;
  et();
  let i;
  return e.$$set = (s) => {
    "crumbs" in s && n(1, r = s.crumbs);
  }, e.$$.update = () => {
    e.$$.dirty & 2 && n(0, i = r.split(",").map((s) => s.trim()));
  }, [i, r];
}
class hn extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ar, lr, it, { crumbs: 1 }, null), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
  }
  static get observedAttributes() {
    return ["crumbs"];
  }
  get crumbs() {
    return this.$$.ctx[1];
  }
  set crumbs(t) {
    this.$$set({ crumbs: t }), x();
  }
}
customElements.define("v-breadcrumbs", hn);
const cr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hn
}, Symbol.toStringTag, { value: "Module" }));
function ve(e) {
  let t, n;
  return {
    c() {
      t = S("i"), d(t, "aria-hidden", ""), d(t, "class", n = "icon-" + e[4] + " text-base");
    },
    m(r, i) {
      A(r, t, i);
    },
    p(r, i) {
      i & 16 && n !== (n = "icon-" + r[4] + " text-base") && d(t, "class", n);
    },
    d(r) {
      r && F(t);
    }
  };
}
function ur(e) {
  let t, n, r, i, s, o, l = e[4] && ve(e);
  return {
    c() {
      t = S("button"), l && l.c(), n = H(), r = q(e[3]), this.c = E, d(t, "type", e[1]), d(t, "class", i = N("flex items-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": e[0] === "true",
        "bg-white border-black": e[2] === "primary",
        "bg-red/90 text-white border-red/90": e[2] === "danger",
        "bg-green/90 border-green/90 text-white": e[2] === "success",
        "bg-white border-red/90 text-red/90": e[2] === "outline-danger"
      }));
    },
    m(a, c) {
      A(a, t, c), l && l.m(t, null), v(t, n), v(t, r), s || (o = B(t, "click", e[5]), s = !0);
    },
    p(a, [c]) {
      a[4] ? l ? l.p(a, c) : (l = ve(a), l.c(), l.m(t, n)) : l && (l.d(1), l = null), c & 8 && K(r, a[3]), c & 2 && d(t, "type", a[1]), c & 5 && i !== (i = N("flex items-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": a[0] === "true",
        "bg-white border-black": a[2] === "primary",
        "bg-red/90 text-white border-red/90": a[2] === "danger",
        "bg-green/90 border-green/90 text-white": a[2] === "success",
        "bg-white border-red/90 text-red/90": a[2] === "outline-danger"
      })) && d(t, "class", i);
    },
    i: E,
    o: E,
    d(a) {
      a && F(t), l && l.d(), s = !1, o();
    }
  };
}
function fr(e, t, n) {
  let { disabled: r = "false" } = t, { type: i = "button" } = t, { variant: s = "primary" } = t, { label: o = "" } = t, { icon: l = "" } = t;
  et();
  const c = se().attachInternals(), u = () => {
    const { form: b } = c;
    b?.requestSubmit ? b.requestSubmit() : b?.submit();
  };
  return e.$$set = (b) => {
    "disabled" in b && n(0, r = b.disabled), "type" in b && n(1, i = b.type), "variant" in b && n(2, s = b.variant), "label" in b && n(3, o = b.label), "icon" in b && n(4, l = b.icon);
  }, [r, i, s, o, l, u];
}
class dr extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, fr, ur, it, {
      disabled: 0,
      type: 1,
      variant: 2,
      label: 3,
      icon: 4
    }, null), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
  }
  static get observedAttributes() {
    return ["disabled", "type", "variant", "label", "icon"];
  }
  get disabled() {
    return this.$$.ctx[0];
  }
  set disabled(t) {
    this.$$set({ disabled: t }), x();
  }
  get type() {
    return this.$$.ctx[1];
  }
  set type(t) {
    this.$$set({ type: t }), x();
  }
  get variant() {
    return this.$$.ctx[2];
  }
  set variant(t) {
    this.$$set({ variant: t }), x();
  }
  get label() {
    return this.$$.ctx[3];
  }
  set label(t) {
    this.$$set({ label: t }), x();
  }
  get icon() {
    return this.$$.ctx[4];
  }
  set icon(t) {
    this.$$set({ icon: t }), x();
  }
}
customElements.define("v-button-internal", dr);
class hr extends customElements.get("v-button-internal") {
  static formAssociated = !0;
}
customElements.define("v-button", hr);
const br = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function _e(e) {
  let t, n;
  return {
    c() {
      t = S("h2"), n = q(e[1]), d(t, "class", "text-sm");
    },
    m(r, i) {
      A(r, t, i), v(t, n);
    },
    p(r, i) {
      i & 2 && K(n, r[1]);
    },
    d(r) {
      r && F(t);
    }
  };
}
function mr(e) {
  let t, n, r, i, s, o, l, a, c, u, b, h, p, g, m, R, V, I, T = e[1] && _e(e);
  return {
    c() {
      t = S("div"), n = S("div"), r = S("div"), T && T.c(), i = H(), s = S("slot"), o = H(), l = S("div"), a = S("slot"), c = H(), u = xt("svg"), b = xt("polyline"), p = H(), g = S("div"), m = S("slot"), this.c = E, d(s, "name", "title"), d(r, "class", "flex items-center gap-2"), d(a, "name", "header"), d(b, "points", "6 9 12 15 18 9"), d(u, "class", h = N("transition-transform duration-200", {
        "rotate-0": !e[0],
        "rotate-180": e[0]
      })), d(u, "width", "24"), d(u, "height", "24"), d(u, "viewBox", "0 0 24 24"), d(u, "stroke", "currentColor"), d(u, "stroke-linejoin", "round"), d(u, "stroke-linecap", "round"), d(u, "fill", "none"), d(l, "class", "h-full flex items-center gap-3"), d(n, "class", "w-full py-1.5 px-4 flex items-center justify-between border text-black border-black bg-white cursor-pointer"), d(g, "class", R = N("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !e[0],
        "max-h-fit": e[0]
      })), d(t, "class", "relative w-full overflow-hidden");
    },
    m(M, z) {
      A(M, t, z), v(t, n), v(n, r), T && T.m(r, null), v(r, i), v(r, s), v(n, o), v(n, l), v(l, a), v(l, c), v(l, u), v(u, b), v(t, p), v(t, g), v(g, m), e[4](t), V || (I = B(n, "click", e[3]), V = !0);
    },
    p(M, [z]) {
      M[1] ? T ? T.p(M, z) : (T = _e(M), T.c(), T.m(r, i)) : T && (T.d(1), T = null), z & 1 && h !== (h = N("transition-transform duration-200", {
        "rotate-0": !M[0],
        "rotate-180": M[0]
      })) && d(u, "class", h), z & 1 && R !== (R = N("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !M[0],
        "max-h-fit": M[0]
      })) && d(g, "class", R);
    },
    i: E,
    o: E,
    d(M) {
      M && F(t), T && T.d(), e[4](null), V = !1, I();
    }
  };
}
function gr(e, t, n) {
  let { title: r = "" } = t, { open: i = !1 } = t, s;
  et();
  const o = (a) => {
    a.target.getAttribute("slot") !== "header" && (n(0, i = !i), mt(s, "toggle", { open: i }));
  };
  function l(a) {
    lt[a ? "unshift" : "push"](() => {
      s = a, n(2, s);
    });
  }
  return e.$$set = (a) => {
    "title" in a && n(1, r = a.title), "open" in a && n(0, i = a.open);
  }, [i, r, s, o, l];
}
class bn extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, gr, mr, it, { title: 1, open: 0 }, null), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
  }
  static get observedAttributes() {
    return ["title", "open"];
  }
  get title() {
    return this.$$.ctx[1];
  }
  set title(t) {
    this.$$set({ title: t }), x();
  }
  get open() {
    return this.$$.ctx[0];
  }
  set open(t) {
    this.$$set({ open: t }), x();
  }
}
customElements.define("v-collapse", bn);
const pr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bn
}, Symbol.toStringTag, { value: "Module" }));
function wr(e) {
  let t, n, r, i, s, o, l, a;
  return {
    c() {
      t = S("div"), n = S("div"), n.innerHTML = '<slot name="target"></slot>', r = H(), i = S("div"), s = S("slot"), this.c = E, d(n, "class", "inline-block"), d(s, "name", "content"), d(i, "class", o = N("absolute z-10", {
        "left-0": e[1],
        "right-0": e[1],
        "overflow-hidden": e[1],
        invisible: !e[0]
      })), d(t, "class", "relative inline-block");
    },
    m(c, u) {
      A(c, t, u), v(t, n), v(t, r), v(t, i), v(i, s), e[4](t), l || (a = B(n, "click", e[3]), l = !0);
    },
    p(c, [u]) {
      u & 3 && o !== (o = N("absolute z-10", {
        "left-0": c[1],
        "right-0": c[1],
        "overflow-hidden": c[1],
        invisible: !c[0]
      })) && d(i, "class", o);
    },
    i: E,
    o: E,
    d(c) {
      c && F(t), e[4](null), l = !1, a();
    }
  };
}
function yr(e, t, n) {
  let { open: r = null } = t, { match: i = null } = t, s;
  et();
  const o = () => {
    n(0, r = !r), mt(s, "toggle", { open: r });
  };
  function l(a) {
    lt[a ? "unshift" : "push"](() => {
      s = a, n(2, s);
    });
  }
  return e.$$set = (a) => {
    "open" in a && n(0, r = a.open), "match" in a && n(1, i = a.match);
  }, e.$$.update = () => {
    e.$$.dirty & 2 && n(1, i = i === ""), e.$$.dirty & 1 && n(0, r = r === "" || r);
  }, [r, i, s, o, l];
}
class mn extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, yr, wr, it, { open: 0, match: 1 }, null), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
  }
  static get observedAttributes() {
    return ["open", "match"];
  }
  get open() {
    return this.$$.ctx[0];
  }
  set open(t) {
    this.$$set({ open: t }), x();
  }
  get match() {
    return this.$$.ctx[1];
  }
  set match(t) {
    this.$$set({ match: t }), x();
  }
}
customElements.define("v-dropdown", mn);
const vr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mn
}, Symbol.toStringTag, { value: "Module" }));
function _r(e) {
  let t, n;
  return {
    c() {
      t = S("i"), this.c = E, d(t, "aria-hidden", ""), d(t, "class", n = "icon-" + e[0] + " text-" + e[1]);
    },
    m(r, i) {
      A(r, t, i);
    },
    p(r, [i]) {
      i & 3 && n !== (n = "icon-" + r[0] + " text-" + r[1]) && d(t, "class", n);
    },
    i: E,
    o: E,
    d(r) {
      r && F(t);
    }
  };
}
function kr(e, t, n) {
  let { name: r = "" } = t, { size: i = "base" } = t;
  return et(), e.$$set = (s) => {
    "name" in s && n(0, r = s.name), "size" in s && n(1, i = s.size);
  }, [r, i];
}
class gn extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, kr, _r, it, { name: 0, size: 1 }, null), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
  }
  static get observedAttributes() {
    return ["name", "size"];
  }
  get name() {
    return this.$$.ctx[0];
  }
  set name(t) {
    this.$$set({ name: t }), x();
  }
  get size() {
    return this.$$.ctx[1];
  }
  set size(t) {
    this.$$set({ size: t }), x();
  }
}
customElements.define("v-icon", gn);
const xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gn
}, Symbol.toStringTag, { value: "Module" }));
function ke(e) {
  let t, n, r;
  return {
    c() {
      t = S("p"), n = q(e[3]), d(t, "class", r = N("text-xs", {
        "inline whitespace-nowrap": e[5] === "left"
      }));
    },
    m(i, s) {
      A(i, t, s), v(t, n);
    },
    p(i, s) {
      s & 8 && K(n, i[3]), s & 32 && r !== (r = N("text-xs", {
        "inline whitespace-nowrap": i[5] === "left"
      })) && d(t, "class", r);
    },
    d(i) {
      i && F(t);
    }
  };
}
function xe(e) {
  let t, n, r, i, s, o, l, a;
  return {
    c() {
      t = S("div"), n = S("button"), i = H(), s = S("button"), d(n, "aria-label", r = "Increment up by " + e[9]), d(n, "class", "icon-chevron-down rotate-180 text-[15px]"), d(s, "aria-label", o = "Increment down by " + e[9]), d(s, "class", "icon-chevron-down text-[15px]"), d(t, "class", "absolute right-0.5 bottom-0 cursor-pointer select-none flex flex-col");
    },
    m(c, u) {
      A(c, t, u), v(t, n), v(t, i), v(t, s), l || (a = [
        B(n, "click", e[15]),
        B(s, "click", e[16])
      ], l = !0);
    },
    p(c, u) {
      u & 512 && r !== (r = "Increment up by " + c[9]) && d(n, "aria-label", r), u & 512 && o !== (o = "Increment down by " + c[9]) && d(s, "aria-label", o);
    },
    d(c) {
      c && F(t), l = !1, pt(a);
    }
  };
}
function Er(e) {
  let t, n, r, i, s, o, l, a = e[3] && ke(e), c = e[1] === "number" && xe(e);
  return {
    c() {
      t = S("label"), a && a.c(), n = H(), r = S("input"), i = H(), c && c.c(), this.c = E, d(r, "type", e[1]), d(r, "placeholder", e[2]), d(r, "name", e[4]), r.value = e[0], r.readOnly = e[8], d(r, "class", "w-full py-1.5 px-2.5 border text-xs border-black bg-white outline-none appearance-none"), d(t, "class", s = N("relative flex gap-1 max-w-[14rem]", {
        "flex-col": e[5] === "top",
        "items-center": e[5] === "left"
      }));
    },
    m(u, b) {
      A(u, t, b), a && a.m(t, null), v(t, n), v(t, r), e[14](r), v(t, i), c && c.m(t, null), e[17](t), o || (l = B(r, "input", e[10]), o = !0);
    },
    p(u, [b]) {
      u[3] ? a ? a.p(u, b) : (a = ke(u), a.c(), a.m(t, n)) : a && (a.d(1), a = null), b & 2 && d(r, "type", u[1]), b & 4 && d(r, "placeholder", u[2]), b & 16 && d(r, "name", u[4]), b & 1 && r.value !== u[0] && (r.value = u[0]), b & 256 && (r.readOnly = u[8]), u[1] === "number" ? c ? c.p(u, b) : (c = xe(u), c.c(), c.m(t, null)) : c && (c.d(1), c = null), b & 32 && s !== (s = N("relative flex gap-1 max-w-[14rem]", {
        "flex-col": u[5] === "top",
        "items-center": u[5] === "left"
      })) && d(t, "class", s);
    },
    i: E,
    o: E,
    d(u) {
      u && F(t), a && a.d(), e[14](null), c && c.d(), e[17](null), o = !1, l();
    }
  };
}
function Mr(e, t, n) {
  const i = se().attachInternals();
  let { type: s = "text" } = t, { placeholder: o = "" } = t, { readonly: l = "false" } = t, { label: a = "" } = t, { value: c = "" } = t, { step: u = "1" } = t, { name: b = "" } = t, { labelposition: h = "top" } = t, p, g, m, R;
  et();
  const V = (k) => {
    k.preventDefault(), k.stopImmediatePropagation(), n(0, c = g.value), i.setFormValue(c), mt(p, "input", { value: c });
  }, I = (k) => {
    const L = Number.parseFloat(c || "0");
    n(0, c = n(7, g.value = String(L + R * k), g)), i.setFormValue(c), mt(p, "input", { value: c });
  };
  function T(k) {
    lt[k ? "unshift" : "push"](() => {
      g = k, n(7, g);
    });
  }
  const M = () => I(1), z = () => I(-1);
  function C(k) {
    lt[k ? "unshift" : "push"](() => {
      p = k, n(6, p);
    });
  }
  return e.$$set = (k) => {
    "type" in k && n(1, s = k.type), "placeholder" in k && n(2, o = k.placeholder), "readonly" in k && n(12, l = k.readonly), "label" in k && n(3, a = k.label), "value" in k && n(0, c = k.value), "step" in k && n(13, u = k.step), "name" in k && n(4, b = k.name), "labelposition" in k && n(5, h = k.labelposition);
  }, e.$$.update = () => {
    e.$$.dirty & 4096 && n(8, m = l === "readonly" || l === ""), e.$$.dirty & 8192 && n(9, R = Number.parseFloat(u));
  }, [
    c,
    s,
    o,
    a,
    b,
    h,
    p,
    g,
    m,
    R,
    V,
    I,
    l,
    u,
    T,
    M,
    z,
    C
  ];
}
class Sr extends Q {
  constructor(t) {
    super(), this.shadowRoot.innerHTML = "<style>input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}</style>", tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Mr, Er, it, {
      type: 1,
      placeholder: 2,
      readonly: 12,
      label: 3,
      value: 0,
      step: 13,
      name: 4,
      labelposition: 5
    }, null), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
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
  set type(t) {
    this.$$set({ type: t }), x();
  }
  get placeholder() {
    return this.$$.ctx[2];
  }
  set placeholder(t) {
    this.$$set({ placeholder: t }), x();
  }
  get readonly() {
    return this.$$.ctx[12];
  }
  set readonly(t) {
    this.$$set({ readonly: t }), x();
  }
  get label() {
    return this.$$.ctx[3];
  }
  set label(t) {
    this.$$set({ label: t }), x();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(t) {
    this.$$set({ value: t }), x();
  }
  get step() {
    return this.$$.ctx[13];
  }
  set step(t) {
    this.$$set({ step: t }), x();
  }
  get name() {
    return this.$$.ctx[4];
  }
  set name(t) {
    this.$$set({ name: t }), x();
  }
  get labelposition() {
    return this.$$.ctx[5];
  }
  set labelposition(t) {
    this.$$set({ labelposition: t }), x();
  }
}
customElements.define("v-input-internal", Sr);
class Ar extends customElements.get("v-input-internal") {
  static formAssociated = !0;
}
customElements.define("v-input", Ar);
const Cr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function Tr(e) {
  let t;
  return {
    c() {
      t = xt("path"), d(t, "d", "M6.33 3.66667H7.66666V5H6.33333V3.66667ZM6.33 6.33333H7.66666V10.3333H6.33333V6.33333ZM7 0.333334C3.31999 0.333334 0.333328 3.32 0.333328 7C0.333328 10.68 3.31999 13.6667 7 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.32 10.68 0.333334 7 0.333334ZM7 12.3333C4.06 12.3333 1.66666 9.94 1.66666 7C1.66666 4.06 4.06 1.66667 7 1.66667C9.93999 1.66667 12.3333 4.06 12.3333 7C12.3333 9.94 9.93999 12.3333 7 12.3333Z"), d(t, "fill", "#045681");
    },
    m(n, r) {
      A(n, t, r);
    },
    d(n) {
      n && F(t);
    }
  };
}
function Pr(e) {
  let t;
  return {
    c() {
      t = xt("path"), d(t, "d", "M4 7.78L1.22 5L0.273331 5.94L4 9.66667L12 1.66667L11.06 0.726665L4 7.78Z"), d(t, "fill", "#397F48");
    },
    m(n, r) {
      A(n, t, r);
    },
    d(n) {
      n && F(t);
    }
  };
}
function Or(e) {
  let t;
  return {
    c() {
      t = xt("path"), d(t, "d", "M8 2.99333L13.02 11.6667H2.98L8 2.99333ZM8 0.333328L0.666672 13H15.3333L8 0.333328ZM8.66667 9.66666H7.33334V11H8.66667V9.66666ZM8.66667 5.66666H7.33334V8.33333H8.66667V5.66666Z"), d(t, "fill", "#FF9900");
    },
    m(n, r) {
      A(n, t, r);
    },
    d(n) {
      n && F(t);
    }
  };
}
function Rr(e) {
  let t;
  return {
    c() {
      t = xt("path"), d(t, "d", "M6.33 9H7.66666V10.3333H6.33333V9ZM6.33 3.66666H7.66666V7.66666H6.33333V3.66666ZM6.99333 0.333328C3.31333 0.333328 0.333328 3.31999 0.333328 7C0.333328 10.68 3.31333 13.6667 6.99333 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.31999 10.68 0.333328 6.99333 0.333328ZM7 12.3333C4.05333 12.3333 1.66666 9.94666 1.66666 7C1.66666 4.05333 4.05333 1.66666 7 1.66666C9.94666 1.66666 12.3333 4.05333 12.3333 7C12.3333 9.94666 9.94666 12.3333 7 12.3333Z"), d(t, "fill", "#BE3026");
    },
    m(n, r) {
      A(n, t, r);
    },
    d(n) {
      n && F(t);
    }
  };
}
function Ee(e) {
  let t, n;
  return {
    c() {
      t = S("p"), n = q(e[1]), d(t, "class", "text-xs");
    },
    m(r, i) {
      A(r, t, i), v(t, n);
    },
    p(r, i) {
      i & 2 && K(n, r[1]);
    },
    d(r) {
      r && F(t);
    }
  };
}
function zr(e) {
  let t, n, r, i, s, o, l, a, c;
  function u(g, m) {
    if (g[2] === "error")
      return Rr;
    if (g[2] === "warning")
      return Or;
    if (g[2] === "success")
      return Pr;
    if (g[2] === "info")
      return Tr;
  }
  let b = u(e), h = b && b(e), p = e[1] && Ee(e);
  return {
    c() {
      t = S("div"), n = S("div"), r = xt("svg"), h && h.c(), i = H(), s = S("figure"), o = S("figcaption"), l = q(e[0]), a = H(), p && p.c(), this.c = E, d(r, "width", "14"), d(r, "height", "14"), d(r, "viewBox", "0 0 15 15"), d(r, "fill", "none"), d(r, "xmlns", "http://www.w3.org/2000/svg"), d(n, "class", "mt-1"), d(o, "class", "text-sm"), d(t, "class", c = N("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": e[3] === "gray",
        "bg-white": e[3] === "white",
        "border-red/90": e[2] === "error",
        "border-orange/90": e[2] === "warning",
        "border-green/90": e[2] === "success",
        "border-blue/90": e[2] === "info"
      }));
    },
    m(g, m) {
      A(g, t, m), v(t, n), v(n, r), h && h.m(r, null), v(t, i), v(t, s), v(s, o), v(o, l), v(s, a), p && p.m(s, null);
    },
    p(g, [m]) {
      b !== (b = u(g)) && (h && h.d(1), h = b && b(g), h && (h.c(), h.m(r, null))), m & 1 && K(l, g[0]), g[1] ? p ? p.p(g, m) : (p = Ee(g), p.c(), p.m(s, null)) : p && (p.d(1), p = null), m & 12 && c !== (c = N("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": g[3] === "gray",
        "bg-white": g[3] === "white",
        "border-red/90": g[2] === "error",
        "border-orange/90": g[2] === "warning",
        "border-green/90": g[2] === "success",
        "border-blue/90": g[2] === "info"
      })) && d(t, "class", c);
    },
    i: E,
    o: E,
    d(g) {
      g && F(t), h && h.d(), p && p.d();
    }
  };
}
function Vr(e, t, n) {
  let { title: r = "" } = t, { message: i = "" } = t, { variant: s = "info" } = t, { background: o = "gray" } = t;
  return et(), e.$$set = (l) => {
    "title" in l && n(0, r = l.title), "message" in l && n(1, i = l.message), "variant" in l && n(2, s = l.variant), "background" in l && n(3, o = l.background);
  }, [r, i, s, o];
}
class pn extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Vr, zr, it, {
      title: 0,
      message: 1,
      variant: 2,
      background: 3
    }, null), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
  }
  static get observedAttributes() {
    return ["title", "message", "variant", "background"];
  }
  get title() {
    return this.$$.ctx[0];
  }
  set title(t) {
    this.$$set({ title: t }), x();
  }
  get message() {
    return this.$$.ctx[1];
  }
  set message(t) {
    this.$$set({ message: t }), x();
  }
  get variant() {
    return this.$$.ctx[2];
  }
  set variant(t) {
    this.$$set({ variant: t }), x();
  }
  get background() {
    return this.$$.ctx[3];
  }
  set background(t) {
    this.$$set({ background: t }), x();
  }
}
customElements.define("v-notify", pn);
const Lr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pn
}, Symbol.toStringTag, { value: "Module" }));
function Me(e, t, n) {
  const r = e.slice();
  return r[9] = t[n], r;
}
function Se(e) {
  let t, n, r;
  return {
    c() {
      t = S("p"), n = q(e[1]), d(t, "class", r = N("text-xs", {
        "pb-1": e[2] === "top",
        inline: e[2] === "left"
      }));
    },
    m(i, s) {
      A(i, t, s), v(t, n);
    },
    p(i, s) {
      s & 2 && K(n, i[1]), s & 4 && r !== (r = N("text-xs", {
        "pb-1": i[2] === "top",
        inline: i[2] === "left"
      })) && d(t, "class", r);
    },
    d(i) {
      i && F(t);
    }
  };
}
function Ae(e) {
  let t, n = e[9] + "", r, i, s, o, l;
  function a() {
    return e[8](e[9]);
  }
  return {
    c() {
      t = S("button"), r = q(n), i = H(), d(t, "class", s = N("border-y border-l last:border-r border-black px-2 py-1 text-sm", {
        "bg-white": e[9] !== e[0],
        "bg-black text-white": e[9] === e[0]
      }));
    },
    m(c, u) {
      A(c, t, u), v(t, r), v(t, i), e[7](t), o || (l = B(t, "click", a), o = !0);
    },
    p(c, u) {
      e = c, u & 16 && n !== (n = e[9] + "") && K(r, n), u & 17 && s !== (s = N("border-y border-l last:border-r border-black px-2 py-1 text-sm", {
        "bg-white": e[9] !== e[0],
        "bg-black text-white": e[9] === e[0]
      })) && d(t, "class", s);
    },
    d(c) {
      c && F(t), e[7](null), o = !1, l();
    }
  };
}
function Ir(e) {
  let t, n, r = e[1] && Se(e), i = e[4], s = [];
  for (let o = 0; o < i.length; o += 1)
    s[o] = Ae(Me(e, i, o));
  return {
    c() {
      t = S("label"), r && r.c(), n = H();
      for (let o = 0; o < s.length; o += 1)
        s[o].c();
      this.c = E;
    },
    m(o, l) {
      A(o, t, l), r && r.m(t, null), v(t, n);
      for (let a = 0; a < s.length; a += 1)
        s[a].m(t, null);
    },
    p(o, [l]) {
      if (o[1] ? r ? r.p(o, l) : (r = Se(o), r.c(), r.m(t, n)) : r && (r.d(1), r = null), l & 57) {
        i = o[4];
        let a;
        for (a = 0; a < i.length; a += 1) {
          const c = Me(o, i, a);
          s[a] ? s[a].p(c, l) : (s[a] = Ae(c), s[a].c(), s[a].m(t, null));
        }
        for (; a < s.length; a += 1)
          s[a].d(1);
        s.length = i.length;
      }
    },
    i: E,
    o: E,
    d(o) {
      o && F(t), r && r.d(), qt(s, o);
    }
  };
}
function Fr(e, t, n) {
  let { label: r = "" } = t, { options: i = "" } = t, { selected: s = "" } = t, { labelposition: o = "top" } = t;
  et();
  let l, a;
  const c = (h) => {
    n(0, s = h), mt(l, "input", { value: h });
  };
  function u(h) {
    lt[h ? "unshift" : "push"](() => {
      l = h, n(3, l);
    });
  }
  const b = (h) => c(h);
  return e.$$set = (h) => {
    "label" in h && n(1, r = h.label), "options" in h && n(6, i = h.options), "selected" in h && n(0, s = h.selected), "labelposition" in h && n(2, o = h.labelposition);
  }, e.$$.update = () => {
    e.$$.dirty & 64 && n(4, a = i.split(",").map((h) => h.trim()));
  }, [
    s,
    r,
    o,
    l,
    a,
    c,
    i,
    u,
    b
  ];
}
class wn extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Fr, Ir, it, {
      label: 1,
      options: 6,
      selected: 0,
      labelposition: 2
    }, null), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
  }
  static get observedAttributes() {
    return ["label", "options", "selected", "labelposition"];
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(t) {
    this.$$set({ label: t }), x();
  }
  get options() {
    return this.$$.ctx[6];
  }
  set options(t) {
    this.$$set({ options: t }), x();
  }
  get selected() {
    return this.$$.ctx[0];
  }
  set selected(t) {
    this.$$set({ selected: t }), x();
  }
  get labelposition() {
    return this.$$.ctx[2];
  }
  set labelposition(t) {
    this.$$set({ labelposition: t }), x();
  }
}
customElements.define("v-radio", wn);
const Nr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wn
}, Symbol.toStringTag, { value: "Module" }));
function Ce(e, t, n) {
  const r = e.slice();
  return r[12] = t[n], r;
}
function Te(e) {
  let t, n, r;
  return {
    c() {
      t = S("p"), n = q(e[1]), d(t, "class", r = N("text-xs pb-1", {
        "pb-1": e[2] === "top",
        inline: e[2] === "left"
      }));
    },
    m(i, s) {
      A(i, t, s), v(t, n);
    },
    p(i, s) {
      s & 2 && K(n, i[1]), s & 4 && r !== (r = N("text-xs pb-1", {
        "pb-1": i[2] === "top",
        inline: i[2] === "left"
      })) && d(t, "class", r);
    },
    d(i) {
      i && F(t);
    }
  };
}
function Pe(e, t) {
  let n, r = t[12] + "", i, s, o, l;
  return {
    key: e,
    first: null,
    c() {
      n = S("option"), i = q(r), s = H(), n.selected = o = t[6] === t[12], n.__value = l = `
        ` + t[12] + `
      `, n.value = n.__value, this.first = n;
    },
    m(a, c) {
      A(a, n, c), v(n, i), v(n, s);
    },
    p(a, c) {
      t = a, c & 8 && r !== (r = t[12] + "") && K(i, r), c & 72 && o !== (o = t[6] === t[12]) && (n.selected = o), c & 8 && l !== (l = `
        ` + t[12] + `
      `) && (n.__value = l, n.value = n.__value);
    },
    d(a) {
      a && F(n);
    }
  };
}
function jr(e) {
  let t, n, r, i, s = (e[0] || "Please select") + "", o, l, a = [], c = /* @__PURE__ */ new Map(), u, b, h = e[1] && Te(e), p = e[3];
  const g = (m) => m[12];
  for (let m = 0; m < p.length; m += 1) {
    let R = Ce(e, p, m), V = g(R);
    c.set(V, a[m] = Pe(V, R));
  }
  return {
    c() {
      t = S("label"), h && h.c(), n = H(), r = S("select"), i = S("option"), o = q(s), l = H();
      for (let m = 0; m < a.length; m += 1)
        a[m].c();
      this.c = E, i.__value = "", i.value = i.__value, d(r, "class", N(Oe, "py-1 px-2.5 text-xs border border-black appearance-none rounded-none")), d(t, "class", N(Oe, "relative"));
    },
    m(m, R) {
      A(m, t, R), h && h.m(t, null), v(t, n), v(t, r), v(r, i), v(i, o), v(i, l);
      for (let V = 0; V < a.length; V += 1)
        a[V].m(r, null);
      e[10](r), e[11](t), u || (b = B(r, "input", e[7]), u = !0);
    },
    p(m, [R]) {
      m[1] ? h ? h.p(m, R) : (h = Te(m), h.c(), h.m(t, n)) : h && (h.d(1), h = null), R & 1 && s !== (s = (m[0] || "Please select") + "") && K(o, s), R & 72 && (p = m[3], a = ae(a, R, g, 1, m, p, c, r, le, Pe, null, Ce));
    },
    i: E,
    o: E,
    d(m) {
      m && F(t), h && h.d();
      for (let R = 0; R < a.length; R += 1)
        a[R].d();
      e[10](null), e[11](null), u = !1, b();
    }
  };
}
const Oe = "max-w-[14rem] w-full";
function Hr(e, t, n) {
  let { options: r = "" } = t, { value: i = "" } = t, { placeholder: s = "" } = t, { label: o = "" } = t, { labelposition: l = "top" } = t, a, c, u, b;
  et();
  const h = (m) => {
    m.preventDefault(), m.stopImmediatePropagation(), n(8, i = c.value.trim()), mt(a, "input", { value: i });
  };
  function p(m) {
    lt[m ? "unshift" : "push"](() => {
      c = m, n(5, c), n(3, u), n(9, r);
    });
  }
  function g(m) {
    lt[m ? "unshift" : "push"](() => {
      a = m, n(4, a);
    });
  }
  return e.$$set = (m) => {
    "options" in m && n(9, r = m.options), "value" in m && n(8, i = m.value), "placeholder" in m && n(0, s = m.placeholder), "label" in m && n(1, o = m.label), "labelposition" in m && n(2, l = m.labelposition);
  }, e.$$.update = () => {
    e.$$.dirty & 512 && n(3, u = r.split(",").map((m) => m.trim())), e.$$.dirty & 264 && n(6, b = u.find((m) => m === i) ?? "");
  }, [
    s,
    o,
    l,
    u,
    a,
    c,
    b,
    h,
    i,
    r,
    p,
    g
  ];
}
class yn extends Q {
  constructor(t) {
    super(), this.shadowRoot.innerHTML = "<style>label{--select-chevron-color:black;--select-chevron-size:15px}label::after{content:'';position:absolute;background-color:var(--select-chevron-color);clip-path:polygon(25% 25%, 17.5% 32.5%, 40% 55%, 50% 65%, 60% 55%, 82.5% 32.5%, 75% 25%, 50% 50%);width:var(--select-chevron-size);height:var(--select-chevron-size);right:2px;bottom:2px}</style>", tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Hr, jr, it, {
      options: 9,
      value: 8,
      placeholder: 0,
      label: 1,
      labelposition: 2
    }, null), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
  }
  static get observedAttributes() {
    return ["options", "value", "placeholder", "label", "labelposition"];
  }
  get options() {
    return this.$$.ctx[9];
  }
  set options(t) {
    this.$$set({ options: t }), x();
  }
  get value() {
    return this.$$.ctx[8];
  }
  set value(t) {
    this.$$set({ value: t }), x();
  }
  get placeholder() {
    return this.$$.ctx[0];
  }
  set placeholder(t) {
    this.$$set({ placeholder: t }), x();
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(t) {
    this.$$set({ label: t }), x();
  }
  get labelposition() {
    return this.$$.ctx[2];
  }
  set labelposition(t) {
    this.$$set({ labelposition: t }), x();
  }
}
customElements.define("v-select", yn);
const Dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yn
}, Symbol.toStringTag, { value: "Module" })), Ct = [];
function Wr(e, t = E) {
  let n;
  const r = /* @__PURE__ */ new Set();
  function i(l) {
    if (rn(e, l) && (e = l, n)) {
      const a = !Ct.length;
      for (const c of r)
        c[1](), Ct.push(c, e);
      if (a) {
        for (let c = 0; c < Ct.length; c += 2)
          Ct[c][0](Ct[c + 1]);
        Ct.length = 0;
      }
    }
  }
  function s(l) {
    i(l(e));
  }
  function o(l, a = E) {
    const c = [l, a];
    return r.add(c), r.size === 1 && (n = t(i) || E), l(e), () => {
      r.delete(c), r.size === 0 && (n(), n = null);
    };
  }
  return { set: i, update: s, subscribe: o };
}
function Re(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function ne(e, t, n, r) {
  if (typeof n == "number" || Re(n)) {
    const i = r - n, s = (n - t) / (e.dt || 1 / 60), o = e.opts.stiffness * i, l = e.opts.damping * s, a = (o - l) * e.inv_mass, c = (s + a) * e.dt;
    return Math.abs(c) < e.opts.precision && Math.abs(i) < e.opts.precision ? r : (e.settled = !1, Re(n) ? new Date(n.getTime() + c) : n + c);
  } else {
    if (Array.isArray(n))
      return n.map((i, s) => ne(e, t[s], n[s], r[s]));
    if (typeof n == "object") {
      const i = {};
      for (const s in n)
        i[s] = ne(e, t[s], n[s], r[s]);
      return i;
    } else
      throw new Error(`Cannot spring ${typeof n} values`);
  }
}
function Yr(e, t = {}) {
  const n = Wr(e), { stiffness: r = 0.15, damping: i = 0.8, precision: s = 0.01 } = t;
  let o, l, a, c = e, u = e, b = 1, h = 0, p = !1;
  function g(R, V = {}) {
    u = R;
    const I = a = {};
    if (e == null || V.hard || m.stiffness >= 1 && m.damping >= 1)
      return p = !0, o = de(), c = R, n.set(e = u), Promise.resolve();
    if (V.soft) {
      const T = V.soft === !0 ? 0.5 : +V.soft;
      h = 1 / (T * 60), b = 0;
    }
    return l || (o = de(), p = !1, l = Un((T) => {
      if (p)
        return p = !1, l = null, !1;
      b = Math.min(b + h, 1);
      const M = {
        inv_mass: b,
        opts: m,
        settled: !0,
        dt: (T - o) * 60 / 1e3
      }, z = ne(M, c, e, u);
      return o = T, c = e, n.set(e = z), M.settled && (l = null), !M.settled;
    })), new Promise((T) => {
      l.promise.then(() => {
        I === a && T();
      });
    });
  }
  const m = {
    set: g,
    update: (R, V) => g(R(u, e), V),
    subscribe: n.subscribe,
    stiffness: r,
    damping: i,
    precision: s
  };
  return m;
}
const Br = (e, t, n) => e <= t ? t : e >= n ? n : e, Wt = (e, t, n, r) => {
  const i = (e - t) / (n - t) * 100;
  return Number.isNaN(i) || i <= 0 ? 0 : i >= 100 ? 100 : Number.parseFloat(i.toFixed(r));
};
function ze(e, t, n) {
  const r = e.slice();
  return r[53] = t[n], r[55] = n, r;
}
function Ve(e, t, n) {
  const r = e.slice();
  return r[6] = t[n], r[57] = n, r;
}
function Le(e) {
  let t, n;
  return {
    c() {
      t = S("p"), n = q(e[4]), d(t, "class", "text-xs");
    },
    m(r, i) {
      A(r, t, i), v(t, n);
    },
    p(r, i) {
      i[0] & 16 && K(n, r[4]);
    },
    d(r) {
      r && F(t);
    }
  };
}
function Ie(e) {
  let t, n;
  return {
    c() {
      t = S("span"), n = q(e[5]), d(t, "class", "floating-suffix");
    },
    m(r, i) {
      A(r, t, i), v(t, n);
    },
    p(r, i) {
      i[0] & 32 && K(n, r[5]);
    },
    d(r) {
      r && F(t);
    }
  };
}
function Fe(e) {
  let t, n, r, i, s, o, l = e[6] + "", a, c, u, b, h, p, g, m, R, V, I, T = e[5] && Ie(e);
  function M() {
    return e[37](e[57]);
  }
  return {
    c() {
      t = S("span"), n = S("span"), r = H(), i = S("span"), s = H(), o = S("span"), a = q(l), c = H(), T && T.c(), d(n, "class", "handle-bg absolute left-0 bottom-1 rounded-full opacity-50 h-full w-full transition-transform bg-gray-400"), d(i, "class", "absolute left-0 bottom-1 block rounded-full h-full w-full border border-black bg-white"), d(o, "class", u = N("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !e[13] || e[15] !== e[57]
      })), d(t, "role", "slider"), d(t, "class", "range absolute block h-5 w-5 top-1 bottom-auto -translate-x-1/2 -translate-y-1/2 z-[2]"), d(t, "data-handle", b = e[57]), ut(t, "left", e[17][e[57]] + "%"), ut(t, "z-index", e[15] === e[57] ? 3 : 2), d(t, "aria-valuemin", h = e[0] === !0 && e[57] === 1 ? e[9] : e[7]), d(t, "aria-valuemax", p = e[0] === !0 && e[57] === 0 ? e[10] : e[8]), d(t, "aria-valuenow", g = e[6]), d(t, "aria-valuetext", m = e[6]?.toString()), d(t, "aria-orientation", "horizontal"), d(t, "aria-disabled", e[2]), d(t, "disabled", e[2]), d(t, "tabindex", R = e[2] ? -1 : 0), U(t, "active", e[13] && e[15] === e[57]), U(t, "press", e[14] && e[15] === e[57]);
    },
    m(z, C) {
      A(z, t, C), v(t, n), v(t, r), v(t, i), v(t, s), v(t, o), v(o, a), v(o, c), T && T.m(o, null), V || (I = [
        B(t, "blur", e[20]),
        B(t, "focus", M)
      ], V = !0);
    },
    p(z, C) {
      e = z, C[0] & 1536 && l !== (l = e[6] + "") && K(a, l), e[5] ? T ? T.p(e, C) : (T = Ie(e), T.c(), T.m(o, null)) : T && (T.d(1), T = null), C[0] & 40960 && u !== (u = N("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !e[13] || e[15] !== e[57]
      })) && d(o, "class", u), C[0] & 131072 && ut(t, "left", e[17][e[57]] + "%"), C[0] & 32768 && ut(t, "z-index", e[15] === e[57] ? 3 : 2), C[0] & 641 && h !== (h = e[0] === !0 && e[57] === 1 ? e[9] : e[7]) && d(t, "aria-valuemin", h), C[0] & 1281 && p !== (p = e[0] === !0 && e[57] === 0 ? e[10] : e[8]) && d(t, "aria-valuemax", p), C[0] & 1536 && g !== (g = e[6]) && d(t, "aria-valuenow", g), C[0] & 1536 && m !== (m = e[6]?.toString()) && d(t, "aria-valuetext", m), C[0] & 4 && d(t, "aria-disabled", e[2]), C[0] & 4 && d(t, "disabled", e[2]), C[0] & 4 && R !== (R = e[2] ? -1 : 0) && d(t, "tabindex", R), C[0] & 40960 && U(t, "active", e[13] && e[15] === e[57]), C[0] & 49152 && U(t, "press", e[14] && e[15] === e[57]);
    },
    d(z) {
      z && F(t), T && T.d(), V = !1, pt(I);
    }
  };
}
function Ne(e) {
  let t;
  return {
    c() {
      t = S("span"), d(t, "class", "absolute block transition duration-200 h-1 -top-0.5 select-none z-[1] bg-black"), ut(t, "left", e[18](e[17]) + "%"), ut(t, "right", e[19](e[17]) + "%");
    },
    m(n, r) {
      A(n, t, r);
    },
    p(n, r) {
      r[0] & 131072 && ut(t, "left", n[18](n[17]) + "%"), r[0] & 131072 && ut(t, "right", n[19](n[17]) + "%");
    },
    d(n) {
      n && F(t);
    }
  };
}
function je(e) {
  let t, n;
  return {
    c() {
      t = S("span"), n = q(e[5]), d(t, "class", "pipVal-suffix");
    },
    m(r, i) {
      A(r, t, i), v(t, n);
    },
    p(r, i) {
      i[0] & 32 && K(n, r[5]);
    },
    d(r) {
      r && F(t);
    }
  };
}
function He(e) {
  let t, n = Array.from({ length: e[12] + 1 }), r = [];
  for (let i = 0; i < n.length; i += 1)
    r[i] = We(ze(e, n, i));
  return {
    c() {
      for (let i = 0; i < r.length; i += 1)
        r[i].c();
      t = oe();
    },
    m(i, s) {
      for (let o = 0; o < r.length; o += 1)
        r[o].m(i, s);
      A(i, t, s);
    },
    p(i, s) {
      if (s[0] & 70016) {
        n = Array.from({ length: i[12] + 1 });
        let o;
        for (o = 0; o < n.length; o += 1) {
          const l = ze(i, n, o);
          r[o] ? r[o].p(l, s) : (r[o] = We(l), r[o].c(), r[o].m(t.parentNode, t));
        }
        for (; o < r.length; o += 1)
          r[o].d(1);
        r.length = n.length;
      }
    },
    d(i) {
      qt(r, i), i && F(t);
    }
  };
}
function De(e) {
  let t;
  return {
    c() {
      t = S("span"), d(t, "class", "absolute h-[4px] w-[1px] top-[calc(50%-9px)] whitespace-nowrap transition bg-black/50"), ut(t, "left", Wt(e[16](e[55]), e[7], e[8], 2) + "%");
    },
    m(n, r) {
      A(n, t, r);
    },
    p(n, r) {
      r[0] & 65920 && ut(t, "left", Wt(n[16](n[55]), n[7], n[8], 2) + "%");
    },
    d(n) {
      n && F(t);
    }
  };
}
function We(e) {
  let t = e[16](e[55]) !== e[7] && e[16](e[55]) !== e[8], n, r = t && De(e);
  return {
    c() {
      r && r.c(), n = oe();
    },
    m(i, s) {
      r && r.m(i, s), A(i, n, s);
    },
    p(i, s) {
      s[0] & 65920 && (t = i[16](i[55]) !== i[7] && i[16](i[55]) !== i[8]), t ? r ? r.p(i, s) : (r = De(i), r.c(), r.m(n.parentNode, n)) : r && (r.d(1), r = null);
    },
    d(i) {
      r && r.d(i), i && F(n);
    }
  };
}
function Ye(e) {
  let t, n;
  return {
    c() {
      t = S("span"), n = q(e[5]), d(t, "class", "pipVal-suffix");
    },
    m(r, i) {
      A(r, t, i), v(t, n);
    },
    p(r, i) {
      i[0] & 32 && K(n, r[5]);
    },
    d(r) {
      r && F(t);
    }
  };
}
function Xr(e) {
  let t, n, r, i, s, o, l, a, c, u, b, h, p, g, m, R, V, I = e[4] && Le(e), T = e[10] ? [e[9], e[10]] : [e[9]], M = [];
  for (let P = 0; P < T.length; P += 1)
    M[P] = Fe(Ve(e, T, P));
  let z = e[0] && Ne(e), C = e[5] && je(e), k = e[3] && He(e), L = e[5] && Ye(e);
  return {
    c() {
      t = S("label"), I && I.c(), n = H(), r = S("div");
      for (let P = 0; P < M.length; P += 1)
        M[P].c();
      i = H(), z && z.c(), s = H(), o = S("div"), l = S("small"), a = q(e[7]), c = H(), C && C.c(), u = H(), k && k.c(), b = H(), h = S("small"), p = q(e[8]), g = H(), L && L.c(), this.c = E, d(l, "class", "absolute bottom-full left-0 -translate-x-1/2 mb-3 whitespace-nowrap"), d(h, "class", "absolute bottom-full right-0 translate-x-1/2 mb-3 whitespace-nowrap"), d(o, "class", "absolute h-2 left-0 right-0"), U(o, "disabled", e[2]), U(o, "focus", e[13]), d(r, "class", m = N("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": e[2] })), U(r, "range", e[0]), U(r, "focus", e[13]), U(r, "min", e[0] === "min"), U(r, "max", e[0] === "max"), d(t, "class", "flex flex-col gap-2");
    },
    m(P, D) {
      A(P, t, D), I && I.m(t, null), v(t, n), v(t, r);
      for (let j = 0; j < M.length; j += 1)
        M[j].m(r, null);
      v(r, i), z && z.m(r, null), v(r, s), v(r, o), v(o, l), v(l, a), v(l, c), C && C.m(l, null), v(o, u), k && k.m(o, null), v(o, b), v(o, h), v(h, p), v(h, g), L && L.m(h, null), e[38](r), R || (V = [
        B(window, "mousedown", e[24]),
        B(window, "touchstart", e[24]),
        B(window, "mousemove", e[25]),
        B(window, "touchmove", e[25]),
        B(window, "mouseup", e[26]),
        B(window, "touchend", e[27]),
        B(window, "keydown", e[28]),
        B(r, "mousedown", e[22]),
        B(r, "mouseup", e[23]),
        B(r, "touchstart", he(e[22])),
        B(r, "touchend", he(e[23]))
      ], R = !0);
    },
    p(P, D) {
      if (P[4] ? I ? I.p(P, D) : (I = Le(P), I.c(), I.m(t, n)) : I && (I.d(1), I = null), D[0] & 3336101) {
        T = P[10] ? [P[9], P[10]] : [P[9]];
        let j;
        for (j = 0; j < T.length; j += 1) {
          const ot = Ve(P, T, j);
          M[j] ? M[j].p(ot, D) : (M[j] = Fe(ot), M[j].c(), M[j].m(r, i));
        }
        for (; j < M.length; j += 1)
          M[j].d(1);
        M.length = T.length;
      }
      P[0] ? z ? z.p(P, D) : (z = Ne(P), z.c(), z.m(r, s)) : z && (z.d(1), z = null), D[0] & 128 && K(a, P[7]), P[5] ? C ? C.p(P, D) : (C = je(P), C.c(), C.m(l, null)) : C && (C.d(1), C = null), P[3] ? k ? k.p(P, D) : (k = He(P), k.c(), k.m(o, b)) : k && (k.d(1), k = null), D[0] & 256 && K(p, P[8]), P[5] ? L ? L.p(P, D) : (L = Ye(P), L.c(), L.m(h, null)) : L && (L.d(1), L = null), D[0] & 4 && U(o, "disabled", P[2]), D[0] & 8192 && U(o, "focus", P[13]), D[0] & 4 && m !== (m = N("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": P[2] })) && d(r, "class", m), D[0] & 5 && U(r, "range", P[0]), D[0] & 8196 && U(r, "focus", P[13]), D[0] & 5 && U(r, "min", P[0] === "min"), D[0] & 5 && U(r, "max", P[0] === "max");
    },
    i: E,
    o: E,
    d(P) {
      P && F(t), I && I.d(), qt(M, P), z && z.d(), C && C.d(), k && k.d(), L && L.d(), e[38](null), R = !1, pt(V);
    }
  };
}
function qr(e, t, n) {
  let r, i, s = E, o = () => (s(), s = Zn(kt, (_) => n(17, i = _)), kt);
  e.$$.on_destroy.push(() => s());
  let { slider: l } = t, { range: a = !1 } = t, { min: c } = t, { max: u } = t, { step: b } = t, { value: h } = t, { start: p } = t, { end: g } = t, { disabled: m = !1 } = t, { discrete: R = !0 } = t, { label: V = "" } = t, { suffix: I = "" } = t;
  et();
  const T = { stiffness: 0.1, damping: 0.4 };
  let M, z, C, k, L, P, D, j = 0, ot = !1, at = !1, st = !1, vt = !1, ft = -1, Mt, _t, kt;
  const ht = (_, Y, J) => {
    if (_ <= Y)
      return Y;
    if (_ >= J)
      return J;
    const Z = (_ - Y) % C;
    let bt = _ - Z;
    return Math.abs(Z) * 2 >= C && (bt += Z > 0 ? C : -C), bt = Br(bt, Y, J), Number.parseFloat(bt.toFixed(2));
  }, Ot = (_) => _.type.includes("touch") ? _.touches[0] : _, Gt = (_) => {
    const Y = [...l.querySelectorAll(".handle")], J = Y.includes(_), Z = Y.some((bt) => bt.contains(_));
    return J || Z;
  }, Rt = (_) => a === "min" || a === "max" ? _.slice(0, 1) : a ? _.slice(0, 2) : _, zt = () => {
    _t = l.getBoundingClientRect();
  }, St = (_) => {
    const J = (_.clientX - _t.left) / _t.width * 100, Z = (z - M) / 100 * J + M;
    let bt = 0;
    return a && k === L ? Z > L ? 1 : 0 : (a && (bt = [k, L].indexOf([k, L].sort((Bn, Xn) => Math.abs(Z - Bn) - Math.abs(Z - Xn))[0])), bt);
  }, At = (_) => {
    const J = (_.clientX - _t.left) / _t.width * 100, Z = (z - M) / 100 * J + M;
    Jt(ft, Z);
  }, Jt = (_, Y) => {
    let J = _;
    const Z = ht(Y, M, z);
    return typeof J > "u" && (J = ft), a && (J === 0 && Z > L ? n(10, L = Z) : J === 1 && Z < k && n(9, k = Z)), J === 0 && k !== Z && n(9, k = Z), J === 1 && L !== Z && n(10, L = Z), Mt !== Z && (rt(), Mt = Z), J === 0 ? n(29, p = k.toString()) : J === 1 && n(30, g = L.toString()), Z;
  }, Hn = (_) => a === "min" ? 0 : _[0], Dn = (_) => a === "max" ? 0 : a === "min" ? 100 - _[0] : 100 - _[1], Wn = () => {
    vt && (n(13, ot = !1), at = !1, n(14, st = !1));
  }, w = (_) => {
    m || (n(15, ft = _), n(13, ot = !0));
  }, f = (_) => {
    if (m)
      return;
    zt();
    const Y = _.target, J = Ot(_);
    n(13, ot = !0), at = !0, n(14, st = !0), n(15, ft = St(J)), Mt = ht(ft === 0 ? k : L, M, z), _.type === "touchstart" && !Y.matches(".pipVal") && At(J);
  }, y = () => {
    n(14, st = !1);
  }, O = (_) => {
    vt = !1, ot && _.target !== l && !l.contains(_.target) && n(13, ot = !1);
  }, W = (_) => {
    m || !at || (n(13, ot = !0), At(Ot(_)));
  }, nt = (_) => {
    if (!m) {
      const Y = _.target;
      (at && Y && Y === l || l.contains(Y)) && (n(13, ot = !0), !Gt(Y) && !Y.matches(".pipVal") && At(Ot(_)));
    }
    at = !1, n(14, st = !1);
  }, X = () => {
    at = !1, n(14, st = !1);
  }, G = (_) => {
    m || (_.target === l || l.contains(_.target)) && (vt = !0);
  }, rt = () => {
    m || mt(l, "input", {
      activeHandle: ft,
      previousValue: Mt,
      value: ft === 0 ? k : L,
      values: L ? [k, L].map((_) => ht(_, M, z)) : void 0
    });
  }, ct = (_) => w(_);
  function Yn(_) {
    lt[_ ? "unshift" : "push"](() => {
      l = _, n(1, l);
    });
  }
  return e.$$set = (_) => {
    "slider" in _ && n(1, l = _.slider), "range" in _ && n(0, a = _.range), "min" in _ && n(31, c = _.min), "max" in _ && n(32, u = _.max), "step" in _ && n(33, b = _.step), "value" in _ && n(6, h = _.value), "start" in _ && n(29, p = _.start), "end" in _ && n(30, g = _.end), "disabled" in _ && n(2, m = _.disabled), "discrete" in _ && n(3, R = _.discrete), "label" in _ && n(4, V = _.label), "suffix" in _ && n(5, I = _.suffix);
  }, e.$$.update = () => {
    if (e.$$.dirty[1] & 2 && n(8, z = Number.parseFloat(u || "100")), e.$$.dirty[1] & 1 && n(7, M = Number.parseFloat(c || "0")), e.$$.dirty[1] & 4 && n(34, C = Number.parseFloat(b || "1")), e.$$.dirty[0] & 384 | e.$$.dirty[1] & 8 && n(35, P = (z - M) / C >= 100 ? (z - M) / 20 : 1), e.$$.dirty[0] & 384 | e.$$.dirty[1] & 8 && n(12, D = (z - M) / C), e.$$.dirty[0] & 128 | e.$$.dirty[1] & 24 && n(16, r = (_) => M + _ * C * P), e.$$.dirty[0] & 536870976 | e.$$.dirty[1] & 3 && n(9, k = p || h ? Number.parseFloat(p || h) : (Number.parseFloat(c || "0") + Number.parseFloat(u || "100")) / 2), e.$$.dirty[0] & 1073741824 && n(10, L = g ? Number.parseFloat(g) : void 0), e.$$.dirty[0] & 1073741825 && n(0, a = typeof a == "string" ? a : g !== void 0), e.$$.dirty[0] & 3968 | e.$$.dirty[1] & 32) {
      n(9, k = ht(k, M, z));
      let _ = [k];
      L && (n(10, L = ht(L, M, z)), _.push(L)), _ = Rt(_), j !== _.length ? o(n(11, kt = Yr(_.map((Y) => Wt(Y, M, z, 2)), T))) : kt.set(_.map((Y) => Wt(Y, M, z, 2))).catch((Y) => console.error(Y)), n(36, j = _.length);
    }
  }, [
    a,
    l,
    m,
    R,
    V,
    I,
    h,
    M,
    z,
    k,
    L,
    kt,
    D,
    ot,
    st,
    ft,
    r,
    i,
    Hn,
    Dn,
    Wn,
    w,
    f,
    y,
    O,
    W,
    nt,
    X,
    G,
    p,
    g,
    c,
    u,
    b,
    C,
    P,
    j,
    ct,
    Yn
  ];
}
class vn extends Q {
  constructor(t) {
    super(), this.shadowRoot.innerHTML = "<style>.slider .range:hover .handle-bg{transform:scale(1.5)}.slider .range.active .handle-bg{transform:scale(2.0)}.slider .range.active .floating,.slider .range:hover .floating{opacity:1}</style>", tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, qr, Xr, rn, {
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
    }, null, [-1, -1]), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
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
  set slider(t) {
    this.$$set({ slider: t }), x();
  }
  get range() {
    return this.$$.ctx[0];
  }
  set range(t) {
    this.$$set({ range: t }), x();
  }
  get min() {
    return this.$$.ctx[31];
  }
  set min(t) {
    this.$$set({ min: t }), x();
  }
  get max() {
    return this.$$.ctx[32];
  }
  set max(t) {
    this.$$set({ max: t }), x();
  }
  get step() {
    return this.$$.ctx[33];
  }
  set step(t) {
    this.$$set({ step: t }), x();
  }
  get value() {
    return this.$$.ctx[6];
  }
  set value(t) {
    this.$$set({ value: t }), x();
  }
  get start() {
    return this.$$.ctx[29];
  }
  set start(t) {
    this.$$set({ start: t }), x();
  }
  get end() {
    return this.$$.ctx[30];
  }
  set end(t) {
    this.$$set({ end: t }), x();
  }
  get disabled() {
    return this.$$.ctx[2];
  }
  set disabled(t) {
    this.$$set({ disabled: t }), x();
  }
  get discrete() {
    return this.$$.ctx[3];
  }
  set discrete(t) {
    this.$$set({ discrete: t }), x();
  }
  get label() {
    return this.$$.ctx[4];
  }
  set label(t) {
    this.$$set({ label: t }), x();
  }
  get suffix() {
    return this.$$.ctx[5];
  }
  set suffix(t) {
    this.$$set({ suffix: t }), x();
  }
}
customElements.define("v-slider", vn);
const Zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vn
}, Symbol.toStringTag, { value: "Module" }));
function Be(e) {
  let t, n;
  return {
    c() {
      t = S("p"), n = q(e[0]), d(t, "class", "capitalize text-xs");
    },
    m(r, i) {
      A(r, t, i), v(t, n);
    },
    p(r, i) {
      i & 1 && K(n, r[0]);
    },
    d(r) {
      r && F(t);
    }
  };
}
function Ur(e) {
  let t, n, r, i, s, o, l, a, c, u, b, h = e[3] === "labeled" && Be(e);
  return {
    c() {
      t = S("label"), n = S("button"), r = S("span"), i = H(), s = S("input"), a = H(), h && h.c(), this.c = E, d(r, "class", "pointer-events-none relative inline-block border border-green/100 h-4 w-4 mt-px ml-px bg-white shadow transform ring-0 motion-safe:transition-transform ease-in-out duration-200"), U(r, "translate-x-0", !e[6]), U(r, "translate-x-6", e[6]), d(s, "name", e[2]), s.value = e[0], d(s, "class", "hidden"), d(s, "type", "checkbox"), s.checked = e[6], d(n, "type", "button"), d(n, "class", o = N("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": e[6] })), d(n, "role", "switch"), d(n, "aria-label", e[1]), d(n, "aria-checked", l = e[6] ? "true" : "false"), d(t, "class", c = N("flex items-center gap-1.5", {
        "opacity-50 pointer-events-none": e[7]
      }));
    },
    m(p, g) {
      A(p, t, g), v(t, n), v(n, r), v(n, i), v(n, s), e[10](s), v(t, a), h && h.m(t, null), e[11](t), u || (b = B(n, "click", e[8]), u = !0);
    },
    p(p, [g]) {
      g & 64 && U(r, "translate-x-0", !p[6]), g & 64 && U(r, "translate-x-6", p[6]), g & 4 && d(s, "name", p[2]), g & 1 && (s.value = p[0]), g & 64 && (s.checked = p[6]), g & 64 && o !== (o = N("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": p[6] })) && d(n, "class", o), g & 2 && d(n, "aria-label", p[1]), g & 64 && l !== (l = p[6] ? "true" : "false") && d(n, "aria-checked", l), p[3] === "labeled" ? h ? h.p(p, g) : (h = Be(p), h.c(), h.m(t, null)) : h && (h.d(1), h = null), g & 128 && c !== (c = N("flex items-center gap-1.5", {
        "opacity-50 pointer-events-none": p[7]
      })) && d(t, "class", c);
    },
    i: E,
    o: E,
    d(p) {
      p && F(t), e[10](null), h && h.d(), e[11](null), u = !1, b();
    }
  };
}
function Kr(e, t, n) {
  let { label: r = "" } = t, { name: i = "" } = t, { value: s = "off" } = t, { variant: o = "default" } = t, { disabled: l = "false" } = t;
  et();
  let a, c, u, b;
  const h = () => {
    n(0, s = u ? "off" : "on"), n(5, c.checked = u, c), mt(a, "input", { value: c.checked });
  };
  function p(m) {
    lt[m ? "unshift" : "push"](() => {
      c = m, n(5, c);
    });
  }
  function g(m) {
    lt[m ? "unshift" : "push"](() => {
      a = m, n(4, a);
    });
  }
  return e.$$set = (m) => {
    "label" in m && n(1, r = m.label), "name" in m && n(2, i = m.name), "value" in m && n(0, s = m.value), "variant" in m && n(3, o = m.variant), "disabled" in m && n(9, l = m.disabled);
  }, e.$$.update = () => {
    e.$$.dirty & 1 && n(6, u = s === "on"), e.$$.dirty & 512 && n(7, b = l === "true");
  }, [
    s,
    r,
    i,
    o,
    a,
    c,
    u,
    b,
    h,
    l,
    p,
    g
  ];
}
class _n extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Kr, Ur, it, {
      label: 1,
      name: 2,
      value: 0,
      variant: 3,
      disabled: 9
    }, null), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
  }
  static get observedAttributes() {
    return ["label", "name", "value", "variant", "disabled"];
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(t) {
    this.$$set({ label: t }), x();
  }
  get name() {
    return this.$$.ctx[2];
  }
  set name(t) {
    this.$$set({ name: t }), x();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(t) {
    this.$$set({ value: t }), x();
  }
  get variant() {
    return this.$$.ctx[3];
  }
  set variant(t) {
    this.$$set({ variant: t }), x();
  }
  get disabled() {
    return this.$$.ctx[9];
  }
  set disabled(t) {
    this.$$set({ disabled: t }), x();
  }
}
customElements.define("v-switch", _n);
const Gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _n
}, Symbol.toStringTag, { value: "Module" }));
function Xe(e, t, n) {
  const r = e.slice();
  return r[3] = t[n], r;
}
function qe(e) {
  let t;
  return {
    c() {
      t = S("col"), ut(t, "width", e[3]);
    },
    m(n, r) {
      A(n, t, r);
    },
    p: E,
    d(n) {
      n && F(t);
    }
  };
}
function Jr(e) {
  let t, n, r, i, s, o = e[1], l = [];
  for (let a = 0; a < o.length; a += 1)
    l[a] = qe(Xe(e, o, a));
  return {
    c() {
      t = S("table"), n = S("colgroup");
      for (let a = 0; a < l.length; a += 1)
        l[a].c();
      r = H(), i = S("slot"), this.c = E, d(t, "class", s = N("bg-white text-xs w-full", {
        "table-fixed": e[0] === "fixed"
      }));
    },
    m(a, c) {
      A(a, t, c), v(t, n);
      for (let u = 0; u < l.length; u += 1)
        l[u].m(n, null);
      v(t, r), v(t, i);
    },
    p(a, [c]) {
      if (c & 2) {
        o = a[1];
        let u;
        for (u = 0; u < o.length; u += 1) {
          const b = Xe(a, o, u);
          l[u] ? l[u].p(b, c) : (l[u] = qe(b), l[u].c(), l[u].m(n, null));
        }
        for (; u < l.length; u += 1)
          l[u].d(1);
        l.length = o.length;
      }
      c & 1 && s !== (s = N("bg-white text-xs w-full", {
        "table-fixed": a[0] === "fixed"
      })) && d(t, "class", s);
    },
    i: E,
    o: E,
    d(a) {
      a && F(t), qt(l, a);
    }
  };
}
function Qr(e, t, n) {
  et();
  let { variant: r = "" } = t, { cols: i = "" } = t;
  const s = i.split(",").map((o) => o.trim());
  return e.$$set = (o) => {
    "variant" in o && n(0, r = o.variant), "cols" in o && n(2, i = o.cols);
  }, [r, s, i];
}
class kn extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Qr, Jr, it, { variant: 0, cols: 2 }, null), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
  }
  static get observedAttributes() {
    return ["variant", "cols"];
  }
  get variant() {
    return this.$$.ctx[0];
  }
  set variant(t) {
    this.$$set({ variant: t }), x();
  }
  get cols() {
    return this.$$.ctx[2];
  }
  set cols(t) {
    this.$$set({ cols: t }), x();
  }
}
customElements.define("v-table", kn);
const $r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kn
}, Symbol.toStringTag, { value: "Module" }));
function Ze(e, t, n) {
  const r = e.slice();
  return r[8] = t[n], r[10] = n, r;
}
function Ue(e, t) {
  let n, r = t[8] + "", i, s, o, l, a;
  function c() {
    return t[6](t[8]);
  }
  return {
    key: e,
    first: null,
    c() {
      n = S("button"), i = q(r), s = H(), d(n, "class", o = N("px-4 py-1 uppercase text-sm first:ml-4", {
        "bg-white border border-x-black border-t-black border-b-white font-bold": t[8] === t[0],
        "text-black/70": t[8] !== t[0],
        "border-l border-l-gray-300": t[3] > t[10],
        "border-r border-r-gray-300": t[3] < t[10]
      })), this.first = n;
    },
    m(u, b) {
      A(u, n, b), v(n, i), v(n, s), l || (a = B(n, "click", c), l = !0);
    },
    p(u, b) {
      t = u, b & 2 && r !== (r = t[8] + "") && K(i, r), b & 11 && o !== (o = N("px-4 py-1 uppercase text-sm first:ml-4", {
        "bg-white border border-x-black border-t-black border-b-white font-bold": t[8] === t[0],
        "text-black/70": t[8] !== t[0],
        "border-l border-l-gray-300": t[3] > t[10],
        "border-r border-r-gray-300": t[3] < t[10]
      })) && d(n, "class", o);
    },
    d(u) {
      u && F(n), l = !1, a();
    }
  };
}
function ti(e) {
  let t, n = [], r = /* @__PURE__ */ new Map(), i = e[1];
  const s = (o) => o[8];
  for (let o = 0; o < i.length; o += 1) {
    let l = Ze(e, i, o), a = s(l);
    r.set(a, n[o] = Ue(a, l));
  }
  return {
    c() {
      t = S("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
      this.c = E, d(t, "class", "w-full flex bg-black/20");
    },
    m(o, l) {
      A(o, t, l);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(t, null);
      e[7](t);
    },
    p(o, [l]) {
      l & 27 && (i = o[1], n = ae(n, l, s, 1, o, i, r, t, le, Ue, null, Ze));
    },
    i: E,
    o: E,
    d(o) {
      o && F(t);
      for (let l = 0; l < n.length; l += 1)
        n[l].d();
      e[7](null);
    }
  };
}
function ei(e, t, n) {
  let r, i, { tabs: s = "" } = t, { selected: o = "" } = t, l;
  et();
  const a = (b) => {
    n(0, o = b), mt(l, "input", { value: o });
  }, c = (b) => a(b);
  function u(b) {
    lt[b ? "unshift" : "push"](() => {
      l = b, n(2, l);
    });
  }
  return e.$$set = (b) => {
    "tabs" in b && n(5, s = b.tabs), "selected" in b && n(0, o = b.selected);
  }, e.$$.update = () => {
    e.$$.dirty & 32 && n(1, r = s.split(",").map((b) => b.trim())), e.$$.dirty & 3 && n(3, i = r.indexOf(o));
  }, [
    o,
    r,
    l,
    i,
    a,
    s,
    c,
    u
  ];
}
class xn extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ei, ti, it, { tabs: 5, selected: 0 }, null), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
  }
  static get observedAttributes() {
    return ["tabs", "selected"];
  }
  get tabs() {
    return this.$$.ctx[5];
  }
  set tabs(t) {
    this.$$set({ tabs: t }), x();
  }
  get selected() {
    return this.$$.ctx[0];
  }
  set selected(t) {
    this.$$set({ selected: t }), x();
  }
}
customElements.define("v-tabs", xn);
const ni = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xn
}, Symbol.toStringTag, { value: "Module" }));
function ri(e) {
  let t;
  return {
    c() {
      t = S("tbody"), t.innerHTML = "<slot></slot>", this.c = E;
    },
    m(n, r) {
      A(n, t, r);
    },
    p: E,
    i: E,
    o: E,
    d(n) {
      n && F(t);
    }
  };
}
function ii(e) {
  return et(), [];
}
class En extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ii, ri, it, {}, null), t && t.target && A(t.target, this, t.anchor);
  }
}
customElements.define("v-tbody", En);
const oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: En
}, Symbol.toStringTag, { value: "Module" }));
function si(e) {
  let t;
  return {
    c() {
      t = S("th"), t.innerHTML = "<slot></slot>", this.c = E, d(t, "class", "p-2 text-neutral-600 font-normal overflow-hidden");
    },
    m(n, r) {
      A(n, t, r);
    },
    p: E,
    i: E,
    o: E,
    d(n) {
      n && F(t);
    }
  };
}
function li(e) {
  return et(), [];
}
class Mn extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, li, si, it, {}, null), t && t.target && A(t.target, this, t.anchor);
  }
}
customElements.define("v-th", Mn);
const ai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Mn
}, Symbol.toStringTag, { value: "Module" }));
function ci(e) {
  let t;
  return {
    c() {
      t = S("td"), t.innerHTML = "<slot></slot>", this.c = E, d(t, "class", "p-2 overflow-hidden");
    },
    m(n, r) {
      A(n, t, r);
    },
    p: E,
    i: E,
    o: E,
    d(n) {
      n && F(t);
    }
  };
}
function ui(e) {
  return et(), [];
}
class Sn extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ui, ci, it, {}, null), t && t.target && A(t.target, this, t.anchor);
  }
}
customElements.define("v-td", Sn);
const fi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sn
}, Symbol.toStringTag, { value: "Module" }));
function di(e) {
  let t;
  return {
    c() {
      t = S("thead"), t.innerHTML = "<slot></slot>", this.c = E, d(t, "class", "border-b border-black");
    },
    m(n, r) {
      A(n, t, r);
    },
    p: E,
    i: E,
    o: E,
    d(n) {
      n && F(t);
    }
  };
}
function hi(e) {
  return et(), [];
}
class An extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, hi, di, it, {}, null), t && t.target && A(t.target, this, t.anchor);
  }
}
customElements.define("v-thead", An);
const bi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: An
}, Symbol.toStringTag, { value: "Module" }));
function Nt(e) {
  return e.split("-")[0];
}
function ce(e) {
  return e.split("-")[1];
}
function Zt(e) {
  return ["top", "bottom"].includes(Nt(e)) ? "x" : "y";
}
function Cn(e) {
  return e === "y" ? "height" : "width";
}
function Ke(e, t, n) {
  let {
    reference: r,
    floating: i
  } = e;
  const s = r.x + r.width / 2 - i.width / 2, o = r.y + r.height / 2 - i.height / 2, l = Zt(t), a = Cn(l), c = r[a] / 2 - i[a] / 2, u = Nt(t), b = l === "x";
  let h;
  switch (u) {
    case "top":
      h = {
        x: s,
        y: r.y - i.height
      };
      break;
    case "bottom":
      h = {
        x: s,
        y: r.y + r.height
      };
      break;
    case "right":
      h = {
        x: r.x + r.width,
        y: o
      };
      break;
    case "left":
      h = {
        x: r.x - i.width,
        y: o
      };
      break;
    default:
      h = {
        x: r.x,
        y: r.y
      };
  }
  switch (ce(t)) {
    case "start":
      h[l] -= c * (n && b ? -1 : 1);
      break;
    case "end":
      h[l] += c * (n && b ? -1 : 1);
      break;
  }
  return h;
}
const mi = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: s = [],
    platform: o
  } = n, l = await (o.isRTL == null ? void 0 : o.isRTL(t));
  let a = await o.getElementRects({
    reference: e,
    floating: t,
    strategy: i
  }), {
    x: c,
    y: u
  } = Ke(a, r, l), b = r, h = {}, p = 0;
  for (let g = 0; g < s.length; g++) {
    const {
      name: m,
      fn: R
    } = s[g], {
      x: V,
      y: I,
      data: T,
      reset: M
    } = await R({
      x: c,
      y: u,
      initialPlacement: r,
      placement: b,
      strategy: i,
      middlewareData: h,
      rects: a,
      platform: o,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (c = V ?? c, u = I ?? u, h = {
      ...h,
      [m]: {
        ...h[m],
        ...T
      }
    }, M && p <= 50) {
      p++, typeof M == "object" && (M.placement && (b = M.placement), M.rects && (a = M.rects === !0 ? await o.getElementRects({
        reference: e,
        floating: t,
        strategy: i
      }) : M.rects), {
        x: c,
        y: u
      } = Ke(a, b, l)), g = -1;
      continue;
    }
  }
  return {
    x: c,
    y: u,
    placement: b,
    strategy: i,
    middlewareData: h
  };
};
function gi(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function pi(e) {
  return typeof e != "number" ? gi(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Yt(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
async function Tn(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: i,
    platform: s,
    rects: o,
    elements: l,
    strategy: a
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: b = "floating",
    altBoundary: h = !1,
    padding: p = 0
  } = t, g = pi(p), R = l[h ? b === "floating" ? "reference" : "floating" : b], V = Yt(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(R))) == null || n ? R : R.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(l.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: a
  })), I = Yt(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: b === "floating" ? {
      ...o.floating,
      x: r,
      y: i
    } : o.reference,
    offsetParent: await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating)),
    strategy: a
  }) : o[b]);
  return {
    top: V.top - I.top + g.top,
    bottom: I.bottom - V.bottom + g.bottom,
    left: V.left - I.left + g.left,
    right: I.right - V.right + g.right
  };
}
const wi = Math.min, yi = Math.max;
function Ge(e, t, n) {
  return yi(e, wi(t, n));
}
const vi = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Bt(e) {
  return e.replace(/left|right|bottom|top/g, (t) => vi[t]);
}
function _i(e, t, n) {
  n === void 0 && (n = !1);
  const r = ce(e), i = Zt(e), s = Cn(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (o = Bt(o)), {
    main: o,
    cross: Bt(o)
  };
}
const ki = {
  start: "end",
  end: "start"
};
function Je(e) {
  return e.replace(/start|end/g, (t) => ki[t]);
}
function xi(e) {
  const t = Bt(e);
  return [Je(e), t, Je(t)];
}
const Ei = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n;
      const {
        placement: r,
        middlewareData: i,
        rects: s,
        initialPlacement: o,
        platform: l,
        elements: a
      } = t, {
        mainAxis: c = !0,
        crossAxis: u = !0,
        fallbackPlacements: b,
        fallbackStrategy: h = "bestFit",
        flipAlignment: p = !0,
        ...g
      } = e, m = Nt(r), V = b || (m === o || !p ? [Bt(o)] : xi(o)), I = [o, ...V], T = await Tn(t, g), M = [];
      let z = ((n = i.flip) == null ? void 0 : n.overflows) || [];
      if (c && M.push(T[m]), u) {
        const {
          main: P,
          cross: D
        } = _i(r, s, await (l.isRTL == null ? void 0 : l.isRTL(a.floating)));
        M.push(T[P], T[D]);
      }
      if (z = [...z, {
        placement: r,
        overflows: M
      }], !M.every((P) => P <= 0)) {
        var C, k;
        const P = ((C = (k = i.flip) == null ? void 0 : k.index) != null ? C : 0) + 1, D = I[P];
        if (D)
          return {
            data: {
              index: P,
              overflows: z
            },
            reset: {
              placement: D
            }
          };
        let j = "bottom";
        switch (h) {
          case "bestFit": {
            var L;
            const ot = (L = z.map((at) => [at, at.overflows.filter((st) => st > 0).reduce((st, vt) => st + vt, 0)]).sort((at, st) => at[1] - st[1])[0]) == null ? void 0 : L[0].placement;
            ot && (j = ot);
            break;
          }
          case "initialPlacement":
            j = o;
            break;
        }
        if (r !== j)
          return {
            reset: {
              placement: j
            }
          };
      }
      return {};
    }
  };
};
async function Mi(e, t) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Nt(n), l = ce(n), a = Zt(n) === "x", c = ["left", "top"].includes(o) ? -1 : 1, u = s && a ? -1 : 1, b = typeof t == "function" ? t(e) : t;
  let {
    mainAxis: h,
    crossAxis: p,
    alignmentAxis: g
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
  return l && typeof g == "number" && (p = l === "end" ? g * -1 : g), a ? {
    x: p * u,
    y: h * c
  } : {
    x: h * c,
    y: p * u
  };
}
const Si = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r
      } = t, i = await Mi(t, e);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
};
function Ai(e) {
  return e === "x" ? "y" : "x";
}
const Ci = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: i
      } = t, {
        mainAxis: s = !0,
        crossAxis: o = !1,
        limiter: l = {
          fn: (R) => {
            let {
              x: V,
              y: I
            } = R;
            return {
              x: V,
              y: I
            };
          }
        },
        ...a
      } = e, c = {
        x: n,
        y: r
      }, u = await Tn(t, a), b = Zt(Nt(i)), h = Ai(b);
      let p = c[b], g = c[h];
      if (s) {
        const R = b === "y" ? "top" : "left", V = b === "y" ? "bottom" : "right", I = p + u[R], T = p - u[V];
        p = Ge(I, p, T);
      }
      if (o) {
        const R = h === "y" ? "top" : "left", V = h === "y" ? "bottom" : "right", I = g + u[R], T = g - u[V];
        g = Ge(I, g, T);
      }
      const m = l.fn({
        ...t,
        [b]: p,
        [h]: g
      });
      return {
        ...m,
        data: {
          x: m.x - n,
          y: m.y - r
        }
      };
    }
  };
};
function Pn(e) {
  return e && e.document && e.location && e.alert && e.setInterval;
}
function wt(e) {
  if (e == null)
    return window;
  if (!Pn(e)) {
    const t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function jt(e) {
  return wt(e).getComputedStyle(e);
}
function gt(e) {
  return Pn(e) ? "" : e ? (e.nodeName || "").toLowerCase() : "";
}
function On() {
  const e = navigator.userAgentData;
  return e != null && e.brands ? e.brands.map((t) => t.brand + "/" + t.version).join(" ") : navigator.userAgent;
}
function dt(e) {
  return e instanceof wt(e).HTMLElement;
}
function Pt(e) {
  return e instanceof wt(e).Element;
}
function Ti(e) {
  return e instanceof wt(e).Node;
}
function ue(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  const t = wt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Ut(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r
  } = jt(e);
  return /auto|scroll|overlay|hidden/.test(t + r + n);
}
function Pi(e) {
  return ["table", "td", "th"].includes(gt(e));
}
function Rn(e) {
  const t = /firefox/i.test(On()), n = jt(e);
  return n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].includes(n.willChange) || t && n.willChange === "filter" || t && (n.filter ? n.filter !== "none" : !1);
}
function zn() {
  return !/^((?!chrome|android).)*safari/i.test(On());
}
const Qe = Math.min, It = Math.max, Xt = Math.round;
function Et(e, t, n) {
  var r, i, s, o;
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const l = e.getBoundingClientRect();
  let a = 1, c = 1;
  t && dt(e) && (a = e.offsetWidth > 0 && Xt(l.width) / e.offsetWidth || 1, c = e.offsetHeight > 0 && Xt(l.height) / e.offsetHeight || 1);
  const u = Pt(e) ? wt(e) : window, b = !zn() && n, h = (l.left + (b && (r = (i = u.visualViewport) == null ? void 0 : i.offsetLeft) != null ? r : 0)) / a, p = (l.top + (b && (s = (o = u.visualViewport) == null ? void 0 : o.offsetTop) != null ? s : 0)) / c, g = l.width / a, m = l.height / c;
  return {
    width: g,
    height: m,
    top: p,
    right: h + g,
    bottom: p + m,
    left: h,
    x: h,
    y: p
  };
}
function yt(e) {
  return ((Ti(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function Kt(e) {
  return Pt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function Vn(e) {
  return Et(yt(e)).left + Kt(e).scrollLeft;
}
function Oi(e) {
  const t = Et(e);
  return Xt(t.width) !== e.offsetWidth || Xt(t.height) !== e.offsetHeight;
}
function Ri(e, t, n) {
  const r = dt(t), i = yt(t), s = Et(e, r && Oi(t), n === "fixed");
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = {
    x: 0,
    y: 0
  };
  if (r || !r && n !== "fixed")
    if ((gt(t) !== "body" || Ut(i)) && (o = Kt(t)), dt(t)) {
      const a = Et(t, !0);
      l.x = a.x + t.clientLeft, l.y = a.y + t.clientTop;
    } else
      i && (l.x = Vn(i));
  return {
    x: s.left + o.scrollLeft - l.x,
    y: s.top + o.scrollTop - l.y,
    width: s.width,
    height: s.height
  };
}
function Ln(e) {
  return gt(e) === "html" ? e : e.assignedSlot || e.parentNode || (ue(e) ? e.host : null) || yt(e);
}
function $e(e) {
  return !dt(e) || getComputedStyle(e).position === "fixed" ? null : e.offsetParent;
}
function zi(e) {
  let t = Ln(e);
  for (ue(t) && (t = t.host); dt(t) && !["html", "body"].includes(gt(t)); ) {
    if (Rn(t))
      return t;
    t = t.parentNode;
  }
  return null;
}
function re(e) {
  const t = wt(e);
  let n = $e(e);
  for (; n && Pi(n) && getComputedStyle(n).position === "static"; )
    n = $e(n);
  return n && (gt(n) === "html" || gt(n) === "body" && getComputedStyle(n).position === "static" && !Rn(n)) ? t : n || zi(e) || t;
}
function tn(e) {
  if (dt(e))
    return {
      width: e.offsetWidth,
      height: e.offsetHeight
    };
  const t = Et(e);
  return {
    width: t.width,
    height: t.height
  };
}
function Vi(e) {
  let {
    rect: t,
    offsetParent: n,
    strategy: r
  } = e;
  const i = dt(n), s = yt(n);
  if (n === s)
    return t;
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = {
    x: 0,
    y: 0
  };
  if ((i || !i && r !== "fixed") && ((gt(n) !== "body" || Ut(s)) && (o = Kt(n)), dt(n))) {
    const a = Et(n, !0);
    l.x = a.x + n.clientLeft, l.y = a.y + n.clientTop;
  }
  return {
    ...t,
    x: t.x - o.scrollLeft + l.x,
    y: t.y - o.scrollTop + l.y
  };
}
function Li(e, t) {
  const n = wt(e), r = yt(e), i = n.visualViewport;
  let s = r.clientWidth, o = r.clientHeight, l = 0, a = 0;
  if (i) {
    s = i.width, o = i.height;
    const c = zn();
    (c || !c && t === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: s,
    height: o,
    x: l,
    y: a
  };
}
function Ii(e) {
  var t;
  const n = yt(e), r = Kt(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, s = It(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = It(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0);
  let l = -r.scrollLeft + Vn(e);
  const a = -r.scrollTop;
  return jt(i || n).direction === "rtl" && (l += It(n.clientWidth, i ? i.clientWidth : 0) - s), {
    width: s,
    height: o,
    x: l,
    y: a
  };
}
function In(e) {
  const t = Ln(e);
  return ["html", "body", "#document"].includes(gt(t)) ? e.ownerDocument.body : dt(t) && Ut(t) ? t : In(t);
}
function Fn(e, t) {
  var n;
  t === void 0 && (t = []);
  const r = In(e), i = r === ((n = e.ownerDocument) == null ? void 0 : n.body), s = wt(r), o = i ? [s].concat(s.visualViewport || [], Ut(r) ? r : []) : r, l = t.concat(o);
  return i ? l : l.concat(Fn(o));
}
function Fi(e, t) {
  const n = t.getRootNode == null ? void 0 : t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && ue(n)) {
    let r = t;
    do {
      if (r && e === r)
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Ni(e, t) {
  const n = Et(e, !1, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft;
  return {
    top: r,
    left: i,
    x: i,
    y: r,
    right: i + e.clientWidth,
    bottom: r + e.clientHeight,
    width: e.clientWidth,
    height: e.clientHeight
  };
}
function en(e, t, n) {
  return t === "viewport" ? Yt(Li(e, n)) : Pt(t) ? Ni(t, n) : Yt(Ii(yt(e)));
}
function ji(e) {
  const t = Fn(e), r = ["absolute", "fixed"].includes(jt(e).position) && dt(e) ? re(e) : e;
  return Pt(r) ? t.filter((i) => Pt(i) && Fi(i, r) && gt(i) !== "body") : [];
}
function Hi(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = e;
  const o = [...n === "clippingAncestors" ? ji(t) : [].concat(n), r], l = o[0], a = o.reduce((c, u) => {
    const b = en(t, u, i);
    return c.top = It(b.top, c.top), c.right = Qe(b.right, c.right), c.bottom = Qe(b.bottom, c.bottom), c.left = It(b.left, c.left), c;
  }, en(t, l, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
const Di = {
  getClippingRect: Hi,
  convertOffsetParentRelativeRectToViewportRelativeRect: Vi,
  isElement: Pt,
  getDimensions: tn,
  getOffsetParent: re,
  getDocumentElement: yt,
  getElementRects: (e) => {
    let {
      reference: t,
      floating: n,
      strategy: r
    } = e;
    return {
      reference: Ri(t, re(n), r),
      floating: {
        ...tn(n),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (e) => Array.from(e.getClientRects()),
  isRTL: (e) => jt(e).direction === "rtl"
}, Wi = (e, t, n) => mi(e, t, {
  platform: Di,
  ...n
});
function Yi(e) {
  let t, n, r, i, s, o, l;
  return {
    c() {
      t = S("div"), n = S("slot"), r = H(), i = S("div"), s = q(e[0]), this.c = E, d(i, "role", "tooltip"), d(i, "class", `
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
    `), ut(i, "transform", "translate(" + e[4] + "px, " + e[5] + "px)"), U(i, "invisible", e[3]), d(t, "class", "relative"), d(t, "aria-describedby", "tooltip");
    },
    m(a, c) {
      A(a, t, c), v(t, n), v(t, r), v(t, i), v(i, s), e[9](i), e[10](t), o || (l = [
        B(t, "mouseenter", e[6]),
        B(t, "mouseleave", e[7])
      ], o = !0);
    },
    p(a, [c]) {
      c & 1 && K(s, a[0]), c & 48 && ut(i, "transform", "translate(" + a[4] + "px, " + a[5] + "px)"), c & 8 && U(i, "invisible", a[3]);
    },
    i: E,
    o: E,
    d(a) {
      a && F(t), e[9](null), e[10](null), o = !1, pt(l);
    }
  };
}
function Bi(e, t, n) {
  let { text: r = "" } = t, { location: i = "top" } = t, s, o, l = !0, a = 0, c = 0;
  const u = async () => {
    const m = await Wi(s, o, {
      placement: i,
      middleware: [Ei(), Ci({ padding: 5 }), Si(10)]
    });
    n(4, a = m.x), n(5, c = m.y);
  }, b = async () => {
    await u(), n(3, l = !1);
  }, h = () => {
    n(3, l = !0);
  };
  et();
  function p(m) {
    lt[m ? "unshift" : "push"](() => {
      o = m, n(2, o);
    });
  }
  function g(m) {
    lt[m ? "unshift" : "push"](() => {
      s = m, n(1, s);
    });
  }
  return e.$$set = (m) => {
    "text" in m && n(0, r = m.text), "location" in m && n(8, i = m.location);
  }, [
    r,
    s,
    o,
    l,
    a,
    c,
    b,
    h,
    i,
    p,
    g
  ];
}
class Nn extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Bi, Yi, it, { text: 0, location: 8 }, null), t && (t.target && A(t.target, this, t.anchor), t.props && (this.$set(t.props), x()));
  }
  static get observedAttributes() {
    return ["text", "location"];
  }
  get text() {
    return this.$$.ctx[0];
  }
  set text(t) {
    this.$$set({ text: t }), x();
  }
  get location() {
    return this.$$.ctx[8];
  }
  set location(t) {
    this.$$set({ location: t }), x();
  }
}
customElements.define("v-tooltip", Nn);
const Xi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nn
}, Symbol.toStringTag, { value: "Module" }));
function qi(e) {
  let t;
  return {
    c() {
      t = S("tr"), t.innerHTML = "<slot></slot>", this.c = E, d(t, "class", "border-b");
    },
    m(n, r) {
      A(n, t, r);
    },
    p: E,
    i: E,
    o: E,
    d(n) {
      n && F(t);
    }
  };
}
function Zi(e) {
  return et(), [];
}
class jn extends Q {
  constructor(t) {
    super(), tt(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Zi, qi, it, {}, null), t && t.target && A(t.target, this, t.anchor);
  }
}
customElements.define("v-tr", jn);
const Ui = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jn
}, Symbol.toStringTag, { value: "Module" }));
