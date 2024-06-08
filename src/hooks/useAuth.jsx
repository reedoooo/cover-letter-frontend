/* eslint-disable import/namespace */
// useAuth.js
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import constants from 'config/constants';

// import { setDrafts } from '../store/Reducers/draftsSlice';
import { logoutUser as logoutUserAction } from 'store/Reducers/userSlice';

const { API_URL } = constants;

const validateUserToken = async dispatch => {
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

const logoutUser = async dispatch => {
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
    dispatch(logoutUserAction());
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const handleAuthSubmit = async (values, onLoginSuccess, onClose) => {
  const { username, password, email, isSignup } = values;
  const url = isSignup ? `${API_URL}/user/signup` : `${API_URL}/user/login`;
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

const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

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

// import axios from 'axios';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import constants from 'config/constants';
// import { logoutUser as logoutUserAction } from 'store/Reducers/userSlice';

// const { API_URL } = constants;

// const validateUserToken = async dispatch => {
//   if (localStorage.getItem('userToken')) {
//     try {
//       const response = await axios.get(`${API_URL}/user/validate-token`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//         },
//       });
//       if (response.status !== 200) {
//         throw new Error('Token validation failed');
//       }
//     } catch (error) {
//       console.error('Token validation error:', error);
//       logoutUser(dispatch);
//     }
//   }
// };

// const logoutUser = async dispatch => {
//   try {
//     await axios.post(
//       `${API_URL}/user/logout`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//         },
//       }
//     );
//     localStorage.clear();
//     alert('Your session has expired. Please log in again.');
//     dispatch(logoutUserAction());
//   } catch (error) {
//     console.error('Logout error:', error);
//   }
// };

// const handleAuthSubmit = async (values, onLoginSuccess, onClose) => {
//   const { username, password, email, isSignup } = values;
//   const url = isSignup ? `${API_URL}/user/signup` : `${API_URL}/user/login`;
//   const payload = isSignup
//     ? { username, password, email }
//     : { username, password };
//   try {
//     const { data } = await axios.post(url, payload);
//     if (data.token) {
//       onLoginSuccess(data.token, data.user);
//       const currentDrafts = JSON.parse(
//         localStorage.getItem('coverLetterDrafts')
//       );
//       if (currentDrafts) {
//         const loadedDrafts = data?.user?.coverLetters || [];
//         const currentDraftsWithLoadedDrafts = [
//           ...currentDrafts,
//           ...loadedDrafts,
//         ];
//         localStorage.setItem(
//           'coverLetterDrafts',
//           JSON.stringify(currentDraftsWithLoadedDrafts)
//         );
//       }
//       onClose();
//     }
//   } catch (error) {
//     console.error(isSignup ? 'Signup failed:' : 'Login failed:', error);
//   }
// };

// const useAuth = () => {
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector(state => state.user.isAuthenticated);

//   useEffect(() => {
//     const intervalId = setInterval(() => validateUserToken(dispatch), 600000); // validate token every 10 minutes
//     return () => clearInterval(intervalId);
//   }, [isAuthenticated, dispatch]);

//   const handleLogout = () => {
//     logoutUser(dispatch);
//   };

//   return { handleLogout, handleAuthSubmit };
// };

// export default useAuth;
