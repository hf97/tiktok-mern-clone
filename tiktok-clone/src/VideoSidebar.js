import React, { useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MessageIcon from '@material-ui/icons/Message';
import ShareIcon from '@material-ui/icons/Share';
import './VideoSidebar.css';
import axios from './axios';

function VideoSidebar({ id, likes, shares, messages }) {
  const [liked, setLiked] = useState(false);
  const [showLikes, setShowLikes] = useState(likes);
  
  var newLikes = likes;

  const setNewLikes = (n) => {
    newLikes = n;
    setShowLikes(n)
  }
  
  async function updateLikes(){
    const res = await axios.put(`/update/${id}/${newLikes}`);
    return res;
  }
  
  const setDBNewLikes = (n) => {
    setNewLikes(n);
    updateLikes();
  }
  
  return (
    <div className='videoSidebar'>
      <div className="videoSidebar__button">
        {liked ? (
          <FavoriteIcon 
            fontSize='large'
            onClick={(e) => {
              setLiked(false)
              setDBNewLikes(likes)
            }}
            />
            ) : (
              <FavoriteBorderIcon
              fontSize='large'
              onClick={(e) => {
                setLiked(true)
                setDBNewLikes(likes+1)
            }}
          />
        )}
        <p>{showLikes}</p>
      </div>
      <div className="videoSidebar__button">
        <MessageIcon  fontSize='large' />
        <p>{messages}</p>
      </div>
      <div className="videoSidebar__button">
        <ShareIcon  fontSize='large' />
        <p>{shares}</p>
      </div>
    </div>
  )
}

export default VideoSidebar
