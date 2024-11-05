import { base_url } from '../../constants';
import { Row,Button } from 'react-bootstrap';
import {faUser } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const Menu = ()=>{
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home"> 
                        <Button className="noStyleBtn">
                            <FontAwesomeIcon icon={faUser} style={{color: "#4c2e9e",}} size="xl"/>
                        </Button>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href={'/'+base_url+'/dashboard'}>Panel de control</Nav.Link>
                        <Nav.Link href={'/'+base_url+'/x'}>Publicaciones recientes</Nav.Link>
                        <Nav.Link href="#link">Gráficas</Nav.Link>
                        <div className="d-flex justify-content-end">
                            <Button className="postButton mx-5" onClick={()=>window.location.href='/'+base_url+'/post'}>
                            <FontAwesomeIcon icon={faCirclePlus} />
                                Crear un nuevo post
                            </Button>
                        </div>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        <div className="col-1">
            
        </div>
        </>
    )
}

export default Menu