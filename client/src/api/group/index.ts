import axios from 'axios';

export const getAllGroups = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/group/all'
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const updateGroup = async (id: string, data: any) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/group/update',
      params: { id },
      data
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const addGroup = async (name: any) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/group/create',
      data: { name }
    });
    return res;
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

export const deleteGroup = async (id: string) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: '/api/group/delete',
      params: { id }
    });
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};
