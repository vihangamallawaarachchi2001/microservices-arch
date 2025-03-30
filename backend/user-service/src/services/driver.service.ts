import Driver from '../models/Driver';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export interface UserServiceResponse {
  success: boolean;
  data?: any;
  error?: string;
}

 // this for get all drivers to admin
export const getAllDrivers = async (): Promise<UserServiceResponse> => {
  try {
    const drivers = await Driver.find();
    return { success: true, data: drivers };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getDriverById = async (id: string): Promise<UserServiceResponse> => {
  try {
    const drivers = await Driver.findById(id);
    return drivers 
      ? { success: true, data: drivers } 
      : { success: false, error: 'User not found' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateDriver = async (id: string, data: any): Promise<UserServiceResponse> => {
  try {
    const drivers = await Driver.findByIdAndUpdate(id, data, { new: true });
    return drivers 
      ? { success: true, data: drivers } 
      : { success: false, error: 'Update failed' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteDriver = async (id: string): Promise<UserServiceResponse> => {
  try {
    await Driver.findByIdAndDelete(id);
    return { success: true };
  } catch (error:any) {
    return { success: false, error: error.message };
  }
};