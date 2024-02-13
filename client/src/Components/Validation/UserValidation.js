import * as yup from 'yup';

//login Validation
const LoginValidation = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Необхідно вказати адресу електронної пошти")
    .trim(),
  password: yup
    .string()
    .required("Необхідно ввести пароль")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be les than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a numbers")
})

// register validation
const RegisterValidation = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Необхідно вказати адресу електронної пошти")
    .trim(),
  password: yup
    .string()
    .required("Необхідно ввести пароль")
    .min(6, "Пароль має бути не менше 6 символів")
    .max(20, "Пароль має бути менше 20 символів")
    .matches(/(?=.*[0-9])/, "Пароль повинен містити цифри"),
  fullName: yup
    .string()
    .required("Введіть повне ім’я")
    .max(20, "Повне ім'я має містити менше 20 символів")
    .matches(/^[a-zA-Z0-9 ]*$/, "Повне ім'я має містити лише літери та цифри")
});

const ProfileValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("Введіть повне ім’я")
    .max(20, "Повне ім'я має містити менше 20 символів")
    .matches(/^[a-zA-Z0-9 ]*$/, "Повне ім'я має містити лише літери та цифри"),
  email: yup
    .string()
    .email()
    .required("Необхідно вказати адресу електронної пошти")
    .trim(),
})

const PasswordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Необхідно ввести пароль")
    .min(6, "Пароль має бути не менше 6 символів")
    .max(20, "Пароль має бути менше 20 символів")
    .matches(/(?=.*[0-9])/, "Пароль повинен містити цифри"),
  newPassword: yup
    .string()
    .required("Необхідно ввести пароль")
    .min(6, "Пароль має бути не менше 6 символів")
    .max(20, "Пароль має бути менше 20 символів")
    .matches(/(?=.*[0-9])/, "Пароль повинен містити цифри"),
  confirmPassword: yup
    .string()
    .required("Необхідно ввести пароль")
    .min(6, "Пароль має бути не менше 6 символів")
    .max(20, "Пароль має бути менше 20 символів")
    .matches(/(?=.*[0-9])/, "Пароль повинен містити цифри")
    .oneOf([yup.ref("newPassword"), null], "Паролі повинні збігатися")
});

export { LoginValidation, RegisterValidation, ProfileValidation, PasswordValidation }