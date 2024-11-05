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
import { base_url } from '../../constants';



const Dashboard = () =>{

let {show,setShow} = useModal();
let {checkLoginState,profilePic,user,logoutClick} = useFacebook();
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