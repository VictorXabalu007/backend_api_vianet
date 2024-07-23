import { kknex } from "../config/database.js";
import { uploadProduct } from "../middleware/multer.js";

// Função para salvar os dados do produto no banco de dados
const saveProduct = async (productData, fileNames,ID) => {
  const {
    nome_produto, preco, descricao,
    categoria, industria, minimo, EAN, codigo
  } = productData;

  try {
    const [id_produto] = await kknex('Produtos').insert({
      nome_produto,
      preco,
      num_vendas:0,
      descricao,
      categoria,
      industria,
      Distribuidores_usuario_id:ID,
      minimo,
      EAN,
      codigo,
      foto: JSON.stringify(fileNames)
    });

    return { id_produto, nome_produto, foto: fileNames };
  } catch (error) {
    console.error('Erro ao salvar os dados no banco de dados:', error);
    throw error;
  }
};

// Controlador para upload de produto
export const uploadProductController = (req, res) => {
  const ID=req.userId;
  uploadProduct(req, res, async (err) => {
    if (err) {
      return res.status(500).send('Erro ao fazer upload das imagens');
    }

    const productData = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send('Nenhuma imagem foi enviada.');
    }

    try {
      const fileNames = req.files.map(file => file.filename);

      const product = await saveProduct(productData, fileNames,ID);

      res.status(201).json(product);
    } catch (error) {
      console.error('Erro ao salvar os dados no banco de dados:', error);
      res.status(500).send('Erro ao salvar os dados no banco de dados');
    }
  });
};

export const editProduct = async (req, res) => {
  const { id_produto } = req.params;
  const {
    nome_produto, preco, descricao,
    categoria, industria, minimo, EAN, codigo
  } = req.body;

  try {
    const produto = await kknex('Produtos').where({ id_produto }).first();

    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }

    await kknex('Produtos').where({ id_produto }).update({
      nome_produto,
      preco,
      descricao,
      categoria,
      industria,
      minimo,
      EAN,
      codigo
    });

    res.status(200).send('Produto atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar o produto:', error);
    res.status(500).send('Erro ao atualizar o produto');
  }
};

export const deleteProduct = async (req, res) => {
  const { id_produto } = req.params;

  try {
    const produto = await kknex('Produtos').where({ id_produto }).first();

    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }

    await kknex('Produtos').where({ id_produto }).del();

    res.status(200).send('Produto deletado com sucesso');
  } catch (error) {
    console.error('Erro ao deletar o produto:', error);
    res.status(500).send('Erro ao deletar o produto');
  }
};

export const getProductById = async (req, res) => {
  const { id_produto } = req.params;

  try {
    const produto = await kknex('Produtos').where({ id_produto }).first();

    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }

    res.status(200).json(produto);
  } catch (error) {
    console.error('Erro ao buscar o produto:', error);
    res.status(500).send('Erro ao buscar o produto');
  }
};
