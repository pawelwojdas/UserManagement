import { UserInterface } from "./User";
import { ActionType } from "../services/Users";

export interface UsersInterface {
    users : UserInterface[]
};

export interface UsersAction {
    type : ActionType;
    users: UserInterface[];
    user?: UserInterface;
};