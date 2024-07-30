import { addDistribuidor,removeDistribuidor } from "../controller/controllerDistribuidor.js";
import { verifyToken } from "../controller/controllerUser.js";
import { Router } from "express";
import{update}from"../middleware/distribuidor.js";
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


distribuidorRoutes.post('/update/distribuidor',verifyToken,async (req, res)=>{
  try {
    const ID=req.userId
    const tipo=await getTipo(ID);
    if(tipo==2){
      await update(req,res);
    }else{
      res.status(401).send('Acesso negado');
    }
  }catch(error){
    console.log(error);
  }
});


distribuidorRoutes.post('/delete/distribuidor',verifyToken,async (req, res)=>{
  try {
    const ID=req.userId
    const tipo=await getTipo(ID);
    if(tipo==2){
      await removeDistribuidor(ID);
    }else{
      res.status(401).send('Acesso negado');
    }
  }catch(error){
    console.log(error);
  }
});

export { distribuidorRoutes }
