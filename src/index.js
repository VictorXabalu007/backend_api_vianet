import express from 'express';
import jwt from 'jsonwebtoken';
import { getUserByEmail, getUserByID } from './controler/controlerUser.js';
import { routes } from './routes/index.js';
const secret = "test"

//-----------------------------------------------------------------------------------------

const app = express();
app.use(express.json());

app.use(routes);

app.get('/produtos', (req , res ) => {
  res.send('Hello World!');
});

//---------------------------------------------------------------------------------------------

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
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

    req.userId = decoded.id;
    next();
  });
}


//----------------------------------------------------------------------------------------------


app.post('/login', async (req, res ) => {
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

app.get('/me', verifyToken, async (req, res ) => {
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

app.get('/me2', verifyToken, async (req, res ) => {
  try {
    const user = await getUserByID(req.userId);
    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }
    res.status(200).send(`Olá, usuário tipo ${user.tipo} com ID ${user.id}!`);

  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).send('Erro ao obter usuário');
  }
});
//-----------------------------------------------------------------------

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//----------------------------------------------------------------------------------------
