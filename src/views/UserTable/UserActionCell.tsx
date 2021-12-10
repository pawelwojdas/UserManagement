import React from 'react';
import { Button } from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';

interface UserActionCellProps {
  userId: GridRowId;
  onDelete: (usersId: GridRowId[]) => void;
}

const UserActionCell: React.FC<UserActionCellProps> = ({
  userId,
  onDelete,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        data-testid={`UserDetails${userId}`}
        variant="contained"
        style={{ marginRight: '5px' }}
        onClick={() => navigate(`/users/${userId}`)}
      >
        Details
      </Button>
      <Button
        data-testid={`DeleteUser${userId}`}
        variant="outlined"
        color="error"
        onClick={() => {
          onDelete([userId]);
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default UserActionCell;
