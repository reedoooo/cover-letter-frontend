import { createSlice } from '@reduxjs/toolkit';

const LOCAL_NAME = 'promptStore';

const defaultEnglishPromptList = [
  {
    key: 'Act as an English Translator and Improver',
    value: 'I want you to act as an English translator...',
  },
  {
    key: 'Act as a Spoken English Teacher and Improver',
    value: 'I want you to act as a spoken English teacher...',
  },
  {
    key: 'Act as a Poet',
    value: 'I want you to act as a poet...',
  },
  {
    key: 'Act as a Note Taking Assistant',
    value: 'I want you to act as a note-taking assistant...',
  },
];

const defaultPromptMap = {
  'zh-CN': defaultEnglishPromptList,
  'zh-TW': defaultEnglishPromptList,
  'en-US': defaultEnglishPromptList,
};

function getLocalPromptList() {
  const promptStore = JSON.parse(localStorage.getItem(LOCAL_NAME) || '{}');
  const defaultPromptList =
    defaultPromptMap[navigator.language] || defaultEnglishPromptList;
  if (promptStore && promptStore.promptList?.length > 0) {
    return promptStore;
  } else {
    setLocalPromptList({ promptList: defaultPromptList });
    return { promptList: defaultPromptList };
  }
}

function setLocalPromptList(promptStore) {
  localStorage.setItem(LOCAL_NAME, JSON.stringify(promptStore));
}

const promptSlice = createSlice({
  name: 'prompt',
  initialState: getLocalPromptList(),
  reducers: {
    updatePromptList: (state, action) => {
      setLocalPromptList({ promptList: action.payload });
      state.promptList = action.payload;
    },
  },
});

export const { updatePromptList } = promptSlice.actions;
export default promptSlice.reducer;
