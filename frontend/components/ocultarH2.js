document.addEventListener('DOMContentLoaded', () => {
    
    const btnEditar = document.getElementById('btnEditar');
    const btnGuardar = document.getElementById('btnActualizar');
    let editando = false;

    btnEditar.addEventListener('click', () => {
        const campos = ['nombre', 'email', 'direccion', 'telefono'];
        campos.forEach(campo => {
        const h2 = document.getElementById(`${campo}Display`);
        const input = document.getElementById(campo);

        if (editando) {
            h2.style.display = 'block';
            input.style.display = 'none';
        } else {
            input.value = h2.textContent.trim();
            h2.style.display = 'none';
            input.style.display = 'inline-block';
        }
        });

        // Mostrar u ocultar el botón de guardar
        btnGuardar.style.display = editando ? 'none' : 'inline-block';

        editando = !editando;
    });

    const btnSubirArchivo = document.getElementById('btnSubirArchivo');
    const btnEnviarArchivo = document.getElementById('btnEnviarArchivo');
  
    if (btnSubirArchivo) {
      btnSubirArchivo.addEventListener('click', () => {
        const form = document.getElementById('subidaForm');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
      });
    }
  
    if (btnEnviarArchivo) {
      btnEnviarArchivo.addEventListener('click', () => {
        const url = document.getElementById('urlArchivo').value;
        if (url) {
          const nuevaImagen = document.createElement('img');
          nuevaImagen.src = url;
          nuevaImagen.alt = 'Imagen subida';
          document.querySelector('.collage').appendChild(nuevaImagen);
          document.getElementById('urlArchivo').value = '';
          document.getElementById('subidaForm').style.display = 'none';
        } else {
          alert("Por favor, ingrese una URL válida.");
        }
      });
    }
  });