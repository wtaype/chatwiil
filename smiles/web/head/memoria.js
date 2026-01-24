let history=[];const MAX=20,toStr=v=>typeof v==='string'?v:v==null?'':String(v);
export const save=m=>{history.push({...m,content:toStr(m.content),timestamp:Date.now()});if(history.length>MAX)history=history.slice(-MAX)};
export const get=(n=5)=>history.slice(-n);
export const hasContext=()=>history.length>0;
export const findRelated=k=>history.filter(x=>x.content.toLowerCase().includes(k.toLowerCase()));
export const clear=()=>{history=[]};
export const generate=u=>{const msg=toStr(u).toLowerCase(),recent=get(5);if(/anterior|antes|dijiste|mencionaste|lo que|eso|aquello/.test(msg)){const last=[...recent].reverse().find(m=>m.role==='assistant');if(last){const p=last.content.slice(0,150);return`🧠 **Recordando la conversación...**\n\nHace un momento te mencioné:\n"${p}${last.content.length>150?'...':''}"\n\n¿Quieres que profundice en algo específico?`}}if(/qué hablamos|de qué hablamos|qué dijimos/.test(msg)&&recent.length){const topics=recent.filter(m=>m.role==='user').slice(-3).map(m=>m.content.slice(0,50)).join('\n• ');return`🧠 **Temas de nuestra conversación reciente:**\n\n• ${topics}\n\n¿Quieres retomar alguno de estos temas?`;}return null};