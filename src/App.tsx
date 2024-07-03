import React from 'react';
import { Route, Routes} from 'react-router-dom';
import rutas from './routes/config';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

import Menu from './pages/layout/menu';

 function App() {

  return (
    <div className="col-12 ">
      <div className="row d-flex justify-content-center">
        <div className="col-10 mt-5">
         <Menu />
        </div>
      </div>
      <Routes>        
        { rutas.map( (ruta) =>
            <Route key={ruta.path} path={ruta.path} element={<ruta.component />} />
        ) }
      </Routes> 
      
    </div>
  );
}
 
export default App;