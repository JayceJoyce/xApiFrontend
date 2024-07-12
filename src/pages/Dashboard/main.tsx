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

const Dashboard = () =>{

let {show,setShow} = useModal();
let {checkLoginState,profilePic,user,logoutClick} = useFacebook();

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

    return(
        <div className="p-5">
            <Row>
                <div className="col-12">
                    <Button className="noStyleBtn col-4">
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
                                        <>
                                            <img src={url} alt="Imagen de perfil" className="rounded-circle mx-3 my-3" />
                                            {name}
                                            <button className="ms-5 noStyleBtn" onClick={()=>{logoutClick().then(()=>window.location.reload())}}>
                                                <FontAwesomeIcon className="ms-5" size='xl' icon={faRightFromBracket} />
                                            </button>
                                            
                                        </>
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