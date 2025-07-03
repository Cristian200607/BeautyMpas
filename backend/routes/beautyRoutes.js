import express from 'express';
import {login, 
    registerUsuarios, getProfesionales, 
    getProfesionalesById, 
    updateProfesionales, 
    deleteProfesionales, 
    getProfesionalesByEmail, 
    getCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    getAllClientes,
    getClientePorId,
    getClientePorEmail,
    updateClientePorId,
    eliminarCliente,
    getTiposDocumento,
    getAllServicios,
    crearNuevoServicio,
    actualizarServicioController,      
    eliminarServicioController 
    } from '../controllers/beautyControllers.js';

const router = express.Router();

router.post('/registerUsuario', registerUsuarios);
router.get('/getProfesionales', getProfesionales);
router.get('/getProfesionalById/:id', getProfesionalesById);
router.get('/getProfesionalByEmail', getProfesionalesByEmail);
router.put('/updateProfesional/:id', updateProfesionales);
router.delete('/deleteProfesional/:id', deleteProfesionales);
router.post('/login', login);
router.get('/categorias', getCategorias);
router.get('/categoria/:id', obtenerCategoriaPorId);
router.post('/categoria', crearCategoria);
router.put('/categoria/:id', actualizarCategoria);
router.delete('/categoria/:id', eliminarCategoria);
router.get('/clientes', getAllClientes);
router.get('/cliente/:id', getClientePorId);
router.get('/cliente', getClientePorEmail); // ?email=...
router.put('/cliente/:id', updateClientePorId);
router.delete('/cliente/:id', eliminarCliente);
router.get('/tipos-documento', getTiposDocumento);
router.get('/servicios', getAllServicios);
router.post('/servicios', crearNuevoServicio);
router.put('/servicios/:id', actualizarServicioController); 
router.delete('/servicios/:id', eliminarServicioController);    


export default router;