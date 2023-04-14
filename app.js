const inputTarea = document.querySelector('#input-tarea');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

let tareas = [];


agregarEventos();
function agregarEventos() {
    formulario.addEventListener('submit', agregarTarea);
}

//LocalStorage
document.addEventListener('DOMContentLoaded', () => {
    tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    imprimirTareas();
})

function agregarTarea(e) {
    e.preventDefault();

    if(inputTarea.value === ''){
        mostrarAlerta('Por favor completa el campo');
        return;
    }

    const tarea = {
        nombre: inputTarea.value,
        id: Date.now()
    }

    tareas.push(tarea);

    imprimirTareas();

    formulario.reset();
}

function imprimirTareas() {
    limpiarHTML();
    tareas.forEach(tarea => {
        const {nombre, id} = tarea;

        const li = document.createElement('LI');
        li.classList.add('li-tarea');
        
        const nombreTarea = document.createElement('P');
        nombreTarea.classList.add('tarea');
        nombreTarea.textContent = nombre;

        const borrarTareaBtn = document.createElement('BUTTON');
        borrarTareaBtn.classList.add('borrar-tarea');
        borrarTareaBtn.id = id;
        borrarTareaBtn.textContent = 'X';
        borrarTareaBtn.onclick = function() {
            borrarTarea(id);
        }

        li.appendChild(nombreTarea)
        li.appendChild(borrarTareaBtn)
        resultado.appendChild(li);
    });

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function borrarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    imprimirTareas();
}

function mostrarAlerta(mensaje){
    const existe = document.querySelector('.alerta');
    if(existe){
        existe.remove();
    }

    const alerta = document.createElement('div');
    alerta.classList.add('alerta');
    alerta.innerHTML = `
        <p>${mensaje}</p>
    `;

    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}