// adminClientes.js
import {
  getClientes,
  getClienteById,
  updateCliente,
  deleteCliente
} from '../../apis/apisCliente.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await getClientes();
    const clientes = data.clientes;

    const tbody = document.getElementById('clientes-body');

    clientes.forEach((cli) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${cli.nombre}</td>
        <td>${cli.email}</td>
        <td>${cli.telefono || 'Sin teléfono'}</td>
        <td>${cli.documento}</td>
        <td>${cli.id_tipo_documento || 'N/A'}</td>
        <td>
          <button onclick="editarCliente(${cli.id})">✏️ Editar</button>
          <button onclick="eliminarCliente(${cli.id})">🗑️ Eliminar</button>
        </td>
      `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error al obtener clientes:', error);
  }
});

// ✅ Función para editar cliente
window.editarCliente = async (id) => {
  try {
    const data = await getClienteById(id);
    const c = data.cliente;

    const nuevoNombre = prompt('Editar nombre:', c.nombre);
    const nuevoEmail = prompt('Editar email:', c.email);
    const nuevoTelefono = prompt('Editar teléfono:', c.telefono);
    const nuevoDocumento = prompt('Editar documento:', c.documento);

    if (!nuevoNombre || !nuevoEmail) {
      alert('Nombre y Email son obligatorios');
      return;
    }

    await updateCliente(id, {
      nombre: nuevoNombre,
      email: nuevoEmail,
      telefono: nuevoTelefono,
      documento: nuevoDocumento
    });

    alert('Cliente actualizado correctamente');
    location.reload();
  } catch (err) {
    console.error('Error al actualizar cliente:', err);
    alert('No se pudo actualizar el cliente');
  }
};

// ✅ Función para eliminar cliente
window.eliminarCliente = async (id) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este cliente?')) return;

  try {
    await deleteCliente(id);
    alert('Cliente eliminado correctamente');
    location.reload();
  } catch (err) {
    console.error('Error al eliminar cliente:', err);
    alert('No se pudo eliminar el cliente');
  }
};
