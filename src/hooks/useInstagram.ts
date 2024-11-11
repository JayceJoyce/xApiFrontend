import { useState } from "react";
import { getInstagramUser } from "../api/GetInstagram";
import { UserBasics } from "../models/InstagramDTO.model";

export const useInstagram = () =>{

    const [instaUser, setInstaUser] = useState<UserBasics[]>([])

    const gettingInstagramUser = async () =>{
        await getInstagramUser().then((res)=>{return res.data}).then((data)=>{setInstaUser([data])})
        return true;
    }

return {gettingInstagramUser,instaUser}
   
}