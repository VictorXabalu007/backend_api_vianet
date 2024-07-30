import {kknex} from "../config/database.js";

// Função para cadastrar uma tag
export const createTag = async (req, res) => {
  if (req.userId == 0 || req.userId == 1) {
    try {
      const {
        tag
      } = req.body;
      await kknex('tags').insert({
        tag
      });
      res.status(201).send('Tag cadastrada com sucesso!');
    } catch {
      console.error('Erro ao cadastrar a tag:', error);
    }
  } else {
    res.status(401).send('Você não tem permissão para realizar essa ação!');
  }
};

// Função para consultar todas as tags
export const getAllTags = async (req, res) => {
  const tags = await kknex('tags').select('*');
  res.json(tags);
};


// Função interna para verificar se uma string é igual a alguma armazenada
export const tagExists = async (str) => {
  try {
    const tags = await kknex('tags').select('tag');
    return tags.some(tagObj => tagObj.tag === str);
  } catch {
    console.error('Erro ao verificar se a tag existe:', error);
  }
};

// Função para editar uma tag pelo nome
export const updateTag = async (req, res) => {
  if (req.userId == 0 || req.userId == 1) {
    try {
      const {tag} = req.params;
      const {newTag} = req.body;

      // Verifica se a nova tag já existe
      const existingTag = await kknex('tags').where('tag', newTag).first();
      if (existingTag) {
        return res.status(400).send('A nova tag já existe.');
      }

      // Atualiza a tag
      const updated = await kknex('tags')
        .where('tag', tag)
        .update({
          tag: newTag
        });

      if (updated) {
        res.send('Tag atualizada com sucesso!');
      } else {
        res.status(404).send('Tag não encontrada.');
      }
    } catch {
      console.error('Erro ao atualizar a tag:', error);
    };
  } else {
    res.status(401).send('Você não tem permissão para realizar essa ação.');
  }
};
export const deleteTag = async (req, res) => {
  const {tag} = req.params;
  if (req.userId == 0 || req.userId == 1) {
    // Tenta apagar a tag
    const deleted = await kknex('tags')
      .where('tag', tag)
      .del();

    if (deleted) {
      res.send('Tag apagada com sucesso!');
    } else {
      res.status(404).send('Tag não encontrada.');
    }
  } else {
    res.status(401).send('Você não tem permissão para realizar essa ação!');
  }

};
