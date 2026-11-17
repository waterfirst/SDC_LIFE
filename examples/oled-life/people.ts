import { el, limb, shoe, shape, blot, pen, f } from '../../lib/ink.ts';
import { gait } from '../../lib/gait.ts';
import { spring } from '../../lib/motion.ts';
import { box, form, line, hit } from './drawing.ts';
import { oval, rgb, hex, mix, ease, clamp } from './kit.ts';

export function createWorker(parent,{x,y,dir=1,scale=.55,clean=false,mode='walk',colour='#638792',hair='short',phase=0,external=false,backpack=true,activity='coffee',gender='unspecified',onStory=(s)=>{}}){
 const g=el('g',{'data-person':clean?'cleanroom':'worker','data-gender':gender},parent);
 const legs=[limb(g,clean?7:5.6,1.1),limb(g,clean?7:5.6,1.1)],feet=[shape(g,.8),shape(g,.8)];
 const body=el('g',{},g),torso=form(body,'',1.1);
 const arms=[limb(body,clean?5.7:4.5,1),limb(body,clean?5.7:4.5,1)];
 const head=form(body,oval(40,32,5.2,6),1.1),hood=form(body,''),hairN=blot(body),seams=pen(body,.65),mask=form(body,'',.6);
 const bag=el('g',{},body),bagBody=form(bag,'M29 47Q18 45 17 55L16 70Q21 74 29 71Z',.9);
 line(bag,'M27 48Q18 50 20 66M17 61H26',.5);
 const lanyard=pen(body,.55),badge=el('rect',{x:38,y:53,width:6,height:8,rx:1,fill:'#79a6bc',stroke:'currentColor','stroke-width':.5},body);
 const phone=form(body,box(55,50,5.5,9),.6),cup=form(body,'M53 57H60L59 65H54Z M60 58Q65 58 60 63',.6);
 const meal=el('g',{},body);form(meal,box(46,72,20,7),.6);line(meal,'M55 73v5',.4);form(meal,oval(51,74,3,1.5),.4);
 const chopsticks=pen(body,.55);
 const accessCard=form(body,box(54,51,7,10),.5);
 const takeaway=el('g',{},body);form(takeaway,'M49 65H63L65 84H48Z M52 65Q52 55 60 65',.6);line(takeaway,'M50 77H63',.4);
 const speech=el('g',{},body);form(speech,'M47 18Q50 10 66 13Q73 15 70 23Q63 28 53 24L48 28L50 23Z',.5);[55,60,65].forEach(x=>el('circle',{cx:x,cy:19,r:.6,fill:'currentColor'},speech));
 const tablet=form(body,'M50 53L66 49L68 61L52 65Z',.6);
 if(clean){
  hood.setAttribute('d','M33 38Q29 24 37 23Q49 20 49 34L46 43H33Z');
  // Hood and face opening, mask, covered wrists and zipped coverall.
  form(body,'M35 29Q41 25 46 30L46 36H35Z',.7);mask.setAttribute('d','M35 33L46 33L45 39L36 39Z');
  bag.style.display='none';badge.style.display='none';
 }else{
  hairN.setAttribute('d',hair==='tied'?'M34 32Q32 23 40 24Q47 23 46 29Q40 26 34 32Z '+oval(32,33,3,3):'M34 32Q33 23 40 24Q48 23 46 31L42 27L36 29Z');
 }
 let reaction=-1,stop=0,travel=phase,lastX=null,lastY=null;
 const walk=gait({kind:'walk',stride:24,period:1.05}),sway=spring(30,6),bagSway=spring(22,5);
 if(mode!=='walk'||!backpack)bag.style.display='none';
 const target=hit(g,13,17,59,105,clean?'패널을 점검하는 동료':'노동자에게 인사하기',()=>poke());
 target.setAttribute('aria-label',clean?'패널을 점검하는 동료':'잠깐 안부를 나누기');target.querySelector('title').textContent=target.getAttribute('aria-label');
 function poke(){reaction=0;onStory(clean?'작은 화면 하나에도 여러 사람의 확인이 쌓입니다.':mode==='seat'?'밥 한 끼, 동료와 나누는 짧은 안부.':'잠깐 멈춰 가족의 메시지를 확인합니다.');}
 return {g,x,y,dir,mode,clean,activity,walking:true,done:false,poke,get reacting(){return reaction>=0;},
  draw(t,dt,pal,tau){
   if(reaction>=0){reaction+=dt;if(reaction>4.2)reaction=-1;}
   const active=reaction>=0;
   stop=clamp(stop+(active?1:-1)*dt*3,0,1);
   const go=mode==='walk'&&this.walking?1-ease(stop):0;
   const travelled=lastX===null?walk.speed*scale*dt:Math.hypot(this.x-lastX,this.y-lastY);
   travel+=(external?travelled/(walk.speed*scale*walk.period):dt/walk.period)*go;lastX=this.x;lastY=this.y;if(!external)this.x+=this.dir*walk.speed*scale*dt*go;
   this.done=mode==='walk'&&(this.x< -55||this.x>1015);
   g.setAttribute('transform',`translate(${f(this.x)} ${f(this.y)})scale(${this.dir*scale} ${scale})translate(-40 -120)`);
   const pose=walk.pose(travel,go),hip=pose.hip;
   if(mode==='seat'){
    legs[0].draw([[39,75],[57,80],[57,112]]);legs[1].draw([[37,75],[50,83],[49,114]]);
    shoe(feet[0],[57,113],0);shoe(feet[1],[49,115],0);
   }else pose.feet.forEach((ft,i)=>{legs[i].draw([hip,ft.knee,ft.ankle]);shoe(feet[i],ft.ankle,ft.pitch);});
   const b=mode==='seat'?2:hip[1]-73;
   body.setAttribute('transform',`translate(0 ${f(b)})`);
   const a=sway.step(Math.sin(travel*Math.PI*2)*7*go,dt);
   const bagA=bagSway.step(a*.5,dt);bag.setAttribute('transform',`rotate(${f(bagA)} 27 47)`);
   torso.setAttribute('d','M35 41Q29 43 29 49L30 74Q40 77 50 74L50 49Q47 42 44 41Z');
   seams.setAttribute('d',clean?'M40 41V75M33 48L33 59M47 48V59M31 70H49':'M35 41L40 47L44 41M40 47V74M30 69H49');
   lanyard.setAttribute('d',clean?'':'M35 42L41 55L46 42');
   const working=clean||mode==='station';
   const chatting=mode==='seat'&&this.activity!=='computer';
   const eating=chatting&&this.activity==='lunch';
   const beat=(t+phase*8)%9;const sip=ease(clamp((beat-2)/1.2,0,1))*(1-ease(clamp((beat-4.5)/1.2,0,1)));
   accessCard.style.display=this.activity==='badge'?'':'none';
   meal.style.display=eating?'':'none';takeaway.style.display=this.activity==='takeout'?'':'none';
   chopsticks.style.display=eating?'':'none';speech.style.display=chatting&&beat>6?'':'none';
   const gesture=active?ease(Math.min(1,reaction*3))*ease(Math.min(1,(4.2-reaction)*3)):0;
   const taskCycle=(Math.sin(t*1.4+phase)*.5+.5);
   arms[0].draw([[32,45],[28-a*.4,57],[31-a,70]]);
   if(working){
    arms[1].draw([[47,45],[55,52],[57+taskCycle*7,54+gesture*2]]);
    arms[0].draw([[32,46],[40,60],[53,61]]);
   }else if(mode==='seat'&&this.activity==='computer'){
    arms[1].draw([[47,45],[53,59],[65,60+Math.sin(t*7+phase)]]);
    arms[0].draw([[32,46],[44,60],[60,60+Math.cos(t*8+phase)]]);
   }else if(chatting){
    arms[1].draw([[47,45],[53-sip*4,58-sip*8],[56-sip*10,59-sip*21]]);
    arms[0].draw([[32,46],[40,67],[50,eating?73:63]]);
    chopsticks.setAttribute('d',`M${f(56-sip*10)} ${f(59-sip*21)}l7 10m-6 -11l7 10`);
   }else if(this.activity==='badge'){arms[1].draw([[47,45],[52,52],[57,55]]);}
   else if(this.activity==='takeout'){arms[1].draw([[47,45],[52,58],[55,65]]);}
   else arms[1].draw([[47,45],[51+a*.4,57-gesture*6],[49+a+(8-a)*gesture,71-gesture*18]]);
   phone.style.display=active&&!working&&!chatting&&this.activity!=='badge'?'':'none';cup.style.display=chatting&&!eating?'':'none';tablet.style.display=working?'':'none';
   cup.setAttribute('transform',`translate(${f(-sip*10)} ${f(-sip*21)})`);
   const tint=c=>rgb(mix(hex(c),mix(hex(c),[15,24,43],.55),pal.inkT*.65));
   torso.classList.toggle('pp',clean);if(!clean)torso.style.fill=tint(colour);
   [arms[0],arms[1]].forEach(a=>{const n=a.g.querySelector('path');if(!clean){n.classList.remove('pp');n.setAttribute('fill',tint(colour));}});
   legs.forEach(l=>{const n=l.g.querySelector('path');if(!clean){n.classList.remove('pp');n.setAttribute('fill',tint('#606a79'));}});
   bagBody.classList.remove('pp');bagBody.setAttribute('fill',tint('#a98d70'));
  },remove(){g.remove();}
 };
}
