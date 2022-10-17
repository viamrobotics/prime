(function() {
  const t = /* @__PURE__ */ new WeakMap(), e = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), h = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), p = { attributes: !0, attributeFilter: ["disabled"] }, b = new MutationObserver((M) => {
    for (const g of M) {
      const S = g.target;
      if (S.constructor.formAssociated) {
        const H = S.hasAttribute("disabled");
        S.toggleAttribute("internals-disabled", H), H ? S.setAttribute("aria-disabled", "true") : S.removeAttribute("aria-disabled"), S.formDisabledCallback && S.formDisabledCallback.apply(S, [H]);
      }
    }
  }), v = (M) => {
    n.get(M).forEach((S) => {
      S.remove();
    }), n.set(M, []);
  }, m = (M, g) => {
    const S = document.createElement("input");
    return S.type = "hidden", S.name = M.getAttribute("name"), M.after(S), n.get(g).push(S), S;
  }, y = (M, g) => {
    n.set(g, []);
    const S = M.hasAttribute("disabled");
    M.toggleAttribute("internals-disabled", S), b.observe(M, p);
  }, k = (M, g) => {
    if (g.length) {
      Array.from(g).forEach((H) => H.addEventListener("click", M.focus.bind(M)));
      let S = g[0].id;
      g[0].id || (S = `${g[0].htmlFor}_Label`, g[0].id = S), M.setAttribute("aria-labelledby", S);
    }
  }, T = (M) => {
    const g = Array.from(M.elements).filter((J) => J.validity).map((J) => J.validity.valid), S = s.get(M) || [], H = Array.from(S).filter((J) => J.isConnected).map((J) => i.get(J).validity.valid), G = [...g, ...H].includes(!1);
    M.toggleAttribute("internals-invalid", G), M.toggleAttribute("internals-valid", !G);
  }, x = (M) => {
    T(R(M.target));
  }, C = (M) => {
    T(R(M.target));
  }, P = (M) => {
    const g = ":is(:is(button, input)[type=submit], button:not([type])):not([disabled])";
    let S = `${g}:not([form])`;
    M.id && (S += `,${g}[form='${M.id}']`), M.addEventListener("click", (H) => {
      if (H.target.closest(S)) {
        const J = s.get(M);
        if (M.noValidate)
          return;
        J.size && Array.from(J).reverse().map((ee) => i.get(ee).reportValidity()).includes(!1) && H.preventDefault();
      }
    });
  }, j = (M) => {
    const g = s.get(M.target);
    g && g.size && g.forEach((S) => {
      S.constructor.formAssociated && S.formResetCallback && S.formResetCallback.apply(S);
    });
  }, I = (M, g, S) => {
    if (g) {
      const H = s.get(g);
      if (H)
        H.add(M);
      else {
        const G = /* @__PURE__ */ new Set();
        G.add(M), s.set(g, G), P(g), g.addEventListener("reset", j), g.addEventListener("input", x), g.addEventListener("change", C);
      }
      o.set(g, { ref: M, internals: S }), M.constructor.formAssociated && M.formAssociatedCallback && setTimeout(() => {
        M.formAssociatedCallback.apply(M, [g]);
      }, 0), T(g);
    }
  }, R = (M) => {
    let g = M.parentNode;
    return g && g.tagName !== "FORM" && (g = R(g)), g;
  }, Y = (M, g, S = DOMException) => {
    if (!M.constructor.formAssociated)
      throw new S(g);
  }, W = (M, g, S) => {
    const H = s.get(M);
    return H && H.size && H.forEach((G) => {
      i.get(G)[S]() || (g = !1);
    }), g;
  }, B = (M) => {
    if (M.constructor.formAssociated) {
      const g = i.get(M), { labels: S, form: H } = g;
      k(M, S), I(M, H, g);
    }
  }, N = {
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
  }, D = (M, g) => {
    for (let S in N) {
      g[S] = null;
      let H = null;
      const G = N[S];
      Object.defineProperty(g, S, {
        get() {
          return H;
        },
        set(J) {
          H = J, M.isConnected ? M.setAttribute(G, J) : c.set(M, g);
        }
      });
    }
  };
  class ue {
    constructor() {
      this.badInput = !1, this.customError = !1, this.patternMismatch = !1, this.rangeOverflow = !1, this.rangeUnderflow = !1, this.stepMismatch = !1, this.tooLong = !1, this.tooShort = !1, this.typeMismatch = !1, this.valid = !0, this.valueMissing = !1, Object.seal(this);
    }
  }
  const he = (M) => (M.badInput = !1, M.customError = !1, M.patternMismatch = !1, M.rangeOverflow = !1, M.rangeUnderflow = !1, M.stepMismatch = !1, M.tooLong = !1, M.tooShort = !1, M.typeMismatch = !1, M.valid = !0, M.valueMissing = !1, M), ye = (M, g, S) => (M.valid = ke(g), Object.keys(g).forEach((H) => M[H] = g[H]), S && T(S), M), ke = (M) => {
    let g = !0;
    for (let S in M)
      S !== "valid" && M[S] !== !1 && (g = !1);
    return g;
  };
  function ve(M) {
    const g = i.get(M), { form: S } = g;
    I(M, S, g), k(M, g.labels);
  }
  function ge(M) {
    M.forEach((g) => {
      const { addedNodes: S, removedNodes: H } = g, G = Array.from(S), J = Array.from(H);
      G.forEach(($) => {
        if (i.has($) && $.constructor.formAssociated && ve($), c.has($)) {
          const ne = c.get($);
          Object.keys(N).filter((O) => ne[O] !== null).forEach((O) => {
            $.setAttribute(N[O], ne[O]);
          }), c.delete($);
        }
        if ($.localName === "form") {
          const ne = s.get($), ee = document.createTreeWalker($, NodeFilter.SHOW_ELEMENT, {
            acceptNode(le) {
              return i.has(le) && !ne && !ne.has(le) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
            }
          });
          let O = ee.nextNode();
          for (; O; )
            ve(O), O = ee.nextNode();
        }
      }), J.forEach(($) => {
        const ne = i.get($);
        ne && n.get(ne) && v(ne), l.has($) && l.get($).disconnect();
      });
    });
  }
  function Te(M) {
    M.forEach((g) => {
      const { removedNodes: S } = g;
      S.forEach((H) => {
        const G = d.get(g.target);
        i.has(H) && B(H), G.disconnect();
      });
    });
  }
  const He = (M) => {
    const g = new MutationObserver(Te);
    g.observe(M, { childList: !0 }), d.set(M, g);
  };
  new MutationObserver(ge);
  const ze = {
    childList: !0,
    subtree: !0
  }, Re = /* @__PURE__ */ new WeakMap();
  class Ae extends Set {
    static get isPolyfilled() {
      return !0;
    }
    constructor(g) {
      if (super(), !g || !g.tagName || g.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      Re.set(this, g);
    }
    add(g) {
      if (!/^--/.test(g) || typeof g != "string")
        throw new DOMException(`Failed to execute 'add' on 'CustomStateSet': The specified value ${g} must start with '--'.`);
      const S = super.add(g), H = Re.get(this);
      return H.toggleAttribute(`state${g}`, !0), H.part && H.part.add(`state${g}`), S;
    }
    clear() {
      for (let [g] of this.entries())
        this.delete(g);
      super.clear();
    }
    delete(g) {
      const S = super.delete(g), H = Re.get(this);
      return H.toggleAttribute(`state${g}`, !1), H.part && H.part.remove(`state${g}`), S;
    }
  }
  class xe {
    constructor(g) {
      if (!g || !g.tagName || g.tagName.indexOf("-") === -1)
        throw new TypeError("Illegal constructor");
      const S = g.getRootNode(), H = new ue();
      this.states = new Ae(g), t.set(this, g), e.set(this, H), i.set(g, this), D(g, this), y(g, this), Object.seal(this), B(g), S instanceof DocumentFragment && He(S);
    }
    static get isPolyfilled() {
      return !0;
    }
    checkValidity() {
      const g = t.get(this);
      if (Y(g, "Failed to execute 'checkValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const S = e.get(this);
      if (!S.valid) {
        const H = new Event("invalid", {
          bubbles: !1,
          cancelable: !0,
          composed: !1
        });
        g.dispatchEvent(H);
      }
      return S.valid;
    }
    get form() {
      const g = t.get(this);
      Y(g, "Failed to read the 'form' property from 'ElementInternals': The target element is not a form-associated custom element.");
      let S;
      return g.constructor.formAssociated === !0 && (S = R(g)), S;
    }
    get labels() {
      const g = t.get(this);
      Y(g, "Failed to read the 'labels' property from 'ElementInternals': The target element is not a form-associated custom element.");
      const S = g.getAttribute("id"), H = g.getRootNode();
      return H && S ? H.querySelectorAll(`[for="${S}"]`) : [];
    }
    reportValidity() {
      const g = t.get(this);
      if (Y(g, "Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !this.willValidate)
        return !0;
      const S = this.checkValidity(), H = h.get(this);
      if (H && !g.constructor.formAssociated)
        throw new DOMException("Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element.");
      return !S && H && (g.focus(), H.focus()), S;
    }
    setFormValue(g) {
      const S = t.get(this);
      if (Y(S, "Failed to execute 'setFormValue' on 'ElementInternals': The target element is not a form-associated custom element."), v(this), g != null && !(g instanceof FormData)) {
        if (S.getAttribute("name")) {
          const H = m(S, this);
          H.value = g;
        }
      } else
        g != null && g instanceof FormData && Array.from(g).reverse().forEach(([H, G]) => {
          if (typeof G == "string") {
            const J = m(S, this);
            J.name = H, J.value = G;
          }
        });
      a.set(S, g);
    }
    setValidity(g, S, H) {
      const G = t.get(this);
      if (Y(G, "Failed to execute 'setValidity' on 'ElementInternals': The target element is not a form-associated custom element."), !g)
        throw new TypeError("Failed to execute 'setValidity' on 'ElementInternals': 1 argument required, but only 0 present.");
      h.set(this, H);
      const J = e.get(this), $ = {};
      for (const O in g)
        $[O] = g[O];
      Object.keys($).length === 0 && he(J);
      const ne = { ...J, ...$ };
      delete ne.valid;
      const { valid: ee } = ye(J, ne, this.form);
      if (!ee && !S)
        throw new DOMException("Failed to execute 'setValidity' on 'ElementInternals': The second argument should not be empty if one or more flags in the first argument are true.");
      r.set(this, ee ? "" : S), G.toggleAttribute("internals-invalid", !ee), G.toggleAttribute("internals-valid", ee), G.setAttribute("aria-invalid", `${!ee}`);
    }
    get shadowRoot() {
      const g = t.get(this), S = f.get(g);
      return S || null;
    }
    get validationMessage() {
      const g = t.get(this);
      return Y(g, "Failed to read the 'validationMessage' property from 'ElementInternals': The target element is not a form-associated custom element."), r.get(this);
    }
    get validity() {
      const g = t.get(this);
      return Y(g, "Failed to read the 'validity' property from 'ElementInternals': The target element is not a form-associated custom element."), e.get(this);
    }
    get willValidate() {
      const g = t.get(this);
      return Y(g, "Failed to read the 'willValidate' property from 'ElementInternals': The target element is not a form-associated custom element."), !(g.disabled || g.hasAttribute("disabled") || g.hasAttribute("readonly"));
    }
  }
  function je() {
    if (!window.ElementInternals || !HTMLElement.prototype.attachInternals)
      return !1;
    class M extends HTMLElement {
      constructor() {
        super(), this.internals = this.attachInternals();
      }
    }
    const g = `element-internals-feature-detection-${Math.random().toString(36).replace(/[^a-z]+/g, "")}`;
    customElements.define(g, M);
    const S = new M();
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
    ].every((H) => H in S.internals);
  }
  if (je()) {
    if (!window.CustomStateSet) {
      window.CustomStateSet = Ae;
      const M = HTMLElement.prototype.attachInternals;
      HTMLElement.prototype.attachInternals = function(...g) {
        const S = M.call(this, g);
        return S.states = new Ae(this), S;
      };
    }
  } else {
    let M = function(...ne) {
      const ee = H.apply(this, ne), O = new MutationObserver(ge);
      return f.set(this, ee), window.ShadyDOM ? O.observe(this, ze) : O.observe(ee, ze), l.set(this, O), ee;
    }, g = function(...ne) {
      let ee = J.apply(this, ne);
      return W(this, ee, "checkValidity");
    }, S = function(...ne) {
      let ee = $.apply(this, ne);
      return W(this, ee, "reportValidity");
    };
    var ht = M, bt = g, mt = S;
    window.ElementInternals = xe, HTMLElement.prototype.attachInternals = function() {
      if (this.tagName.indexOf("-") === -1)
        throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': Unable to attach ElementInternals to non-custom elements.");
      if (i.has(this))
        throw new DOMException("DOMException: Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.");
      return new xe(this);
    };
    const H = Element.prototype.attachShadow;
    Element.prototype.attachShadow = M, new MutationObserver(ge).observe(document.documentElement, ze);
    const J = HTMLFormElement.prototype.checkValidity;
    HTMLFormElement.prototype.checkValidity = g;
    const $ = HTMLFormElement.prototype.reportValidity;
    HTMLFormElement.prototype.reportValidity = S, window.CustomStateSet || (window.CustomStateSet = Ae);
  }
})();
function L() {
}
function zi(t, e) {
  for (const n in e)
    t[n] = e[n];
  return t;
}
function Et(t) {
  return t();
}
function At() {
  return /* @__PURE__ */ Object.create(null);
}
function pe(t) {
  t.forEach(Et);
}
function rt(t) {
  return typeof t == "function";
}
function Yn(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function re(t, e) {
  return t != t ? e == e : t !== e;
}
function Ri(t) {
  return Object.keys(t).length === 0;
}
function Pi(t, ...e) {
  if (t == null)
    return L;
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const Bn = typeof window < "u";
let Ot = Bn ? () => window.performance.now() : () => Date.now(), Xn = Bn ? (t) => requestAnimationFrame(t) : L;
const Ne = /* @__PURE__ */ new Set();
function Un(t) {
  Ne.forEach((e) => {
    e.c(t) || (Ne.delete(e), e.f());
  }), Ne.size !== 0 && Xn(Un);
}
function ji(t) {
  let e;
  return Ne.size === 0 && Xn(Un), {
    promise: new Promise((n) => {
      Ne.add(e = { c: t, f: n });
    }),
    abort() {
      Ne.delete(e);
    }
  };
}
function w(t, e) {
  t.appendChild(e);
}
function A(t, e, n) {
  t.insertBefore(e, n || null);
}
function V(t) {
  t.parentNode.removeChild(t);
}
function Fe(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function _(t) {
  return document.createElement(t);
}
function Ct(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function K(t) {
  return document.createTextNode(t);
}
function X() {
  return K(" ");
}
function Je() {
  return K("");
}
function U(t, e, n, i) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i);
}
function Xe(t) {
  return function(e) {
    return e.preventDefault(), t.call(this, e);
  };
}
function Ue(t) {
  return function(e) {
    return e.stopPropagation(), t.call(this, e);
  };
}
function u(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function Tt(t, e) {
  const n = Object.getOwnPropertyDescriptors(t.__proto__);
  for (const i in e)
    e[i] == null ? t.removeAttribute(i) : i === "style" ? t.style.cssText = e[i] : i === "__value" ? t.value = t[i] = e[i] : n[i] && n[i].set ? t[i] = e[i] : u(t, i, e[i]);
}
function zt(t, e) {
  Object.keys(e).forEach((n) => {
    q(t, n, e[n]);
  });
}
function q(t, e, n) {
  e in t ? t[e] = typeof t[e] == "boolean" && n === "" ? !0 : n : u(t, e, n);
}
function Li(t) {
  return Array.from(t.childNodes);
}
function Z(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function me(t, e, n, i) {
  n === null ? t.style.removeProperty(e) : t.style.setProperty(e, n, i ? "important" : "");
}
function ae(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
function oe(t) {
  const e = {};
  for (const n of t)
    e[n.name] = n.value;
  return e;
}
let qe;
function Ye(t) {
  qe = t;
}
function De() {
  if (!qe)
    throw new Error("Function called outside component initialization");
  return qe;
}
function Ii(t) {
  De().$$.on_mount.push(t);
}
function Ni(t) {
  De().$$.on_destroy.push(t);
}
function nt(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach((i) => i.call(this, e));
}
const We = [], be = [], it = [], Rt = [], Vi = Promise.resolve();
let wt = !1;
function Fi() {
  wt || (wt = !0, Vi.then(E));
}
function yt(t) {
  it.push(t);
}
const pt = /* @__PURE__ */ new Set();
let et = 0;
function E() {
  const t = qe;
  do {
    for (; et < We.length; ) {
      const e = We[et];
      et++, Ye(e), Di(e.$$);
    }
    for (Ye(null), We.length = 0, et = 0; be.length; )
      be.pop()();
    for (let e = 0; e < it.length; e += 1) {
      const n = it[e];
      pt.has(n) || (pt.add(n), n());
    }
    it.length = 0;
  } while (We.length);
  for (; Rt.length; )
    Rt.pop()();
  wt = !1, pt.clear(), Ye(t);
}
function Di(t) {
  if (t.fragment !== null) {
    t.update(), pe(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(yt);
  }
}
const Hi = /* @__PURE__ */ new Set();
function qn(t, e) {
  t && t.i && (Hi.delete(t), t.i(e));
}
function Ze(t, e) {
  t.d(1), e.delete(t.key);
}
function Ge(t, e, n, i, r, o, l, s, a, c, f, h) {
  let d = t.length, p = o.length, b = d;
  const v = {};
  for (; b--; )
    v[t[b].key] = b;
  const m = [], y = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Map();
  for (b = p; b--; ) {
    const P = h(r, o, b), j = n(P);
    let I = l.get(j);
    I ? i && I.p(P, e) : (I = c(j, P), I.c()), y.set(j, m[b] = I), j in v && k.set(j, Math.abs(b - v[j]));
  }
  const T = /* @__PURE__ */ new Set(), x = /* @__PURE__ */ new Set();
  function C(P) {
    qn(P, 1), P.m(s, f), l.set(P.key, P), f = P.first, p--;
  }
  for (; d && p; ) {
    const P = m[p - 1], j = t[d - 1], I = P.key, R = j.key;
    P === j ? (f = P.first, d--, p--) : y.has(R) ? !l.has(I) || T.has(I) ? C(P) : x.has(R) ? d-- : k.get(I) > k.get(R) ? (x.add(I), C(P)) : (T.add(R), d--) : (a(j, l), d--);
  }
  for (; d--; ) {
    const P = t[d];
    y.has(P.key) || a(P, l);
  }
  for (; p; )
    C(m[p - 1]);
  return m;
}
function Wi(t, e) {
  const n = {}, i = {}, r = { $$scope: 1 };
  let o = t.length;
  for (; o--; ) {
    const l = t[o], s = e[o];
    if (s) {
      for (const a in l)
        a in s || (i[a] = 1);
      for (const a in s)
        r[a] || (n[a] = s[a], r[a] = 1);
      t[o] = s;
    } else
      for (const a in l)
        r[a] = 1;
  }
  for (const l in i)
    l in n || (n[l] = void 0);
  return n;
}
function Yi(t, e, n, i) {
  const { fragment: r, after_update: o } = t.$$;
  r && r.m(e, n), i || yt(() => {
    const l = t.$$.on_mount.map(Et).filter(rt);
    t.$$.on_destroy ? t.$$.on_destroy.push(...l) : pe(l), t.$$.on_mount = [];
  }), o.forEach(yt);
}
function Bi(t, e) {
  const n = t.$$;
  n.fragment !== null && (pe(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Xi(t, e) {
  t.$$.dirty[0] === -1 && (We.push(t), Fi(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function se(t, e, n, i, r, o, l, s = [-1]) {
  const a = qe;
  Ye(t);
  const c = t.$$ = {
    fragment: null,
    ctx: [],
    props: o,
    update: L,
    not_equal: r,
    bound: At(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (a ? a.$$.context : [])),
    callbacks: At(),
    dirty: s,
    skip_bound: !1,
    root: e.target || a.$$.root
  };
  l && l(c.root);
  let f = !1;
  if (c.ctx = n ? n(t, e.props || {}, (h, d, ...p) => {
    const b = p.length ? p[0] : d;
    return c.ctx && r(c.ctx[h], c.ctx[h] = b) && (!c.skip_bound && c.bound[h] && c.bound[h](b), f && Xi(t, h)), d;
  }) : [], c.update(), f = !0, pe(c.before_update), c.fragment = i ? i(c.ctx) : !1, e.target) {
    if (e.hydrate) {
      const h = Li(e.target);
      c.fragment && c.fragment.l(h), h.forEach(V);
    } else
      c.fragment && c.fragment.c();
    e.intro && qn(t.$$.fragment), Yi(t, e.target, e.anchor, e.customElement), E();
  }
  Ye(a);
}
let te;
typeof HTMLElement == "function" && (te = class extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const { on_mount: t } = this.$$;
    this.$$.on_disconnect = t.map(Et).filter(rt);
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
    Bi(this, 1), this.$destroy = L;
  }
  $on(t, e) {
    if (!rt(e))
      return L;
    const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return n.push(e), () => {
      const i = n.indexOf(e);
      i !== -1 && n.splice(i, 1);
    };
  }
  $set(t) {
    this.$$set && !Ri(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
});
const Kn = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.invisible{visibility:hidden}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.left-0{left:0}.right-0{right:0}.top-0{top:0}.top-1{top:.25rem}.bottom-auto{bottom:auto}.bottom-1{bottom:.25rem}.left-1\\/2{left:50%}.bottom-full{bottom:100%}.-top-0\\.5{top:-.125rem}.-top-0{top:-0px}.top-\\[calc\\(50\\%-9px\\)\\]{top:calc(50% - 9px)}.right-0\\.5{right:.125rem}.bottom-0{bottom:0}.isolate{isolation:isolate}.z-40{z-index:40}.z-50{z-index:50}.z-\\[2\\]{z-index:2}.z-\\[1\\]{z-index:1}.z-\\[100\\]{z-index:100}.m-2{margin:.5rem}.mx-auto{margin-left:auto;margin-right:auto}.-mt-px{margin-top:-1px}.-mt-0\\.5{margin-top:-.125rem}.-mt-0{margin-top:-0px}.mb-2{margin-bottom:.5rem}.mb-8{margin-bottom:2rem}.mt-0\\.5{margin-top:.125rem}.mt-0{margin-top:0}.mt-1{margin-top:.25rem}.mt-7{margin-top:1.75rem}.mb-3{margin-bottom:.75rem}.mt-px{margin-top:1px}.ml-px{margin-left:1px}.-mb-px{margin-bottom:-1px}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.table-cell{display:table-cell}.grid{display:grid}.contents{display:contents}.hidden{display:none}.h-\\[60\\%\\]{height:60%}.h-full{height:100%}.h-0\\.5{height:.125rem}.h-0{height:0px}.h-5{height:1.25rem}.h-1{height:.25rem}.h-2{height:.5rem}.h-\\[4px\\]{height:4px}.h-4{height:1rem}.h-\\[30px\\]{height:30px}.max-h-0{max-height:0px}.max-h-fit{max-height:fit-content}.max-h-36{max-height:9rem}.w-px{width:1px}.w-full{width:100%}.w-5{width:1.25rem}.w-\\[1px\\]{width:1px}.w-11{width:2.75rem}.w-4{width:1rem}.w-0{width:0px}.min-w-\\[400px\\]{min-width:400px}.min-w-\\[12rem\\]{min-width:12rem}.min-w-\\[6rem\\]{min-width:6rem}.max-w-lg{max-width:32rem}.flex-shrink-0{flex-shrink:0}.grow{flex-grow:1}.table-fixed{table-layout:fixed}.-translate-x-1\\/2{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\.5{--tw-translate-y: -.375rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1{--tw-translate-y: -.25rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-1\\/2{--tw-translate-x: 50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-0{--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-x-6{--tw-translate-x: 1.5rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-rotate-\\[30deg\\]{--tw-rotate: -30deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-\\[30deg\\]{--tw-rotate: 30deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate: 0deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-180{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.cursor-not-allowed{cursor:not-allowed}.select-none{user-select:none}.appearance-none{appearance:none}.flex-row-reverse{flex-direction:row-reverse}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.place-content-center{place-content:center}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-3{gap:.75rem}.gap-2{gap:.5rem}.gap-1\\.5{gap:.375rem}.gap-1{gap:.25rem}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.text-ellipsis{text-overflow:ellipsis}.whitespace-nowrap{white-space:nowrap}.rounded-full{border-radius:9999px}.rounded-xl{border-radius:.75rem}.border{border-width:1px}.border-0{border-width:0px}.border-y{border-top-width:1px;border-bottom-width:1px}.border-l{border-left-width:1px}.border-l-4{border-left-width:4px}.border-b{border-bottom-width:1px}.border-r{border-right-width:1px}.border-black{--tw-border-opacity: 1;border-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-red\\/90{--tw-border-opacity: 1;border-color:rgb(190 48 38 / var(--tw-border-opacity))}.border-orange\\/90{--tw-border-opacity: 1;border-color:rgb(255 153 0 / var(--tw-border-opacity))}.border-green\\/90{--tw-border-opacity: 1;border-color:rgb(57 127 72 / var(--tw-border-opacity))}.border-blue\\/90{--tw-border-opacity: 1;border-color:rgb(4 86 129 / var(--tw-border-opacity))}.border-black\\/70{--tw-border-opacity: 1;border-color:rgb(85 85 85 / var(--tw-border-opacity))}.border-green\\/100{--tw-border-opacity: 1;border-color:rgb(41 91 51 / var(--tw-border-opacity))}.border-white{--tw-border-opacity: 1;border-color:rgb(255 255 255 / var(--tw-border-opacity))}.border-red-600{--tw-border-opacity: 1;border-color:rgb(220 38 38 / var(--tw-border-opacity))}.border-x-black{--tw-border-opacity: 1;border-left-color:rgb(0 0 0 / var(--tw-border-opacity));border-right-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-b-black{--tw-border-opacity: 1;border-bottom-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-t-black{--tw-border-opacity: 1;border-top-color:rgb(0 0 0 / var(--tw-border-opacity))}.border-b-white{--tw-border-opacity: 1;border-bottom-color:rgb(255 255 255 / var(--tw-border-opacity))}.border-l-gray-300{--tw-border-opacity: 1;border-left-color:rgb(209 213 219 / var(--tw-border-opacity))}.border-r-gray-300{--tw-border-opacity: 1;border-right-color:rgb(209 213 219 / var(--tw-border-opacity))}.bg-green-200{--tw-bg-opacity: 1;background-color:rgb(187 247 208 / var(--tw-bg-opacity))}.bg-orange-200{--tw-bg-opacity: 1;background-color:rgb(254 215 170 / var(--tw-bg-opacity))}.bg-red-200{--tw-bg-opacity: 1;background-color:rgb(254 202 202 / var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-gray-300{--tw-bg-opacity: 1;background-color:rgb(209 213 219 / var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity))}.bg-black\\/50{--tw-bg-opacity: 1;background-color:rgb(157 157 157 / var(--tw-bg-opacity))}.bg-gray-400{--tw-bg-opacity: 1;background-color:rgb(156 163 175 / var(--tw-bg-opacity))}.bg-green\\/80{--tw-bg-opacity: 1;background-color:rgb(73 162 92 / var(--tw-bg-opacity))}.bg-black\\/20{--tw-bg-opacity: 1;background-color:rgb(233 233 233 / var(--tw-bg-opacity))}.bg-red\\/90{--tw-bg-opacity: 1;background-color:rgb(190 48 38 / var(--tw-bg-opacity))}.bg-green\\/90{--tw-bg-opacity: 1;background-color:rgb(57 127 72 / var(--tw-bg-opacity))}.bg-\\[\\#C4C4C4\\]{--tw-bg-opacity: 1;background-color:rgb(196 196 196 / var(--tw-bg-opacity))}.bg-slate-200{--tw-bg-opacity: 1;background-color:rgb(226 232 240 / var(--tw-bg-opacity))}.bg-yellow-100{--tw-bg-opacity: 1;background-color:rgb(254 249 195 / var(--tw-bg-opacity))}.bg-opacity-25{--tw-bg-opacity: .25}.p-10{padding:2.5rem}.p-4{padding:1rem}.p-3{padding:.75rem}.p-1{padding:.25rem}.p-2{padding:.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-0{padding-top:0;padding-bottom:0}.px-4{padding-left:1rem;padding-right:1rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-1\\.5{padding-left:.375rem;padding-right:.375rem}.px-1{padding-left:.25rem;padding-right:.25rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.pr-12{padding-right:3rem}.pb-1{padding-bottom:.25rem}.pl-2\\.5{padding-left:.625rem}.pr-1{padding-right:.25rem}.pl-2{padding-left:.5rem}.text-left{text-align:left}.text-center{text-align:center}.text-xs{font-size:.75rem;line-height:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-4xl{font-size:2.25rem;line-height:2.5rem}.text-\\[15px\\]{font-size:15px}.text-\\[10px\\]{font-size:10px}.font-bold{font-weight:700}.font-normal{font-weight:400}.uppercase{text-transform:uppercase}.capitalize{text-transform:capitalize}.leading-tight{line-height:1.25}.text-green-900{--tw-text-opacity: 1;color:rgb(20 83 45 / var(--tw-text-opacity))}.text-orange-900{--tw-text-opacity: 1;color:rgb(124 45 18 / var(--tw-text-opacity))}.text-red-900{--tw-text-opacity: 1;color:rgb(127 29 29 / var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity))}.text-black{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.text-gray-500{--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity))}.text-red\\/90{--tw-text-opacity: 1;color:rgb(190 48 38 / var(--tw-text-opacity))}.text-blue\\/90{--tw-text-opacity: 1;color:rgb(4 86 129 / var(--tw-text-opacity))}.text-green\\/90{--tw-text-opacity: 1;color:rgb(57 127 72 / var(--tw-text-opacity))}.text-orange-400{--tw-text-opacity: 1;color:rgb(251 146 60 / var(--tw-text-opacity))}.text-red-600{--tw-text-opacity: 1;color:rgb(220 38 38 / var(--tw-text-opacity))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-black\\/70{--tw-text-opacity: 1;color:rgb(85 85 85 / var(--tw-text-opacity))}.text-neutral-600{--tw-text-opacity: 1;color:rgb(82 82 82 / var(--tw-text-opacity))}.opacity-50{opacity:.5}.opacity-0{opacity:0}.shadow-solid4{--tw-shadow: 4px 4px 0px #000;--tw-shadow-colored: 4px 4px 0px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.outline-none{outline:2px solid transparent;outline-offset:2px}.ring-0{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.blur{--tw-blur: blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.drop-shadow-md{--tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / .07)) drop-shadow(0 2px 2px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-200{transition-duration:.2s}.duration-500{transition-duration:.5s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}.will-change-transform{will-change:transform}*,input,button{font-family:Space Mono,monospace}:host{display:block}:host([hidden]){display:none}[class^=icon-],[class*=" icon-"]{font-family:icons!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-error-outline:before{content:"\\e912"}.icon-warning:before{content:"\\e916"}.icon-naught:before{content:"\\e907"}.icon-disconnected:before{content:"\\e919"}.icon-add:before{content:"\\e90d"}.icon-x:before{content:"\\e920"}.icon-copy:before{content:"\\e924"}.icon-remove:before{content:"\\e921"}.icon-send:before{content:"\\e91b"}.icon-undo:before{content:"\\e91c"}.icon-connected:before{content:"\\e91a"}.icon-download:before{content:"\\e913"}.icon-camera:before{content:"\\e914"}.icon-center:before{content:"\\e915"}.icon-zoom_out_map:before{content:"\\e904"}.icon-chevron-down:before{content:"\\e926"}.icon-menu:before{content:"\\e927"}.icon-keyboard_control:before{content:"\\e91d"}.icon-arrow-up:before{content:"\\e917"}.icon-checkmark:before{content:"\\e91e"}.icon-pop-out:before{content:"\\e908"}.icon-settings:before{content:"\\e918"}.icon-refresh-camera:before{content:"\\e90c"}.icon-filter:before{content:"\\e922"}.icon-open-full:before{content:"\\e923"}.icon-refresh:before{content:"\\e911"}.icon-info-outline:before{content:"\\e910"}.icon-pause-circle-filled:before{content:"\\e90e"}.icon-play-circle-filled:before{content:"\\e90f"}.icon-logout:before{content:"\\e900"}.icon-instagram:before{content:"\\e901"}.icon-social-medium:before{content:"\\e906"}.icon-save:before{content:"\\e909"}.icon-edit:before{content:"\\e90a";color:#555}.icon-github:before{content:"\\e91f"}.icon-stop-circle:before{content:"\\e903"}.icon-twitter:before{content:"\\e902"}.icon-linkedin:before{content:"\\e90b"}.icon-trash:before{content:"\\e905"}.first\\:ml-4:first-child{margin-left:1rem}.last\\:border-r:last-child{border-right-width:1px}.hover\\:scale-110:hover{--tw-scale-x: 1.1;--tw-scale-y: 1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:scale-105:hover{--tw-scale-x: 1.05;--tw-scale-y: 1.05;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:bg-gray-300:hover{--tw-bg-opacity: 1;background-color:rgb(209 213 219 / var(--tw-bg-opacity))}.hover\\:bg-slate-200:hover{--tw-bg-opacity: 1;background-color:rgb(226 232 240 / var(--tw-bg-opacity))}.hover\\:text-black:hover{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}@media (prefers-reduced-motion: no-preference){.motion-safe\\:transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.motion-safe\\:transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}}
`;
let vt, Jn = !1;
try {
  vt = new CSSStyleSheet(), vt.replaceSync(Kn);
} catch {
  Jn = !0;
}
const fe = () => {
  const t = De();
  if (Jn) {
    const e = document.createElement("style");
    e.innerHTML = Kn, t.shadowRoot.append(e);
  } else {
    const e = t.shadowRoot;
    e.adoptedStyleSheets = [vt];
  }
}, { base: Pt = "", query: jt = "", workers: ls = {} } = window.PRIME_CONFIG ?? {}, Ui = async () => {
  const t = new FontFace("icons", Pt ? `url(${Pt}/icons.woff2${jt})` : `url(icons.woff2${jt})`);
  await t.load(), document.fonts.add(t);
}, qi = "0.34.0", Ie = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${qi}`, Ke = [], Mt = (t, e) => `http://definitions/${t}-${e}.json`, Zn = (t = "") => t.split("/").pop(), Ki = (t, e) => {
  for (const n of Object.values(e.properties ?? []))
    n.type === "array" && n.items?.type ? n.description = `"array" of type "${n.items?.type}"` : n.type === "array" ? n.description = '"array" of type "object"' : n.description = `"${n.type}"`;
  return JSON.parse(JSON.stringify(e), (n, i) => {
    if (n === "$ref")
      return Mt(t, Zn(i));
    if (n !== "$schema")
      return i;
  });
}, Ji = (t, e, n) => {
  const { $ref: i, definitions: r = {} } = e;
  for (const [o, l] of Object.entries(r))
    Ke.push({
      uri: Mt(t, o),
      schema: Ki(t, l),
      ...Zn(i) === o ? { fileMatch: n } : void 0
    });
  window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: !0,
    schemas: Ke
  });
}, Zi = (t, e) => Ke.findIndex(({ uri: n }) => n === Mt(t, e)), Gi = (t, e) => {
  let n = !1;
  const { definitions: i = {} } = e;
  for (const r of Object.keys(i)) {
    const o = Zi(t, r);
    Ke.splice(o, 1), n = !0;
  }
  !n || window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: !0,
    schemas: Ke
  });
}, Lt = {
  addSchemas: Ji,
  removeSchemas: Gi
}, ce = (t, e, n) => t.dispatchEvent(new CustomEvent(e, {
  composed: !0,
  bubbles: !0,
  detail: n
})), Qi = /\s+|\r?\n|\r/g, It = (t) => t.replace(Qi, "");
customElements.get("v-badge") ? console.warn("WARNING: Multiple instances of PRIME being imported.") : (Ui().catch((t) => console.error(t)), Promise.resolve().then(() => tr), Promise.resolve().then(() => rr), Promise.resolve().then(() => cr), Promise.resolve().then(() => br), Promise.resolve().then(() => gr), Promise.resolve().then(() => vr), Promise.resolve().then(() => xr), Promise.resolve().then(() => Sr), Promise.resolve().then(() => zr), Promise.resolve().then(() => Nr), Promise.resolve().then(() => Dr), Promise.resolve().then(() => Yr), Promise.resolve().then(() => $r), Promise.resolve().then(() => ro), Promise.resolve().then(() => lo), Promise.resolve().then(() => fo), Promise.resolve().then(() => bo), Promise.resolve().then(() => go), Promise.resolve().then(() => vo), Promise.resolve().then(() => xo), Promise.resolve().then(() => So), Promise.resolve().then(() => is), Promise.resolve().then(() => ss));
var Gn = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(t) {
  (function() {
    var e = {}.hasOwnProperty;
    function n() {
      for (var i = [], r = 0; r < arguments.length; r++) {
        var o = arguments[r];
        if (!!o) {
          var l = typeof o;
          if (l === "string" || l === "number")
            i.push(o);
          else if (Array.isArray(o)) {
            if (o.length) {
              var s = n.apply(null, o);
              s && i.push(s);
            }
          } else if (l === "object") {
            if (o.toString !== Object.prototype.toString && !o.toString.toString().includes("[native code]")) {
              i.push(o.toString());
              continue;
            }
            for (var a in o)
              e.call(o, a) && o[a] && i.push(a);
          }
        }
      }
      return i.join(" ");
    }
    t.exports ? (n.default = n, t.exports = n) : window.classNames = n;
  })();
})(Gn);
const F = Gn.exports;
function $i(t) {
  let e, n, i;
  return {
    c() {
      e = _("small"), n = K(t[0]), this.c = L, u(e, "class", i = F("inline-block rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": t[1] === "green",
        "text-orange-900 bg-orange-200": t[1] === "orange",
        "text-red-900 bg-red-200": t[1] === "red",
        "text-gray-800 bg-gray-200": t[1] === "gray"
      }));
    },
    m(r, o) {
      A(r, e, o), w(e, n);
    },
    p(r, [o]) {
      o & 1 && Z(n, r[0]), o & 2 && i !== (i = F("inline-block rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": r[1] === "green",
        "text-orange-900 bg-orange-200": r[1] === "orange",
        "text-red-900 bg-red-200": r[1] === "red",
        "text-gray-800 bg-gray-200": r[1] === "gray"
      })) && u(e, "class", i);
    },
    i: L,
    o: L,
    d(r) {
      r && V(e);
    }
  };
}
function er(t, e, n) {
  let { label: i = "" } = e, { variant: r = "gray" } = e;
  return fe(), t.$$set = (o) => {
    "label" in o && n(0, i = o.label), "variant" in o && n(1, r = o.variant);
  }, [i, r];
}
class Qn extends te {
  constructor(e) {
    super(), se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      er,
      $i,
      re,
      { label: 0, variant: 1 },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-badge", Qn);
const tr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qn
}, Symbol.toStringTag, { value: "Module" }));
function Nt(t, e, n) {
  const i = t.slice();
  return i[2] = e[n], i[4] = n, i;
}
function Vt(t) {
  let e;
  return {
    c() {
      e = _("div"), e.innerHTML = `<div class="w-px h-[60%] border-l border-black -rotate-[30deg] -mt-px"></div> 
        <div class="w-px h-[60%] border-l border-black rotate-[30deg] -mt-0.5"></div> 
      `;
    },
    m(n, i) {
      A(n, e, i);
    },
    d(n) {
      n && V(e);
    }
  };
}
function Ft(t, e) {
  let n, i = e[2] + "", r, o, l, s = e[4] !== e[0].length - 1 && Vt();
  return {
    key: t,
    first: null,
    c() {
      n = _("small"), r = K(i), o = X(), s && s.c(), l = Je(), u(n, "class", "py1"), this.first = n;
    },
    m(a, c) {
      A(a, n, c), w(n, r), A(a, o, c), s && s.m(a, c), A(a, l, c);
    },
    p(a, c) {
      e = a, c & 1 && i !== (i = e[2] + "") && Z(r, i), e[4] !== e[0].length - 1 ? s || (s = Vt(), s.c(), s.m(l.parentNode, l)) : s && (s.d(1), s = null);
    },
    d(a) {
      a && V(n), a && V(o), s && s.d(a), a && V(l);
    }
  };
}
function nr(t) {
  let e, n = [], i = /* @__PURE__ */ new Map(), r = t[0];
  const o = (l) => l[2];
  for (let l = 0; l < r.length; l += 1) {
    let s = Nt(t, r, l), a = o(s);
    i.set(a, n[l] = Ft(a, s));
  }
  return {
    c() {
      e = _("div");
      for (let l = 0; l < n.length; l += 1)
        n[l].c();
      this.c = L, u(e, "class", "inline-flex gap-3 px-4 border border-black rounded-full");
    },
    m(l, s) {
      A(l, e, s);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
    },
    p(l, [s]) {
      s & 1 && (r = l[0], n = Ge(n, s, o, 1, l, r, i, e, Ze, Ft, null, Nt));
    },
    i: L,
    o: L,
    d(l) {
      l && V(e);
      for (let s = 0; s < n.length; s += 1)
        n[s].d();
    }
  };
}
function ir(t, e, n) {
  let { crumbs: i = "" } = e;
  fe();
  let r;
  return t.$$set = (o) => {
    "crumbs" in o && n(1, i = o.crumbs);
  }, t.$$.update = () => {
    t.$$.dirty & 2 && n(0, r = i.split(",").map((o) => o.trim()));
  }, [r, i];
}
class $n extends te {
  constructor(e) {
    super(), se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      ir,
      nr,
      re,
      { crumbs: 1 },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-breadcrumbs", $n);
const rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $n
}, Symbol.toStringTag, { value: "Module" })), we = (t, e) => t === "" || t === "true" || t === e;
function Dt(t) {
  let e, n;
  return {
    c() {
      e = _("i"), u(e, "aria-hidden", "true"), u(e, "class", n = "icon-" + t[3] + " text-" + t[4]);
    },
    m(i, r) {
      A(i, e, r);
    },
    p(i, r) {
      r & 24 && n !== (n = "icon-" + i[3] + " text-" + i[4]) && u(e, "class", n);
    },
    d(i) {
      i && V(e);
    }
  };
}
function Ht(t) {
  let e, n;
  return {
    c() {
      e = _("span"), n = K(t[2]), u(e, "class", "mx-auto");
    },
    m(i, r) {
      A(i, e, r), w(e, n);
    },
    p(i, r) {
      r & 4 && Z(n, i[2]);
    },
    d(i) {
      i && V(e);
    }
  };
}
function gt(t) {
  let e, n, i, r, o, l, s, a = t[3] && Dt(t), c = t[1] !== "icon" && Ht(t), f = [{ text: t[5] }], h = {};
  for (let d = 0; d < f.length; d += 1)
    h = zi(h, f[d]);
  return {
    c() {
      e = _(t[5] ? "v-tooltip" : "span"), n = _("button"), a && a.c(), i = X(), c && c.c(), u(n, "type", t[0]), u(n, "aria-label", r = t[1] === "icon" ? t[2] : void 0), u(n, "aria-disabled", t[6]), u(n, "class", o = F("will-change-transform hover:scale-105 motion-safe:transition-transform", {
        "inline-flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs border": t[1] !== "icon",
        "cursor-not-allowed opacity-50 pointer-events-none": t[6],
        "bg-white border-black": t[1] === "primary",
        "bg-black border-white text-white": t[1] === "inverse-primary",
        "bg-red/90 text-white border-red/90": t[1] === "danger",
        "bg-green/90 border-green/90 text-white": t[1] === "success",
        "bg-white border-red/90 text-red/90": t[1] === "outline-danger"
      })), /-/.test(t[5] ? "v-tooltip" : "span") ? zt(e, h) : Tt(e, h);
    },
    m(d, p) {
      A(d, e, p), w(e, n), a && a.m(n, null), w(n, i), c && c.m(n, null), l || (s = U(n, "click", t[7]), l = !0);
    },
    p(d, p) {
      d[3] ? a ? a.p(d, p) : (a = Dt(d), a.c(), a.m(n, i)) : a && (a.d(1), a = null), d[1] !== "icon" ? c ? c.p(d, p) : (c = Ht(d), c.c(), c.m(n, null)) : c && (c.d(1), c = null), p & 1 && u(n, "type", d[0]), p & 6 && r !== (r = d[1] === "icon" ? d[2] : void 0) && u(n, "aria-label", r), p & 64 && u(n, "aria-disabled", d[6]), p & 66 && o !== (o = F("will-change-transform hover:scale-105 motion-safe:transition-transform", {
        "inline-flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs border": d[1] !== "icon",
        "cursor-not-allowed opacity-50 pointer-events-none": d[6],
        "bg-white border-black": d[1] === "primary",
        "bg-black border-white text-white": d[1] === "inverse-primary",
        "bg-red/90 text-white border-red/90": d[1] === "danger",
        "bg-green/90 border-green/90 text-white": d[1] === "success",
        "bg-white border-red/90 text-red/90": d[1] === "outline-danger"
      })) && u(n, "class", o), h = Wi(f, [p & 32 && { text: d[5] }]), /-/.test(d[5] ? "v-tooltip" : "span") ? zt(e, h) : Tt(e, h);
    },
    d(d) {
      d && V(e), a && a.d(), c && c.d(), l = !1, s();
    }
  };
}
function or(t) {
  let e = t[5] ? "v-tooltip" : "span", n, i = (t[5] ? "v-tooltip" : "span") && gt(t);
  return {
    c() {
      i && i.c(), n = Je(), this.c = L;
    },
    m(r, o) {
      i && i.m(r, o), A(r, n, o);
    },
    p(r, [o]) {
      r[5], e ? re(e, r[5] ? "v-tooltip" : "span") ? (i.d(1), i = gt(r), i.c(), i.m(n.parentNode, n)) : i.p(r, o) : (i = gt(r), i.c(), i.m(n.parentNode, n)), e = r[5] ? "v-tooltip" : "span";
    },
    i: L,
    o: L,
    d(r) {
      r && V(n), i && i.d(r);
    }
  };
}
function sr(t, e, n) {
  let { disabled: i = "false" } = e, { type: r = "button" } = e, { variant: o = "primary" } = e, { label: l = "" } = e, { icon: s = "" } = e, { size: a = "base" } = e, { tooltip: c = "" } = e, f;
  fe();
  const d = De().attachInternals(), p = () => {
    const { form: b } = d;
    b?.requestSubmit ? b.requestSubmit() : b?.submit();
  };
  return t.$$set = (b) => {
    "disabled" in b && n(8, i = b.disabled), "type" in b && n(0, r = b.type), "variant" in b && n(1, o = b.variant), "label" in b && n(2, l = b.label), "icon" in b && n(3, s = b.icon), "size" in b && n(4, a = b.size), "tooltip" in b && n(5, c = b.tooltip);
  }, t.$$.update = () => {
    t.$$.dirty & 256 && n(6, f = we(i, "disabled"));
  }, [r, o, l, s, a, c, f, p, i];
}
class lr extends te {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>:host{display:inline-block !important }</style>", se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      sr,
      or,
      re,
      {
        disabled: 8,
        type: 0,
        variant: 1,
        label: 2,
        icon: 3,
        size: 4,
        tooltip: 5
      },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["disabled", "type", "variant", "label", "icon", "size", "tooltip"];
  }
  get disabled() {
    return this.$$.ctx[8];
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
  get size() {
    return this.$$.ctx[4];
  }
  set size(e) {
    this.$$set({ size: e }), E();
  }
  get tooltip() {
    return this.$$.ctx[5];
  }
  set tooltip(e) {
    this.$$set({ tooltip: e }), E();
  }
}
customElements.define("v-button-internal", lr);
class ar extends customElements.get("v-button-internal") {
  static formAssociated = !0;
}
customElements.define("v-button", ar);
const cr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
let tt = "uninitialized";
const Wt = /* @__PURE__ */ new Set(), fr = (t) => {
  if (tt === "loaded")
    return t(window.monaco);
  if (Wt.add(t), tt === "loading")
    return;
  tt = "loading";
  const e = URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = {
      baseUrl: '${Ie}/min/'
    };
    importScripts('${Ie}/min/vs/base/worker/workerMain.js');
    importScripts('${Ie}/min/vs/language/json/jsonWorker.js');
  `], { type: "text/javascript" })), n = () => {
    window.require.config({ paths: { vs: `${Ie}/min/vs` } }), window.MonacoEnvironment = { getWorkerUrl: () => e }, window.require(["vs/editor/editor.main"], () => {
      for (const i of Wt)
        i(window.monaco);
      tt = "loaded";
    });
  };
  {
    const i = document.createElement("script");
    i.addEventListener("load", n), i.async = !0, i.src = `${Ie}/min/vs/loader.js`, document.head.append(i);
  }
}, ur = (t, e, n) => t <= e ? e : t >= n ? n : t, ot = (t, e, n, i) => {
  const r = (t - e) / (n - e) * 100;
  return Number.isNaN(r) || r <= 0 ? 0 : r >= 100 ? 100 : Number.parseFloat(r.toFixed(i));
}, Yt = (t) => {
  let e = 0, n = 0;
  if (t.length === 0)
    return e;
  for (let i = 0; i < t.length; i += 1)
    n = t.codePointAt(i), e = (e << 5) - e + n, e = Math.trunc(e);
  return e;
};
function dr(t) {
  let e, n, i;
  return {
    c() {
      e = _("div"), this.c = L, u(e, "class", "w-full h-full relative isolate");
    },
    m(r, o) {
      A(r, e, o), t[12](e), n || (i = U(e, "input", t[1]), n = !0);
    },
    p: L,
    i: L,
    o: L,
    d(r) {
      r && V(e), t[12](null), n = !1, i();
    }
  };
}
function hr(t, e, n) {
  let { value: i = "" } = e, { previous: r = "" } = e, { language: o } = e, { theme: l = "vs" } = e, { readonly: s = "false" } = e, { minimap: a = "false" } = e, { schema: c = "" } = e, { variant: f = "default" } = e, h, d, p, b, v, m, y;
  fe();
  const k = document.createElement("link");
  k.rel = "stylesheet", k.href = `${Ie}/min/vs/editor/editor.main.min.css`, De().shadowRoot.append(k);
  const x = () => {
    if (!m)
      return;
    m.getModel()?.dispose();
    let D;
    if (p) {
      const ue = String(Yt(c)), he = `http://${ue}.json/`, ye = window.monaco.Uri.parse(he);
      Lt.removeSchemas(ue, p), Lt.addSchemas(ue, p, [ye.toString()]), D = window.monaco.editor.createModel(i, o, ye);
    } else
      D = window.monaco.editor.createModel(i, o);
    ce(b, "update-model", { model: D }), m.setModel(D);
  }, C = () => {
    const N = v?.getModel();
    N?.modified.dispose(), N?.original.dispose(), v.setModel({
      original: window.monaco.editor.createModel(r, "json"),
      modified: window.monaco.editor.createModel(i, "json")
    });
  }, P = (N) => {
    N instanceof InputEvent && (N.preventDefault(), N.stopImmediatePropagation());
  }, j = () => ({
    value: i,
    language: o,
    theme: l,
    readOnly: h,
    minimap: { enabled: d },
    scrollbar: {
      verticalScrollbarSize: 3,
      horizontalScrollbarSize: 3,
      vertical: "auto",
      horizontal: "auto",
      alwaysConsumeMouseWheel: !1
    },
    scrollBeyondLastLine: !1
  }), I = () => {
    n(10, v = window.monaco.editor.createDiffEditor(b, { ...j(), readOnly: !0 })), v.setModel({
      original: window.monaco.editor.createModel(r, o),
      modified: window.monaco.editor.createModel(i, o)
    });
  }, R = (N) => {
    if (f === "diff")
      return I();
    n(11, m = N.editor.create(b, j())), m.onDidChangeModelContent(() => {
      ce(b, "input", { value: m?.getValue() });
    }), m.onDidBlurEditorWidget(() => {
      ce(b, "blur", { value: m?.getValue() }), Y();
    }), m.layout(), x(), Y();
  }, Y = () => {
    const N = window.monaco.editor.getModelMarkers({}), D = Yt(c), ue = N.filter((he) => he.resource.authority === `${D}.json`);
    ce(b, "markers", { markers: ue });
  }, W = () => {
    if (!y && m && (y = new ResizeObserver(() => {
      m?.layout();
    })), y) {
      const N = m?.getDomNode() ?? b;
      y.observe(N);
    }
  };
  Ii(() => {
    fr(R);
  }), Ni(() => {
    m?.getModel()?.dispose(), v?.dispose(), m?.dispose(), y.disconnect();
    const D = m?.getDomNode() ?? b;
    ce(D, "destroy");
  });
  function B(N) {
    be[N ? "unshift" : "push"](() => {
      b = N, n(0, b);
    });
  }
  return t.$$set = (N) => {
    "value" in N && n(2, i = N.value), "previous" in N && n(3, r = N.previous), "language" in N && n(4, o = N.language), "theme" in N && n(5, l = N.theme), "readonly" in N && n(6, s = N.readonly), "minimap" in N && n(7, a = N.minimap), "schema" in N && n(8, c = N.schema), "variant" in N && n(9, f = N.variant);
  }, t.$$.update = () => {
    if (t.$$.dirty & 256 && (p = c ? JSON.parse(c) : void 0), t.$$.dirty & 64 && (h = we(s, "readonly")), t.$$.dirty & 128 && (d = we(a, "minimap")), t.$$.dirty & 3076) {
      if (v)
        C(), W();
      else if (m) {
        x();
        const N = m?.getValue() ?? "";
        if (i !== void 0) {
          const D = It(i);
          It(N) !== D && (m?.setValue(i), m?.layout());
        }
        W();
      }
    }
  }, [
    b,
    P,
    i,
    r,
    o,
    l,
    s,
    a,
    c,
    f,
    v,
    m,
    B
  ];
}
class ei extends te {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>:host{display:contents !important}</style>", se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      hr,
      dr,
      re,
      {
        value: 2,
        previous: 3,
        language: 4,
        theme: 5,
        readonly: 6,
        minimap: 7,
        schema: 8,
        variant: 9
      },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-code-editor", ei);
const br = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ei
}, Symbol.toStringTag, { value: "Module" }));
function Bt(t) {
  let e, n;
  return {
    c() {
      e = _("h2"), n = K(t[1]), u(e, "class", "text-sm");
    },
    m(i, r) {
      A(i, e, r), w(e, n);
    },
    p(i, r) {
      r & 2 && Z(n, i[1]);
    },
    d(i) {
      i && V(e);
    }
  };
}
function mr(t) {
  let e, n, i, r, o, l, s, a, c, f, h, d, p, b, v, m, y, k = t[1] && Bt(t);
  return {
    c() {
      e = _("div"), n = _("div"), i = _("div"), k && k.c(), r = X(), o = _("slot"), l = X(), s = _("div"), a = _("slot"), c = X(), f = _("v-icon"), d = X(), p = _("div"), b = _("slot"), this.c = L, u(o, "name", "title"), u(i, "class", "flex items-center gap-2"), u(a, "name", "header"), q(f, "class", h = F("transition-transform duration-200", {
        "rotate-0": !t[0],
        "rotate-180": t[0]
      })), q(f, "name", "chevron-down"), q(f, "size", "2xl"), u(s, "class", "h-full flex items-center gap-3"), u(n, "class", "w-full py-1.5 px-4 flex items-center justify-between border text-black border-black bg-white cursor-pointer"), u(p, "class", v = F("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !t[0],
        "max-h-fit": t[0]
      })), u(e, "class", "relative w-full overflow-hidden");
    },
    m(T, x) {
      A(T, e, x), w(e, n), w(n, i), k && k.m(i, null), w(i, r), w(i, o), w(n, l), w(n, s), w(s, a), w(s, c), w(s, f), w(e, d), w(e, p), w(p, b), t[4](e), m || (y = U(n, "click", t[3]), m = !0);
    },
    p(T, [x]) {
      T[1] ? k ? k.p(T, x) : (k = Bt(T), k.c(), k.m(i, r)) : k && (k.d(1), k = null), x & 1 && h !== (h = F("transition-transform duration-200", {
        "rotate-0": !T[0],
        "rotate-180": T[0]
      })) && q(f, "class", h), x & 1 && v !== (v = F("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !T[0],
        "max-h-fit": T[0]
      })) && u(p, "class", v);
    },
    i: L,
    o: L,
    d(T) {
      T && V(e), k && k.d(), t[4](null), m = !1, y();
    }
  };
}
function pr(t, e, n) {
  let { title: i = "" } = e, { open: r = !1 } = e, o;
  fe();
  const l = (a) => {
    a.target.getAttribute("slot") !== "header" && (n(0, r = !r), ce(o, "toggle", { open: r }));
  };
  function s(a) {
    be[a ? "unshift" : "push"](() => {
      o = a, n(2, o);
    });
  }
  return t.$$set = (a) => {
    "title" in a && n(1, i = a.title), "open" in a && n(0, r = a.open);
  }, [r, i, o, l, s];
}
class ti extends te {
  constructor(e) {
    super(), se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      pr,
      mr,
      re,
      { title: 1, open: 0 },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-collapse", ti);
const gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ti
}, Symbol.toStringTag, { value: "Module" }));
function wr(t) {
  let e, n, i, r, o, l, s, a;
  return {
    c() {
      e = _("div"), n = _("div"), n.innerHTML = '<slot name="target"></slot>', i = X(), r = _("div"), o = _("slot"), this.c = L, u(n, "class", "inline-block w-full"), u(o, "name", "content"), u(r, "class", l = F("absolute z-40", {
        "left-0": t[1],
        "right-0": t[1],
        "overflow-hidden": t[1],
        invisible: !t[2]
      })), u(e, "class", "relative inline-block w-full");
    },
    m(c, f) {
      A(c, e, f), w(e, n), w(e, i), w(e, r), w(r, o), t[6](e), s || (a = U(n, "click", t[3]), s = !0);
    },
    p(c, [f]) {
      f & 6 && l !== (l = F("absolute z-40", {
        "left-0": c[1],
        "right-0": c[1],
        "overflow-hidden": c[1],
        invisible: !c[2]
      })) && u(r, "class", l);
    },
    i: L,
    o: L,
    d(c) {
      c && V(e), t[6](null), s = !1, a();
    }
  };
}
function yr(t, e, n) {
  let { open: i = "false" } = e, { match: r = "false" } = e, o, l, s;
  fe();
  const a = () => {
    ce(o, "toggle", { open: !s });
  };
  function c(f) {
    be[f ? "unshift" : "push"](() => {
      o = f, n(0, o);
    });
  }
  return t.$$set = (f) => {
    "open" in f && n(4, i = f.open), "match" in f && n(5, r = f.match);
  }, t.$$.update = () => {
    t.$$.dirty & 32 && n(1, l = we(r, "match")), t.$$.dirty & 16 && n(2, s = we(i, "open"));
  }, [o, l, s, a, i, r, c];
}
class ni extends te {
  constructor(e) {
    super(), se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      yr,
      wr,
      re,
      { open: 4, match: 5 },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-dropdown", ni);
const vr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ni
}, Symbol.toStringTag, { value: "Module" }));
function _r(t) {
  let e, n;
  return {
    c() {
      e = _("i"), this.c = L, u(e, "aria-hidden", "true"), u(e, "class", n = F(`icon-${t[0]} block`, {
        "text-xs": t[1] === "xs",
        "text-sm": t[1] === "sm",
        "text-base": t[1] === "base",
        "text-lg": t[1] === "lg",
        "text-xl": t[1] === "xl",
        "text-2xl": t[1] === "2xl",
        "text-3xl": t[1] === "3xl",
        "text-4xl": t[1] === "4xl"
      }));
    },
    m(i, r) {
      A(i, e, r);
    },
    p(i, [r]) {
      r & 3 && n !== (n = F(`icon-${i[0]} block`, {
        "text-xs": i[1] === "xs",
        "text-sm": i[1] === "sm",
        "text-base": i[1] === "base",
        "text-lg": i[1] === "lg",
        "text-xl": i[1] === "xl",
        "text-2xl": i[1] === "2xl",
        "text-3xl": i[1] === "3xl",
        "text-4xl": i[1] === "4xl"
      })) && u(e, "class", n);
    },
    i: L,
    o: L,
    d(i) {
      i && V(e);
    }
  };
}
function kr(t, e, n) {
  let { name: i = "" } = e, { size: r = "base" } = e;
  return fe(), t.$$set = (o) => {
    "name" in o && n(0, i = o.name), "size" in o && n(1, r = o.size);
  }, [i, r];
}
class ii extends te {
  constructor(e) {
    super(), se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      kr,
      _r,
      re,
      { name: 0, size: 1 },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-icon", ii);
const xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ii
}, Symbol.toStringTag, { value: "Module" }));
function Er(t) {
  let e;
  return {
    c() {
      e = _("v-code-editor"), this.c = L, q(e, "value", t[2]), q(e, "theme", t[0]), q(e, "schema", t[1]), q(e, "minimap", t[3]), q(e, "language", "json");
    },
    m(n, i) {
      A(n, e, i);
    },
    p(n, [i]) {
      i & 4 && q(e, "value", n[2]), i & 1 && q(e, "theme", n[0]), i & 2 && q(e, "schema", n[1]), i & 8 && q(e, "minimap", n[3]);
    },
    i: L,
    o: L,
    d(n) {
      n && V(e);
    }
  };
}
function Mr(t, e, n) {
  let { theme: i = "vs" } = e, { schema: r = "" } = e, { value: o } = e, { minimap: l } = e;
  return t.$$set = (s) => {
    "theme" in s && n(0, i = s.theme), "schema" in s && n(1, r = s.schema), "value" in s && n(2, o = s.value), "minimap" in s && n(3, l = s.minimap);
  }, [i, r, o, l];
}
class ri extends te {
  constructor(e) {
    super(), se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      Mr,
      Er,
      re,
      {
        theme: 0,
        schema: 1,
        value: 2,
        minimap: 3
      },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-json-editor", ri);
const Sr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ri
}, Symbol.toStringTag, { value: "Module" }));
function Xt(t) {
  let e, n, i;
  return {
    c() {
      e = _("p"), n = K(t[3]), u(e, "class", i = F("text-xs capitalize", {
        "inline whitespace-nowrap": t[6] === "left",
        "opacity-50 pointer-events-none": t[13]
      }));
    },
    m(r, o) {
      A(r, e, o), w(e, n);
    },
    p(r, o) {
      o & 8 && Z(n, r[3]), o & 8256 && i !== (i = F("text-xs capitalize", {
        "inline whitespace-nowrap": r[6] === "left",
        "opacity-50 pointer-events-none": r[13]
      })) && u(e, "class", i);
    },
    d(r) {
      r && V(e);
    }
  };
}
function Ut(t) {
  let e, n, i;
  return {
    c() {
      e = _("v-tooltip"), n = _("div"), u(n, "class", i = F({
        "icon-info-outline": t[8] === "info",
        "icon-error-outline text-orange-400": t[8] === "warn",
        "icon-error-outline text-red-600": t[8] === "error"
      })), q(e, "text", t[7]);
    },
    m(r, o) {
      A(r, e, o), w(e, n);
    },
    p(r, o) {
      o & 256 && i !== (i = F({
        "icon-info-outline": r[8] === "info",
        "icon-error-outline text-orange-400": r[8] === "warn",
        "icon-error-outline text-red-600": r[8] === "error"
      })) && u(n, "class", i), o & 128 && q(e, "text", r[7]);
    },
    d(r) {
      r && V(e);
    }
  };
}
function qt(t) {
  let e, n, i, r, o, l, s, a;
  return {
    c() {
      e = _("div"), n = _("button"), r = X(), o = _("button"), u(n, "aria-label", i = "Increment up by " + t[14]), u(n, "class", "icon-chevron-down rotate-180 text-[15px]"), u(o, "aria-label", l = "Increment down by " + t[14]), u(o, "class", "icon-chevron-down text-[15px]"), u(e, "class", "absolute right-0.5 bottom-0 cursor-pointer select-none flex flex-col");
    },
    m(c, f) {
      A(c, e, f), w(e, n), w(e, r), w(e, o), s || (a = [
        U(n, "click", t[21]),
        U(o, "click", t[22])
      ], s = !0);
    },
    p(c, f) {
      f & 16384 && i !== (i = "Increment up by " + c[14]) && u(n, "aria-label", i), f & 16384 && l !== (l = "Increment down by " + c[14]) && u(o, "aria-label", l);
    },
    d(c) {
      c && V(e), s = !1, pe(a);
    }
  };
}
function Kt(t) {
  let e, n, i;
  return {
    c() {
      e = _("span"), n = K(t[9]), u(e, "class", i = F("text-xs", {
        "text-red-600": t[8] === "error"
      }));
    },
    m(r, o) {
      A(r, e, o), w(e, n);
    },
    p(r, o) {
      o & 512 && Z(n, r[9]), o & 256 && i !== (i = F("text-xs", {
        "text-red-600": r[8] === "error"
      })) && u(e, "class", i);
    },
    d(r) {
      r && V(e);
    }
  };
}
function Ar(t) {
  let e, n, i, r, o, l, s, a, c, f, h, d, p, b, v, m = t[3] && Xt(t), y = t[7] && Ut(t), k = (t[1] === "number" || t[1] === "integer") && qt(t), T = t[9] && Kt(t);
  return {
    c() {
      e = _("label"), n = _("div"), m && m.c(), i = X(), y && y.c(), r = X(), o = _("input"), h = X(), k && k.c(), d = X(), T && T.c(), this.c = L, u(n, "class", "flex items-center gap-1.5"), u(o, "type", l = t[1] === "integer" ? "number" : t[1]), u(o, "placeholder", t[2]), u(o, "name", t[5]), o.value = t[0], u(o, "pattern", s = t[1] === "integer" ? "[0-9]*" : void 0), o.readOnly = a = t[12] || t[13], u(o, "aria-disabled", t[13]), u(o, "class", c = F("w-full py-1.5 px-2.5 leading-tight text-xs h-[30px] border border-black outline-none appearance-none", {
        "bg-white": !t[13],
        "opacity-50 pointer-events-none bg-gray-200": t[13],
        "border-red-600 border": t[8] === "error"
      })), u(o, "step", f = t[15] ? t[4] : null), u(e, "class", p = F("relative flex gap-1 min-w-[6rem] w-full", {
        "flex-col": t[6] === "top",
        "items-center": t[6] === "left"
      }));
    },
    m(x, C) {
      A(x, e, C), w(e, n), m && m.m(n, null), w(n, i), y && y.m(n, null), w(e, r), w(e, o), t[20](o), w(e, h), k && k.m(e, null), w(e, d), T && T.m(e, null), t[23](e), b || (v = U(o, "input", t[16]), b = !0);
    },
    p(x, [C]) {
      x[3] ? m ? m.p(x, C) : (m = Xt(x), m.c(), m.m(n, i)) : m && (m.d(1), m = null), x[7] ? y ? y.p(x, C) : (y = Ut(x), y.c(), y.m(n, null)) : y && (y.d(1), y = null), C & 2 && l !== (l = x[1] === "integer" ? "number" : x[1]) && u(o, "type", l), C & 4 && u(o, "placeholder", x[2]), C & 32 && u(o, "name", x[5]), C & 1 && o.value !== x[0] && (o.value = x[0]), C & 2 && s !== (s = x[1] === "integer" ? "[0-9]*" : void 0) && u(o, "pattern", s), C & 12288 && a !== (a = x[12] || x[13]) && (o.readOnly = a), C & 8192 && u(o, "aria-disabled", x[13]), C & 8448 && c !== (c = F("w-full py-1.5 px-2.5 leading-tight text-xs h-[30px] border border-black outline-none appearance-none", {
        "bg-white": !x[13],
        "opacity-50 pointer-events-none bg-gray-200": x[13],
        "border-red-600 border": x[8] === "error"
      })) && u(o, "class", c), C & 32784 && f !== (f = x[15] ? x[4] : null) && u(o, "step", f), x[1] === "number" || x[1] === "integer" ? k ? k.p(x, C) : (k = qt(x), k.c(), k.m(e, d)) : k && (k.d(1), k = null), x[9] ? T ? T.p(x, C) : (T = Kt(x), T.c(), T.m(e, null)) : T && (T.d(1), T = null), C & 64 && p !== (p = F("relative flex gap-1 min-w-[6rem] w-full", {
        "flex-col": x[6] === "top",
        "items-center": x[6] === "left"
      })) && u(e, "class", p);
    },
    i: L,
    o: L,
    d(x) {
      x && V(e), m && m.d(), y && y.d(), t[20](null), k && k.d(), T && T.d(), t[23](null), b = !1, v();
    }
  };
}
function Or(t, e, n) {
  const r = De().attachInternals();
  let { type: o = "text" } = e, { placeholder: l = "" } = e, { readonly: s = "false" } = e, { disabled: a = "false" } = e, { label: c = "" } = e, { value: f = "" } = e, { step: h = "1" } = e, { name: d = "" } = e, { labelposition: p = "top" } = e, { tooltip: b = "" } = e, { state: v = "info" } = e, { message: m } = e, y, k, T, x, C, P, j;
  fe();
  const I = (D) => {
    D.preventDefault(), D.stopImmediatePropagation(), n(0, f = k.value), r.setFormValue(f), ce(y, "input", { value: f });
  }, R = (D) => {
    const ue = Number.parseFloat(f || "0"), he = String(f).split(".").pop()?.length ?? 0;
    o === "number" ? n(0, f = n(11, k.value = (ue + P * D).toFixed(Math.max(T, he)), k)) : o === "integer" && n(0, f = n(11, k.value = String(Math.round(ue + P * D)), k)), r.setFormValue(f), ce(y, "input", { value: f });
  };
  function Y(D) {
    be[D ? "unshift" : "push"](() => {
      k = D, n(11, k);
    });
  }
  const W = () => R(1), B = () => R(-1);
  function N(D) {
    be[D ? "unshift" : "push"](() => {
      y = D, n(10, y);
    });
  }
  return t.$$set = (D) => {
    "type" in D && n(1, o = D.type), "placeholder" in D && n(2, l = D.placeholder), "readonly" in D && n(18, s = D.readonly), "disabled" in D && n(19, a = D.disabled), "label" in D && n(3, c = D.label), "value" in D && n(0, f = D.value), "step" in D && n(4, h = D.step), "name" in D && n(5, d = D.name), "labelposition" in D && n(6, p = D.labelposition), "tooltip" in D && n(7, b = D.tooltip), "state" in D && n(8, v = D.state), "message" in D && n(9, m = D.message);
  }, t.$$.update = () => {
    t.$$.dirty & 16 && (T = String(h).split(".").pop()?.length ?? 0), t.$$.dirty & 262144 && n(12, x = we(s, "readonly")), t.$$.dirty & 524288 && n(13, C = we(a, "disabled")), t.$$.dirty & 16 && n(14, P = Number.parseFloat(h)), t.$$.dirty & 2 && n(15, j = o === "time" || o === "number");
  }, [
    f,
    o,
    l,
    c,
    h,
    d,
    p,
    b,
    v,
    m,
    y,
    k,
    x,
    C,
    P,
    j,
    I,
    R,
    s,
    a,
    Y,
    W,
    B,
    N
  ];
}
class Cr extends te {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}</style>", se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      Or,
      Ar,
      re,
      {
        type: 1,
        placeholder: 2,
        readonly: 18,
        disabled: 19,
        label: 3,
        value: 0,
        step: 4,
        name: 5,
        labelposition: 6,
        tooltip: 7,
        state: 8,
        message: 9
      },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
      "tooltip",
      "state",
      "message"
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
    return this.$$.ctx[18];
  }
  set readonly(e) {
    this.$$set({ readonly: e }), E();
  }
  get disabled() {
    return this.$$.ctx[19];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), E();
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
  get tooltip() {
    return this.$$.ctx[7];
  }
  set tooltip(e) {
    this.$$set({ tooltip: e }), E();
  }
  get state() {
    return this.$$.ctx[8];
  }
  set state(e) {
    this.$$set({ state: e }), E();
  }
  get message() {
    return this.$$.ctx[9];
  }
  set message(e) {
    this.$$set({ message: e }), E();
  }
}
customElements.define("v-input-internal", Cr);
class Tr extends customElements.get("v-input-internal") {
  static formAssociated = !0;
}
customElements.define("v-input", Tr);
const zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function Rr(t) {
  let e;
  return {
    c() {
      e = _("v-icon"), q(e, "class", "mt-0.5 text-green/90"), q(e, "name", "checkmark");
    },
    m(n, i) {
      A(n, e, i);
    },
    d(n) {
      n && V(e);
    }
  };
}
function Pr(t) {
  let e;
  return {
    c() {
      e = _("v-icon"), q(e, "class", "mt-0.5 text-blue/90"), q(e, "name", "info-outline");
    },
    m(n, i) {
      A(n, e, i);
    },
    d(n) {
      n && V(e);
    }
  };
}
function jr(t) {
  let e;
  return {
    c() {
      e = _("v-icon"), q(e, "class", "mt-0.5 text-red/90"), q(e, "name", "error-outline");
    },
    m(n, i) {
      A(n, e, i);
    },
    d(n) {
      n && V(e);
    }
  };
}
function Jt(t) {
  let e, n;
  return {
    c() {
      e = Ct("svg"), n = Ct("path"), u(n, "d", "M8 2.99333L13.02 11.6667H2.98L8 2.99333ZM8 0.333328L0.666672 13H15.3333L8 0.333328ZM8.66667 9.66666H7.33334V11H8.66667V9.66666ZM8.66667 5.66666H7.33334V8.33333H8.66667V5.66666Z"), u(n, "fill", "#FF9900"), u(e, "width", "14"), u(e, "height", "14"), u(e, "viewBox", "0 0 15 15"), u(e, "fill", "none"), u(e, "class", "mt-1");
    },
    m(i, r) {
      A(i, e, r), w(e, n);
    },
    d(i) {
      i && V(e);
    }
  };
}
function Zt(t) {
  let e, n;
  return {
    c() {
      e = _("p"), n = K(t[1]), u(e, "class", "text-xs");
    },
    m(i, r) {
      A(i, e, r), w(e, n);
    },
    p(i, r) {
      r & 2 && Z(n, i[1]);
    },
    d(i) {
      i && V(e);
    }
  };
}
function Lr(t) {
  let e, n, i, r, o, l, s, a, c, f;
  function h(m, y) {
    if (m[2] === "error")
      return jr;
    if (m[2] === "info")
      return Pr;
    if (m[2] === "success")
      return Rr;
  }
  let d = h(t), p = d && d(t), b = t[2] === "warning" && Jt(), v = t[1] && Zt(t);
  return {
    c() {
      e = _("div"), p && p.c(), n = X(), b && b.c(), i = X(), r = _("figure"), o = _("figcaption"), l = K(t[0]), s = X(), v && v.c(), a = X(), c = _("slot"), this.c = L, u(o, "class", "text-sm"), u(e, "class", f = F("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": t[3] === "gray",
        "bg-white": t[3] === "white",
        "border-red/90": t[2] === "error",
        "border-orange/90": t[2] === "warning",
        "border-green/90": t[2] === "success",
        "border-blue/90": t[2] === "info"
      }));
    },
    m(m, y) {
      A(m, e, y), p && p.m(e, null), w(e, n), b && b.m(e, null), w(e, i), w(e, r), w(r, o), w(o, l), w(r, s), v && v.m(r, null), w(r, a), w(r, c);
    },
    p(m, [y]) {
      d !== (d = h(m)) && (p && p.d(1), p = d && d(m), p && (p.c(), p.m(e, n))), m[2] === "warning" ? b || (b = Jt(), b.c(), b.m(e, i)) : b && (b.d(1), b = null), y & 1 && Z(l, m[0]), m[1] ? v ? v.p(m, y) : (v = Zt(m), v.c(), v.m(r, a)) : v && (v.d(1), v = null), y & 12 && f !== (f = F("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": m[3] === "gray",
        "bg-white": m[3] === "white",
        "border-red/90": m[2] === "error",
        "border-orange/90": m[2] === "warning",
        "border-green/90": m[2] === "success",
        "border-blue/90": m[2] === "info"
      })) && u(e, "class", f);
    },
    i: L,
    o: L,
    d(m) {
      m && V(e), p && p.d(), b && b.d(), v && v.d();
    }
  };
}
function Ir(t, e, n) {
  let { title: i = "" } = e, { message: r = "" } = e, { variant: o = "info" } = e, { background: l = "gray" } = e;
  return fe(), t.$$set = (s) => {
    "title" in s && n(0, i = s.title), "message" in s && n(1, r = s.message), "variant" in s && n(2, o = s.variant), "background" in s && n(3, l = s.background);
  }, [i, r, o, l];
}
class oi extends te {
  constructor(e) {
    super(), se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      Ir,
      Lr,
      re,
      {
        title: 0,
        message: 1,
        variant: 2,
        background: 3
      },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-notify", oi);
const Nr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: oi
}, Symbol.toStringTag, { value: "Module" }));
function Gt(t) {
  let e, n;
  return {
    c() {
      e = _("p"), n = K(t[1]), u(e, "class", "mb-8 text-base");
    },
    m(i, r) {
      A(i, e, r), w(e, n);
    },
    p(i, r) {
      r & 2 && Z(n, i[1]);
    },
    d(i) {
      i && V(e);
    }
  };
}
function Vr(t) {
  let e, n, i, r, o, l, s, a, c, f, h, d, p, b, v, m = t[1] && Gt(t);
  return {
    c() {
      e = _("div"), n = _("div"), i = _("button"), i.innerHTML = '<v-icon name="x" size="2xl"></v-icon>', r = X(), o = _("figure"), l = _("figcaption"), s = K(t[0]), a = X(), m && m.c(), c = X(), f = _("slot"), h = X(), d = _("div"), d.innerHTML = '<slot name="action"></slot>', this.c = L, u(i, "class", "absolute right-0 top-0 p-3 hover:scale-110 transition-transform text-gray-500 hover:text-black"), u(i, "aria-label", "Cancel"), u(l, "class", "mb-2 pr-12 text-2xl font-bold"), u(d, "class", "flex flex-row-reverse"), u(n, "class", "min-w-[400px] relative border border-black bg-white m-2 p-4 max-w-lg shadow-solid4"), u(e, "class", p = F("z-50 bg-gray-300 bg-opacity-25 w-full h-full fixed top-0 left-0 p-10 flex justify-center items-center", { invisible: !t[2] }));
    },
    m(y, k) {
      A(y, e, k), w(e, n), w(n, i), w(n, r), w(n, o), w(o, l), w(l, s), w(o, a), m && m.m(o, null), w(o, c), w(o, f), w(o, h), w(o, d), b || (v = [
        U(i, "click", t[3]),
        U(n, "click", Ue(t[5])),
        U(e, "click", t[3])
      ], b = !0);
    },
    p(y, [k]) {
      k & 1 && Z(s, y[0]), y[1] ? m ? m.p(y, k) : (m = Gt(y), m.c(), m.m(o, c)) : m && (m.d(1), m = null), k & 4 && p !== (p = F("z-50 bg-gray-300 bg-opacity-25 w-full h-full fixed top-0 left-0 p-10 flex justify-center items-center", { invisible: !y[2] })) && u(e, "class", p);
    },
    i: L,
    o: L,
    d(y) {
      y && V(e), m && m.d(), b = !1, pe(v);
    }
  };
}
function Fr(t, e, n) {
  let { title: i = "" } = e, { message: r = "" } = e, { open: o = "false" } = e, l;
  const s = (c) => {
    ce(c.currentTarget, "close");
  };
  fe();
  function a(c) {
    nt.call(this, t, c);
  }
  return t.$$set = (c) => {
    "title" in c && n(0, i = c.title), "message" in c && n(1, r = c.message), "open" in c && n(4, o = c.open);
  }, t.$$.update = () => {
    t.$$.dirty & 16 && n(2, l = we(o, "open"));
  }, [i, r, l, s, o, a];
}
class si extends te {
  constructor(e) {
    super(), se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      Fr,
      Vr,
      re,
      { title: 0, message: 1, open: 4 },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["title", "message", "open"];
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
  get open() {
    return this.$$.ctx[4];
  }
  set open(e) {
    this.$$set({ open: e }), E();
  }
}
customElements.define("v-modal", si);
const Dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: si
}, Symbol.toStringTag, { value: "Module" }));
function Qt(t, e, n) {
  const i = t.slice();
  return i[11] = e[n], i;
}
function $t(t) {
  let e, n, i;
  return {
    c() {
      e = _("p"), n = K(t[1]), u(e, "class", i = F("text-xs", {
        inline: t[2] === "left"
      }));
    },
    m(r, o) {
      A(r, e, o), w(e, n);
    },
    p(r, o) {
      o & 2 && Z(n, r[1]), o & 4 && i !== (i = F("text-xs", {
        inline: r[2] === "left"
      })) && u(e, "class", i);
    },
    d(r) {
      r && V(e);
    }
  };
}
function en(t) {
  let e, n, i;
  return {
    c() {
      e = _("v-tooltip"), n = _("div"), u(n, "class", i = F({
        "icon-info-outline": t[4] === "info",
        "icon-error-outline text-orange-400": t[4] === "warn",
        "icon-error-outline text-red-600": t[4] === "error"
      })), q(e, "text", t[3]);
    },
    m(r, o) {
      A(r, e, o), w(e, n);
    },
    p(r, o) {
      o & 16 && i !== (i = F({
        "icon-info-outline": r[4] === "info",
        "icon-error-outline text-orange-400": r[4] === "warn",
        "icon-error-outline text-red-600": r[4] === "error"
      })) && u(n, "class", i), o & 8 && q(e, "text", r[3]);
    },
    d(r) {
      r && V(e);
    }
  };
}
function tn(t) {
  let e, n = t[11] + "", i, r, o, l, s;
  function a() {
    return t[10](t[11]);
  }
  return {
    c() {
      e = _("button"), i = K(n), r = X(), u(e, "class", o = F("capitalize border-y border-l last:border-r border-black px-2 py-1 text-xs", {
        "bg-white": t[11] !== t[0],
        "bg-black text-white": t[11] === t[0]
      }));
    },
    m(c, f) {
      A(c, e, f), w(e, i), w(e, r), t[9](e), l || (s = U(e, "click", a), l = !0);
    },
    p(c, f) {
      t = c, f & 64 && n !== (n = t[11] + "") && Z(i, n), f & 65 && o !== (o = F("capitalize border-y border-l last:border-r border-black px-2 py-1 text-xs", {
        "bg-white": t[11] !== t[0],
        "bg-black text-white": t[11] === t[0]
      })) && u(e, "class", o);
    },
    d(c) {
      c && V(e), t[9](null), l = !1, s();
    }
  };
}
function Hr(t) {
  let e, n, i, r, o, l = t[1] && $t(t), s = t[3] && en(t), a = t[6], c = [];
  for (let f = 0; f < a.length; f += 1)
    c[f] = tn(Qt(t, a, f));
  return {
    c() {
      e = _("label"), n = _("div"), l && l.c(), i = X(), s && s.c(), o = X();
      for (let f = 0; f < c.length; f += 1)
        c[f].c();
      this.c = L, u(n, "class", r = F("flex items-center gap-1.5", {
        "pb-1": t[2] === "top"
      }));
    },
    m(f, h) {
      A(f, e, h), w(e, n), l && l.m(n, null), w(n, i), s && s.m(n, null), w(e, o);
      for (let d = 0; d < c.length; d += 1)
        c[d].m(e, null);
    },
    p(f, [h]) {
      if (f[1] ? l ? l.p(f, h) : (l = $t(f), l.c(), l.m(n, i)) : l && (l.d(1), l = null), f[3] ? s ? s.p(f, h) : (s = en(f), s.c(), s.m(n, null)) : s && (s.d(1), s = null), h & 4 && r !== (r = F("flex items-center gap-1.5", {
        "pb-1": f[2] === "top"
      })) && u(n, "class", r), h & 225) {
        a = f[6];
        let d;
        for (d = 0; d < a.length; d += 1) {
          const p = Qt(f, a, d);
          c[d] ? c[d].p(p, h) : (c[d] = tn(p), c[d].c(), c[d].m(e, null));
        }
        for (; d < c.length; d += 1)
          c[d].d(1);
        c.length = a.length;
      }
    },
    i: L,
    o: L,
    d(f) {
      f && V(e), l && l.d(), s && s.d(), Fe(c, f);
    }
  };
}
function Wr(t, e, n) {
  let { label: i = "" } = e, { options: r = "" } = e, { selected: o = "" } = e, { labelposition: l = "top" } = e, { tooltip: s = "" } = e, { state: a = "info" } = e;
  fe();
  let c, f;
  const h = (b) => {
    n(0, o = b), ce(c, "input", { value: b });
  };
  function d(b) {
    be[b ? "unshift" : "push"](() => {
      c = b, n(5, c);
    });
  }
  const p = (b) => h(b);
  return t.$$set = (b) => {
    "label" in b && n(1, i = b.label), "options" in b && n(8, r = b.options), "selected" in b && n(0, o = b.selected), "labelposition" in b && n(2, l = b.labelposition), "tooltip" in b && n(3, s = b.tooltip), "state" in b && n(4, a = b.state);
  }, t.$$.update = () => {
    t.$$.dirty & 256 && n(6, f = r.split(",").map((b) => b.trim()));
  }, [
    o,
    i,
    l,
    s,
    a,
    c,
    f,
    h,
    r,
    d,
    p
  ];
}
class li extends te {
  constructor(e) {
    super(), se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      Wr,
      Hr,
      re,
      {
        label: 1,
        options: 8,
        selected: 0,
        labelposition: 2,
        tooltip: 3,
        state: 4
      },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["label", "options", "selected", "labelposition", "tooltip", "state"];
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), E();
  }
  get options() {
    return this.$$.ctx[8];
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
  get tooltip() {
    return this.$$.ctx[3];
  }
  set tooltip(e) {
    this.$$set({ tooltip: e }), E();
  }
  get state() {
    return this.$$.ctx[4];
  }
  set state(e) {
    this.$$set({ state: e }), E();
  }
}
customElements.define("v-radio", li);
const Yr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: li
}, Symbol.toStringTag, { value: "Module" })), Br = (t, e) => {
  const n = {}, i = new RegExp(`^${e}`, "i"), r = new RegExp(e, "gi");
  for (const l of t) {
    let s = -1;
    const a = l.split(" ");
    for (let c = 0; c < a.length; c++) {
      const f = a[c];
      f.match(i) ? s = 0 : f.match(r) && (s = c + 1);
    }
    n[s] ? n[s].push(l) : n[s] = [l];
  }
  const o = [];
  for (const l of Object.keys(n)) {
    const s = n[l] || [];
    o.push(...s);
  }
  return o;
}, Xr = (t) => {
  const { top: e, bottom: n } = t.getBoundingClientRect(), i = t.parentElement.getBoundingClientRect();
  return n < i.bottom && e > i.top;
}, nn = (t, e) => t.includes(e), rn = (t, e) => {
  if (!e)
    return t.map((r) => ({ search: void 0, option: r }));
  const n = [], i = [];
  for (const r of t) {
    const o = r.match(new RegExp(e, "i"));
    if (o?.index !== void 0) {
      const l = r.slice(0, o.index), s = r.slice(o.index, o.index + e.length), a = r.slice(o.index + e.length);
      n.push({
        search: [l, s, a],
        option: r
      });
    } else
      i.push({
        search: void 0,
        option: r
      });
  }
  return n.sort((r, o) => r.option.indexOf(r.search[1]) < o.option.indexOf(o.search[1]) ? -1 : 1), [...n, ...i];
};
function on(t, e, n) {
  const i = t.slice();
  return i[53] = e[n].search, i[54] = e[n].option, i[56] = n, i;
}
function sn(t, e, n) {
  const i = t.slice();
  return i[63] = e[n], i[65] = n, i;
}
function ln(t, e, n) {
  const i = t.slice();
  return i[57] = e[n], i[59] = n, i;
}
function an(t, e, n) {
  const i = t.slice();
  return i[60] = e[n], i;
}
function cn(t, e, n) {
  const i = t.slice();
  return i[54] = e[n], i;
}
function fn(t) {
  let e, n, i;
  return {
    c() {
      e = _("p"), n = K(t[2]), u(e, "class", i = F("text-xs capitalize", {
        "opacity-50 pointer-events-none": t[13],
        "inline whitespace-nowrap": t[3] === "left"
      }));
    },
    m(r, o) {
      A(r, e, o), w(e, n);
    },
    p(r, o) {
      o[0] & 4 && Z(n, r[2]), o[0] & 8200 && i !== (i = F("text-xs capitalize", {
        "opacity-50 pointer-events-none": r[13],
        "inline whitespace-nowrap": r[3] === "left"
      })) && u(e, "class", i);
    },
    d(r) {
      r && V(e);
    }
  };
}
function un(t) {
  let e, n, i;
  return {
    c() {
      e = _("v-tooltip"), n = _("div"), u(n, "class", i = F({
        "icon-info-outline": t[5] === "info",
        "icon-error-outline text-orange-400": t[5] === "warn",
        "icon-error-outline text-red-600": t[5] === "error"
      })), q(e, "text", t[4]);
    },
    m(r, o) {
      A(r, e, o), w(e, n);
    },
    p(r, o) {
      o[0] & 32 && i !== (i = F({
        "icon-info-outline": r[5] === "info",
        "icon-error-outline text-orange-400": r[5] === "warn",
        "icon-error-outline text-red-600": r[5] === "error"
      })) && u(n, "class", i), o[0] & 16 && q(e, "text", r[4]);
    },
    d(r) {
      r && V(e);
    }
  };
}
function dn(t) {
  let e, n = [], i = /* @__PURE__ */ new Map(), r = t[15];
  const o = (l) => l[54];
  for (let l = 0; l < r.length; l += 1) {
    let s = cn(t, r, l), a = o(s);
    i.set(a, n[l] = hn(a, s));
  }
  return {
    c() {
      e = _("div");
      for (let l = 0; l < n.length; l += 1)
        n[l].c();
      u(e, "class", "flex flex-wrap gap-2 p-1");
    },
    m(l, s) {
      A(l, e, s);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
    },
    p(l, s) {
      s[0] & 33587200 && (r = l[15], n = Ge(n, s, o, 1, l, r, i, e, Ze, hn, null, cn));
    },
    d(l) {
      l && V(e);
      for (let s = 0; s < n.length; s += 1)
        n[s].d();
    }
  };
}
function hn(t, e) {
  let n, i, r = e[54] + "", o, l, s, a, c, f;
  function h() {
    return e[41](e[54]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = _("div"), i = _("span"), o = K(r), l = X(), s = _("v-icon"), a = X(), q(s, "name", "x"), u(n, "class", "flex cursor-pointer items-center gap-1 rounded-xl bg-[#C4C4C4] py-0.5 px-2 text-[10px] hover:bg-gray-300"), this.first = n;
    },
    m(d, p) {
      A(d, n, p), w(n, i), w(i, o), w(n, l), w(n, s), w(n, a), c || (f = U(n, "click", h), c = !0);
    },
    p(d, p) {
      e = d, p[0] & 32768 && r !== (r = e[54] + "") && Z(o, r);
    },
    d(d) {
      d && V(n), c = !1, f();
    }
  };
}
function Ur(t) {
  let e;
  return {
    c() {
      e = _("div"), e.textContent = "No matching results", u(e, "class", "flex py-1.5 px-2.5 justify-center text-xs");
    },
    m(n, i) {
      A(n, e, i);
    },
    p: L,
    d(n) {
      n && V(e);
    }
  };
}
function qr(t) {
  let e, n = [], i = /* @__PURE__ */ new Map(), r, o, l, s = t[16];
  const a = (f) => f[54];
  for (let f = 0; f < s.length; f += 1) {
    let h = on(t, s, f), d = a(h);
    i.set(d, n[f] = gn(d, h));
  }
  let c = t[6] && wn(t);
  return {
    c() {
      e = _("div");
      for (let f = 0; f < n.length; f += 1)
        n[f].c();
      r = X(), c && c.c(), u(e, "class", "options-container flex max-h-36 flex-col overflow-y-auto");
    },
    m(f, h) {
      A(f, e, h);
      for (let d = 0; d < n.length; d += 1)
        n[d].m(e, null);
      w(e, r), c && c.m(e, null), t[43](e), o || (l = U(e, "mouseleave", t[21]), o = !0);
    },
    p(f, h) {
      h[0] & 738410561 && (s = f[16], n = Ge(n, h, a, 1, f, s, i, e, Ze, gn, r, on)), f[6] ? c ? c.p(f, h) : (c = wn(f), c.c(), c.m(e, null)) : c && (c.d(1), c = null);
    },
    d(f) {
      f && V(e);
      for (let h = 0; h < n.length; h += 1)
        n[h].d();
      c && c.d(), t[43](null), o = !1, l();
    }
  };
}
function Kr(t) {
  let e = t[54] + "", n;
  return {
    c() {
      n = K(e);
    },
    m(i, r) {
      A(i, n, r);
    },
    p(i, r) {
      r[0] & 65536 && e !== (e = i[54] + "") && Z(n, e);
    },
    d(i) {
      i && V(n);
    }
  };
}
function Jr(t) {
  let e = [], n = /* @__PURE__ */ new Map(), i, r = t[29](t[54]);
  const o = (l) => l[63];
  for (let l = 0; l < r.length; l += 1) {
    let s = sn(t, r, l), a = o(s);
    n.set(a, e[l] = bn(a, s));
  }
  return {
    c() {
      for (let l = 0; l < e.length; l += 1)
        e[l].c();
      i = Je();
    },
    m(l, s) {
      for (let a = 0; a < e.length; a += 1)
        e[a].m(l, s);
      A(l, i, s);
    },
    p(l, s) {
      s[0] & 536936448 && (r = l[29](l[54]), e = Ge(e, s, o, 1, l, r, n, i.parentNode, Ze, bn, i, sn));
    },
    d(l) {
      for (let s = 0; s < e.length; s += 1)
        e[s].d(l);
      l && V(i);
    }
  };
}
function Zr(t) {
  let e, n = t[29](t[54]), i = [];
  for (let r = 0; r < n.length; r += 1)
    i[r] = pn(ln(t, n, r));
  return {
    c() {
      e = _("span");
      for (let r = 0; r < i.length; r += 1)
        i[r].c();
      u(e, "class", "flex w-full gap-2 text-ellipsis whitespace-nowrap");
    },
    m(r, o) {
      A(r, e, o);
      for (let l = 0; l < i.length; l += 1)
        i[l].m(e, null);
    },
    p(r, o) {
      if (o[0] & 536952832) {
        n = r[29](r[54]);
        let l;
        for (l = 0; l < n.length; l += 1) {
          const s = ln(r, n, l);
          i[l] ? i[l].p(s, o) : (i[l] = pn(s), i[l].c(), i[l].m(e, null));
        }
        for (; l < i.length; l += 1)
          i[l].d(1);
        i.length = n.length;
      }
    },
    d(r) {
      r && V(e), Fe(i, r);
    }
  };
}
function bn(t, e) {
  let n, i = e[63] + "", r, o;
  return {
    key: t,
    first: null,
    c() {
      n = _("span"), r = K(i), u(n, "class", o = e[65] === 0 ? "text-gray-800 w-5" : ""), this.first = n;
    },
    m(l, s) {
      A(l, n, s), w(n, r);
    },
    p(l, s) {
      e = l, s[0] & 65536 && i !== (i = e[63] + "") && Z(r, i), s[0] & 65536 && o !== (o = e[65] === 0 ? "text-gray-800 w-5" : "") && u(n, "class", o);
    },
    d(l) {
      l && V(n);
    }
  };
}
function mn(t) {
  let e, n = t[60] + "", i, r;
  return {
    c() {
      e = _("span"), i = K(n), u(e, "class", r = F({
        "bg-yellow-100": t[60] !== " " && typeof t[53][1] == "string" && t[53][1].includes(t[60])
      }));
    },
    m(o, l) {
      A(o, e, l), w(e, i);
    },
    p(o, l) {
      l[0] & 65536 && n !== (n = o[60] + "") && Z(i, n), l[0] & 65536 && r !== (r = F({
        "bg-yellow-100": o[60] !== " " && typeof o[53][1] == "string" && o[53][1].includes(o[60])
      })) && u(e, "class", r);
    },
    d(o) {
      o && V(e);
    }
  };
}
function pn(t) {
  let e, n, i = [...t[57]], r = [];
  for (let o = 0; o < i.length; o += 1)
    r[o] = mn(an(t, i, o));
  return {
    c() {
      e = _("span");
      for (let o = 0; o < r.length; o += 1)
        r[o].c();
      u(e, "class", n = F("inline-block", {
        "w-5 text-gray-800": t[14] && t[59] === 0
      }));
    },
    m(o, l) {
      A(o, e, l);
      for (let s = 0; s < r.length; s += 1)
        r[s].m(e, null);
    },
    p(o, l) {
      if (l[0] & 536936448) {
        i = [...o[57]];
        let s;
        for (s = 0; s < i.length; s += 1) {
          const a = an(o, i, s);
          r[s] ? r[s].p(a, l) : (r[s] = mn(a), r[s].c(), r[s].m(e, null));
        }
        for (; s < r.length; s += 1)
          r[s].d(1);
        r.length = i.length;
      }
      l[0] & 16384 && n !== (n = F("inline-block", {
        "w-5 text-gray-800": o[14] && o[59] === 0
      })) && u(e, "class", n);
    },
    d(o) {
      o && V(e), Fe(r, o);
    }
  };
}
function gn(t, e) {
  let n, i, r, o, l, s, a, c;
  function f(b, v) {
    return b[53] ? Zr : b[14] ? Jr : Kr;
  }
  let h = f(e), d = h(e);
  function p() {
    return e[42](e[56]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = _("label"), i = _("input"), l = X(), d.c(), u(i, "tabindex", "-1"), u(i, "type", "checkbox"), u(i, "class", r = F("bg-black outline-none", e[6] ? "" : "hidden")), i.checked = o = nn(e[0], Array.isArray(e[54]) ? e[54].join("") : e[54]), u(n, "class", s = F("flex w-full gap-2 text-ellipsis whitespace-nowrap px-2 py-1.5 text-xs", {
        "bg-slate-200": e[17] === e[56],
        "text-gray-500": e[14]
      })), this.first = n;
    },
    m(b, v) {
      A(b, n, v), w(n, i), w(n, l), d.m(n, null), a || (c = [
        U(i, "change", function() {
          rt(e[27].bind(null, Array.isArray(e[54]) ? e[54].join("") : e[54])) && e[27].bind(null, Array.isArray(e[54]) ? e[54].join("") : e[54]).apply(this, arguments);
        }),
        U(i, "input", Ue(e[37])),
        U(i, "focus", Ue(Xe(e[38]))),
        U(n, "mouseenter", p)
      ], a = !0);
    },
    p(b, v) {
      e = b, v[0] & 64 && r !== (r = F("bg-black outline-none", e[6] ? "" : "hidden")) && u(i, "class", r), v[0] & 65537 && o !== (o = nn(e[0], Array.isArray(e[54]) ? e[54].join("") : e[54])) && (i.checked = o), h === (h = f(e)) && d ? d.p(e, v) : (d.d(1), d = h(e), d && (d.c(), d.m(n, null))), v[0] & 212992 && s !== (s = F("flex w-full gap-2 text-ellipsis whitespace-nowrap px-2 py-1.5 text-xs", {
        "bg-slate-200": e[17] === e[56],
        "text-gray-500": e[14]
      })) && u(n, "class", s);
    },
    d(b) {
      b && V(n), d.d(), a = !1, pe(c);
    }
  };
}
function wn(t) {
  let e, n, i;
  return {
    c() {
      e = _("button"), e.textContent = "Clear all", u(e, "class", "w-full px-2 py-1 hover:bg-slate-200 text-xs text-left");
    },
    m(r, o) {
      A(r, e, o), n || (i = [
        U(e, "mouseenter", t[21]),
        U(e, "click", t[28])
      ], n = !0);
    },
    p: L,
    d(r) {
      r && V(e), n = !1, pe(i);
    }
  };
}
function Gr(t) {
  let e, n, i, r, o, l, s, a, c, f, h, d, p, b, v, m, y, k, T, x, C, P = t[2] && fn(t), j = t[4] && un(t), I = t[15].length > 0 && dn(t);
  function R(B, N) {
    return B[7].length > 0 ? qr : Ur;
  }
  let Y = R(t), W = Y(t);
  return {
    c() {
      e = _("label"), n = _("div"), P && P.c(), i = X(), j && j.c(), r = X(), o = _("v-dropdown"), l = _("div"), s = _("div"), a = _("input"), f = X(), h = _("button"), d = _("v-icon"), b = X(), I && I.c(), m = X(), y = _("div"), W.c(), this.c = L, u(n, "class", "flex items-center gap-1.5"), u(a, "placeholder", t[1]), a.value = c = t[6] ? t[8] : t[0], u(a, "aria-disabled", t[13]), a.readOnly = t[13], u(a, "type", "text"), u(a, "class", "py-1.5 pl-2.5 pr-1 grow text-xs border-0 bg-white outline-none appearance-none"), q(d, "class", "flex"), q(d, "name", "chevron-down"), u(h, "tabindex", "-1"), u(h, "aria-label", "Open dropdown"), u(h, "class", p = F("py-1.5 px-1 grid place-content-center transition-transform duration-200", { "rotate-180": t[9] })), u(s, "class", "flex"), u(l, "slot", "target"), u(l, "class", v = F("w-full border border-black", {
        "opacity-50 pointer-events-none bg-gray-200": t[13]
      })), u(y, "slot", "content"), u(y, "class", "mt-1 border border-black bg-white drop-shadow-md"), q(o, "match", ""), q(o, "open", k = t[9] ? "" : void 0), u(e, "class", T = F("relative min-w-[6rem] w-full flex gap-1", {
        "flex-col": t[3] === "top",
        "items-center": t[3] === "left"
      })), u(e, "tabindex", "-1");
    },
    m(B, N) {
      A(B, e, N), w(e, n), P && P.m(n, null), w(n, i), j && j.m(n, null), w(e, r), w(e, o), w(o, l), w(l, s), w(s, a), t[40](a), w(s, f), w(s, h), w(h, d), w(l, b), I && I.m(l, null), w(o, m), w(o, y), W.m(y, null), t[44](e), x || (C = [
        U(a, "input", Xe(t[19])),
        U(h, "click", t[24]),
        U(h, "focusin", Ue(t[39])),
        U(e, "focusin", t[22]),
        U(e, "focusout", t[23]),
        U(e, "keyup", Ue(Xe(t[20]))),
        U(e, "mousemove", t[45])
      ], x = !0);
    },
    p(B, N) {
      B[2] ? P ? P.p(B, N) : (P = fn(B), P.c(), P.m(n, i)) : P && (P.d(1), P = null), B[4] ? j ? j.p(B, N) : (j = un(B), j.c(), j.m(n, null)) : j && (j.d(1), j = null), N[0] & 2 && u(a, "placeholder", B[1]), N[0] & 321 && c !== (c = B[6] ? B[8] : B[0]) && a.value !== c && (a.value = c), N[0] & 8192 && u(a, "aria-disabled", B[13]), N[0] & 8192 && (a.readOnly = B[13]), N[0] & 512 && p !== (p = F("py-1.5 px-1 grid place-content-center transition-transform duration-200", { "rotate-180": B[9] })) && u(h, "class", p), B[15].length > 0 ? I ? I.p(B, N) : (I = dn(B), I.c(), I.m(l, null)) : I && (I.d(1), I = null), N[0] & 8192 && v !== (v = F("w-full border border-black", {
        "opacity-50 pointer-events-none bg-gray-200": B[13]
      })) && u(l, "class", v), Y === (Y = R(B)) && W ? W.p(B, N) : (W.d(1), W = Y(B), W && (W.c(), W.m(y, null))), N[0] & 512 && k !== (k = B[9] ? "" : void 0) && q(o, "open", k), N[0] & 8 && T !== (T = F("relative min-w-[6rem] w-full flex gap-1", {
        "flex-col": B[3] === "top",
        "items-center": B[3] === "left"
      })) && u(e, "class", T);
    },
    i: L,
    o: L,
    d(B) {
      B && V(e), P && P.d(), j && j.d(), t[40](null), I && I.d(), W.d(), t[44](null), x = !1, pe(C);
    }
  };
}
function Qr(t, e, n) {
  let { options: i = "" } = e, { value: r = "" } = e, { placeholder: o = "" } = e, { label: l = "" } = e, { variant: s = "single" } = e, { labelposition: a = "top" } = e, { disabled: c = "false" } = e, { exact: f = "false" } = e, { prefix: h = "false" } = e, { tooltip: d = "" } = e, { state: p = "info" } = e, b, v, m, y, k, T, x, C, P, j, I, R = "", Y = !1, W = -1, B = !1, N = !1, D = "";
  fe();
  const ue = (O) => {
    B = O;
  }, he = (O, le) => O ? Br(le, O) : le, ye = (O) => {
    if (n(17, W = -1), n(12, m.scrollTop = 0, m), O.stopImmediatePropagation(), T) {
      n(8, R = v.value.trim()), N = !1;
      for (const le of j)
        R.toLowerCase() === le.toLowerCase() && (N = !0, D = le);
    } else
      n(0, r = v.value.trim()), ce(b, "input", { value: r });
  }, ke = (O) => {
    switch (ue(!0), O.key.toLowerCase()) {
      case "enter":
        return ve();
      case "arrowup":
        return ge(-1);
      case "arrowdown":
        return ge(1);
      case "escape":
        return He();
    }
  }, ve = () => {
    if (T) {
      const O = j[W];
      n(0, r = r.includes(O) ? [...P.filter((le) => le !== O)].toString() : [...P, O].toString()), v.focus(), N && (r.includes(D) ? n(0, r = r.replace(`${D},`, "")) : n(0, r += `${D},`), n(8, R = ""), N = !1), ce(b, "input", { value: r, values: r.split(",") });
    } else {
      if (W > -1)
        n(0, r = j[W]);
      else {
        const O = j.find((le) => le.toLowerCase() === r);
        O && n(0, r = O);
      }
      Y && v.blur(), ce(b, "input", { value: r });
    }
  }, ge = (O) => {
    n(17, W += O), W < 0 ? n(17, W = j.length - 1) : W >= j.length && n(17, W = 0);
    const le = m.children[W];
    Xr(le) === !1 && le.scrollIntoView();
  }, Te = () => {
    n(17, W = -1);
  }, He = () => {
    v.blur();
  }, ze = () => {
    Y || y || (n(9, Y = !0), v.focus());
  }, Re = (O) => {
    b.contains(O.relatedTarget) || (n(9, Y = !1), n(17, W = -1));
  }, Ae = () => {
    Y ? n(9, Y = !1) : v.focus();
  }, xe = (O) => {
    n(0, r = [...P.filter((le) => le !== O)].toString()), ce(b, "input", { value: r, values: r.split(",") }), v.focus();
  }, je = (O) => {
    B || n(17, W = O);
  }, ht = (O, le) => {
    const { checked: z } = le.target;
    if (T === !1 && r === O) {
      le.preventDefault(), n(9, Y = !1);
      return;
    }
    n(0, r = z ? [...P, O].toString() : [...P.filter((Q) => Q !== O)].toString()), T ? (v.focus(), ce(b, "input", { value: r, values: r.split(",") })) : (n(9, Y = !1), ce(b, "input", { value: r }));
  }, bt = () => {
    n(0, r = ""), n(12, m.scrollTop = 0, m), T ? ce(b, "input", { value: r, values: r.split(",") }) : ce(b, "input", { value: r });
  }, mt = (O) => O.split(" ");
  function M(O) {
    nt.call(this, t, O);
  }
  function g(O) {
    nt.call(this, t, O);
  }
  function S(O) {
    nt.call(this, t, O);
  }
  function H(O) {
    be[O ? "unshift" : "push"](() => {
      v = O, n(11, v);
    });
  }
  const G = (O) => xe(O), J = (O) => je(O);
  function $(O) {
    be[O ? "unshift" : "push"](() => {
      m = O, n(12, m);
    });
  }
  function ne(O) {
    be[O ? "unshift" : "push"](() => {
      b = O, n(10, b);
    });
  }
  const ee = () => ue(!1);
  return t.$$set = (O) => {
    "options" in O && n(30, i = O.options), "value" in O && n(0, r = O.value), "placeholder" in O && n(1, o = O.placeholder), "label" in O && n(2, l = O.label), "variant" in O && n(31, s = O.variant), "labelposition" in O && n(3, a = O.labelposition), "disabled" in O && n(32, c = O.disabled), "exact" in O && n(33, f = O.exact), "prefix" in O && n(34, h = O.prefix), "tooltip" in O && n(4, d = O.tooltip), "state" in O && n(5, p = O.state);
  }, t.$$.update = () => {
    t.$$.dirty[1] & 2 && n(13, y = we(c, "disabled")), t.$$.dirty[1] & 4 && n(35, k = we(f, "exact")), t.$$.dirty[1] & 1 && n(6, T = s === "multiple"), t.$$.dirty[1] & 8 && n(14, x = we(h, "prefix")), t.$$.dirty[0] & 1073741824 && n(36, C = i.split(",").map((O) => O.trim())), t.$$.dirty[0] & 577 | t.$$.dirty[1] & 48 && (Y || (T && n(8, R = ""), k && C.includes(r) === !1 && n(0, r = ""))), t.$$.dirty[0] & 65 && n(15, P = T ? r.split(",").filter(Boolean).map((O) => O.trim()) : []), t.$$.dirty[0] & 321 | t.$$.dirty[1] & 32 && n(7, j = he(T ? R : r, C)), t.$$.dirty[0] & 449 && n(16, I = T ? rn(j, R) : rn(j, r));
  }, [
    r,
    o,
    l,
    a,
    d,
    p,
    T,
    j,
    R,
    Y,
    b,
    v,
    m,
    y,
    x,
    P,
    I,
    W,
    ue,
    ye,
    ke,
    Te,
    ze,
    Re,
    Ae,
    xe,
    je,
    ht,
    bt,
    mt,
    i,
    s,
    c,
    f,
    h,
    k,
    C,
    M,
    g,
    S,
    H,
    G,
    J,
    $,
    ne,
    ee
  ];
}
class ai extends te {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>.options-container::-webkit-scrollbar{width:6px}.options-container::-webkit-scrollbar-track{background:transparent}.options-container::-webkit-scrollbar-thumb{background-color:black;border-radius:0;border:0 solid transparent}.options-container{scrollbar-width:thin;scrollbar-color:black transparent}</style>", se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      Qr,
      Gr,
      re,
      {
        options: 30,
        value: 0,
        placeholder: 1,
        label: 2,
        variant: 31,
        labelposition: 3,
        disabled: 32,
        exact: 33,
        prefix: 34,
        tooltip: 4,
        state: 5
      },
      null,
      [-1, -1, -1]
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
      "exact",
      "prefix",
      "tooltip",
      "state"
    ];
  }
  get options() {
    return this.$$.ctx[30];
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
    return this.$$.ctx[31];
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
    return this.$$.ctx[32];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), E();
  }
  get exact() {
    return this.$$.ctx[33];
  }
  set exact(e) {
    this.$$set({ exact: e }), E();
  }
  get prefix() {
    return this.$$.ctx[34];
  }
  set prefix(e) {
    this.$$set({ prefix: e }), E();
  }
  get tooltip() {
    return this.$$.ctx[4];
  }
  set tooltip(e) {
    this.$$set({ tooltip: e }), E();
  }
  get state() {
    return this.$$.ctx[5];
  }
  set state(e) {
    this.$$set({ state: e }), E();
  }
}
customElements.define("v-select", ai);
const $r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ai
}, Symbol.toStringTag, { value: "Module" })), Le = [];
function eo(t, e = L) {
  let n;
  const i = /* @__PURE__ */ new Set();
  function r(s) {
    if (Yn(t, s) && (t = s, n)) {
      const a = !Le.length;
      for (const c of i)
        c[1](), Le.push(c, t);
      if (a) {
        for (let c = 0; c < Le.length; c += 2)
          Le[c][0](Le[c + 1]);
        Le.length = 0;
      }
    }
  }
  function o(s) {
    r(s(t));
  }
  function l(s, a = L) {
    const c = [s, a];
    return i.add(c), i.size === 1 && (n = e(r) || L), s(t), () => {
      i.delete(c), i.size === 0 && (n(), n = null);
    };
  }
  return { set: r, update: o, subscribe: l };
}
function yn(t) {
  return Object.prototype.toString.call(t) === "[object Date]";
}
function _t(t, e, n, i) {
  if (typeof n == "number" || yn(n)) {
    const r = i - n, o = (n - e) / (t.dt || 1 / 60), l = t.opts.stiffness * r, s = t.opts.damping * o, a = (l - s) * t.inv_mass, c = (o + a) * t.dt;
    return Math.abs(c) < t.opts.precision && Math.abs(r) < t.opts.precision ? i : (t.settled = !1, yn(n) ? new Date(n.getTime() + c) : n + c);
  } else {
    if (Array.isArray(n))
      return n.map((r, o) => _t(t, e[o], n[o], i[o]));
    if (typeof n == "object") {
      const r = {};
      for (const o in n)
        r[o] = _t(t, e[o], n[o], i[o]);
      return r;
    } else
      throw new Error(`Cannot spring ${typeof n} values`);
  }
}
function to(t, e = {}) {
  const n = eo(t), { stiffness: i = 0.15, damping: r = 0.8, precision: o = 0.01 } = e;
  let l, s, a, c = t, f = t, h = 1, d = 0, p = !1;
  function b(m, y = {}) {
    f = m;
    const k = a = {};
    if (t == null || y.hard || v.stiffness >= 1 && v.damping >= 1)
      return p = !0, l = Ot(), c = m, n.set(t = f), Promise.resolve();
    if (y.soft) {
      const T = y.soft === !0 ? 0.5 : +y.soft;
      d = 1 / (T * 60), h = 0;
    }
    return s || (l = Ot(), p = !1, s = ji((T) => {
      if (p)
        return p = !1, s = null, !1;
      h = Math.min(h + d, 1);
      const x = {
        inv_mass: h,
        opts: v,
        settled: !0,
        dt: (T - l) * 60 / 1e3
      }, C = _t(x, c, t, f);
      return l = T, c = t, n.set(t = C), x.settled && (s = null), !x.settled;
    })), new Promise((T) => {
      s.promise.then(() => {
        k === a && T();
      });
    });
  }
  const v = {
    set: b,
    update: (m, y) => b(m(f, t), y),
    subscribe: n.subscribe,
    stiffness: i,
    damping: r,
    precision: o
  };
  return v;
}
function vn(t, e, n) {
  const i = t.slice();
  return i[53] = e[n], i[55] = n, i;
}
function _n(t, e, n) {
  const i = t.slice();
  return i[6] = e[n], i[57] = n, i;
}
function kn(t) {
  let e, n;
  return {
    c() {
      e = _("p"), n = K(t[4]), u(e, "class", "text-xs capitalize");
    },
    m(i, r) {
      A(i, e, r), w(e, n);
    },
    p(i, r) {
      r[0] & 16 && Z(n, i[4]);
    },
    d(i) {
      i && V(e);
    }
  };
}
function xn(t) {
  let e, n;
  return {
    c() {
      e = _("span"), n = K(t[5]), u(e, "class", "floating-suffix");
    },
    m(i, r) {
      A(i, e, r), w(e, n);
    },
    p(i, r) {
      r[0] & 32 && Z(n, i[5]);
    },
    d(i) {
      i && V(e);
    }
  };
}
function En(t) {
  let e, n, i, r, o, l, s = t[6] + "", a, c, f, h, d, p, b, v, m, y, k = t[5] && xn(t);
  function T() {
    return t[37](t[57]);
  }
  return {
    c() {
      e = _("span"), n = _("span"), i = X(), r = _("span"), o = X(), l = _("span"), a = K(s), c = X(), k && k.c(), u(n, "class", "handle-bg absolute left-0 bottom-1 rounded-full opacity-50 h-full w-full transition-transform bg-gray-400"), u(r, "class", "absolute left-0 bottom-1 block rounded-full h-full w-full border border-black bg-white"), u(l, "class", f = F("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white text-xs", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })), u(e, "role", "slider"), u(e, "class", "range absolute block h-5 w-5 top-1 bottom-auto -translate-x-1/2 -translate-y-1/2 z-[2]"), u(e, "data-handle", t[57]), me(e, "left", t[17][t[57]] + "%"), me(e, "z-index", t[15] === t[57] ? 3 : 2), u(e, "aria-valuemin", h = t[0] === !0 && t[57] === 1 ? t[9] : t[7]), u(e, "aria-valuemax", d = t[0] === !0 && t[57] === 0 ? t[10] : t[8]), u(e, "aria-valuenow", p = t[6]), u(e, "aria-valuetext", b = t[6]?.toString()), u(e, "aria-orientation", "horizontal"), u(e, "aria-disabled", t[2]), u(e, "disabled", t[2]), u(e, "tabindex", v = t[2] ? -1 : 0), ae(e, "active", t[13] && t[15] === t[57]), ae(e, "press", t[14] && t[15] === t[57]);
    },
    m(x, C) {
      A(x, e, C), w(e, n), w(e, i), w(e, r), w(e, o), w(e, l), w(l, a), w(l, c), k && k.m(l, null), m || (y = [
        U(e, "blur", t[20]),
        U(e, "focus", T)
      ], m = !0);
    },
    p(x, C) {
      t = x, C[0] & 1536 && s !== (s = t[6] + "") && Z(a, s), t[5] ? k ? k.p(t, C) : (k = xn(t), k.c(), k.m(l, null)) : k && (k.d(1), k = null), C[0] & 40960 && f !== (f = F("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white text-xs", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })) && u(l, "class", f), C[0] & 131072 && me(e, "left", t[17][t[57]] + "%"), C[0] & 32768 && me(e, "z-index", t[15] === t[57] ? 3 : 2), C[0] & 641 && h !== (h = t[0] === !0 && t[57] === 1 ? t[9] : t[7]) && u(e, "aria-valuemin", h), C[0] & 1281 && d !== (d = t[0] === !0 && t[57] === 0 ? t[10] : t[8]) && u(e, "aria-valuemax", d), C[0] & 1536 && p !== (p = t[6]) && u(e, "aria-valuenow", p), C[0] & 1536 && b !== (b = t[6]?.toString()) && u(e, "aria-valuetext", b), C[0] & 4 && u(e, "aria-disabled", t[2]), C[0] & 4 && u(e, "disabled", t[2]), C[0] & 4 && v !== (v = t[2] ? -1 : 0) && u(e, "tabindex", v), C[0] & 40960 && ae(e, "active", t[13] && t[15] === t[57]), C[0] & 49152 && ae(e, "press", t[14] && t[15] === t[57]);
    },
    d(x) {
      x && V(e), k && k.d(), m = !1, pe(y);
    }
  };
}
function Mn(t) {
  let e;
  return {
    c() {
      e = _("span"), u(e, "class", "absolute block transition duration-200 h-1 -top-0.5 select-none z-[1] bg-black"), me(e, "left", t[18](t[17]) + "%"), me(e, "right", t[19](t[17]) + "%");
    },
    m(n, i) {
      A(n, e, i);
    },
    p(n, i) {
      i[0] & 131072 && me(e, "left", n[18](n[17]) + "%"), i[0] & 131072 && me(e, "right", n[19](n[17]) + "%");
    },
    d(n) {
      n && V(e);
    }
  };
}
function Sn(t) {
  let e, n;
  return {
    c() {
      e = _("span"), n = K(t[5]), u(e, "class", "pipVal-suffix");
    },
    m(i, r) {
      A(i, e, r), w(e, n);
    },
    p(i, r) {
      r[0] & 32 && Z(n, i[5]);
    },
    d(i) {
      i && V(e);
    }
  };
}
function An(t) {
  let e, n = Array.from({ length: t[12] + 1 }), i = [];
  for (let r = 0; r < n.length; r += 1)
    i[r] = Cn(vn(t, n, r));
  return {
    c() {
      for (let r = 0; r < i.length; r += 1)
        i[r].c();
      e = Je();
    },
    m(r, o) {
      for (let l = 0; l < i.length; l += 1)
        i[l].m(r, o);
      A(r, e, o);
    },
    p(r, o) {
      if (o[0] & 70016) {
        n = Array.from({ length: r[12] + 1 });
        let l;
        for (l = 0; l < n.length; l += 1) {
          const s = vn(r, n, l);
          i[l] ? i[l].p(s, o) : (i[l] = Cn(s), i[l].c(), i[l].m(e.parentNode, e));
        }
        for (; l < i.length; l += 1)
          i[l].d(1);
        i.length = n.length;
      }
    },
    d(r) {
      Fe(i, r), r && V(e);
    }
  };
}
function On(t) {
  let e;
  return {
    c() {
      e = _("span"), u(e, "class", "absolute h-[4px] w-[1px] top-[calc(50%-9px)] whitespace-nowrap transition bg-black/50"), me(e, "left", ot(t[16](t[55]), t[7], t[8], 2) + "%");
    },
    m(n, i) {
      A(n, e, i);
    },
    p(n, i) {
      i[0] & 65920 && me(e, "left", ot(n[16](n[55]), n[7], n[8], 2) + "%");
    },
    d(n) {
      n && V(e);
    }
  };
}
function Cn(t) {
  let e = t[16](t[55]) !== t[7] && t[16](t[55]) !== t[8], n, i = e && On(t);
  return {
    c() {
      i && i.c(), n = Je();
    },
    m(r, o) {
      i && i.m(r, o), A(r, n, o);
    },
    p(r, o) {
      o[0] & 65920 && (e = r[16](r[55]) !== r[7] && r[16](r[55]) !== r[8]), e ? i ? i.p(r, o) : (i = On(r), i.c(), i.m(n.parentNode, n)) : i && (i.d(1), i = null);
    },
    d(r) {
      i && i.d(r), r && V(n);
    }
  };
}
function Tn(t) {
  let e, n;
  return {
    c() {
      e = _("span"), n = K(t[5]), u(e, "class", "pipVal-suffix");
    },
    m(i, r) {
      A(i, e, r), w(e, n);
    },
    p(i, r) {
      r[0] & 32 && Z(n, i[5]);
    },
    d(i) {
      i && V(e);
    }
  };
}
function no(t) {
  let e, n, i, r, o, l, s, a, c, f, h, d, p, b, v, m, y, k = t[4] && kn(t), T = t[10] ? [t[9], t[10]] : [t[9]], x = [];
  for (let R = 0; R < T.length; R += 1)
    x[R] = En(_n(t, T, R));
  let C = t[0] && Mn(t), P = t[5] && Sn(t), j = t[3] && An(t), I = t[5] && Tn(t);
  return {
    c() {
      e = _("label"), k && k.c(), n = X(), i = _("div");
      for (let R = 0; R < x.length; R += 1)
        x[R].c();
      r = X(), C && C.c(), o = X(), l = _("div"), s = _("small"), a = K(t[7]), c = X(), P && P.c(), f = X(), j && j.c(), h = X(), d = _("small"), p = K(t[8]), b = X(), I && I.c(), this.c = L, u(s, "class", "absolute bottom-full left-0 -translate-x-1/2 mb-3 whitespace-nowrap text-xs"), u(d, "class", "absolute bottom-full right-0 translate-x-1/2 mb-3 whitespace-nowrap text-xs"), u(l, "class", "absolute h-2 left-0 right-0"), ae(l, "disabled", t[2]), ae(l, "focus", t[13]), u(i, "class", v = F("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": t[2] })), ae(i, "range", t[0]), ae(i, "focus", t[13]), ae(i, "min", t[0] === "min"), ae(i, "max", t[0] === "max"), u(e, "class", "flex flex-col gap-2");
    },
    m(R, Y) {
      A(R, e, Y), k && k.m(e, null), w(e, n), w(e, i);
      for (let W = 0; W < x.length; W += 1)
        x[W].m(i, null);
      w(i, r), C && C.m(i, null), w(i, o), w(i, l), w(l, s), w(s, a), w(s, c), P && P.m(s, null), w(l, f), j && j.m(l, null), w(l, h), w(l, d), w(d, p), w(d, b), I && I.m(d, null), t[38](i), m || (y = [
        U(window, "mousedown", t[24]),
        U(window, "touchstart", t[24]),
        U(window, "mousemove", t[25]),
        U(window, "touchmove", t[25]),
        U(window, "mouseup", t[26]),
        U(window, "touchend", t[27]),
        U(window, "keydown", t[28]),
        U(i, "mousedown", t[22]),
        U(i, "mouseup", t[23]),
        U(i, "touchstart", Xe(t[22])),
        U(i, "touchend", Xe(t[23]))
      ], m = !0);
    },
    p(R, Y) {
      if (R[4] ? k ? k.p(R, Y) : (k = kn(R), k.c(), k.m(e, n)) : k && (k.d(1), k = null), Y[0] & 3336101) {
        T = R[10] ? [R[9], R[10]] : [R[9]];
        let W;
        for (W = 0; W < T.length; W += 1) {
          const B = _n(R, T, W);
          x[W] ? x[W].p(B, Y) : (x[W] = En(B), x[W].c(), x[W].m(i, r));
        }
        for (; W < x.length; W += 1)
          x[W].d(1);
        x.length = T.length;
      }
      R[0] ? C ? C.p(R, Y) : (C = Mn(R), C.c(), C.m(i, o)) : C && (C.d(1), C = null), Y[0] & 128 && Z(a, R[7]), R[5] ? P ? P.p(R, Y) : (P = Sn(R), P.c(), P.m(s, null)) : P && (P.d(1), P = null), R[3] ? j ? j.p(R, Y) : (j = An(R), j.c(), j.m(l, h)) : j && (j.d(1), j = null), Y[0] & 256 && Z(p, R[8]), R[5] ? I ? I.p(R, Y) : (I = Tn(R), I.c(), I.m(d, null)) : I && (I.d(1), I = null), Y[0] & 4 && ae(l, "disabled", R[2]), Y[0] & 8192 && ae(l, "focus", R[13]), Y[0] & 4 && v !== (v = F("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": R[2] })) && u(i, "class", v), Y[0] & 5 && ae(i, "range", R[0]), Y[0] & 8196 && ae(i, "focus", R[13]), Y[0] & 5 && ae(i, "min", R[0] === "min"), Y[0] & 5 && ae(i, "max", R[0] === "max");
    },
    i: L,
    o: L,
    d(R) {
      R && V(e), k && k.d(), Fe(x, R), C && C.d(), P && P.d(), j && j.d(), I && I.d(), t[38](null), m = !1, pe(y);
    }
  };
}
function io(t, e, n) {
  let i, r, o = L, l = () => (o(), o = Pi(ve, (z) => n(17, r = z)), ve);
  t.$$.on_destroy.push(() => o());
  let { slider: s } = e, { range: a = !1 } = e, { min: c } = e, { max: f } = e, { step: h } = e, { value: d } = e, { start: p } = e, { end: b } = e, { disabled: v = !1 } = e, { discrete: m = !0 } = e, { label: y = "" } = e, { suffix: k = "" } = e;
  fe();
  const T = { stiffness: 0.1, damping: 0.4 };
  let x, C, P, j, I, R, Y, W = 0, B = !1, N = !1, D = !1, ue = !1, he = -1, ye, ke, ve;
  const ge = (z, Q, de) => {
    if (z <= Q)
      return Q;
    if (z >= de)
      return de;
    const ie = (z - Q) % P;
    let Ee = z - ie;
    return Math.abs(ie) * 2 >= P && (Ee += ie > 0 ? P : -P), Ee = ur(Ee, Q, de), Number.parseFloat(Ee.toFixed(2));
  }, Te = (z) => z.type.includes("touch") ? z.touches[0] : z, He = (z) => {
    const Q = [...s.querySelectorAll(".handle")], de = Q.includes(z), ie = Q.some((Ee) => Ee.contains(z));
    return de || ie;
  }, ze = (z) => a === "min" || a === "max" ? z.slice(0, 1) : a ? z.slice(0, 2) : z, Re = () => {
    ke = s.getBoundingClientRect();
  }, Ae = (z) => {
    const de = (z.clientX - ke.left) / ke.width * 100, ie = (C - x) / 100 * de + x;
    let Ee = 0;
    return a && j === I ? ie > I ? 1 : 0 : (a && (Ee = [j, I].indexOf([j, I].sort((Ci, Ti) => Math.abs(ie - Ci) - Math.abs(ie - Ti))[0])), Ee);
  }, xe = (z) => {
    const de = (z.clientX - ke.left) / ke.width * 100, ie = (C - x) / 100 * de + x;
    je(he, ie);
  }, je = (z, Q) => {
    let de = z;
    const ie = ge(Q, x, C);
    return typeof de > "u" && (de = he), a && (de === 0 && ie > I ? n(10, I = ie) : de === 1 && ie < j && n(9, j = ie)), de === 0 && j !== ie && n(9, j = ie), de === 1 && I !== ie && n(10, I = ie), ye !== ie && (ee(), ye = ie), de === 0 ? n(29, p = j.toString()) : de === 1 && n(30, b = I.toString()), ie;
  }, ht = (z) => a === "min" ? 0 : z[0], bt = (z) => a === "max" ? 0 : a === "min" ? 100 - z[0] : 100 - z[1], mt = () => {
    ue && (n(13, B = !1), N = !1, n(14, D = !1));
  }, M = (z) => {
    v || (n(15, he = z), n(13, B = !0));
  }, g = (z) => {
    if (v)
      return;
    Re();
    const Q = z.target, de = Te(z);
    n(13, B = !0), N = !0, n(14, D = !0), n(15, he = Ae(de)), ye = ge(he === 0 ? j : I, x, C), z.type === "touchstart" && !Q.matches(".pipVal") && xe(de);
  }, S = () => {
    n(14, D = !1);
  }, H = (z) => {
    ue = !1, B && z.target !== s && !s.contains(z.target) && n(13, B = !1);
  }, G = (z) => {
    v || !N || (n(13, B = !0), xe(Te(z)));
  }, J = (z) => {
    if (!v) {
      const Q = z.target;
      (N && Q && Q === s || s.contains(Q)) && (n(13, B = !0), !He(Q) && !Q.matches(".pipVal") && xe(Te(z)));
    }
    N = !1, n(14, D = !1);
  }, $ = () => {
    N = !1, n(14, D = !1);
  }, ne = (z) => {
    v || (z.target === s || s.contains(z.target)) && (ue = !0);
  }, ee = () => {
    v || ce(s, "input", {
      activeHandle: he,
      previousValue: ye,
      value: he === 0 ? j : I,
      values: I ? [j, I].map((z) => ge(z, x, C)) : void 0
    });
  }, O = (z) => M(z);
  function le(z) {
    be[z ? "unshift" : "push"](() => {
      s = z, n(1, s);
    });
  }
  return t.$$set = (z) => {
    "slider" in z && n(1, s = z.slider), "range" in z && n(0, a = z.range), "min" in z && n(31, c = z.min), "max" in z && n(32, f = z.max), "step" in z && n(33, h = z.step), "value" in z && n(6, d = z.value), "start" in z && n(29, p = z.start), "end" in z && n(30, b = z.end), "disabled" in z && n(2, v = z.disabled), "discrete" in z && n(3, m = z.discrete), "label" in z && n(4, y = z.label), "suffix" in z && n(5, k = z.suffix);
  }, t.$$.update = () => {
    if (t.$$.dirty[1] & 2 && n(8, C = Number.parseFloat(f || "100")), t.$$.dirty[1] & 1 && n(7, x = Number.parseFloat(c || "0")), t.$$.dirty[1] & 4 && n(34, P = Number.parseFloat(h || "1")), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(35, R = (C - x) / P >= 100 ? (C - x) / 20 : 1), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(12, Y = (C - x) / P), t.$$.dirty[0] & 128 | t.$$.dirty[1] & 24 && n(16, i = (z) => x + z * P * R), t.$$.dirty[0] & 536870976 | t.$$.dirty[1] & 3 && n(9, j = p || d ? Number.parseFloat(p || d) : (Number.parseFloat(c || "0") + Number.parseFloat(f || "100")) / 2), t.$$.dirty[0] & 1073741824 && n(10, I = b ? Number.parseFloat(b) : void 0), t.$$.dirty[0] & 1073741825 && n(0, a = typeof a == "string" ? a : b !== void 0), t.$$.dirty[0] & 3968 | t.$$.dirty[1] & 32) {
      n(9, j = ge(j, x, C));
      let z = [j];
      I && (n(10, I = ge(I, x, C)), z.push(I)), z = ze(z), W !== z.length ? l(n(11, ve = to(z.map((Q) => ot(Q, x, C, 2)), T))) : ve.set(z.map((Q) => ot(Q, x, C, 2))).catch((Q) => console.error(Q)), n(36, W = z.length);
    }
  }, [
    a,
    s,
    v,
    m,
    y,
    k,
    d,
    x,
    C,
    j,
    I,
    ve,
    Y,
    B,
    D,
    he,
    i,
    r,
    ht,
    bt,
    mt,
    M,
    g,
    S,
    H,
    G,
    J,
    $,
    ne,
    p,
    b,
    c,
    f,
    h,
    P,
    R,
    W,
    O,
    le
  ];
}
class ci extends te {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>.slider .range:hover .handle-bg{transform:scale(1.5)}.slider .range.active .handle-bg{transform:scale(2.0)}.slider .range.active .floating,.slider .range:hover .floating{opacity:1}</style>", se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      io,
      no,
      Yn,
      {
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
      },
      null,
      [-1, -1]
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-slider", ci);
const ro = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ci
}, Symbol.toStringTag, { value: "Module" }));
function zn(t) {
  let e, n, i;
  return {
    c() {
      e = _("p"), n = K(t[1]), u(e, "class", i = F("text-xs capitalize", {
        "whitespace-nowrap": t[4] === "left"
      }));
    },
    m(r, o) {
      A(r, e, o), w(e, n);
    },
    p(r, o) {
      o & 2 && Z(n, r[1]), o & 16 && i !== (i = F("text-xs capitalize", {
        "whitespace-nowrap": r[4] === "left"
      })) && u(e, "class", i);
    },
    d(r) {
      r && V(e);
    }
  };
}
function Rn(t) {
  let e, n;
  return {
    c() {
      e = _("p"), n = K(t[0]), u(e, "class", "capitalize text-xs");
    },
    m(i, r) {
      A(i, e, r), w(e, n);
    },
    p(i, r) {
      r & 1 && Z(n, i[0]);
    },
    d(i) {
      i && V(e);
    }
  };
}
function oo(t) {
  let e, n, i, r, o, l, s, a, c, f, h, d, p, b = t[1] && zn(t), v = t[3] === "annotated" && Rn(t);
  return {
    c() {
      e = _("label"), b && b.c(), n = X(), i = _("button"), r = _("div"), o = _("span"), l = X(), s = _("input"), c = X(), v && v.c(), this.c = L, u(o, "class", "pointer-events-none relative inline-block border border-green/100 h-4 w-4 mt-px ml-px bg-white shadow transform ring-0 motion-safe:transition-transform ease-in-out duration-200"), ae(o, "translate-x-0", !t[7]), ae(o, "translate-x-6", t[7]), u(s, "name", t[2]), s.value = t[0], u(s, "class", "hidden"), u(s, "type", "checkbox"), s.checked = t[7], u(r, "class", a = F("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": t[7] })), u(i, "type", "button"), u(i, "class", "flex gap-1.5 items-center"), u(i, "role", "switch"), u(i, "aria-label", t[1]), u(i, "aria-checked", f = t[7] ? "true" : "false"), u(e, "class", h = F("flex gap-1", {
        "flex-col justify-start": t[4] === "top",
        "items-center": t[4] === "left",
        "opacity-50 pointer-events-none": t[8]
      }));
    },
    m(m, y) {
      A(m, e, y), b && b.m(e, null), w(e, n), w(e, i), w(i, r), w(r, o), w(r, l), w(r, s), t[11](s), w(i, c), v && v.m(i, null), t[12](e), d || (p = U(i, "click", t[9]), d = !0);
    },
    p(m, [y]) {
      m[1] ? b ? b.p(m, y) : (b = zn(m), b.c(), b.m(e, n)) : b && (b.d(1), b = null), y & 128 && ae(o, "translate-x-0", !m[7]), y & 128 && ae(o, "translate-x-6", m[7]), y & 4 && u(s, "name", m[2]), y & 1 && (s.value = m[0]), y & 128 && (s.checked = m[7]), y & 128 && a !== (a = F("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": m[7] })) && u(r, "class", a), m[3] === "annotated" ? v ? v.p(m, y) : (v = Rn(m), v.c(), v.m(i, null)) : v && (v.d(1), v = null), y & 2 && u(i, "aria-label", m[1]), y & 128 && f !== (f = m[7] ? "true" : "false") && u(i, "aria-checked", f), y & 272 && h !== (h = F("flex gap-1", {
        "flex-col justify-start": m[4] === "top",
        "items-center": m[4] === "left",
        "opacity-50 pointer-events-none": m[8]
      })) && u(e, "class", h);
    },
    i: L,
    o: L,
    d(m) {
      m && V(e), b && b.d(), t[11](null), v && v.d(), t[12](null), d = !1, p();
    }
  };
}
function so(t, e, n) {
  let { label: i = "" } = e, { name: r = "" } = e, { value: o = "off" } = e, { variant: l = "default" } = e, { disabled: s } = e, { labelposition: a = "top" } = e;
  fe();
  let c, f, h, d;
  const p = () => {
    n(0, o = h ? "off" : "on"), n(6, f.checked = h, f), ce(c, "input", { value: f.checked });
  };
  function b(m) {
    be[m ? "unshift" : "push"](() => {
      f = m, n(6, f);
    });
  }
  function v(m) {
    be[m ? "unshift" : "push"](() => {
      c = m, n(5, c);
    });
  }
  return t.$$set = (m) => {
    "label" in m && n(1, i = m.label), "name" in m && n(2, r = m.name), "value" in m && n(0, o = m.value), "variant" in m && n(3, l = m.variant), "disabled" in m && n(10, s = m.disabled), "labelposition" in m && n(4, a = m.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 1 && n(7, h = o === "on"), t.$$.dirty & 1024 && n(8, d = we(s, "disabled"));
  }, [
    o,
    i,
    r,
    l,
    a,
    c,
    f,
    h,
    d,
    p,
    s,
    b,
    v
  ];
}
class fi extends te {
  constructor(e) {
    super(), se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      so,
      oo,
      re,
      {
        label: 1,
        name: 2,
        value: 0,
        variant: 3,
        disabled: 10,
        labelposition: 4
      },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-switch", fi);
const lo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fi
}, Symbol.toStringTag, { value: "Module" }));
function Pn(t, e, n) {
  const i = t.slice();
  return i[4] = e[n], i;
}
function jn(t) {
  let e;
  return {
    c() {
      e = _("col"), me(e, "width", t[4]);
    },
    m(n, i) {
      A(n, e, i);
    },
    p: L,
    d(n) {
      n && V(e);
    }
  };
}
function ao(t) {
  let e, n, i, r, o, l = t[2], s = [];
  for (let a = 0; a < l.length; a += 1)
    s[a] = jn(Pn(t, l, a));
  return {
    c() {
      e = _("table"), n = _("colgroup");
      for (let a = 0; a < s.length; a += 1)
        s[a].c();
      i = X(), r = _("slot"), this.c = L, u(e, "style", t[1]), u(e, "class", o = F("bg-white text-xs w-full", {
        "table-fixed": t[0] === "fixed"
      }));
    },
    m(a, c) {
      A(a, e, c), w(e, n);
      for (let f = 0; f < s.length; f += 1)
        s[f].m(n, null);
      w(e, i), w(e, r);
    },
    p(a, [c]) {
      if (c & 4) {
        l = a[2];
        let f;
        for (f = 0; f < l.length; f += 1) {
          const h = Pn(a, l, f);
          s[f] ? s[f].p(h, c) : (s[f] = jn(h), s[f].c(), s[f].m(n, null));
        }
        for (; f < s.length; f += 1)
          s[f].d(1);
        s.length = l.length;
      }
      c & 2 && u(e, "style", a[1]), c & 1 && o !== (o = F("bg-white text-xs w-full", {
        "table-fixed": a[0] === "fixed"
      })) && u(e, "class", o);
    },
    i: L,
    o: L,
    d(a) {
      a && V(e), Fe(s, a);
    }
  };
}
function co(t, e, n) {
  fe();
  let { variant: i = "" } = e, { cols: r = "" } = e, { style: o = "" } = e;
  const l = r.split(",").map((s) => s.trim());
  return t.$$set = (s) => {
    "variant" in s && n(0, i = s.variant), "cols" in s && n(3, r = s.cols), "style" in s && n(1, o = s.style);
  }, [i, o, l, r];
}
class ui extends te {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>:host{display:contents !important}</style>", se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      co,
      ao,
      re,
      { variant: 0, cols: 3, style: 1 },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["variant", "cols", "style"];
  }
  get variant() {
    return this.$$.ctx[0];
  }
  set variant(e) {
    this.$$set({ variant: e }), E();
  }
  get cols() {
    return this.$$.ctx[3];
  }
  set cols(e) {
    this.$$set({ cols: e }), E();
  }
  get style() {
    return this.$$.ctx[1];
  }
  set style(e) {
    this.$$set({ style: e }), E();
  }
}
customElements.define("v-table", ui);
const fo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ui
}, Symbol.toStringTag, { value: "Module" }));
function Ln(t, e, n) {
  const i = t.slice();
  return i[8] = e[n], i[10] = n, i;
}
function In(t, e) {
  let n, i, r = e[8] + "", o, l, s, a, c, f;
  function h() {
    return e[6](e[8]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = _("button"), i = _("div"), o = K(r), s = X(), u(i, "class", l = F({
        "-mb-px": e[8] !== e[0]
      })), u(n, "class", a = F("px-4 py-1 uppercase text-sm first:ml-4 ", {
        "bg-white border border-x-black border-t-black border-b-white font-bold -mb-px": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })), this.first = n;
    },
    m(d, p) {
      A(d, n, p), w(n, i), w(i, o), w(n, s), c || (f = U(n, "click", h), c = !0);
    },
    p(d, p) {
      e = d, p & 2 && r !== (r = e[8] + "") && Z(o, r), p & 3 && l !== (l = F({
        "-mb-px": e[8] !== e[0]
      })) && u(i, "class", l), p & 11 && a !== (a = F("px-4 py-1 uppercase text-sm first:ml-4 ", {
        "bg-white border border-x-black border-t-black border-b-white font-bold -mb-px": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })) && u(n, "class", a);
    },
    d(d) {
      d && V(n), c = !1, f();
    }
  };
}
function uo(t) {
  let e, n = [], i = /* @__PURE__ */ new Map(), r = t[1];
  const o = (l) => l[8];
  for (let l = 0; l < r.length; l += 1) {
    let s = Ln(t, r, l), a = o(s);
    i.set(a, n[l] = In(a, s));
  }
  return {
    c() {
      e = _("div");
      for (let l = 0; l < n.length; l += 1)
        n[l].c();
      this.c = L, u(e, "class", "w-full flex bg-black/20 border-b border-b-black");
    },
    m(l, s) {
      A(l, e, s);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
      t[7](e);
    },
    p(l, [s]) {
      s & 27 && (r = l[1], n = Ge(n, s, o, 1, l, r, i, e, Ze, In, null, Ln));
    },
    i: L,
    o: L,
    d(l) {
      l && V(e);
      for (let s = 0; s < n.length; s += 1)
        n[s].d();
      t[7](null);
    }
  };
}
function ho(t, e, n) {
  let i, r, { tabs: o = "" } = e, { selected: l = "" } = e, s;
  fe();
  const a = (h) => {
    n(0, l = h), ce(s, "input", { value: l });
  }, c = (h) => a(h);
  function f(h) {
    be[h ? "unshift" : "push"](() => {
      s = h, n(2, s);
    });
  }
  return t.$$set = (h) => {
    "tabs" in h && n(5, o = h.tabs), "selected" in h && n(0, l = h.selected);
  }, t.$$.update = () => {
    t.$$.dirty & 32 && n(1, i = o.split(",").map((h) => h.trim())), t.$$.dirty & 3 && n(3, r = i.indexOf(l));
  }, [
    l,
    i,
    s,
    r,
    a,
    o,
    c,
    f
  ];
}
class di extends te {
  constructor(e) {
    super(), se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      ho,
      uo,
      re,
      { tabs: 5, selected: 0 },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
customElements.define("v-tabs", di);
const bo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: di
}, Symbol.toStringTag, { value: "Module" }));
function mo(t) {
  let e, n;
  return {
    c() {
      e = _("tbody"), n = _("slot"), this.c = L, u(e, "style", t[0]);
    },
    m(i, r) {
      A(i, e, r), w(e, n);
    },
    p(i, [r]) {
      r & 1 && u(e, "style", i[0]);
    },
    i: L,
    o: L,
    d(i) {
      i && V(e);
    }
  };
}
function po(t, e, n) {
  let { style: i = "" } = e;
  return fe(), t.$$set = (r) => {
    "style" in r && n(0, i = r.style);
  }, [i];
}
class hi extends te {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>:host{display:contents !important}</style>", se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      po,
      mo,
      re,
      { style: 0 },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["style"];
  }
  get style() {
    return this.$$.ctx[0];
  }
  set style(e) {
    this.$$set({ style: e }), E();
  }
}
customElements.define("v-tbody", hi);
const go = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hi
}, Symbol.toStringTag, { value: "Module" }));
function wo(t) {
  let e, n;
  return {
    c() {
      e = _("th"), n = _("slot"), this.c = L, u(e, "style", t[0]), u(e, "class", "p-2 text-neutral-600 font-normal overflow-hidden");
    },
    m(i, r) {
      A(i, e, r), w(e, n);
    },
    p(i, [r]) {
      r & 1 && u(e, "style", i[0]);
    },
    i: L,
    o: L,
    d(i) {
      i && V(e);
    }
  };
}
function yo(t, e, n) {
  let { style: i = "" } = e;
  return fe(), t.$$set = (r) => {
    "style" in r && n(0, i = r.style);
  }, [i];
}
class bi extends te {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>:host{display:contents !important}</style>", se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      yo,
      wo,
      re,
      { style: 0 },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["style"];
  }
  get style() {
    return this.$$.ctx[0];
  }
  set style(e) {
    this.$$set({ style: e }), E();
  }
}
customElements.define("v-th", bi);
const vo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bi
}, Symbol.toStringTag, { value: "Module" }));
function _o(t) {
  let e, n;
  return {
    c() {
      e = _("td"), n = _("slot"), this.c = L, u(e, "style", t[0]), u(e, "part", "table-cell"), u(e, "class", "p-2 overflow-hidden");
    },
    m(i, r) {
      A(i, e, r), w(e, n);
    },
    p(i, [r]) {
      r & 1 && u(e, "style", i[0]);
    },
    i: L,
    o: L,
    d(i) {
      i && V(e);
    }
  };
}
function ko(t, e, n) {
  let { style: i = "" } = e;
  return fe(), t.$$set = (r) => {
    "style" in r && n(0, i = r.style);
  }, [i];
}
class mi extends te {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>:host{display:contents !important}</style>", se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      ko,
      _o,
      re,
      { style: 0 },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["style"];
  }
  get style() {
    return this.$$.ctx[0];
  }
  set style(e) {
    this.$$set({ style: e }), E();
  }
}
customElements.define("v-td", mi);
const xo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mi
}, Symbol.toStringTag, { value: "Module" }));
function Eo(t) {
  let e, n;
  return {
    c() {
      e = _("thead"), n = _("slot"), this.c = L, u(e, "style", t[0]), u(e, "class", "border-b border-black");
    },
    m(i, r) {
      A(i, e, r), w(e, n);
    },
    p(i, [r]) {
      r & 1 && u(e, "style", i[0]);
    },
    i: L,
    o: L,
    d(i) {
      i && V(e);
    }
  };
}
function Mo(t, e, n) {
  let { style: i = "" } = e;
  return fe(), t.$$set = (r) => {
    "style" in r && n(0, i = r.style);
  }, [i];
}
class pi extends te {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>:host{display:contents !important}</style>", se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      Mo,
      Eo,
      re,
      { style: 0 },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["style"];
  }
  get style() {
    return this.$$.ctx[0];
  }
  set style(e) {
    this.$$set({ style: e }), E();
  }
}
customElements.define("v-thead", pi);
const So = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pi
}, Symbol.toStringTag, { value: "Module" }));
function Qe(t) {
  return t.split("-")[0];
}
function ft(t) {
  return t.split("-")[1];
}
function $e(t) {
  return ["top", "bottom"].includes(Qe(t)) ? "x" : "y";
}
function St(t) {
  return t === "y" ? "height" : "width";
}
function Nn(t, e, n) {
  let {
    reference: i,
    floating: r
  } = t;
  const o = i.x + i.width / 2 - r.width / 2, l = i.y + i.height / 2 - r.height / 2, s = $e(e), a = St(s), c = i[a] / 2 - r[a] / 2, f = Qe(e), h = s === "x";
  let d;
  switch (f) {
    case "top":
      d = {
        x: o,
        y: i.y - r.height
      };
      break;
    case "bottom":
      d = {
        x: o,
        y: i.y + i.height
      };
      break;
    case "right":
      d = {
        x: i.x + i.width,
        y: l
      };
      break;
    case "left":
      d = {
        x: i.x - r.width,
        y: l
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
      d[s] -= c * (n && h ? -1 : 1);
      break;
    case "end":
      d[s] += c * (n && h ? -1 : 1);
      break;
  }
  return d;
}
const Ao = async (t, e, n) => {
  const {
    placement: i = "bottom",
    strategy: r = "absolute",
    middleware: o = [],
    platform: l
  } = n, s = await (l.isRTL == null ? void 0 : l.isRTL(e));
  let a = await l.getElementRects({
    reference: t,
    floating: e,
    strategy: r
  }), {
    x: c,
    y: f
  } = Nn(a, i, s), h = i, d = {}, p = 0;
  for (let b = 0; b < o.length; b++) {
    const {
      name: v,
      fn: m
    } = o[b], {
      x: y,
      y: k,
      data: T,
      reset: x
    } = await m({
      x: c,
      y: f,
      initialPlacement: i,
      placement: h,
      strategy: r,
      middlewareData: d,
      rects: a,
      platform: l,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (c = y ?? c, f = k ?? f, d = {
      ...d,
      [v]: {
        ...d[v],
        ...T
      }
    }, x && p <= 50) {
      p++, typeof x == "object" && (x.placement && (h = x.placement), x.rects && (a = x.rects === !0 ? await l.getElementRects({
        reference: t,
        floating: e,
        strategy: r
      }) : x.rects), {
        x: c,
        y: f
      } = Nn(a, h, s)), b = -1;
      continue;
    }
  }
  return {
    x: c,
    y: f,
    placement: h,
    strategy: r,
    middlewareData: d
  };
};
function Oo(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function gi(t) {
  return typeof t != "number" ? Oo(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function st(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
async function wi(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: i,
    y: r,
    platform: o,
    rects: l,
    elements: s,
    strategy: a
  } = t, {
    boundary: c = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: h = "floating",
    altBoundary: d = !1,
    padding: p = 0
  } = e, b = gi(p), m = s[d ? h === "floating" ? "reference" : "floating" : h], y = st(await o.getClippingRect({
    element: (n = await (o.isElement == null ? void 0 : o.isElement(m))) == null || n ? m : m.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(s.floating)),
    boundary: c,
    rootBoundary: f,
    strategy: a
  })), k = st(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: h === "floating" ? {
      ...l.floating,
      x: i,
      y: r
    } : l.reference,
    offsetParent: await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(s.floating)),
    strategy: a
  }) : l[h]);
  return {
    top: y.top - k.top + b.top,
    bottom: k.bottom - y.bottom + b.bottom,
    left: y.left - k.left + b.left,
    right: k.right - y.right + b.right
  };
}
const Co = Math.min, To = Math.max;
function kt(t, e, n) {
  return To(t, Co(e, n));
}
const zo = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      element: n,
      padding: i = 0
    } = t ?? {}, {
      x: r,
      y: o,
      placement: l,
      rects: s,
      platform: a
    } = e;
    if (n == null)
      return {};
    const c = gi(i), f = {
      x: r,
      y: o
    }, h = $e(l), d = ft(l), p = St(h), b = await a.getDimensions(n), v = h === "y" ? "top" : "left", m = h === "y" ? "bottom" : "right", y = s.reference[p] + s.reference[h] - f[h] - s.floating[p], k = f[h] - s.reference[h], T = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(n));
    let x = T ? h === "y" ? T.clientHeight || 0 : T.clientWidth || 0 : 0;
    x === 0 && (x = s.floating[p]);
    const C = y / 2 - k / 2, P = c[v], j = x - b[p] - c[m], I = x / 2 - b[p] / 2 + C, R = kt(P, I, j), B = (d === "start" ? c[v] : c[m]) > 0 && I !== R && s.reference[p] <= s.floating[p] ? I < P ? P - I : j - I : 0;
    return {
      [h]: f[h] - B,
      data: {
        [h]: R,
        centerOffset: I - R
      }
    };
  }
}), Ro = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function lt(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Ro[e]);
}
function Po(t, e, n) {
  n === void 0 && (n = !1);
  const i = ft(t), r = $e(t), o = St(r);
  let l = r === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return e.reference[o] > e.floating[o] && (l = lt(l)), {
    main: l,
    cross: lt(l)
  };
}
const jo = {
  start: "end",
  end: "start"
};
function Vn(t) {
  return t.replace(/start|end/g, (e) => jo[e]);
}
function Lo(t) {
  const e = lt(t);
  return [Vn(t), e, Vn(e)];
}
const Io = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n;
      const {
        placement: i,
        middlewareData: r,
        rects: o,
        initialPlacement: l,
        platform: s,
        elements: a
      } = e, {
        mainAxis: c = !0,
        crossAxis: f = !0,
        fallbackPlacements: h,
        fallbackStrategy: d = "bestFit",
        flipAlignment: p = !0,
        ...b
      } = t, v = Qe(i), y = h || (v === l || !p ? [lt(l)] : Lo(l)), k = [l, ...y], T = await wi(e, b), x = [];
      let C = ((n = r.flip) == null ? void 0 : n.overflows) || [];
      if (c && x.push(T[v]), f) {
        const {
          main: R,
          cross: Y
        } = Po(i, o, await (s.isRTL == null ? void 0 : s.isRTL(a.floating)));
        x.push(T[R], T[Y]);
      }
      if (C = [...C, {
        placement: i,
        overflows: x
      }], !x.every((R) => R <= 0)) {
        var P, j;
        const R = ((P = (j = r.flip) == null ? void 0 : j.index) != null ? P : 0) + 1, Y = k[R];
        if (Y)
          return {
            data: {
              index: R,
              overflows: C
            },
            reset: {
              placement: Y
            }
          };
        let W = "bottom";
        switch (d) {
          case "bestFit": {
            var I;
            const B = (I = C.map((N) => [N, N.overflows.filter((D) => D > 0).reduce((D, ue) => D + ue, 0)]).sort((N, D) => N[1] - D[1])[0]) == null ? void 0 : I[0].placement;
            B && (W = B);
            break;
          }
          case "initialPlacement":
            W = l;
            break;
        }
        if (i !== W)
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
async function No(t, e) {
  const {
    placement: n,
    platform: i,
    elements: r
  } = t, o = await (i.isRTL == null ? void 0 : i.isRTL(r.floating)), l = Qe(n), s = ft(n), a = $e(n) === "x", c = ["left", "top"].includes(l) ? -1 : 1, f = o && a ? -1 : 1, h = typeof e == "function" ? e(t) : e;
  let {
    mainAxis: d,
    crossAxis: p,
    alignmentAxis: b
  } = typeof h == "number" ? {
    mainAxis: h,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...h
  };
  return s && typeof b == "number" && (p = s === "end" ? b * -1 : b), a ? {
    x: p * f,
    y: d * c
  } : {
    x: d * c,
    y: p * f
  };
}
const Vo = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: i
      } = e, r = await No(e, t);
      return {
        x: n + r.x,
        y: i + r.y,
        data: r
      };
    }
  };
};
function Fo(t) {
  return t === "x" ? "y" : "x";
}
const Do = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: i,
        placement: r
      } = e, {
        mainAxis: o = !0,
        crossAxis: l = !1,
        limiter: s = {
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
        y: i
      }, f = await wi(e, a), h = $e(Qe(r)), d = Fo(h);
      let p = c[h], b = c[d];
      if (o) {
        const m = h === "y" ? "top" : "left", y = h === "y" ? "bottom" : "right", k = p + f[m], T = p - f[y];
        p = kt(k, p, T);
      }
      if (l) {
        const m = d === "y" ? "top" : "left", y = d === "y" ? "bottom" : "right", k = b + f[m], T = b - f[y];
        b = kt(k, b, T);
      }
      const v = s.fn({
        ...e,
        [h]: p,
        [d]: b
      });
      return {
        ...v,
        data: {
          x: v.x - n,
          y: v.y - i
        }
      };
    }
  };
};
function yi(t) {
  return t && t.document && t.location && t.alert && t.setInterval;
}
function Se(t) {
  if (t == null)
    return window;
  if (!yi(t)) {
    const e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function Oe(t) {
  return Se(t).getComputedStyle(t);
}
function Me(t) {
  return yi(t) ? "" : t ? (t.nodeName || "").toLowerCase() : "";
}
function vi() {
  const t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map((e) => e.brand + "/" + e.version).join(" ") : navigator.userAgent;
}
function _e(t) {
  return t instanceof Se(t).HTMLElement;
}
function Ve(t) {
  return t instanceof Se(t).Element;
}
function Ho(t) {
  return t instanceof Se(t).Node;
}
function at(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = Se(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function ut(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: i
  } = Oe(t);
  return /auto|scroll|overlay|hidden/.test(e + i + n);
}
function Wo(t) {
  return ["table", "td", "th"].includes(Me(t));
}
function _i(t) {
  const e = /firefox/i.test(vi()), n = Oe(t);
  return n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].includes(n.willChange) || e && n.willChange === "filter" || e && (n.filter ? n.filter !== "none" : !1);
}
function ki() {
  return !/^((?!chrome|android).)*safari/i.test(vi());
}
const Fn = Math.min, Be = Math.max, ct = Math.round;
function Pe(t, e, n) {
  var i, r, o, l;
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const s = t.getBoundingClientRect();
  let a = 1, c = 1;
  e && _e(t) && (a = t.offsetWidth > 0 && ct(s.width) / t.offsetWidth || 1, c = t.offsetHeight > 0 && ct(s.height) / t.offsetHeight || 1);
  const f = Ve(t) ? Se(t) : window, h = !ki() && n, d = (s.left + (h && (i = (r = f.visualViewport) == null ? void 0 : r.offsetLeft) != null ? i : 0)) / a, p = (s.top + (h && (o = (l = f.visualViewport) == null ? void 0 : l.offsetTop) != null ? o : 0)) / c, b = s.width / a, v = s.height / c;
  return {
    width: b,
    height: v,
    top: p,
    right: d + b,
    bottom: p + v,
    left: d,
    x: d,
    y: p
  };
}
function Ce(t) {
  return ((Ho(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function dt(t) {
  return Ve(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function xi(t) {
  return Pe(Ce(t)).left + dt(t).scrollLeft;
}
function Yo(t) {
  const e = Pe(t);
  return ct(e.width) !== t.offsetWidth || ct(e.height) !== t.offsetHeight;
}
function Bo(t, e, n) {
  const i = _e(e), r = Ce(e), o = Pe(
    t,
    i && Yo(e),
    n === "fixed"
  );
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const s = {
    x: 0,
    y: 0
  };
  if (i || !i && n !== "fixed")
    if ((Me(e) !== "body" || ut(r)) && (l = dt(e)), _e(e)) {
      const a = Pe(e, !0);
      s.x = a.x + e.clientLeft, s.y = a.y + e.clientTop;
    } else
      r && (s.x = xi(r));
  return {
    x: o.left + l.scrollLeft - s.x,
    y: o.top + l.scrollTop - s.y,
    width: o.width,
    height: o.height
  };
}
function Ei(t) {
  return Me(t) === "html" ? t : t.assignedSlot || t.parentNode || (at(t) ? t.host : null) || Ce(t);
}
function Dn(t) {
  return !_e(t) || Oe(t).position === "fixed" ? null : t.offsetParent;
}
function Xo(t) {
  let e = Ei(t);
  for (at(e) && (e = e.host); _e(e) && !["html", "body"].includes(Me(e)); ) {
    if (_i(e))
      return e;
    {
      const n = e.parentNode;
      e = at(n) ? n.host : n;
    }
  }
  return null;
}
function xt(t) {
  const e = Se(t);
  let n = Dn(t);
  for (; n && Wo(n) && Oe(n).position === "static"; )
    n = Dn(n);
  return n && (Me(n) === "html" || Me(n) === "body" && Oe(n).position === "static" && !_i(n)) ? e : n || Xo(t) || e;
}
function Hn(t) {
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
function Uo(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: i
  } = t;
  const r = _e(n), o = Ce(n);
  if (n === o)
    return e;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const s = {
    x: 0,
    y: 0
  };
  if ((r || !r && i !== "fixed") && ((Me(n) !== "body" || ut(o)) && (l = dt(n)), _e(n))) {
    const a = Pe(n, !0);
    s.x = a.x + n.clientLeft, s.y = a.y + n.clientTop;
  }
  return {
    ...e,
    x: e.x - l.scrollLeft + s.x,
    y: e.y - l.scrollTop + s.y
  };
}
function qo(t, e) {
  const n = Se(t), i = Ce(t), r = n.visualViewport;
  let o = i.clientWidth, l = i.clientHeight, s = 0, a = 0;
  if (r) {
    o = r.width, l = r.height;
    const c = ki();
    (c || !c && e === "fixed") && (s = r.offsetLeft, a = r.offsetTop);
  }
  return {
    width: o,
    height: l,
    x: s,
    y: a
  };
}
function Ko(t) {
  var e;
  const n = Ce(t), i = dt(t), r = (e = t.ownerDocument) == null ? void 0 : e.body, o = Be(n.scrollWidth, n.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), l = Be(n.scrollHeight, n.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0);
  let s = -i.scrollLeft + xi(t);
  const a = -i.scrollTop;
  return Oe(r || n).direction === "rtl" && (s += Be(n.clientWidth, r ? r.clientWidth : 0) - o), {
    width: o,
    height: l,
    x: s,
    y: a
  };
}
function Mi(t) {
  const e = Ei(t);
  return ["html", "body", "#document"].includes(Me(e)) ? t.ownerDocument.body : _e(e) && ut(e) ? e : Mi(e);
}
function Si(t, e) {
  var n;
  e === void 0 && (e = []);
  const i = Mi(t), r = i === ((n = t.ownerDocument) == null ? void 0 : n.body), o = Se(i), l = r ? [o].concat(o.visualViewport || [], ut(i) ? i : []) : i, s = e.concat(l);
  return r ? s : s.concat(Si(l));
}
function Jo(t, e) {
  const n = e.getRootNode == null ? void 0 : e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && at(n)) {
    let i = e;
    do {
      if (i && t === i)
        return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
function Zo(t, e) {
  const n = Pe(t, !1, e === "fixed"), i = n.top + t.clientTop, r = n.left + t.clientLeft;
  return {
    top: i,
    left: r,
    x: r,
    y: i,
    right: r + t.clientWidth,
    bottom: i + t.clientHeight,
    width: t.clientWidth,
    height: t.clientHeight
  };
}
function Wn(t, e, n) {
  return e === "viewport" ? st(qo(t, n)) : Ve(e) ? Zo(e, n) : st(Ko(Ce(t)));
}
function Go(t) {
  const e = Si(t), i = ["absolute", "fixed"].includes(Oe(t).position) && _e(t) ? xt(t) : t;
  return Ve(i) ? e.filter((r) => Ve(r) && Jo(r, i) && Me(r) !== "body") : [];
}
function Qo(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: i,
    strategy: r
  } = t;
  const l = [...n === "clippingAncestors" ? Go(e) : [].concat(n), i], s = l[0], a = l.reduce((c, f) => {
    const h = Wn(e, f, r);
    return c.top = Be(h.top, c.top), c.right = Fn(h.right, c.right), c.bottom = Fn(h.bottom, c.bottom), c.left = Be(h.left, c.left), c;
  }, Wn(e, s, r));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
const $o = {
  getClippingRect: Qo,
  convertOffsetParentRelativeRectToViewportRelativeRect: Uo,
  isElement: Ve,
  getDimensions: Hn,
  getOffsetParent: xt,
  getDocumentElement: Ce,
  getElementRects: (t) => {
    let {
      reference: e,
      floating: n,
      strategy: i
    } = t;
    return {
      reference: Bo(e, xt(n), i),
      floating: {
        ...Hn(n),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => Oe(t).direction === "rtl"
}, es = (t, e, n) => Ao(t, e, {
  platform: $o,
  ...n
});
function ts(t) {
  let e, n, i, r, o, l, s, a, c, f, h;
  return {
    c() {
      e = _("div"), n = _("slot"), i = X(), r = _("div"), o = _("div"), l = X(), s = K(t[0]), a = X(), c = _("slot"), this.c = L, u(o, "class", "absolute triangle w-0 h-0"), u(c, "name", "text"), u(r, "role", "tooltip"), u(r, "class", `
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
      min-w-[12rem]
      z-[100]
    `), me(r, "transform", "translate(" + t[5] + "px, " + t[6] + "px)"), ae(r, "invisible", t[4]), u(e, "class", "relative"), u(e, "aria-describedby", "tooltip");
    },
    m(d, p) {
      A(d, e, p), w(e, n), w(e, i), w(e, r), w(r, o), t[10](o), w(r, l), w(r, s), w(r, a), w(r, c), t[11](r), t[12](e), f || (h = [
        U(e, "mouseenter", t[7]),
        U(e, "mouseleave", t[8])
      ], f = !0);
    },
    p(d, [p]) {
      p & 1 && Z(s, d[0]), p & 96 && me(r, "transform", "translate(" + d[5] + "px, " + d[6] + "px)"), p & 16 && ae(r, "invisible", d[4]);
    },
    i: L,
    o: L,
    d(d) {
      d && V(e), t[10](null), t[11](null), t[12](null), f = !1, pe(h);
    }
  };
}
function ns(t, e, n) {
  let { text: i = "" } = e, { location: r = "top" } = e, o, l, s, a = !0, c = 0, f = 0;
  const h = async () => {
    const y = await es(o, l, {
      placement: r,
      middleware: [Vo(7), Io(), Do({ padding: 5 }), zo({ element: s })]
    }), k = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right"
    }[y.placement.split("-")[0]], T = y.middlewareData.arrow?.x ?? 0, x = y.middlewareData.arrow?.y ?? 0;
    n(
      3,
      s.style.cssText = k === "right" || k === "left" ? `
      top: ${x}px;
      ${k}: ${T}px;
      margin-${k}: -10px;
      transform: ${k === "right" ? "rotate(90deg)" : "rotate(270deg)"};
    ` : `
      left: ${T}px;
      ${k}: ${x}px;
      margin-${k}: -6px;
      transform: ${k === "bottom" ? "rotate(180deg)" : ""};
    `,
      s
    ), n(5, c = y.x), n(6, f = y.y);
  }, d = async () => {
    await h(), n(4, a = !1);
  }, p = () => {
    n(4, a = !0);
  };
  fe();
  function b(y) {
    be[y ? "unshift" : "push"](() => {
      s = y, n(3, s);
    });
  }
  function v(y) {
    be[y ? "unshift" : "push"](() => {
      l = y, n(2, l);
    });
  }
  function m(y) {
    be[y ? "unshift" : "push"](() => {
      o = y, n(1, o);
    });
  }
  return t.$$set = (y) => {
    "text" in y && n(0, i = y.text), "location" in y && n(9, r = y.location);
  }, [
    i,
    o,
    l,
    s,
    a,
    c,
    f,
    d,
    p,
    r,
    b,
    v,
    m
  ];
}
class Ai extends te {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>.triangle{border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid black}</style>", se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      ns,
      ts,
      re,
      { text: 0, location: 9 },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
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
    return this.$$.ctx[9];
  }
  set location(e) {
    this.$$set({ location: e }), E();
  }
}
customElements.define("v-tooltip", Ai);
const is = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ai
}, Symbol.toStringTag, { value: "Module" }));
function rs(t) {
  let e, n, i, r;
  return {
    c() {
      e = _("style"), e.textContent = `v-tr[variant="success"] v-td::part(table-cell) {
      --tw-text-opacity: 1;
      color: rgba(4, 120, 87, var(--tw-text-opacity));
      /* @apply text-green-700; */
    }
    v-tr[variant="disabled"] v-td::part(table-cell) {
      --tw-text-opacity: 1;
      color: rgba(107, 114, 128, var(--tw-text-opacity));
      /* @apply text-gray-500; */
    }
    v-tr[variant="error"] v-td::part(table-cell) {
      --tw-text-opacity: 1;
      color: rgb(239 68 68 / var(--tw-text-opacity));
      /* @apply text-red-500; */
    }`, n = X(), i = _("tr"), r = _("slot"), this.c = L, u(i, "style", t[0]), u(i, "class", "border-b");
    },
    m(o, l) {
      w(document.head, e), A(o, n, l), A(o, i, l), w(i, r);
    },
    p(o, [l]) {
      l & 1 && u(i, "style", o[0]);
    },
    i: L,
    o: L,
    d(o) {
      V(e), o && V(n), o && V(i);
    }
  };
}
function os(t, e, n) {
  let { variant: i = "" } = e, { style: r = "" } = e;
  return fe(), t.$$set = (o) => {
    "variant" in o && n(1, i = o.variant), "style" in o && n(0, r = o.style);
  }, [r, i];
}
class Oi extends te {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = '<style>:host{display:contents !important}:host([variant="success"]) tr{--tw-bg-opacity:1;--tw-border-opacity:1;background-color:rgba(236, 253, 245, var(--tw-bg-opacity));border-color:rgba(209, 250, 229, var(--tw-border-opacity))}:host([variant="disabled"]) tr{--tw-bg-opacity:1;background-color:rgba(249, 250, 251, var(--tw-bg-opacity))}:host([variant="error"]) tr{--tw-bg-opacity:1;--tw-border-opacity:1;background-color:rgb(254 242 242 / var(--tw-bg-opacity));border-color:rgb(254 226 226 / var(--tw-border-opacity))}</style>', se(
      this,
      {
        target: this.shadowRoot,
        props: oe(this.attributes),
        customElement: !0
      },
      os,
      rs,
      re,
      { variant: 1, style: 0 },
      null
    ), e && (e.target && A(e.target, this, e.anchor), e.props && (this.$set(e.props), E()));
  }
  static get observedAttributes() {
    return ["variant", "style"];
  }
  get variant() {
    return this.$$.ctx[1];
  }
  set variant(e) {
    this.$$set({ variant: e }), E();
  }
  get style() {
    return this.$$.ctx[0];
  }
  set style(e) {
    this.$$set({ style: e }), E();
  }
}
customElements.define("v-tr", Oi);
const ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Oi
}, Symbol.toStringTag, { value: "Module" }));
