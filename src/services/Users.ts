import { useReducer, useEffect } from 'react';
import { Users, UsersAction } from '../types/Users';
import { User } from '../types/User';
import fetchData from '../utils/fetchData';
import dataToUser from '../utils/dataToUser';
import { getHobbyList } from './Hobbies';
import { GridRowId } from '@mui/x-data-grid';

export enum ActionType {
  SET_USERS,
  EDIT_USERS,
  REMOVE_USERS,
  ADD_USERS,
}

const usersReducer = (state: Users, action: UsersAction) => {
  switch (action.type) {
    case ActionType.SET_USERS:
      return { users: action.users };
    case ActionType.REMOVE_USERS:
      return { users: action.users };
    case ActionType.ADD_USERS:
      return {users: state.users.concat(action.users)};
    default:
      return { users: state.users };
  }
};

export const useUsers = () => {
  const [usersState, dispatch] = useReducer(usersReducer, { users: [] });

  const setUsers = async () => {
    const fetchedUsers = (await fetchData(
      `${process.env.REACT_APP_BASE_URL}users.json`
    )) as Object[];

    const hobbyList = await getHobbyList()!;

    dispatch({
      type: ActionType.SET_USERS,
      users: fetchedUsers.map((user) => dataToUser(user, hobbyList!)),
    });
  };

  const deleteUsers = (usersId: GridRowId[]) => {
    let users = usersState.users;

    for(let i = 0; i < usersId.length; i++) {
        users = users.filter(user => user.id !== usersId[i]);
    }

    dispatch({
      type: ActionType.REMOVE_USERS,
      users,
    });
  };

  useEffect(() => {
    setUsers();
  }, []);

  const addUsers = (users: User[]) => {
    dispatch({
      type: ActionType.ADD_USERS,
      users
    })
  }

  const { users } = usersState;

  return {users, deleteUsers, addUsers};
};
