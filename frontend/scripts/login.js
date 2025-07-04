import { Login} from '../apis/authService.js'

document.getElementById('FormLogin').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();

    try {

        const data = await Login(email, contraseña) ;
        
        // 💾 Guarda objeto usuario completo en localStorage
        const usuario = {
            id: data.id,
            email: email,
            rol: data.rol,
            nombre: data.nombre  // Asegúrate que el backend lo devuelva
        };

        localStorage.setItem('usuario', JSON.stringify(usuario));

        // 🚪 Redirección por rol
        switch(data.rol) {
            case 1:
            case 3:
                window.location.href = '../pages/home.html';
                break;
            case 2:
                window.location.href = '/frontend/pages/profesional/miCuenta.html';
                break;
            default:
                window.location.href = '../pages/home.html';
        }
        
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un error al intentar iniciar sesión. Verifica tu conexión o intenta más tarde.');
    }
});
