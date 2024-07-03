import axios from 'axios' 

    export const getUsuario = async () =>{
        let res = await axios.get('http://localhost:8080/user');
        let data = res
        return data
    }