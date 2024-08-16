import React, { useState, useEffect, useRef } from "react";

const Spotify = () => {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("https://playground.4geeks.com/sound/songs")
      .then(response => response.json())
      .then(data => setSongs(data.songs));
  }, []);

  const playSong = (index) => {
    if (songs.length > 0) {
      setCurrentIndex(index);
      const song = songs[index];
      if (audioRef.current) {
        audioRef.current.src = `https://playground.4geeks.com${song.url}`;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(nextIndex);
  };

  const playPrevious = () => {
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(prevIndex);
  };

  return (
    <div className="spotify-container">
      <ul className="song-list">
        {songs.map((song, index) => (
          <li
            key={song.id}
            onClick={() => playSong(index)}
            className={index === currentIndex ? 'active' : ''}
          >
            {index + 1}. {song.name}
          </li>
        ))}
      </ul>

      <audio ref={audioRef} />

<div className="player-controls">
        <button className="control-button prev" onClick={playPrevious}>
          <i className="fas fa-backward"></i>
        </button>
        <button className="control-button play-pause" onClick={togglePlayPause}>
          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        <button className="control-button next" onClick={playNext}>
          <i className="fas fa-forward"></i>
        </button>
      </div>
</div>

  );
};

export default Spotify;