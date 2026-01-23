import{j as i}from"./vendor-gzd0YkcT.js";import{v as j}from"./wii-bo-APDHp.js";import"./main-BVltifIJ.js";import"./main-CVp8J7Rv.js";const w=()=>`
  <div class="miia">
    <!-- ========== CHAT MESSAGES ========== -->
    <div class="miia_messages" id="miiaMessages">
      <!-- Empty State Inicial -->
      <div class="miia_empty">
        <div class="miia_welcome_icon">
          <i class="fas fa-dove"></i>
        </div>
        <h2 class="miia_welcome_title">¡Hola! Soy Mediawii 🕊️</h2>
        <p class="miia_welcome_text">
          Tu asistente espiritual inteligente. Puedo ayudarte con <strong>matemáticas</strong>, 
          darte <strong>consejos de vida</strong>, compartir <strong>reflexiones espirituales</strong> 
          y mucho más. Háblame con confianza, estoy aquí para ti.
        </p>
        
        <div class="miia_suggestions">
          <div class="suggestion_card" data-prompt="Me siento triste, ¿puedes ayudarme?">
            <i class="fas fa-heart"></i>
            <span>Apoyo emocional</span>
          </div>
          <div class="suggestion_card" data-prompt="¿Puedes resolver esta ecuación: 2x + 5 = 15?">
            <i class="fas fa-calculator"></i>
            <span>Matemáticas</span>
          </div>
          <div class="suggestion_card" data-prompt="Dame un verso bíblico de esperanza">
            <i class="fas fa-book-bible"></i>
            <span>Reflexiones</span>
          </div>
          <div class="suggestion_card" data-prompt="¿Cómo puedo mejorar mi vida?">
            <i class="fas fa-lightbulb"></i>
            <span>Consejos de vida</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== INPUT AREA ========== -->
    <div class="miia_input_area">
      <div class="miia_input_wrapper">
        <textarea 
          class="miia_input" 
          id="miiaInput"
          placeholder="Escribe tu pregunta... 💚"
          rows="1"
        ></textarea>
        <button class="miia_send" id="miiaSend" disabled>
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
      <div class="miia_input_info">
        <span><i class="fas fa-info-circle"></i> Presiona <kbd>Enter</kbd> para enviar, <kbd>Shift + Enter</kbd> para nueva línea</span>
      </div>
    </div>
  </div>
`,H=()=>{const r=i("#miiaMessages"),o=i("#miiaInput"),p=i("#miiaSend");let g=!1;o.on("input",function(){this.style.height="auto";const a=Math.min(this.scrollHeight,120);this.style.height=a+"px";const e=i(this).val().trim().length>0;p.prop("disabled",!e),p.toggleClass("active",e)});const f=()=>{const a=o.val().trim();!a||g||(i(".miia_empty").fadeOut(300,function(){i(this).remove()}),y(a,"user"),o.val("").css("height","auto").trigger("input"),g=!0,setTimeout(()=>{b(),setTimeout(()=>{_();const e=T(a);x(e,"ai",()=>{q(a),g=!1})},1500+Math.random()*1e3)},500))};o.on("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),f())}),p.on("click",f),i(document).on("click",".suggestion_card",function(){const a=i(this).data("prompt");o.val(a).css("height","auto").trigger("input"),o.focus()});function y(a,e){const s=new Date().toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"}),d=`
      <div class="miia_message ${e}" data-time="${s}">
        <div class="message_avatar"><i class="fas fa-user-circle"></i></div>
        <div class="message_content">
          <div class="message_header">
            <span class="message_name">Tú</span>
            <span class="message_time">${s}</span>
          </div>
          <div class="message_text">${a}</div>
        </div>
      </div>
    `;r.append(d),m()}function b(){r.append(`
      <div class="miia_message ai typing">
        <div class="message_avatar"><i class="fas fa-dove"></i></div>
        <div class="message_content">
          <div class="message_text">
            <div class="typing_dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>
    `),m()}function _(){i(".miia_message.typing").remove()}function x(a,l,s){const c=new Date().toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"}),d=`
      <div class="miia_message ${l}" data-time="${c}">
        <div class="message_avatar"><i class="fas fa-dove"></i></div>
        <div class="message_content">
          <div class="message_header">
            <span class="message_name">Mediawii</span>
            <span class="message_time">${c}</span>
          </div>
          <div class="message_text" id="typewriter"></div>
        </div>
      </div>
    `;r.append(d);const t=i("#typewriter");let u=0;const v=25;function l(){u<a.length?(t.append(a.charAt(u)),u++,m(),setTimeout(l,v)):(t.removeAttr("id"),s&&s())}l()}function q(a){const e=a.toLowerCase();let s=[];if(e.includes("triste")||e.includes("mal")||e.includes("deprimido")?s=[{icon:"fa-music",text:"¿Quieres un audio relajante?",prompt:"Dame un audio que me relaje"},{icon:"fa-book-bible",text:"Ver versos de consuelo",prompt:"Muéstrame versos de consuelo"},{icon:"fa-heart",text:"Hablar sobre mis sentimientos",prompt:"Quiero hablar sobre cómo me siento"}]:e.includes("matemática")||e.includes("ecuación")||e.includes("calcular")?s=[{icon:"fa-calculator",text:"Otra ecuación",prompt:"Resuelve: 3x - 7 = 11"},{icon:"fa-square-root-alt",text:"Raíces cuadradas",prompt:"¿Cómo calcular raíces cuadradas?"},{icon:"fa-chart-line",text:"Geometría",prompt:"Ayúdame con geometría"}]:e.includes("biblia")||e.includes("verso")||e.includes("dios")?s=[{icon:"fa-cross",text:"Padre Nuestro",prompt:"Recítame el Padre Nuestro"},{icon:"fa-book-open",text:"Más versículos",prompt:"Dame otro versículo inspirador"},{icon:"fa-pray",text:"Oración del día",prompt:"Comparte una oración para hoy"}]:e.includes("solo")||e.includes("soledad")?s=[{icon:"fa-users",text:"Consejos de conexión",prompt:"¿Cómo hacer amigos?"},{icon:"fa-heart",text:"Amor propio",prompt:"Ayúdame con el amor propio"},{icon:"fa-smile",text:"Actividades positivas",prompt:"¿Qué actividades puedo hacer solo?"}]:s=[{icon:"fa-calculator",text:"Matemáticas",prompt:"Ayúdame con matemáticas"},{icon:"fa-book-bible",text:"Reflexiones",prompt:"Dame una reflexión espiritual"},{icon:"fa-lightbulb",text:"Consejos",prompt:"Dame un consejo de vida"},{icon:"fa-music",text:"Audios",prompt:"Quiero escuchar audios"}],s.length>0){const c=`
        <div class="miia_contextual_suggestions">
          <p class="suggestions_title">💡 Tal vez también te interese:</p>
          <div class="suggestions_grid">
            ${s.map(n=>`
              <div class="suggestion_card_small" data-prompt="${n.prompt}">
                <i class="fas ${n.icon}"></i>
                <span>${n.text}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `;r.append(c),m()}}i(document).on("click",".suggestion_card_small",function(){const a=i(this).data("prompt");o.val(a).css("height","auto").trigger("input"),o.focus(),i(".miia_contextual_suggestions").fadeOut(200,function(){i(this).remove()})});function m(){r.animate({scrollTop:r[0].scrollHeight},300)}function T(a){const e=a.toLowerCase();if(e.includes("triste")||e.includes("mal")||e.includes("deprimido")||e.includes("depresión"))return"💚 Te comprendo, amigo. Todos pasamos por momentos difíciles y está bien sentirse así. Recuerda que después de la tormenta siempre sale el sol. ¿Quieres hablar sobre lo que te preocupa? Estoy aquí para escucharte sin juzgarte. Eres más fuerte de lo que crees. 🌈";if(e.includes("solo")||e.includes("soledad")||e.includes("nadie"))return"🤗 Entiendo perfectamente ese sentimiento de soledad. Puede ser muy abrumador, pero quiero que sepas que nunca estás realmente solo. Dios siempre está contigo, y yo también estoy aquí. Cada día es una nueva oportunidad para conectar con otros y contigo mismo. ¿Te gustaría que conversemos un poco? 💙";if(e.includes("ansiedad")||e.includes("ansioso")||e.includes("preocupado")||e.includes("miedo"))return'🌟 La ansiedad puede ser difícil, pero tiene solución. Prueba respirar profundo: inhala 4 segundos, mantén 4, exhala 4. Repítelo. Recuerda Filipenses 4:6-7: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios". Todo estará bien, un paso a la vez. 🙏';if(e.includes("gracias")||e.includes("thank"))return"😊 ¡De nada, amigo! Es un placer poder ayudarte. Recuerda que siempre estaré aquí cuando me necesites. Que tengas un hermoso día lleno de bendiciones. 🌟";if(e.includes("matemática")||e.includes("ecuación")||e.includes("resolver")||e.includes("calcular")){if(e.includes("2x")||e.includes("3x")||e.includes("x")){const s=e.match(/(\d+)x\s*([+-])\s*(\d+)\s*=\s*(\d+)/);if(s){const[c,n,d,t,u]=s,v=parseInt(n),l=d==="+"?parseInt(t):-parseInt(t),h=parseInt(u)-l,$=h/v;return`📊 ¡Claro! Veo que tienes una ecuación. Si es **${n}x ${d} ${t} = ${u}**, la resolución sería:

1. Restamos/Sumamos ${t} de ambos lados: **${n}x = ${h}**
2. Dividimos entre ${n}: **x = ${$}**

¿Tienes otra ecuación que resolver? 🧮`}return`📊 ¡Claro! Veo que tienes una ecuación. Si es **2x + 5 = 15**, la resolución sería:

1. Restamos 5 de ambos lados: **2x = 10**
2. Dividimos entre 2: **x = 5**

¿Tienes otra ecuación que resolver? 🧮`}return"📐 ¡Por supuesto! Estoy aquí para ayudarte con matemáticas. Desde operaciones básicas hasta ecuaciones complejas, cálculo, geometría y más. Escríbeme el problema específico y te guiaré paso a paso. ¿Qué necesitas resolver? 🔢"}return e.includes("biblia")||e.includes("verso")||e.includes("versículo")||e.includes("dios")?`✨ **Juan 3:16** - "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."

Este es uno de los versos más poderosos. La fe es un camino personal y hermoso. ¿Te gustaría explorar alguna enseñanza en particular? También tengo audios en quechua si te interesa. 📖🙏`:e.includes("esperanza")||e.includes("fuerza")||e.includes("ánimo")?`🌟 **Romanos 15:13** - "Y el Dios de esperanza os llene de todo gozo y paz en el creer, para que abundéis en esperanza por el poder del Espíritu Santo."

Nunca pierdas la esperanza, amigo. Las dificultades son temporales, pero la fe es eterna. Eres más fuerte de lo que imaginas. ¿Hay algo más en lo que pueda ayudarte? 💪✨`:e.includes("padre nuestro")||e.includes("oración")||e.includes("rezar")?`🙏 **Padre Nuestro**

Padre nuestro que estás en el cielo,
Santificado sea tu nombre.
Venga tu reino.
Hágase tu voluntad en la tierra como en el cielo.
Danos hoy nuestro pan de cada día.
Perdona nuestras ofensas,
Como también nosotros perdonamos a los que nos ofenden.
No nos dejes caer en tentación
Y líbranos del mal. Amén. ✝️`:e.includes("mejorar")||e.includes("cambiar")||e.includes("consejo")||e.includes("ayuda")?`💡 Para mejorar tu vida, te recomiendo:

1. **Gratitud diaria**: Agradece 3 cosas cada mañana
2. **Metas claras**: Define qué quieres lograr
3. **Cuidado personal**: Duerme bien, come sano, ejercítate
4. **Aprendizaje constante**: Lee, estudia, crece
5. **Fe activa**: Ora y confía en Dios

Recuerda: "Yo puedo hacer todas las cosas en Cristo que me fortalece" (Filipenses 4:13). ¿En qué área específica quieres mejorar? 🌱`:e.includes("motivación")||e.includes("motivar")||e.includes("inspire")?"🔥 ¡Tú puedes lograr TODO lo que te propongas! Cada día es una nueva oportunidad para ser mejor. No importa cuántas veces caigas, lo importante es levantarse una vez más. Eres único, valioso y capaz de grandes cosas. La mejor versión de ti mismo está esperando. ¡Vamos, sigue adelante! 💪✨":e.includes("hola")||e.includes("hey")||e.includes("buenas")||e.includes("hi")?"👋 ¡Hola! ¿Cómo estás hoy? Me alegra mucho que estés aquí. Soy Mediawii, tu asistente espiritual. Puedo ayudarte con matemáticas, consejos de vida, reflexiones bíblicas o simplemente conversar. ¿En qué puedo ayudarte? 😊":e.includes("bien")||e.includes("feliz")||e.includes("contento")?"😄 ¡Qué alegría saber que estás bien! Es hermoso cuando podemos disfrutar de los buenos momentos. Recuerda agradecer por cada bendición. ¿Hay algo en lo que pueda ayudarte hoy? 🌟":e.includes("adiós")||e.includes("chao")||e.includes("bye")||e.includes("hasta")?"👋 ¡Hasta pronto, amigo! Que Dios te bendiga y te acompañe siempre. Aquí estaré cuando me necesites. ¡Cuídate mucho! 🙏💚":"😊 Gracias por compartir eso conmigo. Entiendo lo que me dices. Cada problema tiene solución, y juntos podemos encontrarla. Recuerda que nunca estás solo en este camino. ¿Hay algo específico en lo que pueda ayudarte hoy? Estoy aquí para ti, ya sea con matemáticas, consejos, reflexiones espirituales o simplemente para conversar. 💚"}console.log(`✅ Chatwiil IA ${j} iniciado`)},z=()=>{i("#miiaInput, #miiaSend").off(),i(document).off("click",".suggestion_card, .suggestion_card_small"),console.log("🧹 Chatwiil IA limpiado")};export{z as cleanup,H as init,w as render};
