import{_ as V,c as ae}from"./chunk-BVZGY62N-610dc239.js";import{_ as ue,a as x}from"./chunk-FD4M6EBV-8d27da22.js";import{_ as z,a as X}from"./chunk-NNAAFZ4U-67fa674f.js";import{r as p,R as y}from"./index-c4c77e71.js";import{e as H,l as S}from"./index-3392a817.js";import{s as se}from"./index-d475d2ea.js";import{r as q}from"./index-55ae201a.js";import{m as le}from"./memoizerific-cab73ecf.js";import"./_commonjsHelpers-725317a4.js";var ce=z({"../../node_modules/react-fast-compare/index.js"(r,n){var o=typeof Element<"u",e=typeof Map=="function",i=typeof Set=="function",c=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function s(t,u){if(t===u)return!0;if(t&&u&&typeof t=="object"&&typeof u=="object"){if(t.constructor!==u.constructor)return!1;var l,a,d;if(Array.isArray(t)){if(l=t.length,l!=u.length)return!1;for(a=l;a--!==0;)if(!s(t[a],u[a]))return!1;return!0}var f;if(e&&t instanceof Map&&u instanceof Map){if(t.size!==u.size)return!1;for(f=t.entries();!(a=f.next()).done;)if(!u.has(a.value[0]))return!1;for(f=t.entries();!(a=f.next()).done;)if(!s(a.value[1],u.get(a.value[0])))return!1;return!0}if(i&&t instanceof Set&&u instanceof Set){if(t.size!==u.size)return!1;for(f=t.entries();!(a=f.next()).done;)if(!u.has(a.value[0]))return!1;return!0}if(c&&ArrayBuffer.isView(t)&&ArrayBuffer.isView(u)){if(l=t.length,l!=u.length)return!1;for(a=l;a--!==0;)if(t[a]!==u[a])return!1;return!0}if(t.constructor===RegExp)return t.source===u.source&&t.flags===u.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===u.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===u.toString();if(d=Object.keys(t),l=d.length,l!==Object.keys(u).length)return!1;for(a=l;a--!==0;)if(!Object.prototype.hasOwnProperty.call(u,d[a]))return!1;if(o&&t instanceof Element)return!1;for(a=l;a--!==0;)if(!((d[a]==="_owner"||d[a]==="__v"||d[a]==="__o")&&t.$$typeof)&&!s(t[d[a]],u[d[a]]))return!1;return!0}return t!==t&&u!==u}n.exports=function(t,u){try{return s(t,u)}catch(l){if((l.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw l}}}}),pe=z({"../../node_modules/warning/warning.js"(r,n){var o=function(){};n.exports=o}}),G=p.exports.createContext(),J=p.exports.createContext();function de(r){var n=r.children,o=p.exports.useState(null),e=o[0],i=o[1],c=p.exports.useRef(!1);p.exports.useEffect(function(){return function(){c.current=!0}},[]);var s=p.exports.useCallback(function(t){c.current||i(t)},[]);return p.exports.createElement(G.Provider,{value:e},p.exports.createElement(J.Provider,{value:s},n))}var K=function(r){return Array.isArray(r)?r[0]:r},Q=function(r){if(typeof r=="function"){for(var n=arguments.length,o=new Array(n>1?n-1:0),e=1;e<n;e++)o[e-1]=arguments[e];return r.apply(void 0,o)}},U=function(r,n){if(typeof r=="function")return Q(r,n);r!=null&&(r.current=n)},j=function(r){return r.reduce(function(n,o){var e=o[0],i=o[1];return n[e]=i,n},{})},I=typeof window<"u"&&window.document&&window.document.createElement?p.exports.useLayoutEffect:p.exports.useEffect,fe=X(ce()),ge=[],me=function(r,n,o){o===void 0&&(o={});var e=p.exports.useRef(null),i={onFirstUpdate:o.onFirstUpdate,placement:o.placement||"bottom",strategy:o.strategy||"absolute",modifiers:o.modifiers||ge},c=p.exports.useState({styles:{popper:{position:i.strategy,left:"0",top:"0"},arrow:{position:"absolute"}},attributes:{}}),s=c[0],t=c[1],u=p.exports.useMemo(function(){return{name:"updateState",enabled:!0,phase:"write",fn:function(d){var f=d.state,w=Object.keys(f.elements);q.exports.flushSync(function(){t({styles:j(w.map(function(m){return[m,f.styles[m]||{}]})),attributes:j(w.map(function(m){return[m,f.attributes[m]]}))})})},requires:["computeStyles"]}},[]),l=p.exports.useMemo(function(){var d={onFirstUpdate:i.onFirstUpdate,placement:i.placement,strategy:i.strategy,modifiers:[].concat(i.modifiers,[u,{name:"applyStyles",enabled:!1}])};return(0,fe.default)(e.current,d)?e.current||d:(e.current=d,d)},[i.onFirstUpdate,i.placement,i.strategy,i.modifiers,u]),a=p.exports.useRef();return I(function(){a.current&&a.current.setOptions(l)},[l]),I(function(){if(!(r==null||n==null)){var d=o.createPopper||ae,f=d(r,n,l);return a.current=f,function(){f.destroy(),a.current=null}}},[r,n,o.createPopper]),{state:a.current?a.current.state:null,styles:s.styles,attributes:s.attributes,update:a.current?a.current.update:null,forceUpdate:a.current?a.current.forceUpdate:null}},ve=function(){},we=function(){return Promise.resolve(null)},he=[];function ye(r){var n=r.placement,o=n===void 0?"bottom":n,e=r.strategy,i=e===void 0?"absolute":e,c=r.modifiers,s=c===void 0?he:c,t=r.referenceElement,u=r.onFirstUpdate,l=r.innerRef,a=r.children,d=p.exports.useContext(G),f=p.exports.useState(null),w=f[0],m=f[1],C=p.exports.useState(null),O=C[0],E=C[1];p.exports.useEffect(function(){U(l,w)},[l,w]);var P=p.exports.useMemo(function(){return{placement:o,strategy:i,onFirstUpdate:u,modifiers:[].concat(s,[{name:"arrow",enabled:O!=null,options:{element:O}}])}},[o,i,u,s,O]),g=me(t||d,w,P),v=g.state,b=g.styles,k=g.forceUpdate,M=g.update,A=p.exports.useMemo(function(){return{ref:m,style:b.popper,placement:v?v.placement:o,hasPopperEscaped:v&&v.modifiersData.hide?v.modifiersData.hide.hasPopperEscaped:null,isReferenceHidden:v&&v.modifiersData.hide?v.modifiersData.hide.isReferenceHidden:null,arrowProps:{style:b.arrow,ref:E},forceUpdate:k||ve,update:M||we}},[m,E,o,v,b,M,k]);return K(a)(A)}var Te=X(pe());function xe(r){var n=r.children,o=r.innerRef,e=p.exports.useContext(J),i=p.exports.useCallback(function(c){U(o,c),Q(e,c)},[o,e]);return p.exports.useEffect(function(){return function(){return U(o,null)}},[]),p.exports.useEffect(function(){(0,Te.default)(Boolean(e),"`Reference` should not be used outside of a `Manager` component.")},[e]),K(n)({ref:i})}var Z=y.createContext({}),T=function(){for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return function(){for(var e=arguments.length,i=new Array(e),c=0;c<e;c++)i[c]=arguments[c];return n.forEach(function(s){return s&&s.apply(void 0,i)})}},Re=function(){},Y=function(){return!!(typeof window<"u"&&window.document&&window.document.createElement)},Oe=function(r,n){if(typeof r=="function")return r(n);r!=null&&(r.current=n)},_=function(r){V(n,r);function n(){for(var e,i=arguments.length,c=new Array(i),s=0;s<i;s++)c[s]=arguments[s];return e=r.call.apply(r,[this].concat(c))||this,e.observer=void 0,e.tooltipRef=void 0,e.handleOutsideClick=function(t){if(e.tooltipRef&&!e.tooltipRef.contains(t.target)){var u=e.context.parentOutsideClickHandler,l=e.props,a=l.hideTooltip,d=l.clearScheduled;d(),a(),u&&u(t)}},e.handleOutsideRightClick=function(t){if(e.tooltipRef&&!e.tooltipRef.contains(t.target)){var u=e.context.parentOutsideRightClickHandler,l=e.props,a=l.hideTooltip,d=l.clearScheduled;d(),a(),u&&u(t)}},e.addOutsideClickHandler=function(){document.body.addEventListener("touchend",e.handleOutsideClick),document.body.addEventListener("click",e.handleOutsideClick)},e.removeOutsideClickHandler=function(){document.body.removeEventListener("touchend",e.handleOutsideClick),document.body.removeEventListener("click",e.handleOutsideClick)},e.addOutsideRightClickHandler=function(){return document.body.addEventListener("contextmenu",e.handleOutsideRightClick)},e.removeOutsideRightClickHandler=function(){return document.body.removeEventListener("contextmenu",e.handleOutsideRightClick)},e.getTooltipRef=function(t){e.tooltipRef=t,Oe(e.props.innerRef,t)},e.getArrowProps=function(t){return t===void 0&&(t={}),x({},t,{style:x({},t.style,e.props.arrowProps.style)})},e.getTooltipProps=function(t){return t===void 0&&(t={}),x({},t,e.isTriggeredBy("hover")&&{onMouseEnter:T(e.props.clearScheduled,t.onMouseEnter),onMouseLeave:T(e.props.hideTooltip,t.onMouseLeave)},{style:x({},t.style,e.props.style)})},e.contextValue={isParentNoneTriggered:e.props.trigger==="none",addParentOutsideClickHandler:e.addOutsideClickHandler,addParentOutsideRightClickHandler:e.addOutsideRightClickHandler,parentOutsideClickHandler:e.handleOutsideClick,parentOutsideRightClickHandler:e.handleOutsideRightClick,removeParentOutsideClickHandler:e.removeOutsideClickHandler,removeParentOutsideRightClickHandler:e.removeOutsideRightClickHandler},e}var o=n.prototype;return o.componentDidMount=function(){var e=this,i=this.observer=new MutationObserver(function(){e.props.update()});if(i.observe(this.tooltipRef,this.props.mutationObserverOptions),this.isTriggeredBy("hover")||this.isTriggeredBy("click")||this.isTriggeredBy("right-click")){var c=this.context,s=c.removeParentOutsideClickHandler,t=c.removeParentOutsideRightClickHandler;this.addOutsideClickHandler(),this.addOutsideRightClickHandler(),s&&s(),t&&t()}},o.componentDidUpdate=function(){this.props.closeOnReferenceHidden&&this.props.isReferenceHidden&&this.props.hideTooltip()},o.componentWillUnmount=function(){if(this.observer&&this.observer.disconnect(),this.isTriggeredBy("hover")||this.isTriggeredBy("click")||this.isTriggeredBy("right-click")){var e=this.context,i=e.isParentNoneTriggered,c=e.addParentOutsideClickHandler,s=e.addParentOutsideRightClickHandler;this.removeOutsideClickHandler(),this.removeOutsideRightClickHandler(),this.handleOutsideClick=void 0,this.handleOutsideRightClick=void 0,!i&&c&&c(),!i&&s&&s()}},o.render=function(){var e=this.props,i=e.arrowProps,c=e.placement,s=e.tooltip;return y.createElement(Z.Provider,{value:this.contextValue},s({arrowRef:i.ref,getArrowProps:this.getArrowProps,getTooltipProps:this.getTooltipProps,placement:c,tooltipRef:this.getTooltipRef}))},o.isTriggeredBy=function(e){var i=this.props.trigger;return i===e||Array.isArray(i)&&i.includes(e)},n}(p.exports.Component);_.contextType=Z;var Ce={childList:!0,subtree:!0},ee=function(r){V(n,r);function n(){for(var e,i=arguments.length,c=new Array(i),s=0;s<i;s++)c[s]=arguments[s];return e=r.call.apply(r,[this].concat(c))||this,e.state={tooltipShown:e.props.defaultTooltipShown},e.hideTimeout=void 0,e.showTimeout=void 0,e.popperOffset=void 0,e.setTooltipState=function(t){var u=function(){return e.props.onVisibilityChange(t.tooltipShown)};e.isControlled()?u():e.setState(t,u)},e.clearScheduled=function(){clearTimeout(e.hideTimeout),clearTimeout(e.showTimeout)},e.showTooltip=function(t){var u=t.pageX,l=t.pageY;e.clearScheduled();var a={tooltipShown:!0};e.props.followCursor&&(a=x({},a,{pageX:u,pageY:l})),e.showTimeout=window.setTimeout(function(){return e.setTooltipState(a)},e.props.delayShow)},e.hideTooltip=function(){e.clearScheduled(),e.hideTimeout=window.setTimeout(function(){return e.setTooltipState({tooltipShown:!1})},e.props.delayHide)},e.toggleTooltip=function(t){var u=t.pageX,l=t.pageY,a=e.getState()?"hideTooltip":"showTooltip";e[a]({pageX:u,pageY:l})},e.clickToggle=function(t){t.preventDefault();var u=t.pageX,l=t.pageY,a=e.props.followCursor?"showTooltip":"toggleTooltip";e[a]({pageX:u,pageY:l})},e.contextMenuToggle=function(t){t.preventDefault();var u=t.pageX,l=t.pageY,a=e.props.followCursor?"showTooltip":"toggleTooltip";e[a]({pageX:u,pageY:l})},e.getTriggerProps=function(t){return t===void 0&&(t={}),x({},t,e.isTriggeredBy("click")&&{onClick:T(e.clickToggle,t.onClick),onTouchEnd:T(e.clickToggle,t.onTouchEnd)},e.isTriggeredBy("right-click")&&{onContextMenu:T(e.contextMenuToggle,t.onContextMenu)},e.isTriggeredBy("hover")&&x({onMouseEnter:T(e.showTooltip,t.onMouseEnter),onMouseLeave:T(e.hideTooltip,t.onMouseLeave)},e.props.followCursor&&{onMouseMove:T(e.showTooltip,t.onMouseMove)}),e.isTriggeredBy("focus")&&{onFocus:T(e.showTooltip,t.onFocus),onBlur:T(e.hideTooltip,t.onBlur)})},e}var o=n.prototype;return o.componentWillUnmount=function(){this.clearScheduled()},o.render=function(){var e=this,i=this.props,c=i.children,s=i.tooltip,t=i.placement,u=i.trigger,l=i.getTriggerRef,a=i.modifiers,d=i.closeOnReferenceHidden,f=i.usePortal,w=i.portalContainer,m=i.followCursor,C=i.getTooltipRef,O=i.mutationObserverOptions,E=ue(i,["children","tooltip","placement","trigger","getTriggerRef","modifiers","closeOnReferenceHidden","usePortal","portalContainer","followCursor","getTooltipRef","mutationObserverOptions"]),P=y.createElement(ye,x({innerRef:C,placement:t,modifiers:[{name:"followCursor",enabled:m,phase:"main",fn:function(g){e.popperOffset=g.state.rects.popper}}].concat(a)},E),function(g){var v=g.ref,b=g.style,k=g.placement,M=g.arrowProps,A=g.isReferenceHidden,oe=g.update;if(m&&e.popperOffset){var $=e.state,B=$.pageX,L=$.pageY,D=e.popperOffset,F=D.width,N=D.height,ne=B+F>window.pageXOffset+document.body.offsetWidth?B-F:B,ie=L+N>window.pageYOffset+document.body.offsetHeight?L-N:L;b.transform="translate3d("+ne+"px, "+ie+"px, 0"}return y.createElement(_,x({arrowProps:M,closeOnReferenceHidden:d,isReferenceHidden:A,placement:k,update:oe,style:b,tooltip:s,trigger:u,mutationObserverOptions:O},{clearScheduled:e.clearScheduled,hideTooltip:e.hideTooltip,innerRef:v}))});return y.createElement(de,null,y.createElement(xe,{innerRef:l},function(g){var v=g.ref;return c({getTriggerProps:e.getTriggerProps,triggerRef:v})}),this.getState()&&(f?q.exports.createPortal(P,w):P))},o.isControlled=function(){return this.props.tooltipShown!==void 0},o.getState=function(){return this.isControlled()?this.props.tooltipShown:this.state.tooltipShown},o.isTriggeredBy=function(e){var i=this.props.trigger;return i===e||Array.isArray(i)&&i.includes(e)},n}(p.exports.Component);ee.defaultProps={closeOnReferenceHidden:!0,defaultTooltipShown:!1,delayHide:0,delayShow:0,followCursor:!1,onVisibilityChange:Re,placement:"right",portalContainer:Y()?document.body:null,trigger:"hover",usePortal:Y(),mutationObserverOptions:Ce,modifiers:[]};var be=ee,h=le(1e3)((r,n,o,e=0)=>n.split("-")[0]===r?o:e),R=8,Se=H.div({position:"absolute",borderStyle:"solid"},({placement:r})=>{let n=0,o=0;switch(!0){case(r.startsWith("left")||r.startsWith("right")):{o=8;break}case(r.startsWith("top")||r.startsWith("bottom")):{n=8;break}}return{transform:`translate3d(${n}px, ${o}px, 0px)`}},({theme:r,color:n,placement:o})=>({bottom:`${h("top",o,R*-1,"auto")}px`,top:`${h("bottom",o,R*-1,"auto")}px`,right:`${h("left",o,R*-1,"auto")}px`,left:`${h("right",o,R*-1,"auto")}px`,borderBottomWidth:`${h("top",o,"0",R)}px`,borderTopWidth:`${h("bottom",o,"0",R)}px`,borderRightWidth:`${h("left",o,"0",R)}px`,borderLeftWidth:`${h("right",o,"0",R)}px`,borderTopColor:h("top",o,r.color[n]||n||r.base==="light"?S(r.background.app):r.background.app,"transparent"),borderBottomColor:h("bottom",o,r.color[n]||n||r.base==="light"?S(r.background.app):r.background.app,"transparent"),borderLeftColor:h("left",o,r.color[n]||n||r.base==="light"?S(r.background.app):r.background.app,"transparent"),borderRightColor:h("right",o,r.color[n]||n||r.base==="light"?S(r.background.app):r.background.app,"transparent")})),Ee=H.div(({hidden:r})=>({display:r?"none":"inline-block",zIndex:2147483647}),({theme:r,color:n,hasChrome:o})=>o?{background:r.color[n]||n||r.base==="light"?S(r.background.app):r.background.app,filter:`
            drop-shadow(0px 5px 5px rgba(0,0,0,0.05))
            drop-shadow(0 1px 3px rgba(0,0,0,0.1))
          `,borderRadius:r.appBorderRadius*2,fontSize:r.typography.size.s1}:{}),te=({placement:r,hasChrome:n,children:o,arrowProps:e,tooltipRef:i,arrowRef:c,color:s,...t})=>y.createElement(Ee,{hasChrome:n,placement:r,ref:i,...t,color:s},n&&y.createElement(Se,{placement:r,ref:c,...e,color:s}),o);te.defaultProps={color:void 0,arrowRef:void 0,tooltipRef:void 0,hasChrome:!0,placement:"top",arrowProps:{}};var{document:W}=se,Pe=H.div`
  display: inline-block;
  cursor: ${r=>r.mode==="hover"?"default":"pointer"};
`,ke=H.g`
  cursor: ${r=>r.mode==="hover"?"default":"pointer"};
`,re=({svg:r,trigger:n,closeOnClick:o,placement:e,modifiers:i,hasChrome:c,tooltip:s,children:t,tooltipShown:u,onVisibilityChange:l,...a})=>{let d=r?ke:Pe;return y.createElement(be,{placement:e,trigger:n,modifiers:i,tooltipShown:u,onVisibilityChange:l,tooltip:({getTooltipProps:f,getArrowProps:w,tooltipRef:m,arrowRef:C,placement:O})=>y.createElement(te,{hasChrome:c,placement:O,tooltipRef:m,arrowRef:C,arrowProps:w(),...f()},typeof s=="function"?s({onHide:()=>l(!1)}):s)},({getTriggerProps:f,triggerRef:w})=>y.createElement(d,{ref:w,...f(),...a},t))};re.defaultProps={svg:!1,trigger:"hover",closeOnClick:!1,placement:"top",modifiers:[{name:"preventOverflow",options:{padding:8}},{name:"offset",options:{offset:[8,8]}},{name:"arrow",options:{padding:8}}],hasChrome:!0,tooltipShown:!1};var Fe=({startOpen:r=!1,onVisibilityChange:n,...o})=>{let[e,i]=p.exports.useState(r),c=p.exports.useCallback(s=>{n&&n(s)===!1||i(s)},[n]);return p.exports.useEffect(()=>{let s=()=>c(!1);W.addEventListener("keydown",s,!1);let t=Array.from(W.getElementsByTagName("iframe")),u=[];return t.forEach(l=>{let a=()=>{try{l.contentWindow.document&&(l.contentWindow.document.addEventListener("click",s),u.push(()=>{try{l.contentWindow.document.removeEventListener("click",s)}catch{}}))}catch{}};a(),l.addEventListener("load",a),u.push(()=>{l.removeEventListener("load",a)})}),()=>{W.removeEventListener("keydown",s),u.forEach(l=>{l()})}}),y.createElement(re,{...o,tooltipShown:e,onVisibilityChange:c})};export{Fe as WithToolTipState,Fe as WithTooltip,re as WithTooltipPure};
//# sourceMappingURL=WithTooltip-6RTI5BE5-81dd8915.js.map
