import express from 'express';
import {login, registerUsuarios, getProfesionales, getProfesionalesById, updateProfesionales, deleteProfesionales, getProfesionalesByEmail, getProfesionalesPorCategoria} from '../controllers/profesionalControllers.js';
import {getCategorias, obtenerCategoriaPorId, crearCategoria, actualizarCategoria, eliminarCategoria,} from '../controllers/categoriaControllers.js';
import {getServiciosByIdProfesional, getAllServicios, postServicioProfesionales, updateServicio, deleteServicio } from '../controllers/servicioControllers.js';
import{ getAllClientes, getClientePorId, getClientePorEmail, updateClientePorId, eliminarCliente} from '../controllers/clienteController.js';
import { crearCita, obtenerCitasPorProfesional, actualizarCitaEstado } from '../controllers/citaControllers.js';
import { getImagenesByProfesional, subirImagenPortafolio, deleteImagen, subirImagenPerfil, getImagenPerfil} from '../controllers/imagenController.js';
import { obtenerPQRS, obtenerPQRSporId, crearPQRS, actualizarEstadoPQRS, eliminarPQRSporId, obtenerTiposPQRS, crearTipoPQRS } from '../controllers/pqrsController.js'; 
import { obtenerTiposPago } from '../controllers/tipoPagoController.js';
import { obtenerFacturaPorCita } from '../controllers/facturaController.js';
const router = express.Router();

//auth
router.post('/registerUsuario', registerUsuarios);
router.post('/login', login);
//

//Rutas Profesional
router.get('/getProfesionales', getProfesionales);
router.get('/getProfesionalById/:id', getProfesionalesById);
router.get('/getProfesionalByEmail', getProfesionalesByEmail);
router.put('/updateProfesional/:id', updateProfesionales);
router.delete('/deleteProfesional/:id', deleteProfesionales);
router.get('/getProfesionalesByCategoria/:id_categoria', getProfesionalesPorCategoria);
//

//Rutas Servicios
router.post('/postCategoriaProfesional', postServicioProfesionales)
router.get('/getServiciosByIdProfesional/:id', getServiciosByIdProfesional);
router.get('/servicios', getAllServicios);
router.put('/servicio/:id', updateServicio);
router.delete('/servicio/:id', deleteServicio);
//

//Rutas Categoria
router.get('/getCategorias', getCategorias);
router.get('/categoria/:id', obtenerCategoriaPorId);
router.post('/categoria', crearCategoria);
router.put('/categoria/:id', actualizarCategoria);
router.delete('/categoria/:id', eliminarCategoria);
//

//Rutas Cliente
router.get('/clientes', getAllClientes);
router.get('/cliente/:id', getClientePorId);
router.get('/cliente', getClientePorEmail); // ?email=...
router.put('/cliente/:id', updateClientePorId);
router.delete('/cliente/:id', eliminarCliente);
//

//CitasProfesional
router.post('/postCita', crearCita); // POST /api/citas
router.get('/getCitaByprofesional/:id_profesional', obtenerCitasPorProfesional);
router.put('/cita/:id/estado', actualizarCitaEstado);

// Imagenes del portafolio
router.get('/profesional/:id/imagenes', getImagenesByProfesional);
router.post('/profesional/:id/imagenes', subirImagenPortafolio);
router.delete('/imagenes/:id', deleteImagen);
//

// Imagen de perfil
router.post('/profesional/:id/imagen-perfil', subirImagenPerfil);
router.get('/profesional/:id/imagen-perfil', getImagenPerfil);
//

// pqrs
router.get('/pqrs', obtenerPQRS);
router.get('/pqrs/:id', obtenerPQRSporId);
router.post('/pqrs', crearPQRS);
router.put('/pqrs/:id', actualizarEstadoPQRS);
router.delete('/pqrs/:id', eliminarPQRSporId);
router.get('/tipoPQRS', obtenerTiposPQRS);
router.post('/tipoPQRS', crearTipoPQRS);
//


// tipoPago
router.get('/tipo-pago', obtenerTiposPago);
//

// factura
router.get('/factura/cita/:id', obtenerFacturaPorCita);
//


export default router;