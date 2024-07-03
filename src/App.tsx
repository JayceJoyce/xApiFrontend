import React from 'react';
import { Route, Routes} from 'react-router-dom';

import rutas from './routes/config';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import {useEffect}  from 'react'
import './styles/index.scss';
import { UseTweet } from './hooks/useTweet';

import Menu from './pages/layout/menu';

 function App() {
  let {thisUser,user} = UseTweet()


  useEffect(() => {
    thisUser()
  }, [])
 
  return (
    <div className="col-12 ">
      <div className="row d-flex justify-content-center">
        <div className="col-10 mt-5">
         <Menu />
        </div>
        <div className="col-10 mt-5">
          <Table striped>
            <thead>
              <tr>
                <th>id usuario</th>
                <th>Nombre</th>
                <th>Nombre de usuario</th>
              </tr>
            </thead>
            <tbody>
              <tr>
               { user?.map((e)=>{
                    let {id,name,username} = e
                    return(
                     <>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{username}</td>
                     </>
                    )
                  })
                }
               
              </tr>
            </tbody>
          </Table>
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