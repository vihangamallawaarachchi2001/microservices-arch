import express from 'express';
import { getAllAdminsController,getAdminByIdController,deleteAdminController,updateAdminController} from '../controllers/admin.controller'
import { getAllUsersController } from '../controllers/user.controller'
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router(); 

/* Removed 
 * authMiddleware
 * for
 * backend test
*/
router.get('/users', getAllUsersController);  // router.get('/users', authMiddleware , getAllUsersController);
router.get('/admins', getAllAdminsController);  // router.get('/admins', authMiddleware , getAllAdminsController);
router.get('/admins/:id', getAdminByIdController);  // router.get('/admins/:id', authMiddleware , getAdminByIdController);
router.put('/admins/:id', updateAdminController);  // router.put('/admins/:id', authMiddleware , updateAdminController);
router.delete('/admins/:id', deleteAdminController);  // router.delete('/admins/:id', authMiddleware , deleteAdminController);

export default router;