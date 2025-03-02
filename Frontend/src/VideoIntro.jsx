import { useState, useEffect } from "react";
import "./VideoIntro.css"; // Import CSS for animation

const VideoIntro = () => {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 5000); // Show title after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="video-container">
      <video
        src="/start.mp4" // Ensure this file is in the public folder
        autoPlay
        muted
        playsInline
        className="video-bg"
      />
      {showTitle && <h1 className="animated-title">Welcome to My AI Project</h1>}
    </div>
  );
};

export default VideoIntro;
