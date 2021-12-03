import { Hobby } from '../types/Hobby';

const dataToUser = (user: any, hobbies: Hobby[]) => {
  return {
    ...user,
    hobbies: user.hobbies.map((hobbyId: string) => {
      return hobbies.find((hobby) => hobby.id === hobbyId)?.name;
    }),
  };
};

export default dataToUser;
