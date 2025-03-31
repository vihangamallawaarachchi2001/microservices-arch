import User from '../models/User.js';
import Admin from '../models/Admin.js';


export const getAllAdmins = async () => {
    try {
      const admins = await Admin.find();
      return { success: true, data: admins };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

export const getAdminById = async (id) => {
  try {
    const admins = await Admin.findById(id);
    return admins 
      ? { success: true, data: admins } 
      : { success: false, error: 'User not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateAdmin = async (id, data) => {
  try {
    const admins = await Admin.findByIdAndUpdate(id, data, { new: true });
    return admins 
      ? { success: true, data: admins } 
      : { success: false, error: 'Update failed' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteAdmin = async (id) => {
  try {
    await Admin.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};