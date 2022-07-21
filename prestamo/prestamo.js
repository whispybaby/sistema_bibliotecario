import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
const firebaseConfig = {
    databaseURL: "https://biblioteca-f5cb6-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

const formulario = document.getElementById('formulario-prestamo')

const subir = document.getElementById('subir')
subir.addEventListener('click', (event) => {
    event.preventDefault()
    let id = formulario['id']
    let libro = formulario['libro']
    let usuario = formulario['usuario']
    let estado = formulario['estado']
    let fecha = formulario['fecha-prestamo']

    set(ref(database, `prestamos/${id.value}`), {
        codigo: id.value,
        libro: libro.value,
        usuario: usuario.value,
        estado: estado.value,
        fecha: fecha.value
    })
})
