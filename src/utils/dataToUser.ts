import { HobbyInterface } from "../types/Hobby";

const dataToUser = (user: any, hobbies: HobbyInterface[]) => {
    return {
        ...user,
        hobbies: user.hobbies.map((hobbyId : string) => {
            return {
                id: hobbyId,
                name: hobbies.find(hobby => hobby.id === hobbyId)?.name
            }
        })
    }
};

export default dataToUser;