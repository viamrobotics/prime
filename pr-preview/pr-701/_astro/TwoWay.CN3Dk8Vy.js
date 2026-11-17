import"./disclose-version.xihTtKlq.js";import{$ as e,B as t,H as n,J as r,Ut as i,W as a,Y as o,bt as s,dt as c,ot as l,pt as u,vt as d}from"./client.C50mFgTt.js";import{t as f}from"./CodeEditor.CO0vlZ9i.js";var p=a(`<div class="not-content flex w-full flex-col gap-3"><!> <p class="text-sm text-subtle-2">length: <code> </code></p> <button type="button" class="button self-start">Reset from outside</button></div>`);function m(r){let a=s(`{
  "speed": 5
}
`);var m=p(),h=c(m);f(h,{"aria-label":`JSON config`,class:`max-h-48 w-full overflow-auto`,language:`json`,get value(){return e(a)},set value(e){d(a,e,!0)}});var g=u(h,2),_=u(c(g)),v=c(_,!0);i(_),i(g);var y=u(g,2);i(m),l(()=>t(v,e(a).length)),o(`click`,y,()=>d(a,`{}
`)),n(r,m)}r([`click`]);export{m as default};