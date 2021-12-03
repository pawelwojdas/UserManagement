import { useField } from 'formik';
import { Theme, useTheme } from '@mui/material/styles';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold,
  };
}

interface SelectWrapperProps {
  name: string;
  label: string;
  multiple?: boolean;
  items: string[];
}

const SelectWrapper: React.FC<SelectWrapperProps> = ({
  name,
  label,
  items,
  ...props
}) => {
  const [field, meta] = useField(name);

  const theme = useTheme();
  const configSelect = {
    ...props,
    ...field,
  };

  let error = false;
  let errorMessage = '';

  if (meta && meta.error) {
    error = true;
    errorMessage = meta.error;
  }
  return (
    <FormControl fullWidth>
      <InputLabel error={error} id={`${name}-label`}>
        {label}
      </InputLabel>
      <Select
        fullWidth
        {...configSelect}
        value={field.value}
        multiple
        labelId={`${name}-label`}
        id={name}
        input={<OutlinedInput error={error} label={label} />}
        MenuProps={MenuProps}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            value={item}
            style={getStyles(item, field.value, theme)}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default SelectWrapper;
