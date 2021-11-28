import React from 'react';
import { useUsers } from '../services/Users';
import { User } from '../types/User';
import { GridRowId } from '@mui/x-data-grid';

interface UsersContextState {
  users: User[];
  deleteUsers: (usersId: GridRowId[]) => void;
  addUsers: (users: User[]) => void;
}

export const UsersContext = React.createContext<UsersContextState>({
  users: [],
  deleteUsers: () => {},
  addUsers: () => {},
});

const UserContextProvider: React.FC = (props) => {
  const { users, deleteUsers, addUsers } = useUsers();

  return (
    <UsersContext.Provider value={{ users, deleteUsers, addUsers }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UserContextProvider;
