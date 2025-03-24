import express from 'express';
import { getAllUsersController,getUserByIdController,loginController,registerController,deleteUserController,updateUserController} from '../controllers/user.controller'
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();


  router.post('/register', registerController);
  router.post('/login', loginController);
  

router.get('/users', authMiddleware, getAllUsersController);
router.get('/users/:id', authMiddleware, getUserByIdController);
router.put('/users/:id', authMiddleware, updateUserController);
router.delete('/users/:id', authMiddleware, deleteUserController);

export default router;