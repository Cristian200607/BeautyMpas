import express from 'express';
import {login, registerUsuarios, getProfesionales, getProfesionalesById, updateProfesionales, deleteProfesionales, getProfesionalesByEmail } from '../controllers/beautyControllers.js';

const router = express.Router();

router.post('/registerUsuario', registerUsuarios);
router.get('/getProfesionales', getProfesionales);
router.get('/getProfesionalById/:id', getProfesionalesById);
router.get('/getProfesionalByEmail', getProfesionalesByEmail);
router.put('/updateProfesional/:id', updateProfesionales);
router.delete('/deleteProfesional/:id', deleteProfesionales);
router.post('/login', login);

export default router;