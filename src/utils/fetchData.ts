import axios from "axios";

const fetchData = async(url:string)=> {
    try {
     const response = await axios(url);

     if(response.statusText !== 'OK') {
         throw new Error('Cannot fetch the data')
     };
    return response.data;

    } catch (error) {
            console.log(error);
    }
};

export default fetchData;
