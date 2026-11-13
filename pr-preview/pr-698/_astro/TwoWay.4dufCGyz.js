import"./disclose-version.xihTtKlq.js";import{Ht as e,J as t,Q as n,U as r,V as i,_t as a,at as o,ft as s,q as c,ut as l,yt as u,z as d}from"./client.BX8nO9gf.js";import{t as f}from"./CodeEditor.DZ80l28O.js";var p=r(`<div class="not-content flex w-full flex-col gap-3"><!> <p class="text-sm text-subtle-2">length: <code> </code></p> <button type="button" class="button self-start">Reset from outside</button></div>`);function m(r){let c=u(`{
  "speed": 5
}
`);var m=p(),h=l(m);f(h,{"aria-label":`JSON config`,class:`max-h-48 w-full overflow-auto`,language:`json`,get value(){return n(c)},set value(e){a(c,e,!0)}});var g=s(h,2),_=s(l(g)),v=l(_,!0);e(_),e(g);var y=s(g,2);e(m),o(()=>d(v,n(c).length)),t(`click`,y,()=>a(c,`{}
`)),i(r,m)}c([`click`]);export{m as default};