import { useState } from 'react'
import { UserDTO } from '../models/UserDTO.model'
import { getUsuario } from '../api/GetTweet'
import { setNewTweet } from '../api/PostTweet'

export const useTweet  = () => {
   const [twitterUser, setTweeterUser] = useState<UserDTO[]>()

   const thisTweeterUser = async() => {
        await getUsuario().then((res)=>{return res.data}).then((data)=>{setTweeterUser([data])})
        return true;
    }
const loginTwitter = () =>{

}
    return {thisTweeterUser,twitterUser,loginTwitter}
}