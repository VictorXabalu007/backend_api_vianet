import express, {
  Request,
  Response,
  NextFunction
} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  addFaramacia
} from './controler/addFarmacia';
import test from 'node:test';
const {
  addDistribuidor
} = require('./controler/addDistribuidor.js');
const {
  getUserByEmail,
  getUserByID
} = require('./auth/user');
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
    return res.status(403).send({
      auth: false,
      message: 'Nenhum token fornecido.'
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: 'Falha na autenticação do token.'
      });
    }

    req.userId = (decoded as {
      id: number
    }).id;
    next();
  });
}


//----------------------------------------------------------------------------------------------


app.post('/login', async (req: Request, res: Response) => {
  const {
    email,
    senha
  } = req.body;

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

    const token = jwt.sign({
      id: user.id
    }, secret, {
      expiresIn: 86400 // 24 horas
    });

    res.status(200).send({
      auth: true,
      token
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).send('Erro interno do servidor.');
  }
});


//-----------------------------------------------------------------------

app.get('/me', verifyToken, async (req: Request, res: Response) => {
  const user = await getUserByID(req.userId);
  console.log(req.userId);
  console.log(user);

  if (!user) {
    return res.status(404).send('Usuário não encontrado');
  }

  if (user.tipo === 1) {
    res.status(200).send(`Olá, usuário tipo 1 com ID ${user.id}!`);
  }else{
    res.status(401).send();
  }
});

app.get('/me2', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await getUserByID(req.userId);
    console.log(req.userId);
    console.log(user);

    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    if (user.tipo === 1) {
      res.status(200).send(`Olá, usuário tipo 1 com ID ${user.id}!`);
    } else if (user.tipo === 2) {
      res.status(200).send(`Olá, usuário tipo 2 com ID ${user.id}!`);
    } else {
      res.status(200).send(`Olá, usuário com ID ${user.id} e tipo desconhecido!`);
    }
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).send('Erro ao obter usuário');
  }
});
//-----------------------------------------------------------------------

app.post('/addDistribuidor', async (req, res) => {
  try {

    const {
      nomeDistribuidor,
      enderecoDistribuidor,
      loginUsuario,
      senhaUsuario
    } = req.body;

    await addDistribuidor(nomeDistribuidor, enderecoDistribuidor, loginUsuario, senhaUsuario);

    res.send('Distribuidor inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir distribuidor:', error);
    res.status(500).send('Erro ao inserir distribuidor');
  }
});

//----------------------------------------------------------------------------------------

app.post('/addFarmacia', async (req, res) => {
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


//----------------------------------------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});