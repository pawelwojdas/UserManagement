import {useReducer, useEffect} from "react";
import {Users, UsersAction} from "../types/Users"
import fetchData from "../utils/fetchData";
import dataToUser from "../utils/dataToUser";
import {getHobbyList} from "./Hobbies";

export enum ActionType {
    SET_USERS,
    EDIT_USERS,
    REMOVE_USERS,
    ADD_USERS
};

const usersReducer = (state : Users, action : UsersAction) => {
    switch (action.type) {
        case ActionType.SET_USERS:
            return {users: action.users}
        default:
            return {users: state.users}
    }
};

export const useUsers = () => {
    const [usersState,
        dispatch] = useReducer(usersReducer, {users: []});

    const setUsers = async() => {
        const fetchedUsers = await fetchData(`${process.env.REACT_APP_BASE_URL}users.json`) as Object[];

        const hobbyList = await getHobbyList()!;

        dispatch({
            type: ActionType.SET_USERS,
            users: fetchedUsers.map(user => dataToUser(user, hobbyList!))
            });
    };

    useEffect(() => {
        setUsers();
    }, []);

    const {users} = usersState;

    return [users];
}