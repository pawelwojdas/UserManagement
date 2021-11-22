import { UserInterface } from "./User";

export interface UsersInterface {
    users : UserInterface[]
};

export interface UsersAction {
    type : 'SET' | 'GET' | 'UPDATE' | 'DELETE';
    users: UserInterface[];
    user?: UserInterface;
};