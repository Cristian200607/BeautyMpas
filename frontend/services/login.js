document.getElementById('FormLogin').addEventListener('submit', async (e) => {
    e.preventDefault(); // ✅ CORREGIDO

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
            localStorage.setItem('rol', data.rol);
            localStorage.setItem('email', email);
            console.log('Se inició sesión correctamente.');

            botones.forEach(btn => {
                btn.setAttribute('data-email', email);
            });

            if(data.rol === 1){
                window.location.href = '../pages/home.html'
            } 
            if(data.rol === 2){
                window.location.href = '../pages/profesional/miCuenta.html'
            } 
            if (data.rol === 3){
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