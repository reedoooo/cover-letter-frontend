import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePromptList } from 'store/Slices/promptSlice';

const PromptContext = createContext(null);

export const PromptProvider = ({ children }) => {
  const state = useSelector(state => state.prompt);
  const dispatch = useDispatch();

  const updatePrompt = promptList => {
    dispatch(updatePromptList(promptList));
  };

  return (
    <PromptContext.Provider value={{ state, updatePrompt }}>
      {children}
    </PromptContext.Provider>
  );
};

export const usePromptStore = () => useContext(PromptContext);
export default PromptProvider;
