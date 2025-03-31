import express from 'express';
import { getAllAdminsController,getAdminByIdController,deleteAdminController,updateAdminController} from '../controllers/admin.controller.js'
import { getAllUsersController } from '../controllers/user.controller.js'
import authGuard from '../middleware/auth.middleware.js';

const router = express.Router(); 

router.get('/users', authGuard, getAllUsersController);  // router.get('/users', authMiddleware , getAllUsersController);
router.get('/admins', authGuard, getAllAdminsController);  // router.get('/admins', authMiddleware , getAllAdminsController);
router.get('/admins/:id', authGuard, getAdminByIdController);  // router.get('/admins/:id', authMiddleware , getAdminByIdController);
router.put('/admins/:id', authGuard, updateAdminController);  // router.put('/admins/:id', authMiddleware , updateAdminController);
router.delete('/admins/:id', authGuard, deleteAdminController);  // router.delete('/admins/:id', authMiddleware , deleteAdminController);

export default router;