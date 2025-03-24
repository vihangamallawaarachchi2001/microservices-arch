import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface UserServiceResponse {
  success: boolean;
  data?: any;
  error?: string;
}


export const register = async (username: string, email: string, password: string): Promise<UserServiceResponse> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    return { success: true, data: user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const login = async (email: string, password: string): Promise<UserServiceResponse> => {
  try {
    const user = await User.findOne({ email });
    
    if (!user) return { success: false, error: 'Invalid credentials' };
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return { success: false, error: 'Invalid credentials' };
    
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    
    return { success: true, data: { user, token } };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};


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