import { getProfesionalByEmail, updateProfesional } from '../../apis/apisProfesional.js';
import { getServiciosByIdProfesional } from '../../apis/apisServicio.js';
import { getCategoria } from '../../apis/apisCategoria.js';

document.addEventListener('DOMContentLoaded', async () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const email = usuario?.email;
  const botonSeviciosyCategorias = document.getElementById('btnSeviciosyCategorias');
  const botonMisCitas = document.getElementById('btnCitasPendientes');

  if (!email) {
    document.body.innerHTML = "<p>Error: No se encontró el email del usuario</p>";
    return;
  }

  try {
    const { profesional } = await getProfesionalByEmail(email);
    console.log("Profesional:", profesional);

    const campos = ['nombre', 'direccion', 'telefono', 'email'];

    // Mostrar datos
    document.getElementById('nombreDisplay').textContent = profesional.nombre;
    document.getElementById('emailDisplay').textContent = profesional.email;
    document.getElementById('direccionDisplay').textContent = profesional.direccion;
    document.getElementById('telefonoDisplay').textContent = profesional.telefono;

    // Cargar valores en inputs
    botonSeviciosyCategorias.addEventListener('click', () => {
    const id = profesional.id;
    window.location.href = `/frontend/pages/profesional/misCategoriasYServicios.html?id=${id}`;
  });
    botonMisCitas.addEventListener('click', () => {
    const id = profesional.id;
    window.location.href = `/frontend/pages/profesional/citasPendientesProf.html?id=${id}`;
  });
    campos.forEach(id => {
      const input = document.getElementById(id);
      input.value = profesional[id] || '';
      input.style.display = 'none';
    });

    // Email no editable y guardamos valor original
    const emailInput = document.getElementById('email');
    emailInput.setAttribute('readonly', true);
    emailInput.dataset.original = profesional.email;

    // Servicios y categorías
    const { servicios } = await getServiciosByIdProfesional(profesional.id);
    const categoriasData = await getCategoria();
    const categorias = categoriasData.categorias || categoriasData;
    const categoriasSet = new Set();

    const contenedorCategorias = document.getElementById('categorias-listado');
    const contenedorServicios = document.getElementById('servicios-listado');

    servicios.forEach(servicio => {
      const categoriaNombre = categorias.find(cat => cat.id === servicio.id_categoria)?.categoria || 'Sin categoría';
      if (!categoriasSet.has(categoriaNombre)) {
        categoriasSet.add(categoriaNombre);
        const p = document.createElement('p');
        p.textContent = categoriaNombre;
        contenedorCategorias.appendChild(p);
      }

      const pServicio = document.createElement('p');
      pServicio.textContent = `${servicio.servicio} - $${parseFloat(servicio.precio).toFixed(2)}`;
      contenedorServicios.appendChild(pServicio);
    });

    // Estado de edición
    let enModoEdicion = false;
    const btnGuardar = document.getElementById('btnActualizar');
    btnGuardar.style.display = 'none'; // Ocultar al inicio

    // Botón editar (alternar edición)
    document.getElementById('btnEditar').addEventListener('click', () => {
      enModoEdicion = !enModoEdicion;
      const emailAlerta = document.getElementById('emailAlerta');

      campos.forEach(id => {
        const input = document.getElementById(id);
        const display = document.getElementById(id + 'Display');

        if (enModoEdicion) {
          input.style.display = 'block';
          display.style.display = 'none';
        } else {
          input.style.display = 'none';
          display.style.display = 'block';
        }
      });

      // Mostrar/ocultar botón guardar
      btnGuardar.style.display = enModoEdicion ? 'inline-block' : 'none';

      // Mostrar/ocultar alerta bajo el email
      emailAlerta.style.display = enModoEdicion ? 'block' : 'none';
    });

    // Botón guardar
    btnGuardar.addEventListener('click', async () => {
      const nuevoEmail = emailInput.value.trim();
      const emailOriginal = emailInput.dataset.original;

      if (nuevoEmail !== emailOriginal) {
        alert("⚠️ No puedes modificar el correo electrónico desde aquí. Por favor realiza esta solicitud desde el apartado de PQRS.");
        emailInput.value = emailOriginal;
        return;
      }

      const nuevosDatos = {
        nombre: document.getElementById('nombre').value.trim(),
        direccion: document.getElementById('direccion').value.trim(),
        telefono: document.getElementById('telefono').value.trim()
      };

      console.log("Nuevos datos a actualizar:", nuevosDatos);

      try {
        await updateProfesional(profesional.id, nuevosDatos);
        alert("✅ Datos actualizados correctamente.");

        // Actualizar vista
        ['nombre', 'direccion', 'telefono'].forEach(id => {
          const valor = nuevosDatos[id];
          document.getElementById(id + 'Display').textContent = valor;
        });

        campos.forEach(id => {
          document.getElementById(id).style.display = 'none';
          document.getElementById(id + 'Display').style.display = 'block';
        });

        document.getElementById('emailAlerta').style.display = 'none';
        enModoEdicion = false;
        btnGuardar.style.display = 'none';

      } catch (err) {
        console.error("Error al actualizar:", err);
        alert("❌ Hubo un error al actualizar los datos.");
      }
    });

    // Navegación
    document.getElementById('btnSeviciosyCategorias').addEventListener('click', () => {
      window.location.href = `/frontend/pages/profesional/misCategoriasYServicios.html?id=${profesional.id}`;
    });

    document.getElementById('btnMisCitas').addEventListener('click', () => {
      window.location.href = `/frontend/pages/profesional/misCitas.html?id=${profesional.id}`;
    });

  } catch (error) {
    console.error("Error general:", error);
    document.body.innerHTML = `<p>Error al cargar datos del profesional.</p>`;
  }
});
