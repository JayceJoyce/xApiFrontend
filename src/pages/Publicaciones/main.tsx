import React, { useEffect } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { UseTweet } from '../../hooks/useTweet';
import { Suspense,lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { usePublicaciones } from '../../hooks/usePublicaciones';
import { FacebookEmbed } from 'react-social-media-embed';
const Post = lazy(() => import('../../components/Post/main'));
const PostPreview = lazy(() => import('../../components/PostPreview/main'));
const AccountSelect = lazy(() => import('../../components/AccountSelect/main'));

const Publicaciones = ()=> {
    let {thisUser,tweet, setTweet} = UseTweet()
    let {sendNewPost,postDestination,setPostDestination,showTweet, setShowTweet,currentTweet,lastPostPermaLink} = usePublicaciones()

    useEffect(() => {
        thisUser()
      }, [])

      const stateOnChange : (destination:string) => void= (destination:string) => {
        setPostDestination(destination);
      };

    return(
        <> 
        <h2 className="mt-5">Crea una publicación</h2>
            <div className="row d-flex justify-content-center">
                <div className="col-10 my-5">
                <div className="row">
                    <div className="col-6">
                    <ErrorBoundary fallback={<h6>Ha ocurrido un error.</h6>}>
                        <Suspense fallback={<h6>Cargando...</h6>}>
                            <AccountSelect stateOnchange={stateOnChange} postDestination={postDestination}/>
                        </Suspense>
                    </ErrorBoundary>
                    <ErrorBoundary fallback={<h6>Ha ocurrido un error.</h6>}>
                        <Suspense fallback={<h6>Cargando...</h6>}>
                            <Post onChangeEvent={(content:any) => setTweet(content)} />
                        </Suspense>
                    </ErrorBoundary>
                    <div className="row ">
                        <div className="col-3 d-flex justify-content-center">
                            <Button variant="secondary" className="my-4 postButton smallPost" onClick={()=>{sendNewPost(tweet,postDestination)}}>Publicar</Button>{' '}
                        </div>
                        <div className="col-3 d-flex justify-content-center">
                            <Button variant="secondary" className="my-4 postButton smallPost" onClick={()=>{}}>Calendarizar</Button>{' '}
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <Button variant="secondary" className="my-4 postButton smallPost" onClick={()=>{}}>Guardar como borrador</Button>{' '}
                        </div>
                       
                    </div>
                    
                    </div>
                    <div className="col-6 justify-content-center d-flex">
                    <ErrorBoundary fallback={<h6>Ha ocurrido un error.</h6>}>
                        <Suspense fallback={<h6>Cargando...</h6>}>
                            <PostPreview/>
                        </Suspense>
                    </ErrorBoundary>
                    </div>
                </div>
                </div>
            </div>
            <Modal show={showTweet} onHide={() => setShowTweet(false)}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <Suspense fallback={<h6>Cargando...</h6>}>  
                            {postDestination === "twitter" ?  <TwitterTweetEmbed tweetId={currentTweet} /> : <a href={lastPostPermaLink} target="_blank" rel="noopener noreferrer">Ver publicación</a>}
                        </Suspense> 
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowTweet(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Publicaciones;