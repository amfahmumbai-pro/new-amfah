"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export default function AmbientVideo({
  src,
  className = "",
  videoClassName = "absolute inset-0 w-full h-full object-cover",
}) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch((err) => {
          console.warn("Failed to resume playback:", err);
        });
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      if (total) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleProgressClick = (e) => {
    e.stopPropagation(); // prevent play/pause toggle when clicking the progress bar
    if (videoRef.current && videoRef.current.duration) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const clickRatio = Math.min(Math.max(clickX / width, 0), 1);
      videoRef.current.currentTime = clickRatio * videoRef.current.duration;
      setProgress(clickRatio * 100);
    }
  };

  // Sync state if video changes externally or autoplays
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className={`relative group/video overflow-hidden ${className}`} onClick={togglePlay}>
      <video
        ref={videoRef}
        className={videoClassName}
        src={src}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Play/Pause overlay indicator (briefly shown on hover) */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md text-white p-3 rounded-full scale-90 group-hover/video:scale-100 transition-transform duration-300">
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
        {/* Mute/Unmute Toggle Button */}
        <button
          onClick={toggleMute}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          title={isMuted ? "Click to hear audio" : "Mute audio"}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4 text-white/90" />
          ) : (
            <Volume2 className="h-4 w-4 text-brand-blue-light animate-pulse" />
          )}
        </button>
      </div>

      {/* Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/40 cursor-pointer group/progress transition-all duration-300 hover:h-2.5 z-20"
        onClick={handleProgressClick}
      >
        <div 
          className="h-full bg-brand-blue transition-all duration-100 ease-out" 
          style={{ width: `${progress}%` }}
        />
        {/* Playback dot indicator on hover */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border border-brand-blue opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{ left: `calc(${progress}% - 6px)` }}
        />
      </div>
    </div>
  );
}
