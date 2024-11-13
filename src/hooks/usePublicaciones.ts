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
              /*   case "instagram":
                    publicToInstagram(destination,message).then(()=>setShowTweet(true));
                    //ventana("","De momento no se encuentra implementada esta funcionalidad.",'error')
                break; */
            
                default:
                    Object.keys(destination).includes('token')
                    ? publicToFbPage(destination,message)
                    : publicToInstagram(destination,message)
                    .then(()=>setShowTweet(true));
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
                if(response) getRecentlyPublished(id,token)
            }
          )
    }
    const publicToInstagram= async (pageInfo:any,content:string)=>{
        let {id} = pageInfo
           let packageToSend = {"caption":content,"published":true,"image_url":"https://www.te.gob.mx/media/themes/tepjfv3/img/bg-Buscador.jpg"}
           window.FB.api(
               `/${id}/media`,
               "post",
               packageToSend,
               function(response:any) {
                if(Object.keys(response).includes('id')){
                    let containerId = response.id
                    window.FB.api(
                        `/${id}/media_publish`,
                        "post",
                        {"creation_id":containerId},
                        function(response:any) {
                            //asignar el id o la url de lo que se acaba de publicar
                        }
                    )
                }
               }
             )
       }
    const getRecentlyPublished = async (pageId:string,token:string) => {
        window.FB.api(
            `/${pageId}/feed?fields=permalink_url&access_token=${token}`,
            "get",
            {},
            function(response:any) {
                let {data} = response
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