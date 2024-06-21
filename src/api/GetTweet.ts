/* import addOAuthInterceptor from 'axios-oauth-1.0a';
*/
import axios from 'axios' 

    export const getUsuario = async () =>{
        let res = await axios.get('http://localhost:8080');
        let data = res
        return data
    }