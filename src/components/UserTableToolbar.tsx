import React from 'react';

import { Tooltip, Toolbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { GridRowId } from '@mui/x-data-grid';

interface UserTableToolbarProps {
  selectedUsers: GridRowId[];
  onDelete: (usersId: GridRowId[]) => void;
  undoDeleteOperation: () => void;
}

const UserTableToolbar: React.FC<UserTableToolbarProps> = ({
  selectedUsers,
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
      {selectedUsers.length > 0 && (
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
      )}
    </Toolbar>
  );
};

export default UserTableToolbar;
