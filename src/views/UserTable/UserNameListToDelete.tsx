import { GridRowId } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

interface UserNameListToDeleteProps {
  users: { id: string; name: string; lastName: string }[];
  usersId: GridRowId[];
}

const UserNameListToDelete = ({
  users,
  usersId,
}: UserNameListToDeleteProps) => {
  const usersToDelete: { id: GridRowId; name: string; lastName: string }[] = [];

  usersId.forEach((userId) => {
    usersToDelete.push(users.find((user) => user.id === userId)!);
  });

  return (
    <ul>
      {usersToDelete.map(({ name, lastName }, key) => (
        <li key={key}>
          <Typography>{`${name} ${lastName}`}</Typography>
        </li>
      ))}
    </ul>
  );
};

export default UserNameListToDelete;
