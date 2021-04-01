import React from "react";

import table from "../assets/table.png";
import rod from "../assets/rod.png";
import holder from "../assets/holder.png";

const Song = ({ currentSong, isPlaying, songInfo }) => {
  return (
    <div  className="song-container">
      <div className="turntable-container">
        <img className="turntable" src={table} alt="turntable" />
        <img
          className={`rod ${isPlaying ? "" : "notPlaying"}`}
          style={ isPlaying ? { transform: `translateY(-7%) rotateZ(${23+songInfo.animationPercentage/100*20}deg)`} : {}}
          src={rod} alt="rod"  />
        <img className="holder" src={holder} alt="holder" />
        <div
          className={`cover-container ${isPlaying ? "playing" : " "}`}
          style={ isPlaying ? { transform: `rotateZ(${720*songInfo.animationPercentage/100}deg)`} : {}}
        >
          <img
            className="cover"
            src={currentSong.cover}
            alt={`${currentSong.name} - ${currentSong.artist}`}
          >
          </img>
          <div className="song-info">
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
            <div className="center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
