import React, { useReducer } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import axios from 'axios';
const initialState = {
  isSignup: false,
  username: '',
  password: '',
  email: '',
};
function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_MODE':
      return { ...state, isSignup: !state.isSignup, email: '' }; // Clear email when toggling mode
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
function AuthDialog({ open, onClose, onLoginSuccess, apiUrl }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isSignup, username, password, email } = state;

  const handleLoginSignup = async () => {
    const url = isSignup ? `${apiUrl}/user/signup` : `${apiUrl}/user/login`;
    const payload = isSignup
      ? { username, password, email }
      : { username, password };

    try {
      const { data } = await axios.post(url, payload);
      if (data.token) {
        onLoginSuccess(data.token, data.user);
        onClose();
        dispatch({ type: 'RESET' });
      }
    } catch (error) {
      console.error(isSignup ? 'Signup failed:' : 'Login failed:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isSignup ? 'Sign Up' : 'Login'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
          value={username}
          onChange={(e) =>
            dispatch({
              type: 'SET_FIELD',
              field: 'username',
              value: e.target.value,
            })
          }
          fullWidth
          margin="dense"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) =>
            dispatch({
              type: 'SET_FIELD',
              field: 'password',
              value: e.target.value,
            })
          }
          fullWidth
          margin="dense"
        />
        {isSignup && (
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) =>
              dispatch({
                type: 'SET_FIELD',
                field: 'email',
                value: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
        )}
        <FormControlLabel
          control={
            <Switch
              checked={isSignup}
              onChange={() => dispatch({ type: 'TOGGLE_MODE' })}
            />
          }
          label={isSignup ? 'Switch to Login' : 'Switch to Signup'}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLoginSignup}>
          {isSignup ? 'Sign Up' : 'Login'}
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AuthDialog;
