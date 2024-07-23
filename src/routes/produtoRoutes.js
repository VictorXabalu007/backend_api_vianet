import { uploadProductController,editProduct,getProductById,deleteProduct } from"../controller/controllerProduto.js";
import { Router } from "express";
import { verifyToken } from "../controller/controllerUser.js";

const produtoRoute = Router();


//produtoRoute.use(express.json());

produtoRoute.post('/uploadProduto',verifyToken, uploadProductController);
produtoRoute.post('/editarProduto/:id_produto',verifyToken, editProduct);
produtoRoute.post('/deletarProduto/:id_produto',verifyToken, deleteProduct);
produtoRoute.get('/produto/:id_produto', getProductById);

export { produtoRoute };
