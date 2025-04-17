import express from 'express';
import { getAllDriversController,getDriverByIdController,deleteDriverController,updateDriverController} from '../controllers/driver.controller.js'


const router = express.Router(); 

/* Removed 
 * authMiddleware
 * for
 * backend test
*/
router.get('/drivers', getAllDriversController);  // router.get('/drivers', authMiddleware , getAllDriversController);
router.get('/drivers/:id', getDriverByIdController);  // router.get('/drivers/:id', authMiddleware , getDriverByIdController);
router.put('/drivers/:id', updateDriverController);  // router.put('/drivers/:id', authMiddleware , updateDriverController);
router.delete('/drivers/:id', deleteDriverController);  // router.delete('/drivers/:id', authMiddleware , deleteDriverController);

export default router;