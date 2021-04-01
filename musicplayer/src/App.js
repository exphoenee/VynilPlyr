import React, { useRef, useState } from "react";

//import styles
import "./styles/app.scss";

//adding my componenets
import Library from "./components/Library";
import Player from "./components/Player";
import Song from "./components/Song";
import Nav from "./components/Nav";

//import data
import data from "./data.js";

function App() {
  //State
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songs, setSongs] = useState(data);
  const [random, setRandom] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  });

  //Ref
  const audioRef = useRef(null);

  //event handlers
  const timeUpdateHandler = (e) => {
    setSongInfo({
      currentTime: e.target.currentTime,
      duration: e.target.duration,
      animationPercentage: (e.target.currentTime / e.target.duration) * 100,
      volume: e.target.volume,
    });
  };

  //Song handling functionality
  const setActive = (songs, current, setSongs) => {
    const newSongs = songs.map((s) => {
      if (s.id === current.id) {
        return { ...s, active: true };
      } else {
        return { ...s, active: false };
      }
    });
    setSongs(newSongs);
  };

  const skipTrack = (dir) => {
    let current = songs.findIndex((song) => song.id === currentSong.id);
    let last = songs.length - 1;

    if (!repeat) {
      if (!random) {
        current += dir === "+" ? 1 : dir === "-" ? -1 : 0;
      } else {
        let ran;
        do {
          ran = Math.floor(Math.random() * (last + 1));
          console.log(ran);
        } while (ran === current);
        current = ran;
      }
    }

    current =
      current > last ? (current = 0) : current < 0 ? (current = last) : current;
    return current;
  };

  const changeSong = async (toSong) => {
    await setCurrentSong(toSong);
    setActive(songs, toSong, setSongs);
    if (isPlaying) audioRef.current.play();
  };

  const nextSong = async () => {
    changeSong(songs[skipTrack("+")]);
  };

  const prevSong = async () => {
    changeSong(songs[skipTrack("-")]);
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} isPlaying={isPlaying} songInfo={songInfo} />
      <Player
        songs={songs}
        skipTrack={skipTrack}
        nextSong={nextSong}
        prevSong={prevSong}
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        timeUpdateHandler={timeUpdateHandler}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        random={random}
        setRandom={setRandom}
        repeat={repeat}
        setRepeat={setRepeat}
      />
      <Library
        songs={songs}
        libraryStatus={libraryStatus}
        changeSong={changeSong}
      />

      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={nextSong}
      ></audio>
    </div>
  );
}

export default App;
