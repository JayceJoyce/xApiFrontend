import { base_url } from '../../constants';
import { Row,Button } from 'react-bootstrap';
import {faUser } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Menu = ()=>{
    return (
        <div className="col-1">
             <Button className="noStyleBtn">
                <FontAwesomeIcon icon={faUser} style={{color: "#4c2e9e",}} size="xl"/>
            </Button>
        </div>
    )
}

export default Menu