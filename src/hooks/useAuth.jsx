import axios from 'axios';
import { useEffect } from 'react';

import constants from 'config/constants';

import { actionTypes } from './useDraftReducer';
const { API_URL } = constants;

const validateUserToken = async () => {
  if (localStorage.getItem('userToken')) {
    try {
      const response = await axios.get(`${API_URL}/user/validate-token`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      if (response.status !== 200) {
        throw new Error('Token validation failed');
      }
    } catch (error) {
      console.error('Token validation error:', error);
      logoutUser();
    }
  }
};

const logoutUser = async () => {
  try {
    await axios.post(
      `${API_URL}/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      }
    );
    localStorage.clear();
    alert('Your session has expired. Please log in again.');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const handleAuthSubmit = async (values, onLoginSuccess, onClose, apiUrl) => {
  const { username, password, email, isSignup } = values;
  const url = isSignup ? `${apiUrl}/user/signup` : `${apiUrl}/user/login`;
  const payload = isSignup
    ? { username, password, email }
    : { username, password };

  try {
    const { data } = await axios.post(url, payload);
    if (data.token) {
      onLoginSuccess(data.token, data.user);
      // const currentDrafts = JSON.parse(
      //   localStorage.getItem('coverLetterDrafts')
      // );
      // if (currentDrafts) {
      //   const currentDraftsWithLoadedDrafts = currentDrafts?.map((draft) => {
      //     return {
      //       ...draft,
      //       content: {
      //         name: draft.name || 'Untitled Draft',
      //         pdf: draft.content.pdf || '', // Raw HTML content
      //         text: draft.content.text || '', // Raw HTML content
      //         html: draft.content.html || '', // Raw HTML content
      //         blocks: draft.content.blocks || '', // Raw HTML content
      //       },
      //     };
      //   });
      //   localStorage.setItem(
      //     'coverLetterDrafts',
      //     JSON.stringify(currentDraftsWithLoadedDrafts)
      //   );
      // }
      onClose();
    }
  } catch (error) {
    console.error(isSignup ? 'Signup failed:' : 'Login failed:', error);
  }
};

const useAuth = (isAuthenticated, dispatch) => {
  useEffect(() => {
    const intervalId = setInterval(validateUserToken, 600000);
    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logoutUser();
    dispatch({ type: actionTypes.TOGGLE_AUTHENTICATION });
  };

  return { handleLogout, handleAuthSubmit };
};

export default useAuth;
