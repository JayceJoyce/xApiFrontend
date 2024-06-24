import { useState } from 'react'
import { UserDTO } from '../models/UserDTO.model'
import { getUsuario } from '../api/GetTweet.ts'
import { setNewTweet } from '../api/PostTweet.ts'

export const UseTweet  = () => {
   const [user, setUser] = useState<UserDTO[]>()
  const [tweet, setTweet] = useState<string>('')

   const thisUser = async() => {
        await getUsuario().then((res)=>{return res.data}).then((data)=>{setUser([data])})
        return true;
    }
    const tweetThisUser = async (tweet:string) => {
        await setNewTweet(tweet).then((res)=>  res.data)
        return true;
    }

    return {thisUser,user,tweetThisUser,tweet, setTweet}
}