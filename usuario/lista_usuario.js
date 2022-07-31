import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, set, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
const firebaseConfig = {
    databaseURL: "https://biblioteca-f5cb6-default-rtdb.firebaseio.com",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

onValue(ref(database, 'usuarios/'), (respuesta) => {
    const lista = document.getElementById('lista-usuarios')
    const usuarios = respuesta.val()
    if (usuarios === null || usuarios.length === 0) {
        lista.innerHTML = ''
        return
    }
    // Contenido inicial de la lista
    lista.innerHTML = `
        <div class="div-table-row div-table-head">
            <div class="div-table-cell">Id </div>
            <div class="div-table-cell">Nombre</div>
            <div class="div-table-cell">Apellido</div>
            <div class="div-table-cell">Rol</div>
            <div class="div-table-cell">Actualizar</div>
            <div class="div-table-cell">Eliminar</div>
        </div>
    `
    for (let usuario of Object.values(usuarios)) {
        if (usuario === undefined) {
            continue
        }
        const div = document.createElement('div')
        div.classList.add('div-table-row')
        div.id = usuario.id

        div.innerHTML = `
            <div class="div-table-cell">${usuario.id}</div>
            <div class="div-table-cell">${usuario.nombre}</div>
            <div class="div-table-cell">${usuario.apellido}</div>
            <div class="div-table-cell">${usuario.rol}</div>
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
                set(ref(database, `usuarios/${usuario.id}`), {
                    id: usuario.id,
                    nombre: formulario_modal['nombre'].value,
                    apellido: formulario_modal['apellido'].value,
                    rol: formulario_modal['rol'].value,
                })
                modal.close()
            })
            const cancelar = document.getElementById('modal-cancelar')
            cancelar.addEventListener('click', () => {
                modal.close()
            }) 
        })
        div.children[4].appendChild(actualizar)

        const eliminar = document.createElement('button')
        eliminar.classList.add('btn', 'btn-danger')
        eliminar.innerHTML = '<i class="zmdi zmdi-delete"></i>'
        eliminar.addEventListener('click', () => {
            // Borrar de la página
            document.getElementById(usuario.id).remove()
            // Borrar de la base de datos
            remove(ref(database, `usuarios/${usuario.id}`))
        })
        div.children[5].appendChild(eliminar)

        lista.appendChild(div)
    }
})
 