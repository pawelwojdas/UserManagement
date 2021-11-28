import { Hobby } from "../types/Hobby";

const dataToUser = (user: any, hobbies: Hobby[]) => {
    return {
        ...user,
        name: `${user.name} ${user.lastName}`,
        hobbies: user.hobbies.map((hobbyId : string) => {
            return {
                id: hobbyId,
                name: hobbies.find(hobby => hobby.id === hobbyId)?.name
            }
        })
    }
};

export default dataToUser;