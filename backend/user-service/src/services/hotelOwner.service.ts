import HotelOwner from '../models/HotelOwner';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface UserServiceResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// this for get all hotelowner to admin
export const getAllHotelOwner = async (): Promise<UserServiceResponse> => {
  try {
    const hotelOwners = await HotelOwner.find();
    return { success: true, data: hotelOwners };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getHotelOwnerById = async (id: string): Promise<UserServiceResponse> => {
  try {
    const hotelOwners = await HotelOwner.findById(id);
    return hotelOwners 
      ? { success: true, data: hotelOwners } 
      : { success: false, error: 'User not found' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateHotelOwner = async (id: string, data: any): Promise<UserServiceResponse> => {
  try {
    const hotelOwners = await HotelOwner.findByIdAndUpdate(id, data, { new: true });
    return hotelOwners 
      ? { success: true, data: hotelOwners } 
      : { success: false, error: 'Update failed' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteHotelOwner = async (id: string): Promise<UserServiceResponse> => {
  try {
    await HotelOwner.findByIdAndDelete(id);
    return { success: true };
  } catch (error:any) {
    return { success: false, error: error.message };
  }
};