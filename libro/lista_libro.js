import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, set, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
const firebaseConfig = {
    databaseURL: "https://biblioteca-f5cb6-default-rtdb.firebaseio.com",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

onValue(ref(database, 'libros/'), (respuesta) => {
    const lista = document.getElementById('lista-libros')
    const libros = respuesta.val()
    if (libros === null || libros.length === 0) {
        lista.innerHTML = ''
        return
    }
    // Contenido inicial de la lista
    lista.innerHTML = `
        <div class="div-table-row div-table-head">
            <div class="div-table-cell">Id </div>
            <div class="div-table-cell">Editorial</div>
            <div class="div-table-cell">Autor</div>
            <div class="div-table-cell">Categoria</div>
            <div class="div-table-cell">Nombre</div>
            <div class="div-table-cell">Fecha</div>
            <div class="div-table-cell">Actualizar</div>
            <div class="div-table-cell">Eliminar</div>
        </div>
    `
    for (let libro of Object.values(libros)) {
        if (libro === undefined) {
            continue
        }
        const div = document.createElement('div')
        div.classList.add('div-table-row')
        div.id = libro.id

        div.innerHTML = `
            <div class="div-table-cell">${libro.id}</div>
            <div class="div-table-cell">${libro.editorial}</div>
            <div class="div-table-cell">${libro.autor}</div>
            <div class="div-table-cell">${libro.categoria}</div>
            <div class="div-table-cell">${libro.nombre}</div>
            <div class="div-table-cell">${libro.fecha}</div>
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
                set(ref(database, `libros/${libro.id}`), {
                    id: libro.id,
                    editorial: formulario_modal['editorial'].value,
                    autor: formulario_modal['autor'].value,
                    categoria: formulario_modal['categoria'].value,
                    nombre: formulario_modal['nombre'].value,
                    fecha: formulario_modal['fecha'].value,

                })
                modal.close()
            })
            const cancelar = document.getElementById('modal-cancelar')
            cancelar.addEventListener('click', () => {
                modal.close()
            }) 
        })
        div.children[6].appendChild(actualizar)

        const eliminar = document.createElement('button')
        eliminar.classList.add('btn', 'btn-danger')
        eliminar.innerHTML = '<i class="zmdi zmdi-delete"></i>'
        eliminar.addEventListener('click', () => {
            // Borrar de la página
            document.getElementById(libro.id).remove()
            // Borrar de la base de datos
            remove(ref(database, `libros/${libro.id}`))
        })
        div.children[7].appendChild(eliminar)

        lista.appendChild(div)
    }
})
 