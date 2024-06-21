/* import addOAuthInterceptor from 'axios-oauth-1.0a';
*/
import axios from 'axios' 

    export  const apiUser = async ()=>{
// --------------------------------------------
     let res = await axios.get('http://localhost:8080')
     let {data} = res
     console.log('primer filtro',data);
    return data;
    }