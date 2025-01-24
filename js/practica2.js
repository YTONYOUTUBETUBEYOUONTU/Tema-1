class Refaccion {
    constructor(nombre, categoria, precio) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = parseFloat(precio).toFixed(2);
    }
}

class GestorRefacciones {
    constructor() {
        this.refacciones = [];
        this.refaccion_A_Actualizar = null;
    }

    agregarRefaccion(refaccion) {
        this.refacciones.push(refaccion);
        this.mostrarRefacciones();
    }

    eliminarRefaccion(index) {
        this.refacciones.splice(index, 1);
        this.mostrarRefacciones();
    }

    editarRefaccion(index) {
        this.refaccion_A_Actualizar = this.refacciones[index];
        this.abrirModal(this.refaccion_A_Actualizar);
    }

    abrirModal(refaccion) {
        const modal = document.getElementById('updateModal'); // Corregido ID aquí
        modal.style.display = 'block';
        document.getElementById('update-nombre').value = refaccion.nombre;
        document.getElementById('update-categoria').value = refaccion.categoria;
        document.getElementById('update-precio').value = refaccion.precio;
    }

    actualizarRefaccion(refaccion, nombre, categoria, precio) {
        refaccion.nombre = nombre;
        refaccion.categoria = categoria;
        refaccion.precio = parseFloat(precio).toFixed(2);
        this.mostrarRefacciones();
    }

    mostrarRefacciones() {
        const tbody = document.querySelector('#refacciones-tbody');
        tbody.innerHTML = '';
        this.refacciones.forEach((refaccion, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${refaccion.nombre}</td>
                <td>${refaccion.categoria}</td>
                <td>${refaccion.precio}</td>
                <td class="actions">
                    <button onclick="gestor.editarRefaccion(${index})">Editar</button>
                    <button onclick="gestor.eliminarRefaccion(${index})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

const gestor = new GestorRefacciones();

document.getElementById('refaccion-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;

    const nuevaRefaccion = new Refaccion(nombre, categoria, precio);
    gestor.agregarRefaccion(nuevaRefaccion);

    this.reset();
});

document.getElementById('reset-btn').addEventListener('click', function () {
    gestor.refacciones = [];
    gestor.mostrarRefacciones();
});

function closeModal() {
    document.getElementById('updateModal').style.display = 'none'; // Corregido ID aquí
}

document.getElementById('updateRefaccion-form').addEventListener('submit', function (e) {
    e.preventDefault();

    if (gestor.refaccion_A_Actualizar) {
        const nombre = document.getElementById('update-nombre').value;
        const categoria = document.getElementById('update-categoria').value;
        const precio = document.getElementById('update-precio').value;
        gestor.actualizarRefaccion(gestor.refaccion_A_Actualizar, nombre, categoria, precio);
        closeModal();
    }
});

document.getElementById('close-modal').addEventListener('click', closeModal); // Agregado para cerrar el modal al hacer clic en el botón de cierre
