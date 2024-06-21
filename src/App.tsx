import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import {useEffect}  from 'react'
import './App.css';
import { UseTweet } from './hooks/useTweet.ts';

 function App() {
  let {thisUser,user} = UseTweet()


  useEffect(() => {
    thisUser()
  }, [])
  
  
 
  return (
    <div className="col-12 ">
      <div className="row d-flex justify-content-center">
        <div className="col-11 mt-5">
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
      <div className="row d-flex justify-content-center">
        <div className="col-11 mt-5">
          <input className="form-select-lg mx-2" type="text" placeholder="Escribe aquí un tweet..."/>
          <Button variant="secondary">Enviar</Button>{' '}
        </div>
      </div>
    </div>
  );
}
 
export default App;