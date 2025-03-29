import express from 'express';
import { getAllDriversController,getDriverByIdController,deleteDriverController,updateDriverController} from '../controllers/driver.controller'
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router(); 

/* Removed 
 * authMiddleware
 * for
 * backend test
*/
router.get('/drivers', getAllDriversController);  // router.get('/users', authMiddleware , getAllUsersController);
router.get('/drivers/:id', getDriverByIdController);  // router.get('/users/:id', authMiddleware , getUserByIdController);
router.put('/drivers/:id', updateDriverController);  // router.put('/users/:id', authMiddleware , updateUserController);
router.delete('/drivers/:id', deleteDriverController);  // router.delete('/users/:id', authMiddleware , deleteUserController);

export default router;