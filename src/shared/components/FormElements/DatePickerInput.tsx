import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { TextField } from '@mui/material';
import { useField } from 'formik';
import { isValid, format } from 'date-fns';

interface DatePickerInputProps {
  name: string;
  label: string;
  setValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  name,
  label,
  setValue,
}) => {
  const [{ value }, meta] = useField(name);

  const configDateTextField = {
    name,
    fullWidth: true,
    error: false,
    helperText: '',
  };
  if (meta && meta.error) {
    configDateTextField.error = true;
    configDateTextField.helperText = meta.error;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={value}
        label={label}
        maxDate={new Date()}
        mask="____-__-__"
        inputFormat="yyyy-MM-dd"
        onChange={(date) => {
          setValue(name, isValid(date) ? format(date, 'yyyy-MM-dd') : date);
        }}
        renderInput={(props) => (
          <TextField {...configDateTextField} {...props} />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePickerInput;
