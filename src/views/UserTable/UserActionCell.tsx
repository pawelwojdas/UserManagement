import React from 'react';
import { User } from '../../shared/types/User';
import { Button } from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';

interface UserActionCellProps {
  userData: User;
  onDelete: (usersId: GridRowId[]) => void;
}

const UserActionCell: React.FC<UserActionCellProps> = ({
  userData,
  onDelete,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="contained"
        style={{ marginRight: '5px' }}
        onClick={() => navigate(`/users/${userData.id}`)}
      >
        Details
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          onDelete([userData.id]);
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default UserActionCell;
