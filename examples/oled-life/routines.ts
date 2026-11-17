// Illustrative routines, not a real site's shift plan or access procedure.
export type Stop = {x:number;y:number;wait?:number;activity?:string;story?:string};
export function route(stops:Stop[],speed=24){
 const spans=[];let duration=0,activity='walk';
 for(let i=0;i<stops.length;i++){
  const end=stops[i];
  if(i){const start=stops[i-1],seconds=Math.hypot(end.x-start.x,end.y-start.y)/speed;spans.push({start,end,from:duration,to:duration+seconds,walking:true,activity});duration+=seconds;}
  if(end.activity)activity=end.activity;
  if(end.wait){spans.push({start:end,end,from:duration,to:duration+end.wait,walking:false,activity});duration+=end.wait;}
 }
 return {duration,sample(time){const t=((time%duration)+duration)%duration;const span=spans.find(s=>t<s.to)||spans[spans.length-1];const u=(t-span.from)/(span.to-span.from);return {x:span.start.x+(span.end.x-span.start.x)*u,y:span.start.y+(span.end.y-span.start.y)*u,walking:span.walking,activity:span.activity,dir:Math.sign(span.end.x-span.start.x)};}};
}
