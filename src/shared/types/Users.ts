import { User} from "./User";
import { ActionType } from "../../services/Users";
import { Hobby } from "./Hobby";

export interface UsersAction {
    type : ActionType;
    users: User[] ;
    hobbies?: Hobby[];
};