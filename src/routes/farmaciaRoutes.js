import { Router } from "express";
import { addFaramacia } from "../controller/controllerFarmacia.js";

const farmaciaRoutes = Router();

farmaciaRoutes.post('/addFarmacia', async (req, res) => {
  try {

    const {
      username,
      celular,
      Nome,
      CNPJ,
      endereco,
      loginUsuario,
      senhaUsuario
    } = req.body;

    await addFaramacia(username, celular, Nome, CNPJ, endereco, loginUsuario, senhaUsuario);

    res.send('Distribuidor inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir a Farmacia:', error);
    res.status(500).send('Erro ao inserir Farmacia');
  }
});

export { farmaciaRoutes }
