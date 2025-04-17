import Driver from '../models/Driver.js';

 // this for get all drivers to admin
export const getAllDrivers = async ()=> {
  try {
    const drivers = await Driver.find();
    return { success: true, data: drivers };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getDriverById = async (id)=> {
  try {
    const drivers = await Driver.findById(id);
    return drivers 
      ? { success: true, data: drivers } 
      : { success: false, error: 'User not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateDriver = async (id, data)=> {
  try {
    const drivers = await Driver.findByIdAndUpdate(id, data, { new: true });
    return drivers 
      ? { success: true, data: drivers } 
      : { success: false, error: 'Update failed' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteDriver = async (id)=> {
  try {
    await Driver.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};