import {
  getClientes as getClientesModel,
  getClienteById as getClienteByIdModel,
  getClienteByEmail as getClienteByEmailModel,
  updateCliente as updateClienteModel,
  deleteCliente as deleteClienteModel
} from '../models/clienteModel.js';

export const getAllClientes = async (req, res) => {
  try {
    const clientes = await getClientesModel();
    res.json({ clientes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener clientes' });
  }
};

export const getClientePorId = async (req, res) => {
  try {
    const cliente = await getClienteByIdModel(req.params.id);
    res.json({ cliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener cliente por ID' });
  }
};

export const getClientePorEmail = async (req, res) => {
  try {
    const cliente = await getClienteByEmailModel(req.query.email);
    res.json({ cliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener cliente por email' });
  }
};

export const updateClientePorId = async (req, res) => {
  try {
    const updated = await updateClienteModel(req.params.id, req.body);
    res.json({ mensaje: 'Cliente actualizado correctamente', updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar cliente' });
  }
};

export const eliminarCliente = async (req, res) => {
  try {
    const deleted = await deleteClienteModel(req.params.id);
    res.json({ mensaje: 'Cliente eliminado correctamente', deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar cliente' });
  }
};

