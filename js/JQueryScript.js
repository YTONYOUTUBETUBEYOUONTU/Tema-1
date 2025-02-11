// Configuración de la API
const API_BASE_URL = "https://tema-1.onrender.com";

// Función para cargar refacciones
function cargarRefacciones(filtroCategoria = "") {
  $.ajax({
    url: `${API_BASE_URL}/refacciones`,
    method: "GET",
    success: function (data) {
      const tbody = $("#refacciones-tbody");
      tbody.empty();

      data.forEach((refaccion) => {
        if (filtroCategoria && refaccion.categoria_nombre !== filtroCategoria) return;

        let estado = "Disponible";
        let clase = "";

        if (refaccion.stock_disponible == 0) {
          estado = "NO DISPONIBLE";
          clase = "agotado";
        } else if (refaccion.stock_disponible < 5 && refaccion.stock_disponible != 0) {
          estado = "Stock bajo";
          clase = "stock-bajo";
        }

        const row = `
          <tr class="${clase}">
            <td>${refaccion.nombre}</td>
            <td>${refaccion.categoria_nombre}</td>
            <td>${refaccion.precio}</td>
            <td>${refaccion.stock_disponible}</td>
            <td>${estado}</td>
            <td>
              <button onclick="mostrarModal('${refaccion.id}', '${refaccion.nombre}', '${refaccion.categoria_nombre}', '${refaccion.precio}', '${refaccion.stock_disponible}')">Editar</button>
              <button onclick="eliminarRefaccion('${refaccion.id}')">Eliminar</button>
            </td>
          </tr>`;
        tbody.append(row);
      });
    },
    error: function (err) {
      console.error("Error al cargar las refacciones:", err);
    }
  });
}

// Función para cargar categorías
function cargarCategorias(callback) {
  $.ajax({
    url: `${API_BASE_URL}/categorias`,
    method: "GET",
    success: function (data) {
      const tbody = $("#categorias-tbody");
      const select = $("#categoria-refaccion, #filtro-categoria, #update-categoria");
      tbody.empty();
      select.empty().append('<option value="">Todas las Categorías</option>');

      data.forEach((categoria) => {
        const row = `<tr><td>${categoria.nombre}</td></tr>`;
        tbody.append(row);
        select.append(`<option value="${categoria.nombre}">${categoria.nombre}</option>`);
      });

      if (typeof callback === "function") {
        callback(); // Asegura que el modal se abra después de cargar las categorías
      }
    },
    error: function (err) {
      console.error("Error al cargar las categorías:", err);
    }
  });
}

// Función para agregar una nueva categoría
$("#categoria-form").on("submit", function (e) {
  e.preventDefault();
  const categoria = { nombre: $('#nombre-categoria').val() };

  $.ajax({
    url: `${API_BASE_URL}/categorias`,
    method: "POST",
    data: JSON.stringify(categoria),
    contentType: "application/json",
    success: function () {
      $("#categoria-form")[0].reset();
      $.mobile.changePage("#home-page");
      cargarCategorias();
    },
    error: function (err) {
      console.error("Error al agregar la categoría:", err);
    }
  });
});

// Función para agregar una refacción
$("#refaccion-form").on("submit", function (e) {
  e.preventDefault();

  const refaccion = {
    nombre: $('#nombre-refaccion').val(),
    categoria_nombre: $('#categoria-refaccion').val(),
    precio: $('#precio-refaccion').val(),
    stock_disponible: $('#stock-refaccion').val()
  };

  $.ajax({
    url: `${API_BASE_URL}/refacciones`,
    method: "POST",
    data: JSON.stringify(refaccion),
    contentType: "application/json",
    success: function () {
      $("#refaccion-form")[0].reset();
      $.mobile.changePage("#home-page");
      cargarRefacciones();
    },
    error: function (err) {
      console.error("Error al agregar la refacción:", err);
    }
  });
});

// Filtro por categoría
$("#filtro-categoria").on("change", function () {
  const filtro = $(this).val();
  cargarRefacciones(filtro);
});

// Cargar datos al iniciar la página
$(document).on('pageinit', function () {
  cargarRefacciones();
  cargarCategorias();
});

// ✅ ELIMINAR REFACCIÓN
window.eliminarRefaccion = function (id) {
  if (confirm("¿Estás seguro de que deseas eliminar esta refacción?")) {
    $.ajax({
      url: `${API_BASE_URL}/refacciones/${id}`,
      method: "DELETE",
      success: function () {
        cargarRefacciones();
        alert("Refacción eliminada exitosamente.");
      },
      error: function (err) {
        console.error("Error al eliminar la refacción:", err);
      },
    });
  }
};

// ✅ EDITAR REFACCIÓN
window.mostrarModal = function (id, nombre, categoria, precio, stock) {
  cargarCategorias(function() {
    $("#update-nombre").val(nombre);
    $("#update-categoria").val(categoria);
    $("#update-precio").val(precio);
    $("#update-stock").val(stock);

    const modal = $("#update-modal");

    if (modal.length) { // Verificar que el modal existe
      if (!modal.hasClass("ui-popup")) {
        modal.enhanceWithin().popup();
      }

      modal.popup("open");
    } else {
      console.error("Modal #update-modal no encontrado en el DOM.");
    }

    $("#updateRefaccion-form").off("submit").on("submit", function (e) {
      e.preventDefault();
      const updatedRefaccion = {
        nombre: $("#update-nombre").val(),
        categoria_nombre: $("#update-categoria").val(),
        precio: $("#update-precio").val(),
        stock_disponible: $("#update-stock").val()
      };

      $.ajax({
        url: `${API_BASE_URL}/refacciones/${id}`,
        method: "PATCH",
        data: JSON.stringify(updatedRefaccion),
        contentType: "application/json",
        dataType: "json",
        success: function () {
          cargarRefacciones();
          modal.popup("close");
          alert("Refacción actualizada exitosamente.");
        },
        error: function (err) {
          console.error("Error al actualizar la refacción:", err);
        },
      });
    });
  });
};

// Filtro por categoría
$("#filtro-categoria").on("change", function () {
  const filtro = $(this).val();
  cargarRefacciones(filtro);
});

// Cargar datos al iniciar la página
$(document).on('pageinit', function () {
  cargarRefacciones();
  cargarCategorias();

  // Inicializar el modal al cargar la página
  const modal = $("#update-modal");
  if (modal.length) {
    modal.enhanceWithin().popup();
  }
});