import { el, f } from '../../lib/ink.ts';
import { line, form, box, text, hit } from './drawing.ts';
import { createWorker } from './people.ts';
import { rgb, hex, mix, oval, ease } from './kit.ts';

export function createFactory(parent,defs,onStory){
 const g=el('g',{},parent),glazing=[],accents=[],staff=[];
 const glass=(x,y,w,h,warm=false)=>{const n=el('rect',{x,y,width:w,height:h,fill:'#e5eff0',stroke:'currentColor','stroke-width':.6},g);glazing.push({n,warm});return n;};
 const accent=(n,c)=>{n.classList.remove('pp');accents.push([n,c]);return n;};
 // Low, clean volumes around a pedestrian courtyard. Cutaway rooms are illustrative.
 form(g,box(31,191,185,151));form(g,box(225,156,455,186));form(g,box(689,211,238,131));
 form(g,box(26,186,195,8));form(g,box(220,150,465,8));form(g,box(684,205,248,8));
 for(let y=202;y<340;y+=16){line(g,`M32 ${y}H214`,.25);line(g,`M690 ${y+9}H925`,.25);}
 // Roof equipment, screened ventilation rather than stylized smokestacks.
 [264,316,368,420,472,524,576,628].forEach(x=>{form(g,box(x,132,35,18),.6);for(let k=0;k<4;k++)line(g,`M${x+4} ${136+k*3}h27`,.3);});
 text(g,450,181,'SAMSUNG DISPLAY',14,'middle',650);
 text(g,451,196,'스마트폰용 OLED 패널',8.5);
 line(g,'M244 204H662',.5);
 text(g,123,216,'하루가 시작되는 곳',10);
 text(g,807,233,'동료와 나누는 한 끼',10);
 // Entry lobby, lockers and changing area.
 glass(44,231,158,98);
 [0,1,2,3].forEach(i=>{const x=53+i*22;form(g,box(x,244,20,69),.5);line(g,`M${x+14} 266v10M${x+5} 250h10M${x+5} 253h10M${x+5} 256h10`,.35);text(g,x+10,306,`${i+1}`,5);});
 form(g,box(151,242,40,86));line(g,'M171 243V328M157 274V285M184 274V285',.6);
 text(g,171,253,'SECOM',6);line(g,'M149 331H196',1);
 text(g,124,226,'출입 확인 · 사원증 체크',6.5);
 const access=accent(form(g,box(177,280,4,8),.5),'#779d9d');
 const security=el('g',{'data-room':'security'},g);
 staff.push(createWorker(security,{x:141,y:322,scale:.5,mode:'station',colour:'#738393',activity:'badge',onStory:()=>onStory('SECOM 출입 확인. 사원증을 리더기에 대고 통과합니다.')}));
 form(g,box(132,305,22,16),.6);text(g,143,314,'SECOM',4.3);
 // Three sealed equipment enclosures. No literal proprietary process layout.
 glass(239,214,426,112);
 [240,382,524,664].forEach(x=>line(g,`M${x} 214V326`,.7));
 for(let x=254;x<658;x+=28){form(g,box(x,217,20,3),.35);}
 text(g,310,237,'엔지니어 사무실',8.5);text(g,452,237,'패널 검사',8.5);text(g,594,237,'품질 확인',8.5);
 // Engineers seated at two computers, with keyboards, chairs and task screens.
 const office=el('g',{'data-room':'office'},g);
 staff.push(createWorker(office,{x:260,y:319,dir:1,scale:.5,mode:'seat',activity:'computer',colour:'#6d8794',phase:.1,onStory}));
 staff.push(createWorker(office,{x:357,y:319,dir:-1,scale:.5,mode:'seat',activity:'computer',colour:'#a78b77',hair:'tied',phase:.6,onStory}));
 [280,326].forEach(x=>{
  form(g,box(x,285,26,4),.6);line(g,`M${x+2} 289V317M${x+24} 289V317`,.6);
  accent(form(g,box(x+4,259,20,18),.6),'#486a7d');line(g,`M${x+14} 277v7M${x+8} 284h12`,.5);
  line(g,`M${x+4} 286h17m-15 -1v2m3 -2v2m3 -2v2m3 -2v2`,.35);
 });
 const trace=line(g,'M286 270h5l2 -4 3 5h5M332 268h4l3 4 3 -7h4',.5);trace.setAttribute('stroke','#b6dfdf');
 // Inspection chamber with panel carriers inside, behind glass.
 form(g,box(401,251,78,66));
 const chamber=accent(form(g,box(408,257,64,39),.5),'#dbe8eb');
 line(g,'M408 298H472M415 303H465M411 310H469',.45);
 const panelGroup=el('g',{},g),panels=[];
 for(let i=0;i<4;i++){
  const panel=el('g',{},panelGroup);form(panel,'M0 0H10Q12 0 12 2V22Q12 24 10 24H0Q-2 24 -2 22V2Q-2 0 0 0Z',.5);
  const pixel=el('rect',{x:0,y:2,width:10,height:19,rx:1,fill:'#7b92aa'},panel);
  panels.push({g:panel,pixel,index:i});
 }
 const scan=line(g,'M410 258V295',.8);scan.setAttribute('stroke','#679fa8');
 const scanBadge=text(g,440,312,'OLED',6);
 // Quality monitor: a colour field animates on a phone-sized panel.
 form(g,box(552,277,84,38));line(g,'M559 315V323M630 315V323',.8);
 form(g,'M578 249H603Q606 249 606 252V278H575V252Q575 249 578 249Z');
 const screen=el('rect',{x:579,y:253,width:23,height:21,rx:1,fill:'#8598b4'},g);
 const stripe=el('rect',{x:579,y:253,width:8,height:21,fill:'#c19cae'},g);
 line(g,'M589 279V286M579 287H601',.7);
 [560,571,582,593,604,615,626].forEach(x=>line(g,`M${x} 293v11`,.4));
 // Seated colleagues behind the cafeteria window.
 glass(700,245,213,83,true);
 [700,770,843,913].forEach(x=>line(g,`M${x} 245V328`,.6));
 const roomPeople=el('g',{},g);
 staff.push(createWorker(roomPeople,{x:727,y:321,dir:1,scale:.48,mode:'seat',activity:'lunch',colour:'#b18b75',hair:'tied',phase:.1,onStory}));
 staff.push(createWorker(roomPeople,{x:786,y:321,dir:-1,scale:.48,mode:'seat',activity:'lunch',colour:'#718b8e',phase:.6,onStory}));
 form(g,box(739,299,44,4),.7);line(g,'M744 303V321M777 303V321',.8);
 [749,772].forEach(x=>{form(g,oval(x,297,7,2),.5);form(g,box(x-3,290,5,6),.4);});
 form(g,box(864,268,32,47),.7);accent(form(g,box(868,274,24,16),.5),'#657985');text(g,880,285,'COFFEE',4.5);line(g,'M873 296H886M875 297V303H883V297',.5);
 // A pair of indoor cleanroom operators, enclosed by the production hall.
 const operators=el('g',{},g);
 
 staff.push(createWorker(operators,{x:523,y:321,scale:.57,dir:1,clean:true,mode:'station',phase:2,onStory}));
 // Floor seams and the façade mullions bring the cutaway back into one building.
 line(g,'M239 326H665M239 330H665M31 342H927',1);
 [225,678].forEach(x=>form(g,box(x,205,5,136)));
 let inspect=-1,coffee=-1,door=-1;
 hit(g,400,246,80,72,'OLED 패널 검사 보기',()=>{inspect=0;onStory('한 장씩 확인하고, 이상이 있으면 동료와 함께 살펴봅니다.');});
 hit(g,864,267,34,50,'커피 한 잔의 휴식',()=>{coffee=0;onStory('잠깐의 커피 시간. 일 이야기에서 오늘 저녁 이야기로.');});
 hit(g,151,242,40,87,'출입구 열기',()=>{door=0;onStory('사원증을 확인하고, 하루의 일을 준비합니다.');});
 const steam=line(g,'',.5);
 // A pickup counter beside the dining-room entrance.
 form(g,box(898,300,17,20),.6);text(g,906,297,'TAKE OUT',4);
 [901,907,912].forEach(x=>form(g,`M${x-2} 300v-5h4v5Z`,.4));
 const doorLeaf=form(g,box(173,257,16,68),.6);
 line(g,'M184 280V288',.8);
 return {g,staff,panels,checkAccess(){door=0;},pokeInspect(){inspect=0;},draw(t,dt,pal,tau){
  glazing.forEach(({n,warm})=>n.setAttribute('fill',rgb(mix(pal.paper,hex(warm?'#edcb93':'#b1d0dc'),warm?.16+pal.lamp*.5:.17+pal.lamp*.36))));
  accents.forEach(([n,c])=>n.setAttribute('fill',rgb(mix(hex(c),mix(hex(c),[15,24,43],.5),pal.inkT*.7))));
  if(inspect>=0){inspect+=dt;if(inspect>4)inspect=-1;}if(coffee>=0){coffee+=dt;if(coffee>4)coffee=-1;}if(door>=0){door+=dt;if(door>2)door=-1;}
  const open=door<0?0:Math.sin(Math.PI*door/2);doorLeaf.setAttribute('transform',`translate(${f(open*15)} 0)`);
  access.setAttribute('fill',door>=0?'#a7c0a0':'#779d9d');
  const panelColours=['#788fb4','#b98d9f','#79aaa6','#d6b67e'];
  panels.forEach(p=>{const px=411+((t*3+p.index*15)%48);p.g.setAttribute('transform',`translate(${f(px)} 263)scale(.7)`);p.pixel.setAttribute('fill',panelColours[(p.index+Math.floor(t/3))%4]);});
  scan.setAttribute('transform',`translate(${f((t*(inspect>=0?24:9))%59)} 0)`);
  scanBadge.textContent=inspect>=0?'확인 중':'OLED';
  stripe.setAttribute('x',579+(Math.sin(t*.8)+1)*7.5);screen.setAttribute('fill',panelColours[Math.floor(t/4)%4]);
  trace.setAttribute('opacity',.7+Math.sin(t*2)*.25);
  steam.setAttribute('d',coffee>=0?`M878 297q${f(Math.sin(t*4)*2)} -4 0 -7m4 6q${f(Math.cos(t*4)*2)} -4 0 -7`:'');
  staff.forEach(p=>p.draw(t,dt,pal,tau));
  // Cafeteria activity varies with the illustrative time of day.
  const h=tau*24;roomPeople.setAttribute('opacity',h>=7&&h<9||h>=11&&h<14||h>=18&&h<20?1:.8);
 }};
}

export function createCourtyard(parent,onStory){
 const g=el('g',{'data-scene':'autumn-garden',transform:'translate(0 70)'},parent),foliage=[],fallen=[];
 form(g,box(-10,297,980,243),0);
 const lawn=el('path',{d:'M0 308Q230 296 480 311T960 307V425Q700 417 480 428T0 421Z',fill:'#e5e2c9'},g);
 const path=el('path',{d:'M0 431Q240 419 480 434T960 429V482Q740 472 480 484T0 479Z',fill:'#eee2ce'},g);
 line(g,'M0 431Q240 419 480 434T960 429M0 479Q240 490 480 484T960 482',.45);
 const leafD='M0 -5L1 -2L4 -4L3 -1L6 0L2 2L2 4L0 3L-2 4L-2 2L-6 0L-3 -1L-4 -4L-1 -2Z';
 const colours=['#bb5b43','#d18a40','#cba84e','#ad5948','#d59c49','#bf7044'];
 const trees=[{x:36,y:403,r:38},{x:182,y:410,r:43},{x:421,y:409,r:38},{x:554,y:407,r:38},{x:789,y:410,r:43},{x:933,y:402,r:38}];
 trees.forEach(({x,y,r},i)=>{
  const trunk=el('path',{d:`M${x-4} ${y}Q${x-2} ${y-42} ${x-3} ${y-85}L${x+3} ${y-85}Q${x+2} ${y-42} ${x+5} ${y}Z`,fill:'#9c8065',stroke:'currentColor','stroke-width':.8},g);
  line(g,`M${x} ${y-38}L${x-20} ${y-81}M${x+1} ${y-47}L${x+22} ${y-91}M${x} ${y-12}l1 -31`,.7);
  const crown=el('g',{'data-tree':'maple'},g),paint=[];
  [[-19,-85,r*.72],[21,-88,r*.76],[0,-111,r*.82],[0,-76,r*.72]].forEach(([dx,dy,rr],k)=>{
   const pts=Array.from({length:33},(_,j)=>{const a=j*Math.PI/16,rad=rr*(j%2?.91:1.08);return `${f(x+dx+Math.cos(a)*rad)},${f(y+dy+Math.sin(a)*rad*.82)}`;});
   const n=el('path',{d:'M'+pts.join('L')+'Z',fill:colours[(i+k)%colours.length],stroke:'currentColor','stroke-width':.6},crown);paint.push({n,c:colours[(i+k)%colours.length]});
   for(let j=0;j<5;j++){
    const lx=x+dx+Math.cos(j*2.4)*rr*.55,ly=y+dy+Math.sin(j*2.4)*rr*.45;
    line(crown,`M${f(lx)} ${f(ly+5)}l0 -8m0 5l-4 -3m4 3l4 -3`,.3);
   }
  });
  let shake=0;hit(crown,x-r-24,y-145,r*2+48,106,'단풍나무를 흔들어 낙엽 보기',()=>{shake=1.8;onStory('붉고 노란 잎이 바람에 내려앉습니다. 산책길의 이야기도 천천히 이어집니다.');});
  foliage.push({g:crown,paint,i,step(dt){shake=Math.max(0,shake-dt);return shake;}});
  for(let j=0;j<10;j++){
   const lx=x+Math.sin(j*4.3+i)*48,ly=y+8+((j*7)%27);
   const n=el('path',{d:leafD,transform:`translate(${f(lx)} ${ly})rotate(${j*37})scale(.55)`,fill:colours[(i+j)%6],stroke:'currentColor','stroke-width':.35},g);fallen.push({n,c:colours[(i+j)%6]});
  }
 });
 // Two broad benches; opposing seated pairs share food and conversation.
 [245,631].forEach(x=>{
  const seat=el('path',{d:box(x,378,111,5),fill:'#a78562',stroke:'currentColor','stroke-width':.8},g);
  [357,365].forEach(y=>{const slat=el('path',{d:box(x,y,111,5),fill:'#ba9871',stroke:'currentColor','stroke-width':.65},g);fallen.push({n:slat,c:'#ba9871'});});
  line(g,`M${x+7} 359V400M${x+104} 359V400M${x+5} 383l-3 19M${x+106} 383l3 19`,1.1);
  fallen.push({n:seat,c:'#a78562'});
  // A shared lunch box, thermos and spare paper coffee cup between friends.
  form(g,box(x+45,371,20,7),.6);line(g,`M${x+54} 372v5`,.4);
  const rice=el('path',{d:oval(x+50,373,3,1.4),fill:'#f6f0dc',stroke:'currentColor','stroke-width':.3},g);
  el('path',{d:oval(x+60,374,2.4,1.3),fill:'#9c7951'},g);
  form(g,`M${x+69} 365h6v12h-6Z M${x+69} 364h6v2h-6Z`,.5);
  form(g,`M${x+36} 371h6l-1 7h-4Z`,.5);
 });
 const flutter=el('g',{'pointer-events':'none'},g),leaves=[];
 for(let i=0;i<24;i++){const tr=trees[i%trees.length],n=el('path',{d:leafD,fill:colours[i%6],stroke:'currentColor','stroke-width':.45},flutter);leaves.push({n,x:tr.x,y:tr.y-100,phase:i/24,c:colours[i%6]});}
 let clock=0;
 return {g,trees,draw(t,dt,pal,wind){
  clock+=dt;
  const tint=c=>rgb(mix(hex(c),mix(hex(c),[23,28,42],.65),pal.inkT*.8));
  lawn.setAttribute('fill',rgb(mix(pal.paper,hex('#b8b88b'),.18)));path.setAttribute('fill',rgb(mix(pal.paper,hex('#c5a57c'),.19)));
  foliage.forEach(l=>{l.g.setAttribute('transform',`translate(${f(Math.sin(t*1.2+l.i)*(wind*.8+l.step(dt)*2))} 0)`);l.paint.forEach(p=>p.n.setAttribute('fill',tint(p.c)));});
  fallen.forEach(p=>p.n.setAttribute('fill',tint(p.c)));
  leaves.forEach((l,i)=>{const u=(clock/13+l.phase)%1,x=l.x+Math.sin(u*8+i)*18+wind*u*20,y=l.y+u*123;
   l.n.setAttribute('transform',`translate(${f(x)} ${f(y)})rotate(${f(u*250+i*32)})scale(${f(.45+Math.abs(Math.cos(u*8))*.3)} .65)`);l.n.setAttribute('fill',tint(l.c));l.n.setAttribute('opacity',Math.min(1,u*8,(1-u)*9));});
 }};
}

export function createBus(parent,onStory){
 const g=el('g',{'data-object':'bus'},parent);
 const hull=form(g,'M0 16Q0 4 12 4H143Q153 4 156 17L162 47Q162 52 155 52H3Q0 52 0 47Z',1);
 const stripe=el('path',{d:'M1 39H159V45H1Z',fill:'#6d919c'},g);
 const glass=el('path',{d:'M10 12H137Q145 12 148 20L151 32H10Z',fill:'#b6d0d8',stroke:'currentColor','stroke-width':.6},g);
 [31,55,79,103,126].forEach(x=>line(g,`M${x} 12V32`,.55));
 [20,43,67,91,116].forEach(x=>{form(g,oval(x,23,3.2,3.6),.5);line(g,`M${x-4} 32v-3q4 -5 8 0v3`,.6);});
 form(g,box(131,34,18,17),.5);line(g,'M140 34V51',.5);
 const door=form(g,box(141,34,8,17),.4);
 text(g,72,40,'통근버스',6);
 const wheels=[29,129].map(x=>{const w=el('g',{},g);form(w,oval(x,51,8,8),1);form(w,oval(x,51,3,3),.7);return w;});
 const frontLight=el('rect',{x:154,y:40,width:5,height:4,rx:1,fill:'#e6cf94'},g);
 let position=-180,wait=0,manual=false;
 hit(g,-3,3,168,60,'통근버스가 잠시 정차합니다',()=>{wait=5;manual=true;onStory('같은 버스에 올라 각자의 집으로 돌아갑니다.');});
 return {g,parked:false,get x(){return position;},poke(){wait=5;},draw(t,dt,pal,tau){
  const local=t%38;
  if(!manual){if(local<10)position=-180+local*26;else if(local<16)position=80;else position=80+(local-16)*47;}
  if(wait>0){wait-=dt;if(wait<=0)manual=false;}
  if(this.parked)position=80;
  g.setAttribute('transform',`translate(${f(position)} 563)scale(.65)`);
  const stopped=this.parked||local>=10&&local<16||wait>0;
  door.setAttribute('transform',`translate(${stopped?7:0} 0)`);
  hull.classList.remove('pp');hull.setAttribute('fill',rgb(mix(pal.paper,hex('#bbc9cd'),.22)));
  glass.setAttribute('fill',rgb(mix(hex('#b6d0d8'),hex('#d0b785'),pal.lamp*.7)));
  frontLight.setAttribute('fill',pal.lamp>.5?'#ffdf9c':'#e6cf94');
 }};
}
