import React from 'react';
import {useUsers} from '../services/Users';
import {UserInterface} from '../types/User';

interface UserContextInterface {
    users: UserInterface[]
};

export const UserContext = React.createContext<UserContextInterface | null>({
    users: []
})

const UserContextProvider: React.FC = props => {
  const [users] = useUsers();

    return (
        <UserContext.Provider value ={{users}}>
            {props.children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;