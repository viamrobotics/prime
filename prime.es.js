function y() {
}
function We(t) {
  return t();
}
function Qe() {
  return /* @__PURE__ */ Object.create(null);
}
function se(t) {
  t.forEach(We);
}
function Ft(t) {
  return typeof t == "function";
}
function Dt(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function G(t, e) {
  return t != t ? e == e : t !== e;
}
function Zn(t) {
  return Object.keys(t).length === 0;
}
function Xn(t, ...e) {
  if (t == null)
    return y;
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const It = typeof window < "u";
let $e = It ? () => window.performance.now() : () => Date.now(), Bt = It ? (t) => requestAnimationFrame(t) : y;
const de = /* @__PURE__ */ new Set();
function Wt(t) {
  de.forEach((e) => {
    e.c(t) || (de.delete(e), e.f());
  }), de.size !== 0 && Bt(Wt);
}
function qn(t) {
  let e;
  return de.size === 0 && Bt(Wt), {
    promise: new Promise((n) => {
      de.add(e = { c: t, f: n });
    }),
    abort() {
      de.delete(e);
    }
  };
}
function w(t, e) {
  t.appendChild(e);
}
function P(t, e, n) {
  t.insertBefore(e, n || null);
}
function T(t) {
  t.parentNode.removeChild(t);
}
function Ze(t, e) {
  for (let n = 0; n < t.length; n += 1)
    t[n] && t[n].d(e);
}
function k(t) {
  return document.createElement(t);
}
function ce(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function D(t) {
  return document.createTextNode(t);
}
function x() {
  return D(" ");
}
function Xe() {
  return D("");
}
function F(t, e, n, l) {
  return t.addEventListener(e, n, l), () => t.removeEventListener(e, n, l);
}
function et(t) {
  return function(e) {
    return e.preventDefault(), t.call(this, e);
  };
}
function u(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function Yn(t) {
  return Array.from(t.childNodes);
}
function W(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function $(t, e, n, l) {
  n === null ? t.style.removeProperty(e) : t.style.setProperty(e, n, l ? "important" : "");
}
function B(t, e, n) {
  t.classList[n ? "add" : "remove"](e);
}
function q(t) {
  const e = {};
  for (const n of t)
    e[n.name] = n.value;
  return e;
}
let ve;
function we(t) {
  ve = t;
}
function Zt() {
  if (!ve)
    throw new Error("Function called outside component initialization");
  return ve;
}
function Gn(t) {
  Zt().$$.on_mount.push(t);
}
const _e = [], K = [], Oe = [], tt = [], Un = Promise.resolve();
let He = !1;
function Kn() {
  He || (He = !0, Un.then(v));
}
function Ve(t) {
  Oe.push(t);
}
const ze = /* @__PURE__ */ new Set();
let Se = 0;
function v() {
  const t = ve;
  do {
    for (; Se < _e.length; ) {
      const e = _e[Se];
      Se++, we(e), Jn(e.$$);
    }
    for (we(null), _e.length = 0, Se = 0; K.length; )
      K.pop()();
    for (let e = 0; e < Oe.length; e += 1) {
      const n = Oe[e];
      ze.has(n) || (ze.add(n), n());
    }
    Oe.length = 0;
  } while (_e.length);
  for (; tt.length; )
    tt.pop()();
  He = !1, ze.clear(), we(t);
}
function Jn(t) {
  if (t.fragment !== null) {
    t.update(), se(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Ve);
  }
}
const Qn = /* @__PURE__ */ new Set();
function Xt(t, e) {
  t && t.i && (Qn.delete(t), t.i(e));
}
function qe(t, e) {
  t.d(1), e.delete(t.key);
}
function Ye(t, e, n, l, i, s, r, o, a, c, d, b) {
  let f = t.length, g = s.length, m = f;
  const h = {};
  for (; m--; )
    h[t[m].key] = m;
  const C = [], A = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Map();
  for (m = g; m--; ) {
    const E = b(i, s, m), L = n(E);
    let R = r.get(L);
    R ? l && R.p(E, e) : (R = c(L, E), R.c()), A.set(L, C[m] = R), L in h && j.set(L, Math.abs(m - h[L]));
  }
  const S = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set();
  function M(E) {
    Xt(E, 1), E.m(o, d), r.set(E.key, E), d = E.first, g--;
  }
  for (; f && g; ) {
    const E = C[g - 1], L = t[f - 1], R = E.key, O = L.key;
    E === L ? (d = E.first, f--, g--) : A.has(O) ? !r.has(R) || S.has(R) ? M(E) : p.has(O) ? f-- : j.get(R) > j.get(O) ? (p.add(R), M(E)) : (S.add(O), f--) : (a(L, r), f--);
  }
  for (; f--; ) {
    const E = t[f];
    A.has(E.key) || a(E, r);
  }
  for (; g; )
    M(C[g - 1]);
  return C;
}
function $n(t, e, n, l) {
  const { fragment: i, on_mount: s, on_destroy: r, after_update: o } = t.$$;
  i && i.m(e, n), l || Ve(() => {
    const a = s.map(We).filter(Ft);
    r ? r.push(...a) : se(a), t.$$.on_mount = [];
  }), o.forEach(Ve);
}
function el(t, e) {
  const n = t.$$;
  n.fragment !== null && (se(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
}
function tl(t, e) {
  t.$$.dirty[0] === -1 && (_e.push(t), Kn(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function Y(t, e, n, l, i, s, r, o = [-1]) {
  const a = ve;
  we(t);
  const c = t.$$ = {
    fragment: null,
    ctx: null,
    props: s,
    update: y,
    not_equal: i,
    bound: Qe(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (a ? a.$$.context : [])),
    callbacks: Qe(),
    dirty: o,
    skip_bound: !1,
    root: e.target || a.$$.root
  };
  r && r(c.root);
  let d = !1;
  if (c.ctx = n ? n(t, e.props || {}, (b, f, ...g) => {
    const m = g.length ? g[0] : f;
    return c.ctx && i(c.ctx[b], c.ctx[b] = m) && (!c.skip_bound && c.bound[b] && c.bound[b](m), d && tl(t, b)), f;
  }) : [], c.update(), d = !0, se(c.before_update), c.fragment = l ? l(c.ctx) : !1, e.target) {
    if (e.hydrate) {
      const b = Yn(e.target);
      c.fragment && c.fragment.l(b), b.forEach(T);
    } else
      c.fragment && c.fragment.c();
    e.intro && Xt(t.$$.fragment), $n(t, e.target, e.anchor, e.customElement), v();
  }
  we(a);
}
let X;
typeof HTMLElement == "function" && (X = class extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const { on_mount: t } = this.$$;
    this.$$.on_disconnect = t.map(We).filter(Ft);
    for (const e in this.$$.slotted)
      this.appendChild(this.$$.slotted[e]);
  }
  attributeChangedCallback(t, e, n) {
    this[t] = n;
  }
  disconnectedCallback() {
    se(this.$$.on_disconnect);
  }
  $destroy() {
    el(this, 1), this.$destroy = y;
  }
  $on(t, e) {
    const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return n.push(e), () => {
      const l = n.indexOf(e);
      l !== -1 && n.splice(l, 1);
    };
  }
  $set(t) {
    this.$$set && !Zn(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
});
const { base: Fe = "", query: De = "" } = window.PRIME_CONFIG ?? {}, Ge = document.createElement("link");
Ge.rel = "stylesheet";
Ge.href = `${Fe ?? ""}/prime.css${De}`;
const U = () => {
  const t = Zt();
  Gn(() => {
    const e = t.style.getPropertyValue("display");
    t.style.setProperty("display", "none");
    const n = Ge.cloneNode();
    n.addEventListener("load", () => {
      e ? t.style.setProperty("display", e) : t.style.removeProperty("display");
    }), t.shadowRoot.prepend(n);
  });
}, nl = async () => {
  const t = new FontFace("icons", Fe ? `url(${Fe}/icons.woff2${De})` : `url(icons.woff2${De})`);
  await t.load(), document.fonts.add(t);
}, le = (t, e, n) => t.dispatchEvent(new CustomEvent(e, {
  composed: !0,
  bubbles: !0,
  detail: n
}));
customElements.get("v-badge") ? console.warn("WARNING: Multiple instances of PRIME being imported.") : (nl().catch((t) => console.error(t)), Promise.resolve().then(() => sl), Promise.resolve().then(() => al), Promise.resolve().then(() => fl), Promise.resolve().then(() => bl), Promise.resolve().then(() => pl), Promise.resolve().then(() => yl), Promise.resolve().then(() => Pl), Promise.resolve().then(() => Tl), Promise.resolve().then(() => Ll), Promise.resolve().then(() => zl), Promise.resolve().then(() => Bl), Promise.resolve().then(() => Xl), Promise.resolve().then(() => Gl), Promise.resolve().then(() => Jl), Promise.resolve().then(() => $l), Promise.resolve().then(() => ni), Promise.resolve().then(() => si), Promise.resolve().then(() => ai), Promise.resolve().then(() => Fi), Promise.resolve().then(() => Bi));
var qt = { exports: {} };
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
(function(t) {
  (function() {
    var e = {}.hasOwnProperty;
    function n() {
      for (var l = [], i = 0; i < arguments.length; i++) {
        var s = arguments[i];
        if (!!s) {
          var r = typeof s;
          if (r === "string" || r === "number")
            l.push(s);
          else if (Array.isArray(s)) {
            if (s.length) {
              var o = n.apply(null, s);
              o && l.push(o);
            }
          } else if (r === "object")
            if (s.toString === Object.prototype.toString)
              for (var a in s)
                e.call(s, a) && s[a] && l.push(a);
            else
              l.push(s.toString());
        }
      }
      return l.join(" ");
    }
    t.exports ? (n.default = n, t.exports = n) : window.classNames = n;
  })();
})(qt);
const N = qt.exports;
function ll(t) {
  let e, n, l;
  return {
    c() {
      e = k("small"), n = D(t[0]), this.c = y, u(e, "class", l = N("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": t[1] === "green",
        "text-orange-900 bg-orange-200": t[1] === "orange",
        "text-red-900 bg-red-200": t[1] === "red",
        "text-gray-800 bg-gray-200": t[1] === "gray"
      }));
    },
    m(i, s) {
      P(i, e, s), w(e, n);
    },
    p(i, [s]) {
      s & 1 && W(n, i[0]), s & 2 && l !== (l = N("rounded-full px-3 py-0.5 text-xs", {
        "text-green-900 bg-green-200": i[1] === "green",
        "text-orange-900 bg-orange-200": i[1] === "orange",
        "text-red-900 bg-red-200": i[1] === "red",
        "text-gray-800 bg-gray-200": i[1] === "gray"
      })) && u(e, "class", l);
    },
    i: y,
    o: y,
    d(i) {
      i && T(e);
    }
  };
}
function il(t, e, n) {
  let { label: l = "" } = e, { variant: i = "gray" } = e;
  return U(), t.$$set = (s) => {
    "label" in s && n(0, l = s.label), "variant" in s && n(1, i = s.variant);
  }, [l, i];
}
class Yt extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, il, ll, G, { label: 0, variant: 1 }, null), e && (e.target && P(e.target, this, e.anchor), e.props && (this.$set(e.props), v()));
  }
  static get observedAttributes() {
    return ["label", "variant"];
  }
  get label() {
    return this.$$.ctx[0];
  }
  set label(e) {
    this.$$set({ label: e }), v();
  }
  get variant() {
    return this.$$.ctx[1];
  }
  set variant(e) {
    this.$$set({ variant: e }), v();
  }
}
customElements.define("v-badge", Yt);
const sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yt
}, Symbol.toStringTag, { value: "Module" }));
function nt(t, e, n) {
  const l = t.slice();
  return l[2] = e[n], l[4] = n, l;
}
function lt(t) {
  let e;
  return {
    c() {
      e = k("div"), e.innerHTML = `<div class="w-px h-[60%] border-l border-black -rotate-[30deg] -mt-px"></div> 
        <div class="w-px h-[60%] border-l border-black rotate-[30deg] -mt-0.5"></div> 
      `;
    },
    m(n, l) {
      P(n, e, l);
    },
    d(n) {
      n && T(e);
    }
  };
}
function it(t, e) {
  let n, l = e[2] + "", i, s, r, o = e[4] !== e[0].length - 1 && lt();
  return {
    key: t,
    first: null,
    c() {
      n = k("small"), i = D(l), s = x(), o && o.c(), r = Xe(), u(n, "class", "py1"), this.first = n;
    },
    m(a, c) {
      P(a, n, c), w(n, i), P(a, s, c), o && o.m(a, c), P(a, r, c);
    },
    p(a, c) {
      e = a, c & 1 && l !== (l = e[2] + "") && W(i, l), e[4] !== e[0].length - 1 ? o || (o = lt(), o.c(), o.m(r.parentNode, r)) : o && (o.d(1), o = null);
    },
    d(a) {
      a && T(n), a && T(s), o && o.d(a), a && T(r);
    }
  };
}
function rl(t) {
  let e, n = [], l = /* @__PURE__ */ new Map(), i = t[0];
  const s = (r) => r[2];
  for (let r = 0; r < i.length; r += 1) {
    let o = nt(t, i, r), a = s(o);
    l.set(a, n[r] = it(a, o));
  }
  return {
    c() {
      e = k("div");
      for (let r = 0; r < n.length; r += 1)
        n[r].c();
      this.c = y, u(e, "class", "inline-flex gap-3 px-4 border border-black rounded-full");
    },
    m(r, o) {
      P(r, e, o);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
    },
    p(r, [o]) {
      o & 1 && (i = r[0], n = Ye(n, o, s, 1, r, i, l, e, qe, it, null, nt));
    },
    i: y,
    o: y,
    d(r) {
      r && T(e);
      for (let o = 0; o < n.length; o += 1)
        n[o].d();
    }
  };
}
function ol(t, e, n) {
  let { crumbs: l = "" } = e;
  U();
  let i;
  return t.$$set = (s) => {
    "crumbs" in s && n(1, l = s.crumbs);
  }, t.$$.update = () => {
    t.$$.dirty & 2 && n(0, i = l.split(",").map((s) => s.trim()));
  }, [i, l];
}
class Gt extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, ol, rl, G, { crumbs: 1 }, null), e && (e.target && P(e.target, this, e.anchor), e.props && (this.$set(e.props), v()));
  }
  static get observedAttributes() {
    return ["crumbs"];
  }
  get crumbs() {
    return this.$$.ctx[1];
  }
  set crumbs(e) {
    this.$$set({ crumbs: e }), v();
  }
}
customElements.define("v-breadcrumbs", Gt);
const al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gt
}, Symbol.toStringTag, { value: "Module" }));
function st(t) {
  let e, n;
  return {
    c() {
      e = k("i"), u(e, "aria-hidden", ""), u(e, "class", n = "icon-" + t[4] + " text-base");
    },
    m(l, i) {
      P(l, e, i);
    },
    p(l, i) {
      i & 16 && n !== (n = "icon-" + l[4] + " text-base") && u(e, "class", n);
    },
    d(l) {
      l && T(e);
    }
  };
}
function cl(t) {
  let e, n, l, i, s = t[4] && st(t);
  return {
    c() {
      e = k("button"), s && s.c(), n = x(), l = D(t[3]), this.c = y, u(e, "type", t[1]), u(e, "class", i = N("flex items-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": t[0] === "true",
        "bg-white border-black": t[2] === "primary",
        "bg-red/90 text-white border-red/90": t[2] === "danger",
        "bg-green/90 border-green/90 text-white": t[2] === "success",
        "bg-white border-red/90 text-red/90": t[2] === "outline-danger"
      }));
    },
    m(r, o) {
      P(r, e, o), s && s.m(e, null), w(e, n), w(e, l);
    },
    p(r, [o]) {
      r[4] ? s ? s.p(r, o) : (s = st(r), s.c(), s.m(e, n)) : s && (s.d(1), s = null), o & 8 && W(l, r[3]), o & 2 && u(e, "type", r[1]), o & 5 && i !== (i = N("flex items-center gap-1.5 py-1.5 px-2 text-xs border", {
        "cursor-not-allowed opacity-50 pointer-events-none": r[0] === "true",
        "bg-white border-black": r[2] === "primary",
        "bg-red/90 text-white border-red/90": r[2] === "danger",
        "bg-green/90 border-green/90 text-white": r[2] === "success",
        "bg-white border-red/90 text-red/90": r[2] === "outline-danger"
      })) && u(e, "class", i);
    },
    i: y,
    o: y,
    d(r) {
      r && T(e), s && s.d();
    }
  };
}
function ul(t, e, n) {
  let { disabled: l = "false" } = e, { type: i = "button" } = e, { variant: s = "primary" } = e, { label: r = "" } = e, { icon: o = "" } = e;
  return U(), t.$$set = (a) => {
    "disabled" in a && n(0, l = a.disabled), "type" in a && n(1, i = a.type), "variant" in a && n(2, s = a.variant), "label" in a && n(3, r = a.label), "icon" in a && n(4, o = a.icon);
  }, [l, i, s, r, o];
}
class Ut extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, ul, cl, G, {
      disabled: 0,
      type: 1,
      variant: 2,
      label: 3,
      icon: 4
    }, null), e && (e.target && P(e.target, this, e.anchor), e.props && (this.$set(e.props), v()));
  }
  static get observedAttributes() {
    return ["disabled", "type", "variant", "label", "icon"];
  }
  get disabled() {
    return this.$$.ctx[0];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), v();
  }
  get type() {
    return this.$$.ctx[1];
  }
  set type(e) {
    this.$$set({ type: e }), v();
  }
  get variant() {
    return this.$$.ctx[2];
  }
  set variant(e) {
    this.$$set({ variant: e }), v();
  }
  get label() {
    return this.$$.ctx[3];
  }
  set label(e) {
    this.$$set({ label: e }), v();
  }
  get icon() {
    return this.$$.ctx[4];
  }
  set icon(e) {
    this.$$set({ icon: e }), v();
  }
}
customElements.define("v-button", Ut);
const fl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ut
}, Symbol.toStringTag, { value: "Module" }));
function rt(t) {
  let e, n;
  return {
    c() {
      e = k("h2"), n = D(t[1]), u(e, "class", "text-sm");
    },
    m(l, i) {
      P(l, e, i), w(e, n);
    },
    p(l, i) {
      i & 2 && W(n, l[1]);
    },
    d(l) {
      l && T(e);
    }
  };
}
function dl(t) {
  let e, n, l, i, s, r, o, a, c, d, b, f, g, m, h, C, A, j, S = t[1] && rt(t);
  return {
    c() {
      e = k("div"), n = k("div"), l = k("div"), S && S.c(), i = x(), s = k("slot"), r = x(), o = k("div"), a = k("slot"), c = x(), d = ce("svg"), b = ce("polyline"), g = x(), m = k("div"), h = k("slot"), this.c = y, u(s, "name", "title"), u(l, "class", "flex items-center gap-2"), u(a, "name", "header"), u(b, "points", "6 9 12 15 18 9"), u(d, "class", f = N("transition-transform duration-200", {
        "rotate-0": !t[0],
        "rotate-180": t[0]
      })), u(d, "width", "24"), u(d, "height", "24"), u(d, "viewBox", "0 0 24 24"), u(d, "stroke", "currentColor"), u(d, "stroke-linejoin", "round"), u(d, "stroke-linecap", "round"), u(d, "fill", "none"), u(o, "class", "h-full flex items-center gap-3"), u(n, "class", "w-full py-1.5 px-4 flex items-center justify-between border text-black border-black bg-white cursor-pointer"), u(m, "class", C = N("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !t[0],
        "max-h-fit": t[0]
      })), u(e, "class", "relative w-full overflow-hidden");
    },
    m(p, M) {
      P(p, e, M), w(e, n), w(n, l), S && S.m(l, null), w(l, i), w(l, s), w(n, r), w(n, o), w(o, a), w(o, c), w(o, d), w(d, b), w(e, g), w(e, m), w(m, h), t[4](e), A || (j = F(n, "click", t[3]), A = !0);
    },
    p(p, [M]) {
      p[1] ? S ? S.p(p, M) : (S = rt(p), S.c(), S.m(l, i)) : S && (S.d(1), S = null), M & 1 && f !== (f = N("transition-transform duration-200", {
        "rotate-0": !p[0],
        "rotate-180": p[0]
      })) && u(d, "class", f), M & 1 && C !== (C = N("bg-white text-black overflow-hidden transition-all duration-500", {
        "max-h-0": !p[0],
        "max-h-fit": p[0]
      })) && u(m, "class", C);
    },
    i: y,
    o: y,
    d(p) {
      p && T(e), S && S.d(), t[4](null), A = !1, j();
    }
  };
}
function hl(t, e, n) {
  let { title: l = "" } = e, { open: i = !1 } = e, s;
  U();
  const r = (a) => {
    a.target.getAttribute("slot") !== "header" && (n(0, i = !i), le(s, "toggle", { open: i }));
  };
  function o(a) {
    K[a ? "unshift" : "push"](() => {
      s = a, n(2, s);
    });
  }
  return t.$$set = (a) => {
    "title" in a && n(1, l = a.title), "open" in a && n(0, i = a.open);
  }, [i, l, s, r, o];
}
class Kt extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, hl, dl, G, { title: 1, open: 0 }, null), e && (e.target && P(e.target, this, e.anchor), e.props && (this.$set(e.props), v()));
  }
  static get observedAttributes() {
    return ["title", "open"];
  }
  get title() {
    return this.$$.ctx[1];
  }
  set title(e) {
    this.$$set({ title: e }), v();
  }
  get open() {
    return this.$$.ctx[0];
  }
  set open(e) {
    this.$$set({ open: e }), v();
  }
}
customElements.define("v-collapse", Kt);
const bl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Kt
}, Symbol.toStringTag, { value: "Module" }));
function ml(t) {
  let e, n, l, i, s, r, o, a;
  return {
    c() {
      e = k("div"), n = k("div"), n.innerHTML = '<slot name="target"></slot>', l = x(), i = k("div"), s = k("slot"), this.c = y, u(n, "class", "inline-block"), u(s, "name", "content"), u(i, "class", r = N("absolute z-10", {
        "left-0": t[1],
        "right-0": t[1],
        "overflow-hidden": t[1],
        invisible: !t[0]
      })), u(e, "class", "relative inline-block");
    },
    m(c, d) {
      P(c, e, d), w(e, n), w(e, l), w(e, i), w(i, s), t[4](e), o || (a = F(n, "click", t[3]), o = !0);
    },
    p(c, [d]) {
      d & 3 && r !== (r = N("absolute z-10", {
        "left-0": c[1],
        "right-0": c[1],
        "overflow-hidden": c[1],
        invisible: !c[0]
      })) && u(i, "class", r);
    },
    i: y,
    o: y,
    d(c) {
      c && T(e), t[4](null), o = !1, a();
    }
  };
}
function gl(t, e, n) {
  let { open: l = null } = e, { match: i = null } = e, s;
  U();
  const r = () => {
    n(0, l = !l), le(s, "toggle", { open: l });
  };
  function o(a) {
    K[a ? "unshift" : "push"](() => {
      s = a, n(2, s);
    });
  }
  return t.$$set = (a) => {
    "open" in a && n(0, l = a.open), "match" in a && n(1, i = a.match);
  }, t.$$.update = () => {
    t.$$.dirty & 2 && n(1, i = i === ""), t.$$.dirty & 1 && n(0, l = l === "" || l);
  }, [l, i, s, r, o];
}
class Jt extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, gl, ml, G, { open: 0, match: 1 }, null), e && (e.target && P(e.target, this, e.anchor), e.props && (this.$set(e.props), v()));
  }
  static get observedAttributes() {
    return ["open", "match"];
  }
  get open() {
    return this.$$.ctx[0];
  }
  set open(e) {
    this.$$set({ open: e }), v();
  }
  get match() {
    return this.$$.ctx[1];
  }
  set match(e) {
    this.$$set({ match: e }), v();
  }
}
customElements.define("v-dropdown", Jt);
const pl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jt
}, Symbol.toStringTag, { value: "Module" }));
function _l(t) {
  let e, n;
  return {
    c() {
      e = k("i"), this.c = y, u(e, "aria-hidden", ""), u(e, "class", n = "icon-" + t[0] + " text-" + t[1]);
    },
    m(l, i) {
      P(l, e, i);
    },
    p(l, [i]) {
      i & 3 && n !== (n = "icon-" + l[0] + " text-" + l[1]) && u(e, "class", n);
    },
    i: y,
    o: y,
    d(l) {
      l && T(e);
    }
  };
}
function wl(t, e, n) {
  let { name: l = "" } = e, { size: i = "base" } = e;
  return U(), t.$$set = (s) => {
    "name" in s && n(0, l = s.name), "size" in s && n(1, i = s.size);
  }, [l, i];
}
class Qt extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, wl, _l, G, { name: 0, size: 1 }, null), e && (e.target && P(e.target, this, e.anchor), e.props && (this.$set(e.props), v()));
  }
  static get observedAttributes() {
    return ["name", "size"];
  }
  get name() {
    return this.$$.ctx[0];
  }
  set name(e) {
    this.$$set({ name: e }), v();
  }
  get size() {
    return this.$$.ctx[1];
  }
  set size(e) {
    this.$$set({ size: e }), v();
  }
}
customElements.define("v-icon", Qt);
const yl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qt
}, Symbol.toStringTag, { value: "Module" }));
function ot(t) {
  let e, n, l;
  return {
    c() {
      e = k("p"), n = D(t[3]), u(e, "class", l = N("text-xs", {
        "inline whitespace-nowrap": t[4] === "left"
      }));
    },
    m(i, s) {
      P(i, e, s), w(e, n);
    },
    p(i, s) {
      s & 8 && W(n, i[3]), s & 16 && l !== (l = N("text-xs", {
        "inline whitespace-nowrap": i[4] === "left"
      })) && u(e, "class", l);
    },
    d(i) {
      i && T(e);
    }
  };
}
function at(t) {
  let e, n, l, i, s, r, o, a;
  return {
    c() {
      e = k("div"), n = k("button"), i = x(), s = k("button"), u(n, "aria-label", l = "Increment up by " + t[8]), u(n, "class", "icon-chevron-down rotate-180 text-[15px]"), u(s, "aria-label", r = "Increment down by " + t[8]), u(s, "class", "icon-chevron-down text-[15px]"), u(e, "class", "absolute right-0.5 bottom-0 cursor-pointer select-none flex flex-col");
    },
    m(c, d) {
      P(c, e, d), w(e, n), w(e, i), w(e, s), o || (a = [
        F(n, "click", t[14]),
        F(s, "click", t[15])
      ], o = !0);
    },
    p(c, d) {
      d & 256 && l !== (l = "Increment up by " + c[8]) && u(n, "aria-label", l), d & 256 && r !== (r = "Increment down by " + c[8]) && u(s, "aria-label", r);
    },
    d(c) {
      c && T(e), o = !1, se(a);
    }
  };
}
function vl(t) {
  let e, n, l, i, s, r, o, a = t[3] && ot(t), c = t[1] === "number" && at(t);
  return {
    c() {
      e = k("label"), a && a.c(), n = x(), l = k("input"), i = x(), c && c.c(), this.c = y, u(l, "type", t[1]), u(l, "placeholder", t[2]), l.value = t[0], l.readOnly = t[7], u(l, "class", "w-full py-1.5 px-2.5 border text-xs border-black bg-white outline-none appearance-none"), u(e, "class", s = N("relative flex gap-1 max-w-[14rem]", {
        "flex-col": t[4] === "top",
        "items-center": t[4] === "left"
      }));
    },
    m(d, b) {
      P(d, e, b), a && a.m(e, null), w(e, n), w(e, l), t[13](l), w(e, i), c && c.m(e, null), t[16](e), r || (o = F(l, "input", t[9]), r = !0);
    },
    p(d, [b]) {
      d[3] ? a ? a.p(d, b) : (a = ot(d), a.c(), a.m(e, n)) : a && (a.d(1), a = null), b & 2 && u(l, "type", d[1]), b & 4 && u(l, "placeholder", d[2]), b & 1 && l.value !== d[0] && (l.value = d[0]), b & 128 && (l.readOnly = d[7]), d[1] === "number" ? c ? c.p(d, b) : (c = at(d), c.c(), c.m(e, null)) : c && (c.d(1), c = null), b & 16 && s !== (s = N("relative flex gap-1 max-w-[14rem]", {
        "flex-col": d[4] === "top",
        "items-center": d[4] === "left"
      })) && u(e, "class", s);
    },
    i: y,
    o: y,
    d(d) {
      d && T(e), a && a.d(), t[13](null), c && c.d(), t[16](null), r = !1, o();
    }
  };
}
function kl(t, e, n) {
  let { type: l = "text" } = e, { placeholder: i = "" } = e, { readonly: s = "false" } = e, { label: r = "" } = e, { value: o = "" } = e, { step: a = "1" } = e, { labelposition: c = "top" } = e, d, b, f, g;
  U();
  const m = (p) => {
    p.preventDefault(), p.stopImmediatePropagation(), n(0, o = b.value), le(d, "input", { value: o });
  }, h = (p) => {
    const M = Number.parseFloat(o || "0");
    n(0, o = n(6, b.value = String(M + g * p), b)), le(d, "input", { value: o });
  };
  function C(p) {
    K[p ? "unshift" : "push"](() => {
      b = p, n(6, b);
    });
  }
  const A = () => h(1), j = () => h(-1);
  function S(p) {
    K[p ? "unshift" : "push"](() => {
      d = p, n(5, d);
    });
  }
  return t.$$set = (p) => {
    "type" in p && n(1, l = p.type), "placeholder" in p && n(2, i = p.placeholder), "readonly" in p && n(11, s = p.readonly), "label" in p && n(3, r = p.label), "value" in p && n(0, o = p.value), "step" in p && n(12, a = p.step), "labelposition" in p && n(4, c = p.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 2048 && n(7, f = s === "readonly" || s === ""), t.$$.dirty & 4096 && n(8, g = Number.parseFloat(a));
  }, [
    o,
    l,
    i,
    r,
    c,
    d,
    b,
    f,
    g,
    m,
    h,
    s,
    a,
    C,
    A,
    j,
    S
  ];
}
class $t extends X {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}</style>", Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, kl, vl, G, {
      type: 1,
      placeholder: 2,
      readonly: 11,
      label: 3,
      value: 0,
      step: 12,
      labelposition: 4
    }, null), e && (e.target && P(e.target, this, e.anchor), e.props && (this.$set(e.props), v()));
  }
  static get observedAttributes() {
    return ["type", "placeholder", "readonly", "label", "value", "step", "labelposition"];
  }
  get type() {
    return this.$$.ctx[1];
  }
  set type(e) {
    this.$$set({ type: e }), v();
  }
  get placeholder() {
    return this.$$.ctx[2];
  }
  set placeholder(e) {
    this.$$set({ placeholder: e }), v();
  }
  get readonly() {
    return this.$$.ctx[11];
  }
  set readonly(e) {
    this.$$set({ readonly: e }), v();
  }
  get label() {
    return this.$$.ctx[3];
  }
  set label(e) {
    this.$$set({ label: e }), v();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), v();
  }
  get step() {
    return this.$$.ctx[12];
  }
  set step(e) {
    this.$$set({ step: e }), v();
  }
  get labelposition() {
    return this.$$.ctx[4];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), v();
  }
}
customElements.define("v-input", $t);
const Pl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $t
}, Symbol.toStringTag, { value: "Module" }));
function El(t) {
  let e;
  return {
    c() {
      e = ce("path"), u(e, "d", "M6.33 3.66667H7.66666V5H6.33333V3.66667ZM6.33 6.33333H7.66666V10.3333H6.33333V6.33333ZM7 0.333334C3.31999 0.333334 0.333328 3.32 0.333328 7C0.333328 10.68 3.31999 13.6667 7 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.32 10.68 0.333334 7 0.333334ZM7 12.3333C4.06 12.3333 1.66666 9.94 1.66666 7C1.66666 4.06 4.06 1.66667 7 1.66667C9.93999 1.66667 12.3333 4.06 12.3333 7C12.3333 9.94 9.93999 12.3333 7 12.3333Z"), u(e, "fill", "#045681");
    },
    m(n, l) {
      P(n, e, l);
    },
    d(n) {
      n && T(e);
    }
  };
}
function Sl(t) {
  let e;
  return {
    c() {
      e = ce("path"), u(e, "d", "M4 7.78L1.22 5L0.273331 5.94L4 9.66667L12 1.66667L11.06 0.726665L4 7.78Z"), u(e, "fill", "#397F48");
    },
    m(n, l) {
      P(n, e, l);
    },
    d(n) {
      n && T(e);
    }
  };
}
function Ol(t) {
  let e;
  return {
    c() {
      e = ce("path"), u(e, "d", "M8 2.99333L13.02 11.6667H2.98L8 2.99333ZM8 0.333328L0.666672 13H15.3333L8 0.333328ZM8.66667 9.66666H7.33334V11H8.66667V9.66666ZM8.66667 5.66666H7.33334V8.33333H8.66667V5.66666Z"), u(e, "fill", "#FF9900");
    },
    m(n, l) {
      P(n, e, l);
    },
    d(n) {
      n && T(e);
    }
  };
}
function Cl(t) {
  let e;
  return {
    c() {
      e = ce("path"), u(e, "d", "M6.33 9H7.66666V10.3333H6.33333V9ZM6.33 3.66666H7.66666V7.66666H6.33333V3.66666ZM6.99333 0.333328C3.31333 0.333328 0.333328 3.31999 0.333328 7C0.333328 10.68 3.31333 13.6667 6.99333 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.31999 10.68 0.333328 6.99333 0.333328ZM7 12.3333C4.05333 12.3333 1.66666 9.94666 1.66666 7C1.66666 4.05333 4.05333 1.66666 7 1.66666C9.94666 1.66666 12.3333 4.05333 12.3333 7C12.3333 9.94666 9.94666 12.3333 7 12.3333Z"), u(e, "fill", "#BE3026");
    },
    m(n, l) {
      P(n, e, l);
    },
    d(n) {
      n && T(e);
    }
  };
}
function ct(t) {
  let e, n;
  return {
    c() {
      e = k("p"), n = D(t[1]), u(e, "class", "text-xs");
    },
    m(l, i) {
      P(l, e, i), w(e, n);
    },
    p(l, i) {
      i & 2 && W(n, l[1]);
    },
    d(l) {
      l && T(e);
    }
  };
}
function Ml(t) {
  let e, n, l, i, s, r, o, a, c;
  function d(m, h) {
    if (m[2] === "error")
      return Cl;
    if (m[2] === "warning")
      return Ol;
    if (m[2] === "success")
      return Sl;
    if (m[2] === "info")
      return El;
  }
  let b = d(t), f = b && b(t), g = t[1] && ct(t);
  return {
    c() {
      e = k("div"), n = k("div"), l = ce("svg"), f && f.c(), i = x(), s = k("figure"), r = k("figcaption"), o = D(t[0]), a = x(), g && g.c(), this.c = y, u(l, "width", "14"), u(l, "height", "14"), u(l, "viewBox", "0 0 15 15"), u(l, "fill", "none"), u(l, "xmlns", "http://www.w3.org/2000/svg"), u(n, "class", "mt-1"), u(r, "class", "text-sm"), u(e, "class", c = N("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": t[3] === "gray",
        "bg-white": t[3] === "white",
        "border-red/90": t[2] === "error",
        "border-orange/90": t[2] === "warning",
        "border-green/90": t[2] === "success",
        "border-blue/90": t[2] === "info"
      }));
    },
    m(m, h) {
      P(m, e, h), w(e, n), w(n, l), f && f.m(l, null), w(e, i), w(e, s), w(s, r), w(r, o), w(s, a), g && g.m(s, null);
    },
    p(m, [h]) {
      b !== (b = d(m)) && (f && f.d(1), f = b && b(m), f && (f.c(), f.m(l, null))), h & 1 && W(o, m[0]), m[1] ? g ? g.p(m, h) : (g = ct(m), g.c(), g.m(s, null)) : g && (g.d(1), g = null), h & 12 && c !== (c = N("flex gap-2 border-l-4 py-2 px-2", {
        "bg-gray-100": m[3] === "gray",
        "bg-white": m[3] === "white",
        "border-red/90": m[2] === "error",
        "border-orange/90": m[2] === "warning",
        "border-green/90": m[2] === "success",
        "border-blue/90": m[2] === "info"
      })) && u(e, "class", c);
    },
    i: y,
    o: y,
    d(m) {
      m && T(e), f && f.d(), g && g.d();
    }
  };
}
function Al(t, e, n) {
  let { title: l = "" } = e, { message: i = "" } = e, { variant: s = "info" } = e, { background: r = "gray" } = e;
  return U(), t.$$set = (o) => {
    "title" in o && n(0, l = o.title), "message" in o && n(1, i = o.message), "variant" in o && n(2, s = o.variant), "background" in o && n(3, r = o.background);
  }, [l, i, s, r];
}
class en extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, Al, Ml, G, {
      title: 0,
      message: 1,
      variant: 2,
      background: 3
    }, null), e && (e.target && P(e.target, this, e.anchor), e.props && (this.$set(e.props), v()));
  }
  static get observedAttributes() {
    return ["title", "message", "variant", "background"];
  }
  get title() {
    return this.$$.ctx[0];
  }
  set title(e) {
    this.$$set({ title: e }), v();
  }
  get message() {
    return this.$$.ctx[1];
  }
  set message(e) {
    this.$$set({ message: e }), v();
  }
  get variant() {
    return this.$$.ctx[2];
  }
  set variant(e) {
    this.$$set({ variant: e }), v();
  }
  get background() {
    return this.$$.ctx[3];
  }
  set background(e) {
    this.$$set({ background: e }), v();
  }
}
customElements.define("v-notify", en);
const Tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: en
}, Symbol.toStringTag, { value: "Module" }));
function ut(t, e, n) {
  const l = t.slice();
  return l[9] = e[n], l;
}
function ft(t) {
  let e, n, l;
  return {
    c() {
      e = k("p"), n = D(t[1]), u(e, "class", l = N("text-xs", {
        "pb-1": t[2] === "top",
        inline: t[2] === "left"
      }));
    },
    m(i, s) {
      P(i, e, s), w(e, n);
    },
    p(i, s) {
      s & 2 && W(n, i[1]), s & 4 && l !== (l = N("text-xs", {
        "pb-1": i[2] === "top",
        inline: i[2] === "left"
      })) && u(e, "class", l);
    },
    d(i) {
      i && T(e);
    }
  };
}
function dt(t) {
  let e, n = t[9] + "", l, i, s, r, o;
  function a() {
    return t[8](t[9]);
  }
  return {
    c() {
      e = k("button"), l = D(n), i = x(), u(e, "class", s = N("border-y border-l last:border-r border-black px-2 py-1 text-sm", {
        "bg-white": t[9] !== t[0],
        "bg-black text-white": t[9] === t[0]
      }));
    },
    m(c, d) {
      P(c, e, d), w(e, l), w(e, i), t[7](e), r || (o = F(e, "click", a), r = !0);
    },
    p(c, d) {
      t = c, d & 16 && n !== (n = t[9] + "") && W(l, n), d & 17 && s !== (s = N("border-y border-l last:border-r border-black px-2 py-1 text-sm", {
        "bg-white": t[9] !== t[0],
        "bg-black text-white": t[9] === t[0]
      })) && u(e, "class", s);
    },
    d(c) {
      c && T(e), t[7](null), r = !1, o();
    }
  };
}
function Rl(t) {
  let e, n, l = t[1] && ft(t), i = t[4], s = [];
  for (let r = 0; r < i.length; r += 1)
    s[r] = dt(ut(t, i, r));
  return {
    c() {
      e = k("label"), l && l.c(), n = x();
      for (let r = 0; r < s.length; r += 1)
        s[r].c();
      this.c = y;
    },
    m(r, o) {
      P(r, e, o), l && l.m(e, null), w(e, n);
      for (let a = 0; a < s.length; a += 1)
        s[a].m(e, null);
    },
    p(r, [o]) {
      if (r[1] ? l ? l.p(r, o) : (l = ft(r), l.c(), l.m(e, n)) : l && (l.d(1), l = null), o & 57) {
        i = r[4];
        let a;
        for (a = 0; a < i.length; a += 1) {
          const c = ut(r, i, a);
          s[a] ? s[a].p(c, o) : (s[a] = dt(c), s[a].c(), s[a].m(e, null));
        }
        for (; a < s.length; a += 1)
          s[a].d(1);
        s.length = i.length;
      }
    },
    i: y,
    o: y,
    d(r) {
      r && T(e), l && l.d(), Ze(s, r);
    }
  };
}
function jl(t, e, n) {
  let { label: l = "" } = e, { options: i = "" } = e, { selected: s = "" } = e, { labelposition: r = "top" } = e;
  U();
  let o, a;
  const c = (f) => {
    n(0, s = f), le(o, "input", { value: f });
  };
  function d(f) {
    K[f ? "unshift" : "push"](() => {
      o = f, n(3, o);
    });
  }
  const b = (f) => c(f);
  return t.$$set = (f) => {
    "label" in f && n(1, l = f.label), "options" in f && n(6, i = f.options), "selected" in f && n(0, s = f.selected), "labelposition" in f && n(2, r = f.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 64 && n(4, a = i.split(",").map((f) => f.trim()));
  }, [
    s,
    l,
    r,
    o,
    a,
    c,
    i,
    d,
    b
  ];
}
class tn extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, jl, Rl, G, {
      label: 1,
      options: 6,
      selected: 0,
      labelposition: 2
    }, null), e && (e.target && P(e.target, this, e.anchor), e.props && (this.$set(e.props), v()));
  }
  static get observedAttributes() {
    return ["label", "options", "selected", "labelposition"];
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), v();
  }
  get options() {
    return this.$$.ctx[6];
  }
  set options(e) {
    this.$$set({ options: e }), v();
  }
  get selected() {
    return this.$$.ctx[0];
  }
  set selected(e) {
    this.$$set({ selected: e }), v();
  }
  get labelposition() {
    return this.$$.ctx[2];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), v();
  }
}
customElements.define("v-radio", tn);
const Ll = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tn
}, Symbol.toStringTag, { value: "Module" }));
function ht(t, e, n) {
  const l = t.slice();
  return l[12] = e[n], l;
}
function bt(t) {
  let e, n, l;
  return {
    c() {
      e = k("p"), n = D(t[1]), u(e, "class", l = N("text-xs pb-1", {
        "pb-1": t[2] === "top",
        inline: t[2] === "left"
      }));
    },
    m(i, s) {
      P(i, e, s), w(e, n);
    },
    p(i, s) {
      s & 2 && W(n, i[1]), s & 4 && l !== (l = N("text-xs pb-1", {
        "pb-1": i[2] === "top",
        inline: i[2] === "left"
      })) && u(e, "class", l);
    },
    d(i) {
      i && T(e);
    }
  };
}
function mt(t, e) {
  let n, l = e[12] + "", i, s, r, o;
  return {
    key: t,
    first: null,
    c() {
      n = k("option"), i = D(l), s = x(), n.selected = r = e[6] === e[12], n.__value = o = `
        ` + e[12] + `
      `, n.value = n.__value, this.first = n;
    },
    m(a, c) {
      P(a, n, c), w(n, i), w(n, s);
    },
    p(a, c) {
      e = a, c & 8 && l !== (l = e[12] + "") && W(i, l), c & 72 && r !== (r = e[6] === e[12]) && (n.selected = r), c & 8 && o !== (o = `
        ` + e[12] + `
      `) && (n.__value = o, n.value = n.__value);
    },
    d(a) {
      a && T(n);
    }
  };
}
function Nl(t) {
  let e, n, l, i, s = (t[0] || "Please select") + "", r, o, a = [], c = /* @__PURE__ */ new Map(), d, b, f = t[1] && bt(t), g = t[3];
  const m = (h) => h[12];
  for (let h = 0; h < g.length; h += 1) {
    let C = ht(t, g, h), A = m(C);
    c.set(A, a[h] = mt(A, C));
  }
  return {
    c() {
      e = k("label"), f && f.c(), n = x(), l = k("select"), i = k("option"), r = D(s), o = x();
      for (let h = 0; h < a.length; h += 1)
        a[h].c();
      this.c = y, i.__value = "", i.value = i.__value, u(l, "class", N(gt, "py-1 px-2.5 text-xs border border-black appearance-none rounded-none")), u(e, "class", N(gt, "relative"));
    },
    m(h, C) {
      P(h, e, C), f && f.m(e, null), w(e, n), w(e, l), w(l, i), w(i, r), w(i, o);
      for (let A = 0; A < a.length; A += 1)
        a[A].m(l, null);
      t[10](l), t[11](e), d || (b = F(l, "input", t[7]), d = !0);
    },
    p(h, [C]) {
      h[1] ? f ? f.p(h, C) : (f = bt(h), f.c(), f.m(e, n)) : f && (f.d(1), f = null), C & 1 && s !== (s = (h[0] || "Please select") + "") && W(r, s), C & 72 && (g = h[3], a = Ye(a, C, m, 1, h, g, c, l, qe, mt, null, ht));
    },
    i: y,
    o: y,
    d(h) {
      h && T(e), f && f.d();
      for (let C = 0; C < a.length; C += 1)
        a[C].d();
      t[10](null), t[11](null), d = !1, b();
    }
  };
}
const gt = "max-w-[14rem] w-full";
function xl(t, e, n) {
  let { options: l = "" } = e, { value: i = "" } = e, { placeholder: s = "" } = e, { label: r = "" } = e, { labelposition: o = "top" } = e, a, c, d, b;
  U();
  const f = (h) => {
    h.preventDefault(), h.stopImmediatePropagation(), n(8, i = c.value.trim()), le(a, "input", { value: i });
  };
  function g(h) {
    K[h ? "unshift" : "push"](() => {
      c = h, n(5, c), n(3, d), n(9, l);
    });
  }
  function m(h) {
    K[h ? "unshift" : "push"](() => {
      a = h, n(4, a);
    });
  }
  return t.$$set = (h) => {
    "options" in h && n(9, l = h.options), "value" in h && n(8, i = h.value), "placeholder" in h && n(0, s = h.placeholder), "label" in h && n(1, r = h.label), "labelposition" in h && n(2, o = h.labelposition);
  }, t.$$.update = () => {
    t.$$.dirty & 512 && n(3, d = l.split(",").map((h) => h.trim())), t.$$.dirty & 264 && n(6, b = d.find((h) => h === i) ?? "");
  }, [
    s,
    r,
    o,
    d,
    a,
    c,
    b,
    f,
    i,
    l,
    g,
    m
  ];
}
class nn extends X {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>label{--select-chevron-color:black;--select-chevron-size:15px}label::after{content:'';position:absolute;background-color:var(--select-chevron-color);clip-path:polygon(25% 25%, 17.5% 32.5%, 40% 55%, 50% 65%, 60% 55%, 82.5% 32.5%, 75% 25%, 50% 50%);width:var(--select-chevron-size);height:var(--select-chevron-size);right:2px;bottom:2px}</style>", Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, xl, Nl, G, {
      options: 9,
      value: 8,
      placeholder: 0,
      label: 1,
      labelposition: 2
    }, null), e && (e.target && P(e.target, this, e.anchor), e.props && (this.$set(e.props), v()));
  }
  static get observedAttributes() {
    return ["options", "value", "placeholder", "label", "labelposition"];
  }
  get options() {
    return this.$$.ctx[9];
  }
  set options(e) {
    this.$$set({ options: e }), v();
  }
  get value() {
    return this.$$.ctx[8];
  }
  set value(e) {
    this.$$set({ value: e }), v();
  }
  get placeholder() {
    return this.$$.ctx[0];
  }
  set placeholder(e) {
    this.$$set({ placeholder: e }), v();
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), v();
  }
  get labelposition() {
    return this.$$.ctx[2];
  }
  set labelposition(e) {
    this.$$set({ labelposition: e }), v();
  }
}
customElements.define("v-select", nn);
const zl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nn
}, Symbol.toStringTag, { value: "Module" })), fe = [];
function Hl(t, e = y) {
  let n;
  const l = /* @__PURE__ */ new Set();
  function i(o) {
    if (Dt(t, o) && (t = o, n)) {
      const a = !fe.length;
      for (const c of l)
        c[1](), fe.push(c, t);
      if (a) {
        for (let c = 0; c < fe.length; c += 2)
          fe[c][0](fe[c + 1]);
        fe.length = 0;
      }
    }
  }
  function s(o) {
    i(o(t));
  }
  function r(o, a = y) {
    const c = [o, a];
    return l.add(c), l.size === 1 && (n = e(i) || y), o(t), () => {
      l.delete(c), l.size === 0 && (n(), n = null);
    };
  }
  return { set: i, update: s, subscribe: r };
}
function pt(t) {
  return Object.prototype.toString.call(t) === "[object Date]";
}
function Ie(t, e, n, l) {
  if (typeof n == "number" || pt(n)) {
    const i = l - n, s = (n - e) / (t.dt || 1 / 60), r = t.opts.stiffness * i, o = t.opts.damping * s, a = (r - o) * t.inv_mass, c = (s + a) * t.dt;
    return Math.abs(c) < t.opts.precision && Math.abs(i) < t.opts.precision ? l : (t.settled = !1, pt(n) ? new Date(n.getTime() + c) : n + c);
  } else {
    if (Array.isArray(n))
      return n.map((i, s) => Ie(t, e[s], n[s], l[s]));
    if (typeof n == "object") {
      const i = {};
      for (const s in n)
        i[s] = Ie(t, e[s], n[s], l[s]);
      return i;
    } else
      throw new Error(`Cannot spring ${typeof n} values`);
  }
}
function Vl(t, e = {}) {
  const n = Hl(t), { stiffness: l = 0.15, damping: i = 0.8, precision: s = 0.01 } = e;
  let r, o, a, c = t, d = t, b = 1, f = 0, g = !1;
  function m(C, A = {}) {
    d = C;
    const j = a = {};
    if (t == null || A.hard || h.stiffness >= 1 && h.damping >= 1)
      return g = !0, r = $e(), c = C, n.set(t = d), Promise.resolve();
    if (A.soft) {
      const S = A.soft === !0 ? 0.5 : +A.soft;
      f = 1 / (S * 60), b = 0;
    }
    return o || (r = $e(), g = !1, o = qn((S) => {
      if (g)
        return g = !1, o = null, !1;
      b = Math.min(b + f, 1);
      const p = {
        inv_mass: b,
        opts: h,
        settled: !0,
        dt: (S - r) * 60 / 1e3
      }, M = Ie(p, c, t, d);
      return r = S, c = t, n.set(t = M), p.settled && (o = null), !p.settled;
    })), new Promise((S) => {
      o.promise.then(() => {
        j === a && S();
      });
    });
  }
  const h = {
    set: m,
    update: (C, A) => m(C(d, t), A),
    subscribe: n.subscribe,
    stiffness: l,
    damping: i,
    precision: s
  };
  return h;
}
const Fl = (t, e, n) => t <= e ? e : t >= n ? n : t, Ce = (t, e, n, l) => {
  const i = (t - e) / (n - e) * 100;
  return Number.isNaN(i) || i <= 0 ? 0 : i >= 100 ? 100 : Number.parseFloat(i.toFixed(l));
};
function _t(t, e, n) {
  const l = t.slice();
  return l[53] = e[n], l[55] = n, l;
}
function wt(t, e, n) {
  const l = t.slice();
  return l[6] = e[n], l[57] = n, l;
}
function yt(t) {
  let e, n;
  return {
    c() {
      e = k("p"), n = D(t[4]), u(e, "class", "text-xs");
    },
    m(l, i) {
      P(l, e, i), w(e, n);
    },
    p(l, i) {
      i[0] & 16 && W(n, l[4]);
    },
    d(l) {
      l && T(e);
    }
  };
}
function vt(t) {
  let e, n;
  return {
    c() {
      e = k("span"), n = D(t[5]), u(e, "class", "floating-suffix");
    },
    m(l, i) {
      P(l, e, i), w(e, n);
    },
    p(l, i) {
      i[0] & 32 && W(n, l[5]);
    },
    d(l) {
      l && T(e);
    }
  };
}
function kt(t) {
  let e, n, l, i, s, r, o = t[6] + "", a, c, d, b, f, g, m, h, C, A, j, S = t[5] && vt(t);
  function p() {
    return t[37](t[57]);
  }
  return {
    c() {
      e = k("span"), n = k("span"), l = x(), i = k("span"), s = x(), r = k("span"), a = D(o), c = x(), S && S.c(), u(n, "class", "handle-bg absolute left-0 bottom-1 rounded-full opacity-50 h-full w-full transition-transform bg-gray-400"), u(i, "class", "absolute left-0 bottom-1 block rounded-full h-full w-full border border-black bg-white"), u(r, "class", d = N("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })), u(e, "role", "slider"), u(e, "class", "range absolute block h-5 w-5 top-1 bottom-auto -translate-x-1/2 -translate-y-1/2 z-[2]"), u(e, "data-handle", b = t[57]), $(e, "left", t[17][t[57]] + "%"), $(e, "z-index", t[15] === t[57] ? 3 : 2), u(e, "aria-valuemin", f = t[0] === !0 && t[57] === 1 ? t[9] : t[7]), u(e, "aria-valuemax", g = t[0] === !0 && t[57] === 0 ? t[10] : t[8]), u(e, "aria-valuenow", m = t[6]), u(e, "aria-valuetext", h = t[6]?.toString()), u(e, "aria-orientation", "horizontal"), u(e, "aria-disabled", t[2]), u(e, "disabled", t[2]), u(e, "tabindex", C = t[2] ? -1 : 0), B(e, "active", t[13] && t[15] === t[57]), B(e, "press", t[14] && t[15] === t[57]);
    },
    m(M, E) {
      P(M, e, E), w(e, n), w(e, l), w(e, i), w(e, s), w(e, r), w(r, a), w(r, c), S && S.m(r, null), A || (j = [
        F(e, "blur", t[20]),
        F(e, "focus", p)
      ], A = !0);
    },
    p(M, E) {
      t = M, E[0] & 1536 && o !== (o = t[6] + "") && W(a, o), t[5] ? S ? S.p(t, E) : (S = vt(t), S.c(), S.m(r, null)) : S && (S.d(1), S = null), E[0] & 40960 && d !== (d = N("floating block absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-1/2", "py-1 px-1.5 text-sm text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 border border-black bg-white", {
        "-translate-y-1.5": !t[13] || t[15] !== t[57]
      })) && u(r, "class", d), E[0] & 131072 && $(e, "left", t[17][t[57]] + "%"), E[0] & 32768 && $(e, "z-index", t[15] === t[57] ? 3 : 2), E[0] & 641 && f !== (f = t[0] === !0 && t[57] === 1 ? t[9] : t[7]) && u(e, "aria-valuemin", f), E[0] & 1281 && g !== (g = t[0] === !0 && t[57] === 0 ? t[10] : t[8]) && u(e, "aria-valuemax", g), E[0] & 1536 && m !== (m = t[6]) && u(e, "aria-valuenow", m), E[0] & 1536 && h !== (h = t[6]?.toString()) && u(e, "aria-valuetext", h), E[0] & 4 && u(e, "aria-disabled", t[2]), E[0] & 4 && u(e, "disabled", t[2]), E[0] & 4 && C !== (C = t[2] ? -1 : 0) && u(e, "tabindex", C), E[0] & 40960 && B(e, "active", t[13] && t[15] === t[57]), E[0] & 49152 && B(e, "press", t[14] && t[15] === t[57]);
    },
    d(M) {
      M && T(e), S && S.d(), A = !1, se(j);
    }
  };
}
function Pt(t) {
  let e;
  return {
    c() {
      e = k("span"), u(e, "class", "absolute block transition duration-200 h-1 -top-0.5 select-none z-[1] bg-black"), $(e, "left", t[18](t[17]) + "%"), $(e, "right", t[19](t[17]) + "%");
    },
    m(n, l) {
      P(n, e, l);
    },
    p(n, l) {
      l[0] & 131072 && $(e, "left", n[18](n[17]) + "%"), l[0] & 131072 && $(e, "right", n[19](n[17]) + "%");
    },
    d(n) {
      n && T(e);
    }
  };
}
function Et(t) {
  let e, n;
  return {
    c() {
      e = k("span"), n = D(t[5]), u(e, "class", "pipVal-suffix");
    },
    m(l, i) {
      P(l, e, i), w(e, n);
    },
    p(l, i) {
      i[0] & 32 && W(n, l[5]);
    },
    d(l) {
      l && T(e);
    }
  };
}
function St(t) {
  let e, n = Array.from({ length: t[12] + 1 }), l = [];
  for (let i = 0; i < n.length; i += 1)
    l[i] = Ct(_t(t, n, i));
  return {
    c() {
      for (let i = 0; i < l.length; i += 1)
        l[i].c();
      e = Xe();
    },
    m(i, s) {
      for (let r = 0; r < l.length; r += 1)
        l[r].m(i, s);
      P(i, e, s);
    },
    p(i, s) {
      if (s[0] & 70016) {
        n = Array.from({ length: i[12] + 1 });
        let r;
        for (r = 0; r < n.length; r += 1) {
          const o = _t(i, n, r);
          l[r] ? l[r].p(o, s) : (l[r] = Ct(o), l[r].c(), l[r].m(e.parentNode, e));
        }
        for (; r < l.length; r += 1)
          l[r].d(1);
        l.length = n.length;
      }
    },
    d(i) {
      Ze(l, i), i && T(e);
    }
  };
}
function Ot(t) {
  let e;
  return {
    c() {
      e = k("span"), u(e, "class", "absolute h-[4px] w-[1px] top-[calc(50%-9px)] whitespace-nowrap transition bg-black/50"), $(e, "left", Ce(t[16](t[55]), t[7], t[8], 2) + "%");
    },
    m(n, l) {
      P(n, e, l);
    },
    p(n, l) {
      l[0] & 65920 && $(e, "left", Ce(n[16](n[55]), n[7], n[8], 2) + "%");
    },
    d(n) {
      n && T(e);
    }
  };
}
function Ct(t) {
  let e = t[16](t[55]) !== t[7] && t[16](t[55]) !== t[8], n, l = e && Ot(t);
  return {
    c() {
      l && l.c(), n = Xe();
    },
    m(i, s) {
      l && l.m(i, s), P(i, n, s);
    },
    p(i, s) {
      s[0] & 65920 && (e = i[16](i[55]) !== i[7] && i[16](i[55]) !== i[8]), e ? l ? l.p(i, s) : (l = Ot(i), l.c(), l.m(n.parentNode, n)) : l && (l.d(1), l = null);
    },
    d(i) {
      l && l.d(i), i && T(n);
    }
  };
}
function Mt(t) {
  let e, n;
  return {
    c() {
      e = k("span"), n = D(t[5]), u(e, "class", "pipVal-suffix");
    },
    m(l, i) {
      P(l, e, i), w(e, n);
    },
    p(l, i) {
      i[0] & 32 && W(n, l[5]);
    },
    d(l) {
      l && T(e);
    }
  };
}
function Dl(t) {
  let e, n, l, i, s, r, o, a, c, d, b, f, g, m, h, C, A, j = t[4] && yt(t), S = t[10] ? [t[9], t[10]] : [t[9]], p = [];
  for (let O = 0; O < S.length; O += 1)
    p[O] = kt(wt(t, S, O));
  let M = t[0] && Pt(t), E = t[5] && Et(t), L = t[3] && St(t), R = t[5] && Mt(t);
  return {
    c() {
      e = k("label"), j && j.c(), n = x(), l = k("div");
      for (let O = 0; O < p.length; O += 1)
        p[O].c();
      i = x(), M && M.c(), s = x(), r = k("div"), o = k("small"), a = D(t[7]), c = x(), E && E.c(), d = x(), L && L.c(), b = x(), f = k("small"), g = D(t[8]), m = x(), R && R.c(), this.c = y, u(o, "class", "absolute bottom-full left-0 -translate-x-1/2 mb-3 whitespace-nowrap"), u(f, "class", "absolute bottom-full right-0 translate-x-1/2 mb-3 whitespace-nowrap"), u(r, "class", "absolute h-2 left-0 right-0"), B(r, "disabled", t[2]), B(r, "focus", t[13]), u(l, "class", h = N("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": t[2] })), B(l, "range", t[0]), B(l, "focus", t[13]), B(l, "min", t[0] === "min"), B(l, "max", t[0] === "max"), u(e, "class", "flex flex-col gap-2");
    },
    m(O, z) {
      P(O, e, z), j && j.m(e, null), w(e, n), w(e, l);
      for (let H = 0; H < p.length; H += 1)
        p[H].m(l, null);
      w(l, i), M && M.m(l, null), w(l, s), w(l, r), w(r, o), w(o, a), w(o, c), E && E.m(o, null), w(r, d), L && L.m(r, null), w(r, b), w(r, f), w(f, g), w(f, m), R && R.m(f, null), t[38](l), C || (A = [
        F(window, "mousedown", t[24]),
        F(window, "touchstart", t[24]),
        F(window, "mousemove", t[25]),
        F(window, "touchmove", t[25]),
        F(window, "mouseup", t[26]),
        F(window, "touchend", t[27]),
        F(window, "keydown", t[28]),
        F(l, "mousedown", t[22]),
        F(l, "mouseup", t[23]),
        F(l, "touchstart", et(t[22])),
        F(l, "touchend", et(t[23]))
      ], C = !0);
    },
    p(O, z) {
      if (O[4] ? j ? j.p(O, z) : (j = yt(O), j.c(), j.m(e, n)) : j && (j.d(1), j = null), z[0] & 3336101) {
        S = O[10] ? [O[9], O[10]] : [O[9]];
        let H;
        for (H = 0; H < S.length; H += 1) {
          const J = wt(O, S, H);
          p[H] ? p[H].p(J, z) : (p[H] = kt(J), p[H].c(), p[H].m(l, i));
        }
        for (; H < p.length; H += 1)
          p[H].d(1);
        p.length = S.length;
      }
      O[0] ? M ? M.p(O, z) : (M = Pt(O), M.c(), M.m(l, s)) : M && (M.d(1), M = null), z[0] & 128 && W(a, O[7]), O[5] ? E ? E.p(O, z) : (E = Et(O), E.c(), E.m(o, null)) : E && (E.d(1), E = null), O[3] ? L ? L.p(O, z) : (L = St(O), L.c(), L.m(r, b)) : L && (L.d(1), L = null), z[0] & 256 && W(g, O[8]), O[5] ? R ? R.p(O, z) : (R = Mt(O), R.c(), R.m(f, null)) : R && (R.d(1), R = null), z[0] & 4 && B(r, "disabled", O[2]), z[0] & 8192 && B(r, "focus", O[13]), z[0] & 4 && h !== (h = N("slider relative h-0.5 mt-7 transition-opacity duration-200 select-none pip-labels bg-black/50", { "opacity-50": O[2] })) && u(l, "class", h), z[0] & 5 && B(l, "range", O[0]), z[0] & 8196 && B(l, "focus", O[13]), z[0] & 5 && B(l, "min", O[0] === "min"), z[0] & 5 && B(l, "max", O[0] === "max");
    },
    i: y,
    o: y,
    d(O) {
      O && T(e), j && j.d(), Ze(p, O), M && M.d(), E && E.d(), L && L.d(), R && R.d(), t[38](null), C = !1, se(A);
    }
  };
}
function Il(t, e, n) {
  let l, i, s = y, r = () => (s(), s = Xn(ge, (_) => n(17, i = _)), ge);
  t.$$.on_destroy.push(() => s());
  let { slider: o } = e, { range: a = !1 } = e, { min: c } = e, { max: d } = e, { step: b } = e, { value: f } = e, { start: g } = e, { end: m } = e, { disabled: h = !1 } = e, { discrete: C = !0 } = e, { label: A = "" } = e, { suffix: j = "" } = e;
  U();
  const S = { stiffness: 0.1, damping: 0.4 };
  let p, M, E, L, R, O, z, H = 0, J = !1, ee = !1, Q = !1, be = !1, oe = -1, Ee, me, ge;
  const pe = (_, V, Z) => {
    if (_ <= V)
      return V;
    if (_ >= Z)
      return Z;
    const I = (_ - V) % E;
    let ne = _ - I;
    return Math.abs(I) * 2 >= E && (ne += I > 0 ? E : -E), ne = Fl(ne, V, Z), Number.parseFloat(ne.toFixed(2));
  }, Ne = (_) => _.type.includes("touch") ? _.touches[0] : _, En = (_) => {
    const V = [...o.querySelectorAll(".handle")], Z = V.includes(_), I = V.some((ne) => ne.contains(_));
    return Z || I;
  }, Sn = (_) => a === "min" || a === "max" ? _.slice(0, 1) : a ? _.slice(0, 2) : _, On = () => {
    me = o.getBoundingClientRect();
  }, Cn = (_) => {
    const Z = (_.clientX - me.left) / me.width * 100, I = (M - p) / 100 * Z + p;
    let ne = 0;
    return a && L === R ? I > R ? 1 : 0 : (a && (ne = [L, R].indexOf([L, R].sort((Bn, Wn) => Math.abs(I - Bn) - Math.abs(I - Wn))[0])), ne);
  }, xe = (_) => {
    const Z = (_.clientX - me.left) / me.width * 100, I = (M - p) / 100 * Z + p;
    Mn(oe, I);
  }, Mn = (_, V) => {
    let Z = _;
    const I = pe(V, p, M);
    return typeof Z > "u" && (Z = oe), a && (Z === 0 && I > R ? n(10, R = I) : Z === 1 && I < L && n(9, L = I)), Z === 0 && L !== I && n(9, L = I), Z === 1 && R !== I && n(10, R = I), Ee !== I && (Fn(), Ee = I), Z === 0 ? n(29, g = L.toString()) : Z === 1 && n(30, m = R.toString()), I;
  }, An = (_) => a === "min" ? 0 : _[0], Tn = (_) => a === "max" ? 0 : a === "min" ? 100 - _[0] : 100 - _[1], Rn = () => {
    be && (n(13, J = !1), ee = !1, n(14, Q = !1));
  }, Je = (_) => {
    h || (n(15, oe = _), n(13, J = !0));
  }, jn = (_) => {
    if (h)
      return;
    On();
    const V = _.target, Z = Ne(_);
    n(13, J = !0), ee = !0, n(14, Q = !0), n(15, oe = Cn(Z)), Ee = pe(oe === 0 ? L : R, p, M), _.type === "touchstart" && !V.matches(".pipVal") && xe(Z);
  }, Ln = () => {
    n(14, Q = !1);
  }, Nn = (_) => {
    be = !1, J && _.target !== o && !o.contains(_.target) && n(13, J = !1);
  }, xn = (_) => {
    h || !ee || (n(13, J = !0), xe(Ne(_)));
  }, zn = (_) => {
    if (!h) {
      const V = _.target;
      (ee && V && V === o || o.contains(V)) && (n(13, J = !0), !En(V) && !V.matches(".pipVal") && xe(Ne(_)));
    }
    ee = !1, n(14, Q = !1);
  }, Hn = () => {
    ee = !1, n(14, Q = !1);
  }, Vn = (_) => {
    h || (_.target === o || o.contains(_.target)) && (be = !0);
  }, Fn = () => {
    h || le(o, "input", {
      activeHandle: oe,
      previousValue: Ee,
      value: oe === 0 ? L : R,
      values: R ? [L, R].map((_) => pe(_, p, M)) : void 0
    });
  }, Dn = (_) => Je(_);
  function In(_) {
    K[_ ? "unshift" : "push"](() => {
      o = _, n(1, o);
    });
  }
  return t.$$set = (_) => {
    "slider" in _ && n(1, o = _.slider), "range" in _ && n(0, a = _.range), "min" in _ && n(31, c = _.min), "max" in _ && n(32, d = _.max), "step" in _ && n(33, b = _.step), "value" in _ && n(6, f = _.value), "start" in _ && n(29, g = _.start), "end" in _ && n(30, m = _.end), "disabled" in _ && n(2, h = _.disabled), "discrete" in _ && n(3, C = _.discrete), "label" in _ && n(4, A = _.label), "suffix" in _ && n(5, j = _.suffix);
  }, t.$$.update = () => {
    if (t.$$.dirty[1] & 2 && n(8, M = Number.parseFloat(d || "100")), t.$$.dirty[1] & 1 && n(7, p = Number.parseFloat(c || "0")), t.$$.dirty[1] & 4 && n(34, E = Number.parseFloat(b || "1")), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(35, O = (M - p) / E >= 100 ? (M - p) / 20 : 1), t.$$.dirty[0] & 384 | t.$$.dirty[1] & 8 && n(12, z = (M - p) / E), t.$$.dirty[0] & 128 | t.$$.dirty[1] & 24 && n(16, l = (_) => p + _ * E * O), t.$$.dirty[0] & 536870976 | t.$$.dirty[1] & 3 && n(9, L = g || f ? Number.parseFloat(g || f) : (Number.parseFloat(c || "0") + Number.parseFloat(d || "100")) / 2), t.$$.dirty[0] & 1073741824 && n(10, R = m ? Number.parseFloat(m) : void 0), t.$$.dirty[0] & 1073741825 && n(0, a = typeof a == "string" ? a : m !== void 0), t.$$.dirty[0] & 3968 | t.$$.dirty[1] & 32) {
      n(9, L = pe(L, p, M));
      let _ = [L];
      R && (n(10, R = pe(R, p, M)), _.push(R)), _ = Sn(_), H !== _.length ? r(n(11, ge = Vl(_.map((V) => Ce(V, p, M, 2)), S))) : ge.set(_.map((V) => Ce(V, p, M, 2))).catch((V) => console.error(V)), n(36, H = _.length);
    }
  }, [
    a,
    o,
    h,
    C,
    A,
    j,
    f,
    p,
    M,
    L,
    R,
    ge,
    z,
    J,
    Q,
    oe,
    l,
    i,
    An,
    Tn,
    Rn,
    Je,
    jn,
    Ln,
    Nn,
    xn,
    zn,
    Hn,
    Vn,
    g,
    m,
    c,
    d,
    b,
    E,
    O,
    H,
    Dn,
    In
  ];
}
class ln extends X {
  constructor(e) {
    super(), this.shadowRoot.innerHTML = "<style>.slider .range:hover .handle-bg{transform:scale(1.5)}.slider .range.active .handle-bg{transform:scale(2.0)}.slider .range.active .floating,.slider .range:hover .floating{opacity:1}</style>", Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, Il, Dl, Dt, {
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
    }, null, [-1, -1]), e && (e.target && P(e.target, this, e.anchor), e.props && (this.$set(e.props), v()));
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
    this.$$set({ slider: e }), v();
  }
  get range() {
    return this.$$.ctx[0];
  }
  set range(e) {
    this.$$set({ range: e }), v();
  }
  get min() {
    return this.$$.ctx[31];
  }
  set min(e) {
    this.$$set({ min: e }), v();
  }
  get max() {
    return this.$$.ctx[32];
  }
  set max(e) {
    this.$$set({ max: e }), v();
  }
  get step() {
    return this.$$.ctx[33];
  }
  set step(e) {
    this.$$set({ step: e }), v();
  }
  get value() {
    return this.$$.ctx[6];
  }
  set value(e) {
    this.$$set({ value: e }), v();
  }
  get start() {
    return this.$$.ctx[29];
  }
  set start(e) {
    this.$$set({ start: e }), v();
  }
  get end() {
    return this.$$.ctx[30];
  }
  set end(e) {
    this.$$set({ end: e }), v();
  }
  get disabled() {
    return this.$$.ctx[2];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), v();
  }
  get discrete() {
    return this.$$.ctx[3];
  }
  set discrete(e) {
    this.$$set({ discrete: e }), v();
  }
  get label() {
    return this.$$.ctx[4];
  }
  set label(e) {
    this.$$set({ label: e }), v();
  }
  get suffix() {
    return this.$$.ctx[5];
  }
  set suffix(e) {
    this.$$set({ suffix: e }), v();
  }
}
customElements.define("v-slider", ln);
const Bl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ln
}, Symbol.toStringTag, { value: "Module" }));
function At(t) {
  let e, n;
  return {
    c() {
      e = k("p"), n = D(t[0]), u(e, "class", "capitalize text-xs");
    },
    m(l, i) {
      P(l, e, i), w(e, n);
    },
    p(l, i) {
      i & 1 && W(n, l[0]);
    },
    d(l) {
      l && T(e);
    }
  };
}
function Wl(t) {
  let e, n, l, i, s, r, o, a, c, d, b, f = t[3] === "labeled" && At(t);
  return {
    c() {
      e = k("label"), n = k("button"), l = k("span"), i = x(), s = k("input"), a = x(), f && f.c(), this.c = y, u(l, "class", "pointer-events-none relative inline-block border border-green/100 h-4 w-4 mt-px ml-px bg-white shadow transform ring-0 motion-safe:transition-transform ease-in-out duration-200"), B(l, "translate-x-0", !t[6]), B(l, "translate-x-6", t[6]), u(s, "name", t[2]), s.value = t[0], u(s, "class", "hidden"), u(s, "type", "checkbox"), s.checked = t[6], u(n, "type", "button"), u(n, "class", r = N("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": t[6] })), u(n, "role", "switch"), u(n, "aria-label", t[1]), u(n, "aria-checked", o = t[6] ? "true" : "false"), u(e, "class", c = N("flex items-center gap-1.5", {
        "opacity-50 pointer-events-none": t[7]
      }));
    },
    m(g, m) {
      P(g, e, m), w(e, n), w(n, l), w(n, i), w(n, s), t[10](s), w(e, a), f && f.m(e, null), t[11](e), d || (b = F(n, "click", t[8]), d = !0);
    },
    p(g, [m]) {
      m & 64 && B(l, "translate-x-0", !g[6]), m & 64 && B(l, "translate-x-6", g[6]), m & 4 && u(s, "name", g[2]), m & 1 && (s.value = g[0]), m & 64 && (s.checked = g[6]), m & 64 && r !== (r = N("relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none", { "bg-green/80": g[6] })) && u(n, "class", r), m & 2 && u(n, "aria-label", g[1]), m & 64 && o !== (o = g[6] ? "true" : "false") && u(n, "aria-checked", o), g[3] === "labeled" ? f ? f.p(g, m) : (f = At(g), f.c(), f.m(e, null)) : f && (f.d(1), f = null), m & 128 && c !== (c = N("flex items-center gap-1.5", {
        "opacity-50 pointer-events-none": g[7]
      })) && u(e, "class", c);
    },
    i: y,
    o: y,
    d(g) {
      g && T(e), t[10](null), f && f.d(), t[11](null), d = !1, b();
    }
  };
}
function Zl(t, e, n) {
  let { label: l = "" } = e, { name: i = "" } = e, { value: s = "off" } = e, { variant: r = "default" } = e, { disabled: o = "false" } = e;
  U();
  let a, c, d, b;
  const f = () => {
    n(0, s = d ? "off" : "on"), n(5, c.checked = d, c), le(a, "input", { value: c.checked });
  };
  function g(h) {
    K[h ? "unshift" : "push"](() => {
      c = h, n(5, c);
    });
  }
  function m(h) {
    K[h ? "unshift" : "push"](() => {
      a = h, n(4, a);
    });
  }
  return t.$$set = (h) => {
    "label" in h && n(1, l = h.label), "name" in h && n(2, i = h.name), "value" in h && n(0, s = h.value), "variant" in h && n(3, r = h.variant), "disabled" in h && n(9, o = h.disabled);
  }, t.$$.update = () => {
    t.$$.dirty & 1 && n(6, d = s === "on"), t.$$.dirty & 512 && n(7, b = o === "true");
  }, [
    s,
    l,
    i,
    r,
    a,
    c,
    d,
    b,
    f,
    o,
    g,
    m
  ];
}
class sn extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, Zl, Wl, G, {
      label: 1,
      name: 2,
      value: 0,
      variant: 3,
      disabled: 9
    }, null), e && (e.target && P(e.target, this, e.anchor), e.props && (this.$set(e.props), v()));
  }
  static get observedAttributes() {
    return ["label", "name", "value", "variant", "disabled"];
  }
  get label() {
    return this.$$.ctx[1];
  }
  set label(e) {
    this.$$set({ label: e }), v();
  }
  get name() {
    return this.$$.ctx[2];
  }
  set name(e) {
    this.$$set({ name: e }), v();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(e) {
    this.$$set({ value: e }), v();
  }
  get variant() {
    return this.$$.ctx[3];
  }
  set variant(e) {
    this.$$set({ variant: e }), v();
  }
  get disabled() {
    return this.$$.ctx[9];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), v();
  }
}
customElements.define("v-switch", sn);
const Xl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sn
}, Symbol.toStringTag, { value: "Module" }));
function ql(t) {
  let e;
  return {
    c() {
      e = k("table"), e.innerHTML = "<slot></slot>", this.c = y, u(e, "class", "bg-white table-fixed text-xs w-full");
    },
    m(n, l) {
      P(n, e, l);
    },
    p: y,
    i: y,
    o: y,
    d(n) {
      n && T(e);
    }
  };
}
function Yl(t) {
  return U(), [];
}
class rn extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, Yl, ql, G, {}, null), e && e.target && P(e.target, this, e.anchor);
  }
}
customElements.define("v-table", rn);
const Gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rn
}, Symbol.toStringTag, { value: "Module" }));
function Tt(t, e, n) {
  const l = t.slice();
  return l[8] = e[n], l[10] = n, l;
}
function Rt(t, e) {
  let n, l = e[8] + "", i, s, r, o, a;
  function c() {
    return e[6](e[8]);
  }
  return {
    key: t,
    first: null,
    c() {
      n = k("button"), i = D(l), s = x(), u(n, "class", r = N("px-4 py-1 uppercase text-sm first:ml-4", {
        "bg-white border border-x-black border-t-black border-b-white font-bold": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })), this.first = n;
    },
    m(d, b) {
      P(d, n, b), w(n, i), w(n, s), o || (a = F(n, "click", c), o = !0);
    },
    p(d, b) {
      e = d, b & 2 && l !== (l = e[8] + "") && W(i, l), b & 11 && r !== (r = N("px-4 py-1 uppercase text-sm first:ml-4", {
        "bg-white border border-x-black border-t-black border-b-white font-bold": e[8] === e[0],
        "text-black/70": e[8] !== e[0],
        "border-l border-l-gray-300": e[3] > e[10],
        "border-r border-r-gray-300": e[3] < e[10]
      })) && u(n, "class", r);
    },
    d(d) {
      d && T(n), o = !1, a();
    }
  };
}
function Ul(t) {
  let e, n = [], l = /* @__PURE__ */ new Map(), i = t[1];
  const s = (r) => r[8];
  for (let r = 0; r < i.length; r += 1) {
    let o = Tt(t, i, r), a = s(o);
    l.set(a, n[r] = Rt(a, o));
  }
  return {
    c() {
      e = k("div");
      for (let r = 0; r < n.length; r += 1)
        n[r].c();
      this.c = y, u(e, "class", "w-full flex bg-black/20");
    },
    m(r, o) {
      P(r, e, o);
      for (let a = 0; a < n.length; a += 1)
        n[a].m(e, null);
      t[7](e);
    },
    p(r, [o]) {
      o & 27 && (i = r[1], n = Ye(n, o, s, 1, r, i, l, e, qe, Rt, null, Tt));
    },
    i: y,
    o: y,
    d(r) {
      r && T(e);
      for (let o = 0; o < n.length; o += 1)
        n[o].d();
      t[7](null);
    }
  };
}
function Kl(t, e, n) {
  let l, i, { tabs: s = "" } = e, { selected: r = "" } = e, o;
  U();
  const a = (b) => {
    n(0, r = b), le(o, "input", { value: r });
  }, c = (b) => a(b);
  function d(b) {
    K[b ? "unshift" : "push"](() => {
      o = b, n(2, o);
    });
  }
  return t.$$set = (b) => {
    "tabs" in b && n(5, s = b.tabs), "selected" in b && n(0, r = b.selected);
  }, t.$$.update = () => {
    t.$$.dirty & 32 && n(1, l = s.split(",").map((b) => b.trim())), t.$$.dirty & 3 && n(3, i = l.indexOf(r));
  }, [
    r,
    l,
    o,
    i,
    a,
    s,
    c,
    d
  ];
}
class on extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, Kl, Ul, G, { tabs: 5, selected: 0 }, null), e && (e.target && P(e.target, this, e.anchor), e.props && (this.$set(e.props), v()));
  }
  static get observedAttributes() {
    return ["tabs", "selected"];
  }
  get tabs() {
    return this.$$.ctx[5];
  }
  set tabs(e) {
    this.$$set({ tabs: e }), v();
  }
  get selected() {
    return this.$$.ctx[0];
  }
  set selected(e) {
    this.$$set({ selected: e }), v();
  }
}
customElements.define("v-tabs", on);
const Jl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: on
}, Symbol.toStringTag, { value: "Module" }));
function Ql(t) {
  let e;
  return {
    c() {
      e = k("tbody"), e.innerHTML = "<slot></slot>", this.c = y;
    },
    m(n, l) {
      P(n, e, l);
    },
    p: y,
    i: y,
    o: y,
    d(n) {
      n && T(e);
    }
  };
}
class an extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, null, Ql, G, {}, null), e && e.target && P(e.target, this, e.anchor);
  }
}
customElements.define("v-tbody", an);
const $l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: an
}, Symbol.toStringTag, { value: "Module" }));
function ei(t) {
  let e;
  return {
    c() {
      e = k("th"), e.innerHTML = "<slot></slot>", this.c = y, u(e, "class", "p-2 text-left text-neutral-600 font-normal overflow-hidden");
    },
    m(n, l) {
      P(n, e, l);
    },
    p: y,
    i: y,
    o: y,
    d(n) {
      n && T(e);
    }
  };
}
function ti(t) {
  return U(), [];
}
class cn extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, ti, ei, G, {}, null), e && e.target && P(e.target, this, e.anchor);
  }
}
customElements.define("v-th", cn);
const ni = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cn
}, Symbol.toStringTag, { value: "Module" }));
function li(t) {
  let e;
  return {
    c() {
      e = k("td"), e.innerHTML = "<slot></slot>", this.c = y, u(e, "class", "p-2 overflow-hidden");
    },
    m(n, l) {
      P(n, e, l);
    },
    p: y,
    i: y,
    o: y,
    d(n) {
      n && T(e);
    }
  };
}
function ii(t) {
  return U(), [];
}
class un extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, ii, li, G, {}, null), e && e.target && P(e.target, this, e.anchor);
  }
}
customElements.define("v-td", un);
const si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: un
}, Symbol.toStringTag, { value: "Module" }));
function ri(t) {
  let e;
  return {
    c() {
      e = k("thead"), e.innerHTML = "<slot></slot>", this.c = y, u(e, "class", "border-b border-black");
    },
    m(n, l) {
      P(n, e, l);
    },
    p: y,
    i: y,
    o: y,
    d(n) {
      n && T(e);
    }
  };
}
function oi(t) {
  return U(), [];
}
class fn extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, oi, ri, G, {}, null), e && e.target && P(e.target, this, e.anchor);
  }
}
customElements.define("v-thead", fn);
const ai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fn
}, Symbol.toStringTag, { value: "Module" }));
function ke(t) {
  return t.split("-")[0];
}
function Ue(t) {
  return t.split("-")[1];
}
function Re(t) {
  return ["top", "bottom"].includes(ke(t)) ? "x" : "y";
}
function dn(t) {
  return t === "y" ? "height" : "width";
}
function jt(t, e, n) {
  let {
    reference: l,
    floating: i
  } = t;
  const s = l.x + l.width / 2 - i.width / 2, r = l.y + l.height / 2 - i.height / 2, o = Re(e), a = dn(o), c = l[a] / 2 - i[a] / 2, d = ke(e), b = o === "x";
  let f;
  switch (d) {
    case "top":
      f = {
        x: s,
        y: l.y - i.height
      };
      break;
    case "bottom":
      f = {
        x: s,
        y: l.y + l.height
      };
      break;
    case "right":
      f = {
        x: l.x + l.width,
        y: r
      };
      break;
    case "left":
      f = {
        x: l.x - i.width,
        y: r
      };
      break;
    default:
      f = {
        x: l.x,
        y: l.y
      };
  }
  switch (Ue(e)) {
    case "start":
      f[o] -= c * (n && b ? -1 : 1);
      break;
    case "end":
      f[o] += c * (n && b ? -1 : 1);
      break;
  }
  return f;
}
const ci = async (t, e, n) => {
  const {
    placement: l = "bottom",
    strategy: i = "absolute",
    middleware: s = [],
    platform: r
  } = n, o = await (r.isRTL == null ? void 0 : r.isRTL(e));
  let a = await r.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: c,
    y: d
  } = jt(a, l, o), b = l, f = {}, g = 0;
  for (let m = 0; m < s.length; m++) {
    const {
      name: h,
      fn: C
    } = s[m], {
      x: A,
      y: j,
      data: S,
      reset: p
    } = await C({
      x: c,
      y: d,
      initialPlacement: l,
      placement: b,
      strategy: i,
      middlewareData: f,
      rects: a,
      platform: r,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (c = A ?? c, d = j ?? d, f = {
      ...f,
      [h]: {
        ...f[h],
        ...S
      }
    }, p && g <= 50) {
      g++, typeof p == "object" && (p.placement && (b = p.placement), p.rects && (a = p.rects === !0 ? await r.getElementRects({
        reference: t,
        floating: e,
        strategy: i
      }) : p.rects), {
        x: c,
        y: d
      } = jt(a, b, o)), m = -1;
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
function ui(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function fi(t) {
  return typeof t != "number" ? ui(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Me(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
async function hn(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: l,
    y: i,
    platform: s,
    rects: r,
    elements: o,
    strategy: a
  } = t, {
    boundary: c = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: b = "floating",
    altBoundary: f = !1,
    padding: g = 0
  } = e, m = fi(g), C = o[f ? b === "floating" ? "reference" : "floating" : b], A = Me(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(C))) == null || n ? C : C.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(o.floating)),
    boundary: c,
    rootBoundary: d,
    strategy: a
  })), j = Me(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: b === "floating" ? {
      ...r.floating,
      x: l,
      y: i
    } : r.reference,
    offsetParent: await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(o.floating)),
    strategy: a
  }) : r[b]);
  return {
    top: A.top - j.top + m.top,
    bottom: j.bottom - A.bottom + m.bottom,
    left: A.left - j.left + m.left,
    right: j.right - A.right + m.right
  };
}
const di = Math.min, hi = Math.max;
function Lt(t, e, n) {
  return hi(t, di(e, n));
}
const bi = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ae(t) {
  return t.replace(/left|right|bottom|top/g, (e) => bi[e]);
}
function mi(t, e, n) {
  n === void 0 && (n = !1);
  const l = Ue(t), i = Re(t), s = dn(i);
  let r = i === "x" ? l === (n ? "end" : "start") ? "right" : "left" : l === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (r = Ae(r)), {
    main: r,
    cross: Ae(r)
  };
}
const gi = {
  start: "end",
  end: "start"
};
function Nt(t) {
  return t.replace(/start|end/g, (e) => gi[e]);
}
function pi(t) {
  const e = Ae(t);
  return [Nt(t), e, Nt(e)];
}
const _i = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n;
      const {
        placement: l,
        middlewareData: i,
        rects: s,
        initialPlacement: r,
        platform: o,
        elements: a
      } = e, {
        mainAxis: c = !0,
        crossAxis: d = !0,
        fallbackPlacements: b,
        fallbackStrategy: f = "bestFit",
        flipAlignment: g = !0,
        ...m
      } = t, h = ke(l), A = b || (h === r || !g ? [Ae(r)] : pi(r)), j = [r, ...A], S = await hn(e, m), p = [];
      let M = ((n = i.flip) == null ? void 0 : n.overflows) || [];
      if (c && p.push(S[h]), d) {
        const {
          main: O,
          cross: z
        } = mi(l, s, await (o.isRTL == null ? void 0 : o.isRTL(a.floating)));
        p.push(S[O], S[z]);
      }
      if (M = [...M, {
        placement: l,
        overflows: p
      }], !p.every((O) => O <= 0)) {
        var E, L;
        const O = ((E = (L = i.flip) == null ? void 0 : L.index) != null ? E : 0) + 1, z = j[O];
        if (z)
          return {
            data: {
              index: O,
              overflows: M
            },
            reset: {
              placement: z
            }
          };
        let H = "bottom";
        switch (f) {
          case "bestFit": {
            var R;
            const J = (R = M.map((ee) => [ee, ee.overflows.filter((Q) => Q > 0).reduce((Q, be) => Q + be, 0)]).sort((ee, Q) => ee[1] - Q[1])[0]) == null ? void 0 : R[0].placement;
            J && (H = J);
            break;
          }
          case "initialPlacement":
            H = r;
            break;
        }
        if (l !== H)
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
async function wi(t, e) {
  const {
    placement: n,
    platform: l,
    elements: i
  } = t, s = await (l.isRTL == null ? void 0 : l.isRTL(i.floating)), r = ke(n), o = Ue(n), a = Re(n) === "x", c = ["left", "top"].includes(r) ? -1 : 1, d = s && a ? -1 : 1, b = typeof e == "function" ? e(t) : e;
  let {
    mainAxis: f,
    crossAxis: g,
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
  return o && typeof m == "number" && (g = o === "end" ? m * -1 : m), a ? {
    x: g * d,
    y: f * c
  } : {
    x: f * c,
    y: g * d
  };
}
const yi = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: l
      } = e, i = await wi(e, t);
      return {
        x: n + i.x,
        y: l + i.y,
        data: i
      };
    }
  };
};
function vi(t) {
  return t === "x" ? "y" : "x";
}
const ki = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: l,
        placement: i
      } = e, {
        mainAxis: s = !0,
        crossAxis: r = !1,
        limiter: o = {
          fn: (C) => {
            let {
              x: A,
              y: j
            } = C;
            return {
              x: A,
              y: j
            };
          }
        },
        ...a
      } = t, c = {
        x: n,
        y: l
      }, d = await hn(e, a), b = Re(ke(i)), f = vi(b);
      let g = c[b], m = c[f];
      if (s) {
        const C = b === "y" ? "top" : "left", A = b === "y" ? "bottom" : "right", j = g + d[C], S = g - d[A];
        g = Lt(j, g, S);
      }
      if (r) {
        const C = f === "y" ? "top" : "left", A = f === "y" ? "bottom" : "right", j = m + d[C], S = m - d[A];
        m = Lt(j, m, S);
      }
      const h = o.fn({
        ...e,
        [b]: g,
        [f]: m
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - l
        }
      };
    }
  };
};
function bn(t) {
  return t && t.document && t.location && t.alert && t.setInterval;
}
function re(t) {
  if (t == null)
    return window;
  if (!bn(t)) {
    const e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function Pe(t) {
  return re(t).getComputedStyle(t);
}
function ie(t) {
  return bn(t) ? "" : t ? (t.nodeName || "").toLowerCase() : "";
}
function mn() {
  const t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map((e) => e.brand + "/" + e.version).join(" ") : navigator.userAgent;
}
function te(t) {
  return t instanceof re(t).HTMLElement;
}
function he(t) {
  return t instanceof re(t).Element;
}
function Pi(t) {
  return t instanceof re(t).Node;
}
function Ke(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = re(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function je(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: l
  } = Pe(t);
  return /auto|scroll|overlay|hidden/.test(e + l + n);
}
function Ei(t) {
  return ["table", "td", "th"].includes(ie(t));
}
function gn(t) {
  const e = /firefox/i.test(mn()), n = Pe(t);
  return n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].includes(n.willChange) || e && n.willChange === "filter" || e && (n.filter ? n.filter !== "none" : !1);
}
function pn() {
  return !/^((?!chrome|android).)*safari/i.test(mn());
}
const xt = Math.min, ye = Math.max, Te = Math.round;
function ue(t, e, n) {
  var l, i, s, r;
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const o = t.getBoundingClientRect();
  let a = 1, c = 1;
  e && te(t) && (a = t.offsetWidth > 0 && Te(o.width) / t.offsetWidth || 1, c = t.offsetHeight > 0 && Te(o.height) / t.offsetHeight || 1);
  const d = he(t) ? re(t) : window, b = !pn() && n, f = (o.left + (b && (l = (i = d.visualViewport) == null ? void 0 : i.offsetLeft) != null ? l : 0)) / a, g = (o.top + (b && (s = (r = d.visualViewport) == null ? void 0 : r.offsetTop) != null ? s : 0)) / c, m = o.width / a, h = o.height / c;
  return {
    width: m,
    height: h,
    top: g,
    right: f + m,
    bottom: g + h,
    left: f,
    x: f,
    y: g
  };
}
function ae(t) {
  return ((Pi(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function Le(t) {
  return he(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function _n(t) {
  return ue(ae(t)).left + Le(t).scrollLeft;
}
function Si(t) {
  const e = ue(t);
  return Te(e.width) !== t.offsetWidth || Te(e.height) !== t.offsetHeight;
}
function Oi(t, e, n) {
  const l = te(e), i = ae(e), s = ue(t, l && Si(e), n === "fixed");
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const o = {
    x: 0,
    y: 0
  };
  if (l || !l && n !== "fixed")
    if ((ie(e) !== "body" || je(i)) && (r = Le(e)), te(e)) {
      const a = ue(e, !0);
      o.x = a.x + e.clientLeft, o.y = a.y + e.clientTop;
    } else
      i && (o.x = _n(i));
  return {
    x: s.left + r.scrollLeft - o.x,
    y: s.top + r.scrollTop - o.y,
    width: s.width,
    height: s.height
  };
}
function wn(t) {
  return ie(t) === "html" ? t : t.assignedSlot || t.parentNode || (Ke(t) ? t.host : null) || ae(t);
}
function zt(t) {
  return !te(t) || getComputedStyle(t).position === "fixed" ? null : t.offsetParent;
}
function Ci(t) {
  let e = wn(t);
  for (Ke(e) && (e = e.host); te(e) && !["html", "body"].includes(ie(e)); ) {
    if (gn(e))
      return e;
    e = e.parentNode;
  }
  return null;
}
function Be(t) {
  const e = re(t);
  let n = zt(t);
  for (; n && Ei(n) && getComputedStyle(n).position === "static"; )
    n = zt(n);
  return n && (ie(n) === "html" || ie(n) === "body" && getComputedStyle(n).position === "static" && !gn(n)) ? e : n || Ci(t) || e;
}
function Ht(t) {
  if (te(t))
    return {
      width: t.offsetWidth,
      height: t.offsetHeight
    };
  const e = ue(t);
  return {
    width: e.width,
    height: e.height
  };
}
function Mi(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: l
  } = t;
  const i = te(n), s = ae(n);
  if (n === s)
    return e;
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const o = {
    x: 0,
    y: 0
  };
  if ((i || !i && l !== "fixed") && ((ie(n) !== "body" || je(s)) && (r = Le(n)), te(n))) {
    const a = ue(n, !0);
    o.x = a.x + n.clientLeft, o.y = a.y + n.clientTop;
  }
  return {
    ...e,
    x: e.x - r.scrollLeft + o.x,
    y: e.y - r.scrollTop + o.y
  };
}
function Ai(t, e) {
  const n = re(t), l = ae(t), i = n.visualViewport;
  let s = l.clientWidth, r = l.clientHeight, o = 0, a = 0;
  if (i) {
    s = i.width, r = i.height;
    const c = pn();
    (c || !c && e === "fixed") && (o = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: s,
    height: r,
    x: o,
    y: a
  };
}
function Ti(t) {
  var e;
  const n = ae(t), l = Le(t), i = (e = t.ownerDocument) == null ? void 0 : e.body, s = ye(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), r = ye(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0);
  let o = -l.scrollLeft + _n(t);
  const a = -l.scrollTop;
  return Pe(i || n).direction === "rtl" && (o += ye(n.clientWidth, i ? i.clientWidth : 0) - s), {
    width: s,
    height: r,
    x: o,
    y: a
  };
}
function yn(t) {
  const e = wn(t);
  return ["html", "body", "#document"].includes(ie(e)) ? t.ownerDocument.body : te(e) && je(e) ? e : yn(e);
}
function vn(t, e) {
  var n;
  e === void 0 && (e = []);
  const l = yn(t), i = l === ((n = t.ownerDocument) == null ? void 0 : n.body), s = re(l), r = i ? [s].concat(s.visualViewport || [], je(l) ? l : []) : l, o = e.concat(r);
  return i ? o : o.concat(vn(r));
}
function Ri(t, e) {
  const n = e.getRootNode == null ? void 0 : e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && Ke(n)) {
    let l = e;
    do {
      if (l && t === l)
        return !0;
      l = l.parentNode || l.host;
    } while (l);
  }
  return !1;
}
function ji(t, e) {
  const n = ue(t, !1, e === "fixed"), l = n.top + t.clientTop, i = n.left + t.clientLeft;
  return {
    top: l,
    left: i,
    x: i,
    y: l,
    right: i + t.clientWidth,
    bottom: l + t.clientHeight,
    width: t.clientWidth,
    height: t.clientHeight
  };
}
function Vt(t, e, n) {
  return e === "viewport" ? Me(Ai(t, n)) : he(e) ? ji(e, n) : Me(Ti(ae(t)));
}
function Li(t) {
  const e = vn(t), l = ["absolute", "fixed"].includes(Pe(t).position) && te(t) ? Be(t) : t;
  return he(l) ? e.filter((i) => he(i) && Ri(i, l) && ie(i) !== "body") : [];
}
function Ni(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: l,
    strategy: i
  } = t;
  const r = [...n === "clippingAncestors" ? Li(e) : [].concat(n), l], o = r[0], a = r.reduce((c, d) => {
    const b = Vt(e, d, i);
    return c.top = ye(b.top, c.top), c.right = xt(b.right, c.right), c.bottom = xt(b.bottom, c.bottom), c.left = ye(b.left, c.left), c;
  }, Vt(e, o, i));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top
  };
}
const xi = {
  getClippingRect: Ni,
  convertOffsetParentRelativeRectToViewportRelativeRect: Mi,
  isElement: he,
  getDimensions: Ht,
  getOffsetParent: Be,
  getDocumentElement: ae,
  getElementRects: (t) => {
    let {
      reference: e,
      floating: n,
      strategy: l
    } = t;
    return {
      reference: Oi(e, Be(n), l),
      floating: {
        ...Ht(n),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => Pe(t).direction === "rtl"
}, zi = (t, e, n) => ci(t, e, {
  platform: xi,
  ...n
});
function Hi(t) {
  let e, n, l, i, s, r, o;
  return {
    c() {
      e = k("div"), n = k("slot"), l = x(), i = k("div"), s = D(t[0]), this.c = y, u(i, "role", "tooltip"), u(i, "class", `
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
    `), $(i, "transform", "translate(" + t[4] + "px, " + t[5] + "px)"), B(i, "invisible", t[3]), u(e, "class", "relative"), u(e, "aria-describedby", "tooltip");
    },
    m(a, c) {
      P(a, e, c), w(e, n), w(e, l), w(e, i), w(i, s), t[9](i), t[10](e), r || (o = [
        F(e, "mouseenter", t[6]),
        F(e, "mouseleave", t[7])
      ], r = !0);
    },
    p(a, [c]) {
      c & 1 && W(s, a[0]), c & 48 && $(i, "transform", "translate(" + a[4] + "px, " + a[5] + "px)"), c & 8 && B(i, "invisible", a[3]);
    },
    i: y,
    o: y,
    d(a) {
      a && T(e), t[9](null), t[10](null), r = !1, se(o);
    }
  };
}
function Vi(t, e, n) {
  let { text: l = "" } = e, { location: i = "top" } = e, s, r, o = !0, a = 0, c = 0;
  const d = async () => {
    const h = await zi(s, r, {
      placement: i,
      middleware: [_i(), ki({ padding: 5 }), yi(10)]
    });
    n(4, a = h.x), n(5, c = h.y);
  }, b = async () => {
    await d(), n(3, o = !1);
  }, f = () => {
    n(3, o = !0);
  };
  U();
  function g(h) {
    K[h ? "unshift" : "push"](() => {
      r = h, n(2, r);
    });
  }
  function m(h) {
    K[h ? "unshift" : "push"](() => {
      s = h, n(1, s);
    });
  }
  return t.$$set = (h) => {
    "text" in h && n(0, l = h.text), "location" in h && n(8, i = h.location);
  }, [
    l,
    s,
    r,
    o,
    a,
    c,
    b,
    f,
    i,
    g,
    m
  ];
}
class kn extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, Vi, Hi, G, { text: 0, location: 8 }, null), e && (e.target && P(e.target, this, e.anchor), e.props && (this.$set(e.props), v()));
  }
  static get observedAttributes() {
    return ["text", "location"];
  }
  get text() {
    return this.$$.ctx[0];
  }
  set text(e) {
    this.$$set({ text: e }), v();
  }
  get location() {
    return this.$$.ctx[8];
  }
  set location(e) {
    this.$$set({ location: e }), v();
  }
}
customElements.define("v-tooltip", kn);
const Fi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kn
}, Symbol.toStringTag, { value: "Module" }));
function Di(t) {
  let e;
  return {
    c() {
      e = k("tr"), e.innerHTML = "<slot></slot>", this.c = y, u(e, "class", "border-b");
    },
    m(n, l) {
      P(n, e, l);
    },
    p: y,
    i: y,
    o: y,
    d(n) {
      n && T(e);
    }
  };
}
function Ii(t) {
  return U(), [];
}
class Pn extends X {
  constructor(e) {
    super(), Y(this, {
      target: this.shadowRoot,
      props: q(this.attributes),
      customElement: !0
    }, Ii, Di, G, {}, null), e && e.target && P(e.target, this, e.anchor);
  }
}
customElements.define("v-tr", Pn);
const Bi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pn
}, Symbol.toStringTag, { value: "Module" }));
