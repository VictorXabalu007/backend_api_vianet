import { createTag,getAllTags,updateTag,deleteTag } from "../controller/controllerTag.js";
import { Router } from "express";
import { verifyToken } from "../controller/controllerUser.js";
const tagRoute = Router();

// Rota para cadastrar uma tag
tagRoute.post('/criarTag',verifyToken, createTag);

// Rota para consultar todas as tags
tagRoute.get('/tags', getAllTags);

// Rota para editar uma tag pelo nome
tagRoute.post('/updateTag/:tag',verifyToken, updateTag);

// Rota para apagar uma tag pelo nome
tagRoute.post('/deletarTag/:tag',verifyToken, deleteTag);

export { tagRoute };

