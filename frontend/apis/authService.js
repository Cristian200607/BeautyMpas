const API_URL = 'http://localhost:3000/api';

export async function Register(dataRegister) {
    
    const res = await fetch('http://localhost:3000/api/registerUsuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataRegister),
    })
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Error desconocido");
    }
    return data; // Esto contiene el mensaje del backend
}



export async function Login(email, contraseña) {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contraseña })
    });
    if (!res.ok) throw new Error("No se pudo hacer el login");
    return res.json();
}