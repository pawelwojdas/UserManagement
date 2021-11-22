import { HobbyInterface } from "./Hobby";

export interface UserInterface {
    id: string,
    name : string,
    lastName: string,
    email : string,
    age : number,
    gender : 'male' | 'female',
    phoneNumber : string,
    address : string,
    dateOfBirth : string,
    hobbies : HobbyInterface[],
};

