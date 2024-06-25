import { useState } from 'react'
import { UserDTO } from '../models/UserDTO.model'
import { getUsuario } from '../api/GetTweet'
import { setNewTweet } from '../api/PostTweet'

export const UseTweet  = () => {
   const [user, setUser] = useState<UserDTO[]>()
  const [tweet, setTweet] = useState<string>('')
  const [currentTweet, setCurrentTweet] = useState<string>('')
  const [showTweet, setShowTweet] = useState<boolean>(false)

   const thisUser = async() => {
        await getUsuario().then((res)=>{return res.data}).then((data)=>{setUser([data])})
        return true;
    }
    const tweetThisUser = async (tweet:string) => {
        await setNewTweet(tweet).then((res)=>  setCurrentTweet(res.data.id))
        return true;
    }

    return {thisUser,user,tweetThisUser,tweet, setTweet,currentTweet,showTweet, setShowTweet}
}