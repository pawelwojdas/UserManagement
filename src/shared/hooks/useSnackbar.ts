import { useReducer, useCallback } from 'react';

export enum ActionType {
  SET_SNACKBAR,
}

interface SnackbarReducerState {
  snackbarOpen: boolean;
  snackbarMessage: string;
  severity: 'error' | 'info' | 'success' | 'warning';
}

interface SnackbarAction {
  type: ActionType;
  snackbarOpen: boolean;
  snackbarMessage: string;
  severity: 'error' | 'info' | 'success' | 'warning';
}

const snackbarReducer: React.Reducer<SnackbarReducerState, SnackbarAction> = (
  state,
  action
) => {
  switch (action.type) {
    case ActionType.SET_SNACKBAR:
      return {
        snackbarOpen: action.snackbarOpen,
        snackbarMessage: action.snackbarMessage,
        severity: action.severity
      };
    default:
      return { ...state };
  }
};

export const useSnackbar = () => {
  const [snackbarState, dispatch] = useReducer(snackbarReducer, {
    snackbarOpen: false,
    snackbarMessage: '',
    severity: 'success',
  });

  const setSnackbar = useCallback( (
    open: boolean,
    message: string,
    severity: 'error' | 'info' | 'success' | 'warning' = 'success'
  ) => {
    
    dispatch({
      type: ActionType.SET_SNACKBAR,
      snackbarOpen: open,
      snackbarMessage: message,
      severity
    });
  }, []);

  const { snackbarOpen, snackbarMessage, severity } = snackbarState;

  return { snackbarOpen, snackbarMessage, severity, setSnackbar };
};
