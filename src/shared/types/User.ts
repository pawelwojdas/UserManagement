export interface User {
    id: string,
    name : string,
    lastName: string,
    email : string,
    gender : 'male' | 'female' | "",
    address : string,
    age : number,
    hobbies : string[],
    dateOfBirth : string,
    phoneNumber : string,
};

