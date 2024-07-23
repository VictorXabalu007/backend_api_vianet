import express from 'express';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from './controller/controllerUser.js';
import { routes } from './routes/index.js';
const secret = "test"

//-----------------------------------------------------------------------------------------

const app = express();
app.use(express.json());

app.use(routes);

app.get('/produtos', (req , res ) => {
  res.send('Hello World!');
});

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//----------------------------------------------------------------------------------------
