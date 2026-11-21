import"./disclose-version.xihTtKlq.js";import{G as e,U as t,V as n,Wt as r,X as i,Y as a,et as o,ft as s,mt as c,st as l,xt as u,yt as d}from"./client.C3HOevIA.js";import{t as f}from"./CodeEditor.BqbOnIgR.js";var p=e(`<div class="not-content flex w-full flex-col gap-3"><!> <p class="text-sm text-subtle-2">length: <code> </code></p> <button type="button" class="button self-start">Reset from outside</button></div>`);function m(e){let a=u(`{
  "speed": 5
}
`);var m=p(),h=s(m);f(h,{"aria-label":`JSON config`,class:`max-h-48 w-full overflow-auto`,language:`json`,get value(){return o(a)},set value(e){d(a,e,!0)}});var g=c(h,2),_=c(s(g)),v=s(_,!0);r(_),r(g);var y=c(g,2);r(m),l(()=>n(v,o(a).length)),i(`click`,y,()=>d(a,`{}
`)),t(e,m)}a([`click`]);export{m as default};