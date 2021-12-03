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
  const usersToDelete: User[] = [];

  usersId.forEach((userId) => {
    usersToDelete.push(users.find((user) => user.id === userId)!);
  });

  return (
    <ul>
      {usersToDelete.map(({ name, lastName }, key) => (
        <li key={key}>{`${name} ${lastName}`}</li>
      ))}
    </ul>
  );
};

export default UserNameListToDelete;
