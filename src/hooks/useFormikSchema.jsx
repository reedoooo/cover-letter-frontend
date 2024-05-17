import formFieldsConfigs from 'config/formFieldsConfigs';
import * as Yup from 'yup';

const useFormikSchema = (configName) => {
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
