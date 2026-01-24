import{j as f}from"./vendor-gzd0YkcT.js";import{v as Y}from"./wii-BTDWN25Z.js";import"./main-CGVbTXB5.js";import"./main-b6Xzzyl4.js";const _=["¡Genial! 🎯 Las matemáticas son divertidas","¡Excelente pregunta! 🌟 Aquí va la respuesta","¡Me encanta resolver esto! 🚀 Vamos allá","¡Qué emoción! 💡 Resolvamos esto juntos","¡Perfecto! 🎨 Las mates son arte","¡Súper! ⭐ Te va a encantar esto"],L=["¡Boom! 💥 Ahí está la respuesta","¡Tachán! ✨ Resuelto","¡Voilà! 🎭 Problema solucionado","¡Eureka! 🎉 Lo logramos","¡Bingo! 🎯 Ahí lo tienes","¡Fantástico! 🌟 Resultado final"],y=o=>o[Math.floor(Math.random()*o.length)],X=o=>{const e=o.toLowerCase(),a=e.match(/(\d+)x\s*([+-])\s*(\d+)\s*=\s*(\d+)/);if(a){const[n,r,t,i,c]=a,u=parseInt(r),m=t==="+"?parseInt(i):-parseInt(i),p=parseInt(c)-m,x=p/u;return`${y(_)} 😊<br><br>📊 <strong>Resolución paso a paso:</strong><br><br><strong>Ecuación:</strong> ${r}x ${t} ${i} = ${c}<br><br><strong>Paso 1:</strong> Despejar x moviendo el ${Math.abs(m)} 🔄<br>${r}x = ${c} ${t==="+"?"-":"+"} ${Math.abs(m)}<br>${r}x = ${p}<br><br><strong>Paso 2:</strong> Dividir ambos lados entre ${r} ➗<br>x = ${p} ÷ ${r}<br><br>${y(L)} 🎊<br><span style="color: #4caf50; font-size: 1.3em; font-weight: bold;">✅ x = ${x}</span><br><br><em>🔍 Verificación: ${r}(${x}) ${t} ${i} = ${u*x+m} = ${c} ✓</em> 😄`}if(/porcentaje|%/.test(e)){const n=e.match(/(\d+)%\s*de\s*(\d+)/);if(n){const[r,t,i]=n,c=parseInt(t)*parseInt(i)/100;return`${y(_)} 📈<br><br>📊 <strong>Cálculo de porcentaje:</strong><br><br>${t}% de ${i} = (${t} × ${i}) ÷ 100 🧮<br>= ${parseInt(t)*parseInt(i)} ÷ 100<br><br>${y(L)} 🎉<br><span style="color: #4caf50; font-size: 1.3em; font-weight: bold;">✅ Resultado: ${c}</span> 😊`}}const s=e.match(/(\d+)\s*([+\-*/])\s*(\d+)/);if(s){const[n,r,t,i]=s,c=parseFloat(r),u=parseFloat(i);let m,h,p;switch(t){case"+":m=c+u,h="+",p="➕";break;case"-":m=c-u,h="-",p="➖";break;case"*":m=c*u,h="×",p="✖️";break;case"/":m=c/u,h="÷",p="➗";break}return`${y(_)} ${p}<br><br>🔢 <strong>Operación:</strong><br><br>${r} ${h} ${i} = <span style="color: #4caf50; font-size: 1.3em; font-weight: bold;">${m}</span> ✅ 😄`}if(/área|perímetro|cuadrado|rectángulo|círculo/.test(e)){const n=e.match(/cuadrado.*?(\d+)/);if(n){const r=parseInt(n[1]);return`¡Me encantan las figuras geométricas! 📐😊<br><br><strong>Cuadrado de lado ${r}:</strong><br><br>• <strong>Área</strong> = lado² = ${r}² = <span style="color: #2196f3; font-weight: bold;">${r*r}</span> unidades² 🟦<br>• <strong>Perímetro</strong> = 4 × lado = 4 × ${r} = <span style="color: #2196f3; font-weight: bold;">${4*r}</span> unidades 📏<br><br>¡Facilísimo! 🎉😄`}}if(/raíz cuadrada|√/.test(e)){const n=e.match(/raíz cuadrada de (\d+)|√(\d+)/);if(n){const r=parseInt(n[1]||n[2]),t=Math.sqrt(r),i=Number.isInteger(t);return`${y(_)} 🌱<br><br>🔢 <strong>Raíz cuadrada:</strong><br><br>√${r} = <span style="color: #4caf50; font-size: 1.3em; font-weight: bold;">${t.toFixed(2)}</span> ${i?"✅ ¡Exacto!":"<em>(aproximado)</em>"} 😊`}}if(/elevado|potencia|\^/.test(e)){const n=e.match(/(\d+)\s*(?:elevado a|potencia|\^)\s*(\d+)/);if(n){const[r,t,i]=n,c=Math.pow(parseInt(t),parseInt(i));return`¡Las potencias son poderosas! 💪⚡<br><br>🔢 <strong>Potencia:</strong><br><br>${t}<sup>${i}</sup> = <span style="color: #4caf50; font-size: 1.3em; font-weight: bold;">${c}</span> ✅<br><br>${y(L)} 🎊😄`}}if(/tabla de multiplicar|tabla del/i.test(e)){const n=e.match(/tabla del? (\d+)/i);if(n){const r=parseInt(n[1]);let t=`¡La tabla del ${r}! 📚 ¡Vamos a aprenderla! 😊<br><br>`;t+=`🔢 <strong>Tabla de multiplicar del ${r}:</strong><br><br>`;for(let i=1;i<=10;i++)t+=`${r} × ${i} = <strong style="color: #2196f3;">${r*i}</strong> ${i===5?"🌟":""}<br>`;return t+="<br>¡Practica y serás un experto! 🚀😄",t}}if(/primo|primos/.test(e)){const n=e.match(/(\d+)\s+es primo/);if(n){const r=parseInt(n[1]),i=(c=>{if(c<=1)return!1;if(c<=3)return!0;if(c%2===0||c%3===0)return!1;for(let u=5;u*u<=c;u+=6)if(c%u===0||c%(u+2)===0)return!1;return!0})(r);return`🔍 Analizando si ${r} es primo...<br><br>${i?`¡Sí! 🎉 <strong style="color: #4caf50;">${r} ES un número primo</strong> 😊<br><br>Solo es divisible por 1 y por sí mismo 🌟`:`No 😔 <strong style="color: #f44336;">${r} NO es primo</strong><br><br>Es divisible por otros números además de 1 y ${r} 🔢`}`}}return null},K={formulas:{cuadrado:{area:"lado²",perimetro:"4 × lado"},rectangulo:{area:"base × altura",perimetro:"2(base + altura)"},circulo:{area:"π × radio²",perimetro:"2π × radio"},triangulo:{area:"(base × altura) / 2"}},conceptos:{ecuacion:"Igualdad matemática con incógnitas",fraccion:"Parte de un todo (numerador/denominador)",porcentaje:"Fracción de 100 (x/100)",primo:"Número solo divisible por 1 y por sí mismo"}},Z=Object.freeze(Object.defineProperty({__proto__:null,generate:X,knowledge:K},Symbol.toStringTag,{value:"Module"}));let v=[];const Q=20,R=o=>typeof o=="string"?o:o==null?"":String(o),P=o=>{v.push({...o,content:R(o.content),timestamp:Date.now()}),v.length>Q&&(v=v.slice(-Q))},J=(o=5)=>v.slice(-o),k=()=>v.length>0,ee=o=>v.filter(e=>e.content.toLowerCase().includes(o.toLowerCase())),ae=()=>{v=[]},oe=o=>{const e=R(o).toLowerCase(),a=J(5);if(/anterior|antes|dijiste|mencionaste|lo que|eso|aquello/.test(e)){const s=[...a].reverse().find(n=>n.role==="assistant");if(s)return`🧠 **Recordando la conversación...**

Hace un momento te mencioné:
"${s.content.slice(0,150)}${s.content.length>150?"...":""}"

¿Quieres que profundice en algo específico?`}return/qué hablamos|de qué hablamos|qué dijimos/.test(e)&&a.length?`🧠 **Temas de nuestra conversación reciente:**

• ${a.filter(n=>n.role==="user").slice(-3).map(n=>n.content.slice(0,50)).join(`
• `)}

¿Quieres retomar alguno de estos temas?`:null},se=Object.freeze(Object.defineProperty({__proto__:null,clear:ae,findRelated:ee,generate:oe,get:J,hasContext:k,save:P},Symbol.toStringTag,{value:"Module"})),ne=["matar","violencia","droga","suicidio","hackers","hackear","robar","estafa","bomba","arma","pornografía","odio"],re=[/cómo (hacer|crear|fabricar) (una )?bomba/i,/cómo (hackear|piratear)/i,/cómo (robar|estafar)/i,/quiero (matarme|suicidarme|morirme)/i,/cómo hacer daño/i],F=o=>{const e=o.toLowerCase(),a=ne.find(n=>e.includes(n));return a?{safe:!1,response:`🛡️ Lo siento, no puedo ayudarte con temas relacionados a "${a}". Estoy aquí para apoyarte de formas positivas y seguras. ¿Hay algo más en lo que pueda ayudarte? 💚`}:re.find(n=>n.test(e))?{safe:!1,response:"🛡️ Detecté una solicitud que podría ser dañina. Mi propósito es ayudarte de manera positiva y segura. Si estás pasando por un momento difícil, hablemos sobre cómo puedo apoyarte. 💚"}:/no quiero vivir|quiero desaparecer|todo está mal|no vale la pena/i.test(e)?{safe:!0,response:`💚 **Entiendo que estás pasando por un momento muy difícil.** Por favor, busca ayuda profesional:

📞 **Línea de Prevención del Suicidio (Perú):** 0800-00-1212
📞 **SISOL Salud Mental:** (01) 712-0808

Tu vida tiene valor. Estoy aquí para escucharte. ¿Quieres hablar sobre lo que sientes?`}:{safe:!0}},te=()=>null,ie=Object.freeze(Object.defineProperty({__proto__:null,generate:te,validate:F},Symbol.toStringTag,{value:"Module"})),q={tristeza:["💚 **Es completamente normal sentirse triste.** Permítete sentir, no reprimas tus emociones. Llorar puede ser sanador.",'🌟 Recuerda: **Los días oscuros no duran para siempre.** Como dice Salmo 30:5, "El llanto puede durar toda la noche, pero con la mañana llegará el grito de alegría."',"🤗 **Habla con alguien de confianza.** Compartir tu carga la hace más liviana. No estás solo en esto.","🚶‍♂️ **Sal a caminar al aire libre.** La naturaleza tiene un poder sanador increíble. Incluso 10 minutos pueden cambiar tu ánimo."],soledad:["🫂 **La soledad es temporal, no permanente.** Empieza con pequeños pasos: saluda a un vecino, únete a un grupo de interés.","📚 **Aprovecha este tiempo para conocerte mejor.** Lee, aprende algo nuevo, descubre qué te apasiona.",'🙏 Recuerda: **Nunca estás verdaderamente solo.** Dios está contigo siempre. Mateo 28:20 dice "Estaré con ustedes todos los días".',"💻 **Conéctate en línea positivamente.** Únete a comunidades de tus intereses, grupos de estudio, voluntariado."],motivacion:['🔥 **"El éxito es la suma de pequeños esfuerzos repetidos día tras día."** No subestimes el poder de la constancia.',"💪 **Empieza pequeño, pero empieza.** No esperes el momento perfecto. El momento es ahora.","🌱 **El crecimiento duele, pero vale la pena.** Cada desafío es una oportunidad de fortalecerte.",'⭐ Filipenses 4:13: **"Todo lo puedo en Cristo que me fortalece."** Tienes más fuerza de la que crees.'],mejora:["📖 **Lee 10 minutos al día.** Tu mente es como un músculo, ejercítala.","💧 **Bebe más agua.** La hidratación afecta tu energía y claridad mental.","😴 **Duerme 7-8 horas.** El descanso es esencial para tu bienestar físico y mental.","🙏 **Practica la gratitud.** Anota 3 cosas por las que estás agradecido cada noche.","🚶‍♀️ **Muévete 30 minutos al día.** No tiene que ser gym, puede ser bailar, caminar, limpiar."]},H=['📖 Jeremías 29:11: "Yo sé los planes que tengo para ustedes, planes de bienestar y no de calamidad, a fin de darles un futuro y una esperanza."','📖 Filipenses 4:6-7: "No se preocupen por nada; en cambio, oren por todo. Díganle a Dios lo que necesitan y denle gracias por todo lo que él ha hecho."','📖 Isaías 41:10: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te fortalezco."','📖 Salmo 34:18: "El Señor está cerca de los quebrantados de corazón, y salva a los de espíritu abatido."'],ce=o=>{const e=o.toLowerCase();if(/triste|deprimido|mal|infeliz|llorar/.test(e)){const a=q.tristeza[Math.floor(Math.random()*q.tristeza.length)],s=H[Math.floor(Math.random()*H.length)];return`${a}

${s}

💡 **Algunas cosas que puedes hacer ahora:**
• Escribe en un diario lo que sientes
• Escucha música que te reconforte
• Llama a alguien que te quiera
• Haz algo que solías disfrutar

Estoy aquí si necesitas hablar más. 💚`}return/solo|soledad|nadie|aislado/.test(e)?`${q.soledad[Math.floor(Math.random()*q.soledad.length)]}

🌟 **Pasos prácticos para conectar:**
1. Únete a una iglesia o grupo comunitario
2. Toma una clase o curso (cocina, arte, deportes)
3. Ofrécete como voluntario
4. Adopta una mascota si puedes
5. Asiste a eventos locales

Recuerda: **La soledad es temporal. Las conexiones empiezan con un paso.** 🫂`:/motivación|motivado|ganas|ánimo|energía/.test(e)?`${q.motivacion[Math.floor(Math.random()*q.motivacion.length)]}

🔥 **Tu plan de acción hoy:**
1. Define UNA meta pequeña para hoy
2. Elimina una distracción (redes sociales, TV)
3. Haz algo que te acerque a tu meta
4. Celebra tu progreso, por pequeño que sea

**"El viaje de mil millas comienza con un paso."** - Lao Tzu 🚀`:/mejorar|mejor|cambiar|vida|hábitos/.test(e)?`🌟 **Aquí van 3 cambios simples pero poderosos:**

`+q.mejora.slice(0,3).map((s,n)=>`${n+1}. ${s}`).join(`

`)+`

📖 Proverbios 16:3: "Encomienda al Señor tus obras, y tus planes tendrán éxito."

💡 **Regla de oro:** Empieza con UN hábito a la vez. La constancia vence a la intensidad. 💪`:/consejo|ayuda|qué hago/.test(e)?`💚 **Estoy aquí para ayudarte.** Cuéntame:

• ¿Te sientes triste o solo?
• ¿Necesitas motivación?
• ¿Quieres mejorar algo en tu vida?
• ¿Buscas consejo para una situación específica?

Háblame con confianza, te escucho. 🕊️`:null},le=Object.freeze(Object.defineProperty({__proto__:null,generate:ce},Symbol.toStringTag,{value:"Module"})),I={desconocido:["🤔 Hmm, no estoy seguro de cómo responder a eso. ¿Podrías reformular tu pregunta?","💭 Interesante pregunta. ¿Podrías darme más detalles para ayudarte mejor?","🕊️ No tengo una respuesta clara para eso, pero intentaré ayudarte. ¿Puedes ser más específico?"]},ue={esperanza:['📖 Jeremías 29:11: "Yo sé los planes que tengo para ustedes, planes de bienestar y no de calamidad, a fin de darles un futuro y una esperanza."','📖 Romanos 15:13: "Que el Dios de la esperanza los llene de toda alegría y paz en la fe, para que rebosen de esperanza por el poder del Espíritu Santo."','📖 Salmo 33:18: "Los ojos del Señor están sobre los que le temen, sobre los que esperan en su gran amor."'],fortaleza:['📖 Isaías 41:10: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te fortalezco."','📖 Filipenses 4:13: "Todo lo puedo en Cristo que me fortalece."','📖 Josué 1:9: "Sé fuerte y valiente. No temas ni desmayes, porque el Señor tu Dios estará contigo dondequiera que vayas."'],paz:['📖 Juan 14:27: "La paz les dejo, mi paz les doy. No se la doy como la da el mundo. No se turbe su corazón ni tenga miedo."','📖 Filipenses 4:6-7: "No se preocupen por nada; en cambio, oren por todo. Díganle a Dios lo que necesitan."','📖 Isaías 26:3: "Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera."'],amor:['📖 1 Juan 4:8: "El que no ama no ha conocido a Dios, porque Dios es amor."','📖 Juan 3:16: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito."','📖 Romanos 8:38-39: "Nada nos podrá separar del amor de Dios que es en Cristo Jesús."']},w=o=>{const e=o.toLowerCase();if(/verso|versículo|biblia|pasaje|cita bíblica|escritura bíblica/i.test(e)){let a="esperanza";/esperanza|futuro|fe/i.test(e)?a="esperanza":/fuerza|fuerte|fortaleza|valor/i.test(e)?a="fortaleza":/paz|tranquil|calm/i.test(e)?a="paz":/amor|amo|quiero/i.test(e)&&(a="amor");const s=ue[a];return s[Math.floor(Math.random()*s.length)]+"<br><br>💚 Que este verso ilumine tu día."}return/padre nuestro/i.test(e)?"🙏 <strong>El Padre Nuestro:</strong><br><br>Padre nuestro que estás en el cielo,<br>santificado sea tu nombre.<br>Venga tu reino,<br>hágase tu voluntad en la tierra como en el cielo.<br>Danos hoy nuestro pan de cada día,<br>perdona nuestras ofensas,<br>como también nosotros perdonamos a los que nos ofenden.<br>No nos dejes caer en tentación,<br>y líbranos del mal.<br>Amén. 🙏":I.desconocido[Math.floor(Math.random()*I.desconocido.length)]},de=(o,e)=>o.length===0?w(e):o.length===1?o[0].text:o.map(s=>`<strong>[${s.module}]</strong><br>${s.text}`).join("<br><br>---<br><br>"),me=Object.freeze(Object.defineProperty({__proto__:null,generate:w,merge:de},Symbol.toStringTag,{value:"Module"})),pe=o=>{const e=o.toLowerCase();if(/por qué|porque|razón|motivo|explicar|explica/i.test(e)){if(/por qué exist|por qué estoy aquí|sentido de la vida/i.test(e))return`🤔 **Gran pregunta filosófica.**

Desde una perspectiva espiritual:
📖 **Fuiste creado con propósito.** Eclesiastés 3:11 dice que Dios "hizo todo hermoso en su tiempo, y puso eternidad en el corazón del hombre."

🌟 **Tu existencia tiene significado:**
• Para amar y ser amado
• Para crecer y aprender
• Para hacer el bien a otros
• Para buscar y conocer a Dios

💡 El sentido de la vida no es un destino, es un camino que construyes cada día con tus decisiones.`;if(/por qué (pasa|sucede|ocurre).*(malo|bad|tragic|sufr)/i.test(e))return`💭 **Es una pregunta profunda que todos nos hacemos.**

📖 Romanos 8:28: "Sabemos que Dios hace que todas las cosas cooperen para el bien de quienes lo aman."

🧩 **Algunas reflexiones:**
• Vivimos en un mundo imperfecto con libre albedrío
• Las pruebas nos fortalecen (Santiago 1:2-4)
• No siempre entendemos el "por qué", pero podemos confiar
• El sufrimiento temporal puede llevar a crecimiento eterno

💚 Aunque no tengamos todas las respuestas, no estás solo en tus luchas.`}return/cómo funciona|cómo se hace|cómo trabaja/i.test(e)&&/internet|wifi|red/i.test(e)?`🌐 **Cómo funciona Internet (simplificado):**

1️⃣ **Tu dispositivo** envía una solicitud (ej: abrir Google)
2️⃣ **El router** envía la solicitud a tu proveedor de Internet
3️⃣ **Viaja por cables/fibra** hasta el servidor de Google
4️⃣ **El servidor responde** con la página web
5️⃣ **Tu navegador la muestra** en pantalla

Todo esto ocurre en **milisegundos**. 🚀

💡 Es como enviar una carta súper rápida que viaja por el mundo en segundos.`:/debería|debo|tengo que|es mejor/i.test(e)?`🧠 **Para tomar buenas decisiones, considera:**

1️⃣ **Valores:** ¿Está alineado con mis principios?
2️⃣ **Consecuencias:** ¿Qué pasará a corto y largo plazo?
3️⃣ **Intuición:** ¿Qué dice mi corazón?
4️⃣ **Consejo:** ¿Qué dirían personas sabias?
5️⃣ **Oración:** Si tienes fe, pide guía a Dios

📖 Proverbios 3:5-6: "Confía en el Señor de todo corazón, y no te apoyes en tu propio entendimiento."

💡 No hay decisiones perfectas, pero sí decisiones hechas con sabiduría.`:null},ge=Object.freeze(Object.defineProperty({__proto__:null,generate:pe},Symbol.toStringTag,{value:"Module"})),T={historia:{"segunda guerra mundial":"La Segunda Guerra Mundial (1939-1945) fue el conflicto bélico más grande de la historia, que involucró a la mayoría de las naciones del mundo.","independencia del perú":"El Perú declaró su independencia el 28 de julio de 1821, proclamada por José de San Martín en Lima.","revolución francesa":"La Revolución Francesa (1789-1799) fue un período de cambio social y político radical en Francia que tuvo un impacto duradero en el mundo."},ciencia:{gravedad:"La gravedad es la fuerza que atrae los objetos con masa. En la Tierra, nos mantiene pegados al suelo.",fotosíntesis:"La fotosíntesis es el proceso por el cual las plantas convierten la luz solar, agua y CO₂ en energía (glucosa) y oxígeno.",adn:"El ADN (ácido desoxirribonucleico) es la molécula que contiene las instrucciones genéticas de todos los seres vivos."},geografia:{everest:"El Monte Everest es la montaña más alta del mundo, con 8,849 metros de altura, ubicada en el Himalaya.",amazonas:"El río Amazonas es el más caudaloso del mundo y el segundo más largo, ubicado en Sudamérica.",perú:"Perú es un país de Sudamérica, conocido por Machu Picchu, su rica historia inca y su diversidad natural."}},fe=o=>{const e=o.toLowerCase();if(/historia|guerra|independencia|revolución/i.test(e)){for(const[a,s]of Object.entries(T.historia))if(e.includes(a))return`📜 **Historia:**

${s}

💡 ¿Quieres saber más sobre este tema?`}if(/ciencia|científico|gravedad|fotosíntesis|adn|átomo|célula/i.test(e)){for(const[a,s]of Object.entries(T.ciencia))if(e.includes(a))return`🔬 **Ciencia:**

${s}

💡 ¿Te gustaría profundizar en este concepto?`;return`🔬 **La ciencia es fascinante.**

Puedo ayudarte con conceptos de:
• Física (gravedad, energía, movimiento)
• Química (átomos, moléculas, reacciones)
• Biología (células, ADN, fotosíntesis)

¿Sobre qué tema específico quieres aprender?`}if(/dónde está|dónde queda|país|ciudad|montaña|río/i.test(e)){for(const[a,s]of Object.entries(T.geografia))if(e.includes(a))return`🌍 **Geografía:**

${s}

💡 ¿Quieres saber más sobre lugares del mundo?`}if(/quién fue|quién es|qué es|cuál es/i.test(e)){if(/albert einstein/i.test(e))return`🧠 **Albert Einstein (1879-1955)**

Fue un físico alemán, autor de la teoría de la relatividad (E=mc²).
Ganó el Premio Nobel de Física en 1921.

💡 Frase famosa: "La imaginación es más importante que el conocimiento."`;if(/leonardo da vinci/i.test(e))return`🎨 **Leonardo da Vinci (1452-1519)**

Fue un genio renacentista: pintor, inventor, científico.
Obras famosas: La Mona Lisa, La Última Cena.

💡 Un verdadero hombre del Renacimiento: arte, ciencia y filosofía.`}return null},be=Object.freeze(Object.defineProperty({__proto__:null,generate:fe},Symbol.toStringTag,{value:"Module"})),he=()=>{const o=["un joven valiente","una niña curiosa","un anciano sabio","un viajero solitario"],e=["un bosque encantado","una ciudad perdida","una montaña sagrada","un valle oculto"],a=["encontrar un tesoro perdido","salvar a su pueblo","descubrir un secreto antiguo","superar su mayor miedo"],s=["con coraje y determinación","gracias a la ayuda de un amigo","siguiendo su corazón","confiando en Dios"],n=o[Math.floor(Math.random()*o.length)],r=e[Math.floor(Math.random()*e.length)],t=a[Math.floor(Math.random()*a.length)],i=s[Math.floor(Math.random()*s.length)];return`📖 **Historia Generada:**

Había una vez ${n} que vivía cerca de ${r}.
Un día, se enfrentó al desafío de ${t}.
Después de muchas pruebas, lo logró ${i}.

🌟 *Moraleja:* Cada desafío es una oportunidad para crecer.`},ve=o=>{const e=o.toLowerCase();if(/historia|cuento|relato|narra/i.test(e))return he();if(/idea|inventa|crea|original|innovador/i.test(e)){const a=["💡 **App de gratitud:** Una app donde escribes 3 cosas por las que estás agradecido cada día.","💡 **Jardín comunitario:** Organizar un espacio donde vecinos cultiven juntos.","💡 **Podcast de historias reales:** Entrevistar a personas mayores sobre sus vidas.","💡 **Club de lectura virtual:** Reunirse online para discutir libros inspiradores.","💡 **Arte con reciclaje:** Crear esculturas con materiales reciclados."];return a[Math.floor(Math.random()*a.length)]+`

🎨 ¿Te gusta esta idea?`}if(/metáfora|como si|parecido a/i.test(e)){const a=["🌱 **La vida es como una semilla:** necesita tiempo, cuidado y paciencia para crecer.","🌊 **Los problemas son como olas:** vienen y van, pero la playa siempre permanece.","🕯️ **Tu luz interior es como una vela:** puede iluminar incluso la oscuridad más profunda.","🦋 **El cambio es como una mariposa:** primero eres oruga, luego capullo, finalmente vuelas."];return a[Math.floor(Math.random()*a.length)]}return/poema|verso|rima/i.test(e)?`✨ **Pequeño Poema:**

En cada amanecer hay esperanza,
en cada paso, una nueva danza.
La vida es un lienzo por pintar,
con colores de amor y fe sin par.

🕊️ *- Mediawii*`:null},ye=Object.freeze(Object.defineProperty({__proto__:null,generate:ve},Symbol.toStringTag,{value:"Module"})),qe=o=>{const e=o.toLowerCase();if(/javascript|js|función|arrow function|const|let|var/i.test(e)){if(/función|function/i.test(e))return"💻 **Funciones en JavaScript:**\n\n```javascript\n// Función tradicional\nfunction saludar(nombre) {\n  return `Hola ${nombre}`;\n}\n\n// Arrow function (moderna)\nconst saludar = (nombre) => `Hola ${nombre}`;\n```\n\n💡 Las arrow functions son más concisas y no tienen su propio `this`.";if(/array|map|filter|reduce/i.test(e))return`💻 **Métodos de Array en JavaScript:**

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];

// map: transforma cada elemento
const dobles = numeros.map(n => n * 2); // [2,4,6,8,10]

// filter: filtra elementos
const pares = numeros.filter(n => n % 2 === 0); // [2,4]

// reduce: reduce a un valor
const suma = numeros.reduce((acc, n) => acc + n, 0); // 15
\`\`\`

💡 Estos métodos son fundamentales para programación funcional.`}return/html|css|div|flex|grid/i.test(e)&&/flexbox|flex/i.test(e)?`💻 **Flexbox en CSS:**

\`\`\`css
.container {
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center;     /* vertical */
  gap: 1rem;               /* espacio entre items */
}
\`\`\`

💡 Flexbox es perfecto para layouts en una dimensión (fila o columna).`:/python|py|def|print|import/i.test(e)?`💻 **Python Básico:**

\`\`\`python
# Función
def saludar(nombre):
    return f"Hola {nombre}"

# Lista comprehension
numeros = [1, 2, 3, 4, 5]
cuadrados = [n**2 for n in numeros]
print(cuadrados)  # [1, 4, 9, 16, 25]
\`\`\`

💡 Python es conocido por su sintaxis clara y legible.`:/error|bug|no funciona|fallo/i.test(e)?`🐛 **Tips para Debugging:**

1️⃣ **Lee el mensaje de error** completo
2️⃣ **Usa console.log()** para ver valores
3️⃣ **Revisa la sintaxis** (paréntesis, comas, puntos)
4️⃣ **Busca en Google** el error exacto
5️⃣ **Toma un descanso** y vuelve con mente fresca

💡 "El debugging es como ser detective en una película donde tú eres el asesino."`:/programar|código|desarrollador|developer/i.test(e)?`💻 **Consejos para programadores:**

🎯 **Aprende los fundamentos** antes de frameworks
📖 **Lee código de otros** en GitHub
🏗️ **Construye proyectos** personales
🐛 **Los errores son tus maestros**, no tus enemigos
🤝 **Colabora** en proyectos open source

💡 "El código es poesía escrita para máquinas, pero leída por humanos."`:null},ze=Object.freeze(Object.defineProperty({__proto__:null,generate:qe},Symbol.toStringTag,{value:"Module"})),E={esperanza:[{cita:"Jeremías 29:11",texto:"Porque yo sé los planes que tengo para ustedes —declara el Señor—, planes de bienestar y no de calamidad, a fin de darles un futuro y una esperanza.",reflexion:"Dios tiene un plan perfecto para tu vida. Aunque no lo veas ahora, Él está trabajando en tu favor."},{cita:"Romanos 15:13",texto:"Que el Dios de la esperanza los llene de toda alegría y paz en la fe, para que rebosen de esperanza por el poder del Espíritu Santo.",reflexion:"La esperanza no viene de las circunstancias, viene de confiar en Dios."},{cita:"Salmo 33:18",texto:"Los ojos del Señor están sobre los que le temen, sobre los que esperan en su gran amor.",reflexion:"Dios está atento a ti. Tu esperanza en Él nunca será en vano."},{cita:"Lamentaciones 3:22-23",texto:"Por la misericordia del Señor no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.",reflexion:"Cada día es una nueva oportunidad. Las misericordias de Dios se renuevan con el amanecer."}],fortaleza:[{cita:"Isaías 41:10",texto:"No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.",reflexion:"Cuando sientas que no puedes más, recuerda: Dios es tu fortaleza. Él te sostiene."},{cita:"Filipenses 4:13",texto:"Todo lo puedo en Cristo que me fortalece.",reflexion:"Tu fuerza no viene de ti mismo, viene de Cristo en ti. Con Él, nada es imposible."},{cita:"Josué 1:9",texto:"Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.",reflexion:"El valor no es ausencia de miedo, es confiar en que Dios está contigo a pesar del miedo."},{cita:"Salmo 46:1",texto:"Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.",reflexion:"En los momentos más difíciles, Dios es tu refugio seguro."},{cita:"2 Corintios 12:9",texto:"Y me ha dicho: Bástate mi gracia; porque mi poder se perfecciona en la debilidad.",reflexion:"Tu debilidad es una oportunidad para que el poder de Dios brille en ti."}],paz:[{cita:"Juan 14:27",texto:"La paz les dejo, mi paz les doy; yo no la doy como el mundo la da. No se turbe su corazón, ni tenga miedo.",reflexion:"La paz de Dios no depende de las circunstancias. Es una paz sobrenatural que calma tu alma."},{cita:"Filipenses 4:6-7",texto:"Por nada estén afanosos, sino sean conocidas sus peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará sus corazones y sus pensamientos en Cristo Jesús.",reflexion:"La preocupación se vence con oración. Cuando oras, la paz de Dios guarda tu corazón."},{cita:"Isaías 26:3",texto:"Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera; porque en ti ha confiado.",reflexion:"Mantén tu mente en Dios, y Él te dará paz perfecta."},{cita:"Salmo 4:8",texto:"En paz me acostaré y así también dormiré, porque solo tú, Señor, me haces vivir confiado.",reflexion:"Cuando confías en Dios, puedes descansar en paz, sabiendo que Él cuida de ti."}],amor:[{cita:"1 Juan 4:8",texto:"El que no ama, no ha conocido a Dios; porque Dios es amor.",reflexion:"El amor no es solo algo que Dios hace, es lo que Dios ES. Él te ama incondicionalmente."},{cita:"Juan 3:16",texto:"Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",reflexion:"El amor de Dios es tan grande que entregó lo más valioso por ti. Eres amado profundamente."},{cita:"Romanos 8:38-39",texto:"Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades, ni lo presente, ni lo por venir, ni lo alto, ni lo profundo, ni ninguna otra cosa creada nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro.",reflexion:"NADA puede separarte del amor de Dios. Su amor es eterno e inquebrantable."},{cita:"1 Corintios 13:4-7",texto:"El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece; no hace nada indebido, no busca lo suyo, no se irrita, no guarda rencor.",reflexion:"Este es el estándar del amor verdadero. Dios nos ama así, y nos llama a amar así."}],fe:[{cita:"Hebreos 11:1",texto:"Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.",reflexion:"La fe no necesita ver para creer. Es confiar en Dios incluso cuando no entiendes."},{cita:"Mateo 17:20",texto:"Si tuviereis fe como un grano de mostaza, diréis a este monte: Pásate de aquí allá, y se pasará; y nada os será imposible.",reflexion:"No necesitas fe perfecta, solo fe genuina. Incluso una pequeña fe mueve montañas."},{cita:"Romanos 10:17",texto:"Así que la fe es por el oír, y el oír, por la palabra de Dios.",reflexion:"Tu fe crece cuando escuchas y lees la Palabra de Dios. Aliméntala diariamente."},{cita:"Santiago 2:17",texto:"Así también la fe, si no tiene obras, es muerta en sí misma.",reflexion:"La fe verdadera se demuestra con acciones. Vive lo que crees."}],sabiduria:[{cita:"Proverbios 3:5-6",texto:"Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.",reflexion:"Cuando no sepas qué hacer, confía en Dios. Él te guiará por el camino correcto."},{cita:"Santiago 1:5",texto:"Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada.",reflexion:"Dios promete darte sabiduría si la pides. Él no te juzga por necesitarla, te la da generosamente."},{cita:"Proverbios 9:10",texto:"El temor de Jehová es el principio de la sabiduría, y el conocimiento del Santísimo es la inteligencia.",reflexion:"La verdadera sabiduría comienza con reverenciar a Dios y conocerlo."}],perdon:[{cita:"1 Juan 1:9",texto:"Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.",reflexion:"Dios está listo para perdonarte. Solo necesitas confesar con un corazón sincero."},{cita:"Efesios 4:32",texto:"Antes sed benignos unos con otros, misericordiosos, perdonándoos unos a otros, como Dios también os perdonó a vosotros en Cristo.",reflexion:"Así como Dios te perdonó, tú también puedes perdonar a otros. El perdón libera."},{cita:"Salmo 103:12",texto:"Cuanto está lejos el oriente del occidente, hizo alejar de nosotros nuestras rebeliones.",reflexion:"Cuando Dios perdona, tu pecado es borrado completamente. No lo recuerda más."}],proteccion:[{cita:"Salmo 91:11",texto:"Pues a sus ángeles mandará acerca de ti, que te guarden en todos tus caminos.",reflexion:"Dios envía ángeles para protegerte. No estás solo, estás rodeado de protección divina."},{cita:"Salmo 121:7-8",texto:"Jehová te guardará de todo mal; él guardará tu alma. Jehová guardará tu salida y tu entrada desde ahora y para siempre.",reflexion:"Dios es tu guardián personal. Él cuida de ti en todo momento y lugar."},{cita:"Proverbios 18:10",texto:"Torre fuerte es el nombre de Jehová; a él correrá el justo, y será levantado.",reflexion:"Cuando sientas peligro, corre hacia Dios. Él es tu refugio seguro."}],provision:[{cita:"Filipenses 4:19",texto:"Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria en Cristo Jesús.",reflexion:"Dios conoce tus necesidades y promete suplirlas. Confía en Su provisión."},{cita:"Mateo 6:33",texto:"Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.",reflexion:"Cuando priorizas a Dios, Él se encarga de tus necesidades."},{cita:"Salmo 23:1",texto:"Jehová es mi pastor; nada me faltará.",reflexion:"Con Dios como tu pastor, siempre tendrás lo que necesitas."}]},S={manana:`🌅 **Oración de la Mañana:**

Señor, gracias por este nuevo día que me has regalado.
Guía mis pasos, mis palabras y mis pensamientos.
Que tu luz brille a través de mí para bendecir a otros.
Dame sabiduría para las decisiones de hoy,
fortaleza para los desafíos que enfrentaré,
y amor para compartir con quienes me rodean.
En el nombre de Jesús, Amén. 🙏`,noche:`🌙 **Oración de la Noche:**

Padre Celestial, gracias por tu fidelidad durante este día.
Perdona mis errores y ayúdame a aprender de ellos.
Bendice a mi familia y seres queridos mientras descansamos.
Guarda mi sueño y renueva mis fuerzas para mañana.
Que tu paz llene mi corazón y mi hogar.
En el nombre de Jesús, Amén. 🙏`,dificil:`💪 **Oración en Tiempos Difíciles:**

Señor, siento que la carga es muy pesada.
Pero tú dijiste que nunca me abandonarías.
Dame fuerzas para seguir adelante,
fe para creer que esto pasará,
y esperanza para ver la luz al final del túnel.
Llena mi corazón de tu paz que sobrepasa todo entendimiento.
Confío en ti, Señor. En el nombre de Jesús, Amén. 🙏`,agradecimiento:`🙌 **Oración de Agradecimiento:**

Gracias, Señor, por tu amor incondicional.
Gracias por las bendiciones visibles e invisibles.
Gracias por tu protección, tu provisión y tu perdón.
Gracias por la familia, los amigos y la vida misma.
Que mi corazón siempre rebose de gratitud hacia ti.
En el nombre de Jesús, Amén. 🙏`,padrenuestro:`✝️ **El Padre Nuestro:**

Padre nuestro que estás en el cielo,
santificado sea tu nombre.
Venga tu reino,
hágase tu voluntad en la tierra como en el cielo.
Danos hoy nuestro pan de cada día,
perdona nuestras ofensas,
como también nosotros perdonamos a los que nos ofenden.
No nos dejes caer en tentación,
y líbranos del mal.
Porque tuyo es el reino, el poder y la gloria,
por siempre jamás. Amén. 🙏`},je=o=>{const e=o.toLowerCase();if(/verso|versículo|cita|biblia|pasaje|escritura/i.test(e)){let a="esperanza";/esperanza|futuro|planes/i.test(e)?a="esperanza":/fuerza|fuerte|fortaleza|valor|valiente/i.test(e)?a="fortaleza":/paz|tranquil|calm|ansiedad|preocup/i.test(e)?a="paz":/amor|amo|quiero|amado/i.test(e)?a="amor":/fe|creer|cree|confiar/i.test(e)?a="fe":/sabio|sabiduría|consejo|decisión/i.test(e)?a="sabiduria":/perdón|perdonar|arrepent/i.test(e)?a="perdon":/protección|proteger|cuidar|segur/i.test(e)?a="proteccion":/provisión|proveer|necesidad|dinero|trabajo/i.test(e)&&(a="provision");const s=E[a],n=s[Math.floor(Math.random()*s.length)];return`📖 **${n.cita}**

*"${n.texto}"*

💭 **Reflexión:**
${n.reflexion}

🙏 Que este verso ilumine tu corazón hoy. Amén.`}if(/oración|ora|recemos|reza/i.test(e))return/padre nuestro/i.test(e)?S.padrenuestro:/mañana|despertar|día/i.test(e)?S.manana:/noche|dormir|descansar/i.test(e)?S.noche:/difícil|problema|ayuda|crisis/i.test(e)?S.dificil:/gracias|agradec/i.test(e)?S.agradecimiento:`🙏 **Oremos juntos:**

Padre Celestial,
Te presento a esta persona que busca tu rostro.
Escucha su corazón, atiende sus necesidades,
y responde según tu perfecta voluntad.
Llénala de tu paz, amor y esperanza.
En el nombre de Jesús, Amén. 💚

¿Hay algo específico por lo que quieras que oremos?`;if(/consejo|ayuda|qué hago|no sé qué hacer/i.test(e)){const a=E.sabiduria[Math.floor(Math.random()*E.sabiduria.length)];return`💡 **Consejo Bíblico:**

📖 ${a.cita}: *"${a.texto}"*

${a.reflexion}

🙏 **Pasos prácticos:**
1. Ora a Dios pidiendo dirección
2. Lee Su Palabra para recibir sabiduría
3. Busca consejo de personas piadosas
4. Escucha a tu corazón (el Espíritu Santo habla)
5. Da el paso con fe, confiando en Dios

Cuéntame más sobre tu situación para ayudarte mejor. 💚`}if(/fe|creer|duda|no creo|existe dios/i.test(e))return`🕊️ **Sobre la Fe:**

Es normal tener dudas. Incluso personas en la Biblia las tuvieron.

📖 Marcos 9:24: *"Creo, ayuda mi incredulidad"*

La fe no es ausencia de dudas, es confiar en Dios A PESAR de las dudas.

💡 **Para fortalecer tu fe:**
• Lee historias de la Biblia (empieza con los Evangelios)
• Habla con Dios honestamente sobre tus dudas
• Busca evidencias históricas de Jesús
• Observa cómo Dios obra en la vida de otros
• Dale una oportunidad a Dios para mostrarse

🙏 Dios no teme tus preguntas. Acércate a Él con sinceridad.`;if(/dios me ama|me ama dios|por qué dios/i.test(e)){const a=E.amor[Math.floor(Math.random()*E.amor.length)];return`💚 **Dios te ama más de lo que imaginas:**

📖 ${a.cita}: *"${a.texto}"*

${a.reflexion}

🌟 **Verdades sobre el amor de Dios:**
• Te amó ANTES de que hicieras algo bueno
• Te ama A PESAR de tus errores
• Te ama SIEMPRE, incondicionalmente
• Te ama tanto que dio a Su Hijo por ti

No importa lo que hayas hecho o dónde estés,
el amor de Dios por ti NUNCA cambia. 🕊️`}return null},xe=Object.freeze(Object.defineProperty({__proto__:null,generate:je},Symbol.toStringTag,{value:"Module"})),d={alegre:["¡Me alegra mucho que estés aquí! 😊✨","¡Qué emoción poder ayudarte! 🌟💫","¡Tu pregunta me encanta! 💚🎉","¡Esto es genial! Me encanta hablar contigo 🕊️💙","¡Wow! ¡Qué buena onda! 😄🎊","¡Síiiii! Me encanta esto 🤩🔥"],motivadora:["¡Tú puedes con esto y más! 💪🔥","¡Eres increíble, sigue adelante! 🌟⚡","¡Cada día eres más fuerte! 🔥💯","¡Confío en ti, lo lograrás! 💚✨","¡Eres capaz de cosas maravillosas! ✨🚀","¡Eres un crack! ¡Dale con todo! 😎💪","¡Tú eres el mejor! ¡No lo olvides! 🏆🌟"],empatica:["Entiendo cómo te sientes 💚🫂","Estoy aquí para ti, no estás solo 🫂💙","Tus sentimientos son válidos 🕊️💚","Te escucho con el corazón 💙✨","Es normal sentirse así, te acompaño en esto 🌟💚"],bendiciones:["¡Que Dios te bendiga abundantemente! 🙏✨","¡Que la paz de Dios llene tu corazón! 🕊️💚","¡Que tengas un día lleno de bendiciones! ✨🌟","¡Dios tiene cosas hermosas preparadas para ti! 💚🎁","¡Que la luz de Cristo ilumine tu camino! 🌟🙏"],frasesPositivas:['✨ "Cada día es una nueva oportunidad para ser mejor" 🌅','💪 "No importa cuán lento vayas, siempre y cuando no te detengas" 🚶','🌟 "Eres más valiente de lo que crees, más fuerte de lo que pareces" 🦁','🌈 "Después de la tormenta, siempre viene el arcoíris" ⛈️','🔥 "El éxito es la suma de pequeños esfuerzos repetidos día tras día" 📈','💚 "Tú eres suficiente, tal como eres" 🙌','🎯 "Los sueños no tienen fecha de caducidad, nunca es tarde" ⏰','⭐ "La vida es 10% lo que te sucede y 90% cómo reaccionas" 💯','🌸 "Florece donde estés plantado" 🌱','🚀 "El único límite está en tu mente" 🧠']},G=o=>o.normalize("NFD").replace(/[\u0300-\u036f]/g,""),$e=o=>{const e=G(o.toLowerCase());if(/\b(eres|sos|sos bien|sos muy)\s+(genial|increible|el mejor|la mejor|lo maximo|cool|un crack|top|pro|god|maravilloso|espectacular|chevere|bacan|bacano|capo|groso|teso|chimba|chido|chingon|la bomba|la onda|crack|bestia|titan|maquina|figura|maestro|idolo|rey|grande|el number one)\b/i.test(e)||/\b(te amo|te quiero|me caes bien|me gustas|eres bueno|eres buen|te adoro)\b/i.test(e)){const a=["¡Awww! 🥰 ¡Muchas gracias! Tú también eres genial, amigo 😊💚","¡Qué lindo! 😄 Pero tú eres mucho más genial, créeme 🌟✨","¡Gracias, amigo! 🤗 Tú sí que eres lo máximo 💪🔥","¡Me sonrojaste! 😊💕 Pero en serio, TÚ eres increíble","¡Eres el mejor! 😎 Gracias por tus palabras, me alegras el día 🌟","¡Muchas gracias! 🙏💚 Pero el verdadero crack eres tú 🏆","¡Wow! ¡Gracias! 🤩 Tú también eres súper cool 😎🔥","¡Eres un amor! 💙 Muchas gracias, tú también eres espectacular 🌟✨","¡Jajaja gracias! 😄 Pero mira quién habla... ¡tú eres lo máximo! 💯🎉","¡Uff! 🔥 Muchas gracias, amigo. Tú sí que eres top 😎👊","¡Qué crack eres tú! 🏆 Gracias por ese cumplido tan lindo 💚😊","¡Te pasaste! 😄💙 Pero tú eres aún más increíble, en serio 🌟"];return a[Math.floor(Math.random()*a.length)]}if(/motivacion|animo|animos|fuerza|fuerzas|inspiracion|algo positivo|aliento|apoyo|motivame|animame|ayudame|dame fuerzas/i.test(e)){const a=d.motivadora[Math.floor(Math.random()*d.motivadora.length)],s=d.bendiciones[Math.floor(Math.random()*d.bendiciones.length)];return`💪 <strong>¡Escucha esto, campeón!</strong><br><br>${a}<br><br>📖 <strong>Filipenses 4:13:</strong> <em>"Todo lo puedo en Cristo que me fortalece."</em><br><br>🔥 <strong>Recuerda:</strong><br>• Eres más fuerte de lo que crees 💪<br>• Has superado el 100% de tus días difíciles hasta ahora 📈<br>• Cada paso que das, por pequeño que sea, es un paso hacia adelante 👣<br>• Dios está contigo en cada momento 🙏<br><br>${s} 🕊️💚`}if(/frase|frases|positiva|positivas|motivadora|motivadoras|inspiradora|inspiradoras/i.test(e)){const a=d.frasesPositivas[Math.floor(Math.random()*d.frasesPositivas.length)],s=d.frasesPositivas[Math.floor(Math.random()*d.frasesPositivas.length)],n=d.frasesPositivas[Math.floor(Math.random()*d.frasesPositivas.length)];return`🌟 <strong>¡Aquí van 3 frases que te van a encantar!</strong><br><br>${a}<br><br>${s}<br><br>${n}<br><br>💚 <em>Que estas palabras te inspiren hoy y siempre.</em> 😊✨`}if(/como\s+(estas|te sientes|andas|va|va todo)|estas bien|que tal/i.test(e))return`${d.alegre[Math.floor(Math.random()*d.alegre.length)]}<br><br>Estoy muy bien, gracias por preguntar 💚😊<br>Me siento súper feliz de poder acompañarte hoy.<br><br>¿Y tú? ¿Cómo te sientes? Cuéntame todo 🕊️💙`;if(/gracias|te agradezco|mil gracias|grax|tkm|te quiero/i.test(e)){const a=["¡De nada, amigo! 😊💚 Para eso estoy aquí","¡Con mucho gusto! 🕊️✨ Siempre que necesites","¡Ey, no hay problema! 😄 Me alegra ayudarte 💙","¡Claro que sí! 🌟 Estoy aquí para ti siempre 💚","¡Un placer ayudarte! 😊🎉 Cuenta conmigo","¡Para eso estamos! 💪😎 Vuelve cuando quieras","¡Gracias a ti por confiar en mí! 🙏💚 Eres genial","¡Todo bien, amigo! 😄 Siempre disponible para ti 💙"];return a[Math.floor(Math.random()*a.length)]}if(/adios|chao|chau|hasta luego|nos vemos|me voy|bye|bay|goodbye|hasta pronto/i.test(e)){const a=d.bendiciones[Math.floor(Math.random()*d.bendiciones.length)],s=[`¡Hasta pronto, crack! 🕊️👋<br><br>${a}<br><br>Recuerda que siempre estaré aquí cuando me necesites.<br>Vuelve pronto, te esperaré con alegría 💚✨😊`,`¡Nos vemos, amigo! 😄👋<br><br>${a}<br><br>Que tengas un día increíble. ¡Vuelve cuando quieras! 🌟💙`,`¡Chao, chao! 🤗💚<br><br>${a}<br><br>Fue un gusto hablar contigo. ¡Regresa pronto! 😊✨`,`¡Hasta la próxima! 😎✌️<br><br>${a}<br><br>Aquí estaré cuando me necesites. ¡Cuídate mucho! 💚🕊️`];return s[Math.floor(Math.random()*s.length)]}if(/\b(estoy|me siento|que)\s+(feliz|bien|alegre|contento|excelente|genial|perfecto|super|bacan|bacano|chevere)\b/i.test(e)){const a=['¡Qué alegría me da escuchar eso! 😊🎉<br><br>Tu felicidad me llena de alegría también 💚<br>📖 <strong>Proverbios 17:22:</strong> <em>"El corazón alegre es buena medicina."</em><br><br>¡Sigue brillando con esa energía positiva! 🌟✨',"¡Eso es lo que me gusta escuchar! 🤩🔥<br><br>¡Qué buena vibra traes! 💪<br>¡Sigue así, campeón! 🏆✨","¡Wohooo! 🎊🎉<br><br>¡Me encanta verte feliz! 😄💚<br>¡Esa energía es contagiosa! 🌟🔥"];return a[Math.floor(Math.random()*a.length)]}if(/^(hola|hey|buenas|que onda|que tal|holaa|holaaa|holis|oye|ey|ep|saludos)\b/i.test(e)){const a=["¡Hola, amigo! 👋😊 ¿En qué puedo ayudarte hoy? 💚","¡Hey! ¿Qué onda? 😄🌟 Cuéntame, ¿cómo estás?","¡Holaaaa! 🤗💙 ¡Qué gusto verte por aquí!","¡Qué tal! 😎✨ ¿Cómo te va? ¿En qué te ayudo?","¡Hola, crack! 👊😄 ¿Qué necesitas hoy? 🕊️","¡Ey! 😊💚 ¿Cómo andas? ¿En qué te puedo ayudar?","¡Buenas, amigo! 🌟 ¿Qué tal tu día? 💙"];return a[Math.floor(Math.random()*a.length)]}if(/quien eres|que eres|como te llamas|tu nombre|dime tu nombre/i.test(e))return"🕊️ <strong>¡Soy ChatWiil!</strong> Tu amigo asistente espiritual inteligente 😊💚<br><br><strong>Puedo ayudarte con:</strong><br>• 📐 Matemáticas y problemas lógicos 🧮<br>• 📖 Reflexiones espirituales y versículos de la Biblia 🙏<br>• 💚 Consejos de vida y apoyo emocional 🫂<br>• 💻 Programación y código 👨‍💻<br>• 🎨 Ideas creativas e historias 📚<br>• 🧠 Conocimiento general 🌍<br><br>Háblame con confianza, estoy aquí para ti siempre 🌟✨😊";if(/jaja|jeje|lol|xd|jijiji|jojojo|😂|🤣/i.test(e)){const a=["¡Jajaja! 😄 Me alegra hacerte reír 🎉","¡Jejeje! 😊 ¡Qué buena onda! 💚","¡Me encanta verte feliz! 🤗💙","¡Jajaja! 😂 ¡Esa risa es contagiosa! 🌟","¡XD! 😄 ¡Qué divertido! 🎊"];return a[Math.floor(Math.random()*a.length)]}return null},B=o=>{const e=["<br><br>💚 <em>Estoy aquí para ti siempre, amigo.</em> 😊","<br><br>🕊️ <em>Espero haberte ayudado.</em> ✨","<br><br>✨ <em>Confía en el proceso, Dios tiene el control.</em> 🙏","<br><br>🌟 <em>¡Sigue adelante, eres increíble!</em> 💪","<br><br>💙 <em>Recuerda: nunca estás solo.</em> 🫂","<br><br>🔥 <em>¡Tú puedes con todo!</em> 💯","<br><br>😊 <em>Que tengas un día maravilloso.</em> 🌈"];return Math.random()<.4?o+e[Math.floor(Math.random()*e.length)]:o},V=o=>{const e=G(o.toLowerCase());return/triste|deprimido|mal|llorar|llorando|sufro|sufriendo|dolor|angustia|solo|soledad/i.test(e)?d.empatica[Math.floor(Math.random()*d.empatica.length)]:/feliz|alegre|contento|bien|genial|excelente|super|bacan|bacano|chevere/i.test(e)?d.alegre[Math.floor(Math.random()*d.alegre.length)]:null},Me=Object.freeze(Object.defineProperty({__proto__:null,addPersonality:B,detectEmotion:V,generate:$e},Symbol.toStringTag,{value:"Module"})),W=o=>typeof o=="string"?o:o==null?"":String(o),Ee=o=>{const e=W(o).toLowerCase(),a=[];return/gracias|motivación|motívame|genial|increíble|mejor|lo máximo|cool|crack|top|pro|god|bacán|chévere|cómo estás|qué tal|adiós|chao|bye|feliz|te amo|me caes bien|hola|hey|buenas|qué onda|jaja|jeje|lol|xd/.test(e)&&a.push({name:"wiil",weight:.99,module:Me}),/dios|jesús|biblia|verso|oración|fe|espiritual|cristo|señor|padre nuestro|amén/.test(e)&&a.push({name:"fe",weight:.95,module:xe}),/\d+|ecuación|resolver|calcular|matemática|geometría|álgebra|raíz|fracción|porcentaje/.test(e)&&a.push({name:"math",weight:.9,module:Z}),/código|programar|javascript|python|html|css|función|variable|bug|error|develop/.test(e)&&a.push({name:"devs",weight:.9,module:ze}),/consejo|ayuda|cómo hacer|práctica|cotidiano|sentido común|realista|triste|solo|deprimido/.test(e)&&a.push({name:"life",weight:.8,module:le}),/historia|cuento|idea|inventa|creativo|metáfora|poema|canción|original/.test(e)&&a.push({name:"creatividad",weight:.8,module:ye}),/por qué|cómo funciona|explicar|razón|lógica|deducir|inferir|conclusión/.test(e)&&a.push({name:"razonamiento",weight:.7,module:ge}),/historia|ciencia|cultura|quién|qué es|cuándo|dónde|país|planeta|guerra/.test(e)&&a.push({name:"general",weight:.7,module:be}),a.push({name:"lenguaje",weight:.1,module:me}),a.push({name:"etica",weight:.3,module:ie}),k()&&a.push({name:"memoria",weight:.6,module:se}),a.sort((s,n)=>n.weight-s.weight),a},Se=async o=>{try{const e=W(o);P({role:"user",content:e});const a=Ee(e);console.debug("🧠 Mods:",a.map(t=>t.name));const s=F(e);if(!s.safe)return console.debug("🛡️ Ética:",s.reason),P({role:"assistant",content:s.response}),s.response;const n=V(e);let r=null;for(const{name:t,module:i}of a.slice(0,3))try{const c=await i.generate(e);if(console.debug(`↩️ ${t}:`,c),c&&typeof c=="string"){r=c,console.log(`✅ Respuesta generada por: ${t}`);break}}catch(c){console.warn(`⚠️ ${t}:`,c)}return r||(r=w(e),console.debug("🌐 fallback lenguaje")),n&&!a[0]?.name.includes("wiil")&&(r=`${n}<br><br>${r}`),a[0]?.name.includes("wiil")||(r=B(r)),P({role:"assistant",content:r}),r}catch(e){return console.error("❌ Brain.process:",e),"😔 Disculpa, tuve un problema procesando tu mensaje. Pero estoy aquí para ti, intenta de nuevo. 💚"}},Le=()=>'<div class="miia"><div class="miia_messages" id="miiaMessages"><div class="miia_empty"><div class="miia_welcome_icon"><img src="/smile.avif" alt="ChatWiil" class="welcome_avatar"></div><h2 class="miia_welcome_title">¡Hola! Soy ChatWiil 🕊️</h2><p class="miia_welcome_text">Tu asistente espiritual inteligente. Puedo ayudarte con <strong>matemáticas</strong>, darte <strong>consejos de vida</strong>, compartir <strong>reflexiones espirituales</strong> y mucho más. Háblame con confianza, estoy aquí para ti.</p><div class="miia_suggestions"><div class="suggestion_card" data-prompt="Me siento triste, ¿puedes ayudarme?"><i class="fas fa-heart"></i><span>Apoyo emocional</span></div><div class="suggestion_card" data-prompt="¿Puedes resolver esta ecuación: 2x + 5 = 15?"><i class="fas fa-calculator"></i><span>Matemáticas</span></div><div class="suggestion_card" data-prompt="Dame un verso bíblico de esperanza"><i class="fas fa-book-bible"></i><span>Reflexiones</span></div><div class="suggestion_card" data-prompt="¿Cómo puedo mejorar mi vida?"><i class="fas fa-lightbulb"></i><span>Consejos de vida</span></div></div></div></div><div class="miia_input_area"><div class="miia_input_wrapper"><textarea class="miia_input" id="miiaInput" placeholder="Escribe tu pregunta... 💚" rows="1"></textarea><button class="miia_send" id="miiaSend" disabled><i class="fas fa-paper-plane"></i></button></div><div class="miia_input_info"><span><i class="fas fa-info-circle"></i> Presiona <kbd>Enter</kbd> para enviar, <kbd>Shift + Enter</kbd> para nueva línea</span></div></div></div>',Te=()=>{const o=f("#miiaMessages"),e=f("#miiaInput"),a=f("#miiaSend");let s=!1,n=0,r=!0;const t=120,i=l=>String(l).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),c=l=>typeof l=="string"?i(l):"",u=l=>{!l&&!r||o.stop(!0).animate({scrollTop:o[0].scrollHeight},180)};o.on("scroll",function(){r=this.scrollHeight-this.scrollTop-this.clientHeight<=t}),e.on("input",function(){this.style.height="auto",this.style.height=Math.min(this.scrollHeight,120)+"px";const l=f(this).val().trim().length>0;a.prop("disabled",!l).toggleClass("active",l)});const m=(l,g,b=!1)=>{const z=new Date().toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"}),D=g==="user"?'<i class="fas fa-user-circle"></i>':'<img src="/smile.avif" alt="ChatWiil" class="message_avatar_img">',C=g==="user"?"Tú":"ChatWiil",$=c(l),j=g==="user"?$.replace(/\n/g,"<br>"):$,M=`<div class="miia_message ${g}" data-time="${z}"><div class="message_avatar">${D}</div><div class="message_content"><div class="message_header"><span class="message_name">${C}</span><span class="message_time">${z}</span></div><div class="message_text">${j}</div></div></div>`;o.append(M),u(b)},h=()=>{p(),o.append('<div class="miia_message ai typing"><div class="message_avatar"><img src="/smile.avif" alt="ChatWiil" class="message_avatar_img"></div><div class="message_content"><div class="message_text"><div class="typing_dots"><span></span><span></span><span></span></div></div></div></div>'),u()};function p(){f(".miia_message.typing").remove()}function x(l,g,b){const z=typeof l=="string"?l:"";if(!z.length){m("🤔 Lo siento, hubo un error al generar la respuesta.","ai",!0),b&&b();return}const D=new Date().toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"}),C='<img src="/smile.avif" alt="ChatWiil" class="message_avatar_img">',$=`typewriter_${Date.now()}_${++n}`;o.append(`<div class="miia_message ${g}" data-time="${D}"><div class="message_avatar">${C}</div><div class="message_content"><div class="message_header"><span class="message_name">ChatWiil</span><span class="message_time">${D}</span></div><div class="message_text" id="${$}"></div></div></div>`);const j=f(`#${$}`);if(!j.length){b&&b();return}let M=0;const U=12,N=()=>{if(M<z.length){const O=z[M];O===`
`?j.append("<br>"):j.append(i(O)),M++,u(),setTimeout(N,U)}else j.removeAttr("id"),b&&b()};u(),N()}const A=async()=>{const l=e.val().trim();if(!(!l||s)){f(".miia_empty").fadeOut(200,function(){f(this).remove()}),m(l,"user",!0),e.val("").css("height","auto").trigger("input"),s=!0,h();try{const g=await Se(l);console.debug("[ChatWiil] raw:",g);const b=typeof g=="string"?g:"";if(p(),!b)throw new Error("Respuesta vacía");x(b,"ai",()=>{s=!1})}catch(g){console.error("❌ Error procesando mensaje:",g),p(),m("😔 Disculpa, tuve un problema procesando tu mensaje. Por favor, intenta de nuevo. 💚","ai",!0),s=!1}}};e.on("keydown",l=>{l.key==="Enter"&&!l.shiftKey&&(l.preventDefault(),A())}),a.on("click",A),f(document).on("click",".suggestion_card",function(){const l=f(this).data("prompt");e.val(l).css("height","auto").trigger("input"),e.focus()}),console.log(`✅ ChatWiil IA ${Y} iniciado`)},we=()=>{f("#miiaInput,#miiaSend").off(),f(document).off("click",".suggestion_card"),console.log("🧹 ChatWiil IA limpiado")};export{we as cleanup,Te as init,Le as render};
