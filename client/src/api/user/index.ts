import axios from 'axios';

export const getAllUsers = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/user/all'
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const updateUser = async (id: string, data: any) => {
  try {
    console.log(data);
    const res = await axios({
      method: 'PATCH',
      url: '/api/user/update',
      params: { id },
      data
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const addUser = async (email: any) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/user/create',
      data: { email }
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: '/api/user/delete',
      params: { id }
    });
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};
