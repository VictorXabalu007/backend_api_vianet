import {kknex} from "../config/database.js";
import jwt from 'jsonwebtoken';

const secret = "test"

// Função para obter um usuário por email
function getUserByEmail(email) {
  try {
    const user = kknex('Usuario').where({
      email
    }).first();
    return user;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    throw error;
  }
}

function getUserByID(id) {
  try {
    const user = kknex('Usuario').where({
      id
    }).first();
    return user;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    throw error;
  }
}
async function insertUser(email, senha) {
  try {
    const [userId] = await kknex('Usuario').insert({
      email,
      senha,
      tipo: 2
    });
    return userId;
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    throw error;
  }
}

async function getTipo(ID) {

  try {
    const user = await getUserByID(ID);
    if (!user) {
      console.log("erro ao buscar usuario")
    }
    return user.tipo;

  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).send('Erro ao obter usuário3');
  }


}


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

const getProfileImagePath = async (userId) => {
  try {
    const user = await kknex('Usuario').where({
      id: userId
    }).first();

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user.imgPerfil;
  } catch (error) {
    console.error('Erro ao obter o caminho da imagem de perfil:', error);
    throw new Error('Erro ao obter o caminho da imagem de perfil');
  }
};

export {
  getProfileImagePath,
  verifyToken,
  getTipo,
  insertUser,
  getUserByID,
  getUserByEmail
};
