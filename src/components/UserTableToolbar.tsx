import React from 'react';

import { Tooltip, Toolbar, IconButton, Typography, alpha } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { GridRowId } from '@mui/x-data-grid';

interface UserTableToolbarProps {
  selectedUsers: GridRowId[];
  numDeletedUsers: number;
  onDelete: (usersId: GridRowId[]) => void;
  undoDeleteOperation: () => void;
}

const UserTableToolbar: React.FC<UserTableToolbarProps> = ({
  selectedUsers,
  numDeletedUsers,
  onDelete,
  undoDeleteOperation,
}) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedUsers.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selectedUsers.length > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedUsers.length} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          User Management
        </Typography>
      )}
      {selectedUsers.length > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              onDelete(selectedUsers);
              undoDeleteOperation();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        numDeletedUsers > 0 && (
          <Tooltip title="Restore deleted users">
            <IconButton
              onClick={() => {
                undoDeleteOperation();
              }}
            >
              <RestoreFromTrashIcon />
            </IconButton>
          </Tooltip>
        )
      )}
    </Toolbar>
  );
};

export default UserTableToolbar;
