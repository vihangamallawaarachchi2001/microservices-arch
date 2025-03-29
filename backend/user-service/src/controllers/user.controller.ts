import { Request, Response } from 'express';
import { 
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../services/user.service';


export const getAllUsersController = async (req: Request, res: Response) => {
  const result = await getAllUsers();
  result.success 
    ? res.status(200).json(result.data)
    : res.status(500).json({ error: result.error });
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getUserById(id);
  result.success 
    ? res.status(200).json(result.data)
    : res.status(404).json({ error: result.error });
};

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await updateUser(id, data);
  result.success 
    ? res.status(200).json(result.data)
    : res.status(400).json({ error: result.error });
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteUser(id);
  result.success 
    ? res.status(204).send()
    : res.status(500).json({ error: result.error });
};