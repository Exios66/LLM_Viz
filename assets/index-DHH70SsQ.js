var e0=Object.defineProperty;var t0=(t,e,n)=>e in t?e0(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Ue=(t,e,n)=>t0(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var qm={exports:{}},Xl={},Km={exports:{}},je={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vo=Symbol.for("react.element"),n0=Symbol.for("react.portal"),i0=Symbol.for("react.fragment"),r0=Symbol.for("react.strict_mode"),s0=Symbol.for("react.profiler"),o0=Symbol.for("react.provider"),a0=Symbol.for("react.context"),l0=Symbol.for("react.forward_ref"),c0=Symbol.for("react.suspense"),u0=Symbol.for("react.memo"),d0=Symbol.for("react.lazy"),Rf=Symbol.iterator;function h0(t){return t===null||typeof t!="object"?null:(t=Rf&&t[Rf]||t["@@iterator"],typeof t=="function"?t:null)}var Zm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Qm=Object.assign,Jm={};function Bs(t,e,n){this.props=t,this.context=e,this.refs=Jm,this.updater=n||Zm}Bs.prototype.isReactComponent={};Bs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Bs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function eg(){}eg.prototype=Bs.prototype;function dh(t,e,n){this.props=t,this.context=e,this.refs=Jm,this.updater=n||Zm}var hh=dh.prototype=new eg;hh.constructor=dh;Qm(hh,Bs.prototype);hh.isPureReactComponent=!0;var Pf=Array.isArray,tg=Object.prototype.hasOwnProperty,fh={current:null},ng={key:!0,ref:!0,__self:!0,__source:!0};function ig(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)tg.call(e,i)&&!ng.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Vo,type:t,key:s,ref:o,props:r,_owner:fh.current}}function f0(t,e){return{$$typeof:Vo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function ph(t){return typeof t=="object"&&t!==null&&t.$$typeof===Vo}function p0(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Lf=/\/+/g;function _c(t,e){return typeof t=="object"&&t!==null&&t.key!=null?p0(""+t.key):e.toString(36)}function Xa(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Vo:case n0:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+_c(o,0):i,Pf(r)?(n="",t!=null&&(n=t.replace(Lf,"$&/")+"/"),Xa(r,e,n,"",function(c){return c})):r!=null&&(ph(r)&&(r=f0(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Lf,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Pf(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+_c(s,a);o+=Xa(s,e,n,l,r)}else if(l=h0(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+_c(s,a++),o+=Xa(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ta(t,e,n){if(t==null)return t;var i=[],r=0;return Xa(t,i,"","",function(s){return e.call(n,s,r++)}),i}function m0(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Kt={current:null},$a={transition:null},g0={ReactCurrentDispatcher:Kt,ReactCurrentBatchConfig:$a,ReactCurrentOwner:fh};function rg(){throw Error("act(...) is not supported in production builds of React.")}je.Children={map:ta,forEach:function(t,e,n){ta(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ta(t,function(){e++}),e},toArray:function(t){return ta(t,function(e){return e})||[]},only:function(t){if(!ph(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};je.Component=Bs;je.Fragment=i0;je.Profiler=s0;je.PureComponent=dh;je.StrictMode=r0;je.Suspense=c0;je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=g0;je.act=rg;je.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Qm({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=fh.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)tg.call(e,l)&&!ng.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Vo,type:t.type,key:r,ref:s,props:i,_owner:o}};je.createContext=function(t){return t={$$typeof:a0,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:o0,_context:t},t.Consumer=t};je.createElement=ig;je.createFactory=function(t){var e=ig.bind(null,t);return e.type=t,e};je.createRef=function(){return{current:null}};je.forwardRef=function(t){return{$$typeof:l0,render:t}};je.isValidElement=ph;je.lazy=function(t){return{$$typeof:d0,_payload:{_status:-1,_result:t},_init:m0}};je.memo=function(t,e){return{$$typeof:u0,type:t,compare:e===void 0?null:e}};je.startTransition=function(t){var e=$a.transition;$a.transition={};try{t()}finally{$a.transition=e}};je.unstable_act=rg;je.useCallback=function(t,e){return Kt.current.useCallback(t,e)};je.useContext=function(t){return Kt.current.useContext(t)};je.useDebugValue=function(){};je.useDeferredValue=function(t){return Kt.current.useDeferredValue(t)};je.useEffect=function(t,e){return Kt.current.useEffect(t,e)};je.useId=function(){return Kt.current.useId()};je.useImperativeHandle=function(t,e,n){return Kt.current.useImperativeHandle(t,e,n)};je.useInsertionEffect=function(t,e){return Kt.current.useInsertionEffect(t,e)};je.useLayoutEffect=function(t,e){return Kt.current.useLayoutEffect(t,e)};je.useMemo=function(t,e){return Kt.current.useMemo(t,e)};je.useReducer=function(t,e,n){return Kt.current.useReducer(t,e,n)};je.useRef=function(t){return Kt.current.useRef(t)};je.useState=function(t){return Kt.current.useState(t)};je.useSyncExternalStore=function(t,e,n){return Kt.current.useSyncExternalStore(t,e,n)};je.useTransition=function(){return Kt.current.useTransition()};je.version="18.3.1";Km.exports=je;var ye=Km.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _0=ye,v0=Symbol.for("react.element"),x0=Symbol.for("react.fragment"),y0=Object.prototype.hasOwnProperty,S0=_0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,M0={key:!0,ref:!0,__self:!0,__source:!0};function sg(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)y0.call(e,i)&&!M0.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:v0,type:t,key:s,ref:o,props:r,_owner:S0.current}}Xl.Fragment=x0;Xl.jsx=sg;Xl.jsxs=sg;qm.exports=Xl;var m=qm.exports,og={exports:{}},yn={},ag={exports:{}},lg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(D,Z){var K=D.length;D.push(Z);e:for(;0<K;){var re=K-1>>>1,Ee=D[re];if(0<r(Ee,Z))D[re]=Z,D[K]=Ee,K=re;else break e}}function n(D){return D.length===0?null:D[0]}function i(D){if(D.length===0)return null;var Z=D[0],K=D.pop();if(K!==Z){D[0]=K;e:for(var re=0,Ee=D.length,Be=Ee>>>1;re<Be;){var V=2*(re+1)-1,ne=D[V],ue=V+1,de=D[ue];if(0>r(ne,K))ue<Ee&&0>r(de,ne)?(D[re]=de,D[ue]=K,re=ue):(D[re]=ne,D[V]=K,re=V);else if(ue<Ee&&0>r(de,K))D[re]=de,D[ue]=K,re=ue;else break e}}return Z}function r(D,Z){var K=D.sortIndex-Z.sortIndex;return K!==0?K:D.id-Z.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],d=1,f=null,h=3,p=!1,_=!1,y=!1,g=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(D){for(var Z=n(c);Z!==null;){if(Z.callback===null)i(c);else if(Z.startTime<=D)i(c),Z.sortIndex=Z.expirationTime,e(l,Z);else break;Z=n(c)}}function w(D){if(y=!1,v(D),!_)if(n(l)!==null)_=!0,G(L);else{var Z=n(c);Z!==null&&ee(w,Z.startTime-D)}}function L(D,Z){_=!1,y&&(y=!1,u(P),P=-1),p=!0;var K=h;try{for(v(Z),f=n(l);f!==null&&(!(f.expirationTime>Z)||D&&!E());){var re=f.callback;if(typeof re=="function"){f.callback=null,h=f.priorityLevel;var Ee=re(f.expirationTime<=Z);Z=t.unstable_now(),typeof Ee=="function"?f.callback=Ee:f===n(l)&&i(l),v(Z)}else i(l);f=n(l)}if(f!==null)var Be=!0;else{var V=n(c);V!==null&&ee(w,V.startTime-Z),Be=!1}return Be}finally{f=null,h=K,p=!1}}var b=!1,A=null,P=-1,Y=5,S=-1;function E(){return!(t.unstable_now()-S<Y)}function W(){if(A!==null){var D=t.unstable_now();S=D;var Z=!0;try{Z=A(!0,D)}finally{Z?B():(b=!1,A=null)}}else b=!1}var B;if(typeof x=="function")B=function(){x(W)};else if(typeof MessageChannel<"u"){var $=new MessageChannel,J=$.port2;$.port1.onmessage=W,B=function(){J.postMessage(null)}}else B=function(){g(W,0)};function G(D){A=D,b||(b=!0,B())}function ee(D,Z){P=g(function(){D(t.unstable_now())},Z)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(D){D.callback=null},t.unstable_continueExecution=function(){_||p||(_=!0,G(L))},t.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Y=0<D?Math.floor(1e3/D):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(D){switch(h){case 1:case 2:case 3:var Z=3;break;default:Z=h}var K=h;h=Z;try{return D()}finally{h=K}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(D,Z){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var K=h;h=D;try{return Z()}finally{h=K}},t.unstable_scheduleCallback=function(D,Z,K){var re=t.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?re+K:re):K=re,D){case 1:var Ee=-1;break;case 2:Ee=250;break;case 5:Ee=1073741823;break;case 4:Ee=1e4;break;default:Ee=5e3}return Ee=K+Ee,D={id:d++,callback:Z,priorityLevel:D,startTime:K,expirationTime:Ee,sortIndex:-1},K>re?(D.sortIndex=K,e(c,D),n(l)===null&&D===n(c)&&(y?(u(P),P=-1):y=!0,ee(w,K-re))):(D.sortIndex=Ee,e(l,D),_||p||(_=!0,G(L))),D},t.unstable_shouldYield=E,t.unstable_wrapCallback=function(D){var Z=h;return function(){var K=h;h=Z;try{return D.apply(this,arguments)}finally{h=K}}}})(lg);ag.exports=lg;var E0=ag.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var w0=ye,xn=E0;function ie(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var cg=new Set,Eo={};function Fr(t,e){As(t,e),As(t+"Capture",e)}function As(t,e){for(Eo[t]=e,t=0;t<e.length;t++)cg.add(e[t])}var vi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Au=Object.prototype.hasOwnProperty,T0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Nf={},Df={};function A0(t){return Au.call(Df,t)?!0:Au.call(Nf,t)?!1:T0.test(t)?Df[t]=!0:(Nf[t]=!0,!1)}function b0(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function C0(t,e,n,i){if(e===null||typeof e>"u"||b0(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Zt(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var kt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){kt[t]=new Zt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];kt[e]=new Zt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){kt[t]=new Zt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){kt[t]=new Zt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){kt[t]=new Zt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){kt[t]=new Zt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){kt[t]=new Zt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){kt[t]=new Zt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){kt[t]=new Zt(t,5,!1,t.toLowerCase(),null,!1,!1)});var mh=/[\-:]([a-z])/g;function gh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(mh,gh);kt[e]=new Zt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(mh,gh);kt[e]=new Zt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(mh,gh);kt[e]=new Zt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){kt[t]=new Zt(t,1,!1,t.toLowerCase(),null,!1,!1)});kt.xlinkHref=new Zt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){kt[t]=new Zt(t,1,!1,t.toLowerCase(),null,!0,!0)});function _h(t,e,n,i){var r=kt.hasOwnProperty(e)?kt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(C0(e,n,r,i)&&(n=null),i||r===null?A0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ti=w0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,na=Symbol.for("react.element"),ts=Symbol.for("react.portal"),ns=Symbol.for("react.fragment"),vh=Symbol.for("react.strict_mode"),bu=Symbol.for("react.profiler"),ug=Symbol.for("react.provider"),dg=Symbol.for("react.context"),xh=Symbol.for("react.forward_ref"),Cu=Symbol.for("react.suspense"),Ru=Symbol.for("react.suspense_list"),yh=Symbol.for("react.memo"),Ii=Symbol.for("react.lazy"),hg=Symbol.for("react.offscreen"),If=Symbol.iterator;function Ws(t){return t===null||typeof t!="object"?null:(t=If&&t[If]||t["@@iterator"],typeof t=="function"?t:null)}var gt=Object.assign,vc;function lo(t){if(vc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);vc=e&&e[1]||""}return`
`+vc+t}var xc=!1;function yc(t,e){if(!t||xc)return"";xc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{xc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?lo(t):""}function R0(t){switch(t.tag){case 5:return lo(t.type);case 16:return lo("Lazy");case 13:return lo("Suspense");case 19:return lo("SuspenseList");case 0:case 2:case 15:return t=yc(t.type,!1),t;case 11:return t=yc(t.type.render,!1),t;case 1:return t=yc(t.type,!0),t;default:return""}}function Pu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ns:return"Fragment";case ts:return"Portal";case bu:return"Profiler";case vh:return"StrictMode";case Cu:return"Suspense";case Ru:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case dg:return(t.displayName||"Context")+".Consumer";case ug:return(t._context.displayName||"Context")+".Provider";case xh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case yh:return e=t.displayName||null,e!==null?e:Pu(t.type)||"Memo";case Ii:e=t._payload,t=t._init;try{return Pu(t(e))}catch{}}return null}function P0(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Pu(e);case 8:return e===vh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Qi(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function fg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function L0(t){var e=fg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ia(t){t._valueTracker||(t._valueTracker=L0(t))}function pg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=fg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function hl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Lu(t,e){var n=e.checked;return gt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Uf(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Qi(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function mg(t,e){e=e.checked,e!=null&&_h(t,"checked",e,!1)}function Nu(t,e){mg(t,e);var n=Qi(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Du(t,e.type,n):e.hasOwnProperty("defaultValue")&&Du(t,e.type,Qi(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Ff(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Du(t,e,n){(e!=="number"||hl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var co=Array.isArray;function ms(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Qi(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Iu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ie(91));return gt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Of(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ie(92));if(co(n)){if(1<n.length)throw Error(ie(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Qi(n)}}function gg(t,e){var n=Qi(e.value),i=Qi(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function kf(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function _g(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Uu(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?_g(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ra,vg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(ra=ra||document.createElement("div"),ra.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ra.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function wo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var po={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},N0=["Webkit","ms","Moz","O"];Object.keys(po).forEach(function(t){N0.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),po[e]=po[t]})});function xg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||po.hasOwnProperty(t)&&po[t]?(""+e).trim():e+"px"}function yg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=xg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var D0=gt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Fu(t,e){if(e){if(D0[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ie(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ie(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ie(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ie(62))}}function Ou(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ku=null;function Sh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var zu=null,gs=null,_s=null;function zf(t){if(t=Wo(t)){if(typeof zu!="function")throw Error(ie(280));var e=t.stateNode;e&&(e=Zl(e),zu(t.stateNode,t.type,e))}}function Sg(t){gs?_s?_s.push(t):_s=[t]:gs=t}function Mg(){if(gs){var t=gs,e=_s;if(_s=gs=null,zf(t),e)for(t=0;t<e.length;t++)zf(e[t])}}function Eg(t,e){return t(e)}function wg(){}var Sc=!1;function Tg(t,e,n){if(Sc)return t(e,n);Sc=!0;try{return Eg(t,e,n)}finally{Sc=!1,(gs!==null||_s!==null)&&(wg(),Mg())}}function To(t,e){var n=t.stateNode;if(n===null)return null;var i=Zl(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ie(231,e,typeof n));return n}var Bu=!1;if(vi)try{var Xs={};Object.defineProperty(Xs,"passive",{get:function(){Bu=!0}}),window.addEventListener("test",Xs,Xs),window.removeEventListener("test",Xs,Xs)}catch{Bu=!1}function I0(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(d){this.onError(d)}}var mo=!1,fl=null,pl=!1,Hu=null,U0={onError:function(t){mo=!0,fl=t}};function F0(t,e,n,i,r,s,o,a,l){mo=!1,fl=null,I0.apply(U0,arguments)}function O0(t,e,n,i,r,s,o,a,l){if(F0.apply(this,arguments),mo){if(mo){var c=fl;mo=!1,fl=null}else throw Error(ie(198));pl||(pl=!0,Hu=c)}}function Or(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Ag(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Bf(t){if(Or(t)!==t)throw Error(ie(188))}function k0(t){var e=t.alternate;if(!e){if(e=Or(t),e===null)throw Error(ie(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Bf(r),t;if(s===i)return Bf(r),e;s=s.sibling}throw Error(ie(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(ie(189))}}if(n.alternate!==i)throw Error(ie(190))}if(n.tag!==3)throw Error(ie(188));return n.stateNode.current===n?t:e}function bg(t){return t=k0(t),t!==null?Cg(t):null}function Cg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Cg(t);if(e!==null)return e;t=t.sibling}return null}var Rg=xn.unstable_scheduleCallback,Hf=xn.unstable_cancelCallback,z0=xn.unstable_shouldYield,B0=xn.unstable_requestPaint,St=xn.unstable_now,H0=xn.unstable_getCurrentPriorityLevel,Mh=xn.unstable_ImmediatePriority,Pg=xn.unstable_UserBlockingPriority,ml=xn.unstable_NormalPriority,V0=xn.unstable_LowPriority,Lg=xn.unstable_IdlePriority,$l=null,ei=null;function G0(t){if(ei&&typeof ei.onCommitFiberRoot=="function")try{ei.onCommitFiberRoot($l,t,void 0,(t.current.flags&128)===128)}catch{}}var jn=Math.clz32?Math.clz32:X0,j0=Math.log,W0=Math.LN2;function X0(t){return t>>>=0,t===0?32:31-(j0(t)/W0|0)|0}var sa=64,oa=4194304;function uo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function gl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=uo(a):(s&=o,s!==0&&(i=uo(s)))}else o=n&~r,o!==0?i=uo(o):s!==0&&(i=uo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-jn(e),r=1<<n,i|=t[n],e&=~r;return i}function $0(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Y0(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-jn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=$0(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Vu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Ng(){var t=sa;return sa<<=1,!(sa&4194240)&&(sa=64),t}function Mc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Go(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-jn(e),t[e]=n}function q0(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-jn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Eh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-jn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var st=0;function Dg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Ig,wh,Ug,Fg,Og,Gu=!1,aa=[],Vi=null,Gi=null,ji=null,Ao=new Map,bo=new Map,Oi=[],K0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Vf(t,e){switch(t){case"focusin":case"focusout":Vi=null;break;case"dragenter":case"dragleave":Gi=null;break;case"mouseover":case"mouseout":ji=null;break;case"pointerover":case"pointerout":Ao.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":bo.delete(e.pointerId)}}function $s(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Wo(e),e!==null&&wh(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Z0(t,e,n,i,r){switch(e){case"focusin":return Vi=$s(Vi,t,e,n,i,r),!0;case"dragenter":return Gi=$s(Gi,t,e,n,i,r),!0;case"mouseover":return ji=$s(ji,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Ao.set(s,$s(Ao.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,bo.set(s,$s(bo.get(s)||null,t,e,n,i,r)),!0}return!1}function kg(t){var e=xr(t.target);if(e!==null){var n=Or(e);if(n!==null){if(e=n.tag,e===13){if(e=Ag(n),e!==null){t.blockedOn=e,Og(t.priority,function(){Ug(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ya(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=ju(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);ku=i,n.target.dispatchEvent(i),ku=null}else return e=Wo(n),e!==null&&wh(e),t.blockedOn=n,!1;e.shift()}return!0}function Gf(t,e,n){Ya(t)&&n.delete(e)}function Q0(){Gu=!1,Vi!==null&&Ya(Vi)&&(Vi=null),Gi!==null&&Ya(Gi)&&(Gi=null),ji!==null&&Ya(ji)&&(ji=null),Ao.forEach(Gf),bo.forEach(Gf)}function Ys(t,e){t.blockedOn===e&&(t.blockedOn=null,Gu||(Gu=!0,xn.unstable_scheduleCallback(xn.unstable_NormalPriority,Q0)))}function Co(t){function e(r){return Ys(r,t)}if(0<aa.length){Ys(aa[0],t);for(var n=1;n<aa.length;n++){var i=aa[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Vi!==null&&Ys(Vi,t),Gi!==null&&Ys(Gi,t),ji!==null&&Ys(ji,t),Ao.forEach(e),bo.forEach(e),n=0;n<Oi.length;n++)i=Oi[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Oi.length&&(n=Oi[0],n.blockedOn===null);)kg(n),n.blockedOn===null&&Oi.shift()}var vs=Ti.ReactCurrentBatchConfig,_l=!0;function J0(t,e,n,i){var r=st,s=vs.transition;vs.transition=null;try{st=1,Th(t,e,n,i)}finally{st=r,vs.transition=s}}function ex(t,e,n,i){var r=st,s=vs.transition;vs.transition=null;try{st=4,Th(t,e,n,i)}finally{st=r,vs.transition=s}}function Th(t,e,n,i){if(_l){var r=ju(t,e,n,i);if(r===null)Nc(t,e,i,vl,n),Vf(t,i);else if(Z0(r,t,e,n,i))i.stopPropagation();else if(Vf(t,i),e&4&&-1<K0.indexOf(t)){for(;r!==null;){var s=Wo(r);if(s!==null&&Ig(s),s=ju(t,e,n,i),s===null&&Nc(t,e,i,vl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Nc(t,e,i,null,n)}}var vl=null;function ju(t,e,n,i){if(vl=null,t=Sh(i),t=xr(t),t!==null)if(e=Or(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Ag(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return vl=t,null}function zg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(H0()){case Mh:return 1;case Pg:return 4;case ml:case V0:return 16;case Lg:return 536870912;default:return 16}default:return 16}}var Bi=null,Ah=null,qa=null;function Bg(){if(qa)return qa;var t,e=Ah,n=e.length,i,r="value"in Bi?Bi.value:Bi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return qa=r.slice(t,1<i?1-i:void 0)}function Ka(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function la(){return!0}function jf(){return!1}function Sn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?la:jf,this.isPropagationStopped=jf,this}return gt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=la)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=la)},persist:function(){},isPersistent:la}),e}var Hs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},bh=Sn(Hs),jo=gt({},Hs,{view:0,detail:0}),tx=Sn(jo),Ec,wc,qs,Yl=gt({},jo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ch,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==qs&&(qs&&t.type==="mousemove"?(Ec=t.screenX-qs.screenX,wc=t.screenY-qs.screenY):wc=Ec=0,qs=t),Ec)},movementY:function(t){return"movementY"in t?t.movementY:wc}}),Wf=Sn(Yl),nx=gt({},Yl,{dataTransfer:0}),ix=Sn(nx),rx=gt({},jo,{relatedTarget:0}),Tc=Sn(rx),sx=gt({},Hs,{animationName:0,elapsedTime:0,pseudoElement:0}),ox=Sn(sx),ax=gt({},Hs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),lx=Sn(ax),cx=gt({},Hs,{data:0}),Xf=Sn(cx),ux={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},dx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},hx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function fx(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=hx[t])?!!e[t]:!1}function Ch(){return fx}var px=gt({},jo,{key:function(t){if(t.key){var e=ux[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Ka(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?dx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ch,charCode:function(t){return t.type==="keypress"?Ka(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ka(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),mx=Sn(px),gx=gt({},Yl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),$f=Sn(gx),_x=gt({},jo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ch}),vx=Sn(_x),xx=gt({},Hs,{propertyName:0,elapsedTime:0,pseudoElement:0}),yx=Sn(xx),Sx=gt({},Yl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Mx=Sn(Sx),Ex=[9,13,27,32],Rh=vi&&"CompositionEvent"in window,go=null;vi&&"documentMode"in document&&(go=document.documentMode);var wx=vi&&"TextEvent"in window&&!go,Hg=vi&&(!Rh||go&&8<go&&11>=go),Yf=" ",qf=!1;function Vg(t,e){switch(t){case"keyup":return Ex.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Gg(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var is=!1;function Tx(t,e){switch(t){case"compositionend":return Gg(e);case"keypress":return e.which!==32?null:(qf=!0,Yf);case"textInput":return t=e.data,t===Yf&&qf?null:t;default:return null}}function Ax(t,e){if(is)return t==="compositionend"||!Rh&&Vg(t,e)?(t=Bg(),qa=Ah=Bi=null,is=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Hg&&e.locale!=="ko"?null:e.data;default:return null}}var bx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Kf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!bx[t.type]:e==="textarea"}function jg(t,e,n,i){Sg(i),e=xl(e,"onChange"),0<e.length&&(n=new bh("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var _o=null,Ro=null;function Cx(t){t_(t,0)}function ql(t){var e=os(t);if(pg(e))return t}function Rx(t,e){if(t==="change")return e}var Wg=!1;if(vi){var Ac;if(vi){var bc="oninput"in document;if(!bc){var Zf=document.createElement("div");Zf.setAttribute("oninput","return;"),bc=typeof Zf.oninput=="function"}Ac=bc}else Ac=!1;Wg=Ac&&(!document.documentMode||9<document.documentMode)}function Qf(){_o&&(_o.detachEvent("onpropertychange",Xg),Ro=_o=null)}function Xg(t){if(t.propertyName==="value"&&ql(Ro)){var e=[];jg(e,Ro,t,Sh(t)),Tg(Cx,e)}}function Px(t,e,n){t==="focusin"?(Qf(),_o=e,Ro=n,_o.attachEvent("onpropertychange",Xg)):t==="focusout"&&Qf()}function Lx(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ql(Ro)}function Nx(t,e){if(t==="click")return ql(e)}function Dx(t,e){if(t==="input"||t==="change")return ql(e)}function Ix(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var $n=typeof Object.is=="function"?Object.is:Ix;function Po(t,e){if($n(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Au.call(e,r)||!$n(t[r],e[r]))return!1}return!0}function Jf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function ep(t,e){var n=Jf(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Jf(n)}}function $g(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?$g(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Yg(){for(var t=window,e=hl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=hl(t.document)}return e}function Ph(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Ux(t){var e=Yg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&$g(n.ownerDocument.documentElement,n)){if(i!==null&&Ph(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=ep(n,s);var o=ep(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Fx=vi&&"documentMode"in document&&11>=document.documentMode,rs=null,Wu=null,vo=null,Xu=!1;function tp(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Xu||rs==null||rs!==hl(i)||(i=rs,"selectionStart"in i&&Ph(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),vo&&Po(vo,i)||(vo=i,i=xl(Wu,"onSelect"),0<i.length&&(e=new bh("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=rs)))}function ca(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ss={animationend:ca("Animation","AnimationEnd"),animationiteration:ca("Animation","AnimationIteration"),animationstart:ca("Animation","AnimationStart"),transitionend:ca("Transition","TransitionEnd")},Cc={},qg={};vi&&(qg=document.createElement("div").style,"AnimationEvent"in window||(delete ss.animationend.animation,delete ss.animationiteration.animation,delete ss.animationstart.animation),"TransitionEvent"in window||delete ss.transitionend.transition);function Kl(t){if(Cc[t])return Cc[t];if(!ss[t])return t;var e=ss[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in qg)return Cc[t]=e[n];return t}var Kg=Kl("animationend"),Zg=Kl("animationiteration"),Qg=Kl("animationstart"),Jg=Kl("transitionend"),e_=new Map,np="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function nr(t,e){e_.set(t,e),Fr(e,[t])}for(var Rc=0;Rc<np.length;Rc++){var Pc=np[Rc],Ox=Pc.toLowerCase(),kx=Pc[0].toUpperCase()+Pc.slice(1);nr(Ox,"on"+kx)}nr(Kg,"onAnimationEnd");nr(Zg,"onAnimationIteration");nr(Qg,"onAnimationStart");nr("dblclick","onDoubleClick");nr("focusin","onFocus");nr("focusout","onBlur");nr(Jg,"onTransitionEnd");As("onMouseEnter",["mouseout","mouseover"]);As("onMouseLeave",["mouseout","mouseover"]);As("onPointerEnter",["pointerout","pointerover"]);As("onPointerLeave",["pointerout","pointerover"]);Fr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Fr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Fr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Fr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Fr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Fr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ho="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),zx=new Set("cancel close invalid load scroll toggle".split(" ").concat(ho));function ip(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,O0(i,e,void 0,t),t.currentTarget=null}function t_(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;ip(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;ip(r,a,c),s=l}}}if(pl)throw t=Hu,pl=!1,Hu=null,t}function ct(t,e){var n=e[Zu];n===void 0&&(n=e[Zu]=new Set);var i=t+"__bubble";n.has(i)||(n_(e,t,2,!1),n.add(i))}function Lc(t,e,n){var i=0;e&&(i|=4),n_(n,t,i,e)}var ua="_reactListening"+Math.random().toString(36).slice(2);function Lo(t){if(!t[ua]){t[ua]=!0,cg.forEach(function(n){n!=="selectionchange"&&(zx.has(n)||Lc(n,!1,t),Lc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ua]||(e[ua]=!0,Lc("selectionchange",!1,e))}}function n_(t,e,n,i){switch(zg(e)){case 1:var r=J0;break;case 4:r=ex;break;default:r=Th}n=r.bind(null,e,n,t),r=void 0,!Bu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Nc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=xr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}Tg(function(){var c=s,d=Sh(n),f=[];e:{var h=e_.get(t);if(h!==void 0){var p=bh,_=t;switch(t){case"keypress":if(Ka(n)===0)break e;case"keydown":case"keyup":p=mx;break;case"focusin":_="focus",p=Tc;break;case"focusout":_="blur",p=Tc;break;case"beforeblur":case"afterblur":p=Tc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Wf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=ix;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=vx;break;case Kg:case Zg:case Qg:p=ox;break;case Jg:p=yx;break;case"scroll":p=tx;break;case"wheel":p=Mx;break;case"copy":case"cut":case"paste":p=lx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=$f}var y=(e&4)!==0,g=!y&&t==="scroll",u=y?h!==null?h+"Capture":null:h;y=[];for(var x=c,v;x!==null;){v=x;var w=v.stateNode;if(v.tag===5&&w!==null&&(v=w,u!==null&&(w=To(x,u),w!=null&&y.push(No(x,w,v)))),g)break;x=x.return}0<y.length&&(h=new p(h,_,null,n,d),f.push({event:h,listeners:y}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",h&&n!==ku&&(_=n.relatedTarget||n.fromElement)&&(xr(_)||_[xi]))break e;if((p||h)&&(h=d.window===d?d:(h=d.ownerDocument)?h.defaultView||h.parentWindow:window,p?(_=n.relatedTarget||n.toElement,p=c,_=_?xr(_):null,_!==null&&(g=Or(_),_!==g||_.tag!==5&&_.tag!==6)&&(_=null)):(p=null,_=c),p!==_)){if(y=Wf,w="onMouseLeave",u="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(y=$f,w="onPointerLeave",u="onPointerEnter",x="pointer"),g=p==null?h:os(p),v=_==null?h:os(_),h=new y(w,x+"leave",p,n,d),h.target=g,h.relatedTarget=v,w=null,xr(d)===c&&(y=new y(u,x+"enter",_,n,d),y.target=v,y.relatedTarget=g,w=y),g=w,p&&_)t:{for(y=p,u=_,x=0,v=y;v;v=Br(v))x++;for(v=0,w=u;w;w=Br(w))v++;for(;0<x-v;)y=Br(y),x--;for(;0<v-x;)u=Br(u),v--;for(;x--;){if(y===u||u!==null&&y===u.alternate)break t;y=Br(y),u=Br(u)}y=null}else y=null;p!==null&&rp(f,h,p,y,!1),_!==null&&g!==null&&rp(f,g,_,y,!0)}}e:{if(h=c?os(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var L=Rx;else if(Kf(h))if(Wg)L=Dx;else{L=Lx;var b=Px}else(p=h.nodeName)&&p.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(L=Nx);if(L&&(L=L(t,c))){jg(f,L,n,d);break e}b&&b(t,h,c),t==="focusout"&&(b=h._wrapperState)&&b.controlled&&h.type==="number"&&Du(h,"number",h.value)}switch(b=c?os(c):window,t){case"focusin":(Kf(b)||b.contentEditable==="true")&&(rs=b,Wu=c,vo=null);break;case"focusout":vo=Wu=rs=null;break;case"mousedown":Xu=!0;break;case"contextmenu":case"mouseup":case"dragend":Xu=!1,tp(f,n,d);break;case"selectionchange":if(Fx)break;case"keydown":case"keyup":tp(f,n,d)}var A;if(Rh)e:{switch(t){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else is?Vg(t,n)&&(P="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(Hg&&n.locale!=="ko"&&(is||P!=="onCompositionStart"?P==="onCompositionEnd"&&is&&(A=Bg()):(Bi=d,Ah="value"in Bi?Bi.value:Bi.textContent,is=!0)),b=xl(c,P),0<b.length&&(P=new Xf(P,t,null,n,d),f.push({event:P,listeners:b}),A?P.data=A:(A=Gg(n),A!==null&&(P.data=A)))),(A=wx?Tx(t,n):Ax(t,n))&&(c=xl(c,"onBeforeInput"),0<c.length&&(d=new Xf("onBeforeInput","beforeinput",null,n,d),f.push({event:d,listeners:c}),d.data=A))}t_(f,e)})}function No(t,e,n){return{instance:t,listener:e,currentTarget:n}}function xl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=To(t,n),s!=null&&i.unshift(No(t,s,r)),s=To(t,e),s!=null&&i.push(No(t,s,r))),t=t.return}return i}function Br(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function rp(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=To(n,s),l!=null&&o.unshift(No(n,l,a))):r||(l=To(n,s),l!=null&&o.push(No(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Bx=/\r\n?/g,Hx=/\u0000|\uFFFD/g;function sp(t){return(typeof t=="string"?t:""+t).replace(Bx,`
`).replace(Hx,"")}function da(t,e,n){if(e=sp(e),sp(t)!==e&&n)throw Error(ie(425))}function yl(){}var $u=null,Yu=null;function qu(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Ku=typeof setTimeout=="function"?setTimeout:void 0,Vx=typeof clearTimeout=="function"?clearTimeout:void 0,op=typeof Promise=="function"?Promise:void 0,Gx=typeof queueMicrotask=="function"?queueMicrotask:typeof op<"u"?function(t){return op.resolve(null).then(t).catch(jx)}:Ku;function jx(t){setTimeout(function(){throw t})}function Dc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Co(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Co(e)}function Wi(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function ap(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Vs=Math.random().toString(36).slice(2),Jn="__reactFiber$"+Vs,Do="__reactProps$"+Vs,xi="__reactContainer$"+Vs,Zu="__reactEvents$"+Vs,Wx="__reactListeners$"+Vs,Xx="__reactHandles$"+Vs;function xr(t){var e=t[Jn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[xi]||n[Jn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=ap(t);t!==null;){if(n=t[Jn])return n;t=ap(t)}return e}t=n,n=t.parentNode}return null}function Wo(t){return t=t[Jn]||t[xi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function os(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ie(33))}function Zl(t){return t[Do]||null}var Qu=[],as=-1;function ir(t){return{current:t}}function dt(t){0>as||(t.current=Qu[as],Qu[as]=null,as--)}function at(t,e){as++,Qu[as]=t.current,t.current=e}var Ji={},jt=ir(Ji),on=ir(!1),br=Ji;function bs(t,e){var n=t.type.contextTypes;if(!n)return Ji;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function an(t){return t=t.childContextTypes,t!=null}function Sl(){dt(on),dt(jt)}function lp(t,e,n){if(jt.current!==Ji)throw Error(ie(168));at(jt,e),at(on,n)}function i_(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ie(108,P0(t)||"Unknown",r));return gt({},n,i)}function Ml(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Ji,br=jt.current,at(jt,t),at(on,on.current),!0}function cp(t,e,n){var i=t.stateNode;if(!i)throw Error(ie(169));n?(t=i_(t,e,br),i.__reactInternalMemoizedMergedChildContext=t,dt(on),dt(jt),at(jt,t)):dt(on),at(on,n)}var ui=null,Ql=!1,Ic=!1;function r_(t){ui===null?ui=[t]:ui.push(t)}function $x(t){Ql=!0,r_(t)}function rr(){if(!Ic&&ui!==null){Ic=!0;var t=0,e=st;try{var n=ui;for(st=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}ui=null,Ql=!1}catch(r){throw ui!==null&&(ui=ui.slice(t+1)),Rg(Mh,rr),r}finally{st=e,Ic=!1}}return null}var ls=[],cs=0,El=null,wl=0,wn=[],Tn=0,Cr=null,hi=1,fi="";function fr(t,e){ls[cs++]=wl,ls[cs++]=El,El=t,wl=e}function s_(t,e,n){wn[Tn++]=hi,wn[Tn++]=fi,wn[Tn++]=Cr,Cr=t;var i=hi;t=fi;var r=32-jn(i)-1;i&=~(1<<r),n+=1;var s=32-jn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,hi=1<<32-jn(e)+r|n<<r|i,fi=s+t}else hi=1<<s|n<<r|i,fi=t}function Lh(t){t.return!==null&&(fr(t,1),s_(t,1,0))}function Nh(t){for(;t===El;)El=ls[--cs],ls[cs]=null,wl=ls[--cs],ls[cs]=null;for(;t===Cr;)Cr=wn[--Tn],wn[Tn]=null,fi=wn[--Tn],wn[Tn]=null,hi=wn[--Tn],wn[Tn]=null}var vn=null,_n=null,ht=!1,Bn=null;function o_(t,e){var n=bn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function up(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,vn=t,_n=Wi(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,vn=t,_n=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Cr!==null?{id:hi,overflow:fi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=bn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,vn=t,_n=null,!0):!1;default:return!1}}function Ju(t){return(t.mode&1)!==0&&(t.flags&128)===0}function ed(t){if(ht){var e=_n;if(e){var n=e;if(!up(t,e)){if(Ju(t))throw Error(ie(418));e=Wi(n.nextSibling);var i=vn;e&&up(t,e)?o_(i,n):(t.flags=t.flags&-4097|2,ht=!1,vn=t)}}else{if(Ju(t))throw Error(ie(418));t.flags=t.flags&-4097|2,ht=!1,vn=t}}}function dp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;vn=t}function ha(t){if(t!==vn)return!1;if(!ht)return dp(t),ht=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!qu(t.type,t.memoizedProps)),e&&(e=_n)){if(Ju(t))throw a_(),Error(ie(418));for(;e;)o_(t,e),e=Wi(e.nextSibling)}if(dp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ie(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){_n=Wi(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}_n=null}}else _n=vn?Wi(t.stateNode.nextSibling):null;return!0}function a_(){for(var t=_n;t;)t=Wi(t.nextSibling)}function Cs(){_n=vn=null,ht=!1}function Dh(t){Bn===null?Bn=[t]:Bn.push(t)}var Yx=Ti.ReactCurrentBatchConfig;function Ks(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ie(309));var i=n.stateNode}if(!i)throw Error(ie(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(ie(284));if(!n._owner)throw Error(ie(290,t))}return t}function fa(t,e){throw t=Object.prototype.toString.call(e),Error(ie(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function hp(t){var e=t._init;return e(t._payload)}function l_(t){function e(u,x){if(t){var v=u.deletions;v===null?(u.deletions=[x],u.flags|=16):v.push(x)}}function n(u,x){if(!t)return null;for(;x!==null;)e(u,x),x=x.sibling;return null}function i(u,x){for(u=new Map;x!==null;)x.key!==null?u.set(x.key,x):u.set(x.index,x),x=x.sibling;return u}function r(u,x){return u=qi(u,x),u.index=0,u.sibling=null,u}function s(u,x,v){return u.index=v,t?(v=u.alternate,v!==null?(v=v.index,v<x?(u.flags|=2,x):v):(u.flags|=2,x)):(u.flags|=1048576,x)}function o(u){return t&&u.alternate===null&&(u.flags|=2),u}function a(u,x,v,w){return x===null||x.tag!==6?(x=Hc(v,u.mode,w),x.return=u,x):(x=r(x,v),x.return=u,x)}function l(u,x,v,w){var L=v.type;return L===ns?d(u,x,v.props.children,w,v.key):x!==null&&(x.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===Ii&&hp(L)===x.type)?(w=r(x,v.props),w.ref=Ks(u,x,v),w.return=u,w):(w=il(v.type,v.key,v.props,null,u.mode,w),w.ref=Ks(u,x,v),w.return=u,w)}function c(u,x,v,w){return x===null||x.tag!==4||x.stateNode.containerInfo!==v.containerInfo||x.stateNode.implementation!==v.implementation?(x=Vc(v,u.mode,w),x.return=u,x):(x=r(x,v.children||[]),x.return=u,x)}function d(u,x,v,w,L){return x===null||x.tag!==7?(x=Ar(v,u.mode,w,L),x.return=u,x):(x=r(x,v),x.return=u,x)}function f(u,x,v){if(typeof x=="string"&&x!==""||typeof x=="number")return x=Hc(""+x,u.mode,v),x.return=u,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case na:return v=il(x.type,x.key,x.props,null,u.mode,v),v.ref=Ks(u,null,x),v.return=u,v;case ts:return x=Vc(x,u.mode,v),x.return=u,x;case Ii:var w=x._init;return f(u,w(x._payload),v)}if(co(x)||Ws(x))return x=Ar(x,u.mode,v,null),x.return=u,x;fa(u,x)}return null}function h(u,x,v,w){var L=x!==null?x.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return L!==null?null:a(u,x,""+v,w);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case na:return v.key===L?l(u,x,v,w):null;case ts:return v.key===L?c(u,x,v,w):null;case Ii:return L=v._init,h(u,x,L(v._payload),w)}if(co(v)||Ws(v))return L!==null?null:d(u,x,v,w,null);fa(u,v)}return null}function p(u,x,v,w,L){if(typeof w=="string"&&w!==""||typeof w=="number")return u=u.get(v)||null,a(x,u,""+w,L);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case na:return u=u.get(w.key===null?v:w.key)||null,l(x,u,w,L);case ts:return u=u.get(w.key===null?v:w.key)||null,c(x,u,w,L);case Ii:var b=w._init;return p(u,x,v,b(w._payload),L)}if(co(w)||Ws(w))return u=u.get(v)||null,d(x,u,w,L,null);fa(x,w)}return null}function _(u,x,v,w){for(var L=null,b=null,A=x,P=x=0,Y=null;A!==null&&P<v.length;P++){A.index>P?(Y=A,A=null):Y=A.sibling;var S=h(u,A,v[P],w);if(S===null){A===null&&(A=Y);break}t&&A&&S.alternate===null&&e(u,A),x=s(S,x,P),b===null?L=S:b.sibling=S,b=S,A=Y}if(P===v.length)return n(u,A),ht&&fr(u,P),L;if(A===null){for(;P<v.length;P++)A=f(u,v[P],w),A!==null&&(x=s(A,x,P),b===null?L=A:b.sibling=A,b=A);return ht&&fr(u,P),L}for(A=i(u,A);P<v.length;P++)Y=p(A,u,P,v[P],w),Y!==null&&(t&&Y.alternate!==null&&A.delete(Y.key===null?P:Y.key),x=s(Y,x,P),b===null?L=Y:b.sibling=Y,b=Y);return t&&A.forEach(function(E){return e(u,E)}),ht&&fr(u,P),L}function y(u,x,v,w){var L=Ws(v);if(typeof L!="function")throw Error(ie(150));if(v=L.call(v),v==null)throw Error(ie(151));for(var b=L=null,A=x,P=x=0,Y=null,S=v.next();A!==null&&!S.done;P++,S=v.next()){A.index>P?(Y=A,A=null):Y=A.sibling;var E=h(u,A,S.value,w);if(E===null){A===null&&(A=Y);break}t&&A&&E.alternate===null&&e(u,A),x=s(E,x,P),b===null?L=E:b.sibling=E,b=E,A=Y}if(S.done)return n(u,A),ht&&fr(u,P),L;if(A===null){for(;!S.done;P++,S=v.next())S=f(u,S.value,w),S!==null&&(x=s(S,x,P),b===null?L=S:b.sibling=S,b=S);return ht&&fr(u,P),L}for(A=i(u,A);!S.done;P++,S=v.next())S=p(A,u,P,S.value,w),S!==null&&(t&&S.alternate!==null&&A.delete(S.key===null?P:S.key),x=s(S,x,P),b===null?L=S:b.sibling=S,b=S);return t&&A.forEach(function(W){return e(u,W)}),ht&&fr(u,P),L}function g(u,x,v,w){if(typeof v=="object"&&v!==null&&v.type===ns&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case na:e:{for(var L=v.key,b=x;b!==null;){if(b.key===L){if(L=v.type,L===ns){if(b.tag===7){n(u,b.sibling),x=r(b,v.props.children),x.return=u,u=x;break e}}else if(b.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===Ii&&hp(L)===b.type){n(u,b.sibling),x=r(b,v.props),x.ref=Ks(u,b,v),x.return=u,u=x;break e}n(u,b);break}else e(u,b);b=b.sibling}v.type===ns?(x=Ar(v.props.children,u.mode,w,v.key),x.return=u,u=x):(w=il(v.type,v.key,v.props,null,u.mode,w),w.ref=Ks(u,x,v),w.return=u,u=w)}return o(u);case ts:e:{for(b=v.key;x!==null;){if(x.key===b)if(x.tag===4&&x.stateNode.containerInfo===v.containerInfo&&x.stateNode.implementation===v.implementation){n(u,x.sibling),x=r(x,v.children||[]),x.return=u,u=x;break e}else{n(u,x);break}else e(u,x);x=x.sibling}x=Vc(v,u.mode,w),x.return=u,u=x}return o(u);case Ii:return b=v._init,g(u,x,b(v._payload),w)}if(co(v))return _(u,x,v,w);if(Ws(v))return y(u,x,v,w);fa(u,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,x!==null&&x.tag===6?(n(u,x.sibling),x=r(x,v),x.return=u,u=x):(n(u,x),x=Hc(v,u.mode,w),x.return=u,u=x),o(u)):n(u,x)}return g}var Rs=l_(!0),c_=l_(!1),Tl=ir(null),Al=null,us=null,Ih=null;function Uh(){Ih=us=Al=null}function Fh(t){var e=Tl.current;dt(Tl),t._currentValue=e}function td(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function xs(t,e){Al=t,Ih=us=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(rn=!0),t.firstContext=null)}function Ln(t){var e=t._currentValue;if(Ih!==t)if(t={context:t,memoizedValue:e,next:null},us===null){if(Al===null)throw Error(ie(308));us=t,Al.dependencies={lanes:0,firstContext:t}}else us=us.next=t;return e}var yr=null;function Oh(t){yr===null?yr=[t]:yr.push(t)}function u_(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Oh(e)):(n.next=r.next,r.next=n),e.interleaved=n,yi(t,i)}function yi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Ui=!1;function kh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function d_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function _i(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Xi(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,qe&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,yi(t,n)}return r=i.interleaved,r===null?(e.next=e,Oh(i)):(e.next=r.next,r.next=e),i.interleaved=e,yi(t,n)}function Za(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Eh(t,n)}}function fp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function bl(t,e,n,i){var r=t.updateQueue;Ui=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var d=t.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==o&&(a===null?d.firstBaseUpdate=c:a.next=c,d.lastBaseUpdate=l))}if(s!==null){var f=r.baseState;o=0,d=c=l=null,a=s;do{var h=a.lane,p=a.eventTime;if((i&h)===h){d!==null&&(d=d.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var _=t,y=a;switch(h=e,p=n,y.tag){case 1:if(_=y.payload,typeof _=="function"){f=_.call(p,f,h);break e}f=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=y.payload,h=typeof _=="function"?_.call(p,f,h):_,h==null)break e;f=gt({},f,h);break e;case 2:Ui=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else p={eventTime:p,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(c=d=p,l=f):d=d.next=p,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(d===null&&(l=f),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=d,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Pr|=o,t.lanes=o,t.memoizedState=f}}function pp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ie(191,r));r.call(i)}}}var Xo={},ti=ir(Xo),Io=ir(Xo),Uo=ir(Xo);function Sr(t){if(t===Xo)throw Error(ie(174));return t}function zh(t,e){switch(at(Uo,e),at(Io,t),at(ti,Xo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Uu(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Uu(e,t)}dt(ti),at(ti,e)}function Ps(){dt(ti),dt(Io),dt(Uo)}function h_(t){Sr(Uo.current);var e=Sr(ti.current),n=Uu(e,t.type);e!==n&&(at(Io,t),at(ti,n))}function Bh(t){Io.current===t&&(dt(ti),dt(Io))}var ft=ir(0);function Cl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Uc=[];function Hh(){for(var t=0;t<Uc.length;t++)Uc[t]._workInProgressVersionPrimary=null;Uc.length=0}var Qa=Ti.ReactCurrentDispatcher,Fc=Ti.ReactCurrentBatchConfig,Rr=0,pt=null,bt=null,Dt=null,Rl=!1,xo=!1,Fo=0,qx=0;function zt(){throw Error(ie(321))}function Vh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!$n(t[n],e[n]))return!1;return!0}function Gh(t,e,n,i,r,s){if(Rr=s,pt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Qa.current=t===null||t.memoizedState===null?Jx:ey,t=n(i,r),xo){s=0;do{if(xo=!1,Fo=0,25<=s)throw Error(ie(301));s+=1,Dt=bt=null,e.updateQueue=null,Qa.current=ty,t=n(i,r)}while(xo)}if(Qa.current=Pl,e=bt!==null&&bt.next!==null,Rr=0,Dt=bt=pt=null,Rl=!1,e)throw Error(ie(300));return t}function jh(){var t=Fo!==0;return Fo=0,t}function Kn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Dt===null?pt.memoizedState=Dt=t:Dt=Dt.next=t,Dt}function Nn(){if(bt===null){var t=pt.alternate;t=t!==null?t.memoizedState:null}else t=bt.next;var e=Dt===null?pt.memoizedState:Dt.next;if(e!==null)Dt=e,bt=t;else{if(t===null)throw Error(ie(310));bt=t,t={memoizedState:bt.memoizedState,baseState:bt.baseState,baseQueue:bt.baseQueue,queue:bt.queue,next:null},Dt===null?pt.memoizedState=Dt=t:Dt=Dt.next=t}return Dt}function Oo(t,e){return typeof e=="function"?e(t):e}function Oc(t){var e=Nn(),n=e.queue;if(n===null)throw Error(ie(311));n.lastRenderedReducer=t;var i=bt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var d=c.lane;if((Rr&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var f={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=f,o=i):l=l.next=f,pt.lanes|=d,Pr|=d}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,$n(i,e.memoizedState)||(rn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,pt.lanes|=s,Pr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function kc(t){var e=Nn(),n=e.queue;if(n===null)throw Error(ie(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);$n(s,e.memoizedState)||(rn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function f_(){}function p_(t,e){var n=pt,i=Nn(),r=e(),s=!$n(i.memoizedState,r);if(s&&(i.memoizedState=r,rn=!0),i=i.queue,Wh(__.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Dt!==null&&Dt.memoizedState.tag&1){if(n.flags|=2048,ko(9,g_.bind(null,n,i,r,e),void 0,null),It===null)throw Error(ie(349));Rr&30||m_(n,e,r)}return r}function m_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=pt.updateQueue,e===null?(e={lastEffect:null,stores:null},pt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function g_(t,e,n,i){e.value=n,e.getSnapshot=i,v_(e)&&x_(t)}function __(t,e,n){return n(function(){v_(e)&&x_(t)})}function v_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!$n(t,n)}catch{return!0}}function x_(t){var e=yi(t,1);e!==null&&Wn(e,t,1,-1)}function mp(t){var e=Kn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Oo,lastRenderedState:t},e.queue=t,t=t.dispatch=Qx.bind(null,pt,t),[e.memoizedState,t]}function ko(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=pt.updateQueue,e===null?(e={lastEffect:null,stores:null},pt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function y_(){return Nn().memoizedState}function Ja(t,e,n,i){var r=Kn();pt.flags|=t,r.memoizedState=ko(1|e,n,void 0,i===void 0?null:i)}function Jl(t,e,n,i){var r=Nn();i=i===void 0?null:i;var s=void 0;if(bt!==null){var o=bt.memoizedState;if(s=o.destroy,i!==null&&Vh(i,o.deps)){r.memoizedState=ko(e,n,s,i);return}}pt.flags|=t,r.memoizedState=ko(1|e,n,s,i)}function gp(t,e){return Ja(8390656,8,t,e)}function Wh(t,e){return Jl(2048,8,t,e)}function S_(t,e){return Jl(4,2,t,e)}function M_(t,e){return Jl(4,4,t,e)}function E_(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function w_(t,e,n){return n=n!=null?n.concat([t]):null,Jl(4,4,E_.bind(null,e,t),n)}function Xh(){}function T_(t,e){var n=Nn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Vh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function A_(t,e){var n=Nn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Vh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function b_(t,e,n){return Rr&21?($n(n,e)||(n=Ng(),pt.lanes|=n,Pr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,rn=!0),t.memoizedState=n)}function Kx(t,e){var n=st;st=n!==0&&4>n?n:4,t(!0);var i=Fc.transition;Fc.transition={};try{t(!1),e()}finally{st=n,Fc.transition=i}}function C_(){return Nn().memoizedState}function Zx(t,e,n){var i=Yi(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},R_(t))P_(e,n);else if(n=u_(t,e,n,i),n!==null){var r=Yt();Wn(n,t,i,r),L_(n,e,i)}}function Qx(t,e,n){var i=Yi(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(R_(t))P_(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,$n(a,o)){var l=e.interleaved;l===null?(r.next=r,Oh(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=u_(t,e,r,i),n!==null&&(r=Yt(),Wn(n,t,i,r),L_(n,e,i))}}function R_(t){var e=t.alternate;return t===pt||e!==null&&e===pt}function P_(t,e){xo=Rl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function L_(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Eh(t,n)}}var Pl={readContext:Ln,useCallback:zt,useContext:zt,useEffect:zt,useImperativeHandle:zt,useInsertionEffect:zt,useLayoutEffect:zt,useMemo:zt,useReducer:zt,useRef:zt,useState:zt,useDebugValue:zt,useDeferredValue:zt,useTransition:zt,useMutableSource:zt,useSyncExternalStore:zt,useId:zt,unstable_isNewReconciler:!1},Jx={readContext:Ln,useCallback:function(t,e){return Kn().memoizedState=[t,e===void 0?null:e],t},useContext:Ln,useEffect:gp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Ja(4194308,4,E_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ja(4194308,4,t,e)},useInsertionEffect:function(t,e){return Ja(4,2,t,e)},useMemo:function(t,e){var n=Kn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=Kn();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Zx.bind(null,pt,t),[i.memoizedState,t]},useRef:function(t){var e=Kn();return t={current:t},e.memoizedState=t},useState:mp,useDebugValue:Xh,useDeferredValue:function(t){return Kn().memoizedState=t},useTransition:function(){var t=mp(!1),e=t[0];return t=Kx.bind(null,t[1]),Kn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=pt,r=Kn();if(ht){if(n===void 0)throw Error(ie(407));n=n()}else{if(n=e(),It===null)throw Error(ie(349));Rr&30||m_(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,gp(__.bind(null,i,s,t),[t]),i.flags|=2048,ko(9,g_.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=Kn(),e=It.identifierPrefix;if(ht){var n=fi,i=hi;n=(i&~(1<<32-jn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Fo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=qx++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},ey={readContext:Ln,useCallback:T_,useContext:Ln,useEffect:Wh,useImperativeHandle:w_,useInsertionEffect:S_,useLayoutEffect:M_,useMemo:A_,useReducer:Oc,useRef:y_,useState:function(){return Oc(Oo)},useDebugValue:Xh,useDeferredValue:function(t){var e=Nn();return b_(e,bt.memoizedState,t)},useTransition:function(){var t=Oc(Oo)[0],e=Nn().memoizedState;return[t,e]},useMutableSource:f_,useSyncExternalStore:p_,useId:C_,unstable_isNewReconciler:!1},ty={readContext:Ln,useCallback:T_,useContext:Ln,useEffect:Wh,useImperativeHandle:w_,useInsertionEffect:S_,useLayoutEffect:M_,useMemo:A_,useReducer:kc,useRef:y_,useState:function(){return kc(Oo)},useDebugValue:Xh,useDeferredValue:function(t){var e=Nn();return bt===null?e.memoizedState=t:b_(e,bt.memoizedState,t)},useTransition:function(){var t=kc(Oo)[0],e=Nn().memoizedState;return[t,e]},useMutableSource:f_,useSyncExternalStore:p_,useId:C_,unstable_isNewReconciler:!1};function kn(t,e){if(t&&t.defaultProps){e=gt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function nd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:gt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var ec={isMounted:function(t){return(t=t._reactInternals)?Or(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=Yt(),r=Yi(t),s=_i(i,r);s.payload=e,n!=null&&(s.callback=n),e=Xi(t,s,r),e!==null&&(Wn(e,t,r,i),Za(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=Yt(),r=Yi(t),s=_i(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Xi(t,s,r),e!==null&&(Wn(e,t,r,i),Za(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Yt(),i=Yi(t),r=_i(n,i);r.tag=2,e!=null&&(r.callback=e),e=Xi(t,r,i),e!==null&&(Wn(e,t,i,n),Za(e,t,i))}};function _p(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Po(n,i)||!Po(r,s):!0}function N_(t,e,n){var i=!1,r=Ji,s=e.contextType;return typeof s=="object"&&s!==null?s=Ln(s):(r=an(e)?br:jt.current,i=e.contextTypes,s=(i=i!=null)?bs(t,r):Ji),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=ec,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function vp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&ec.enqueueReplaceState(e,e.state,null)}function id(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},kh(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Ln(s):(s=an(e)?br:jt.current,r.context=bs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(nd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&ec.enqueueReplaceState(r,r.state,null),bl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Ls(t,e){try{var n="",i=e;do n+=R0(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function zc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function rd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var ny=typeof WeakMap=="function"?WeakMap:Map;function D_(t,e,n){n=_i(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Nl||(Nl=!0,pd=i),rd(t,e)},n}function I_(t,e,n){n=_i(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){rd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){rd(t,e),typeof i!="function"&&($i===null?$i=new Set([this]):$i.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function xp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new ny;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=gy.bind(null,t,e,n),e.then(t,t))}function yp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Sp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=_i(-1,1),e.tag=2,Xi(n,e,1))),n.lanes|=1),t)}var iy=Ti.ReactCurrentOwner,rn=!1;function Xt(t,e,n,i){e.child=t===null?c_(e,null,n,i):Rs(e,t.child,n,i)}function Mp(t,e,n,i,r){n=n.render;var s=e.ref;return xs(e,r),i=Gh(t,e,n,i,s,r),n=jh(),t!==null&&!rn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Si(t,e,r)):(ht&&n&&Lh(e),e.flags|=1,Xt(t,e,i,r),e.child)}function Ep(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!ef(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,U_(t,e,s,i,r)):(t=il(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Po,n(o,i)&&t.ref===e.ref)return Si(t,e,r)}return e.flags|=1,t=qi(s,i),t.ref=e.ref,t.return=e,e.child=t}function U_(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Po(s,i)&&t.ref===e.ref)if(rn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(rn=!0);else return e.lanes=t.lanes,Si(t,e,r)}return sd(t,e,n,i,r)}function F_(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},at(hs,mn),mn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,at(hs,mn),mn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,at(hs,mn),mn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,at(hs,mn),mn|=i;return Xt(t,e,r,n),e.child}function O_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function sd(t,e,n,i,r){var s=an(n)?br:jt.current;return s=bs(e,s),xs(e,r),n=Gh(t,e,n,i,s,r),i=jh(),t!==null&&!rn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Si(t,e,r)):(ht&&i&&Lh(e),e.flags|=1,Xt(t,e,n,r),e.child)}function wp(t,e,n,i,r){if(an(n)){var s=!0;Ml(e)}else s=!1;if(xs(e,r),e.stateNode===null)el(t,e),N_(e,n,i),id(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Ln(c):(c=an(n)?br:jt.current,c=bs(e,c));var d=n.getDerivedStateFromProps,f=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&vp(e,o,i,c),Ui=!1;var h=e.memoizedState;o.state=h,bl(e,i,o,r),l=e.memoizedState,a!==i||h!==l||on.current||Ui?(typeof d=="function"&&(nd(e,n,d,i),l=e.memoizedState),(a=Ui||_p(e,n,a,i,h,l,c))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,d_(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:kn(e.type,a),o.props=c,f=e.pendingProps,h=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Ln(l):(l=an(n)?br:jt.current,l=bs(e,l));var p=n.getDerivedStateFromProps;(d=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==f||h!==l)&&vp(e,o,i,l),Ui=!1,h=e.memoizedState,o.state=h,bl(e,i,o,r);var _=e.memoizedState;a!==f||h!==_||on.current||Ui?(typeof p=="function"&&(nd(e,n,p,i),_=e.memoizedState),(c=Ui||_p(e,n,c,i,h,_,l)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,_,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,_,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),o.props=i,o.state=_,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return od(t,e,n,i,s,r)}function od(t,e,n,i,r,s){O_(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&cp(e,n,!1),Si(t,e,s);i=e.stateNode,iy.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Rs(e,t.child,null,s),e.child=Rs(e,null,a,s)):Xt(t,e,a,s),e.memoizedState=i.state,r&&cp(e,n,!0),e.child}function k_(t){var e=t.stateNode;e.pendingContext?lp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&lp(t,e.context,!1),zh(t,e.containerInfo)}function Tp(t,e,n,i,r){return Cs(),Dh(r),e.flags|=256,Xt(t,e,n,i),e.child}var ad={dehydrated:null,treeContext:null,retryLane:0};function ld(t){return{baseLanes:t,cachePool:null,transitions:null}}function z_(t,e,n){var i=e.pendingProps,r=ft.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),at(ft,r&1),t===null)return ed(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=ic(o,i,0,null),t=Ar(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=ld(n),e.memoizedState=ad,t):$h(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return ry(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=qi(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=qi(a,s):(s=Ar(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?ld(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=ad,i}return s=t.child,t=s.sibling,i=qi(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function $h(t,e){return e=ic({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function pa(t,e,n,i){return i!==null&&Dh(i),Rs(e,t.child,null,n),t=$h(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function ry(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=zc(Error(ie(422))),pa(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=ic({mode:"visible",children:i.children},r,0,null),s=Ar(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Rs(e,t.child,null,o),e.child.memoizedState=ld(o),e.memoizedState=ad,s);if(!(e.mode&1))return pa(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ie(419)),i=zc(s,i,void 0),pa(t,e,o,i)}if(a=(o&t.childLanes)!==0,rn||a){if(i=It,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,yi(t,r),Wn(i,t,r,-1))}return Jh(),i=zc(Error(ie(421))),pa(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=_y.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,_n=Wi(r.nextSibling),vn=e,ht=!0,Bn=null,t!==null&&(wn[Tn++]=hi,wn[Tn++]=fi,wn[Tn++]=Cr,hi=t.id,fi=t.overflow,Cr=e),e=$h(e,i.children),e.flags|=4096,e)}function Ap(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),td(t.return,e,n)}function Bc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function B_(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Xt(t,e,i.children,n),i=ft.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Ap(t,n,e);else if(t.tag===19)Ap(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(at(ft,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Cl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Bc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Cl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Bc(e,!0,n,null,s);break;case"together":Bc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function el(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Si(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Pr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ie(153));if(e.child!==null){for(t=e.child,n=qi(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=qi(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function sy(t,e,n){switch(e.tag){case 3:k_(e),Cs();break;case 5:h_(e);break;case 1:an(e.type)&&Ml(e);break;case 4:zh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;at(Tl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(at(ft,ft.current&1),e.flags|=128,null):n&e.child.childLanes?z_(t,e,n):(at(ft,ft.current&1),t=Si(t,e,n),t!==null?t.sibling:null);at(ft,ft.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return B_(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),at(ft,ft.current),i)break;return null;case 22:case 23:return e.lanes=0,F_(t,e,n)}return Si(t,e,n)}var H_,cd,V_,G_;H_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};cd=function(){};V_=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Sr(ti.current);var s=null;switch(n){case"input":r=Lu(t,r),i=Lu(t,i),s=[];break;case"select":r=gt({},r,{value:void 0}),i=gt({},i,{value:void 0}),s=[];break;case"textarea":r=Iu(t,r),i=Iu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=yl)}Fu(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Eo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Eo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ct("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};G_=function(t,e,n,i){n!==i&&(e.flags|=4)};function Zs(t,e){if(!ht)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Bt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function oy(t,e,n){var i=e.pendingProps;switch(Nh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Bt(e),null;case 1:return an(e.type)&&Sl(),Bt(e),null;case 3:return i=e.stateNode,Ps(),dt(on),dt(jt),Hh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(ha(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Bn!==null&&(_d(Bn),Bn=null))),cd(t,e),Bt(e),null;case 5:Bh(e);var r=Sr(Uo.current);if(n=e.type,t!==null&&e.stateNode!=null)V_(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ie(166));return Bt(e),null}if(t=Sr(ti.current),ha(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Jn]=e,i[Do]=s,t=(e.mode&1)!==0,n){case"dialog":ct("cancel",i),ct("close",i);break;case"iframe":case"object":case"embed":ct("load",i);break;case"video":case"audio":for(r=0;r<ho.length;r++)ct(ho[r],i);break;case"source":ct("error",i);break;case"img":case"image":case"link":ct("error",i),ct("load",i);break;case"details":ct("toggle",i);break;case"input":Uf(i,s),ct("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ct("invalid",i);break;case"textarea":Of(i,s),ct("invalid",i)}Fu(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&da(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&da(i.textContent,a,t),r=["children",""+a]):Eo.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ct("scroll",i)}switch(n){case"input":ia(i),Ff(i,s,!0);break;case"textarea":ia(i),kf(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=yl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=_g(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[Jn]=e,t[Do]=i,H_(t,e,!1,!1),e.stateNode=t;e:{switch(o=Ou(n,i),n){case"dialog":ct("cancel",t),ct("close",t),r=i;break;case"iframe":case"object":case"embed":ct("load",t),r=i;break;case"video":case"audio":for(r=0;r<ho.length;r++)ct(ho[r],t);r=i;break;case"source":ct("error",t),r=i;break;case"img":case"image":case"link":ct("error",t),ct("load",t),r=i;break;case"details":ct("toggle",t),r=i;break;case"input":Uf(t,i),r=Lu(t,i),ct("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=gt({},i,{value:void 0}),ct("invalid",t);break;case"textarea":Of(t,i),r=Iu(t,i),ct("invalid",t);break;default:r=i}Fu(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?yg(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&vg(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&wo(t,l):typeof l=="number"&&wo(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Eo.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ct("scroll",t):l!=null&&_h(t,s,l,o))}switch(n){case"input":ia(t),Ff(t,i,!1);break;case"textarea":ia(t),kf(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Qi(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?ms(t,!!i.multiple,s,!1):i.defaultValue!=null&&ms(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=yl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Bt(e),null;case 6:if(t&&e.stateNode!=null)G_(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ie(166));if(n=Sr(Uo.current),Sr(ti.current),ha(e)){if(i=e.stateNode,n=e.memoizedProps,i[Jn]=e,(s=i.nodeValue!==n)&&(t=vn,t!==null))switch(t.tag){case 3:da(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&da(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Jn]=e,e.stateNode=i}return Bt(e),null;case 13:if(dt(ft),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ht&&_n!==null&&e.mode&1&&!(e.flags&128))a_(),Cs(),e.flags|=98560,s=!1;else if(s=ha(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ie(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ie(317));s[Jn]=e}else Cs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Bt(e),s=!1}else Bn!==null&&(_d(Bn),Bn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||ft.current&1?Rt===0&&(Rt=3):Jh())),e.updateQueue!==null&&(e.flags|=4),Bt(e),null);case 4:return Ps(),cd(t,e),t===null&&Lo(e.stateNode.containerInfo),Bt(e),null;case 10:return Fh(e.type._context),Bt(e),null;case 17:return an(e.type)&&Sl(),Bt(e),null;case 19:if(dt(ft),s=e.memoizedState,s===null)return Bt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Zs(s,!1);else{if(Rt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Cl(t),o!==null){for(e.flags|=128,Zs(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return at(ft,ft.current&1|2),e.child}t=t.sibling}s.tail!==null&&St()>Ns&&(e.flags|=128,i=!0,Zs(s,!1),e.lanes=4194304)}else{if(!i)if(t=Cl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Zs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ht)return Bt(e),null}else 2*St()-s.renderingStartTime>Ns&&n!==1073741824&&(e.flags|=128,i=!0,Zs(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=St(),e.sibling=null,n=ft.current,at(ft,i?n&1|2:n&1),e):(Bt(e),null);case 22:case 23:return Qh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?mn&1073741824&&(Bt(e),e.subtreeFlags&6&&(e.flags|=8192)):Bt(e),null;case 24:return null;case 25:return null}throw Error(ie(156,e.tag))}function ay(t,e){switch(Nh(e),e.tag){case 1:return an(e.type)&&Sl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ps(),dt(on),dt(jt),Hh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Bh(e),null;case 13:if(dt(ft),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ie(340));Cs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return dt(ft),null;case 4:return Ps(),null;case 10:return Fh(e.type._context),null;case 22:case 23:return Qh(),null;case 24:return null;default:return null}}var ma=!1,Gt=!1,ly=typeof WeakSet=="function"?WeakSet:Set,ve=null;function ds(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){xt(t,e,i)}else n.current=null}function ud(t,e,n){try{n()}catch(i){xt(t,e,i)}}var bp=!1;function cy(t,e){if($u=_l,t=Yg(),Ph(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,d=0,f=t,h=null;t:for(;;){for(var p;f!==n||r!==0&&f.nodeType!==3||(a=o+r),f!==s||i!==0&&f.nodeType!==3||(l=o+i),f.nodeType===3&&(o+=f.nodeValue.length),(p=f.firstChild)!==null;)h=f,f=p;for(;;){if(f===t)break t;if(h===n&&++c===r&&(a=o),h===s&&++d===i&&(l=o),(p=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Yu={focusedElem:t,selectionRange:n},_l=!1,ve=e;ve!==null;)if(e=ve,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,ve=t;else for(;ve!==null;){e=ve;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var y=_.memoizedProps,g=_.memoizedState,u=e.stateNode,x=u.getSnapshotBeforeUpdate(e.elementType===e.type?y:kn(e.type,y),g);u.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ie(163))}}catch(w){xt(e,e.return,w)}if(t=e.sibling,t!==null){t.return=e.return,ve=t;break}ve=e.return}return _=bp,bp=!1,_}function yo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&ud(e,n,s)}r=r.next}while(r!==i)}}function tc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function dd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function j_(t){var e=t.alternate;e!==null&&(t.alternate=null,j_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Jn],delete e[Do],delete e[Zu],delete e[Wx],delete e[Xx])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function W_(t){return t.tag===5||t.tag===3||t.tag===4}function Cp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||W_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function hd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=yl));else if(i!==4&&(t=t.child,t!==null))for(hd(t,e,n),t=t.sibling;t!==null;)hd(t,e,n),t=t.sibling}function fd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(fd(t,e,n),t=t.sibling;t!==null;)fd(t,e,n),t=t.sibling}var Ft=null,zn=!1;function bi(t,e,n){for(n=n.child;n!==null;)X_(t,e,n),n=n.sibling}function X_(t,e,n){if(ei&&typeof ei.onCommitFiberUnmount=="function")try{ei.onCommitFiberUnmount($l,n)}catch{}switch(n.tag){case 5:Gt||ds(n,e);case 6:var i=Ft,r=zn;Ft=null,bi(t,e,n),Ft=i,zn=r,Ft!==null&&(zn?(t=Ft,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ft.removeChild(n.stateNode));break;case 18:Ft!==null&&(zn?(t=Ft,n=n.stateNode,t.nodeType===8?Dc(t.parentNode,n):t.nodeType===1&&Dc(t,n),Co(t)):Dc(Ft,n.stateNode));break;case 4:i=Ft,r=zn,Ft=n.stateNode.containerInfo,zn=!0,bi(t,e,n),Ft=i,zn=r;break;case 0:case 11:case 14:case 15:if(!Gt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&ud(n,e,o),r=r.next}while(r!==i)}bi(t,e,n);break;case 1:if(!Gt&&(ds(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){xt(n,e,a)}bi(t,e,n);break;case 21:bi(t,e,n);break;case 22:n.mode&1?(Gt=(i=Gt)||n.memoizedState!==null,bi(t,e,n),Gt=i):bi(t,e,n);break;default:bi(t,e,n)}}function Rp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new ly),e.forEach(function(i){var r=vy.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function In(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Ft=a.stateNode,zn=!1;break e;case 3:Ft=a.stateNode.containerInfo,zn=!0;break e;case 4:Ft=a.stateNode.containerInfo,zn=!0;break e}a=a.return}if(Ft===null)throw Error(ie(160));X_(s,o,r),Ft=null,zn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){xt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)$_(e,t),e=e.sibling}function $_(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(In(e,t),qn(t),i&4){try{yo(3,t,t.return),tc(3,t)}catch(y){xt(t,t.return,y)}try{yo(5,t,t.return)}catch(y){xt(t,t.return,y)}}break;case 1:In(e,t),qn(t),i&512&&n!==null&&ds(n,n.return);break;case 5:if(In(e,t),qn(t),i&512&&n!==null&&ds(n,n.return),t.flags&32){var r=t.stateNode;try{wo(r,"")}catch(y){xt(t,t.return,y)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&mg(r,s),Ou(a,o);var c=Ou(a,s);for(o=0;o<l.length;o+=2){var d=l[o],f=l[o+1];d==="style"?yg(r,f):d==="dangerouslySetInnerHTML"?vg(r,f):d==="children"?wo(r,f):_h(r,d,f,c)}switch(a){case"input":Nu(r,s);break;case"textarea":gg(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?ms(r,!!s.multiple,p,!1):h!==!!s.multiple&&(s.defaultValue!=null?ms(r,!!s.multiple,s.defaultValue,!0):ms(r,!!s.multiple,s.multiple?[]:"",!1))}r[Do]=s}catch(y){xt(t,t.return,y)}}break;case 6:if(In(e,t),qn(t),i&4){if(t.stateNode===null)throw Error(ie(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(y){xt(t,t.return,y)}}break;case 3:if(In(e,t),qn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Co(e.containerInfo)}catch(y){xt(t,t.return,y)}break;case 4:In(e,t),qn(t);break;case 13:In(e,t),qn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Kh=St())),i&4&&Rp(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?(Gt=(c=Gt)||d,In(e,t),Gt=c):In(e,t),qn(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!d&&t.mode&1)for(ve=t,d=t.child;d!==null;){for(f=ve=d;ve!==null;){switch(h=ve,p=h.child,h.tag){case 0:case 11:case 14:case 15:yo(4,h,h.return);break;case 1:ds(h,h.return);var _=h.stateNode;if(typeof _.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(y){xt(i,n,y)}}break;case 5:ds(h,h.return);break;case 22:if(h.memoizedState!==null){Lp(f);continue}}p!==null?(p.return=h,ve=p):Lp(f)}d=d.sibling}e:for(d=null,f=t;;){if(f.tag===5){if(d===null){d=f;try{r=f.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=f.stateNode,l=f.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=xg("display",o))}catch(y){xt(t,t.return,y)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(y){xt(t,t.return,y)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:In(e,t),qn(t),i&4&&Rp(t);break;case 21:break;default:In(e,t),qn(t)}}function qn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(W_(n)){var i=n;break e}n=n.return}throw Error(ie(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(wo(r,""),i.flags&=-33);var s=Cp(t);fd(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Cp(t);hd(t,a,o);break;default:throw Error(ie(161))}}catch(l){xt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function uy(t,e,n){ve=t,Y_(t)}function Y_(t,e,n){for(var i=(t.mode&1)!==0;ve!==null;){var r=ve,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||ma;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Gt;a=ma;var c=Gt;if(ma=o,(Gt=l)&&!c)for(ve=r;ve!==null;)o=ve,l=o.child,o.tag===22&&o.memoizedState!==null?Np(r):l!==null?(l.return=o,ve=l):Np(r);for(;s!==null;)ve=s,Y_(s),s=s.sibling;ve=r,ma=a,Gt=c}Pp(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,ve=s):Pp(t)}}function Pp(t){for(;ve!==null;){var e=ve;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Gt||tc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Gt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:kn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&pp(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}pp(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&Co(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ie(163))}Gt||e.flags&512&&dd(e)}catch(h){xt(e,e.return,h)}}if(e===t){ve=null;break}if(n=e.sibling,n!==null){n.return=e.return,ve=n;break}ve=e.return}}function Lp(t){for(;ve!==null;){var e=ve;if(e===t){ve=null;break}var n=e.sibling;if(n!==null){n.return=e.return,ve=n;break}ve=e.return}}function Np(t){for(;ve!==null;){var e=ve;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{tc(4,e)}catch(l){xt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){xt(e,r,l)}}var s=e.return;try{dd(e)}catch(l){xt(e,s,l)}break;case 5:var o=e.return;try{dd(e)}catch(l){xt(e,o,l)}}}catch(l){xt(e,e.return,l)}if(e===t){ve=null;break}var a=e.sibling;if(a!==null){a.return=e.return,ve=a;break}ve=e.return}}var dy=Math.ceil,Ll=Ti.ReactCurrentDispatcher,Yh=Ti.ReactCurrentOwner,Rn=Ti.ReactCurrentBatchConfig,qe=0,It=null,Tt=null,Ot=0,mn=0,hs=ir(0),Rt=0,zo=null,Pr=0,nc=0,qh=0,So=null,nn=null,Kh=0,Ns=1/0,ci=null,Nl=!1,pd=null,$i=null,ga=!1,Hi=null,Dl=0,Mo=0,md=null,tl=-1,nl=0;function Yt(){return qe&6?St():tl!==-1?tl:tl=St()}function Yi(t){return t.mode&1?qe&2&&Ot!==0?Ot&-Ot:Yx.transition!==null?(nl===0&&(nl=Ng()),nl):(t=st,t!==0||(t=window.event,t=t===void 0?16:zg(t.type)),t):1}function Wn(t,e,n,i){if(50<Mo)throw Mo=0,md=null,Error(ie(185));Go(t,n,i),(!(qe&2)||t!==It)&&(t===It&&(!(qe&2)&&(nc|=n),Rt===4&&ki(t,Ot)),ln(t,i),n===1&&qe===0&&!(e.mode&1)&&(Ns=St()+500,Ql&&rr()))}function ln(t,e){var n=t.callbackNode;Y0(t,e);var i=gl(t,t===It?Ot:0);if(i===0)n!==null&&Hf(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Hf(n),e===1)t.tag===0?$x(Dp.bind(null,t)):r_(Dp.bind(null,t)),Gx(function(){!(qe&6)&&rr()}),n=null;else{switch(Dg(i)){case 1:n=Mh;break;case 4:n=Pg;break;case 16:n=ml;break;case 536870912:n=Lg;break;default:n=ml}n=nv(n,q_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function q_(t,e){if(tl=-1,nl=0,qe&6)throw Error(ie(327));var n=t.callbackNode;if(ys()&&t.callbackNode!==n)return null;var i=gl(t,t===It?Ot:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Il(t,i);else{e=i;var r=qe;qe|=2;var s=Z_();(It!==t||Ot!==e)&&(ci=null,Ns=St()+500,Tr(t,e));do try{py();break}catch(a){K_(t,a)}while(!0);Uh(),Ll.current=s,qe=r,Tt!==null?e=0:(It=null,Ot=0,e=Rt)}if(e!==0){if(e===2&&(r=Vu(t),r!==0&&(i=r,e=gd(t,r))),e===1)throw n=zo,Tr(t,0),ki(t,i),ln(t,St()),n;if(e===6)ki(t,i);else{if(r=t.current.alternate,!(i&30)&&!hy(r)&&(e=Il(t,i),e===2&&(s=Vu(t),s!==0&&(i=s,e=gd(t,s))),e===1))throw n=zo,Tr(t,0),ki(t,i),ln(t,St()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ie(345));case 2:pr(t,nn,ci);break;case 3:if(ki(t,i),(i&130023424)===i&&(e=Kh+500-St(),10<e)){if(gl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){Yt(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Ku(pr.bind(null,t,nn,ci),e);break}pr(t,nn,ci);break;case 4:if(ki(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-jn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=St()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*dy(i/1960))-i,10<i){t.timeoutHandle=Ku(pr.bind(null,t,nn,ci),i);break}pr(t,nn,ci);break;case 5:pr(t,nn,ci);break;default:throw Error(ie(329))}}}return ln(t,St()),t.callbackNode===n?q_.bind(null,t):null}function gd(t,e){var n=So;return t.current.memoizedState.isDehydrated&&(Tr(t,e).flags|=256),t=Il(t,e),t!==2&&(e=nn,nn=n,e!==null&&_d(e)),t}function _d(t){nn===null?nn=t:nn.push.apply(nn,t)}function hy(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!$n(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ki(t,e){for(e&=~qh,e&=~nc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-jn(e),i=1<<n;t[n]=-1,e&=~i}}function Dp(t){if(qe&6)throw Error(ie(327));ys();var e=gl(t,0);if(!(e&1))return ln(t,St()),null;var n=Il(t,e);if(t.tag!==0&&n===2){var i=Vu(t);i!==0&&(e=i,n=gd(t,i))}if(n===1)throw n=zo,Tr(t,0),ki(t,e),ln(t,St()),n;if(n===6)throw Error(ie(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,pr(t,nn,ci),ln(t,St()),null}function Zh(t,e){var n=qe;qe|=1;try{return t(e)}finally{qe=n,qe===0&&(Ns=St()+500,Ql&&rr())}}function Lr(t){Hi!==null&&Hi.tag===0&&!(qe&6)&&ys();var e=qe;qe|=1;var n=Rn.transition,i=st;try{if(Rn.transition=null,st=1,t)return t()}finally{st=i,Rn.transition=n,qe=e,!(qe&6)&&rr()}}function Qh(){mn=hs.current,dt(hs)}function Tr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Vx(n)),Tt!==null)for(n=Tt.return;n!==null;){var i=n;switch(Nh(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Sl();break;case 3:Ps(),dt(on),dt(jt),Hh();break;case 5:Bh(i);break;case 4:Ps();break;case 13:dt(ft);break;case 19:dt(ft);break;case 10:Fh(i.type._context);break;case 22:case 23:Qh()}n=n.return}if(It=t,Tt=t=qi(t.current,null),Ot=mn=e,Rt=0,zo=null,qh=nc=Pr=0,nn=So=null,yr!==null){for(e=0;e<yr.length;e++)if(n=yr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}yr=null}return t}function K_(t,e){do{var n=Tt;try{if(Uh(),Qa.current=Pl,Rl){for(var i=pt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Rl=!1}if(Rr=0,Dt=bt=pt=null,xo=!1,Fo=0,Yh.current=null,n===null||n.return===null){Rt=1,zo=e,Tt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Ot,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=a,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var h=d.alternate;h?(d.updateQueue=h.updateQueue,d.memoizedState=h.memoizedState,d.lanes=h.lanes):(d.updateQueue=null,d.memoizedState=null)}var p=yp(o);if(p!==null){p.flags&=-257,Sp(p,o,a,s,e),p.mode&1&&xp(s,c,e),e=p,l=c;var _=e.updateQueue;if(_===null){var y=new Set;y.add(l),e.updateQueue=y}else _.add(l);break e}else{if(!(e&1)){xp(s,c,e),Jh();break e}l=Error(ie(426))}}else if(ht&&a.mode&1){var g=yp(o);if(g!==null){!(g.flags&65536)&&(g.flags|=256),Sp(g,o,a,s,e),Dh(Ls(l,a));break e}}s=l=Ls(l,a),Rt!==4&&(Rt=2),So===null?So=[s]:So.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=D_(s,l,e);fp(s,u);break e;case 1:a=l;var x=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof x.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&($i===null||!$i.has(v)))){s.flags|=65536,e&=-e,s.lanes|=e;var w=I_(s,a,e);fp(s,w);break e}}s=s.return}while(s!==null)}J_(n)}catch(L){e=L,Tt===n&&n!==null&&(Tt=n=n.return);continue}break}while(!0)}function Z_(){var t=Ll.current;return Ll.current=Pl,t===null?Pl:t}function Jh(){(Rt===0||Rt===3||Rt===2)&&(Rt=4),It===null||!(Pr&268435455)&&!(nc&268435455)||ki(It,Ot)}function Il(t,e){var n=qe;qe|=2;var i=Z_();(It!==t||Ot!==e)&&(ci=null,Tr(t,e));do try{fy();break}catch(r){K_(t,r)}while(!0);if(Uh(),qe=n,Ll.current=i,Tt!==null)throw Error(ie(261));return It=null,Ot=0,Rt}function fy(){for(;Tt!==null;)Q_(Tt)}function py(){for(;Tt!==null&&!z0();)Q_(Tt)}function Q_(t){var e=tv(t.alternate,t,mn);t.memoizedProps=t.pendingProps,e===null?J_(t):Tt=e,Yh.current=null}function J_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=ay(n,e),n!==null){n.flags&=32767,Tt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Rt=6,Tt=null;return}}else if(n=oy(n,e,mn),n!==null){Tt=n;return}if(e=e.sibling,e!==null){Tt=e;return}Tt=e=t}while(e!==null);Rt===0&&(Rt=5)}function pr(t,e,n){var i=st,r=Rn.transition;try{Rn.transition=null,st=1,my(t,e,n,i)}finally{Rn.transition=r,st=i}return null}function my(t,e,n,i){do ys();while(Hi!==null);if(qe&6)throw Error(ie(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ie(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(q0(t,s),t===It&&(Tt=It=null,Ot=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ga||(ga=!0,nv(ml,function(){return ys(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Rn.transition,Rn.transition=null;var o=st;st=1;var a=qe;qe|=4,Yh.current=null,cy(t,n),$_(n,t),Ux(Yu),_l=!!$u,Yu=$u=null,t.current=n,uy(n),B0(),qe=a,st=o,Rn.transition=s}else t.current=n;if(ga&&(ga=!1,Hi=t,Dl=r),s=t.pendingLanes,s===0&&($i=null),G0(n.stateNode),ln(t,St()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Nl)throw Nl=!1,t=pd,pd=null,t;return Dl&1&&t.tag!==0&&ys(),s=t.pendingLanes,s&1?t===md?Mo++:(Mo=0,md=t):Mo=0,rr(),null}function ys(){if(Hi!==null){var t=Dg(Dl),e=Rn.transition,n=st;try{if(Rn.transition=null,st=16>t?16:t,Hi===null)var i=!1;else{if(t=Hi,Hi=null,Dl=0,qe&6)throw Error(ie(331));var r=qe;for(qe|=4,ve=t.current;ve!==null;){var s=ve,o=s.child;if(ve.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(ve=c;ve!==null;){var d=ve;switch(d.tag){case 0:case 11:case 15:yo(8,d,s)}var f=d.child;if(f!==null)f.return=d,ve=f;else for(;ve!==null;){d=ve;var h=d.sibling,p=d.return;if(j_(d),d===c){ve=null;break}if(h!==null){h.return=p,ve=h;break}ve=p}}}var _=s.alternate;if(_!==null){var y=_.child;if(y!==null){_.child=null;do{var g=y.sibling;y.sibling=null,y=g}while(y!==null)}}ve=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,ve=o;else e:for(;ve!==null;){if(s=ve,s.flags&2048)switch(s.tag){case 0:case 11:case 15:yo(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,ve=u;break e}ve=s.return}}var x=t.current;for(ve=x;ve!==null;){o=ve;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,ve=v;else e:for(o=x;ve!==null;){if(a=ve,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:tc(9,a)}}catch(L){xt(a,a.return,L)}if(a===o){ve=null;break e}var w=a.sibling;if(w!==null){w.return=a.return,ve=w;break e}ve=a.return}}if(qe=r,rr(),ei&&typeof ei.onPostCommitFiberRoot=="function")try{ei.onPostCommitFiberRoot($l,t)}catch{}i=!0}return i}finally{st=n,Rn.transition=e}}return!1}function Ip(t,e,n){e=Ls(n,e),e=D_(t,e,1),t=Xi(t,e,1),e=Yt(),t!==null&&(Go(t,1,e),ln(t,e))}function xt(t,e,n){if(t.tag===3)Ip(t,t,n);else for(;e!==null;){if(e.tag===3){Ip(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&($i===null||!$i.has(i))){t=Ls(n,t),t=I_(e,t,1),e=Xi(e,t,1),t=Yt(),e!==null&&(Go(e,1,t),ln(e,t));break}}e=e.return}}function gy(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=Yt(),t.pingedLanes|=t.suspendedLanes&n,It===t&&(Ot&n)===n&&(Rt===4||Rt===3&&(Ot&130023424)===Ot&&500>St()-Kh?Tr(t,0):qh|=n),ln(t,e)}function ev(t,e){e===0&&(t.mode&1?(e=oa,oa<<=1,!(oa&130023424)&&(oa=4194304)):e=1);var n=Yt();t=yi(t,e),t!==null&&(Go(t,e,n),ln(t,n))}function _y(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),ev(t,n)}function vy(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ie(314))}i!==null&&i.delete(e),ev(t,n)}var tv;tv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||on.current)rn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return rn=!1,sy(t,e,n);rn=!!(t.flags&131072)}else rn=!1,ht&&e.flags&1048576&&s_(e,wl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;el(t,e),t=e.pendingProps;var r=bs(e,jt.current);xs(e,n),r=Gh(null,e,i,t,r,n);var s=jh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,an(i)?(s=!0,Ml(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,kh(e),r.updater=ec,e.stateNode=r,r._reactInternals=e,id(e,i,t,n),e=od(null,e,i,!0,s,n)):(e.tag=0,ht&&s&&Lh(e),Xt(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(el(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=yy(i),t=kn(i,t),r){case 0:e=sd(null,e,i,t,n);break e;case 1:e=wp(null,e,i,t,n);break e;case 11:e=Mp(null,e,i,t,n);break e;case 14:e=Ep(null,e,i,kn(i.type,t),n);break e}throw Error(ie(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:kn(i,r),sd(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:kn(i,r),wp(t,e,i,r,n);case 3:e:{if(k_(e),t===null)throw Error(ie(387));i=e.pendingProps,s=e.memoizedState,r=s.element,d_(t,e),bl(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Ls(Error(ie(423)),e),e=Tp(t,e,i,n,r);break e}else if(i!==r){r=Ls(Error(ie(424)),e),e=Tp(t,e,i,n,r);break e}else for(_n=Wi(e.stateNode.containerInfo.firstChild),vn=e,ht=!0,Bn=null,n=c_(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Cs(),i===r){e=Si(t,e,n);break e}Xt(t,e,i,n)}e=e.child}return e;case 5:return h_(e),t===null&&ed(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,qu(i,r)?o=null:s!==null&&qu(i,s)&&(e.flags|=32),O_(t,e),Xt(t,e,o,n),e.child;case 6:return t===null&&ed(e),null;case 13:return z_(t,e,n);case 4:return zh(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Rs(e,null,i,n):Xt(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:kn(i,r),Mp(t,e,i,r,n);case 7:return Xt(t,e,e.pendingProps,n),e.child;case 8:return Xt(t,e,e.pendingProps.children,n),e.child;case 12:return Xt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,at(Tl,i._currentValue),i._currentValue=o,s!==null)if($n(s.value,o)){if(s.children===r.children&&!on.current){e=Si(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=_i(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),td(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ie(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),td(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Xt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,xs(e,n),r=Ln(r),i=i(r),e.flags|=1,Xt(t,e,i,n),e.child;case 14:return i=e.type,r=kn(i,e.pendingProps),r=kn(i.type,r),Ep(t,e,i,r,n);case 15:return U_(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:kn(i,r),el(t,e),e.tag=1,an(i)?(t=!0,Ml(e)):t=!1,xs(e,n),N_(e,i,r),id(e,i,r,n),od(null,e,i,!0,t,n);case 19:return B_(t,e,n);case 22:return F_(t,e,n)}throw Error(ie(156,e.tag))};function nv(t,e){return Rg(t,e)}function xy(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function bn(t,e,n,i){return new xy(t,e,n,i)}function ef(t){return t=t.prototype,!(!t||!t.isReactComponent)}function yy(t){if(typeof t=="function")return ef(t)?1:0;if(t!=null){if(t=t.$$typeof,t===xh)return 11;if(t===yh)return 14}return 2}function qi(t,e){var n=t.alternate;return n===null?(n=bn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function il(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")ef(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ns:return Ar(n.children,r,s,e);case vh:o=8,r|=8;break;case bu:return t=bn(12,n,e,r|2),t.elementType=bu,t.lanes=s,t;case Cu:return t=bn(13,n,e,r),t.elementType=Cu,t.lanes=s,t;case Ru:return t=bn(19,n,e,r),t.elementType=Ru,t.lanes=s,t;case hg:return ic(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case ug:o=10;break e;case dg:o=9;break e;case xh:o=11;break e;case yh:o=14;break e;case Ii:o=16,i=null;break e}throw Error(ie(130,t==null?t:typeof t,""))}return e=bn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Ar(t,e,n,i){return t=bn(7,t,i,e),t.lanes=n,t}function ic(t,e,n,i){return t=bn(22,t,i,e),t.elementType=hg,t.lanes=n,t.stateNode={isHidden:!1},t}function Hc(t,e,n){return t=bn(6,t,null,e),t.lanes=n,t}function Vc(t,e,n){return e=bn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Sy(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Mc(0),this.expirationTimes=Mc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Mc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function tf(t,e,n,i,r,s,o,a,l){return t=new Sy(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=bn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},kh(s),t}function My(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ts,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function iv(t){if(!t)return Ji;t=t._reactInternals;e:{if(Or(t)!==t||t.tag!==1)throw Error(ie(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(an(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ie(171))}if(t.tag===1){var n=t.type;if(an(n))return i_(t,n,e)}return e}function rv(t,e,n,i,r,s,o,a,l){return t=tf(n,i,!0,t,r,s,o,a,l),t.context=iv(null),n=t.current,i=Yt(),r=Yi(n),s=_i(i,r),s.callback=e??null,Xi(n,s,r),t.current.lanes=r,Go(t,r,i),ln(t,i),t}function rc(t,e,n,i){var r=e.current,s=Yt(),o=Yi(r);return n=iv(n),e.context===null?e.context=n:e.pendingContext=n,e=_i(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Xi(r,e,o),t!==null&&(Wn(t,r,o,s),Za(t,r,o)),o}function Ul(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Up(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function nf(t,e){Up(t,e),(t=t.alternate)&&Up(t,e)}function Ey(){return null}var sv=typeof reportError=="function"?reportError:function(t){console.error(t)};function rf(t){this._internalRoot=t}sc.prototype.render=rf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ie(409));rc(t,e,null,null)};sc.prototype.unmount=rf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Lr(function(){rc(null,t,null,null)}),e[xi]=null}};function sc(t){this._internalRoot=t}sc.prototype.unstable_scheduleHydration=function(t){if(t){var e=Fg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Oi.length&&e!==0&&e<Oi[n].priority;n++);Oi.splice(n,0,t),n===0&&kg(t)}};function sf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function oc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Fp(){}function wy(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Ul(o);s.call(c)}}var o=rv(e,i,t,0,null,!1,!1,"",Fp);return t._reactRootContainer=o,t[xi]=o.current,Lo(t.nodeType===8?t.parentNode:t),Lr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Ul(l);a.call(c)}}var l=tf(t,0,!1,null,null,!1,!1,"",Fp);return t._reactRootContainer=l,t[xi]=l.current,Lo(t.nodeType===8?t.parentNode:t),Lr(function(){rc(e,l,n,i)}),l}function ac(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Ul(o);a.call(l)}}rc(e,o,t,r)}else o=wy(n,e,t,r,i);return Ul(o)}Ig=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=uo(e.pendingLanes);n!==0&&(Eh(e,n|1),ln(e,St()),!(qe&6)&&(Ns=St()+500,rr()))}break;case 13:Lr(function(){var i=yi(t,1);if(i!==null){var r=Yt();Wn(i,t,1,r)}}),nf(t,1)}};wh=function(t){if(t.tag===13){var e=yi(t,134217728);if(e!==null){var n=Yt();Wn(e,t,134217728,n)}nf(t,134217728)}};Ug=function(t){if(t.tag===13){var e=Yi(t),n=yi(t,e);if(n!==null){var i=Yt();Wn(n,t,e,i)}nf(t,e)}};Fg=function(){return st};Og=function(t,e){var n=st;try{return st=t,e()}finally{st=n}};zu=function(t,e,n){switch(e){case"input":if(Nu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Zl(i);if(!r)throw Error(ie(90));pg(i),Nu(i,r)}}}break;case"textarea":gg(t,n);break;case"select":e=n.value,e!=null&&ms(t,!!n.multiple,e,!1)}};Eg=Zh;wg=Lr;var Ty={usingClientEntryPoint:!1,Events:[Wo,os,Zl,Sg,Mg,Zh]},Qs={findFiberByHostInstance:xr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ay={bundleType:Qs.bundleType,version:Qs.version,rendererPackageName:Qs.rendererPackageName,rendererConfig:Qs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ti.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=bg(t),t===null?null:t.stateNode},findFiberByHostInstance:Qs.findFiberByHostInstance||Ey,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var _a=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!_a.isDisabled&&_a.supportsFiber)try{$l=_a.inject(Ay),ei=_a}catch{}}yn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ty;yn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!sf(e))throw Error(ie(200));return My(t,e,null,n)};yn.createRoot=function(t,e){if(!sf(t))throw Error(ie(299));var n=!1,i="",r=sv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=tf(t,1,!1,null,null,n,!1,i,r),t[xi]=e.current,Lo(t.nodeType===8?t.parentNode:t),new rf(e)};yn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ie(188)):(t=Object.keys(t).join(","),Error(ie(268,t)));return t=bg(e),t=t===null?null:t.stateNode,t};yn.flushSync=function(t){return Lr(t)};yn.hydrate=function(t,e,n){if(!oc(e))throw Error(ie(200));return ac(null,t,e,!0,n)};yn.hydrateRoot=function(t,e,n){if(!sf(t))throw Error(ie(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=sv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=rv(e,null,t,1,n??null,r,!1,s,o),t[xi]=e.current,Lo(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new sc(e)};yn.render=function(t,e,n){if(!oc(e))throw Error(ie(200));return ac(null,t,e,!1,n)};yn.unmountComponentAtNode=function(t){if(!oc(t))throw Error(ie(40));return t._reactRootContainer?(Lr(function(){ac(null,null,t,!1,function(){t._reactRootContainer=null,t[xi]=null})}),!0):!1};yn.unstable_batchedUpdates=Zh;yn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!oc(n))throw Error(ie(200));if(t==null||t._reactInternals===void 0)throw Error(ie(38));return ac(t,e,n,!1,i)};yn.version="18.3.1-next-f1338f8080-20240426";function ov(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ov)}catch(t){console.error(t)}}ov(),og.exports=yn;var by=og.exports,av,Op=by;av=Op.createRoot,Op.hydrateRoot;const Cy=(()=>{const t=new Float32Array(65536);for(let e=0;e<65536;e++){const n=e&32768?-1:1,i=e>>10&31,r=e&1023;i===0?t[e]=n*2**-14*(r/1024):i===31?t[e]=r?NaN:n*(1/0):t[e]=n*2**(i-15)*(1+r/1024)}return t})();function Ry(t){const e=new Float32Array(t.length);for(let n=0;n<t.length;n++)e[n]=Cy[t[n]];return e}function Py(t,e){const n=new Map,i={};for(const[r,s]of Object.entries(t.arrays))i[r]=s.shape;return{meta:t.meta,shapes:i,get(r){const s=n.get(r);if(s)return s;const o=t.arrays[r];if(!o)throw new Error(`pack has no array "${r}"`);let a;switch(o.dtype){case"f32":a=new Float32Array(e,o.offset,o.bytes/4);break;case"f16":a=Ry(new Uint16Array(e,o.offset,o.bytes/2));break;case"i8":a=new Int8Array(e,o.offset,o.bytes);break;case"u8":a=new Uint8Array(e,o.offset,o.bytes);break;case"i16":a=new Int16Array(e,o.offset,o.bytes/2);break;case"u16":a=new Uint16Array(e,o.offset,o.bytes/2);break;case"i32":a=new Int32Array(e,o.offset,o.bytes/4);break;case"u32":a=new Uint32Array(e,o.offset,o.bytes/4);break}return n.set(r,a),a}}}async function vd(t,e,n){const i=e.split("/").pop(),r=await t(`${e}.json`);if(!r.ok)throw new Error(`${i}.json: HTTP ${r.status}`);let s;try{s=await r.json()}catch{throw new Error(`${i}.json is not valid JSON`)}if(!s||typeof s!="object"||!s.arrays)throw new Error(`${i}.json is not a pack manifest`);const o=await t(`${e}.bin`);if(!o.ok)throw new Error(`${i}.bin: HTTP ${o.status}`);const a=await Dy(o,n);return Ny(i??e,s.arrays,a.byteLength),Py(s,a)}const Ly={f32:4,f16:2,i8:1,u8:1,i16:2,u16:2,i32:4,u32:4};function Ny(t,e,n){for(const[i,r]of Object.entries(e)){const s=Ly[r.dtype];if(!s)throw new Error(`${t}: array "${i}" has unknown dtype ${r.dtype}`);const o=r.shape.reduce((a,l)=>a*l,1);if(r.bytes!==o*s)throw new Error(`${t}: array "${i}" size does not match its shape`);if(r.offset%s!==0)throw new Error(`${t}: array "${i}" is misaligned`);if(r.offset+r.bytes>n)throw new Error(`${t}.bin is incomplete (${n.toLocaleString()} bytes); try reloading`)}}async function Dy(t,e){const n=Number(t.headers.get("content-length")??0);if(!t.body||!e)return t.arrayBuffer();const i=t.body.getReader(),r=[];let s=0;for(;;){const{done:l,value:c}=await i.read();if(l)break;r.push(c),s+=c.length,e(s,n)}const o=new Uint8Array(s);let a=0;for(const l of r)o.set(l,a),a+=l.length;return o.buffer}async function lv(t){const e=await fetch(t),n=t.split("/").pop();if(!e.ok)throw new Error(`${n}: HTTP ${e.status}`);try{return await e.json()}catch{throw new Error(`${n} is not valid JSON`)}}const Iy=new RegExp("'s|'t|'re|'ve|'m|'ll|'d| ?\\p{L}+| ?\\p{N}+| ?[^\\s\\p{L}\\p{N}]+|\\s+(?!\\S)|\\s+","gu");function Uy(){const t=[];for(let r=33;r<=126;r++)t.push(r);for(let r=161;r<=172;r++)t.push(r);for(let r=174;r<=255;r++)t.push(r);const e=t.slice();let n=0;for(let r=0;r<256;r++)t.includes(r)||(t.push(r),e.push(256+n++));const i=new Array(256);return t.forEach((r,s)=>i[r]=String.fromCharCode(e[s])),i}class Fy{constructor(e){Ue(this,"tokens");Ue(this,"eos");Ue(this,"freq");Ue(this,"ids",new Map);Ue(this,"ranks",new Map);Ue(this,"byteEnc",Uy());Ue(this,"byteDec",new Map);Ue(this,"cache",new Map);Ue(this,"display");this.tokens=e.tokens,this.eos=e.eos,this.freq=e.freq,e.tokens.forEach((n,i)=>this.ids.set(n,i)),e.merges.forEach((n,i)=>this.ranks.set(n,i)),this.byteEnc.forEach((n,i)=>this.byteDec.set(n,i)),this.display=e.tokens.map((n,i)=>this.decode([i]))}get size(){return this.tokens.length}encode(e){const n=[],i=new TextEncoder;for(const r of e.matchAll(Iy)){const s=Array.from(i.encode(r[0]),o=>this.byteEnc[o]).join("");for(const o of this.bpe(s)){const a=this.ids.get(o);if(a!==void 0)n.push(a);else for(const l of o)n.push(this.ids.get(l))}}return n}bpe(e){const n=this.cache.get(e);if(n)return n.map(s=>this.tokens[s]);let i=Array.from(e);for(;i.length>1;){let s=-1,o=1/0;for(let d=0;d<i.length-1;d++){const f=this.ranks.get(i[d]+" "+i[d+1]);f!==void 0&&f<o&&(o=f,s=d)}if(s<0)break;const a=i[s],l=i[s+1],c=[];for(let d=0;d<i.length;d++)d<i.length-1&&i[d]===a&&i[d+1]===l?(c.push(a+l),d++):c.push(i[d]);i=c}const r=i.map(s=>this.ids.get(s));return r.every(s=>s!==void 0)&&this.cache.set(e,r),i}decode(e){const n=[];for(const i of e){const r=this.tokens[i];if(r!==void 0){if(r==="<|endoftext|>"){for(const s of new TextEncoder().encode(`

`))n.push(s);continue}for(const s of r){const o=this.byteDec.get(s);o!==void 0&&n.push(o)}}}return new TextDecoder("utf-8",{fatal:!1}).decode(new Uint8Array(n))}str(e){return this.display[e]??"?"}}const Ds=t=>`L${t.layer}·N${t.neuron}`;class of{constructor(e,n,i){Ue(this,"meta");Ue(this,"tok");Ue(this,"L");Ue(this,"N");Ue(this,"max");Ue(this,"mean");Ue(this,"density");Ue(this,"share");Ue(this,"layout");Ue(this,"hist");Ue(this,"lensIds");Ue(this,"lensVal");Ue(this,"upIds");Ue(this,"upW");Ue(this,"dnIds");Ue(this,"dnW");Ue(this,"exStory");Ue(this,"exPos");Ue(this,"exAct");Ue(this,"exWin");Ue(this,"ctoks");Ue(this,"coffs");Ue(this,"labels",[]);Ue(this,"modalTok");this.meta=e.meta,this.tok=i,this.L=e.meta.layers,this.N=e.meta.neurons,this.max=e.get("max"),this.mean=e.get("mean"),this.density=e.get("density"),this.share=e.get("share"),this.layout=e.get("layout"),this.hist=e.get("hist"),this.lensIds=e.get("lens_ids"),this.lensVal=e.get("lens_val"),this.upIds=e.get("up_ids"),this.upW=e.get("up_w"),this.dnIds=e.get("dn_ids"),this.dnW=e.get("dn_w"),this.exStory=e.get("ex_story"),this.exPos=e.get("ex_pos"),this.exAct=e.get("ex_act"),this.exWin=e.get("ex_win"),this.ctoks=n.get("tokens"),this.coffs=n.get("offsets"),this.modalTok=new Uint16Array(this.L*this.N);for(let r=0;r<this.L*this.N;r++)this.labels.push(this.makeLabel(r))}static async load(e,n){const i=await lv(`${e}/tokenizer.json`),r=new Fy(i),s=l=>fetch(l),[o,a]=await Promise.all([vd(s,`${e}/atlas`,(l,c)=>n==null?void 0:n(c?l/c:0)),vd(s,`${e}/corpus`)]);return new of(o,a,r)}g(e){return e.layer*this.N+e.neuron}ref(e){return{layer:Math.floor(e/this.N),neuron:e%this.N}}lens(e){const n=this.meta.lens_k,i=this.g(e)*2*n,r=s=>Array.from({length:n},(o,a)=>({id:this.lensIds[i+s*n+a],v:this.lensVal[i+s*n+a]}));return{promotes:r(0),suppresses:r(1)}}histogram(e){const n=this.meta.hist_bins;return Array.from(this.hist.subarray(this.g(e)*n,(this.g(e)+1)*n))}links(e,n){const i=this.meta.conn_k,r=n==="up"?this.upIds:this.dnIds,s=n==="up"?this.upW:this.dnW;if(n==="up"&&e.layer===0||n==="down"&&e.layer===this.L-1)return[];const o=this.g(e)*i;return Array.from({length:i},(a,l)=>({...this.ref(r[o+l]),w:s[o+l]}))}examples(e,n=this.meta.topk){const{topk:i,w_before:r,w_after:s}=this.meta,o=r+1+s,a=this.g(e),l=[];for(let c=0;c<Math.min(n,i);c++){const d=a*i+c,f=this.exStory[d],h=this.exPos[d],p=this.coffs[f],_=this.coffs[f+1],y=[],g=[];for(let u=0;u<o;u++){const x=h-r+u,v=x>=0&&p+x<_;y.push(v?this.ctoks[p+x]:-1);const w=this.exWin[d*o+u];g.push(w===-128?NaN:w/127)}l.push({story:f,pos:h,act:this.exAct[d],tokens:y,acts:g,center:r})}return l}peakTokens(e){const n=this.meta.topk,i=this.g(e),r=[];for(let s=0;s<n;s++){const o=this.exStory[i*n+s];r.push(this.ctoks[this.coffs[o]+this.exPos[i*n+s]])}return r}makeLabel(e){const n=new Map;for(const s of this.peakTokens(this.ref(e)))n.set(s,(n.get(s)??0)+1);const i=[...n.entries()].sort((s,o)=>o[1]-s[1]);return this.modalTok[e]=i[0][0],i.slice(0,i[0][1]>=8?1:3).map(([s])=>this.tok.str(s).trim()||"␣").join(" / ")}label(e){return this.labels[this.g(e)]}story(e){return Array.from(this.ctoks.subarray(this.coffs[e],this.coffs[e+1]))}search(e,n,i=200){const r=e.trim().toLowerCase();if(!r)return[];const s=l=>this.tok.str(l).trim().toLowerCase()===r,o=[],a=this.meta.lens_k;for(let l=0;l<this.L*this.N;l++){let c=0;if(n==="lens"){for(let d=0;d<2*a;d++)s(this.lensIds[l*2*a+d])&&(c=Math.max(c,Math.abs(this.lensVal[l*2*a+d])*(d<a?1:-1)));c!==0&&o.push({...this.ref(l),score:c})}else{const d=this.peakTokens(this.ref(l));c=d.filter(s).length/d.length,c>0&&o.push({...this.ref(l),score:c})}}return o.sort((l,c)=>Math.abs(c.score)-Math.abs(l.score)).slice(0,i)}dead(e){return this.max[this.g(e)]<.25}ranked(e,n=300){const i=[],r=Math.log(Math.max(...this.tok.freq)+1);for(let s=0;s<this.L*this.N;s++){const o=this.ref(s);if(e!==null&&o.layer!==e||this.dead(o))continue;const a=this.modalTok[s],l=this.tok.str(a).trim(),c=new RegExp("\\p{L}{3,}","u").test(l)?1:.3,d=Math.max(.1,1-Math.log(this.tok.freq[a]+1)/r);i.push({g:s,s:this.share[s]*d*c*(1-Math.min(this.density[s],.9))})}return i.sort((s,o)=>o.s-s.s).slice(0,n).map(s=>this.ref(s.g))}}class Oy{constructor(){Ue(this,"worker",null);Ue(this,"next",1);Ue(this,"pending",new Map);Ue(this,"base","");Ue(this,"ready",null);Ue(this,"meta",null);Ue(this,"onCrash",null)}spawn(){const e=new Worker(new URL(""+new URL("worker-Cm2Be5Vq.js",import.meta.url).href,import.meta.url),{type:"module"});e.onmessage=i=>{var o;const r=i.data,s=this.pending.get(r.id);s&&(r.kind==="error"?(this.pending.delete(r.id),s.reject(new Error(r.message))):r.kind==="progress"||r.kind==="token"?(o=s.onEvent)==null||o.call(s,r):(this.pending.delete(r.id),s.resolve(r)))};const n=i=>{var r;for(const s of this.pending.values())s.reject(new Error(i));this.pending.clear(),e.terminate(),this.worker===e&&(this.worker=null,this.ready=null),(r=this.onCrash)==null||r.call(this,i)};return e.onerror=i=>{i.preventDefault(),n(`The model worker stopped: ${i.message||"unknown error"}`)},e.onmessageerror=()=>n("The model worker sent a message that could not be read."),this.worker=e,e}call(e,n,i=this.worker??this.spawn()){const r=this.next++,s=new Promise((o,a)=>this.pending.set(r,{resolve:o,reject:a,onEvent:n}));return i.postMessage({...e,id:r}),{id:r,done:s}}init(e,n){this.base=e;const i=this.worker??this.spawn();return this.ready=this.call({kind:"init",base:e},r=>{r.kind==="progress"&&n(r.loaded,r.total)},i).done.then(r=>{if(r.kind!=="ready")throw new Error("unexpected reply while loading the model");return this.meta=r.meta,r.meta}),this.ready}async ensure(){if(this.ready)await this.ready;else{if(!this.base)throw new Error("model not initialised");await this.init(this.base,()=>{})}}async analyze(e,n,i=128){return await this.ensure(),await this.call({kind:"analyze",text:e,edits:n,maxTokens:i}).done}generate(e,n){let i=-1,r=!1;const s=this.ensure().then(()=>{if(r)return{kind:"done",id:-1,promptTokens:[]};const o=this.call({kind:"generate",...e},a=>{a.kind==="token"&&n(a.variant,a.token)});return i=o.id,o.done});return{cancel:()=>{var o;r=!0,i>=0&&((o=this.worker)==null||o.postMessage({kind:"cancel",id:i}))},done:s}}}const Js=(t,e=2e3)=>typeof t=="string"?t.slice(0,e):"",kp=t=>typeof t=="number"&&Number.isFinite(t)?t:NaN,ky=new Set(["concept","style","suppressor","control","reads-writes"]);function zy(t,e){const n=t&&typeof t=="object"?t:{},i=(Array.isArray(n.cards)?n.cards:[]).filter(o=>!!o&&typeof o=="object"&&/^[a-z0-9-]{1,64}$/.test(String(o.id))&&Number.isInteger(o.layer)&&Number.isInteger(o.neuron)&&o.layer>=0&&o.layer<e.layers&&o.neuron>=0&&o.neuron<e.neurons&&ky.has(o.kind)&&typeof o.prompt=="string"&&Number.isFinite(o.dose)).map(o=>({...o,title:Js(o.title,120),summary:Js(o.summary),baseline:Js(o.baseline),steered:Js(o.steered),z:kp(o.z),pct:kp(o.pct),rank:Number.isInteger(o.rank)?o.rank:0,themes:Array.isArray(o.themes)?o.themes.filter(a=>typeof a=="string").slice(0,8):[]})),r=n.headline??{},s=o=>typeof o=="number"&&Number.isFinite(o)&&o>=0?o:0;return{generated:Js(n.generated,40),headline:{neurons_above_null:s(r.neurons_above_null),neurons:s(r.neurons),controls_naive_theme:s(r.controls_naive_theme),controls:s(r.controls),neurons_naive_theme:s(r.neurons_naive_theme)},layers:Array.isArray(n.layers)&&n.layers.length===e.layers?n.layers:[],cards:i,reference:(Array.isArray(n.reference)?n.reference:[]).filter(o=>o&&typeof o.id=="string"&&/^https:\/\//.test(String(o.source))),notes:(Array.isArray(n.notes)?n.notes:[]).filter(o=>o&&typeof o.title=="string"&&typeof o.body=="string")}}class af{constructor(e,n){Ue(this,"meta");Ue(this,"p");Ue(this,"findings");Ue(this,"cofire");Ue(this,"colNorm");this.p=e,this.meta=e.meta;const i=e.meta;if(!i||!Number.isInteger(i.layers)||!Number.isInteger(i.neurons)||!Array.isArray(i.prompts)||!Array.isArray(i.window)||i.window.length!==i.layers)throw new Error("sweep.json has an unexpected format");const r=i.layers*i.neurons,s=[["n_z",r],["n_pct",r],["col_norm",r],["cofire_layout",r*2],["n_theme",r*5],["sl_kl",r*2]];for(const[o,a]of s){const l=e.shapes[o];if(!l||l.reduce((c,d)=>c*d,1)!==a)throw new Error(`sweep pack: array "${o}" is missing or the wrong size`)}this.findings=zy(n,i),this.cofire=e.get("cofire_layout"),this.colNorm=e.get("col_norm")}static async load(e){const n=s=>fetch(s),[i,r]=await Promise.all([vd(n,`${e}/sweep`),lv(`${e}/findings.json`)]);return new af(i,r)}g(e){return e.layer*this.meta.neurons+e.neuron}doseEdit(e,n){const i=this.meta.resid_norm[e.layer]/Math.max(this.colNorm[this.g(e)],1e-6);return{layer:e.layer,neuron:e.neuron,mode:"add",value:n,maxAct:i,unit:"resid",enabled:!0}}window(e){return this.meta.window[e]}themes(e,n){const i=[];for(let r=0;r<5;r++){const s=e[n*5+r];s!==65535&&this.meta.words[s]&&i.push(this.meta.words[s])}return i}stats(e){const n=this.g(e);return{z:this.p.get("n_z")[n],pct:this.p.get("n_pct")[n],coherence:this.p.get("n_coh")[n],consistency:this.p.get("n_cons")[n],rw:this.p.get("n_rw")[n],themes:this.themes(this.p.get("n_theme"),n)}}controlStats(e,n){const i=e*this.meta.n_ctrl+n;return{z:this.p.get("c_z")[i],pct:NaN,coherence:this.p.get("c_coh")[i],consistency:this.p.get("c_cons")[i],rw:NaN,themes:this.themes(this.p.get("c_theme"),i)}}layerScatter(e){const n=this.meta.neurons,i=this.meta.n_ctrl;return{nz:this.p.get("n_z").subarray(e*n,(e+1)*n),ncoh:this.p.get("n_coh").subarray(e*n,(e+1)*n),cz:this.p.get("c_z").subarray(e*i,(e+1)*i),ccoh:this.p.get("c_coh").subarray(e*i,(e+1)*i)}}rollIds(e,n,i){const{neurons:r,n_ctrl:s,cells:o,gen:a}=this.meta,l=r+s,c=this.p.get("roll"),d=((e*l+n)*o.length+i)*a,f=[];for(let h=0;h<a;h++){const p=c[d+h];if(p===65535)break;f.push(p)}return f}rollouts(e,n=!1){const i=n?this.meta.neurons+e.neuron:e.neuron;return this.meta.cells.map(([r,s],o)=>({prompt:this.meta.prompts[r],dose:s*this.meta.window[e.layer],ids:this.rollIds(e.layer,i,o)}))}baseline(e){const n=this.meta.gen,i=this.p.get("base"),r=[];for(let s=0;s<n;s++){const o=i[e*n+s];if(o===65535)break;r.push(o)}return r}steerLens(e){const n=this.g(e),i=(s,o)=>{const a=this.p.get(s),l=this.p.get(o);return Array.from({length:12},(c,d)=>({id:a[n*12+d],v:l[n*12+d]})).filter(c=>c.id!==65535)},r=this.p.get("sl_kl");return{up:i("sl_up_ids","sl_up_val"),down:i("sl_dn_ids","sl_dn_val"),klUp:r[n*2],klDown:r[n*2+1]}}ranked(e,n=300){const i=this.meta.neurons,r=this.p.get("n_z"),s=[];for(let o=0;o<r.length;o++){const a=Math.floor(o/i);e!==null&&a!==e||s.push({layer:a,neuron:o%i,z:r[o]})}return s.sort((o,a)=>a.z-o.z).slice(0,n)}rankOf(e){const n=this.p.get("n_z"),i=n[this.g(e)];let r=1;for(let s=0;s<n.length;s++)n[s]>i&&r++;return r}zArray(){return this.p.get("n_z")}}const By=["profile","contexts","steer"];function Hy(t,e){var f,h;const[n,i=""]=t.replace(/^#\/?/,"").split("?"),r=n.split("/").filter(Boolean),o=new URLSearchParams(i).get("tab"),a=o&&By.includes(o)?o:null,l=r[0]==="findings"?"findings":r[0]==="method"?"method":"atlas";let c=null;if(l==="atlas"&&r.length>=3){const p=Number((f=/^L(\d+)$/i.exec(r[1]))==null?void 0:f[1]),_=Number((h=/^N(\d+)$/i.exec(r[2]))==null?void 0:h[1]);Number.isInteger(p)&&Number.isInteger(_)&&p>=0&&p<e.layers&&_>=0&&_<e.neurons&&(c={layer:p,neuron:_})}const d=l==="findings"&&r[1]?decodeURIComponent(r[1]):null;return{view:l,focus:c,tab:a,card:d}}function Fl(t){if(t.view==="findings")return t.card?`#/findings/${encodeURIComponent(t.card)}`:"#/findings";if(t.view==="method")return"#/method";if(!t.focus)return"#/atlas";const e=t.tab&&t.tab!=="profile"?`?tab=${t.tab}`:"";return`#/atlas/L${t.focus.layer}/N${t.focus.neuron}${e}`}const cv="neuron-atlas:names",uv="neuron-atlas:edits:v2";function zp(t,e){try{const n=localStorage.getItem(t);return n?JSON.parse(n):e}catch{return e}}function Bp(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}}const Hp=t=>typeof t=="number"&&Number.isFinite(t);function Vy(t,e=8,n=1024){if(!Array.isArray(t))return[];const i=[],r=new Set;for(const s of t){if(!s||typeof s!="object")continue;const o=s;if(!Number.isInteger(o.layer)||!Number.isInteger(o.neuron))continue;const a=o.layer,l=o.neuron;if(a<0||a>=e||l<0||l>=n||o.mode!=="add"&&o.mode!=="set"&&o.mode!=="scale"||!Hp(o.value)||!Hp(o.maxAct)||Math.abs(o.value)>1e3||o.maxAct<=0||o.maxAct>1e4)continue;const c=`${a}:${l}`;r.has(c)||(r.add(c),i.push({layer:a,neuron:l,mode:o.mode,value:o.value,maxAct:o.maxAct,unit:o.unit==="resid"?"resid":"max",enabled:o.enabled!==!1}))}return i.slice(0,64)}const Gy=t=>{if(!t||typeof t!="object"||Array.isArray(t))return{};const e={};for(const[n,i]of Object.entries(t))typeof i=="string"&&/^L\d+·N\d+$/.test(n)&&(e[n]=i.slice(0,80));return e};let gr={atlas:null,atlasProgress:0,atlasError:null,sweep:null,sweepError:null,runtime:null,modelProgress:0,modelError:null,view:"atlas",focus:null,tab:"profile",card:null,hover:null,edits:Vy(zp(uv,[])),probeText:"Once upon a time, there was a little girl named Lily. She loved to play in the park with her dog.",analysis:null,probePos:null,colorMode:"uniqueness",layoutMode:"writes",showWeb:!0,isolateLayer:null,names:Gy(zp(cv,{})),steerRequest:null,webglError:null,notice:null};const xd=new Set;function gn(){return gr}function Ve(t){const e=typeof t=="function"?t(gr):t;gr={...gr,...e},"names"in e&&Bp(cv,gr.names),"edits"in e&&Bp(uv,gr.edits),xd.forEach(n=>n())}function lf(t){return xd.add(t),()=>xd.delete(t)}function Pe(t){return ye.useSyncExternalStore(lf,()=>t(gr))}const Yn=t=>`${t.layer}:${t.neuron}`;function Gc(t){Ve(e=>({edits:[...e.edits.filter(i=>Yn(i)!==Yn(t)),t].slice(-64)}))}function dv(t){Ve(e=>({edits:e.edits.filter(n=>Yn(n)!==Yn(t))}))}function jy(t){Ve(e=>({edits:e.edits.map(n=>Yn(n)===Yn(t)?{...n,enabled:n.enabled===!1}:n)}))}function Nr(t,e){Ve(n=>({focus:t?{layer:t.layer,neuron:t.neuron}:null,view:"atlas",tab:e??(t?n.tab:"profile")}))}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const cf="169",Ss={ROTATE:0,DOLLY:1,PAN:2},fs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Wy=0,Vp=1,Xy=2,hv=1,$y=2,li=3,er=0,cn=1,di=2,Ki=0,Ms=1,Ol=2,Gp=3,jp=4,Yy=5,_r=100,qy=101,Ky=102,Zy=103,Qy=104,Jy=200,eS=201,tS=202,nS=203,yd=204,Sd=205,iS=206,rS=207,sS=208,oS=209,aS=210,lS=211,cS=212,uS=213,dS=214,Md=0,Ed=1,wd=2,Is=3,Td=4,Ad=5,bd=6,Cd=7,fv=0,hS=1,fS=2,Zi=0,pS=1,mS=2,gS=3,_S=4,vS=5,xS=6,yS=7,pv=300,Us=301,Fs=302,Rd=303,Pd=304,lc=306,Ld=1e3,Mr=1001,Nd=1002,Cn=1003,SS=1004,va=1005,Hn=1006,jc=1007,Er=1008,Mi=1009,mv=1010,gv=1011,Bo=1012,uf=1013,Dr=1014,pi=1015,$o=1016,df=1017,hf=1018,Os=1020,_v=35902,vv=1021,xv=1022,Gn=1023,yv=1024,Sv=1025,Es=1026,ks=1027,Mv=1028,ff=1029,Ev=1030,pf=1031,mf=1033,rl=33776,sl=33777,ol=33778,al=33779,Dd=35840,Id=35841,Ud=35842,Fd=35843,Od=36196,kd=37492,zd=37496,Bd=37808,Hd=37809,Vd=37810,Gd=37811,jd=37812,Wd=37813,Xd=37814,$d=37815,Yd=37816,qd=37817,Kd=37818,Zd=37819,Qd=37820,Jd=37821,ll=36492,eh=36494,th=36495,wv=36283,nh=36284,ih=36285,rh=36286,MS=3200,ES=3201,wS=0,TS=1,zi="",Zn="srgb",sr="srgb-linear",gf="display-p3",cc="display-p3-linear",kl="linear",ut="srgb",zl="rec709",Bl="p3",Hr=7680,Wp=519,AS=512,bS=513,CS=514,Tv=515,RS=516,PS=517,LS=518,NS=519,Xp=35044,$p="300 es",mi=2e3,Hl=2001;class kr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cl=Math.PI/180,sh=180/Math.PI;function Yo(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ht[t&255]+Ht[t>>8&255]+Ht[t>>16&255]+Ht[t>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[n&63|128]+Ht[n>>8&255]+"-"+Ht[n>>16&255]+Ht[n>>24&255]+Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]).toLowerCase()}function $t(t,e,n){return Math.max(e,Math.min(n,t))}function DS(t,e){return(t%e+e)%e}function Wc(t,e,n){return(1-n)*t+n*e}function eo(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function en(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const IS={DEG2RAD:cl};class He{constructor(e=0,n=0){He.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos($t(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ze{constructor(e,n,i,r,s,o,a,l,c){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=a,d[3]=n,d[4]=s,d[5]=l,d[6]=i,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],d=i[4],f=i[7],h=i[2],p=i[5],_=i[8],y=r[0],g=r[3],u=r[6],x=r[1],v=r[4],w=r[7],L=r[2],b=r[5],A=r[8];return s[0]=o*y+a*x+l*L,s[3]=o*g+a*v+l*b,s[6]=o*u+a*w+l*A,s[1]=c*y+d*x+f*L,s[4]=c*g+d*v+f*b,s[7]=c*u+d*w+f*A,s[2]=h*y+p*x+_*L,s[5]=h*g+p*v+_*b,s[8]=h*u+p*w+_*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return n*o*d-n*a*c-i*s*d+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],f=d*o-a*c,h=a*l-d*s,p=c*s-o*l,_=n*f+i*h+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/_;return e[0]=f*y,e[1]=(r*c-d*i)*y,e[2]=(a*i-r*o)*y,e[3]=h*y,e[4]=(d*n-r*l)*y,e[5]=(r*s-a*n)*y,e[6]=p*y,e[7]=(i*l-c*n)*y,e[8]=(o*n-i*s)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Xc.makeScale(e,n)),this}rotate(e){return this.premultiply(Xc.makeRotation(-e)),this}translate(e,n){return this.premultiply(Xc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Xc=new ze;function Av(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Vl(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function US(){const t=Vl("canvas");return t.style.display="block",t}const Yp={};function ul(t){t in Yp||(Yp[t]=!0,console.warn(t))}function FS(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function OS(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function kS(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const qp=new ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Kp=new ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),to={[sr]:{transfer:kl,primaries:zl,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t,fromReference:t=>t},[Zn]:{transfer:ut,primaries:zl,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[cc]:{transfer:kl,primaries:Bl,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.applyMatrix3(Kp),fromReference:t=>t.applyMatrix3(qp)},[gf]:{transfer:ut,primaries:Bl,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.convertSRGBToLinear().applyMatrix3(Kp),fromReference:t=>t.applyMatrix3(qp).convertLinearToSRGB()}},zS=new Set([sr,cc]),et={enabled:!0,_workingColorSpace:sr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!zS.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=to[e].toReference,r=to[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return to[t].primaries},getTransfer:function(t){return t===zi?kl:to[t].transfer},getLuminanceCoefficients:function(t,e=this._workingColorSpace){return t.fromArray(to[e].luminanceCoefficients)}};function ws(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function $c(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Vr;class BS{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Vr===void 0&&(Vr=Vl("canvas")),Vr.width=e.width,Vr.height=e.height;const i=Vr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Vr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Vl("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ws(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ws(n[i]/255)*255):n[i]=ws(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let HS=0;class bv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:HS++}),this.uuid=Yo(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Yc(r[o].image)):s.push(Yc(r[o]))}else s=Yc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Yc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?BS.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let VS=0;class un extends kr{constructor(e=un.DEFAULT_IMAGE,n=un.DEFAULT_MAPPING,i=Mr,r=Mr,s=Hn,o=Er,a=Gn,l=Mi,c=un.DEFAULT_ANISOTROPY,d=zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:VS++}),this.uuid=Yo(),this.name="",this.source=new bv(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ld:e.x=e.x-Math.floor(e.x);break;case Mr:e.x=e.x<0?0:1;break;case Nd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ld:e.y=e.y-Math.floor(e.y);break;case Mr:e.y=e.y<0?0:1;break;case Nd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=pv;un.DEFAULT_ANISOTROPY=1;class Mt{constructor(e=0,n=0,i=0,r=1){Mt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],d=l[4],f=l[8],h=l[1],p=l[5],_=l[9],y=l[2],g=l[6],u=l[10];if(Math.abs(d-h)<.01&&Math.abs(f-y)<.01&&Math.abs(_-g)<.01){if(Math.abs(d+h)<.1&&Math.abs(f+y)<.1&&Math.abs(_+g)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(c+1)/2,w=(p+1)/2,L=(u+1)/2,b=(d+h)/4,A=(f+y)/4,P=(_+g)/4;return v>w&&v>L?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=b/i,s=A/i):w>L?w<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(w),i=b/r,s=P/r):L<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(L),i=A/s,r=P/s),this.set(i,r,s,n),this}let x=Math.sqrt((g-_)*(g-_)+(f-y)*(f-y)+(h-d)*(h-d));return Math.abs(x)<.001&&(x=1),this.x=(g-_)/x,this.y=(f-y)/x,this.z=(h-d)/x,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class GS extends kr{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Mt(0,0,e,n),this.scissorTest=!1,this.viewport=new Mt(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new un(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new bv(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ir extends GS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Cv extends un{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=Mr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jS extends un{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=Mr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ur{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],d=i[r+2],f=i[r+3];const h=s[o+0],p=s[o+1],_=s[o+2],y=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=d,e[n+3]=f;return}if(a===1){e[n+0]=h,e[n+1]=p,e[n+2]=_,e[n+3]=y;return}if(f!==y||l!==h||c!==p||d!==_){let g=1-a;const u=l*h+c*p+d*_+f*y,x=u>=0?1:-1,v=1-u*u;if(v>Number.EPSILON){const L=Math.sqrt(v),b=Math.atan2(L,u*x);g=Math.sin(g*b)/L,a=Math.sin(a*b)/L}const w=a*x;if(l=l*g+h*w,c=c*g+p*w,d=d*g+_*w,f=f*g+y*w,g===1-a){const L=1/Math.sqrt(l*l+c*c+d*d+f*f);l*=L,c*=L,d*=L,f*=L}}e[n]=l,e[n+1]=c,e[n+2]=d,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],d=i[r+3],f=s[o],h=s[o+1],p=s[o+2],_=s[o+3];return e[n]=a*_+d*f+l*p-c*h,e[n+1]=l*_+d*h+c*f-a*p,e[n+2]=c*_+d*p+a*h-l*f,e[n+3]=d*_-a*f-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),d=a(r/2),f=a(s/2),h=l(i/2),p=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=h*d*f+c*p*_,this._y=c*p*f-h*d*_,this._z=c*d*_+h*p*f,this._w=c*d*f-h*p*_;break;case"YXZ":this._x=h*d*f+c*p*_,this._y=c*p*f-h*d*_,this._z=c*d*_-h*p*f,this._w=c*d*f+h*p*_;break;case"ZXY":this._x=h*d*f-c*p*_,this._y=c*p*f+h*d*_,this._z=c*d*_+h*p*f,this._w=c*d*f-h*p*_;break;case"ZYX":this._x=h*d*f-c*p*_,this._y=c*p*f+h*d*_,this._z=c*d*_-h*p*f,this._w=c*d*f+h*p*_;break;case"YZX":this._x=h*d*f+c*p*_,this._y=c*p*f+h*d*_,this._z=c*d*_-h*p*f,this._w=c*d*f-h*p*_;break;case"XZY":this._x=h*d*f-c*p*_,this._y=c*p*f-h*d*_,this._z=c*d*_+h*p*f,this._w=c*d*f+h*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],d=n[6],f=n[10],h=i+a+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(d-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(d-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($t(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+o*a+r*c-s*l,this._y=r*d+o*l+s*a-i*c,this._z=s*d+o*c+i*l-r*a,this._w=o*d-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),f=Math.sin((1-n)*d)/c,h=Math.sin(n*d)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(e=0,n=0,i=0){k.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Zp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Zp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),d=2*(a*n-s*r),f=2*(s*i-o*n);return this.x=n+l*c+o*f-a*d,this.y=i+l*d+a*c-s*f,this.z=r+l*f+s*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return qc.copy(this).projectOnVector(e),this.sub(qc)}reflect(e){return this.sub(qc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos($t(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qc=new k,Zp=new Ur;class qo{constructor(e=new k(1/0,1/0,1/0),n=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Un.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Un.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Un.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Un):Un.fromBufferAttribute(s,o),Un.applyMatrix4(e.matrixWorld),this.expandByPoint(Un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),xa.copy(i.boundingBox)),xa.applyMatrix4(e.matrixWorld),this.union(xa)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Un),Un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(no),ya.subVectors(this.max,no),Gr.subVectors(e.a,no),jr.subVectors(e.b,no),Wr.subVectors(e.c,no),Ci.subVectors(jr,Gr),Ri.subVectors(Wr,jr),ar.subVectors(Gr,Wr);let n=[0,-Ci.z,Ci.y,0,-Ri.z,Ri.y,0,-ar.z,ar.y,Ci.z,0,-Ci.x,Ri.z,0,-Ri.x,ar.z,0,-ar.x,-Ci.y,Ci.x,0,-Ri.y,Ri.x,0,-ar.y,ar.x,0];return!Kc(n,Gr,jr,Wr,ya)||(n=[1,0,0,0,1,0,0,0,1],!Kc(n,Gr,jr,Wr,ya))?!1:(Sa.crossVectors(Ci,Ri),n=[Sa.x,Sa.y,Sa.z],Kc(n,Gr,jr,Wr,ya))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ii=[new k,new k,new k,new k,new k,new k,new k,new k],Un=new k,xa=new qo,Gr=new k,jr=new k,Wr=new k,Ci=new k,Ri=new k,ar=new k,no=new k,ya=new k,Sa=new k,lr=new k;function Kc(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){lr.fromArray(t,s);const a=r.x*Math.abs(lr.x)+r.y*Math.abs(lr.y)+r.z*Math.abs(lr.z),l=e.dot(lr),c=n.dot(lr),d=i.dot(lr);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const WS=new qo,io=new k,Zc=new k;class Ko{constructor(e=new k,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):WS.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;io.subVectors(e,this.center);const n=io.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(io,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(io.copy(e.center).add(Zc)),this.expandByPoint(io.copy(e.center).sub(Zc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ri=new k,Qc=new k,Ma=new k,Pi=new k,Jc=new k,Ea=new k,eu=new k;class Zo{constructor(e=new k,n=new k(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ri)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ri.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ri.copy(this.origin).addScaledVector(this.direction,n),ri.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Qc.copy(e).add(n).multiplyScalar(.5),Ma.copy(n).sub(e).normalize(),Pi.copy(this.origin).sub(Qc);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Ma),a=Pi.dot(this.direction),l=-Pi.dot(Ma),c=Pi.lengthSq(),d=Math.abs(1-o*o);let f,h,p,_;if(d>0)if(f=o*l-a,h=o*a-l,_=s*d,f>=0)if(h>=-_)if(h<=_){const y=1/d;f*=y,h*=y,p=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h<=-_?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c):h<=_?(f=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Qc).addScaledVector(Ma,h),p}intersectSphere(e,n){ri.subVectors(e.center,this.origin);const i=ri.dot(this.direction),r=ri.dot(ri)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),d>=0?(s=(e.min.y-h.y)*d,o=(e.max.y-h.y)*d):(s=(e.max.y-h.y)*d,o=(e.min.y-h.y)*d),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,ri)!==null}intersectTriangle(e,n,i,r,s){Jc.subVectors(n,e),Ea.subVectors(i,e),eu.crossVectors(Jc,Ea);let o=this.direction.dot(eu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Pi.subVectors(this.origin,e);const l=a*this.direction.dot(Ea.crossVectors(Pi,Ea));if(l<0)return null;const c=a*this.direction.dot(Jc.cross(Pi));if(c<0||l+c>o)return null;const d=-a*Pi.dot(eu);return d<0?null:this.at(d/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class mt{constructor(e,n,i,r,s,o,a,l,c,d,f,h,p,_,y,g){mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,d,f,h,p,_,y,g)}set(e,n,i,r,s,o,a,l,c,d,f,h,p,_,y,g){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=d,u[10]=f,u[14]=h,u[3]=p,u[7]=_,u[11]=y,u[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Xr.setFromMatrixColumn(e,0).length(),s=1/Xr.setFromMatrixColumn(e,1).length(),o=1/Xr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*d,p=o*f,_=a*d,y=a*f;n[0]=l*d,n[4]=-l*f,n[8]=c,n[1]=p+_*c,n[5]=h-y*c,n[9]=-a*l,n[2]=y-h*c,n[6]=_+p*c,n[10]=o*l}else if(e.order==="YXZ"){const h=l*d,p=l*f,_=c*d,y=c*f;n[0]=h+y*a,n[4]=_*a-p,n[8]=o*c,n[1]=o*f,n[5]=o*d,n[9]=-a,n[2]=p*a-_,n[6]=y+h*a,n[10]=o*l}else if(e.order==="ZXY"){const h=l*d,p=l*f,_=c*d,y=c*f;n[0]=h-y*a,n[4]=-o*f,n[8]=_+p*a,n[1]=p+_*a,n[5]=o*d,n[9]=y-h*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const h=o*d,p=o*f,_=a*d,y=a*f;n[0]=l*d,n[4]=_*c-p,n[8]=h*c+y,n[1]=l*f,n[5]=y*c+h,n[9]=p*c-_,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*c,_=a*l,y=a*c;n[0]=l*d,n[4]=y-h*f,n[8]=_*f+p,n[1]=f,n[5]=o*d,n[9]=-a*d,n[2]=-c*d,n[6]=p*f+_,n[10]=h-y*f}else if(e.order==="XZY"){const h=o*l,p=o*c,_=a*l,y=a*c;n[0]=l*d,n[4]=-f,n[8]=c*d,n[1]=h*f+y,n[5]=o*d,n[9]=p*f-_,n[2]=_*f-p,n[6]=a*d,n[10]=y*f+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(XS,e,$S)}lookAt(e,n,i){const r=this.elements;return fn.subVectors(e,n),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),Li.crossVectors(i,fn),Li.lengthSq()===0&&(Math.abs(i.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),Li.crossVectors(i,fn)),Li.normalize(),wa.crossVectors(fn,Li),r[0]=Li.x,r[4]=wa.x,r[8]=fn.x,r[1]=Li.y,r[5]=wa.y,r[9]=fn.y,r[2]=Li.z,r[6]=wa.z,r[10]=fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],d=i[1],f=i[5],h=i[9],p=i[13],_=i[2],y=i[6],g=i[10],u=i[14],x=i[3],v=i[7],w=i[11],L=i[15],b=r[0],A=r[4],P=r[8],Y=r[12],S=r[1],E=r[5],W=r[9],B=r[13],$=r[2],J=r[6],G=r[10],ee=r[14],D=r[3],Z=r[7],K=r[11],re=r[15];return s[0]=o*b+a*S+l*$+c*D,s[4]=o*A+a*E+l*J+c*Z,s[8]=o*P+a*W+l*G+c*K,s[12]=o*Y+a*B+l*ee+c*re,s[1]=d*b+f*S+h*$+p*D,s[5]=d*A+f*E+h*J+p*Z,s[9]=d*P+f*W+h*G+p*K,s[13]=d*Y+f*B+h*ee+p*re,s[2]=_*b+y*S+g*$+u*D,s[6]=_*A+y*E+g*J+u*Z,s[10]=_*P+y*W+g*G+u*K,s[14]=_*Y+y*B+g*ee+u*re,s[3]=x*b+v*S+w*$+L*D,s[7]=x*A+v*E+w*J+L*Z,s[11]=x*P+v*W+w*G+L*K,s[15]=x*Y+v*B+w*ee+L*re,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],f=e[6],h=e[10],p=e[14],_=e[3],y=e[7],g=e[11],u=e[15];return _*(+s*l*f-r*c*f-s*a*h+i*c*h+r*a*p-i*l*p)+y*(+n*l*p-n*c*h+s*o*h-r*o*p+r*c*d-s*l*d)+g*(+n*c*f-n*a*p-s*o*f+i*o*p+s*a*d-i*c*d)+u*(-r*a*d-n*l*f+n*a*h+r*o*f-i*o*h+i*l*d)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],f=e[9],h=e[10],p=e[11],_=e[12],y=e[13],g=e[14],u=e[15],x=f*g*c-y*h*c+y*l*p-a*g*p-f*l*u+a*h*u,v=_*h*c-d*g*c-_*l*p+o*g*p+d*l*u-o*h*u,w=d*y*c-_*f*c+_*a*p-o*y*p-d*a*u+o*f*u,L=_*f*l-d*y*l-_*a*h+o*y*h+d*a*g-o*f*g,b=n*x+i*v+r*w+s*L;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/b;return e[0]=x*A,e[1]=(y*h*s-f*g*s-y*r*p+i*g*p+f*r*u-i*h*u)*A,e[2]=(a*g*s-y*l*s+y*r*c-i*g*c-a*r*u+i*l*u)*A,e[3]=(f*l*s-a*h*s-f*r*c+i*h*c+a*r*p-i*l*p)*A,e[4]=v*A,e[5]=(d*g*s-_*h*s+_*r*p-n*g*p-d*r*u+n*h*u)*A,e[6]=(_*l*s-o*g*s-_*r*c+n*g*c+o*r*u-n*l*u)*A,e[7]=(o*h*s-d*l*s+d*r*c-n*h*c-o*r*p+n*l*p)*A,e[8]=w*A,e[9]=(_*f*s-d*y*s-_*i*p+n*y*p+d*i*u-n*f*u)*A,e[10]=(o*y*s-_*a*s+_*i*c-n*y*c-o*i*u+n*a*u)*A,e[11]=(d*a*s-o*f*s-d*i*c+n*f*c+o*i*p-n*a*p)*A,e[12]=L*A,e[13]=(d*y*r-_*f*r+_*i*h-n*y*h-d*i*g+n*f*g)*A,e[14]=(_*a*r-o*y*r-_*i*l+n*y*l+o*i*g-n*a*g)*A,e[15]=(o*f*r-d*a*r+d*i*l-n*f*l-o*i*h+n*a*h)*A,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,d=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,d*a+i,d*l-r*o,0,c*l-r*a,d*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,d=o+o,f=a+a,h=s*c,p=s*d,_=s*f,y=o*d,g=o*f,u=a*f,x=l*c,v=l*d,w=l*f,L=i.x,b=i.y,A=i.z;return r[0]=(1-(y+u))*L,r[1]=(p+w)*L,r[2]=(_-v)*L,r[3]=0,r[4]=(p-w)*b,r[5]=(1-(h+u))*b,r[6]=(g+x)*b,r[7]=0,r[8]=(_+v)*A,r[9]=(g-x)*A,r[10]=(1-(h+y))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Xr.set(r[0],r[1],r[2]).length();const o=Xr.set(r[4],r[5],r[6]).length(),a=Xr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Fn.copy(this);const c=1/s,d=1/o,f=1/a;return Fn.elements[0]*=c,Fn.elements[1]*=c,Fn.elements[2]*=c,Fn.elements[4]*=d,Fn.elements[5]*=d,Fn.elements[6]*=d,Fn.elements[8]*=f,Fn.elements[9]*=f,Fn.elements[10]*=f,n.setFromRotationMatrix(Fn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=mi){const l=this.elements,c=2*s/(n-e),d=2*s/(i-r),f=(n+e)/(n-e),h=(i+r)/(i-r);let p,_;if(a===mi)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Hl)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=mi){const l=this.elements,c=1/(n-e),d=1/(i-r),f=1/(o-s),h=(n+e)*c,p=(i+r)*d;let _,y;if(a===mi)_=(o+s)*f,y=-2*f;else if(a===Hl)_=s*f,y=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Xr=new k,Fn=new mt,XS=new k(0,0,0),$S=new k(1,1,1),Li=new k,wa=new k,fn=new k,Qp=new mt,Jp=new Ur;class Ei{constructor(e=0,n=0,i=0,r=Ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],d=r[9],f=r[2],h=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin($t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin($t(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-$t(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin($t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-$t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Qp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qp,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Jp.setFromEuler(this),this.setFromQuaternion(Jp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ei.DEFAULT_ORDER="XYZ";class _f{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let YS=0;const em=new k,$r=new Ur,si=new mt,Ta=new k,ro=new k,qS=new k,KS=new Ur,tm=new k(1,0,0),nm=new k(0,1,0),im=new k(0,0,1),rm={type:"added"},ZS={type:"removed"},Yr={type:"childadded",child:null},tu={type:"childremoved",child:null};class qt extends kr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:YS++}),this.uuid=Yo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qt.DEFAULT_UP.clone();const e=new k,n=new Ei,i=new Ur,r=new k(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new mt},normalMatrix:{value:new ze}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=qt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _f,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return $r.setFromAxisAngle(e,n),this.quaternion.multiply($r),this}rotateOnWorldAxis(e,n){return $r.setFromAxisAngle(e,n),this.quaternion.premultiply($r),this}rotateX(e){return this.rotateOnAxis(tm,e)}rotateY(e){return this.rotateOnAxis(nm,e)}rotateZ(e){return this.rotateOnAxis(im,e)}translateOnAxis(e,n){return em.copy(e).applyQuaternion(this.quaternion),this.position.add(em.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(tm,e)}translateY(e){return this.translateOnAxis(nm,e)}translateZ(e){return this.translateOnAxis(im,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(si.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ta.copy(e):Ta.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ro.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?si.lookAt(ro,Ta,this.up):si.lookAt(Ta,ro,this.up),this.quaternion.setFromRotationMatrix(si),r&&(si.extractRotation(r.matrixWorld),$r.setFromRotationMatrix(si),this.quaternion.premultiply($r.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(rm),Yr.child=e,this.dispatchEvent(Yr),Yr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(ZS),tu.child=e,this.dispatchEvent(tu),tu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),si.multiply(e.parent.matrixWorld)),e.applyMatrix4(si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(rm),Yr.child=e,this.dispatchEvent(Yr),Yr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ro,e,qS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ro,KS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),f=o(e.shapes),h=o(e.skeletons),p=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}qt.DEFAULT_UP=new k(0,1,0);qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const On=new k,oi=new k,nu=new k,ai=new k,qr=new k,Kr=new k,sm=new k,iu=new k,ru=new k,su=new k,ou=new Mt,au=new Mt,lu=new Mt;class Vn{constructor(e=new k,n=new k,i=new k){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),On.subVectors(e,n),r.cross(On);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){On.subVectors(r,n),oi.subVectors(i,n),nu.subVectors(e,n);const o=On.dot(On),a=On.dot(oi),l=On.dot(nu),c=oi.dot(oi),d=oi.dot(nu),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,p=(c*l-a*d)*h,_=(o*d-a*l)*h;return s.set(1-p-_,_,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,ai)===null?!1:ai.x>=0&&ai.y>=0&&ai.x+ai.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,ai)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ai.x),l.addScaledVector(o,ai.y),l.addScaledVector(a,ai.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return ou.setScalar(0),au.setScalar(0),lu.setScalar(0),ou.fromBufferAttribute(e,n),au.fromBufferAttribute(e,i),lu.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(ou,s.x),o.addScaledVector(au,s.y),o.addScaledVector(lu,s.z),o}static isFrontFacing(e,n,i,r){return On.subVectors(i,n),oi.subVectors(e,n),On.cross(oi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return On.subVectors(this.c,this.b),oi.subVectors(this.a,this.b),On.cross(oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Vn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Vn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;qr.subVectors(r,i),Kr.subVectors(s,i),iu.subVectors(e,i);const l=qr.dot(iu),c=Kr.dot(iu);if(l<=0&&c<=0)return n.copy(i);ru.subVectors(e,r);const d=qr.dot(ru),f=Kr.dot(ru);if(d>=0&&f<=d)return n.copy(r);const h=l*f-d*c;if(h<=0&&l>=0&&d<=0)return o=l/(l-d),n.copy(i).addScaledVector(qr,o);su.subVectors(e,s);const p=qr.dot(su),_=Kr.dot(su);if(_>=0&&p<=_)return n.copy(s);const y=p*c-l*_;if(y<=0&&c>=0&&_<=0)return a=c/(c-_),n.copy(i).addScaledVector(Kr,a);const g=d*_-p*f;if(g<=0&&f-d>=0&&p-_>=0)return sm.subVectors(s,r),a=(f-d)/(f-d+(p-_)),n.copy(r).addScaledVector(sm,a);const u=1/(g+y+h);return o=y*u,a=h*u,n.copy(i).addScaledVector(qr,o).addScaledVector(Kr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Rv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},Aa={h:0,s:0,l:0};function cu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class tt{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Zn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=et.workingColorSpace){return this.r=e,this.g=n,this.b=i,et.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=et.workingColorSpace){if(e=DS(e,1),n=$t(n,0,1),i=$t(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=cu(o,s,e+1/3),this.g=cu(o,s,e),this.b=cu(o,s,e-1/3)}return et.toWorkingColorSpace(this,r),this}setStyle(e,n=Zn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Zn){const i=Rv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ws(e.r),this.g=ws(e.g),this.b=ws(e.b),this}copyLinearToSRGB(e){return this.r=$c(e.r),this.g=$c(e.g),this.b=$c(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zn){return et.fromWorkingColorSpace(Vt.copy(this),e),Math.round($t(Vt.r*255,0,255))*65536+Math.round($t(Vt.g*255,0,255))*256+Math.round($t(Vt.b*255,0,255))}getHexString(e=Zn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=et.workingColorSpace){et.fromWorkingColorSpace(Vt.copy(this),n);const i=Vt.r,r=Vt.g,s=Vt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=d<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,n=et.workingColorSpace){return et.fromWorkingColorSpace(Vt.copy(this),n),e.r=Vt.r,e.g=Vt.g,e.b=Vt.b,e}getStyle(e=Zn){et.fromWorkingColorSpace(Vt.copy(this),e);const n=Vt.r,i=Vt.g,r=Vt.b;return e!==Zn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ni),this.setHSL(Ni.h+e,Ni.s+n,Ni.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ni),e.getHSL(Aa);const i=Wc(Ni.h,Aa.h,n),r=Wc(Ni.s,Aa.s,n),s=Wc(Ni.l,Aa.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vt=new tt;tt.NAMES=Rv;let QS=0;class Gs extends kr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:QS++}),this.uuid=Yo(),this.name="",this.type="Material",this.blending=Ms,this.side=er,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yd,this.blendDst=Sd,this.blendEquation=_r,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=Is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hr,this.stencilZFail=Hr,this.stencilZPass=Hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ms&&(i.blending=this.blending),this.side!==er&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==yd&&(i.blendSrc=this.blendSrc),this.blendDst!==Sd&&(i.blendDst=this.blendDst),this.blendEquation!==_r&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Is&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Hr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Hr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Pv extends Gs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=fv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wt=new k,ba=new He;class sn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Xp,this.updateRanges=[],this.gpuType=pi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)ba.fromBufferAttribute(this,n),ba.applyMatrix3(e),this.setXY(n,ba.x,ba.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyMatrix3(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyMatrix4(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyNormalMatrix(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.transformDirection(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=eo(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=en(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=eo(n,this.array)),n}setX(e,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=eo(n,this.array)),n}setY(e,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=eo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=eo(n,this.array)),n}setW(e,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=en(n,this.array),i=en(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=en(n,this.array),i=en(i,this.array),r=en(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=en(n,this.array),i=en(i,this.array),r=en(r,this.array),s=en(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xp&&(e.usage=this.usage),e}}class Lv extends sn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Nv extends sn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Xn extends sn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let JS=0;const En=new mt,uu=new qt,Zr=new k,pn=new qo,so=new qo,Nt=new k;class Pn extends kr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:JS++}),this.uuid=Yo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Av(e)?Nv:Lv)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ze().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return En.makeRotationFromQuaternion(e),this.applyMatrix4(En),this}rotateX(e){return En.makeRotationX(e),this.applyMatrix4(En),this}rotateY(e){return En.makeRotationY(e),this.applyMatrix4(En),this}rotateZ(e){return En.makeRotationZ(e),this.applyMatrix4(En),this}translate(e,n,i){return En.makeTranslation(e,n,i),this.applyMatrix4(En),this}scale(e,n,i){return En.makeScale(e,n,i),this.applyMatrix4(En),this}lookAt(e){return uu.lookAt(e),uu.updateMatrix(),this.applyMatrix4(uu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zr).negate(),this.translate(Zr.x,Zr.y,Zr.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Xn(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];pn.setFromBufferAttribute(s),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ko);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const i=this.boundingSphere.center;if(pn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];so.setFromBufferAttribute(a),this.morphTargetsRelative?(Nt.addVectors(pn.min,so.min),pn.expandByPoint(Nt),Nt.addVectors(pn.max,so.max),pn.expandByPoint(Nt)):(pn.expandByPoint(so.min),pn.expandByPoint(so.max))}pn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Nt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Nt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)Nt.fromBufferAttribute(a,c),l&&(Zr.fromBufferAttribute(e,c),Nt.add(Zr)),r=Math.max(r,i.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new sn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<i.count;P++)a[P]=new k,l[P]=new k;const c=new k,d=new k,f=new k,h=new He,p=new He,_=new He,y=new k,g=new k;function u(P,Y,S){c.fromBufferAttribute(i,P),d.fromBufferAttribute(i,Y),f.fromBufferAttribute(i,S),h.fromBufferAttribute(s,P),p.fromBufferAttribute(s,Y),_.fromBufferAttribute(s,S),d.sub(c),f.sub(c),p.sub(h),_.sub(h);const E=1/(p.x*_.y-_.x*p.y);isFinite(E)&&(y.copy(d).multiplyScalar(_.y).addScaledVector(f,-p.y).multiplyScalar(E),g.copy(f).multiplyScalar(p.x).addScaledVector(d,-_.x).multiplyScalar(E),a[P].add(y),a[Y].add(y),a[S].add(y),l[P].add(g),l[Y].add(g),l[S].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let P=0,Y=x.length;P<Y;++P){const S=x[P],E=S.start,W=S.count;for(let B=E,$=E+W;B<$;B+=3)u(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const v=new k,w=new k,L=new k,b=new k;function A(P){L.fromBufferAttribute(r,P),b.copy(L);const Y=a[P];v.copy(Y),v.sub(L.multiplyScalar(L.dot(Y))).normalize(),w.crossVectors(b,Y);const E=w.dot(l[P])<0?-1:1;o.setXYZW(P,v.x,v.y,v.z,E)}for(let P=0,Y=x.length;P<Y;++P){const S=x[P],E=S.start,W=S.count;for(let B=E,$=E+W;B<$;B+=3)A(e.getX(B+0)),A(e.getX(B+1)),A(e.getX(B+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new sn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new k,s=new k,o=new k,a=new k,l=new k,c=new k,d=new k,f=new k;if(e)for(let h=0,p=e.count;h<p;h+=3){const _=e.getX(h+0),y=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,y),o.fromBufferAttribute(n,g),d.subVectors(o,s),f.subVectors(r,s),d.cross(f),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,g),a.add(d),l.add(d),c.add(d),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,p=n.count;h<p;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),d.subVectors(o,s),f.subVectors(r,s),d.cross(f),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Nt.fromBufferAttribute(e,n),Nt.normalize(),e.setXYZ(n,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,f=a.normalized,h=new c.constructor(l.length*d);let p=0,_=0;for(let y=0,g=l.length;y<g;y++){a.isInterleavedBufferAttribute?p=l[y]*a.data.stride+a.offset:p=l[y]*d;for(let u=0;u<d;u++)h[_++]=c[p++]}return new sn(h,d,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Pn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let d=0,f=c.length;d<f;d++){const h=c[d],p=e(h,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];d.push(p.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(n))}const s=e.morphAttributes;for(const c in s){const d=[],f=s[c];for(let h=0,p=f.length;h<p;h++)d.push(f[h].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const om=new mt,cr=new Zo,Ca=new Ko,am=new k,Ra=new k,Pa=new k,La=new k,du=new k,Na=new k,lm=new k,Da=new k;class gi extends qt{constructor(e=new Pn,n=new Pv){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Na.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=a[l],f=s[l];d!==0&&(du.fromBufferAttribute(f,e),o?Na.addScaledVector(du,d):Na.addScaledVector(du.sub(n),d))}n.add(Na)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ca.copy(i.boundingSphere),Ca.applyMatrix4(s),cr.copy(e.ray).recast(e.near),!(Ca.containsPoint(cr.origin)===!1&&(cr.intersectSphere(Ca,am)===null||cr.origin.distanceToSquared(am)>(e.far-e.near)**2))&&(om.copy(s).invert(),cr.copy(e.ray).applyMatrix4(om),!(i.boundingBox!==null&&cr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,cr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,f=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,y=h.length;_<y;_++){const g=h[_],u=o[g.materialIndex],x=Math.max(g.start,p.start),v=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let w=x,L=v;w<L;w+=3){const b=a.getX(w),A=a.getX(w+1),P=a.getX(w+2);r=Ia(this,u,e,i,c,d,f,b,A,P),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let g=_,u=y;g<u;g+=3){const x=a.getX(g),v=a.getX(g+1),w=a.getX(g+2);r=Ia(this,o,e,i,c,d,f,x,v,w),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,y=h.length;_<y;_++){const g=h[_],u=o[g.materialIndex],x=Math.max(g.start,p.start),v=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let w=x,L=v;w<L;w+=3){const b=w,A=w+1,P=w+2;r=Ia(this,u,e,i,c,d,f,b,A,P),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let g=_,u=y;g<u;g+=3){const x=g,v=g+1,w=g+2;r=Ia(this,o,e,i,c,d,f,x,v,w),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function eM(t,e,n,i,r,s,o,a){let l;if(e.side===cn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===er,a),l===null)return null;Da.copy(a),Da.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Da);return c<n.near||c>n.far?null:{distance:c,point:Da.clone(),object:t}}function Ia(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,Ra),t.getVertexPosition(l,Pa),t.getVertexPosition(c,La);const d=eM(t,e,n,i,Ra,Pa,La,lm);if(d){const f=new k;Vn.getBarycoord(lm,Ra,Pa,La,f),r&&(d.uv=Vn.getInterpolatedAttribute(r,a,l,c,f,new He)),s&&(d.uv1=Vn.getInterpolatedAttribute(s,a,l,c,f,new He)),o&&(d.normal=Vn.getInterpolatedAttribute(o,a,l,c,f,new k),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new k,materialIndex:0};Vn.getNormal(Ra,Pa,La,h.normal),d.face=h,d.barycoord=f}return d}class Qo extends Pn{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],d=[],f=[];let h=0,p=0;_("z","y","x",-1,-1,i,n,e,o,s,0),_("z","y","x",1,-1,i,n,-e,o,s,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Xn(c,3)),this.setAttribute("normal",new Xn(d,3)),this.setAttribute("uv",new Xn(f,2));function _(y,g,u,x,v,w,L,b,A,P,Y){const S=w/A,E=L/P,W=w/2,B=L/2,$=b/2,J=A+1,G=P+1;let ee=0,D=0;const Z=new k;for(let K=0;K<G;K++){const re=K*E-B;for(let Ee=0;Ee<J;Ee++){const Be=Ee*S-W;Z[y]=Be*x,Z[g]=re*v,Z[u]=$,c.push(Z.x,Z.y,Z.z),Z[y]=0,Z[g]=0,Z[u]=b>0?1:-1,d.push(Z.x,Z.y,Z.z),f.push(Ee/A),f.push(1-K/P),ee+=1}}for(let K=0;K<P;K++)for(let re=0;re<A;re++){const Ee=h+re+J*K,Be=h+re+J*(K+1),V=h+(re+1)+J*(K+1),ne=h+(re+1)+J*K;l.push(Ee,Be,ne),l.push(Be,V,ne),D+=6}a.addGroup(p,D,Y),p+=D,h+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function zs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Wt(t){const e={};for(let n=0;n<t.length;n++){const i=zs(t[n]);for(const r in i)e[r]=i[r]}return e}function tM(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Dv(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const nM={clone:zs,merge:Wt};var iM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wi extends Gs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=iM,this.fragmentShader=rM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zs(e.uniforms),this.uniformsGroups=tM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Iv extends qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=mi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Di=new k,cm=new He,um=new He;class An extends Iv{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=sh*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(cl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return sh*2*Math.atan(Math.tan(cl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Di.x,Di.y).multiplyScalar(-e/Di.z),Di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Di.x,Di.y).multiplyScalar(-e/Di.z)}getViewSize(e,n){return this.getViewBounds(e,cm,um),n.subVectors(um,cm)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(cl*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Qr=-90,Jr=1;class sM extends qt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new An(Qr,Jr,e,n);r.layers=this.layers,this.add(r);const s=new An(Qr,Jr,e,n);s.layers=this.layers,this.add(s);const o=new An(Qr,Jr,e,n);o.layers=this.layers,this.add(o);const a=new An(Qr,Jr,e,n);a.layers=this.layers,this.add(a);const l=new An(Qr,Jr,e,n);l.layers=this.layers,this.add(l);const c=new An(Qr,Jr,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===mi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Hl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,d]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(n,d),e.setRenderTarget(f,h,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Uv extends un{constructor(e,n,i,r,s,o,a,l,c,d){e=e!==void 0?e:[],n=n!==void 0?n:Us,super(e,n,i,r,s,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class oM extends Ir{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Uv(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Hn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Qo(5,5,5),s=new wi({name:"CubemapFromEquirect",uniforms:zs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:Ki});s.uniforms.tEquirect.value=n;const o=new gi(r,s),a=n.minFilter;return n.minFilter===Er&&(n.minFilter=Hn),new sM(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const hu=new k,aM=new k,lM=new ze;class Fi{constructor(e=new k(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=hu.subVectors(i,n).cross(aM.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(hu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||lM.getNormalMatrix(e),r=this.coplanarPoint(hu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ur=new Ko,Ua=new k;class Fv{constructor(e=new Fi,n=new Fi,i=new Fi,r=new Fi,s=new Fi,o=new Fi){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=mi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],d=r[5],f=r[6],h=r[7],p=r[8],_=r[9],y=r[10],g=r[11],u=r[12],x=r[13],v=r[14],w=r[15];if(i[0].setComponents(l-s,h-c,g-p,w-u).normalize(),i[1].setComponents(l+s,h+c,g+p,w+u).normalize(),i[2].setComponents(l+o,h+d,g+_,w+x).normalize(),i[3].setComponents(l-o,h-d,g-_,w-x).normalize(),i[4].setComponents(l-a,h-f,g-y,w-v).normalize(),n===mi)i[5].setComponents(l+a,h+f,g+y,w+v).normalize();else if(n===Hl)i[5].setComponents(a,f,y,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ur.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ur.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ur)}intersectsSprite(e){return ur.center.set(0,0,0),ur.radius=.7071067811865476,ur.applyMatrix4(e.matrixWorld),this.intersectsSphere(ur)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Ua.x=r.normal.x>0?e.max.x:e.min.x,Ua.y=r.normal.y>0?e.max.y:e.min.y,Ua.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ua)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ov(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function cM(t){const e=new WeakMap;function n(a,l){const c=a.array,d=a.usage,f=c.byteLength,h=t.createBuffer();t.bindBuffer(l,h),t.bufferData(l,c,d),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const d=l.array,f=l.updateRanges;if(t.bindBuffer(c,a),f.length===0)t.bufferSubData(c,0,d);else{f.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<f.length;p++){const _=f[h],y=f[p];y.start<=_.start+_.count+1?_.count=Math.max(_.count,y.start+y.count-_.start):(++h,f[h]=y)}f.length=h+1;for(let p=0,_=f.length;p<_;p++){const y=f[p];t.bufferSubData(c,y.start*d.BYTES_PER_ELEMENT,d,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=e.get(a);(!d||d.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class uc extends Pn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,d=l+1,f=e/a,h=n/l,p=[],_=[],y=[],g=[];for(let u=0;u<d;u++){const x=u*h-o;for(let v=0;v<c;v++){const w=v*f-s;_.push(w,-x,0),y.push(0,0,1),g.push(v/a),g.push(1-u/l)}}for(let u=0;u<l;u++)for(let x=0;x<a;x++){const v=x+c*u,w=x+c*(u+1),L=x+1+c*(u+1),b=x+1+c*u;p.push(v,w,b),p.push(w,L,b)}this.setIndex(p),this.setAttribute("position",new Xn(_,3)),this.setAttribute("normal",new Xn(y,3)),this.setAttribute("uv",new Xn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uc(e.width,e.height,e.widthSegments,e.heightSegments)}}var uM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,hM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,_M=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,xM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,SM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,MM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,EM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,wM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,TM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,AM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,CM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,RM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,PM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,LM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,NM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,DM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,IM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,UM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,FM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,OM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,BM="gl_FragColor = linearToOutputTexel( gl_FragColor );",HM=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,VM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,GM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,jM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,WM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,XM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$M=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,YM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,KM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ZM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,QM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,JM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,eE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,nE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,iE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,oE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,aE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lE=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,cE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,uE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,dE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,fE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_E=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,xE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,SE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ME=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,EE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,TE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,AE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,CE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,RE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,PE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,LE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,NE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,DE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,IE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,UE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,FE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,OE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,zE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,BE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,HE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,VE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,GE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,WE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,XE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,$E=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,YE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,qE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,KE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ZE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,QE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,JE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ew=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,iw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,rw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,sw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ow=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,aw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,lw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,uw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,gw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,_w=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,vw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,xw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sw=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ew=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ww=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Aw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Cw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Pw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Lw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Iw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ow=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,kw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Hw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ke={alphahash_fragment:uM,alphahash_pars_fragment:dM,alphamap_fragment:hM,alphamap_pars_fragment:fM,alphatest_fragment:pM,alphatest_pars_fragment:mM,aomap_fragment:gM,aomap_pars_fragment:_M,batching_pars_vertex:vM,batching_vertex:xM,begin_vertex:yM,beginnormal_vertex:SM,bsdfs:MM,iridescence_fragment:EM,bumpmap_pars_fragment:wM,clipping_planes_fragment:TM,clipping_planes_pars_fragment:AM,clipping_planes_pars_vertex:bM,clipping_planes_vertex:CM,color_fragment:RM,color_pars_fragment:PM,color_pars_vertex:LM,color_vertex:NM,common:DM,cube_uv_reflection_fragment:IM,defaultnormal_vertex:UM,displacementmap_pars_vertex:FM,displacementmap_vertex:OM,emissivemap_fragment:kM,emissivemap_pars_fragment:zM,colorspace_fragment:BM,colorspace_pars_fragment:HM,envmap_fragment:VM,envmap_common_pars_fragment:GM,envmap_pars_fragment:jM,envmap_pars_vertex:WM,envmap_physical_pars_fragment:nE,envmap_vertex:XM,fog_vertex:$M,fog_pars_vertex:YM,fog_fragment:qM,fog_pars_fragment:KM,gradientmap_pars_fragment:ZM,lightmap_pars_fragment:QM,lights_lambert_fragment:JM,lights_lambert_pars_fragment:eE,lights_pars_begin:tE,lights_toon_fragment:iE,lights_toon_pars_fragment:rE,lights_phong_fragment:sE,lights_phong_pars_fragment:oE,lights_physical_fragment:aE,lights_physical_pars_fragment:lE,lights_fragment_begin:cE,lights_fragment_maps:uE,lights_fragment_end:dE,logdepthbuf_fragment:hE,logdepthbuf_pars_fragment:fE,logdepthbuf_pars_vertex:pE,logdepthbuf_vertex:mE,map_fragment:gE,map_pars_fragment:_E,map_particle_fragment:vE,map_particle_pars_fragment:xE,metalnessmap_fragment:yE,metalnessmap_pars_fragment:SE,morphinstance_vertex:ME,morphcolor_vertex:EE,morphnormal_vertex:wE,morphtarget_pars_vertex:TE,morphtarget_vertex:AE,normal_fragment_begin:bE,normal_fragment_maps:CE,normal_pars_fragment:RE,normal_pars_vertex:PE,normal_vertex:LE,normalmap_pars_fragment:NE,clearcoat_normal_fragment_begin:DE,clearcoat_normal_fragment_maps:IE,clearcoat_pars_fragment:UE,iridescence_pars_fragment:FE,opaque_fragment:OE,packing:kE,premultiplied_alpha_fragment:zE,project_vertex:BE,dithering_fragment:HE,dithering_pars_fragment:VE,roughnessmap_fragment:GE,roughnessmap_pars_fragment:jE,shadowmap_pars_fragment:WE,shadowmap_pars_vertex:XE,shadowmap_vertex:$E,shadowmask_pars_fragment:YE,skinbase_vertex:qE,skinning_pars_vertex:KE,skinning_vertex:ZE,skinnormal_vertex:QE,specularmap_fragment:JE,specularmap_pars_fragment:ew,tonemapping_fragment:tw,tonemapping_pars_fragment:nw,transmission_fragment:iw,transmission_pars_fragment:rw,uv_pars_fragment:sw,uv_pars_vertex:ow,uv_vertex:aw,worldpos_vertex:lw,background_vert:cw,background_frag:uw,backgroundCube_vert:dw,backgroundCube_frag:hw,cube_vert:fw,cube_frag:pw,depth_vert:mw,depth_frag:gw,distanceRGBA_vert:_w,distanceRGBA_frag:vw,equirect_vert:xw,equirect_frag:yw,linedashed_vert:Sw,linedashed_frag:Mw,meshbasic_vert:Ew,meshbasic_frag:ww,meshlambert_vert:Tw,meshlambert_frag:Aw,meshmatcap_vert:bw,meshmatcap_frag:Cw,meshnormal_vert:Rw,meshnormal_frag:Pw,meshphong_vert:Lw,meshphong_frag:Nw,meshphysical_vert:Dw,meshphysical_frag:Iw,meshtoon_vert:Uw,meshtoon_frag:Fw,points_vert:Ow,points_frag:kw,shadow_vert:zw,shadow_frag:Bw,sprite_vert:Hw,sprite_frag:Vw},ce={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},Qn={basic:{uniforms:Wt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:Wt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new tt(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:Wt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:Wt([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:Wt([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new tt(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:Wt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:Wt([ce.points,ce.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:Wt([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:Wt([ce.common,ce.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:Wt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:Wt([ce.sprite,ce.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:Wt([ce.common,ce.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:Wt([ce.lights,ce.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};Qn.physical={uniforms:Wt([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const Fa={r:0,b:0,g:0},dr=new Ei,Gw=new mt;function jw(t,e,n,i,r,s,o){const a=new tt(0);let l=s===!0?0:1,c,d,f=null,h=0,p=null;function _(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?n:e).get(v)),v}function y(x){let v=!1;const w=_(x);w===null?u(a,l):w&&w.isColor&&(u(w,1),v=!0);const L=t.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function g(x,v){const w=_(v);w&&(w.isCubeTexture||w.mapping===lc)?(d===void 0&&(d=new gi(new Qo(1,1,1),new wi({name:"BackgroundCubeMaterial",uniforms:zs(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(L,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),dr.copy(v.backgroundRotation),dr.x*=-1,dr.y*=-1,dr.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(dr.y*=-1,dr.z*=-1),d.material.uniforms.envMap.value=w,d.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Gw.makeRotationFromEuler(dr)),d.material.toneMapped=et.getTransfer(w.colorSpace)!==ut,(f!==w||h!==w.version||p!==t.toneMapping)&&(d.material.needsUpdate=!0,f=w,h=w.version,p=t.toneMapping),d.layers.enableAll(),x.unshift(d,d.geometry,d.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new gi(new uc(2,2),new wi({name:"BackgroundMaterial",uniforms:zs(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:er,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=et.getTransfer(w.colorSpace)!==ut,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(f!==w||h!==w.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,f=w,h=w.version,p=t.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function u(x,v){x.getRGB(Fa,Dv(t)),i.buffers.color.setClear(Fa.r,Fa.g,Fa.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),l=v,u(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,u(a,l)},render:y,addToRenderList:g}}function Ww(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(S,E,W,B,$){let J=!1;const G=f(B,W,E);s!==G&&(s=G,c(s.object)),J=p(S,B,W,$),J&&_(S,B,W,$),$!==null&&e.update($,t.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,w(S,E,W,B),$!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return t.createVertexArray()}function c(S){return t.bindVertexArray(S)}function d(S){return t.deleteVertexArray(S)}function f(S,E,W){const B=W.wireframe===!0;let $=i[S.id];$===void 0&&($={},i[S.id]=$);let J=$[E.id];J===void 0&&(J={},$[E.id]=J);let G=J[B];return G===void 0&&(G=h(l()),J[B]=G),G}function h(S){const E=[],W=[],B=[];for(let $=0;$<n;$++)E[$]=0,W[$]=0,B[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:W,attributeDivisors:B,object:S,attributes:{},index:null}}function p(S,E,W,B){const $=s.attributes,J=E.attributes;let G=0;const ee=W.getAttributes();for(const D in ee)if(ee[D].location>=0){const K=$[D];let re=J[D];if(re===void 0&&(D==="instanceMatrix"&&S.instanceMatrix&&(re=S.instanceMatrix),D==="instanceColor"&&S.instanceColor&&(re=S.instanceColor)),K===void 0||K.attribute!==re||re&&K.data!==re.data)return!0;G++}return s.attributesNum!==G||s.index!==B}function _(S,E,W,B){const $={},J=E.attributes;let G=0;const ee=W.getAttributes();for(const D in ee)if(ee[D].location>=0){let K=J[D];K===void 0&&(D==="instanceMatrix"&&S.instanceMatrix&&(K=S.instanceMatrix),D==="instanceColor"&&S.instanceColor&&(K=S.instanceColor));const re={};re.attribute=K,K&&K.data&&(re.data=K.data),$[D]=re,G++}s.attributes=$,s.attributesNum=G,s.index=B}function y(){const S=s.newAttributes;for(let E=0,W=S.length;E<W;E++)S[E]=0}function g(S){u(S,0)}function u(S,E){const W=s.newAttributes,B=s.enabledAttributes,$=s.attributeDivisors;W[S]=1,B[S]===0&&(t.enableVertexAttribArray(S),B[S]=1),$[S]!==E&&(t.vertexAttribDivisor(S,E),$[S]=E)}function x(){const S=s.newAttributes,E=s.enabledAttributes;for(let W=0,B=E.length;W<B;W++)E[W]!==S[W]&&(t.disableVertexAttribArray(W),E[W]=0)}function v(S,E,W,B,$,J,G){G===!0?t.vertexAttribIPointer(S,E,W,$,J):t.vertexAttribPointer(S,E,W,B,$,J)}function w(S,E,W,B){y();const $=B.attributes,J=W.getAttributes(),G=E.defaultAttributeValues;for(const ee in J){const D=J[ee];if(D.location>=0){let Z=$[ee];if(Z===void 0&&(ee==="instanceMatrix"&&S.instanceMatrix&&(Z=S.instanceMatrix),ee==="instanceColor"&&S.instanceColor&&(Z=S.instanceColor)),Z!==void 0){const K=Z.normalized,re=Z.itemSize,Ee=e.get(Z);if(Ee===void 0)continue;const Be=Ee.buffer,V=Ee.type,ne=Ee.bytesPerElement,ue=V===t.INT||V===t.UNSIGNED_INT||Z.gpuType===uf;if(Z.isInterleavedBufferAttribute){const de=Z.data,Fe=de.stride,Ce=Z.offset;if(de.isInstancedInterleavedBuffer){for(let We=0;We<D.locationSize;We++)u(D.location+We,de.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let We=0;We<D.locationSize;We++)g(D.location+We);t.bindBuffer(t.ARRAY_BUFFER,Be);for(let We=0;We<D.locationSize;We++)v(D.location+We,re/D.locationSize,V,K,Fe*ne,(Ce+re/D.locationSize*We)*ne,ue)}else{if(Z.isInstancedBufferAttribute){for(let de=0;de<D.locationSize;de++)u(D.location+de,Z.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let de=0;de<D.locationSize;de++)g(D.location+de);t.bindBuffer(t.ARRAY_BUFFER,Be);for(let de=0;de<D.locationSize;de++)v(D.location+de,re/D.locationSize,V,K,re*ne,re/D.locationSize*de*ne,ue)}}else if(G!==void 0){const K=G[ee];if(K!==void 0)switch(K.length){case 2:t.vertexAttrib2fv(D.location,K);break;case 3:t.vertexAttrib3fv(D.location,K);break;case 4:t.vertexAttrib4fv(D.location,K);break;default:t.vertexAttrib1fv(D.location,K)}}}}x()}function L(){P();for(const S in i){const E=i[S];for(const W in E){const B=E[W];for(const $ in B)d(B[$].object),delete B[$];delete E[W]}delete i[S]}}function b(S){if(i[S.id]===void 0)return;const E=i[S.id];for(const W in E){const B=E[W];for(const $ in B)d(B[$].object),delete B[$];delete E[W]}delete i[S.id]}function A(S){for(const E in i){const W=i[E];if(W[S.id]===void 0)continue;const B=W[S.id];for(const $ in B)d(B[$].object),delete B[$];delete W[S.id]}}function P(){Y(),o=!0,s!==r&&(s=r,c(s.object))}function Y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:P,resetDefaultState:Y,dispose:L,releaseStatesOfGeometry:b,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:g,disableUnusedAttributes:x}}function Xw(t,e,n){let i;function r(c){i=c}function s(c,d){t.drawArrays(i,c,d),n.update(d,i,1)}function o(c,d,f){f!==0&&(t.drawArraysInstanced(i,c,d,f),n.update(d,i,f))}function a(c,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,f);let p=0;for(let _=0;_<f;_++)p+=d[_];n.update(p,i,1)}function l(c,d,f,h){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)o(c[_],d[_],h[_]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,d,0,h,0,f);let _=0;for(let y=0;y<f;y++)_+=d[y];for(let y=0;y<h.length;y++)n.update(_,i,h[y])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function $w(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==Gn&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const P=A===$o&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Mi&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==pi&&!P)}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const f=n.logarithmicDepthBuffer===!0,h=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(h===!0){const A=e.get("EXT_clip_control");A.clipControlEXT(A.LOWER_LEFT_EXT,A.ZERO_TO_ONE_EXT)}const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),u=t.getParameter(t.MAX_VERTEX_ATTRIBS),x=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),v=t.getParameter(t.MAX_VARYING_VECTORS),w=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),L=_>0,b=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:y,maxCubemapSize:g,maxAttributes:u,maxVertexUniforms:x,maxVaryings:v,maxFragmentUniforms:w,vertexTextures:L,maxSamples:b}}function Yw(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Fi,a=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||r;return r=h,i=f.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){n=d(f,h,0)},this.setState=function(f,h,p){const _=f.clippingPlanes,y=f.clipIntersection,g=f.clipShadows,u=t.get(f);if(!r||_===null||_.length===0||s&&!g)s?d(null):c();else{const x=s?0:i,v=x*4;let w=u.clippingState||null;l.value=w,w=d(_,h,v,p);for(let L=0;L!==v;++L)w[L]=n[L];u.clippingState=w,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,h,p,_){const y=f!==null?f.length:0;let g=null;if(y!==0){if(g=l.value,_!==!0||g===null){const u=p+y*4,x=h.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<u)&&(g=new Float32Array(u));for(let v=0,w=p;v!==y;++v,w+=4)o.copy(f[v]).applyMatrix4(x,a),o.normal.toArray(g,w),g[w+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}function qw(t){let e=new WeakMap;function n(o,a){return a===Rd?o.mapping=Us:a===Pd&&(o.mapping=Fs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Rd||a===Pd)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new oM(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Kw extends Iv{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const ps=4,dm=[.125,.215,.35,.446,.526,.582],vr=20,fu=new Kw,hm=new tt;let pu=null,mu=0,gu=0,_u=!1;const mr=(1+Math.sqrt(5))/2,es=1/mr,fm=[new k(-mr,es,0),new k(mr,es,0),new k(-es,0,mr),new k(es,0,mr),new k(0,mr,-es),new k(0,mr,es),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)];class pm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){pu=this._renderer.getRenderTarget(),mu=this._renderer.getActiveCubeFace(),gu=this._renderer.getActiveMipmapLevel(),_u=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_m(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(pu,mu,gu),this._renderer.xr.enabled=_u,e.scissorTest=!1,Oa(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Us||e.mapping===Fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pu=this._renderer.getRenderTarget(),mu=this._renderer.getActiveCubeFace(),gu=this._renderer.getActiveMipmapLevel(),_u=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Hn,minFilter:Hn,generateMipmaps:!1,type:$o,format:Gn,colorSpace:sr,depthBuffer:!1},r=mm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mm(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zw(s)),this._blurMaterial=Qw(s,e,n)}return r}_compileMaterial(e){const n=new gi(this._lodPlanes[0],e);this._renderer.compile(n,fu)}_sceneToCubeUV(e,n,i,r){const a=new An(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(hm),d.toneMapping=Zi,d.autoClear=!1;const p=new Pv({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),_=new gi(new Qo,p);let y=!1;const g=e.background;g?g.isColor&&(p.color.copy(g),e.background=null,y=!0):(p.color.copy(hm),y=!0);for(let u=0;u<6;u++){const x=u%3;x===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):x===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));const v=this._cubeSize;Oa(r,x*v,u>2?v:0,v,v),d.setRenderTarget(r),y&&d.render(_,a),d.render(e,a)}_.geometry.dispose(),_.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Us||e.mapping===Fs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=_m()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gm());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new gi(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Oa(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,fu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=fm[(r-s-1)%fm.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,f=new gi(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*vr-1),y=s/_,g=isFinite(s)?1+Math.floor(d*y):vr;g>vr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${vr}`);const u=[];let x=0;for(let A=0;A<vr;++A){const P=A/y,Y=Math.exp(-P*P/2);u.push(Y),A===0?x+=Y:A<g&&(x+=2*Y)}for(let A=0;A<u.length;A++)u[A]=u[A]/x;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=u,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:v}=this;h.dTheta.value=_,h.mipInt.value=v-i;const w=this._sizeLods[r],L=3*w*(r>v-ps?r-v+ps:0),b=4*(this._cubeSize-w);Oa(n,L,b,3*w,2*w),l.setRenderTarget(n),l.render(f,fu)}}function Zw(t){const e=[],n=[],i=[];let r=t;const s=t-ps+1+dm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-ps?l=dm[o-t+ps-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),d=-c,f=1+c,h=[d,d,f,d,f,f,d,d,f,f,d,f],p=6,_=6,y=3,g=2,u=1,x=new Float32Array(y*_*p),v=new Float32Array(g*_*p),w=new Float32Array(u*_*p);for(let b=0;b<p;b++){const A=b%3*2/3-1,P=b>2?0:-1,Y=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];x.set(Y,y*_*b),v.set(h,g*_*b);const S=[b,b,b,b,b,b];w.set(S,u*_*b)}const L=new Pn;L.setAttribute("position",new sn(x,y)),L.setAttribute("uv",new sn(v,g)),L.setAttribute("faceIndex",new sn(w,u)),e.push(L),r>ps&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function mm(t,e,n){const i=new Ir(t,e,n);return i.texture.mapping=lc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Oa(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function Qw(t,e,n){const i=new Float32Array(vr),r=new k(0,1,0);return new wi({name:"SphericalGaussianBlur",defines:{n:vr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:vf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function gm(){return new wi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function _m(){return new wi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function vf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Jw(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Rd||l===Pd,d=l===Us||l===Fs;if(c||d){let f=e.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return n===null&&(n=new pm(t)),f=c?n.fromEquirectangular(a,f):n.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const p=a.image;return c&&p&&p.height>0||d&&p&&r(p)?(n===null&&(n=new pm(t)),f=c?n.fromEquirectangular(a):n.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function eT(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&ul("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function tT(t,e,n,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);for(const _ in h.morphAttributes){const y=h.morphAttributes[_];for(let g=0,u=y.length;g<u;g++)e.remove(y[g])}h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function l(f){const h=f.attributes;for(const _ in h)e.update(h[_],t.ARRAY_BUFFER);const p=f.morphAttributes;for(const _ in p){const y=p[_];for(let g=0,u=y.length;g<u;g++)e.update(y[g],t.ARRAY_BUFFER)}}function c(f){const h=[],p=f.index,_=f.attributes.position;let y=0;if(p!==null){const x=p.array;y=p.version;for(let v=0,w=x.length;v<w;v+=3){const L=x[v+0],b=x[v+1],A=x[v+2];h.push(L,b,b,A,A,L)}}else if(_!==void 0){const x=_.array;y=_.version;for(let v=0,w=x.length/3-1;v<w;v+=3){const L=v+0,b=v+1,A=v+2;h.push(L,b,b,A,A,L)}}else return;const g=new(Av(h)?Nv:Lv)(h,1);g.version=y;const u=s.get(f);u&&e.remove(u),s.set(f,g)}function d(f){const h=s.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:d}}function nT(t,e,n){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,p){t.drawElements(i,p,s,h*o),n.update(p,i,1)}function c(h,p,_){_!==0&&(t.drawElementsInstanced(i,p,s,h*o,_),n.update(p,i,_))}function d(h,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,_);let g=0;for(let u=0;u<_;u++)g+=p[u];n.update(g,i,1)}function f(h,p,_,y){if(_===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let u=0;u<h.length;u++)c(h[u]/o,p[u],y[u]);else{g.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,y,0,_);let u=0;for(let x=0;x<_;x++)u+=p[x];for(let x=0;x<y.length;x++)n.update(u,i,y[x])}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=f}function iT(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function rT(t,e,n){const i=new WeakMap,r=new Mt;function s(o,a,l){const c=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=d!==void 0?d.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let Y=function(){A.dispose(),i.delete(a),a.removeEventListener("dispose",Y)};h!==void 0&&h.texture.dispose();const p=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],u=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let v=0;p===!0&&(v=1),_===!0&&(v=2),y===!0&&(v=3);let w=a.attributes.position.count*v,L=1;w>e.maxTextureSize&&(L=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const b=new Float32Array(w*L*4*f),A=new Cv(b,w,L,f);A.type=pi,A.needsUpdate=!0;const P=v*4;for(let S=0;S<f;S++){const E=g[S],W=u[S],B=x[S],$=w*L*4*S;for(let J=0;J<E.count;J++){const G=J*P;p===!0&&(r.fromBufferAttribute(E,J),b[$+G+0]=r.x,b[$+G+1]=r.y,b[$+G+2]=r.z,b[$+G+3]=0),_===!0&&(r.fromBufferAttribute(W,J),b[$+G+4]=r.x,b[$+G+5]=r.y,b[$+G+6]=r.z,b[$+G+7]=0),y===!0&&(r.fromBufferAttribute(B,J),b[$+G+8]=r.x,b[$+G+9]=r.y,b[$+G+10]=r.z,b[$+G+11]=B.itemSize===4?r.w:1)}}h={count:f,texture:A,size:new He(w,L)},i.set(a,h),a.addEventListener("dispose",Y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let p=0;for(let y=0;y<c.length;y++)p+=c[y];const _=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(t,"morphTargetBaseInfluence",_),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:s}}function sT(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,d=l.geometry,f=e.get(l,d);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class kv extends un{constructor(e,n,i,r,s,o,a,l,c,d=Es){if(d!==Es&&d!==ks)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Es&&(i=Dr),i===void 0&&d===ks&&(i=Os),super(null,r,s,o,a,l,d,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:Cn,this.minFilter=l!==void 0?l:Cn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const zv=new un,vm=new kv(1,1),Bv=new Cv,Hv=new jS,Vv=new Uv,xm=[],ym=[],Sm=new Float32Array(16),Mm=new Float32Array(9),Em=new Float32Array(4);function js(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=xm[r];if(s===void 0&&(s=new Float32Array(r),xm[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Pt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Lt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function dc(t,e){let n=ym[e];n===void 0&&(n=new Int32Array(e),ym[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function oT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function aT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Pt(n,e))return;t.uniform2fv(this.addr,e),Lt(n,e)}}function lT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Pt(n,e))return;t.uniform3fv(this.addr,e),Lt(n,e)}}function cT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Pt(n,e))return;t.uniform4fv(this.addr,e),Lt(n,e)}}function uT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Pt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Lt(n,e)}else{if(Pt(n,i))return;Em.set(i),t.uniformMatrix2fv(this.addr,!1,Em),Lt(n,i)}}function dT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Pt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Lt(n,e)}else{if(Pt(n,i))return;Mm.set(i),t.uniformMatrix3fv(this.addr,!1,Mm),Lt(n,i)}}function hT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Pt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Lt(n,e)}else{if(Pt(n,i))return;Sm.set(i),t.uniformMatrix4fv(this.addr,!1,Sm),Lt(n,i)}}function fT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function pT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Pt(n,e))return;t.uniform2iv(this.addr,e),Lt(n,e)}}function mT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Pt(n,e))return;t.uniform3iv(this.addr,e),Lt(n,e)}}function gT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Pt(n,e))return;t.uniform4iv(this.addr,e),Lt(n,e)}}function _T(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function vT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Pt(n,e))return;t.uniform2uiv(this.addr,e),Lt(n,e)}}function xT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Pt(n,e))return;t.uniform3uiv(this.addr,e),Lt(n,e)}}function yT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Pt(n,e))return;t.uniform4uiv(this.addr,e),Lt(n,e)}}function ST(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(vm.compareFunction=Tv,s=vm):s=zv,n.setTexture2D(e||s,r)}function MT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Hv,r)}function ET(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Vv,r)}function wT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Bv,r)}function TT(t){switch(t){case 5126:return oT;case 35664:return aT;case 35665:return lT;case 35666:return cT;case 35674:return uT;case 35675:return dT;case 35676:return hT;case 5124:case 35670:return fT;case 35667:case 35671:return pT;case 35668:case 35672:return mT;case 35669:case 35673:return gT;case 5125:return _T;case 36294:return vT;case 36295:return xT;case 36296:return yT;case 35678:case 36198:case 36298:case 36306:case 35682:return ST;case 35679:case 36299:case 36307:return MT;case 35680:case 36300:case 36308:case 36293:return ET;case 36289:case 36303:case 36311:case 36292:return wT}}function AT(t,e){t.uniform1fv(this.addr,e)}function bT(t,e){const n=js(e,this.size,2);t.uniform2fv(this.addr,n)}function CT(t,e){const n=js(e,this.size,3);t.uniform3fv(this.addr,n)}function RT(t,e){const n=js(e,this.size,4);t.uniform4fv(this.addr,n)}function PT(t,e){const n=js(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function LT(t,e){const n=js(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function NT(t,e){const n=js(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function DT(t,e){t.uniform1iv(this.addr,e)}function IT(t,e){t.uniform2iv(this.addr,e)}function UT(t,e){t.uniform3iv(this.addr,e)}function FT(t,e){t.uniform4iv(this.addr,e)}function OT(t,e){t.uniform1uiv(this.addr,e)}function kT(t,e){t.uniform2uiv(this.addr,e)}function zT(t,e){t.uniform3uiv(this.addr,e)}function BT(t,e){t.uniform4uiv(this.addr,e)}function HT(t,e,n){const i=this.cache,r=e.length,s=dc(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||zv,s[o])}function VT(t,e,n){const i=this.cache,r=e.length,s=dc(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Hv,s[o])}function GT(t,e,n){const i=this.cache,r=e.length,s=dc(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Vv,s[o])}function jT(t,e,n){const i=this.cache,r=e.length,s=dc(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||Bv,s[o])}function WT(t){switch(t){case 5126:return AT;case 35664:return bT;case 35665:return CT;case 35666:return RT;case 35674:return PT;case 35675:return LT;case 35676:return NT;case 5124:case 35670:return DT;case 35667:case 35671:return IT;case 35668:case 35672:return UT;case 35669:case 35673:return FT;case 5125:return OT;case 36294:return kT;case 36295:return zT;case 36296:return BT;case 35678:case 36198:case 36298:case 36306:case 35682:return HT;case 35679:case 36299:case 36307:return VT;case 35680:case 36300:case 36308:case 36293:return GT;case 36289:case 36303:case 36311:case 36292:return jT}}class XT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=TT(n.type)}}class $T{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=WT(n.type)}}class YT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const vu=/(\w+)(\])?(\[|\.)?/g;function wm(t,e){t.seq.push(e),t.map[e.id]=e}function qT(t,e,n){const i=t.name,r=i.length;for(vu.lastIndex=0;;){const s=vu.exec(i),o=vu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){wm(n,c===void 0?new XT(a,t,e):new $T(a,t,e));break}else{let f=n.map[a];f===void 0&&(f=new YT(a),wm(n,f)),n=f}}}class dl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);qT(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function Tm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const KT=37297;let ZT=0;function QT(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function JT(t){const e=et.getPrimaries(et.workingColorSpace),n=et.getPrimaries(t);let i;switch(e===n?i="":e===Bl&&n===zl?i="LinearDisplayP3ToLinearSRGB":e===zl&&n===Bl&&(i="LinearSRGBToLinearDisplayP3"),t){case sr:case cc:return[i,"LinearTransferOETF"];case Zn:case gf:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function Am(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+QT(t.getShaderSource(e),o)}else return r}function e1(t,e){const n=JT(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function t1(t,e){let n;switch(e){case pS:n="Linear";break;case mS:n="Reinhard";break;case gS:n="Cineon";break;case _S:n="ACESFilmic";break;case xS:n="AgX";break;case yS:n="Neutral";break;case vS:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const ka=new k;function n1(){et.getLuminanceCoefficients(ka);const t=ka.x.toFixed(4),e=ka.y.toFixed(4),n=ka.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function i1(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fo).join(`
`)}function r1(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function s1(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function fo(t){return t!==""}function bm(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Cm(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const o1=/^[ \t]*#include +<([\w\d./]+)>/gm;function oh(t){return t.replace(o1,l1)}const a1=new Map;function l1(t,e){let n=ke[e];if(n===void 0){const i=a1.get(e);if(i!==void 0)n=ke[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return oh(n)}const c1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rm(t){return t.replace(c1,u1)}function u1(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Pm(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function d1(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===hv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===$y?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===li&&(e="SHADOWMAP_TYPE_VSM"),e}function h1(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Us:case Fs:e="ENVMAP_TYPE_CUBE";break;case lc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function f1(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Fs:e="ENVMAP_MODE_REFRACTION";break}return e}function p1(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case fv:e="ENVMAP_BLENDING_MULTIPLY";break;case hS:e="ENVMAP_BLENDING_MIX";break;case fS:e="ENVMAP_BLENDING_ADD";break}return e}function m1(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function g1(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=d1(n),c=h1(n),d=f1(n),f=p1(n),h=m1(n),p=i1(n),_=r1(s),y=r.createProgram();let g,u,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(fo).join(`
`),g.length>0&&(g+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(fo).join(`
`),u.length>0&&(u+=`
`)):(g=[Pm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fo).join(`
`),u=[Pm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Zi?"#define TONE_MAPPING":"",n.toneMapping!==Zi?ke.tonemapping_pars_fragment:"",n.toneMapping!==Zi?t1("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,e1("linearToOutputTexel",n.outputColorSpace),n1(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(fo).join(`
`)),o=oh(o),o=bm(o,n),o=Cm(o,n),a=oh(a),a=bm(a,n),a=Cm(a,n),o=Rm(o),a=Rm(a),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,u=["#define varying in",n.glslVersion===$p?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===$p?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const v=x+g+o,w=x+u+a,L=Tm(r,r.VERTEX_SHADER,v),b=Tm(r,r.FRAGMENT_SHADER,w);r.attachShader(y,L),r.attachShader(y,b),n.index0AttributeName!==void 0?r.bindAttribLocation(y,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function A(E){if(t.debug.checkShaderErrors){const W=r.getProgramInfoLog(y).trim(),B=r.getShaderInfoLog(L).trim(),$=r.getShaderInfoLog(b).trim();let J=!0,G=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(J=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,y,L,b);else{const ee=Am(r,L,"vertex"),D=Am(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+W+`
`+ee+`
`+D)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(B===""||$==="")&&(G=!1);G&&(E.diagnostics={runnable:J,programLog:W,vertexShader:{log:B,prefix:g},fragmentShader:{log:$,prefix:u}})}r.deleteShader(L),r.deleteShader(b),P=new dl(r,y),Y=s1(r,y)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let Y;this.getAttributes=function(){return Y===void 0&&A(this),Y};let S=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(y,KT)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=ZT++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=L,this.fragmentShader=b,this}let _1=0;class v1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new x1(e),n.set(e,i)),i}}class x1{constructor(e){this.id=_1++,this.code=e,this.usedTimes=0}}function y1(t,e,n,i,r,s,o){const a=new _f,l=new v1,c=new Set,d=[],f=r.logarithmicDepthBuffer,h=r.reverseDepthBuffer,p=r.vertexTextures;let _=r.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function u(S,E,W,B,$){const J=B.fog,G=$.geometry,ee=S.isMeshStandardMaterial?B.environment:null,D=(S.isMeshStandardMaterial?n:e).get(S.envMap||ee),Z=D&&D.mapping===lc?D.image.height:null,K=y[S.type];S.precision!==null&&(_=r.getMaxPrecision(S.precision),_!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",_,"instead."));const re=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Ee=re!==void 0?re.length:0;let Be=0;G.morphAttributes.position!==void 0&&(Be=1),G.morphAttributes.normal!==void 0&&(Be=2),G.morphAttributes.color!==void 0&&(Be=3);let V,ne,ue,de;if(K){const Jt=Qn[K];V=Jt.vertexShader,ne=Jt.fragmentShader}else V=S.vertexShader,ne=S.fragmentShader,l.update(S),ue=l.getVertexShaderID(S),de=l.getFragmentShaderID(S);const Fe=t.getRenderTarget(),Ce=$.isInstancedMesh===!0,We=$.isBatchedMesh===!0,Ze=!!S.map,Xe=!!S.matcap,N=!!D,_t=!!S.aoMap,Ge=!!S.lightMap,$e=!!S.bumpMap,Le=!!S.normalMap,nt=!!S.displacementMap,Ne=!!S.emissiveMap,C=!!S.metalnessMap,M=!!S.roughnessMap,R=S.anisotropy>0,O=S.clearcoat>0,j=S.dispersion>0,X=S.iridescence>0,he=S.sheen>0,se=S.transmission>0,ae=R&&!!S.anisotropyMap,xe=O&&!!S.clearcoatMap,te=O&&!!S.clearcoatNormalMap,le=O&&!!S.clearcoatRoughnessMap,Se=X&&!!S.iridescenceMap,be=X&&!!S.iridescenceThicknessMap,fe=he&&!!S.sheenColorMap,Oe=he&&!!S.sheenRoughnessMap,Re=!!S.specularMap,it=!!S.specularColorMap,I=!!S.specularIntensityMap,ge=se&&!!S.transmissionMap,q=se&&!!S.thicknessMap,Q=!!S.gradientMap,pe=!!S.alphaMap,_e=S.alphaTest>0,Ye=!!S.alphaHash,Et=!!S.extensions;let Qt=Zi;S.toneMapped&&(Fe===null||Fe.isXRRenderTarget===!0)&&(Qt=t.toneMapping);const Ke={shaderID:K,shaderType:S.type,shaderName:S.name,vertexShader:V,fragmentShader:ne,defines:S.defines,customVertexShaderID:ue,customFragmentShaderID:de,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:_,batching:We,batchingColor:We&&$._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&$.instanceColor!==null,instancingMorph:Ce&&$.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:Fe===null?t.outputColorSpace:Fe.isXRRenderTarget===!0?Fe.texture.colorSpace:sr,alphaToCoverage:!!S.alphaToCoverage,map:Ze,matcap:Xe,envMap:N,envMapMode:N&&D.mapping,envMapCubeUVHeight:Z,aoMap:_t,lightMap:Ge,bumpMap:$e,normalMap:Le,displacementMap:p&&nt,emissiveMap:Ne,normalMapObjectSpace:Le&&S.normalMapType===TS,normalMapTangentSpace:Le&&S.normalMapType===wS,metalnessMap:C,roughnessMap:M,anisotropy:R,anisotropyMap:ae,clearcoat:O,clearcoatMap:xe,clearcoatNormalMap:te,clearcoatRoughnessMap:le,dispersion:j,iridescence:X,iridescenceMap:Se,iridescenceThicknessMap:be,sheen:he,sheenColorMap:fe,sheenRoughnessMap:Oe,specularMap:Re,specularColorMap:it,specularIntensityMap:I,transmission:se,transmissionMap:ge,thicknessMap:q,gradientMap:Q,opaque:S.transparent===!1&&S.blending===Ms&&S.alphaToCoverage===!1,alphaMap:pe,alphaTest:_e,alphaHash:Ye,combine:S.combine,mapUv:Ze&&g(S.map.channel),aoMapUv:_t&&g(S.aoMap.channel),lightMapUv:Ge&&g(S.lightMap.channel),bumpMapUv:$e&&g(S.bumpMap.channel),normalMapUv:Le&&g(S.normalMap.channel),displacementMapUv:nt&&g(S.displacementMap.channel),emissiveMapUv:Ne&&g(S.emissiveMap.channel),metalnessMapUv:C&&g(S.metalnessMap.channel),roughnessMapUv:M&&g(S.roughnessMap.channel),anisotropyMapUv:ae&&g(S.anisotropyMap.channel),clearcoatMapUv:xe&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:te&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:be&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&g(S.sheenRoughnessMap.channel),specularMapUv:Re&&g(S.specularMap.channel),specularColorMapUv:it&&g(S.specularColorMap.channel),specularIntensityMapUv:I&&g(S.specularIntensityMap.channel),transmissionMapUv:ge&&g(S.transmissionMap.channel),thicknessMapUv:q&&g(S.thicknessMap.channel),alphaMapUv:pe&&g(S.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Le||R),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:$.isPoints===!0&&!!G.attributes.uv&&(Ze||pe),fog:!!J,useFog:S.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:h,skinning:$.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Be,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:t.shadowMap.enabled&&W.length>0,shadowMapType:t.shadowMap.type,toneMapping:Qt,decodeVideoTexture:Ze&&S.map.isVideoTexture===!0&&et.getTransfer(S.map.colorSpace)===ut,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===di,flipSided:S.side===cn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Et&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Et&&S.extensions.multiDraw===!0||We)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ke.vertexUv1s=c.has(1),Ke.vertexUv2s=c.has(2),Ke.vertexUv3s=c.has(3),c.clear(),Ke}function x(S){const E=[];if(S.shaderID?E.push(S.shaderID):(E.push(S.customVertexShaderID),E.push(S.customFragmentShaderID)),S.defines!==void 0)for(const W in S.defines)E.push(W),E.push(S.defines[W]);return S.isRawShaderMaterial===!1&&(v(E,S),w(E,S),E.push(t.outputColorSpace)),E.push(S.customProgramCacheKey),E.join()}function v(S,E){S.push(E.precision),S.push(E.outputColorSpace),S.push(E.envMapMode),S.push(E.envMapCubeUVHeight),S.push(E.mapUv),S.push(E.alphaMapUv),S.push(E.lightMapUv),S.push(E.aoMapUv),S.push(E.bumpMapUv),S.push(E.normalMapUv),S.push(E.displacementMapUv),S.push(E.emissiveMapUv),S.push(E.metalnessMapUv),S.push(E.roughnessMapUv),S.push(E.anisotropyMapUv),S.push(E.clearcoatMapUv),S.push(E.clearcoatNormalMapUv),S.push(E.clearcoatRoughnessMapUv),S.push(E.iridescenceMapUv),S.push(E.iridescenceThicknessMapUv),S.push(E.sheenColorMapUv),S.push(E.sheenRoughnessMapUv),S.push(E.specularMapUv),S.push(E.specularColorMapUv),S.push(E.specularIntensityMapUv),S.push(E.transmissionMapUv),S.push(E.thicknessMapUv),S.push(E.combine),S.push(E.fogExp2),S.push(E.sizeAttenuation),S.push(E.morphTargetsCount),S.push(E.morphAttributeCount),S.push(E.numDirLights),S.push(E.numPointLights),S.push(E.numSpotLights),S.push(E.numSpotLightMaps),S.push(E.numHemiLights),S.push(E.numRectAreaLights),S.push(E.numDirLightShadows),S.push(E.numPointLightShadows),S.push(E.numSpotLightShadows),S.push(E.numSpotLightShadowsWithMaps),S.push(E.numLightProbes),S.push(E.shadowMapType),S.push(E.toneMapping),S.push(E.numClippingPlanes),S.push(E.numClipIntersection),S.push(E.depthPacking)}function w(S,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reverseDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.alphaToCoverage&&a.enable(20),S.push(a.mask)}function L(S){const E=y[S.type];let W;if(E){const B=Qn[E];W=nM.clone(B.uniforms)}else W=S.uniforms;return W}function b(S,E){let W;for(let B=0,$=d.length;B<$;B++){const J=d[B];if(J.cacheKey===E){W=J,++W.usedTimes;break}}return W===void 0&&(W=new g1(t,E,S,s),d.push(W)),W}function A(S){if(--S.usedTimes===0){const E=d.indexOf(S);d[E]=d[d.length-1],d.pop(),S.destroy()}}function P(S){l.remove(S)}function Y(){l.dispose()}return{getParameters:u,getProgramCacheKey:x,getUniforms:L,acquireProgram:b,releaseProgram:A,releaseShaderCache:P,programs:d,dispose:Y}}function S1(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function M1(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Lm(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Nm(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(f,h,p,_,y,g){let u=t[e];return u===void 0?(u={id:f.id,object:f,geometry:h,material:p,groupOrder:_,renderOrder:f.renderOrder,z:y,group:g},t[e]=u):(u.id=f.id,u.object=f,u.geometry=h,u.material=p,u.groupOrder=_,u.renderOrder=f.renderOrder,u.z=y,u.group=g),e++,u}function a(f,h,p,_,y,g){const u=o(f,h,p,_,y,g);p.transmission>0?i.push(u):p.transparent===!0?r.push(u):n.push(u)}function l(f,h,p,_,y,g){const u=o(f,h,p,_,y,g);p.transmission>0?i.unshift(u):p.transparent===!0?r.unshift(u):n.unshift(u)}function c(f,h){n.length>1&&n.sort(f||M1),i.length>1&&i.sort(h||Lm),r.length>1&&r.sort(h||Lm)}function d(){for(let f=e,h=t.length;f<h;f++){const p=t[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:d,sort:c}}function E1(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new Nm,t.set(i,[o])):r>=s.length?(o=new Nm,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function w1(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new k,color:new tt};break;case"SpotLight":n={position:new k,direction:new k,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new k,color:new tt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new k,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":n={color:new tt,position:new k,halfWidth:new k,halfHeight:new k};break}return t[e.id]=n,n}}}function T1(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let A1=0;function b1(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function C1(t){const e=new w1,n=T1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);const r=new k,s=new mt,o=new mt;function a(c){let d=0,f=0,h=0;for(let Y=0;Y<9;Y++)i.probe[Y].set(0,0,0);let p=0,_=0,y=0,g=0,u=0,x=0,v=0,w=0,L=0,b=0,A=0;c.sort(b1);for(let Y=0,S=c.length;Y<S;Y++){const E=c[Y],W=E.color,B=E.intensity,$=E.distance,J=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)d+=W.r*B,f+=W.g*B,h+=W.b*B;else if(E.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(E.sh.coefficients[G],B);A++}else if(E.isDirectionalLight){const G=e.get(E);if(G.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){const ee=E.shadow,D=n.get(E);D.shadowIntensity=ee.intensity,D.shadowBias=ee.bias,D.shadowNormalBias=ee.normalBias,D.shadowRadius=ee.radius,D.shadowMapSize=ee.mapSize,i.directionalShadow[p]=D,i.directionalShadowMap[p]=J,i.directionalShadowMatrix[p]=E.shadow.matrix,x++}i.directional[p]=G,p++}else if(E.isSpotLight){const G=e.get(E);G.position.setFromMatrixPosition(E.matrixWorld),G.color.copy(W).multiplyScalar(B),G.distance=$,G.coneCos=Math.cos(E.angle),G.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),G.decay=E.decay,i.spot[y]=G;const ee=E.shadow;if(E.map&&(i.spotLightMap[L]=E.map,L++,ee.updateMatrices(E),E.castShadow&&b++),i.spotLightMatrix[y]=ee.matrix,E.castShadow){const D=n.get(E);D.shadowIntensity=ee.intensity,D.shadowBias=ee.bias,D.shadowNormalBias=ee.normalBias,D.shadowRadius=ee.radius,D.shadowMapSize=ee.mapSize,i.spotShadow[y]=D,i.spotShadowMap[y]=J,w++}y++}else if(E.isRectAreaLight){const G=e.get(E);G.color.copy(W).multiplyScalar(B),G.halfWidth.set(E.width*.5,0,0),G.halfHeight.set(0,E.height*.5,0),i.rectArea[g]=G,g++}else if(E.isPointLight){const G=e.get(E);if(G.color.copy(E.color).multiplyScalar(E.intensity),G.distance=E.distance,G.decay=E.decay,E.castShadow){const ee=E.shadow,D=n.get(E);D.shadowIntensity=ee.intensity,D.shadowBias=ee.bias,D.shadowNormalBias=ee.normalBias,D.shadowRadius=ee.radius,D.shadowMapSize=ee.mapSize,D.shadowCameraNear=ee.camera.near,D.shadowCameraFar=ee.camera.far,i.pointShadow[_]=D,i.pointShadowMap[_]=J,i.pointShadowMatrix[_]=E.shadow.matrix,v++}i.point[_]=G,_++}else if(E.isHemisphereLight){const G=e.get(E);G.skyColor.copy(E.color).multiplyScalar(B),G.groundColor.copy(E.groundColor).multiplyScalar(B),i.hemi[u]=G,u++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=h;const P=i.hash;(P.directionalLength!==p||P.pointLength!==_||P.spotLength!==y||P.rectAreaLength!==g||P.hemiLength!==u||P.numDirectionalShadows!==x||P.numPointShadows!==v||P.numSpotShadows!==w||P.numSpotMaps!==L||P.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=y,i.rectArea.length=g,i.point.length=_,i.hemi.length=u,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=w+L-b,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=A,P.directionalLength=p,P.pointLength=_,P.spotLength=y,P.rectAreaLength=g,P.hemiLength=u,P.numDirectionalShadows=x,P.numPointShadows=v,P.numSpotShadows=w,P.numSpotMaps=L,P.numLightProbes=A,i.version=A1++)}function l(c,d){let f=0,h=0,p=0,_=0,y=0;const g=d.matrixWorldInverse;for(let u=0,x=c.length;u<x;u++){const v=c[u];if(v.isDirectionalLight){const w=i.directional[f];w.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(g),f++}else if(v.isSpotLight){const w=i.spot[p];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(g),p++}else if(v.isRectAreaLight){const w=i.rectArea[_];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(g),o.identity(),s.copy(v.matrixWorld),s.premultiply(g),o.extractRotation(s),w.halfWidth.set(v.width*.5,0,0),w.halfHeight.set(0,v.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){const w=i.point[h];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(g),h++}else if(v.isHemisphereLight){const w=i.hemi[y];w.direction.setFromMatrixPosition(v.matrixWorld),w.direction.transformDirection(g),y++}}}return{setup:a,setupView:l,state:i}}function Dm(t){const e=new C1(t),n=[],i=[];function r(d){c.camera=d,n.length=0,i.length=0}function s(d){n.push(d)}function o(d){i.push(d)}function a(){e.setup(n)}function l(d){e.setupView(n,d)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function R1(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Dm(t),e.set(r,[a])):s>=o.length?(a=new Dm(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class P1 extends Gs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=MS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class L1 extends Gs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const N1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,D1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function I1(t,e,n){let i=new Fv;const r=new He,s=new He,o=new Mt,a=new P1({depthPacking:ES}),l=new L1,c={},d=n.maxTextureSize,f={[er]:cn,[cn]:er,[di]:di},h=new wi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:N1,fragmentShader:D1}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const _=new Pn;_.setAttribute("position",new sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new gi(_,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hv;let u=this.type;this.render=function(b,A,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;const Y=t.getRenderTarget(),S=t.getActiveCubeFace(),E=t.getActiveMipmapLevel(),W=t.state;W.setBlending(Ki),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const B=u!==li&&this.type===li,$=u===li&&this.type!==li;for(let J=0,G=b.length;J<G;J++){const ee=b[J],D=ee.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const Z=D.getFrameExtents();if(r.multiply(Z),s.copy(D.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/Z.x),r.x=s.x*Z.x,D.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/Z.y),r.y=s.y*Z.y,D.mapSize.y=s.y)),D.map===null||B===!0||$===!0){const re=this.type!==li?{minFilter:Cn,magFilter:Cn}:{};D.map!==null&&D.map.dispose(),D.map=new Ir(r.x,r.y,re),D.map.texture.name=ee.name+".shadowMap",D.camera.updateProjectionMatrix()}t.setRenderTarget(D.map),t.clear();const K=D.getViewportCount();for(let re=0;re<K;re++){const Ee=D.getViewport(re);o.set(s.x*Ee.x,s.y*Ee.y,s.x*Ee.z,s.y*Ee.w),W.viewport(o),D.updateMatrices(ee,re),i=D.getFrustum(),w(A,P,D.camera,ee,this.type)}D.isPointLightShadow!==!0&&this.type===li&&x(D,P),D.needsUpdate=!1}u=this.type,g.needsUpdate=!1,t.setRenderTarget(Y,S,E)};function x(b,A){const P=e.update(y);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Ir(r.x,r.y)),h.uniforms.shadow_pass.value=b.map.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,t.setRenderTarget(b.mapPass),t.clear(),t.renderBufferDirect(A,null,P,h,y,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,t.setRenderTarget(b.map),t.clear(),t.renderBufferDirect(A,null,P,p,y,null)}function v(b,A,P,Y){let S=null;const E=P.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(E!==void 0)S=E;else if(S=P.isPointLight===!0?l:a,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const W=S.uuid,B=A.uuid;let $=c[W];$===void 0&&($={},c[W]=$);let J=$[B];J===void 0&&(J=S.clone(),$[B]=J,A.addEventListener("dispose",L)),S=J}if(S.visible=A.visible,S.wireframe=A.wireframe,Y===li?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:f[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,P.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const W=t.properties.get(S);W.light=P}return S}function w(b,A,P,Y,S){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&S===li)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,b.matrixWorld);const B=e.update(b),$=b.material;if(Array.isArray($)){const J=B.groups;for(let G=0,ee=J.length;G<ee;G++){const D=J[G],Z=$[D.materialIndex];if(Z&&Z.visible){const K=v(b,Z,Y,S);b.onBeforeShadow(t,b,A,P,B,K,D),t.renderBufferDirect(P,null,B,K,b,D),b.onAfterShadow(t,b,A,P,B,K,D)}}}else if($.visible){const J=v(b,$,Y,S);b.onBeforeShadow(t,b,A,P,B,J,null),t.renderBufferDirect(P,null,B,J,b,null),b.onAfterShadow(t,b,A,P,B,J,null)}}const W=b.children;for(let B=0,$=W.length;B<$;B++)w(W[B],A,P,Y,S)}function L(b){b.target.removeEventListener("dispose",L);for(const P in c){const Y=c[P],S=b.target.uuid;S in Y&&(Y[S].dispose(),delete Y[S])}}}const U1={[Md]:Ed,[wd]:bd,[Td]:Cd,[Is]:Ad,[Ed]:Md,[bd]:wd,[Cd]:Td,[Ad]:Is};function F1(t){function e(){let I=!1;const ge=new Mt;let q=null;const Q=new Mt(0,0,0,0);return{setMask:function(pe){q!==pe&&!I&&(t.colorMask(pe,pe,pe,pe),q=pe)},setLocked:function(pe){I=pe},setClear:function(pe,_e,Ye,Et,Qt){Qt===!0&&(pe*=Et,_e*=Et,Ye*=Et),ge.set(pe,_e,Ye,Et),Q.equals(ge)===!1&&(t.clearColor(pe,_e,Ye,Et),Q.copy(ge))},reset:function(){I=!1,q=null,Q.set(-1,0,0,0)}}}function n(){let I=!1,ge=!1,q=null,Q=null,pe=null;return{setReversed:function(_e){ge=_e},setTest:function(_e){_e?ue(t.DEPTH_TEST):de(t.DEPTH_TEST)},setMask:function(_e){q!==_e&&!I&&(t.depthMask(_e),q=_e)},setFunc:function(_e){if(ge&&(_e=U1[_e]),Q!==_e){switch(_e){case Md:t.depthFunc(t.NEVER);break;case Ed:t.depthFunc(t.ALWAYS);break;case wd:t.depthFunc(t.LESS);break;case Is:t.depthFunc(t.LEQUAL);break;case Td:t.depthFunc(t.EQUAL);break;case Ad:t.depthFunc(t.GEQUAL);break;case bd:t.depthFunc(t.GREATER);break;case Cd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Q=_e}},setLocked:function(_e){I=_e},setClear:function(_e){pe!==_e&&(t.clearDepth(_e),pe=_e)},reset:function(){I=!1,q=null,Q=null,pe=null}}}function i(){let I=!1,ge=null,q=null,Q=null,pe=null,_e=null,Ye=null,Et=null,Qt=null;return{setTest:function(Ke){I||(Ke?ue(t.STENCIL_TEST):de(t.STENCIL_TEST))},setMask:function(Ke){ge!==Ke&&!I&&(t.stencilMask(Ke),ge=Ke)},setFunc:function(Ke,Jt,ni){(q!==Ke||Q!==Jt||pe!==ni)&&(t.stencilFunc(Ke,Jt,ni),q=Ke,Q=Jt,pe=ni)},setOp:function(Ke,Jt,ni){(_e!==Ke||Ye!==Jt||Et!==ni)&&(t.stencilOp(Ke,Jt,ni),_e=Ke,Ye=Jt,Et=ni)},setLocked:function(Ke){I=Ke},setClear:function(Ke){Qt!==Ke&&(t.clearStencil(Ke),Qt=Ke)},reset:function(){I=!1,ge=null,q=null,Q=null,pe=null,_e=null,Ye=null,Et=null,Qt=null}}}const r=new e,s=new n,o=new i,a=new WeakMap,l=new WeakMap;let c={},d={},f=new WeakMap,h=[],p=null,_=!1,y=null,g=null,u=null,x=null,v=null,w=null,L=null,b=new tt(0,0,0),A=0,P=!1,Y=null,S=null,E=null,W=null,B=null;const $=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,G=0;const ee=t.getParameter(t.VERSION);ee.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(ee)[1]),J=G>=1):ee.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),J=G>=2);let D=null,Z={};const K=t.getParameter(t.SCISSOR_BOX),re=t.getParameter(t.VIEWPORT),Ee=new Mt().fromArray(K),Be=new Mt().fromArray(re);function V(I,ge,q,Q){const pe=new Uint8Array(4),_e=t.createTexture();t.bindTexture(I,_e),t.texParameteri(I,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(I,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ye=0;Ye<q;Ye++)I===t.TEXTURE_3D||I===t.TEXTURE_2D_ARRAY?t.texImage3D(ge,0,t.RGBA,1,1,Q,0,t.RGBA,t.UNSIGNED_BYTE,pe):t.texImage2D(ge+Ye,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,pe);return _e}const ne={};ne[t.TEXTURE_2D]=V(t.TEXTURE_2D,t.TEXTURE_2D,1),ne[t.TEXTURE_CUBE_MAP]=V(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[t.TEXTURE_2D_ARRAY]=V(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ne[t.TEXTURE_3D]=V(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ue(t.DEPTH_TEST),s.setFunc(Is),Ge(!1),$e(Vp),ue(t.CULL_FACE),N(Ki);function ue(I){c[I]!==!0&&(t.enable(I),c[I]=!0)}function de(I){c[I]!==!1&&(t.disable(I),c[I]=!1)}function Fe(I,ge){return d[I]!==ge?(t.bindFramebuffer(I,ge),d[I]=ge,I===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=ge),I===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=ge),!0):!1}function Ce(I,ge){let q=h,Q=!1;if(I){q=f.get(ge),q===void 0&&(q=[],f.set(ge,q));const pe=I.textures;if(q.length!==pe.length||q[0]!==t.COLOR_ATTACHMENT0){for(let _e=0,Ye=pe.length;_e<Ye;_e++)q[_e]=t.COLOR_ATTACHMENT0+_e;q.length=pe.length,Q=!0}}else q[0]!==t.BACK&&(q[0]=t.BACK,Q=!0);Q&&t.drawBuffers(q)}function We(I){return p!==I?(t.useProgram(I),p=I,!0):!1}const Ze={[_r]:t.FUNC_ADD,[qy]:t.FUNC_SUBTRACT,[Ky]:t.FUNC_REVERSE_SUBTRACT};Ze[Zy]=t.MIN,Ze[Qy]=t.MAX;const Xe={[Jy]:t.ZERO,[eS]:t.ONE,[tS]:t.SRC_COLOR,[yd]:t.SRC_ALPHA,[aS]:t.SRC_ALPHA_SATURATE,[sS]:t.DST_COLOR,[iS]:t.DST_ALPHA,[nS]:t.ONE_MINUS_SRC_COLOR,[Sd]:t.ONE_MINUS_SRC_ALPHA,[oS]:t.ONE_MINUS_DST_COLOR,[rS]:t.ONE_MINUS_DST_ALPHA,[lS]:t.CONSTANT_COLOR,[cS]:t.ONE_MINUS_CONSTANT_COLOR,[uS]:t.CONSTANT_ALPHA,[dS]:t.ONE_MINUS_CONSTANT_ALPHA};function N(I,ge,q,Q,pe,_e,Ye,Et,Qt,Ke){if(I===Ki){_===!0&&(de(t.BLEND),_=!1);return}if(_===!1&&(ue(t.BLEND),_=!0),I!==Yy){if(I!==y||Ke!==P){if((g!==_r||v!==_r)&&(t.blendEquation(t.FUNC_ADD),g=_r,v=_r),Ke)switch(I){case Ms:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Ol:t.blendFunc(t.ONE,t.ONE);break;case Gp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case jp:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Ms:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Ol:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case Gp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case jp:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}u=null,x=null,w=null,L=null,b.set(0,0,0),A=0,y=I,P=Ke}return}pe=pe||ge,_e=_e||q,Ye=Ye||Q,(ge!==g||pe!==v)&&(t.blendEquationSeparate(Ze[ge],Ze[pe]),g=ge,v=pe),(q!==u||Q!==x||_e!==w||Ye!==L)&&(t.blendFuncSeparate(Xe[q],Xe[Q],Xe[_e],Xe[Ye]),u=q,x=Q,w=_e,L=Ye),(Et.equals(b)===!1||Qt!==A)&&(t.blendColor(Et.r,Et.g,Et.b,Qt),b.copy(Et),A=Qt),y=I,P=!1}function _t(I,ge){I.side===di?de(t.CULL_FACE):ue(t.CULL_FACE);let q=I.side===cn;ge&&(q=!q),Ge(q),I.blending===Ms&&I.transparent===!1?N(Ki):N(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),s.setFunc(I.depthFunc),s.setTest(I.depthTest),s.setMask(I.depthWrite),r.setMask(I.colorWrite);const Q=I.stencilWrite;o.setTest(Q),Q&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),nt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ue(t.SAMPLE_ALPHA_TO_COVERAGE):de(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(I){Y!==I&&(I?t.frontFace(t.CW):t.frontFace(t.CCW),Y=I)}function $e(I){I!==Wy?(ue(t.CULL_FACE),I!==S&&(I===Vp?t.cullFace(t.BACK):I===Xy?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):de(t.CULL_FACE),S=I}function Le(I){I!==E&&(J&&t.lineWidth(I),E=I)}function nt(I,ge,q){I?(ue(t.POLYGON_OFFSET_FILL),(W!==ge||B!==q)&&(t.polygonOffset(ge,q),W=ge,B=q)):de(t.POLYGON_OFFSET_FILL)}function Ne(I){I?ue(t.SCISSOR_TEST):de(t.SCISSOR_TEST)}function C(I){I===void 0&&(I=t.TEXTURE0+$-1),D!==I&&(t.activeTexture(I),D=I)}function M(I,ge,q){q===void 0&&(D===null?q=t.TEXTURE0+$-1:q=D);let Q=Z[q];Q===void 0&&(Q={type:void 0,texture:void 0},Z[q]=Q),(Q.type!==I||Q.texture!==ge)&&(D!==q&&(t.activeTexture(q),D=q),t.bindTexture(I,ge||ne[I]),Q.type=I,Q.texture=ge)}function R(){const I=Z[D];I!==void 0&&I.type!==void 0&&(t.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function O(){try{t.compressedTexImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function j(){try{t.compressedTexImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function X(){try{t.texSubImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function he(){try{t.texSubImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function se(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ae(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xe(){try{t.texStorage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function te(){try{t.texStorage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function le(){try{t.texImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Se(){try{t.texImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function be(I){Ee.equals(I)===!1&&(t.scissor(I.x,I.y,I.z,I.w),Ee.copy(I))}function fe(I){Be.equals(I)===!1&&(t.viewport(I.x,I.y,I.z,I.w),Be.copy(I))}function Oe(I,ge){let q=l.get(ge);q===void 0&&(q=new WeakMap,l.set(ge,q));let Q=q.get(I);Q===void 0&&(Q=t.getUniformBlockIndex(ge,I.name),q.set(I,Q))}function Re(I,ge){const Q=l.get(ge).get(I);a.get(ge)!==Q&&(t.uniformBlockBinding(ge,Q,I.__bindingPointIndex),a.set(ge,Q))}function it(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),c={},D=null,Z={},d={},f=new WeakMap,h=[],p=null,_=!1,y=null,g=null,u=null,x=null,v=null,w=null,L=null,b=new tt(0,0,0),A=0,P=!1,Y=null,S=null,E=null,W=null,B=null,Ee.set(0,0,t.canvas.width,t.canvas.height),Be.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:ue,disable:de,bindFramebuffer:Fe,drawBuffers:Ce,useProgram:We,setBlending:N,setMaterial:_t,setFlipSided:Ge,setCullFace:$e,setLineWidth:Le,setPolygonOffset:nt,setScissorTest:Ne,activeTexture:C,bindTexture:M,unbindTexture:R,compressedTexImage2D:O,compressedTexImage3D:j,texImage2D:le,texImage3D:Se,updateUBOMapping:Oe,uniformBlockBinding:Re,texStorage2D:xe,texStorage3D:te,texSubImage2D:X,texSubImage3D:he,compressedTexSubImage2D:se,compressedTexSubImage3D:ae,scissor:be,viewport:fe,reset:it}}function Im(t,e,n,i){const r=O1(i);switch(n){case vv:return t*e;case yv:return t*e;case Sv:return t*e*2;case Mv:return t*e/r.components*r.byteLength;case ff:return t*e/r.components*r.byteLength;case Ev:return t*e*2/r.components*r.byteLength;case pf:return t*e*2/r.components*r.byteLength;case xv:return t*e*3/r.components*r.byteLength;case Gn:return t*e*4/r.components*r.byteLength;case mf:return t*e*4/r.components*r.byteLength;case rl:case sl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case ol:case al:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Id:case Fd:return Math.max(t,16)*Math.max(e,8)/4;case Dd:case Ud:return Math.max(t,8)*Math.max(e,8)/2;case Od:case kd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case zd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Bd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Hd:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Vd:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Gd:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case jd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Wd:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Xd:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case $d:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Yd:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case qd:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Kd:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Zd:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Qd:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Jd:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case ll:case eh:case th:return Math.ceil(t/4)*Math.ceil(e/4)*16;case wv:case nh:return Math.ceil(t/4)*Math.ceil(e/4)*8;case ih:case rh:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function O1(t){switch(t){case Mi:case mv:return{byteLength:1,components:1};case Bo:case gv:case $o:return{byteLength:2,components:1};case df:case hf:return{byteLength:2,components:4};case Dr:case uf:case pi:return{byteLength:4,components:1};case _v:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function k1(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new He,d=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,M){return p?new OffscreenCanvas(C,M):Vl("canvas")}function y(C,M,R){let O=1;const j=Ne(C);if((j.width>R||j.height>R)&&(O=R/Math.max(j.width,j.height)),O<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const X=Math.floor(O*j.width),he=Math.floor(O*j.height);f===void 0&&(f=_(X,he));const se=M?_(X,he):f;return se.width=X,se.height=he,se.getContext("2d").drawImage(C,0,0,X,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+X+"x"+he+")."),se}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),C;return C}function g(C){return C.generateMipmaps&&C.minFilter!==Cn&&C.minFilter!==Hn}function u(C){t.generateMipmap(C)}function x(C,M,R,O,j=!1){if(C!==null){if(t[C]!==void 0)return t[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let X=M;if(M===t.RED&&(R===t.FLOAT&&(X=t.R32F),R===t.HALF_FLOAT&&(X=t.R16F),R===t.UNSIGNED_BYTE&&(X=t.R8)),M===t.RED_INTEGER&&(R===t.UNSIGNED_BYTE&&(X=t.R8UI),R===t.UNSIGNED_SHORT&&(X=t.R16UI),R===t.UNSIGNED_INT&&(X=t.R32UI),R===t.BYTE&&(X=t.R8I),R===t.SHORT&&(X=t.R16I),R===t.INT&&(X=t.R32I)),M===t.RG&&(R===t.FLOAT&&(X=t.RG32F),R===t.HALF_FLOAT&&(X=t.RG16F),R===t.UNSIGNED_BYTE&&(X=t.RG8)),M===t.RG_INTEGER&&(R===t.UNSIGNED_BYTE&&(X=t.RG8UI),R===t.UNSIGNED_SHORT&&(X=t.RG16UI),R===t.UNSIGNED_INT&&(X=t.RG32UI),R===t.BYTE&&(X=t.RG8I),R===t.SHORT&&(X=t.RG16I),R===t.INT&&(X=t.RG32I)),M===t.RGB_INTEGER&&(R===t.UNSIGNED_BYTE&&(X=t.RGB8UI),R===t.UNSIGNED_SHORT&&(X=t.RGB16UI),R===t.UNSIGNED_INT&&(X=t.RGB32UI),R===t.BYTE&&(X=t.RGB8I),R===t.SHORT&&(X=t.RGB16I),R===t.INT&&(X=t.RGB32I)),M===t.RGBA_INTEGER&&(R===t.UNSIGNED_BYTE&&(X=t.RGBA8UI),R===t.UNSIGNED_SHORT&&(X=t.RGBA16UI),R===t.UNSIGNED_INT&&(X=t.RGBA32UI),R===t.BYTE&&(X=t.RGBA8I),R===t.SHORT&&(X=t.RGBA16I),R===t.INT&&(X=t.RGBA32I)),M===t.RGB&&R===t.UNSIGNED_INT_5_9_9_9_REV&&(X=t.RGB9_E5),M===t.RGBA){const he=j?kl:et.getTransfer(O);R===t.FLOAT&&(X=t.RGBA32F),R===t.HALF_FLOAT&&(X=t.RGBA16F),R===t.UNSIGNED_BYTE&&(X=he===ut?t.SRGB8_ALPHA8:t.RGBA8),R===t.UNSIGNED_SHORT_4_4_4_4&&(X=t.RGBA4),R===t.UNSIGNED_SHORT_5_5_5_1&&(X=t.RGB5_A1)}return(X===t.R16F||X===t.R32F||X===t.RG16F||X===t.RG32F||X===t.RGBA16F||X===t.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function v(C,M){let R;return C?M===null||M===Dr||M===Os?R=t.DEPTH24_STENCIL8:M===pi?R=t.DEPTH32F_STENCIL8:M===Bo&&(R=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Dr||M===Os?R=t.DEPTH_COMPONENT24:M===pi?R=t.DEPTH_COMPONENT32F:M===Bo&&(R=t.DEPTH_COMPONENT16),R}function w(C,M){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==Cn&&C.minFilter!==Hn?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function L(C){const M=C.target;M.removeEventListener("dispose",L),A(M),M.isVideoTexture&&d.delete(M)}function b(C){const M=C.target;M.removeEventListener("dispose",b),Y(M)}function A(C){const M=i.get(C);if(M.__webglInit===void 0)return;const R=C.source,O=h.get(R);if(O){const j=O[M.__cacheKey];j.usedTimes--,j.usedTimes===0&&P(C),Object.keys(O).length===0&&h.delete(R)}i.remove(C)}function P(C){const M=i.get(C);t.deleteTexture(M.__webglTexture);const R=C.source,O=h.get(R);delete O[M.__cacheKey],o.memory.textures--}function Y(C){const M=i.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let O=0;O<6;O++){if(Array.isArray(M.__webglFramebuffer[O]))for(let j=0;j<M.__webglFramebuffer[O].length;j++)t.deleteFramebuffer(M.__webglFramebuffer[O][j]);else t.deleteFramebuffer(M.__webglFramebuffer[O]);M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer[O])}else{if(Array.isArray(M.__webglFramebuffer))for(let O=0;O<M.__webglFramebuffer.length;O++)t.deleteFramebuffer(M.__webglFramebuffer[O]);else t.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&t.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let O=0;O<M.__webglColorRenderbuffer.length;O++)M.__webglColorRenderbuffer[O]&&t.deleteRenderbuffer(M.__webglColorRenderbuffer[O]);M.__webglDepthRenderbuffer&&t.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const R=C.textures;for(let O=0,j=R.length;O<j;O++){const X=i.get(R[O]);X.__webglTexture&&(t.deleteTexture(X.__webglTexture),o.memory.textures--),i.remove(R[O])}i.remove(C)}let S=0;function E(){S=0}function W(){const C=S;return C>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),S+=1,C}function B(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function $(C,M){const R=i.get(C);if(C.isVideoTexture&&Le(C),C.isRenderTargetTexture===!1&&C.version>0&&R.__version!==C.version){const O=C.image;if(O===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(O.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Be(R,C,M);return}}n.bindTexture(t.TEXTURE_2D,R.__webglTexture,t.TEXTURE0+M)}function J(C,M){const R=i.get(C);if(C.version>0&&R.__version!==C.version){Be(R,C,M);return}n.bindTexture(t.TEXTURE_2D_ARRAY,R.__webglTexture,t.TEXTURE0+M)}function G(C,M){const R=i.get(C);if(C.version>0&&R.__version!==C.version){Be(R,C,M);return}n.bindTexture(t.TEXTURE_3D,R.__webglTexture,t.TEXTURE0+M)}function ee(C,M){const R=i.get(C);if(C.version>0&&R.__version!==C.version){V(R,C,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,R.__webglTexture,t.TEXTURE0+M)}const D={[Ld]:t.REPEAT,[Mr]:t.CLAMP_TO_EDGE,[Nd]:t.MIRRORED_REPEAT},Z={[Cn]:t.NEAREST,[SS]:t.NEAREST_MIPMAP_NEAREST,[va]:t.NEAREST_MIPMAP_LINEAR,[Hn]:t.LINEAR,[jc]:t.LINEAR_MIPMAP_NEAREST,[Er]:t.LINEAR_MIPMAP_LINEAR},K={[AS]:t.NEVER,[NS]:t.ALWAYS,[bS]:t.LESS,[Tv]:t.LEQUAL,[CS]:t.EQUAL,[LS]:t.GEQUAL,[RS]:t.GREATER,[PS]:t.NOTEQUAL};function re(C,M){if(M.type===pi&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Hn||M.magFilter===jc||M.magFilter===va||M.magFilter===Er||M.minFilter===Hn||M.minFilter===jc||M.minFilter===va||M.minFilter===Er)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(C,t.TEXTURE_WRAP_S,D[M.wrapS]),t.texParameteri(C,t.TEXTURE_WRAP_T,D[M.wrapT]),(C===t.TEXTURE_3D||C===t.TEXTURE_2D_ARRAY)&&t.texParameteri(C,t.TEXTURE_WRAP_R,D[M.wrapR]),t.texParameteri(C,t.TEXTURE_MAG_FILTER,Z[M.magFilter]),t.texParameteri(C,t.TEXTURE_MIN_FILTER,Z[M.minFilter]),M.compareFunction&&(t.texParameteri(C,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(C,t.TEXTURE_COMPARE_FUNC,K[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Cn||M.minFilter!==va&&M.minFilter!==Er||M.type===pi&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const R=e.get("EXT_texture_filter_anisotropic");t.texParameterf(C,R.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Ee(C,M){let R=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",L));const O=M.source;let j=h.get(O);j===void 0&&(j={},h.set(O,j));const X=B(M);if(X!==C.__cacheKey){j[X]===void 0&&(j[X]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,R=!0),j[X].usedTimes++;const he=j[C.__cacheKey];he!==void 0&&(j[C.__cacheKey].usedTimes--,he.usedTimes===0&&P(M)),C.__cacheKey=X,C.__webglTexture=j[X].texture}return R}function Be(C,M,R){let O=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(O=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&(O=t.TEXTURE_3D);const j=Ee(C,M),X=M.source;n.bindTexture(O,C.__webglTexture,t.TEXTURE0+R);const he=i.get(X);if(X.version!==he.__version||j===!0){n.activeTexture(t.TEXTURE0+R);const se=et.getPrimaries(et.workingColorSpace),ae=M.colorSpace===zi?null:et.getPrimaries(M.colorSpace),xe=M.colorSpace===zi||se===ae?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let te=y(M.image,!1,r.maxTextureSize);te=nt(M,te);const le=s.convert(M.format,M.colorSpace),Se=s.convert(M.type);let be=x(M.internalFormat,le,Se,M.colorSpace,M.isVideoTexture);re(O,M);let fe;const Oe=M.mipmaps,Re=M.isVideoTexture!==!0,it=he.__version===void 0||j===!0,I=X.dataReady,ge=w(M,te);if(M.isDepthTexture)be=v(M.format===ks,M.type),it&&(Re?n.texStorage2D(t.TEXTURE_2D,1,be,te.width,te.height):n.texImage2D(t.TEXTURE_2D,0,be,te.width,te.height,0,le,Se,null));else if(M.isDataTexture)if(Oe.length>0){Re&&it&&n.texStorage2D(t.TEXTURE_2D,ge,be,Oe[0].width,Oe[0].height);for(let q=0,Q=Oe.length;q<Q;q++)fe=Oe[q],Re?I&&n.texSubImage2D(t.TEXTURE_2D,q,0,0,fe.width,fe.height,le,Se,fe.data):n.texImage2D(t.TEXTURE_2D,q,be,fe.width,fe.height,0,le,Se,fe.data);M.generateMipmaps=!1}else Re?(it&&n.texStorage2D(t.TEXTURE_2D,ge,be,te.width,te.height),I&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,te.width,te.height,le,Se,te.data)):n.texImage2D(t.TEXTURE_2D,0,be,te.width,te.height,0,le,Se,te.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Re&&it&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ge,be,Oe[0].width,Oe[0].height,te.depth);for(let q=0,Q=Oe.length;q<Q;q++)if(fe=Oe[q],M.format!==Gn)if(le!==null)if(Re){if(I)if(M.layerUpdates.size>0){const pe=Im(fe.width,fe.height,M.format,M.type);for(const _e of M.layerUpdates){const Ye=fe.data.subarray(_e*pe/fe.data.BYTES_PER_ELEMENT,(_e+1)*pe/fe.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,q,0,0,_e,fe.width,fe.height,1,le,Ye,0,0)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,q,0,0,0,fe.width,fe.height,te.depth,le,fe.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,q,be,fe.width,fe.height,te.depth,0,fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Re?I&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,q,0,0,0,fe.width,fe.height,te.depth,le,Se,fe.data):n.texImage3D(t.TEXTURE_2D_ARRAY,q,be,fe.width,fe.height,te.depth,0,le,Se,fe.data)}else{Re&&it&&n.texStorage2D(t.TEXTURE_2D,ge,be,Oe[0].width,Oe[0].height);for(let q=0,Q=Oe.length;q<Q;q++)fe=Oe[q],M.format!==Gn?le!==null?Re?I&&n.compressedTexSubImage2D(t.TEXTURE_2D,q,0,0,fe.width,fe.height,le,fe.data):n.compressedTexImage2D(t.TEXTURE_2D,q,be,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?I&&n.texSubImage2D(t.TEXTURE_2D,q,0,0,fe.width,fe.height,le,Se,fe.data):n.texImage2D(t.TEXTURE_2D,q,be,fe.width,fe.height,0,le,Se,fe.data)}else if(M.isDataArrayTexture)if(Re){if(it&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ge,be,te.width,te.height,te.depth),I)if(M.layerUpdates.size>0){const q=Im(te.width,te.height,M.format,M.type);for(const Q of M.layerUpdates){const pe=te.data.subarray(Q*q/te.data.BYTES_PER_ELEMENT,(Q+1)*q/te.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Q,te.width,te.height,1,le,Se,pe)}M.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,le,Se,te.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,be,te.width,te.height,te.depth,0,le,Se,te.data);else if(M.isData3DTexture)Re?(it&&n.texStorage3D(t.TEXTURE_3D,ge,be,te.width,te.height,te.depth),I&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,le,Se,te.data)):n.texImage3D(t.TEXTURE_3D,0,be,te.width,te.height,te.depth,0,le,Se,te.data);else if(M.isFramebufferTexture){if(it)if(Re)n.texStorage2D(t.TEXTURE_2D,ge,be,te.width,te.height);else{let q=te.width,Q=te.height;for(let pe=0;pe<ge;pe++)n.texImage2D(t.TEXTURE_2D,pe,be,q,Q,0,le,Se,null),q>>=1,Q>>=1}}else if(Oe.length>0){if(Re&&it){const q=Ne(Oe[0]);n.texStorage2D(t.TEXTURE_2D,ge,be,q.width,q.height)}for(let q=0,Q=Oe.length;q<Q;q++)fe=Oe[q],Re?I&&n.texSubImage2D(t.TEXTURE_2D,q,0,0,le,Se,fe):n.texImage2D(t.TEXTURE_2D,q,be,le,Se,fe);M.generateMipmaps=!1}else if(Re){if(it){const q=Ne(te);n.texStorage2D(t.TEXTURE_2D,ge,be,q.width,q.height)}I&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,le,Se,te)}else n.texImage2D(t.TEXTURE_2D,0,be,le,Se,te);g(M)&&u(O),he.__version=X.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function V(C,M,R){if(M.image.length!==6)return;const O=Ee(C,M),j=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,C.__webglTexture,t.TEXTURE0+R);const X=i.get(j);if(j.version!==X.__version||O===!0){n.activeTexture(t.TEXTURE0+R);const he=et.getPrimaries(et.workingColorSpace),se=M.colorSpace===zi?null:et.getPrimaries(M.colorSpace),ae=M.colorSpace===zi||he===se?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);const xe=M.isCompressedTexture||M.image[0].isCompressedTexture,te=M.image[0]&&M.image[0].isDataTexture,le=[];for(let Q=0;Q<6;Q++)!xe&&!te?le[Q]=y(M.image[Q],!0,r.maxCubemapSize):le[Q]=te?M.image[Q].image:M.image[Q],le[Q]=nt(M,le[Q]);const Se=le[0],be=s.convert(M.format,M.colorSpace),fe=s.convert(M.type),Oe=x(M.internalFormat,be,fe,M.colorSpace),Re=M.isVideoTexture!==!0,it=X.__version===void 0||O===!0,I=j.dataReady;let ge=w(M,Se);re(t.TEXTURE_CUBE_MAP,M);let q;if(xe){Re&&it&&n.texStorage2D(t.TEXTURE_CUBE_MAP,ge,Oe,Se.width,Se.height);for(let Q=0;Q<6;Q++){q=le[Q].mipmaps;for(let pe=0;pe<q.length;pe++){const _e=q[pe];M.format!==Gn?be!==null?Re?I&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe,0,0,_e.width,_e.height,be,_e.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe,Oe,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Re?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe,0,0,_e.width,_e.height,be,fe,_e.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe,Oe,_e.width,_e.height,0,be,fe,_e.data)}}}else{if(q=M.mipmaps,Re&&it){q.length>0&&ge++;const Q=Ne(le[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,ge,Oe,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(te){Re?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,le[Q].width,le[Q].height,be,fe,le[Q].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Oe,le[Q].width,le[Q].height,0,be,fe,le[Q].data);for(let pe=0;pe<q.length;pe++){const Ye=q[pe].image[Q].image;Re?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe+1,0,0,Ye.width,Ye.height,be,fe,Ye.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe+1,Oe,Ye.width,Ye.height,0,be,fe,Ye.data)}}else{Re?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,be,fe,le[Q]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Oe,be,fe,le[Q]);for(let pe=0;pe<q.length;pe++){const _e=q[pe];Re?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe+1,0,0,be,fe,_e.image[Q]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,pe+1,Oe,be,fe,_e.image[Q])}}}g(M)&&u(t.TEXTURE_CUBE_MAP),X.__version=j.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function ne(C,M,R,O,j,X){const he=s.convert(R.format,R.colorSpace),se=s.convert(R.type),ae=x(R.internalFormat,he,se,R.colorSpace);if(!i.get(M).__hasExternalTextures){const te=Math.max(1,M.width>>X),le=Math.max(1,M.height>>X);j===t.TEXTURE_3D||j===t.TEXTURE_2D_ARRAY?n.texImage3D(j,X,ae,te,le,M.depth,0,he,se,null):n.texImage2D(j,X,ae,te,le,0,he,se,null)}n.bindFramebuffer(t.FRAMEBUFFER,C),$e(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,O,j,i.get(R).__webglTexture,0,Ge(M)):(j===t.TEXTURE_2D||j>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,O,j,i.get(R).__webglTexture,X),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ue(C,M,R){if(t.bindRenderbuffer(t.RENDERBUFFER,C),M.depthBuffer){const O=M.depthTexture,j=O&&O.isDepthTexture?O.type:null,X=v(M.stencilBuffer,j),he=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,se=Ge(M);$e(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,se,X,M.width,M.height):R?t.renderbufferStorageMultisample(t.RENDERBUFFER,se,X,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,X,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,he,t.RENDERBUFFER,C)}else{const O=M.textures;for(let j=0;j<O.length;j++){const X=O[j],he=s.convert(X.format,X.colorSpace),se=s.convert(X.type),ae=x(X.internalFormat,he,se,X.colorSpace),xe=Ge(M);R&&$e(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,xe,ae,M.width,M.height):$e(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,xe,ae,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,ae,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function de(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),$(M.depthTexture,0);const O=i.get(M.depthTexture).__webglTexture,j=Ge(M);if(M.depthTexture.format===Es)$e(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,O,0,j):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,O,0);else if(M.depthTexture.format===ks)$e(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,O,0,j):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,O,0);else throw new Error("Unknown depthTexture format")}function Fe(C){const M=i.get(C),R=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const O=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),O){const j=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,O.removeEventListener("dispose",j)};O.addEventListener("dispose",j),M.__depthDisposeCallback=j}M.__boundDepthTexture=O}if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(R)throw new Error("target.depthTexture not supported in Cube render targets");de(M.__webglFramebuffer,C)}else if(R){M.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[O]),M.__webglDepthbuffer[O]===void 0)M.__webglDepthbuffer[O]=t.createRenderbuffer(),ue(M.__webglDepthbuffer[O],C,!1);else{const j=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,X=M.__webglDepthbuffer[O];t.bindRenderbuffer(t.RENDERBUFFER,X),t.framebufferRenderbuffer(t.FRAMEBUFFER,j,t.RENDERBUFFER,X)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=t.createRenderbuffer(),ue(M.__webglDepthbuffer,C,!1);else{const O=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,j=M.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,j),t.framebufferRenderbuffer(t.FRAMEBUFFER,O,t.RENDERBUFFER,j)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ce(C,M,R){const O=i.get(C);M!==void 0&&ne(O.__webglFramebuffer,C,C.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),R!==void 0&&Fe(C)}function We(C){const M=C.texture,R=i.get(C),O=i.get(M);C.addEventListener("dispose",b);const j=C.textures,X=C.isWebGLCubeRenderTarget===!0,he=j.length>1;if(he||(O.__webglTexture===void 0&&(O.__webglTexture=t.createTexture()),O.__version=M.version,o.memory.textures++),X){R.__webglFramebuffer=[];for(let se=0;se<6;se++)if(M.mipmaps&&M.mipmaps.length>0){R.__webglFramebuffer[se]=[];for(let ae=0;ae<M.mipmaps.length;ae++)R.__webglFramebuffer[se][ae]=t.createFramebuffer()}else R.__webglFramebuffer[se]=t.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){R.__webglFramebuffer=[];for(let se=0;se<M.mipmaps.length;se++)R.__webglFramebuffer[se]=t.createFramebuffer()}else R.__webglFramebuffer=t.createFramebuffer();if(he)for(let se=0,ae=j.length;se<ae;se++){const xe=i.get(j[se]);xe.__webglTexture===void 0&&(xe.__webglTexture=t.createTexture(),o.memory.textures++)}if(C.samples>0&&$e(C)===!1){R.__webglMultisampledFramebuffer=t.createFramebuffer(),R.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,R.__webglMultisampledFramebuffer);for(let se=0;se<j.length;se++){const ae=j[se];R.__webglColorRenderbuffer[se]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,R.__webglColorRenderbuffer[se]);const xe=s.convert(ae.format,ae.colorSpace),te=s.convert(ae.type),le=x(ae.internalFormat,xe,te,ae.colorSpace,C.isXRRenderTarget===!0),Se=Ge(C);t.renderbufferStorageMultisample(t.RENDERBUFFER,Se,le,C.width,C.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+se,t.RENDERBUFFER,R.__webglColorRenderbuffer[se])}t.bindRenderbuffer(t.RENDERBUFFER,null),C.depthBuffer&&(R.__webglDepthRenderbuffer=t.createRenderbuffer(),ue(R.__webglDepthRenderbuffer,C,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(X){n.bindTexture(t.TEXTURE_CUBE_MAP,O.__webglTexture),re(t.TEXTURE_CUBE_MAP,M);for(let se=0;se<6;se++)if(M.mipmaps&&M.mipmaps.length>0)for(let ae=0;ae<M.mipmaps.length;ae++)ne(R.__webglFramebuffer[se][ae],C,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+se,ae);else ne(R.__webglFramebuffer[se],C,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);g(M)&&u(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(he){for(let se=0,ae=j.length;se<ae;se++){const xe=j[se],te=i.get(xe);n.bindTexture(t.TEXTURE_2D,te.__webglTexture),re(t.TEXTURE_2D,xe),ne(R.__webglFramebuffer,C,xe,t.COLOR_ATTACHMENT0+se,t.TEXTURE_2D,0),g(xe)&&u(t.TEXTURE_2D)}n.unbindTexture()}else{let se=t.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(se=C.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(se,O.__webglTexture),re(se,M),M.mipmaps&&M.mipmaps.length>0)for(let ae=0;ae<M.mipmaps.length;ae++)ne(R.__webglFramebuffer[ae],C,M,t.COLOR_ATTACHMENT0,se,ae);else ne(R.__webglFramebuffer,C,M,t.COLOR_ATTACHMENT0,se,0);g(M)&&u(se),n.unbindTexture()}C.depthBuffer&&Fe(C)}function Ze(C){const M=C.textures;for(let R=0,O=M.length;R<O;R++){const j=M[R];if(g(j)){const X=C.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,he=i.get(j).__webglTexture;n.bindTexture(X,he),u(X),n.unbindTexture()}}}const Xe=[],N=[];function _t(C){if(C.samples>0){if($e(C)===!1){const M=C.textures,R=C.width,O=C.height;let j=t.COLOR_BUFFER_BIT;const X=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,he=i.get(C),se=M.length>1;if(se)for(let ae=0;ae<M.length;ae++)n.bindFramebuffer(t.FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ae,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,he.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ae,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let ae=0;ae<M.length;ae++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(j|=t.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(j|=t.STENCIL_BUFFER_BIT)),se){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,he.__webglColorRenderbuffer[ae]);const xe=i.get(M[ae]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,xe,0)}t.blitFramebuffer(0,0,R,O,0,0,R,O,j,t.NEAREST),l===!0&&(Xe.length=0,N.length=0,Xe.push(t.COLOR_ATTACHMENT0+ae),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Xe.push(X),N.push(X),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,N)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Xe))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),se)for(let ae=0;ae<M.length;ae++){n.bindFramebuffer(t.FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ae,t.RENDERBUFFER,he.__webglColorRenderbuffer[ae]);const xe=i.get(M[ae]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,he.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ae,t.TEXTURE_2D,xe,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const M=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[M])}}}function Ge(C){return Math.min(r.maxSamples,C.samples)}function $e(C){const M=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Le(C){const M=o.render.frame;d.get(C)!==M&&(d.set(C,M),C.update())}function nt(C,M){const R=C.colorSpace,O=C.format,j=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||R!==sr&&R!==zi&&(et.getTransfer(R)===ut?(O!==Gn||j!==Mi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",R)),M}function Ne(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=E,this.setTexture2D=$,this.setTexture2DArray=J,this.setTexture3D=G,this.setTextureCube=ee,this.rebindTextures=Ce,this.setupRenderTarget=We,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=ne,this.useMultisampledRTT=$e}function z1(t,e){function n(i,r=zi){let s;const o=et.getTransfer(r);if(i===Mi)return t.UNSIGNED_BYTE;if(i===df)return t.UNSIGNED_SHORT_4_4_4_4;if(i===hf)return t.UNSIGNED_SHORT_5_5_5_1;if(i===_v)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===mv)return t.BYTE;if(i===gv)return t.SHORT;if(i===Bo)return t.UNSIGNED_SHORT;if(i===uf)return t.INT;if(i===Dr)return t.UNSIGNED_INT;if(i===pi)return t.FLOAT;if(i===$o)return t.HALF_FLOAT;if(i===vv)return t.ALPHA;if(i===xv)return t.RGB;if(i===Gn)return t.RGBA;if(i===yv)return t.LUMINANCE;if(i===Sv)return t.LUMINANCE_ALPHA;if(i===Es)return t.DEPTH_COMPONENT;if(i===ks)return t.DEPTH_STENCIL;if(i===Mv)return t.RED;if(i===ff)return t.RED_INTEGER;if(i===Ev)return t.RG;if(i===pf)return t.RG_INTEGER;if(i===mf)return t.RGBA_INTEGER;if(i===rl||i===sl||i===ol||i===al)if(o===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===rl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ol)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===rl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===sl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ol)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===al)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Dd||i===Id||i===Ud||i===Fd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Dd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Id)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ud)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Fd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Od||i===kd||i===zd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Od||i===kd)return o===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===zd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Bd||i===Hd||i===Vd||i===Gd||i===jd||i===Wd||i===Xd||i===$d||i===Yd||i===qd||i===Kd||i===Zd||i===Qd||i===Jd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Bd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Hd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Vd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Gd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===jd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Wd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Xd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===$d)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Yd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===qd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Kd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Zd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Qd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Jd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ll||i===eh||i===th)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ll)return o===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===eh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===th)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===wv||i===nh||i===ih||i===rh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ll)return s.COMPRESSED_RED_RGTC1_EXT;if(i===nh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ih)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===rh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Os?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class B1 extends An{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class za extends qt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const H1={type:"move"};class xu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new za,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new za,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new za,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const g=n.getJointPose(y,i),u=this._getHandJoint(c,y);g!==null&&(u.matrix.fromArray(g.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=g.radius),u.visible=g!==null}const d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=d.position.distanceTo(f.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(H1)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new za;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const V1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,G1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class j1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new un,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new wi({vertexShader:V1,fragmentShader:G1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new gi(new uc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class W1 extends kr{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,d=null,f=null,h=null,p=null,_=null;const y=new j1,g=n.getContextAttributes();let u=null,x=null;const v=[],w=[],L=new He;let b=null;const A=new An;A.layers.enable(1),A.viewport=new Mt;const P=new An;P.layers.enable(2),P.viewport=new Mt;const Y=[A,P],S=new B1;S.layers.enable(1),S.layers.enable(2);let E=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let ne=v[V];return ne===void 0&&(ne=new xu,v[V]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(V){let ne=v[V];return ne===void 0&&(ne=new xu,v[V]=ne),ne.getGripSpace()},this.getHand=function(V){let ne=v[V];return ne===void 0&&(ne=new xu,v[V]=ne),ne.getHandSpace()};function B(V){const ne=w.indexOf(V.inputSource);if(ne===-1)return;const ue=v[ne];ue!==void 0&&(ue.update(V.inputSource,V.frame,c||o),ue.dispatchEvent({type:V.type,data:V.inputSource}))}function $(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",J);for(let V=0;V<v.length;V++){const ne=w[V];ne!==null&&(w[V]=null,v[V].disconnect(ne))}E=null,W=null,y.reset(),e.setRenderTarget(u),p=null,h=null,f=null,r=null,x=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){s=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(V){if(r=V,r!==null){if(u=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",$),r.addEventListener("inputsourceschange",J),g.xrCompatible!==!0&&await n.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(L),r.renderState.layers===void 0){const ne={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,ne),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Ir(p.framebufferWidth,p.framebufferHeight,{format:Gn,type:Mi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ne=null,ue=null,de=null;g.depth&&(de=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ne=g.stencil?ks:Es,ue=g.stencil?Os:Dr);const Fe={colorFormat:n.RGBA8,depthFormat:de,scaleFactor:s};f=new XRWebGLBinding(r,n),h=f.createProjectionLayer(Fe),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new Ir(h.textureWidth,h.textureHeight,{format:Gn,type:Mi,depthTexture:new kv(h.textureWidth,h.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Be.setContext(r),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function J(V){for(let ne=0;ne<V.removed.length;ne++){const ue=V.removed[ne],de=w.indexOf(ue);de>=0&&(w[de]=null,v[de].disconnect(ue))}for(let ne=0;ne<V.added.length;ne++){const ue=V.added[ne];let de=w.indexOf(ue);if(de===-1){for(let Ce=0;Ce<v.length;Ce++)if(Ce>=w.length){w.push(ue),de=Ce;break}else if(w[Ce]===null){w[Ce]=ue,de=Ce;break}if(de===-1)break}const Fe=v[de];Fe&&Fe.connect(ue)}}const G=new k,ee=new k;function D(V,ne,ue){G.setFromMatrixPosition(ne.matrixWorld),ee.setFromMatrixPosition(ue.matrixWorld);const de=G.distanceTo(ee),Fe=ne.projectionMatrix.elements,Ce=ue.projectionMatrix.elements,We=Fe[14]/(Fe[10]-1),Ze=Fe[14]/(Fe[10]+1),Xe=(Fe[9]+1)/Fe[5],N=(Fe[9]-1)/Fe[5],_t=(Fe[8]-1)/Fe[0],Ge=(Ce[8]+1)/Ce[0],$e=We*_t,Le=We*Ge,nt=de/(-_t+Ge),Ne=nt*-_t;if(ne.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Ne),V.translateZ(nt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),Fe[10]===-1)V.projectionMatrix.copy(ne.projectionMatrix),V.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const C=We+nt,M=Ze+nt,R=$e-Ne,O=Le+(de-Ne),j=Xe*Ze/M*C,X=N*Ze/M*C;V.projectionMatrix.makePerspective(R,O,j,X,C,M),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function Z(V,ne){ne===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(ne.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(r===null)return;let ne=V.near,ue=V.far;y.texture!==null&&(y.depthNear>0&&(ne=y.depthNear),y.depthFar>0&&(ue=y.depthFar)),S.near=P.near=A.near=ne,S.far=P.far=A.far=ue,(E!==S.near||W!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),E=S.near,W=S.far);const de=V.parent,Fe=S.cameras;Z(S,de);for(let Ce=0;Ce<Fe.length;Ce++)Z(Fe[Ce],de);Fe.length===2?D(S,A,P):S.projectionMatrix.copy(A.projectionMatrix),K(V,S,de)};function K(V,ne,ue){ue===null?V.matrix.copy(ne.matrixWorld):(V.matrix.copy(ue.matrixWorld),V.matrix.invert(),V.matrix.multiply(ne.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(ne.projectionMatrix),V.projectionMatrixInverse.copy(ne.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=sh*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(V){l=V,h!==null&&(h.fixedFoveation=V),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=V)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(S)};let re=null;function Ee(V,ne){if(d=ne.getViewerPose(c||o),_=ne,d!==null){const ue=d.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let de=!1;ue.length!==S.cameras.length&&(S.cameras.length=0,de=!0);for(let Ce=0;Ce<ue.length;Ce++){const We=ue[Ce];let Ze=null;if(p!==null)Ze=p.getViewport(We);else{const N=f.getViewSubImage(h,We);Ze=N.viewport,Ce===0&&(e.setRenderTargetTextures(x,N.colorTexture,h.ignoreDepthValues?void 0:N.depthStencilTexture),e.setRenderTarget(x))}let Xe=Y[Ce];Xe===void 0&&(Xe=new An,Xe.layers.enable(Ce),Xe.viewport=new Mt,Y[Ce]=Xe),Xe.matrix.fromArray(We.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(We.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),Ce===0&&(S.matrix.copy(Xe.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),de===!0&&S.cameras.push(Xe)}const Fe=r.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")){const Ce=f.getDepthInformation(ue[0]);Ce&&Ce.isValid&&Ce.texture&&y.init(e,Ce,r.renderState)}}for(let ue=0;ue<v.length;ue++){const de=w[ue],Fe=v[ue];de!==null&&Fe!==void 0&&Fe.update(de,ne,c||o)}re&&re(V,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),_=null}const Be=new Ov;Be.setAnimationLoop(Ee),this.setAnimationLoop=function(V){re=V},this.dispose=function(){}}}const hr=new Ei,X1=new mt;function $1(t,e){function n(g,u){g.matrixAutoUpdate===!0&&g.updateMatrix(),u.value.copy(g.matrix)}function i(g,u){u.color.getRGB(g.fogColor.value,Dv(t)),u.isFog?(g.fogNear.value=u.near,g.fogFar.value=u.far):u.isFogExp2&&(g.fogDensity.value=u.density)}function r(g,u,x,v,w){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(g,u):u.isMeshToonMaterial?(s(g,u),f(g,u)):u.isMeshPhongMaterial?(s(g,u),d(g,u)):u.isMeshStandardMaterial?(s(g,u),h(g,u),u.isMeshPhysicalMaterial&&p(g,u,w)):u.isMeshMatcapMaterial?(s(g,u),_(g,u)):u.isMeshDepthMaterial?s(g,u):u.isMeshDistanceMaterial?(s(g,u),y(g,u)):u.isMeshNormalMaterial?s(g,u):u.isLineBasicMaterial?(o(g,u),u.isLineDashedMaterial&&a(g,u)):u.isPointsMaterial?l(g,u,x,v):u.isSpriteMaterial?c(g,u):u.isShadowMaterial?(g.color.value.copy(u.color),g.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(g,u){g.opacity.value=u.opacity,u.color&&g.diffuse.value.copy(u.color),u.emissive&&g.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(g.map.value=u.map,n(u.map,g.mapTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,n(u.alphaMap,g.alphaMapTransform)),u.bumpMap&&(g.bumpMap.value=u.bumpMap,n(u.bumpMap,g.bumpMapTransform),g.bumpScale.value=u.bumpScale,u.side===cn&&(g.bumpScale.value*=-1)),u.normalMap&&(g.normalMap.value=u.normalMap,n(u.normalMap,g.normalMapTransform),g.normalScale.value.copy(u.normalScale),u.side===cn&&g.normalScale.value.negate()),u.displacementMap&&(g.displacementMap.value=u.displacementMap,n(u.displacementMap,g.displacementMapTransform),g.displacementScale.value=u.displacementScale,g.displacementBias.value=u.displacementBias),u.emissiveMap&&(g.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,g.emissiveMapTransform)),u.specularMap&&(g.specularMap.value=u.specularMap,n(u.specularMap,g.specularMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest);const x=e.get(u),v=x.envMap,w=x.envMapRotation;v&&(g.envMap.value=v,hr.copy(w),hr.x*=-1,hr.y*=-1,hr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(hr.y*=-1,hr.z*=-1),g.envMapRotation.value.setFromMatrix4(X1.makeRotationFromEuler(hr)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=u.reflectivity,g.ior.value=u.ior,g.refractionRatio.value=u.refractionRatio),u.lightMap&&(g.lightMap.value=u.lightMap,g.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,g.lightMapTransform)),u.aoMap&&(g.aoMap.value=u.aoMap,g.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,g.aoMapTransform))}function o(g,u){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,u.map&&(g.map.value=u.map,n(u.map,g.mapTransform))}function a(g,u){g.dashSize.value=u.dashSize,g.totalSize.value=u.dashSize+u.gapSize,g.scale.value=u.scale}function l(g,u,x,v){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,g.size.value=u.size*x,g.scale.value=v*.5,u.map&&(g.map.value=u.map,n(u.map,g.uvTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,n(u.alphaMap,g.alphaMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest)}function c(g,u){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,g.rotation.value=u.rotation,u.map&&(g.map.value=u.map,n(u.map,g.mapTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,n(u.alphaMap,g.alphaMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest)}function d(g,u){g.specular.value.copy(u.specular),g.shininess.value=Math.max(u.shininess,1e-4)}function f(g,u){u.gradientMap&&(g.gradientMap.value=u.gradientMap)}function h(g,u){g.metalness.value=u.metalness,u.metalnessMap&&(g.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,g.metalnessMapTransform)),g.roughness.value=u.roughness,u.roughnessMap&&(g.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,g.roughnessMapTransform)),u.envMap&&(g.envMapIntensity.value=u.envMapIntensity)}function p(g,u,x){g.ior.value=u.ior,u.sheen>0&&(g.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),g.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(g.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,g.sheenColorMapTransform)),u.sheenRoughnessMap&&(g.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,g.sheenRoughnessMapTransform))),u.clearcoat>0&&(g.clearcoat.value=u.clearcoat,g.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(g.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,g.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(g.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===cn&&g.clearcoatNormalScale.value.negate())),u.dispersion>0&&(g.dispersion.value=u.dispersion),u.iridescence>0&&(g.iridescence.value=u.iridescence,g.iridescenceIOR.value=u.iridescenceIOR,g.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(g.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,g.iridescenceMapTransform)),u.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),u.transmission>0&&(g.transmission.value=u.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),u.transmissionMap&&(g.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,g.transmissionMapTransform)),g.thickness.value=u.thickness,u.thicknessMap&&(g.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=u.attenuationDistance,g.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(g.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(g.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=u.specularIntensity,g.specularColor.value.copy(u.specularColor),u.specularColorMap&&(g.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,g.specularColorMapTransform)),u.specularIntensityMap&&(g.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,u){u.matcap&&(g.matcap.value=u.matcap)}function y(g,u){const x=e.get(u).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Y1(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,v){const w=v.program;i.uniformBlockBinding(x,w)}function c(x,v){let w=r[x.id];w===void 0&&(_(x),w=d(x),r[x.id]=w,x.addEventListener("dispose",g));const L=v.program;i.updateUBOMapping(x,L);const b=e.render.frame;s[x.id]!==b&&(h(x),s[x.id]=b)}function d(x){const v=f();x.__bindingPointIndex=v;const w=t.createBuffer(),L=x.__size,b=x.usage;return t.bindBuffer(t.UNIFORM_BUFFER,w),t.bufferData(t.UNIFORM_BUFFER,L,b),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,v,w),w}function f(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const v=r[x.id],w=x.uniforms,L=x.__cache;t.bindBuffer(t.UNIFORM_BUFFER,v);for(let b=0,A=w.length;b<A;b++){const P=Array.isArray(w[b])?w[b]:[w[b]];for(let Y=0,S=P.length;Y<S;Y++){const E=P[Y];if(p(E,b,Y,L)===!0){const W=E.__offset,B=Array.isArray(E.value)?E.value:[E.value];let $=0;for(let J=0;J<B.length;J++){const G=B[J],ee=y(G);typeof G=="number"||typeof G=="boolean"?(E.__data[0]=G,t.bufferSubData(t.UNIFORM_BUFFER,W+$,E.__data)):G.isMatrix3?(E.__data[0]=G.elements[0],E.__data[1]=G.elements[1],E.__data[2]=G.elements[2],E.__data[3]=0,E.__data[4]=G.elements[3],E.__data[5]=G.elements[4],E.__data[6]=G.elements[5],E.__data[7]=0,E.__data[8]=G.elements[6],E.__data[9]=G.elements[7],E.__data[10]=G.elements[8],E.__data[11]=0):(G.toArray(E.__data,$),$+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,W,E.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(x,v,w,L){const b=x.value,A=v+"_"+w;if(L[A]===void 0)return typeof b=="number"||typeof b=="boolean"?L[A]=b:L[A]=b.clone(),!0;{const P=L[A];if(typeof b=="number"||typeof b=="boolean"){if(P!==b)return L[A]=b,!0}else if(P.equals(b)===!1)return P.copy(b),!0}return!1}function _(x){const v=x.uniforms;let w=0;const L=16;for(let A=0,P=v.length;A<P;A++){const Y=Array.isArray(v[A])?v[A]:[v[A]];for(let S=0,E=Y.length;S<E;S++){const W=Y[S],B=Array.isArray(W.value)?W.value:[W.value];for(let $=0,J=B.length;$<J;$++){const G=B[$],ee=y(G),D=w%L,Z=D%ee.boundary,K=D+Z;w+=Z,K!==0&&L-K<ee.storage&&(w+=L-K),W.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=w,w+=ee.storage}}}const b=w%L;return b>0&&(w+=L-b),x.__size=w,x.__cache={},this}function y(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function g(x){const v=x.target;v.removeEventListener("dispose",g);const w=o.indexOf(v.__bindingPointIndex);o.splice(w,1),t.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function u(){for(const x in r)t.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:l,update:c,dispose:u}}class q1{constructor(e={}){const{canvas:n=US(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=o;const p=new Uint32Array(4),_=new Int32Array(4);let y=null,g=null;const u=[],x=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Zn,this.toneMapping=Zi,this.toneMappingExposure=1;const v=this;let w=!1,L=0,b=0,A=null,P=-1,Y=null;const S=new Mt,E=new Mt;let W=null;const B=new tt(0);let $=0,J=n.width,G=n.height,ee=1,D=null,Z=null;const K=new Mt(0,0,J,G),re=new Mt(0,0,J,G);let Ee=!1;const Be=new Fv;let V=!1,ne=!1;const ue=new mt,de=new mt,Fe=new k,Ce=new Mt,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ze=!1;function Xe(){return A===null?ee:1}let N=i;function _t(T,U){return n.getContext(T,U)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${cf}`),n.addEventListener("webglcontextlost",Q,!1),n.addEventListener("webglcontextrestored",pe,!1),n.addEventListener("webglcontextcreationerror",_e,!1),N===null){const U="webgl2";if(N=_t(U,T),N===null)throw _t(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ge,$e,Le,nt,Ne,C,M,R,O,j,X,he,se,ae,xe,te,le,Se,be,fe,Oe,Re,it,I;function ge(){Ge=new eT(N),Ge.init(),Re=new z1(N,Ge),$e=new $w(N,Ge,e,Re),Le=new F1(N),$e.reverseDepthBuffer&&Le.buffers.depth.setReversed(!0),nt=new iT(N),Ne=new S1,C=new k1(N,Ge,Le,Ne,$e,Re,nt),M=new qw(v),R=new Jw(v),O=new cM(N),it=new Ww(N,O),j=new tT(N,O,nt,it),X=new sT(N,j,O,nt),be=new rT(N,$e,C),te=new Yw(Ne),he=new y1(v,M,R,Ge,$e,it,te),se=new $1(v,Ne),ae=new E1,xe=new R1(Ge),Se=new jw(v,M,R,Le,X,h,l),le=new I1(v,X,$e),I=new Y1(N,nt,$e,Le),fe=new Xw(N,Ge,nt),Oe=new nT(N,Ge,nt),nt.programs=he.programs,v.capabilities=$e,v.extensions=Ge,v.properties=Ne,v.renderLists=ae,v.shadowMap=le,v.state=Le,v.info=nt}ge();const q=new W1(v,N);this.xr=q,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const T=Ge.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ge.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(T){T!==void 0&&(ee=T,this.setSize(J,G,!1))},this.getSize=function(T){return T.set(J,G)},this.setSize=function(T,U,z=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=T,G=U,n.width=Math.floor(T*ee),n.height=Math.floor(U*ee),z===!0&&(n.style.width=T+"px",n.style.height=U+"px"),this.setViewport(0,0,T,U)},this.getDrawingBufferSize=function(T){return T.set(J*ee,G*ee).floor()},this.setDrawingBufferSize=function(T,U,z){J=T,G=U,ee=z,n.width=Math.floor(T*z),n.height=Math.floor(U*z),this.setViewport(0,0,T,U)},this.getCurrentViewport=function(T){return T.copy(S)},this.getViewport=function(T){return T.copy(K)},this.setViewport=function(T,U,z,H){T.isVector4?K.set(T.x,T.y,T.z,T.w):K.set(T,U,z,H),Le.viewport(S.copy(K).multiplyScalar(ee).round())},this.getScissor=function(T){return T.copy(re)},this.setScissor=function(T,U,z,H){T.isVector4?re.set(T.x,T.y,T.z,T.w):re.set(T,U,z,H),Le.scissor(E.copy(re).multiplyScalar(ee).round())},this.getScissorTest=function(){return Ee},this.setScissorTest=function(T){Le.setScissorTest(Ee=T)},this.setOpaqueSort=function(T){D=T},this.setTransparentSort=function(T){Z=T},this.getClearColor=function(T){return T.copy(Se.getClearColor())},this.setClearColor=function(){Se.setClearColor.apply(Se,arguments)},this.getClearAlpha=function(){return Se.getClearAlpha()},this.setClearAlpha=function(){Se.setClearAlpha.apply(Se,arguments)},this.clear=function(T=!0,U=!0,z=!0){let H=0;if(T){let F=!1;if(A!==null){const oe=A.texture.format;F=oe===mf||oe===pf||oe===ff}if(F){const oe=A.texture.type,me=oe===Mi||oe===Dr||oe===Bo||oe===Os||oe===df||oe===hf,Me=Se.getClearColor(),we=Se.getClearAlpha(),De=Me.r,Ie=Me.g,Te=Me.b;me?(p[0]=De,p[1]=Ie,p[2]=Te,p[3]=we,N.clearBufferuiv(N.COLOR,0,p)):(_[0]=De,_[1]=Ie,_[2]=Te,_[3]=we,N.clearBufferiv(N.COLOR,0,_))}else H|=N.COLOR_BUFFER_BIT}U&&(H|=N.DEPTH_BUFFER_BIT,N.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),z&&(H|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Q,!1),n.removeEventListener("webglcontextrestored",pe,!1),n.removeEventListener("webglcontextcreationerror",_e,!1),ae.dispose(),xe.dispose(),Ne.dispose(),M.dispose(),R.dispose(),X.dispose(),it.dispose(),I.dispose(),he.dispose(),q.dispose(),q.removeEventListener("sessionstart",Sf),q.removeEventListener("sessionend",Mf),or.stop()};function Q(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const T=nt.autoReset,U=le.enabled,z=le.autoUpdate,H=le.needsUpdate,F=le.type;ge(),nt.autoReset=T,le.enabled=U,le.autoUpdate=z,le.needsUpdate=H,le.type=F}function _e(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ye(T){const U=T.target;U.removeEventListener("dispose",Ye),Et(U)}function Et(T){Qt(T),Ne.remove(T)}function Qt(T){const U=Ne.get(T).programs;U!==void 0&&(U.forEach(function(z){he.releaseProgram(z)}),T.isShaderMaterial&&he.releaseShaderCache(T))}this.renderBufferDirect=function(T,U,z,H,F,oe){U===null&&(U=We);const me=F.isMesh&&F.matrixWorld.determinant()<0,Me=Kv(T,U,z,H,F);Le.setMaterial(H,me);let we=z.index,De=1;if(H.wireframe===!0){if(we=j.getWireframeAttribute(z),we===void 0)return;De=2}const Ie=z.drawRange,Te=z.attributes.position;let rt=Ie.start*De,lt=(Ie.start+Ie.count)*De;oe!==null&&(rt=Math.max(rt,oe.start*De),lt=Math.min(lt,(oe.start+oe.count)*De)),we!==null?(rt=Math.max(rt,0),lt=Math.min(lt,we.count)):Te!=null&&(rt=Math.max(rt,0),lt=Math.min(lt,Te.count));const vt=lt-rt;if(vt<0||vt===1/0)return;it.setup(F,H,Me,z,we);let dn,Qe=fe;if(we!==null&&(dn=O.get(we),Qe=Oe,Qe.setIndex(dn)),F.isMesh)H.wireframe===!0?(Le.setLineWidth(H.wireframeLinewidth*Xe()),Qe.setMode(N.LINES)):Qe.setMode(N.TRIANGLES);else if(F.isLine){let Ae=H.linewidth;Ae===void 0&&(Ae=1),Le.setLineWidth(Ae*Xe()),F.isLineSegments?Qe.setMode(N.LINES):F.isLineLoop?Qe.setMode(N.LINE_LOOP):Qe.setMode(N.LINE_STRIP)}else F.isPoints?Qe.setMode(N.POINTS):F.isSprite&&Qe.setMode(N.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Qe.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ge.get("WEBGL_multi_draw"))Qe.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ae=F._multiDrawStarts,Ut=F._multiDrawCounts,Je=F._multiDrawCount,Dn=we?O.get(we).bytesPerElement:1,zr=Ne.get(H).currentProgram.getUniforms();for(let hn=0;hn<Je;hn++)zr.setValue(N,"_gl_DrawID",hn),Qe.render(Ae[hn]/Dn,Ut[hn])}else if(F.isInstancedMesh)Qe.renderInstances(rt,vt,F.count);else if(z.isInstancedBufferGeometry){const Ae=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Ut=Math.min(z.instanceCount,Ae);Qe.renderInstances(rt,vt,Ut)}else Qe.render(rt,vt)};function Ke(T,U,z){T.transparent===!0&&T.side===di&&T.forceSinglePass===!1?(T.side=cn,T.needsUpdate=!0,ea(T,U,z),T.side=er,T.needsUpdate=!0,ea(T,U,z),T.side=di):ea(T,U,z)}this.compile=function(T,U,z=null){z===null&&(z=T),g=xe.get(z),g.init(U),x.push(g),z.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(g.pushLight(F),F.castShadow&&g.pushShadow(F))}),T!==z&&T.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(g.pushLight(F),F.castShadow&&g.pushShadow(F))}),g.setupLights();const H=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const oe=F.material;if(oe)if(Array.isArray(oe))for(let me=0;me<oe.length;me++){const Me=oe[me];Ke(Me,z,F),H.add(Me)}else Ke(oe,z,F),H.add(oe)}),x.pop(),g=null,H},this.compileAsync=function(T,U,z=null){const H=this.compile(T,U,z);return new Promise(F=>{function oe(){if(H.forEach(function(me){Ne.get(me).currentProgram.isReady()&&H.delete(me)}),H.size===0){F(T);return}setTimeout(oe,10)}Ge.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let Jt=null;function ni(T){Jt&&Jt(T)}function Sf(){or.stop()}function Mf(){or.start()}const or=new Ov;or.setAnimationLoop(ni),typeof self<"u"&&or.setContext(self),this.setAnimationLoop=function(T){Jt=T,q.setAnimationLoop(T),T===null?or.stop():or.start()},q.addEventListener("sessionstart",Sf),q.addEventListener("sessionend",Mf),this.render=function(T,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(U),U=q.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,U,A),g=xe.get(T,x.length),g.init(U),x.push(g),de.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Be.setFromProjectionMatrix(de),ne=this.localClippingEnabled,V=te.init(this.clippingPlanes,ne),y=ae.get(T,u.length),y.init(),u.push(y),q.enabled===!0&&q.isPresenting===!0){const oe=v.xr.getDepthSensingMesh();oe!==null&&fc(oe,U,-1/0,v.sortObjects)}fc(T,U,0,v.sortObjects),y.finish(),v.sortObjects===!0&&y.sort(D,Z),Ze=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Ze&&Se.addToRenderList(y,T),this.info.render.frame++,V===!0&&te.beginShadows();const z=g.state.shadowsArray;le.render(z,T,U),V===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=y.opaque,F=y.transmissive;if(g.setupLights(),U.isArrayCamera){const oe=U.cameras;if(F.length>0)for(let me=0,Me=oe.length;me<Me;me++){const we=oe[me];wf(H,F,T,we)}Ze&&Se.render(T);for(let me=0,Me=oe.length;me<Me;me++){const we=oe[me];Ef(y,T,we,we.viewport)}}else F.length>0&&wf(H,F,T,U),Ze&&Se.render(T),Ef(y,T,U);A!==null&&(C.updateMultisampleRenderTarget(A),C.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(v,T,U),it.resetDefaultState(),P=-1,Y=null,x.pop(),x.length>0?(g=x[x.length-1],V===!0&&te.setGlobalState(v.clippingPlanes,g.state.camera)):g=null,u.pop(),u.length>0?y=u[u.length-1]:y=null};function fc(T,U,z,H){if(T.visible===!1)return;if(T.layers.test(U.layers)){if(T.isGroup)z=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(U);else if(T.isLight)g.pushLight(T),T.castShadow&&g.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Be.intersectsSprite(T)){H&&Ce.setFromMatrixPosition(T.matrixWorld).applyMatrix4(de);const me=X.update(T),Me=T.material;Me.visible&&y.push(T,me,Me,z,Ce.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Be.intersectsObject(T))){const me=X.update(T),Me=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ce.copy(T.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Ce.copy(me.boundingSphere.center)),Ce.applyMatrix4(T.matrixWorld).applyMatrix4(de)),Array.isArray(Me)){const we=me.groups;for(let De=0,Ie=we.length;De<Ie;De++){const Te=we[De],rt=Me[Te.materialIndex];rt&&rt.visible&&y.push(T,me,rt,z,Ce.z,Te)}}else Me.visible&&y.push(T,me,Me,z,Ce.z,null)}}const oe=T.children;for(let me=0,Me=oe.length;me<Me;me++)fc(oe[me],U,z,H)}function Ef(T,U,z,H){const F=T.opaque,oe=T.transmissive,me=T.transparent;g.setupLightsView(z),V===!0&&te.setGlobalState(v.clippingPlanes,z),H&&Le.viewport(S.copy(H)),F.length>0&&Jo(F,U,z),oe.length>0&&Jo(oe,U,z),me.length>0&&Jo(me,U,z),Le.buffers.depth.setTest(!0),Le.buffers.depth.setMask(!0),Le.buffers.color.setMask(!0),Le.setPolygonOffset(!1)}function wf(T,U,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[H.id]===void 0&&(g.state.transmissionRenderTarget[H.id]=new Ir(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?$o:Mi,minFilter:Er,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const oe=g.state.transmissionRenderTarget[H.id],me=H.viewport||S;oe.setSize(me.z,me.w);const Me=v.getRenderTarget();v.setRenderTarget(oe),v.getClearColor(B),$=v.getClearAlpha(),$<1&&v.setClearColor(16777215,.5),v.clear(),Ze&&Se.render(z);const we=v.toneMapping;v.toneMapping=Zi;const De=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),g.setupLightsView(H),V===!0&&te.setGlobalState(v.clippingPlanes,H),Jo(T,z,H),C.updateMultisampleRenderTarget(oe),C.updateRenderTargetMipmap(oe),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let Te=0,rt=U.length;Te<rt;Te++){const lt=U[Te],vt=lt.object,dn=lt.geometry,Qe=lt.material,Ae=lt.group;if(Qe.side===di&&vt.layers.test(H.layers)){const Ut=Qe.side;Qe.side=cn,Qe.needsUpdate=!0,Tf(vt,z,H,dn,Qe,Ae),Qe.side=Ut,Qe.needsUpdate=!0,Ie=!0}}Ie===!0&&(C.updateMultisampleRenderTarget(oe),C.updateRenderTargetMipmap(oe))}v.setRenderTarget(Me),v.setClearColor(B,$),De!==void 0&&(H.viewport=De),v.toneMapping=we}function Jo(T,U,z){const H=U.isScene===!0?U.overrideMaterial:null;for(let F=0,oe=T.length;F<oe;F++){const me=T[F],Me=me.object,we=me.geometry,De=H===null?me.material:H,Ie=me.group;Me.layers.test(z.layers)&&Tf(Me,U,z,we,De,Ie)}}function Tf(T,U,z,H,F,oe){T.onBeforeRender(v,U,z,H,F,oe),T.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(v,U,z,H,T,oe),F.transparent===!0&&F.side===di&&F.forceSinglePass===!1?(F.side=cn,F.needsUpdate=!0,v.renderBufferDirect(z,U,H,F,T,oe),F.side=er,F.needsUpdate=!0,v.renderBufferDirect(z,U,H,F,T,oe),F.side=di):v.renderBufferDirect(z,U,H,F,T,oe),T.onAfterRender(v,U,z,H,F,oe)}function ea(T,U,z){U.isScene!==!0&&(U=We);const H=Ne.get(T),F=g.state.lights,oe=g.state.shadowsArray,me=F.state.version,Me=he.getParameters(T,F.state,oe,U,z),we=he.getProgramCacheKey(Me);let De=H.programs;H.environment=T.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(T.isMeshStandardMaterial?R:M).get(T.envMap||H.environment),H.envMapRotation=H.environment!==null&&T.envMap===null?U.environmentRotation:T.envMapRotation,De===void 0&&(T.addEventListener("dispose",Ye),De=new Map,H.programs=De);let Ie=De.get(we);if(Ie!==void 0){if(H.currentProgram===Ie&&H.lightsStateVersion===me)return bf(T,Me),Ie}else Me.uniforms=he.getUniforms(T),T.onBeforeCompile(Me,v),Ie=he.acquireProgram(Me,we),De.set(we,Ie),H.uniforms=Me.uniforms;const Te=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Te.clippingPlanes=te.uniform),bf(T,Me),H.needsLights=Qv(T),H.lightsStateVersion=me,H.needsLights&&(Te.ambientLightColor.value=F.state.ambient,Te.lightProbe.value=F.state.probe,Te.directionalLights.value=F.state.directional,Te.directionalLightShadows.value=F.state.directionalShadow,Te.spotLights.value=F.state.spot,Te.spotLightShadows.value=F.state.spotShadow,Te.rectAreaLights.value=F.state.rectArea,Te.ltc_1.value=F.state.rectAreaLTC1,Te.ltc_2.value=F.state.rectAreaLTC2,Te.pointLights.value=F.state.point,Te.pointLightShadows.value=F.state.pointShadow,Te.hemisphereLights.value=F.state.hemi,Te.directionalShadowMap.value=F.state.directionalShadowMap,Te.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Te.spotShadowMap.value=F.state.spotShadowMap,Te.spotLightMatrix.value=F.state.spotLightMatrix,Te.spotLightMap.value=F.state.spotLightMap,Te.pointShadowMap.value=F.state.pointShadowMap,Te.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=Ie,H.uniformsList=null,Ie}function Af(T){if(T.uniformsList===null){const U=T.currentProgram.getUniforms();T.uniformsList=dl.seqWithValue(U.seq,T.uniforms)}return T.uniformsList}function bf(T,U){const z=Ne.get(T);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function Kv(T,U,z,H,F){U.isScene!==!0&&(U=We),C.resetTextureUnits();const oe=U.fog,me=H.isMeshStandardMaterial?U.environment:null,Me=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:sr,we=(H.isMeshStandardMaterial?R:M).get(H.envMap||me),De=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ie=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Te=!!z.morphAttributes.position,rt=!!z.morphAttributes.normal,lt=!!z.morphAttributes.color;let vt=Zi;H.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(vt=v.toneMapping);const dn=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Qe=dn!==void 0?dn.length:0,Ae=Ne.get(H),Ut=g.state.lights;if(V===!0&&(ne===!0||T!==Y)){const Mn=T===Y&&H.id===P;te.setState(H,T,Mn)}let Je=!1;H.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==Ut.state.version||Ae.outputColorSpace!==Me||F.isBatchedMesh&&Ae.batching===!1||!F.isBatchedMesh&&Ae.batching===!0||F.isBatchedMesh&&Ae.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ae.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ae.instancing===!1||!F.isInstancedMesh&&Ae.instancing===!0||F.isSkinnedMesh&&Ae.skinning===!1||!F.isSkinnedMesh&&Ae.skinning===!0||F.isInstancedMesh&&Ae.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ae.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ae.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ae.instancingMorph===!1&&F.morphTexture!==null||Ae.envMap!==we||H.fog===!0&&Ae.fog!==oe||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==te.numPlanes||Ae.numIntersection!==te.numIntersection)||Ae.vertexAlphas!==De||Ae.vertexTangents!==Ie||Ae.morphTargets!==Te||Ae.morphNormals!==rt||Ae.morphColors!==lt||Ae.toneMapping!==vt||Ae.morphTargetsCount!==Qe)&&(Je=!0):(Je=!0,Ae.__version=H.version);let Dn=Ae.currentProgram;Je===!0&&(Dn=ea(H,U,F));let zr=!1,hn=!1,pc=!1;const yt=Dn.getUniforms(),Ai=Ae.uniforms;if(Le.useProgram(Dn.program)&&(zr=!0,hn=!0,pc=!0),H.id!==P&&(P=H.id,hn=!0),zr||Y!==T){$e.reverseDepthBuffer?(ue.copy(T.projectionMatrix),OS(ue),kS(ue),yt.setValue(N,"projectionMatrix",ue)):yt.setValue(N,"projectionMatrix",T.projectionMatrix),yt.setValue(N,"viewMatrix",T.matrixWorldInverse);const Mn=yt.map.cameraPosition;Mn!==void 0&&Mn.setValue(N,Fe.setFromMatrixPosition(T.matrixWorld)),$e.logarithmicDepthBuffer&&yt.setValue(N,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&yt.setValue(N,"isOrthographic",T.isOrthographicCamera===!0),Y!==T&&(Y=T,hn=!0,pc=!0)}if(F.isSkinnedMesh){yt.setOptional(N,F,"bindMatrix"),yt.setOptional(N,F,"bindMatrixInverse");const Mn=F.skeleton;Mn&&(Mn.boneTexture===null&&Mn.computeBoneTexture(),yt.setValue(N,"boneTexture",Mn.boneTexture,C))}F.isBatchedMesh&&(yt.setOptional(N,F,"batchingTexture"),yt.setValue(N,"batchingTexture",F._matricesTexture,C),yt.setOptional(N,F,"batchingIdTexture"),yt.setValue(N,"batchingIdTexture",F._indirectTexture,C),yt.setOptional(N,F,"batchingColorTexture"),F._colorsTexture!==null&&yt.setValue(N,"batchingColorTexture",F._colorsTexture,C));const mc=z.morphAttributes;if((mc.position!==void 0||mc.normal!==void 0||mc.color!==void 0)&&be.update(F,z,Dn),(hn||Ae.receiveShadow!==F.receiveShadow)&&(Ae.receiveShadow=F.receiveShadow,yt.setValue(N,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Ai.envMap.value=we,Ai.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(Ai.envMapIntensity.value=U.environmentIntensity),hn&&(yt.setValue(N,"toneMappingExposure",v.toneMappingExposure),Ae.needsLights&&Zv(Ai,pc),oe&&H.fog===!0&&se.refreshFogUniforms(Ai,oe),se.refreshMaterialUniforms(Ai,H,ee,G,g.state.transmissionRenderTarget[T.id]),dl.upload(N,Af(Ae),Ai,C)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(dl.upload(N,Af(Ae),Ai,C),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&yt.setValue(N,"center",F.center),yt.setValue(N,"modelViewMatrix",F.modelViewMatrix),yt.setValue(N,"normalMatrix",F.normalMatrix),yt.setValue(N,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Mn=H.uniformsGroups;for(let gc=0,Jv=Mn.length;gc<Jv;gc++){const Cf=Mn[gc];I.update(Cf,Dn),I.bind(Cf,Dn)}}return Dn}function Zv(T,U){T.ambientLightColor.needsUpdate=U,T.lightProbe.needsUpdate=U,T.directionalLights.needsUpdate=U,T.directionalLightShadows.needsUpdate=U,T.pointLights.needsUpdate=U,T.pointLightShadows.needsUpdate=U,T.spotLights.needsUpdate=U,T.spotLightShadows.needsUpdate=U,T.rectAreaLights.needsUpdate=U,T.hemisphereLights.needsUpdate=U}function Qv(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,U,z){Ne.get(T.texture).__webglTexture=U,Ne.get(T.depthTexture).__webglTexture=z;const H=Ne.get(T);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=z===void 0,H.__autoAllocateDepthBuffer||Ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,U){const z=Ne.get(T);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(T,U=0,z=0){A=T,L=U,b=z;let H=!0,F=null,oe=!1,me=!1;if(T){const we=Ne.get(T);if(we.__useDefaultFramebuffer!==void 0)Le.bindFramebuffer(N.FRAMEBUFFER,null),H=!1;else if(we.__webglFramebuffer===void 0)C.setupRenderTarget(T);else if(we.__hasExternalTextures)C.rebindTextures(T,Ne.get(T.texture).__webglTexture,Ne.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Te=T.depthTexture;if(we.__boundDepthTexture!==Te){if(Te!==null&&Ne.has(Te)&&(T.width!==Te.image.width||T.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(T)}}const De=T.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(me=!0);const Ie=Ne.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ie[U])?F=Ie[U][z]:F=Ie[U],oe=!0):T.samples>0&&C.useMultisampledRTT(T)===!1?F=Ne.get(T).__webglMultisampledFramebuffer:Array.isArray(Ie)?F=Ie[z]:F=Ie,S.copy(T.viewport),E.copy(T.scissor),W=T.scissorTest}else S.copy(K).multiplyScalar(ee).floor(),E.copy(re).multiplyScalar(ee).floor(),W=Ee;if(Le.bindFramebuffer(N.FRAMEBUFFER,F)&&H&&Le.drawBuffers(T,F),Le.viewport(S),Le.scissor(E),Le.setScissorTest(W),oe){const we=Ne.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+U,we.__webglTexture,z)}else if(me){const we=Ne.get(T.texture),De=U||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,we.__webglTexture,z||0,De)}P=-1},this.readRenderTargetPixels=function(T,U,z,H,F,oe,me){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=Ne.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&me!==void 0&&(Me=Me[me]),Me){Le.bindFramebuffer(N.FRAMEBUFFER,Me);try{const we=T.texture,De=we.format,Ie=we.type;if(!$e.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$e.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=T.width-H&&z>=0&&z<=T.height-F&&N.readPixels(U,z,H,F,Re.convert(De),Re.convert(Ie),oe)}finally{const we=A!==null?Ne.get(A).__webglFramebuffer:null;Le.bindFramebuffer(N.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(T,U,z,H,F,oe,me){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=Ne.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&me!==void 0&&(Me=Me[me]),Me){const we=T.texture,De=we.format,Ie=we.type;if(!$e.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$e.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=T.width-H&&z>=0&&z<=T.height-F){Le.bindFramebuffer(N.FRAMEBUFFER,Me);const Te=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Te),N.bufferData(N.PIXEL_PACK_BUFFER,oe.byteLength,N.STREAM_READ),N.readPixels(U,z,H,F,Re.convert(De),Re.convert(Ie),0);const rt=A!==null?Ne.get(A).__webglFramebuffer:null;Le.bindFramebuffer(N.FRAMEBUFFER,rt);const lt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await FS(N,lt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Te),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,oe),N.deleteBuffer(Te),N.deleteSync(lt),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,U=null,z=0){T.isTexture!==!0&&(ul("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,T=arguments[1]);const H=Math.pow(2,-z),F=Math.floor(T.image.width*H),oe=Math.floor(T.image.height*H),me=U!==null?U.x:0,Me=U!==null?U.y:0;C.setTexture2D(T,0),N.copyTexSubImage2D(N.TEXTURE_2D,z,0,0,me,Me,F,oe),Le.unbindTexture()},this.copyTextureToTexture=function(T,U,z=null,H=null,F=0){T.isTexture!==!0&&(ul("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,T=arguments[1],U=arguments[2],F=arguments[3]||0,z=null);let oe,me,Me,we,De,Ie;z!==null?(oe=z.max.x-z.min.x,me=z.max.y-z.min.y,Me=z.min.x,we=z.min.y):(oe=T.image.width,me=T.image.height,Me=0,we=0),H!==null?(De=H.x,Ie=H.y):(De=0,Ie=0);const Te=Re.convert(U.format),rt=Re.convert(U.type);C.setTexture2D(U,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);const lt=N.getParameter(N.UNPACK_ROW_LENGTH),vt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),dn=N.getParameter(N.UNPACK_SKIP_PIXELS),Qe=N.getParameter(N.UNPACK_SKIP_ROWS),Ae=N.getParameter(N.UNPACK_SKIP_IMAGES),Ut=T.isCompressedTexture?T.mipmaps[F]:T.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,Ut.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ut.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Me),N.pixelStorei(N.UNPACK_SKIP_ROWS,we),T.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,F,De,Ie,oe,me,Te,rt,Ut.data):T.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,F,De,Ie,Ut.width,Ut.height,Te,Ut.data):N.texSubImage2D(N.TEXTURE_2D,F,De,Ie,oe,me,Te,rt,Ut),N.pixelStorei(N.UNPACK_ROW_LENGTH,lt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,vt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,dn),N.pixelStorei(N.UNPACK_SKIP_ROWS,Qe),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ae),F===0&&U.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),Le.unbindTexture()},this.copyTextureToTexture3D=function(T,U,z=null,H=null,F=0){T.isTexture!==!0&&(ul("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,H=arguments[1]||null,T=arguments[2],U=arguments[3],F=arguments[4]||0);let oe,me,Me,we,De,Ie,Te,rt,lt;const vt=T.isCompressedTexture?T.mipmaps[F]:T.image;z!==null?(oe=z.max.x-z.min.x,me=z.max.y-z.min.y,Me=z.max.z-z.min.z,we=z.min.x,De=z.min.y,Ie=z.min.z):(oe=vt.width,me=vt.height,Me=vt.depth,we=0,De=0,Ie=0),H!==null?(Te=H.x,rt=H.y,lt=H.z):(Te=0,rt=0,lt=0);const dn=Re.convert(U.format),Qe=Re.convert(U.type);let Ae;if(U.isData3DTexture)C.setTexture3D(U,0),Ae=N.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)C.setTexture2DArray(U,0),Ae=N.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);const Ut=N.getParameter(N.UNPACK_ROW_LENGTH),Je=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Dn=N.getParameter(N.UNPACK_SKIP_PIXELS),zr=N.getParameter(N.UNPACK_SKIP_ROWS),hn=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,vt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,vt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,we),N.pixelStorei(N.UNPACK_SKIP_ROWS,De),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ie),T.isDataTexture||T.isData3DTexture?N.texSubImage3D(Ae,F,Te,rt,lt,oe,me,Me,dn,Qe,vt.data):U.isCompressedArrayTexture?N.compressedTexSubImage3D(Ae,F,Te,rt,lt,oe,me,Me,dn,vt.data):N.texSubImage3D(Ae,F,Te,rt,lt,oe,me,Me,dn,Qe,vt),N.pixelStorei(N.UNPACK_ROW_LENGTH,Ut),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Je),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Dn),N.pixelStorei(N.UNPACK_SKIP_ROWS,zr),N.pixelStorei(N.UNPACK_SKIP_IMAGES,hn),F===0&&U.generateMipmaps&&N.generateMipmap(Ae),Le.unbindTexture()},this.initRenderTarget=function(T){Ne.get(T).__webglFramebuffer===void 0&&C.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?C.setTextureCube(T,0):T.isData3DTexture?C.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?C.setTexture2DArray(T,0):C.setTexture2D(T,0),Le.unbindTexture()},this.resetState=function(){L=0,b=0,A=null,Le.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===gf?"display-p3":"srgb",n.unpackColorSpace=et.workingColorSpace===cc?"display-p3":"srgb"}}class K1 extends qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class ah extends Gs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Gl=new k,jl=new k,Um=new mt,oo=new Zo,Ba=new Ko,yu=new k,Fm=new k;class Gv extends qt{constructor(e=new Pn,n=new ah){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Gl.fromBufferAttribute(n,r-1),jl.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Gl.distanceTo(jl);e.setAttribute("lineDistance",new Xn(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ba.copy(i.boundingSphere),Ba.applyMatrix4(r),Ba.radius+=s,e.ray.intersectsSphere(Ba)===!1)return;Um.copy(r).invert(),oo.copy(e.ray).applyMatrix4(Um);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,d=i.index,h=i.attributes.position;if(d!==null){const p=Math.max(0,o.start),_=Math.min(d.count,o.start+o.count);for(let y=p,g=_-1;y<g;y+=c){const u=d.getX(y),x=d.getX(y+1),v=Ha(this,e,oo,l,u,x);v&&n.push(v)}if(this.isLineLoop){const y=d.getX(_-1),g=d.getX(p),u=Ha(this,e,oo,l,y,g);u&&n.push(u)}}else{const p=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let y=p,g=_-1;y<g;y+=c){const u=Ha(this,e,oo,l,y,y+1);u&&n.push(u)}if(this.isLineLoop){const y=Ha(this,e,oo,l,_-1,p);y&&n.push(y)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Ha(t,e,n,i,r,s){const o=t.geometry.attributes.position;if(Gl.fromBufferAttribute(o,r),jl.fromBufferAttribute(o,s),n.distanceSqToSegment(Gl,jl,yu,Fm)>i)return;yu.applyMatrix4(t.matrixWorld);const l=e.ray.origin.distanceTo(yu);if(!(l<e.near||l>e.far))return{distance:l,point:Fm.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const Om=new k,km=new k;class Z1 extends Gv{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)Om.fromBufferAttribute(n,r),km.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Om.distanceTo(km);e.setAttribute("lineDistance",new Xn(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Q1 extends Gv{constructor(e,n){super(e,n),this.isLineLoop=!0,this.type="LineLoop"}}class J1 extends Gs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const zm=new mt,lh=new Zo,Va=new Ko,Ga=new k;class eA extends qt{constructor(e=new Pn,n=new J1){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Va.copy(i.boundingSphere),Va.applyMatrix4(r),Va.radius+=s,e.ray.intersectsSphere(Va)===!1)return;zm.copy(r).invert(),lh.copy(e.ray).applyMatrix4(zm);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let _=h,y=p;_<y;_++){const g=c.getX(_);Ga.fromBufferAttribute(f,g),Bm(Ga,g,l,r,e,n,this)}}else{const h=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let _=h,y=p;_<y;_++)Ga.fromBufferAttribute(f,_),Bm(Ga,_,l,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Bm(t,e,n,i,r,s,o){const a=lh.distanceSqToPoint(t);if(a<n){const l=new k;lh.closestPointToPoint(t,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}const Hm=new mt;class tA{constructor(e,n,i=0,r=1/0){this.ray=new Zo(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new _f,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return Hm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hm),this}intersectObject(e,n=!0,i=[]){return ch(e,this,i,n),i.sort(Vm),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)ch(e[r],this,i,n);return i.sort(Vm),i}}function Vm(t,e){return t.distance-e.distance}function ch(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let o=0,a=s.length;o<a;o++)ch(s[o],e,n,!0)}}class Gm{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos($t(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class nA extends kr{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:cf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=cf);const jm={type:"change"},xf={type:"start"},jv={type:"end"},ja=new Zo,Wm=new Fi,iA=Math.cos(70*IS.DEG2RAD),At=new k,tn=2*Math.PI,ot={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Su=1e-6;class rA extends nA{constructor(e,n=null){super(e,n),this.state=ot.NONE,this.enabled=!0,this.target=new k,this.cursor=new k,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ss.ROTATE,MIDDLE:Ss.DOLLY,RIGHT:Ss.PAN},this.touches={ONE:fs.ROTATE,TWO:fs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new k,this._lastQuaternion=new Ur,this._lastTargetPosition=new k,this._quat=new Ur().setFromUnitVectors(e.up,new k(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Gm,this._sphericalDelta=new Gm,this._scale=1,this._panOffset=new k,this._rotateStart=new He,this._rotateEnd=new He,this._rotateDelta=new He,this._panStart=new He,this._panEnd=new He,this._panDelta=new He,this._dollyStart=new He,this._dollyEnd=new He,this._dollyDelta=new He,this._dollyDirection=new k,this._mouse=new He,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=oA.bind(this),this._onPointerDown=sA.bind(this),this._onPointerUp=aA.bind(this),this._onContextMenu=pA.bind(this),this._onMouseWheel=uA.bind(this),this._onKeyDown=dA.bind(this),this._onTouchStart=hA.bind(this),this._onTouchMove=fA.bind(this),this._onMouseDown=lA.bind(this),this._onMouseMove=cA.bind(this),this._interceptControlDown=mA.bind(this),this._interceptControlUp=gA.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(jm),this.update(),this.state=ot.NONE}update(e=null){const n=this.object.position;At.copy(n).sub(this.target),At.applyQuaternion(this._quat),this._spherical.setFromVector3(At),this.autoRotate&&this.state===ot.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=tn:i>Math.PI&&(i-=tn),r<-Math.PI?r+=tn:r>Math.PI&&(r-=tn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(At.setFromSpherical(this._spherical),At.applyQuaternion(this._quatInverse),n.copy(this.target).add(At),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=At.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new k(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new k(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=At.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ja.origin.copy(this.object.position),ja.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ja.direction))<iA?this.object.lookAt(this.target):(Wm.setFromNormalAndCoplanarPoint(this.object.up,this.target),ja.intersectPlane(Wm,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Su||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Su||this._lastTargetPosition.distanceToSquared(this.target)>Su?(this.dispatchEvent(jm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?tn/60*this.autoRotateSpeed*e:tn/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){At.setFromMatrixColumn(n,0),At.multiplyScalar(-e),this._panOffset.add(At)}_panUp(e,n){this.screenSpacePanning===!0?At.setFromMatrixColumn(n,1):(At.setFromMatrixColumn(n,0),At.crossVectors(this.object.up,At)),At.multiplyScalar(e),this._panOffset.add(At)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;At.copy(r).sub(this.target);let s=At.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(tn*this._rotateDelta.x/n.clientHeight),this._rotateUp(tn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(tn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-tn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(tn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-tn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(tn*this._rotateDelta.x/n.clientHeight),this._rotateUp(tn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+n.x)*.5,a=(e.pageY+n.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new He,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function sA(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t)))}function oA(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function aA(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(jv),this.state=ot.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function lA(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ss.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=ot.DOLLY;break;case Ss.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=ot.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=ot.ROTATE}break;case Ss.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=ot.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=ot.PAN}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(xf)}function cA(t){switch(this.state){case ot.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case ot.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case ot.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function uA(t){this.enabled===!1||this.enableZoom===!1||this.state!==ot.NONE||(t.preventDefault(),this.dispatchEvent(xf),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(jv))}function dA(t){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(t)}function hA(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case fs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=ot.TOUCH_ROTATE;break;case fs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=ot.TOUCH_PAN;break;default:this.state=ot.NONE}break;case 2:switch(this.touches.TWO){case fs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=ot.TOUCH_DOLLY_PAN;break;case fs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=ot.TOUCH_DOLLY_ROTATE;break;default:this.state=ot.NONE}break;default:this.state=ot.NONE}this.state!==ot.NONE&&this.dispatchEvent(xf)}function fA(t){switch(this._trackPointer(t),this.state){case ot.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case ot.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case ot.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case ot.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=ot.NONE}}function pA(t){this.enabled!==!1&&t.preventDefault()}function mA(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function gA(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Mu=[[0,[34,41,82]],[.25,[36,91,143]],[.5,[63,180,208]],[.75,[180,238,210]],[1,[255,226,154]]];function Wv(t){const e=Math.min(1,Math.max(0,t));for(let n=1;n<Mu.length;n++){const[i,r]=Mu[n];if(e<=i){const[s,o]=Mu[n-1],a=(e-s)/(i-s);return[0,1,2].map(l=>(o[l]+(r[l]-o[l])*a)/255)}}return[1,.886,.604]}function _A(t){if(!Number.isFinite(t)||t>-.06&&t<.08)return"transparent";if(t<0)return`rgb(255 122 138 / ${Math.min(.8,-t*1.5)})`;const[e,n,i]=Wv(.35+t*.65);return`rgb(${Math.round(e*255)} ${Math.round(n*255)} ${Math.round(i*255)} / ${.18+t*.72})`}const vA=t=>Number.isFinite(t)&&t>.6?"#141833":"inherit",Xv="#ffe29a",$v="#ff7a8a",xA=.42,ao=1,yA=`
  attribute vec3 color;
  attribute float size;
  attribute float alpha;
  uniform float uScale;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vColor = color;
    vAlpha = alpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * uScale / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`,SA=`
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float core = smoothstep(0.55, 0.0, d);
    float halo = smoothstep(1.0, 0.2, d) * 0.35;
    gl_FragColor = vec4(vColor * (core + halo), (core + halo) * vAlpha);
  }
`;function Eu(t,e){return(t-(e-1)/2)*xA}function MA({atlas:t}){const e=ye.useRef(null),n=ye.useRef(null);return ye.useEffect(()=>{var M;const i=e.current,{L:r,N:s}=t,o=r*s;let a;try{a=new q1({antialias:!0,alpha:!0})}catch{Ve({webglError:"Your browser could not start WebGL, so the 3D view cannot be drawn. It may be turned off, or the graphics driver may be blocked."});return}a.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.appendChild(a.domElement);const l=new K1,c=new An(38,1,.05,50),d=new k(3.2,1.7,3.9);c.position.copy(d);let f=!1;const h=new rA(c,a.domElement);h.enableDamping=!0,h.dampingFactor=.08,h.minDistance=1.2,h.maxDistance=9,h.target.set(0,0,0);const p=new Float32Array(o*3),_=R=>{const O=new Float32Array(o*3);for(let j=0;j<o;j++)O[j*3]=R[j*2]*ao,O[j*3+1]=Eu(Math.floor(j/s),r),O[j*3+2]=R[j*2+1]*ao;return O},y=_(t.layout);p.set(y);let g=y,u=y,x=1,v=0;const w=((M=window.matchMedia)==null?void 0:M.call(window,"(prefers-reduced-motion: reduce)").matches)??!1,L=R=>R.layoutMode==="cofire"&&R.sweep&&R.sweep.cofire.length===o*2?_(R.sweep.cofire):y,b=new Pn;b.setAttribute("position",new sn(p,3));const A=new Float32Array(o*3),P=new Float32Array(o),Y=new Float32Array(o);b.setAttribute("color",new sn(A,3)),b.setAttribute("size",new sn(P,1)),b.setAttribute("alpha",new sn(Y,1));const S=new wi({vertexShader:yA,fragmentShader:SA,uniforms:{uScale:{value:1}},transparent:!0,depthWrite:!1,blending:Ol}),E=new eA(b,S);l.add(E);const W=new ah({color:3752058,transparent:!0,opacity:.55}),B=[];for(let R=0;R<r;R++){const O=ao*1.08,j=Eu(R,r),X=new Pn().setFromPoints([new k(-O,j,-O),new k(O,j,-O),new k(O,j,O),new k(-O,j,O)]),he=new Q1(X,W.clone());B.push(he),l.add(he)}const $=new Pn,J=new ah({vertexColors:!0,transparent:!0,opacity:.85,blending:Ol,depthWrite:!1}),G=new Z1($,J);l.add(G);const ee=[];for(let R=0;R<r;R++){const O=document.createElement("button");O.className="layer-label",O.textContent=`layer ${R}`,O.title=`Show only layer ${R} (click again to show all)`,O.onclick=()=>Ve(j=>({isolateLayer:j.isolateLayer===R?null:R})),n.current.appendChild(O),ee.push(O)}let D=null,Z=null;const K=R=>{if(!R.sweep)return null;const O=R.sweep.zArray(),j=Float32Array.from(O).filter(Number.isFinite).sort(),X=Math.max(j[Math.floor(j.length*.995)]??1,3),he=2,se=new Float32Array(o);for(let ae=0;ae<o;ae++)se[ae]=Number.isFinite(O[ae])?Math.min(1,Math.max(0,(O[ae]-he)/(X-he))):0;return se},re=R=>{const O=R.analysis;if(!O||!O.tokens.length)return null;const j=O.tokens.length,X=new Float32Array(o),he=R.probePos!==null&&R.probePos<j?R.probePos:null;for(let se=0;se<o;se++){let ae=0;if(he!==null)ae=O.acts[he*o+se];else for(let xe=0;xe<j;xe++)ae=Math.max(ae,O.acts[xe*o+se]);X[se]=ae/Math.max(t.max[se],.25)}return X},Ee=()=>{const R=gn(),O=new Set(R.edits.filter(xe=>xe.enabled!==!1).map(Yn)),j=R.focus?t.g(R.focus):-1,X=R.hover?t.g(R.hover):-1,he=new Set;if(R.focus&&R.showWeb)for(const xe of[...t.links(R.focus,"up"),...t.links(R.focus,"down")])he.add(t.g(xe));for(let xe=0;xe<o;xe++){const te=Math.floor(xe/s);let le,Se=7;if(R.colorMode==="probe"&&D){const it=Math.max(0,D[xe]);le=Math.pow(Math.min(it,1),.8),Se=5+16*Math.min(it,1.2)}else R.colorMode==="uniqueness"&&Z?(le=.14+.86*Math.pow(Z[xe],.7),Se=5+15*Z[xe]):R.colorMode==="density"?le=Math.sqrt(t.density[xe]):(le=Math.max(0,(t.share[xe]-.1)/.9),Se=5+9*le);let[be,fe,Oe]=Wv(le),Re=.25+.75*le;O.has(`${te}:${xe%s}`)&&([be,fe,Oe]=[.73,.65,1],Se=Math.max(Se,16),Re=1),he.has(xe)&&(Se=Math.max(Se,14),Re=1),xe===X&&(Se=Math.max(Se*1.6,20),Re=1),xe===j&&([be,fe,Oe]=[1,.95,.85],Se=30,Re=1),R.isolateLayer!==null&&te!==R.isolateLayer&&(Re*=.08),A[xe*3]=be,A[xe*3+1]=fe,A[xe*3+2]=Oe,P[xe]=Se,Y[xe]=Re}b.attributes.color.needsUpdate=!0,b.attributes.size.needsUpdate=!0,b.attributes.alpha.needsUpdate=!0,B.forEach((xe,te)=>{xe.material.opacity=R.isolateLayer===null||R.isolateLayer===te?.55:.1}),ee.forEach((xe,te)=>xe.classList.toggle("on",R.isolateLayer===te));const se=[],ae=[];if(R.focus&&R.showWeb){const xe=[...t.links(R.focus,"up"),...t.links(R.focus,"down")],te=Math.max(...xe.map(le=>Math.abs(le.w)),1e-6);for(const le of xe){const Se=t.g(le);se.push(p[j*3],p[j*3+1],p[j*3+2],p[Se*3],p[Se*3+1],p[Se*3+2]);const be=le.w>0?[1,.886,.604]:[1,.478,.541],fe=.25+.75*(Math.abs(le.w)/te);ae.push(...be.map(Oe=>Oe*fe),...be.map(Oe=>Oe*fe*.7))}}$.setAttribute("position",new Xn(se,3)),$.setAttribute("color",new Xn(ae,3))},Be=R=>{const O=L(R);g=Float32Array.from(p),u=O,v=performance.now(),x=w?1:0,w&&(p.set(u),b.attributes.position.needsUpdate=!0,b.computeBoundingSphere(),Ee())};let V=gn();D=re(V),Z=K(V),V.layoutMode==="cofire"&&V.sweep&&Be(V),Ee();const ne=lf(()=>{const R=gn();(R.analysis!==V.analysis||R.probePos!==V.probePos)&&(D=re(R)),R.sweep!==V.sweep&&(Z=K(R)),(R.layoutMode!==V.layoutMode||R.sweep!==V.sweep)&&Be(R),(R.sweep!==V.sweep||R.analysis!==V.analysis||R.probePos!==V.probePos||R.focus!==V.focus||R.hover!==V.hover||R.edits!==V.edits||R.colorMode!==V.colorMode||R.showWeb!==V.showWeb||R.isolateLayer!==V.isolateLayer)&&Ee(),V=R}),ue=new tA,de=new He,Fe=R=>{const O=a.domElement.getBoundingClientRect();de.set((R.clientX-O.left)/O.width*2-1,-((R.clientY-O.top)/O.height)*2+1),ue.setFromCamera(de,c),ue.params.Points={threshold:.022*c.position.distanceTo(h.target)/3};const j=gn().isolateLayer,X=ue.intersectObject(E).filter(he=>j===null||Math.floor(he.index/s)===j);return X.length?(X.sort((he,se)=>he.distanceToRay-se.distanceToRay),t.ref(X[0].index)):null};let Ce={x:0,y:0};const We=R=>{if(R.buttons)return;const O=Fe(R),j=gn().hover;(O&&(!j||t.g(O)!==t.g(j))||!O&&j)&&Ve({hover:O}),a.domElement.style.cursor=O?"pointer":"grab"},Ze=R=>{Ce={x:R.clientX,y:R.clientY},f=!0},Xe=R=>{if(Math.hypot(R.clientX-Ce.x,R.clientY-Ce.y)>5)return;const O=Fe(R);O&&Nr(O)},N=()=>Ve({hover:null}),_t=a.domElement;_t.addEventListener("pointermove",We),_t.addEventListener("pointerdown",Ze),_t.addEventListener("pointerup",Xe),_t.addEventListener("pointerleave",N),_t.addEventListener("wheel",()=>f=!0,{passive:!0});const Ge=R=>{R.preventDefault(),cancelAnimationFrame(Ne),Ve({webglError:"The graphics context was lost (the GPU was reset or the tab used too much memory)."})};_t.addEventListener("webglcontextlost",Ge);const $e=()=>{const R=i.clientWidth,O=i.clientHeight;a.setSize(R,O,!1),c.aspect=R/O,c.updateProjectionMatrix(),f||c.position.copy(d).multiplyScalar(Math.max(1,Math.pow(1.4/c.aspect,.75))),S.uniforms.uScale.value=O*a.getPixelRatio()*.0042},Le=new ResizeObserver($e);Le.observe(i),$e();const nt=new k;let Ne=0;const C=()=>{if(x<1){x=Math.min(1,(performance.now()-v)/900);const j=x<.5?4*x**3:1-(-2*x+2)**3/2;for(let X=0;X<p.length;X++)p[X]=g[X]+(u[X]-g[X])*j;b.attributes.position.needsUpdate=!0,x===1&&(b.computeBoundingSphere(),Ee())}h.update(),a.render(l,c);const R=i.clientWidth,O=i.clientHeight;for(let j=0;j<r;j++)nt.set(-ao*1.1,Eu(j,r),ao*1.1).project(c),ee[j].style.transform=`translate(${(nt.x+1)/2*R}px, ${(1-nt.y)/2*O}px) translate(-100%, -50%)`;Ne=requestAnimationFrame(C)};return C(),()=>{cancelAnimationFrame(Ne),ne(),Le.disconnect(),h.dispose(),a.dispose(),b.dispose(),$.dispose(),_t.removeEventListener("webglcontextlost",Ge),_t.remove(),ee.forEach(R=>R.remove())}},[t]),m.jsx("div",{className:"map",ref:e,children:m.jsx("div",{className:"layer-labels",ref:n})})}function EA(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let n=e;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function Ho(t){return t.replace(/\n/g,"↵").replace(/^ /,"␣")}function Yv({text:t,rel:e,title:n,onClick:i,active:r}){const s=e??NaN;return m.jsx("span",{className:`tok${i?" click":""}${r?" active":""}`,style:{background:_A(s),color:vA(s)},title:n,onClick:i,role:i?"button":void 0,tabIndex:i?0:void 0,"aria-pressed":i?!!r:void 0,onKeyDown:i?o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),i())}:void 0,children:t.replace(/\n/g,"↵")})}function yf({r:t,atlas:e,extra:n,label:i}){const s=Pe(o=>o.names)[Ds(t)];return m.jsxs("button",{className:"neuron-btn",onClick:()=>Nr(t),onMouseEnter:()=>Ve({hover:t}),onMouseLeave:()=>gn().hover===t&&Ve({hover:null}),onFocus:()=>Ve({hover:t}),onBlur:()=>gn().hover===t&&Ve({hover:null}),children:[m.jsx("span",{className:"nid",children:Ds(t)}),m.jsx("span",{className:"nlabel",children:s?m.jsx("em",{children:s}):i??e.label(t)}),n]})}function wA({bins:t}){const e=t.map(i=>Math.log1p(i)),n=Math.max(...e,1);return m.jsx("svg",{className:"hist",viewBox:`0 0 ${t.length*6} 40`,preserveAspectRatio:"none","aria-label":"activation histogram (log counts)",children:e.map((i,r)=>m.jsx("rect",{x:r*6+.5,width:5,y:40-i/n*40,height:i/n*40},r))})}function tr({value:t,options:e,onChange:n,label:i}){return m.jsx("div",{className:"seg",role:"radiogroup","aria-label":i,children:e.map(r=>m.jsx("button",{role:"radio","aria-checked":r.v===t,className:r.v===t?"on":"",title:r.title,onClick:()=>n(r.v),children:r.label},String(r.v)))})}const wr=["#2796ae","#c2841f","#8a76e2"],Wl="#6f7299";function TA(t){const e=Math.min(1,Math.max(0,t)),n=[31,43,79],i=[139,227,240];return`rgb(${n.map((r,s)=>Math.round(r+(i[s]-r)*e)).join(" ")})`}const Ct=520;function hc({title:t,children:e,tip:n,table:i,height:r}){const[s,o]=ye.useState(!1);return m.jsxs("figure",{className:"chart",children:[m.jsxs("figcaption",{children:[m.jsx("span",{children:t}),m.jsx("button",{className:"ghost",onClick:()=>o(a=>!a),"aria-pressed":s,children:s?"Show chart":"Show table"})]}),s?m.jsx("div",{className:"chart-table",children:i}):m.jsxs("div",{className:"chart-body",style:{aspectRatio:`${Ct} / ${r}`},children:[e,n&&m.jsx("div",{className:"chart-tip",style:{left:`${n.x}%`,top:`${n.y/r*100}%`},role:"status",children:n.body})]})]})}function Wa({title:t,values:e,fmt:n,max:i,note:r}){const[s,o]=ye.useState(null),a=180,l=40,c=26,d=10,f=i??Math.max(...e,1e-6)*1.1,h=(Ct-l-10)/e.length,p=y=>d+(1-y/f)*(a-d-c),_=[0,f/2,f];return m.jsx(hc,{title:t,tip:s,height:a,table:m.jsxs("table",{children:[m.jsx("thead",{children:m.jsxs("tr",{children:[m.jsx("th",{children:"Layer"}),m.jsx("th",{children:"Value"})]})}),m.jsx("tbody",{children:e.map((y,g)=>m.jsxs("tr",{children:[m.jsx("td",{children:g}),m.jsx("td",{children:n(y)})]},g))})]}),children:m.jsxs("svg",{viewBox:`0 0 ${Ct} ${a}`,role:"img","aria-label":t,onMouseLeave:()=>o(null),children:[_.map(y=>m.jsxs("g",{children:[m.jsx("line",{x1:l,x2:Ct-10,y1:p(y),y2:p(y),className:"grid"}),m.jsx("text",{x:l-6,y:p(y)+4,className:"axis",textAnchor:"end",children:n(y)})]},y)),e.map((y,g)=>{const u=l+g*h+4,x=Math.max(0,p(0)-p(y));return m.jsxs("g",{onMouseEnter:()=>o({x:u/Ct*100,y:p(y)-8,body:m.jsxs(m.Fragment,{children:[m.jsxs("strong",{children:["Layer ",g]})," ",n(y),r?m.jsxs(m.Fragment,{children:[m.jsx("br",{}),r(g)]}):null]})}),children:[m.jsx("rect",{x:l+g*h,y:d,width:h,height:a-d-c,fill:"transparent"}),m.jsx("path",{d:AA(u,p(y),h-8,x,4),fill:wr[0]}),m.jsxs("text",{x:u+(h-8)/2,y:a-8,className:"axis",textAnchor:"middle",children:["L",g]})]},g)})]})})}function AA(t,e,n,i,r){const s=Math.min(r,i,n/2);return i<=0?"":`M${t},${e+i} V${e+s} Q${t},${e} ${t+s},${e} H${t+n-s} Q${t+n},${e} ${t+n},${e+s} V${e+i} Z`}function bA({title:t,doses:e,values:n,windows:i}){const[r,s]=ye.useState(null),o=230,a=40,l=28,c=6,d=(Ct-a-6)/e.length,f=(o-c-l)/n.length;return m.jsx(hc,{title:t,tip:r,height:o,table:m.jsxs("table",{children:[m.jsx("thead",{children:m.jsxs("tr",{children:[m.jsx("th",{children:"Layer"}),e.map(h=>m.jsxs("th",{children:[h,"×"]},h))]})}),m.jsx("tbody",{children:n.map((h,p)=>m.jsxs("tr",{children:[m.jsx("td",{children:p}),h.map((_,y)=>m.jsx("td",{children:_.toFixed(2)},y))]},p))})]}),children:m.jsxs("svg",{viewBox:`0 0 ${Ct} ${o}`,role:"img","aria-label":t,onMouseLeave:()=>s(null),children:[n.map((h,p)=>h.map((_,y)=>{const g=a+y*d,u=c+(n.length-1-p)*f,x=Math.abs(e[y]-i[p])<1e-6;return m.jsxs("g",{onMouseEnter:()=>s({x:(g+d/2)/Ct*100,y:u-4,body:m.jsxs(m.Fragment,{children:[m.jsxs("strong",{children:["Layer ",p,", push ",e[y],"×"]}),m.jsx("br",{}),"random directions keep ",Math.round(_*100),"% distinct 4-grams",x?m.jsxs(m.Fragment,{children:[m.jsx("br",{}),"chosen window"]}):null]})}),children:[m.jsx("rect",{x:g+1,y:u+1,width:d-2,height:f-2,rx:3,fill:TA(_)}),x&&m.jsx("rect",{x:g+2,y:u+2,width:d-4,height:f-4,rx:3,fill:"none",stroke:"#ffe29a",strokeWidth:2})]},`${p}-${y}`)})),n.map((h,p)=>m.jsxs("text",{x:a-6,y:c+(n.length-1-p)*f+f/2+4,className:"axis",textAnchor:"end",children:["L",p]},p)),e.map((h,p)=>m.jsxs("text",{x:a+p*d+d/2,y:o-10,className:"axis",textAnchor:"middle",children:[h,"×"]},h))]})})}function CA({title:t,series:e,fmt:n}){const[i,r]=ye.useState(null),s=e[0].values.length,o=40+s*22,a=40,l=16,c=30,d=e.flatMap(_=>_.values),f=Math.min(0,...d),h=Math.max(...d)*1.08,p=_=>a+(_-f)/(h-f||1)*(Ct-a-l);return m.jsx(hc,{title:t,tip:i,height:o,table:m.jsxs("table",{children:[m.jsx("thead",{children:m.jsxs("tr",{children:[m.jsx("th",{children:"Layer"}),e.map(_=>m.jsx("th",{children:_.name},_.name))]})}),m.jsx("tbody",{children:Array.from({length:s},(_,y)=>m.jsxs("tr",{children:[m.jsx("td",{children:y}),e.map(g=>m.jsx("td",{children:n(g.values[y])},g.name))]},y))})]}),children:m.jsxs("svg",{viewBox:`0 0 ${Ct} ${o}`,role:"img","aria-label":t,onMouseLeave:()=>r(null),children:[m.jsx("g",{className:"legend",children:e.map((_,y)=>m.jsxs("g",{transform:`translate(${a+y*150}, 12)`,children:[m.jsx("circle",{r:5,cx:5,cy:0,fill:y<wr.length?wr[y]:Wl}),m.jsx("text",{x:16,y:4,className:"axis",children:_.name})]},_.name))}),m.jsx("line",{x1:p(0),x2:p(0),y1:c-6,y2:o-8,className:"grid"}),Array.from({length:s},(_,y)=>{const g=c+y*22+8,u=e.map(x=>x.values[y]);return m.jsxs("g",{onMouseEnter:()=>r({x:p(Math.max(...u))/Ct*100,y:g-10,body:m.jsxs(m.Fragment,{children:[m.jsxs("strong",{children:["Layer ",y]}),e.map(x=>m.jsxs("span",{children:[m.jsx("br",{}),x.name,": ",n(x.values[y])]},x.name))]})}),children:[m.jsx("rect",{x:a,y:g-10,width:Ct-a-l,height:20,fill:"transparent"}),m.jsxs("text",{x:a-6,y:g+4,className:"axis",textAnchor:"end",children:["L",y]}),m.jsx("line",{x1:p(Math.min(...u)),x2:p(Math.max(...u)),y1:g,y2:g,className:"grid"}),e.map((x,v)=>m.jsx("circle",{cx:p(x.values[y]),cy:g,r:5,fill:v<wr.length?wr[v]:Wl,stroke:"#151a35",strokeWidth:2},x.name))]},y)})]})})}function RA({nz:t,ncoh:e,cz:n,ccoh:i,focus:r,onPick:s}){const[o,a]=ye.useState(null),l=240,c=36,d=30,f=24,h=10,{zlo:p,zhi:_}=ye.useMemo(()=>{let A=1/0,P=-1/0;for(const Y of[...t,...n])Y<A&&(A=Y),Y>P&&(P=Y);return{zlo:Math.min(A,-2),zhi:Math.max(P,4)}},[t,n]),y=A=>c+(A-p)/(_-p)*(Ct-c-h),g=A=>f+(1-A)*(l-f-d),u=Math.max(...n),x=(A,P)=>Array.from(A,(Y,S)=>[y(Y),g(P[S])]),v=ye.useMemo(()=>x(t,e),[t,e,p,_]),w=ye.useMemo(()=>x(n,i),[n,i,p,_]),L=(A,P)=>{let Y=-1,S=144;return v.forEach(([E,W],B)=>{const $=(E-A)**2+(W-P)**2;$<S&&(S=$,Y=B)}),Y},b=A=>{const P=A.currentTarget.getBoundingClientRect();return[(A.clientX-P.left)/P.width*Ct,(A.clientY-P.top)/P.height*l]};return m.jsx(hc,{title:"Steering effect against random directions in this layer",tip:o,height:l,table:m.jsxs("p",{className:"note",children:[t.length," neurons and ",n.length," random directions. This neuron: z ",t[r].toFixed(1),", coherence ",e[r].toFixed(2),". Strongest control: z ",u.toFixed(1),"."]}),children:m.jsxs("svg",{viewBox:`0 0 ${Ct} ${l}`,role:"img","aria-label":"Scatter of neurons and random controls: theme strength against coherence",onMouseMove:A=>{const[P,Y]=b(A),S=L(P,Y);a(S>=0?{x:v[S][0]/Ct*100,y:v[S][1]-10,body:m.jsxs(m.Fragment,{children:[m.jsxs("strong",{children:["N",S]})," z ",t[S].toFixed(1)," · coherence ",e[S].toFixed(2),s?m.jsxs(m.Fragment,{children:[m.jsx("br",{}),"click to open"]}):null]})}:null)},onMouseLeave:()=>a(null),onClick:A=>{const[P,Y]=b(A),S=L(P,Y);S>=0&&(s==null||s(S))},children:[m.jsxs("g",{className:"legend",children:[m.jsx("circle",{cx:c+5,cy:10,r:4,fill:wr[0]}),m.jsx("text",{x:c+14,y:14,className:"axis",children:"neurons"}),m.jsx("circle",{cx:c+90,cy:10,r:4,fill:Wl}),m.jsx("text",{x:c+99,y:14,className:"axis",children:"random directions"}),m.jsx("circle",{cx:c+230,cy:10,r:5,fill:"#ffe29a",stroke:"#151a35",strokeWidth:2}),m.jsx("text",{x:c+240,y:14,className:"axis",children:"this neuron"})]}),m.jsx("rect",{x:y(p),y:f,width:Math.max(0,y(u)-y(p)),height:l-f-d,className:"null-band"}),m.jsx("line",{x1:y(u),x2:y(u),y1:f,y2:l-d,className:"null-edge"}),m.jsx("text",{x:y(u)>Ct*.7?y(u)-4:y(u)+4,y:f+12,className:"axis",textAnchor:y(u)>Ct*.7?"end":"start",children:"strongest control"}),[0,.5,1].map(A=>m.jsx("text",{x:c-6,y:g(A)+4,className:"axis",textAnchor:"end",children:A},A)),m.jsx("text",{x:(Ct+c)/2,y:l-6,className:"axis",textAnchor:"middle",children:"theme strength, z against controls →"}),m.jsx("text",{x:10,y:f-8,className:"axis",children:"coherence"}),w.map(([A,P],Y)=>m.jsx("circle",{cx:A,cy:P,r:2.2,fill:Wl,opacity:.8},`c${Y}`)),v.map(([A,P],Y)=>m.jsx("circle",{cx:A,cy:P,r:2.2,fill:wr[0],opacity:.75},`n${Y}`)),m.jsx("circle",{cx:v[r][0],cy:v[r][1],r:6,fill:"#ffe29a",stroke:"#151a35",strokeWidth:2})]})})}const uh=(t,e)=>Math.max(t.max[t.g(e)],.5);function PA({atlas:t,r:e}){const n=Pe(l=>l.tab),i=Pe(l=>l.sweep),r=Pe(l=>l.names),s=Ds(e),o=t.g(e),a=ye.useRef(null);return ye.useEffect(()=>{var l,c;(l=window.matchMedia)!=null&&l.call(window,"(max-width: 1100px)").matches&&((c=a.current)==null||c.scrollIntoView({block:"start"}))},[]),m.jsxs("aside",{ref:a,className:"inspector","aria-label":`Neuron ${s}`,children:[m.jsxs("header",{className:"insp-head",children:[m.jsxs("div",{className:"insp-id",children:[m.jsxs("h2",{children:["Layer ",e.layer,", neuron ",e.neuron]}),m.jsx("button",{className:"icon",onClick:()=>Nr(null),"aria-label":"Close neuron",children:"×"})]}),t.dead(e)?m.jsxs("p",{className:"dead-note",children:["This neuron barely turns on anywhere in the corpus (peak ",t.max[o].toFixed(2),"). Steering it still works."]}):m.jsxs("p",{className:"insp-auto",children:["Peaks on ",m.jsx("strong",{children:t.label(e)})]}),i&&m.jsx(LA,{sweep:i,r:e}),m.jsx("input",{className:"insp-name",value:r[s]??"",placeholder:"Name this neuron","aria-label":"Your name for this neuron",maxLength:80,onChange:l=>Ve(c=>({names:{...c.names,[s]:l.target.value}}))}),m.jsxs("dl",{className:"stats",children:[m.jsxs("div",{children:[m.jsx("dt",{children:"max"}),m.jsx("dd",{children:t.max[o].toFixed(2)})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"fires on"}),m.jsxs("dd",{children:[(t.density[o]*100).toFixed(1),"% of tokens"]})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"selectivity"}),m.jsxs("dd",{children:[Math.round(t.share[o]*100),"%"]})]})]}),m.jsx(DA,{atlas:t,sweep:i,r:e})]}),m.jsx(tr,{label:"Neuron view",value:n,onChange:l=>Ve({tab:l}),options:[{v:"profile",label:"Profile"},{v:"contexts",label:"Contexts"},{v:"steer",label:"Steering studio"}]}),m.jsxs("div",{className:"insp-body",children:[n==="profile"&&m.jsx(IA,{atlas:t,sweep:i,r:e}),n==="contexts"&&m.jsx(UA,{atlas:t,r:e}),n==="steer"&&m.jsx(kA,{atlas:t,sweep:i,r:e})]})]})}function LA({sweep:t,r:e}){const n=ye.useMemo(()=>t.stats(e),[t,e]),i=ye.useMemo(()=>t.rankOf(e),[t,e]),r=n.pct>=1;return m.jsxs("div",{className:`uniq${r?" strong":""}`,children:[m.jsxs("p",{children:[r?"Steers more distinctly than every random direction in its layer":`Steers more distinctly than ${Math.round(n.pct*100)}% of random directions in its layer`,m.jsxs("span",{className:"uniq-meta",children:["z ",n.z.toFixed(1)," · rank ",i.toLocaleString()," of ",(t.meta.layers*t.meta.neurons).toLocaleString()]})]}),n.themes.length>0&&m.jsxs("p",{className:"themes",children:["Pushing it writes"," ",n.themes.map(s=>m.jsx("span",{className:"theme",children:s},s)),n.rw>0&&m.jsx("span",{className:"rw",title:"Its top contexts peak on the same word it writes when pushed",children:"reads what it writes"})]})]})}const NA=[{v:"ablate",label:"Ablate",title:"Hold the neuron at zero"},{v:"scale",label:"Scale",title:"Multiply its activation"},{v:"add",label:"Steer",title:"Push the residual stream along its output direction"},{v:"set",label:"Clamp",title:"Hold it at a multiple of its max activation"}];function DA({atlas:t,sweep:e,r:n}){const r=Pe(_=>_.edits).find(_=>Yn(_)===Yn(n)),s=e?e.window(n.layer):1,[o,a]=ye.useState("add"),[l,c]=ye.useState(s);ye.useEffect(()=>{if(!r)return;const _=r.mode==="set"&&r.value===0;a(_?"ablate":r.mode),_||c(r.value)},[r]);const d=o==="add"&&!!e&&(r==null?void 0:r.unit)!=="max",f=o==="scale"?{min:-4,max:8,step:.25}:d?{min:-2,max:2,step:.05}:{min:-20,max:20,step:.5},h=o==="scale"?`×${l}`:d?`${l>0?"+":""}${l.toFixed(2)} × resid`:`${l>0?"+":""}${l} × max`,p=()=>{Gc(o==="ablate"?{layer:n.layer,neuron:n.neuron,mode:"set",value:0,maxAct:uh(t,n),unit:"max",enabled:!0}:d?e.doseEdit(n,l):{layer:n.layer,neuron:n.neuron,mode:o,value:l,maxAct:uh(t,n),unit:"max",enabled:!0})};return m.jsxs("div",{className:"edit-box",children:[m.jsx(tr,{label:"Edit type",value:o,onChange:_=>{a(_),c(_==="scale"?3:_==="set"?2:s)},options:NA}),o!=="ablate"&&m.jsxs("label",{className:"slider",children:[m.jsx("span",{className:"sr-only",children:"Edit strength"}),m.jsx("input",{type:"range",min:f.min,max:f.max,step:f.step,value:l,onChange:_=>c(Number(_.target.value))}),m.jsx("span",{children:h})]}),d&&m.jsxs("p",{className:"note",children:["Layer ",n.layer,"'s coherent window is ",s.toFixed(2)," × the residual norm (calibrated on random directions)."]}),m.jsxs("div",{className:"edit-actions",children:[m.jsx("button",{className:"primary",onClick:p,children:r?"Update edit":"Apply edit"}),r&&m.jsx("button",{onClick:()=>dv(n),children:"Remove edit"})]})]})}function IA({atlas:t,sweep:e,r:n}){const[i,r]=ye.useState(e?"steer":"logit"),s=ye.useMemo(()=>t.lens(n),[t,n]),o=ye.useMemo(()=>e?e.steerLens(n):null,[e,n]),a=ye.useMemo(()=>t.links(n,"up"),[t,n]),l=ye.useMemo(()=>t.links(n,"down"),[t,n]),c=o?i:"logit",d=c==="steer"?o.up:s.promotes,f=c==="steer"?o.down:s.suppresses,h=Math.max(...d.map(p=>Math.abs(p.v)),...f.map(p=>Math.abs(p.v)),1e-6);return m.jsxs(m.Fragment,{children:[m.jsxs("section",{children:[m.jsxs("div",{className:"section-head",children:[m.jsx("h3",{children:c==="steer"?"Pushing it up makes these next tokens likelier":"When it fires, it pushes the next token toward"}),o&&m.jsx(tr,{label:"Lens",value:i,onChange:r,options:[{v:"steer",label:"Steer lens",title:"Measured: change in next-token probability under a push, through the whole model"},{v:"logit",label:"Logit lens",title:"Direct path only: output weights read through the unembedding"}]})]}),m.jsx(Xm,{items:d,atlas:t,max:h,color:Xv}),m.jsx("h3",{children:c==="steer"?"Pushing it down makes these likelier":"and away from"}),m.jsx(Xm,{items:f,atlas:t,max:h,color:$v}),m.jsx("p",{className:"note",children:c==="steer"?`Average change in next-token probability over 4 story contexts when the residual stream is pushed ±${e.window(n.layer).toFixed(2)}× its norm along this neuron's output. KL: ${o.klUp.toFixed(2)} up, ${o.klDown.toFixed(2)} down.`:"Logit lens: the neuron's output weights read straight through the unembedding. It shows the direct effect only, not what later layers do with it."})]}),m.jsxs("section",{children:[m.jsx("h3",{children:"Activation distribution"}),m.jsx(wA,{bins:t.histogram(n)}),m.jsxs("p",{className:"note",children:["Positive activations over ",t.meta.tokens.toLocaleString()," tokens of TinyStories, binned from 0 to max, log scale."]})]}),m.jsxs("section",{children:[m.jsx("h3",{children:"Reads from"}),a.length?m.jsx($m,{atlas:t,links:a}):m.jsx("p",{className:"note",children:"Layer 0 reads only from the embeddings and attention."}),m.jsx("h3",{children:"Writes to"}),l.length?m.jsx($m,{atlas:t,links:l}):m.jsx("p",{className:"note",children:"Last layer: its output goes straight to the logits."}),m.jsx("p",{className:"note",children:"Direct-path weights through the residual stream, scaled by the source neuron's peak. Gold excites, rose inhibits."})]})]})}function Xm({items:t,atlas:e,max:n,color:i}){return m.jsx("ul",{className:"lens",children:t.map((r,s)=>m.jsxs("li",{children:[m.jsx("code",{children:Ho(e.tok.str(r.id))}),m.jsx("span",{className:"bar",style:{width:`${Math.abs(r.v)/n*100}%`,background:i}}),m.jsxs("span",{className:"val",children:[r.v>0?"+":"",r.v.toFixed(2)]})]},`${r.id}-${s}`))})}function $m({atlas:t,links:e}){return m.jsx("ul",{className:"links",children:e.map(n=>m.jsx("li",{children:m.jsx(yf,{r:n,atlas:t,extra:m.jsxs("span",{className:"w",style:{color:n.w>0?Xv:$v},children:[n.w>0?"+":"",n.w.toFixed(2)]})})},`${n.layer}:${n.neuron}`))})}function UA({atlas:t,r:e}){const n=ye.useMemo(()=>t.examples(e),[t,e]);return m.jsxs("section",{children:[m.jsx("h3",{children:"Strongest contexts in the corpus"}),m.jsx("ol",{className:"contexts",children:n.map((i,r)=>m.jsxs("li",{children:[m.jsx("span",{className:"act",children:i.act.toFixed(2)}),m.jsx("p",{children:i.tokens.map((s,o)=>s<0?null:m.jsx(Yv,{text:t.tok.str(s),rel:i.acts[o],active:o===i.center,title:`${(i.acts[o]*t.max[t.g(e)]).toFixed(2)}`},o))}),m.jsx("button",{className:"ghost",onClick:()=>Ve({probeText:t.tok.decode(t.story(i.story).slice(0,i.pos+8))}),children:"Probe this story"})]},r))})]})}function FA(t,e,n){const i=EA(e*7919+n*104729+1),r=[];for(let a=0;a<t;a+=2){const l=Math.max(i(),1e-12),c=i(),d=Math.sqrt(-2*Math.log(l));r.push(d*Math.cos(2*Math.PI*c),d*Math.sin(2*Math.PI*c))}const s=r.slice(0,t),o=Math.hypot(...s);return s.map(a=>a/o)}const OA=["Pushed down","Unchanged","Pushed up","Random direction, same push"];function kA({atlas:t,sweep:e,r:n}){const i=Pe(E=>E.runtime),r=Pe(E=>E.modelProgress>=1),s=Pe(E=>E.edits),o=Pe(E=>E.steerRequest),a=e?e.window(n.layer):0,[l,c]=ye.useState((e==null?void 0:e.meta.prompts[0])??"Once upon a time, there was a"),[d,f]=ye.useState(a||6),[h,p]=ye.useState(!1),[_,y]=ye.useState(!0),[g,u]=ye.useState([]),[x,v]=ye.useState(!1),[w,L]=ye.useState(null),[b,A]=ye.useState(7),P=ye.useRef(null);ye.useEffect(()=>()=>{var E;return(E=P.current)==null?void 0:E.call(P)},[]),ye.useEffect(()=>u([]),[n]);const Y=async(E=l,W=d)=>{var D,Z;if(!i)return;(D=P.current)==null||D.call(P),L(null);const B=s.filter(K=>K.enabled!==!1&&Yn(K)!==Yn(n)),$=K=>e?e.doseEdit(n,K):{layer:n.layer,neuron:n.neuron,mode:"add",value:K,maxAct:uh(t,n)},J=[[...B,$(-W)],B,[...B,$(W)]];if(e&&_){const K=((Z=i.meta)==null?void 0:Z.d_model)??256,re=FA(K,n.layer,b).map(Ee=>Ee*W*e.meta.resid_norm[n.layer]);J.push([...B,{layer:n.layer,neuron:0,mode:"dir",vec:re,value:0,maxAct:1}])}const G=J.map(()=>[]);u(J.map(()=>"")),v(!0);const ee=i.generate({prompt:E,variants:J,maxTokens:40,temperature:h?.8:0,topP:.92,seed:b},(K,re)=>{G[K].push(re),u(G.map(Ee=>t.tok.decode(Ee.filter(Be=>Be!==t.tok.eos))))});P.current=ee.cancel;try{await ee.done}catch(K){L(String(K.message??K))}v(!1)};ye.useEffect(()=>{if(!o||o.layer!==n.layer||o.neuron!==n.neuron||!r)return;const E=Math.min(2,Math.max(.05,Math.abs(o.dose)));c(o.prompt),f(E),p(!1),Ve({steerRequest:null}),Y(o.prompt,E)},[o,r]);const S=ye.useMemo(()=>e?e.layerScatter(n.layer):null,[e,n.layer]);return m.jsxs("section",{className:"steer",children:[m.jsx("h3",{children:"Steer this neuron"}),m.jsx("p",{className:"note",children:e?`Pushes the residual stream along the neuron's output direction at every position. Push size is a multiple of layer ${n.layer}'s median residual norm, the same unit for every neuron and random direction. Greedy decoding reproduces the sweep exactly.`:"Adds a multiple of the neuron's peak activation at every position."}),m.jsx("label",{className:"sr-only",htmlFor:"studio-prompt",children:"Prompt"}),m.jsx("textarea",{id:"studio-prompt",value:l,rows:2,maxLength:600,onChange:E=>c(E.target.value)}),e&&m.jsx("div",{className:"prompt-chips","aria-label":"Sweep prompts",children:e.meta.prompts.map(E=>m.jsx("button",{className:`chip${E===l?" on":""}`,onClick:()=>c(E),title:E,children:E.length>34?E.slice(0,32)+"…":E},E))}),m.jsxs("div",{className:"steer-controls",children:[m.jsxs("label",{className:"slider",children:[m.jsx("span",{children:"push"}),m.jsx("input",{type:"range",min:.05,max:e?2:30,step:e?.05:1,value:d,onChange:E=>f(Number(E.target.value))}),m.jsxs("span",{children:["±",e?`${d.toFixed(2)} × resid`:`${d} × max`]})]}),e&&m.jsxs("p",{className:"note",children:["Coherent window for layer ",n.layer,": ",a.toFixed(2),"."," ",m.jsx("button",{className:"link-btn",onClick:()=>f(a),children:"Use it"})]}),m.jsxs("div",{className:"checks",children:[m.jsxs("label",{className:"check",children:[m.jsx("input",{type:"checkbox",checked:h,onChange:E=>p(E.target.checked)})," Sample (temperature 0.8)"]}),e&&m.jsxs("label",{className:"check",children:[m.jsx("input",{type:"checkbox",checked:_,onChange:E=>y(E.target.checked)})," Compare with a random direction"]})]}),m.jsxs("div",{className:"edit-actions",children:[m.jsx("button",{className:"primary",disabled:!r||x||!l.trim(),onClick:()=>Y(),children:r?x?"Generating…":"Generate":"Model loading…"}),x&&m.jsx("button",{onClick:()=>{var E;return(E=P.current)==null?void 0:E.call(P)},children:"Stop"}),m.jsx("button",{disabled:x,onClick:()=>A(E=>E+1),title:"Pick a new random seed and random direction",children:"New seed"})]}),w&&m.jsx("p",{className:"err",role:"alert",children:w})]}),g.length>0&&m.jsx("div",{className:"steer-cols","aria-live":"polite",children:g.map((E,W)=>m.jsxs("div",{className:`steer-col c${W}`,children:[m.jsx("h4",{children:OA[W]}),m.jsxs("p",{children:[m.jsx("span",{className:"prompt-echo",children:l}),E]})]},W))}),e&&S&&m.jsx(RA,{nz:S.nz,ncoh:S.ncoh,cz:S.cz,ccoh:S.ccoh,focus:n.neuron,onPick:E=>Nr({layer:n.layer,neuron:E},gn().tab)}),e&&m.jsx(zA,{atlas:t,sweep:e,r:n})]})}function zA({atlas:t,sweep:e,r:n}){const i=ye.useMemo(()=>e.rollouts(n),[e,n]),[r,s]=ye.useState(0),o=e.meta.prompts,a=i.filter(f=>f.prompt===o[r]),l=e.baseline(r),c=new Set(e.stats(n).themes),d=f=>t.tok.decode(f).split(/(\b[a-zA-Z]+\b)/).map((p,_)=>c.has(p.toLowerCase())?m.jsx("mark",{children:p},_):m.jsx("span",{children:p},_));return m.jsxs("div",{className:"sweep-rolls",children:[m.jsx("h3",{children:"Recorded in the sweep"}),m.jsx(tr,{label:"Sweep prompt",value:r,onChange:s,options:o.map((f,h)=>({v:h,label:`Prompt ${h+1}`,title:f}))}),m.jsx("p",{className:"prompt-echo",children:o[r]}),m.jsxs("ul",{children:[m.jsxs("li",{children:[m.jsx("span",{className:"dose",children:"0"}),m.jsx("p",{children:d(l)})]}),a.map((f,h)=>m.jsxs("li",{children:[m.jsxs("span",{className:"dose",children:[f.dose>0?"+":"",f.dose.toFixed(2)]}),m.jsx("p",{children:d(f.ids)})]},h))]}),m.jsx("p",{className:"note",children:"Greedy, 40 tokens. Highlighted words are this neuron's theme words: over-represented against the layer's 256 random directions."})]})}const wu=160;function BA({atlas:t}){const e=Pe(v=>v.runtime),n=Pe(v=>v.modelProgress>=1),i=Pe(v=>v.probeText),r=Pe(v=>v.edits),s=Pe(v=>v.analysis),o=Pe(v=>v.probePos),a=Pe(v=>v.focus),[l,c]=ye.useState(!1),[d,f]=ye.useState(null),h=ye.useRef(0);ye.useEffect(()=>{if(!n||!e)return;const v=++h.current,w=setTimeout(async()=>{c(!0);try{const L=await e.analyze(i,r,wu);if(v!==h.current)return;f(null);const b=gn().probePos;Ve({analysis:L,probePos:b!==null&&b<L.tokens.length?b:null})}catch(L){v===h.current&&f(String((L==null?void 0:L.message)??L))}finally{v===h.current&&c(!1)}},250);return()=>clearTimeout(w)},[i,r,n,e]);const p=t.L*t.N,_=(s==null?void 0:s.tokens.length)??0,y=o??(_?_-1:null),g=ye.useMemo(()=>{if(!s||!a)return null;const v=t.g(a);return s.tokens.map((w,L)=>s.acts[L*p+v]/Math.max(t.max[v],.25))},[s,a,t,p]),u=ye.useMemo(()=>{if(!s||y===null)return[];const v=y*p,w=[];for(let L=0;L<p;L++){const b=s.acts[v+L]/Math.max(t.max[L],.25);b>.5&&w.push({...t.ref(L),rel:b})}return w.sort((L,b)=>b.rel-L.rel).slice(0,14)},[s,y,t,p]),x=v=>{Ve({probePos:o===v?null:v,colorMode:"probe"})};return m.jsxs("section",{className:"probe","aria-label":"Probe",children:[m.jsxs("div",{className:"probe-input",children:[m.jsx("label",{htmlFor:"probe-text",children:"Write any text and watch which neurons light up"}),m.jsx("textarea",{id:"probe-text",rows:3,value:i,spellCheck:!1,maxLength:4e3,onChange:v=>Ve({probeText:v.target.value})}),m.jsx("div",{className:"probe-status",children:d?m.jsxs("span",{className:"err",role:"alert",children:["The probe failed: ",d]}):n?l?"Running…":_?`${_} tokens${_>=wu?` (only the first ${wu} are probed)`:""} · click one to light the map at that position`:i.trim()?"":"Type something to probe.":"Loading the model…"})]}),m.jsxs("div",{className:"probe-tokens","aria-label":"Tokens",children:[s==null?void 0:s.tokens.map((v,w)=>m.jsx(Yv,{text:t.tok.str(v),rel:g?g[w]:void 0,active:o===w,onClick:()=>x(w),title:g?`activation ${(g[w]*t.max[t.g(a)]).toFixed(2)}`:"Show activations at this token"},w)),a&&s&&m.jsxs("p",{className:"note",children:["Shaded by ",`L${a.layer}·N${a.neuron}`,"'s activation."]})]}),s&&y!==null&&m.jsxs("div",{className:"probe-detail",children:[m.jsxs("div",{children:[m.jsxs("h3",{children:["Strongest neurons at ",m.jsx("code",{children:Ho(t.tok.str(s.tokens[y]))})]}),u.length?m.jsx("ul",{className:"links",children:u.map(v=>m.jsx("li",{children:m.jsx(yf,{r:v,atlas:t,extra:m.jsxs("span",{className:"w",children:[Math.round(v.rel*100),"%"]})})},`${v.layer}:${v.neuron}`))}):m.jsx("p",{className:"note",children:"No neuron is above half its peak here."})]}),m.jsx(HA,{atlas:t,pos:y})]}),n&&m.jsx(VA,{atlas:t})]})}function HA({atlas:t,pos:e}){var s;const n=Pe(o=>o.analysis),i=n.preds[e],r=(s=n.basePreds)==null?void 0:s[e];return m.jsxs("div",{children:[m.jsxs("h3",{children:["Predicted next token",r?" with your edits":""]}),m.jsx("ul",{className:"preds",children:i.ids.map((o,a)=>m.jsxs("li",{children:[m.jsx("code",{children:Ho(t.tok.str(o))}),m.jsx("span",{className:"bar",style:{width:`${i.probs[a]*100}%`}}),m.jsxs("span",{className:"val",children:[(i.probs[a]*100).toFixed(1),"%"]})]},o))}),r&&m.jsxs(m.Fragment,{children:[m.jsx("h3",{children:"Without edits"}),m.jsx("ul",{className:"preds base",children:r.ids.map((o,a)=>m.jsxs("li",{children:[m.jsx("code",{children:Ho(t.tok.str(o))}),m.jsx("span",{className:"bar",style:{width:`${r.probs[a]*100}%`}}),m.jsxs("span",{className:"val",children:[(r.probs[a]*100).toFixed(1),"%"]})]},o))}),m.jsxs("p",{className:"note",children:["KL divergence from the unedited model here: ",n.klDiv[e].toFixed(3)," nats"]})]})]})}function VA({atlas:t}){const e=Pe(f=>f.runtime),n=Pe(f=>f.probeText),r=Pe(f=>f.edits).filter(f=>f.enabled!==!1),[s,o]=ye.useState([]),[a,l]=ye.useState(!1),c=ye.useRef(null);ye.useEffect(()=>()=>{var f;return(f=c.current)==null?void 0:f.call(c)},[]);const d=async()=>{var _;(_=c.current)==null||_.call(c);const f=r.length?[[],r]:[[]],h=f.map(()=>[]);o(f.map(()=>"")),l(!0);const p=e.generate({prompt:n,variants:f,maxTokens:60,temperature:.7,topP:.92,seed:Date.now()%1e6},(y,g)=>{h[y].push(g),o(h.map(u=>t.tok.decode(u.filter(x=>x!==t.tok.eos))))});c.current=p.cancel,await p.done.catch(()=>{}),l(!1)};return m.jsxs("div",{className:"continue",children:[m.jsx("button",{className:"primary",onClick:d,disabled:a,children:a?"Writing…":r.length?"Continue the text, with and without edits":"Continue the text"}),s.length>0&&m.jsx("div",{className:`continue-cols n${s.length}`,children:s.map((f,h)=>m.jsxs("div",{children:[m.jsx("h4",{children:s.length===1?"Continuation":h===0?"Original model":`With ${r.length} edit${r.length>1?"s":""}`}),m.jsx("p",{children:f})]},h))})]})}function GA(t,e,n){const i=t.stats(e).themes;return i.length?`→ ${i.slice(0,3).join(", ")}`:n.label(e)}function jA({atlas:t}){const[e,n]=ye.useState(""),[i,r]=ye.useState("fires"),[s,o]=ye.useState("all"),a=Pe(h=>h.sweep),[l,c]=ye.useState("unique"),d=!!a&&l==="unique",f=ye.useMemo(()=>{if(e.trim()){const h=t.search(e,i,300);return s==="all"?h:h.filter(p=>p.layer===s)}return d?a.ranked(s==="all"?null:s,200).map(h=>({...h,score:h.z})):t.ranked(s==="all"?null:s,200).map(h=>({...h,score:NaN}))},[t,a,d,e,i,s]);return m.jsxs("nav",{className:"sidebar","aria-label":"Find neurons",children:[m.jsxs("div",{className:"search",children:[m.jsx("input",{value:e,onChange:h=>n(h.target.value),placeholder:i==="fires"?"Find neurons that fire on a word…":"Find neurons that predict a word…","aria-label":"Search neurons by word",spellCheck:!1}),m.jsx(tr,{label:"Search by",value:i,onChange:r,options:[{v:"fires",label:"fires on",title:"The word sits at the peak of the neuron's top contexts"},{v:"lens",label:"predicts",title:"The word is in the neuron's logit lens, either pole"}]}),m.jsxs("select",{value:s,onChange:h=>o(h.target.value==="all"?"all":Number(h.target.value)),"aria-label":"Layer",children:[m.jsx("option",{value:"all",children:"All layers"}),Array.from({length:t.L},(h,p)=>m.jsxs("option",{value:p,children:["Layer ",p]},p))]})]}),m.jsx("p",{className:"list-caption",children:e.trim()?f.length?`${f.length} neuron${f.length>1?"s":""} ${i==="fires"?"fire on":"predict"} “${e.trim()}”`:`No neuron ${i==="fires"?"peaks on":"predicts"} “${e.trim()}”. Try a common story word such as “dog” or “happy”.`:d?"Neurons whose steering is least like a random push, first. z against 256 random directions in the same layer.":"Most selective neurons first"}),a&&!e.trim()&&m.jsx("div",{className:"rank-by",children:m.jsx(tr,{label:"Rank neurons by",value:l,onChange:c,options:[{v:"unique",label:"Steering uniqueness",title:"How distinctive the text becomes when the neuron is pushed"},{v:"selective",label:"Selectivity",title:"How concentrated its top contexts are on one token"}]})}),m.jsx("ol",{className:"rows",children:f.map(h=>m.jsx("li",{children:m.jsx(yf,{r:h,atlas:t,label:d&&!e.trim()?GA(a,h,t):void 0,extra:Number.isFinite(h.score)?m.jsx("span",{className:"w",children:e.trim()?i==="fires"?`${Math.round(h.score*100)}%`:h.score.toFixed(1):`z ${h.score.toFixed(1)}`}):void 0})},`${h.layer}:${h.neuron}`))})]})}function WA(t){if(t.mode==="set"&&t.value===0)return"ablated";if(t.mode==="set")return`clamped ${t.value}×`;if(t.mode==="scale")return`×${t.value}`;const e=`${t.value>0?"+":""}${+t.value.toFixed(2)}`;return t.unit==="resid"?`push ${e}× resid`:`${e}× max`}const XA=[{v:"atlas",label:"Atlas"},{v:"findings",label:"Findings"},{v:"method",label:"Method"}];function qv({atlas:t}){const e=Pe(_=>_.edits),n=Pe(_=>_.colorMode),i=Pe(_=>_.layoutMode),r=Pe(_=>_.showWeb),s=Pe(_=>_.modelProgress),o=Pe(_=>_.modelError),a=Pe(_=>_.view),l=Pe(_=>_.focus),c=Pe(_=>_.tab),d=Pe(_=>_.sweep),f=Pe(_=>_.sweepError),h=Pe(_=>_.webglError),p=_=>Fl(_==="atlas"?{view:"atlas",focus:l,tab:c,card:null}:{view:_,focus:null,tab:null,card:null});return m.jsxs("header",{className:"top",children:[m.jsxs("div",{className:"brand",children:[m.jsx("h1",{children:m.jsx("a",{href:"#/atlas",onClick:()=>Nr(null),children:"Neuron Atlas"})}),m.jsxs("p",{children:[(t.L*t.N).toLocaleString()," MLP neurons of TinyStories-8M, running in your browser."," ",o?m.jsxs("span",{className:"err",role:"alert",children:["The model failed to load: ",o]}):s<1?m.jsxs("span",{className:"loading",children:["Loading weights ",Math.round(s*100),"%"]}):null,f&&m.jsxs("span",{className:"warn",children:[" Steering results unavailable (",f,")."]})]})]}),m.jsx("nav",{className:"nav","aria-label":"Sections",children:XA.map(_=>m.jsx("a",{href:p(_.v),"aria-current":a===_.v?"page":void 0,className:a===_.v?"on":"",children:_.label},_.v))}),a==="atlas"&&m.jsxs("div",{className:"controls",children:[m.jsx(tr,{label:"Colour neurons by",value:n,onChange:_=>Ve({colorMode:_}),options:[...d?[{v:"uniqueness",label:"Uniqueness",title:"How far steering the neuron beats random directions of the same size"}]:[],{v:"selectivity",label:"Selectivity",title:"How concentrated each neuron's top contexts are on one token"},{v:"density",label:"Firing rate",title:"Share of tokens where the neuron is positive"},{v:"probe",label:"Your text",title:"Activations on the text in the probe"}]}),d&&!h&&m.jsx(tr,{label:"Arrange neurons by",value:i,onChange:_=>Ve({layoutMode:_}),options:[{v:"writes",label:"Writes",title:"Neurons whose output directions are similar sit together"},{v:"cofire",label:"Co-firing",title:"Neurons that fire on the same tokens sit together"}]}),m.jsxs("label",{className:"check",children:[m.jsx("input",{type:"checkbox",checked:r,onChange:_=>Ve({showWeb:_.target.checked})}),"Connections"]})]}),m.jsx("div",{className:"edits","aria-label":"Active edits",children:e.length===0?m.jsx("span",{className:"note",children:"No edits yet. Open a neuron to ablate, scale or steer it."}):m.jsxs(m.Fragment,{children:[e.map(_=>m.jsxs("span",{className:`edit-chip${_.enabled===!1?" off":""}`,children:[m.jsx("input",{type:"checkbox",checked:_.enabled!==!1,onChange:()=>jy(_),"aria-label":`Enable edit on L${_.layer} N${_.neuron}`}),m.jsxs("button",{className:"link",onClick:()=>Nr({layer:_.layer,neuron:_.neuron}),children:["L",_.layer,"·N",_.neuron]}),m.jsx("span",{children:WA(_)}),m.jsx("button",{className:"icon",onClick:()=>dv(_),"aria-label":`Remove edit on L${_.layer} N${_.neuron}`,children:"×"})]},`${_.layer}:${_.neuron}`)),m.jsx("button",{className:"ghost",onClick:()=>Ve({edits:[]}),children:"Clear all"})]})})]})}const $A={concept:"Concept pull",style:"Style",suppressor:"Suppressor","reads-writes":"Reads what it writes",control:"Control"},Ts=t=>`${Math.round(t*100)}%`;function YA(t,e){const n=new Set(e.map(i=>i.toLowerCase()));return t.split(/(\b[a-zA-Z]+\b)/).map((i,r)=>n.has(i.toLowerCase())?m.jsx("mark",{children:i},r):m.jsx("span",{children:i},r))}function qA({atlas:t}){const e=Pe(o=>o.sweep),n=Pe(o=>o.sweepError),i=Pe(o=>o.card);if(ye.useEffect(()=>{if(!i||!e)return;const o=document.getElementById(`card-${i}`);o&&(o.scrollIntoView({block:"start"}),o.focus({preventScroll:!0}))},[i,e]),!e)return m.jsxs("div",{className:"page-wrap",children:[m.jsx("h2",{className:"page-title",children:"Findings"}),m.jsx("p",{className:n?"err":"note",role:"status",children:n?`The steering results failed to load: ${n}`:"Loading the steering results…"})]});const r=e.findings,s=i&&!r.cards.some(o=>o.id===i);return m.jsxs("div",{className:"page-wrap",children:[m.jsxs("header",{className:"page-head",children:[m.jsx("p",{className:"eyebrow",children:"Findings log"}),m.jsx("h2",{className:"page-title",children:"What pushing every neuron did"}),m.jsxs("p",{className:"lede",children:["Every one of the ",r.headline.neurons.toLocaleString()," MLP neurons in TinyStories-8M was pushed along its output direction, on three story prompts and from scratch, at the largest push its layer tolerates before the text falls apart. So were ",r.headline.controls.toLocaleString()," random directions of the same size. A neuron counts as a find only when what it writes beats what random pushes write."]})]}),s&&m.jsxs("p",{className:"notice inline",role:"status",children:["There is no finding called “",i,"”. Here is the full log."]}),m.jsx(KA,{f:r}),m.jsxs("section",{"aria-labelledby":"cards-h",children:[m.jsx("h3",{id:"cards-h",className:"section-title",children:"Neurons worth meeting"}),m.jsxs("p",{className:"section-lede",children:["Each card shows the recorded continuation without and with the push. ",m.jsx("strong",{children:"Replay"})," opens the neuron and runs the same push live in your browser. With greedy decoding it reproduces the text below token for token."]}),m.jsx("div",{className:"cards",children:r.cards.map(o=>m.jsx(ZA,{c:o,atlas:t,active:o.id===i},o.id))})]}),r.layers.length>0&&m.jsx(QA,{sweep:e,f:r}),r.notes.length>0&&m.jsxs("section",{"aria-labelledby":"notes-h",children:[m.jsx("h3",{id:"notes-h",className:"section-title",children:"New observations"}),m.jsx("p",{className:"section-lede",children:"Things this sweep measured that the original neuron-explorer research did not test or did not report."}),m.jsx("ol",{className:"notes",children:r.notes.map(o=>m.jsxs("li",{children:[m.jsx("h4",{children:o.title}),m.jsx("p",{children:o.body})]},o.title))})]}),m.jsxs("section",{"aria-labelledby":"ref-h",children:[m.jsx("h3",{id:"ref-h",className:"section-title",children:"The reference: neurons in a 4B model"}),m.jsx("p",{className:"section-lede",children:"These units were reported by neuron-explorer in Qwen3.5-4B, a model about 500 times larger. They are quoted from its research log and are not runnable here. A model trained only on children's stories has no word for an extraterrestrial intelligence. Its closest relatives are the concept pulls above."}),m.jsx("div",{className:"cards ref",children:r.reference.map(o=>m.jsxs("article",{className:"card ref-card",children:[m.jsxs("div",{className:"card-top",children:[m.jsx("span",{className:"kind",children:"Reported, not live"}),m.jsxs("span",{className:"unit",children:[o.model," · ",o.unit]})]}),m.jsx("h4",{children:o.title}),m.jsx("blockquote",{children:o.quote}),m.jsx("p",{className:"note",children:o.context}),m.jsx("a",{href:o.source,target:"_blank",rel:"noreferrer noopener",children:"Source: neuron-explorer research log"})]},o.id))})]}),m.jsxs("p",{className:"note foot",children:[r.generated&&!Number.isNaN(Date.parse(r.generated))&&m.jsxs(m.Fragment,{children:["Generated ",new Date(r.generated).toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric",timeZone:"UTC"})," by "]}),m.jsx("code",{children:"pipeline/analyze.py"}),"."," ",m.jsx("a",{href:"#/method",children:"How this was measured, and its limits"}),"."]})]})}function KA({f:t}){const e=t.headline;return m.jsxs("dl",{className:"tiles",children:[m.jsxs("div",{children:[m.jsx("dt",{children:"Neurons that beat every random direction in their layer"}),m.jsxs("dd",{children:[e.neurons_above_null.toLocaleString(),m.jsxs("small",{children:[" of ",e.neurons.toLocaleString()]})]})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"Random directions that look themed when you only count words"}),m.jsxs("dd",{children:[Ts(e.controls?e.controls_naive_theme/e.controls:0),m.jsxs("small",{children:[" of ",e.controls.toLocaleString()]})]})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"Neurons that look themed by the same naive count"}),m.jsxs("dd",{children:[Ts(e.neurons?e.neurons_naive_theme/e.neurons:0),m.jsxs("small",{children:[" of ",e.neurons.toLocaleString()]})]})]})]})}function ZA({c:t,atlas:e,active:n}){const i=Pe(o=>o.modelProgress>=1),r=()=>{Nr({layer:t.layer,neuron:t.neuron},"steer"),Ve({steerRequest:{layer:t.layer,neuron:t.neuron,prompt:t.prompt,dose:t.dose,nonce:Date.now()}})},s=e.label({layer:t.layer,neuron:t.neuron});return m.jsxs("article",{id:`card-${t.id}`,tabIndex:-1,className:`card k-${t.kind}${n?" active":""}`,"aria-labelledby":`card-${t.id}-h`,children:[m.jsxs("div",{className:"card-top",children:[m.jsx("span",{className:"kind",children:$A[t.kind]}),t.kind==="control"?m.jsxs("span",{className:"unit",children:["L",t.layer," · random direction #",t.neuron]}):m.jsxs("a",{className:"unit",href:`#/atlas/L${t.layer}/N${t.neuron}`,children:["L",t.layer,"·N",t.neuron]})]}),m.jsx("h4",{id:`card-${t.id}-h`,children:t.title}),m.jsx("p",{className:"card-sum",children:t.summary}),m.jsxs("div",{className:"card-runs",children:[m.jsxs("div",{children:[m.jsx("h5",{children:"No push"}),m.jsxs("p",{children:[m.jsx("span",{className:"prompt-echo",children:t.prompt}),t.baseline]})]}),m.jsxs("div",{className:"steered",children:[m.jsxs("h5",{children:["Push ",t.dose>0?"+":"−",Math.abs(t.dose).toFixed(2),"× residual norm"]}),m.jsxs("p",{children:[m.jsx("span",{className:"prompt-echo",children:t.prompt}),YA(t.steered,t.themes)]})]})]}),m.jsxs("dl",{className:"card-stats",children:[m.jsxs("div",{children:[m.jsx("dt",{children:t.kind==="control"?"Beats other random":"Beats random"}),m.jsx("dd",{children:Number.isFinite(t.pct)?Ts(t.pct):"–"})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"z"}),m.jsx("dd",{children:Number.isFinite(t.z)?t.z.toFixed(1):"–"})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"Rank"}),m.jsx("dd",{children:t.rank>0?`#${t.rank.toLocaleString()}`:"–"})]}),t.kind!=="control"&&m.jsxs("div",{children:[m.jsx("dt",{children:"Fires on"}),m.jsx("dd",{title:s,children:s})]})]}),t.themes.length>0&&m.jsx("p",{className:"themes","aria-label":"Theme words",children:t.themes.map(o=>m.jsx("span",{className:"theme",children:o},o))}),t.kind==="control"?m.jsx("p",{className:"note",children:"A random direction cannot be replayed by name. Every neuron's studio has a “Compare with a random direction” column that draws a fresh one."}):m.jsxs("div",{className:"card-actions",children:[m.jsx("button",{className:"primary",onClick:r,title:i?void 0:"Runs as soon as the model has loaded",children:"Replay live"}),m.jsx("a",{href:`#/atlas/L${t.layer}/N${t.neuron}`,children:"Open neuron"})]})]})}function QA({sweep:t,f:e}){const n=e.layers,i=t.meta.calib,r=ye.useMemo(()=>[{name:"Nearest in the writes layout",values:n.map(s=>s.neighbour_cofire.writes)},{name:"Nearest in the co-firing layout",values:n.map(s=>s.neighbour_cofire.cofire)},{name:"Random pairs",values:n.map(s=>s.neighbour_cofire.random)}],[n]);return m.jsxs("section",{"aria-labelledby":"layers-h",children:[m.jsx("h3",{id:"layers-h",className:"section-title",children:"Layer by layer"}),m.jsxs("div",{className:"chart-grid",children:[m.jsxs("div",{children:[m.jsx(bA,{title:"Text stays coherent up to a push that depends on the layer",doses:i.doses,values:i.coherence,windows:t.meta.window}),m.jsx("p",{className:"chart-note",children:"Share of distinct 4-grams in text written under random pushes, by push size (× the layer's median residual norm). Outlined: the push used for that layer, the largest that keeps the text at 0.85 or above. Layers 4 and 5 break first."})]}),m.jsxs("div",{children:[m.jsx(Wa,{title:"Share of neurons that beat every random direction",values:n.map(s=>s.above_null),fmt:Ts}),m.jsx("p",{className:"chart-note",children:"A neuron beats a random direction when its theme score, a Poisson z of over-represented words, is higher."})]}),m.jsxs("div",{children:[m.jsx(CA,{title:"Neighbours in the co-firing layout really do co-fire",series:r,fmt:s=>s.toFixed(2)}),m.jsx("p",{className:"chart-note",children:"Mean activation correlation between neurons in adjacent cells of each layer's grid, over 40,000 held-out tokens. The writes layout puts neurons together because their output directions agree. Whether that also groups neurons that fire together was an open question in neuron-explorer."})]}),m.jsxs("div",{children:[m.jsx(Wa,{title:"Logit lens and steer lens agree on",values:n.map(s=>s.lens_agreement),fmt:Ts,max:1}),m.jsx("p",{className:"chart-note",children:"Overlap of the top 12 promoted tokens between the logit lens (output weight times unembedding) and the steer lens (the measured change in next-token log-probability under a push). Low overlap in early layers means the logit lens cannot be read as what the neuron does there."})]}),m.jsx("div",{children:m.jsx(Wa,{title:"How much a push changes the next token (median KL, nats)",values:n.map(s=>s.kl_median),fmt:s=>s.toFixed(2)})}),m.jsxs("div",{children:[m.jsx(Wa,{title:"Of the neurons above the null, share that write what they read",values:n.map(s=>s.rw_share),fmt:Ts,max:1}),m.jsx("p",{className:"chart-note",children:"The theme words a push produces overlap the tokens that make the neuron fire."})]})]})]})}function JA(){const t=Pe(i=>i.sweep),e=t==null?void 0:t.meta.window,n=t==null?void 0:t.meta.resid_norm;return m.jsxs("div",{className:"page-wrap prose",children:[m.jsxs("header",{className:"page-head",children:[m.jsx("p",{className:"eyebrow",children:"Method"}),m.jsx("h2",{className:"page-title",children:"How this was measured"}),m.jsx("p",{className:"lede",children:"Everything on this site comes from one small model, two Python scripts that read it, and a TypeScript copy of the model that runs in your browser. This page lists each step, the controls behind every claim, and what the measurements cannot tell you."})]}),m.jsxs("section",{children:[m.jsx("h3",{children:"The model"}),m.jsx("p",{children:"TinyStories-8M is a GPT-Neo model trained on short children's stories: 8 layers, a 256-wide residual stream, 16 attention heads and 1,024 MLP neurons per layer, 8,192 in total. A neuron here is one unit after the GELU in a layer's feed-forward block. The model is small enough that its whole forward pass runs in a Web Worker, with a key-value cache, at about 16 ms per token on one CPU core."}),m.jsxs("p",{children:["The browser copy is checked against PyTorch. ",m.jsx("code",{children:"npm run verify"})," tokenizes test strings and compares the logits and the activations of every neuron with values exported from the reference implementation. Both the tokenizer and the forward pass match."]})]}),m.jsxs("section",{children:[m.jsx("h3",{children:"The atlas"}),m.jsxs("ul",{children:[m.jsxs("li",{children:[m.jsx("strong",{children:"Top contexts."})," Each neuron's 20 strongest activations over 3,000 validation stories (one context per story), with the surrounding tokens."]}),m.jsxs("li",{children:[m.jsx("strong",{children:"Selectivity."})," The share of a neuron's top contexts that peak on its most common token. 100% means it fires on one word."]}),m.jsxs("li",{children:[m.jsx("strong",{children:"Logit lens."})," The neuron's output weights times the unembedding: the tokens it would promote if its output went straight to the logits."]}),m.jsxs("li",{children:[m.jsx("strong",{children:"Connections."})," The strongest virtual weights to neurons in earlier and later layers: one neuron's output direction dotted with another's input direction through that layer norm's scale, times the first neuron's peak activation. Attention is ignored."]}),m.jsxs("li",{children:[m.jsx("strong",{children:"Map layout."})," Each layer is a grid. Neurons are sorted onto it by the principal components of their output directions, so neighbours write similar things. The co-firing layout sorts the same grid by activation correlation instead."]})]})]}),m.jsxs("section",{children:[m.jsx("h3",{children:"The steering sweep"}),m.jsxs("p",{children:["The method follows neuron-explorer's ",m.jsx("em",{children:"main_rel"})," sweep, adapted to a smaller model."]}),m.jsxs("ol",{children:[m.jsxs("li",{children:[m.jsx("strong",{children:"One unit for every push."})," A push adds a multiple of the layer's median residual-stream norm, along the neuron's normalised output direction, at every position.",n&&m.jsxs(m.Fragment,{children:[" Median norms by layer: ",n.map(i=>i.toFixed(2)).join(", "),"."]})," Pushing by a neuron's own maximum activation instead gave wildly different strengths from neuron to neuron, and broken text at the top."]}),m.jsxs("li",{children:[m.jsx("strong",{children:"A calibrated window per layer."})," For each layer, random directions were pushed at sizes from 0.2 to 2.0. The window is the largest push at which the text keeps 85% distinct 4-grams.",e&&m.jsxs(m.Fragment,{children:[" Windows by layer: ",e.map(i=>i.toFixed(1)).join(", "),"."]})]}),m.jsxs("li",{children:[m.jsx("strong",{children:"Rollouts."})," Every neuron, and 256 random directions per layer, was pushed on three story prompts at −1, +0.5 and +1 times the window, and from “Once upon a time,” at 1.5 times the window. Each run is 40 greedy tokens."]}),m.jsxs("li",{children:[m.jsx("strong",{children:"Theme score."})," For each unit, the words it writes more often than the layer's random directions do, scored as a Poisson z, summing the top five. Only words that rise count. Controls are scored leave-one-out against the other controls."]}),m.jsxs("li",{children:[m.jsx("strong",{children:"Uniqueness."})," A neuron's theme score as a z against the 256 controls in its layer, and the share of those controls it beats. A neuron is “above the null” only if it beats all 256."]}),m.jsxs("li",{children:[m.jsx("strong",{children:"Steer lens."})," The measured change in next-token probability, averaged over four contexts, when the residual is pushed up or down by the window. Unlike the logit lens it includes everything the later layers do with the push. It ranks tokens by change in probability, not log-probability: a log-probability ranking is dominated by rare word fragments lifted from almost zero."]})]})]}),m.jsxs("section",{children:[m.jsx("h3",{children:"Why the random directions matter"}),m.jsx("p",{children:"A push of the right size makes any direction look meaningful. Random directions in this model produce text that repeats “bad”, “sad” or “scared” often enough that a word count alone would call them a theme. The findings page reports how often that happens. Every claim about a neuron is therefore made relative to what random pushes of the same size do in the same layer, on the same prompts."})]}),m.jsxs("section",{children:[m.jsx("h3",{children:"Limits"}),m.jsxs("ul",{children:[m.jsx("li",{children:"One small model. TinyStories-8M knows a children's-story vocabulary, so its concepts are things like monsters, sadness, food and names. The reference cards come from a model about 500 times larger and are quoted, not reproduced."}),m.jsx("li",{children:"Three prompts and one free start. A neuron whose effect only shows in other kinds of text will be missed."}),m.jsx("li",{children:"Greedy decoding. The sweep is deterministic and the browser replays it exactly, but sampled text can drift. The studio has a sampling switch for checking that."}),m.jsx("li",{children:"Words, not meanings. The theme score counts surface words. A neuron that changes tone without changing vocabulary scores low. Synonyms are counted separately."}),m.jsx("li",{children:"Single neurons. Many features in models are spread across neurons. A neuron that scores low may still be part of something that matters."}),m.jsx("li",{children:"Card titles and summaries were written by reading the rollouts. The numbers beside them are computed. The titles are interpretations."})]})]}),m.jsxs("section",{children:[m.jsx("h3",{children:"Reproduce it"}),m.jsx("pre",{children:m.jsx("code",{children:`python -m venv .venv && . .venv/bin/activate
pip install -r pipeline/requirements.txt
curl -LO https://huggingface.co/datasets/roneneldan/TinyStories/resolve/main/TinyStories-valid.txt
python pipeline/build.py --corpus TinyStories-valid.txt --out web/public/data
python pipeline/sweep.py --corpus TinyStories-valid.txt --cache pipeline/cache   # ~40 min, CPU
cd pipeline && python analyze.py --cache cache --data ../web/public/data
cd ../web && npm ci && npm run verify && npm run dev`})})]}),m.jsxs("section",{children:[m.jsx("h3",{children:"Credits"}),m.jsxs("p",{children:["The steering method, the residual-norm units and the reference findings come from"," ",m.jsx("a",{href:"https://github.com/lyramakesmusic/neuron-explorer",target:"_blank",rel:"noreferrer noopener",children:"neuron-explorer"})," ","by lyramakesmusic. The model is"," ",m.jsx("a",{href:"https://huggingface.co/roneneldan/TinyStories-8M",target:"_blank",rel:"noreferrer noopener",children:"TinyStories-8M"})," ","by Ronen Eldan and Yuanzhi Li. Its model card states no license."]})]})]})}const Tu=new URL("./data",window.location.href).href.replace(/\/$/,"");let Ym=!1;function eb(){if(Ym)return;Ym=!0,of.load(Tu,e=>Ve({atlasProgress:e})).then(e=>Ve({atlas:e})).catch(e=>Ve({atlasError:String((e==null?void 0:e.message)??e)})),af.load(Tu).then(e=>Ve({sweep:e})).catch(e=>Ve({sweepError:String((e==null?void 0:e.message)??e),colorMode:"selectivity"}));const t=new Oy;t.onCrash=e=>Ve({modelError:e,modelProgress:0}),Ve({runtime:t}),t.init(Tu,(e,n)=>Ve({modelProgress:n?Math.min(.99,e/n):0})).then(()=>Ve({modelProgress:1,modelError:null})).catch(e=>Ve({modelError:String((e==null?void 0:e.message)??e)}))}function tb(t){ye.useEffect(()=>{if(!t)return;const e={layers:t.L,neurons:t.N},n=()=>{const s=window.location.hash,o=Hy(s,e),a=/^#\/?atlas\/[^/?]+\/[^/?]+/i.test(s),l=gn();Ve({view:o.view,focus:o.focus&&l.focus&&o.focus.layer===l.focus.layer&&o.focus.neuron===l.focus.neuron?l.focus:o.focus,tab:o.tab??(o.focus?l.tab:"profile"),card:o.card,notice:a&&!o.focus?`There is no neuron at “${decodeURIComponent(s.slice(1))}”. This model has layers 0–${t.L-1} and neurons 0–${t.N-1}.`:null});const c=Fl({view:o.view,focus:o.focus,tab:o.tab,card:o.card});c!==s&&!(c==="#/atlas"&&s==="")&&history.replaceState(null,"",c)};n(),window.addEventListener("hashchange",n);let i=gn();const r=lf(()=>{const s=gn();if(s.view!==i.view||s.focus!==i.focus||s.tab!==i.tab||s.card!==i.card){const o=Fl({view:s.view,focus:s.focus,tab:s.tab,card:s.card}),a=window.location.hash||"#/atlas";o!==a&&(s.view===i.view&&s.focus===i.focus&&s.card===i.card?history.replaceState(null,"",o):history.pushState(null,"",o))}i=s});return()=>{window.removeEventListener("hashchange",n),r()}},[t])}function nb(){const t=Pe(r=>r.atlas),e=Pe(r=>r.atlasProgress),n=Pe(r=>r.atlasError),i=Pe(r=>r.view);return ye.useEffect(eb,[]),tb(t),t?m.jsxs(m.Fragment,{children:[m.jsx("a",{className:"skip",href:"#main",children:"Skip to content"}),i==="atlas"?m.jsx(ib,{atlas:t}):m.jsxs("div",{className:"app page",children:[m.jsx(qv,{atlas:t}),m.jsx("main",{id:"main",className:"page-main",tabIndex:-1,children:i==="findings"?m.jsx(qA,{atlas:t}):m.jsx(JA,{})})]})]}):m.jsxs("div",{className:"boot",role:"status",children:[m.jsx("h1",{children:"Neuron Atlas"}),n?m.jsxs(m.Fragment,{children:[m.jsxs("p",{className:"err",children:["The atlas failed to load: ",n]}),m.jsx("p",{children:m.jsx("button",{onClick:()=>window.location.reload(),children:"Reload"})})]}):m.jsxs("p",{children:["Loading the atlas: ",Math.round(e*100),"%"]})]})}function ib({atlas:t}){const e=Pe(o=>o.focus),n=Pe(o=>o.webglError),i=Pe(o=>o.notice),[r,s]=ye.useState(0);return ye.useEffect(()=>{const o=a=>{if(a.key!=="Escape"||!gn().focus)return;const l=a.target;l&&(l.tagName==="INPUT"||l.tagName==="TEXTAREA"||l.tagName==="SELECT")||Ve({focus:null,tab:"profile"})};return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)},[]),m.jsxs("div",{className:`app${e?" has-focus":""}`,children:[m.jsx(qv,{atlas:t}),m.jsx(jA,{atlas:t}),m.jsxs("main",{id:"main",className:"stage",tabIndex:-1,children:[m.jsxs("div",{className:"map-wrap",children:[n?m.jsxs("div",{className:"map-fallback",role:"alert",children:[m.jsx("h2",{children:"The 3D map is unavailable"}),m.jsx("p",{children:n}),m.jsx("p",{children:"Everything else still works: find neurons in the list, open them, probe text and steer the model."}),m.jsx("button",{onClick:()=>{Ve({webglError:null}),s(o=>o+1)},children:"Try the map again"})]}):m.jsx(MA,{atlas:t},r),m.jsx(rb,{atlas:t}),!e&&!n&&m.jsx(sb,{}),i&&m.jsxs("div",{className:"notice",role:"status",children:[m.jsx("span",{children:i}),m.jsx("button",{className:"icon","aria-label":"Dismiss",onClick:()=>Ve({notice:null}),children:"×"})]})]}),m.jsx(BA,{atlas:t})]}),e&&m.jsx(PA,{atlas:t,r:e},Ds(e))]})}function rb({atlas:t}){const e=Pe(o=>o.hover),n=Pe(o=>o.names),i=Pe(o=>o.sweep);if(!e)return null;const r=t.lens(e),s=i==null?void 0:i.stats(e);return m.jsxs("div",{className:"hover-card","aria-hidden":"true",children:[m.jsx("strong",{children:Ds(e)}),m.jsx("span",{children:n[Ds(e)]||`peaks on ${t.label(e)}`}),s&&Number.isFinite(s.z)&&m.jsxs("span",{className:"lens-inline",children:["steering beats ",Math.round(s.pct*100),"% of random directions",s.themes.length>0&&m.jsxs(m.Fragment,{children:[" · pulls toward ",m.jsx("em",{children:s.themes.slice(0,3).join(", ")})]})]}),m.jsxs("span",{className:"lens-inline",children:["predicts"," ",r.promotes.slice(0,4).map(o=>m.jsx("code",{children:Ho(t.tok.str(o.id))},o.id))]})]})}function sb(){const t=Pe(e=>e.sweep);return m.jsxs("div",{className:"intro",children:[m.jsxs("p",{children:["Each point is one of the 8,192 feed-forward neurons in a small story-writing model, stacked from layer 0 at the bottom to layer 7 at the top.",t?" Brightness shows how distinctive the text becomes when the neuron is pushed, compared with pushing random directions.":" Bright points respond to one specific thing."]}),m.jsx("p",{children:"Drag to orbit. Click a neuron to see what it responds to, then ablate or steer it and watch the model's writing change."})]})}av(document.getElementById("root")).render(m.jsx(ye.StrictMode,{children:m.jsx(nb,{})}));
