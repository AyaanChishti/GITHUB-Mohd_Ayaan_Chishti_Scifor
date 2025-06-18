import React, { useState, useRef, useEffect } from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

const playlists = [
  {
    name: "Top Hits",
    tracks: [
      { title: "Song 1", artist: "Artist A", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { title: "Song 2", artist: "Artist B", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { title: "Song 3", artist: "Artist D", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
    ]
  },
  {
    name: "Chill Vibes",
    tracks: [
      { title: "Song 4", artist: "Artist C", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
      { title: "Song 5", artist: "Artist D", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
      { title: "Song 6", artist: "Artist B", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }
    ]
  },
   {
    name: "Pop Vibes",
    tracks: [
      { title: "Song 7", artist: "Artist C", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
      { title: "Song 8", artist: "Artist D", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
      { title: "Song 9", artist: "Artist B", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" }
    ]
  }
];

const MusicPlayer = () => {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [trackDurations, setTrackDurations] = useState({});
  const audioRef = useRef(null);

  const user = auth.currentUser;
  const tracks = playlists[playlistIndex].tracks;

  useEffect(() => {
    preloadDurations();
  }, [playlistIndex]);

  useEffect(() => {
    if (audioRef.current) {
      setLoading(true);
      audioRef.current.pause();
      audioRef.current.src = tracks[trackIndex].url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [trackIndex, playlistIndex]);

  const preloadDurations = () => {
    const temp = {};
    tracks.forEach((track, idx) => {
      const audio = new Audio(track.url);
      audio.addEventListener('loadedmetadata', () => {
        temp[idx] = audio.duration;
        if (Object.keys(temp).length === tracks.length) {
          setTrackDurations(temp);
        }
      });
    });
  };

  const togglePlay = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => setTrackIndex((trackIndex + 1) % tracks.length);
  const prevTrack = () => setTrackIndex((trackIndex - 1 + tracks.length) % tracks.length);

  const updateProgress = () => setCurrentTime(audioRef.current.currentTime);

  const loadMetadata = () => {
    setDuration(audioRef.current.duration);
    setLoading(false);
  };

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-75 saturate-150 animate-pulse"
      >
        <source src="/music-vibe.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Music Player */}
      <div className="bg-gray-900 bg-opacity-80 text-white p-6 rounded-lg w-full max-w-md shadow-lg z-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🎵 Rhythmix 🎧</h2>

          {/* Updated Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-white border border-white rounded hover:bg-white hover:text-gray-900 transition"
          >
            <svg viewBox="0 0 512 512" className="w-4 h-4 fill-current">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
            <span>Logout</span>
          </button>
        </div>

        {user && (
          <div className="text-sm text-gray-300 mb-2">
            Logged in as: <span className="font-semibold">{user.email}</span>
          </div>
        )}

        <select
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          value={playlistIndex}
          onChange={(e) => {
            setPlaylistIndex(Number(e.target.value));
            setTrackIndex(0);
          }}
        >
          {playlists.map((pl, idx) => (
            <option key={idx} value={idx}>{pl.name}</option>
          ))}
        </select>

        <ul className="space-y-2 mb-4 max-h-40 overflow-y-auto pr-2">
          {tracks.map((track, idx) => (
            <li
              key={idx}
              onClick={() => setTrackIndex(idx)}
              className={`cursor-pointer p-2 rounded flex justify-between items-center transition ${
                idx === trackIndex ? 'bg-indigo-600' : 'hover:bg-gray-700'
              }`}
            >
              <span>{track.title} – {track.artist}</span>
              <span className="text-sm text-gray-300">
                {trackDurations[idx] ? formatTime(trackDurations[idx]) : '...'}
              </span>
            </li>
          ))}
        </ul>

        <div className="text-center font-semibold mb-4">
          {tracks[trackIndex].title} — {tracks[trackIndex].artist}
        </div>

        {loading && (
          <div className="text-center text-sm text-gray-400 mb-2 animate-pulse">Loading...</div>
        )}

        <div className="flex flex-wrap justify-center gap-10 grow">
  {/* Previous Button */}
  <div
    onClick={prevTrack}
    className="w-12 h-12 flex items-center justify-center bg-slate-200 rounded-full shadow-lg hover:cursor-pointer hover:shadow-xl hover:bg-slate-300 hover:scale-105"
  >
    <svg
      stroke="currentColor"
      fill="currentColor"
      viewBox="0 0 320 512"
      className="text-slate-500"
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32 64C14.3 64 0 78.3 0 96v320c0 17.7 14.3 32 32 32s32-14.3 32-32V96c0-17.7-14.3-32-32-32zm277.3 128.4L160 96v320l149.3-96.4c21.3-13.7 21.3-46.4 0-60z" />
    </svg>
  </div>

  {/* Play / Pause Button (Blue) */}
  <div
    onClick={togglePlay}
    className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full shadow-lg hover:cursor-pointer hover:drop-shadow-xl hover:bg-blue-600 hover:scale-105"
  >
    {isPlaying ? (
      <svg
        viewBox="0 0 320 512"
        fill="currentColor"
        className="text-white"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M48 64C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48s48-21.5 48-48V112C96 85.5 74.5 64 48 64zm224 0c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48s48-21.5 48-48V112c0-26.5-21.5-48-48-48z" />
      </svg>
    ) : (
      <svg
        viewBox="0 0 384 512"
        fill="currentColor"
        className="text-white"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M73 39c-20.6-12.5-47-13-67.8-1.4C4.6 47.2 0 58.2 0 69.9v372.3c0 11.7 4.6 22.7 12.8 32.3 14.6 15.7 38.1 19.6 56.2 9.6L329.4 297.6c12.6-7.1 20.6-20.2 20.6-34.6s-7.9-27.5-20.6-34.6L73 39z" />
      </svg>
    )}
  </div>

  {/* Next Button */}
  <div
    onClick={nextTrack}
    className="w-12 h-12 flex items-center justify-center bg-slate-200 rounded-full shadow-lg hover:cursor-pointer hover:shadow-xl hover:bg-slate-300 hover:scale-105"
  >
    <svg
      stroke="currentColor"
      fill="currentColor"
      viewBox="0 0 320 512"
      className="text-slate-500"
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M288 64c-17.7 0-32 14.3-32 32v320c0 17.7 14.3 32 32 32s32-14.3 32-32V96c0-17.7-14.3-32-32-32zM42.7 192.4L192 288V96L42.7 192.4c-21.3 13.7-21.3 46.4 0 60z" />
    </svg>
  </div>
</div>


        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSliderChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={updateProgress}
          onLoadedMetadata={loadMetadata}
          onEnded={nextTrack}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
