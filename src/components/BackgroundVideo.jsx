import React from 'react';
import './BackgroundVideo.scss'; // Fichier pour le style
import videoSource from 'images/bg-videos.mp4'; // Assurez-vous que ce chemin est correct

export const BackgroundVideo = () => {
  return (
    <div className="background-video-container">
      <video className="background-video" autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo HTML5.
      </video>
    </div>
  );
};
