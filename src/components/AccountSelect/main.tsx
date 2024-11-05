import { useEffect } from 'react';
import { useFacebook } from '../../hooks/useFacebookLogin';
import { useTweet } from '../../hooks/useTwitterLogin';
import { APP_FB_ID,APP_FB_VERSION } from '../../constants';
import Select from 'react-select';

const AccountSelect = () =>{

    let {checkLoginState,profilePic,user,logoutClick} = useFacebook();
    let {twitterUser, thisTweeterUser} = useTweet()
    

    useEffect(() => {
        
        try {
            window.fbAsyncInit = () => { // get current facebook user
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
        thisTweeterUser();// get current twitter (x) user
      }, [])
      let options:any[] = [];
      
twitterUser?.map((e:any)=>{ 
    let {id,name,username} = e
    let labelContent = <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x text-dark rm-2" viewBox="0 0 16 16">
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                            </svg>
                            <img src={`https://pbs.twimg.com/profile_images/1528519877459333120/n4wRt_VV_400x400.jpg`} alt="Imagen de perfil" className="rounded-circle mx-3 my-3 rm-2" />
                            {name}
                        </>
    options.push({ value: 'twitter', label: labelContent })
 })
 Object.keys(profilePic).map((e)=>{
    let {url,height,width} = profilePic[e]
    let {name,id} = user
    let labelContent =  <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook text-primary rm-2" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                            </svg>
                            <img src={url} alt="Imagen de perfil" className="rounded-circle mx-3 my-3" />
                            {name}
                        </>
    options.push({ value: 'facebook', label: labelContent })
})
    return(
        <Select options={options} placeholder={'Selecciona una cuenta a la cual publicar el contenido.'} className="mb-5"/>
    )
}
export default AccountSelect;