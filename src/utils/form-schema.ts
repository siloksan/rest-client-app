import * as yup from 'yup';

const formFieldsLogin = {
  email: yup.string().email().required('Email is a required field'),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[a-z])(?=.*[@$!%*?&#^]).{4,30}$/,
      'The password must include at least one uppercase letter, one lowercase letter, one number and one special character!'
    )
    .required('Password is a required field'),
};

const formFieldsRegistration = {
  username: yup
    .string()
    .matches(/^[A-Z]/, 'Name must be started with a capital letter')
    .required('Name is a required field'),
  ...formFieldsLogin,
};

export const loginSchema = yup.object().shape(formFieldsLogin);
export type LoginFormData = yup.InferType<typeof loginSchema>;

export const registrationSchema = yup.object().shape(formFieldsRegistration);
export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
