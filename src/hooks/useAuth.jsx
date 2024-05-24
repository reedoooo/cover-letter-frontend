import axios from 'axios';
import { useEffect } from 'react';

import constants from 'config/constants';

import { actionTypes } from './useDraftReducer';
const { API_URL } = constants;

const validateUserToken = async (dispatch) => {
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
      logoutUser(dispatch);
    }
  }
};

const logoutUser = async (dispatch) => {
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
    dispatch({
      type: actionTypes.TOGGLE_AUTHENTICATION,
      isAuthenticated: false,
    });
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
      const currentDrafts = JSON.parse(
        localStorage.getItem('coverLetterDrafts')
      );
      if (currentDrafts) {
        const loadedDrafts = data?.user?.coverLetters;
        const currentDraftsWithLoadedDrafts = [
          ...currentDrafts,
          ...loadedDrafts,
        ];
        localStorage.setItem(
          'coverLetterDrafts',
          JSON.stringify(currentDraftsWithLoadedDrafts)
        );
      }
      onClose();
    }
  } catch (error) {
    console.error(isSignup ? 'Signup failed:' : 'Login failed:', error);
  }
};

const useAuth = (isAuthenticated, dispatch) => {
  useEffect(() => {
    const intervalId = setInterval(() => validateUserToken(dispatch), 600000); // validate token every 10 minutes
    return () => clearInterval(intervalId);
  }, [isAuthenticated, dispatch]);

  const handleLogout = () => {
    logoutUser(dispatch);
  };

  return { handleLogout, handleAuthSubmit };
};

export default useAuth;
