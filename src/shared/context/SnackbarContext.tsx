import React from 'react';
import { useSnackbar } from '../hooks/useSnackbar';

interface SnackbarContextState {
  snackbarOpen: boolean;
  snackbarMessage: string;
  severity: 'error' | 'info' | 'success' | 'warning';
  setSnackbar: (
    open: boolean,
    message: string,
    severity?: 'error' | 'info' | 'success' | 'warning'
  ) => void;
}

export const SnackbarContext = React.createContext<SnackbarContextState>({
  snackbarOpen: false,
  snackbarMessage: '',
  severity: 'success',
  setSnackbar: () => {},
});

const SnackbarContextProvider: React.FC = (props) => {
  const { snackbarOpen, snackbarMessage, severity, setSnackbar } =
    useSnackbar();

  return (
    <SnackbarContext.Provider
      value={{ snackbarOpen, snackbarMessage, severity, setSnackbar }}
    >
      {props.children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
