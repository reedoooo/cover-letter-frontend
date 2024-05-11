// src/config/formSchema.js
import * as Yup from 'yup';
import formFields from './formFields';

const validationSchema = Yup.object(
  formFields.reduce(
    (schema, field) => ({
      ...schema,
      [field.name]: Yup.string().required(`${field.label} is required`),
    }),
    {},
  ),
);

export default validationSchema;
