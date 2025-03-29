import { Request, Response } from 'express';
import { 
  getAllHotelOwner,
  getHotelOwnerById,
  updateHotelOwner,
  deleteHotelOwner,
} from '../services/hotelOwner.service';


export const getAllHotelOwnerController = async (req: Request, res: Response) => {
  const result = await getAllHotelOwner();
  result.success 
    ? res.status(200).json(result.data)
    : res.status(500).json({ error: result.error });
};

export const getHotelOwnerByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getHotelOwnerById(id);
  result.success 
    ? res.status(200).json(result.data)
    : res.status(404).json({ error: result.error });
};

export const updateHotelOwnerController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await updateHotelOwner(id, data);
  result.success 
    ? res.status(200).json(result.data)
    : res.status(400).json({ error: result.error });
};

export const deleteHotelOwnerController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteHotelOwner(id);
  result.success 
    ? res.status(204).send()
    : res.status(500).json({ error: result.error });
};