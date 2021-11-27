import React from 'react';
import { useUsers } from '../services/Users';
import { User } from '../types/User';
import { GridRowId } from '@mui/x-data-grid';

interface UsersContextState {
  users: User[];
  deleteUsers: (usersId: GridRowId[]) => void;
}

export const UsersContext = React.createContext<UsersContextState>({
  users: [],
  deleteUsers: () => {},
});

const UserContextProvider: React.FC = (props) => {
  const { users, deleteUsers } = useUsers();

  return (
    <UsersContext.Provider value={{ users, deleteUsers }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UserContextProvider;
