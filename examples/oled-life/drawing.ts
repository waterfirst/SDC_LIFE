import { el, pen, shape } from '../../lib/ink.ts';
export const line=(g,d,w=.8)=>{const n=pen(g,w);n.setAttribute('d',d);return n;};
export const form=(g,d,w=.8)=>{const n=shape(g,w);n.setAttribute('d',d);return n;};
export const box=(x,y,w,h)=>`M${x} ${y}h${w}v${h}h${-w}Z`;
export function text(g,x,y,value,size=10,anchor='middle',weight=500){
 const n=el('text',{x,y,fill:'currentColor','font-size':size,'font-family':'"Noto Sans CJK KR","Malgun Gothic",sans-serif','text-anchor':anchor,'font-weight':weight},g);n.textContent=value;return n;
}
export function hit(g,x,y,w,h,title,fn){
 const n=el('rect',{x,y,width:w,height:h,fill:'transparent',tabindex:0,role:'button','aria-label':title,style:'cursor:pointer'},g);
 el('title',{},n).textContent=title;
 const activate=e=>{e.stopPropagation();fn();};n.addEventListener('pointerdown',activate);
 n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate(e);}});return n;
}
