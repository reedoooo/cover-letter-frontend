import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import formFieldsConfigs from 'config/formFieldsConfigs';
import useAuth from 'hooks/useAuth';
import FormFields from './layout/FormFields';

function AuthDialog({ open, onClose, onLoginSuccess, apiUrl }) {
  const { handleAuthSubmit } = useAuth();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      isSignup: false,
    },
    onSubmit: (values) =>
      handleAuthSubmit(values, onLoginSuccess, onClose, apiUrl),
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

          {/* <FormFields
            configs={formFieldsConfigs.authConfigs}
            formikProps={formik}
            formValues={formik.values}
            setFormValues={setFormValues}
          /> */}
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
