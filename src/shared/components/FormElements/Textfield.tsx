import { TextField } from '@mui/material';
import { useField } from 'formik';

interface TextFieldWrapperProps {
  name: string;
  label: string;
  type?: string;
  InputProps?: any;
}

const TextFieldWrapper: React.FC<TextFieldWrapperProps> = ({
  name,
  ...props
}) => {
  const [field, meta] = useField(name);
  const configTextField = {
    ...props,
    ...field,
    fullWidth: true,
    error: false,
    helperText: '',
  };

  if (meta && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default TextFieldWrapper;
