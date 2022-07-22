import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, set, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
const firebaseConfig = {
    databaseURL: "https://biblioteca-f5cb6-default-rtdb.firebaseio.com",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

onValue(ref(database, 'prestamos/'), (respuesta) => {
    const lista = document.getElementById('lista-prestamos')
    const prestamos = respuesta.val()
    if (prestamos === null || prestamos.length === 0) {
        lista.innerHTML = ''
        return
    }
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
    for (let prestamo of prestamos) {
        if (prestamo === undefined) {
            continue
        }
        const div = document.createElement('div')
        div.classList.add('div-table-row')
        div.id = prestamo.id

        div.innerHTML = `
            <div class="div-table-cell">${prestamo.id}</div>
            <div class="div-table-cell">${prestamo.libro}</div>
            <div class="div-table-cell">${prestamo.usuario}</div>
            <div class="div-table-cell">${prestamo.fecha}</div>
            <div class="div-table-cell">${prestamo.estado}</div>
            <div class="div-table-cell"></div>
            <div class="div-table-cell"></div>
        `

        const actualizar = document.createElement('button')
        actualizar.classList.add('btn', 'btn-success')
        actualizar.innerHTML = '<i class="zmdi zmdi-refresh"></i>'
        actualizar.addEventListener('click', () => {
            // Actualizar
            const modal = document.getElementById('modal')
            modal.showModal()
            const guardar = document.getElementById('modal-guardar')
            guardar.addEventListener('click', () => {
                // Modificar los datos
                const formulario_modal = document.getElementById('formulario-modal')
                set(ref(database, `prestamos/${prestamo.id}`), {
                    id: prestamo.id,
                    libro: formulario_modal['libro'].value,
                    usuario: formulario_modal['usuario'].value,
                    fecha: formulario_modal['fecha-prestamo'].value,
                    estado: formulario_modal['estado'].value
                })
                modal.close()
            })
            const cancelar = document.getElementById('modal-cancelar')
            cancelar.addEventListener('click', () => {
                modal.close()
            })
            // Rellenar el formulario del modal
            const prestamo_a_modificar = document.getElementById(prestamo.id)
            const libro = prestamo_a_modificar.children[1]
            const usuario = prestamo_a_modificar.children[2]
            const fecha = prestamo_a_modificar.children[3]
            const estado = prestamo_a_modificar.children[4]
            const formulario_modal = document.getElementById('formulario-modal')
            formulario_modal['libro'].value = libro.innerText
            formulario_modal['usuario'].value = usuario.innerText
            formulario_modal['fecha-prestamo'].value = fecha.innerText
            formulario_modal['estado'].value = estado.innerText
        })
        div.children[5].appendChild(actualizar)

        const eliminar = document.createElement('button')
        eliminar.classList.add('btn', 'btn-danger')
        eliminar.innerHTML = '<i class="zmdi zmdi-delete"></i>'
        eliminar.addEventListener('click', () => {
            // Borrar de la página
            document.getElementById(prestamo.id).remove()
            // Borrar de la base de datos
            remove(ref(database, `prestamos/${prestamo.id}`))
        })
        div.children[6].appendChild(eliminar)

        lista.appendChild(div)
    }
})
