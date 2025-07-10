import { getTiposPago } from '../../apis/apisTipoPago.js';
import { getFacturaPorCita } from '../../apis/apisFactura.js';

const selectMetodoPago = document.getElementById('select-metodo-pago');
const contenedorFactura = document.getElementById('factura-info');

const params = new URLSearchParams(window.location.search);
const idCita = params.get('id');

let tiposPago = [];

async function cargarTiposPago() {
  try {
    const data = await getTiposPago();
    tiposPago = data.tipos || [];

    tiposPago.forEach(tipo => {
      const option = document.createElement('option');
      option.value = tipo.id;
      option.textContent = tipo.metodo_pago;
      selectMetodoPago.appendChild(option);
    });

    selectMetodoPago.disabled = true;
  } catch (error) {
    console.error("Error al cargar tipos de pago:", error);
    alert("No se pudieron cargar los métodos de pago.");
  }
}

async function verificarFacturaExistente() {
  try {
    const data = await getFacturaPorCita(idCita);
    if (data.factura.length > 0) {
      renderizarFactura(data.factura[0]);
    } else {
      contenedorFactura.innerHTML = `<p>No existe factura registrada para esta cita.</p>`;
    }
  } catch (error) {
    console.error("Error al obtener la factura:", error);
    contenedorFactura.innerHTML = `<p>No se pudo obtener la factura.</p>`;
  }
}

function renderizarFactura(factura) {
  const tipoPagoEncontrado = tiposPago.find(tp => tp.id == factura.id_metodo_pago);
  const tipoPagoNombre = tipoPagoEncontrado?.metodo_pago || 'Método desconocido';

  // Formatear fechas
  const fechaFactura = new Date(factura.fecha_factura).toLocaleDateString();
  const fechaCita = new Date(factura.fecha_cita).toLocaleDateString();

  // Formatear hora con AM/PM
  const horaCita = new Date(`1970-01-01T${factura.hora_cita}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Renderizar servicios
  const serviciosHTML = factura.servicios && factura.servicios.length > 0
    ? `
      <p><strong>Servicios:</strong></p>
      <ul>
        ${factura.servicios.map(s => `<li>${s.servicio} - $${s.precio}</li>`).join('')}
      </ul>
    `
    : `<p><strong>Servicios:</strong> No hay servicios registrados.</p>`;

  // Mostrar toda la info
  contenedorFactura.innerHTML = `
    <p><strong>Cliente:</strong> ${factura.cliente_nombre}</p>
    <p><strong>Profesional:</strong> ${factura.profesional_nombre}</p>
    <p><strong>Email del Profesional:</strong> ${factura.profesional_email}</p>
    <p><strong>Fecha de la Cita:</strong> ${fechaCita}</p>
    <p><strong>Hora de la Cita:</strong> ${horaCita}</p>
    <p><strong>Fecha de Factura:</strong> ${fechaFactura}</p>
    <p><strong>Método de Pago:</strong> ${tipoPagoNombre}</p>
    <p><strong>Total:</strong> $${factura.total_factura}</p>
    ${serviciosHTML}
  `;

  if (tipoPagoEncontrado) {
    selectMetodoPago.value = factura.id_metodo_pago;
  }
}

// Ejecutar
await cargarTiposPago();
await verificarFacturaExistente();
