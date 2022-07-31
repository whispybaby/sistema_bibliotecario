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
    let autor = formulario['autor']
    let categoria = formulario['categoria']
    let editorial = formulario['editorial']
    let nombre = formulario['nombre']
    let fecha = formulario['fecha']

    set(ref(database, `libros/${id.value}`), {
        id: id.value,
        autor: autor.value,
        categoria: categoria.value,
        editorial: editorial.value,
        nombre: nombre.value,
        fecha: fecha.value
})
})