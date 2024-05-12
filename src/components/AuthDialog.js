import React from 'react';
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
import { useFormik } from 'formik';
import axios from 'axios';

function AuthDialog({ open, onClose, onLoginSuccess, apiUrl }) {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      isSignup: false,
    },
    onSubmit: async (values) => {
      const { username, password, email, isSignup } = values;
      const url = isSignup ? `${apiUrl}/user/signup` : `${apiUrl}/user/login`;
      const payload = isSignup
        ? { username, password, email }
        : { username, password };

      try {
        const { data } = await axios.post(url, payload);
        if (data.token) {
          onLoginSuccess(data.token, data.user);
          onClose();
          formik.resetForm();
        }
      } catch (error) {
        console.error(isSignup ? 'Signup failed:' : 'Login failed:', error);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{formik.values.isSignup ? 'Sign Up' : 'Login'}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            fullWidth
            margin="dense"
          />
          {formik.values.isSignup && (
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              fullWidth
              margin="dense"
            />
          )}
          <FormControlLabel
            control={
              <Switch
                name="isSignup"
                checked={formik.values.isSignup}
                onChange={() =>
                  formik.setFieldValue('isSignup', !formik.values.isSignup)
                }
              />
            }
            label={
              formik.values.isSignup ? 'Switch to Login' : 'Switch to Signup'
            }
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">
            {formik.values.isSignup ? 'Sign Up' : 'Login'}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AuthDialog;
