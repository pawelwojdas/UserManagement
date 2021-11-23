import React from 'react';
import { useUsers } from '../services/Users';
import { User } from '../types/User';

interface UsersContextState {
    users: User[];
}

export const UsersContext = React.createContext<UsersContextState>({
    users: [],
});

const UserContextProvider: React.FC = (props) => {
    const [users] = useUsers();

    return (
        <UsersContext.Provider value={{ users }}>
            {props.children}
        </UsersContext.Provider>
    );
};

export default UserContextProvider;
