$(document).ready(function () {
  // Función para cargar las refacciones a la tabla
  function cargarRefacciones() {
      $.ajax({
          url: "https://tema-1.onrender.com/refacciones",
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

  // Función para agregar una refacción a la BD
  $("#refaccion-form").on("submit", function (e) {
      e.preventDefault();

      const refaccion = {
          nombre: $('#nombre').val(),
          categoria: $('#categoria').val(),
          precio: $('#precio').val(),
      };

      $.ajax({
          url: "https://tema-1.onrender.com/refacciones",
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

  // Función para eliminar una refacción
  window.eliminarRefaccion = function (id) {
      $.ajax({
          url: `https://tema-1.onrender.com/refacciones/${id}`,
          method: "DELETE",
          success: function () {
              cargarRefacciones();
          },
          error: function (err) {
              console.error("Error al eliminar la refacción:", err);
          },
      });
  };

  // Función para mostrar el modal con la información de la refacción
  window.mostrarModal = function (id, nombre, categoria, precio) {
      $("#update-nombre").val(nombre);
      $("#update-categoria").val(categoria);
      $("#update-precio").val(precio);

      $('#updateRefaccion-form').off('submit').on('submit', function (e) {
          e.preventDefault();
          const updatedRefaccion = {
              nombre: $("#update-nombre").val(),
              categoria: $("#update-categoria").val(),
              precio: $("#update-precio").val(),
          };
          $.ajax({
              url: `https://tema-1.onrender.com/refacciones/${id}`,
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

  // Cargar las refacciones al iniciar la página
  cargarRefacciones();
});
