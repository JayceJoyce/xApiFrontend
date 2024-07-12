import { useEffect } from "react";
import { useFacebook } from "../../hooks/useFacebookLogin";
import { APP_FB_ID,APP_FB_VERSION } from "../../constants";
   
const Facebook = () =>{

  useEffect(() => {
    try {
      window.fbAsyncInit = () => {
          window.FB.init({
            appId      : APP_FB_ID,
            cookie     : true,
            xfbml      : true,
            version    : APP_FB_VERSION
          });
            
          window.FB.AppEvents.logPageView();   
          checkLoginState();
        };
        (function(d, s, id){
          var js:any, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode?.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'))
      checkLoginState();
  } catch (error) {
      console.log(error)
  }
}, [])
    let {isLogged,checkLoginState,loginClick,logoutClick,credentials,user} = useFacebook();
    const shareContent = () =>{
      FB.ui({
        method: 'share',
        href: 'https://www.google.com'
      }, function(response){console.log(response,"responseeee")});
    }
    return(
      
        <div>
          {
            isLogged 
            ?<button onClick={()=>loginClick().then(()=>console.log(credentials))}>Login with Facebook</button>
            :<button onClick={()=>logoutClick()}>Logout of Facebook</button>
          }
          <button onClick={()=>shareContent()}>compartir en fb</button>
        </div>
        
    )
}
export default Facebook;