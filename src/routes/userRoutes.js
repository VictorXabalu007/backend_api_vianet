import { Router } from "express";
import { getTipo, verifyToken,getProfileImagePath } from "../controller/controllerUser.js"; // Verifique o caminho do controlador
import { uploadUser, uploadProfileImage } from '../middleware/multer.js';


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

userRoutes.post('/image/upload', verifyToken, uploadUser.single('image'), uploadProfileImage);


userRoutes.get('/profile-image', async (req, res) => {
  const userId = req.headers['user-id'];

  if (!userId) {
    return res.status(400).json({ error: 'Header "user-id" é necessário' });
  }

  try {
    const profileImagePath = await getProfileImagePath(userId);
    res.status(200).json({ path: profileImagePath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export { userRoutes };
