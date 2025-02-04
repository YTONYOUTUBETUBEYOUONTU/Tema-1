function cargarRefacciones() {
    $.ajax({
        url: "http://localhost:3001/refacciones",
        method: "GET",
        success: function (data) {
            const tbody = $("#refacciones-tbody");
            tbody.empty();

            data.forEach(refaccion => {
                const row = `
                <tr>
                    <td>${refaccion.nombre}</td>
                    <td>${refaccion.categoria}</td>
                    <td>${refaccion.precio}</td>
                    <td>
                    <a href="#updateModal" data-rel="popup" data-transition="pop" onclick="editarRefaccion('${refaccion.id}', '${refaccion.nombre}', '${refaccion.categoria}', '${refaccion.precio}')">Editar</a>
                    <a href="#" onclick="eliminarRefaccion('${refaccion.id}')">Eliminar</a>
                    </td>
                </tr>
                `;
                tbody.append(row);
            });
        },
        error: function () {
            console.error("Error al cargar las refacciones");
        },
        complete: function () {
            console.log("Carga de refacciones completada");
        }
    });
}

$('#refaccion-form').on('submit', function (e) {
    e.preventDefault();

    if (!nombre || !categoria || !precio) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const refaccion = {
        nombre: $('#nombre').val(),
        categoria: $('#categoria').val(),
        precio: $('#precio').val(),
    };

    $.ajax({
        url: "http://localhost:3001/refacciones",
        method: "POST",
        data: JSON.stringify(refaccion),
        contentType: "application/json",
        dataType: "json",
        success: function () {
            console.log("Refacción agregada correctamente");
            cargarRefacciones();
            $('#refaccion-form').trigger('reset');
        },
        error: function (err) {
            console.error('Error al agregar la refacción:', err.responseJSON.message);
        }
    });
});

function eliminarRefaccion(id) {
    if (!id) {
        console.error('ID inválido para eliminar refacción');
        return;
    }
    $.ajax({
        url: `http://localhost:3001/refacciones/${id}`,
        method: "DELETE",
        success: function () {
            console.log("Refacción eliminada correctamente");
            cargarRefacciones();
        },
        error: function (err) {
            console.error('Error al eliminar la refacción:', err.responseJSON.message);
        }
    });
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
    setTimeout(function () {
        const updateForm = document.getElementById('updateRefaccion-form');
        if (updateForm) {
            updateForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const nombre = document.getElementById('update-nombre').value;
                const categoria = document.getElementById('update-categoria').value;
                const precio = document.getElementById('update-precio').value;
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
        } else {
            console.error('No se encontró el elemento "update-form"');
        }
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('updateModal');
    modal.style.display = 'none';
}

// Cargar refacciones al inicio
cargarRefacciones();
