import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const {addDistribuidor } = require('./controler/addDistribuidor.js');
const {getUserByLogin}= require('./auth/user');

//-----------------------------------------------------------------------------------------
const app = express();
app.use(express.json());

app.get('/produtos', (req: Request, res: Response) => {
  res.send('Hello World!');
});
//---------------------------------------------------------------------------------------------









//----------------------------------------------------------------------------------------------
app.post('/login', async(req: Request, res: Response) => {

  const login = 'test@gmail.com'; 

  const {  } = req.body;



  try {
    const user = await getUserByLogin(login);
    console.log(user);
    res.json(user);
  } catch (error) {
    res.json("erro");
    console.error('Erro ao executar main:', error);
  } finally {
    // Fechamento da conexão aqui, se necessário
  }
});








//-----------------------------------------------------------------------


app.post('/addDistribuidor', async (req, res) => {
    try {
    
      const { nomeDistribuidor, enderecoDistribuidor, loginUsuario, senhaUsuario } = req.body;
  
      await addDistribuidor(nomeDistribuidor, enderecoDistribuidor, loginUsuario, senhaUsuario);
  
      res.send('Distribuidor inseridos com sucesso!');
    } catch (error) {
      console.error('Erro ao inserir distribuidor:', error);
      res.status(500).send('Erro ao inserir distribuidor');
    }
  });


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});