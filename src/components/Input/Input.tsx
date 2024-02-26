import React, { ChangeEvent } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { FieldRenderProps } from 'react-final-form'
import { phoneMask } from '../../utils/functions'

interface IInputProps extends FieldRenderProps<string, any> {
  label?: string
  placeholder?: string
  maxLength?: number
}

const Input: React.FC<IInputProps> = ({
  label,
  input: { name, onChange, type, value, ...restInput },
  meta,
  placeholder,
  maxLength
}) => {

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (type === 'tel') {
      const value = phoneMask(event.target.value)
      return onChange(value)
    }
    return onChange(event.target.value)
  }

  return (
    <Box sx={{ width: '100%' }}>
      {label && (
        <Typography
          component='label'
          htmlFor={name}
        >
          {label}
        </Typography>
      )}
      <TextField
        name={name}
        id={name}
        inputProps={{
          type: type,
          maxLength: maxLength
        }}
        sx={{ width: '100%' }}
        placeholder={placeholder}
        onChange={handleInputChange}
        value={value}
        {...restInput}
      />
      {meta.touched && meta.error && (
        <Typography
          color='error'
          sx={{
            fontSize: 14
          }}
        >
          {meta.error}
        </Typography>
      )}
    </Box>
  )
}

export default Input