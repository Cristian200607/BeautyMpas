import express from 'express';
import {login, registerUsuarios, postCategoriaProfesionales, getProfesionales, getProfesionalesById, updateProfesionales, deleteProfesionales, getProfesionalesByEmail} from '../controllers/profesionalControllers.js';
import {getCategorias, getProfesionalesPorCategoria, obtenerCategoriaPorId, crearCategoria, actualizarCategoria, eliminarCategoria,} from '../controllers/categoriaControllers.js';
import {getServiciosByIdProfesional, getAllServicios, createServicio, updateServicio, deleteServicio } from '../controllers/servicioControllers.js';
import{ getAllClientes, getClientePorId, getClientePorEmail, updateClientePorId, eliminarCliente} from '../controllers/clienteController.js';
import { getImagenesByProfesional, subirImagenPortafolio, deleteImagen, subirImagenPerfil, getImagenPerfil} from '../controllers/imagenController.js';
import { obtenerPQRS, obtenerPQRSporId, crearPQRS, actualizarEstadoPQRS, eliminarPQRSporId, obtenerTiposPQRS, crearTipoPQRS } from '../controllers/pqrsController.js';

const router = express.Router();

router.post('/registerUsuario', registerUsuarios);
router.post('/postCategoriaProfesional', postCategoriaProfesionales)
router.get('/getProfesionales', getProfesionales);
router.get('/getProfesionalById/:id', getProfesionalesById);
router.get('/getServiciosByIdProfesional/:id', getServiciosByIdProfesional);
router.get('/servicios', getAllServicios);
router.post('/servicio', createServicio);
router.put('/servicio/:id', updateServicio);
router.delete('/servicio/:id', deleteServicio);
router.get('/getProfesionalByEmail', getProfesionalesByEmail);
router.get('/getProfesionalesByCategoria/:id_categoria', getProfesionalesPorCategoria);
router.put('/updateProfesional/:id', updateProfesionales);
router.delete('/deleteProfesional/:id', deleteProfesionales);
router.post('/login', login);
router.get('/getCategorias', getCategorias);
router.get('/categoria/:id', obtenerCategoriaPorId);
router.post('/categoria', crearCategoria);
router.put('/categoria/:id', actualizarCategoria);
router.delete('/categoria/:id', eliminarCategoria);
router.get('/clientes', getAllClientes);
router.get('/cliente/:id', getClientePorId);
router.get('/cliente', getClientePorEmail); // ?email=...
router.put('/cliente/:id', updateClientePorId);
router.delete('/cliente/:id', eliminarCliente);
// Imagenes del portafolio
router.get('/profesional/:id/imagenes', getImagenesByProfesional);
router.post('/profesional/:id/imagenes', subirImagenPortafolio);
router.delete('/imagenes/:id', deleteImagen);
// Imagen de perfil
router.post('/profesional/:id/imagen-perfil', subirImagenPerfil);
router.get('/profesional/:id/imagen-perfil', getImagenPerfil);
// pqrs
router.get('/pqrs', obtenerPQRS);
router.get('/pqrs/:id', obtenerPQRSporId);
router.post('/pqrs', crearPQRS);
router.put('/pqrs/:id', actualizarEstadoPQRS);
router.delete('/pqrs/:id', eliminarPQRSporId);
router.get('/tipoPQRS', obtenerTiposPQRS);
router.post('/tipoPQRS', crearTipoPQRS);


export default router;