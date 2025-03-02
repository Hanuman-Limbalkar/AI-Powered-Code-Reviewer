import { useState, useEffect } from 'react'
import VideoIntro from "./VideoIntro";
import "prismjs/themes/prism-tomorrow.css"
import MainPage from "./MainPage";
import './App.css'

function App() {

  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div>
      {showVideo ? <VideoIntro /> : <MainPage />}
    </div>
    </>
  )
}

export default App
