import User from '../models/User';
import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface UserServiceResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const getAllAdmins = async (): Promise<UserServiceResponse> => {
    try {
      const admins = await Admin.find();
      return { success: true, data: admins };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

export const getAdminById = async (id: string): Promise<UserServiceResponse> => {
  try {
    const admins = await Admin.findById(id);
    return admins 
      ? { success: true, data: admins } 
      : { success: false, error: 'User not found' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateAdmin = async (id: string, data: any): Promise<UserServiceResponse> => {
  try {
    const admins = await Admin.findByIdAndUpdate(id, data, { new: true });
    return admins 
      ? { success: true, data: admins } 
      : { success: false, error: 'Update failed' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteAdmin = async (id: string): Promise<UserServiceResponse> => {
  try {
    await Admin.findByIdAndDelete(id);
    return { success: true };
  } catch (error:any) {
    return { success: false, error: error.message };
  }
};