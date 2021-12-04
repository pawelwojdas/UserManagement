import React from 'react';
import { Tooltip, Toolbar, IconButton, Typography, alpha } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { GridRowId } from '@mui/x-data-grid';

interface UserTableToolbarProps {
  selectedUsers: GridRowId[];
  isDeletedUser: boolean;
  onDelete: (usersId: GridRowId[]) => void;
  undoDeleteOperation: () => void;
}

const UserTableToolbar: React.FC<UserTableToolbarProps> = ({
  selectedUsers,
  isDeletedUser,
  onDelete,
  undoDeleteOperation,
}) => (
  <Toolbar
    sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
      ...(selectedUsers.length && {
        bgcolor: (theme) =>
          alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity
          ),
      }),
    }}
  >
    {selectedUsers.length ? (
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
    {selectedUsers.length ? (
      <Tooltip title="Delete">
        <IconButton
          onClick={() => {
            onDelete(selectedUsers);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    ) : (
      isDeletedUser && (
        <Tooltip title="Restore deleted users">
          <IconButton onClick={undoDeleteOperation}>
            <RestoreFromTrashIcon />
          </IconButton>
        </Tooltip>
      )
    )}
  </Toolbar>
);

export default UserTableToolbar;
