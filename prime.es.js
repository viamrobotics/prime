(function() {
  const t = /* @__PURE__ */ new WeakMap(), e = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), b = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), g = /* @__PURE__ */ new WeakMap(), p = { attributes: !0, attributeFilter: ["disabled"] }, v = new MutationObserver((k) => {
    for (const m of k) {
      const h = m.target;
      if (h.constructor.formAssociated) {
        const j = h.hasAttribute("disabled");
        h.toggleAttribute("internals-disabled", j), j ? h.setAttribute("aria-disabled", "true") : h.removeAttribute("aria-disabled"), h.formDisabledCallback && h.formDisabledCallback.apply(h, [j]);
      }
    }
  }), w = (k) => {
    n.get(k).forEach((h) => {
      h.remove();
    }), n.set(k, []);
  }, R = (k, m) => {
    const h = document.createElement("input");
    return h.type = "hidden", h.name = k.getAttribute("name"), k.after(h), n.get(m).push(h), h;
  }, L = (k, m) => {
    n.set(m, []);
    const h = k.hasAttribute("disabled");
    k.toggleAttribute("internals-disabled", h), v.observe(k, p);
  }, T = (k, m) => {
    if (m.length) {
      Array.from(m).forEach((j) => j.addEventListener("click", k.focus.bind(k)));
      let h = m[0].id;
      m[0].id || (h = `${m[0].htmlFor}_Label`, m[0].id = h), k.setAttribute("aria-labelledby", h);
    }
  }, x = (k) => {
    const m = Array.from(k.elements).filter((X) => X.validity).map((X) => X.validity.valid), h = Array.from(l.get(k)).filter((X) => X.isConnected).map((X) => r.get(X).validity.valid), j = [...m, ...h].includes(!1);
    k.toggleAttribute("internals-invalid", j), k.toggleAttribute("internals-valid", !j);
  }, P = (k) => {
    x(N(k.target));
  }, C = (k) => {
    x(N(k.target));
  }, z = (k) => {
    const m = k.target, h = l.get(m);
    m.noValidate || h.size && (Array.from(h).reverse().map((ne) => r.get(ne).reportValidity()).includes(!1) ? (k.stopImmediatePropagation(), k.stopPropagation(), k.preventDefault()) : g.get(m) && g.get(m).call(m, k) === !1 && k.preventDefault());
  }, V = (k) => {
    const m = l.get(k.target);
    m && m.size && m.forEach((h) => {
      h.constructor.formAssociated && h.formResetCallback && h.formResetCallback.apply(h);
    });
  }, y = (k, m, h) => {
    if (m) {
      m.onsubmit && (g.set(m, m.onsubmit.bind(m)), m.onsubmit = null);
      const j = l.get(m);
      if (j)
        j.add(k);
      else {
        const X = /* @__PURE__ */ new Set();
        X.add(k), l.set(m, X), m.addEventListener("submit", z), m.addEventListener("reset", V), m.addEventListener("input", P), m.addEventListener("change", C);
      }
      s.set(m, { ref: k, internals: h }), k.constructor.formAssociated && k.formAssociatedCallback && setTimeout(() => {
        k.formAssociatedCallback.apply(k, [m]);
      }, 0), x(m);
    }
  }, N = (k) => {
    let m = k.parentNode;
    return m && m.tagName !== "FORM" && (m = N(m)), m;
  }, H = (k, m, h = DOMException) => {
    if (!k.constructor.formAssociated)
      throw new h(m);
  }, te = (k, m, h) => {
    const j = l.get(k);
    return j && j.size && j.forEach((X) => {
      r.get(X)[h]() || (m = !1);
    }), m;
  }, F = (k) => {
    if (k.constructor.formAssociated) {
      const m = r.get(k), { labels: h, form: j } = m;
      T(k, h), y(k, j, m);
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
  }, ue = (k, m) => {
    for (let h in Y) {
      m[h] = null;
      let j = null;
      const X = Y[h];
      Object.defineProperty(m, h, {
        get() {
          return j;
        },
        set(ne) {
          j = ne, k.isConnected ? k.setAttribute(X, ne) : c.set(k, m);
        }
      });
    }
  };
  class fe {
    constructor() {
      this.badInput = !1, this.customError = !1, this.patternMismatch = !1, this.rangeOverflow = !1, this.rangeUnderflow = !1, this.stepMismatch = !1, this.tooLong = !1, this.tooShort = !1, this.typeMismatch = !1, this.valid = !0, this.valueMissing = !1, Object.seal(this);
    }
  }
  const ge = (k) => (k.badInput = !1, k.customError = !1, k.patternMismatch = !1, k.rangeOverflow = !1, k.rangeUnderflow = !1, k.stepMismatch = !1, k.tooLong = !1, k.tooShort = !1, k.typeMismatch = !1, k.valid = !0, k.valueMissing = !1, k), ve = (k, m, h) => (k.valid = _e(m), Object.keys(m).forEach((j) => k[j] = m[j]), h && x(h), k), _e = (k) => {
    let m = !0;
    for (let h in k)
      h !== "valid" && k[h] !== !1 && (m = !1);
    return m;
  };
  function me(k) {
    k.forEach((m) => {
      const { addedNodes: h, removedNodes: j } = m, X = Array.from(h), ne = Array.from(j);
      X.forEach((Z) => {
        if (r.has(Z) && Z.constructor.formAssociated) {
          const re = r.get(Z), { form: le } = re;
          y(Z, le, re), T(Z, re.labels);
        }
        if (c.has(Z)) {
          const re = c.get(Z);
          Object.keys(Y).filter((he) => re[he] !== null).forEach((he) => {
            Z.setAttribute(Y[he], re[he]);
          }), c.delete(Z);
        }
      }), ne.forEach((Z) => {
        const re = r.get(Z);
        re && n.get(re) && w(re), o.has(Z) && o.get(Z).disconnect();
      });
    });
  }
  function Se(k) {
    k.forEach((m) => {
      const { removedNodes: h } = m;
      h.forEach((j) => {
        const X = u.get(m.target);
        r.has(j) && F(j), X.disconnect();
      });
    });
  }
  const De = (k) => {
    const m = new MutationObserver(Se);
    m.observe(k, { childList: !0 }), u.set(k, m);
  };
  new MutationObserver(me);
  const Re = {
    childList: !0,
    subtree: !0
  }, Pe = /* @__PURE__ */ new WeakMap();
  class Ce extends Set {
    static get isPolyfilled() {
      return !0;
    }
    constructor(m) {
      if (super(), !m || !m.tagName || m.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      Pe.set(this, m);
    }
    add(m) {
      if (!/^--/.test(m) || typeof m != "string")
        throw new DOMException(`Failed to execute 'add' on 'CustomStateSet': The specified value ${m} must start with '--'.`);
      const h = super.add(m), j = Pe.get(this);
      return j.toggleAttribute(`state${m}`, !0), j.part && j.part.add(`state${m}`), h;
    }
    clear() {
      for (let [m] of this.entries())
        this.delete(m);
      super.clear();
    }
    delete(m) {
      const h = super.delete(m), j = Pe.get(this);
      return j.toggleAttribute(`state${m}`, !1), j.part && j.part.remove(`state${m}`), h;
    }
  }
  class Ae {
    constructor(m) {
      if (!m || !m.tagName || m.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      const h = m.getRootNode(), j = new fe();
      this.states = new Ce(m), t.set(this, m), e.set(this, j), r.set(m, this), ue(m, this), L(m, this), Object.seal(this), F(m), h instanceof DocumentFragment && De(h);
    }
    static get isPolyfilled() {
      return !0;
    }
    checkValidity() {
      const m = t.get(this);
      if (H(m, "Failed to execute 'checkValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const h = e.get(this);
      if (!h.valid) {
        const j = new Event("invalid", {
          bubbles: !1,
          cancelable: !0,
          composed: !1
        });
        m.dispatchEvent(j);
      }
      return h.valid;
    }
    get form() {
      const m = t.get(this);
      H(m, "Failed to read the 'form' property from 'ElementInternals': The target element is not a form-associated custom element.");
      let h;
      return m.constructor.formAssociated === !0 && (h = N(m)), h;
    }
    get labels() {
      const m = t.get(this);
      H(m, "Failed to read the 'labels' property from 'ElementInternals': The target element is not a form-associated custom element.");
      const h = m.getAttribute("id"), j = m.getRootNode();
      return j && h ? j.querySelectorAll(`[for=${h}]`) : [];
    }
    reportValidity() {
      const m = t.get(this);
      if (H(m, "Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const h = this.checkValidity(), j = b.get(this);
      if (j && !m.constructor.formAssociated)
        throw new DOMException("Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element.");
      return !h && j && (m.focus(), j.focus()), h;
    }
    setFormValue(m) {
      const h = t.get(this);
      if (H(h, "Failed to execute 'setFormValue' on 'ElementInternals': The target element is not a form-associated custom element."), w(this), m != null && !(m instanceof FormData)) {
        if (h.getAttribute("name")) {
          const j = R(h, this);
          j.value = m;
        }
      } else
        m != null && m instanceof FormData && m.forEach((j, X) => {
          if (typeof j == "string") {
            const ne = R(h, this);
            ne.name = X, ne.value = j;
          }
        });
      a.set(h, m);
    }
    setValidity(m, h, j) {
      const X = t.get(this);
      if (H(X, "Failed to execute 'setValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !m)
        throw new TypeError("Failed to execute 'setValidity' on 'ElementInternals': 1 argument required, but only 0 present.");
      b.set(this, j);
      const ne = e.get(this), Z = {};
      for (const he in m)
        Z[he] = m[he];
      Object.keys(Z).length === 0 && ge(ne);
      const re = { ...ne, ...Z };
      delete re.valid;
      const { valid: le } = ve(ne, re, this.form);
      if (!le && !h)
        throw new DOMException("Failed to execute 'setValidity' on 'ElementInternals': The second argument should not be empty if one or more flags in the first argument are true.");
      i.set(this, le ? "" : h), X.toggleAttribute("internals-invalid", !le), X.toggleAttribute("internals-valid", le), X.setAttribute("aria-invalid", `${!le}`);
    }
    get shadowRoot() {
      const m = t.get(this), h = f.get(m);
      return h || null;
    }
    get validationMessage() {
      const m = t.get(this);
      return H(m, "Failed to read the 'validationMessage' property from 'ElementInternals': The target element is not a form-associated custom element."), i.get(this);
    }
    get validity() {
      const m = t.get(this);
      return H(m, "Failed to read the 'validity' property from 'ElementInternals': The target element is not a form-associated custom element."), e.get(this);
    }
    get willValidate() {
      const m = t.get(this);
      return H(m, "Failed to read the 'willValidate' property from 'ElementInternals': The target element is not a form-associated custom element."), !(m.disabled || m.hasAttribute("disabled") || m.hasAttribute("readonly"));
    }
  }
  function He() {
    if (!window.ElementInternals)
      return !1;
    class k extends HTMLElement {
      constructor() {
        super(), this.internals = this.attachInternals();
      }
    }
    const m = `element-internals-feature-detection-${Math.random().toString(36).replace(/[^a-z]+/g, "")}`;
    customElements.define(m, k);
    const h = new k();
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
    ].every((j) => j in h.internals);
  }
  if (He()) {
    if (!window.CustomStateSet) {
      window.CustomStateSet = Ce;
      const k = HTMLElement.prototype.attachInternals;
      HTMLElement.prototype.attachInternals = function(...m) {
        const h = k.call(this, m);
        return h.states = new Ce(this), h;
      };
    }
  } else {
    let k = function(...re) {
      const le = j.apply(this, re), he = new MutationObserver(me);
      return f.set(this, le), window.ShadyDOM ? he.observe(this, Re) : he.observe(le, Re), o.set(this, he), le;
    }, m = function(...re) {
      let le = ne.apply(this, re);
      return te(this, le, "checkValidity");
    }, h = function(...re) {
      let le = Z.apply(this, re);
      return te(this, le, "reportValidity");
    };
    var ut = k, ft = m, ct = h;
    window.ElementInternals = Ae, HTMLElement.prototype.attachInternals = function() {
      if (this.tagName.indexOf("-") === -1)
        throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': Unable to attach ElementInternals to non-custom elements.");
      if (r.has(this))
        throw new DOMException("DOMException: Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");
      return new Ae(this);
    };
    const j = Element.prototype.attachShadow;
    Element.prototype.attachShadow = k, new MutationObserver(me).observe(document.documentElement, Re);
    const ne = HTMLFormElement.prototype.checkValidity;
    HTMLFormElement.prototype.checkValidity = m;
    const Z = HTMLFormElement.prototype.reportValidity;
    HTMLFormElement.prototype.reportValidity = h, window.CustomStateSet || (window.CustomStateSet = Ce);
  }
})();
function A() {
}
function yt(t) {
  return t();
}
function Mt() {
  return /* @__PURE__ */ Object.create(null);
}
function pe(t) {
  t.forEach(yt);
}
function vt(t) {
  return typeof t == "function";
}
function Cn(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function oe(t, e) {
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
const An = typeof window < "u";
let Et = An ? () => window.performance.now() : () => Date.now(), On = An ? (t) => requestAnimationFrame(t) : A;
const Le = /* @__PURE__ */ new Set();
function Rn(t) {
  Le.forEach((e) => {
    e.c(t) || (Le.delete(e), e.f());
  }), Le.size !== 0 && On(Rn);
}
function gr(t) {
  let e;
  return Le.size === 0 && On(Rn), {
    promise: new Promise((n) => {
      Le.add(e = { c: t, f: n });
    }),
    abort() {
      Le.delete(e);
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
function ot(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function M(t) {
  return document.createElement(t);
}
function Te(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function U(t) {
  return document.createTextNode(t);
}
function B() {
  return U(" ");
}
function _t() {
  return U("");
}
function W(t, e, n, r) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function Xe(t) {
  return function(e) {
    return e.preventDefault(), t.call(this, e);
  };
}
function et(t) {
  return function(e) {
    return e.stopPropagation(), t.call(this, e);
  };
}
function d(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function de(t, e, n) {
  e in t ? t[e] = typeof t[e] == "boolean" && n === "" ? !0 : n : d(t, e, n);
}
function wr(t) {
  return Array.from(t.childNodes);
}
function K(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function be(t, e, n, r) {
  n === null ? t.style.removeProperty(e) : t.style.setProperty(e, n, r ? "important" : "");
}
function Q(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
function $(t) {
  const e = {};
  for (const n of t)
    e[n.name] = n.value;
  return e;
}
let Ue;
function Be(t) {
  Ue = t;
}
function Fe() {
  if (!Ue)
    throw new Error("Function called outside component initialization");
  return Ue;
}
function yr(t) {
  Fe().$$.on_mount.push(t);
}
function vr(t) {
  Fe().$$.on_destroy.push(t);
}
function dt(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach((r) => r.call(this, e));
}
const We = [], ce = [], $e = [], St = [], _r = Promise.resolve();
let bt = !1;
function kr() {
  bt || (bt = !0, _r.then(E));
}
function mt(t) {
  $e.push(t);
}
const ht = /* @__PURE__ */ new Set();
let Ge = 0;
function E() {
  const t = Ue;
  do {
    for (; Ge < We.length; ) {
      const e = We[Ge];
      Ge++, Be(e), xr(e.$$);
    }
    for (Be(null), We.length = 0, Ge = 0; ce.length; )
      ce.pop()();
    for (let e = 0; e < $e.length; e += 1) {
      const n = $e[e];
      ht.has(n) || (ht.add(n), n());
    }
    $e.length = 0;
  } while (We.length);
  for (; St.length; )
    St.pop()();
  bt = !1, ht.clear(), Be(t);
}
function xr(t) {
  if (t.fragment !== null) {
    t.update(), pe(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(mt);
  }
}
const Mr = /* @__PURE__ */ new Set();
function Pn(t, e) {
  t && t.i && (Mr.delete(t), t.i(e));
}
function Ze(t, e) {
  t.d(1), e.delete(t.key);
}
function Ke(t, e, n, r, i, s, o, l, a, c, f, b) {
  let u = t.length, g = s.length, p = u;
  const v = {};
  for (; p--; )
    v[t[p].key] = p;
  const w = [], R = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Map();
  for (p = g; p--; ) {
    const C = b(i, s, p), z = n(C);
    let V = o.get(z);
    V ? r && V.p(C, e) : (V = c(z, C), V.c()), R.set(z, w[p] = V), z in v && L.set(z, Math.abs(p - v[z]));
  }
  const T = /* @__PURE__ */ new Set(), x = /* @__PURE__ */ new Set();
  function P(C) {
    Pn(C, 1), C.m(l, f), o.set(C.key, C), f = C.first, g--;
  }
  for (; u && g; ) {
    const C = w[g - 1], z = t[u - 1], V = C.key, y = z.key;
    C === z ? (f = C.first, u--, g--) : R.has(y) ? !o.has(V) || T.has(V) ? P(C) : x.has(y) ? u-- : L.get(V) > L.get(y) ? (x.add(V), P(C)) : (T.add(y), u--) : (a(z, o), u--);
  }
  for (; u--; ) {
    const C = t[u];
    R.has(C.key) || a(C, o);
  }
  for (; g; )
    P(w[g - 1]);
  return w;
}
function Er(t, e, n, r) {
  const { fragment: i, on_mount: s, on_destroy: o, after_update: l } = t.$$;
  i && i.m(e, n), r || mt(() => {
    const a = s.map(yt).filter(vt);
    o ? o.push(...a) : pe(a), t.$$.on_mount = [];
  }), l.forEach(mt);
}
function Sr(t, e) {
  const n = t.$$;
  n.fragment !== null && (pe(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Cr(t, e) {
  t.$$.dirty[0] === -1 && (We.push(t), kr(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function ee(t, e, n, r, i, s, o, l = [-1]) {
  const a = Ue;
  Be(t);
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
  let f = !1;
  if (c.ctx = n ? n(t, e.props || {}, (b, u, ...g) => {
    const p = g.length ? g[0] : u;
    return c.ctx && i(c.ctx[b], c.ctx[b] = p) && (!c.skip_bound && c.bound[b] && c.bound[b](p), f && Cr(t, b)), u;
  }) : [], c.update(), f = !0, pe(c.before_update), c.fragment = r ? r(c.ctx) : !1, e.target) {
    if (e.hydrate) {
      const b = wr(e.target);
      c.fragment && c.fragment.l(b), b.forEach(I);
    } else
      c.fragment && c.fragment.c();
    e.intro && Pn(t.$$.fragment), Er(t, e.target, e.anchor, e.customElement), E();
  }
  Be(a);
}
let G;
typeof HTMLElement == "function" && (G = class extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const { on_mount: t } = this.$$;
    this.$$.on_disconnect = t.map(yt).filter(vt);
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
const Tn = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.invisible{visibility:hidden}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.left-0{left:0}.right-0{right:0}.top-1{top:.25rem}.bottom-auto{bottom:auto}.bottom-1{bottom:.25rem}.left-1\\/2{left:50%}.bottom-full{bottom:100%}.-top-0\\.5{top:-.125rem}.-top-0{top:-0px}.top-\\[calc\\(50\\%-9px\\)\\]{top:calc(50% - 9px)}.top-0{top:0}.right-0\\.5{right:.125rem}.bottom-0{bottom:0}.isolate{isolation:isolate}.z-10{z-index:10}.z-\\[2\\]{z-index:2}.z-\\[1\\]{z-index:1}.mx-auto{margin-left:auto;margin-right:auto}.-mt-px{margin-top:-1px}.-mt-0\\.5{margin-top:-.125rem}.-mt-0{margin-top:-0px}.mt-1{margin-top:.25rem}.mt-7{margin-top:1.75rem}.mb-3{margin-bottom:.75rem}.mt-px{margin-top:1px}.ml-px{margin-left:1px}.-mb-px{margin-bottom:-1px}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.hidden{display:none}.h-\\[60\\%\\]{height:60%}.h-full{height:100%}.h-0\\.5{height:.125rem}.h-0{height:0px}.h-5{height:1.25rem}.h-1{height:.25rem}.h-2{height:.5rem}.h-\\[4px\\]{height:4px}.h-4{height:1rem}.max-h-0{max-height:0px}.max-h-fit{max-height:fit-content}.max-h-36{max-height:9rem}.w-px{width:1px}.w-full{width:100%}.w-5{width:1.25rem}.w-\\[1px\\]{width:1px}.w-11{width:2.75rem}.w-4{width:1rem}.max-w-\\[14rem\\]{max-width:14rem}.flex-shrink-0{flex-shrink:0}.grow{flex-grow:1}.table-fixed{table-layout:fixed}.-translate-x-1\\/2{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\.5{--tw-translate-y: -.375rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1{--tw-translate-y: -.25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-1\\/2{--tw-translate-x: 50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-0{--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-6{--tw-translate-x: 1.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-rotate-\\[30deg\\]{--tw-rotate: -30deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-\\[30deg\\]{--tw-rotate: 30deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-180{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.cursor-not-allowed{cursor:not-allowed}.select-none{user-select:none}.appearance-none{appearance:none}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.place-content-center{place-content:center}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-3{gap:.75rem}.gap-2{gap:.5rem}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.text-ellipsis{text-overflow:ellipsis}.whitespace-nowrap{white-space:nowrap}.rounded-full{border-radius:9999px}.rounded-xl{border-radius:.75rem}.border{border-width:1px}.border-0{border-width:0px}.border-y{border-top-width:1px;border-bottom-width:1px}.border-l{border-left-width:1px}.border-l-4{border-left-width:4px}.border-b{border-bottom-width:1px}.border-r{border-right-width:1px}.border-black{--tw-border-opacity: 1;border-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-red\\/90{--tw-border-opacity: 1;border-color:rgb(190 48 38 / var(--tw-border-opacity))}.border-orange\\/90{--tw-border-opacity: 1;border-color:rgb(255 153 0 / var(--tw-border-opacity))}.border-green\\/90{--tw-border-opacity: 1;border-color:rgb(57 127 72 / var(--tw-border-opacity))}.border-blue\\/90{--tw-border-opacity: 1;border-color:rgb(4 86 129 / var(--tw-border-opacity))}.border-black\\/70{--tw-border-opacity: 1;border-color:rgb(85 85 85 / var(--tw-border-opacity))}.border-green\\/100{--tw-border-opacity: 1;border-color:rgb(41 91 51 / var(--tw-border-opacity))}.border-white{--tw-border-opacity: 1;border-color:rgb(255 255 255 / var(--tw-border-opacity))}.border-x-black{--tw-border-opacity: 1;border-left-color:rgb(0 0 0 / var(--tw-border-opacity));border-right-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-b-black{--tw-border-opacity: 1;border-bottom-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-t-black{--tw-border-opacity: 1;border-top-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-b-white{--tw-border-opacity: 1;border-bottom-color:rgb(255 255 255 / var(--tw-border-opacity))}.border-l-gray-300{--tw-border-opacity: 1;border-left-color:rgb(209 213 219 / var(--tw-border-opacity))}.border-r-gray-300{--tw-border-opacity: 1;border-right-color:rgb(209 213 219 / var(--tw-border-opacity))}.bg-green-200{--tw-bg-opacity: 1;background-color:rgb(187 247 208 / var(--tw-bg-opacity))}.bg-orange-200{--tw-bg-opacity: 1;background-color:rgb(254 215 170 / var(--tw-bg-opacity))}.bg-red-200{--tw-bg-opacity: 1;background-color:rgb(254 202 202 / var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}.bg-black\\/50{--tw-bg-opacity: 1;background-color:rgb(157 157 157 / var(--tw-bg-opacity))}.bg-gray-400{--tw-bg-opacity: 1;background-color:rgb(156 163 175 / var(--tw-bg-opacity))}.bg-green\\/80{--tw-bg-opacity: 1;background-color:rgb(73 162 92 / var(--tw-bg-opacity))}.bg-black\\/20{--tw-bg-opacity: 1;background-color:rgb(233 233 233 / var(--tw-bg-opacity))}.bg-red\\/90{--tw-bg-opacity: 1;background-color:rgb(190 48 38 / var(--tw-bg-opacity))}.bg-green\\/90{--tw-bg-opacity: 1;background-color:rgb(57 127 72 / var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-\\[\\#C4C4C4\\]{--tw-bg-opacity: 1;background-color:rgb(196 196 196 / var(--tw-bg-opacity))}.bg-slate-200{--tw-bg-opacity: 1;background-color:rgb(226 232 240 / var(--tw-bg-opacity))}.bg-yellow-100{--tw-bg-opacity: 1;background-color:rgb(254 249 195 / var(--tw-bg-opacity))}.p-3{padding:.75rem}.p-1{padding:.25rem}.p-2{padding:.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-0{padding-top:0;padding-bottom:0}.px-4{padding-left:1rem;padding-right:1rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-1\\.5{padding-left:.375rem;padding-right:.375rem}.px-1{padding-left:.25rem;padding-right:.25rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.pb-1{padding-bottom:.25rem}.pl-2\\.5{padding-left:.625rem}.pr-1{padding-right:.25rem}.pl-2{padding-left:.5rem}.text-left{text-align:left}.text-center{text-align:center}.text-xs{font-size:.75rem;line-height:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-base{font-size:1rem;line-height:1.5rem}.text-\\[15px\\]{font-size:15px}.text-\\[10px\\]{font-size:10px}.font-bold{font-weight:700}.font-normal{font-weight:400}.uppercase{text-transform:uppercase}.capitalize{text-transform:capitalize}.text-green-900{--tw-text-opacity: 1;color:rgb(20 83 45 / var(--tw-text-opacity))}.text-orange-900{--tw-text-opacity: 1;color:rgb(124 45 18 / var(--tw-text-opacity))}.text-red-900{--tw-text-opacity: 1;color:rgb(127 29 29 / var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity))}.text-black{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-black\\/70{--tw-text-opacity: 1;color:rgb(85 85 85 / var(--tw-text-opacity))}.text-red\\/90{--tw-text-opacity: 1;color:rgb(190 48 38 / var(--tw-text-opacity))}.text-neutral-600{--tw-text-opacity: 1;color:rgb(82 82 82 / var(--tw-text-opacity))}.opacity-50{opacity:.5}.opacity-0{opacity:0}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.outline-none{outline:2px solid transparent;outline-offset:2px}.ring-0{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.blur{--tw-blur: blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.drop-shadow-md{--tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / .07)) drop-shadow(0 2px 2px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-200{transition-duration:.2s}.duration-500{transition-duration:.5s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}*,input,button{font-family:Space Mono,monospace}:host{display:contents}:host([hidden]){display:none}[class^=icon-],[class*=" icon-"]{font-family:icons!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-error-outline:before{content:"\\e912"}.icon-warning:before{content:"\\e916"}.icon-disconnected:before{content:"\\e919"}.icon-send:before{content:"\\e91b"}.icon-undo:before{content:"\\e91c"}.icon-connected:before{content:"\\e91a"}.icon-download:before{content:"\\e913"}.icon-camera:before{content:"\\e914"}.icon-center:before{content:"\\e915"}.icon-arrow-up:before{content:"\\e917"}.icon-settings:before{content:"\\e918"}.icon-refresh:before{content:"\\e911"}.icon-info-outline:before{content:"\\e910"}.icon-pause-circle-filled:before{content:"\\e90e"}.icon-play-circle-filled:before{content:"\\e90f"}.icon-logout:before{content:"\\e900"}.icon-instagram:before{content:"\\e901"}.icon-social-medium:before{content:"\\e906"}.icon-copy:before{content:"\\e907"}.icon-save:before{content:"\\e909"}.icon-edit:before{content:"\\e90a";color:#555}.icon-stop-circle:before{content:"\\e903"}.icon-twitter:before{content:"\\e902"}.icon-linkedin:before{content:"\\e90b"}.icon-trash:before{content:"\\e905"}.icon-alert:before{content:"\\e904"}.icon-ask:before{content:"\\e908"}.icon-x:before{content:"\\e942"}.icon-chevron-down:before{content:"\\e90c"}.icon-checkmark:before{content:"\\e90d"}.first\\:ml-4:first-child{margin-left:1rem}.last\\:border-r:last-child{border-right-width:1px}.hover\\:bg-gray-300:hover{--tw-bg-opacity: 1;background-color:rgb(209 213 219 / var(--tw-bg-opacity))}.hover\\:bg-slate-200:hover{--tw-bg-opacity: 1;background-color:rgb(226 232 240 / var(--tw-bg-opacity))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}@media (prefers-reduced-motion: no-preference){.motion-safe\\:transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.motion-safe\\:transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}}
`;
let pt, jn = !1;
try {
  pt = new CSSStyleSheet(), pt.replaceSync(Tn);
} catch {
  jn = !0;
}
const se = () => {
  const t = Fe();
  if (jn) {
    const e = document.createElement("style");
    e.innerHTML = Tn, t.shadowRoot.append(e);
  } else {
    const e = t.shadowRoot;
    e.adoptedStyleSheets = [pt];
  }
}, { base: Ct = "", query: At = "", workers: Wo = {} } = window.PRIME_CONFIG ?? {}, Ar = async () => {
  const t = new FontFace("icons", Ct ? `url(${Ct}/icons.woff2${At})` : `url(icons.woff2${At})`);
  await t.load(), document.fonts.add(t);
}, Or = "0.34.0", Ve = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${Or}`, qe = [], kt = (t, e) => `http://definitions/${t}-${e}.json`, zn = (t = "") => t.split("/").pop(), Rr = (t, e) => {
  for (const n of Object.values(e.properties ?? []))
    n.type === "array" && n.items?.type ? n.description = `"array" of type "${n.items?.type}"` : n.type === "array" ? n.description = '"array" of type "object"' : n.description = `"${n.type}"`;
  return JSON.parse(JSON.stringify(e), (n, r) => {
    if (n === "$ref")
      return kt(t, zn(r));
    if (n !== "$schema")
      return r;
  });
}, Pr = (t, e, n) => {
  const { $ref: r, definitions: i = {} } = e;
  for (const [s, o] of Object.entries(i))
    qe.push({
      uri: kt(t, s),
      schema: Rr(t, o),
      ...zn(r) === s ? { fileMatch: n } : void 0
    });
  window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: !0,
    schemas: qe
  });
}, Tr = (t, e) => qe.findIndex(({ uri: n }) => n === kt(t, e)), jr = (t, e) => {
  let n = !1;
  const { definitions: r = {} } = e;
  for (const i of Object.keys(r)) {
    const s = Tr(t, i);
    qe.splice(s, 1), n = !0;
  }
  !n || window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: !0,
    schemas: qe
  });
}, Ot = {
  addSchemas: Pr,
  removeSchemas: jr
}, ae = (t, e, n) => t.dispatchEvent(new CustomEvent(e, {
  composed: !0,
  bubbles: !0,
  detail: n
})), zr = /\s+|\r?\n|\r/g, Rt = (t) => t.replace(zr, "");
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
function Vr(t) {
  let e, n, r;
  return {
    c() {
      e = M("small"), n = U(t[0]), this.c = A, d(e, "class", r = D("rounded-full px-3 py-0.5 text-xs", {
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
      s & 1 && K(n, i[0]), s & 2 && r !== (r = D("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": i[1] === "green",
        "text-orange-900 bg-orange-200": i[1] === "orange",
        "text-red-900 bg-red-200": i[1] === "red",
        "text-gray-800 bg-gray-200": i[1] === "gray"
      })) && d(e, "class", r);
    },
    i: A,
    o: A,
    d(i) {
      i && I(e);
    }
  };
}
function Lr(t, e, n) {
  let { label: r = "" } = e, { variant: i = "gray" } = e;
  return se(), t.$$set = (s) => {
    "label" in s && n(0, r = s.label), "variant" in s && n(1, i = s.variant);
  }, [r, i];
}
class Ln extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Lr, Vr, oe, { label: 0, variant: 1 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["label", "variant"];
  }
  get label() {
    return this.$$.ctx[0];
  }
  set label(e) {
    this.$$set({ label: e }), E();
  }
  get variant() {
    return this.$$.ctx[1];
  }
  set variant(e) {
    this.$$set({ variant: e }), E();
  }
}
customElements.define("v-badge", Ln);
const Ir = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ln
}, Symbol.toStringTag, { value: "Module" }));
function Pt(t, e, n) {
  const r = t.slice();
  return r[2] = e[n], r[4] = n, r;
}
function Tt(t) {
  let e;
  return {
    c() {
      e = M("div"), e.innerHTML = `<div class="w-px h-[60%] border-l border-black -rotate-[30deg] -mt-px"></div> 
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
function jt(t, e) {
  let n, r = e[2] + "", i, s, o, l = e[4] !== e[0].length - 1 && Tt();
  return {
    key: t,
    first: null,
    c() {
      n = M("small"), i = U(r), s = B(), l && l.c(), o = _t(), d(n, "class", "py1"), this.first = n;
    },
    m(a, c) {
      O(a, n, c), _(n, i), O(a, s, c), l && l.m(a, c), O(a, o, c);
    },
    p(a, c) {
      e = a, c & 1 && r !== (r = e[2] + "") && K(i, r), e[4] !== e[0].length - 1 ? l || (l = Tt(), l.c(), l.m(o.parentNode, o)) : l && (l.d(1), l = null);
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
    r.set(a, n[o] = jt(a, l));
  }
  return {
    c() {
      e = M("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
      this.c = A, d(e, "class", "inline-flex gap-3 px-4 border border-black rounded-full");
    },
    m(o, l) {
      O(o, e, l);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
    },
    p(o, [l]) {
      l & 1 && (i = o[0], n = Ke(n, l, s, 1, o, i, r, e, Ze, jt, null, Pt));
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
  se();
  let i;
  return t.$$set = (s) => {
    "crumbs" in s && n(1, r = s.crumbs);
  }, t.$$.update = () => {
    t.$$.dirty & 2 && n(0, i = r.split(",").map((s) => s.trim()));
  }, [i, r];
}
class In extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Fr, Nr, oe, { crumbs: 1 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["crumbs"];
  }
  get crumbs() {
    return this.$$.ctx[1];
  }
  set crumbs(e) {
    this.$$set({ crumbs: e }), E();
  }
}
customElements.define("v-breadcrumbs", In);
const Dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: In
}, Symbol.toStringTag, { value: "Module" })), xe = (t, e) => t === "" || t === "true" || t === e;
function zt(t) {
  let e, n;
  return {
    c() {
      e = M("i"), d(e, "aria-hidden", ""), d(e, "class", n = "icon-" + t[3] + " text-base");
    },
    m(r, i) {
      O(r, e, i);
    },
    p(r, i) {
      i & 8 && n !== (n = "icon-" + r[3] + " text-base") && d(e, "class", n);
    },
    d(r) {
      r && I(e);
    }
  };
}
function Hr(t) {
  let e, n, r, i, s, o, l, a = t[3] && zt(t);
  return {
    c() {
      e = M("button"), a && a.c(), n = B(), r = M("span"), i = U(t[2]), this.c = A, d(r, "class", "mx-auto"), d(e, "type", t[0]), d(e, "class", s = D("flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": t[4],
        "bg-white border-black": t[1] === "primary",
        "bg-black border-white text-white": t[1] === "inverse-primary",
        "bg-red/90 text-white border-red/90": t[1] === "danger",
        "bg-green/90 border-green/90 text-white": t[1] === "success",
        "bg-white border-red/90 text-red/90": t[1] === "outline-danger"
      }));
    },
    m(c, f) {
      O(c, e, f), a && a.m(e, null), _(e, n), _(e, r), _(r, i), o || (l = W(e, "click", t[5]), o = !0);
    },
    p(c, [f]) {
      c[3] ? a ? a.p(c, f) : (a = zt(c), a.c(), a.m(e, n)) : a && (a.d(1), a = null), f & 4 && K(i, c[2]), f & 1 && d(e, "type", c[0]), f & 18 && s !== (s = D("flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": c[4],
        "bg-white border-black": c[1] === "primary",
        "bg-black border-white text-white": c[1] === "inverse-primary",
        "bg-red/90 text-white border-red/90": c[1] === "danger",
        "bg-green/90 border-green/90 text-white": c[1] === "success",
        "bg-white border-red/90 text-red/90": c[1] === "outline-danger"
      })) && d(e, "class", s);
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
  se();
  const f = Fe().attachInternals(), b = () => {
    const { form: u } = f;
    u?.requestSubmit ? u.requestSubmit() : u?.submit();
  };
  return t.$$set = (u) => {
    "disabled" in u && n(6, r = u.disabled), "type" in u && n(0, i = u.type), "variant" in u && n(1, s = u.variant), "label" in u && n(2, o = u.label), "icon" in u && n(3, l = u.icon);
  }, t.$$.update = () => {
    t.$$.dirty & 64 && n(4, a = xe(r, "disabled"));
  }, [i, s, o, l, a, b, r];
}
class Br extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Wr, Hr, oe, {
      disabled: 6,
      type: 0,
      variant: 1,
      label: 2,
      icon: 3
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["disabled", "type", "variant", "label", "icon"];
  }
  get disabled() {
    return this.$$.ctx[6];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), E();
  }
  get type() {
    return this.$$.ctx[0];
  }
  set type(e) {
    this.$$set({ type: e }), E();
  }
  get variant() {
    return this.$$.ctx[1];
  }
  set variant(e) {
    this.$$set({ variant: e }), E();
  }
  get label() {
    return this.$$.ctx[2];
  }
  set label(e) {
    this.$$set({ label: e }), E();
  }
  get icon() {
    return this.$$.ctx[3];
  }
  set icon(e) {
    this.$$set({ icon: e }), E();
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
let Qe = "uninitialized";
const Vt = /* @__PURE__ */ new Set(), Ur = (t) => {
  if (Qe === "loaded")
    return t(window.monaco);
  if (Vt.add(t), Qe === "loading")
    return;
  Qe = "loading";
  const e = URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = {
      baseUrl: '${Ve}/min/'
    };
    importScripts('${Ve}/min/vs/base/worker/workerMain.js');
    importScripts('${Ve}/min/vs/language/json/jsonWorker.js');
  `], { type: "text/javascript" })), n = () => {
    window.require.config({ paths: { vs: `${Ve}/min/vs` } }), window.MonacoEnvironment = { getWorkerUrl: () => e }, window.require(["vs/editor/editor.main"], () => {
      for (const r of Vt)
        r(window.monaco);
      Qe = "loaded";
    });
  };
  {
    const r = document.createElement("script");
    r.addEventListener("load", n), r.async = !0, r.src = `${Ve}/min/vs/loader.js`, document.head.append(r);
  }
}, qr = (t, e, n) => t <= e ? e : t >= n ? n : t, tt = (t, e, n, r) => {
  const i = (t - e) / (n - e) * 100;
  return Number.isNaN(i) || i <= 0 ? 0 : i >= 100 ? 100 : Number.parseFloat(i.toFixed(r));
}, Lt = (t) => {
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
      e = M("div"), this.c = A, d(e, "class", "w-full h-full relative isolate");
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
  let { value: r = "" } = e, { previous: i = "" } = e, { language: s } = e, { theme: o = "vs" } = e, { readonly: l = "false" } = e, { minimap: a = "false" } = e, { schema: c = "" } = e, { variant: f = "default" } = e, b, u, g, p, v, w, R;
  se();
  const L = document.createElement("link");
  L.rel = "stylesheet", L.href = `${Ve}/min/vs/editor/editor.main.min.css`, Fe().shadowRoot.append(L);
  const x = () => {
    if (!w)
      return;
    w.getModel()?.dispose();
    let Y;
    if (g) {
      const ue = String(Lt(c)), fe = `http://${ue}.json/`, ge = window.monaco.Uri.parse(fe);
      Ot.removeSchemas(ue, g), Ot.addSchemas(ue, g, [ge.toString()]), Y = window.monaco.editor.createModel(r, s, ge);
    } else
      Y = window.monaco.editor.createModel(r, s);
    ae(p, "update-model", { model: Y }), w.setModel(Y);
  }, P = () => {
    const F = v?.getModel();
    F?.modified.dispose(), F?.original.dispose(), v.setModel({
      original: window.monaco.editor.createModel(i, "json"),
      modified: window.monaco.editor.createModel(r, "json")
    });
  }, C = (F) => {
    F instanceof InputEvent && (F.preventDefault(), F.stopImmediatePropagation());
  }, z = () => ({
    value: r,
    language: s,
    theme: o,
    readOnly: b,
    minimap: { enabled: u },
    scrollbar: {
      verticalScrollbarSize: 3,
      horizontalScrollbarSize: 3,
      vertical: "auto",
      horizontal: "auto",
      alwaysConsumeMouseWheel: !1
    },
    scrollBeyondLastLine: !1
  }), V = () => {
    n(10, v = window.monaco.editor.createDiffEditor(p, { ...z(), readOnly: !0 })), v.setModel({
      original: window.monaco.editor.createModel(i, s),
      modified: window.monaco.editor.createModel(r, s)
    });
  }, y = (F) => {
    if (f === "diff")
      return V();
    n(11, w = F.editor.create(p, z())), w.onDidChangeModelContent(() => {
      ae(p, "input", { value: w?.getValue() });
    }), w.onDidBlurEditorWidget(() => {
      ae(p, "blur", { value: w?.getValue() }), N();
    }), w.layout(), x(), N();
  }, N = () => {
    const F = window.monaco.editor.getModelMarkers({}), Y = Lt(c), ue = F.filter((fe) => fe.resource.authority === `${Y}.json`);
    ae(p, "markers", { markers: ue });
  }, H = () => {
    if (!R && w && (R = new ResizeObserver(() => {
      w?.layout();
    })), R) {
      const F = w?.getDomNode() ?? p;
      R.observe(F);
    }
  };
  yr(() => {
    Ur(y);
  }), vr(() => {
    w?.getModel()?.dispose(), v?.dispose(), w?.dispose(), R.disconnect();
    const Y = w?.getDomNode() ?? p;
    ae(Y, "destroy");
  });
  function te(F) {
    ce[F ? "unshift" : "push"](() => {
      p = F, n(0, p);
    });
  }
  return t.$$set = (F) => {
    "value" in F && n(2, r = F.value), "previous" in F && n(3, i = F.previous), "language" in F && n(4, s = F.language), "theme" in F && n(5, o = F.theme), "readonly" in F && n(6, l = F.readonly), "minimap" in F && n(7, a = F.minimap), "schema" in F && n(8, c = F.schema), "variant" in F && n(9, f = F.variant);
  }, t.$$.update = () => {
    if (t.$$.dirty & 256 && (g = c ? JSON.parse(c) : void 0), t.$$.dirty & 64 && (b = xe(l, "readonly")), t.$$.dirty & 128 && (u = xe(a, "minimap")), t.$$.dirty & 3076) {
      if (v)
        P(), H();
      else if (w) {
        x();
        const F = w?.getValue() ?? "";
        if (r !== void 0) {
          const Y = Rt(r);
          Rt(F) !== Y && (w?.setValue(r), w?.layout());
        }
        H();
      }
    }
  }, [
    p,
    C,
    r,
    i,
    s,
    o,
    l,
    a,
    c,
    f,
    v,
    w,
    te
  ];
}
class Nn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Kr, Zr, oe, {
      value: 2,
      previous: 3,
      language: 4,
      theme: 5,
      readonly: 6,
      minimap: 7,
      schema: 8,
      variant: 9
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
    this.$$set({ value: e }), E();
  }
  get previous() {
    return this.$$.ctx[3];
  }
  set previous(e) {
    this.$$set({ previous: e }), E();
  }
  get language() {
    return this.$$.ctx[4];
  }
  set language(e) {
    this.$$set({ language: e }), E();
  }
  get theme() {
    return this.$$.ctx[5];
  }
  set theme(e) {
    this.$$set({ theme: e }), E();
  }
  get readonly() {
    return this.$$.ctx[6];
  }
  set readonly(e) {
    this.$$set({ readonly: e }), E();
  }
  get minimap() {
    return this.$$.ctx[7];
  }
  set minimap(e) {
    this.$$set({ minimap: e }), E();
  }
  get schema() {
    return this.$$.ctx[8];
  }
  set schema(e) {
    this.$$set({ schema: e }), E();
  }
  get variant() {
    return this.$$.ctx[9];
  }
  set variant(e) {
    this.$$set({ variant: e }), E();
  }
}
customElements.define("v-code-editor", Nn);
const Jr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nn
}, Symbol.toStringTag, { value: "Module" }));
function It(t) {
  let e, n;
  return {
    c() {
      e = M("h2"), n = U(t[1]), d(e, "class", "text-sm");
    },
    m(r, i) {
      O(r, e, i), _(e, n);
    },
    p(r, i) {
      i & 2 && K(n, r[1]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function Gr(t) {
  let e, n, r, i, s, o, l, a, c, f, b, u, g, p, v, w, R, L, T = t[1] && It(t);
  return {
    c() {
      e = M("div"), n = M("div"), r = M("div"), T && T.c(), i = B(), s = M("slot"), o = B(), l = M("div"), a = M("slot"), c = B(), f = Te("svg"), b = Te("polyline"), g = B(), p = M("div"), v = M("slot"), this.c = A, d(s, "name", "title"), d(r, "class", "flex items-center gap-2"), d(a, "name", "header"), d(b, "points", "6 9 12 15 18 9"), d(f, "class", u = D("transition-transform duration-200", {
        "rotate-0": !t[0],
        "rotate-180": t[0]
      })), d(f, "width", "24"), d(f, "height", "24"), d(f, "viewBox", "0 0 24 24"), d(f, "stroke", "currentColor"), d(f, "stroke-linejoin", "round"), d(f, "stroke-linecap", "round"), d(f, "fill", "none"), d(l, "class", "h-full flex items-center gap-3"), d(n, "class", "w-full py-1.5 px-4 flex items-center justify-between border text-black border-black bg-white cursor-pointer"), d(p, "class", w = D("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !t[0],
        "max-h-fit": t[0]
      })), d(e, "class", "relative w-full overflow-hidden");
    },
    m(x, P) {
      O(x, e, P), _(e, n), _(n, r), T && T.m(r, null), _(r, i), _(r, s), _(n, o), _(n, l), _(l, a), _(l, c), _(l, f), _(f, b), _(e, g), _(e, p), _(p, v), t[4](e), R || (L = W(n, "click", t[3]), R = !0);
    },
    p(x, [P]) {
      x[1] ? T ? T.p(x, P) : (T = It(x), T.c(), T.m(r, i)) : T && (T.d(1), T = null), P & 1 && u !== (u = D("transition-transform duration-200", {
        "rotate-0": !x[0],
        "rotate-180": x[0]
      })) && d(f, "class", u), P & 1 && w !== (w = D("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !x[0],
        "max-h-fit": x[0]
      })) && d(p, "class", w);
    },
    i: A,
    o: A,
    d(x) {
      x && I(e), T && T.d(), t[4](null), R = !1, L();
    }
  };
}
function Qr(t, e, n) {
  let { title: r = "" } = e, { open: i = !1 } = e, s;
  se();
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
class Fn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Qr, Gr, oe, { title: 1, open: 0 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["title", "open"];
  }
  get title() {
    return this.$$.ctx[1];
  }
  set title(e) {
    this.$$set({ title: e }), E();
  }
  get open() {
    return this.$$.ctx[0];
  }
  set open(e) {
    this.$$set({ open: e }), E();
  }
}
customElements.define("v-collapse", Fn);
const $r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fn
}, Symbol.toStringTag, { value: "Module" }));
function ei(t) {
  let e, n, r, i, s, o, l, a;
  return {
    c() {
      e = M("div"), n = M("div"), n.innerHTML = '<slot name="target"></slot>', r = B(), i = M("div"), s = M("slot"), this.c = A, d(n, "class", "inline-block w-full"), d(s, "name", "content"), d(i, "class", o = D("absolute z-10", {
        "left-0": t[1],
        "right-0": t[1],
        "overflow-hidden": t[1],
        invisible: !t[2]
      })), d(e, "class", "relative inline-block w-full");
    },
    m(c, f) {
      O(c, e, f), _(e, n), _(e, r), _(e, i), _(i, s), t[6](e), l || (a = W(n, "click", t[3]), l = !0);
    },
    p(c, [f]) {
      f & 6 && o !== (o = D("absolute z-10", {
        "left-0": c[1],
        "right-0": c[1],
        "overflow-hidden": c[1],
        invisible: !c[2]
      })) && d(i, "class", o);
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
  se();
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
    t.$$.dirty & 32 && n(1, o = xe(i, "match")), t.$$.dirty & 16 && n(2, l = xe(r, "open"));
  }, [s, o, l, a, r, i, c];
}
class Dn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ti, ei, oe, { open: 4, match: 5 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["open", "match"];
  }
  get open() {
    return this.$$.ctx[4];
  }
  set open(e) {
    this.$$set({ open: e }), E();
  }
  get match() {
    return this.$$.ctx[5];
  }
  set match(e) {
    this.$$set({ match: e }), E();
  }
}
customElements.define("v-dropdown", Dn);
const ni = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dn
}, Symbol.toStringTag, { value: "Module" }));
function ri(t) {
  let e, n;
  return {
    c() {
      e = M("i"), this.c = A, d(e, "aria-hidden", ""), d(e, "class", n = "icon-" + t[0] + " text-" + t[1]);
    },
    m(r, i) {
      O(r, e, i);
    },
    p(r, [i]) {
      i & 3 && n !== (n = "icon-" + r[0] + " text-" + r[1]) && d(e, "class", n);
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
  return se(), t.$$set = (s) => {
    "name" in s && n(0, r = s.name), "size" in s && n(1, i = s.size);
  }, [r, i];
}
class Hn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ii, ri, oe, { name: 0, size: 1 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["name", "size"];
  }
  get name() {
    return this.$$.ctx[0];
  }
  set name(e) {
    this.$$set({ name: e }), E();
  }
  get size() {
    return this.$$.ctx[1];
  }
  set size(e) {
    this.$$set({ size: e }), E();
  }
}
customElements.define("v-icon", Hn);
const oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hn
}, Symbol.toStringTag, { value: "Module" }));
function si(t) {
  let e;
  return {
    c() {
      e = M("v-code-editor"), this.c = A, de(e, "value", t[2]), de(e, "theme", t[0]), de(e, "schema", t[1]), de(e, "minimap", t[3]), de(e, "language", "json");
    },
    m(n, r) {
      O(n, e, r);
    },
    p(n, [r]) {
      r & 4 && de(e, "value", n[2]), r & 1 && de(e, "theme", n[0]), r & 2 && de(e, "schema", n[1]), r & 8 && de(e, "minimap", n[3]);
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
class Wn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, li, si, oe, {
      theme: 0,
      schema: 1,
      value: 2,
      minimap: 3
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["theme", "schema", "value", "minimap"];
  }
  get theme() {
    return this.$$.ctx[0];
  }
  set theme(e) {
    this.$$set({ theme: e }), E();
  }
  get schema() {
    return this.$$.ctx[1];
  }
  set schema(e) {
    this.$$set({ schema: e }), E();
  }
  get value() {
    return this.$$.ctx[2];
  }
  set value(e) {
    this.$$set({ value: e }), E();
  }
  get minimap() {
    return this.$$.ctx[3];
  }
  set minimap(e) {
    this.$$set({ minimap: e }), E();
  }
}
customElements.define("v-json-editor", Wn);
const ai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wn
}, Symbol.toStringTag, { value: "Module" }));
function Nt(t) {
  let e, n, r;
  return {
    c() {
      e = M("p"), n = U(t[3]), d(e, "class", r = D("text-xs", {
        "inline whitespace-nowrap": t[6] === "left"
      }));
    },
    m(i, s) {
      O(i, e, s), _(e, n);
    },
    p(i, s) {
      s & 8 && K(n, i[3]), s & 64 && r !== (r = D("text-xs", {
        "inline whitespace-nowrap": i[6] === "left"
      })) && d(e, "class", r);
    },
    d(i) {
      i && I(e);
    }
  };
}
function Ft(t) {
  let e, n, r, i, s, o, l, a;
  return {
    c() {
      e = M("div"), n = M("button"), i = B(), s = M("button"), d(n, "aria-label", r = "Increment up by " + t[10]), d(n, "class", "icon-chevron-down rotate-180 text-[15px]"), d(s, "aria-label", o = "Increment down by " + t[10]), d(s, "class", "icon-chevron-down text-[15px]"), d(e, "class", "absolute right-0.5 bottom-0 cursor-pointer select-none flex flex-col");
    },
    m(c, f) {
      O(c, e, f), _(e, n), _(e, i), _(e, s), l || (a = [
        W(n, "click", t[16]),
        W(s, "click", t[17])
      ], l = !0);
    },
    p(c, f) {
      f & 1024 && r !== (r = "Increment up by " + c[10]) && d(n, "aria-label", r), f & 1024 && o !== (o = "Increment down by " + c[10]) && d(s, "aria-label", o);
    },
    d(c) {
      c && I(e), l = !1, pe(a);
    }
  };
}
function ci(t) {
  let e, n, r, i, s, o, l, a, c, f, b = t[3] && Nt(t), u = (t[1] === "number" || t[1] === "integer") && Ft(t);
  return {
    c() {
      e = M("label"), b && b.c(), n = B(), r = M("input"), l = B(), u && u.c(), this.c = A, d(r, "type", i = t[1] === "integer" ? "number" : t[1]), d(r, "placeholder", t[2]), d(r, "name", t[5]), r.value = t[0], d(r, "pattern", s = t[1] === "integer" ? "[0-9]*" : void 0), r.readOnly = t[9], d(r, "class", "w-full py-1.5 px-2.5 border text-xs border-black bg-white outline-none appearance-none"), d(r, "step", o = t[11] ? t[4] : null), d(e, "class", a = D("relative flex gap-1 max-w-[14rem]", {
        "flex-col": t[6] === "top",
        "items-center": t[6] === "left"
      }));
    },
    m(g, p) {
      O(g, e, p), b && b.m(e, null), _(e, n), _(e, r), t[15](r), _(e, l), u && u.m(e, null), t[18](e), c || (f = W(r, "input", t[12]), c = !0);
    },
    p(g, [p]) {
      g[3] ? b ? b.p(g, p) : (b = Nt(g), b.c(), b.m(e, n)) : b && (b.d(1), b = null), p & 2 && i !== (i = g[1] === "integer" ? "number" : g[1]) && d(r, "type", i), p & 4 && d(r, "placeholder", g[2]), p & 32 && d(r, "name", g[5]), p & 1 && r.value !== g[0] && (r.value = g[0]), p & 2 && s !== (s = g[1] === "integer" ? "[0-9]*" : void 0) && d(r, "pattern", s), p & 512 && (r.readOnly = g[9]), p & 2064 && o !== (o = g[11] ? g[4] : null) && d(r, "step", o), g[1] === "number" || g[1] === "integer" ? u ? u.p(g, p) : (u = Ft(g), u.c(), u.m(e, null)) : u && (u.d(1), u = null), p & 64 && a !== (a = D("relative flex gap-1 max-w-[14rem]", {
        "flex-col": g[6] === "top",
        "items-center": g[6] === "left"
      })) && d(e, "class", a);
    },
    i: A,
    o: A,
    d(g) {
      g && I(e), b && b.d(), t[15](null), u && u.d(), t[18](null), c = !1, f();
    }
  };
}
function ui(t, e, n) {
  const i = Fe().attachInternals();
  let { type: s = "text" } = e, { placeholder: o = "" } = e, { readonly: l = "false" } = e, { label: a = "" } = e, { value: c = "" } = e, { step: f = "1" } = e, { name: b = "" } = e, { labelposition: u = "top" } = e, g, p, v, w, R, L;
  se();
  const T = (y) => {
    y.preventDefault(), y.stopImmediatePropagation(), n(0, c = p.value), i.setFormValue(c), ae(g, "input", { value: c });
  }, x = (y) => {
    const N = Number.parseFloat(c || "0"), H = String(c).split(".").pop()?.length ?? 0;
    s === "number" ? n(0, c = n(8, p.value = (N + R * y).toFixed(Math.max(v, H)), p)) : s === "integer" && n(0, c = n(8, p.value = String(Math.round(N + R * y)), p)), i.setFormValue(c), ae(g, "input", { value: c });
  };
  function P(y) {
    ce[y ? "unshift" : "push"](() => {
      p = y, n(8, p);
    });
  }
  const C = () => x(1), z = () => x(-1);
  function V(y) {
    ce[y ? "unshift" : "push"](() => {
      g = y, n(7, g);
    });
  }
  return t.$$set = (y) => {
    "type" in y && n(1, s = y.type), "placeholder" in y && n(2, o = y.placeholder), "readonly" in y && n(14, l = y.readonly), "label" in y && n(3, a = y.label), "value" in y && n(0, c = y.value), "step" in y && n(4, f = y.step), "name" in y && n(5, b = y.name), "labelposition" in y && n(6, u = y.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 16 && (v = String(f).split(".").pop()?.length ?? 0), t.$$.dirty & 16384 && n(9, w = xe(l, "readonly")), t.$$.dirty & 16 && n(10, R = Number.parseFloat(f)), t.$$.dirty & 2 && n(11, L = s === "time" || s === "number");
  }, [
    c,
    s,
    o,
    a,
    f,
    b,
    u,
    g,
    p,
    w,
    R,
    L,
    T,
    x,
    l,
    P,
    C,
    z,
    V
  ];
}
class fi extends G {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}</style>", ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ui, ci, oe, {
      type: 1,
      placeholder: 2,
      readonly: 14,
      label: 3,
      value: 0,
      step: 4,
      name: 5,
      labelposition: 6
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
    this.$$set({ type: e }), E();
  }
  get placeholder() {
    return this.$$.ctx[2];
  }
  set placeholder(e) {
    this.$$set({ placeholder: e }), E();
  }
  get readonly() {
    return this.$$.ctx[14];
  }
  set readonly(e) {
    this.$$set({ readonly: e }), E();
  }
  get label() {
    return this.$$.ctx[3];
  }
  set label(e) {
    this.$$set({ label: e }), E();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), E();
  }
  get step() {
    return this.$$.ctx[4];
  }
  set step(e) {
    this.$$set({ step: e }), E();
  }
  get name() {
    return this.$$.ctx[5];
  }
  set name(e) {
    this.$$set({ name: e }), E();
  }
  get labelposition() {
    return this.$$.ctx[6];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), E();
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
      e = Te("path"), d(e, "d", "M6.33 3.66667H7.66666V5H6.33333V3.66667ZM6.33 6.33333H7.66666V10.3333H6.33333V6.33333ZM7 0.333334C3.31999 0.333334 0.333328 3.32 0.333328 7C0.333328 10.68 3.31999 13.6667 7 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.32 10.68 0.333334 7 0.333334ZM7 12.3333C4.06 12.3333 1.66666 9.94 1.66666 7C1.66666 4.06 4.06 1.66667 7 1.66667C9.93999 1.66667 12.3333 4.06 12.3333 7C12.3333 9.94 9.93999 12.3333 7 12.3333Z"), d(e, "fill", "#045681");
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
      e = Te("path"), d(e, "d", "M4 7.78L1.22 5L0.273331 5.94L4 9.66667L12 1.66667L11.06 0.726665L4 7.78Z"), d(e, "fill", "#397F48");
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
      e = Te("path"), d(e, "d", "M8 2.99333L13.02 11.6667H2.98L8 2.99333ZM8 0.333328L0.666672 13H15.3333L8 0.333328ZM8.66667 9.66666H7.33334V11H8.66667V9.66666ZM8.66667 5.66666H7.33334V8.33333H8.66667V5.66666Z"), d(e, "fill", "#FF9900");
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
      e = Te("path"), d(e, "d", "M6.33 9H7.66666V10.3333H6.33333V9ZM6.33 3.66666H7.66666V7.66666H6.33333V3.66666ZM6.99333 0.333328C3.31333 0.333328 0.333328 3.31999 0.333328 7C0.333328 10.68 3.31333 13.6667 6.99333 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.31999 10.68 0.333328 6.99333 0.333328ZM7 12.3333C4.05333 12.3333 1.66666 9.94666 1.66666 7C1.66666 4.05333 4.05333 1.66666 7 1.66666C9.94666 1.66666 12.3333 4.05333 12.3333 7C12.3333 9.94666 9.94666 12.3333 7 12.3333Z"), d(e, "fill", "#BE3026");
    },
    m(n, r) {
      O(n, e, r);
    },
    d(n) {
      n && I(e);
    }
  };
}
function Dt(t) {
  let e, n;
  return {
    c() {
      e = M("p"), n = U(t[1]), d(e, "class", "text-xs");
    },
    m(r, i) {
      O(r, e, i), _(e, n);
    },
    p(r, i) {
      i & 2 && K(n, r[1]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function wi(t) {
  let e, n, r, i, s, o, l, a, c;
  function f(p, v) {
    if (p[2] === "error")
      return gi;
    if (p[2] === "warning")
      return pi;
    if (p[2] === "success")
      return mi;
    if (p[2] === "info")
      return bi;
  }
  let b = f(t), u = b && b(t), g = t[1] && Dt(t);
  return {
    c() {
      e = M("div"), n = M("div"), r = Te("svg"), u && u.c(), i = B(), s = M("figure"), o = M("figcaption"), l = U(t[0]), a = B(), g && g.c(), this.c = A, d(r, "width", "14"), d(r, "height", "14"), d(r, "viewBox", "0 0 15 15"), d(r, "fill", "none"), d(r, "xmlns", "http://www.w3.org/2000/svg"), d(n, "class", "mt-1"), d(o, "class", "text-sm"), d(e, "class", c = D("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": t[3] === "gray",
        "bg-white": t[3] === "white",
        "border-red/90": t[2] === "error",
        "border-orange/90": t[2] === "warning",
        "border-green/90": t[2] === "success",
        "border-blue/90": t[2] === "info"
      }));
    },
    m(p, v) {
      O(p, e, v), _(e, n), _(n, r), u && u.m(r, null), _(e, i), _(e, s), _(s, o), _(o, l), _(s, a), g && g.m(s, null);
    },
    p(p, [v]) {
      b !== (b = f(p)) && (u && u.d(1), u = b && b(p), u && (u.c(), u.m(r, null))), v & 1 && K(l, p[0]), p[1] ? g ? g.p(p, v) : (g = Dt(p), g.c(), g.m(s, null)) : g && (g.d(1), g = null), v & 12 && c !== (c = D("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": p[3] === "gray",
        "bg-white": p[3] === "white",
        "border-red/90": p[2] === "error",
        "border-orange/90": p[2] === "warning",
        "border-green/90": p[2] === "success",
        "border-blue/90": p[2] === "info"
      })) && d(e, "class", c);
    },
    i: A,
    o: A,
    d(p) {
      p && I(e), u && u.d(), g && g.d();
    }
  };
}
function yi(t, e, n) {
  let { title: r = "" } = e, { message: i = "" } = e, { variant: s = "info" } = e, { background: o = "gray" } = e;
  return se(), t.$$set = (l) => {
    "title" in l && n(0, r = l.title), "message" in l && n(1, i = l.message), "variant" in l && n(2, s = l.variant), "background" in l && n(3, o = l.background);
  }, [r, i, s, o];
}
class Bn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, yi, wi, oe, {
      title: 0,
      message: 1,
      variant: 2,
      background: 3
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["title", "message", "variant", "background"];
  }
  get title() {
    return this.$$.ctx[0];
  }
  set title(e) {
    this.$$set({ title: e }), E();
  }
  get message() {
    return this.$$.ctx[1];
  }
  set message(e) {
    this.$$set({ message: e }), E();
  }
  get variant() {
    return this.$$.ctx[2];
  }
  set variant(e) {
    this.$$set({ variant: e }), E();
  }
  get background() {
    return this.$$.ctx[3];
  }
  set background(e) {
    this.$$set({ background: e }), E();
  }
}
customElements.define("v-notify", Bn);
const vi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bn
}, Symbol.toStringTag, { value: "Module" }));
function Ht(t, e, n) {
  const r = t.slice();
  return r[9] = e[n], r;
}
function Wt(t) {
  let e, n, r;
  return {
    c() {
      e = M("p"), n = U(t[1]), d(e, "class", r = D("text-xs", {
        "pb-1": t[2] === "top",
        inline: t[2] === "left"
      }));
    },
    m(i, s) {
      O(i, e, s), _(e, n);
    },
    p(i, s) {
      s & 2 && K(n, i[1]), s & 4 && r !== (r = D("text-xs", {
        "pb-1": i[2] === "top",
        inline: i[2] === "left"
      })) && d(e, "class", r);
    },
    d(i) {
      i && I(e);
    }
  };
}
function Bt(t) {
  let e, n = t[9] + "", r, i, s, o, l;
  function a() {
    return t[8](t[9]);
  }
  return {
    c() {
      e = M("button"), r = U(n), i = B(), d(e, "class", s = D("border-y border-l last:border-r border-black px-2 py-1 text-sm", {
        "bg-white": t[9] !== t[0],
        "bg-black text-white": t[9] === t[0]
      }));
    },
    m(c, f) {
      O(c, e, f), _(e, r), _(e, i), t[7](e), o || (l = W(e, "click", a), o = !0);
    },
    p(c, f) {
      t = c, f & 16 && n !== (n = t[9] + "") && K(r, n), f & 17 && s !== (s = D("border-y border-l last:border-r border-black px-2 py-1 text-sm", {
        "bg-white": t[9] !== t[0],
        "bg-black text-white": t[9] === t[0]
      })) && d(e, "class", s);
    },
    d(c) {
      c && I(e), t[7](null), o = !1, l();
    }
  };
}
function _i(t) {
  let e, n, r = t[1] && Wt(t), i = t[4], s = [];
  for (let o = 0; o < i.length; o += 1)
    s[o] = Bt(Ht(t, i, o));
  return {
    c() {
      e = M("label"), r && r.c(), n = B();
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
      if (o[1] ? r ? r.p(o, l) : (r = Wt(o), r.c(), r.m(e, n)) : r && (r.d(1), r = null), l & 57) {
        i = o[4];
        let a;
        for (a = 0; a < i.length; a += 1) {
          const c = Ht(o, i, a);
          s[a] ? s[a].p(c, l) : (s[a] = Bt(c), s[a].c(), s[a].m(e, null));
        }
        for (; a < s.length; a += 1)
          s[a].d(1);
        s.length = i.length;
      }
    },
    i: A,
    o: A,
    d(o) {
      o && I(e), r && r.d(), ot(s, o);
    }
  };
}
function ki(t, e, n) {
  let { label: r = "" } = e, { options: i = "" } = e, { selected: s = "" } = e, { labelposition: o = "top" } = e;
  se();
  let l, a;
  const c = (u) => {
    n(0, s = u), ae(l, "input", { value: u });
  };
  function f(u) {
    ce[u ? "unshift" : "push"](() => {
      l = u, n(3, l);
    });
  }
  const b = (u) => c(u);
  return t.$$set = (u) => {
    "label" in u && n(1, r = u.label), "options" in u && n(6, i = u.options), "selected" in u && n(0, s = u.selected), "labelposition" in u && n(2, o = u.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 64 && n(4, a = i.split(",").map((u) => u.trim()));
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
class Yn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ki, _i, oe, {
      label: 1,
      options: 6,
      selected: 0,
      labelposition: 2
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["label", "options", "selected", "labelposition"];
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), E();
  }
  get options() {
    return this.$$.ctx[6];
  }
  set options(e) {
    this.$$set({ options: e }), E();
  }
  get selected() {
    return this.$$.ctx[0];
  }
  set selected(e) {
    this.$$set({ selected: e }), E();
  }
  get labelposition() {
    return this.$$.ctx[2];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), E();
  }
}
customElements.define("v-radio", Yn);
const xi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yn
}, Symbol.toStringTag, { value: "Module" })), Mi = (t, e) => t.localeCompare(e), Ei = (t, e) => {
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
    const l = (n[o] || []).sort(Mi);
    s.push(...l);
  }
  return s;
}, Si = (t) => {
  const { top: e, bottom: n } = t.getBoundingClientRect(), r = t.parentElement.getBoundingClientRect();
  return n < r.bottom && e > r.top;
}, Yt = (t, e) => t.includes(e), Xt = (t, e) => t.map((n) => {
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
function Ut(t, e, n) {
  const r = t.slice();
  return r[46] = e[n].search, r[47] = e[n].option, r[49] = n, r;
}
function qt(t, e, n) {
  const r = t.slice();
  return r[50] = e[n], r[52] = n, r;
}
function Zt(t, e, n) {
  const r = t.slice();
  return r[47] = e[n], r;
}
function Kt(t) {
  let e, n, r;
  return {
    c() {
      e = M("p"), n = U(t[2]), d(e, "class", r = D("text-xs", {
        "inline whitespace-nowrap": t[3] === "left"
      }));
    },
    m(i, s) {
      O(i, e, s), _(e, n);
    },
    p(i, s) {
      s[0] & 4 && K(n, i[2]), s[0] & 8 && r !== (r = D("text-xs", {
        "inline whitespace-nowrap": i[3] === "left"
      })) && d(e, "class", r);
    },
    d(i) {
      i && I(e);
    }
  };
}
function Jt(t) {
  let e, n = [], r = /* @__PURE__ */ new Map(), i = t[12];
  const s = (o) => o[47];
  for (let o = 0; o < i.length; o += 1) {
    let l = Zt(t, i, o), a = s(l);
    r.set(a, n[o] = Gt(a, l));
  }
  return {
    c() {
      e = M("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
      d(e, "class", "flex flex-wrap gap-2 p-1");
    },
    m(o, l) {
      O(o, e, l);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
    },
    p(o, l) {
      l[0] & 4198400 && (i = o[12], n = Ke(n, l, s, 1, o, i, r, e, Ze, Gt, null, Zt));
    },
    d(o) {
      o && I(e);
      for (let l = 0; l < n.length; l += 1)
        n[l].d();
    }
  };
}
function Gt(t, e) {
  let n, r, i = e[47] + "", s, o, l, a, c, f;
  function b() {
    return e[36](e[47]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = M("div"), r = M("span"), s = U(i), o = B(), l = M("v-icon"), a = B(), de(l, "name", "x"), d(n, "class", "flex cursor-pointer items-center gap-1 rounded-xl bg-[#C4C4C4] py-0.5 px-2 text-[10px] hover:bg-gray-300"), this.first = n;
    },
    m(u, g) {
      O(u, n, g), _(n, r), _(r, s), _(n, o), _(n, l), _(n, a), c || (f = W(n, "click", b), c = !0);
    },
    p(u, g) {
      e = u, g[0] & 4096 && i !== (i = e[47] + "") && K(s, i);
    },
    d(u) {
      u && I(n), c = !1, f();
    }
  };
}
function Ci(t) {
  let e;
  return {
    c() {
      e = M("div"), e.textContent = "No matching results", d(e, "class", "flex py-1.5 px-2.5 justify-center text-xs");
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
  const a = (f) => f[47];
  for (let f = 0; f < l.length; f += 1) {
    let b = Ut(t, l, f), u = a(b);
    r.set(u, n[f] = $t(u, b));
  }
  let c = t[4] && en(t);
  return {
    c() {
      e = M("div");
      for (let f = 0; f < n.length; f += 1)
        n[f].c();
      i = B(), c && c.c(), d(e, "class", "options-container flex max-h-36 flex-col overflow-y-auto");
    },
    m(f, b) {
      O(f, e, b);
      for (let u = 0; u < n.length; u += 1)
        n[u].m(e, null);
      _(e, i), c && c.m(e, null), t[38](e), s || (o = W(e, "mouseleave", t[18]), s = !0);
    },
    p(f, b) {
      b[0] & 25190417 && (l = f[13], n = Ke(n, b, a, 1, f, l, r, e, Ze, $t, i, Ut)), f[4] ? c ? c.p(f, b) : (c = en(f), c.c(), c.m(e, null)) : c && (c.d(1), c = null);
    },
    d(f) {
      f && I(e);
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
      n = U(e);
    },
    m(r, i) {
      O(r, n, i);
    },
    p(r, i) {
      i[0] & 8192 && e !== (e = r[47] + "") && K(n, e);
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
    let l = qt(t, i, o), a = s(l);
    r.set(a, n[o] = Qt(a, l));
  }
  return {
    c() {
      e = M("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
    },
    m(o, l) {
      O(o, e, l);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
    },
    p(o, l) {
      l[0] & 24576 && (i = o[46], n = Ke(n, l, s, 1, o, i, r, e, Ze, Qt, null, qt));
    },
    d(o) {
      o && I(e);
      for (let l = 0; l < n.length; l += 1)
        n[l].d();
    }
  };
}
function Qt(t, e) {
  let n, r = e[50] + "", i, s;
  return {
    key: t,
    first: null,
    c() {
      n = M("span"), i = U(r), d(n, "class", s = D({
        "bg-yellow-100": e[52] === 1 && e[14] !== e[49]
      })), this.first = n;
    },
    m(o, l) {
      O(o, n, l), _(n, i);
    },
    p(o, l) {
      e = o, l[0] & 8192 && r !== (r = e[50] + "") && K(i, r), l[0] & 24576 && s !== (s = D({
        "bg-yellow-100": e[52] === 1 && e[14] !== e[49]
      })) && d(n, "class", s);
    },
    d(o) {
      o && I(n);
    }
  };
}
function $t(t, e) {
  let n, r, i, s, o, l, a, c;
  function f(p, v) {
    return p[46] ? Ri : Oi;
  }
  let b = f(e), u = b(e);
  function g() {
    return e[37](e[49]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = M("label"), r = M("input"), o = B(), u.c(), d(r, "tabindex", "-1"), d(r, "type", "checkbox"), d(r, "class", i = D("bg-black outline-none", e[4] ? "" : "hidden")), r.checked = s = Yt(e[0], Array.isArray(e[47]) ? e[47].join("") : e[47]), d(n, "class", l = D("flex w-full gap-2 text-ellipsis whitespace-nowrap px-2 py-1.5 text-xs", {
        "bg-slate-200": e[14] === e[49]
      })), this.first = n;
    },
    m(p, v) {
      O(p, n, v), _(n, r), _(n, o), u.m(n, null), a || (c = [
        W(r, "change", function() {
          vt(e[24].bind(null, Array.isArray(e[47]) ? e[47].join("") : e[47])) && e[24].bind(null, Array.isArray(e[47]) ? e[47].join("") : e[47]).apply(this, arguments);
        }),
        W(r, "input", et(e[32])),
        W(r, "focus", et(Xe(e[33]))),
        W(n, "mouseenter", g)
      ], a = !0);
    },
    p(p, v) {
      e = p, v[0] & 16 && i !== (i = D("bg-black outline-none", e[4] ? "" : "hidden")) && d(r, "class", i), v[0] & 8193 && s !== (s = Yt(e[0], Array.isArray(e[47]) ? e[47].join("") : e[47])) && (r.checked = s), b === (b = f(e)) && u ? u.p(e, v) : (u.d(1), u = b(e), u && (u.c(), u.m(n, null))), v[0] & 24576 && l !== (l = D("flex w-full gap-2 text-ellipsis whitespace-nowrap px-2 py-1.5 text-xs", {
        "bg-slate-200": e[14] === e[49]
      })) && d(n, "class", l);
    },
    d(p) {
      p && I(n), u.d(), a = !1, pe(c);
    }
  };
}
function en(t) {
  let e, n, r;
  return {
    c() {
      e = M("button"), e.textContent = "Clear all", d(e, "class", "w-full px-2 py-1 hover:bg-slate-200 text-xs text-left");
    },
    m(i, s) {
      O(i, e, s), n || (r = [
        W(e, "mouseenter", t[18]),
        W(e, "click", t[25])
      ], n = !0);
    },
    p: A,
    d(i) {
      i && I(e), n = !1, pe(r);
    }
  };
}
function Pi(t) {
  let e, n, r, i, s, o, l, a, c, f, b, u, g, p, v, w, R, L, T, x = t[2] && Kt(t), P = t[12].length > 0 && Jt(t);
  function C(y, N) {
    return y[5].length > 0 ? Ai : Ci;
  }
  let z = C(t), V = z(t);
  return {
    c() {
      e = M("label"), x && x.c(), n = B(), r = M("v-dropdown"), i = M("div"), s = M("div"), o = M("input"), c = B(), f = M("button"), b = M("v-icon"), g = B(), P && P.c(), p = B(), v = M("div"), V.c(), this.c = A, d(o, "placeholder", t[1]), o.value = l = t[4] ? t[6] : t[0], o.readOnly = a = t[11] ? !0 : void 0, d(o, "type", "text"), d(o, "class", "grow text-xs border-0 bg-transparent outline-none appearance-none"), de(b, "name", "chevron-down"), d(f, "tabindex", "-1"), d(f, "class", u = D("grid place-content-center transition-transform duration-200", { "rotate-180": t[7] })), d(s, "class", "flex py-1.5 pl-2.5 pr-1"), d(i, "slot", "target"), d(i, "class", "w-full border border-black"), d(v, "slot", "content"), d(v, "class", "mt-1 border border-black bg-white drop-shadow-md"), de(r, "match", ""), de(r, "open", w = t[7] ? "" : void 0), d(e, "class", R = D("relative max-w-[14rem] w-full flex gap-1", {
        "flex-col": t[3] === "top",
        "items-center": t[3] === "left",
        "opacity-50 pointer-events-none": t[11]
      })), d(e, "tabindex", "-1");
    },
    m(y, N) {
      O(y, e, N), x && x.m(e, null), _(e, n), _(e, r), _(r, i), _(i, s), _(s, o), t[35](o), _(s, c), _(s, f), _(f, b), _(i, g), P && P.m(i, null), _(r, p), _(r, v), V.m(v, null), t[39](e), L || (T = [
        W(o, "input", Xe(t[16])),
        W(f, "click", t[21]),
        W(f, "focusin", et(t[34])),
        W(e, "focusin", t[19]),
        W(e, "focusout", t[20]),
        W(e, "keyup", et(Xe(t[17]))),
        W(e, "mousemove", t[40])
      ], L = !0);
    },
    p(y, N) {
      y[2] ? x ? x.p(y, N) : (x = Kt(y), x.c(), x.m(e, n)) : x && (x.d(1), x = null), N[0] & 2 && d(o, "placeholder", y[1]), N[0] & 81 && l !== (l = y[4] ? y[6] : y[0]) && o.value !== l && (o.value = l), N[0] & 2048 && a !== (a = y[11] ? !0 : void 0) && (o.readOnly = a), N[0] & 128 && u !== (u = D("grid place-content-center transition-transform duration-200", { "rotate-180": y[7] })) && d(f, "class", u), y[12].length > 0 ? P ? P.p(y, N) : (P = Jt(y), P.c(), P.m(i, null)) : P && (P.d(1), P = null), z === (z = C(y)) && V ? V.p(y, N) : (V.d(1), V = z(y), V && (V.c(), V.m(v, null))), N[0] & 128 && w !== (w = y[7] ? "" : void 0) && de(r, "open", w), N[0] & 2056 && R !== (R = D("relative max-w-[14rem] w-full flex gap-1", {
        "flex-col": y[3] === "top",
        "items-center": y[3] === "left",
        "opacity-50 pointer-events-none": y[11]
      })) && d(e, "class", R);
    },
    i: A,
    o: A,
    d(y) {
      y && I(e), x && x.d(), t[35](null), P && P.d(), V.d(), t[39](null), L = !1, pe(T);
    }
  };
}
function Ti(t, e, n) {
  let { options: r = "" } = e, { value: i = "" } = e, { placeholder: s = "" } = e, { label: o = "" } = e, { variant: l = "single" } = e, { labelposition: a = "top" } = e, { disabled: c = "false" } = e, { exact: f = "false" } = e, b, u, g, p, v, w, R, L, T, x, P = "", C = !1, z = -1, V = !1;
  se();
  const y = (h) => {
    V = h;
  }, N = (h, j) => h ? Ei(j, h) : j, H = (h) => {
    n(14, z = -1), n(10, g.scrollTop = 0, g), h.stopImmediatePropagation(), w ? n(6, P = u.value.trim()) : (n(0, i = u.value.trim()), ae(b, "input", { value: i }));
  }, te = (h) => {
    switch (y(!0), h.key.toLowerCase()) {
      case "enter":
        return F();
      case "arrowup":
        return Y(-1);
      case "arrowdown":
        return Y(1);
      case "escape":
        return fe();
    }
  }, F = () => {
    if (w) {
      const h = T[z];
      n(0, i = i.includes(h) ? [...L.filter((j) => j !== h)].toString() : [...L, h].toString()), u.focus();
    } else {
      if (z > -1)
        n(0, i = T[z]);
      else {
        const h = T.find((j) => j.toLowerCase() === i);
        h && n(0, i = h);
      }
      C && (u.blur(), ae(b, "input", { value: i }));
    }
  }, Y = (h) => {
    n(14, z += h), z < 0 ? n(14, z = T.length - 1) : z >= T.length && n(14, z = 0);
    const j = g.children[z];
    Si(j) === !1 && j.scrollIntoView();
  }, ue = () => {
    n(14, z = -1);
  }, fe = () => {
    u.blur();
  }, ge = () => {
    C || (n(7, C = !0), u.focus());
  }, ve = (h) => {
    b.contains(h.relatedTarget) || (n(7, C = !1), n(14, z = -1));
  }, _e = () => {
    C ? n(7, C = !1) : u.focus();
  }, me = (h) => {
    n(0, i = [...L.filter((j) => j !== h)].toString()), ae(b, "input", { value: i }), u.focus();
  }, Se = (h) => {
    V || n(14, z = h);
  }, De = (h, j) => {
    const { checked: X } = j.target;
    if (w === !1 && i === h) {
      j.preventDefault(), n(7, C = !1);
      return;
    }
    n(0, i = X ? [...L, h].toString() : [...L.filter((ne) => ne !== h)].toString()), ae(b, "input", { value: i }), w ? u.focus() : n(7, C = !1);
  }, Re = () => {
    n(0, i = ""), n(10, g.scrollTop = 0, g), ae(b, "input", { value: i });
  };
  function Pe(h) {
    dt.call(this, t, h);
  }
  function Ce(h) {
    dt.call(this, t, h);
  }
  function Ae(h) {
    dt.call(this, t, h);
  }
  function He(h) {
    ce[h ? "unshift" : "push"](() => {
      u = h, n(9, u);
    });
  }
  const ct = (h) => me(h), ut = (h) => Se(h);
  function ft(h) {
    ce[h ? "unshift" : "push"](() => {
      g = h, n(10, g);
    });
  }
  function k(h) {
    ce[h ? "unshift" : "push"](() => {
      b = h, n(8, b);
    });
  }
  const m = () => y(!1);
  return t.$$set = (h) => {
    "options" in h && n(26, r = h.options), "value" in h && n(0, i = h.value), "placeholder" in h && n(1, s = h.placeholder), "label" in h && n(2, o = h.label), "variant" in h && n(27, l = h.variant), "labelposition" in h && n(3, a = h.labelposition), "disabled" in h && n(28, c = h.disabled), "exact" in h && n(29, f = h.exact);
  }, t.$$.update = () => {
    t.$$.dirty[0] & 268435456 && n(11, p = xe(c, "disabled")), t.$$.dirty[0] & 536870912 && n(30, v = xe(f, "exact")), t.$$.dirty[0] & 134217728 && n(4, w = l === "multiple"), t.$$.dirty[0] & 67108864 && n(31, R = r.split(",").map((h) => h.trim())), t.$$.dirty[0] & 1073741969 | t.$$.dirty[1] & 1 && (C || (w && n(6, P = ""), v && R.includes(i) === !1 && n(0, i = ""))), t.$$.dirty[0] & 17 && n(12, L = w ? i.split(",").filter(Boolean).map((h) => h.trim()) : []), t.$$.dirty[0] & 81 | t.$$.dirty[1] & 1 && n(5, T = N(w ? P : i, R)), t.$$.dirty[0] & 113 && n(13, x = w ? Xt(T, P) : Xt(T, i));
  }, [
    i,
    s,
    o,
    a,
    w,
    T,
    P,
    C,
    b,
    u,
    g,
    p,
    L,
    x,
    z,
    y,
    H,
    te,
    ue,
    ge,
    ve,
    _e,
    me,
    Se,
    De,
    Re,
    r,
    l,
    c,
    f,
    v,
    R,
    Pe,
    Ce,
    Ae,
    He,
    ct,
    ut,
    ft,
    k,
    m
  ];
}
class Xn extends G {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>.options-container::-webkit-scrollbar{width:6px}.options-container::-webkit-scrollbar-track{background:transparent}.options-container::-webkit-scrollbar-thumb{background-color:black;border-radius:0;border:0 solid transparent}.options-container{scrollbar-width:thin;scrollbar-color:black transparent}</style>", ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Ti, Pi, oe, {
      options: 26,
      value: 0,
      placeholder: 1,
      label: 2,
      variant: 27,
      labelposition: 3,
      disabled: 28,
      exact: 29
    }, null, [-1, -1]), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
    this.$$set({ options: e }), E();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), E();
  }
  get placeholder() {
    return this.$$.ctx[1];
  }
  set placeholder(e) {
    this.$$set({ placeholder: e }), E();
  }
  get label() {
    return this.$$.ctx[2];
  }
  set label(e) {
    this.$$set({ label: e }), E();
  }
  get variant() {
    return this.$$.ctx[27];
  }
  set variant(e) {
    this.$$set({ variant: e }), E();
  }
  get labelposition() {
    return this.$$.ctx[3];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), E();
  }
  get disabled() {
    return this.$$.ctx[28];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), E();
  }
  get exact() {
    return this.$$.ctx[29];
  }
  set exact(e) {
    this.$$set({ exact: e }), E();
  }
}
customElements.define("v-select", Xn);
const ji = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xn
}, Symbol.toStringTag, { value: "Module" })), ze = [];
function zi(t, e = A) {
  let n;
  const r = /* @__PURE__ */ new Set();
  function i(l) {
    if (Cn(t, l) && (t = l, n)) {
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
function tn(t) {
  return Object.prototype.toString.call(t) === "[object Date]";
}
function gt(t, e, n, r) {
  if (typeof n == "number" || tn(n)) {
    const i = r - n, s = (n - e) / (t.dt || 1 / 60), o = t.opts.stiffness * i, l = t.opts.damping * s, a = (o - l) * t.inv_mass, c = (s + a) * t.dt;
    return Math.abs(c) < t.opts.precision && Math.abs(i) < t.opts.precision ? r : (t.settled = !1, tn(n) ? new Date(n.getTime() + c) : n + c);
  } else {
    if (Array.isArray(n))
      return n.map((i, s) => gt(t, e[s], n[s], r[s]));
    if (typeof n == "object") {
      const i = {};
      for (const s in n)
        i[s] = gt(t, e[s], n[s], r[s]);
      return i;
    } else
      throw new Error(`Cannot spring ${typeof n} values`);
  }
}
function Vi(t, e = {}) {
  const n = zi(t), { stiffness: r = 0.15, damping: i = 0.8, precision: s = 0.01 } = e;
  let o, l, a, c = t, f = t, b = 1, u = 0, g = !1;
  function p(w, R = {}) {
    f = w;
    const L = a = {};
    if (t == null || R.hard || v.stiffness >= 1 && v.damping >= 1)
      return g = !0, o = Et(), c = w, n.set(t = f), Promise.resolve();
    if (R.soft) {
      const T = R.soft === !0 ? 0.5 : +R.soft;
      u = 1 / (T * 60), b = 0;
    }
    return l || (o = Et(), g = !1, l = gr((T) => {
      if (g)
        return g = !1, l = null, !1;
      b = Math.min(b + u, 1);
      const x = {
        inv_mass: b,
        opts: v,
        settled: !0,
        dt: (T - o) * 60 / 1e3
      }, P = gt(x, c, t, f);
      return o = T, c = t, n.set(t = P), x.settled && (l = null), !x.settled;
    })), new Promise((T) => {
      l.promise.then(() => {
        L === a && T();
      });
    });
  }
  const v = {
    set: p,
    update: (w, R) => p(w(f, t), R),
    subscribe: n.subscribe,
    stiffness: r,
    damping: i,
    precision: s
  };
  return v;
}
function nn(t, e, n) {
  const r = t.slice();
  return r[53] = e[n], r[55] = n, r;
}
function rn(t, e, n) {
  const r = t.slice();
  return r[6] = e[n], r[57] = n, r;
}
function on(t) {
  let e, n;
  return {
    c() {
      e = M("p"), n = U(t[4]), d(e, "class", "text-xs");
    },
    m(r, i) {
      O(r, e, i), _(e, n);
    },
    p(r, i) {
      i[0] & 16 && K(n, r[4]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function sn(t) {
  let e, n;
  return {
    c() {
      e = M("span"), n = U(t[5]), d(e, "class", "floating-suffix");
    },
    m(r, i) {
      O(r, e, i), _(e, n);
    },
    p(r, i) {
      i[0] & 32 && K(n, r[5]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function ln(t) {
  let e, n, r, i, s, o, l = t[6] + "", a, c, f, b, u, g, p, v, w, R, L, T = t[5] && sn(t);
  function x() {
    return t[37](t[57]);
  }
  return {
    c() {
      e = M("span"), n = M("span"), r = B(), i = M("span"), s = B(), o = M("span"), a = U(l), c = B(), T && T.c(), d(n, "class", "handle-bg absolute left-0 bottom-1 rounded-full opacity-50 h-full w-full transition-transform bg-gray-400"), d(i, "class", "absolute left-0 bottom-1 block rounded-full h-full w-full border border-black bg-white"), d(o, "class", f = D("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })), d(e, "role", "slider"), d(e, "class", "range absolute block h-5 w-5 top-1 bottom-auto -translate-x-1/2 -translate-y-1/2 z-[2]"), d(e, "data-handle", b = t[57]), be(e, "left", t[17][t[57]] + "%"), be(e, "z-index", t[15] === t[57] ? 3 : 2), d(e, "aria-valuemin", u = t[0] === !0 && t[57] === 1 ? t[9] : t[7]), d(e, "aria-valuemax", g = t[0] === !0 && t[57] === 0 ? t[10] : t[8]), d(e, "aria-valuenow", p = t[6]), d(e, "aria-valuetext", v = t[6]?.toString()), d(e, "aria-orientation", "horizontal"), d(e, "aria-disabled", t[2]), d(e, "disabled", t[2]), d(e, "tabindex", w = t[2] ? -1 : 0), Q(e, "active", t[13] && t[15] === t[57]), Q(e, "press", t[14] && t[15] === t[57]);
    },
    m(P, C) {
      O(P, e, C), _(e, n), _(e, r), _(e, i), _(e, s), _(e, o), _(o, a), _(o, c), T && T.m(o, null), R || (L = [
        W(e, "blur", t[20]),
        W(e, "focus", x)
      ], R = !0);
    },
    p(P, C) {
      t = P, C[0] & 1536 && l !== (l = t[6] + "") && K(a, l), t[5] ? T ? T.p(t, C) : (T = sn(t), T.c(), T.m(o, null)) : T && (T.d(1), T = null), C[0] & 40960 && f !== (f = D("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })) && d(o, "class", f), C[0] & 131072 && be(e, "left", t[17][t[57]] + "%"), C[0] & 32768 && be(e, "z-index", t[15] === t[57] ? 3 : 2), C[0] & 641 && u !== (u = t[0] === !0 && t[57] === 1 ? t[9] : t[7]) && d(e, "aria-valuemin", u), C[0] & 1281 && g !== (g = t[0] === !0 && t[57] === 0 ? t[10] : t[8]) && d(e, "aria-valuemax", g), C[0] & 1536 && p !== (p = t[6]) && d(e, "aria-valuenow", p), C[0] & 1536 && v !== (v = t[6]?.toString()) && d(e, "aria-valuetext", v), C[0] & 4 && d(e, "aria-disabled", t[2]), C[0] & 4 && d(e, "disabled", t[2]), C[0] & 4 && w !== (w = t[2] ? -1 : 0) && d(e, "tabindex", w), C[0] & 40960 && Q(e, "active", t[13] && t[15] === t[57]), C[0] & 49152 && Q(e, "press", t[14] && t[15] === t[57]);
    },
    d(P) {
      P && I(e), T && T.d(), R = !1, pe(L);
    }
  };
}
function an(t) {
  let e;
  return {
    c() {
      e = M("span"), d(e, "class", "absolute block transition duration-200 h-1 -top-0.5 select-none z-[1] bg-black"), be(e, "left", t[18](t[17]) + "%"), be(e, "right", t[19](t[17]) + "%");
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
function cn(t) {
  let e, n;
  return {
    c() {
      e = M("span"), n = U(t[5]), d(e, "class", "pipVal-suffix");
    },
    m(r, i) {
      O(r, e, i), _(e, n);
    },
    p(r, i) {
      i[0] & 32 && K(n, r[5]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function un(t) {
  let e, n = Array.from({ length: t[12] + 1 }), r = [];
  for (let i = 0; i < n.length; i += 1)
    r[i] = dn(nn(t, n, i));
  return {
    c() {
      for (let i = 0; i < r.length; i += 1)
        r[i].c();
      e = _t();
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
          const l = nn(i, n, o);
          r[o] ? r[o].p(l, s) : (r[o] = dn(l), r[o].c(), r[o].m(e.parentNode, e));
        }
        for (; o < r.length; o += 1)
          r[o].d(1);
        r.length = n.length;
      }
    },
    d(i) {
      ot(r, i), i && I(e);
    }
  };
}
function fn(t) {
  let e;
  return {
    c() {
      e = M("span"), d(e, "class", "absolute h-[4px] w-[1px] top-[calc(50%-9px)] whitespace-nowrap transition bg-black/50"), be(e, "left", tt(t[16](t[55]), t[7], t[8], 2) + "%");
    },
    m(n, r) {
      O(n, e, r);
    },
    p(n, r) {
      r[0] & 65920 && be(e, "left", tt(n[16](n[55]), n[7], n[8], 2) + "%");
    },
    d(n) {
      n && I(e);
    }
  };
}
function dn(t) {
  let e = t[16](t[55]) !== t[7] && t[16](t[55]) !== t[8], n, r = e && fn(t);
  return {
    c() {
      r && r.c(), n = _t();
    },
    m(i, s) {
      r && r.m(i, s), O(i, n, s);
    },
    p(i, s) {
      s[0] & 65920 && (e = i[16](i[55]) !== i[7] && i[16](i[55]) !== i[8]), e ? r ? r.p(i, s) : (r = fn(i), r.c(), r.m(n.parentNode, n)) : r && (r.d(1), r = null);
    },
    d(i) {
      r && r.d(i), i && I(n);
    }
  };
}
function hn(t) {
  let e, n;
  return {
    c() {
      e = M("span"), n = U(t[5]), d(e, "class", "pipVal-suffix");
    },
    m(r, i) {
      O(r, e, i), _(e, n);
    },
    p(r, i) {
      i[0] & 32 && K(n, r[5]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function Li(t) {
  let e, n, r, i, s, o, l, a, c, f, b, u, g, p, v, w, R, L = t[4] && on(t), T = t[10] ? [t[9], t[10]] : [t[9]], x = [];
  for (let y = 0; y < T.length; y += 1)
    x[y] = ln(rn(t, T, y));
  let P = t[0] && an(t), C = t[5] && cn(t), z = t[3] && un(t), V = t[5] && hn(t);
  return {
    c() {
      e = M("label"), L && L.c(), n = B(), r = M("div");
      for (let y = 0; y < x.length; y += 1)
        x[y].c();
      i = B(), P && P.c(), s = B(), o = M("div"), l = M("small"), a = U(t[7]), c = B(), C && C.c(), f = B(), z && z.c(), b = B(), u = M("small"), g = U(t[8]), p = B(), V && V.c(), this.c = A, d(l, "class", "absolute bottom-full left-0 -translate-x-1/2 mb-3 whitespace-nowrap"), d(u, "class", "absolute bottom-full right-0 translate-x-1/2 mb-3 whitespace-nowrap"), d(o, "class", "absolute h-2 left-0 right-0"), Q(o, "disabled", t[2]), Q(o, "focus", t[13]), d(r, "class", v = D("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": t[2] })), Q(r, "range", t[0]), Q(r, "focus", t[13]), Q(r, "min", t[0] === "min"), Q(r, "max", t[0] === "max"), d(e, "class", "flex flex-col gap-2");
    },
    m(y, N) {
      O(y, e, N), L && L.m(e, null), _(e, n), _(e, r);
      for (let H = 0; H < x.length; H += 1)
        x[H].m(r, null);
      _(r, i), P && P.m(r, null), _(r, s), _(r, o), _(o, l), _(l, a), _(l, c), C && C.m(l, null), _(o, f), z && z.m(o, null), _(o, b), _(o, u), _(u, g), _(u, p), V && V.m(u, null), t[38](r), w || (R = [
        W(window, "mousedown", t[24]),
        W(window, "touchstart", t[24]),
        W(window, "mousemove", t[25]),
        W(window, "touchmove", t[25]),
        W(window, "mouseup", t[26]),
        W(window, "touchend", t[27]),
        W(window, "keydown", t[28]),
        W(r, "mousedown", t[22]),
        W(r, "mouseup", t[23]),
        W(r, "touchstart", Xe(t[22])),
        W(r, "touchend", Xe(t[23]))
      ], w = !0);
    },
    p(y, N) {
      if (y[4] ? L ? L.p(y, N) : (L = on(y), L.c(), L.m(e, n)) : L && (L.d(1), L = null), N[0] & 3336101) {
        T = y[10] ? [y[9], y[10]] : [y[9]];
        let H;
        for (H = 0; H < T.length; H += 1) {
          const te = rn(y, T, H);
          x[H] ? x[H].p(te, N) : (x[H] = ln(te), x[H].c(), x[H].m(r, i));
        }
        for (; H < x.length; H += 1)
          x[H].d(1);
        x.length = T.length;
      }
      y[0] ? P ? P.p(y, N) : (P = an(y), P.c(), P.m(r, s)) : P && (P.d(1), P = null), N[0] & 128 && K(a, y[7]), y[5] ? C ? C.p(y, N) : (C = cn(y), C.c(), C.m(l, null)) : C && (C.d(1), C = null), y[3] ? z ? z.p(y, N) : (z = un(y), z.c(), z.m(o, b)) : z && (z.d(1), z = null), N[0] & 256 && K(g, y[8]), y[5] ? V ? V.p(y, N) : (V = hn(y), V.c(), V.m(u, null)) : V && (V.d(1), V = null), N[0] & 4 && Q(o, "disabled", y[2]), N[0] & 8192 && Q(o, "focus", y[13]), N[0] & 4 && v !== (v = D("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": y[2] })) && d(r, "class", v), N[0] & 5 && Q(r, "range", y[0]), N[0] & 8196 && Q(r, "focus", y[13]), N[0] & 5 && Q(r, "min", y[0] === "min"), N[0] & 5 && Q(r, "max", y[0] === "max");
    },
    i: A,
    o: A,
    d(y) {
      y && I(e), L && L.d(), ot(x, y), P && P.d(), C && C.d(), z && z.d(), V && V.d(), t[38](null), w = !1, pe(R);
    }
  };
}
function Ii(t, e, n) {
  let r, i, s = A, o = () => (s(), s = pr(_e, (S) => n(17, i = S)), _e);
  t.$$.on_destroy.push(() => s());
  let { slider: l } = e, { range: a = !1 } = e, { min: c } = e, { max: f } = e, { step: b } = e, { value: u } = e, { start: g } = e, { end: p } = e, { disabled: v = !1 } = e, { discrete: w = !0 } = e, { label: R = "" } = e, { suffix: L = "" } = e;
  se();
  const T = { stiffness: 0.1, damping: 0.4 };
  let x, P, C, z, V, y, N, H = 0, te = !1, F = !1, Y = !1, ue = !1, fe = -1, ge, ve, _e;
  const me = (S, q, ie) => {
    if (S <= q)
      return q;
    if (S >= ie)
      return ie;
    const J = (S - q) % C;
    let ke = S - J;
    return Math.abs(J) * 2 >= C && (ke += J > 0 ? C : -C), ke = qr(ke, q, ie), Number.parseFloat(ke.toFixed(2));
  }, Se = (S) => S.type.includes("touch") ? S.touches[0] : S, De = (S) => {
    const q = [...l.querySelectorAll(".handle")], ie = q.includes(S), J = q.some((ke) => ke.contains(S));
    return ie || J;
  }, Re = (S) => a === "min" || a === "max" ? S.slice(0, 1) : a ? S.slice(0, 2) : S, Pe = () => {
    ve = l.getBoundingClientRect();
  }, Ce = (S) => {
    const ie = (S.clientX - ve.left) / ve.width * 100, J = (P - x) / 100 * ie + x;
    let ke = 0;
    return a && z === V ? J > V ? 1 : 0 : (a && (ke = [z, V].indexOf([z, V].sort((hr, br) => Math.abs(J - hr) - Math.abs(J - br))[0])), ke);
  }, Ae = (S) => {
    const ie = (S.clientX - ve.left) / ve.width * 100, J = (P - x) / 100 * ie + x;
    He(fe, J);
  }, He = (S, q) => {
    let ie = S;
    const J = me(q, x, P);
    return typeof ie > "u" && (ie = fe), a && (ie === 0 && J > V ? n(10, V = J) : ie === 1 && J < z && n(9, z = J)), ie === 0 && z !== J && n(9, z = J), ie === 1 && V !== J && n(10, V = J), ge !== J && (le(), ge = J), ie === 0 ? n(29, g = z.toString()) : ie === 1 && n(30, p = V.toString()), J;
  }, ct = (S) => a === "min" ? 0 : S[0], ut = (S) => a === "max" ? 0 : a === "min" ? 100 - S[0] : 100 - S[1], ft = () => {
    ue && (n(13, te = !1), F = !1, n(14, Y = !1));
  }, k = (S) => {
    v || (n(15, fe = S), n(13, te = !0));
  }, m = (S) => {
    if (v)
      return;
    Pe();
    const q = S.target, ie = Se(S);
    n(13, te = !0), F = !0, n(14, Y = !0), n(15, fe = Ce(ie)), ge = me(fe === 0 ? z : V, x, P), S.type === "touchstart" && !q.matches(".pipVal") && Ae(ie);
  }, h = () => {
    n(14, Y = !1);
  }, j = (S) => {
    ue = !1, te && S.target !== l && !l.contains(S.target) && n(13, te = !1);
  }, X = (S) => {
    v || !F || (n(13, te = !0), Ae(Se(S)));
  }, ne = (S) => {
    if (!v) {
      const q = S.target;
      (F && q && q === l || l.contains(q)) && (n(13, te = !0), !De(q) && !q.matches(".pipVal") && Ae(Se(S)));
    }
    F = !1, n(14, Y = !1);
  }, Z = () => {
    F = !1, n(14, Y = !1);
  }, re = (S) => {
    v || (S.target === l || l.contains(S.target)) && (ue = !0);
  }, le = () => {
    v || ae(l, "input", {
      activeHandle: fe,
      previousValue: ge,
      value: fe === 0 ? z : V,
      values: V ? [z, V].map((S) => me(S, x, P)) : void 0
    });
  }, he = (S) => k(S);
  function dr(S) {
    ce[S ? "unshift" : "push"](() => {
      l = S, n(1, l);
    });
  }
  return t.$$set = (S) => {
    "slider" in S && n(1, l = S.slider), "range" in S && n(0, a = S.range), "min" in S && n(31, c = S.min), "max" in S && n(32, f = S.max), "step" in S && n(33, b = S.step), "value" in S && n(6, u = S.value), "start" in S && n(29, g = S.start), "end" in S && n(30, p = S.end), "disabled" in S && n(2, v = S.disabled), "discrete" in S && n(3, w = S.discrete), "label" in S && n(4, R = S.label), "suffix" in S && n(5, L = S.suffix);
  }, t.$$.update = () => {
    if (t.$$.dirty[1] & 2 && n(8, P = Number.parseFloat(f || "100")), t.$$.dirty[1] & 1 && n(7, x = Number.parseFloat(c || "0")), t.$$.dirty[1] & 4 && n(34, C = Number.parseFloat(b || "1")), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(35, y = (P - x) / C >= 100 ? (P - x) / 20 : 1), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(12, N = (P - x) / C), t.$$.dirty[0] & 128 | t.$$.dirty[1] & 24 && n(16, r = (S) => x + S * C * y), t.$$.dirty[0] & 536870976 | t.$$.dirty[1] & 3 && n(9, z = g || u ? Number.parseFloat(g || u) : (Number.parseFloat(c || "0") + Number.parseFloat(f || "100")) / 2), t.$$.dirty[0] & 1073741824 && n(10, V = p ? Number.parseFloat(p) : void 0), t.$$.dirty[0] & 1073741825 && n(0, a = typeof a == "string" ? a : p !== void 0), t.$$.dirty[0] & 3968 | t.$$.dirty[1] & 32) {
      n(9, z = me(z, x, P));
      let S = [z];
      V && (n(10, V = me(V, x, P)), S.push(V)), S = Re(S), H !== S.length ? o(n(11, _e = Vi(S.map((q) => tt(q, x, P, 2)), T))) : _e.set(S.map((q) => tt(q, x, P, 2))).catch((q) => console.error(q)), n(36, H = S.length);
    }
  }, [
    a,
    l,
    v,
    w,
    R,
    L,
    u,
    x,
    P,
    z,
    V,
    _e,
    N,
    te,
    Y,
    fe,
    r,
    i,
    ct,
    ut,
    ft,
    k,
    m,
    h,
    j,
    X,
    ne,
    Z,
    re,
    g,
    p,
    c,
    f,
    b,
    C,
    y,
    H,
    he,
    dr
  ];
}
class Un extends G {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>.slider .range:hover .handle-bg{transform:scale(1.5)}.slider .range.active .handle-bg{transform:scale(2.0)}.slider .range.active .floating,.slider .range:hover .floating{opacity:1}</style>", ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Ii, Li, Cn, {
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
    }, null, [-1, -1]), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
    this.$$set({ slider: e }), E();
  }
  get range() {
    return this.$$.ctx[0];
  }
  set range(e) {
    this.$$set({ range: e }), E();
  }
  get min() {
    return this.$$.ctx[31];
  }
  set min(e) {
    this.$$set({ min: e }), E();
  }
  get max() {
    return this.$$.ctx[32];
  }
  set max(e) {
    this.$$set({ max: e }), E();
  }
  get step() {
    return this.$$.ctx[33];
  }
  set step(e) {
    this.$$set({ step: e }), E();
  }
  get value() {
    return this.$$.ctx[6];
  }
  set value(e) {
    this.$$set({ value: e }), E();
  }
  get start() {
    return this.$$.ctx[29];
  }
  set start(e) {
    this.$$set({ start: e }), E();
  }
  get end() {
    return this.$$.ctx[30];
  }
  set end(e) {
    this.$$set({ end: e }), E();
  }
  get disabled() {
    return this.$$.ctx[2];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), E();
  }
  get discrete() {
    return this.$$.ctx[3];
  }
  set discrete(e) {
    this.$$set({ discrete: e }), E();
  }
  get label() {
    return this.$$.ctx[4];
  }
  set label(e) {
    this.$$set({ label: e }), E();
  }
  get suffix() {
    return this.$$.ctx[5];
  }
  set suffix(e) {
    this.$$set({ suffix: e }), E();
  }
}
customElements.define("v-slider", Un);
const Ni = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Un
}, Symbol.toStringTag, { value: "Module" }));
function bn(t) {
  let e, n, r;
  return {
    c() {
      e = M("p"), n = U(t[1]), d(e, "class", r = D("text-xs", {
        "whitespace-nowrap": t[4] === "left"
      }));
    },
    m(i, s) {
      O(i, e, s), _(e, n);
    },
    p(i, s) {
      s & 2 && K(n, i[1]), s & 16 && r !== (r = D("text-xs", {
        "whitespace-nowrap": i[4] === "left"
      })) && d(e, "class", r);
    },
    d(i) {
      i && I(e);
    }
  };
}
function mn(t) {
  let e, n;
  return {
    c() {
      e = M("p"), n = U(t[0]), d(e, "class", "capitalize text-xs");
    },
    m(r, i) {
      O(r, e, i), _(e, n);
    },
    p(r, i) {
      i & 1 && K(n, r[0]);
    },
    d(r) {
      r && I(e);
    }
  };
}
function Fi(t) {
  let e, n, r, i, s, o, l, a, c, f, b, u, g, p = t[1] && bn(t), v = t[3] === "annotated" && mn(t);
  return {
    c() {
      e = M("label"), p && p.c(), n = B(), r = M("button"), i = M("div"), s = M("span"), o = B(), l = M("input"), c = B(), v && v.c(), this.c = A, d(s, "class", "pointer-events-none relative inline-block border border-green/100 h-4 w-4 mt-px ml-px bg-white shadow transform ring-0 motion-safe:transition-transform ease-in-out duration-200"), Q(s, "translate-x-0", !t[7]), Q(s, "translate-x-6", t[7]), d(l, "name", t[2]), l.value = t[0], d(l, "class", "hidden"), d(l, "type", "checkbox"), l.checked = t[7], d(i, "class", a = D("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": t[7] })), d(r, "type", "button"), d(r, "class", "flex gap-1.5 items-center"), d(r, "role", "switch"), d(r, "aria-label", t[1]), d(r, "aria-checked", f = t[7] ? "true" : "false"), d(e, "class", b = D("flex gap-1", {
        "flex-col justify-start": t[4] === "top",
        "items-center": t[4] === "left",
        "opacity-50 pointer-events-none": t[8]
      }));
    },
    m(w, R) {
      O(w, e, R), p && p.m(e, null), _(e, n), _(e, r), _(r, i), _(i, s), _(i, o), _(i, l), t[11](l), _(r, c), v && v.m(r, null), t[12](e), u || (g = W(r, "click", t[9]), u = !0);
    },
    p(w, [R]) {
      w[1] ? p ? p.p(w, R) : (p = bn(w), p.c(), p.m(e, n)) : p && (p.d(1), p = null), R & 128 && Q(s, "translate-x-0", !w[7]), R & 128 && Q(s, "translate-x-6", w[7]), R & 4 && d(l, "name", w[2]), R & 1 && (l.value = w[0]), R & 128 && (l.checked = w[7]), R & 128 && a !== (a = D("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": w[7] })) && d(i, "class", a), w[3] === "annotated" ? v ? v.p(w, R) : (v = mn(w), v.c(), v.m(r, null)) : v && (v.d(1), v = null), R & 2 && d(r, "aria-label", w[1]), R & 128 && f !== (f = w[7] ? "true" : "false") && d(r, "aria-checked", f), R & 272 && b !== (b = D("flex gap-1", {
        "flex-col justify-start": w[4] === "top",
        "items-center": w[4] === "left",
        "opacity-50 pointer-events-none": w[8]
      })) && d(e, "class", b);
    },
    i: A,
    o: A,
    d(w) {
      w && I(e), p && p.d(), t[11](null), v && v.d(), t[12](null), u = !1, g();
    }
  };
}
function Di(t, e, n) {
  let { label: r = "" } = e, { name: i = "" } = e, { value: s = "off" } = e, { variant: o = "default" } = e, { disabled: l } = e, { labelposition: a = "top" } = e;
  se();
  let c, f, b, u;
  const g = () => {
    n(0, s = b ? "off" : "on"), n(6, f.checked = b, f), ae(c, "input", { value: f.checked });
  };
  function p(w) {
    ce[w ? "unshift" : "push"](() => {
      f = w, n(6, f);
    });
  }
  function v(w) {
    ce[w ? "unshift" : "push"](() => {
      c = w, n(5, c);
    });
  }
  return t.$$set = (w) => {
    "label" in w && n(1, r = w.label), "name" in w && n(2, i = w.name), "value" in w && n(0, s = w.value), "variant" in w && n(3, o = w.variant), "disabled" in w && n(10, l = w.disabled), "labelposition" in w && n(4, a = w.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 1 && n(7, b = s === "on"), t.$$.dirty & 1024 && n(8, u = xe(l, "disabled"));
  }, [
    s,
    r,
    i,
    o,
    a,
    c,
    f,
    b,
    u,
    g,
    l,
    p,
    v
  ];
}
class qn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Di, Fi, oe, {
      label: 1,
      name: 2,
      value: 0,
      variant: 3,
      disabled: 10,
      labelposition: 4
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["label", "name", "value", "variant", "disabled", "labelposition"];
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), E();
  }
  get name() {
    return this.$$.ctx[2];
  }
  set name(e) {
    this.$$set({ name: e }), E();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), E();
  }
  get variant() {
    return this.$$.ctx[3];
  }
  set variant(e) {
    this.$$set({ variant: e }), E();
  }
  get disabled() {
    return this.$$.ctx[10];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), E();
  }
  get labelposition() {
    return this.$$.ctx[4];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), E();
  }
}
customElements.define("v-switch", qn);
const Hi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qn
}, Symbol.toStringTag, { value: "Module" }));
function pn(t, e, n) {
  const r = t.slice();
  return r[3] = e[n], r;
}
function gn(t) {
  let e;
  return {
    c() {
      e = M("col"), be(e, "width", t[3]);
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
    l[a] = gn(pn(t, o, a));
  return {
    c() {
      e = M("table"), n = M("colgroup");
      for (let a = 0; a < l.length; a += 1)
        l[a].c();
      r = B(), i = M("slot"), this.c = A, d(e, "class", s = D("bg-white text-xs w-full", {
        "table-fixed": t[0] === "fixed"
      }));
    },
    m(a, c) {
      O(a, e, c), _(e, n);
      for (let f = 0; f < l.length; f += 1)
        l[f].m(n, null);
      _(e, r), _(e, i);
    },
    p(a, [c]) {
      if (c & 2) {
        o = a[1];
        let f;
        for (f = 0; f < o.length; f += 1) {
          const b = pn(a, o, f);
          l[f] ? l[f].p(b, c) : (l[f] = gn(b), l[f].c(), l[f].m(n, null));
        }
        for (; f < l.length; f += 1)
          l[f].d(1);
        l.length = o.length;
      }
      c & 1 && s !== (s = D("bg-white text-xs w-full", {
        "table-fixed": a[0] === "fixed"
      })) && d(e, "class", s);
    },
    i: A,
    o: A,
    d(a) {
      a && I(e), ot(l, a);
    }
  };
}
function Bi(t, e, n) {
  se();
  let { variant: r = "" } = e, { cols: i = "" } = e;
  const s = i.split(",").map((o) => o.trim());
  return t.$$set = (o) => {
    "variant" in o && n(0, r = o.variant), "cols" in o && n(2, i = o.cols);
  }, [r, s, i];
}
class Zn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Bi, Wi, oe, { variant: 0, cols: 2 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["variant", "cols"];
  }
  get variant() {
    return this.$$.ctx[0];
  }
  set variant(e) {
    this.$$set({ variant: e }), E();
  }
  get cols() {
    return this.$$.ctx[2];
  }
  set cols(e) {
    this.$$set({ cols: e }), E();
  }
}
customElements.define("v-table", Zn);
const Yi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zn
}, Symbol.toStringTag, { value: "Module" }));
function wn(t, e, n) {
  const r = t.slice();
  return r[8] = e[n], r[10] = n, r;
}
function yn(t, e) {
  let n, r, i = e[8] + "", s, o, l, a, c, f;
  function b() {
    return e[6](e[8]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = M("button"), r = M("div"), s = U(i), l = B(), d(r, "class", o = D({
        "-mb-px": e[8] !== e[0]
      })), d(n, "class", a = D("px-4 py-1 uppercase text-sm first:ml-4 ", {
        "bg-white border border-x-black border-t-black border-b-white font-bold -mb-px": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })), this.first = n;
    },
    m(u, g) {
      O(u, n, g), _(n, r), _(r, s), _(n, l), c || (f = W(n, "click", b), c = !0);
    },
    p(u, g) {
      e = u, g & 2 && i !== (i = e[8] + "") && K(s, i), g & 3 && o !== (o = D({
        "-mb-px": e[8] !== e[0]
      })) && d(r, "class", o), g & 11 && a !== (a = D("px-4 py-1 uppercase text-sm first:ml-4 ", {
        "bg-white border border-x-black border-t-black border-b-white font-bold -mb-px": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })) && d(n, "class", a);
    },
    d(u) {
      u && I(n), c = !1, f();
    }
  };
}
function Xi(t) {
  let e, n = [], r = /* @__PURE__ */ new Map(), i = t[1];
  const s = (o) => o[8];
  for (let o = 0; o < i.length; o += 1) {
    let l = wn(t, i, o), a = s(l);
    r.set(a, n[o] = yn(a, l));
  }
  return {
    c() {
      e = M("div");
      for (let o = 0; o < n.length; o += 1)
        n[o].c();
      this.c = A, d(e, "class", "w-full flex bg-black/20 border-b border-b-black");
    },
    m(o, l) {
      O(o, e, l);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
      t[7](e);
    },
    p(o, [l]) {
      l & 27 && (i = o[1], n = Ke(n, l, s, 1, o, i, r, e, Ze, yn, null, wn));
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
  se();
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
class Kn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Ui, Xi, oe, { tabs: 5, selected: 0 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["tabs", "selected"];
  }
  get tabs() {
    return this.$$.ctx[5];
  }
  set tabs(e) {
    this.$$set({ tabs: e }), E();
  }
  get selected() {
    return this.$$.ctx[0];
  }
  set selected(e) {
    this.$$set({ selected: e }), E();
  }
}
customElements.define("v-tabs", Kn);
const qi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Kn
}, Symbol.toStringTag, { value: "Module" }));
function Zi(t) {
  let e;
  return {
    c() {
      e = M("tbody"), e.innerHTML = "<slot></slot>", this.c = A;
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
  return se(), [];
}
class Jn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Ki, Zi, oe, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-tbody", Jn);
const Ji = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jn
}, Symbol.toStringTag, { value: "Module" }));
function Gi(t) {
  let e;
  return {
    c() {
      e = M("th"), e.innerHTML = "<slot></slot>", this.c = A, d(e, "class", "p-2 text-neutral-600 font-normal overflow-hidden");
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
  return se(), [];
}
class Gn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Qi, Gi, oe, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-th", Gn);
const $i = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gn
}, Symbol.toStringTag, { value: "Module" }));
function eo(t) {
  let e;
  return {
    c() {
      e = M("td"), e.innerHTML = "<slot></slot>", this.c = A, d(e, "class", "p-2 overflow-hidden");
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
  return se(), [];
}
class Qn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, to, eo, oe, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-td", Qn);
const no = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qn
}, Symbol.toStringTag, { value: "Module" }));
function ro(t) {
  let e;
  return {
    c() {
      e = M("thead"), e.innerHTML = "<slot></slot>", this.c = A, d(e, "class", "border-b border-black");
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
  return se(), [];
}
class $n extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, io, ro, oe, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-thead", $n);
const oo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $n
}, Symbol.toStringTag, { value: "Module" }));
function Je(t) {
  return t.split("-")[0];
}
function xt(t) {
  return t.split("-")[1];
}
function st(t) {
  return ["top", "bottom"].includes(Je(t)) ? "x" : "y";
}
function er(t) {
  return t === "y" ? "height" : "width";
}
function vn(t, e, n) {
  let {
    reference: r,
    floating: i
  } = t;
  const s = r.x + r.width / 2 - i.width / 2, o = r.y + r.height / 2 - i.height / 2, l = st(e), a = er(l), c = r[a] / 2 - i[a] / 2, f = Je(e), b = l === "x";
  let u;
  switch (f) {
    case "top":
      u = {
        x: s,
        y: r.y - i.height
      };
      break;
    case "bottom":
      u = {
        x: s,
        y: r.y + r.height
      };
      break;
    case "right":
      u = {
        x: r.x + r.width,
        y: o
      };
      break;
    case "left":
      u = {
        x: r.x - i.width,
        y: o
      };
      break;
    default:
      u = {
        x: r.x,
        y: r.y
      };
  }
  switch (xt(e)) {
    case "start":
      u[l] -= c * (n && b ? -1 : 1);
      break;
    case "end":
      u[l] += c * (n && b ? -1 : 1);
      break;
  }
  return u;
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
    y: f
  } = vn(a, r, l), b = r, u = {}, g = 0;
  for (let p = 0; p < s.length; p++) {
    const {
      name: v,
      fn: w
    } = s[p], {
      x: R,
      y: L,
      data: T,
      reset: x
    } = await w({
      x: c,
      y: f,
      initialPlacement: r,
      placement: b,
      strategy: i,
      middlewareData: u,
      rects: a,
      platform: o,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (c = R ?? c, f = L ?? f, u = {
      ...u,
      [v]: {
        ...u[v],
        ...T
      }
    }, x && g <= 50) {
      g++, typeof x == "object" && (x.placement && (b = x.placement), x.rects && (a = x.rects === !0 ? await o.getElementRects({
        reference: t,
        floating: e,
        strategy: i
      }) : x.rects), {
        x: c,
        y: f
      } = vn(a, b, l)), p = -1;
      continue;
    }
  }
  return {
    x: c,
    y: f,
    placement: b,
    strategy: i,
    middlewareData: u
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
function nt(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
async function tr(t, e) {
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
    altBoundary: u = !1,
    padding: g = 0
  } = e, p = ao(g), w = l[u ? b === "floating" ? "reference" : "floating" : b], R = nt(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(w))) == null || n ? w : w.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(l.floating)),
    boundary: c,
    rootBoundary: f,
    strategy: a
  })), L = nt(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: b === "floating" ? {
      ...o.floating,
      x: r,
      y: i
    } : o.reference,
    offsetParent: await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating)),
    strategy: a
  }) : o[b]);
  return {
    top: R.top - L.top + p.top,
    bottom: L.bottom - R.bottom + p.bottom,
    left: R.left - L.left + p.left,
    right: L.right - R.right + p.right
  };
}
const co = Math.min, uo = Math.max;
function _n(t, e, n) {
  return uo(t, co(e, n));
}
const fo = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function rt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => fo[e]);
}
function ho(t, e, n) {
  n === void 0 && (n = !1);
  const r = xt(t), i = st(t), s = er(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (o = rt(o)), {
    main: o,
    cross: rt(o)
  };
}
const bo = {
  start: "end",
  end: "start"
};
function kn(t) {
  return t.replace(/start|end/g, (e) => bo[e]);
}
function mo(t) {
  const e = rt(t);
  return [kn(t), e, kn(e)];
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
        crossAxis: f = !0,
        fallbackPlacements: b,
        fallbackStrategy: u = "bestFit",
        flipAlignment: g = !0,
        ...p
      } = t, v = Je(r), R = b || (v === o || !g ? [rt(o)] : mo(o)), L = [o, ...R], T = await tr(e, p), x = [];
      let P = ((n = i.flip) == null ? void 0 : n.overflows) || [];
      if (c && x.push(T[v]), f) {
        const {
          main: y,
          cross: N
        } = ho(r, s, await (l.isRTL == null ? void 0 : l.isRTL(a.floating)));
        x.push(T[y], T[N]);
      }
      if (P = [...P, {
        placement: r,
        overflows: x
      }], !x.every((y) => y <= 0)) {
        var C, z;
        const y = ((C = (z = i.flip) == null ? void 0 : z.index) != null ? C : 0) + 1, N = L[y];
        if (N)
          return {
            data: {
              index: y,
              overflows: P
            },
            reset: {
              placement: N
            }
          };
        let H = "bottom";
        switch (u) {
          case "bestFit": {
            var V;
            const te = (V = P.map((F) => [F, F.overflows.filter((Y) => Y > 0).reduce((Y, ue) => Y + ue, 0)]).sort((F, Y) => F[1] - Y[1])[0]) == null ? void 0 : V[0].placement;
            te && (H = te);
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
  } = t, s = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Je(n), l = xt(n), a = st(n) === "x", c = ["left", "top"].includes(o) ? -1 : 1, f = s && a ? -1 : 1, b = typeof e == "function" ? e(t) : e;
  let {
    mainAxis: u,
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
    y: u * c
  } : {
    x: u * c,
    y: g * f
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
          fn: (w) => {
            let {
              x: R,
              y: L
            } = w;
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
      }, f = await tr(e, a), b = st(Je(i)), u = yo(b);
      let g = c[b], p = c[u];
      if (s) {
        const w = b === "y" ? "top" : "left", R = b === "y" ? "bottom" : "right", L = g + f[w], T = g - f[R];
        g = _n(L, g, T);
      }
      if (o) {
        const w = u === "y" ? "top" : "left", R = u === "y" ? "bottom" : "right", L = p + f[w], T = p - f[R];
        p = _n(L, p, T);
      }
      const v = l.fn({
        ...e,
        [b]: g,
        [u]: p
      });
      return {
        ...v,
        data: {
          x: v.x - n,
          y: v.y - r
        }
      };
    }
  };
};
function nr(t) {
  return t && t.document && t.location && t.alert && t.setInterval;
}
function Ee(t) {
  if (t == null)
    return window;
  if (!nr(t)) {
    const e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function we(t) {
  return Ee(t).getComputedStyle(t);
}
function Me(t) {
  return nr(t) ? "" : t ? (t.nodeName || "").toLowerCase() : "";
}
function rr() {
  const t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map((e) => e.brand + "/" + e.version).join(" ") : navigator.userAgent;
}
function ye(t) {
  return t instanceof Ee(t).HTMLElement;
}
function Ie(t) {
  return t instanceof Ee(t).Element;
}
function _o(t) {
  return t instanceof Ee(t).Node;
}
function Ne(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = Ee(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function lt(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r
  } = we(t);
  return /auto|scroll|overlay|hidden/.test(e + r + n);
}
function ko(t) {
  return ["table", "td", "th"].includes(Me(t));
}
function ir(t) {
  const e = /firefox/i.test(rr()), n = we(t);
  return n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].includes(n.willChange) || e && n.willChange === "filter" || e && (n.filter ? n.filter !== "none" : !1);
}
function or() {
  return !/^((?!chrome|android).)*safari/i.test(rr());
}
const xn = Math.min, Ye = Math.max, it = Math.round;
function je(t, e, n) {
  var r, i, s, o;
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const l = t.getBoundingClientRect();
  let a = 1, c = 1;
  e && ye(t) && (a = t.offsetWidth > 0 && it(l.width) / t.offsetWidth || 1, c = t.offsetHeight > 0 && it(l.height) / t.offsetHeight || 1);
  const f = Ie(t) ? Ee(t) : window, b = !or() && n, u = (l.left + (b && (r = (i = f.visualViewport) == null ? void 0 : i.offsetLeft) != null ? r : 0)) / a, g = (l.top + (b && (s = (o = f.visualViewport) == null ? void 0 : o.offsetTop) != null ? s : 0)) / c, p = l.width / a, v = l.height / c;
  return {
    width: p,
    height: v,
    top: g,
    right: u + p,
    bottom: g + v,
    left: u,
    x: u,
    y: g
  };
}
function Oe(t) {
  return ((_o(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function at(t) {
  return Ie(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function sr(t) {
  return je(Oe(t)).left + at(t).scrollLeft;
}
function xo(t) {
  const e = je(t);
  return it(e.width) !== t.offsetWidth || it(e.height) !== t.offsetHeight;
}
function Mo(t, e, n) {
  const r = ye(e), i = Oe(e), s = je(t, r && xo(e), n === "fixed");
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = {
    x: 0,
    y: 0
  };
  if (r || !r && n !== "fixed")
    if ((Me(e) !== "body" || lt(i)) && (o = at(e)), ye(e)) {
      const a = je(e, !0);
      l.x = a.x + e.clientLeft, l.y = a.y + e.clientTop;
    } else
      i && (l.x = sr(i));
  return {
    x: s.left + o.scrollLeft - l.x,
    y: s.top + o.scrollTop - l.y,
    width: s.width,
    height: s.height
  };
}
function lr(t) {
  return Me(t) === "html" ? t : t.assignedSlot || t.parentNode || (Ne(t) ? t.host : null) || Oe(t);
}
function Mn(t) {
  return !ye(t) || we(t).position === "fixed" ? null : Eo(t);
}
function Eo(t) {
  let {
    offsetParent: e
  } = t, n = t, r = !1;
  for (; n && n !== e; ) {
    const {
      assignedSlot: i
    } = n;
    if (i) {
      let s = i.offsetParent;
      if (we(i).display === "contents") {
        const o = i.hasAttribute("style"), l = i.style.display;
        i.style.display = we(n).display, s = i.offsetParent, i.style.display = l, o || i.removeAttribute("style");
      }
      n = i, e !== s && (e = s, r = !0);
    } else if (Ne(n) && n.host && r)
      break;
    n = Ne(n) && n.host || n.parentNode;
  }
  return e;
}
function So(t) {
  let e = lr(t);
  for (Ne(e) && (e = e.host); ye(e) && !["html", "body"].includes(Me(e)); ) {
    if (ir(e))
      return e;
    {
      const n = e.parentNode;
      e = Ne(n) ? n.host : n;
    }
  }
  return null;
}
function wt(t) {
  const e = Ee(t);
  let n = Mn(t);
  for (; n && ko(n) && we(n).position === "static"; )
    n = Mn(n);
  return n && (Me(n) === "html" || Me(n) === "body" && we(n).position === "static" && !ir(n)) ? e : n || So(t) || e;
}
function En(t) {
  if (ye(t))
    return {
      width: t.offsetWidth,
      height: t.offsetHeight
    };
  const e = je(t);
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
  const i = ye(n), s = Oe(n);
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
  if ((i || !i && r !== "fixed") && ((Me(n) !== "body" || lt(s)) && (o = at(n)), ye(n))) {
    const a = je(n, !0);
    l.x = a.x + n.clientLeft, l.y = a.y + n.clientTop;
  }
  return {
    ...e,
    x: e.x - o.scrollLeft + l.x,
    y: e.y - o.scrollTop + l.y
  };
}
function Ao(t, e) {
  const n = Ee(t), r = Oe(t), i = n.visualViewport;
  let s = r.clientWidth, o = r.clientHeight, l = 0, a = 0;
  if (i) {
    s = i.width, o = i.height;
    const c = or();
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
  const n = Oe(t), r = at(t), i = (e = t.ownerDocument) == null ? void 0 : e.body, s = Ye(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = Ye(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0);
  let l = -r.scrollLeft + sr(t);
  const a = -r.scrollTop;
  return we(i || n).direction === "rtl" && (l += Ye(n.clientWidth, i ? i.clientWidth : 0) - s), {
    width: s,
    height: o,
    x: l,
    y: a
  };
}
function ar(t) {
  const e = lr(t);
  return ["html", "body", "#document"].includes(Me(e)) ? t.ownerDocument.body : ye(e) && lt(e) ? e : ar(e);
}
function cr(t, e) {
  var n;
  e === void 0 && (e = []);
  const r = ar(t), i = r === ((n = t.ownerDocument) == null ? void 0 : n.body), s = Ee(r), o = i ? [s].concat(s.visualViewport || [], lt(r) ? r : []) : r, l = e.concat(o);
  return i ? l : l.concat(cr(o));
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
function Po(t, e) {
  const n = je(t, !1, e === "fixed"), r = n.top + t.clientTop, i = n.left + t.clientLeft;
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
function Sn(t, e, n) {
  return e === "viewport" ? nt(Ao(t, n)) : Ie(e) ? Po(e, n) : nt(Oo(Oe(t)));
}
function To(t) {
  const e = cr(t), r = ["absolute", "fixed"].includes(we(t).position) && ye(t) ? wt(t) : t;
  return Ie(r) ? e.filter((i) => Ie(i) && Ro(i, r) && Me(i) !== "body") : [];
}
function jo(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = t;
  const o = [...n === "clippingAncestors" ? To(e) : [].concat(n), r], l = o[0], a = o.reduce((c, f) => {
    const b = Sn(e, f, i);
    return c.top = Ye(b.top, c.top), c.right = xn(b.right, c.right), c.bottom = xn(b.bottom, c.bottom), c.left = Ye(b.left, c.left), c;
  }, Sn(e, l, i));
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
  getDimensions: En,
  getOffsetParent: wt,
  getDocumentElement: Oe,
  getElementRects: (t) => {
    let {
      reference: e,
      floating: n,
      strategy: r
    } = t;
    return {
      reference: Mo(e, wt(n), r),
      floating: {
        ...En(n),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => we(t).direction === "rtl"
}, Vo = (t, e, n) => so(t, e, {
  platform: zo,
  ...n
});
function Lo(t) {
  let e, n, r, i, s, o, l;
  return {
    c() {
      e = M("div"), n = M("slot"), r = B(), i = M("div"), s = U(t[0]), this.c = A, d(i, "role", "tooltip"), d(i, "class", `
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
    `), be(i, "transform", "translate(" + t[4] + "px, " + t[5] + "px)"), Q(i, "invisible", t[3]), d(e, "class", "relative"), d(e, "aria-describedby", "tooltip");
    },
    m(a, c) {
      O(a, e, c), _(e, n), _(e, r), _(e, i), _(i, s), t[9](i), t[10](e), o || (l = [
        W(e, "mouseenter", t[6]),
        W(e, "mouseleave", t[7])
      ], o = !0);
    },
    p(a, [c]) {
      c & 1 && K(s, a[0]), c & 48 && be(i, "transform", "translate(" + a[4] + "px, " + a[5] + "px)"), c & 8 && Q(i, "invisible", a[3]);
    },
    i: A,
    o: A,
    d(a) {
      a && I(e), t[9](null), t[10](null), o = !1, pe(l);
    }
  };
}
function Io(t, e, n) {
  let { text: r = "" } = e, { location: i = "top" } = e, s, o, l = !0, a = 0, c = 0;
  const f = async () => {
    const v = await Vo(s, o, {
      placement: i,
      middleware: [po(), vo({ padding: 5 }), wo(10)]
    });
    n(4, a = v.x), n(5, c = v.y);
  }, b = async () => {
    await f(), n(3, l = !1);
  }, u = () => {
    n(3, l = !0);
  };
  se();
  function g(v) {
    ce[v ? "unshift" : "push"](() => {
      o = v, n(2, o);
    });
  }
  function p(v) {
    ce[v ? "unshift" : "push"](() => {
      s = v, n(1, s);
    });
  }
  return t.$$set = (v) => {
    "text" in v && n(0, r = v.text), "location" in v && n(8, i = v.location);
  }, [
    r,
    s,
    o,
    l,
    a,
    c,
    b,
    u,
    i,
    g,
    p
  ];
}
class ur extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Io, Lo, oe, { text: 0, location: 8 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["text", "location"];
  }
  get text() {
    return this.$$.ctx[0];
  }
  set text(e) {
    this.$$set({ text: e }), E();
  }
  get location() {
    return this.$$.ctx[8];
  }
  set location(e) {
    this.$$set({ location: e }), E();
  }
}
customElements.define("v-tooltip", ur);
const No = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ur
}, Symbol.toStringTag, { value: "Module" }));
function Fo(t) {
  let e;
  return {
    c() {
      e = M("tr"), e.innerHTML = "<slot></slot>", this.c = A, d(e, "class", "border-b");
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
  return se(), [];
}
class fr extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Do, Fo, oe, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-tr", fr);
const Ho = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fr
}, Symbol.toStringTag, { value: "Module" }));
