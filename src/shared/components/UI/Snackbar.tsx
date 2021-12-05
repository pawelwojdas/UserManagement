import { forwardRef, useContext } from 'react';
import { SnackbarContext } from '../../context/SnackbarContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarWrapper = () => {
  const { snackbarOpen, snackbarMessage, severity, setSnackbar } =
    useContext(SnackbarContext);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(false, '', severity);
  };

  return (
    <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarWrapper;
