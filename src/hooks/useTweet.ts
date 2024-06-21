import { useState } from 'react'
import { UserDTO } from '../models/UserDTO.model'
import { getUsuario } from '../api/GetTweet.ts'

export const UseTweet  = ()=>{
   const [user, setUser] = useState<UserDTO[]>()
  
   const thisUser = async() =>{
    await getUsuario().then((res)=>{return res.data}).then((data)=>{setUser([data])})
    
    return true;
}

    return {thisUser,user}
}