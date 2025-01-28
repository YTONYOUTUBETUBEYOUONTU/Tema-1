function cargarRefacciones() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3001/refacciones', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const tbody = document.getElementById('refacciones-tbody');
            tbody.innerHTML = '';

            data.forEach(refaccion => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${refaccion.nombre}</td>
                    <td>${refaccion.categoria}</td>
                    <td>${refaccion.precio}</td>
                    <td class="actions">
                        <button onclick="editarRefaccion('${refaccion.id}')">Editar</button>
                        <button onclick="eliminarRefaccion('${refaccion.id}')">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } else {
            console.error('Error al cargar las refacciones');
        }
    };

    xhr.onerror = function () {
        console.error('Error de conexión con el servidor');
    };

    xhr.send();
}

document.getElementById('refaccion-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;

    if (!nombre || !categoria || !precio) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const refaccion = {
        nombre: nombre,
        categoria: categoria,
        precio: parseFloat(precio),
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3001/refacciones', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 201) {
            console.log('Refacción agregada correctamente');
            cargarRefacciones();
            document.getElementById('refaccion-form').reset();
        } else {
            console.error('Error al agregar la refacción');
        }
    };
    xhr.onerror = function () {
        console.error('Error de conexión con el servidor');
    };
    xhr.send(JSON.stringify(refaccion));
});

function eliminarRefaccion(id) {
    if (!id) {
        console.error('ID inválido para eliminar refacción');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:3001/refacciones/${id}`, true);
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 204) {
            console.log('Refacción eliminada correctamente');
            cargarRefacciones();
        } else {
            console.error(`Error al eliminar la refacción: ${xhr.responseText}`);
        }
    };
    xhr.onerror = function () {
        console.error('Error de conexión con el servidor');
    };
    xhr.send();
}

function editarRefaccion(id) {
    if (!id) {
        console.error('ID inválido para editar refacción');
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3001/refacciones/${id}`, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const refaccion = JSON.parse(xhr.responseText);
            document.getElementById('update-nombre').value = refaccion.nombre;
            document.getElementById('update-categoria').value = refaccion.categoria;
            document.getElementById('update-precio').value = refaccion.precio;
            document.getElementById('update-id').value = refaccion.id;
        } else {
            console.error(`Error al cargar la refacción: ${xhr.responseText}`);
        }
    };
    xhr.onerror = function () {
        console.error('Error de conexión con el servidor');
    };
    xhr.send();
    const modal = document.getElementById('updateModal');
    modal.style.display = 'block';
    document.getElementById('update-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = document.getElementById('update-nombre').value;
        const categoria = document.getElementById('update-categoria').value;
        const precio = document.getElementById('update-precio').value;
        if (!nombre ||!categoria ||!precio) {
            alert('Todos los campos son obligatorios.');
            return;
        }
        const refaccion = {
            nombre: nombre,
            categoria: categoria,
            precio: parseFloat(precio),
        };
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `http://localhost:3001/refacciones/${document.getElementById('update-id').value}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('Refacción actualizada correctamente');
                cargarRefacciones();
                closeModal();
            } else {
                console.error(`Error al actualizar la refacción: ${xhr.responseText}`);
            }
        };
        xhr.onerror = function () {
            console.error('Error de conexión con el servidor');
        };
        xhr.send(JSON.stringify(refaccion));
    });
}

function closeModal() {
    const modal = document.getElementById('updateModal');
    modal.style.display = 'none';
}

// Cargar refacciones al inicio
cargarRefacciones();
