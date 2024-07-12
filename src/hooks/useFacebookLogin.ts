import { useState } from "react";
import { useEffect } from "react";
import { getApi } from "../api/GetFacebook";

export const useFacebook = () =>{
    const [credentials,setCredentials] = useState<object>({"status":"undefined"})
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const [user,setUserInfo] = useState<any>("")
    const [profilePic,setProfilePic] = useState<any>("")


    const checkLoginState = ()=> {
        window.FB.getLoginStatus(async (response) => {
            setCredentials(response);
            let {status,authResponse} = response;
            
            if(status === "connected" ){
                let {userID} = authResponse;
                setIsLogged(true)
                //await setUserInfo(userID);
                console.log(response,'first response',userID);
                await callProfilePic(userID)
                await callUserName(userID)
            }else{
                setIsLogged(false);
            }
            return true;
              console.log(credentials,'credentialsss')
         
        });
    }
    const loginClick = async () =>{
        await window.FB.login(function(response) {
          }, {scope: 'public_profile,email,user_posts,user_photos,user_videos'})
        checkLoginState()
    }
    const logoutClick = async () =>{
        await window.FB.logout()
        checkLoginState()
    }
    const callProfilePic = async (userID:string)=>{
        window.FB.api(
            `/${userID}/picture?redirect=false`,
            "get",
            {},
            function(response:any) {
                let {data} = response
                let {url,height,width} = data
                setProfilePic(response)
            }
          );
    }
    const callUserName = async (userID:string)=>{
          // await getApi( `/${userID}?redirect=false`).then((res)=>console.log(res,'new')) 
        window.FB.api(
            `/${userID}?redirect=false`,
            "get",
            {},
            function(response) {
                setUserInfo(response)
            }
          );
          window.FB.api(
            `/${userID}/accounts?redirect=false`,
            "get",
            {},
            function(response) {
                console.log(response,'accounts')
            }
          );
          window.FB.api(
            `/${userID}/posts?redirect=false`,
            "get",
            {},
            function(response) {
                console.log(response,'posts')
            }
          );
    }
    return{
        isLogged,credentials,checkLoginState,loginClick,logoutClick,user,profilePic
    }
}