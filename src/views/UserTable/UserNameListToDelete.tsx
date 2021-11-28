import React from 'react';
import { User } from '../../shared/types/User';
import { GridRowId } from '@mui/x-data-grid';

interface UserNameListToDeleteProps {
  users: User[];
  usersId: GridRowId[];
}

const UserNameListToDelete = ({
  users,
  usersId,
}: UserNameListToDeleteProps) => {
  const names: string[] = [];

  usersId.forEach((userId) => {
    names.push(users.find((user) => user.id === userId)!.name);
  });

  return (
    <ul>
      {names.map((name, key) => (
        <li key={key}>{name}</li>
      ))}
    </ul>
  );
};

export default UserNameListToDelete;
