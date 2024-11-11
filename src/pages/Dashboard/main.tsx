import { Row,Button } from 'react-bootstrap';
//@ts-expect-error module type png
import  nuevaPublicacion from '../../assets/images/nueva-publicacion.png';
//@ts-expect-error module type png
import  mensajes from '../../assets/images/charla.png';
//@ts-expect-error module type png
import  lineaDeTiempo from '../../assets/images/linea-de-tiempo.png';
//@ts-expect-error module type png
import  calendario from '../../assets/images/calendario.png';
import Card from 'react-bootstrap/Card';
import ModalRedes from '../../components/ModalRedes/main';
import { useModal } from '../../hooks/useModal';
import { useEffect } from 'react';
import { useFacebook } from '../../hooks/useFacebookLogin';
import { APP_FB_ID,APP_FB_VERSION } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useTweet } from '../../hooks/useTwitterLogin';
import { useInstagram } from '../../hooks/useInstagram';
import { base_url } from '../../constants';



const Dashboard = () =>{

let {show,setShow} = useModal();
let {checkLoginState,profilePic,user,logoutClick,isLogged,accounts} = useFacebook();
let {gettingInstagramUser,instaUser} = useInstagram();
let {twitterUser, thisTweeterUser} = useTweet()


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
    thisTweeterUser(); // get current twitter (x) user
    gettingInstagramUser(); //getting current Instagram user
}, [])
const authHandler = (err:any, data:any) => {
    console.log(err, data);
  };
 
    return(
        <div className="p-5"> 
            <Row>
                <div className="col-12">
                    <Button className="noStyleBtn col-4" onClick={()=>window.location.href='/'+base_url+'/post'}>
                        <h6 className="my-4">Crear nueva publicación</h6>
                        <img src={nuevaPublicacion} alt="Crear nueva publicación" />
                    </Button>
                    <Button className="noStyleBtn col-4">
                        <h6 className="my-4">Mensajes</h6>
                        <img src={mensajes} alt="Ver mensajes" />
                    </Button>
                {/*  <Button className="noStyleBtn col-4">
                        <h6 className="mt-4 mb-2">Línea de tiempo</h6>
                        <img src={lineaDeTiempo} alt="Historial de publicaciones" />
                    </Button> */}
                    <Button className="noStyleBtn col-4">
                        <h6 className="my-4">Calendario</h6>
                        <img src={calendario} alt="Calendario de publicaciones" />
                    </Button>
                </div>
            </Row>
            <Row className="my-5">
            <Card className="col-5 mx-4">
                    <Card.Header as="h5">Tus borradores</Card.Header>
                    <Card.Body> 
                    <Card.Title className="h6 d-flex justify-content-end"><a className="basicBlackAndWhiteLink" href="">Administrar borradores</a></Card.Title>
                        <Card.Text>
                           
                        </Card.Text>
                        <Button className="basicBlackAndWhiteBtn">Crear un borrador</Button>
                    </Card.Body>
                </Card>
                <Card className="col-6">
                    <Card.Header as="h5">Cuentas</Card.Header>
                    <Card.Body>
                        <Card.Title className="h6 d-flex justify-content-end"><a className="basicBlackAndWhiteLink" href="">Administrar cuentas</a></Card.Title>
                        <Card.Text className="bold">
                            {
                                Object.keys(profilePic).map((e)=>{
                                    let {url,height,width} = profilePic[e]
                                    let {name,id} = user
                                    return(
                                        <div className="col-12">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook text-primary rm-2" viewBox="0 0 16 16">
                                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                                            </svg>
                                            <img src={url} alt="Imagen de perfil" className="rounded-circle mx-3 my-3" />
                                            {name}
                                            <button className="ms-5 noStyleBtn" onClick={()=>{logoutClick().then(()=>window.location.reload())}}>
                                                <FontAwesomeIcon className="ms-5" size='xl' icon={faRightFromBracket} />
                                            </button>
                                        </div>
                                    )
                                })
                            }
                            {
                                   Object.keys(accounts).map((e)=>{
                                    let {name,token,id,picture} = accounts[e]
                                    return(
                                        <div className="col-12">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook text-primary rm-2" viewBox="0 0 16 16">
                                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                                            </svg>
                                            <img src={picture} alt="Imagen de perfil" className="rounded-circle mx-2 my-3" />
                                            {name}
                                        </div>
                                    )
                                })
                            }
                              {
                               Object.keys(instaUser)?.map((eKey:any)=>{console.log(instaUser,eKey,Object.keys(instaUser))
                                    let {id,username} = instaUser[eKey]
                                    return(
                                        <div className="col-12">
                                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="rm-2 instagramIcon bi bi-instagram" viewBox="0 0 16 16">
                                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                            </svg>
                                            <img src={`https://pbs.twimg.com/profile_images/1528519877459333120/n4wRt_VV_400x400.jpg`} alt="Imagen de perfil" className="rounded-circle mx-3 my-3 rm-2" />
                                            {username}
                                            <button className="ms-5 noStyleBtn" onClick={()=>{logoutClick().then(()=>window.location.reload())}}>
                                                <FontAwesomeIcon className="ms-5" size='xl' icon={faRightFromBracket} />
                                            </button>
                                        </div>
                                    )
                                })
                            }
                            {
                               twitterUser?.map((e)=>{
                                    let {id,name,username} = e
                                    return(
                                        <div className="col-12">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x text-dark rm-2" viewBox="0 0 16 16">
                                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                                            </svg>
                                            <img src={`https://pbs.twimg.com/profile_images/1528519877459333120/n4wRt_VV_400x400.jpg`} alt="Imagen de perfil" className="rounded-circle mx-3 my-3 rm-2" />
                                            {name}
                                            <button className="ms-5 noStyleBtn" onClick={()=>{logoutClick().then(()=>window.location.reload())}}>
                                                <FontAwesomeIcon className="ms-5" size='xl' icon={faRightFromBracket} />
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </Card.Text>
                        <Button className="basicBlackAndWhiteBtn" onClick={()=>setShow(true)}>Agregar una cuenta social</Button>
                    </Card.Body>
                </Card>
            </Row>
            <ModalRedes show={show} setShow ={setShow} />
        </div>
    )
}

export default Dashboard;