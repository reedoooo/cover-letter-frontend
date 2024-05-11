// hooks/useFormikCoverLetter.js
import { useFormik } from 'formik';
import formFields from '../config/formFields';
import validationSchema from '../config/validationSchema';

const useFormikCoverLetter = onSubmit => {
  return useFormik({
    initialValues: formFields.reduce(
      (values, field) => ({ ...values, [field.name]: '' }),
      {},
    ),
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
};

export default useFormikCoverLetter;
