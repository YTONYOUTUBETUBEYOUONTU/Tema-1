$(document).ready(function () {
  const API_BASE_URL = "https://tema-1.onrender.com";

  // ✅ LOGIN
  $("#login-form").on("submit", function (e) {
      e.preventDefault();
      const username = $("#username").val();
      const password = $("#password").val();

      // Verificar usuario contra la base de datos
      $.ajax({
          url: `${API_BASE_URL}/usuarios`,
          method: "GET",
          success: function (usuarios) {
              const user = usuarios.find(
                  (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
              );

              if (user) {
                  localStorage.setItem("loggedIn", "true");
                  window.location.href = "home.html";
              } else {
                  $("#error-msg").text("Usuario o contraseña incorrectos.");
              }
          },
          error: function () {
              console.error("Error al conectarse a la base de datos.");
          },
      });
  });

  // ✅ PROTECCIÓN DE LA PÁGINA home.html
  if (window.location.pathname.includes("home.html")) {
      if (localStorage.getItem("loggedIn") !== "true") {
          window.location.href = "index.html";
      }

      $("#logout-btn").on("click", function () {
          localStorage.removeItem("loggedIn");
          window.location.href = "index.html";
      });
  }

  // ✅ CARGAR REFACCIONES
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

  // ✅ AGREGAR REFACCIÓN
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

  // ✅ ELIMINAR REFACCIÓN
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

  // ✅ EDITAR REFACCIÓN
  window.mostrarModal = function (id, nombre, categoria, precio) {
      $("#update-nombre").val(nombre);
      $("#update-categoria").val(categoria);
      $("#update-precio").val(precio);

      $("#updateRefaccion-form").off("submit").on("submit", function (e) {
          e.preventDefault();
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
              },
              error: function (err) {
                  console.error("Error al actualizar la refacción:", err);
              },
          });
      });
  };

  // ✅ CARGAR REFACCIONES AL INICIAR
  if ($("#refacciones-tbody").length) {
      cargarRefacciones();
  }
});
