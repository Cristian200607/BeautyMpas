document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Obtenemos clientes y tipos de documento al mismo tiempo
    const [resClientes, resTipos] = await Promise.all([
      fetch('http://localhost:3000/api/clientes'),
      fetch('http://localhost:3000/api/tipos-documento')
    ]);

    const dataClientes = await resClientes.json();
    const dataTipos = await resTipos.json();

    const clientes = dataClientes.clientes;
    const tiposDocumento = dataTipos.tipos;

    // Mapeamos los tipos por id para acceder rápido
    const mapaTipos = {};
    tiposDocumento.forEach(td => {
      mapaTipos[td.id] = td.nombre;
    });

    const tbody = document.getElementById('clientes-body');
    clientes.forEach((cli) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${cli.nombre}</td>
        <td>${cli.email}</td>
        <td>${cli.telefono || ''}</td>
        <td>${cli.documento}</td>
        <td>${mapaTipos[cli.id_tipo_documento] || ''}</td>
        <td>
          <button onclick="editarCliente(${cli.id})">✏️ Editar</button>
          <button onclick="eliminarCliente(${cli.id})">🗑️ Eliminar</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Error al cargar clientes o tipos de documento:', err);
  }
});

function cerrarModal() {
  document.getElementById('edit-modal').style.display = 'none';
}

async function editarCliente(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/cliente/${id}`);
    const data = await res.json();
    const c = data.cliente;

    document.getElementById('edit-id').value = c.id;
    document.getElementById('edit-nombre').value = c.nombre;
    document.getElementById('edit-email').value = c.email;
    document.getElementById('edit-telefono').value = c.telefono || '';
    document.getElementById('edit-documento').value = c.documento;
    document.getElementById('edit-id_tipo_documento').value = c.id_tipo_documento;

    document.getElementById('edit-modal').style.display = 'block';
  } catch (err) {
    console.error('Error al cargar cliente:', err);
  }
}

document.getElementById('edit-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('edit-id').value;

  const clienteActualizado = {
    nombre: document.getElementById('edit-nombre').value,
    email: document.getElementById('edit-email').value,
    telefono: document.getElementById('edit-telefono').value,
    documento: document.getElementById('edit-documento').value,
    id_tipo_documento: document.getElementById('edit-id_tipo_documento').value
  };

  try {
    const res = await fetch(`http://localhost:3000/api/cliente/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clienteActualizado)
    });

    if (!res.ok) throw new Error('Error al actualizar');
    alert('Cliente actualizado correctamente');
    location.reload();
  } catch (err) {
    console.error(err);
    alert('No se pudo actualizar el cliente');
  }
});

async function eliminarCliente(id) {
  if (!confirm('¿Deseas eliminar este cliente?')) return;

  try {
    const res = await fetch(`http://localhost:3000/api/cliente/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) throw new Error('Error al eliminar');
    alert('Cliente eliminado correctamente');
    location.reload();
  } catch (err) {
    console.error(err);
    alert('No se pudo eliminar el cliente');
  }
}
