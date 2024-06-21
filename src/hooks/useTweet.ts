import { useState } from 'react'
import { UserDTO } from '../models/UserDTO.model'
import { apiUser } from '../api/GetTweet.ts'

export const UseTweet  = ()=>{
    let set = []
    set['id'] = '1528519399036145668'
    set['name'] = 'ElsaBananasCheese'
    set['username'] = 'BananasElsa'
   // const [user, setUser] = useState<UserDTO[]>()
   const [user, setUser] = useState<boolean>(false)
  
    const thisUser = async ()=>{ 
        // --------------------------------------------
        
       await apiUser().then((res) => {
        setUser(true)
        console.log('segundo filtro',res,user)
           
        }).then(()=>{ console.log('tercer',user)})
    }

    return {thisUser,user,setUser}
}