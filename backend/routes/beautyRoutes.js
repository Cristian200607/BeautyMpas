import express from 'express';
import {login, 
    registerUsuarios, getProfesionales, 
    getProfesionalesById, 
    updateProfesionales, 
    deleteProfesionales, 
    getProfesionalesByEmail, 
    getCategorias, 
    getAllClientes,
    getClientePorId,
    getClientePorEmail,
    updateClientePorId,
    eliminarCliente,
    getTiposDocumento
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
router.get('/clientes', getAllClientes);
router.get('/cliente/:id', getClientePorId);
router.get('/cliente', getClientePorEmail); // ?email=...
router.put('/cliente/:id', updateClientePorId);
router.delete('/cliente/:id', eliminarCliente);
router.get('/tipos-documento', getTiposDocumento);


export default router;