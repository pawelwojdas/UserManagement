import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useStyles } from './style';

interface LoadingSpinnerProps {
  loading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
  const classes = useStyles();
  return (
    <Box className={classes.spinner}>
      <CircularProgress variant={loading ? 'indeterminate' : 'determinate'} />
    </Box>
  );
};

export default LoadingSpinner;
