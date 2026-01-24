import{j as t}from"./vendor-gzd0YkcT.js";import{v as D}from"./wii-Caqe1ZG-.js";import"./main-764KBGSH.js";import"./main-w22p4_06.js";const S=20,y="chatwiil_history";let r=[];const k=(s,e)=>{r.push({role:s,content:e,timestamp:Date.now()}),r.length>S&&(r=r.slice(-S)),q()},j=()=>{r=[],localStorage.removeItem(y)},q=()=>{try{localStorage.setItem(y,JSON.stringify(r))}catch(s){console.warn("⚠️ Error guardando historial:",s)}},P=()=>{try{const s=localStorage.getItem(y);s&&(r=JSON.parse(s),console.log(`📚 Historial cargado: ${r.length} mensajes`))}catch(s){console.warn("⚠️ Error cargando historial:",s),r=[]}},W=s=>{if(typeof s!="string")return"";const e=document.createElement("div");return e.textContent=s,e.innerHTML.replace(/\n/g,"<br>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>")},A=async s=>{k("user",s);const e=s.toLowerCase().trim();let a="";return/\d+\s*[\+\-\*\/]\s*\d+/.test(e)?a=L(s):/^(hola|hi|hey|buenas|que tal)/i.test(e)?a="¡Hola, amigo! 👋😊 ¿En qué puedo ayudarte hoy? 💚":/(triste|deprimido|mal|solo|ansiedad)/i.test(e)?a="💙 Lamento que te sientas así. Recuerda que no estás solo. ¿Quieres hablar de lo que te preocupa? Estoy aquí para escucharte. 🤗":/(gracias|thank|agradezco)/i.test(e)?a="¡De nada! 🙏💚 Siempre es un placer ayudarte. ¿Algo más en lo que pueda asistirte?":/(genial|maximo|excelente|increible|crack|numero|number)/i.test(e)?a="¡Muchas gracias! 🙏💚 Pero el verdadero crack eres tú 🏆":/(te amo|te quiero|love you)/i.test(e)?a="¡Eres un amor! 💙 Muchas gracias, tú también eres espectacular 🌟✨":/(biblia|verso|dios|jesus|fe)/i.test(e)?a=`✨ **"Porque de tal manera amó Dios al mundo..."** (Juan 3:16)

La fe es un camino personal. ¿Te gustaría explorar alguna enseñanza en particular?`:e.length<=2?a="🤔 Hmm, no estoy seguro de cómo responder a eso. ¿Podrías reformular tu pregunta?":a="💭 Interesante pregunta. ¿Podrías darme más detalles para ayudarte mejor?",a+=O(),k("assistant",a),W(a)},L=s=>{try{const e=s.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);if(!e)return"❌ No pude entender la operación matemática";const[,a,o,m]=e,c=parseFloat(a),i=parseFloat(m);let n;switch(o){case"+":n=c+i;break;case"-":n=c-i;break;case"*":n=c*i;break;case"/":n=i!==0?c/i:"Error: División por cero";break;default:n="Operación no válida"}return`¡Súper! ⭐ Te va a encantar esto ${{"+":"➕","-":"➖","*":"✖️","/":"➗"}[o]||o}

**Operación:**

${c} ${o} ${i} = **${n}** ✅ 🎯`}catch{return"❌ Hubo un error al calcular. Verifica la operación."}},O=()=>{const s=[`

🕊️ *Espero haberte ayudado.* ✨`,`

😊 *Que tengas un día maravilloso.* 🌈`,`

🔥 *¡Tú puedes con todo!* 💯`,`

💚 *Siempre a tu servicio.* 🙏`,""];return s[Math.floor(Math.random()*s.length)]},Q=()=>`
<div class="miia">
  <div class="miia_messages" id="miiaMessages">
    <div class="miia_empty">
      <div class="miia_welcome_icon">
        <img src="/smile.avif" alt="ChatWiil" class="welcome_avatar">
      </div>
      <h2 class="miia_welcome_title">¡Hola! Soy ChatWiil 🕊️</h2>
      <p class="miia_welcome_text">
        Tu asistente espiritual inteligente. Puedo ayudarte con <strong>matemáticas</strong>, 
        darte <strong>consejos de vida</strong>, compartir <strong>reflexiones espirituales</strong> 
        y mucho más. Háblame con confianza, estoy aquí para ti.
      </p>
      <div class="miia_suggestions">
        <div class="suggestion_card" data-prompt="Me siento triste, ¿puedes ayudarme?">
          <i class="fas fa-heart"></i><span>Apoyo emocional</span>
        </div>
        <div class="suggestion_card" data-prompt="¿Puedes resolver esta ecuación: 2x + 5 = 15?">
          <i class="fas fa-calculator"></i><span>Matemáticas</span>
        </div>
        <div class="suggestion_card" data-prompt="Dame un verso bíblico de esperanza">
          <i class="fas fa-book-bible"></i><span>Reflexiones</span>
        </div>
        <div class="suggestion_card" data-prompt="¿Cómo puedo mejorar mi vida?">
          <i class="fas fa-lightbulb"></i><span>Consejos de vida</span>
        </div>
      </div>
    </div>
  </div>
  <div class="miia_input_area">
    <div class="miia_input_wrapper">
      <textarea class="miia_input" id="miiaInput" placeholder="Escribe tu pregunta... 💚" rows="1"></textarea>
      <button class="miia_send" id="miiaSend" disabled>
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
    <div class="miia_input_info">
      <span><i class="fas fa-info-circle"></i> Presiona <kbd>Enter</kbd> para enviar, <kbd>Shift + Enter</kbd> para nueva línea</span>
    </div>
  </div>
</div>`;let u=!1,z=0;const l=()=>({$messages:t("#miiaMessages"),$input:t("#miiaInput"),$sendBtn:t("#miiaSend")}),p=(s=!1)=>{const{$messages:e}=l();if(!e.length)return;const a=e[0];s?a.scrollTo({top:a.scrollHeight,behavior:"smooth"}):a.scrollTop=a.scrollHeight},C=(s,e)=>{const{$messages:a}=l(),o=new Date().toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"}),i=t(`
    <div class="miia_message ${e}" data-time="${o}">
      <div class="message_avatar">${e==="user"?'<i class="fas fa-user-circle"></i>':'<img src="/smile.avif" alt="ChatWiil" class="message_avatar_img">'}</div>
      <div class="message_content">
        <div class="message_header">
          <span class="message_name">${e==="user"?"Tú":"ChatWiil"}</span>
          <span class="message_time">${o}</span>
        </div>
        <div class="message_text"></div>
      </div>
    </div>
  `),n=i.find(".message_text");e==="user"?n.text(s):n.html(s),a.append(i),p()},_=s=>{const{$messages:e}=l();t(".miia_message.typing").remove(),s&&(e.append(`
      <div class="miia_message ai typing">
        <div class="message_avatar"><img src="/smile.avif" alt="ChatWiil" class="message_avatar_img"></div>
        <div class="message_content">
          <div class="message_text"><div class="typing_dots"><span></span><span></span><span></span></div></div>
        </div>
      </div>
    `),p())},R=(s,e)=>{const{$messages:a}=l(),o=new Date().toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"}),m=`typewriter_${Date.now()}_${++z}`,c=t(`
    <div class="miia_message ai" data-time="${o}">
      <div class="message_avatar"><img src="/smile.avif" alt="ChatWiil" class="message_avatar_img"></div>
      <div class="message_content">
        <div class="message_header">
          <span class="message_name">ChatWiil</span>
          <span class="message_time">${o}</span>
        </div>
        <div class="message_text" id="${m}"></div>
      </div>
    </div>
  `);a.append(c),p();const i=t(`#${m}`),n=t("<div>").html(s),b=n.text(),g=n.html();let v=0,$=0;const M=15,I=100,w=()=>{if(v<b.length){let x="",E=0,f=!1;for(let h=0;h<g.length;h++){const d=g[h];if(d==="<"&&(f=!0),x+=d,d===">"){f=!1;continue}if(!f&&d!=="<"&&d!==">"&&(E++,E>=v+1))break}i.html(x),v++;const T=Date.now();T-$>I&&(p(),$=T),setTimeout(w,M)}else i.html(g).removeAttr("id"),p(!0),e&&e()};w()},H=async()=>{const{$input:s}=l(),e=s.val().trim();if(!(!e||u)){t(".miia_empty").fadeOut(200,function(){t(this).remove()}),C(e,"user"),s.val("").css("height","auto").trigger("input"),u=!0,_(!0);try{const a=await A(e);if(_(!1),!a||typeof a!="string")throw new Error("Respuesta inválida");R(a,()=>u=!1)}catch(a){console.error("❌ Error procesando mensaje:",a),_(!1),C("😔 Disculpa, tuve un problema procesando tu mensaje. Por favor, intenta de nuevo. 💚","ai"),u=!1}}},K=()=>{const{$input:s,$sendBtn:e}=l();s.on("input",function(){this.style.height="auto",this.style.height=Math.min(this.scrollHeight,120)+"px";const a=t(this).val().trim().length>0;e.prop("disabled",!a).toggleClass("active",a)}),s.on("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),H())}),e.on("click",H),t(document).on("click",".suggestion_card",function(){s.val(t(this).data("prompt")).css("height","auto").trigger("input").focus()}),P(),console.log(`✅ ChatWiil IA ${D} iniciado`)},Y=()=>{t("#miiaInput, #miiaSend").off(),t(document).off("click",".suggestion_card"),j(),console.log("🧹 ChatWiil IA limpiado")};export{Y as cleanup,K as init,Q as render};
