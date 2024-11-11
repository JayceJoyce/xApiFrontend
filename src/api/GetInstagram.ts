import axios from "axios";

export const getInstagramUser= async () =>{
    try {
         let res = await axios.get('http://localhost:8080/instagram/user');
        let data = res
        return data
    } catch (error) {
        console.log(error)
    }
   
  
}