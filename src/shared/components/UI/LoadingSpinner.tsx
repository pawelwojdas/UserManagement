import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingSpinnerProps {
  loading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '200',
        position: 'fixed',
      }}
    >
      <CircularProgress variant={loading ? 'indeterminate' : 'determinate'} />
    </Box>
  );
};

export default LoadingSpinner;
