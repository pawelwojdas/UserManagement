import { useReducer, useEffect, useContext } from 'react';
import { UsersAction } from '../shared/types/Users';
import { User } from '../shared/types/User';
import { Hobby } from '../shared/types/Hobby';
import fetchData from '../shared/utils/fetchData';
import { getHobbyList } from './Hobbies';
import { GridRowId } from '@mui/x-data-grid';
import { SnackbarContext } from '../shared/context/snackbar-context';

export enum ActionType {
  SET_USERS,
  UPDATE_USERS,
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
    case ActionType.UPDATE_USERS:
      return {
        users: action.users,
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

  const { setSnackbar } = useContext(SnackbarContext);

  const setUsers = async () => {
    try {
      if (!localStorage.getItem('usersData')) {
        const fetchedUsers = (await fetchData(
          `${process.env.REACT_APP_BASE_URL}users.json`
        )) as User[];

        const hobbyList = await getHobbyList();

        const users = fetchedUsers.map((user) => {
          return {
            ...user,
            hobbies: user.hobbies.map((hobbyId) => {
              return hobbyList.find(({ id }) => id === hobbyId)!.name;
            }),
          };
        });

        localStorage.setItem(
          'usersData',
          JSON.stringify({
            users,
            hobbies: hobbyList,
          })
        );

        dispatch({
          type: ActionType.SET_USERS,
          users,
          hobbies: hobbyList,
        });
      } else {
        const { users, hobbies } = JSON.parse(
          localStorage.getItem('usersData')!
        ) as UsersReducerState;

        dispatch({
          type: ActionType.SET_USERS,
          users,
          hobbies,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setSnackbar(true, error.message, 'error');
      }
    }
  };

  const deleteUsers = (usersId: GridRowId[]) => {
    const users = usersState.users.filter((user) => !usersId.includes(user.id));

    localStorage.setItem(
      'usersData',
      JSON.stringify({
        users,
        hobbies: usersState.hobbies,
      })
    );

    dispatch({
      type: ActionType.UPDATE_USERS,
      users,
    });
  };

  const addUsers = (restoredUsers: User[]) => {
    const users = usersState.users.concat(restoredUsers);

    localStorage.setItem(
      'usersData',
      JSON.stringify({
        users,
        hobbies: usersState.hobbies,
      })
    );

    dispatch({
      type: ActionType.UPDATE_USERS,
      users,
    });
  };

  const editUser = (editedUser: User) => {
    const users = usersState.users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );

    localStorage.setItem(
      'usersData',
      JSON.stringify({
        users,
        hobbies: usersState.hobbies,
      })
    );

    dispatch({
      type: ActionType.UPDATE_USERS,
      users,
    });
  };

  useEffect(() => {
    setUsers();
  }, []);

  const { users, hobbies } = usersState;

  return { users, hobbies, deleteUsers, addUsers, editUser };
};
