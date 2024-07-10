import multer from 'multer';
import path from 'path';
import { kknex } from '../config/database.js';

// Função para gerar um nome de arquivo único baseado em uma sequência de números
const generateUniqueFileName = () => {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000000); // Gera um número aleatório de 6 dígitos
  return `${timestamp}-${randomNumber}`;
}

// Configuração do multer
const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('img/user'));  // Certifique-se de que o caminho está correto
  },
  filename: function (req, file, cb) {
    const uniqueFileName = generateUniqueFileName();
    cb(null, uniqueFileName + path.extname(file.originalname));
  }
});

const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('img/product'));  // Certifique-se de que o caminho está correto
  },
  filename: function (req, file, cb) {
    const uniqueFileName = generateUniqueFileName();
    cb(null, uniqueFileName + path.extname(file.originalname));
  }
});

export const uploadProfileImage = async (req, res) => {
  const userId = req.userId;

  try {
    if (!req.file) {
      return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    const user = await kknex('Usuario').where({
      id: userId
    }).first();

    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    const fileName = req.file.filename;
    console.log(fileName);

    await kknex('Usuario').where({
      id: userId
    }).update({
      imgPerfil: fileName
    });

    res.status(200).send('Upload de imagem e atualização de caminho realizados com sucesso');
  } catch (error) {
    console.error('Erro ao fazer upload de imagem:', error);
    res.status(500).send('Erro ao fazer upload de imagem');
  }
};

export const uploadProduct = multer({ storage: storageProduct });
export const uploadUser = multer({ storage: storageUser });
