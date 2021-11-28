import { User} from "./User";
import { ActionType } from "../../services/Users";
export interface Users {
    users : User[]
};

export interface UsersAction {
    type : ActionType;
    users: User[];
    user?: User;
};