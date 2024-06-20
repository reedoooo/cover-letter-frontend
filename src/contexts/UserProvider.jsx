import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo, resetUserInfo } from 'store/Slices/userSlice';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const state = useSelector(state => state.user);
  const dispatch = useDispatch();

  const updateUser = userInfo => {
    dispatch(updateUserInfo(userInfo));
  };

  const resetUser = () => {
    dispatch(resetUserInfo());
  };

  return (
    <UserContext.Provider value={{ state, updateUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserStore = () => useContext(UserContext);
export default UserProvider;
