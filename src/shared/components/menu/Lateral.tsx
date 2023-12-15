import React from 'react';
import { Box } from '@mui/material';

export const Lateral: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<Box>
			<Box>Lateral</Box>
			<Box>{children}</Box>
		</Box>
	);
};
