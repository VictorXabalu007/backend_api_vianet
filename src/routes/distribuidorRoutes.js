import { addDistribuidor } from "../controler/controlerDistribuidor.js";
import { Router } from "express";

const distribuidorRoutes = Router();


distribuidorRoutes.post('/addDistribuidor', async (req, res) => {
  try {

    const {
      username,
      endereco,
      loginUsuario,
      senhaUsuario
    } = req.body;

    await addDistribuidor(username, endereco, loginUsuario, senhaUsuario);

    res.send('Distribuidor inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir distribuidor:', error);
    res.status(500).send('Erro ao inserir distribuidor');
  }
});
export { distribuidorRoutes }
