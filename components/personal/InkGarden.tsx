"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const places = [
  {name:"光影台",en:"THE FRAME",position:[-3.3,0.45,2.0],section:"practice",note:"在画面与节奏之间，寻找表达。"},
  {name:"问道阁",en:"THE STUDY",position:[2.4,0.45,-1.4],section:"classics",note:"以修心为本，以明理为要。"},
  {name:"听雨亭",en:"THE STILLNESS",position:[2.3,0.45,2.5],section:"life",note:"留一点空白，给自己的内心。"},
];
type Props = {selected:number|null; onSelect:(index:number)=>void; paused:boolean; resetKey:number};
export default function InkGarden({selected,onSelect,paused,resetKey}:Props){
 const host = useRef<HTMLDivElement>(null);
 const labels = useRef<(HTMLButtonElement|null)[]>([]);
 const state = useRef({selected,paused,onSelect});state.current={selected,paused,onSelect};
 const reset = useRef<(()=>void)|null>(null);
 const [ready,setReady]=useState(false);const [failed,setFailed]=useState(false);
 useEffect(()=>{reset.current?.()},[resetKey]);
 useEffect(()=>{
  if(!host.current)return;
  const container=host.current;
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:"low-power"});}catch{setFailed(true);return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7));
  renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.domElement.tabIndex=0;renderer.domElement.setAttribute("aria-label","可拖动的国风小园。使用方向键或 W A S D 漫步，也可点击地标按钮。");
  container.insertBefore(renderer.domElement,container.firstChild);
  const scene=new THREE.Scene();
  const camera=new THREE.OrthographicCamera(-9,9,7,-7,.1,100);
  const initial=new THREE.Vector3(12,13,16);camera.position.copy(initial);
  const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,.45,0);controls.enableDamping=true;controls.dampingFactor=.06;controls.enablePan=false;controls.enableZoom=false;controls.minPolarAngle=.55;controls.maxPolarAngle=1.22;controls.rotateSpeed=.6;controls.autoRotate=false;controls.update();renderer.domElement.style.touchAction="pan-y";
  reset.current=()=>{camera.position.copy(initial);controls.target.set(0,.45,0);controls.update();};
  scene.add(new THREE.AmbientLight(0xfff3d8,2.1));scene.add(new THREE.HemisphereLight(0xf4efdf,0x8b9776,1.2));
  const sun=new THREE.DirectionalLight(0xfff6df,3);sun.position.set(-7,13,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-10;sun.shadow.camera.right=10;sun.shadow.camera.top=10;sun.shadow.camera.bottom=-10;sun.shadow.normalBias=.04;scene.add(sun);
  const world=new THREE.Group();scene.add(world);
  const material=(color:number,extra:THREE.MeshStandardMaterialParameters={})=>new THREE.MeshStandardMaterial({color,roughness:1,...extra});
  const ink=material(0x36473c),wood=material(0x654e38),sand=material(0xd6cfb7),moss=material(0xb7c4a0),red=material(0xa44431),stone=material(0x859278);
  function mesh(geo:THREE.BufferGeometry,mat:THREE.Material,parent:THREE.Object3D=world){const m=new THREE.Mesh(geo,mat);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
  function box(w:number,h:number,d:number,x:number,y:number,z:number,mat:THREE.Material,parent:THREE.Object3D=world){const m=mesh(new THREE.BoxGeometry(w,h,d),mat,parent);m.position.set(x,y,z);return m;}
  function cylinder(rt:number,rb:number,h:number,x:number,y:number,z:number,mat:THREE.Material,parent:THREE.Object3D=world,n=12){const m=mesh(new THREE.CylinderGeometry(rt,rb,h,n),mat,parent);m.position.set(x,y,z);return m;}
  const island=cylinder(6.2,5.8,.6,0,-.12,0,sand,world,64);island.scale.z=.76;
  const lower=cylinder(5.78,5.25,.7,0,-.65,0,material(0xb1b69b),world,48);lower.scale.z=.76;
  const grass=cylinder(6.08,6.08,.04,0,.2,0,moss,world,64);grass.scale.z=.755;
  // A warm stone courtyard and paths around the water.
  const courtyard=mesh(new THREE.CircleGeometry(2.15,48),sand);courtyard.rotation.x=-Math.PI/2;courtyard.position.set(2.1,.235,-1.0);
  const pondShape=new THREE.Shape();pondShape.moveTo(-4.5,-1.0);pondShape.bezierCurveTo(-4.4,-2.7,-1.8,-3.3,-.6,-2.5);pondShape.bezierCurveTo(1,-1.9,1.2,-.2,.1,.8);pondShape.bezierCurveTo(-1.1,1.7,-3.2,.9,-3.9,.3);pondShape.bezierCurveTo(-4.6,0,-4.9,-.4,-4.5,-1);
  const water=mesh(new THREE.ShapeGeometry(pondShape,32),material(0x719b91,{metalness:.15,roughness:.35}));water.rotation.x=-Math.PI/2;water.position.set(.1,.255,.1);
  const ripples:THREE.Mesh[]=[];
  for(let i=0;i<5;i++){const ripple=mesh(new THREE.RingGeometry(.25+i*.18,.255+i*.18,64),new THREE.MeshBasicMaterial({color:0xc9d9c1,transparent:true,opacity:.32,side:THREE.DoubleSide}));ripple.rotation.x=-Math.PI/2;ripple.position.set(-2.2,.267,1.3);ripples.push(ripple);}
  // Stepping stones lead visitors through the garden.
  for(let i=0;i<16;i++){const angle=-.6+i*.27;const x=Math.cos(angle)*4.65;const z=Math.sin(angle)*3.15;const s=cylinder(.26,.31,.12,x,.29,z,material(i%3===0?0xe1d9bf:0xd3ceb7),world,6);s.rotation.y=i*.7;}
  const bridge=new THREE.Group();world.add(bridge);bridge.position.set(-.8,.38,1.3);bridge.rotation.y=-.2;
  for(let i=0;i<11;i++){const x=(i-5)*.17;box(.155,.1,.83,x,Math.sin(i/10*Math.PI)*.27,0,wood,bridge);}
  for(const z of [-.43,.43]){for(let i=0;i<5;i++){const x=(i-2)*.39;box(.05,.45,.05,x,.25+Math.sin((i/4)*Math.PI)*.24,z,wood,bridge);}const rail=box(1.9,.05,.05,0,.65,z,wood,bridge);rail.rotation.z=0;}
  function roof(width:number,depth:number,y:number,parent:THREE.Object3D){const vertices:number[]=[];const indices:number[]=[];const n=14;for(let row=0;row<=n;row++)for(let col=0;col<=n;col++){const u=col/n*2-1,v=row/n*2-1;const r=Math.max(Math.abs(u),Math.abs(v));vertices.push(u*width/2,y+.62*(1-r)+.23*Math.pow(r,5),v*depth/2);}for(let j=0;j<n;j++)for(let i=0;i<n;i++){const a=j*(n+1)+i;indices.push(a,a+n+1,a+1,a+1,a+n+1,a+n+2);}const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();return mesh(g,material(0x36483e,{side:THREE.DoubleSide}),parent);}
  function pavilion(x:number,z:number,scale:number,open=false){const g=new THREE.Group();g.position.set(x,.3,z);g.scale.setScalar(scale);world.add(g);box(2.2,.18,1.9,0,.08,0,sand,g);for(const a of [-.78,.78])for(const b of [-.62,.62])cylinder(.055,.07,1.65,a,.94,b,wood,g);box(1.7,.09,1.45,0,1.72,0,wood,g);roof(2.8,2.45,1.7,g);box(1.6,.075,.075,0,2.31,0,ink,g);for(const a of [-1,1]){const fin=box(.37,.06,.07,a*.91,2.38,0,ink,g);fin.rotation.z=a*.3;}if(!open){box(1.62,1.3,.06,0,.86,-.65,material(0xe2dcc6),g);box(.6,.55,.065,0,1,-.69,wood,g);for(let i=0;i<4;i++)box(.025,.52,.02,-.23+i*.15,1,-.735,sand,g);box(.55,.09,.4,0,.48,0,wood,g);box(.35,.04,.23,0,.55,0,material(0xf3e6bc),g);}else{cylinder(.35,.35,.07,0,.6,0,wood,g);cylinder(.06,.09,.5,0,.32,0,wood,g);for(let i=0;i<3;i++){const a=i*Math.PI*2/3;cylinder(.18,.17,.32,Math.cos(a)*.58,.3,Math.sin(a)*.58,wood,g);}const cup=cylinder(.045,.035,.07,.1,.67,0,sand,g);cup.castShadow=false;}return g;}
  pavilion(2.45,-1.5,1.15);pavilion(2.8,2.3,.7,true);
  // A small open-air screen, a nod to editing and the moving image.
  const cinema=new THREE.Group();cinema.position.set(-3.5,.3,2);cinema.rotation.y=.25;world.add(cinema);
  for(const x of [-.75,.75])box(.065,1.65,.07,x,.82,0,ink,cinema);
  box(1.85,1.1,.1,0,1.15,0,ink,cinema);box(1.65,.89,.025,0,1.15,.065,material(0xdacda8),cinema);
  const filmSun=mesh(new THREE.CircleGeometry(.17,32),new THREE.MeshBasicMaterial({color:0xa64b31}),cinema);filmSun.position.set(.42,1.34,.085);
  const hill=mesh(new THREE.ConeGeometry(.55,.5,3),stone,cinema);hill.rotation.x=Math.PI/2;hill.rotation.z=.1;hill.scale.z=.05;hill.position.set(-.25,1,.08);
  const bench=box(1.1,.09,.36,0,.28,.9,wood,cinema);box(.07,.25,.28,-.4,.12,.9,wood,cinema);box(.07,.25,.28,.4,.12,.9,wood,cinema);
  // Sculptural mountain rocks and the dark green crowns of miniature pines.
  const pineCrowns:THREE.Mesh[]=[];
  function pine(x:number,z:number,h:number,seed:number){const trunk=cylinder(.07,.12,h,x,.3+h/2,z,wood);trunk.rotation.z=Math.sin(seed)*.09;for(let j=0;j<3;j++){const crown=mesh(new THREE.IcosahedronGeometry(.65,1),material(j===2?0x4f7053:0x627c56));crown.position.set(x+Math.sin(j*2+seed)*.25,.3+h*.7+j*.24,z+Math.cos(j+seed)*.15);crown.scale.set(1.1,.38,.8);pineCrowns.push(crown);}}
  pine(-4.3,-1.9,1.3,1);pine(-3.6,-2.9,1.7,2);pine(.8,-3.1,2.2,3);pine(4.5,-.5,1.5,4);pine(4.1,1.7,1.1,5);pine(-4.7,.1,1,6);
  for(let i=0;i<9;i++){const a=i*2.4;const x=-.7+Math.sin(a)*1.1,z=-2.8+Math.cos(a)*.5;const rock=mesh(new THREE.IcosahedronGeometry(.6+(i%3)*.17,0),material(i%2?0x758572:0x8e9d83));rock.position.set(x,.65+(i%3)*.22,z);rock.scale.set(.8,1.2+(i%4)*.32,.7);rock.rotation.set(.1,i*1.7,.1);}
  // A red lacquer seal, a modest landmark within the green landscape.
  const seal=box(.48,.55,.48,-1.3,.55,3.4,red);seal.rotation.y=.28;
  const book=box(.43,.04,.33,-1.3,.85,3.4,material(0xe8dcc1));book.rotation.y=.28;
  // The visitor is a tiny red figure, walking from place to place.
  const visitor=new THREE.Group();world.add(visitor);visitor.position.set(.2,.34,3.1);
  const coat=mesh(new THREE.ConeGeometry(.13,.43,8),red,visitor);coat.position.y=.26;
  const head=mesh(new THREE.SphereGeometry(.085,12,8),material(0xdab795),visitor);head.position.y=.54;
  const hat=mesh(new THREE.ConeGeometry(.17,.085,12),material(0xc8b484),visitor);hat.position.y=.64;
  const lantern=mesh(new THREE.SphereGeometry(.065,10,8),material(0xc88645),visitor);lantern.scale.y=1.3;lantern.position.set(.19,.25,0);
  let target=visitor.position.clone(),lastSelected:number|null=null;
  const keyHandler=(event:KeyboardEvent)=>{if(document.activeElement!==renderer.domElement)return;const key=event.key.toLowerCase();let dx=0,dz=0;if(key==="arrowleft"||key==="a")dx=-.3;if(key==="arrowright"||key==="d")dx=.3;if(key==="arrowup"||key==="w")dz=-.3;if(key==="arrowdown"||key==="s")dz=.3;if(dx||dz){event.preventDefault();target.x=Math.max(-4.5,Math.min(4.5,target.x+dx));target.z=Math.max(-3.1,Math.min(3.1,target.z+dz));}};
  renderer.domElement.addEventListener("keydown",keyHandler);
  let frame=0,previousTime=0,activeTime=0,visible=true;
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const updateSize=()=>{const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;renderer.setSize(w,h);const aspect=w/h;const scale=Math.max(7.4,7.2/aspect);camera.left=-scale*aspect;camera.right=scale*aspect;camera.top=scale;camera.bottom=-scale;camera.updateProjectionMatrix();};
  const sizeObserver=new ResizeObserver(updateSize);sizeObserver.observe(container);updateSize();
  const visibilityObserver=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{rootMargin:"120px"});visibilityObserver.observe(container);
  const labelVector=new THREE.Vector3();
  function animate(now:number){frame=requestAnimationFrame(animate);if(!visible){previousTime=now;return;}const dt=Math.min((now-previousTime)/1000,.04);previousTime=now;const {selected,paused}=state.current;if(!paused&&!reduced)activeTime+=dt;
   if(selected!==lastSelected){lastSelected=selected;if(selected!==null){const p=places[selected].position;target.set(p[0],.34,p[2]+.65);}}
   const distance=visitor.position.distanceTo(target);if(reduced)visitor.position.copy(target);else visitor.position.lerp(target,1-Math.exp(-dt*2));coat.rotation.z=distance>.08&&!paused?Math.sin(activeTime*12)*.1:0;
   for(let i=0;i<pineCrowns.length;i++)pineCrowns[i].rotation.z=Math.sin(activeTime*.7+i)*.025;
   for(let i=0;i<ripples.length;i++){const m=ripples[i].material as THREE.MeshBasicMaterial;m.opacity=.16+Math.sin(activeTime*1.2+i)*.08;}
   controls.update();renderer.render(scene,camera);
   for(let i=0;i<places.length;i++){const p=places[i].position;labelVector.set(p[0],i===1?3.45:i===0?2.25:2.1,p[2]).project(camera);const el=labels.current[i];if(el){el.style.left=`${(labelVector.x*.5+.5)*container.clientWidth}px`;el.style.top=`${(-labelVector.y*.5+.5)*container.clientHeight}px`;el.style.visibility="visible";}}
  }
  frame=requestAnimationFrame(animate);setReady(true);
  const contextLost=(event:Event)=>{event.preventDefault();setFailed(true);};renderer.domElement.addEventListener("webglcontextlost",contextLost);
  return()=>{cancelAnimationFrame(frame);sizeObserver.disconnect();visibilityObserver.disconnect();renderer.domElement.removeEventListener("keydown",keyHandler);renderer.domElement.removeEventListener("webglcontextlost",contextLost);controls.dispose();scene.traverse(obj=>{if(obj instanceof THREE.Mesh){obj.geometry.dispose();const mats=Array.isArray(obj.material)?obj.material:[obj.material];for(const m of mats)m.dispose();}});renderer.dispose();renderer.domElement.remove();reset.current=null;};
 },[]);
 return <div className={`ink-garden ${ready&&!failed?"is-ready":""}`} ref={host}>
  {!ready&&!failed&&<div className="garden-loading"><span>山水正在铺开</span><i/></div>}
  {failed&&<div className="garden-fallback"><span>一方山水，三重视角。</span><p>从下方选择一个入口，继续认识我。</p></div>}
  {places.map((p,i)=><button key={p.name} ref={el=>{labels.current[i]=el}} className={`map-pin ${selected===i?"chosen":""} ${failed?"fallback-pin":""}`} onClick={()=>onSelect(i)} aria-label={`探索${p.name}`} aria-pressed={selected===i}><span className="pin-dot"/><span>{p.name}<small>{p.en}</small></span><span className="pin-plus">+</span></button>)}
 </div>;
}


