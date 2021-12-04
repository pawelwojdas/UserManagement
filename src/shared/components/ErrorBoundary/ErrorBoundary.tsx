import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Box, Typography, Button } from '@mui/material';

function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography sx={{ marginBottom: '10px' }} variant="h6" component="h2">
        Something went wrong
      </Typography>
      <Button variant="contained" color="error" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </Box>
  );
}

const ErrorBoundaryWrapper: React.FC = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
