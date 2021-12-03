import { GridRowId } from '@mui/x-data-grid';
import { User } from '../types/User';

const findUsersById = (users: User[], usersId: GridRowId[]) => {
  const foundUsers: User[] = [];

  usersId.forEach((userId) => {
    foundUsers.push(users.find((user) => user.id === userId)!);
  });

  return foundUsers;
};

export default findUsersById;
