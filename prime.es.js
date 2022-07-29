(function() {
  const t = /* @__PURE__ */ new WeakMap(), e = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), m = /* @__PURE__ */ new WeakMap(), h = /* @__PURE__ */ new WeakMap(), p = /* @__PURE__ */ new WeakMap(), g = { attributes: !0, attributeFilter: ["disabled"] }, b = new MutationObserver((_) => {
    for (const f of _) {
      const w = f.target;
      if (w.constructor.formAssociated) {
        const R = w.hasAttribute("disabled");
        w.toggleAttribute("internals-disabled", R), R ? w.setAttribute("aria-disabled", "true") : w.removeAttribute("aria-disabled"), w.formDisabledCallback && w.formDisabledCallback.apply(w, [R]);
      }
    }
  }), V = (_) => {
    n.get(_).forEach((w) => {
      w.remove();
    }), n.set(_, []);
  }, x = (_, f) => {
    const w = document.createElement("input");
    return w.type = "hidden", w.name = _.getAttribute("name"), _.after(w), n.get(f).push(w), w;
  }, F = (_, f) => {
    n.set(f, []);
    const w = _.hasAttribute("disabled");
    _.toggleAttribute("internals-disabled", w), b.observe(_, g);
  }, T = (_, f) => {
    if (f.length) {
      Array.from(f).forEach((R) => R.addEventListener("click", _.focus.bind(_)));
      let w = f[0].id;
      f[0].id || (w = `${f[0].htmlFor}_Label`, f[0].id = w), _.setAttribute("aria-labelledby", w);
    }
  }, S = (_) => {
    const f = Array.from(_.elements).filter((W) => W.validity).map((W) => W.validity.valid), w = Array.from(o.get(_)).filter((W) => W.isConnected).map((W) => i.get(W).validity.valid), R = [...f, ...w].includes(!1);
    _.toggleAttribute("internals-invalid", R), _.toggleAttribute("internals-valid", !R);
  }, L = (_) => {
    S(D(_.target));
  }, P = (_) => {
    S(D(_.target));
  }, k = (_) => {
    const f = _.target, w = o.get(f);
    f.noValidate || w.size && (Array.from(w).reverse().map((ne) => i.get(ne).reportValidity()).includes(!1) ? (_.stopImmediatePropagation(), _.stopPropagation(), _.preventDefault()) : p.get(f) && p.get(f).call(f, _) === !1 && _.preventDefault());
  }, I = (_) => {
    const f = o.get(_.target);
    f && f.size && f.forEach((w) => {
      w.constructor.formAssociated && w.formResetCallback && w.formResetCallback.apply(w);
    });
  }, O = (_, f, w) => {
    if (f) {
      f.onsubmit && (p.set(f, f.onsubmit.bind(f)), f.onsubmit = null);
      const R = o.get(f);
      if (R)
        R.add(_);
      else {
        const W = /* @__PURE__ */ new Set();
        W.add(_), o.set(f, W), f.addEventListener("submit", k), f.addEventListener("reset", I), f.addEventListener("input", L), f.addEventListener("change", P);
      }
      r.set(f, { ref: _, internals: w }), _.constructor.formAssociated && _.formAssociatedCallback && setTimeout(() => {
        _.formAssociatedCallback.apply(_, [f]);
      }, 0), S(f);
    }
  }, D = (_) => {
    let f = _.parentNode;
    return f && f.tagName !== "FORM" && (f = D(f)), f;
  }, j = (_, f, w = DOMException) => {
    if (!_.constructor.formAssociated)
      throw new w(f);
  }, le = (_, f, w) => {
    const R = o.get(_);
    return R && R.size && R.forEach((W) => {
      i.get(W)[w]() || (f = !1);
    }), f;
  }, ae = (_) => {
    if (_.constructor.formAssociated) {
      const f = i.get(_), { labels: w, form: R } = f;
      T(_, w), O(_, R, f);
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
  }, ye = (_, f) => {
    for (let w in re) {
      f[w] = null;
      let R = null;
      const W = re[w];
      Object.defineProperty(f, w, {
        get() {
          return R;
        },
        set(ne) {
          R = ne, _.isConnected ? _.setAttribute(W, ne) : c.set(_, f);
        }
      });
    }
  };
  class fe {
    constructor() {
      this.badInput = !1, this.customError = !1, this.patternMismatch = !1, this.rangeOverflow = !1, this.rangeUnderflow = !1, this.stepMismatch = !1, this.tooLong = !1, this.tooShort = !1, this.typeMismatch = !1, this.valid = !0, this.valueMissing = !1, Object.seal(this);
    }
  }
  const Se = (_) => (_.badInput = !1, _.customError = !1, _.patternMismatch = !1, _.rangeOverflow = !1, _.rangeUnderflow = !1, _.stepMismatch = !1, _.tooLong = !1, _.tooShort = !1, _.typeMismatch = !1, _.valid = !0, _.valueMissing = !1, _), ve = (_, f, w) => (_.valid = ke(f), Object.keys(f).forEach((R) => _[R] = f[R]), w && S(w), _), ke = (_) => {
    let f = !0;
    for (let w in _)
      w !== "valid" && _[w] !== !1 && (f = !1);
    return f;
  };
  function he(_) {
    _.forEach((f) => {
      const { addedNodes: w, removedNodes: R } = f, W = Array.from(w), ne = Array.from(R);
      W.forEach((q) => {
        if (i.has(q) && q.constructor.formAssociated) {
          const G = i.get(q), { form: ie } = G;
          O(q, ie, G), T(q, G.labels);
        }
        if (c.has(q)) {
          const G = c.get(q);
          Object.keys(re).filter((ce) => G[ce] !== null).forEach((ce) => {
            q.setAttribute(re[ce], G[ce]);
          }), c.delete(q);
        }
      }), ne.forEach((q) => {
        const G = i.get(q);
        G && n.get(G) && V(G), l.has(q) && l.get(q).disconnect();
      });
    });
  }
  function Re(_) {
    _.forEach((f) => {
      const { removedNodes: w } = f;
      w.forEach((R) => {
        const W = h.get(f.target);
        i.has(R) && ae(R), W.disconnect();
      });
    });
  }
  const Je = (_) => {
    const f = new MutationObserver(Re);
    f.observe(_, { childList: !0 }), h.set(_, f);
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
    constructor(f) {
      if (super(), !f || !f.tagName || f.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      Le.set(this, f);
    }
    add(f) {
      if (!/^--/.test(f) || typeof f != "string")
        throw new DOMException(`Failed to execute 'add' on 'CustomStateSet': The specified value ${f} must start with '--'.`);
      const w = super.add(f), R = Le.get(this);
      return R.toggleAttribute(`state${f}`, !0), R.part && R.part.add(`state${f}`), w;
    }
    clear() {
      for (let [f] of this.entries())
        this.delete(f);
      super.clear();
    }
    delete(f) {
      const w = super.delete(f), R = Le.get(this);
      return R.toggleAttribute(`state${f}`, !1), R.part && R.part.remove(`state${f}`), w;
    }
  }
  class Ce {
    constructor(f) {
      if (!f || !f.tagName || f.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      const w = f.getRootNode(), R = new fe();
      this.states = new Ae(f), t.set(this, f), e.set(this, R), i.set(f, this), ye(f, this), F(f, this), Object.seal(this), ae(f), w instanceof DocumentFragment && Je(w);
    }
    static get isPolyfilled() {
      return !0;
    }
    checkValidity() {
      const f = t.get(this);
      if (j(f, "Failed to execute 'checkValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const w = e.get(this);
      if (!w.valid) {
        const R = new Event("invalid", {
          bubbles: !1,
          cancelable: !0,
          composed: !1
        });
        f.dispatchEvent(R);
      }
      return w.valid;
    }
    get form() {
      const f = t.get(this);
      j(f, "Failed to read the 'form' property from 'ElementInternals': The target element is not a form-associated custom element.");
      let w;
      return f.constructor.formAssociated === !0 && (w = D(f)), w;
    }
    get labels() {
      const f = t.get(this);
      j(f, "Failed to read the 'labels' property from 'ElementInternals': The target element is not a form-associated custom element.");
      const w = f.getAttribute("id"), R = f.getRootNode();
      return R && w ? R.querySelectorAll(`[for=${w}]`) : [];
    }
    reportValidity() {
      const f = t.get(this);
      if (j(f, "Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const w = this.checkValidity(), R = m.get(this);
      if (R && !f.constructor.formAssociated)
        throw new DOMException("Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element.");
      return !w && R && (f.focus(), R.focus()), w;
    }
    setFormValue(f) {
      const w = t.get(this);
      if (j(w, "Failed to execute 'setFormValue' on 'ElementInternals': The target element is not a form-associated custom element."), V(this), f != null && !(f instanceof FormData)) {
        if (w.getAttribute("name")) {
          const R = x(w, this);
          R.value = f;
        }
      } else
        f != null && f instanceof FormData && f.forEach((R, W) => {
          if (typeof R == "string") {
            const ne = x(w, this);
            ne.name = W, ne.value = R;
          }
        });
      a.set(w, f);
    }
    setValidity(f, w, R) {
      const W = t.get(this);
      if (j(W, "Failed to execute 'setValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !f)
        throw new TypeError("Failed to execute 'setValidity' on 'ElementInternals': 1 argument required, but only 0 present.");
      m.set(this, R);
      const ne = e.get(this), q = {};
      for (const ce in f)
        q[ce] = f[ce];
      Object.keys(q).length === 0 && Se(ne);
      const G = { ...ne, ...q };
      delete G.valid;
      const { valid: ie } = ve(ne, G, this.form);
      if (!ie && !w)
        throw new DOMException("Failed to execute 'setValidity' on 'ElementInternals': The second argument should not be empty if one or more flags in the first argument are true.");
      s.set(this, ie ? "" : w), W.toggleAttribute("internals-invalid", !ie), W.toggleAttribute("internals-valid", ie), W.setAttribute("aria-invalid", `${!ie}`);
    }
    get shadowRoot() {
      const f = t.get(this), w = u.get(f);
      return w || null;
    }
    get validationMessage() {
      const f = t.get(this);
      return j(f, "Failed to read the 'validationMessage' property from 'ElementInternals': The target element is not a form-associated custom element."), s.get(this);
    }
    get validity() {
      const f = t.get(this);
      return j(f, "Failed to read the 'validity' property from 'ElementInternals': The target element is not a form-associated custom element."), e.get(this);
    }
    get willValidate() {
      const f = t.get(this);
      return j(f, "Failed to read the 'willValidate' property from 'ElementInternals': The target element is not a form-associated custom element."), !(f.disabled || f.hasAttribute("disabled") || f.hasAttribute("readonly"));
    }
  }
  function Qe() {
    if (!window.ElementInternals)
      return !1;
    class _ extends HTMLElement {
      constructor() {
        super(), this.internals = this.attachInternals();
      }
    }
    const f = `element-internals-feature-detection-${Math.random().toString(36).replace(/[^a-z]+/g, "")}`;
    customElements.define(f, _);
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
  if (Qe()) {
    if (!window.CustomStateSet) {
      window.CustomStateSet = Ae;
      const _ = HTMLElement.prototype.attachInternals;
      HTMLElement.prototype.attachInternals = function(...f) {
        const w = _.call(this, f);
        return w.states = new Ae(this), w;
      };
    }
  } else {
    let _ = function(...G) {
      const ie = R.apply(this, G), ce = new MutationObserver(he);
      return u.set(this, ie), window.ShadyDOM ? ce.observe(this, Ve) : ce.observe(ie, Ve), l.set(this, ce), ie;
    }, f = function(...G) {
      let ie = ne.apply(this, G);
      return le(this, ie, "checkValidity");
    }, w = function(...G) {
      let ie = q.apply(this, G);
      return le(this, ie, "reportValidity");
    };
    var Hn = _, jn = f, zn = w;
    window.ElementInternals = Ce, HTMLElement.prototype.attachInternals = function() {
      if (this.tagName.indexOf("-") === -1)
        throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': Unable to attach ElementInternals to non-custom elements.");
      if (i.has(this))
        throw new DOMException("DOMException: Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");
      return new Ce(this);
    };
    const R = Element.prototype.attachShadow;
    Element.prototype.attachShadow = _, new MutationObserver(he).observe(document.documentElement, Ve);
    const ne = HTMLFormElement.prototype.checkValidity;
    HTMLFormElement.prototype.checkValidity = f;
    const q = HTMLFormElement.prototype.reportValidity;
    HTMLFormElement.prototype.reportValidity = w, window.CustomStateSet || (window.CustomStateSet = Ae);
  }
})();
function M() {
}
function rt(t) {
  return t();
}
function ht() {
  return /* @__PURE__ */ Object.create(null);
}
function pe(t) {
  t.forEach(rt);
}
function nn(t) {
  return typeof t == "function";
}
function sn(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function se(t, e) {
  return t != t ? e == e : t !== e;
}
function Zn(t) {
  return Object.keys(t).length === 0;
}
function qn(t, ...e) {
  if (t == null)
    return M;
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const ln = typeof window < "u";
let mt = ln ? () => window.performance.now() : () => Date.now(), rn = ln ? (t) => requestAnimationFrame(t) : M;
const Te = /* @__PURE__ */ new Set();
function on(t) {
  Te.forEach((e) => {
    e.c(t) || (Te.delete(e), e.f());
  }), Te.size !== 0 && rn(on);
}
function Xn(t) {
  let e;
  return Te.size === 0 && rn(on), {
    promise: new Promise((n) => {
      Te.add(e = { c: t, f: n });
    }),
    abort() {
      Te.delete(e);
    }
  };
}
function y(t, e) {
  t.appendChild(e);
}
function C(t, e, n) {
  t.insertBefore(e, n || null);
}
function N(t) {
  t.parentNode.removeChild(t);
}
function Xe(t, e) {
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
function z() {
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
function d(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function Un(t) {
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
function Ue() {
  if (!Ne)
    throw new Error("Function called outside component initialization");
  return Ne;
}
function Yn(t) {
  Ue().$$.on_mount.push(t);
}
const xe = [], oe = [], De = [], gt = [], Kn = Promise.resolve();
let et = !1;
function Gn() {
  et || (et = !0, Kn.then(E));
}
function tt(t) {
  De.push(t);
}
const $e = /* @__PURE__ */ new Set();
let ze = 0;
function E() {
  const t = Ne;
  do {
    for (; ze < xe.length; ) {
      const e = xe[ze];
      ze++, Ie(e), Jn(e.$$);
    }
    for (Ie(null), xe.length = 0, ze = 0; oe.length; )
      oe.pop()();
    for (let e = 0; e < De.length; e += 1) {
      const n = De[e];
      $e.has(n) || ($e.add(n), n());
    }
    De.length = 0;
  } while (xe.length);
  for (; gt.length; )
    gt.pop()();
  et = !1, $e.clear(), Ie(t);
}
function Jn(t) {
  if (t.fragment !== null) {
    t.update(), pe(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(tt);
  }
}
const Qn = /* @__PURE__ */ new Set();
function an(t, e) {
  t && t.i && (Qn.delete(t), t.i(e));
}
function at(t, e) {
  t.d(1), e.delete(t.key);
}
function ct(t, e, n, i, s, r, l, o, a, c, u, m) {
  let h = t.length, p = r.length, g = h;
  const b = {};
  for (; g--; )
    b[t[g].key] = g;
  const V = [], x = /* @__PURE__ */ new Map(), F = /* @__PURE__ */ new Map();
  for (g = p; g--; ) {
    const P = m(s, r, g), k = n(P);
    let I = l.get(k);
    I ? i && I.p(P, e) : (I = c(k, P), I.c()), x.set(k, V[g] = I), k in b && F.set(k, Math.abs(g - b[k]));
  }
  const T = /* @__PURE__ */ new Set(), S = /* @__PURE__ */ new Set();
  function L(P) {
    an(P, 1), P.m(o, u), l.set(P.key, P), u = P.first, p--;
  }
  for (; h && p; ) {
    const P = V[p - 1], k = t[h - 1], I = P.key, O = k.key;
    P === k ? (u = P.first, h--, p--) : x.has(O) ? !l.has(I) || T.has(I) ? L(P) : S.has(O) ? h-- : F.get(I) > F.get(O) ? (S.add(I), L(P)) : (T.add(O), h--) : (a(k, l), h--);
  }
  for (; h--; ) {
    const P = t[h];
    x.has(P.key) || a(P, l);
  }
  for (; p; )
    L(V[p - 1]);
  return V;
}
function $n(t, e, n, i) {
  const { fragment: s, on_mount: r, on_destroy: l, after_update: o } = t.$$;
  s && s.m(e, n), i || tt(() => {
    const a = r.map(rt).filter(nn);
    l ? l.push(...a) : pe(a), t.$$.on_mount = [];
  }), o.forEach(tt);
}
function ei(t, e) {
  const n = t.$$;
  n.fragment !== null && (pe(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function ti(t, e) {
  t.$$.dirty[0] === -1 && (xe.push(t), Gn(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function ee(t, e, n, i, s, r, l, o = [-1]) {
  const a = Ne;
  Ie(t);
  const c = t.$$ = {
    fragment: null,
    ctx: null,
    props: r,
    update: M,
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
  l && l(c.root);
  let u = !1;
  if (c.ctx = n ? n(t, e.props || {}, (m, h, ...p) => {
    const g = p.length ? p[0] : h;
    return c.ctx && s(c.ctx[m], c.ctx[m] = g) && (!c.skip_bound && c.bound[m] && c.bound[m](g), u && ti(t, m)), h;
  }) : [], c.update(), u = !0, pe(c.before_update), c.fragment = i ? i(c.ctx) : !1, e.target) {
    if (e.hydrate) {
      const m = Un(e.target);
      c.fragment && c.fragment.l(m), m.forEach(N);
    } else
      c.fragment && c.fragment.c();
    e.intro && an(t.$$.fragment), $n(t, e.target, e.anchor, e.customElement), E();
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
    this.$$.on_disconnect = t.map(rt).filter(nn);
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
    ei(this, 1), this.$destroy = M;
  }
  $on(t, e) {
    const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return n.push(e), () => {
      const i = n.indexOf(e);
      i !== -1 && n.splice(i, 1);
    };
  }
  $set(t) {
    this.$$set && !Zn(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
});
const { base: nt = "", query: it = "" } = window.PRIME_CONFIG ?? {}, ut = document.createElement("link");
ut.rel = "stylesheet";
ut.href = `${nt ?? ""}/prime.css${it}`;
const te = () => {
  const t = Ue();
  Yn(() => {
    const e = t.style.getPropertyValue("display");
    t.style.setProperty("display", "none");
    const n = ut.cloneNode();
    n.addEventListener("load", () => {
      e ? t.style.setProperty("display", e) : t.style.removeProperty("display");
    }), t.shadowRoot.prepend(n);
  });
}, ni = async () => {
  const t = new FontFace("icons", nt ? `url(${nt}/icons.woff2${it})` : `url(icons.woff2${it})`);
  await t.load(), document.fonts.add(t);
}, be = (t, e, n) => t.dispatchEvent(new CustomEvent(e, {
  composed: !0,
  bubbles: !0,
  detail: n
}));
customElements.get("v-badge") ? console.warn("WARNING: Multiple instances of PRIME being imported.") : (ni().catch((t) => console.error(t)), Promise.resolve().then(() => li), Promise.resolve().then(() => ai), Promise.resolve().then(() => hi), Promise.resolve().then(() => gi), Promise.resolve().then(() => wi), Promise.resolve().then(() => ki), Promise.resolve().then(() => Ci), Promise.resolve().then(() => xi), Promise.resolve().then(() => Ni), Promise.resolve().then(() => zi), Promise.resolve().then(() => Xi), Promise.resolve().then(() => Ki), Promise.resolve().then(() => Qi), Promise.resolve().then(() => ts), Promise.resolve().then(() => ss), Promise.resolve().then(() => os), Promise.resolve().then(() => us), Promise.resolve().then(() => hs), Promise.resolve().then(() => Zs), Promise.resolve().then(() => Us));
var cn = { exports: {} };
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
        var r = arguments[s];
        if (!!r) {
          var l = typeof r;
          if (l === "string" || l === "number")
            i.push(r);
          else if (Array.isArray(r)) {
            if (r.length) {
              var o = n.apply(null, r);
              o && i.push(o);
            }
          } else if (l === "object")
            if (r.toString === Object.prototype.toString)
              for (var a in r)
                e.call(r, a) && r[a] && i.push(a);
            else
              i.push(r.toString());
        }
      }
      return i.join(" ");
    }
    t.exports ? (n.default = n, t.exports = n) : window.classNames = n;
  })();
})(cn);
const H = cn.exports;
function ii(t) {
  let e, n, i;
  return {
    c() {
      e = A("small"), n = X(t[0]), this.c = M, d(e, "class", i = H("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": t[1] === "green",
        "text-orange-900 bg-orange-200": t[1] === "orange",
        "text-red-900 bg-red-200": t[1] === "red",
        "text-gray-800 bg-gray-200": t[1] === "gray"
      }));
    },
    m(s, r) {
      C(s, e, r), y(e, n);
    },
    p(s, [r]) {
      r & 1 && K(n, s[0]), r & 2 && i !== (i = H("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": s[1] === "green",
        "text-orange-900 bg-orange-200": s[1] === "orange",
        "text-red-900 bg-red-200": s[1] === "red",
        "text-gray-800 bg-gray-200": s[1] === "gray"
      })) && d(e, "class", i);
    },
    i: M,
    o: M,
    d(s) {
      s && N(e);
    }
  };
}
function si(t, e, n) {
  let { label: i = "" } = e, { variant: s = "gray" } = e;
  return te(), t.$$set = (r) => {
    "label" in r && n(0, i = r.label), "variant" in r && n(1, s = r.variant);
  }, [i, s];
}
class un extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, si, ii, se, { label: 0, variant: 1 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-badge", un);
const li = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: un
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
  let n, i = e[2] + "", s, r, l, o = e[4] !== e[0].length - 1 && _t();
  return {
    key: t,
    first: null,
    c() {
      n = A("small"), s = X(i), r = z(), o && o.c(), l = ot(), d(n, "class", "py1"), this.first = n;
    },
    m(a, c) {
      C(a, n, c), y(n, s), C(a, r, c), o && o.m(a, c), C(a, l, c);
    },
    p(a, c) {
      e = a, c & 1 && i !== (i = e[2] + "") && K(s, i), e[4] !== e[0].length - 1 ? o || (o = _t(), o.c(), o.m(l.parentNode, l)) : o && (o.d(1), o = null);
    },
    d(a) {
      a && N(n), a && N(r), o && o.d(a), a && N(l);
    }
  };
}
function ri(t) {
  let e, n = [], i = /* @__PURE__ */ new Map(), s = t[0];
  const r = (l) => l[2];
  for (let l = 0; l < s.length; l += 1) {
    let o = pt(t, s, l), a = r(o);
    i.set(a, n[l] = wt(a, o));
  }
  return {
    c() {
      e = A("div");
      for (let l = 0; l < n.length; l += 1)
        n[l].c();
      this.c = M, d(e, "class", "inline-flex gap-3 px-4 border border-black rounded-full");
    },
    m(l, o) {
      C(l, e, o);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
    },
    p(l, [o]) {
      o & 1 && (s = l[0], n = ct(n, o, r, 1, l, s, i, e, at, wt, null, pt));
    },
    i: M,
    o: M,
    d(l) {
      l && N(e);
      for (let o = 0; o < n.length; o += 1)
        n[o].d();
    }
  };
}
function oi(t, e, n) {
  let { crumbs: i = "" } = e;
  te();
  let s;
  return t.$$set = (r) => {
    "crumbs" in r && n(1, i = r.crumbs);
  }, t.$$.update = () => {
    t.$$.dirty & 2 && n(0, s = i.split(",").map((r) => r.trim()));
  }, [s, i];
}
class fn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, oi, ri, se, { crumbs: 1 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-breadcrumbs", fn);
const ai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fn
}, Symbol.toStringTag, { value: "Module" }));
function yt(t) {
  let e, n;
  return {
    c() {
      e = A("i"), d(e, "aria-hidden", ""), d(e, "class", n = "icon-" + t[4] + " text-base");
    },
    m(i, s) {
      C(i, e, s);
    },
    p(i, s) {
      s & 16 && n !== (n = "icon-" + i[4] + " text-base") && d(e, "class", n);
    },
    d(i) {
      i && N(e);
    }
  };
}
function ci(t) {
  let e, n, i, s, r, l, o = t[4] && yt(t);
  return {
    c() {
      e = A("button"), o && o.c(), n = z(), i = X(t[3]), this.c = M, d(e, "type", t[1]), d(e, "class", s = H("flex items-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": t[0] === "true",
        "bg-white border-black": t[2] === "primary",
        "bg-red/90 text-white border-red/90": t[2] === "danger",
        "bg-green/90 border-green/90 text-white": t[2] === "success",
        "bg-white border-red/90 text-red/90": t[2] === "outline-danger"
      }));
    },
    m(a, c) {
      C(a, e, c), o && o.m(e, null), y(e, n), y(e, i), r || (l = Z(e, "click", t[5]), r = !0);
    },
    p(a, [c]) {
      a[4] ? o ? o.p(a, c) : (o = yt(a), o.c(), o.m(e, n)) : o && (o.d(1), o = null), c & 8 && K(i, a[3]), c & 2 && d(e, "type", a[1]), c & 5 && s !== (s = H("flex items-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": a[0] === "true",
        "bg-white border-black": a[2] === "primary",
        "bg-red/90 text-white border-red/90": a[2] === "danger",
        "bg-green/90 border-green/90 text-white": a[2] === "success",
        "bg-white border-red/90 text-red/90": a[2] === "outline-danger"
      })) && d(e, "class", s);
    },
    i: M,
    o: M,
    d(a) {
      a && N(e), o && o.d(), r = !1, l();
    }
  };
}
function ui(t, e, n) {
  let { disabled: i = "false" } = e, { type: s = "button" } = e, { variant: r = "primary" } = e, { label: l = "" } = e, { icon: o = "" } = e;
  te();
  const c = Ue().attachInternals(), u = () => {
    const { form: m } = c;
    m?.requestSubmit ? m.requestSubmit() : m?.submit();
  };
  return t.$$set = (m) => {
    "disabled" in m && n(0, i = m.disabled), "type" in m && n(1, s = m.type), "variant" in m && n(2, r = m.variant), "label" in m && n(3, l = m.label), "icon" in m && n(4, o = m.icon);
  }, [i, s, r, l, o, u];
}
class fi extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ui, ci, se, {
      disabled: 0,
      type: 1,
      variant: 2,
      label: 3,
      icon: 4
    }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["disabled", "type", "variant", "label", "icon"];
  }
  get disabled() {
    return this.$$.ctx[0];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), E();
  }
  get type() {
    return this.$$.ctx[1];
  }
  set type(e) {
    this.$$set({ type: e }), E();
  }
  get variant() {
    return this.$$.ctx[2];
  }
  set variant(e) {
    this.$$set({ variant: e }), E();
  }
  get label() {
    return this.$$.ctx[3];
  }
  set label(e) {
    this.$$set({ label: e }), E();
  }
  get icon() {
    return this.$$.ctx[4];
  }
  set icon(e) {
    this.$$set({ icon: e }), E();
  }
}
customElements.define("v-button-internal", fi);
class di extends customElements.get("v-button-internal") {
  static formAssociated = !0;
}
customElements.define("v-button", di);
const hi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function vt(t) {
  let e, n;
  return {
    c() {
      e = A("h2"), n = X(t[1]), d(e, "class", "text-sm");
    },
    m(i, s) {
      C(i, e, s), y(e, n);
    },
    p(i, s) {
      s & 2 && K(n, i[1]);
    },
    d(i) {
      i && N(e);
    }
  };
}
function mi(t) {
  let e, n, i, s, r, l, o, a, c, u, m, h, p, g, b, V, x, F, T = t[1] && vt(t);
  return {
    c() {
      e = A("div"), n = A("div"), i = A("div"), T && T.c(), s = z(), r = A("slot"), l = z(), o = A("div"), a = A("slot"), c = z(), u = Ee("svg"), m = Ee("polyline"), p = z(), g = A("div"), b = A("slot"), this.c = M, d(r, "name", "title"), d(i, "class", "flex items-center gap-2"), d(a, "name", "header"), d(m, "points", "6 9 12 15 18 9"), d(u, "class", h = H("transition-transform duration-200", {
        "rotate-0": !t[0],
        "rotate-180": t[0]
      })), d(u, "width", "24"), d(u, "height", "24"), d(u, "viewBox", "0 0 24 24"), d(u, "stroke", "currentColor"), d(u, "stroke-linejoin", "round"), d(u, "stroke-linecap", "round"), d(u, "fill", "none"), d(o, "class", "h-full flex items-center gap-3"), d(n, "class", "w-full py-1.5 px-4 flex items-center justify-between border text-black border-black bg-white cursor-pointer"), d(g, "class", V = H("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !t[0],
        "max-h-fit": t[0]
      })), d(e, "class", "relative w-full overflow-hidden");
    },
    m(S, L) {
      C(S, e, L), y(e, n), y(n, i), T && T.m(i, null), y(i, s), y(i, r), y(n, l), y(n, o), y(o, a), y(o, c), y(o, u), y(u, m), y(e, p), y(e, g), y(g, b), t[4](e), x || (F = Z(n, "click", t[3]), x = !0);
    },
    p(S, [L]) {
      S[1] ? T ? T.p(S, L) : (T = vt(S), T.c(), T.m(i, s)) : T && (T.d(1), T = null), L & 1 && h !== (h = H("transition-transform duration-200", {
        "rotate-0": !S[0],
        "rotate-180": S[0]
      })) && d(u, "class", h), L & 1 && V !== (V = H("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !S[0],
        "max-h-fit": S[0]
      })) && d(g, "class", V);
    },
    i: M,
    o: M,
    d(S) {
      S && N(e), T && T.d(), t[4](null), x = !1, F();
    }
  };
}
function bi(t, e, n) {
  let { title: i = "" } = e, { open: s = !1 } = e, r;
  te();
  const l = (a) => {
    a.target.getAttribute("slot") !== "header" && (n(0, s = !s), be(r, "toggle", { open: s }));
  };
  function o(a) {
    oe[a ? "unshift" : "push"](() => {
      r = a, n(2, r);
    });
  }
  return t.$$set = (a) => {
    "title" in a && n(1, i = a.title), "open" in a && n(0, s = a.open);
  }, [s, i, r, l, o];
}
class dn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, bi, mi, se, { title: 1, open: 0 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-collapse", dn);
const gi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dn
}, Symbol.toStringTag, { value: "Module" }));
function pi(t) {
  let e, n, i, s, r, l, o, a;
  return {
    c() {
      e = A("div"), n = A("div"), n.innerHTML = '<slot name="target"></slot>', i = z(), s = A("div"), r = A("slot"), this.c = M, d(n, "class", "inline-block"), d(r, "name", "content"), d(s, "class", l = H("absolute z-10", {
        "left-0": t[1],
        "right-0": t[1],
        "overflow-hidden": t[1],
        invisible: !t[0]
      })), d(e, "class", "relative inline-block");
    },
    m(c, u) {
      C(c, e, u), y(e, n), y(e, i), y(e, s), y(s, r), t[4](e), o || (a = Z(n, "click", t[3]), o = !0);
    },
    p(c, [u]) {
      u & 3 && l !== (l = H("absolute z-10", {
        "left-0": c[1],
        "right-0": c[1],
        "overflow-hidden": c[1],
        invisible: !c[0]
      })) && d(s, "class", l);
    },
    i: M,
    o: M,
    d(c) {
      c && N(e), t[4](null), o = !1, a();
    }
  };
}
function _i(t, e, n) {
  let { open: i = null } = e, { match: s = null } = e, r;
  te();
  const l = () => {
    n(0, i = !i), be(r, "toggle", { open: i });
  };
  function o(a) {
    oe[a ? "unshift" : "push"](() => {
      r = a, n(2, r);
    });
  }
  return t.$$set = (a) => {
    "open" in a && n(0, i = a.open), "match" in a && n(1, s = a.match);
  }, t.$$.update = () => {
    t.$$.dirty & 2 && n(1, s = s === ""), t.$$.dirty & 1 && n(0, i = i === "" || i);
  }, [i, s, r, l, o];
}
class hn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, _i, pi, se, { open: 0, match: 1 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["open", "match"];
  }
  get open() {
    return this.$$.ctx[0];
  }
  set open(e) {
    this.$$set({ open: e }), E();
  }
  get match() {
    return this.$$.ctx[1];
  }
  set match(e) {
    this.$$set({ match: e }), E();
  }
}
customElements.define("v-dropdown", hn);
const wi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hn
}, Symbol.toStringTag, { value: "Module" }));
function yi(t) {
  let e, n;
  return {
    c() {
      e = A("i"), this.c = M, d(e, "aria-hidden", ""), d(e, "class", n = "icon-" + t[0] + " text-" + t[1]);
    },
    m(i, s) {
      C(i, e, s);
    },
    p(i, [s]) {
      s & 3 && n !== (n = "icon-" + i[0] + " text-" + i[1]) && d(e, "class", n);
    },
    i: M,
    o: M,
    d(i) {
      i && N(e);
    }
  };
}
function vi(t, e, n) {
  let { name: i = "" } = e, { size: s = "base" } = e;
  return te(), t.$$set = (r) => {
    "name" in r && n(0, i = r.name), "size" in r && n(1, s = r.size);
  }, [i, s];
}
class mn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, vi, yi, se, { name: 0, size: 1 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-icon", mn);
const ki = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mn
}, Symbol.toStringTag, { value: "Module" }));
function kt(t) {
  let e, n, i;
  return {
    c() {
      e = A("p"), n = X(t[3]), d(e, "class", i = H("text-xs", {
        "inline whitespace-nowrap": t[5] === "left"
      }));
    },
    m(s, r) {
      C(s, e, r), y(e, n);
    },
    p(s, r) {
      r & 8 && K(n, s[3]), r & 32 && i !== (i = H("text-xs", {
        "inline whitespace-nowrap": s[5] === "left"
      })) && d(e, "class", i);
    },
    d(s) {
      s && N(e);
    }
  };
}
function Et(t) {
  let e, n, i, s, r, l, o, a;
  return {
    c() {
      e = A("div"), n = A("button"), s = z(), r = A("button"), d(n, "aria-label", i = "Increment up by " + t[9]), d(n, "class", "icon-chevron-down rotate-180 text-[15px]"), d(r, "aria-label", l = "Increment down by " + t[9]), d(r, "class", "icon-chevron-down text-[15px]"), d(e, "class", "absolute right-0.5 bottom-0 cursor-pointer select-none flex flex-col");
    },
    m(c, u) {
      C(c, e, u), y(e, n), y(e, s), y(e, r), o || (a = [
        Z(n, "click", t[15]),
        Z(r, "click", t[16])
      ], o = !0);
    },
    p(c, u) {
      u & 512 && i !== (i = "Increment up by " + c[9]) && d(n, "aria-label", i), u & 512 && l !== (l = "Increment down by " + c[9]) && d(r, "aria-label", l);
    },
    d(c) {
      c && N(e), o = !1, pe(a);
    }
  };
}
function Ei(t) {
  let e, n, i, s, r, l, o, a = t[3] && kt(t), c = t[1] === "number" && Et(t);
  return {
    c() {
      e = A("label"), a && a.c(), n = z(), i = A("input"), s = z(), c && c.c(), this.c = M, d(i, "type", t[1]), d(i, "placeholder", t[2]), d(i, "name", t[4]), i.value = t[0], i.readOnly = t[8], d(i, "class", "w-full py-1.5 px-2.5 border text-xs border-black bg-white outline-none appearance-none"), d(e, "class", r = H("relative flex gap-1 max-w-[14rem]", {
        "flex-col": t[5] === "top",
        "items-center": t[5] === "left"
      }));
    },
    m(u, m) {
      C(u, e, m), a && a.m(e, null), y(e, n), y(e, i), t[14](i), y(e, s), c && c.m(e, null), t[17](e), l || (o = Z(i, "input", t[10]), l = !0);
    },
    p(u, [m]) {
      u[3] ? a ? a.p(u, m) : (a = kt(u), a.c(), a.m(e, n)) : a && (a.d(1), a = null), m & 2 && d(i, "type", u[1]), m & 4 && d(i, "placeholder", u[2]), m & 16 && d(i, "name", u[4]), m & 1 && i.value !== u[0] && (i.value = u[0]), m & 256 && (i.readOnly = u[8]), u[1] === "number" ? c ? c.p(u, m) : (c = Et(u), c.c(), c.m(e, null)) : c && (c.d(1), c = null), m & 32 && r !== (r = H("relative flex gap-1 max-w-[14rem]", {
        "flex-col": u[5] === "top",
        "items-center": u[5] === "left"
      })) && d(e, "class", r);
    },
    i: M,
    o: M,
    d(u) {
      u && N(e), a && a.d(), t[14](null), c && c.d(), t[17](null), l = !1, o();
    }
  };
}
function Mi(t, e, n) {
  const s = Ue().attachInternals();
  let { type: r = "text" } = e, { placeholder: l = "" } = e, { readonly: o = "false" } = e, { label: a = "" } = e, { value: c = "" } = e, { step: u = "1" } = e, { name: m = "" } = e, { labelposition: h = "top" } = e, p, g, b, V;
  te();
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
  const S = () => F(1), L = () => F(-1);
  function P(k) {
    oe[k ? "unshift" : "push"](() => {
      p = k, n(6, p);
    });
  }
  return t.$$set = (k) => {
    "type" in k && n(1, r = k.type), "placeholder" in k && n(2, l = k.placeholder), "readonly" in k && n(12, o = k.readonly), "label" in k && n(3, a = k.label), "value" in k && n(0, c = k.value), "step" in k && n(13, u = k.step), "name" in k && n(4, m = k.name), "labelposition" in k && n(5, h = k.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 4096 && n(8, b = o === "readonly" || o === ""), t.$$.dirty & 8192 && n(9, V = Number.parseFloat(u));
  }, [
    c,
    r,
    l,
    a,
    m,
    h,
    p,
    g,
    b,
    V,
    x,
    F,
    o,
    u,
    T,
    S,
    L,
    P
  ];
}
class Si extends Q {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}</style>", ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Mi, Ei, se, {
      type: 1,
      placeholder: 2,
      readonly: 12,
      label: 3,
      value: 0,
      step: 13,
      name: 4,
      labelposition: 5
    }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
    return this.$$.ctx[12];
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
    return this.$$.ctx[13];
  }
  set step(e) {
    this.$$set({ step: e }), E();
  }
  get name() {
    return this.$$.ctx[4];
  }
  set name(e) {
    this.$$set({ name: e }), E();
  }
  get labelposition() {
    return this.$$.ctx[5];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), E();
  }
}
customElements.define("v-input-internal", Si);
class Ai extends customElements.get("v-input-internal") {
  static formAssociated = !0;
}
customElements.define("v-input", Ai);
const Ci = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function Pi(t) {
  let e;
  return {
    c() {
      e = Ee("path"), d(e, "d", "M6.33 3.66667H7.66666V5H6.33333V3.66667ZM6.33 6.33333H7.66666V10.3333H6.33333V6.33333ZM7 0.333334C3.31999 0.333334 0.333328 3.32 0.333328 7C0.333328 10.68 3.31999 13.6667 7 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.32 10.68 0.333334 7 0.333334ZM7 12.3333C4.06 12.3333 1.66666 9.94 1.66666 7C1.66666 4.06 4.06 1.66667 7 1.66667C9.93999 1.66667 12.3333 4.06 12.3333 7C12.3333 9.94 9.93999 12.3333 7 12.3333Z"), d(e, "fill", "#045681");
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
      e = Ee("path"), d(e, "d", "M4 7.78L1.22 5L0.273331 5.94L4 9.66667L12 1.66667L11.06 0.726665L4 7.78Z"), d(e, "fill", "#397F48");
    },
    m(n, i) {
      C(n, e, i);
    },
    d(n) {
      n && N(e);
    }
  };
}
function Oi(t) {
  let e;
  return {
    c() {
      e = Ee("path"), d(e, "d", "M8 2.99333L13.02 11.6667H2.98L8 2.99333ZM8 0.333328L0.666672 13H15.3333L8 0.333328ZM8.66667 9.66666H7.33334V11H8.66667V9.66666ZM8.66667 5.66666H7.33334V8.33333H8.66667V5.66666Z"), d(e, "fill", "#FF9900");
    },
    m(n, i) {
      C(n, e, i);
    },
    d(n) {
      n && N(e);
    }
  };
}
function Ri(t) {
  let e;
  return {
    c() {
      e = Ee("path"), d(e, "d", "M6.33 9H7.66666V10.3333H6.33333V9ZM6.33 3.66666H7.66666V7.66666H6.33333V3.66666ZM6.99333 0.333328C3.31333 0.333328 0.333328 3.31999 0.333328 7C0.333328 10.68 3.31333 13.6667 6.99333 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.31999 10.68 0.333328 6.99333 0.333328ZM7 12.3333C4.05333 12.3333 1.66666 9.94666 1.66666 7C1.66666 4.05333 4.05333 1.66666 7 1.66666C9.94666 1.66666 12.3333 4.05333 12.3333 7C12.3333 9.94666 9.94666 12.3333 7 12.3333Z"), d(e, "fill", "#BE3026");
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
      e = A("p"), n = X(t[1]), d(e, "class", "text-xs");
    },
    m(i, s) {
      C(i, e, s), y(e, n);
    },
    p(i, s) {
      s & 2 && K(n, i[1]);
    },
    d(i) {
      i && N(e);
    }
  };
}
function Vi(t) {
  let e, n, i, s, r, l, o, a, c;
  function u(g, b) {
    if (g[2] === "error")
      return Ri;
    if (g[2] === "warning")
      return Oi;
    if (g[2] === "success")
      return Ti;
    if (g[2] === "info")
      return Pi;
  }
  let m = u(t), h = m && m(t), p = t[1] && Mt(t);
  return {
    c() {
      e = A("div"), n = A("div"), i = Ee("svg"), h && h.c(), s = z(), r = A("figure"), l = A("figcaption"), o = X(t[0]), a = z(), p && p.c(), this.c = M, d(i, "width", "14"), d(i, "height", "14"), d(i, "viewBox", "0 0 15 15"), d(i, "fill", "none"), d(i, "xmlns", "http://www.w3.org/2000/svg"), d(n, "class", "mt-1"), d(l, "class", "text-sm"), d(e, "class", c = H("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": t[3] === "gray",
        "bg-white": t[3] === "white",
        "border-red/90": t[2] === "error",
        "border-orange/90": t[2] === "warning",
        "border-green/90": t[2] === "success",
        "border-blue/90": t[2] === "info"
      }));
    },
    m(g, b) {
      C(g, e, b), y(e, n), y(n, i), h && h.m(i, null), y(e, s), y(e, r), y(r, l), y(l, o), y(r, a), p && p.m(r, null);
    },
    p(g, [b]) {
      m !== (m = u(g)) && (h && h.d(1), h = m && m(g), h && (h.c(), h.m(i, null))), b & 1 && K(o, g[0]), g[1] ? p ? p.p(g, b) : (p = Mt(g), p.c(), p.m(r, null)) : p && (p.d(1), p = null), b & 12 && c !== (c = H("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": g[3] === "gray",
        "bg-white": g[3] === "white",
        "border-red/90": g[2] === "error",
        "border-orange/90": g[2] === "warning",
        "border-green/90": g[2] === "success",
        "border-blue/90": g[2] === "info"
      })) && d(e, "class", c);
    },
    i: M,
    o: M,
    d(g) {
      g && N(e), h && h.d(), p && p.d();
    }
  };
}
function Li(t, e, n) {
  let { title: i = "" } = e, { message: s = "" } = e, { variant: r = "info" } = e, { background: l = "gray" } = e;
  return te(), t.$$set = (o) => {
    "title" in o && n(0, i = o.title), "message" in o && n(1, s = o.message), "variant" in o && n(2, r = o.variant), "background" in o && n(3, l = o.background);
  }, [i, s, r, l];
}
class bn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Li, Vi, se, {
      title: 0,
      message: 1,
      variant: 2,
      background: 3
    }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-notify", bn);
const xi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bn
}, Symbol.toStringTag, { value: "Module" }));
function St(t, e, n) {
  const i = t.slice();
  return i[9] = e[n], i;
}
function At(t) {
  let e, n, i;
  return {
    c() {
      e = A("p"), n = X(t[1]), d(e, "class", i = H("text-xs", {
        "pb-1": t[2] === "top",
        inline: t[2] === "left"
      }));
    },
    m(s, r) {
      C(s, e, r), y(e, n);
    },
    p(s, r) {
      r & 2 && K(n, s[1]), r & 4 && i !== (i = H("text-xs", {
        "pb-1": s[2] === "top",
        inline: s[2] === "left"
      })) && d(e, "class", i);
    },
    d(s) {
      s && N(e);
    }
  };
}
function Ct(t) {
  let e, n = t[9] + "", i, s, r, l, o;
  function a() {
    return t[8](t[9]);
  }
  return {
    c() {
      e = A("button"), i = X(n), s = z(), d(e, "class", r = H("border-y border-l last:border-r border-black px-2 py-1 text-sm", {
        "bg-white": t[9] !== t[0],
        "bg-black text-white": t[9] === t[0]
      }));
    },
    m(c, u) {
      C(c, e, u), y(e, i), y(e, s), t[7](e), l || (o = Z(e, "click", a), l = !0);
    },
    p(c, u) {
      t = c, u & 16 && n !== (n = t[9] + "") && K(i, n), u & 17 && r !== (r = H("border-y border-l last:border-r border-black px-2 py-1 text-sm", {
        "bg-white": t[9] !== t[0],
        "bg-black text-white": t[9] === t[0]
      })) && d(e, "class", r);
    },
    d(c) {
      c && N(e), t[7](null), l = !1, o();
    }
  };
}
function Ii(t) {
  let e, n, i = t[1] && At(t), s = t[4], r = [];
  for (let l = 0; l < s.length; l += 1)
    r[l] = Ct(St(t, s, l));
  return {
    c() {
      e = A("label"), i && i.c(), n = z();
      for (let l = 0; l < r.length; l += 1)
        r[l].c();
      this.c = M;
    },
    m(l, o) {
      C(l, e, o), i && i.m(e, null), y(e, n);
      for (let a = 0; a < r.length; a += 1)
        r[a].m(e, null);
    },
    p(l, [o]) {
      if (l[1] ? i ? i.p(l, o) : (i = At(l), i.c(), i.m(e, n)) : i && (i.d(1), i = null), o & 57) {
        s = l[4];
        let a;
        for (a = 0; a < s.length; a += 1) {
          const c = St(l, s, a);
          r[a] ? r[a].p(c, o) : (r[a] = Ct(c), r[a].c(), r[a].m(e, null));
        }
        for (; a < r.length; a += 1)
          r[a].d(1);
        r.length = s.length;
      }
    },
    i: M,
    o: M,
    d(l) {
      l && N(e), i && i.d(), Xe(r, l);
    }
  };
}
function Fi(t, e, n) {
  let { label: i = "" } = e, { options: s = "" } = e, { selected: r = "" } = e, { labelposition: l = "top" } = e;
  te();
  let o, a;
  const c = (h) => {
    n(0, r = h), be(o, "input", { value: h });
  };
  function u(h) {
    oe[h ? "unshift" : "push"](() => {
      o = h, n(3, o);
    });
  }
  const m = (h) => c(h);
  return t.$$set = (h) => {
    "label" in h && n(1, i = h.label), "options" in h && n(6, s = h.options), "selected" in h && n(0, r = h.selected), "labelposition" in h && n(2, l = h.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 64 && n(4, a = s.split(",").map((h) => h.trim()));
  }, [
    r,
    i,
    l,
    o,
    a,
    c,
    s,
    u,
    m
  ];
}
class gn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Fi, Ii, se, {
      label: 1,
      options: 6,
      selected: 0,
      labelposition: 2
    }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-radio", gn);
const Ni = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gn
}, Symbol.toStringTag, { value: "Module" }));
function Pt(t, e, n) {
  const i = t.slice();
  return i[12] = e[n], i;
}
function Tt(t) {
  let e, n, i;
  return {
    c() {
      e = A("p"), n = X(t[1]), d(e, "class", i = H("text-xs pb-1", {
        "pb-1": t[2] === "top",
        inline: t[2] === "left"
      }));
    },
    m(s, r) {
      C(s, e, r), y(e, n);
    },
    p(s, r) {
      r & 2 && K(n, s[1]), r & 4 && i !== (i = H("text-xs pb-1", {
        "pb-1": s[2] === "top",
        inline: s[2] === "left"
      })) && d(e, "class", i);
    },
    d(s) {
      s && N(e);
    }
  };
}
function Ot(t, e) {
  let n, i = e[12] + "", s, r, l, o;
  return {
    key: t,
    first: null,
    c() {
      n = A("option"), s = X(i), r = z(), n.selected = l = e[6] === e[12], n.__value = o = `
        ` + e[12] + `
      `, n.value = n.__value, this.first = n;
    },
    m(a, c) {
      C(a, n, c), y(n, s), y(n, r);
    },
    p(a, c) {
      e = a, c & 8 && i !== (i = e[12] + "") && K(s, i), c & 72 && l !== (l = e[6] === e[12]) && (n.selected = l), c & 8 && o !== (o = `
        ` + e[12] + `
      `) && (n.__value = o, n.value = n.__value);
    },
    d(a) {
      a && N(n);
    }
  };
}
function Hi(t) {
  let e, n, i, s, r = (t[0] || "Please select") + "", l, o, a = [], c = /* @__PURE__ */ new Map(), u, m, h = t[1] && Tt(t), p = t[3];
  const g = (b) => b[12];
  for (let b = 0; b < p.length; b += 1) {
    let V = Pt(t, p, b), x = g(V);
    c.set(x, a[b] = Ot(x, V));
  }
  return {
    c() {
      e = A("label"), h && h.c(), n = z(), i = A("select"), s = A("option"), l = X(r), o = z();
      for (let b = 0; b < a.length; b += 1)
        a[b].c();
      this.c = M, s.__value = "", s.value = s.__value, d(i, "class", H(Rt, "py-1 px-2.5 text-xs border border-black appearance-none rounded-none")), d(e, "class", H(Rt, "relative"));
    },
    m(b, V) {
      C(b, e, V), h && h.m(e, null), y(e, n), y(e, i), y(i, s), y(s, l), y(s, o);
      for (let x = 0; x < a.length; x += 1)
        a[x].m(i, null);
      t[10](i), t[11](e), u || (m = Z(i, "input", t[7]), u = !0);
    },
    p(b, [V]) {
      b[1] ? h ? h.p(b, V) : (h = Tt(b), h.c(), h.m(e, n)) : h && (h.d(1), h = null), V & 1 && r !== (r = (b[0] || "Please select") + "") && K(l, r), V & 72 && (p = b[3], a = ct(a, V, g, 1, b, p, c, i, at, Ot, null, Pt));
    },
    i: M,
    o: M,
    d(b) {
      b && N(e), h && h.d();
      for (let V = 0; V < a.length; V += 1)
        a[V].d();
      t[10](null), t[11](null), u = !1, m();
    }
  };
}
const Rt = "max-w-[14rem] w-full";
function ji(t, e, n) {
  let { options: i = "" } = e, { value: s = "" } = e, { placeholder: r = "" } = e, { label: l = "" } = e, { labelposition: o = "top" } = e, a, c, u, m;
  te();
  const h = (b) => {
    b.preventDefault(), b.stopImmediatePropagation(), n(8, s = c.value.trim()), be(a, "input", { value: s });
  };
  function p(b) {
    oe[b ? "unshift" : "push"](() => {
      c = b, n(5, c), n(3, u), n(9, i);
    });
  }
  function g(b) {
    oe[b ? "unshift" : "push"](() => {
      a = b, n(4, a);
    });
  }
  return t.$$set = (b) => {
    "options" in b && n(9, i = b.options), "value" in b && n(8, s = b.value), "placeholder" in b && n(0, r = b.placeholder), "label" in b && n(1, l = b.label), "labelposition" in b && n(2, o = b.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 512 && n(3, u = i.split(",").map((b) => b.trim())), t.$$.dirty & 264 && n(6, m = u.find((b) => b === s) ?? "");
  }, [
    r,
    l,
    o,
    u,
    a,
    c,
    m,
    h,
    s,
    i,
    p,
    g
  ];
}
class pn extends Q {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>label{--select-chevron-color:black;--select-chevron-size:15px}label::after{content:'';position:absolute;background-color:var(--select-chevron-color);clip-path:polygon(25% 25%, 17.5% 32.5%, 40% 55%, 50% 65%, 60% 55%, 82.5% 32.5%, 75% 25%, 50% 50%);width:var(--select-chevron-size);height:var(--select-chevron-size);right:2px;bottom:2px}</style>", ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ji, Hi, se, {
      options: 9,
      value: 8,
      placeholder: 0,
      label: 1,
      labelposition: 2
    }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["options", "value", "placeholder", "label", "labelposition"];
  }
  get options() {
    return this.$$.ctx[9];
  }
  set options(e) {
    this.$$set({ options: e }), E();
  }
  get value() {
    return this.$$.ctx[8];
  }
  set value(e) {
    this.$$set({ value: e }), E();
  }
  get placeholder() {
    return this.$$.ctx[0];
  }
  set placeholder(e) {
    this.$$set({ placeholder: e }), E();
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), E();
  }
  get labelposition() {
    return this.$$.ctx[2];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), E();
  }
}
customElements.define("v-select", pn);
const zi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pn
}, Symbol.toStringTag, { value: "Module" })), Pe = [];
function Di(t, e = M) {
  let n;
  const i = /* @__PURE__ */ new Set();
  function s(o) {
    if (sn(t, o) && (t = o, n)) {
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
  function r(o) {
    s(o(t));
  }
  function l(o, a = M) {
    const c = [o, a];
    return i.add(c), i.size === 1 && (n = e(s) || M), o(t), () => {
      i.delete(c), i.size === 0 && (n(), n = null);
    };
  }
  return { set: s, update: r, subscribe: l };
}
function Vt(t) {
  return Object.prototype.toString.call(t) === "[object Date]";
}
function st(t, e, n, i) {
  if (typeof n == "number" || Vt(n)) {
    const s = i - n, r = (n - e) / (t.dt || 1 / 60), l = t.opts.stiffness * s, o = t.opts.damping * r, a = (l - o) * t.inv_mass, c = (r + a) * t.dt;
    return Math.abs(c) < t.opts.precision && Math.abs(s) < t.opts.precision ? i : (t.settled = !1, Vt(n) ? new Date(n.getTime() + c) : n + c);
  } else {
    if (Array.isArray(n))
      return n.map((s, r) => st(t, e[r], n[r], i[r]));
    if (typeof n == "object") {
      const s = {};
      for (const r in n)
        s[r] = st(t, e[r], n[r], i[r]);
      return s;
    } else
      throw new Error(`Cannot spring ${typeof n} values`);
  }
}
function Wi(t, e = {}) {
  const n = Di(t), { stiffness: i = 0.15, damping: s = 0.8, precision: r = 0.01 } = e;
  let l, o, a, c = t, u = t, m = 1, h = 0, p = !1;
  function g(V, x = {}) {
    u = V;
    const F = a = {};
    if (t == null || x.hard || b.stiffness >= 1 && b.damping >= 1)
      return p = !0, l = mt(), c = V, n.set(t = u), Promise.resolve();
    if (x.soft) {
      const T = x.soft === !0 ? 0.5 : +x.soft;
      h = 1 / (T * 60), m = 0;
    }
    return o || (l = mt(), p = !1, o = Xn((T) => {
      if (p)
        return p = !1, o = null, !1;
      m = Math.min(m + h, 1);
      const S = {
        inv_mass: m,
        opts: b,
        settled: !0,
        dt: (T - l) * 60 / 1e3
      }, L = st(S, c, t, u);
      return l = T, c = t, n.set(t = L), S.settled && (o = null), !S.settled;
    })), new Promise((T) => {
      o.promise.then(() => {
        F === a && T();
      });
    });
  }
  const b = {
    set: g,
    update: (V, x) => g(V(u, t), x),
    subscribe: n.subscribe,
    stiffness: i,
    damping: s,
    precision: r
  };
  return b;
}
const Bi = (t, e, n) => t <= e ? e : t >= n ? n : t, We = (t, e, n, i) => {
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
      e = A("p"), n = X(t[4]), d(e, "class", "text-xs");
    },
    m(i, s) {
      C(i, e, s), y(e, n);
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
      e = A("span"), n = X(t[5]), d(e, "class", "floating-suffix");
    },
    m(i, s) {
      C(i, e, s), y(e, n);
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
  let e, n, i, s, r, l, o = t[6] + "", a, c, u, m, h, p, g, b, V, x, F, T = t[5] && Ft(t);
  function S() {
    return t[37](t[57]);
  }
  return {
    c() {
      e = A("span"), n = A("span"), i = z(), s = A("span"), r = z(), l = A("span"), a = X(o), c = z(), T && T.c(), d(n, "class", "handle-bg absolute left-0 bottom-1 rounded-full opacity-50 h-full w-full transition-transform bg-gray-400"), d(s, "class", "absolute left-0 bottom-1 block rounded-full h-full w-full border border-black bg-white"), d(l, "class", u = H("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })), d(e, "role", "slider"), d(e, "class", "range absolute block h-5 w-5 top-1 bottom-auto -translate-x-1/2 -translate-y-1/2 z-[2]"), d(e, "data-handle", m = t[57]), ue(e, "left", t[17][t[57]] + "%"), ue(e, "z-index", t[15] === t[57] ? 3 : 2), d(e, "aria-valuemin", h = t[0] === !0 && t[57] === 1 ? t[9] : t[7]), d(e, "aria-valuemax", p = t[0] === !0 && t[57] === 0 ? t[10] : t[8]), d(e, "aria-valuenow", g = t[6]), d(e, "aria-valuetext", b = t[6]?.toString()), d(e, "aria-orientation", "horizontal"), d(e, "aria-disabled", t[2]), d(e, "disabled", t[2]), d(e, "tabindex", V = t[2] ? -1 : 0), Y(e, "active", t[13] && t[15] === t[57]), Y(e, "press", t[14] && t[15] === t[57]);
    },
    m(L, P) {
      C(L, e, P), y(e, n), y(e, i), y(e, s), y(e, r), y(e, l), y(l, a), y(l, c), T && T.m(l, null), x || (F = [
        Z(e, "blur", t[20]),
        Z(e, "focus", S)
      ], x = !0);
    },
    p(L, P) {
      t = L, P[0] & 1536 && o !== (o = t[6] + "") && K(a, o), t[5] ? T ? T.p(t, P) : (T = Ft(t), T.c(), T.m(l, null)) : T && (T.d(1), T = null), P[0] & 40960 && u !== (u = H("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })) && d(l, "class", u), P[0] & 131072 && ue(e, "left", t[17][t[57]] + "%"), P[0] & 32768 && ue(e, "z-index", t[15] === t[57] ? 3 : 2), P[0] & 641 && h !== (h = t[0] === !0 && t[57] === 1 ? t[9] : t[7]) && d(e, "aria-valuemin", h), P[0] & 1281 && p !== (p = t[0] === !0 && t[57] === 0 ? t[10] : t[8]) && d(e, "aria-valuemax", p), P[0] & 1536 && g !== (g = t[6]) && d(e, "aria-valuenow", g), P[0] & 1536 && b !== (b = t[6]?.toString()) && d(e, "aria-valuetext", b), P[0] & 4 && d(e, "aria-disabled", t[2]), P[0] & 4 && d(e, "disabled", t[2]), P[0] & 4 && V !== (V = t[2] ? -1 : 0) && d(e, "tabindex", V), P[0] & 40960 && Y(e, "active", t[13] && t[15] === t[57]), P[0] & 49152 && Y(e, "press", t[14] && t[15] === t[57]);
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
      e = A("span"), d(e, "class", "absolute block transition duration-200 h-1 -top-0.5 select-none z-[1] bg-black"), ue(e, "left", t[18](t[17]) + "%"), ue(e, "right", t[19](t[17]) + "%");
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
      e = A("span"), n = X(t[5]), d(e, "class", "pipVal-suffix");
    },
    m(i, s) {
      C(i, e, s), y(e, n);
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
    m(s, r) {
      for (let l = 0; l < i.length; l += 1)
        i[l].m(s, r);
      C(s, e, r);
    },
    p(s, r) {
      if (r[0] & 70016) {
        n = Array.from({ length: s[12] + 1 });
        let l;
        for (l = 0; l < n.length; l += 1) {
          const o = Lt(s, n, l);
          i[l] ? i[l].p(o, r) : (i[l] = Wt(o), i[l].c(), i[l].m(e.parentNode, e));
        }
        for (; l < i.length; l += 1)
          i[l].d(1);
        i.length = n.length;
      }
    },
    d(s) {
      Xe(i, s), s && N(e);
    }
  };
}
function Dt(t) {
  let e;
  return {
    c() {
      e = A("span"), d(e, "class", "absolute h-[4px] w-[1px] top-[calc(50%-9px)] whitespace-nowrap transition bg-black/50"), ue(e, "left", We(t[16](t[55]), t[7], t[8], 2) + "%");
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
    m(s, r) {
      i && i.m(s, r), C(s, n, r);
    },
    p(s, r) {
      r[0] & 65920 && (e = s[16](s[55]) !== s[7] && s[16](s[55]) !== s[8]), e ? i ? i.p(s, r) : (i = Dt(s), i.c(), i.m(n.parentNode, n)) : i && (i.d(1), i = null);
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
      e = A("span"), n = X(t[5]), d(e, "class", "pipVal-suffix");
    },
    m(i, s) {
      C(i, e, s), y(e, n);
    },
    p(i, s) {
      s[0] & 32 && K(n, i[5]);
    },
    d(i) {
      i && N(e);
    }
  };
}
function Zi(t) {
  let e, n, i, s, r, l, o, a, c, u, m, h, p, g, b, V, x, F = t[4] && It(t), T = t[10] ? [t[9], t[10]] : [t[9]], S = [];
  for (let O = 0; O < T.length; O += 1)
    S[O] = Nt(xt(t, T, O));
  let L = t[0] && Ht(t), P = t[5] && jt(t), k = t[3] && zt(t), I = t[5] && Bt(t);
  return {
    c() {
      e = A("label"), F && F.c(), n = z(), i = A("div");
      for (let O = 0; O < S.length; O += 1)
        S[O].c();
      s = z(), L && L.c(), r = z(), l = A("div"), o = A("small"), a = X(t[7]), c = z(), P && P.c(), u = z(), k && k.c(), m = z(), h = A("small"), p = X(t[8]), g = z(), I && I.c(), this.c = M, d(o, "class", "absolute bottom-full left-0 -translate-x-1/2 mb-3 whitespace-nowrap"), d(h, "class", "absolute bottom-full right-0 translate-x-1/2 mb-3 whitespace-nowrap"), d(l, "class", "absolute h-2 left-0 right-0"), Y(l, "disabled", t[2]), Y(l, "focus", t[13]), d(i, "class", b = H("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": t[2] })), Y(i, "range", t[0]), Y(i, "focus", t[13]), Y(i, "min", t[0] === "min"), Y(i, "max", t[0] === "max"), d(e, "class", "flex flex-col gap-2");
    },
    m(O, D) {
      C(O, e, D), F && F.m(e, null), y(e, n), y(e, i);
      for (let j = 0; j < S.length; j += 1)
        S[j].m(i, null);
      y(i, s), L && L.m(i, null), y(i, r), y(i, l), y(l, o), y(o, a), y(o, c), P && P.m(o, null), y(l, u), k && k.m(l, null), y(l, m), y(l, h), y(h, p), y(h, g), I && I.m(h, null), t[38](i), V || (x = [
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
    p(O, D) {
      if (O[4] ? F ? F.p(O, D) : (F = It(O), F.c(), F.m(e, n)) : F && (F.d(1), F = null), D[0] & 3336101) {
        T = O[10] ? [O[9], O[10]] : [O[9]];
        let j;
        for (j = 0; j < T.length; j += 1) {
          const le = xt(O, T, j);
          S[j] ? S[j].p(le, D) : (S[j] = Nt(le), S[j].c(), S[j].m(i, s));
        }
        for (; j < S.length; j += 1)
          S[j].d(1);
        S.length = T.length;
      }
      O[0] ? L ? L.p(O, D) : (L = Ht(O), L.c(), L.m(i, r)) : L && (L.d(1), L = null), D[0] & 128 && K(a, O[7]), O[5] ? P ? P.p(O, D) : (P = jt(O), P.c(), P.m(o, null)) : P && (P.d(1), P = null), O[3] ? k ? k.p(O, D) : (k = zt(O), k.c(), k.m(l, m)) : k && (k.d(1), k = null), D[0] & 256 && K(p, O[8]), O[5] ? I ? I.p(O, D) : (I = Bt(O), I.c(), I.m(h, null)) : I && (I.d(1), I = null), D[0] & 4 && Y(l, "disabled", O[2]), D[0] & 8192 && Y(l, "focus", O[13]), D[0] & 4 && b !== (b = H("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": O[2] })) && d(i, "class", b), D[0] & 5 && Y(i, "range", O[0]), D[0] & 8196 && Y(i, "focus", O[13]), D[0] & 5 && Y(i, "min", O[0] === "min"), D[0] & 5 && Y(i, "max", O[0] === "max");
    },
    i: M,
    o: M,
    d(O) {
      O && N(e), F && F.d(), Xe(S, O), L && L.d(), P && P.d(), k && k.d(), I && I.d(), t[38](null), V = !1, pe(x);
    }
  };
}
function qi(t, e, n) {
  let i, s, r = M, l = () => (r(), r = qn(ke, (v) => n(17, s = v)), ke);
  t.$$.on_destroy.push(() => r());
  let { slider: o } = e, { range: a = !1 } = e, { min: c } = e, { max: u } = e, { step: m } = e, { value: h } = e, { start: p } = e, { end: g } = e, { disabled: b = !1 } = e, { discrete: V = !0 } = e, { label: x = "" } = e, { suffix: F = "" } = e;
  te();
  const T = { stiffness: 0.1, damping: 0.4 };
  let S, L, P, k, I, O, D, j = 0, le = !1, ae = !1, re = !1, ye = !1, fe = -1, Se, ve, ke;
  const he = (v, B, J) => {
    if (v <= B)
      return B;
    if (v >= J)
      return J;
    const U = (v - B) % P;
    let me = v - U;
    return Math.abs(U) * 2 >= P && (me += U > 0 ? P : -P), me = Bi(me, B, J), Number.parseFloat(me.toFixed(2));
  }, Re = (v) => v.type.includes("touch") ? v.touches[0] : v, Je = (v) => {
    const B = [...o.querySelectorAll(".handle")], J = B.includes(v), U = B.some((me) => me.contains(v));
    return J || U;
  }, Ve = (v) => a === "min" || a === "max" ? v.slice(0, 1) : a ? v.slice(0, 2) : v, Le = () => {
    ve = o.getBoundingClientRect();
  }, Ae = (v) => {
    const J = (v.clientX - ve.left) / ve.width * 100, U = (L - S) / 100 * J + S;
    let me = 0;
    return a && k === I ? U > I ? 1 : 0 : (a && (me = [k, I].indexOf([k, I].sort((Wn, Bn) => Math.abs(U - Wn) - Math.abs(U - Bn))[0])), me);
  }, Ce = (v) => {
    const J = (v.clientX - ve.left) / ve.width * 100, U = (L - S) / 100 * J + S;
    Qe(fe, U);
  }, Qe = (v, B) => {
    let J = v;
    const U = he(B, S, L);
    return typeof J > "u" && (J = fe), a && (J === 0 && U > I ? n(10, I = U) : J === 1 && U < k && n(9, k = U)), J === 0 && k !== U && n(9, k = U), J === 1 && I !== U && n(10, I = U), Se !== U && (ie(), Se = U), J === 0 ? n(29, p = k.toString()) : J === 1 && n(30, g = I.toString()), U;
  }, Hn = (v) => a === "min" ? 0 : v[0], jn = (v) => a === "max" ? 0 : a === "min" ? 100 - v[0] : 100 - v[1], zn = () => {
    ye && (n(13, le = !1), ae = !1, n(14, re = !1));
  }, _ = (v) => {
    b || (n(15, fe = v), n(13, le = !0));
  }, f = (v) => {
    if (b)
      return;
    Le();
    const B = v.target, J = Re(v);
    n(13, le = !0), ae = !0, n(14, re = !0), n(15, fe = Ae(J)), Se = he(fe === 0 ? k : I, S, L), v.type === "touchstart" && !B.matches(".pipVal") && Ce(J);
  }, w = () => {
    n(14, re = !1);
  }, R = (v) => {
    ye = !1, le && v.target !== o && !o.contains(v.target) && n(13, le = !1);
  }, W = (v) => {
    b || !ae || (n(13, le = !0), Ce(Re(v)));
  }, ne = (v) => {
    if (!b) {
      const B = v.target;
      (ae && B && B === o || o.contains(B)) && (n(13, le = !0), !Je(B) && !B.matches(".pipVal") && Ce(Re(v)));
    }
    ae = !1, n(14, re = !1);
  }, q = () => {
    ae = !1, n(14, re = !1);
  }, G = (v) => {
    b || (v.target === o || o.contains(v.target)) && (ye = !0);
  }, ie = () => {
    b || be(o, "input", {
      activeHandle: fe,
      previousValue: Se,
      value: fe === 0 ? k : I,
      values: I ? [k, I].map((v) => he(v, S, L)) : void 0
    });
  }, ce = (v) => _(v);
  function Dn(v) {
    oe[v ? "unshift" : "push"](() => {
      o = v, n(1, o);
    });
  }
  return t.$$set = (v) => {
    "slider" in v && n(1, o = v.slider), "range" in v && n(0, a = v.range), "min" in v && n(31, c = v.min), "max" in v && n(32, u = v.max), "step" in v && n(33, m = v.step), "value" in v && n(6, h = v.value), "start" in v && n(29, p = v.start), "end" in v && n(30, g = v.end), "disabled" in v && n(2, b = v.disabled), "discrete" in v && n(3, V = v.discrete), "label" in v && n(4, x = v.label), "suffix" in v && n(5, F = v.suffix);
  }, t.$$.update = () => {
    if (t.$$.dirty[1] & 2 && n(8, L = Number.parseFloat(u || "100")), t.$$.dirty[1] & 1 && n(7, S = Number.parseFloat(c || "0")), t.$$.dirty[1] & 4 && n(34, P = Number.parseFloat(m || "1")), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(35, O = (L - S) / P >= 100 ? (L - S) / 20 : 1), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(12, D = (L - S) / P), t.$$.dirty[0] & 128 | t.$$.dirty[1] & 24 && n(16, i = (v) => S + v * P * O), t.$$.dirty[0] & 536870976 | t.$$.dirty[1] & 3 && n(9, k = p || h ? Number.parseFloat(p || h) : (Number.parseFloat(c || "0") + Number.parseFloat(u || "100")) / 2), t.$$.dirty[0] & 1073741824 && n(10, I = g ? Number.parseFloat(g) : void 0), t.$$.dirty[0] & 1073741825 && n(0, a = typeof a == "string" ? a : g !== void 0), t.$$.dirty[0] & 3968 | t.$$.dirty[1] & 32) {
      n(9, k = he(k, S, L));
      let v = [k];
      I && (n(10, I = he(I, S, L)), v.push(I)), v = Ve(v), j !== v.length ? l(n(11, ke = Wi(v.map((B) => We(B, S, L, 2)), T))) : ke.set(v.map((B) => We(B, S, L, 2))).catch((B) => console.error(B)), n(36, j = v.length);
    }
  }, [
    a,
    o,
    b,
    V,
    x,
    F,
    h,
    S,
    L,
    k,
    I,
    ke,
    D,
    le,
    re,
    fe,
    i,
    s,
    Hn,
    jn,
    zn,
    _,
    f,
    w,
    R,
    W,
    ne,
    q,
    G,
    p,
    g,
    c,
    u,
    m,
    P,
    O,
    j,
    ce,
    Dn
  ];
}
class _n extends Q {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>.slider .range:hover .handle-bg{transform:scale(1.5)}.slider .range.active .handle-bg{transform:scale(2.0)}.slider .range.active .floating,.slider .range:hover .floating{opacity:1}</style>", ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, qi, Zi, sn, {
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
    }, null, [-1, -1]), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-slider", _n);
const Xi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _n
}, Symbol.toStringTag, { value: "Module" }));
function Zt(t) {
  let e, n;
  return {
    c() {
      e = A("p"), n = X(t[0]), d(e, "class", "capitalize text-xs");
    },
    m(i, s) {
      C(i, e, s), y(e, n);
    },
    p(i, s) {
      s & 1 && K(n, i[0]);
    },
    d(i) {
      i && N(e);
    }
  };
}
function Ui(t) {
  let e, n, i, s, r, l, o, a, c, u, m, h = t[3] === "labeled" && Zt(t);
  return {
    c() {
      e = A("label"), n = A("button"), i = A("span"), s = z(), r = A("input"), a = z(), h && h.c(), this.c = M, d(i, "class", "pointer-events-none relative inline-block border border-green/100 h-4 w-4 mt-px ml-px bg-white shadow transform ring-0 motion-safe:transition-transform ease-in-out duration-200"), Y(i, "translate-x-0", !t[6]), Y(i, "translate-x-6", t[6]), d(r, "name", t[2]), r.value = t[0], d(r, "class", "hidden"), d(r, "type", "checkbox"), r.checked = t[6], d(n, "type", "button"), d(n, "class", l = H("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": t[6] })), d(n, "role", "switch"), d(n, "aria-label", t[1]), d(n, "aria-checked", o = t[6] ? "true" : "false"), d(e, "class", c = H("flex items-center gap-1.5", {
        "opacity-50 pointer-events-none": t[7]
      }));
    },
    m(p, g) {
      C(p, e, g), y(e, n), y(n, i), y(n, s), y(n, r), t[10](r), y(e, a), h && h.m(e, null), t[11](e), u || (m = Z(n, "click", t[8]), u = !0);
    },
    p(p, [g]) {
      g & 64 && Y(i, "translate-x-0", !p[6]), g & 64 && Y(i, "translate-x-6", p[6]), g & 4 && d(r, "name", p[2]), g & 1 && (r.value = p[0]), g & 64 && (r.checked = p[6]), g & 64 && l !== (l = H("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": p[6] })) && d(n, "class", l), g & 2 && d(n, "aria-label", p[1]), g & 64 && o !== (o = p[6] ? "true" : "false") && d(n, "aria-checked", o), p[3] === "labeled" ? h ? h.p(p, g) : (h = Zt(p), h.c(), h.m(e, null)) : h && (h.d(1), h = null), g & 128 && c !== (c = H("flex items-center gap-1.5", {
        "opacity-50 pointer-events-none": p[7]
      })) && d(e, "class", c);
    },
    i: M,
    o: M,
    d(p) {
      p && N(e), t[10](null), h && h.d(), t[11](null), u = !1, m();
    }
  };
}
function Yi(t, e, n) {
  let { label: i = "" } = e, { name: s = "" } = e, { value: r = "off" } = e, { variant: l = "default" } = e, { disabled: o = "false" } = e;
  te();
  let a, c, u, m;
  const h = () => {
    n(0, r = u ? "off" : "on"), n(5, c.checked = u, c), be(a, "input", { value: c.checked });
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
    "label" in b && n(1, i = b.label), "name" in b && n(2, s = b.name), "value" in b && n(0, r = b.value), "variant" in b && n(3, l = b.variant), "disabled" in b && n(9, o = b.disabled);
  }, t.$$.update = () => {
    t.$$.dirty & 1 && n(6, u = r === "on"), t.$$.dirty & 512 && n(7, m = o === "true");
  }, [
    r,
    i,
    s,
    l,
    a,
    c,
    u,
    m,
    h,
    o,
    p,
    g
  ];
}
class wn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Yi, Ui, se, {
      label: 1,
      name: 2,
      value: 0,
      variant: 3,
      disabled: 9
    }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["label", "name", "value", "variant", "disabled"];
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
    return this.$$.ctx[9];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), E();
  }
}
customElements.define("v-switch", wn);
const Ki = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wn
}, Symbol.toStringTag, { value: "Module" }));
function qt(t, e, n) {
  const i = t.slice();
  return i[3] = e[n], i;
}
function Xt(t) {
  let e;
  return {
    c() {
      e = A("col"), ue(e, "width", t[3]);
    },
    m(n, i) {
      C(n, e, i);
    },
    p: M,
    d(n) {
      n && N(e);
    }
  };
}
function Gi(t) {
  let e, n, i, s, r, l = t[1], o = [];
  for (let a = 0; a < l.length; a += 1)
    o[a] = Xt(qt(t, l, a));
  return {
    c() {
      e = A("table"), n = A("colgroup");
      for (let a = 0; a < o.length; a += 1)
        o[a].c();
      i = z(), s = A("slot"), this.c = M, d(e, "class", r = H("bg-white text-xs w-full", {
        "table-fixed": t[0] === "fixed"
      }));
    },
    m(a, c) {
      C(a, e, c), y(e, n);
      for (let u = 0; u < o.length; u += 1)
        o[u].m(n, null);
      y(e, i), y(e, s);
    },
    p(a, [c]) {
      if (c & 2) {
        l = a[1];
        let u;
        for (u = 0; u < l.length; u += 1) {
          const m = qt(a, l, u);
          o[u] ? o[u].p(m, c) : (o[u] = Xt(m), o[u].c(), o[u].m(n, null));
        }
        for (; u < o.length; u += 1)
          o[u].d(1);
        o.length = l.length;
      }
      c & 1 && r !== (r = H("bg-white text-xs w-full", {
        "table-fixed": a[0] === "fixed"
      })) && d(e, "class", r);
    },
    i: M,
    o: M,
    d(a) {
      a && N(e), Xe(o, a);
    }
  };
}
function Ji(t, e, n) {
  te();
  let { variant: i = "" } = e, { cols: s = "" } = e;
  const r = s.split(",").map((l) => l.trim());
  return t.$$set = (l) => {
    "variant" in l && n(0, i = l.variant), "cols" in l && n(2, s = l.cols);
  }, [i, r, s];
}
class yn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Ji, Gi, se, { variant: 0, cols: 2 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-table", yn);
const Qi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yn
}, Symbol.toStringTag, { value: "Module" }));
function Ut(t, e, n) {
  const i = t.slice();
  return i[8] = e[n], i[10] = n, i;
}
function Yt(t, e) {
  let n, i = e[8] + "", s, r, l, o, a;
  function c() {
    return e[6](e[8]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = A("button"), s = X(i), r = z(), d(n, "class", l = H("px-4 py-1 uppercase text-sm first:ml-4", {
        "bg-white border border-x-black border-t-black border-b-white font-bold": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })), this.first = n;
    },
    m(u, m) {
      C(u, n, m), y(n, s), y(n, r), o || (a = Z(n, "click", c), o = !0);
    },
    p(u, m) {
      e = u, m & 2 && i !== (i = e[8] + "") && K(s, i), m & 11 && l !== (l = H("px-4 py-1 uppercase text-sm first:ml-4", {
        "bg-white border border-x-black border-t-black border-b-white font-bold": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })) && d(n, "class", l);
    },
    d(u) {
      u && N(n), o = !1, a();
    }
  };
}
function $i(t) {
  let e, n = [], i = /* @__PURE__ */ new Map(), s = t[1];
  const r = (l) => l[8];
  for (let l = 0; l < s.length; l += 1) {
    let o = Ut(t, s, l), a = r(o);
    i.set(a, n[l] = Yt(a, o));
  }
  return {
    c() {
      e = A("div");
      for (let l = 0; l < n.length; l += 1)
        n[l].c();
      this.c = M, d(e, "class", "w-full flex bg-black/20");
    },
    m(l, o) {
      C(l, e, o);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
      t[7](e);
    },
    p(l, [o]) {
      o & 27 && (s = l[1], n = ct(n, o, r, 1, l, s, i, e, at, Yt, null, Ut));
    },
    i: M,
    o: M,
    d(l) {
      l && N(e);
      for (let o = 0; o < n.length; o += 1)
        n[o].d();
      t[7](null);
    }
  };
}
function es(t, e, n) {
  let i, s, { tabs: r = "" } = e, { selected: l = "" } = e, o;
  te();
  const a = (m) => {
    n(0, l = m), be(o, "input", { value: l });
  }, c = (m) => a(m);
  function u(m) {
    oe[m ? "unshift" : "push"](() => {
      o = m, n(2, o);
    });
  }
  return t.$$set = (m) => {
    "tabs" in m && n(5, r = m.tabs), "selected" in m && n(0, l = m.selected);
  }, t.$$.update = () => {
    t.$$.dirty & 32 && n(1, i = r.split(",").map((m) => m.trim())), t.$$.dirty & 3 && n(3, s = i.indexOf(l));
  }, [
    l,
    i,
    o,
    s,
    a,
    r,
    c,
    u
  ];
}
class vn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, es, $i, se, { tabs: 5, selected: 0 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-tabs", vn);
const ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vn
}, Symbol.toStringTag, { value: "Module" }));
function ns(t) {
  let e;
  return {
    c() {
      e = A("tbody"), e.innerHTML = "<slot></slot>", this.c = M;
    },
    m(n, i) {
      C(n, e, i);
    },
    p: M,
    i: M,
    o: M,
    d(n) {
      n && N(e);
    }
  };
}
function is(t) {
  return te(), [];
}
class kn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, is, ns, se, {}, null), e && e.target && C(e.target, this, e.anchor);
  }
}
customElements.define("v-tbody", kn);
const ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kn
}, Symbol.toStringTag, { value: "Module" }));
function ls(t) {
  let e;
  return {
    c() {
      e = A("th"), e.innerHTML = "<slot></slot>", this.c = M, d(e, "class", "p-2 text-neutral-600 font-normal overflow-hidden");
    },
    m(n, i) {
      C(n, e, i);
    },
    p: M,
    i: M,
    o: M,
    d(n) {
      n && N(e);
    }
  };
}
function rs(t) {
  return te(), [];
}
class En extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, rs, ls, se, {}, null), e && e.target && C(e.target, this, e.anchor);
  }
}
customElements.define("v-th", En);
const os = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: En
}, Symbol.toStringTag, { value: "Module" }));
function as(t) {
  let e;
  return {
    c() {
      e = A("td"), e.innerHTML = "<slot></slot>", this.c = M, d(e, "class", "p-2 overflow-hidden");
    },
    m(n, i) {
      C(n, e, i);
    },
    p: M,
    i: M,
    o: M,
    d(n) {
      n && N(e);
    }
  };
}
function cs(t) {
  return te(), [];
}
class Mn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, cs, as, se, {}, null), e && e.target && C(e.target, this, e.anchor);
  }
}
customElements.define("v-td", Mn);
const us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Mn
}, Symbol.toStringTag, { value: "Module" }));
function fs(t) {
  let e;
  return {
    c() {
      e = A("thead"), e.innerHTML = "<slot></slot>", this.c = M, d(e, "class", "border-b border-black");
    },
    m(n, i) {
      C(n, e, i);
    },
    p: M,
    i: M,
    o: M,
    d(n) {
      n && N(e);
    }
  };
}
function ds(t) {
  return te(), [];
}
class Sn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ds, fs, se, {}, null), e && e.target && C(e.target, this, e.anchor);
  }
}
customElements.define("v-thead", Sn);
const hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sn
}, Symbol.toStringTag, { value: "Module" }));
function He(t) {
  return t.split("-")[0];
}
function ft(t) {
  return t.split("-")[1];
}
function Ye(t) {
  return ["top", "bottom"].includes(He(t)) ? "x" : "y";
}
function An(t) {
  return t === "y" ? "height" : "width";
}
function Kt(t, e, n) {
  let {
    reference: i,
    floating: s
  } = t;
  const r = i.x + i.width / 2 - s.width / 2, l = i.y + i.height / 2 - s.height / 2, o = Ye(e), a = An(o), c = i[a] / 2 - s[a] / 2, u = He(e), m = o === "x";
  let h;
  switch (u) {
    case "top":
      h = {
        x: r,
        y: i.y - s.height
      };
      break;
    case "bottom":
      h = {
        x: r,
        y: i.y + i.height
      };
      break;
    case "right":
      h = {
        x: i.x + i.width,
        y: l
      };
      break;
    case "left":
      h = {
        x: i.x - s.width,
        y: l
      };
      break;
    default:
      h = {
        x: i.x,
        y: i.y
      };
  }
  switch (ft(e)) {
    case "start":
      h[o] -= c * (n && m ? -1 : 1);
      break;
    case "end":
      h[o] += c * (n && m ? -1 : 1);
      break;
  }
  return h;
}
const ms = async (t, e, n) => {
  const {
    placement: i = "bottom",
    strategy: s = "absolute",
    middleware: r = [],
    platform: l
  } = n, o = await (l.isRTL == null ? void 0 : l.isRTL(e));
  let a = await l.getElementRects({
    reference: t,
    floating: e,
    strategy: s
  }), {
    x: c,
    y: u
  } = Kt(a, i, o), m = i, h = {}, p = 0;
  for (let g = 0; g < r.length; g++) {
    const {
      name: b,
      fn: V
    } = r[g], {
      x,
      y: F,
      data: T,
      reset: S
    } = await V({
      x: c,
      y: u,
      initialPlacement: i,
      placement: m,
      strategy: s,
      middlewareData: h,
      rects: a,
      platform: l,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (c = x ?? c, u = F ?? u, h = {
      ...h,
      [b]: {
        ...h[b],
        ...T
      }
    }, S && p <= 50) {
      p++, typeof S == "object" && (S.placement && (m = S.placement), S.rects && (a = S.rects === !0 ? await l.getElementRects({
        reference: t,
        floating: e,
        strategy: s
      }) : S.rects), {
        x: c,
        y: u
      } = Kt(a, m, o)), g = -1;
      continue;
    }
  }
  return {
    x: c,
    y: u,
    placement: m,
    strategy: s,
    middlewareData: h
  };
};
function bs(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function gs(t) {
  return typeof t != "number" ? bs(t) : {
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
async function Cn(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: i,
    y: s,
    platform: r,
    rects: l,
    elements: o,
    strategy: a
  } = t, {
    boundary: c = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: m = "floating",
    altBoundary: h = !1,
    padding: p = 0
  } = e, g = gs(p), V = o[h ? m === "floating" ? "reference" : "floating" : m], x = Be(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(V))) == null || n ? V : V.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(o.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: a
  })), F = Be(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: m === "floating" ? {
      ...l.floating,
      x: i,
      y: s
    } : l.reference,
    offsetParent: await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(o.floating)),
    strategy: a
  }) : l[m]);
  return {
    top: x.top - F.top + g.top,
    bottom: F.bottom - x.bottom + g.bottom,
    left: x.left - F.left + g.left,
    right: F.right - x.right + g.right
  };
}
const ps = Math.min, _s = Math.max;
function Gt(t, e, n) {
  return _s(t, ps(e, n));
}
const ws = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ze(t) {
  return t.replace(/left|right|bottom|top/g, (e) => ws[e]);
}
function ys(t, e, n) {
  n === void 0 && (n = !1);
  const i = ft(t), s = Ye(t), r = An(s);
  let l = s === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (l = Ze(l)), {
    main: l,
    cross: Ze(l)
  };
}
const vs = {
  start: "end",
  end: "start"
};
function Jt(t) {
  return t.replace(/start|end/g, (e) => vs[e]);
}
function ks(t) {
  const e = Ze(t);
  return [Jt(t), e, Jt(e)];
}
const Es = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n;
      const {
        placement: i,
        middlewareData: s,
        rects: r,
        initialPlacement: l,
        platform: o,
        elements: a
      } = e, {
        mainAxis: c = !0,
        crossAxis: u = !0,
        fallbackPlacements: m,
        fallbackStrategy: h = "bestFit",
        flipAlignment: p = !0,
        ...g
      } = t, b = He(i), x = m || (b === l || !p ? [Ze(l)] : ks(l)), F = [l, ...x], T = await Cn(e, g), S = [];
      let L = ((n = s.flip) == null ? void 0 : n.overflows) || [];
      if (c && S.push(T[b]), u) {
        const {
          main: O,
          cross: D
        } = ys(i, r, await (o.isRTL == null ? void 0 : o.isRTL(a.floating)));
        S.push(T[O], T[D]);
      }
      if (L = [...L, {
        placement: i,
        overflows: S
      }], !S.every((O) => O <= 0)) {
        var P, k;
        const O = ((P = (k = s.flip) == null ? void 0 : k.index) != null ? P : 0) + 1, D = F[O];
        if (D)
          return {
            data: {
              index: O,
              overflows: L
            },
            reset: {
              placement: D
            }
          };
        let j = "bottom";
        switch (h) {
          case "bestFit": {
            var I;
            const le = (I = L.map((ae) => [ae, ae.overflows.filter((re) => re > 0).reduce((re, ye) => re + ye, 0)]).sort((ae, re) => ae[1] - re[1])[0]) == null ? void 0 : I[0].placement;
            le && (j = le);
            break;
          }
          case "initialPlacement":
            j = l;
            break;
        }
        if (i !== j)
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
async function Ms(t, e) {
  const {
    placement: n,
    platform: i,
    elements: s
  } = t, r = await (i.isRTL == null ? void 0 : i.isRTL(s.floating)), l = He(n), o = ft(n), a = Ye(n) === "x", c = ["left", "top"].includes(l) ? -1 : 1, u = r && a ? -1 : 1, m = typeof e == "function" ? e(t) : e;
  let {
    mainAxis: h,
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
    x: p * u,
    y: h * c
  } : {
    x: h * c,
    y: p * u
  };
}
const Ss = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: i
      } = e, s = await Ms(e, t);
      return {
        x: n + s.x,
        y: i + s.y,
        data: s
      };
    }
  };
};
function As(t) {
  return t === "x" ? "y" : "x";
}
const Cs = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: i,
        placement: s
      } = e, {
        mainAxis: r = !0,
        crossAxis: l = !1,
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
      }, u = await Cn(e, a), m = Ye(He(s)), h = As(m);
      let p = c[m], g = c[h];
      if (r) {
        const V = m === "y" ? "top" : "left", x = m === "y" ? "bottom" : "right", F = p + u[V], T = p - u[x];
        p = Gt(F, p, T);
      }
      if (l) {
        const V = h === "y" ? "top" : "left", x = h === "y" ? "bottom" : "right", F = g + u[V], T = g - u[x];
        g = Gt(F, g, T);
      }
      const b = o.fn({
        ...e,
        [m]: p,
        [h]: g
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
function Pn(t) {
  return t && t.document && t.location && t.alert && t.setInterval;
}
function _e(t) {
  if (t == null)
    return window;
  if (!Pn(t)) {
    const e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function je(t) {
  return _e(t).getComputedStyle(t);
}
function ge(t) {
  return Pn(t) ? "" : t ? (t.nodeName || "").toLowerCase() : "";
}
function Tn() {
  const t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map((e) => e.brand + "/" + e.version).join(" ") : navigator.userAgent;
}
function de(t) {
  return t instanceof _e(t).HTMLElement;
}
function Oe(t) {
  return t instanceof _e(t).Element;
}
function Ps(t) {
  return t instanceof _e(t).Node;
}
function dt(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = _e(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Ke(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: i
  } = je(t);
  return /auto|scroll|overlay|hidden/.test(e + i + n);
}
function Ts(t) {
  return ["table", "td", "th"].includes(ge(t));
}
function On(t) {
  const e = /firefox/i.test(Tn()), n = je(t);
  return n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].includes(n.willChange) || e && n.willChange === "filter" || e && (n.filter ? n.filter !== "none" : !1);
}
function Rn() {
  return !/^((?!chrome|android).)*safari/i.test(Tn());
}
const Qt = Math.min, Fe = Math.max, qe = Math.round;
function Me(t, e, n) {
  var i, s, r, l;
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const o = t.getBoundingClientRect();
  let a = 1, c = 1;
  e && de(t) && (a = t.offsetWidth > 0 && qe(o.width) / t.offsetWidth || 1, c = t.offsetHeight > 0 && qe(o.height) / t.offsetHeight || 1);
  const u = Oe(t) ? _e(t) : window, m = !Rn() && n, h = (o.left + (m && (i = (s = u.visualViewport) == null ? void 0 : s.offsetLeft) != null ? i : 0)) / a, p = (o.top + (m && (r = (l = u.visualViewport) == null ? void 0 : l.offsetTop) != null ? r : 0)) / c, g = o.width / a, b = o.height / c;
  return {
    width: g,
    height: b,
    top: p,
    right: h + g,
    bottom: p + b,
    left: h,
    x: h,
    y: p
  };
}
function we(t) {
  return ((Ps(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function Ge(t) {
  return Oe(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function Vn(t) {
  return Me(we(t)).left + Ge(t).scrollLeft;
}
function Os(t) {
  const e = Me(t);
  return qe(e.width) !== t.offsetWidth || qe(e.height) !== t.offsetHeight;
}
function Rs(t, e, n) {
  const i = de(e), s = we(e), r = Me(t, i && Os(e), n === "fixed");
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const o = {
    x: 0,
    y: 0
  };
  if (i || !i && n !== "fixed")
    if ((ge(e) !== "body" || Ke(s)) && (l = Ge(e)), de(e)) {
      const a = Me(e, !0);
      o.x = a.x + e.clientLeft, o.y = a.y + e.clientTop;
    } else
      s && (o.x = Vn(s));
  return {
    x: r.left + l.scrollLeft - o.x,
    y: r.top + l.scrollTop - o.y,
    width: r.width,
    height: r.height
  };
}
function Ln(t) {
  return ge(t) === "html" ? t : t.assignedSlot || t.parentNode || (dt(t) ? t.host : null) || we(t);
}
function $t(t) {
  return !de(t) || getComputedStyle(t).position === "fixed" ? null : t.offsetParent;
}
function Vs(t) {
  let e = Ln(t);
  for (dt(e) && (e = e.host); de(e) && !["html", "body"].includes(ge(e)); ) {
    if (On(e))
      return e;
    e = e.parentNode;
  }
  return null;
}
function lt(t) {
  const e = _e(t);
  let n = $t(t);
  for (; n && Ts(n) && getComputedStyle(n).position === "static"; )
    n = $t(n);
  return n && (ge(n) === "html" || ge(n) === "body" && getComputedStyle(n).position === "static" && !On(n)) ? e : n || Vs(t) || e;
}
function en(t) {
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
function Ls(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: i
  } = t;
  const s = de(n), r = we(n);
  if (n === r)
    return e;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const o = {
    x: 0,
    y: 0
  };
  if ((s || !s && i !== "fixed") && ((ge(n) !== "body" || Ke(r)) && (l = Ge(n)), de(n))) {
    const a = Me(n, !0);
    o.x = a.x + n.clientLeft, o.y = a.y + n.clientTop;
  }
  return {
    ...e,
    x: e.x - l.scrollLeft + o.x,
    y: e.y - l.scrollTop + o.y
  };
}
function xs(t, e) {
  const n = _e(t), i = we(t), s = n.visualViewport;
  let r = i.clientWidth, l = i.clientHeight, o = 0, a = 0;
  if (s) {
    r = s.width, l = s.height;
    const c = Rn();
    (c || !c && e === "fixed") && (o = s.offsetLeft, a = s.offsetTop);
  }
  return {
    width: r,
    height: l,
    x: o,
    y: a
  };
}
function Is(t) {
  var e;
  const n = we(t), i = Ge(t), s = (e = t.ownerDocument) == null ? void 0 : e.body, r = Fe(n.scrollWidth, n.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0), l = Fe(n.scrollHeight, n.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0);
  let o = -i.scrollLeft + Vn(t);
  const a = -i.scrollTop;
  return je(s || n).direction === "rtl" && (o += Fe(n.clientWidth, s ? s.clientWidth : 0) - r), {
    width: r,
    height: l,
    x: o,
    y: a
  };
}
function xn(t) {
  const e = Ln(t);
  return ["html", "body", "#document"].includes(ge(e)) ? t.ownerDocument.body : de(e) && Ke(e) ? e : xn(e);
}
function In(t, e) {
  var n;
  e === void 0 && (e = []);
  const i = xn(t), s = i === ((n = t.ownerDocument) == null ? void 0 : n.body), r = _e(i), l = s ? [r].concat(r.visualViewport || [], Ke(i) ? i : []) : i, o = e.concat(l);
  return s ? o : o.concat(In(l));
}
function Fs(t, e) {
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
function Ns(t, e) {
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
function tn(t, e, n) {
  return e === "viewport" ? Be(xs(t, n)) : Oe(e) ? Ns(e, n) : Be(Is(we(t)));
}
function Hs(t) {
  const e = In(t), i = ["absolute", "fixed"].includes(je(t).position) && de(t) ? lt(t) : t;
  return Oe(i) ? e.filter((s) => Oe(s) && Fs(s, i) && ge(s) !== "body") : [];
}
function js(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: i,
    strategy: s
  } = t;
  const l = [...n === "clippingAncestors" ? Hs(e) : [].concat(n), i], o = l[0], a = l.reduce((c, u) => {
    const m = tn(e, u, s);
    return c.top = Fe(m.top, c.top), c.right = Qt(m.right, c.right), c.bottom = Qt(m.bottom, c.bottom), c.left = Fe(m.left, c.left), c;
  }, tn(e, o, s));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
const zs = {
  getClippingRect: js,
  convertOffsetParentRelativeRectToViewportRelativeRect: Ls,
  isElement: Oe,
  getDimensions: en,
  getOffsetParent: lt,
  getDocumentElement: we,
  getElementRects: (t) => {
    let {
      reference: e,
      floating: n,
      strategy: i
    } = t;
    return {
      reference: Rs(e, lt(n), i),
      floating: {
        ...en(n),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => je(t).direction === "rtl"
}, Ds = (t, e, n) => ms(t, e, {
  platform: zs,
  ...n
});
function Ws(t) {
  let e, n, i, s, r, l, o;
  return {
    c() {
      e = A("div"), n = A("slot"), i = z(), s = A("div"), r = X(t[0]), this.c = M, d(s, "role", "tooltip"), d(s, "class", `
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
    `), ue(s, "transform", "translate(" + t[4] + "px, " + t[5] + "px)"), Y(s, "invisible", t[3]), d(e, "class", "relative"), d(e, "aria-describedby", "tooltip");
    },
    m(a, c) {
      C(a, e, c), y(e, n), y(e, i), y(e, s), y(s, r), t[9](s), t[10](e), l || (o = [
        Z(e, "mouseenter", t[6]),
        Z(e, "mouseleave", t[7])
      ], l = !0);
    },
    p(a, [c]) {
      c & 1 && K(r, a[0]), c & 48 && ue(s, "transform", "translate(" + a[4] + "px, " + a[5] + "px)"), c & 8 && Y(s, "invisible", a[3]);
    },
    i: M,
    o: M,
    d(a) {
      a && N(e), t[9](null), t[10](null), l = !1, pe(o);
    }
  };
}
function Bs(t, e, n) {
  let { text: i = "" } = e, { location: s = "top" } = e, r, l, o = !0, a = 0, c = 0;
  const u = async () => {
    const b = await Ds(r, l, {
      placement: s,
      middleware: [Es(), Cs({ padding: 5 }), Ss(10)]
    });
    n(4, a = b.x), n(5, c = b.y);
  }, m = async () => {
    await u(), n(3, o = !1);
  }, h = () => {
    n(3, o = !0);
  };
  te();
  function p(b) {
    oe[b ? "unshift" : "push"](() => {
      l = b, n(2, l);
    });
  }
  function g(b) {
    oe[b ? "unshift" : "push"](() => {
      r = b, n(1, r);
    });
  }
  return t.$$set = (b) => {
    "text" in b && n(0, i = b.text), "location" in b && n(8, s = b.location);
  }, [
    i,
    r,
    l,
    o,
    a,
    c,
    m,
    h,
    s,
    p,
    g
  ];
}
class Fn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Bs, Ws, se, { text: 0, location: 8 }, null), e && (e.target && C(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-tooltip", Fn);
const Zs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fn
}, Symbol.toStringTag, { value: "Module" }));
function qs(t) {
  let e;
  return {
    c() {
      e = A("tr"), e.innerHTML = "<slot></slot>", this.c = M, d(e, "class", "border-b");
    },
    m(n, i) {
      C(n, e, i);
    },
    p: M,
    i: M,
    o: M,
    d(n) {
      n && N(e);
    }
  };
}
function Xs(t) {
  return te(), [];
}
class Nn extends Q {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Xs, qs, se, {}, null), e && e.target && C(e.target, this, e.anchor);
  }
}
customElements.define("v-tr", Nn);
const Us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nn
}, Symbol.toStringTag, { value: "Module" }));
