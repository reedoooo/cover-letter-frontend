import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import constants from 'config/constants';

const { API_URL } = constants;

// Async thunks
export const handleAuthSubmit = createAsyncThunk(
  'auth/handleAuthSubmit',
  async (values, { rejectWithValue }) => {
    const { username, password, email, isSignup } = values;
    const url = isSignup ? `${API_URL}/user/signup` : `${API_URL}/user/login`;
    const usernameOrEmail = !email ? username : email;
    const payload = isSignup
      ? { username, password, email }
      : { usernameOrEmail, password };

    try {
      const { data } = await axios.post(url, payload);
      if (data.token) {
        // const currentDrafts = JSON.parse(
        //   localStorage.getItem('coverLetterDrafts')
        // );
        // if (currentDrafts) {
        //   const loadedDrafts = data?.user?.coverLetters;
        //   const currentDraftsWithLoadedDrafts = [
        //     ...currentDrafts,
        //     ...loadedDrafts,
        //   ];
        //   localStorage.setItem(
        //     'coverLetterDrafts',
        //     JSON.stringify(currentDraftsWithLoadedDrafts)
        //   );
        // }
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userId', data.user._id); // Save userId to localStorage
        return { user: data.user, token: data.token, userId: data.user._id };
      }
    } catch (error) {
      console.error(isSignup ? 'Signup failed:' : 'Login failed:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const validateToken = createAsyncThunk(
  'auth/validateToken',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/validate-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        throw new Error('Token validation failed');
      }
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      await axios.post(
        `${API_URL}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.clear();
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('userToken') || null,
    userId: localStorage.getItem('userId') || null,
    status: 'idle',
    error: null,
    isAuthenticated: !!localStorage.getItem('userToken'),
    formDisabled: false,
  },
  reducers: {
    clearError: state => {
      state.error = null;
    },
    disableForm: state => {
      state.formDisabled = true;
    },
    enableForm: state => {
      state.formDisabled = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleAuthSubmit.pending, state => {
        state.status = 'loading';
        state.formDisabled = true;
      })
      .addCase(handleAuthSubmit.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.formDisabled = false;
      })
      .addCase(handleAuthSubmit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.formDisabled = false;
      })
      .addCase(validateToken.pending, state => {
        state.status = 'loading';
      })
      .addCase(validateToken.fulfilled, state => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
      })
      .addCase(validateToken.rejected, state => {
        state.status = 'failed';
        state.user = null;
        state.token = null;
        state.userId = null;
        state.isAuthenticated = false;
        localStorage.clear();
      })
      .addCase(logout.pending, state => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.userId = null;
        state.status = 'succeeded';
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearError, disableForm, enableForm } = authSlice.actions;

export default authSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const LOCAL_NAME = 'SECRET_TOKEN';
// const EXPIRE_LOCAL_NAME = 'expiresIn';

// function getToken() {
//   return localStorage.getItem(LOCAL_NAME);
// }

// function setToken(token) {
//   localStorage.setItem(LOCAL_NAME, token);
// }

// function removeToken() {
//   localStorage.removeItem(LOCAL_NAME);
// }

// function getExpiresIn() {
//   return parseInt(localStorage.getItem(EXPIRE_LOCAL_NAME) || '0', 10);
// }

// function setExpiresIn(expiresIn) {
//   localStorage.setItem(EXPIRE_LOCAL_NAME, expiresIn.toString());
// }

// function removeExpiresIn() {
//   localStorage.removeItem(EXPIRE_LOCAL_NAME);
// }

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: getToken(),
//     expiresIn: getExpiresIn(),
//   },
//   reducers: {
//     setToken: (state, action) => {
//       setToken(action.payload);
//       state.token = action.payload;
//     },
//     removeToken: (state) => {
//       removeToken();
//       state.token = undefined;
//     },
//     setExpiresIn: (state, action) => {
//       setExpiresIn(action.payload);
//       state.expiresIn = action.payload;
//     },
//     removeExpiresIn: (state) => {
//       removeExpiresIn();
//       state.expiresIn = undefined;
//     },
//   },
// });

// export const { setToken, removeToken, setExpiresIn, removeExpiresIn } = authSlice.actions;
// export default authSlice.reducer;
