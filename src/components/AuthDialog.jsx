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
import formFieldsConfigs from 'config/formFieldsConfigs';

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

  const renderFormFields = () => {
    return formFieldsConfigs['authConfigs'].map((field) => {
      if (field.conditional && !formik.values[field.conditional]) {
        return null;
      }

      return (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={formik.values[field.name]}
          onChange={formik.handleChange}
          fullWidth={field.fullWidth}
          margin={field.margin}
        />
      );
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{formik.values.isSignup ? 'Sign Up' : 'Login'}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          {renderFormFields()}
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
