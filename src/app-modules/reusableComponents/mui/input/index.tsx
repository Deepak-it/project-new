import React from 'react';
import { TextField, CircularProgress, FormHelperText, InputAdornment } from '@mui/material';

const InputMuiRct = ({
  value,
  onChange,
  label,
  placeholder,
  error,
  helperText,
  type = 'text',
  loading = false,
  startAdornment,
  endAdornment,
  name,
  ...props
}) => {
  return (
    <div style={{ width: '100%' }}>
      <TextField
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        type={type}
        helperText={helperText}
        fullWidth
        error= {error}
        variant="outlined"
        name={name}
      />
    </div>
  );
};

export default InputMuiRct;
