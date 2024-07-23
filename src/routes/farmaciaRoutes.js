import { Router } from "express";
import { addFaramacia } from "../controller/controllerFarmacia.js";
import{verifyToken,getTipo}from"../controller/controllerUser.js"
import{update}from"../middleware/farmacia.js";

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

    res.send('Farmacia inserida com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir a Farmacia:', error);
    res.status(500).send('Erro ao inserir Farmacia');
  }
});


farmaciaRoutes.post('/update/farmacia',verifyToken,async (req, res)=>{
  try {
    const ID=req.userId
    const tipo=await getTipo(ID);
    if(tipo==1){
      await update(req,res);
    }else{
      res.status(401).send('Acesso negado');
    }
  }catch(error){
    console.log(error);
  }
});

export { farmaciaRoutes }
