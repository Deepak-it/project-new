import React from 'react';
import { InputLabel, MenuItem, FormHelperText, FormControl, Select, SelectChangeEvent } from '@mui/material';

interface DynamicSelectProps {
  id?: string | number;
  label?: string;
  helperText?: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (event: SelectChangeEvent) => void;
  placeholder?: string;
  fullWidth?: boolean;
  sx?: object; // Optional styles
}

const DropdownMuiRct: React.FC<DynamicSelectProps> = ({
  id,
  label,
  helperText,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  fullWidth = false,
  sx = {},
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120, ...sx }} fullWidth={fullWidth}>
      {label && <InputLabel id={`${label}-label`}>{label}</InputLabel>}
      <Select
        labelId={label ? `${label}-label` : undefined}
        value={value}
        onChange={onChange}
        // displayEmpty
        inputProps={{ 'aria-label': label || placeholder }}
        label={label || undefined}
        id={id}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default DropdownMuiRct;
