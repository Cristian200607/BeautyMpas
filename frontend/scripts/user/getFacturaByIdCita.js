import { getTiposPago } from '../../apis/apisTipoPago.js';
import { getFacturaPorCita } from '../../apis/apisFactura.js';

const contenedorFactura = document.getElementById('factura-info');
const params = new URLSearchParams(window.location.search);
const idCita = params.get('id');

let tiposPago = [];

async function cargarTiposPago() {
  try {
    const data = await getTiposPago();
    tiposPago = data.tipos || [];
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

  const fechaFactura = new Date(factura.fecha_factura).toLocaleDateString();
  const fechaCita = new Date(factura.fecha_cita).toLocaleDateString();

  const horaCita = new Date(`1970-01-01T${factura.hora_cita}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const serviciosHTML = factura.servicios && factura.servicios.length > 0
    ? `
      <p><strong>🧾 Servicios:</strong></p>
      <ul>
        ${factura.servicios.map(s => `<li>💅 ${s.servicio} - $${s.precio}</li>`).join('')}
      </ul>
    `
    : `<p><strong>🧾 Servicios:</strong> No hay servicios registrados.</p>`;

  contenedorFactura.innerHTML = `
    <div class="factura-card">
      <div class="factura-etiqueta">Factura generada</div>
      

      <div class="factura-dato">👤 <strong>Cliente:</strong> ${factura.cliente_nombre}</div>
      <div class="factura-dato">💇 <strong>Profesional:</strong> ${factura.profesional_nombre}</div>
      <div class="factura-dato">📧 <strong>Email del Profesional:</strong> ${factura.profesional_email}</div>
      <div class="factura-dato">📅 <strong>Fecha de la Cita:</strong> ${fechaCita}</div>
      <div class="factura-dato">🕒 <strong>Hora de la Cita:</strong> ${horaCita}</div>
      <div class="factura-dato">🧾 <strong>Fecha de Factura:</strong> ${fechaFactura}</div>
      <div class="factura-dato">💳 <strong>Método de Pago:</strong> ${tipoPagoNombre}</div>
    </div>
    ${serviciosHTML}
  `;

  // Actualiza correo cliente en el saludo
  const correoClienteSpan = document.getElementById('correo-cliente');
  if (correoClienteSpan && factura.cliente_email) {
    correoClienteSpan.textContent = factura.cliente_email;
  }

  // Actualiza total
  const totalFactura = document.getElementById('total-factura');
  if (totalFactura) {
    totalFactura.textContent = `$${factura.total_factura}`;
  }
}

// Ejecutar
await cargarTiposPago();
await verificarFacturaExistente();
