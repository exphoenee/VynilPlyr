import React from "react";

const LibrarySong = ({ song, changeSong }) => {
  const songSelectHandler = async () => {
    changeSong(song);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={`${song.name} - ${song.artist}`}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
