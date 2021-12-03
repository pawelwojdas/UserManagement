import React, { useState } from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  show: boolean;
  title: string;
  confirmButtonText: string;
  onConfirm: () => void;
  onClose: () => void;
}
const AlertDialog: React.FC<AlertDialogProps> = ({
  show,
  title,
  confirmButtonText,
  onConfirm,
  onClose,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(show);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            onConfirm();
            handleClose();
          }}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
