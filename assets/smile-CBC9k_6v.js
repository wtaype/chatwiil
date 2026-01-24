import{j as s}from"./vendor-gzd0YkcT.js";import{d as f}from"./firebase-C1S9xoXl.js";import{g as p,d,T as l,a as v,b as h}from"./firebase-ubgRiFlb.js";import{g as r,s as u,f as m,N as o,b,S as g}from"./main-CGVbTXB5.js";import"./main-b6Xzzyl4.js";let e=r("wiSmile");const i="wiNotas",k=async()=>{const c=r(i),a=c?.fechaUpdate?m(l).get(c.fechaUpdate,"DD/MM/YYYY HH:mm"):"Sin notas";return`
   <div class="miweb">
    <div class="mhead"><h1 class="mh1"><i class="fas fa-sticky-note"></i> ${g()} ${e.nombre}</h1></div>
    <div class="mibody">
     <textarea class="nota-text" placeholder="Empieza escribir tus notas">${c?.notas||""}</textarea>
     <div class="nota-footer">
      <span class="nota-fecha"><i class="far fa-clock"></i> ${c?.fechaCreacion?"Actualizado":"Nota creada"}: ${a}</span>
      <div class="nota-btns">
       <button class="btn btn-save"><i class="fas fa-save"></i> Guardar</button>
       <button class="btn btn-delete"><i class="fas fa-trash"></i> Eliminar</button>
      </div>
     </div>
    </div>
   </div>`},C=async()=>{if(!r(i))try{const a=await p(d(f,"misnotas",e.usuario));if(a.exists()){const t=a.data();s(".nota-text").val(t.notas),u(i,t),s(".nota-fecha").html(`<i class="far fa-clock"></i> Actualizado: ${m(l).get(t.fechaUpdate,"DD/MM/YYYY HH:mm")}`),o("✅ Notas cargadas","success")}}catch(a){console.error(a),o("❌ Error al cargar","error")}s(".btn-save").click(async function(){const a=s(".nota-text").val().trim();if(!a)return o("⚠️ Escribe algo primero","warning");b(this,!0);try{const t=r(i);await v(d(f,"misnotas",e.usuario),{email:e.email,usuario:e.nombre,notas:a,fechaUpdate:h(),...!t?.fechaCreacion&&{fechaCreacion:h()}},{merge:!0});const n=Date.now();u(i,{email:e.email,usuario:e.nombre,notas:a,fechaUpdate:n,fechaCreacion:t?.fechaCreacion||n}),s(".nota-fecha").html(`<i class="far fa-clock"></i> Actualizado: ${m(l).get(n,"DD/MM/YYYY HH:mm")}`),o("✅ Guardado exitosamente!","success")}catch(t){console.error(t),o("❌ Error al guardar","error")}finally{b(this,!1)}}),s(".btn-delete").click(function(){confirm("¿Eliminar todas las notas?")&&(s(".nota-text").val(""),s(".nota-fecha").html('<i class="far fa-clock"></i> Nota creada: Sin notas'),o("🗑️ Notas eliminadas","info"))})},E=()=>{console.log("😊 Smile limpiado")};export{E as cleanup,C as init,k as render,e as smile};
