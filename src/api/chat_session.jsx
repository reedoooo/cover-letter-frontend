import { v4 as uuidv4 } from 'uuid';
import request from '@/utils/request/axios';
import { fetchDefaultChatModel } from './chat_model';
export const getChatSessionDefault = async title => {
  const default_model = await fetchDefaultChatModel();
  const uuid = uuidv4();
  return {
    title,
    isEdit: false,
    uuid,
    maxLength: 4,
    temperature: 1,
    model: default_model.name,
    maxTokens: default_model.defaultToken,
    topP: 1,
    n: 1,
    debug: false,
  };
};
export const getChatSessionsByUser = async () => {
  try {
    const response = await request.get('/chat_sessions/users');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const deleteChatSession = async uuid => {
  try {
    const response = await request.delete(`/uuid/chat_sessions/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const createChatSession = async (uuid, name, model) => {
  try {
    const response = await request.post('/uuid/chat_sessions', {
      uuid,
      topic: name,
      model,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const renameChatSession = async (uuid, name) => {
  try {
    const response = await request.put(`/uuid/chat_sessions/topic/${uuid}`, {
      topic: name,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const clearSessionChatMessages = async sessionUuid => {
  try {
    const response = await request.delete(
      `/uuid/chat_messages/chat_sessions/${sessionUuid}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateChatSession = async (sessionUuid, session_data) => {
  try {
    const response = await request.put(
      `/uuid/chat_sessions/${sessionUuid}`,
      session_data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
