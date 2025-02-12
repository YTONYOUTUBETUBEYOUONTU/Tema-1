$(document).ready(function () {
    const API_BASE_URL = "https://tema-1.onrender.com";

    // Evento de envío del formulario de inicio de sesión
    $("#login-form").on("submit", function (e) {
        e.preventDefault(); // Evitar el envío del formulario de manera predeterminada
        const username = $("#username").val();
        const password = $("#password").val();

        // Llamada AJAX para verificar el usuario y contraseña
        $.ajax({
            url: `${API_BASE_URL}/usuarios`,
            method: "GET",
            success: function (usuarios) {
                const user = usuarios.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);

                if (user) {
                    localStorage.setItem("loggedIn", "true"); // Guardar estado de sesión en localStorage
                    window.location.href = "home.html"; // Redirigir al usuario a la página de inicio
                } else {
                    $("#error-msg").text("Usuario o contraseña incorrectos.").show(); // Mostrar mensaje de error
                }
            },
            error: function () {
                console.error("Error al conectarse a la base de datos.");
                $("#error-msg").text("Error al conectarse a la base de datos.").show(); // Mostrar mensaje de error de conexión
            },
        });
    });

    // Verificar si el usuario está logueado al cargar la página home.html
    if (window.location.pathname.includes("home.html")) {
        if (localStorage.getItem("loggedIn") !== "true") {
            window.location.href = "index.html"; // Redirigir al login si no está logueado
        }

        $("#logout-btn").on("click", function () {
            localStorage.removeItem("loggedIn"); // Limpiar el estado de sesión
            window.location.href = "index.html"; // Redirigir al login
        });
    }

  
    // Protección de la página home.html
    if (window.location.pathname.includes("home.html")) {
        if (localStorage.getItem("loggedIn") !== "true") {
            window.location.href = "index.html";
        }
  
        $("#logout-btn").on("click", function () {
            localStorage.removeItem("loggedIn");
            window.location.href = "index.html";
        });
    }
  
    // Cargar refacciones
    function cargarRefacciones() {
        $.ajax({
            url: `${API_BASE_URL}/refacciones`,
            method: "GET",
            success: function (data) {
                const tbody = $("#refacciones-tbody");
                tbody.empty();
  
                data.forEach((refaccion) => {
                    const row = `
                        <tr>
                            <td>${refaccion.nombre}</td>
                            <td>${refaccion.categoria}</td>
                            <td>${refaccion.precio}</td>
                            <td>
                                <a href="#" onclick="mostrarModal('${refaccion.id}', '${refaccion.nombre}', '${refaccion.categoria}', '${refaccion.precio}')">Editar</a>
                                <a href="#" onclick="eliminarRefaccion('${refaccion.id}')">Eliminar</a>
                            </td>
                        </tr>
                    `;
                    tbody.append(row);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar las refacciones:", error);
            },
        });
    }
  
    // Agregar refacción
    $("#refaccion-form").on("submit", function (e) {
        e.preventDefault();
  
        const refaccion = {
            nombre: $("#nombre").val(),
            categoria: $("#categoria").val(),
            precio: $("#precio").val(),
        };
  
        $.ajax({
            url: `${API_BASE_URL}/refacciones`,
            method: "POST",
            data: JSON.stringify(refaccion),
            contentType: "application/json",
            dataType: "json",
            success: function () {
                $("#refaccion-form")[0].reset();
                cargarRefacciones();
            },
            error: function (err) {
                console.error("Error al agregar la refacción:", err);
            },
        });
    });
  
    // Eliminar refacción
    window.eliminarRefaccion = function (id) {
        $.ajax({
            url: `${API_BASE_URL}/refacciones/${id}`,
            method: "DELETE",
            success: function () {
                cargarRefacciones();
            },
            error: function (err) {
                console.error("Error al eliminar la refacción:", err);
            },
        });
    };
  
    // Editar refacción
    $("#updateRefaccion-form").on("submit", function (e) {
        e.preventDefault();
  
        const id = $("#edit-id").val();
        const updatedRefaccion = {
            nombre: $("#update-nombre").val(),
            categoria: $("#update-categoria").val(),
            precio: $("#update-precio").val(),
        };
  
        $.ajax({
            url: `${API_BASE_URL}/refacciones/${id}`,
            method: "PATCH",
            data: JSON.stringify(updatedRefaccion),
            contentType: "application/json",
            dataType: "json",
            success: function () {
                cargarRefacciones();
                $("#edit-page").hide();
                $("#main-page").show();
            },
            error: function (err) {
                console.error("Error al actualizar la refacción:", err);
            },
        });
    });
  
    // Cargar refacciones al iniciar
    cargarRefacciones();
  });
  