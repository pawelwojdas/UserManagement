import fetchData from "../utils/fetchData";
import { HobbyInterface } from "../types/Hobby";

export const getHobbyList = async () => {
    try {
    
        const hobbyList: HobbyInterface[] = await fetchData(`${process.env.REACT_APP_BASE_URL}/hobbies.json`);

        if(hobbyList.length === 0) {
            console.log('Error');
        }

        return hobbyList;
        
    } catch (error) {
        console.log(error);
    }
};