import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import {useEffect}  from 'react'
import './App.css';
import { UseTweet } from './hooks/useTweet';
import { TwitterTimelineEmbed,TwitterTweetEmbed } from 'react-twitter-embed';
import ModalTweet from './components/Modal';
import Modal from 'react-bootstrap/Modal';

 function App() {
  let {thisUser,user,tweetThisUser,tweet, setTweet,currentTweet,showTweet, setShowTweet} = UseTweet()


  useEffect(() => {
    thisUser()
  }, [])
  
  
 
  return (
    <div className="col-12 ">
      <div className="row d-flex justify-content-center">
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
      <div className="row d-flex justify-content-center">
        <div className="col-10 mt-5">
          <div className="row">
            <div className="col-4">
              <input onChange={(e)=>{setTweet(e.target.value)}} className="form-select-lg mx-2" style={{width: "370px"}} type="text" placeholder="Escribe aquí un tweet..."/>
              <Button variant="secondary" className="my-4" onClick={()=>{tweetThisUser(tweet).then(()=>setShowTweet(true));}}>Enviar</Button>{' '}
            </div>
            <div className="col-8">
                {
                user?.map((e)=>{
                  let {id} = e
                  return(
                    <TwitterTimelineEmbed 
                        sourceType="profile" 
                        userId={id} 
                        options={{height: 400}} 
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    {/*    ts-expect-error-<ModalTweet showTweet={showTweet} setShowTweet={setShowTweet()}currentTweet={currentTweet} /> */}

        <Modal show={showTweet} onHide={() => setShowTweet(false)}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body><TwitterTweetEmbed tweetId={currentTweet} /></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowTweet(false)}>
              Close
            </Button>
          </Modal.Footer>
      </Modal>
      
    </div>
  );
}
 
export default App;