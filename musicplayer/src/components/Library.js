import React from "react";

import LibrarySong from "./LibrarySong";

const Library = ({ songs, libraryStatus, changeSong }) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong key={song.id} song={song} changeSong={changeSong} />
        ))}
      </div>
    </div>
  );
};

export default Library;
