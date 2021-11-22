import React from 'react';
import {useUsers} from '../services/Users';
import {UserInterface} from '../types/User';

export const UserContext = React.createContext<UserInterface[] | null>(null)

const UserContextProvider: React.FC = props => {
  const [users] = useUsers();

    return (
        <UserContext.Provider value ={users}>
            {props.children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;