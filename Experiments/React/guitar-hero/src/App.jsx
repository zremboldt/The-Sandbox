import React, { useState, useEffect, useRef } from "react";
import songAudio from "./assets/songs/audio/Blood Of Jesus - UPPERROOM.m4a";
import songData from "./assets/songs/json/blood-of-jesus_upperroom.json";

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);

  // Get timing offset from song data (convert to seconds)
  const timingOffset = (songData.startOffset || 0) / 1000;

  // Update current time and line index
  useEffect(() => {
    if (!audioRef.current) return;

    const updateTime = () => {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);

      // Convert current time to milliseconds and subtract offset to align with timestamps
      const currentTimeMs = time * 1000 - (songData.startOffset || 0);

      // Find current line based on timestamp
      const lineIndex = songData.lyrics.findIndex(
        (line) =>
          currentTimeMs >= line.startTimestamp &&
          currentTimeMs < line.endTimestamp
      );
      setCurrentLineIndex(lineIndex);
    };

    const audio = audioRef.current;
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
    };
  }, [timingOffset]);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const rewindFiveSeconds = () => {
    if (!audioRef.current) return;

    const newTime = Math.max(0, audioRef.current.currentTime - 5);
    audioRef.current.currentTime = newTime;
  };

  const forwardFiveSeconds = () => {
    if (!audioRef.current) return;

    const newTime = Math.min(
      audioRef.current.duration || Infinity,
      audioRef.current.currentTime + 5
    );
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Get active chords for current time
  const getActiveChords = (line) => {
    if (!line || !line.chords) return [];

    // Convert current time to milliseconds and subtract offset to align with timestamps
    const currentTimeMs = currentTime * 1000 - (songData.startOffset || 0);

    // For the simplified format, we'll highlight chords when we're in the line's timeframe
    // You could add more sophisticated timing here if needed
    if (
      currentTimeMs >= line.startTimestamp &&
      currentTimeMs < line.endTimestamp
    ) {
      return line.chords; // Return all chords for the active line
    }

    return [];
  };

  // Render line with chords positioned above lyrics
  const renderLineWithChords = (line, isActive) => {
    if (!line.text) return null;

    const activeChords = isActive ? getActiveChords(line) : [];

    return (
      <div
        key={line.startTimestamp}
        className={`song-line ${isActive ? "active" : ""}`}
      >
        <div className="chord-line">
          {line.chords.map((chord, index) => (
            <span
              key={index}
              className={`chord ${
                activeChords.includes(chord) ? "highlighted" : ""
              }`}
              style={{
                left: `${chord.position * 100}%`,
              }}
            >
              {chord.symbol}
            </span>
          ))}
        </div>
        <div className="lyrics-line">{line.text}</div>
      </div>
    );
  };

  // Get lines to display (current and next few)
  const getDisplayLinesWindow = () => {
    const windowSize = 4; // Show current + 3 upcoming lines
    const startIndex = Math.max(0, currentLineIndex);
    return songData.lyrics.slice(startIndex, startIndex + windowSize);
  };

  return (
    <div className="app">
      <audio
        ref={audioRef}
        src={songAudio}
        onEnded={() => setIsPlaying(false)}
      />

      <header className="app-header">
        <h1>{songData.title}</h1>
        <h2>{songData.artist}</h2>
        <div className="controls">
          <button className="rewind-button" onClick={rewindFiveSeconds}>
            ⏪ 5s
          </button>
          <button className="play-button" onClick={togglePlayback}>
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <button className="forward-button" onClick={forwardFiveSeconds}>
            5s ⏩
          </button>
        </div>
        <div className="time-display">{formatTime(currentTime)}</div>
      </header>

      <main className="song-display">
        <div className="lines-container">
          {getDisplayLinesWindow().map((line, index) =>
            renderLineWithChords(line, index === 0 && currentLineIndex >= 0)
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
