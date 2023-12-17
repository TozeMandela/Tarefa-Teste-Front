import React from 'react';
import { SxProps, TextField, Theme } from '@mui/material';

interface IfieldInputsProps {
  name: string,
  Type: string,
  Label: string,
  error?: boolean,
  value: string,
  disabled?: boolean;
  setBody?: (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  sx?: SxProps<Theme> | undefined
}

export const InputField: React.FC<IfieldInputsProps> = ({Label, Type, error, name, value, setBody, sx, disabled}) => {
	return	<TextField
		label={Label}
		name={name}
		type={Type}
		error={error}
		color='secondary'
		value={value}
		onChange={setBody}
		margin='dense'
		disabled={disabled}
		sx={sx}
	/>;
};
