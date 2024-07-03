import { getUsuario } from "../api/GetUser";
import { useState } from "react";
import { UserDTO } from "../models/UserDTO.model";

export const UseUser  = () => {
    const [user, setUser] = useState<UserDTO[]>()
 
    const thisUser = async() => {
         await getUsuario().then((res)=>{return res.data}).then((data)=>{setUser([data])})
         return true;
     }
 
     return {thisUser,user}
 }