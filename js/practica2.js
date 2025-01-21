class Refaccion {
    contructor(descripcion, categoria, precio) {
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = parseFloat(precio).toFixed(2);
    }
}

class GestorRefacciones {
    contructor() {
        this.refacciones = [];
    }

    agregarRefaccion(refacciones) {
        this.refacciones.push(refacciones);
        this.mostrarRefaccion();
    }

    eliminarRefaccion(index) {
        this.refacciones.splice(index, 1);
        this.mostrarRefacciones();
    }

    mostrarRefacciones() {
        const tbody = document.querySelector('#refacciones-Table tbody')
        tbody.innerHTML = '';
        this.refacciones.forEach((refaccion, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${referencia.nombre}</td>
              <td>${refaccion.categoria}</td>
              <td>$${refaccion.precio}</td>
              <td class="action">
                <button onclick="gestor.eliminarRefaccion(${index})">Eliminar</button>
              </td>
            `;
            tbody.appendChild(row);
        });
    }
}

//Instanciar gestor
const gestor = new GestorRefacciones();


//Manipular el formulario
document.getElementById('reaccion-form').addEventListener('submit',function (e){
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;

    //Validar los datos
    if (!nombre ||!categoria ||!precio) {
        alert('Todos los campos son obligatorios');
        return;
    }

    //Crear la refaccion
    const nuevaRefaccion = new Refaccion(nombre, categoria, precio);
    
    //Agregar la refaccion al gestor
    gestor.agregarRefaccion(nuevaRefaccion);

    //Limpiar los inputs (LIMPIAR FORMULARIO)
    /*document.getElementById('nombre').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('precio').value = '';*/
    this.rest();
});