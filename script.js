document.addEventListener('DOMContentLoaded', () => {
    mostrarPartidos();
    document.getElementById('btnGuardar').addEventListener('click', guardarPartido);
});

function guardarPartido() {
    const partido = {
        id: Date.now(), // ID único basado en milisegundos
        equipo1: document.getElementById('equipo1').value,
        equipo2: document.getElementById('equipo2').value,
        resultado: document.getElementById('resultado').value,
        competicion: document.getElementById('competicion').value,
        instancia: document.getElementById('instancia').value,
        fecha: document.getElementById('fecha').value
    };

    if(!partido.equipo1 || !partido.fecha) {
        alert("Por favor rellena los datos principales.");
        return;
    }

    let partidos = JSON.parse(localStorage.getItem('misPartidos')) || [];
    partidos.push(partido);
    localStorage.setItem('misPartidos', JSON.stringify(partidos));
    
    limpiarFormulario();
    mostrarPartidos();
}

function borrarPartido(id) {
    if(confirm('¿Seguro que quieres borrar este partido?')) {
        let partidos = JSON.parse(localStorage.getItem('misPartidos')) || [];
        partidos = partidos.filter(p => p.id !== id);
        localStorage.setItem('misPartidos', JSON.stringify(partidos));
        mostrarPartidos();
    }
}

function mostrarPartidos() {
    const lista = document.getElementById('listaPartidos');
    let partidos = JSON.parse(localStorage.getItem('misPartidos')) || [];
    lista.innerHTML = "";

    // Ordenar por fecha
    partidos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    let ultimaFecha = "";

    partidos.forEach(p => {
        if (p.fecha !== ultimaFecha) {
            lista.innerHTML += `<div class="fecha-header">${formatearFecha(p.fecha)}</div>`;
            ultimaFecha = p.fecha;
        }

        lista.innerHTML += `
            <div class="partido">
                <div>
                    <strong>${p.equipo1} ${p.resultado} ${p.equipo2}</strong><br>
                    <small>${p.competicion} - ${p.instancia}</small>
                </div>
                <button class="btn-borrar" onclick="borrarPartido(${p.id})">Eliminar</button>
            </div>`;
    });
}

function formatearFecha(fechaStr) {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fechaStr + "T00:00:00").toLocaleDateString('es-ES', opciones);
}

function limpiarFormulario() {
    document.getElementById('equipo1').value = "";
    document.getElementById('equipo2').value = "";
    document.getElementById('resultado').value = "";
}