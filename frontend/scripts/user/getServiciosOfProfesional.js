import { getServiciosByIdProfesional } from '../../apis/apisServicio.js';
import { postCita } from '../../apis/apisCita.js';

const params = new URLSearchParams(window.location.search);
const id_profesional = params.get("id");

const usuario = JSON.parse(localStorage.getItem('usuario'));
const id_cliente = usuario?.id;

const contenedorPrincipal = document.body;
const serviciosSeleccionados = [];

document.addEventListener('DOMContentLoaded', async () => {
  if (!id_profesional) {
    console.error("ID del profesional no encontrado en la URL");
    return;
  }

  try {
    const response = await getServiciosByIdProfesional(id_profesional);
    const servicios = response.servicios;
    crearSeccionesAgrupadas(servicios);
  } catch (error) {
    console.error("Error al obtener servicios:", error);
  }
});

function formatoCOP(numero) {
  return `$${parseInt(numero).toLocaleString('es-CO')}`;
}

function crearSeccionesAgrupadas(servicios) {
  const categoriasMap = {
    7: "Barbería",
    8: "Pestañas",
    9: "Maquillaje",
    10: "Uñas",
    11: "Spa",
    12: "Cejas",
    13: "Otro"
  };

  const serviciosPorCategoria = {};

  servicios.forEach(servicio => {
    const categoriaId = servicio.id_categoria;
    if (!serviciosPorCategoria[categoriaId]) {
      serviciosPorCategoria[categoriaId] = [];
    }
    serviciosPorCategoria[categoriaId].push(servicio);
  });

  Object.entries(serviciosPorCategoria).forEach(([idCategoria, servicios]) => {
    const section = document.createElement('section');
    section.classList.add('servicios');

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = `🔽 ${categoriasMap[idCategoria]?.toUpperCase() || "CATEGORÍA"}`;
    toggleBtn.classList.add('categoria-toggle');
    section.appendChild(toggleBtn);

    const container = document.createElement('div');
    container.classList.add('servicios-container');

    servicios.forEach(servicio => {
      const divServicio = document.createElement('div');
      divServicio.classList.add('servicio');

      divServicio.innerHTML = `
        <div class="info">
          <h3>${servicio.servicio}</h3>
          <p>${servicio.descripcion_servicio || "Sin descripción disponible."}</p>
          <p><strong>Restricciones</strong><br>No registradas</p>
        </div>
        <div class="detalles">
          <p class="precio">${formatoCOP(servicio.precio)}</p>
          <p class="duracion">${servicio.tiempo_servicio ? servicio.tiempo_servicio + " minutos" : "Duración no especificada"}</p>
          <button class="reservar-btn" data-id="${servicio.id}" data-precio="${servicio.precio}">Reservar</button>
        </div>
      `;

      container.appendChild(divServicio);
    });

    section.appendChild(container);

    const fechaContenedor = document.querySelector('.fecha-container');
    contenedorPrincipal.insertBefore(section, fechaContenedor);
  });

  document.querySelectorAll('.categoria-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.nextElementSibling;
      container.classList.toggle('visible');
    });
  });

  document.querySelectorAll('.reservar-btn').forEach(btn => {
    btn.addEventListener('click', reservarServicio);
  });
}

// Variables globales para el contador
let cantidad = 0;
let subtotal = 0;

const cantidadElem = document.getElementById('cantidad');
const subtotalElem = document.getElementById('subtotal');
const finalizarBtn = document.querySelector('.finalizar-btn');

function reservarServicio(event) {
  const btn = event.target;
  const id = parseInt(btn.getAttribute('data-id'));
  const valor = parseInt(btn.getAttribute('data-precio'));

  if (btn.classList.contains('reservado')) {
    btn.classList.remove('reservado');
    btn.textContent = "Reservar";
    btn.style.backgroundColor = "#f3c7cc";

    cantidad--;
    subtotal -= valor;

    const index = serviciosSeleccionados.indexOf(id);
    if (index > -1) serviciosSeleccionados.splice(index, 1);
  } else {
    btn.classList.add('reservado');
    btn.textContent = "Reservado";
    btn.style.backgroundColor = "#ccc";

    cantidad++;
    subtotal += valor;

    serviciosSeleccionados.push(id);
  }

  cantidadElem.textContent = cantidad === 0
    ? "No has seleccionado servicios"
    : `Has seleccionado ${cantidad} servicio${cantidad > 1 ? 's' : ''}`;

  subtotalElem.textContent = formatoCOP(subtotal);
  finalizarBtn.disabled = cantidad === 0;
}

// ✅ Enviar datos al hacer clic en "Realizar reserva"
finalizarBtn.addEventListener('click', async () => {
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;

  if (!fecha || !hora) {
    alert("Por favor selecciona una fecha y una hora");
    return;
  }

  if (serviciosSeleccionados.length === 0) {
    alert("No has seleccionado ningún servicio");
    return;
  }

  const reserva = {
    id_profesional,
    id_cliente,
    fecha_cita: fecha,
    hora_cita: hora,
    id_servicios: serviciosSeleccionados
  };

  console.log("Reserva enviada:", reserva);

  try {
    const result = await postCita(reserva);
    console.log("Respuesta de postCita:", result);

    // Extraer el ID de cita de forma segura (sin cambiar backend)
    const idCita = result?.citaId;

    if (!idCita || typeof idCita !== 'number') {
      throw new Error("No se pudo obtener el ID numérico de la cita.");
    }

    alert("✅ Tu cita ha sido registrada exitosamente.");
    window.location.href = `/frontend/pages/user/facturaByIdCita.html?id=${idCita}`;
  } catch (error) {
    console.error('Error al crear cita:', error.message);
    alert(`❌ Error al crear la cita: ${error.message}`);
  }
});
