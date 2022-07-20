import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js'
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js'

const firebaseConfig = {
  databaseURL: 'https://biblioteca-f5cb6-default-rtdb.firebaseio.com/'
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

const formulario = document.getElementById('formulario-estado')

const subir = document.getElementById('subir')
subir.addEventListener('click', (event) => {
    event.preventDefault()
    let codigo = formulario['codigo'].value
    let nombre = formulario['nombre'].value
    set(ref(database, 'estados/' + codigo), {
        codigo: codigo,
        nombre: nombre
    })
})
