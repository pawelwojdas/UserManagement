import {useReducer, useEffect} from "react";
import {UsersInterface, UsersAction} from "../types/Users"
import fetchData from "../utils/fetchData";
import dataToUser from "../utils/dataToUser";
import {getHobbyList} from "./Hobbies";



const usersReducer = (state : UsersInterface, action : UsersAction) => {
    switch (action.type) {
        case 'SET':
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
            type: 'SET',
            users: fetchedUsers.map(user => dataToUser(user, hobbyList!))
            });
    };

    useEffect(() => {
        setUsers();
    }, []);

    const {users} = usersState;

    return [users];
}