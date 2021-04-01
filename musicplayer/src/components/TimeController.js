import React from "react";

const TimeController = ({ songInfo, setSongInfo, audioRef }) => {
  const getTime = (time) => {
    let minutes = Math.floor(time / 60) || 0;
    let seconds = Math.floor(time - minutes * 60) || 0;
    let minText = minutes < 10 ? "0" + minutes : minutes;
    let secText = seconds < 10 ? "0" + seconds : seconds;
    return `${minText}:${secText}`;
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  //Add styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="time-controller">
      <p>{getTime(songInfo.currentTime)}</p>

      <input
        type="range"
        onChange={dragHandler}
        min={0}
        max={songInfo.duration || 0}
        value={songInfo.currentTime || 0}
      />

      <p>{getTime(songInfo.duration || 0)}</p>
    </div>
  );
};

/*
  <div className="track">
      input
    <div className="animated-track" style={trackAnim}></div>
  </div>
*/

export default TimeController;
