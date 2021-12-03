import { useReducer, useEffect } from 'react';
import { UsersAction } from '../shared/types/Users';
import { User } from '../shared/types/User';
import { Hobby } from '../shared/types/Hobby';
import fetchData from '../shared/utils/fetchData';
import dataToUser from '../shared/utils/dataToUser';
import { getHobbyList } from './Hobbies';
import { GridRowId } from '@mui/x-data-grid';

export enum ActionType {
  SET_USERS,
  EDIT_USERS,
  DELETE_USERS,
  ADD_USERS,
}

interface UsersReducerState {
  users: User[];
  hobbies: Hobby[];
}

const usersReducer: React.Reducer<UsersReducerState, UsersAction> = (
  state,
  action
) => {
  switch (action.type) {
    case ActionType.SET_USERS:
      return { users: action.users, hobbies: action.hobbies! };
    case ActionType.DELETE_USERS:
      return { users: action.users, hobbies: state.hobbies };
    case ActionType.ADD_USERS:
      return {
        users: state.users.concat(action.users),
        hobbies: state.hobbies,
      };
    case ActionType.EDIT_USERS:
      return {
        users: state.users.map(
          (user) =>
            action.users.find((updatedUser) => updatedUser.id === user.id) ||
            user
        ),
        hobbies: state.hobbies,
      };
    default:
      return { users: state.users, hobbies: state.hobbies };
  }
};

export const useUsers = () => {
  const [usersState, dispatch] = useReducer(usersReducer, {
    users: [],
    hobbies: [],
  });

  const setUsers = async () => {
    const fetchedUsers = (await fetchData(
      `${process.env.REACT_APP_BASE_URL}users.json`
    )) as User[];

    const hobbyList = await getHobbyList();

    dispatch({
      type: ActionType.SET_USERS,
      users: fetchedUsers.map((user) => dataToUser(user, hobbyList!)),
      hobbies: hobbyList,
    });
  };

  const deleteUsers = (usersId: GridRowId[]) => {
    let users = usersState.users;

    for (let i = 0; i < usersId.length; i++) {
      users = users.filter((user) => user.id !== usersId[i]);
    }

    dispatch({
      type: ActionType.DELETE_USERS,
      users,
    });
  };

  const addUsers = (users: User[]) => {
    dispatch({
      type: ActionType.ADD_USERS,
      users,
    });
  };

  const editUser = (user: User) => {
    dispatch({
      type: ActionType.EDIT_USERS,
      users: [user],
    });
  };

  useEffect(() => {
    setUsers();
  }, []);

  const { users, hobbies } = usersState;

  return { users, hobbies, deleteUsers, addUsers, editUser };
};
