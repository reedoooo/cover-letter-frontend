import request from '@/utils/request/axios';
export const createChatSnapshot = async uuid => {
  try {
    const response = await request.post(`/uuid/chat_snapshot/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchChatSnapshot = async uuid => {
  try {
    const response = await request.get(`/uuid/chat_snapshot/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchSnapshotAll = async () => {
  try {
    const response = await request.get('/uuid/chat_snapshot/all');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const chatSnapshotSearch = async search => {
  try {
    const response = await request.get(
      `/uuid/chat_snapshot_search?search=${search}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateChatSnapshot = async (uuid, data) => {
  try {
    const response = await request.put(`/uuid/chat_snapshot/${uuid}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchSnapshotDelete = async uuid => {
  try {
    const response = await request.delete(`/uuid/chat_snapshot/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// CreateSessionFromSnapshot
export const CreateSessionFromSnapshot = async snapshot_uuid => {
  try {
    const response = await request.post(
      `/uuid/chat_session_from_snapshot/${snapshot_uuid}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
