import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
const firebaseConfig = {
    databaseURL: "https://biblioteca-f5cb6-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

onValue(ref(database, 'prestamos/'), (snapshot) => {
    const data = snapshot.val()
    const lista = document.getElementById('lista-prestamos')
    lista.innerHTML = `
        <div class="div-table-row div-table-head">
            <div class="div-table-cell">Id préstamo</div>
            <div class="div-table-cell">Libro</div>
            <div class="div-table-cell">Usuario</div>
            <div class="div-table-cell">Fecha de préstamo</div>
            <div class="div-table-cell">Estado</div>
            <div class="div-table-cell">Actualizar</div>
            <div class="div-table-cell">Eliminar</div>
        </div>
        `

    // Aquí hay un error, es de parte de firebase porque en la respuesta hay un
    // dato vacío que no debería estar ahí
    for (let prestamo of data) {
        if (prestamo === undefined) {
            continue
        }
        let div = document.createElement('div')
        div.classList.add('div-table-row')
        div.innerHTML = `
            <div class="div-table-cell">${prestamo.codigo}</div>
            <div class="div-table-cell">${prestamo.libro}</div>
            <div class="div-table-cell">${prestamo.usuario}</div>
            <div class="div-table-cell">${prestamo.fecha}</div>
            <div class="div-table-cell">${prestamo.estado}</div>
            <div class="div-table-cell">
                <button class="btn btn-success"><i class="zmdi zmdi-refresh"></i></button>
            </div>
            <div class="div-table-cell">
                <button class="btn btn-danger"><i class="zmdi zmdi-delete"></i></button>
            </div>
            `
        lista.appendChild(div)
    }
})
