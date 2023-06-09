import axios from 'axios';

//set the backend URL
const API_URL = 'http://localhost:8000';

export const  uploadFile = async (data) => {
    try{
       let response =  await axios
       .post(`${API_URL}/upload`, data);  
       console.log(response.data);
       return response.data;
    }catch(error){
        console.error('Error while calling the api',error.message);
    }
}

// export const  getCsvData = async (data) => {
//     try{
//        let response =  await axios.get(`${API_URL}/upload`, data);  //API/endpoint
//        return response.data;
//     }catch(error){
//         console.error('Error while calling the api',error.message);
//     }
// }