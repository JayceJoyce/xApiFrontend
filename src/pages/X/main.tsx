import React, { useEffect } from 'react';
import { TwitterTimelineEmbed,TwitterTweetEmbed } from 'react-twitter-embed';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { UseTweet } from '../../hooks/useTweet';
import { Suspense,lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
const Post = lazy(() => import('../../components/Post/main'));
const TableStriped= lazy(() => import('../../components/TableStriped'));

const X = ()=> {
    let {thisUser,user,tweetThisUser,tweet, setTweet,currentTweet,showTweet, setShowTweet} = UseTweet()

    useEffect(() => {
        thisUser()
      }, [])

    return(
        <> 
            <ErrorBoundary fallback={<h6>Ha ocurrido un error.</h6>}>
                <Suspense fallback={<h6>Loading...</h6>}>
                    <TableStriped userInfo={{userInfo:user}} />
                </Suspense>
            </ErrorBoundary>
            <div className="row d-flex justify-content-center">
                <div className="col-10 mt-5">
                <div className="row">
                    <div className="col-4">
                    <ErrorBoundary fallback={<h6>Ha ocurrido un error.</h6>}>
                        <Suspense fallback={<h6>Loading...</h6>}>
                            
                        </Suspense>
                    </ErrorBoundary>
                   
                    </div>
                    <div className="col-8">
                        {
                            user?.map((e)=>{
                                let {id} = e
                                return(
                                    <ErrorBoundary fallback={<h6>Ha ocurrido un error.</h6>}>
                                        <Suspense fallback={<h6>Loading...</h6>}>
                                            <TwitterTimelineEmbed 
                                                sourceType="profile" 
                                                userId={id} 
                                                options={{height: 400}} 
                                            />
                                        </Suspense>
                                    </ErrorBoundary>
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

export default X;