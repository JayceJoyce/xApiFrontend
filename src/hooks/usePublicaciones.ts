import { useState } from "react";
import { ventana,askUserWindow } from "../utilities/Alertas";
import { setNewTweet } from '../api/PostTweet'
import { recentlyPublished } from "../models/facebookDTO.model";

export const usePublicaciones = () =>{

    const [postDestination,setPostDestination] = useState('')
    const [showTweet, setShowTweet] = useState<boolean>(false)
    const [currentTweet, setCurrentTweet] = useState<string>('')
    const [recentlyPublished, setRecentlyPublished] = useState<recentlyPublished[]>([])
    const [lastPostPermaLink,setLastPostPermaLink] = useState("")
    

    const sendNewPost = async (message:string,destination:string) =>{
            console.log(message,destination)
          if(validatePosting(message,destination)){
           let response = await askUserWindow("¿Desea continuar con la publicación del contenido?")
            if (!response) return false;

            switch (destination) {
                case "twitter":
                    tweetThisUser(message).then(()=>setShowTweet(true))
                break;
                case "instagram":
                    ventana("","De momento no se encuentra implementada esta funcionalidad.",'error')
                break;
            
                default:
                    publicToFbPage(destination,message).then(()=>setShowTweet(true));
                    break;
            }
          }else{
            ventana("Lo sentimos,","Para realizar una publicación debe de ingresar un contenido y una cuenta destino.",'info')
          }
    }

    const validatePosting = (message:string,destination:string) =>{
        return destination !== '' && message !== ''
    }
    const tweetThisUser = async (tweet:string) => {
        await setNewTweet(tweet).then((res)=>  setCurrentTweet(res.data.id))
        return true;
    }
    const publicToFbPage= async (pageInfo:any,content:string)=>{
     let {id,token} = pageInfo
        let packageToSend = {"message":content,"published":true}

        window.FB.api(
            `/${id}/feed?access_token=${token}`,
            "post",
            packageToSend,
            function(response:any) {
                console.log(response,'response from published')
                if(response) getRecentlyPublished(id,token)
            }
          )
    }
    const getRecentlyPublished = async (pageId:string,token:string) =>{
        window.FB.api(
            `/${pageId}/feed?fields=permalink_url&access_token=${token}`,
            "get",
            {},
            function(response:any) {
                let {data} = response
                console.log(data,'response from published')
                setRecentlyPublished(data)
                Object.keys(data).map((eKey)=>{
                    let {permalink_url} = data[eKey]
                    if(eKey == '0' )  setLastPostPermaLink(permalink_url)
                })
            }
          );
    }

    return {setPostDestination,postDestination,sendNewPost,setShowTweet,showTweet,tweetThisUser,currentTweet,recentlyPublished,lastPostPermaLink}
}