/* eslint-disable import/namespace */
// useAuth.js
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';
import constants from 'config/constants';

// import { setDrafts } from '../store/Reducers/draftsSlice';
import { logoutUser as logoutUserAction } from 'store/Reducers/userSlice';

const { API_URL } = constants;

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

const validateTokenAction = async dispatch => {
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
      logoutAction(dispatch);
    }
  }
};
const validationLoader = () => {
  if (!localStorage.getItem('userToken')) {
    return redirect('/');
  }
  return null;
};

const logoutAction = async dispatch => {
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
async function logoutLoader() {
  if (!localStorage.getItem('userToken')) {
    return redirect('/');
  }
  return null;
}

async function signupAction({ request }) {
  let formData = await request.formData();
  let username = formData.get('username');
  let password = formData.get('password');
  let email = formData.get('email');

  if (!username || !password || !email) {
    return {
      error: 'All fields are required',
    };
  }

  try {
    const response = await axios.post(`${API_URL}/user/signup`, {
      username,
      password,
      email,
    });

    if (response.data.token) {
      return {
        token: response.data.token,
        user: response.data.user,
      };
    } else {
      return {
        error: 'Signup failed',
      };
    }
  } catch (error) {
    return {
      error: 'Signup failed: ' + error.message,
    };
  }
}
async function signupLoader() {
  if (localStorage.getItem('userToken')) {
    return redirect('/');
  }
  return null;
}

async function loginAction({ request }) {
  let formData = await request.formData();
  let username = formData.get('username');
  let password = formData.get('password');

  if (!username || !password) {
    return {
      error: 'Both fields are required',
    };
  }

  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      username,
      password,
    });

    if (response.data.token) {
      return {
        token: response.data.token,
        user: response.data.user,
      };
    } else {
      return {
        error: 'Login failed',
      };
    }
  } catch (error) {
    return {
      error: 'Login failed: ' + error.message,
    };
  }
}
async function loginLoader() {
  if (localStorage.getItem('userToken')) {
    return redirect('/');
  }
  return null;
}

function AuthStatus() {
  // Get our logged in user, if they exist, from the root route loader data
  // let { user } = useRouteLoaderData('root');
  // let fetcher = useFetcher();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  // let isLoggingOut = fetcher.formData != null;

  return (
    <div>
      <p>Welcome {user}!</p>
      {/* <fetcher.Form method="post" action="/logout">
        <button type="submit" disabled={isLoggingOut}>
          {isLoggingOut ? 'Signing out...' : 'Sign out'}
        </button>
      </fetcher.Form> */}
    </div>
  );
}

const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  useEffect(() => {
    const intervalId = setInterval(() => validateTokenAction(dispatch), 600000); // validate token every 10 minutes
    return () => clearInterval(intervalId);
  }, [isAuthenticated, dispatch]);

  const handleLogout = () => {
    logoutAction(dispatch);
  };

  return {
    handleLogout,
    handleAuthSubmit,
    signupAction,
    loginAction,
    signupLoader,
    loginLoader,
    validationLoader,
    logoutLoader,
    AuthStatus,
  };
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
