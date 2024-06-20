import React, { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  handleAuthSubmit,
  validateToken,
  logout,
  clearError,
  disableForm,
  enableForm,
} from 'store/Slices/authSlice';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const state = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const actions = {
    handleAuthSubmit: values => dispatch(handleAuthSubmit(values)),
    validateToken: token => dispatch(validateToken(token)),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearError()),
    disableForm: () => dispatch(disableForm()),
    enableForm: () => dispatch(enableForm()),
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (state.token) {
        actions.validateToken(state.token);
      }
    }, 600000); // validate token every 10 minutes

    return () => clearInterval(intervalId);
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, actions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStore = () => useContext(AuthContext);
export default AuthProvider;

// import PropTypes from 'prop-types';
// import React, { createContext, useEffect, useContext } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { redirect } from 'react-router-dom';
// import {
//   handleAuthSubmit,
//   validateToken,
//   logout,
// } from 'store/Slices/authSlice';

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const dispatch = useDispatch();
//   const { user, token, status, error } = useSelector(state => state.auth);

//   useEffect(() => {
//     if (token) {
//       dispatch(validateToken(token));
//     }
//   }, [token, dispatch]);

//   useEffect(() => {
//     const intervalId = setInterval(
//       () => dispatch(validateToken(token)),
//       600000
//     ); // validate token every 10 minutes
//     return () => clearInterval(intervalId);
//   }, [token, dispatch]);

//   const handleAuthSubmitWrapper = async values => {
//     await dispatch(handleAuthSubmit(values));
//   };

//   const logoutWrapper = async () => {
//     await dispatch(logout());
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         handleAuthSubmit: handleAuthSubmitWrapper,
//         logout: logoutWrapper,
//         validateToken: () => dispatch(validateToken(token)),
//         login: () =>
//           handleAuthSubmitWrapper(
//             { username: '', password: '' },
//             () => {},
//             () => {}
//           ),
//         loginLoader: () => {
//           if (token) {
//             return redirect('/');
//           }
//           return null;
//         },
//         signup: () =>
//           handleAuthSubmitWrapper(
//             { username: '', password: '', email: '' },
//             () => {},
//             () => {}
//           ),
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// // contexts/AuthProvider.js
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { redirect } from 'react-router-dom';
// import constants from 'config/constants';
// import { logoutUser as logoutUserAction } from 'store/Reducers/userSlice';

// const { API_URL } = constants;

// export const AuthContext = createContext({
//   user: null,
//   token: null,
//   handleAuthSubmit: () => {},
//   logout: () => {},
//   validateToken: () => {},
// });

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('userToken') || null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (token) {
//       validateToken();
//     }
//   }, [token]);

//   useEffect(() => {
//     const intervalId = setInterval(() => validateToken(), 600000); // validate token every 10 minutes
//     return () => clearInterval(intervalId);
//   }, [dispatch]);

//   const handleAuthSubmit = async values => {
//     const { username, password, email, isSignup } = values;
//     const url = isSignup ? `${API_URL}/user/signup` : `${API_URL}/user/login`;
//     const usernameOrEmail = !email ? username : email;
//     const payload = isSignup
//       ? { username, password, email }
//       : { usernameOrEmail, password };

//     try {
//       const { data } = await axios.post(url, payload);
//       if (data.token) {
//         const currentDrafts = JSON.parse(
//           localStorage.getItem('coverLetterDrafts')
//         );
//         if (currentDrafts) {
//           const loadedDrafts = data?.user?.coverLetters;
//           const currentDraftsWithLoadedDrafts = [
//             ...currentDrafts,
//             ...loadedDrafts,
//           ];
//           localStorage.setItem(
//             'coverLetterDrafts',
//             JSON.stringify(currentDraftsWithLoadedDrafts)
//           );
//         }
//         setToken(data.token);
//         setUser(data.user);
//         localStorage.setItem('userToken', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
//       }
//     } catch (error) {
//       console.error(isSignup ? 'Signup failed:' : 'Login failed:', error);
//     }
//   };

//   const validateToken = async () => {
//     if (token) {
//       try {
//         const response = await axios.get(`${API_URL}/user/validate-token`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (response.status !== 200) {
//           throw new Error('Token validation failed');
//         }
//       } catch (error) {
//         console.error('Token validation error:', error);
//         logout();
//       }
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post(
//         `${API_URL}/user/logout`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       localStorage.clear();
//       alert('Your session has expired. Please log in again.');
//       dispatch(logoutUserAction());
//       setUser(null);
//       setToken(null);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         handleAuthSubmit,
//         logout,
//         validateToken,
//         login: () =>
//           handleAuthSubmit(
//             { username: '', password: '' },
//             () => {},
//             () => {}
//           ),
//         loginLoader: () => {
//           if (token) {
//             return redirect('/');
//           }
//           return null;
//         },
//         signup: () =>
//           handleAuthSubmit(
//             { username: '', password: '', email: '' },
//             () => {},
//             () => {}
//           ),
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
