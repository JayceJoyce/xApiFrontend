import { useState } from "react"


export const useModal = () =>{

    const [show, setShow] = useState<boolean>(false)
    
    return{
        show,setShow
    }
}