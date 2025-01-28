# Tema-1

## Práctica 1: Clases, funciones y constructores

Descripción
Esta práctica se enfoca en la creación de clases, funciones y constructores en JavaScript. Se explora la forma de imprimir y clonar objetos.

* Funcionalidades
* Creación de clases y objetos
* Definición de constructores y métodos
* Uso de funciones para realizar operaciones
* Impresión y clonación de objetos

Código relevante

`// Ejemplo de clase y constructor
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    console.log(`Hola, me llamo ${this.nombre} y tengo ${this.edad} años.`);
  }
}

// Creación de un objeto Persona
const persona = new Persona('Juan', 25);
persona.saludar(); // Hola, me llamo Juan y tengo 25 años.`

## Práctica 2: CRUD con HTML, CSS y JS
Descripción
Esta práctica consiste en la creación de un pequeño CRUD (Create, Read, Update, Delete) para refacciones utilizando HTML, CSS y JavaScript. Se utiliza jQuery y JavaScript para realizar todas las operaciones del CRUD.

Funcionalidades
* Creación de refacciones
* Lectura de refacciones
* Actualización de refacciones
* Eliminación de refacciones

Código relevante

`<!-- Ejemplo de formulario para crear refacciones -->
<form id="formulario-refaccion">
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre"><br><br>
  <label for="descripcion">Descripción:</label>
  <input type="text" id="descripcion" name="descripcion"><br><br>
  <button id="btn-crear">Crear</button>
</form>

<!-- Ejemplo de código JavaScript para crear refacciones -->
$('#btn-crear').click(function() {
  const nombre = $('#nombre').val();
  const descripcion = $('#descripcion').val();
  // Código para crear refacción...
}); `

## Práctica 3: AJAX con JSON
Descripción
Esta práctica se enfoca en la utilización de AJAX con JSON para el envío de datos. Se crea un pequeño CRUD similar al de la práctica 2, pero utilizando AJAX para realizar las operaciones.

Funcionalidades
* Creación de refacciones utilizando AJAX
* Lectura de refacciones utilizando AJAX
* Actualización de refacciones utilizando AJAX
* Eliminación de refacciones utilizando AJAX

Código relevante

`// Ejemplo de código JavaScript para crear refacciones utilizando AJAX
$('#btn-crear').click(function() {
  const nombre = $('#nombre').val();
  const descripcion = $('#descripcion').val();
  $.ajax({
    type: 'POST',
    url: '/refacciones',
    data: JSON.stringify({ nombre, descripcion }),
    contentType: 'application/json',
    success: function(data) {
      console.log(data);
    }
  });
}); `