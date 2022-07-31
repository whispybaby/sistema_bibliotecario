import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
const firebaseConfig = {
    databaseURL: "https://biblioteca-f5cb6-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

const formulario = document.getElementById('formulario')

const guardar = document.getElementById("guardar")
guardar.addEventListener("click", (evento) => {
    evento.preventDefault()    
    let id = formulario['id']
    let nombre = formulario['nombre']
    let apellido = formulario['apellido']
    let rol = formulario['rol']

    set(ref(database, `usuarios/${id.value}`), {
        id: id.value,
        nombre: nombre.value,
        apellido: apellido.value,
        rol: rol.value
})
})