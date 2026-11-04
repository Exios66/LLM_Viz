import{r as jt,s as Mt,a as Os,j as Et,g as ht,e as zs,b as Cs,f as Rs}from"./index-DfUZUM0c.js";import{C as js,V as g,M as yt,T as mt,Q as $e,S as Qe,a as I,R as Us,P as Ns,b as ct,I as Fs,F as ye,c as ge,d as _t,W as ks,B as be,e as us,f as ps,g as Ht,U as fs,h as Yt,i as ms,j as Pt,L as Bs,k as Is,l as Ws,m as Hs,n as Ys,o as de,p as Ut,A as Je,q as Gs,r as ts,E as es,s as Nt,t as H,u as Xs,v as Zs,w as ue,x as Ks}from"./three-CM2EONrF.js";const ss={type:"change"},ve={type:"start"},_s={type:"end"},Ft=new Us,is=new Ns,Vs=Math.cos(70*ct.DEG2RAD),A=new g,F=2*Math.PI,v={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},pe=1e-6;class qs extends js{constructor(t,s=null){super(t,s),this.state=v.NONE,this.enabled=!0,this.target=new g,this.cursor=new g,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:yt.ROTATE,MIDDLE:yt.DOLLY,RIGHT:yt.PAN},this.touches={ONE:mt.ROTATE,TWO:mt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new g,this._lastQuaternion=new $e,this._lastTargetPosition=new g,this._quat=new $e().setFromUnitVectors(t.up,new g(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Qe,this._sphericalDelta=new Qe,this._scale=1,this._panOffset=new g,this._rotateStart=new I,this._rotateEnd=new I,this._rotateDelta=new I,this._panStart=new I,this._panEnd=new I,this._panDelta=new I,this._dollyStart=new I,this._dollyEnd=new I,this._dollyDelta=new I,this._dollyDirection=new g,this._mouse=new I,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Qs.bind(this),this._onPointerDown=$s.bind(this),this._onPointerUp=Js.bind(this),this._onContextMenu=ai.bind(this),this._onMouseWheel=si.bind(this),this._onKeyDown=ii.bind(this),this._onTouchStart=oi.bind(this),this._onTouchMove=ni.bind(this),this._onMouseDown=ti.bind(this),this._onMouseMove=ei.bind(this),this._interceptControlDown=ri.bind(this),this._interceptControlUp=li.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ss),this.update(),this.state=v.NONE}update(t=null){const s=this.object.position;A.copy(s).sub(this.target),A.applyQuaternion(this._quat),this._spherical.setFromVector3(A),this.autoRotate&&this.state===v.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,c=this.maxAzimuthAngle;isFinite(r)&&isFinite(c)&&(r<-Math.PI?r+=F:r>Math.PI&&(r-=F),c<-Math.PI?c+=F:c>Math.PI&&(c-=F),r<=c?this._spherical.theta=Math.max(r,Math.min(c,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+c)/2?Math.max(r,this._spherical.theta):Math.min(c,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let f=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const m=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),f=m!=this._spherical.radius}if(A.setFromSpherical(this._spherical),A.applyQuaternion(this._quatInverse),s.copy(this.target).add(A),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let m=null;if(this.object.isPerspectiveCamera){const h=A.length();m=this._clampDistance(h*this._scale);const x=h-m;this.object.position.addScaledVector(this._dollyDirection,x),this.object.updateMatrixWorld(),f=!!x}else if(this.object.isOrthographicCamera){const h=new g(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const x=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),f=x!==this.object.zoom;const w=new g(this._mouse.x,this._mouse.y,0);w.unproject(this.object),this.object.position.sub(w).add(h),this.object.updateMatrixWorld(),m=A.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;m!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(m).add(this.object.position):(Ft.origin.copy(this.object.position),Ft.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ft.direction))<Vs?this.object.lookAt(this.target):(is.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ft.intersectPlane(is,this.target))))}else if(this.object.isOrthographicCamera){const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),m!==this.object.zoom&&(this.object.updateProjectionMatrix(),f=!0)}return this._scale=1,this._performCursorZoom=!1,f||this._lastPosition.distanceToSquared(this.object.position)>pe||8*(1-this._lastQuaternion.dot(this.object.quaternion))>pe||this._lastTargetPosition.distanceToSquared(this.target)>pe?(this.dispatchEvent(ss),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?F/60*this.autoRotateSpeed*t:F/60/60*this.autoRotateSpeed}_getZoomScale(t){const s=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*s)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,s){A.setFromMatrixColumn(s,0),A.multiplyScalar(-t),this._panOffset.add(A)}_panUp(t,s){this.screenSpacePanning===!0?A.setFromMatrixColumn(s,1):(A.setFromMatrixColumn(s,0),A.crossVectors(this.object.up,A)),A.multiplyScalar(t),this._panOffset.add(A)}_pan(t,s){const r=this.domElement;if(this.object.isPerspectiveCamera){const c=this.object.position;A.copy(c).sub(this.target);let f=A.length();f*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*f/r.clientHeight,this.object.matrix),this._panUp(2*s*f/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(s*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,s){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),c=t-r.left,f=s-r.top,m=r.width,h=r.height;this._mouse.x=c/m*2-1,this._mouse.y=-(f/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const s=this.domElement;this._rotateLeft(F*this._rotateDelta.x/s.clientHeight),this._rotateUp(F*this._rotateDelta.y/s.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let s=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(F*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),s=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-F*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),s=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(F*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),s=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-F*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),s=!0;break}s&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),r=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._rotateStart.set(r,c)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),r=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._panStart.set(r,c)}}_handleTouchStartDolly(t){const s=this._getSecondPointerPosition(t),r=t.pageX-s.x,c=t.pageY-s.y,f=Math.sqrt(r*r+c*c);this._dollyStart.set(0,f)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const r=this._getSecondPointerPosition(t),c=.5*(t.pageX+r.x),f=.5*(t.pageY+r.y);this._rotateEnd.set(c,f)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const s=this.domElement;this._rotateLeft(F*this._rotateDelta.x/s.clientHeight),this._rotateUp(F*this._rotateDelta.y/s.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),r=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._panEnd.set(r,c)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const s=this._getSecondPointerPosition(t),r=t.pageX-s.x,c=t.pageY-s.y,f=Math.sqrt(r*r+c*c);this._dollyEnd.set(0,f),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const m=(t.pageX+s.x)*.5,h=(t.pageY+s.y)*.5;this._updateZoomParameters(m,h)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let s=0;s<this._pointers.length;s++)if(this._pointers[s]==t.pointerId){this._pointers.splice(s,1);return}}_isTrackingPointer(t){for(let s=0;s<this._pointers.length;s++)if(this._pointers[s]==t.pointerId)return!0;return!1}_trackPointer(t){let s=this._pointerPositions[t.pointerId];s===void 0&&(s=new I,this._pointerPositions[t.pointerId]=s),s.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const s=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[s]}_customWheelEvent(t){const s=t.deltaMode,r={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(s){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function $s(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function Qs(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Js(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(_s),this.state=v.NONE;break;case 1:const t=this._pointers[0],s=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:s.x,pageY:s.y});break}}function ti(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case yt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=v.DOLLY;break;case yt.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=v.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=v.ROTATE}break;case yt.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=v.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=v.PAN}break;default:this.state=v.NONE}this.state!==v.NONE&&this.dispatchEvent(ve)}function ei(n){switch(this.state){case v.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case v.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case v.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function si(n){this.enabled===!1||this.enableZoom===!1||this.state!==v.NONE||(n.preventDefault(),this.dispatchEvent(ve),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(_s))}function ii(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function oi(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case mt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=v.TOUCH_ROTATE;break;case mt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=v.TOUCH_PAN;break;default:this.state=v.NONE}break;case 2:switch(this.touches.TWO){case mt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=v.TOUCH_DOLLY_PAN;break;case mt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=v.TOUCH_DOLLY_ROTATE;break;default:this.state=v.NONE}break;default:this.state=v.NONE}this.state!==v.NONE&&this.dispatchEvent(ve)}function ni(n){switch(this._trackPointer(n),this.state){case v.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case v.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case v.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case v.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=v.NONE}}function ai(n){this.enabled!==!1&&n.preventDefault()}function ri(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function li(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const os=new be,kt=new g;class we extends Fs{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],s=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],r=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(r),this.setAttribute("position",new ye(t,3)),this.setAttribute("uv",new ye(s,2))}applyMatrix4(t){const s=this.attributes.instanceStart,r=this.attributes.instanceEnd;return s!==void 0&&(s.applyMatrix4(t),r.applyMatrix4(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let s;t instanceof Float32Array?s=t:Array.isArray(t)&&(s=new Float32Array(t));const r=new ge(s,6,1);return this.setAttribute("instanceStart",new _t(r,3,0)),this.setAttribute("instanceEnd",new _t(r,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let s;t instanceof Float32Array?s=t:Array.isArray(t)&&(s=new Float32Array(t));const r=new ge(s,6,1);return this.setAttribute("instanceColorStart",new _t(r,3,0)),this.setAttribute("instanceColorEnd",new _t(r,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new ks(t.geometry)),this}fromLineSegments(t){const s=t.geometry;return this.setPositions(s.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new be);const t=this.attributes.instanceStart,s=this.attributes.instanceEnd;t!==void 0&&s!==void 0&&(this.boundingBox.setFromBufferAttribute(t),os.setFromBufferAttribute(s),this.boundingBox.union(os))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new us),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,s=this.attributes.instanceEnd;if(t!==void 0&&s!==void 0){const r=this.boundingSphere.center;this.boundingBox.getCenter(r);let c=0;for(let f=0,m=t.count;f<m;f++)kt.fromBufferAttribute(t,f),c=Math.max(c,r.distanceToSquared(kt)),kt.fromBufferAttribute(s,f),c=Math.max(c,r.distanceToSquared(kt));this.boundingSphere.radius=Math.sqrt(c),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}Yt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new I(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Ht.line={uniforms:fs.merge([Yt.common,Yt.fog,Yt.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class ys extends ps{constructor(t){super({type:"LineMaterial",uniforms:fs.clone(Ht.line.uniforms),vertexShader:Ht.line.vertexShader,fragmentShader:Ht.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const fe=new Pt,ns=new g,as=new g,O=new Pt,z=new Pt,V=new Pt,me=new g,_e=new Is,R=new Bs,rs=new g,Bt=new be,It=new us,q=new Pt;let $,dt;function ls(n,t,s){return q.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),q.multiplyScalar(1/q.w),q.x=dt/s.width,q.y=dt/s.height,q.applyMatrix4(n.projectionMatrixInverse),q.multiplyScalar(1/q.w),Math.abs(Math.max(q.x,q.y))}function hi(n,t){const s=n.matrixWorld,r=n.geometry,c=r.attributes.instanceStart,f=r.attributes.instanceEnd,m=Math.min(r.instanceCount,c.count);for(let h=0,x=m;h<x;h++){R.start.fromBufferAttribute(c,h),R.end.fromBufferAttribute(f,h),R.applyMatrix4(s);const w=new g,L=new g;$.distanceSqToSegment(R.start,R.end,L,w),L.distanceTo(w)<dt*.5&&t.push({point:L,pointOnLine:w,distance:$.origin.distanceTo(L),object:n,face:null,faceIndex:h,uv:null,uv1:null})}}function ci(n,t,s){const r=t.projectionMatrix,f=n.material.resolution,m=n.matrixWorld,h=n.geometry,x=h.attributes.instanceStart,w=h.attributes.instanceEnd,L=Math.min(h.instanceCount,x.count),P=-t.near;$.at(1,V),V.w=1,V.applyMatrix4(t.matrixWorldInverse),V.applyMatrix4(r),V.multiplyScalar(1/V.w),V.x*=f.x/2,V.y*=f.y/2,V.z=0,me.copy(V),_e.multiplyMatrices(t.matrixWorldInverse,m);for(let U=0,ut=L;U<ut;U++){if(O.fromBufferAttribute(x,U),z.fromBufferAttribute(w,U),O.w=1,z.w=1,O.applyMatrix4(_e),z.applyMatrix4(_e),O.z>P&&z.z>P)continue;if(O.z>P){const Z=O.z-z.z,T=(O.z-P)/Z;O.lerp(z,T)}else if(z.z>P){const Z=z.z-O.z,T=(z.z-P)/Z;z.lerp(O,T)}O.applyMatrix4(r),z.applyMatrix4(r),O.multiplyScalar(1/O.w),z.multiplyScalar(1/z.w),O.x*=f.x/2,O.y*=f.y/2,z.x*=f.x/2,z.y*=f.y/2,R.start.copy(O),R.start.z=0,R.end.copy(z),R.end.z=0;const et=R.closestPointToPointParameter(me,!0);R.at(et,rs);const X=ct.lerp(O.z,z.z,et),S=X>=-1&&X<=1,gt=me.distanceTo(rs)<dt*.5;if(S&&gt){R.start.fromBufferAttribute(x,U),R.end.fromBufferAttribute(w,U),R.start.applyMatrix4(m),R.end.applyMatrix4(m);const Z=new g,T=new g;$.distanceSqToSegment(R.start,R.end,T,Z),s.push({point:T,pointOnLine:Z,distance:$.origin.distanceTo(T),object:n,face:null,faceIndex:U,uv:null,uv1:null})}}}class di extends ms{constructor(t=new we,s=new ys({color:Math.random()*16777215})){super(t,s),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,s=t.attributes.instanceStart,r=t.attributes.instanceEnd,c=new Float32Array(2*s.count);for(let m=0,h=0,x=s.count;m<x;m++,h+=2)ns.fromBufferAttribute(s,m),as.fromBufferAttribute(r,m),c[h]=h===0?0:c[h-1],c[h+1]=c[h]+ns.distanceTo(as);const f=new ge(c,2,1);return t.setAttribute("instanceDistanceStart",new _t(f,1,0)),t.setAttribute("instanceDistanceEnd",new _t(f,1,1)),this}raycast(t,s){const r=this.material.worldUnits,c=t.camera;c===null&&!r&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const f=t.params.Line2!==void 0&&t.params.Line2.threshold||0;$=t.ray;const m=this.matrixWorld,h=this.geometry,x=this.material;dt=x.linewidth+f,h.boundingSphere===null&&h.computeBoundingSphere(),It.copy(h.boundingSphere).applyMatrix4(m);let w;if(r)w=dt*.5;else{const P=Math.max(c.near,It.distanceToPoint($.origin));w=ls(c,P,x.resolution)}if(It.radius+=w,$.intersectsSphere(It)===!1)return;h.boundingBox===null&&h.computeBoundingBox(),Bt.copy(h.boundingBox).applyMatrix4(m);let L;if(r)L=dt*.5;else{const P=Math.max(c.near,Bt.distanceToPoint($.origin));L=ls(c,P,x.resolution)}Bt.expandByScalar(L),$.intersectsBox(Bt)!==!1&&(r?hi(this,s):ci(this,c,s))}onBeforeRender(t){const s=this.material.uniforms;s&&s.resolution&&(t.getViewport(fe),this.material.uniforms.resolution.value.set(fe.z,fe.w))}}const C=2,Gt=.95,B=.42,hs=-.34,tt=.08,cs=B+C+.1,E={idle:new H(.2,.25,.45),wire:new H(3820166),slab:new H(9348070),slabEdge:new H(5596840),sheet:new H(4609434),sheetOn:new H(15906891),focus:new H(1,.96,.88),compare:new H(.72,.64,1),edit:new H(.73,.65,1),up:new H(15906891),down:new H(7976191)},ds={evil:[.93,.44,.53],alien:[.37,.82,.87],other:[.95,.72,.29]},Wt={up:[242/255,184/255,75/255],down:[121/255,180/255,255/255],mid:[.22,.24,.33]},ui=`
  attribute vec3 color;
  attribute float size;
  attribute float alpha;
  uniform float uScale, uFocusX, uFadeW, uFadeAmt, uCamSide, uNear;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    // layers away from the focus fade as the camera closes in (never below a quarter); layers between the camera
    // and the focus fade further, so the focus reads through them
    float d = (position.x - uFocusX) / uFadeW;
    float front = step(0.45, (position.x - uFocusX) * uCamSide / ${Gt.toFixed(3)});
    float keep = mix(1.0, exp(-d * d), uFadeAmt * 0.75) * mix(1.0, 1.0 - 0.6 * uFadeAmt, front);
    vColor = color * uNear;
    vAlpha = alpha * keep;
    gl_PointSize = size * uScale / -mv.z;
  }
`,pi=`
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;
    float core = 1.0 - smoothstep(0.0, 0.5, d);
    float halo = (1.0 - smoothstep(0.15, 1.0, d)) * 0.4;
    float a = (core + halo) * vAlpha;
    gl_FragColor = vec4(vColor, a); // additive: src * alpha + dst
  }
`,G=(n,t)=>(n-(t-1)/2)*Gt;function _i({space:n,recorded:t=null}){const s=n,r=jt.useRef(null),c=jt.useRef(null),f=jt.useRef(null);return jt.useEffect(()=>{var qe;const m=r.current,{L:h,N:x}=s,w=h*x,L=!t;let P=!0;const U={fx:0,fw:1,amt:0,side:1},ut=((qe=window.matchMedia)==null?void 0:qe.call(window,"(prefers-reduced-motion: reduce)").matches)??!1;let N;try{N=new Ws({antialias:!0,alpha:!0,powerPreference:"high-performance"})}catch{Mt({webglError:"Your browser could not start WebGL, so the 3D view cannot be drawn. It may be turned off, or the graphics driver may be blocked."});return}let et=Math.min(window.devicePixelRatio,2);N.setPixelRatio(et),m.appendChild(N.domElement);const X=new Hs,S=new Ys(32,1,.02,400),gt=G(0,h)+hs-.7,Z=G(h-1,h)+tt+.6,T={target:new g(0,B+C/2-.15,0),dir:new g(.62,.4,1).normalize(),dist:10},xe=[];for(const e of[gt,Z])for(const i of[-.3,B+C])for(const a of[-C/2,C/2])xe.push(new g(e,i,a));const D=new qs(S,N.domElement);D.enableDamping=!ut,D.dampingFactor=.09,D.zoomToCursor=!0,D.zoomSpeed=.7,D.target.copy(T.target);let Tt=!1;const j=new Float32Array(w*3),Se=e=>{const i=new Float32Array(w*3);for(let a=0;a<w;a++){const l=Math.floor(a/x);i[a*3]=G(l,h)+tt,i[a*3+1]=B+(e[a*2+1]+1)/2*C,i[a*3+2]=e[a*2]*C/2}return i},Dt=Se(s.layout);j.set(Dt);let Xt=Dt,Zt=Dt,it=1,Me=0;const gs=e=>L&&e.layoutMode==="cofire"&&e.sweep&&e.sweep.cofire.length===w*2?Se(e.sweep.cofire):Dt,k=new de;k.setAttribute("position",new Ut(j,3));const At=new Float32Array(w*3),Ee=new Float32Array(w),Pe=new Float32Array(w);k.setAttribute("color",new Ut(At,3)),k.setAttribute("size",new Ut(Ee,1)),k.setAttribute("alpha",new Ut(Pe,1));const ot={uScale:{value:1},uFocusX:{value:0},uFadeW:{value:1},uFadeAmt:{value:0},uCamSide:{value:1},uNear:{value:1}},Te=new ps({vertexShader:ui,fragmentShader:pi,uniforms:ot,transparent:!0,depthWrite:!1,blending:Je}),Kt=new Gs(k,Te);Kt.renderOrder=2,X.add(Kt);const nt=[k,Te],De=[],Vt=(e,i)=>De.push(...e,...i);Vt([gt,0,0],[Z,0,0]);const pt=C/2,qt=[],Ae=[],$t=new ts(.06,C*.9,C*.9),Le=new es($t);nt.push($t,Le);for(let e=0;e<h;e++){const i=G(e,h)+tt,a=G(e,h)+hs;Vt([a,0,0],[a,B+C*.05,0]),Vt([i,0,0],[i,B,0]);const l=new de().setFromPoints([new g(i,B,-pt),new g(i,B,pt),new g(i,B+C,pt),new g(i,B+C,-pt)]),_=new Nt({color:E.sheet,transparent:!0,opacity:.8}),u=new Xs(l,_);X.add(u),qt.push(_),nt.push(l,_);const d=new Zs({color:E.slab,transparent:!0,opacity:.05,depthWrite:!1}),o=new ms($t,d);o.position.set(a,B+C/2,0);const b=new Nt({color:E.slabEdge,transparent:!0,opacity:.7}),p=new ue(Le,b);p.position.copy(o.position),o.userData={edges:b},X.add(o,p),Ae.push(o),nt.push(d,b)}for(const e of[gt,Z]){const i=new ue(new es(new ts(.08,.5,.9)),new Nt({color:E.slabEdge}));i.position.set(e,0,0),X.add(i),nt.push(i.geometry,i.material)}const Qt=new de;Qt.setAttribute("position",new ye(De,3));const Jt=new Nt({color:E.wire,transparent:!0,opacity:.9});X.add(new ue(Qt,Jt)),nt.push(Qt,Jt);const te=new ys({vertexColors:!0,linewidth:2,transparent:!0,depthWrite:!1,blending:Je}),Q=new di(new we,te);Q.frustumCulled=!1,Q.renderOrder=1,Q.visible=!1,X.add(Q),nt.push(te);const Lt=[];for(let e=0;e<h;e++){const i=document.createElement("button");i.className="layer-label",i.textContent=`L${e}`,i.setAttribute("aria-label",`Layer ${e}: face it head-on and show only it (press again to show all)`),i.onclick=()=>Mt(a=>({isolateLayer:a.isolateLayer===e?null:e})),c.current.appendChild(i),Lt.push(i)}let Ot=null,ft=null;const Oe=e=>{if(!L||!e.sweep)return null;const i=e.sweep.zArray(),a=Float32Array.from(i).filter(Number.isFinite).sort(),l=Math.max(a[Math.floor(a.length*.995)]??1,3),_=2,u=new Float32Array(w);for(let d=0;d<w;d++)u[d]=Number.isFinite(i[d])?Math.min(1,Math.max(0,(i[d]-_)/(l-_))):0;return u},ze=e=>{const i=t==null?void 0:t.signals[e];if(!i)return null;const a=Float32Array.from(i).sort(),l=Math.max(a[Math.floor(a.length*.999)]??1,1),_=new Float32Array(w);for(let u=0;u<w;u++)_[u]=Math.min(1,Math.max(0,(i[u]-.5)/(l-.5)));return _},Ce=ze("d_evil"),Re=ze("d_alien"),je=e=>{const i=t==null?void 0:t.signals[e];if(!i)return null;const a=Float32Array.from(i,Math.abs).sort(),l=Math.max(a[Math.floor(a.length*.995)]??.25,.25);return Float32Array.from(i,_=>Math.max(-1,Math.min(1,_/l)))},Ue=je("dd_evil"),Ne=je("dd_alien"),Fe=new Map,ee=new Set;if(t!=null&&t.hunt){for(const e of t.hunt.finalists)Fe.set(t.g(e),e.concept);for(const e of t.hunt.scatter.units)ee.add(e[0]*x+e[1])}const ke=e=>{if(!L)return null;const i=e.analysis;if(!i||!i.tokens.length)return null;const a=i.tokens.length,l=new Float32Array(w),_=e.probePos!==null&&e.probePos<a?e.probePos:null;for(let u=0;u<w;u++){let d=0;if(_!==null)d=i.acts[_*w+u];else for(let o=0;o<a;o++)d=Math.max(d,i.acts[o*w+u]);l[u]=d/Math.max(s.max[u],.25)}return l},at=Math.sqrt(1024/x)*1.15,ws=e=>{const i=[];if(!e.focus||!e.showWeb||!L)return i;const a=s.g(e.focus);for(const l of["up","down"])s.links(e.focus,l).sort((u,d)=>Math.abs(d.w)-Math.abs(u.w)).forEach((u,d)=>{const o=s.g(u);if(i.push(l==="up"?{a:o,b:a,w:u.w,hop:1}:{a,b:o,w:u.w,hop:1}),!(d>=6))for(const b of s.links(u,l).sort((p,y)=>Math.abs(y.w)-Math.abs(p.w)).slice(0,4)){const p=s.g(b);p!==a&&i.push(l==="up"?{a:p,b:o,w:b.w,hop:2}:{a:o,b:p,w:b.w,hop:2})}});return i};let J=[];const zt=()=>{const e=ht(),i=new Set(e.edits.filter(o=>o.enabled!==!1).map(zs)),a=e.focus?s.g(e.focus):-1,l=e.hover?s.g(e.hover):-1,_=e.compare?s.g(e.compare):-1;J=ws(e);const u=new Map;for(const o of J){const b=o.a===a?o.b:o.a;u.has(b)||u.set(b,o.hop===1?Math.sign(o.w):.5*Math.sign(o.w)),o.hop===2&&!u.has(o.b)&&u.set(o.b,.5*Math.sign(o.w))}const d=new H;for(let o=0;o<w;o++){const b=Math.floor(o/x);let p,y=7,K=null;if(!L&&(e.colorMode==="evil"||e.colorMode==="alien")&&(e.colorMode==="evil"?Ce:Re)){const Y=(e.colorMode==="evil"?Ce:Re)[o];p=.1+.9*Math.pow(Y,.8),y=4+14*Y;const lt=ds[e.colorMode];K=[lt[0]*p,lt[1]*p,lt[2]*p]}else if(!L&&(e.colorMode==="shift-evil"||e.colorMode==="shift-alien")&&(e.colorMode==="shift-evil"?Ue:Ne)){const Y=(e.colorMode==="shift-evil"?Ue:Ne)[o],lt=Math.pow(Math.abs(Y),.8),Ls=Y>=0?Wt.up:Wt.down;p=.15+.85*lt,y=4+14*lt,K=[0,1,2].map(ce=>Wt.mid[ce]+(Ls[ce]-Wt.mid[ce])*lt)}else if(!L&&e.colorMode==="hunt"){const Y=Fe.get(o);Y?(p=1,y=18,K=ds[Y]):(p=ee.has(o)?.32:.08,y=ee.has(o)?7:4)}else if(e.colorMode==="probe"&&Ot){const Y=Math.max(0,Ot[o]);p=Math.pow(Math.min(Y,1),.8),y=5+16*Math.min(Y,1.2)}else e.colorMode==="uniqueness"&&ft?(p=ft[o]>0?.3+.7*Math.pow(ft[o],.7):.12,y=5+15*ft[o]):e.colorMode==="density"?p=Math.sqrt(s.density[o]):(p=Math.max(0,(s.share[o]-.1)/.9),y=5+9*p);let[vt,xt,St]=K??(p<.13?[E.idle.r,E.idle.g,E.idle.b]:Cs(p));y*=at;let rt=.3+.7*p;i.has(`${b}:${o%x}`)&&([vt,xt,St]=[E.edit.r,E.edit.g,E.edit.b],y=Math.max(y,16*at),rt=1);const Rt=u.get(o);Rt!==void 0&&(d.copy(Rt>0?E.up:E.down).multiplyScalar(Math.abs(Rt)===1?1:.6),[vt,xt,St]=[d.r,d.g,d.b],y=Math.max(y,(Math.abs(Rt)===1?15:10)*at),rt=1),o===l&&(y=Math.max(y*1.6,22*at),rt=1),o===_&&([vt,xt,St]=[E.compare.r,E.compare.g,E.compare.b],y=26*Math.max(.8,at),rt=1),o===a&&([vt,xt,St]=[E.focus.r,E.focus.g,E.focus.b],y=32*Math.max(.8,at),rt=1),e.isolateLayer!==null&&b!==e.isolateLayer&&(rt*=.06),At[o*3]=vt,At[o*3+1]=xt,At[o*3+2]=St,Ee[o]=y,Pe[o]=rt}k.attributes.color.needsUpdate=!0,k.attributes.size.needsUpdate=!0,k.attributes.alpha.needsUpdate=!0,qt.forEach((o,b)=>{o.color.copy(e.isolateLayer===b?E.sheetOn:E.sheet)}),Lt.forEach((o,b)=>{o.classList.toggle("on",e.isolateLayer===b),o.setAttribute("aria-pressed",String(e.isolateLayer===b))}),bs(a),P=!0},bs=e=>{if(!J.length){Q.visible=!1;return}const i=new Set(J.map(d=>d.a)),a=new Set(J.map(d=>d.b)),l=Math.max(...J.map(d=>Math.abs(d.w)),1e-6),_=new Float32Array(J.length*6),u=new Float32Array(J.length*6);J.forEach((d,o)=>{const b=(d.a===e||a.has(d.a))&&(d.b===e||i.has(d.b)),p=d.w>0?E.up:E.down,y=(.35+.65*(Math.abs(d.w)/l))*(d.hop===1?.8:.45)*(b?1:.35);_.set([j[d.a*3],j[d.a*3+1],j[d.a*3+2],j[d.b*3],j[d.b*3+1],j[d.b*3+2]],o*6),u.set([p.r*y,p.g*y,p.b*y,p.r*y,p.g*y,p.b*y],o*6)}),Q.geometry.dispose(),Q.geometry=new we().setPositions(_).setColors(u),Q.visible=!0},Be=e=>{Xt=Float32Array.from(j),Zt=gs(e),Me=performance.now(),it=ut?1:0,ut&&(j.set(Zt),k.attributes.position.needsUpdate=!0,k.computeBoundingSphere(),zt()),P=!0};let W=null;const se=(e,i,a=600)=>{if(ut){D.target.copy(e),S.position.copy(i),P=!0;return}W={from:D.target.clone(),to:e.clone(),p0:S.position.clone(),p1:i.clone(),t0:performance.now(),ms:a}},Ie=()=>T.target.clone().addScaledVector(T.dir,T.dist),We=()=>se(T.target,Ie()),vs=e=>{const i=new g(G(e,h)+tt,B+C/2,0),a=C/2/Math.tan(ct.degToRad(S.fov/2))*1.3;se(i,i.clone().add(new g(a,1e-4,0)))},xs=e=>{const i=new g(j[e*3],j[e*3+1],j[e*3+2]),a=i.clone().project(S);if(a.z<1&&Math.abs(a.x)<.85&&Math.abs(a.y)<.85)return;const l=S.position.clone().sub(D.target).normalize(),_=Math.min(S.position.distanceTo(D.target),T.dist*.45);se(i,i.clone().addScaledVector(l,_),500)};f.current={home:We};let M=ht();Ot=ke(M),ft=Oe(M),M.layoutMode==="cofire"&&M.sweep&&Be(M),zt();const Ss=Os(()=>{const e=ht();(e.analysis!==M.analysis||e.probePos!==M.probePos)&&(Ot=ke(e)),e.sweep!==M.sweep&&(ft=Oe(e)),(e.layoutMode!==M.layoutMode||e.sweep!==M.sweep)&&Be(e),e.isolateLayer!==M.isolateLayer&&(e.isolateLayer!==null?vs(e.isolateLayer):We()),e.focus&&e.focus!==M.focus&&Tt&&xs(s.g(e.focus)),(e.sweep!==M.sweep||e.analysis!==M.analysis||e.probePos!==M.probePos||e.focus!==M.focus||e.hover!==M.hover||e.edits!==M.edits||e.colorMode!==M.colorMode||e.showWeb!==M.showWeb||e.isolateLayer!==M.isolateLayer||e.compare!==M.compare)&&zt(),M=e}),ie=new Ks,He=new I,Ye=e=>{const i=G(e,h)+tt-U.fx,a=i/U.fw;return i*U.side/Gt>.45?1-U.amt:1-.75*U.amt*(1-Math.exp(-a*a))},Ge=e=>{const i=N.domElement.getBoundingClientRect();He.set((e.clientX-i.left)/i.width*2-1,-((e.clientY-i.top)/i.height)*2+1),ie.setFromCamera(He,S),ie.params.Points={threshold:.012*S.position.distanceTo(D.target)*Math.max(.6,at)};const a=ht().isolateLayer,l=ie.intersectObject(Kt).filter(o=>a===null||Math.floor(o.index/x)===a);if(!l.length)return null;const _=[...new Set(l.map(o=>Math.floor(o.index/x)))],u=_.find(o=>Ye(o)>.5)??_[0];let d=l[0];for(const o of l)Math.floor(o.index/x)===u&&(Math.floor(d.index/x)!==u||o.distanceToRay<d.distanceToRay)&&(d=o);return s.ref(d.index)};let oe={x:0,y:0},wt=null;const Ms=e=>{if(!e.buttons){if(wt){wt=e;return}wt=e,requestAnimationFrame(()=>{const i=wt;wt=null;const a=Ge(i),l=ht().hover;(a&&(!l||s.g(a)!==s.g(l))||!a&&l)&&Mt({hover:a}),N.domElement.style.cursor=a?"pointer":"grab"})}},Es=e=>{oe={x:e.clientX,y:e.clientY},Tt=!0,W=null},Ps=e=>{if(Math.hypot(e.clientX-oe.x,e.clientY-oe.y)>5)return;const i=Ge(e);i&&Rs(i)},Ts=()=>ht().hover&&Mt({hover:null}),st=N.domElement;st.addEventListener("pointermove",Ms),st.addEventListener("pointerdown",Es),st.addEventListener("pointerup",Ps),st.addEventListener("pointerleave",Ts),st.addEventListener("wheel",()=>(Tt=!0,W=null),{passive:!0});let ne=0;const Xe=e=>{e.preventDefault(),cancelAnimationFrame(ne),Mt({webglError:"The graphics context was lost (the GPU was reset or the tab used too much memory)."})};st.addEventListener("webglcontextlost",Xe),D.addEventListener("change",()=>P=!0);const ae=()=>{const e=Math.max(1,m.clientWidth),i=Math.max(1,m.clientHeight);N.setSize(e,i,!1),te.resolution.set(e,i),S.aspect=e/i;const a=Math.max(...xe.map(u=>u.distanceTo(T.target))),l=ct.degToRad(S.fov/2),_=Math.atan(Math.tan(l)*S.aspect);T.dist=a/Math.sin(Math.min(l,_))*.64,D.minDistance=.4,D.maxDistance=T.dist*3,!Tt&&!W&&(S.position.copy(Ie()),D.target.copy(T.target)),S.updateProjectionMatrix(),ot.uScale.value=i*N.getPixelRatio()*.012,P=!0},Ze=new ResizeObserver(ae);Ze.observe(m),ae();const Ct=new g,Ds=()=>{const e=S.position.distanceTo(D.target),i=Math.log(T.dist*.7),a=Math.log(T.dist*.12),l=ct.smoothstep(ct.clamp((i-Math.log(e))/(i-a),0,1),0,1),_=D.target.clone().project(S);let u=D.target.x,d=1/0;for(let p=0;p<h;p++){Ct.set(G(p,h)+tt,B+C/2,0).project(S);const y=Math.hypot((Ct.x-_.x)*S.aspect,Ct.y-_.y);Ct.z<1&&y<d&&(d=y,u=G(p,h)+tt)}const o=Gt*(.85+2.5*(1-l)),b=Math.sign(S.position.x-u)||1;Object.assign(U,{fx:u,fw:o,amt:l,side:b}),ot.uFocusX.value=u,ot.uFadeW.value=o,ot.uFadeAmt.value=l,ot.uCamSide.value=b,ot.uNear.value=ct.clamp(Math.sqrt(T.dist/e),1,2.2),Ae.forEach(p=>{const y=(p.position.x-u)/o,K=1-l*(1-Math.exp(-y*y));p.material.opacity=.05*K,p.userData.edges.opacity=.7*K}),qt.forEach((p,y)=>{const K=(G(y,h)+tt-u)/o;p.opacity=.8*(1-.8*l*(1-Math.exp(-K*K)))}),Jt.opacity=.9*(1-.8*l)},bt=new g,Ke=new g,As=()=>{const e=m.clientWidth,i=m.clientHeight,a=ht().isolateLayer,l=h>12?Math.ceil(h/12):1;for(let _=0;_<h;_++){const u=G(_,h)+tt;bt.set(u,cs,-pt).project(S),Ke.set(u,cs+.2,-pt).project(S);const d=Math.abs(Ke.y-bt.y)*i*.5,o=bt.z<1&&(a===null?_%l===0||_===h-1:a===_),b=Lt[_];b.hidden=!o,o&&(b.style.fontSize=`${Math.max(10,Math.min(16,d*.9))}px`,b.style.opacity=String(.45+.55*Ye(_)),b.style.transform=`translate(${(bt.x+1)/2*e}px, ${(1-bt.y)/2*i}px) translate(-10%, -100%)`)}};let re=0,le=0,he=performance.now();const Ve=()=>{ne=requestAnimationFrame(Ve);const e=performance.now();if(W){const a=Math.min(1,(e-W.t0)/W.ms),l=a*a*(3-2*a);D.target.lerpVectors(W.from,W.to,l),S.position.lerpVectors(W.p0,W.p1,l),a===1&&(W=null),P=!0}if(it<1){it=Math.min(1,(e-Me)/900);const a=it<.5?4*it**3:1-(-2*it+2)**3/2;for(let l=0;l<j.length;l++)j[l]=Xt[l]+(Zt[l]-Xt[l])*a;k.attributes.position.needsUpdate=!0,it===1&&(k.computeBoundingSphere(),zt()),P=!0}if(D.update()&&(P=!0),!P){he=e;return}P=!1,Ds(),N.render(X,S),As();const i=e-he;he=e,i>0&&i<200&&(le++,i>28&&re++,le>=60&&(re>40&&et>1&&(et=Math.max(1,et-.5),N.setPixelRatio(et),ae()),le=0,re=0))};return Ve(),()=>{cancelAnimationFrame(ne),f.current=null,Ss(),Ze.disconnect(),D.dispose(),Q.geometry.dispose(),nt.forEach(e=>e.dispose()),st.removeEventListener("webglcontextlost",Xe),N.dispose(),N.forceContextLoss(),st.remove(),Lt.forEach(e=>e.remove())}},[s,t]),Et.jsxs("div",{className:"map",ref:r,children:[Et.jsx("div",{className:"layer-labels",ref:c}),Et.jsx("button",{className:"map-home icon-btn",onClick:()=>{var m;return(m=f.current)==null?void 0:m.home()},"aria-label":"Reset the 3D view",title:"Reset the view",children:Et.jsx("svg",{viewBox:"0 0 20 20",width:"15",height:"15","aria-hidden":"true",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round",children:Et.jsx("path",{d:"M3.5 9.5 10 4l6.5 5.5M5.5 8v7.5h9V8"})})})]})}export{_i as MapView};
