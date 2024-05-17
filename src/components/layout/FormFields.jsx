import React from 'react';
import { TextField } from '@mui/material';
import formFieldsConfigs from 'config/formFieldsConfigs';

const FormFields = ({ formikProps, formValues, setFormValues }) => {
  const { coverLetterConfigs } = formFieldsConfigs;

  return coverLetterConfigs.map((field) => {
    const fieldProps = formikProps.getFieldProps(field.name);
    const fieldError = formikProps.errors[field.name];
    const fieldTouched = formikProps.touched[field.name];
    const fieldDirty = !!fieldProps.value;
    const successCondition = fieldDirty && !fieldError;
    const errorCondition = fieldTouched && fieldError;

    return (
      <TextField
        id={field.name}
        label={field.label}
        name={field.name}
        variant="outlined"
        fullWidth
        key={field.name}
        {...fieldProps}
        value={formValues[field.name]}
        error={fieldTouched && Boolean(fieldError)}
        helperText={fieldTouched && fieldError}
        // eslint-disable-next-line max-len
        className={`${fieldDirty && !fieldError ? 'dirty' : ''} ${successCondition ? 'success' : ''} ${errorCondition ? 'error' : ''}`}
        onBlur={() => formikProps.setFieldTouched(field.name, true)}
        onChange={(e) => {
          formikProps.handleChange(e);
          setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
          });
        }}
      />
    );
  });
};

export default FormFields;
