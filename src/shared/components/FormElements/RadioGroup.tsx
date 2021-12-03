import {
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
} from '@mui/material';
import { useField } from 'formik';

interface RadioGroupWrapperProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

const RadioGroupWrapper: React.FC<RadioGroupWrapperProps> = ({
  name,
  label,
  options,
  ...props
}) => {
  const [field] = useField(name);
  const configRadioGroup = {
    ...props,
    ...field,
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup {...configRadioGroup} name={name} row>
        {options.map(({ value, label }, index) => {
          return (
            <FormControlLabel
              key={index}
              value={value}
              control={<Radio />}
              label={label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupWrapper;
