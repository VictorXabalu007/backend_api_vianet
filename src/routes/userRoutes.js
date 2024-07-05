import { Router } from "express";
import { getTipo, verifyToken } from "../controller/controllerUser.js"; // Verifique o caminho do controlador


const userRoutes = Router();

userRoutes.get('/tipo', verifyToken, async (req, res) => {
  try {
    const tmp = await getTipo(req.userId);
    res.status(200).send(`${tmp}`);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


export { userRoutes };
