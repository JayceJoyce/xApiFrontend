import React, { useEffect } from 'react';
import { TwitterTimelineEmbed,TwitterTweetEmbed } from 'react-twitter-embed';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { UseTweet } from '../../hooks/useTweet';
import { Suspense,lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
const Post = lazy(() => import('../../components/Post/main'));
const PostPreview = lazy(() => import('../../components/PostPreview/main'));
const AccountSelect = lazy(() => import('../../components/AccountSelect/main'));

const Publicaciones = ()=> {
    let {thisUser,user,tweetThisUser,tweet, setTweet,currentTweet,showTweet, setShowTweet} = UseTweet()

    useEffect(() => {
        thisUser()
      }, [])

    return(
        <> 
        <h2 className="mt-5">Crea una publicación</h2>
            <div className="row d-flex justify-content-center">
                <div className="col-10 my-5">
                <div className="row">
                    <div className="col-6">
                    <ErrorBoundary fallback={<h6>Ha ocurrido un error.</h6>}>
                        <Suspense fallback={<h6>Loading...</h6>}>
                            <AccountSelect />
                        </Suspense>
                    </ErrorBoundary>
                    <ErrorBoundary fallback={<h6>Ha ocurrido un error.</h6>}>
                        <Suspense fallback={<h6>Loading...</h6>}>
                            <Post onChangeEvent={(content:any) => setTweet(content)} />
                        </Suspense>
                    </ErrorBoundary>
                    <Button variant="secondary" className="my-4" onClick={()=>{tweetThisUser(tweet).then(()=>setShowTweet(true));}}>Enviar</Button>{' '}
                    </div>
                    <div className="col-6 justify-content-center d-flex">
                    <ErrorBoundary fallback={<h6>Ha ocurrido un error.</h6>}>
                        <Suspense fallback={<h6>Loading...</h6>}>
                            <PostPreview/>
                        </Suspense>
                    </ErrorBoundary>
                    </div>
                </div>
                </div>
            </div>
            {/*    ts-expect-error-<ModalTweet showTweet={showTweet} setShowTweet={setShowTweet()}currentTweet={currentTweet} /> */}

            <Modal show={showTweet} onHide={() => setShowTweet(false)}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <TwitterTweetEmbed tweetId={currentTweet} />
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowTweet(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Publicaciones;