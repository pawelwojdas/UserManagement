import { Hobby } from "./Hobby";

export interface User {
    id: string,
    name : string,
    email : string,
    gender : 'male' | 'female',
    address : string,
    age : number,
    hobbies : Hobby[],
    dateOfBirth : string,
    phoneNumber : string,
};

