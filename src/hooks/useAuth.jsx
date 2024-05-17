import { useEffect } from 'react';
import axios from 'axios';
import { actionTypes } from './useDraftReducer';
const validateUserToken = async () => {
  if (localStorage.getItem('userToken')) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/validate-token`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
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
      `${process.env.REACT_APP_API_URL}/user/logout`,
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
const useAuth = (isAuthenticated, dispatch) => {
  useEffect(() => {
    const intervalId = setInterval(validateUserToken, 600000);
    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logoutUser();
    dispatch({ type: actionTypes.TOGGLE_AUTHENTICATION });
  };

  return { handleLogout };
};

export default useAuth;
