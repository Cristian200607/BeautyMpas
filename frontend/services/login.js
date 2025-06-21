document.getElementById('FormLogin').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();
    const botones = document.querySelectorAll('.btnLogin');

    try {
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contraseña })
        });

        const data = await res.json();
        console.log('Respuesta del servidor:', data);

        if (res.status === 200) {
            // 💾 Guarda objeto usuario completo en localStorage
            const usuario = {
                email: email,
                rol: data.rol,
                nombre: data.nombre  // Asegúrate que el backend lo devuelva
            };

            localStorage.setItem('usuario', JSON.stringify(usuario));

            botones.forEach(btn => {
                btn.setAttribute('data-email', email);
            });

            // 🚪 Redirección por rol
            switch(data.rol) {
                case 1:
                case 3:
                    window.location.href = '../pages/home.html';
                    break;
                case 2:
                    window.location.href = '../pages/profesional/miCuenta.html';
                    break;
                default:
                    window.location.href = '../pages/home.html';
            }

        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un error al intentar iniciar sesión. Verifica tu conexión o intenta más tarde.');
    }
});
