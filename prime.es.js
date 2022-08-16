(function() {
  const t = /* @__PURE__ */ new WeakMap(), e = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), g = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), m = /* @__PURE__ */ new WeakMap(), b = { attributes: !0, attributeFilter: ["disabled"] }, y = new MutationObserver((v) => {
    for (const h of v) {
      const _ = h.target;
      if (_.constructor.formAssociated) {
        const T = _.hasAttribute("disabled");
        _.toggleAttribute("internals-disabled", T), T ? _.setAttribute("aria-disabled", "true") : _.removeAttribute("aria-disabled"), _.formDisabledCallback && _.formDisabledCallback.apply(_, [T]);
      }
    }
  }), p = (v) => {
    n.get(v).forEach((_) => {
      _.remove();
    }), n.set(v, []);
  }, w = (v, h) => {
    const _ = document.createElement("input");
    return _.type = "hidden", _.name = v.getAttribute("name"), v.after(_), n.get(h).push(_), _;
  }, z = (v, h) => {
    n.set(h, []);
    const _ = v.hasAttribute("disabled");
    v.toggleAttribute("internals-disabled", _), y.observe(v, b);
  }, R = (v, h) => {
    if (h.length) {
      Array.from(h).forEach((T) => T.addEventListener("click", v.focus.bind(v)));
      let _ = h[0].id;
      h[0].id || (_ = `${h[0].htmlFor}_Label`, h[0].id = _), v.setAttribute("aria-labelledby", _);
    }
  }, C = (v) => {
    const h = Array.from(v.elements).filter((Y) => Y.validity).map((Y) => Y.validity.valid), _ = Array.from(a.get(v)).filter((Y) => Y.isConnected).map((Y) => r.get(Y).validity.valid), T = [...h, ..._].includes(!1);
    v.toggleAttribute("internals-invalid", T), v.toggleAttribute("internals-valid", !T);
  }, j = (v) => {
    C(H(v.target));
  }, P = (v) => {
    C(H(v.target));
  }, I = (v) => {
    const h = v.target, _ = a.get(h);
    h.noValidate || _.size && (Array.from(_).reverse().map((se) => r.get(se).reportValidity()).includes(!1) ? (v.stopImmediatePropagation(), v.stopPropagation(), v.preventDefault()) : m.get(h) && m.get(h).call(h, v) === !1 && v.preventDefault());
  }, V = (v) => {
    const h = a.get(v.target);
    h && h.size && h.forEach((_) => {
      _.constructor.formAssociated && _.formResetCallback && _.formResetCallback.apply(_);
    });
  }, k = (v, h, _) => {
    if (h) {
      h.onsubmit && (m.set(h, h.onsubmit.bind(h)), h.onsubmit = null);
      const T = a.get(h);
      if (T)
        T.add(v);
      else {
        const Y = /* @__PURE__ */ new Set();
        Y.add(v), a.set(h, Y), h.addEventListener("submit", I), h.addEventListener("reset", V), h.addEventListener("input", j), h.addEventListener("change", P);
      }
      o.set(h, { ref: v, internals: _ }), v.constructor.formAssociated && v.formAssociatedCallback && setTimeout(() => {
        v.formAssociatedCallback.apply(v, [h]);
      }, 0), C(h);
    }
  }, H = (v) => {
    let h = v.parentNode;
    return h && h.tagName !== "FORM" && (h = H(h)), h;
  }, D = (v, h, _ = DOMException) => {
    if (!v.constructor.formAssociated)
      throw new _(h);
  }, oe = (v, h, _) => {
    const T = a.get(v);
    return T && T.size && T.forEach((Y) => {
      r.get(Y)[_]() || (h = !1);
    }), h;
  }, N = (v) => {
    if (v.constructor.formAssociated) {
      const h = r.get(v), { labels: _, form: T } = h;
      R(v, _), k(v, T, h);
    }
  }, B = {
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
  }, ce = (v, h) => {
    for (let _ in B) {
      h[_] = null;
      let T = null;
      const Y = B[_];
      Object.defineProperty(h, _, {
        get() {
          return T;
        },
        set(se) {
          T = se, v.isConnected ? v.setAttribute(Y, se) : c.set(v, h);
        }
      });
    }
  };
  class ue {
    constructor() {
      this.badInput = !1, this.customError = !1, this.patternMismatch = !1, this.rangeOverflow = !1, this.rangeUnderflow = !1, this.stepMismatch = !1, this.tooLong = !1, this.tooShort = !1, this.typeMismatch = !1, this.valid = !0, this.valueMissing = !1, Object.seal(this);
    }
  }
  const ge = (v) => (v.badInput = !1, v.customError = !1, v.patternMismatch = !1, v.rangeOverflow = !1, v.rangeUnderflow = !1, v.stepMismatch = !1, v.tooLong = !1, v.tooShort = !1, v.typeMismatch = !1, v.valid = !0, v.valueMissing = !1, v), Ee = (v, h, _) => (v.valid = Se(h), Object.keys(h).forEach((T) => v[T] = h[T]), _ && C(_), v), Se = (v) => {
    let h = !0;
    for (let _ in v)
      _ !== "valid" && v[_] !== !1 && (h = !1);
    return h;
  };
  function pe(v) {
    v.forEach((h) => {
      const { addedNodes: _, removedNodes: T } = h, Y = Array.from(_), se = Array.from(T);
      Y.forEach((Z) => {
        if (r.has(Z) && Z.constructor.formAssociated) {
          const te = r.get(Z), { form: ae } = te;
          k(Z, ae, te), R(Z, te.labels);
        }
        if (c.has(Z)) {
          const te = c.get(Z);
          Object.keys(B).filter((de) => te[de] !== null).forEach((de) => {
            Z.setAttribute(B[de], te[de]);
          }), c.delete(Z);
        }
      }), se.forEach((Z) => {
        const te = r.get(Z);
        te && n.get(te) && p(te), s.has(Z) && s.get(Z).disconnect();
      });
    });
  }
  function Ie(v) {
    v.forEach((h) => {
      const { removedNodes: _ } = h;
      _.forEach((T) => {
        const Y = u.get(h.target);
        r.has(T) && N(T), Y.disconnect();
      });
    });
  }
  const rt = (v) => {
    const h = new MutationObserver(Ie);
    h.observe(v, { childList: !0 }), u.set(v, h);
  };
  new MutationObserver(pe);
  const Ne = {
    childList: !0,
    subtree: !0
  }, Fe = /* @__PURE__ */ new WeakMap();
  class Oe extends Set {
    static get isPolyfilled() {
      return !0;
    }
    constructor(h) {
      if (super(), !h || !h.tagName || h.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      Fe.set(this, h);
    }
    add(h) {
      if (!/^--/.test(h) || typeof h != "string")
        throw new DOMException(`Failed to execute 'add' on 'CustomStateSet': The specified value ${h} must start with '--'.`);
      const _ = super.add(h), T = Fe.get(this);
      return T.toggleAttribute(`state${h}`, !0), T.part && T.part.add(`state${h}`), _;
    }
    clear() {
      for (let [h] of this.entries())
        this.delete(h);
      super.clear();
    }
    delete(h) {
      const _ = super.delete(h), T = Fe.get(this);
      return T.toggleAttribute(`state${h}`, !1), T.part && T.part.remove(`state${h}`), _;
    }
  }
  class Pe {
    constructor(h) {
      if (!h || !h.tagName || h.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      const _ = h.getRootNode(), T = new ue();
      this.states = new Oe(h), t.set(this, h), e.set(this, T), r.set(h, this), ce(h, this), z(h, this), Object.seal(this), N(h), _ instanceof DocumentFragment && rt(_);
    }
    static get isPolyfilled() {
      return !0;
    }
    checkValidity() {
      const h = t.get(this);
      if (D(h, "Failed to execute 'checkValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const _ = e.get(this);
      if (!_.valid) {
        const T = new Event("invalid", {
          bubbles: !1,
          cancelable: !0,
          composed: !1
        });
        h.dispatchEvent(T);
      }
      return _.valid;
    }
    get form() {
      const h = t.get(this);
      D(h, "Failed to read the 'form' property from 'ElementInternals': The target element is not a form-associated custom element.");
      let _;
      return h.constructor.formAssociated === !0 && (_ = H(h)), _;
    }
    get labels() {
      const h = t.get(this);
      D(h, "Failed to read the 'labels' property from 'ElementInternals': The target element is not a form-associated custom element.");
      const _ = h.getAttribute("id"), T = h.getRootNode();
      return T && _ ? T.querySelectorAll(`[for=${_}]`) : [];
    }
    reportValidity() {
      const h = t.get(this);
      if (D(h, "Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const _ = this.checkValidity(), T = g.get(this);
      if (T && !h.constructor.formAssociated)
        throw new DOMException("Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element.");
      return !_ && T && (h.focus(), T.focus()), _;
    }
    setFormValue(h) {
      const _ = t.get(this);
      if (D(_, "Failed to execute 'setFormValue' on 'ElementInternals': The target element is not a form-associated custom element."), p(this), h != null && !(h instanceof FormData)) {
        if (_.getAttribute("name")) {
          const T = w(_, this);
          T.value = h;
        }
      } else
        h != null && h instanceof FormData && h.forEach((T, Y) => {
          if (typeof T == "string") {
            const se = w(_, this);
            se.name = Y, se.value = T;
          }
        });
      l.set(_, h);
    }
    setValidity(h, _, T) {
      const Y = t.get(this);
      if (D(Y, "Failed to execute 'setValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !h)
        throw new TypeError("Failed to execute 'setValidity' on 'ElementInternals': 1 argument required, but only 0 present.");
      g.set(this, T);
      const se = e.get(this), Z = {};
      for (const de in h)
        Z[de] = h[de];
      Object.keys(Z).length === 0 && ge(se);
      const te = { ...se, ...Z };
      delete te.valid;
      const { valid: ae } = Ee(se, te, this.form);
      if (!ae && !_)
        throw new DOMException("Failed to execute 'setValidity' on 'ElementInternals': The second argument should not be empty if one or more flags in the first argument are true.");
      i.set(this, ae ? "" : _), Y.toggleAttribute("internals-invalid", !ae), Y.toggleAttribute("internals-valid", ae), Y.setAttribute("aria-invalid", `${!ae}`);
    }
    get shadowRoot() {
      const h = t.get(this), _ = f.get(h);
      return _ || null;
    }
    get validationMessage() {
      const h = t.get(this);
      return D(h, "Failed to read the 'validationMessage' property from 'ElementInternals': The target element is not a form-associated custom element."), i.get(this);
    }
    get validity() {
      const h = t.get(this);
      return D(h, "Failed to read the 'validity' property from 'ElementInternals': The target element is not a form-associated custom element."), e.get(this);
    }
    get willValidate() {
      const h = t.get(this);
      return D(h, "Failed to read the 'willValidate' property from 'ElementInternals': The target element is not a form-associated custom element."), !(h.disabled || h.hasAttribute("disabled") || h.hasAttribute("readonly"));
    }
  }
  function it() {
    if (!window.ElementInternals)
      return !1;
    class v extends HTMLElement {
      constructor() {
        super(), this.internals = this.attachInternals();
      }
    }
    const h = `element-internals-feature-detection-${Math.random().toString(36).replace(/[^a-z]+/g, "")}`;
    customElements.define(h, v);
    const _ = new v();
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
    ].every((T) => T in _.internals);
  }
  if (it()) {
    if (!window.CustomStateSet) {
      window.CustomStateSet = Oe;
      const v = HTMLElement.prototype.attachInternals;
      HTMLElement.prototype.attachInternals = function(...h) {
        const _ = v.call(this, h);
        return _.states = new Oe(this), _;
      };
    }
  } else {
    let v = function(...te) {
      const ae = T.apply(this, te), de = new MutationObserver(pe);
      return f.set(this, ae), window.ShadyDOM ? de.observe(this, Ne) : de.observe(ae, Ne), s.set(this, de), ae;
    }, h = function(...te) {
      let ae = se.apply(this, te);
      return oe(this, ae, "checkValidity");
    }, _ = function(...te) {
      let ae = Z.apply(this, te);
      return oe(this, ae, "reportValidity");
    };
    var tr = v, nr = h, rr = _;
    window.ElementInternals = Pe, HTMLElement.prototype.attachInternals = function() {
      if (this.tagName.indexOf("-") === -1)
        throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': Unable to attach ElementInternals to non-custom elements.");
      if (r.has(this))
        throw new DOMException("DOMException: Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");
      return new Pe(this);
    };
    const T = Element.prototype.attachShadow;
    Element.prototype.attachShadow = v, new MutationObserver(pe).observe(document.documentElement, Ne);
    const se = HTMLFormElement.prototype.checkValidity;
    HTMLFormElement.prototype.checkValidity = h;
    const Z = HTMLFormElement.prototype.reportValidity;
    HTMLFormElement.prototype.reportValidity = _, window.CustomStateSet || (window.CustomStateSet = Oe);
  }
})();
function S() {
}
function dt(t) {
  return t();
}
function wt() {
  return /* @__PURE__ */ Object.create(null);
}
function _e(t) {
  t.forEach(dt);
}
function bn(t) {
  return typeof t == "function";
}
function mn(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function re(t, e) {
  return t != t ? e == e : t !== e;
}
function ar(t) {
  return Object.keys(t).length === 0;
}
function lr(t, ...e) {
  if (t == null)
    return S;
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const gn = typeof window < "u";
let yt = gn ? () => window.performance.now() : () => Date.now(), pn = gn ? (t) => requestAnimationFrame(t) : S;
const ze = /* @__PURE__ */ new Set();
function wn(t) {
  ze.forEach((e) => {
    e.c(t) || (ze.delete(e), e.f());
  }), ze.size !== 0 && pn(wn);
}
function cr(t) {
  let e;
  return ze.size === 0 && pn(wn), {
    promise: new Promise((n) => {
      ze.add(e = { c: t, f: n });
    }),
    abort() {
      ze.delete(e);
    }
  };
}
function x(t, e) {
  t.appendChild(e);
}
function O(t, e, n) {
  t.insertBefore(e, n || null);
}
function L(t) {
  t.parentNode.removeChild(t);
}
function $e(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function A(t) {
  return document.createElement(t);
}
function Ae(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function q(t) {
  return document.createTextNode(t);
}
function W() {
  return q(" ");
}
function ht() {
  return q("");
}
function X(t, e, n, r) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function vt(t) {
  return function(e) {
    return e.preventDefault(), t.call(this, e);
  };
}
function d(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function ye(t, e, n) {
  e in t ? t[e] = typeof t[e] == "boolean" && n === "" ? !0 : n : d(t, e, n);
}
function ur(t) {
  return Array.from(t.childNodes);
}
function K(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function he(t, e, n, r) {
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
let Ye;
function He(t) {
  Ye = t;
}
function Le() {
  if (!Ye)
    throw new Error("Function called outside component initialization");
  return Ye;
}
function yn(t) {
  Le().$$.on_mount.push(t);
}
function fr(t) {
  Le().$$.on_destroy.push(t);
}
const De = [], le = [], Ze = [], _t = [], dr = Promise.resolve();
let at = !1;
function hr() {
  at || (at = !0, dr.then(M));
}
function lt(t) {
  Ze.push(t);
}
const ot = /* @__PURE__ */ new Set();
let Ue = 0;
function M() {
  const t = Ye;
  do {
    for (; Ue < De.length; ) {
      const e = De[Ue];
      Ue++, He(e), br(e.$$);
    }
    for (He(null), De.length = 0, Ue = 0; le.length; )
      le.pop()();
    for (let e = 0; e < Ze.length; e += 1) {
      const n = Ze[e];
      ot.has(n) || (ot.add(n), n());
    }
    Ze.length = 0;
  } while (De.length);
  for (; _t.length; )
    _t.pop()();
  at = !1, ot.clear(), He(t);
}
function br(t) {
  if (t.fragment !== null) {
    t.update(), _e(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(lt);
  }
}
const mr = /* @__PURE__ */ new Set();
function vn(t, e) {
  t && t.i && (mr.delete(t), t.i(e));
}
function bt(t, e) {
  t.d(1), e.delete(t.key);
}
function mt(t, e, n, r, i, o, s, a, l, c, f, g) {
  let u = t.length, m = o.length, b = u;
  const y = {};
  for (; b--; )
    y[t[b].key] = b;
  const p = [], w = /* @__PURE__ */ new Map(), z = /* @__PURE__ */ new Map();
  for (b = m; b--; ) {
    const P = g(i, o, b), I = n(P);
    let V = s.get(I);
    V ? r && V.p(P, e) : (V = c(I, P), V.c()), w.set(I, p[b] = V), I in y && z.set(I, Math.abs(b - y[I]));
  }
  const R = /* @__PURE__ */ new Set(), C = /* @__PURE__ */ new Set();
  function j(P) {
    vn(P, 1), P.m(a, f), s.set(P.key, P), f = P.first, m--;
  }
  for (; u && m; ) {
    const P = p[m - 1], I = t[u - 1], V = P.key, k = I.key;
    P === I ? (f = P.first, u--, m--) : w.has(k) ? !s.has(V) || R.has(V) ? j(P) : C.has(k) ? u-- : z.get(V) > z.get(k) ? (C.add(V), j(P)) : (R.add(k), u--) : (l(I, s), u--);
  }
  for (; u--; ) {
    const P = t[u];
    w.has(P.key) || l(P, s);
  }
  for (; m; )
    j(p[m - 1]);
  return p;
}
function gr(t, e, n, r) {
  const { fragment: i, on_mount: o, on_destroy: s, after_update: a } = t.$$;
  i && i.m(e, n), r || lt(() => {
    const l = o.map(dt).filter(bn);
    s ? s.push(...l) : _e(l), t.$$.on_mount = [];
  }), a.forEach(lt);
}
function pr(t, e) {
  const n = t.$$;
  n.fragment !== null && (_e(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function wr(t, e) {
  t.$$.dirty[0] === -1 && (De.push(t), hr(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function ee(t, e, n, r, i, o, s, a = [-1]) {
  const l = Ye;
  He(t);
  const c = t.$$ = {
    fragment: null,
    ctx: null,
    props: o,
    update: S,
    not_equal: i,
    bound: wt(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (l ? l.$$.context : [])),
    callbacks: wt(),
    dirty: a,
    skip_bound: !1,
    root: e.target || l.$$.root
  };
  s && s(c.root);
  let f = !1;
  if (c.ctx = n ? n(t, e.props || {}, (g, u, ...m) => {
    const b = m.length ? m[0] : u;
    return c.ctx && i(c.ctx[g], c.ctx[g] = b) && (!c.skip_bound && c.bound[g] && c.bound[g](b), f && wr(t, g)), u;
  }) : [], c.update(), f = !0, _e(c.before_update), c.fragment = r ? r(c.ctx) : !1, e.target) {
    if (e.hydrate) {
      const g = ur(e.target);
      c.fragment && c.fragment.l(g), g.forEach(L);
    } else
      c.fragment && c.fragment.c();
    e.intro && vn(t.$$.fragment), gr(t, e.target, e.anchor, e.customElement), M();
  }
  He(l);
}
let G;
typeof HTMLElement == "function" && (G = class extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const { on_mount: t } = this.$$;
    this.$$.on_disconnect = t.map(dt).filter(bn);
    for (const e in this.$$.slotted)
      this.appendChild(this.$$.slotted[e]);
  }
  attributeChangedCallback(t, e, n) {
    this[t] = n;
  }
  disconnectedCallback() {
    _e(this.$$.on_disconnect);
  }
  $destroy() {
    pr(this, 1), this.$destroy = S;
  }
  $on(t, e) {
    const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return n.push(e), () => {
      const r = n.indexOf(e);
      r !== -1 && n.splice(r, 1);
    };
  }
  $set(t) {
    this.$$set && !ar(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
});
const _n = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.invisible{visibility:hidden}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.left-0{left:0}.right-0{right:0}.top-1{top:.25rem}.bottom-auto{bottom:auto}.bottom-1{bottom:.25rem}.left-1\\/2{left:50%}.bottom-full{bottom:100%}.-top-0\\.5{top:-.125rem}.-top-0{top:-0px}.top-\\[calc\\(50\\%-9px\\)\\]{top:calc(50% - 9px)}.top-0{top:0}.right-0\\.5{right:.125rem}.bottom-0{bottom:0}.isolate{isolation:isolate}.z-10{z-index:10}.z-\\[2\\]{z-index:2}.z-\\[1\\]{z-index:1}.mx-auto{margin-left:auto;margin-right:auto}.-mt-px{margin-top:-1px}.-mt-0\\.5{margin-top:-.125rem}.-mt-0{margin-top:-0px}.mt-1{margin-top:.25rem}.mt-7{margin-top:1.75rem}.mb-3{margin-bottom:.75rem}.mt-px{margin-top:1px}.ml-px{margin-left:1px}.-mb-px{margin-bottom:-1px}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.hidden{display:none}.h-\\[60\\%\\]{height:60%}.h-full{height:100%}.h-0\\.5{height:.125rem}.h-0{height:0px}.h-5{height:1.25rem}.h-1{height:.25rem}.h-2{height:.5rem}.h-\\[4px\\]{height:4px}.h-4{height:1rem}.max-h-0{max-height:0px}.max-h-fit{max-height:fit-content}.w-px{width:1px}.w-full{width:100%}.w-5{width:1.25rem}.w-\\[1px\\]{width:1px}.w-11{width:2.75rem}.w-4{width:1rem}.max-w-\\[14rem\\]{max-width:14rem}.flex-shrink-0{flex-shrink:0}.table-fixed{table-layout:fixed}.-translate-x-1\\/2{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\.5{--tw-translate-y: -.375rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1{--tw-translate-y: -.25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-1\\/2{--tw-translate-x: 50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-0{--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-6{--tw-translate-x: 1.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-rotate-\\[30deg\\]{--tw-rotate: -30deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-\\[30deg\\]{--tw-rotate: 30deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-180{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.cursor-not-allowed{cursor:not-allowed}.select-none{user-select:none}.appearance-none{appearance:none}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-3{gap:.75rem}.gap-2{gap:.5rem}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.overflow-hidden{overflow:hidden}.whitespace-nowrap{white-space:nowrap}.rounded-full{border-radius:9999px}.rounded-none{border-radius:0}.border{border-width:1px}.border-y{border-top-width:1px;border-bottom-width:1px}.border-l{border-left-width:1px}.border-l-4{border-left-width:4px}.border-b{border-bottom-width:1px}.border-r{border-right-width:1px}.border-black{--tw-border-opacity: 1;border-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-red\\/90{--tw-border-opacity: 1;border-color:rgb(190 48 38 / var(--tw-border-opacity))}.border-orange\\/90{--tw-border-opacity: 1;border-color:rgb(255 153 0 / var(--tw-border-opacity))}.border-green\\/90{--tw-border-opacity: 1;border-color:rgb(57 127 72 / var(--tw-border-opacity))}.border-blue\\/90{--tw-border-opacity: 1;border-color:rgb(4 86 129 / var(--tw-border-opacity))}.border-black\\/70{--tw-border-opacity: 1;border-color:rgb(85 85 85 / var(--tw-border-opacity))}.border-green\\/100{--tw-border-opacity: 1;border-color:rgb(41 91 51 / var(--tw-border-opacity))}.border-white{--tw-border-opacity: 1;border-color:rgb(255 255 255 / var(--tw-border-opacity))}.border-x-black{--tw-border-opacity: 1;border-left-color:rgb(0 0 0 / var(--tw-border-opacity));border-right-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-b-black{--tw-border-opacity: 1;border-bottom-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-t-black{--tw-border-opacity: 1;border-top-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-b-white{--tw-border-opacity: 1;border-bottom-color:rgb(255 255 255 / var(--tw-border-opacity))}.border-l-gray-300{--tw-border-opacity: 1;border-left-color:rgb(209 213 219 / var(--tw-border-opacity))}.border-r-gray-300{--tw-border-opacity: 1;border-right-color:rgb(209 213 219 / var(--tw-border-opacity))}.bg-green-200{--tw-bg-opacity: 1;background-color:rgb(187 247 208 / var(--tw-bg-opacity))}.bg-orange-200{--tw-bg-opacity: 1;background-color:rgb(254 215 170 / var(--tw-bg-opacity))}.bg-red-200{--tw-bg-opacity: 1;background-color:rgb(254 202 202 / var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}.bg-black\\/50{--tw-bg-opacity: 1;background-color:rgb(157 157 157 / var(--tw-bg-opacity))}.bg-gray-400{--tw-bg-opacity: 1;background-color:rgb(156 163 175 / var(--tw-bg-opacity))}.bg-green\\/80{--tw-bg-opacity: 1;background-color:rgb(73 162 92 / var(--tw-bg-opacity))}.bg-black\\/20{--tw-bg-opacity: 1;background-color:rgb(233 233 233 / var(--tw-bg-opacity))}.bg-red\\/90{--tw-bg-opacity: 1;background-color:rgb(190 48 38 / var(--tw-bg-opacity))}.bg-green\\/90{--tw-bg-opacity: 1;background-color:rgb(57 127 72 / var(--tw-bg-opacity))}.p-3{padding:.75rem}.p-2{padding:.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-0{padding-top:0;padding-bottom:0}.px-4{padding-left:1rem;padding-right:1rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-1\\.5{padding-left:.375rem;padding-right:.375rem}.px-1{padding-left:.25rem;padding-right:.25rem}.pb-1{padding-bottom:.25rem}.text-left{text-align:left}.text-center{text-align:center}.text-xs{font-size:.75rem;line-height:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-base{font-size:1rem;line-height:1.5rem}.text-\\[15px\\]{font-size:15px}.font-bold{font-weight:700}.font-normal{font-weight:400}.uppercase{text-transform:uppercase}.capitalize{text-transform:capitalize}.text-green-900{--tw-text-opacity: 1;color:rgb(20 83 45 / var(--tw-text-opacity))}.text-orange-900{--tw-text-opacity: 1;color:rgb(124 45 18 / var(--tw-text-opacity))}.text-red-900{--tw-text-opacity: 1;color:rgb(127 29 29 / var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity))}.text-black{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-black\\/70{--tw-text-opacity: 1;color:rgb(85 85 85 / var(--tw-text-opacity))}.text-red\\/90{--tw-text-opacity: 1;color:rgb(190 48 38 / var(--tw-text-opacity))}.text-neutral-600{--tw-text-opacity: 1;color:rgb(82 82 82 / var(--tw-text-opacity))}.opacity-50{opacity:.5}.opacity-0{opacity:0}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.outline-none{outline:2px solid transparent;outline-offset:2px}.ring-0{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.blur{--tw-blur: blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-200{transition-duration:.2s}.duration-500{transition-duration:.5s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}*,input,button{font-family:Space Mono,monospace}:host{display:contents}:host([hidden]){display:none}[class^=icon-],[class*=" icon-"]{font-family:icons!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-error-outline:before{content:"\\e912"}.icon-warning:before{content:"\\e916"}.icon-disconnected:before{content:"\\e919"}.icon-send:before{content:"\\e91b"}.icon-undo:before{content:"\\e91c"}.icon-connected:before{content:"\\e91a"}.icon-download:before{content:"\\e913"}.icon-camera:before{content:"\\e914"}.icon-center:before{content:"\\e915"}.icon-arrow-up:before{content:"\\e917"}.icon-settings:before{content:"\\e918"}.icon-refresh:before{content:"\\e911"}.icon-info-outline:before{content:"\\e910"}.icon-pause-circle-filled:before{content:"\\e90e"}.icon-play-circle-filled:before{content:"\\e90f"}.icon-logout:before{content:"\\e900"}.icon-instagram:before{content:"\\e901"}.icon-social-medium:before{content:"\\e906"}.icon-copy:before{content:"\\e907"}.icon-save:before{content:"\\e909"}.icon-edit:before{content:"\\e90a";color:#555}.icon-stop-circle:before{content:"\\e903"}.icon-twitter:before{content:"\\e902"}.icon-linkedin:before{content:"\\e90b"}.icon-trash:before{content:"\\e905"}.icon-alert:before{content:"\\e904"}.icon-ask:before{content:"\\e908"}.icon-x:before{content:"\\e942"}.icon-chevron-down:before{content:"\\e90c"}.icon-checkmark:before{content:"\\e90d"}.first\\:ml-4:first-child{margin-left:1rem}.last\\:border-r:last-child{border-right-width:1px}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}@media (prefers-reduced-motion: no-preference){.motion-safe\\:transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.motion-safe\\:transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}}
`;
let ct, kn = !1;
try {
  ct = new CSSStyleSheet(), ct.replaceSync(_n);
} catch {
  kn = !0;
}
const ie = () => {
  const t = Le();
  if (kn) {
    const e = document.createElement("style");
    e.innerHTML = _n, t.shadowRoot.append(e);
  } else
    t.shadowRoot.adoptedStyleSheets = [ct];
}, { base: kt = "", query: xt = "", workers: So = {} } = window.PRIME_CONFIG ?? {}, yr = async () => {
  const t = new FontFace("icons", kt ? `url(${kt}/icons.woff2${xt})` : `url(icons.woff2${xt})`);
  await t.load(), document.fonts.add(t);
}, vr = "0.34.0", Te = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${vr}`, Be = [], gt = (t, e) => `http://definitions/${t}-${e}.json`, xn = (t = "") => t.split("/").pop(), _r = (t, e) => {
  for (const n of Object.values(e.properties ?? []))
    n.type === "array" && n.items?.type ? n.description = `"array" of type "${n.items?.type}"` : n.type === "array" ? n.description = '"array" of type "object"' : n.description = `"${n.type}"`;
  return JSON.parse(JSON.stringify(e), (n, r) => {
    if (n === "$ref")
      return gt(t, xn(r));
    if (n !== "$schema")
      return r;
  });
}, kr = (t, e, n) => {
  const { $ref: r, definitions: i = {} } = e;
  for (const [o, s] of Object.entries(i))
    Be.push({
      uri: gt(t, o),
      schema: _r(t, s),
      ...xn(r) === o ? { fileMatch: n } : void 0
    });
  window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: !0,
    schemas: Be
  });
}, xr = (t, e) => Be.findIndex(({ uri: n }) => n === gt(t, e)), Mr = (t, e) => {
  let n = !1;
  const { definitions: r = {} } = e;
  for (const i of Object.keys(r)) {
    const o = xr(t, i);
    Be.splice(o, 1), n = !0;
  }
  !n || window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: !0,
    schemas: Be
  });
}, Mt = {
  addSchemas: kr,
  removeSchemas: Mr
}, fe = (t, e, n) => t.dispatchEvent(new CustomEvent(e, {
  composed: !0,
  bubbles: !0,
  detail: n
})), Er = /\s+|\r?\n|\r/g, Et = (t) => t.replace(Er, "");
customElements.get("v-badge") ? console.warn("WARNING: Multiple instances of PRIME being imported.") : (yr().catch((t) => console.error(t)), Promise.resolve().then(() => Cr), Promise.resolve().then(() => Rr), Promise.resolve().then(() => Lr), Promise.resolve().then(() => Hr), Promise.resolve().then(() => Br), Promise.resolve().then(() => qr), Promise.resolve().then(() => Kr), Promise.resolve().then(() => $r), Promise.resolve().then(() => ii), Promise.resolve().then(() => fi), Promise.resolve().then(() => bi), Promise.resolve().then(() => pi), Promise.resolve().then(() => ki), Promise.resolve().then(() => Ei), Promise.resolve().then(() => Ci), Promise.resolve().then(() => Ri), Promise.resolve().then(() => ji), Promise.resolve().then(() => Ii), Promise.resolve().then(() => Di), Promise.resolve().then(() => Yi), Promise.resolve().then(() => ko), Promise.resolve().then(() => Eo));
var Mn = { exports: {} };
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
        var o = arguments[i];
        if (!!o) {
          var s = typeof o;
          if (s === "string" || s === "number")
            r.push(o);
          else if (Array.isArray(o)) {
            if (o.length) {
              var a = n.apply(null, o);
              a && r.push(a);
            }
          } else if (s === "object")
            if (o.toString === Object.prototype.toString)
              for (var l in o)
                e.call(o, l) && o[l] && r.push(l);
            else
              r.push(o.toString());
        }
      }
      return r.join(" ");
    }
    t.exports ? (n.default = n, t.exports = n) : window.classNames = n;
  })();
})(Mn);
const F = Mn.exports;
function Sr(t) {
  let e, n, r;
  return {
    c() {
      e = A("small"), n = q(t[0]), this.c = S, d(e, "class", r = F("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": t[1] === "green",
        "text-orange-900 bg-orange-200": t[1] === "orange",
        "text-red-900 bg-red-200": t[1] === "red",
        "text-gray-800 bg-gray-200": t[1] === "gray"
      }));
    },
    m(i, o) {
      O(i, e, o), x(e, n);
    },
    p(i, [o]) {
      o & 1 && K(n, i[0]), o & 2 && r !== (r = F("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": i[1] === "green",
        "text-orange-900 bg-orange-200": i[1] === "orange",
        "text-red-900 bg-red-200": i[1] === "red",
        "text-gray-800 bg-gray-200": i[1] === "gray"
      })) && d(e, "class", r);
    },
    i: S,
    o: S,
    d(i) {
      i && L(e);
    }
  };
}
function Ar(t, e, n) {
  let { label: r = "" } = e, { variant: i = "gray" } = e;
  return ie(), t.$$set = (o) => {
    "label" in o && n(0, r = o.label), "variant" in o && n(1, i = o.variant);
  }, [r, i];
}
class En extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Ar, Sr, re, { label: 0, variant: 1 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
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
customElements.define("v-badge", En);
const Cr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: En
}, Symbol.toStringTag, { value: "Module" }));
function St(t, e, n) {
  const r = t.slice();
  return r[2] = e[n], r[4] = n, r;
}
function At(t) {
  let e;
  return {
    c() {
      e = A("div"), e.innerHTML = `<div class="w-px h-[60%] border-l border-black -rotate-[30deg] -mt-px"></div> 
        <div class="w-px h-[60%] border-l border-black rotate-[30deg] -mt-0.5"></div> 
      `;
    },
    m(n, r) {
      O(n, e, r);
    },
    d(n) {
      n && L(e);
    }
  };
}
function Ct(t, e) {
  let n, r = e[2] + "", i, o, s, a = e[4] !== e[0].length - 1 && At();
  return {
    key: t,
    first: null,
    c() {
      n = A("small"), i = q(r), o = W(), a && a.c(), s = ht(), d(n, "class", "py1"), this.first = n;
    },
    m(l, c) {
      O(l, n, c), x(n, i), O(l, o, c), a && a.m(l, c), O(l, s, c);
    },
    p(l, c) {
      e = l, c & 1 && r !== (r = e[2] + "") && K(i, r), e[4] !== e[0].length - 1 ? a || (a = At(), a.c(), a.m(s.parentNode, s)) : a && (a.d(1), a = null);
    },
    d(l) {
      l && L(n), l && L(o), a && a.d(l), l && L(s);
    }
  };
}
function Or(t) {
  let e, n = [], r = /* @__PURE__ */ new Map(), i = t[0];
  const o = (s) => s[2];
  for (let s = 0; s < i.length; s += 1) {
    let a = St(t, i, s), l = o(a);
    r.set(l, n[s] = Ct(l, a));
  }
  return {
    c() {
      e = A("div");
      for (let s = 0; s < n.length; s += 1)
        n[s].c();
      this.c = S, d(e, "class", "inline-flex gap-3 px-4 border border-black rounded-full");
    },
    m(s, a) {
      O(s, e, a);
      for (let l = 0; l < n.length; l += 1)
        n[l].m(e, null);
    },
    p(s, [a]) {
      a & 1 && (i = s[0], n = mt(n, a, o, 1, s, i, r, e, bt, Ct, null, St));
    },
    i: S,
    o: S,
    d(s) {
      s && L(e);
      for (let a = 0; a < n.length; a += 1)
        n[a].d();
    }
  };
}
function Pr(t, e, n) {
  let { crumbs: r = "" } = e;
  ie();
  let i;
  return t.$$set = (o) => {
    "crumbs" in o && n(1, r = o.crumbs);
  }, t.$$.update = () => {
    t.$$.dirty & 2 && n(0, i = r.split(",").map((o) => o.trim()));
  }, [i, r];
}
class Sn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Pr, Or, re, { crumbs: 1 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
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
customElements.define("v-breadcrumbs", Sn);
const Rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sn
}, Symbol.toStringTag, { value: "Module" })), xe = (t, e) => t === "" || t === "true" || t === e;
function Ot(t) {
  let e, n;
  return {
    c() {
      e = A("i"), d(e, "aria-hidden", ""), d(e, "class", n = "icon-" + t[3] + " text-base");
    },
    m(r, i) {
      O(r, e, i);
    },
    p(r, i) {
      i & 8 && n !== (n = "icon-" + r[3] + " text-base") && d(e, "class", n);
    },
    d(r) {
      r && L(e);
    }
  };
}
function Tr(t) {
  let e, n, r, i, o, s, a, l = t[3] && Ot(t);
  return {
    c() {
      e = A("button"), l && l.c(), n = W(), r = A("span"), i = q(t[2]), this.c = S, d(r, "class", "mx-auto"), d(e, "type", t[0]), d(e, "class", o = F("flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": t[4],
        "bg-white border-black": t[1] === "primary",
        "bg-black border-white text-white": t[1] === "inverse-primary",
        "bg-red/90 text-white border-red/90": t[1] === "danger",
        "bg-green/90 border-green/90 text-white": t[1] === "success",
        "bg-white border-red/90 text-red/90": t[1] === "outline-danger"
      }));
    },
    m(c, f) {
      O(c, e, f), l && l.m(e, null), x(e, n), x(e, r), x(r, i), s || (a = X(e, "click", t[5]), s = !0);
    },
    p(c, [f]) {
      c[3] ? l ? l.p(c, f) : (l = Ot(c), l.c(), l.m(e, n)) : l && (l.d(1), l = null), f & 4 && K(i, c[2]), f & 1 && d(e, "type", c[0]), f & 18 && o !== (o = F("flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": c[4],
        "bg-white border-black": c[1] === "primary",
        "bg-black border-white text-white": c[1] === "inverse-primary",
        "bg-red/90 text-white border-red/90": c[1] === "danger",
        "bg-green/90 border-green/90 text-white": c[1] === "success",
        "bg-white border-red/90 text-red/90": c[1] === "outline-danger"
      })) && d(e, "class", o);
    },
    i: S,
    o: S,
    d(c) {
      c && L(e), l && l.d(), s = !1, a();
    }
  };
}
function zr(t, e, n) {
  let { disabled: r } = e, { type: i = "button" } = e, { variant: o = "primary" } = e, { label: s = "" } = e, { icon: a = "" } = e, l;
  ie();
  const f = Le().attachInternals(), g = () => {
    const { form: u } = f;
    u?.requestSubmit ? u.requestSubmit() : u?.submit();
  };
  return t.$$set = (u) => {
    "disabled" in u && n(6, r = u.disabled), "type" in u && n(0, i = u.type), "variant" in u && n(1, o = u.variant), "label" in u && n(2, s = u.label), "icon" in u && n(3, a = u.icon);
  }, t.$$.update = () => {
    t.$$.dirty & 64 && n(4, l = xe(r, "disabled"));
  }, [i, o, s, a, l, g, r];
}
class jr extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, zr, Tr, re, {
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
customElements.define("v-button-internal", jr);
class Vr extends customElements.get("v-button-internal") {
  static formAssociated = !0;
}
customElements.define("v-button", Vr);
const Lr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
let qe = "uninitialized";
const Pt = /* @__PURE__ */ new Set(), Ir = (t) => {
  if (qe === "loaded")
    return t(window.monaco);
  if (Pt.add(t), qe === "loading")
    return;
  qe = "loading";
  const e = URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = {
      baseUrl: '${Te}/min/'
    };
    importScripts('${Te}/min/vs/base/worker/workerMain.js');
    importScripts('${Te}/min/vs/language/json/jsonWorker.min.js');
  `], { type: "text/javascript" })), n = () => {
    window.require.config({ paths: { vs: `${Te}/min/vs` } }), window.MonacoEnvironment = { getWorkerUrl: () => e }, window.require(["vs/editor/editor.main"], () => {
      for (const i of Pt)
        i(window.monaco);
      qe = "loaded";
    });
  }, r = document.createElement("script");
  r.addEventListener("load", n), r.async = !0, r.src = `${Te}/min/vs/loader.js`, document.head.append(r);
}, Nr = (t, e, n) => t <= e ? e : t >= n ? n : t, Je = (t, e, n, r) => {
  const i = (t - e) / (n - e) * 100;
  return Number.isNaN(i) || i <= 0 ? 0 : i >= 100 ? 100 : Number.parseFloat(i.toFixed(r));
}, Rt = (t) => {
  let e = 0, n = 0;
  if (t.length === 0)
    return e;
  for (let r = 0; r < t.length; r += 1)
    n = t.codePointAt(r), e = (e << 5) - e + n, e = Math.trunc(e);
  return e;
};
function Fr(t) {
  let e, n, r;
  return {
    c() {
      e = A("div"), this.c = S, d(e, "class", "w-full h-full relative isolate");
    },
    m(i, o) {
      O(i, e, o), t[12](e), n || (r = X(e, "input", t[1]), n = !0);
    },
    p: S,
    i: S,
    o: S,
    d(i) {
      i && L(e), t[12](null), n = !1, r();
    }
  };
}
function Dr(t, e, n) {
  let { value: r = "" } = e, { previous: i = "" } = e, { language: o } = e, { theme: s = "vs" } = e, { readonly: a = "false" } = e, { minimap: l = "false" } = e, { schema: c = "" } = e, { variant: f = "default" } = e, g, u, m, b, y, p, w;
  ie();
  const z = document.createElement("link");
  z.rel = "stylesheet", z.href = `${Te}/min/vs/editor/editor.main.min.css`, Le().shadowRoot.append(z);
  const C = () => {
    if (!p)
      return;
    p.getModel()?.dispose();
    let B;
    if (m) {
      const ce = String(Rt(c)), ue = `http://${ce}.json/`, ge = window.monaco.Uri.parse(ue);
      Mt.removeSchemas(ce, m), Mt.addSchemas(ce, m, [ge.toString()]), B = window.monaco.editor.createModel(r, o, ge);
    } else
      B = window.monaco.editor.createModel(r, o);
    fe(b, "update-model", { model: B }), p.setModel(B);
  }, j = () => {
    const N = y?.getModel();
    N?.modified.dispose(), N?.original.dispose(), y.setModel({
      original: window.monaco.editor.createModel(i, "json"),
      modified: window.monaco.editor.createModel(r, "json")
    });
  }, P = (N) => {
    N instanceof InputEvent && (N.preventDefault(), N.stopImmediatePropagation());
  }, I = () => ({
    value: r,
    language: o,
    theme: s,
    readOnly: g,
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
    n(10, y = window.monaco.editor.createDiffEditor(b, { ...I(), readOnly: !0 })), y.setModel({
      original: window.monaco.editor.createModel(i, o),
      modified: window.monaco.editor.createModel(r, o)
    });
  }, k = (N) => {
    if (f === "diff")
      return V();
    n(11, p = N.editor.create(b, I())), p.onDidChangeModelContent(() => {
      fe(b, "input", { value: p?.getValue() });
    }), p.onDidBlurEditorWidget(() => {
      fe(b, "blur", { value: p?.getValue() }), H();
    }), p.layout(), C(), H();
  }, H = () => {
    const N = window.monaco.editor.getModelMarkers({}), B = Rt(c), ce = N.filter((ue) => ue.resource.authority === `${B}.json`);
    fe(b, "markers", { markers: ce });
  }, D = () => {
    if (!w && p && (w = new ResizeObserver(() => {
      p?.layout();
    })), w) {
      const N = p?.getDomNode() ?? b;
      w.observe(N);
    }
  };
  yn(() => {
    Ir(k);
  }), fr(() => {
    p?.getModel()?.dispose(), y?.dispose(), p?.dispose(), w.disconnect();
    const B = p?.getDomNode() ?? b;
    fe(B, "destroy");
  });
  function oe(N) {
    le[N ? "unshift" : "push"](() => {
      b = N, n(0, b);
    });
  }
  return t.$$set = (N) => {
    "value" in N && n(2, r = N.value), "previous" in N && n(3, i = N.previous), "language" in N && n(4, o = N.language), "theme" in N && n(5, s = N.theme), "readonly" in N && n(6, a = N.readonly), "minimap" in N && n(7, l = N.minimap), "schema" in N && n(8, c = N.schema), "variant" in N && n(9, f = N.variant);
  }, t.$$.update = () => {
    if (t.$$.dirty & 256 && (m = c ? JSON.parse(c) : void 0), t.$$.dirty & 64 && (g = xe(a, "readonly")), t.$$.dirty & 128 && (u = xe(l, "minimap")), t.$$.dirty & 3076) {
      if (y)
        j(), D();
      else if (p) {
        C();
        const N = p?.getValue() ?? "";
        if (r !== void 0) {
          const B = Et(r);
          Et(N) !== B && (p?.setValue(r), p?.layout());
        }
        D();
      }
    }
  }, [
    b,
    P,
    r,
    i,
    o,
    s,
    a,
    l,
    c,
    f,
    y,
    p,
    oe
  ];
}
class An extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Dr, Fr, re, {
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
customElements.define("v-code-editor", An);
const Hr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: An
}, Symbol.toStringTag, { value: "Module" }));
function Tt(t) {
  let e, n;
  return {
    c() {
      e = A("h2"), n = q(t[1]), d(e, "class", "text-sm");
    },
    m(r, i) {
      O(r, e, i), x(e, n);
    },
    p(r, i) {
      i & 2 && K(n, r[1]);
    },
    d(r) {
      r && L(e);
    }
  };
}
function Wr(t) {
  let e, n, r, i, o, s, a, l, c, f, g, u, m, b, y, p, w, z, R = t[1] && Tt(t);
  return {
    c() {
      e = A("div"), n = A("div"), r = A("div"), R && R.c(), i = W(), o = A("slot"), s = W(), a = A("div"), l = A("slot"), c = W(), f = Ae("svg"), g = Ae("polyline"), m = W(), b = A("div"), y = A("slot"), this.c = S, d(o, "name", "title"), d(r, "class", "flex items-center gap-2"), d(l, "name", "header"), d(g, "points", "6 9 12 15 18 9"), d(f, "class", u = F("transition-transform duration-200", {
        "rotate-0": !t[0],
        "rotate-180": t[0]
      })), d(f, "width", "24"), d(f, "height", "24"), d(f, "viewBox", "0 0 24 24"), d(f, "stroke", "currentColor"), d(f, "stroke-linejoin", "round"), d(f, "stroke-linecap", "round"), d(f, "fill", "none"), d(a, "class", "h-full flex items-center gap-3"), d(n, "class", "w-full py-1.5 px-4 flex items-center justify-between border text-black border-black bg-white cursor-pointer"), d(b, "class", p = F("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !t[0],
        "max-h-fit": t[0]
      })), d(e, "class", "relative w-full overflow-hidden");
    },
    m(C, j) {
      O(C, e, j), x(e, n), x(n, r), R && R.m(r, null), x(r, i), x(r, o), x(n, s), x(n, a), x(a, l), x(a, c), x(a, f), x(f, g), x(e, m), x(e, b), x(b, y), t[4](e), w || (z = X(n, "click", t[3]), w = !0);
    },
    p(C, [j]) {
      C[1] ? R ? R.p(C, j) : (R = Tt(C), R.c(), R.m(r, i)) : R && (R.d(1), R = null), j & 1 && u !== (u = F("transition-transform duration-200", {
        "rotate-0": !C[0],
        "rotate-180": C[0]
      })) && d(f, "class", u), j & 1 && p !== (p = F("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !C[0],
        "max-h-fit": C[0]
      })) && d(b, "class", p);
    },
    i: S,
    o: S,
    d(C) {
      C && L(e), R && R.d(), t[4](null), w = !1, z();
    }
  };
}
function Yr(t, e, n) {
  let { title: r = "" } = e, { open: i = !1 } = e, o;
  ie();
  const s = (l) => {
    l.target.getAttribute("slot") !== "header" && (n(0, i = !i), fe(o, "toggle", { open: i }));
  };
  function a(l) {
    le[l ? "unshift" : "push"](() => {
      o = l, n(2, o);
    });
  }
  return t.$$set = (l) => {
    "title" in l && n(1, r = l.title), "open" in l && n(0, i = l.open);
  }, [i, r, o, s, a];
}
class Cn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Yr, Wr, re, { title: 1, open: 0 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
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
customElements.define("v-collapse", Cn);
const Br = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cn
}, Symbol.toStringTag, { value: "Module" }));
function Xr(t) {
  let e, n, r, i, o, s, a, l;
  return {
    c() {
      e = A("div"), n = A("div"), n.innerHTML = '<slot name="target"></slot>', r = W(), i = A("div"), o = A("slot"), this.c = S, d(n, "class", "inline-block w-full"), d(o, "name", "content"), d(i, "class", s = F("absolute z-10", {
        "left-0": t[1],
        "right-0": t[1],
        "overflow-hidden": t[1],
        invisible: !t[2]
      })), d(e, "class", "relative inline-block w-full");
    },
    m(c, f) {
      O(c, e, f), x(e, n), x(e, r), x(e, i), x(i, o), t[6](e), a || (l = X(n, "click", t[3]), a = !0);
    },
    p(c, [f]) {
      f & 6 && s !== (s = F("absolute z-10", {
        "left-0": c[1],
        "right-0": c[1],
        "overflow-hidden": c[1],
        invisible: !c[2]
      })) && d(i, "class", s);
    },
    i: S,
    o: S,
    d(c) {
      c && L(e), t[6](null), a = !1, l();
    }
  };
}
function Ur(t, e, n) {
  let { open: r } = e, { match: i } = e, o, s, a;
  ie();
  const l = () => {
    fe(o, "toggle", { open: !a });
  };
  function c(f) {
    le[f ? "unshift" : "push"](() => {
      o = f, n(0, o);
    });
  }
  return t.$$set = (f) => {
    "open" in f && n(4, r = f.open), "match" in f && n(5, i = f.match);
  }, t.$$.update = () => {
    t.$$.dirty & 32 && n(1, s = xe(i, "match")), t.$$.dirty & 16 && n(2, a = xe(r, "open"));
  }, [o, s, a, l, r, i, c];
}
class On extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Ur, Xr, re, { open: 4, match: 5 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
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
customElements.define("v-dropdown", On);
const qr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: On
}, Symbol.toStringTag, { value: "Module" }));
function Zr(t) {
  let e, n;
  return {
    c() {
      e = A("i"), this.c = S, d(e, "aria-hidden", ""), d(e, "class", n = "icon-" + t[0] + " text-" + t[1]);
    },
    m(r, i) {
      O(r, e, i);
    },
    p(r, [i]) {
      i & 3 && n !== (n = "icon-" + r[0] + " text-" + r[1]) && d(e, "class", n);
    },
    i: S,
    o: S,
    d(r) {
      r && L(e);
    }
  };
}
function Jr(t, e, n) {
  let { name: r = "" } = e, { size: i = "base" } = e;
  return ie(), t.$$set = (o) => {
    "name" in o && n(0, r = o.name), "size" in o && n(1, i = o.size);
  }, [r, i];
}
class Pn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Jr, Zr, re, { name: 0, size: 1 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
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
customElements.define("v-icon", Pn);
const Kr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pn
}, Symbol.toStringTag, { value: "Module" }));
function Gr(t) {
  let e;
  return {
    c() {
      e = A("v-code-editor"), this.c = S, ye(e, "value", t[2]), ye(e, "theme", t[0]), ye(e, "schema", t[1]), ye(e, "minimap", t[3]), ye(e, "language", "json");
    },
    m(n, r) {
      O(n, e, r), t[5](e);
    },
    p(n, [r]) {
      r & 4 && ye(e, "value", n[2]), r & 1 && ye(e, "theme", n[0]), r & 2 && ye(e, "schema", n[1]), r & 8 && ye(e, "minimap", n[3]);
    },
    i: S,
    o: S,
    d(n) {
      n && L(e), t[5](null);
    }
  };
}
function Qr(t, e, n) {
  let { theme: r = "vs" } = e, { schema: i = "" } = e, { value: o } = e, { minimap: s } = e, a;
  yn(() => {
    console.log(a);
  });
  function l(c) {
    le[c ? "unshift" : "push"](() => {
      a = c, n(4, a);
    });
  }
  return t.$$set = (c) => {
    "theme" in c && n(0, r = c.theme), "schema" in c && n(1, i = c.schema), "value" in c && n(2, o = c.value), "minimap" in c && n(3, s = c.minimap);
  }, [r, i, o, s, a, l];
}
class Rn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Qr, Gr, re, {
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
customElements.define("v-json-editor", Rn);
const $r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rn
}, Symbol.toStringTag, { value: "Module" }));
function zt(t) {
  let e, n, r;
  return {
    c() {
      e = A("p"), n = q(t[3]), d(e, "class", r = F("text-xs", {
        "inline whitespace-nowrap": t[6] === "left"
      }));
    },
    m(i, o) {
      O(i, e, o), x(e, n);
    },
    p(i, o) {
      o & 8 && K(n, i[3]), o & 64 && r !== (r = F("text-xs", {
        "inline whitespace-nowrap": i[6] === "left"
      })) && d(e, "class", r);
    },
    d(i) {
      i && L(e);
    }
  };
}
function jt(t) {
  let e, n, r, i, o, s, a, l;
  return {
    c() {
      e = A("div"), n = A("button"), i = W(), o = A("button"), d(n, "aria-label", r = "Increment up by " + t[10]), d(n, "class", "icon-chevron-down rotate-180 text-[15px]"), d(o, "aria-label", s = "Increment down by " + t[10]), d(o, "class", "icon-chevron-down text-[15px]"), d(e, "class", "absolute right-0.5 bottom-0 cursor-pointer select-none flex flex-col");
    },
    m(c, f) {
      O(c, e, f), x(e, n), x(e, i), x(e, o), a || (l = [
        X(n, "click", t[16]),
        X(o, "click", t[17])
      ], a = !0);
    },
    p(c, f) {
      f & 1024 && r !== (r = "Increment up by " + c[10]) && d(n, "aria-label", r), f & 1024 && s !== (s = "Increment down by " + c[10]) && d(o, "aria-label", s);
    },
    d(c) {
      c && L(e), a = !1, _e(l);
    }
  };
}
function ei(t) {
  let e, n, r, i, o, s, a, l, c, f, g = t[3] && zt(t), u = (t[1] === "number" || t[1] === "integer") && jt(t);
  return {
    c() {
      e = A("label"), g && g.c(), n = W(), r = A("input"), a = W(), u && u.c(), this.c = S, d(r, "type", i = t[1] === "integer" ? "number" : t[1]), d(r, "placeholder", t[2]), d(r, "name", t[5]), r.value = t[0], d(r, "pattern", o = t[1] === "integer" ? "[0-9]*" : void 0), r.readOnly = t[9], d(r, "class", "w-full py-1.5 px-2.5 border text-xs border-black bg-white outline-none appearance-none"), d(r, "step", s = t[11] ? t[4] : null), d(e, "class", l = F("relative flex gap-1 max-w-[14rem]", {
        "flex-col": t[6] === "top",
        "items-center": t[6] === "left"
      }));
    },
    m(m, b) {
      O(m, e, b), g && g.m(e, null), x(e, n), x(e, r), t[15](r), x(e, a), u && u.m(e, null), t[18](e), c || (f = X(r, "input", t[12]), c = !0);
    },
    p(m, [b]) {
      m[3] ? g ? g.p(m, b) : (g = zt(m), g.c(), g.m(e, n)) : g && (g.d(1), g = null), b & 2 && i !== (i = m[1] === "integer" ? "number" : m[1]) && d(r, "type", i), b & 4 && d(r, "placeholder", m[2]), b & 32 && d(r, "name", m[5]), b & 1 && r.value !== m[0] && (r.value = m[0]), b & 2 && o !== (o = m[1] === "integer" ? "[0-9]*" : void 0) && d(r, "pattern", o), b & 512 && (r.readOnly = m[9]), b & 2064 && s !== (s = m[11] ? m[4] : null) && d(r, "step", s), m[1] === "number" || m[1] === "integer" ? u ? u.p(m, b) : (u = jt(m), u.c(), u.m(e, null)) : u && (u.d(1), u = null), b & 64 && l !== (l = F("relative flex gap-1 max-w-[14rem]", {
        "flex-col": m[6] === "top",
        "items-center": m[6] === "left"
      })) && d(e, "class", l);
    },
    i: S,
    o: S,
    d(m) {
      m && L(e), g && g.d(), t[15](null), u && u.d(), t[18](null), c = !1, f();
    }
  };
}
function ti(t, e, n) {
  const i = Le().attachInternals();
  let { type: o = "text" } = e, { placeholder: s = "" } = e, { readonly: a = "false" } = e, { label: l = "" } = e, { value: c = "" } = e, { step: f = "1" } = e, { name: g = "" } = e, { labelposition: u = "top" } = e, m, b, y, p, w, z;
  ie();
  const R = (k) => {
    k.preventDefault(), k.stopImmediatePropagation(), n(0, c = b.value), i.setFormValue(c), fe(m, "input", { value: c });
  }, C = (k) => {
    const H = Number.parseFloat(c || "0"), D = String(c).split(".").pop()?.length ?? 0;
    o === "number" ? n(0, c = n(8, b.value = (H + w * k).toFixed(Math.max(y, D)), b)) : o === "integer" && n(0, c = n(8, b.value = String(Math.round(H + w * k)), b)), i.setFormValue(c), fe(m, "input", { value: c });
  };
  function j(k) {
    le[k ? "unshift" : "push"](() => {
      b = k, n(8, b);
    });
  }
  const P = () => C(1), I = () => C(-1);
  function V(k) {
    le[k ? "unshift" : "push"](() => {
      m = k, n(7, m);
    });
  }
  return t.$$set = (k) => {
    "type" in k && n(1, o = k.type), "placeholder" in k && n(2, s = k.placeholder), "readonly" in k && n(14, a = k.readonly), "label" in k && n(3, l = k.label), "value" in k && n(0, c = k.value), "step" in k && n(4, f = k.step), "name" in k && n(5, g = k.name), "labelposition" in k && n(6, u = k.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 16 && (y = String(f).split(".").pop()?.length ?? 0), t.$$.dirty & 16384 && n(9, p = xe(a, "readonly")), t.$$.dirty & 16 && n(10, w = Number.parseFloat(f)), t.$$.dirty & 2 && n(11, z = o === "time" || o === "number");
  }, [
    c,
    o,
    s,
    l,
    f,
    g,
    u,
    m,
    b,
    p,
    w,
    z,
    R,
    C,
    a,
    j,
    P,
    I,
    V
  ];
}
class ni extends G {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}</style>", ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ti, ei, re, {
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
customElements.define("v-input-internal", ni);
class ri extends customElements.get("v-input-internal") {
  static formAssociated = !0;
}
customElements.define("v-input", ri);
const ii = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function oi(t) {
  let e;
  return {
    c() {
      e = Ae("path"), d(e, "d", "M6.33 3.66667H7.66666V5H6.33333V3.66667ZM6.33 6.33333H7.66666V10.3333H6.33333V6.33333ZM7 0.333334C3.31999 0.333334 0.333328 3.32 0.333328 7C0.333328 10.68 3.31999 13.6667 7 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.32 10.68 0.333334 7 0.333334ZM7 12.3333C4.06 12.3333 1.66666 9.94 1.66666 7C1.66666 4.06 4.06 1.66667 7 1.66667C9.93999 1.66667 12.3333 4.06 12.3333 7C12.3333 9.94 9.93999 12.3333 7 12.3333Z"), d(e, "fill", "#045681");
    },
    m(n, r) {
      O(n, e, r);
    },
    d(n) {
      n && L(e);
    }
  };
}
function si(t) {
  let e;
  return {
    c() {
      e = Ae("path"), d(e, "d", "M4 7.78L1.22 5L0.273331 5.94L4 9.66667L12 1.66667L11.06 0.726665L4 7.78Z"), d(e, "fill", "#397F48");
    },
    m(n, r) {
      O(n, e, r);
    },
    d(n) {
      n && L(e);
    }
  };
}
function ai(t) {
  let e;
  return {
    c() {
      e = Ae("path"), d(e, "d", "M8 2.99333L13.02 11.6667H2.98L8 2.99333ZM8 0.333328L0.666672 13H15.3333L8 0.333328ZM8.66667 9.66666H7.33334V11H8.66667V9.66666ZM8.66667 5.66666H7.33334V8.33333H8.66667V5.66666Z"), d(e, "fill", "#FF9900");
    },
    m(n, r) {
      O(n, e, r);
    },
    d(n) {
      n && L(e);
    }
  };
}
function li(t) {
  let e;
  return {
    c() {
      e = Ae("path"), d(e, "d", "M6.33 9H7.66666V10.3333H6.33333V9ZM6.33 3.66666H7.66666V7.66666H6.33333V3.66666ZM6.99333 0.333328C3.31333 0.333328 0.333328 3.31999 0.333328 7C0.333328 10.68 3.31333 13.6667 6.99333 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.31999 10.68 0.333328 6.99333 0.333328ZM7 12.3333C4.05333 12.3333 1.66666 9.94666 1.66666 7C1.66666 4.05333 4.05333 1.66666 7 1.66666C9.94666 1.66666 12.3333 4.05333 12.3333 7C12.3333 9.94666 9.94666 12.3333 7 12.3333Z"), d(e, "fill", "#BE3026");
    },
    m(n, r) {
      O(n, e, r);
    },
    d(n) {
      n && L(e);
    }
  };
}
function Vt(t) {
  let e, n;
  return {
    c() {
      e = A("p"), n = q(t[1]), d(e, "class", "text-xs");
    },
    m(r, i) {
      O(r, e, i), x(e, n);
    },
    p(r, i) {
      i & 2 && K(n, r[1]);
    },
    d(r) {
      r && L(e);
    }
  };
}
function ci(t) {
  let e, n, r, i, o, s, a, l, c;
  function f(b, y) {
    if (b[2] === "error")
      return li;
    if (b[2] === "warning")
      return ai;
    if (b[2] === "success")
      return si;
    if (b[2] === "info")
      return oi;
  }
  let g = f(t), u = g && g(t), m = t[1] && Vt(t);
  return {
    c() {
      e = A("div"), n = A("div"), r = Ae("svg"), u && u.c(), i = W(), o = A("figure"), s = A("figcaption"), a = q(t[0]), l = W(), m && m.c(), this.c = S, d(r, "width", "14"), d(r, "height", "14"), d(r, "viewBox", "0 0 15 15"), d(r, "fill", "none"), d(r, "xmlns", "http://www.w3.org/2000/svg"), d(n, "class", "mt-1"), d(s, "class", "text-sm"), d(e, "class", c = F("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": t[3] === "gray",
        "bg-white": t[3] === "white",
        "border-red/90": t[2] === "error",
        "border-orange/90": t[2] === "warning",
        "border-green/90": t[2] === "success",
        "border-blue/90": t[2] === "info"
      }));
    },
    m(b, y) {
      O(b, e, y), x(e, n), x(n, r), u && u.m(r, null), x(e, i), x(e, o), x(o, s), x(s, a), x(o, l), m && m.m(o, null);
    },
    p(b, [y]) {
      g !== (g = f(b)) && (u && u.d(1), u = g && g(b), u && (u.c(), u.m(r, null))), y & 1 && K(a, b[0]), b[1] ? m ? m.p(b, y) : (m = Vt(b), m.c(), m.m(o, null)) : m && (m.d(1), m = null), y & 12 && c !== (c = F("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": b[3] === "gray",
        "bg-white": b[3] === "white",
        "border-red/90": b[2] === "error",
        "border-orange/90": b[2] === "warning",
        "border-green/90": b[2] === "success",
        "border-blue/90": b[2] === "info"
      })) && d(e, "class", c);
    },
    i: S,
    o: S,
    d(b) {
      b && L(e), u && u.d(), m && m.d();
    }
  };
}
function ui(t, e, n) {
  let { title: r = "" } = e, { message: i = "" } = e, { variant: o = "info" } = e, { background: s = "gray" } = e;
  return ie(), t.$$set = (a) => {
    "title" in a && n(0, r = a.title), "message" in a && n(1, i = a.message), "variant" in a && n(2, o = a.variant), "background" in a && n(3, s = a.background);
  }, [r, i, o, s];
}
class Tn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, ui, ci, re, {
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
customElements.define("v-notify", Tn);
const fi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tn
}, Symbol.toStringTag, { value: "Module" }));
function Lt(t, e, n) {
  const r = t.slice();
  return r[9] = e[n], r;
}
function It(t) {
  let e, n, r;
  return {
    c() {
      e = A("p"), n = q(t[1]), d(e, "class", r = F("text-xs", {
        "pb-1": t[2] === "top",
        inline: t[2] === "left"
      }));
    },
    m(i, o) {
      O(i, e, o), x(e, n);
    },
    p(i, o) {
      o & 2 && K(n, i[1]), o & 4 && r !== (r = F("text-xs", {
        "pb-1": i[2] === "top",
        inline: i[2] === "left"
      })) && d(e, "class", r);
    },
    d(i) {
      i && L(e);
    }
  };
}
function Nt(t) {
  let e, n = t[9] + "", r, i, o, s, a;
  function l() {
    return t[8](t[9]);
  }
  return {
    c() {
      e = A("button"), r = q(n), i = W(), d(e, "class", o = F("border-y border-l last:border-r border-black px-2 py-1 text-sm", {
        "bg-white": t[9] !== t[0],
        "bg-black text-white": t[9] === t[0]
      }));
    },
    m(c, f) {
      O(c, e, f), x(e, r), x(e, i), t[7](e), s || (a = X(e, "click", l), s = !0);
    },
    p(c, f) {
      t = c, f & 16 && n !== (n = t[9] + "") && K(r, n), f & 17 && o !== (o = F("border-y border-l last:border-r border-black px-2 py-1 text-sm", {
        "bg-white": t[9] !== t[0],
        "bg-black text-white": t[9] === t[0]
      })) && d(e, "class", o);
    },
    d(c) {
      c && L(e), t[7](null), s = !1, a();
    }
  };
}
function di(t) {
  let e, n, r = t[1] && It(t), i = t[4], o = [];
  for (let s = 0; s < i.length; s += 1)
    o[s] = Nt(Lt(t, i, s));
  return {
    c() {
      e = A("label"), r && r.c(), n = W();
      for (let s = 0; s < o.length; s += 1)
        o[s].c();
      this.c = S;
    },
    m(s, a) {
      O(s, e, a), r && r.m(e, null), x(e, n);
      for (let l = 0; l < o.length; l += 1)
        o[l].m(e, null);
    },
    p(s, [a]) {
      if (s[1] ? r ? r.p(s, a) : (r = It(s), r.c(), r.m(e, n)) : r && (r.d(1), r = null), a & 57) {
        i = s[4];
        let l;
        for (l = 0; l < i.length; l += 1) {
          const c = Lt(s, i, l);
          o[l] ? o[l].p(c, a) : (o[l] = Nt(c), o[l].c(), o[l].m(e, null));
        }
        for (; l < o.length; l += 1)
          o[l].d(1);
        o.length = i.length;
      }
    },
    i: S,
    o: S,
    d(s) {
      s && L(e), r && r.d(), $e(o, s);
    }
  };
}
function hi(t, e, n) {
  let { label: r = "" } = e, { options: i = "" } = e, { selected: o = "" } = e, { labelposition: s = "top" } = e;
  ie();
  let a, l;
  const c = (u) => {
    n(0, o = u), fe(a, "input", { value: u });
  };
  function f(u) {
    le[u ? "unshift" : "push"](() => {
      a = u, n(3, a);
    });
  }
  const g = (u) => c(u);
  return t.$$set = (u) => {
    "label" in u && n(1, r = u.label), "options" in u && n(6, i = u.options), "selected" in u && n(0, o = u.selected), "labelposition" in u && n(2, s = u.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 64 && n(4, l = i.split(",").map((u) => u.trim()));
  }, [
    o,
    r,
    s,
    a,
    l,
    c,
    i,
    f,
    g
  ];
}
class zn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, hi, di, re, {
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
customElements.define("v-radio", zn);
const bi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zn
}, Symbol.toStringTag, { value: "Module" }));
function Ft(t, e, n) {
  const r = t.slice();
  return r[14] = e[n], r;
}
function Dt(t) {
  let e, n, r;
  return {
    c() {
      e = A("p"), n = q(t[1]), d(e, "class", r = F("text-xs pb-1", {
        "pb-1": t[2] === "top",
        inline: t[2] === "left"
      }));
    },
    m(i, o) {
      O(i, e, o), x(e, n);
    },
    p(i, o) {
      o & 2 && K(n, i[1]), o & 4 && r !== (r = F("text-xs pb-1", {
        "pb-1": i[2] === "top",
        inline: i[2] === "left"
      })) && d(e, "class", r);
    },
    d(i) {
      i && L(e);
    }
  };
}
function Ht(t, e) {
  let n, r = e[14] + "", i, o, s, a;
  return {
    key: t,
    first: null,
    c() {
      n = A("option"), i = q(r), o = W(), n.selected = s = e[6] === e[14], n.__value = a = `
        ` + e[14] + `
      `, n.value = n.__value, this.first = n;
    },
    m(l, c) {
      O(l, n, c), x(n, i), x(n, o);
    },
    p(l, c) {
      e = l, c & 8 && r !== (r = e[14] + "") && K(i, r), c & 72 && s !== (s = e[6] === e[14]) && (n.selected = s), c & 8 && a !== (a = `
        ` + e[14] + `
      `) && (n.__value = a, n.value = n.__value);
    },
    d(l) {
      l && L(n);
    }
  };
}
function mi(t) {
  let e, n, r, i, o = (t[0] || "Please select") + "", s, a, l = [], c = /* @__PURE__ */ new Map(), f, g, u, m = t[1] && Dt(t), b = t[3];
  const y = (p) => p[14];
  for (let p = 0; p < b.length; p += 1) {
    let w = Ft(t, b, p), z = y(w);
    c.set(z, l[p] = Ht(z, w));
  }
  return {
    c() {
      e = A("label"), m && m.c(), n = W(), r = A("select"), i = A("option"), s = q(o), a = W();
      for (let p = 0; p < l.length; p += 1)
        l[p].c();
      this.c = S, i.__value = "", i.value = i.__value, d(r, "class", f = F(st, "py-1.5 px-2.5 text-xs border border-black appearance-none rounded-none outline-none", {
        "cursor-not-allowed opacity-50 pointer-events-none": t[7]
      })), d(e, "class", F(st, "relative"));
    },
    m(p, w) {
      O(p, e, w), m && m.m(e, null), x(e, n), x(e, r), x(r, i), x(i, s), x(i, a);
      for (let z = 0; z < l.length; z += 1)
        l[z].m(r, null);
      t[12](r), t[13](e), g || (u = X(r, "input", t[8]), g = !0);
    },
    p(p, [w]) {
      p[1] ? m ? m.p(p, w) : (m = Dt(p), m.c(), m.m(e, n)) : m && (m.d(1), m = null), w & 1 && o !== (o = (p[0] || "Please select") + "") && K(s, o), w & 72 && (b = p[3], l = mt(l, w, y, 1, p, b, c, r, bt, Ht, null, Ft)), w & 128 && f !== (f = F(st, "py-1.5 px-2.5 text-xs border border-black appearance-none rounded-none outline-none", {
        "cursor-not-allowed opacity-50 pointer-events-none": p[7]
      })) && d(r, "class", f);
    },
    i: S,
    o: S,
    d(p) {
      p && L(e), m && m.d();
      for (let w = 0; w < l.length; w += 1)
        l[w].d();
      t[12](null), t[13](null), g = !1, u();
    }
  };
}
const st = "max-w-[14rem] w-full";
function gi(t, e, n) {
  let { options: r = "" } = e, { value: i = "" } = e, { placeholder: o = "" } = e, { label: s = "" } = e, { labelposition: a = "top" } = e, { disabled: l } = e, c, f, g, u, m;
  ie();
  const b = (w) => {
    w.preventDefault(), w.stopImmediatePropagation(), n(9, i = f.value.trim()), fe(c, "input", { value: i });
  };
  function y(w) {
    le[w ? "unshift" : "push"](() => {
      f = w, n(5, f), n(3, g), n(10, r);
    });
  }
  function p(w) {
    le[w ? "unshift" : "push"](() => {
      c = w, n(4, c);
    });
  }
  return t.$$set = (w) => {
    "options" in w && n(10, r = w.options), "value" in w && n(9, i = w.value), "placeholder" in w && n(0, o = w.placeholder), "label" in w && n(1, s = w.label), "labelposition" in w && n(2, a = w.labelposition), "disabled" in w && n(11, l = w.disabled);
  }, t.$$.update = () => {
    t.$$.dirty & 2048 && n(7, m = xe(l, "disabled")), t.$$.dirty & 1024 && n(3, g = r.split(",").map((w) => w.trim())), t.$$.dirty & 520 && n(6, u = g.find((w) => w === i) ?? "");
  }, [
    o,
    s,
    a,
    g,
    c,
    f,
    u,
    m,
    b,
    i,
    r,
    l,
    y,
    p
  ];
}
class jn extends G {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>label{--select-chevron-color:black;--select-chevron-size:15px}label::after{content:'';position:absolute;background-color:var(--select-chevron-color);clip-path:polygon(25% 25%, 17.5% 32.5%, 40% 55%, 50% 65%, 60% 55%, 82.5% 32.5%, 75% 25%, 50% 50%);width:var(--select-chevron-size);height:var(--select-chevron-size);right:2px;bottom:2px}</style>", ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, gi, mi, re, {
      options: 10,
      value: 9,
      placeholder: 0,
      label: 1,
      labelposition: 2,
      disabled: 11
    }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
  }
  static get observedAttributes() {
    return ["options", "value", "placeholder", "label", "labelposition", "disabled"];
  }
  get options() {
    return this.$$.ctx[10];
  }
  set options(e) {
    this.$$set({ options: e }), M();
  }
  get value() {
    return this.$$.ctx[9];
  }
  set value(e) {
    this.$$set({ value: e }), M();
  }
  get placeholder() {
    return this.$$.ctx[0];
  }
  set placeholder(e) {
    this.$$set({ placeholder: e }), M();
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), M();
  }
  get labelposition() {
    return this.$$.ctx[2];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), M();
  }
  get disabled() {
    return this.$$.ctx[11];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), M();
  }
}
customElements.define("v-select", jn);
const pi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jn
}, Symbol.toStringTag, { value: "Module" })), Re = [];
function wi(t, e = S) {
  let n;
  const r = /* @__PURE__ */ new Set();
  function i(a) {
    if (mn(t, a) && (t = a, n)) {
      const l = !Re.length;
      for (const c of r)
        c[1](), Re.push(c, t);
      if (l) {
        for (let c = 0; c < Re.length; c += 2)
          Re[c][0](Re[c + 1]);
        Re.length = 0;
      }
    }
  }
  function o(a) {
    i(a(t));
  }
  function s(a, l = S) {
    const c = [a, l];
    return r.add(c), r.size === 1 && (n = e(i) || S), a(t), () => {
      r.delete(c), r.size === 0 && (n(), n = null);
    };
  }
  return { set: i, update: o, subscribe: s };
}
function Wt(t) {
  return Object.prototype.toString.call(t) === "[object Date]";
}
function ut(t, e, n, r) {
  if (typeof n == "number" || Wt(n)) {
    const i = r - n, o = (n - e) / (t.dt || 1 / 60), s = t.opts.stiffness * i, a = t.opts.damping * o, l = (s - a) * t.inv_mass, c = (o + l) * t.dt;
    return Math.abs(c) < t.opts.precision && Math.abs(i) < t.opts.precision ? r : (t.settled = !1, Wt(n) ? new Date(n.getTime() + c) : n + c);
  } else {
    if (Array.isArray(n))
      return n.map((i, o) => ut(t, e[o], n[o], r[o]));
    if (typeof n == "object") {
      const i = {};
      for (const o in n)
        i[o] = ut(t, e[o], n[o], r[o]);
      return i;
    } else
      throw new Error(`Cannot spring ${typeof n} values`);
  }
}
function yi(t, e = {}) {
  const n = wi(t), { stiffness: r = 0.15, damping: i = 0.8, precision: o = 0.01 } = e;
  let s, a, l, c = t, f = t, g = 1, u = 0, m = !1;
  function b(p, w = {}) {
    f = p;
    const z = l = {};
    if (t == null || w.hard || y.stiffness >= 1 && y.damping >= 1)
      return m = !0, s = yt(), c = p, n.set(t = f), Promise.resolve();
    if (w.soft) {
      const R = w.soft === !0 ? 0.5 : +w.soft;
      u = 1 / (R * 60), g = 0;
    }
    return a || (s = yt(), m = !1, a = cr((R) => {
      if (m)
        return m = !1, a = null, !1;
      g = Math.min(g + u, 1);
      const C = {
        inv_mass: g,
        opts: y,
        settled: !0,
        dt: (R - s) * 60 / 1e3
      }, j = ut(C, c, t, f);
      return s = R, c = t, n.set(t = j), C.settled && (a = null), !C.settled;
    })), new Promise((R) => {
      a.promise.then(() => {
        z === l && R();
      });
    });
  }
  const y = {
    set: b,
    update: (p, w) => b(p(f, t), w),
    subscribe: n.subscribe,
    stiffness: r,
    damping: i,
    precision: o
  };
  return y;
}
function Yt(t, e, n) {
  const r = t.slice();
  return r[53] = e[n], r[55] = n, r;
}
function Bt(t, e, n) {
  const r = t.slice();
  return r[6] = e[n], r[57] = n, r;
}
function Xt(t) {
  let e, n;
  return {
    c() {
      e = A("p"), n = q(t[4]), d(e, "class", "text-xs");
    },
    m(r, i) {
      O(r, e, i), x(e, n);
    },
    p(r, i) {
      i[0] & 16 && K(n, r[4]);
    },
    d(r) {
      r && L(e);
    }
  };
}
function Ut(t) {
  let e, n;
  return {
    c() {
      e = A("span"), n = q(t[5]), d(e, "class", "floating-suffix");
    },
    m(r, i) {
      O(r, e, i), x(e, n);
    },
    p(r, i) {
      i[0] & 32 && K(n, r[5]);
    },
    d(r) {
      r && L(e);
    }
  };
}
function qt(t) {
  let e, n, r, i, o, s, a = t[6] + "", l, c, f, g, u, m, b, y, p, w, z, R = t[5] && Ut(t);
  function C() {
    return t[37](t[57]);
  }
  return {
    c() {
      e = A("span"), n = A("span"), r = W(), i = A("span"), o = W(), s = A("span"), l = q(a), c = W(), R && R.c(), d(n, "class", "handle-bg absolute left-0 bottom-1 rounded-full opacity-50 h-full w-full transition-transform bg-gray-400"), d(i, "class", "absolute left-0 bottom-1 block rounded-full h-full w-full border border-black bg-white"), d(s, "class", f = F("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })), d(e, "role", "slider"), d(e, "class", "range absolute block h-5 w-5 top-1 bottom-auto -translate-x-1/2 -translate-y-1/2 z-[2]"), d(e, "data-handle", g = t[57]), he(e, "left", t[17][t[57]] + "%"), he(e, "z-index", t[15] === t[57] ? 3 : 2), d(e, "aria-valuemin", u = t[0] === !0 && t[57] === 1 ? t[9] : t[7]), d(e, "aria-valuemax", m = t[0] === !0 && t[57] === 0 ? t[10] : t[8]), d(e, "aria-valuenow", b = t[6]), d(e, "aria-valuetext", y = t[6]?.toString()), d(e, "aria-orientation", "horizontal"), d(e, "aria-disabled", t[2]), d(e, "disabled", t[2]), d(e, "tabindex", p = t[2] ? -1 : 0), Q(e, "active", t[13] && t[15] === t[57]), Q(e, "press", t[14] && t[15] === t[57]);
    },
    m(j, P) {
      O(j, e, P), x(e, n), x(e, r), x(e, i), x(e, o), x(e, s), x(s, l), x(s, c), R && R.m(s, null), w || (z = [
        X(e, "blur", t[20]),
        X(e, "focus", C)
      ], w = !0);
    },
    p(j, P) {
      t = j, P[0] & 1536 && a !== (a = t[6] + "") && K(l, a), t[5] ? R ? R.p(t, P) : (R = Ut(t), R.c(), R.m(s, null)) : R && (R.d(1), R = null), P[0] & 40960 && f !== (f = F("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })) && d(s, "class", f), P[0] & 131072 && he(e, "left", t[17][t[57]] + "%"), P[0] & 32768 && he(e, "z-index", t[15] === t[57] ? 3 : 2), P[0] & 641 && u !== (u = t[0] === !0 && t[57] === 1 ? t[9] : t[7]) && d(e, "aria-valuemin", u), P[0] & 1281 && m !== (m = t[0] === !0 && t[57] === 0 ? t[10] : t[8]) && d(e, "aria-valuemax", m), P[0] & 1536 && b !== (b = t[6]) && d(e, "aria-valuenow", b), P[0] & 1536 && y !== (y = t[6]?.toString()) && d(e, "aria-valuetext", y), P[0] & 4 && d(e, "aria-disabled", t[2]), P[0] & 4 && d(e, "disabled", t[2]), P[0] & 4 && p !== (p = t[2] ? -1 : 0) && d(e, "tabindex", p), P[0] & 40960 && Q(e, "active", t[13] && t[15] === t[57]), P[0] & 49152 && Q(e, "press", t[14] && t[15] === t[57]);
    },
    d(j) {
      j && L(e), R && R.d(), w = !1, _e(z);
    }
  };
}
function Zt(t) {
  let e;
  return {
    c() {
      e = A("span"), d(e, "class", "absolute block transition duration-200 h-1 -top-0.5 select-none z-[1] bg-black"), he(e, "left", t[18](t[17]) + "%"), he(e, "right", t[19](t[17]) + "%");
    },
    m(n, r) {
      O(n, e, r);
    },
    p(n, r) {
      r[0] & 131072 && he(e, "left", n[18](n[17]) + "%"), r[0] & 131072 && he(e, "right", n[19](n[17]) + "%");
    },
    d(n) {
      n && L(e);
    }
  };
}
function Jt(t) {
  let e, n;
  return {
    c() {
      e = A("span"), n = q(t[5]), d(e, "class", "pipVal-suffix");
    },
    m(r, i) {
      O(r, e, i), x(e, n);
    },
    p(r, i) {
      i[0] & 32 && K(n, r[5]);
    },
    d(r) {
      r && L(e);
    }
  };
}
function Kt(t) {
  let e, n = Array.from({ length: t[12] + 1 }), r = [];
  for (let i = 0; i < n.length; i += 1)
    r[i] = Qt(Yt(t, n, i));
  return {
    c() {
      for (let i = 0; i < r.length; i += 1)
        r[i].c();
      e = ht();
    },
    m(i, o) {
      for (let s = 0; s < r.length; s += 1)
        r[s].m(i, o);
      O(i, e, o);
    },
    p(i, o) {
      if (o[0] & 70016) {
        n = Array.from({ length: i[12] + 1 });
        let s;
        for (s = 0; s < n.length; s += 1) {
          const a = Yt(i, n, s);
          r[s] ? r[s].p(a, o) : (r[s] = Qt(a), r[s].c(), r[s].m(e.parentNode, e));
        }
        for (; s < r.length; s += 1)
          r[s].d(1);
        r.length = n.length;
      }
    },
    d(i) {
      $e(r, i), i && L(e);
    }
  };
}
function Gt(t) {
  let e;
  return {
    c() {
      e = A("span"), d(e, "class", "absolute h-[4px] w-[1px] top-[calc(50%-9px)] whitespace-nowrap transition bg-black/50"), he(e, "left", Je(t[16](t[55]), t[7], t[8], 2) + "%");
    },
    m(n, r) {
      O(n, e, r);
    },
    p(n, r) {
      r[0] & 65920 && he(e, "left", Je(n[16](n[55]), n[7], n[8], 2) + "%");
    },
    d(n) {
      n && L(e);
    }
  };
}
function Qt(t) {
  let e = t[16](t[55]) !== t[7] && t[16](t[55]) !== t[8], n, r = e && Gt(t);
  return {
    c() {
      r && r.c(), n = ht();
    },
    m(i, o) {
      r && r.m(i, o), O(i, n, o);
    },
    p(i, o) {
      o[0] & 65920 && (e = i[16](i[55]) !== i[7] && i[16](i[55]) !== i[8]), e ? r ? r.p(i, o) : (r = Gt(i), r.c(), r.m(n.parentNode, n)) : r && (r.d(1), r = null);
    },
    d(i) {
      r && r.d(i), i && L(n);
    }
  };
}
function $t(t) {
  let e, n;
  return {
    c() {
      e = A("span"), n = q(t[5]), d(e, "class", "pipVal-suffix");
    },
    m(r, i) {
      O(r, e, i), x(e, n);
    },
    p(r, i) {
      i[0] & 32 && K(n, r[5]);
    },
    d(r) {
      r && L(e);
    }
  };
}
function vi(t) {
  let e, n, r, i, o, s, a, l, c, f, g, u, m, b, y, p, w, z = t[4] && Xt(t), R = t[10] ? [t[9], t[10]] : [t[9]], C = [];
  for (let k = 0; k < R.length; k += 1)
    C[k] = qt(Bt(t, R, k));
  let j = t[0] && Zt(t), P = t[5] && Jt(t), I = t[3] && Kt(t), V = t[5] && $t(t);
  return {
    c() {
      e = A("label"), z && z.c(), n = W(), r = A("div");
      for (let k = 0; k < C.length; k += 1)
        C[k].c();
      i = W(), j && j.c(), o = W(), s = A("div"), a = A("small"), l = q(t[7]), c = W(), P && P.c(), f = W(), I && I.c(), g = W(), u = A("small"), m = q(t[8]), b = W(), V && V.c(), this.c = S, d(a, "class", "absolute bottom-full left-0 -translate-x-1/2 mb-3 whitespace-nowrap"), d(u, "class", "absolute bottom-full right-0 translate-x-1/2 mb-3 whitespace-nowrap"), d(s, "class", "absolute h-2 left-0 right-0"), Q(s, "disabled", t[2]), Q(s, "focus", t[13]), d(r, "class", y = F("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": t[2] })), Q(r, "range", t[0]), Q(r, "focus", t[13]), Q(r, "min", t[0] === "min"), Q(r, "max", t[0] === "max"), d(e, "class", "flex flex-col gap-2");
    },
    m(k, H) {
      O(k, e, H), z && z.m(e, null), x(e, n), x(e, r);
      for (let D = 0; D < C.length; D += 1)
        C[D].m(r, null);
      x(r, i), j && j.m(r, null), x(r, o), x(r, s), x(s, a), x(a, l), x(a, c), P && P.m(a, null), x(s, f), I && I.m(s, null), x(s, g), x(s, u), x(u, m), x(u, b), V && V.m(u, null), t[38](r), p || (w = [
        X(window, "mousedown", t[24]),
        X(window, "touchstart", t[24]),
        X(window, "mousemove", t[25]),
        X(window, "touchmove", t[25]),
        X(window, "mouseup", t[26]),
        X(window, "touchend", t[27]),
        X(window, "keydown", t[28]),
        X(r, "mousedown", t[22]),
        X(r, "mouseup", t[23]),
        X(r, "touchstart", vt(t[22])),
        X(r, "touchend", vt(t[23]))
      ], p = !0);
    },
    p(k, H) {
      if (k[4] ? z ? z.p(k, H) : (z = Xt(k), z.c(), z.m(e, n)) : z && (z.d(1), z = null), H[0] & 3336101) {
        R = k[10] ? [k[9], k[10]] : [k[9]];
        let D;
        for (D = 0; D < R.length; D += 1) {
          const oe = Bt(k, R, D);
          C[D] ? C[D].p(oe, H) : (C[D] = qt(oe), C[D].c(), C[D].m(r, i));
        }
        for (; D < C.length; D += 1)
          C[D].d(1);
        C.length = R.length;
      }
      k[0] ? j ? j.p(k, H) : (j = Zt(k), j.c(), j.m(r, o)) : j && (j.d(1), j = null), H[0] & 128 && K(l, k[7]), k[5] ? P ? P.p(k, H) : (P = Jt(k), P.c(), P.m(a, null)) : P && (P.d(1), P = null), k[3] ? I ? I.p(k, H) : (I = Kt(k), I.c(), I.m(s, g)) : I && (I.d(1), I = null), H[0] & 256 && K(m, k[8]), k[5] ? V ? V.p(k, H) : (V = $t(k), V.c(), V.m(u, null)) : V && (V.d(1), V = null), H[0] & 4 && Q(s, "disabled", k[2]), H[0] & 8192 && Q(s, "focus", k[13]), H[0] & 4 && y !== (y = F("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": k[2] })) && d(r, "class", y), H[0] & 5 && Q(r, "range", k[0]), H[0] & 8196 && Q(r, "focus", k[13]), H[0] & 5 && Q(r, "min", k[0] === "min"), H[0] & 5 && Q(r, "max", k[0] === "max");
    },
    i: S,
    o: S,
    d(k) {
      k && L(e), z && z.d(), $e(C, k), j && j.d(), P && P.d(), I && I.d(), V && V.d(), t[38](null), p = !1, _e(w);
    }
  };
}
function _i(t, e, n) {
  let r, i, o = S, s = () => (o(), o = lr(Se, (E) => n(17, i = E)), Se);
  t.$$.on_destroy.push(() => o());
  let { slider: a } = e, { range: l = !1 } = e, { min: c } = e, { max: f } = e, { step: g } = e, { value: u } = e, { start: m } = e, { end: b } = e, { disabled: y = !1 } = e, { discrete: p = !0 } = e, { label: w = "" } = e, { suffix: z = "" } = e;
  ie();
  const R = { stiffness: 0.1, damping: 0.4 };
  let C, j, P, I, V, k, H, D = 0, oe = !1, N = !1, B = !1, ce = !1, ue = -1, ge, Ee, Se;
  const pe = (E, U, ne) => {
    if (E <= U)
      return U;
    if (E >= ne)
      return ne;
    const J = (E - U) % P;
    let we = E - J;
    return Math.abs(J) * 2 >= P && (we += J > 0 ? P : -P), we = Nr(we, U, ne), Number.parseFloat(we.toFixed(2));
  }, Ie = (E) => E.type.includes("touch") ? E.touches[0] : E, rt = (E) => {
    const U = [...a.querySelectorAll(".handle")], ne = U.includes(E), J = U.some((we) => we.contains(E));
    return ne || J;
  }, Ne = (E) => l === "min" || l === "max" ? E.slice(0, 1) : l ? E.slice(0, 2) : E, Fe = () => {
    Ee = a.getBoundingClientRect();
  }, Oe = (E) => {
    const ne = (E.clientX - Ee.left) / Ee.width * 100, J = (j - C) / 100 * ne + C;
    let we = 0;
    return l && I === V ? J > V ? 1 : 0 : (l && (we = [I, V].indexOf([I, V].sort((or, sr) => Math.abs(J - or) - Math.abs(J - sr))[0])), we);
  }, Pe = (E) => {
    const ne = (E.clientX - Ee.left) / Ee.width * 100, J = (j - C) / 100 * ne + C;
    it(ue, J);
  }, it = (E, U) => {
    let ne = E;
    const J = pe(U, C, j);
    return typeof ne > "u" && (ne = ue), l && (ne === 0 && J > V ? n(10, V = J) : ne === 1 && J < I && n(9, I = J)), ne === 0 && I !== J && n(9, I = J), ne === 1 && V !== J && n(10, V = J), ge !== J && (ae(), ge = J), ne === 0 ? n(29, m = I.toString()) : ne === 1 && n(30, b = V.toString()), J;
  }, tr = (E) => l === "min" ? 0 : E[0], nr = (E) => l === "max" ? 0 : l === "min" ? 100 - E[0] : 100 - E[1], rr = () => {
    ce && (n(13, oe = !1), N = !1, n(14, B = !1));
  }, v = (E) => {
    y || (n(15, ue = E), n(13, oe = !0));
  }, h = (E) => {
    if (y)
      return;
    Fe();
    const U = E.target, ne = Ie(E);
    n(13, oe = !0), N = !0, n(14, B = !0), n(15, ue = Oe(ne)), ge = pe(ue === 0 ? I : V, C, j), E.type === "touchstart" && !U.matches(".pipVal") && Pe(ne);
  }, _ = () => {
    n(14, B = !1);
  }, T = (E) => {
    ce = !1, oe && E.target !== a && !a.contains(E.target) && n(13, oe = !1);
  }, Y = (E) => {
    y || !N || (n(13, oe = !0), Pe(Ie(E)));
  }, se = (E) => {
    if (!y) {
      const U = E.target;
      (N && U && U === a || a.contains(U)) && (n(13, oe = !0), !rt(U) && !U.matches(".pipVal") && Pe(Ie(E)));
    }
    N = !1, n(14, B = !1);
  }, Z = () => {
    N = !1, n(14, B = !1);
  }, te = (E) => {
    y || (E.target === a || a.contains(E.target)) && (ce = !0);
  }, ae = () => {
    y || fe(a, "input", {
      activeHandle: ue,
      previousValue: ge,
      value: ue === 0 ? I : V,
      values: V ? [I, V].map((E) => pe(E, C, j)) : void 0
    });
  }, de = (E) => v(E);
  function ir(E) {
    le[E ? "unshift" : "push"](() => {
      a = E, n(1, a);
    });
  }
  return t.$$set = (E) => {
    "slider" in E && n(1, a = E.slider), "range" in E && n(0, l = E.range), "min" in E && n(31, c = E.min), "max" in E && n(32, f = E.max), "step" in E && n(33, g = E.step), "value" in E && n(6, u = E.value), "start" in E && n(29, m = E.start), "end" in E && n(30, b = E.end), "disabled" in E && n(2, y = E.disabled), "discrete" in E && n(3, p = E.discrete), "label" in E && n(4, w = E.label), "suffix" in E && n(5, z = E.suffix);
  }, t.$$.update = () => {
    if (t.$$.dirty[1] & 2 && n(8, j = Number.parseFloat(f || "100")), t.$$.dirty[1] & 1 && n(7, C = Number.parseFloat(c || "0")), t.$$.dirty[1] & 4 && n(34, P = Number.parseFloat(g || "1")), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(35, k = (j - C) / P >= 100 ? (j - C) / 20 : 1), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(12, H = (j - C) / P), t.$$.dirty[0] & 128 | t.$$.dirty[1] & 24 && n(16, r = (E) => C + E * P * k), t.$$.dirty[0] & 536870976 | t.$$.dirty[1] & 3 && n(9, I = m || u ? Number.parseFloat(m || u) : (Number.parseFloat(c || "0") + Number.parseFloat(f || "100")) / 2), t.$$.dirty[0] & 1073741824 && n(10, V = b ? Number.parseFloat(b) : void 0), t.$$.dirty[0] & 1073741825 && n(0, l = typeof l == "string" ? l : b !== void 0), t.$$.dirty[0] & 3968 | t.$$.dirty[1] & 32) {
      n(9, I = pe(I, C, j));
      let E = [I];
      V && (n(10, V = pe(V, C, j)), E.push(V)), E = Ne(E), D !== E.length ? s(n(11, Se = yi(E.map((U) => Je(U, C, j, 2)), R))) : Se.set(E.map((U) => Je(U, C, j, 2))).catch((U) => console.error(U)), n(36, D = E.length);
    }
  }, [
    l,
    a,
    y,
    p,
    w,
    z,
    u,
    C,
    j,
    I,
    V,
    Se,
    H,
    oe,
    B,
    ue,
    r,
    i,
    tr,
    nr,
    rr,
    v,
    h,
    _,
    T,
    Y,
    se,
    Z,
    te,
    m,
    b,
    c,
    f,
    g,
    P,
    k,
    D,
    de,
    ir
  ];
}
class Vn extends G {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>.slider .range:hover .handle-bg{transform:scale(1.5)}.slider .range.active .handle-bg{transform:scale(2.0)}.slider .range.active .floating,.slider .range:hover .floating{opacity:1}</style>", ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, _i, vi, mn, {
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
customElements.define("v-slider", Vn);
const ki = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vn
}, Symbol.toStringTag, { value: "Module" }));
function en(t) {
  let e, n, r;
  return {
    c() {
      e = A("p"), n = q(t[1]), d(e, "class", r = F("text-xs", {
        "whitespace-nowrap": t[4] === "left"
      }));
    },
    m(i, o) {
      O(i, e, o), x(e, n);
    },
    p(i, o) {
      o & 2 && K(n, i[1]), o & 16 && r !== (r = F("text-xs", {
        "whitespace-nowrap": i[4] === "left"
      })) && d(e, "class", r);
    },
    d(i) {
      i && L(e);
    }
  };
}
function tn(t) {
  let e, n;
  return {
    c() {
      e = A("p"), n = q(t[0]), d(e, "class", "capitalize text-xs");
    },
    m(r, i) {
      O(r, e, i), x(e, n);
    },
    p(r, i) {
      i & 1 && K(n, r[0]);
    },
    d(r) {
      r && L(e);
    }
  };
}
function xi(t) {
  let e, n, r, i, o, s, a, l, c, f, g, u, m, b = t[1] && en(t), y = t[3] === "annotated" && tn(t);
  return {
    c() {
      e = A("label"), b && b.c(), n = W(), r = A("button"), i = A("div"), o = A("span"), s = W(), a = A("input"), c = W(), y && y.c(), this.c = S, d(o, "class", "pointer-events-none relative inline-block border border-green/100 h-4 w-4 mt-px ml-px bg-white shadow transform ring-0 motion-safe:transition-transform ease-in-out duration-200"), Q(o, "translate-x-0", !t[7]), Q(o, "translate-x-6", t[7]), d(a, "name", t[2]), a.value = t[0], d(a, "class", "hidden"), d(a, "type", "checkbox"), a.checked = t[7], d(i, "class", l = F("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": t[7] })), d(r, "type", "button"), d(r, "class", "flex gap-1.5 items-center"), d(r, "role", "switch"), d(r, "aria-label", t[1]), d(r, "aria-checked", f = t[7] ? "true" : "false"), d(e, "class", g = F("flex gap-1", {
        "flex-col justify-start": t[4] === "top",
        "items-center": t[4] === "left",
        "opacity-50 pointer-events-none": t[8]
      }));
    },
    m(p, w) {
      O(p, e, w), b && b.m(e, null), x(e, n), x(e, r), x(r, i), x(i, o), x(i, s), x(i, a), t[11](a), x(r, c), y && y.m(r, null), t[12](e), u || (m = X(r, "click", t[9]), u = !0);
    },
    p(p, [w]) {
      p[1] ? b ? b.p(p, w) : (b = en(p), b.c(), b.m(e, n)) : b && (b.d(1), b = null), w & 128 && Q(o, "translate-x-0", !p[7]), w & 128 && Q(o, "translate-x-6", p[7]), w & 4 && d(a, "name", p[2]), w & 1 && (a.value = p[0]), w & 128 && (a.checked = p[7]), w & 128 && l !== (l = F("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": p[7] })) && d(i, "class", l), p[3] === "annotated" ? y ? y.p(p, w) : (y = tn(p), y.c(), y.m(r, null)) : y && (y.d(1), y = null), w & 2 && d(r, "aria-label", p[1]), w & 128 && f !== (f = p[7] ? "true" : "false") && d(r, "aria-checked", f), w & 272 && g !== (g = F("flex gap-1", {
        "flex-col justify-start": p[4] === "top",
        "items-center": p[4] === "left",
        "opacity-50 pointer-events-none": p[8]
      })) && d(e, "class", g);
    },
    i: S,
    o: S,
    d(p) {
      p && L(e), b && b.d(), t[11](null), y && y.d(), t[12](null), u = !1, m();
    }
  };
}
function Mi(t, e, n) {
  let { label: r = "" } = e, { name: i = "" } = e, { value: o = "off" } = e, { variant: s = "default" } = e, { disabled: a } = e, { labelposition: l = "top" } = e;
  ie();
  let c, f, g, u;
  const m = () => {
    n(0, o = g ? "off" : "on"), n(6, f.checked = g, f), fe(c, "input", { value: f.checked });
  };
  function b(p) {
    le[p ? "unshift" : "push"](() => {
      f = p, n(6, f);
    });
  }
  function y(p) {
    le[p ? "unshift" : "push"](() => {
      c = p, n(5, c);
    });
  }
  return t.$$set = (p) => {
    "label" in p && n(1, r = p.label), "name" in p && n(2, i = p.name), "value" in p && n(0, o = p.value), "variant" in p && n(3, s = p.variant), "disabled" in p && n(10, a = p.disabled), "labelposition" in p && n(4, l = p.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 1 && n(7, g = o === "on"), t.$$.dirty & 1024 && n(8, u = xe(a, "disabled"));
  }, [
    o,
    r,
    i,
    s,
    l,
    c,
    f,
    g,
    u,
    m,
    a,
    b,
    y
  ];
}
class Ln extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Mi, xi, re, {
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
customElements.define("v-switch", Ln);
const Ei = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ln
}, Symbol.toStringTag, { value: "Module" }));
function nn(t, e, n) {
  const r = t.slice();
  return r[3] = e[n], r;
}
function rn(t) {
  let e;
  return {
    c() {
      e = A("col"), he(e, "width", t[3]);
    },
    m(n, r) {
      O(n, e, r);
    },
    p: S,
    d(n) {
      n && L(e);
    }
  };
}
function Si(t) {
  let e, n, r, i, o, s = t[1], a = [];
  for (let l = 0; l < s.length; l += 1)
    a[l] = rn(nn(t, s, l));
  return {
    c() {
      e = A("table"), n = A("colgroup");
      for (let l = 0; l < a.length; l += 1)
        a[l].c();
      r = W(), i = A("slot"), this.c = S, d(e, "class", o = F("bg-white text-xs w-full", {
        "table-fixed": t[0] === "fixed"
      }));
    },
    m(l, c) {
      O(l, e, c), x(e, n);
      for (let f = 0; f < a.length; f += 1)
        a[f].m(n, null);
      x(e, r), x(e, i);
    },
    p(l, [c]) {
      if (c & 2) {
        s = l[1];
        let f;
        for (f = 0; f < s.length; f += 1) {
          const g = nn(l, s, f);
          a[f] ? a[f].p(g, c) : (a[f] = rn(g), a[f].c(), a[f].m(n, null));
        }
        for (; f < a.length; f += 1)
          a[f].d(1);
        a.length = s.length;
      }
      c & 1 && o !== (o = F("bg-white text-xs w-full", {
        "table-fixed": l[0] === "fixed"
      })) && d(e, "class", o);
    },
    i: S,
    o: S,
    d(l) {
      l && L(e), $e(a, l);
    }
  };
}
function Ai(t, e, n) {
  ie();
  let { variant: r = "" } = e, { cols: i = "" } = e;
  const o = i.split(",").map((s) => s.trim());
  return t.$$set = (s) => {
    "variant" in s && n(0, r = s.variant), "cols" in s && n(2, i = s.cols);
  }, [r, o, i];
}
class In extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Ai, Si, re, { variant: 0, cols: 2 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
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
customElements.define("v-table", In);
const Ci = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: In
}, Symbol.toStringTag, { value: "Module" }));
function on(t, e, n) {
  const r = t.slice();
  return r[8] = e[n], r[10] = n, r;
}
function sn(t, e) {
  let n, r, i = e[8] + "", o, s, a, l, c, f;
  function g() {
    return e[6](e[8]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = A("button"), r = A("div"), o = q(i), a = W(), d(r, "class", s = F({
        "-mb-px": e[8] !== e[0]
      })), d(n, "class", l = F("px-4 py-1 uppercase text-sm first:ml-4 ", {
        "bg-white border border-x-black border-t-black border-b-white font-bold -mb-px": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })), this.first = n;
    },
    m(u, m) {
      O(u, n, m), x(n, r), x(r, o), x(n, a), c || (f = X(n, "click", g), c = !0);
    },
    p(u, m) {
      e = u, m & 2 && i !== (i = e[8] + "") && K(o, i), m & 3 && s !== (s = F({
        "-mb-px": e[8] !== e[0]
      })) && d(r, "class", s), m & 11 && l !== (l = F("px-4 py-1 uppercase text-sm first:ml-4 ", {
        "bg-white border border-x-black border-t-black border-b-white font-bold -mb-px": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })) && d(n, "class", l);
    },
    d(u) {
      u && L(n), c = !1, f();
    }
  };
}
function Oi(t) {
  let e, n = [], r = /* @__PURE__ */ new Map(), i = t[1];
  const o = (s) => s[8];
  for (let s = 0; s < i.length; s += 1) {
    let a = on(t, i, s), l = o(a);
    r.set(l, n[s] = sn(l, a));
  }
  return {
    c() {
      e = A("div");
      for (let s = 0; s < n.length; s += 1)
        n[s].c();
      this.c = S, d(e, "class", "w-full flex bg-black/20 border-b border-b-black");
    },
    m(s, a) {
      O(s, e, a);
      for (let l = 0; l < n.length; l += 1)
        n[l].m(e, null);
      t[7](e);
    },
    p(s, [a]) {
      a & 27 && (i = s[1], n = mt(n, a, o, 1, s, i, r, e, bt, sn, null, on));
    },
    i: S,
    o: S,
    d(s) {
      s && L(e);
      for (let a = 0; a < n.length; a += 1)
        n[a].d();
      t[7](null);
    }
  };
}
function Pi(t, e, n) {
  let r, i, { tabs: o = "" } = e, { selected: s = "" } = e, a;
  ie();
  const l = (g) => {
    n(0, s = g), fe(a, "input", { value: s });
  }, c = (g) => l(g);
  function f(g) {
    le[g ? "unshift" : "push"](() => {
      a = g, n(2, a);
    });
  }
  return t.$$set = (g) => {
    "tabs" in g && n(5, o = g.tabs), "selected" in g && n(0, s = g.selected);
  }, t.$$.update = () => {
    t.$$.dirty & 32 && n(1, r = o.split(",").map((g) => g.trim())), t.$$.dirty & 3 && n(3, i = r.indexOf(s));
  }, [
    s,
    r,
    a,
    i,
    l,
    o,
    c,
    f
  ];
}
class Nn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Pi, Oi, re, { tabs: 5, selected: 0 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
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
customElements.define("v-tabs", Nn);
const Ri = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nn
}, Symbol.toStringTag, { value: "Module" }));
function Ti(t) {
  let e;
  return {
    c() {
      e = A("tbody"), e.innerHTML = "<slot></slot>", this.c = S;
    },
    m(n, r) {
      O(n, e, r);
    },
    p: S,
    i: S,
    o: S,
    d(n) {
      n && L(e);
    }
  };
}
function zi(t) {
  return ie(), [];
}
class Fn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, zi, Ti, re, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-tbody", Fn);
const ji = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fn
}, Symbol.toStringTag, { value: "Module" }));
function Vi(t) {
  let e;
  return {
    c() {
      e = A("th"), e.innerHTML = "<slot></slot>", this.c = S, d(e, "class", "p-2 text-neutral-600 font-normal overflow-hidden");
    },
    m(n, r) {
      O(n, e, r);
    },
    p: S,
    i: S,
    o: S,
    d(n) {
      n && L(e);
    }
  };
}
function Li(t) {
  return ie(), [];
}
class Dn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Li, Vi, re, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-th", Dn);
const Ii = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dn
}, Symbol.toStringTag, { value: "Module" }));
function Ni(t) {
  let e;
  return {
    c() {
      e = A("td"), e.innerHTML = "<slot></slot>", this.c = S, d(e, "class", "p-2 overflow-hidden");
    },
    m(n, r) {
      O(n, e, r);
    },
    p: S,
    i: S,
    o: S,
    d(n) {
      n && L(e);
    }
  };
}
function Fi(t) {
  return ie(), [];
}
class Hn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Fi, Ni, re, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-td", Hn);
const Di = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hn
}, Symbol.toStringTag, { value: "Module" }));
function Hi(t) {
  let e;
  return {
    c() {
      e = A("thead"), e.innerHTML = "<slot></slot>", this.c = S, d(e, "class", "border-b border-black");
    },
    m(n, r) {
      O(n, e, r);
    },
    p: S,
    i: S,
    o: S,
    d(n) {
      n && L(e);
    }
  };
}
function Wi(t) {
  return ie(), [];
}
class Wn extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Wi, Hi, re, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-thead", Wn);
const Yi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wn
}, Symbol.toStringTag, { value: "Module" }));
function Xe(t) {
  return t.split("-")[0];
}
function pt(t) {
  return t.split("-")[1];
}
function et(t) {
  return ["top", "bottom"].includes(Xe(t)) ? "x" : "y";
}
function Yn(t) {
  return t === "y" ? "height" : "width";
}
function an(t, e, n) {
  let {
    reference: r,
    floating: i
  } = t;
  const o = r.x + r.width / 2 - i.width / 2, s = r.y + r.height / 2 - i.height / 2, a = et(e), l = Yn(a), c = r[l] / 2 - i[l] / 2, f = Xe(e), g = a === "x";
  let u;
  switch (f) {
    case "top":
      u = {
        x: o,
        y: r.y - i.height
      };
      break;
    case "bottom":
      u = {
        x: o,
        y: r.y + r.height
      };
      break;
    case "right":
      u = {
        x: r.x + r.width,
        y: s
      };
      break;
    case "left":
      u = {
        x: r.x - i.width,
        y: s
      };
      break;
    default:
      u = {
        x: r.x,
        y: r.y
      };
  }
  switch (pt(e)) {
    case "start":
      u[a] -= c * (n && g ? -1 : 1);
      break;
    case "end":
      u[a] += c * (n && g ? -1 : 1);
      break;
  }
  return u;
}
const Bi = async (t, e, n) => {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: o = [],
    platform: s
  } = n, a = await (s.isRTL == null ? void 0 : s.isRTL(e));
  let l = await s.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: c,
    y: f
  } = an(l, r, a), g = r, u = {}, m = 0;
  for (let b = 0; b < o.length; b++) {
    const {
      name: y,
      fn: p
    } = o[b], {
      x: w,
      y: z,
      data: R,
      reset: C
    } = await p({
      x: c,
      y: f,
      initialPlacement: r,
      placement: g,
      strategy: i,
      middlewareData: u,
      rects: l,
      platform: s,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (c = w ?? c, f = z ?? f, u = {
      ...u,
      [y]: {
        ...u[y],
        ...R
      }
    }, C && m <= 50) {
      m++, typeof C == "object" && (C.placement && (g = C.placement), C.rects && (l = C.rects === !0 ? await s.getElementRects({
        reference: t,
        floating: e,
        strategy: i
      }) : C.rects), {
        x: c,
        y: f
      } = an(l, g, a)), b = -1;
      continue;
    }
  }
  return {
    x: c,
    y: f,
    placement: g,
    strategy: i,
    middlewareData: u
  };
};
function Xi(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Ui(t) {
  return typeof t != "number" ? Xi(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Ke(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
async function Bn(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: r,
    y: i,
    platform: o,
    rects: s,
    elements: a,
    strategy: l
  } = t, {
    boundary: c = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: g = "floating",
    altBoundary: u = !1,
    padding: m = 0
  } = e, b = Ui(m), p = a[u ? g === "floating" ? "reference" : "floating" : g], w = Ke(await o.getClippingRect({
    element: (n = await (o.isElement == null ? void 0 : o.isElement(p))) == null || n ? p : p.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: f,
    strategy: l
  })), z = Ke(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: g === "floating" ? {
      ...s.floating,
      x: r,
      y: i
    } : s.reference,
    offsetParent: await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(a.floating)),
    strategy: l
  }) : s[g]);
  return {
    top: w.top - z.top + b.top,
    bottom: z.bottom - w.bottom + b.bottom,
    left: w.left - z.left + b.left,
    right: z.right - w.right + b.right
  };
}
const qi = Math.min, Zi = Math.max;
function ln(t, e, n) {
  return Zi(t, qi(e, n));
}
const Ji = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ge(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Ji[e]);
}
function Ki(t, e, n) {
  n === void 0 && (n = !1);
  const r = pt(t), i = et(t), o = Yn(i);
  let s = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[o] > e.floating[o] && (s = Ge(s)), {
    main: s,
    cross: Ge(s)
  };
}
const Gi = {
  start: "end",
  end: "start"
};
function cn(t) {
  return t.replace(/start|end/g, (e) => Gi[e]);
}
function Qi(t) {
  const e = Ge(t);
  return [cn(t), e, cn(e)];
}
const $i = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n;
      const {
        placement: r,
        middlewareData: i,
        rects: o,
        initialPlacement: s,
        platform: a,
        elements: l
      } = e, {
        mainAxis: c = !0,
        crossAxis: f = !0,
        fallbackPlacements: g,
        fallbackStrategy: u = "bestFit",
        flipAlignment: m = !0,
        ...b
      } = t, y = Xe(r), w = g || (y === s || !m ? [Ge(s)] : Qi(s)), z = [s, ...w], R = await Bn(e, b), C = [];
      let j = ((n = i.flip) == null ? void 0 : n.overflows) || [];
      if (c && C.push(R[y]), f) {
        const {
          main: k,
          cross: H
        } = Ki(r, o, await (a.isRTL == null ? void 0 : a.isRTL(l.floating)));
        C.push(R[k], R[H]);
      }
      if (j = [...j, {
        placement: r,
        overflows: C
      }], !C.every((k) => k <= 0)) {
        var P, I;
        const k = ((P = (I = i.flip) == null ? void 0 : I.index) != null ? P : 0) + 1, H = z[k];
        if (H)
          return {
            data: {
              index: k,
              overflows: j
            },
            reset: {
              placement: H
            }
          };
        let D = "bottom";
        switch (u) {
          case "bestFit": {
            var V;
            const oe = (V = j.map((N) => [N, N.overflows.filter((B) => B > 0).reduce((B, ce) => B + ce, 0)]).sort((N, B) => N[1] - B[1])[0]) == null ? void 0 : V[0].placement;
            oe && (D = oe);
            break;
          }
          case "initialPlacement":
            D = s;
            break;
        }
        if (r !== D)
          return {
            reset: {
              placement: D
            }
          };
      }
      return {};
    }
  };
};
async function eo(t, e) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = t, o = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), s = Xe(n), a = pt(n), l = et(n) === "x", c = ["left", "top"].includes(s) ? -1 : 1, f = o && l ? -1 : 1, g = typeof e == "function" ? e(t) : e;
  let {
    mainAxis: u,
    crossAxis: m,
    alignmentAxis: b
  } = typeof g == "number" ? {
    mainAxis: g,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...g
  };
  return a && typeof b == "number" && (m = a === "end" ? b * -1 : b), l ? {
    x: m * f,
    y: u * c
  } : {
    x: u * c,
    y: m * f
  };
}
const to = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r
      } = e, i = await eo(e, t);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
};
function no(t) {
  return t === "x" ? "y" : "x";
}
const ro = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r,
        placement: i
      } = e, {
        mainAxis: o = !0,
        crossAxis: s = !1,
        limiter: a = {
          fn: (p) => {
            let {
              x: w,
              y: z
            } = p;
            return {
              x: w,
              y: z
            };
          }
        },
        ...l
      } = t, c = {
        x: n,
        y: r
      }, f = await Bn(e, l), g = et(Xe(i)), u = no(g);
      let m = c[g], b = c[u];
      if (o) {
        const p = g === "y" ? "top" : "left", w = g === "y" ? "bottom" : "right", z = m + f[p], R = m - f[w];
        m = ln(z, m, R);
      }
      if (s) {
        const p = u === "y" ? "top" : "left", w = u === "y" ? "bottom" : "right", z = b + f[p], R = b - f[w];
        b = ln(z, b, R);
      }
      const y = a.fn({
        ...e,
        [g]: m,
        [u]: b
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
function Xn(t) {
  return t && t.document && t.location && t.alert && t.setInterval;
}
function ke(t) {
  if (t == null)
    return window;
  if (!Xn(t)) {
    const e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function be(t) {
  return ke(t).getComputedStyle(t);
}
function ve(t) {
  return Xn(t) ? "" : t ? (t.nodeName || "").toLowerCase() : "";
}
function Un() {
  const t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map((e) => e.brand + "/" + e.version).join(" ") : navigator.userAgent;
}
function me(t) {
  return t instanceof ke(t).HTMLElement;
}
function je(t) {
  return t instanceof ke(t).Element;
}
function io(t) {
  return t instanceof ke(t).Node;
}
function Ve(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = ke(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function tt(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r
  } = be(t);
  return /auto|scroll|overlay|hidden/.test(e + r + n);
}
function oo(t) {
  return ["table", "td", "th"].includes(ve(t));
}
function qn(t) {
  const e = /firefox/i.test(Un()), n = be(t);
  return n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].includes(n.willChange) || e && n.willChange === "filter" || e && (n.filter ? n.filter !== "none" : !1);
}
function Zn() {
  return !/^((?!chrome|android).)*safari/i.test(Un());
}
const un = Math.min, We = Math.max, Qe = Math.round;
function Ce(t, e, n) {
  var r, i, o, s;
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const a = t.getBoundingClientRect();
  let l = 1, c = 1;
  e && me(t) && (l = t.offsetWidth > 0 && Qe(a.width) / t.offsetWidth || 1, c = t.offsetHeight > 0 && Qe(a.height) / t.offsetHeight || 1);
  const f = je(t) ? ke(t) : window, g = !Zn() && n, u = (a.left + (g && (r = (i = f.visualViewport) == null ? void 0 : i.offsetLeft) != null ? r : 0)) / l, m = (a.top + (g && (o = (s = f.visualViewport) == null ? void 0 : s.offsetTop) != null ? o : 0)) / c, b = a.width / l, y = a.height / c;
  return {
    width: b,
    height: y,
    top: m,
    right: u + b,
    bottom: m + y,
    left: u,
    x: u,
    y: m
  };
}
function Me(t) {
  return ((io(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function nt(t) {
  return je(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function Jn(t) {
  return Ce(Me(t)).left + nt(t).scrollLeft;
}
function so(t) {
  const e = Ce(t);
  return Qe(e.width) !== t.offsetWidth || Qe(e.height) !== t.offsetHeight;
}
function ao(t, e, n) {
  const r = me(e), i = Me(e), o = Ce(t, r && so(e), n === "fixed");
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = {
    x: 0,
    y: 0
  };
  if (r || !r && n !== "fixed")
    if ((ve(e) !== "body" || tt(i)) && (s = nt(e)), me(e)) {
      const l = Ce(e, !0);
      a.x = l.x + e.clientLeft, a.y = l.y + e.clientTop;
    } else
      i && (a.x = Jn(i));
  return {
    x: o.left + s.scrollLeft - a.x,
    y: o.top + s.scrollTop - a.y,
    width: o.width,
    height: o.height
  };
}
function Kn(t) {
  return ve(t) === "html" ? t : t.assignedSlot || t.parentNode || (Ve(t) ? t.host : null) || Me(t);
}
function fn(t) {
  return !me(t) || be(t).position === "fixed" ? null : lo(t);
}
function lo(t) {
  let {
    offsetParent: e
  } = t, n = t, r = !1;
  for (; n && n !== e; ) {
    const {
      assignedSlot: i
    } = n;
    if (i) {
      let o = i.offsetParent;
      if (be(i).display === "contents") {
        const s = i.hasAttribute("style"), a = i.style.display;
        i.style.display = be(n).display, o = i.offsetParent, i.style.display = a, s || i.removeAttribute("style");
      }
      n = i, e !== o && (e = o, r = !0);
    } else if (Ve(n) && n.host && r)
      break;
    n = Ve(n) && n.host || n.parentNode;
  }
  return e;
}
function co(t) {
  let e = Kn(t);
  for (Ve(e) && (e = e.host); me(e) && !["html", "body"].includes(ve(e)); ) {
    if (qn(e))
      return e;
    {
      const n = e.parentNode;
      e = Ve(n) ? n.host : n;
    }
  }
  return null;
}
function ft(t) {
  const e = ke(t);
  let n = fn(t);
  for (; n && oo(n) && be(n).position === "static"; )
    n = fn(n);
  return n && (ve(n) === "html" || ve(n) === "body" && be(n).position === "static" && !qn(n)) ? e : n || co(t) || e;
}
function dn(t) {
  if (me(t))
    return {
      width: t.offsetWidth,
      height: t.offsetHeight
    };
  const e = Ce(t);
  return {
    width: e.width,
    height: e.height
  };
}
function uo(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: r
  } = t;
  const i = me(n), o = Me(n);
  if (n === o)
    return e;
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = {
    x: 0,
    y: 0
  };
  if ((i || !i && r !== "fixed") && ((ve(n) !== "body" || tt(o)) && (s = nt(n)), me(n))) {
    const l = Ce(n, !0);
    a.x = l.x + n.clientLeft, a.y = l.y + n.clientTop;
  }
  return {
    ...e,
    x: e.x - s.scrollLeft + a.x,
    y: e.y - s.scrollTop + a.y
  };
}
function fo(t, e) {
  const n = ke(t), r = Me(t), i = n.visualViewport;
  let o = r.clientWidth, s = r.clientHeight, a = 0, l = 0;
  if (i) {
    o = i.width, s = i.height;
    const c = Zn();
    (c || !c && e === "fixed") && (a = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: o,
    height: s,
    x: a,
    y: l
  };
}
function ho(t) {
  var e;
  const n = Me(t), r = nt(t), i = (e = t.ownerDocument) == null ? void 0 : e.body, o = We(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), s = We(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0);
  let a = -r.scrollLeft + Jn(t);
  const l = -r.scrollTop;
  return be(i || n).direction === "rtl" && (a += We(n.clientWidth, i ? i.clientWidth : 0) - o), {
    width: o,
    height: s,
    x: a,
    y: l
  };
}
function Gn(t) {
  const e = Kn(t);
  return ["html", "body", "#document"].includes(ve(e)) ? t.ownerDocument.body : me(e) && tt(e) ? e : Gn(e);
}
function Qn(t, e) {
  var n;
  e === void 0 && (e = []);
  const r = Gn(t), i = r === ((n = t.ownerDocument) == null ? void 0 : n.body), o = ke(r), s = i ? [o].concat(o.visualViewport || [], tt(r) ? r : []) : r, a = e.concat(s);
  return i ? a : a.concat(Qn(s));
}
function bo(t, e) {
  const n = e.getRootNode == null ? void 0 : e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && Ve(n)) {
    let r = e;
    do {
      if (r && t === r)
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function mo(t, e) {
  const n = Ce(t, !1, e === "fixed"), r = n.top + t.clientTop, i = n.left + t.clientLeft;
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
function hn(t, e, n) {
  return e === "viewport" ? Ke(fo(t, n)) : je(e) ? mo(e, n) : Ke(ho(Me(t)));
}
function go(t) {
  const e = Qn(t), r = ["absolute", "fixed"].includes(be(t).position) && me(t) ? ft(t) : t;
  return je(r) ? e.filter((i) => je(i) && bo(i, r) && ve(i) !== "body") : [];
}
function po(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = t;
  const s = [...n === "clippingAncestors" ? go(e) : [].concat(n), r], a = s[0], l = s.reduce((c, f) => {
    const g = hn(e, f, i);
    return c.top = We(g.top, c.top), c.right = un(g.right, c.right), c.bottom = un(g.bottom, c.bottom), c.left = We(g.left, c.left), c;
  }, hn(e, a, i));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
const wo = {
  getClippingRect: po,
  convertOffsetParentRelativeRectToViewportRelativeRect: uo,
  isElement: je,
  getDimensions: dn,
  getOffsetParent: ft,
  getDocumentElement: Me,
  getElementRects: (t) => {
    let {
      reference: e,
      floating: n,
      strategy: r
    } = t;
    return {
      reference: ao(e, ft(n), r),
      floating: {
        ...dn(n),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => be(t).direction === "rtl"
}, yo = (t, e, n) => Bi(t, e, {
  platform: wo,
  ...n
});
function vo(t) {
  let e, n, r, i, o, s, a;
  return {
    c() {
      e = A("div"), n = A("slot"), r = W(), i = A("div"), o = q(t[0]), this.c = S, d(i, "role", "tooltip"), d(i, "class", `
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
    `), he(i, "transform", "translate(" + t[4] + "px, " + t[5] + "px)"), Q(i, "invisible", t[3]), d(e, "class", "relative"), d(e, "aria-describedby", "tooltip");
    },
    m(l, c) {
      O(l, e, c), x(e, n), x(e, r), x(e, i), x(i, o), t[9](i), t[10](e), s || (a = [
        X(e, "mouseenter", t[6]),
        X(e, "mouseleave", t[7])
      ], s = !0);
    },
    p(l, [c]) {
      c & 1 && K(o, l[0]), c & 48 && he(i, "transform", "translate(" + l[4] + "px, " + l[5] + "px)"), c & 8 && Q(i, "invisible", l[3]);
    },
    i: S,
    o: S,
    d(l) {
      l && L(e), t[9](null), t[10](null), s = !1, _e(a);
    }
  };
}
function _o(t, e, n) {
  let { text: r = "" } = e, { location: i = "top" } = e, o, s, a = !0, l = 0, c = 0;
  const f = async () => {
    const y = await yo(o, s, {
      placement: i,
      middleware: [$i(), ro({ padding: 5 }), to(10)]
    });
    n(4, l = y.x), n(5, c = y.y);
  }, g = async () => {
    await f(), n(3, a = !1);
  }, u = () => {
    n(3, a = !0);
  };
  ie();
  function m(y) {
    le[y ? "unshift" : "push"](() => {
      s = y, n(2, s);
    });
  }
  function b(y) {
    le[y ? "unshift" : "push"](() => {
      o = y, n(1, o);
    });
  }
  return t.$$set = (y) => {
    "text" in y && n(0, r = y.text), "location" in y && n(8, i = y.location);
  }, [
    r,
    o,
    s,
    a,
    l,
    c,
    g,
    u,
    i,
    m,
    b
  ];
}
class $n extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, _o, vo, re, { text: 0, location: 8 }, null), e && (e.target && O(e.target, this, e.anchor), e.props && (this.$set(e.props), M()));
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
customElements.define("v-tooltip", $n);
const ko = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $n
}, Symbol.toStringTag, { value: "Module" }));
function xo(t) {
  let e;
  return {
    c() {
      e = A("tr"), e.innerHTML = "<slot></slot>", this.c = S, d(e, "class", "border-b");
    },
    m(n, r) {
      O(n, e, r);
    },
    p: S,
    i: S,
    o: S,
    d(n) {
      n && L(e);
    }
  };
}
function Mo(t) {
  return ie(), [];
}
class er extends G {
  constructor(e) {
    super(), ee(this, {
      target: this.shadowRoot,
      props: $(this.attributes),
      customElement: !0
    }, Mo, xo, re, {}, null), e && e.target && O(e.target, this, e.anchor);
  }
}
customElements.define("v-tr", er);
const Eo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: er
}, Symbol.toStringTag, { value: "Module" }));
