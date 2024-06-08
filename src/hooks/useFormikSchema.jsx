import * as Yup from 'yup';
import formFieldsConfigs from 'config/formFieldsConfigs';

const useFormikSchema = configName => {
  return Yup.object(
    formFieldsConfigs[configName].reduce(
      (schema, field) => ({
        ...schema,
        [field.name]: Yup.string().required(`${field.label} is required`),
      }),
      {}
    )
  );
};
export default useFormikSchema;
