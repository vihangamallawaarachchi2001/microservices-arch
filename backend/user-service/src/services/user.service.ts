import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface UserServiceResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const getAllUsers = async (): Promise<UserServiceResponse> => {
  try {
    const users = await User.find();
    return { success: true, data: users };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getUserById = async (id: string): Promise<UserServiceResponse> => {
  try {
    const user = await User.findById(id);
    return user 
      ? { success: true, data: user } 
      : { success: false, error: 'User not found' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateUser = async (id: string, data: any): Promise<UserServiceResponse> => {
  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user 
      ? { success: true, data: user } 
      : { success: false, error: 'Update failed' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteUser = async (id: string): Promise<UserServiceResponse> => {
  try {
    await User.findByIdAndDelete(id);
    return { success: true };
  } catch (error:any) {
    return { success: false, error: error.message };
  }
};