import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeyboardEventHandler from "react-keyboard-event-handler";

import {
  faPlay,
  faPause,
  faBackward,
  faForward,
  faAngleLeft,
  faAngleRight,
  faRandom,
  faRedo,
  faVolumeDown,
} from "@fortawesome/free-solid-svg-icons";

const PlayController = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  nextSong,
  prevSong,
  random,
  setRandom,
  repeat,
  setRepeat,
}) => {
  //states
  const [activeVolume, setActiveVolume] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  //Event Handlers
  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
    !isPlaying ? audioRef.current.play() : audioRef.current.pause();
  };

  const forward = () => {
    audioRef.current.currentTime++;
    setSongInfo({ ...songInfo, currentTime: songInfo.currentTime++ });
  };

  const rewind = () => {
    audioRef.current.currentTime--;
    setSongInfo({ ...songInfo, currentTime: songInfo.currentTime-- });
  };

  const handleKeyPress = (key) => {
    switch (key) {
      case "enter":
      case "space":
        playSongHandler();
        break;
      case "left":
        rewind();
        break;
      case "right":
        forward();
        break;
      case "up":
        prevSong();
        break;
      case "down":
        nextSong();
        break;
      default:
        break;
    }
  };

  const changeVolume = (e) => {
    let value = e.target.value;
    audioRef.current.volume = value;
    setSongInfo({ ...songInfo, volume: value });
  };

  return (
    <div className="play-control">
      <KeyboardEventHandler
        handleKeys={["space", "enter", "left", "right", "up", "down"]}
        onKeyEvent={(key, e) => handleKeyPress(key)}
      />
      <div className="main-controls">
        <FontAwesomeIcon
          onClick={prevSong}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={rewind}
          className="rewind"
          size="2x"
          icon={faBackward}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPlay : faPause}
        />
        <FontAwesomeIcon
          onClick={forward}
          className="forward"
          size="2x"
          icon={faForward}
        />
        <FontAwesomeIcon
          onClick={nextSong}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <div className="other-controls">
        <FontAwesomeIcon
          style={random ? { opatity: 1 } : { opacity: 0.3 }}
          onClick={() => setRandom(!random)}
          className="random"
          size="1x"
          icon={faRandom}
        />
        <FontAwesomeIcon
          style={repeat ? { opatity: 1 } : { opacity: 0.3 }}
          onClick={() => setRepeat(!repeat)}
          className="repeat"
          size="1x"
          icon={faRedo}
        />
        <FontAwesomeIcon
          style={activeVolume ? { opatity: 1 } : { opacity: 0.3 }}
          onClick={() => setActiveVolume(!activeVolume)}
          icon={faVolumeDown}
        />
      </div>
      {activeVolume && (
        <input
          className="volumeControl"
          onChange={changeVolume}
          value={songInfo.volume}
          max="1"
          min="0"
          step="0.01"
          type="range"
        />
      )}
    </div>
  );
};

export default PlayController;
