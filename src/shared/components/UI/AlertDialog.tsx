import React from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  title: string;
  confirmButtonText: string;
  onConfirm: () => void;
  onClose: () => void;
}
const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  confirmButtonText,
  onConfirm,
  onClose,
  children,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open onClose={onClose} data-testid="AlertDialog">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button data-testid="AlertDialogConfirmBtn" onClick={handleConfirm}>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
