import React, { useEffect, useState } from 'react';
import './App.css';
import Video from './Video';
import axios from './axios';

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchPosts(){
      const res = await axios.get('/posts');
      setVideos(res.data);
      return res;
    }
    fetchPosts();
  }, []);

  return (
    <div className="app">
      <div className="app__videos">
        {videos.map(({ _id, url, channel, description, song, likes, messages, shares }) => (
          <Video 
            key={_id}
            id={_id}
            url={url}
            channel={channel}
            description={description}
            song={song}
            likes={likes}
            messages={messages}
            shares={shares}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

