import React from 'react';
import { useUsers } from '../../services/Users';
import { User } from '../types/User';
import { Hobby } from '../types/Hobby';
import { GridRowId } from '@mui/x-data-grid';

interface UsersContextState {
  users: User[];
  hobbies: Hobby[];
  deleteUsers: (usersId: GridRowId[]) => void;
  addUsers: (users: User[]) => void;
  editUser: (user: User) => void;
}

export const UsersContext = React.createContext<UsersContextState>({
  users: [],
  hobbies: [],
  deleteUsers: () => {},
  addUsers: () => {},
  editUser: () => {},
});

const UserContextProvider: React.FC = (props) => {
  const { users, hobbies, deleteUsers, addUsers, editUser } = useUsers();

  return (
    <UsersContext.Provider
      value={{ users, hobbies, deleteUsers, addUsers, editUser }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UserContextProvider;
