import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { UseTweet } from '../hooks/useTweet';
import  { TwitterTweetEmbed } from 'react-twitter-embed';

const ModalTweet = (showTweet:boolean, setShowTweet:any,currentTweet:string) => {
  return(
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
  )
}
export default ModalTweet;