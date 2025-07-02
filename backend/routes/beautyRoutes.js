import express from 'express';
import {login, registerUsuarios, postCategoriaProfesionales, getProfesionales, getProfesionalesById, updateProfesionales, deleteProfesionales, getProfesionalesByEmail} from '../controllers/profesionalControllers.js';
import {getCategorias, getProfesionalesPorCategoria} from '../controllers/categoriaControllers.js';

const router = express.Router();

router.post('/registerUsuario', registerUsuarios);
router.post('/postCategoriaProfesional', postCategoriaProfesionales)
router.get('/getProfesionales', getProfesionales);
router.get('/getProfesionalById/:id', getProfesionalesById);
router.get('/getProfesionalByEmail', getProfesionalesByEmail);
router.get('/getProfesionalesByCategoria/:id_categoria', getProfesionalesPorCategoria);
router.put('/updateProfesional/:id', updateProfesionales);
router.delete('/deleteProfesional/:id', deleteProfesionales);
router.post('/login', login);
router.get('/getCategorias', getCategorias);


export default router;