import express from 'express';
import { getAllHotelOwnerController,getHotelOwnerByIdController,deleteHotelOwnerController,updateHotelOwnerController} from '../controllers/hotelOwner.controller'
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router(); 

/* Removed 
 * authMiddleware
 * for
 * backend test
*/
router.get('/hotelOwners', getAllHotelOwnerController);  // router.get('/hotelOwners', authMiddleware , getAllHotelOwnerController);
router.get('/hotelOwners/:id', getHotelOwnerByIdController);  // router.get('/hotelOwners/:id', authMiddleware , getHotelOwnerByIdController);
router.put('/hotelOwners/:id', updateHotelOwnerController);  // router.put('/hotelOwners/:id', authMiddleware , updateHotelOwnerController);
router.delete('/hotelOwners/:id', deleteHotelOwnerController);  // router.delete('/hotelOwners/:id', authMiddleware , deleteHotelOwnerController);

export default router;