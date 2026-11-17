import { el, inkDefs, run } from '../../lib/ink.ts';
import { pointerWind } from '../../lib/motion.ts';
import { rgb } from './kit.ts';
import { createSky, palette } from './sky.ts';
import { createFactory, createCourtyard, createBus } from './factory.ts';
import { createWorker } from './people.ts';
import { route, type Stop } from './routines.ts';
import { form,box,line } from './drawing.ts';
const q=new URLSearchParams(location.search);
const svg=el('svg',{viewBox:'0 0 960 640',role:'img','aria-label':'OLED 노동자의 하루. 단풍나무 앞에서 도시락과 커피를 즐기는 동료들, 산책하는 남녀 다섯 명, 아침 출입 확인과 식당 대기줄, 사무실의 엔지니어와 저녁 통근버스 대기줄.'});
const ink=inkDefs(svg,'oled');document.querySelector('#scene').append(svg);
const layer=(parent:Element=svg,attrs={})=>el('g',attrs,parent);
const skyLayer=layer(),world=layer(svg,{filter:ink.filter});
const floor=layer(world);form(floor,box(0,293,960,347),0);line(floor,'M0 302H960M0 561H960',.5);
const building=layer(world,{transform:'translate(57 -10)scale(.88)'}),queueLayer=layer(world),ground=layer(world),seatLayer=layer(world),walkLayer=layer(world),busLayer=layer(world);
world.insertBefore(queueLayer,seatLayer);
const card=document.querySelector<HTMLElement>('.card'),clock=document.querySelector('#clock'),caption=document.querySelector('#caption'),stageN=document.querySelector('#stage');
let tau=q.has('tau')?+q.get('tau'):q.has('start')?+q.get('start'):12.2/24;
// Start with the requested autumn lunch scene; motion continues while the clock is held.
let frozen=!q.has('start'),scrub=false,storyTimer=0,sceneTime=0;
const day=Math.max(10,+(q.get('day')||240)),play=document.querySelector<HTMLButtonElement>('#play');
const stages=[
 {at:7.5/24,key:'arrival',name:'출근',copy:'통근버스 → SECOM 사원증 확인 → 식당·테이크아웃 → 사무실. 줄을 따라 아침이 시작됩니다.'},
 {at:10/24,key:'work',name:'작업',copy:'모니터 앞의 엔지니어, 패널을 점검하는 동료. 각자의 자리에서 오늘의 일을 이어갑니다.'},
 {at:12.2/24,key:'lunch',name:'점심',copy:'도시락을 펼치고 커피 한 모금. 다섯 동료는 붉고 노란 단풍 사이를 함께 걷습니다.'},
 {at:18/24,key:'home',name:'퇴근',copy:'사무실에서 길게 이어지는 퇴근 줄. 사원증을 확인하고 통근버스를 기다립니다.'},
 {at:22/24,key:'night',name:'야간',copy:'공원에 밤이 내려앉고, 불 켜진 사무실과 작업실에는 또 다른 하루가 흐릅니다.'}
];
function stage(){const h=tau*24;return h<6||h>=20?stages[4]:h<9?stages[0]:h<11.5?stages[1]:h<14?stages[2]:h<17?stages[1]:stages[3];}
function tell(message){caption.textContent=message;storyTimer=6;}
const sky=createSky(svg,skyLayer,ink.defs,{onScrub(v){if(v!==null){tau=v;scrub=true;frozen=true;storyTimer=0;sync();}else scrub=false;},onShoot:()=>palette(tau).night>.4});
const factory=createFactory(building,ink.defs,tell),yard=createCourtyard(ground,tell),bus=createBus(busLayer,tell),wind=pointerWind(svg);
const colours=['#947457','#6e8792','#b46f56','#73856b','#9b7e94'];
const genders=['woman','man','woman','man','woman'];
// Exactly five persistent walkers: no traffic spawning in the lunchtime group.
const people=Array.from({length:5},(_,i)=>createWorker(walkLayer,{x:240+i*39,y:536+(i%2)*5,dir:1,scale:.7,external:true,backpack:false,activity:'walk',gender:genders[i],hair:genders[i]==='woman'?'tied':'short',colour:colours[i],phase:i*.17,onStory:()=>tell('다섯 동료가 속도를 맞추며 산책합니다. 오늘 점심 이야기, 주말 이야기.')}));
const resting=[
 {x:268,dir:1,colour:'#ad795e',hair:'tied',activity:'lunch'},
 {x:335,dir:-1,colour:'#6c8592',hair:'short',activity:'coffee'},
 {x:655,dir:1,colour:'#7e8e71',hair:'short',activity:'lunch'},
 {x:721,dir:-1,colour:'#a67e93',hair:'tied',activity:'coffee'}
].map((opts,i)=>createWorker(seatLayer,{...opts,y:480,scale:.7,mode:'seat',phase:i*.22,onStory:()=>tell('도시락 반찬을 나누고, 커피를 마시며 한참 수다를 떱니다.')}));
// The security checkpoint is the entrance/exit of the left-hand building.
const morning=route([
 {x:174,y:595,activity:'walk'},{x:108,y:595},{x:108,y:315},{x:205,y:315},
 {x:205,y:286,wait:1.4,activity:'badge'},{x:228,y:286},{x:228,y:315,activity:'walk'},
 {x:850,y:315},{x:850,y:284,wait:1.8,activity:'takeout'},
 {x:850,y:331},{x:340,y:331},{x:340,y:287,wait:.8}
],27);
const commuters=Array.from({length:24},(_,i)=>{
 const p=createWorker(queueLayer,{x:0,y:315,scale:.48,external:true,backpack:true,activity:'walk',colour:colours[i%5],hair:i%2?'tied':'short',phase:i*.11,onStory:()=>tell(stage().key==='arrival'?'사원증을 확인한 뒤 식당에서 아침을 챙겨 사무실로 갑니다.':'오늘의 일을 마치고 통근버스 줄에서 동료와 인사를 나눕니다.')});
 const home=route([{x:340,y:287,activity:'walk'},{x:340,y:315},{x:205,y:315},{x:205,y:286,wait:1.3,activity:'badge'},{x:205,y:315,activity:'walk'},{x:108,y:315},{x:108,y:552},{x:195+i*23,y:552,wait:40},{x:174,y:589,wait:.5}],26);
 return {p,home};
});
function sync(){play.textContent=frozen?'시간 흐르기':'시간 멈추기';play.setAttribute('aria-pressed',String(!frozen));document.querySelectorAll<HTMLButtonElement>('[data-stage]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.stage===stage().key)));}
function setTau(v){tau=((v%1)+1)%1;frozen=true;storyTimer=0;sceneTime=0;sync();}
document.querySelectorAll<HTMLButtonElement>('[data-stage]').forEach(b=>b.addEventListener('click',()=>{const s=stages.find(s=>s.key===b.dataset.stage);setTau(s.at);}));
play.addEventListener('click',()=>{frozen=!frozen;sync();});
sync();let lastStage='';
run((t,dt)=>{
 dt=dt||1/60;if(!frozen&&!scrub)tau=(tau+dt/day)%1;
 const current=stage();if(lastStage!==current.key){lastStage=current.key;stageN.textContent=current.name;sceneTime=0;sync();}sceneTime+=dt;
 const pal=palette(tau);svg.style.color=rgb(pal.ink);svg.style.setProperty('--paper',rgb(pal.paper));card.style.setProperty('--ink',rgb(pal.ink));
 const breeze=wind.step(t);sky.draw(tau,t,dt,pal,breeze);factory.draw(t,dt,pal,tau);yard.draw(t,dt,pal,breeze);
 const lunch=current.key==='lunch',commute=current.key==='arrival'||current.key==='home';
 walkLayer.style.display=lunch?'':'none';seatLayer.style.display=lunch?'':'none';queueLayer.style.display=commute?'':'none';busLayer.style.display=commute?'':'none';
 bus.parked=true;bus.draw(t,dt,pal,tau);
 // Five people turn together at the ends of the path; their number never changes.
 const trip=sceneTime%70,dir=trip<35?1:-1,base=trip<35?180+trip*14:670-(trip-35)*14;
 people.forEach((p,i)=>{p.x=base+(i-2)*34;p.dir=dir;p.walking=true;p.draw(t,dt,pal,tau);});
 resting.forEach(p=>p.draw(t,dt,pal,tau));
 if(commute){
  commuters.forEach(({p,home},i)=>{
   // A long breakfast line is already arriving; evening includes a visible bus queue.
   const state=current.key==='arrival'?morning.sample(sceneTime+14+i*2.05):home.sample(sceneTime+(i<12?i*1.4:home.duration-48));
   p.x=state.x;p.y=state.y;if(state.dir)p.dir=state.dir;p.walking=state.walking;p.activity=state.activity;
   if(state.activity==='badge'&&!state.walking)factory.checkAccess();p.draw(t,dt,pal,tau);
  });
 }
 const minutes=Math.round(tau*24*60)%1440,h=Math.floor(minutes/60),m=minutes%60;clock.textContent=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
 storyTimer=Math.max(0,storyTimer-dt);if(!storyTimer)caption.textContent=current.copy;
});
(window as any).__oled={people,factory,bus,resting,commuters,yard,setTau,get tau(){return tau;},get frozen(){return frozen;}};
