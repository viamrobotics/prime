const o=(t,e,r)=>t<=e?e:t>=r?r:t,s=(t,e,r,n)=>{const c=(t-e)/(r-e)*100;return Number.isNaN(c)||c<=0?0:c>=100?100:Number.parseFloat(c.toFixed(n))},h=t=>{let e=0,r=0;if(t.length===0)return e;for(let n=0;n<t.length;n+=1)r=t.codePointAt(n),e=(e<<5)-e+r,e=Math.trunc(e);return e};export{o as c,h,s as p};
//# sourceMappingURL=math-a9ba36ad.js.map
