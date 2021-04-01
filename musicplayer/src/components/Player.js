import React from "react";

//My own componenets
import TimeController from "./TimeController";
import PlayController from "./PlayController";

const Player = ({
  songs,
  timeUpdateHandler,
  audioRef,
  currentSong,
  setCurrentSong,
  songInfo,
  setSongInfo,
  isPlaying,
  setIsPlaying,
  nextSong,
  prevSong,
  random,
  setRandom,
  repeat,
  setRepeat,
}) => {
  return (
    <div className="player-container">
      <TimeController
        songs={songs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
      <PlayController
        nextSong={nextSong}
        prevSong={prevSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        onTimeUpdate={timeUpdateHandler}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        random={random}
        setRandom={setRandom}
        repeat={repeat}
        setRepeat={setRepeat}
      />
    </div>
  );
};

export default Player;
