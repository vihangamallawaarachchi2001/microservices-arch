import express from 'express';
import { getAllUsersController,getUserByIdController,deleteUserController,updateUserController} from '../controllers/user.controller'
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router(); 

/* Removed 
 * authMiddleware
 * for
 * backend test
*/
router.get('/users', getAllUsersController);  // router.get('/users', authMiddleware , getAllUsersController);
router.get('/users/:id', getUserByIdController);  // router.get('/users/:id', authMiddleware , getUserByIdController);
router.put('/users/:id', updateUserController);  // router.put('/users/:id', authMiddleware , updateUserController);
router.delete('/users/:id', deleteUserController);  // router.delete('/users/:id', authMiddleware , deleteUserController);

export default router;