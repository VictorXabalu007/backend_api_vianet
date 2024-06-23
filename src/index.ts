import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const {addDistribuidor } = require('./controler/addDistribuidor.js');
const {getUserByEmail,getUserByID}= require('./auth/user');
const secret = "test"
//-----------------------------------------------------------------------------------------
const app = express();
app.use(express.json());

app.get('/produtos', (req: Request, res: Response) => {
  res.send('Hello World!');
});
//---------------------------------------------------------------------------------------------




function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-access-token'] as string;
  if (!token) {
    return res.status(403).send({ auth: false, message: 'Nenhum token fornecido.' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Falha na autenticação do token.' });
    }

    req.userId = (decoded as { id: number }).id;
    next();
  });
}

//----------------------------------------------------------------------------------------------
app.post('/login', async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send('Login e senha são obrigatórios.');
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }

    if (senha !== user.senha) {
      return res.status(401).send('Senha inválida.');
    }

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400 // 24 horas
    });

    res.status(200).send({ auth: true, token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).send('Erro interno do servidor.');
  }
});

//-----------------------------------------------------------------------

app.get('/me', verifyToken,async (req: Request, res: Response) => {
  res.status(200).send(`Olá, usuário ${req.userId}!`);
  console.log(await getUserByID(8));
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