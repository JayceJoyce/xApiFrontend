import React from 'react';
import { Route, Routes} from 'react-router-dom';
import rutas from './routes/config';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './styles/index.scss';
import Menu from './pages/layout/menu';
import Header from './pages/layout/header';
import { Navigate } from "react-router-dom";

 function App() {

  return (
      <Container fluid className="col-12 mt-1">
        <div className="row">
        <Menu />
        <div className="col-11 bgGray">
            {
              <Routes>        
                { rutas.map( (ruta) =>
                <Route key={ruta.path} path={ruta.path} element={<ruta.component />} />
                ) }
              </Routes> 
            }
          </div>
        </div>
      </Container>
  );
}
 
export default App;