import { useState } from "react";
import { useEffect } from "react";
import { getApi } from "../api/GetFacebook";
import { META_LOGIN_SCOPE } from "../constants";
import { accountsDTO } from "../models/facebookDTO.model";
import { InstagramBusinessDTO } from "../models/InstagramDTO.model";
import Instagram from "../pages/Instagram/main";


export const useFacebook = () =>{
    const [credentials,setCredentials] = useState<object>({"status":"undefined"})
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const [user,setUserInfo] = useState<any>("")
    const [profilePic,setProfilePic] = useState<any>("")
    const [accounts, setAccounts] = useState<accountsDTO[]>([])
    const [accountsProfilePic, setaccountsProfilePic] = useState<any>("")
    const [instagramAccounts, setInstagramAccounts] = useState<InstagramBusinessDTO[]>([])


    const checkLoginState = ()=> {
        window.FB.getLoginStatus(async (response) => {
            setCredentials(response);
            let {status,authResponse} = response;
            
            if(status === "connected" ){
                let {userID} = authResponse;
                setIsLogged(true)
                //await setUserInfo(userID);
                await callProfilePic(userID)
                await callUserName(userID)
                await callProfileAccounts();
            }else{
                setIsLogged(false);
            }
            return true;
        });
    }
    const loginClick = async () =>{
        await window.FB.login(function(response) {
          }, {scope: META_LOGIN_SCOPE})
        await checkLoginState()
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

    const callProfileAccounts = async ()=>{
        window.FB.api(
            `/me/accounts`,
            "get",
            {},
            function(response:any) {
                let {data} = response

                Object.keys(data).map(async (eKey:any)=>{
                    let {name,id,access_token} = data[eKey]
                    await assembleAllManagedAccountInfo(name,id,access_token)
                })
            }
          );
    }
    const assembleAllManagedAccountInfo = async (name:string,accountId:string,accessToken:string)=>{
        window.FB.api(
            `/${accountId}/picture?redirect=false`,
            "get",
            {},
            function(response:any) {
                let {data} = response
                let {url} = data;//,height,width 
                let newAccount ={'id':accountId,'token':accessToken,'name':name,'picture':url}
                setAccounts(accounts=>[...accounts,newAccount])
                callInstagramAccounts(accountId);
            }
          );
    }
    const callInstagramAccounts = async (facebookLinkedPageId)=>{
        window.FB.api(
            `/${facebookLinkedPageId}?fields=instagram_business_account`,
            "get",
            {},
            function(response:any){
                if(Object.keys(response).includes('instagram_business_account')){
                    let {instagram_business_account} = response
                    let {id} = instagram_business_account
                    window.FB.api(
                        `/${id}?fields=id,name,username,profile_picture_url`,
                        "get",
                        {},
                        function(response:any){
                            if(Object.keys(response).includes('username')){
                                let {id,name,username,profile_picture_url} = response
                                let newInstagramAccount = {'id':id,'name':name,'username':username,'profile_picture_url':profile_picture_url}
                                 setInstagramAccounts(instagramAccounts=>[...instagramAccounts,newInstagramAccount])
                            }
                        }
                    )
                }
            }
        )
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
        isLogged,credentials,checkLoginState,loginClick,logoutClick,user,profilePic,accounts,instagramAccounts
    }
}