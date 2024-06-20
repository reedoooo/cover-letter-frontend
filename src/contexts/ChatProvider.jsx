import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  reloadRoute,
  syncChatSessions,
  syncChatMessages,
  addChatSession,
  updateChatSession,
  updateChatSessionIfEdited,
  deleteChatSession,
  setActive,
  setActiveLocal,
  addChatByUuid,
  updateChatByUuid,
  updateChatPartialByUuid,
  deleteChatByUuid,
  clearChatByUuid,
  clearState,
} from 'store/Slices/chatSlice.jsx';

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const state = useSelector(state => state.chat);
  const dispatch = useDispatch();

  const actions = {
    reloadRoute: uuid => dispatch(reloadRoute(uuid)),
    syncChatSessions: () => dispatch(syncChatSessions()),
    syncChatMessages: uuid => dispatch(syncChatMessages(uuid)),
    addChatSession: (historyData, chatData) =>
      dispatch(addChatSession({ history: historyData, chatData })),
    updateChatSession: (uuid, edit) =>
      dispatch(updateChatSession({ uuid, edit })),
    updateChatSessionIfEdited: (uuid, edit) =>
      dispatch(updateChatSessionIfEdited({ uuid, edit })),
    deleteChatSession: index => dispatch(deleteChatSession({ index })),
    setActive: uuid => dispatch(setActive(uuid)),
    setActiveLocal: uuid => dispatch(setActiveLocal(uuid)),
    addChatByUuid: (uuid, chat) => dispatch(addChatByUuid({ uuid, chat })),
    updateChatByUuid: (uuid, index, chat) =>
      dispatch(updateChatByUuid({ uuid, index, chat })),
    updateChatPartialByUuid: (uuid, index, chat) =>
      dispatch(updateChatPartialByUuid({ uuid, index, chat })),
    deleteChatByUuid: (uuid, index) =>
      dispatch(deleteChatByUuid({ uuid, index })),
    clearChatByUuid: uuid => dispatch(clearChatByUuid({ uuid })),
    clearState: () => dispatch(clearState()),
  };

  return (
    <ChatContext.Provider value={{ state, actions }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatStore = () => useContext(ChatContext);
export default ChatProvider;
