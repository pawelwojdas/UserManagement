import { useReducer, useEffect, useContext, useCallback } from 'react';
import { User } from '../shared/types/User';
import { Hobby } from '../shared/types/Hobby';
import { useHttpClient } from '../shared/hooks/useHttpClient';
import { useHobbies } from './Hobbies';
import { GridRowId } from '@mui/x-data-grid';
import { SnackbarContext } from '../shared/context/SnackbarContext';

export enum ActionType {
  SET_USERS,
  UPDATE_USERS,
}

interface UsersReducerState {
  users: User[];
  hobbies: Hobby[];
}

export interface UsersAction {
  type: ActionType;
  users: User[];
  hobbies?: Hobby[];
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
  const { fetchData } = useHttpClient();
  const { getHobbyList } = useHobbies();

  const setUsers = useCallback(async () => {
    try {
      if (!localStorage.getItem('usersData')) {
        const fetchedUsers = (await fetchData(
          `${process.env.REACT_APP_BASE_URL}users.json`
        )) as User[];

        let hobbyList = await getHobbyList();

        if (
          !hobbyList ||
          !hobbyList.length ||
          !fetchedUsers ||
          !fetchedUsers.length
        ) {
          setSnackbar(true, 'No data available', 'warning');
          return;
        }

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
  }, [fetchData, getHobbyList, setSnackbar]);

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
  }, [setUsers]);

  const { users, hobbies } = usersState;

  return { users, hobbies, deleteUsers, addUsers, editUser };
};
