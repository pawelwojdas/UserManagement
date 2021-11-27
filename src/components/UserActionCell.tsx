import React from 'react';
import { User } from '../types/User';
import { Button } from '@mui/material';

interface UserActionCellProps {
  userData: User;
}

const UserActionCell = ({ userData }: UserActionCellProps) => {
  return (
    <div>
      <Button variant="contained" style={{ marginRight: '5px' }}>
        Details
      </Button>

      <Button variant="outlined" color="error">
        Delete
      </Button>
    </div>
  );
};

export default UserActionCell;
