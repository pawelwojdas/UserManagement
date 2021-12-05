import * as Yup from 'yup';

const PHONE_REG_EXP =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const ONLY_LETTERS_REG_EXP = /^[aA-zZ\s]+$/;

export const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(ONLY_LETTERS_REG_EXP, 'Only letters are allowed for name')
    .required('Name is required'),
  lastName: Yup.string()
    .trim()
    .matches(ONLY_LETTERS_REG_EXP, 'Only letters are allowed for last name')
    .required('Last name is required'),
  email: Yup.string()
    .trim()
    .email('Please provide a valid email address')
    .required('Email address is required'),
  address: Yup.string().trim().min(10, 'Please provide a correct address'),
  age: Yup.number()
    .positive()
    .integer()
    .required('Age is required')
    .min(1, 'Please provide a valid age')
    .max(120, 'Please provide a valid age'),
  hobbies: Yup.array().min(1, 'Please select at least one hobby'),
  dateOfBirth: Yup.date()
    .typeError('Incorrect date format')
    .max(new Date(), 'Please provide valid date of birth'),
  phoneNumber: Yup.string()
    .trim()
    .matches(PHONE_REG_EXP, 'Please provide valid phone number'),
});
