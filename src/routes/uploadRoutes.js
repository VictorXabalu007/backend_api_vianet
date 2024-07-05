import { upload, uploadProfileImage,getProfileImagePath } from '../controller/uploadController.js';
import {verifyToken} from '../controller/controllerUser.js';
import { Router } from "express";

const uploadRoute = Router();

uploadRoute.post('/upload', verifyToken, upload.single('image'), uploadProfileImage);


uploadRoute.get('/user/profile-image', async (req, res) => {
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
export { uploadRoute };
