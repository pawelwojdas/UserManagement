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
    .email('Email adress is not valid')
    .required('Email address is required'),
  address: Yup.string().trim().min(10, 'Address is not valid'),
  age: Yup.number()
    .positive()
    .integer()
    .required('Age is required')
    .min(1, 'Age is not valid')
    .max(120, 'Age is not valid'),
  hobbies: Yup.array().min(1, 'Please select at least one hobby'),
  dateOfBirth: Yup.date()
    .typeError('Incorrect date format')
    .max(new Date(), 'Date of birth is not valid'),
  phoneNumber: Yup.string()
    .trim()
    .matches(PHONE_REG_EXP, 'Phone number is not valid'),
});
