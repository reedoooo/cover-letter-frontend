import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import {
  clearSessionChatMessages,
  createChatSession,
  createOrUpdateUserActiveChatSession,
  deleteChatData,
  deleteChatSession as apiDeleteChatSession,
  updateChatSession as fetchUpdateChatByUuid,
  getChatSessionDefault,
  getChatMessagesBySessionUUID as getChatSessionHistory,
  getChatSessionsByUser,
  getUserActiveChatSession,
  renameChatSession,
} from 'api';

const initialState = {
  active: null,
  history: [],
  chat: {},
};

export const reloadRoute = createAsyncThunk(
  'chat/reloadRoute',
  async (uuid, { dispatch }) => {
    await history.push({ pathname: '/chat', search: `?uuid=${uuid}` });
    dispatch(setActiveReducer(uuid));
  }
);

export const syncChatSessions = createAsyncThunk(
  'chat/syncChatSessions',
  async (_, { dispatch }) => {
    const sessions = await getChatSessionsByUser();
    const historyData = sessions.reverse();

    if (historyData.length === 0) {
      const newChatText = 'chat.new';
      historyData.push(await getChatSessionDefault(newChatText));
    }

    const activeSession = await getUserActiveChatSession();
    const activeSessionUuid = activeSession
      ? activeSession.chatSessionUuid
      : historyData[0].uuid;

    dispatch(
      setChatSessions({ history: historyData, active: activeSessionUuid })
    );

    if (history.location.search.split('=')[1] !== activeSessionUuid) {
      await dispatch(reloadRoute(activeSessionUuid));
    }
  }
);

export const syncChatMessages = createAsyncThunk(
  'chat/syncChatMessages',
  async (uuid, { dispatch }) => {
    if (uuid) {
      const messageData = await getChatSessionHistory(uuid);
      dispatch(setChatMessages({ uuid, messages: messageData }));
    }
  }
);

export const addChatSession = createAsyncThunk(
  'chat/addChatSession',
  async ({ historyData, chatData = [] }, { dispatch }) => {
    await createChatSession(
      historyData.uuid,
      historyData.title,
      historyData.model
    );
    dispatch(addChatSessionReducer({ history: historyData, chatData }));
    await dispatch(reloadRoute(historyData.uuid));
  }
);

export const updateChatSession = createAsyncThunk(
  'chat/updateChatSession',
  async ({ uuid, edit }, { dispatch }) => {
    dispatch(updateChatSessionReducer({ uuid, edit }));
    await fetchUpdateChatByUuid(uuid, edit);
  }
);

export const deleteChatSession = createAsyncThunk(
  'chat/deleteChatSession',
  async (index, { dispatch }) => {
    dispatch(deleteChatSessionReducer({ index }));
  }
);

export const setActive = createAsyncThunk(
  'chat/setActive',
  async (uuid, { dispatch }) => {
    dispatch(setActiveReducer(uuid));
    await createOrUpdateUserActiveChatSession(uuid);
    await dispatch(reloadRoute(uuid));
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatSessions: (state, action) => {
      state.history = action.payload.history;
      state.active = action.payload.active;
    },
    setChatMessages: (state, action) => {
      state.chat = {
        ...state.chat,
        [action.payload.uuid]: action.payload.messages,
      };
    },
    addChatSessionReducer: (state, action) => {
      state.history = [action.payload.history, ...state.history];
      state.chat = {
        ...state.chat,
        [action.payload.history.uuid]: action.payload.chatData,
      };
      state.active = action.payload.history.uuid;
    },
    updateChatSessionReducer: (state, action) => {
      state.history = state.history.map(item =>
        item.uuid === action.payload.uuid
          ? { ...item, ...action.payload.edit }
          : item
      );
    },
    deleteChatSessionReducer: (state, action) => {
      const updatedHistory = [...state.history];
      const deletedSession = updatedHistory.splice(action.payload.index, 1)[0];
      const newActive =
        updatedHistory.length === 0
          ? null
          : updatedHistory[
              Math.min(action.payload.index, updatedHistory.length - 1)
            ].uuid;
      state.history = updatedHistory;
      state.chat = Object.keys(state.chat)
        .filter(key => key !== deletedSession.uuid)
        .reduce((res, key) => ((res[key] = state.chat[key]), res), {});
      state.active = newActive;
    },
    setActiveLocal: (state, action) => {
      state.active = action.payload;
    },
    addChatByUuid: async (state, action) => {
      const newChatState = { ...state.chat };
      if (!newChatState[action.payload.uuid]) {
        newChatState[action.payload.uuid] = [];
      }
      newChatState[action.payload.uuid].push(action.payload.chat);
      state.chat = newChatState;
    },
    updateChatByUuid: async (state, action) => {
      const { uuid, index, chat } = action.payload;
      state.chat = {
        ...state.chat,
        [uuid]: state.chat[uuid].map((item, i) => (i === index ? chat : item)),
      };
    },
    getChatByUuidAndIndex: async (state, action) => {
      state.chat = {
        ...state.chat,
        [action.payload.uuid]: state.chat[action.payload.uuid].map((item, i) =>
          i === action.payload.index ? action.payload.chat : item
        ),
      };
    },
    clearChatByUuid: (state, action) => {
      state.chat = {
        ...state.chat,
        [action.payload.uuid]: [],
      };
    },
    updateChatPartialByUuid(state, action) {
      const { uuid, index, chat } = action.payload;
      state.chat = {
        ...state.chat,
        [uuid]: state.chat[uuid].map((item, i) => (i === index ? chat : item)),
      };
    },
    deleteChatByUuid: async (state, action) => {
      const { uuid, index } = action.payload;
      const [keys, keys_length] = Object.entries(state.chat);
      if (!uuid) {
        if (keys_length) {
          const chatData = this.chat[keys[0]];
          const chat = chatData[index];
          chatData.splice(index, 1);
          if (chat) await deleteChatData(chat);
        }
        return;
      }

      // const chatIndex = this.chat.findIndex(item => item.uuid === uuid)
      if (keys.includes(uuid)) {
        const chatData = this.chat[uuid];
        const chat = chatData[index];
        chatData.splice(index, 1);
        if (chat) await deleteChatData(chat);
      }
    },
    async updateChatSessionIfEdited(state, action) {
      const { uuid, edit } = action.payload;
      const session = state.history.find(item => item.uuid === uuid);
      if (session) {
        const updatedSession = { ...session, ...edit };
        state.history = state.history.map(item =>
          item.uuid === uuid ? updatedSession : item
        );
        await fetchUpdateChatByUuid(uuid, edit);
      }
    },
    clearState: state => {
      state.history = [];
      state.active = null;
      state.chat = {};
    },
  },
});

export const {
  setChatSessions,
  setChatMessages,
  addChatSessionReducer,
  updateChatSessionReducer,
  deleteChatSessionReducer,
  setActiveReducer,
  addChatByUuid,
  clearChatByUuid,
  clearState,
  deleteChatByUuid,
  updateChatByUuid,
  getChatByUuidAndIndex,
  setActiveLocal,
  updateChatPartialByUuid,
  updateChatSessionIfEdited,
} = chatSlice.actions;

export default chatSlice.reducer;
