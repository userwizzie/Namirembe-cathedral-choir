"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";

export type MusicTrack = { id: string; title: string; composer: string | null; audio_url: string; duration: string | null; is_featured: boolean };
type AudioContextValue = { track: MusicTrack | null; tracks: MusicTrack[]; isPlaying: boolean; currentTime: number; duration: number; volume: number; muted: boolean; selectTrack: (track: MusicTrack, play?: boolean) => void; togglePlay: () => void; seek: (time: number) => void; setVolume: (volume: number) => void; toggleMute: () => void };

const AudioContext = createContext<AudioContextValue | null>(null);

export function useAudioPlayer() {
  const value = useContext(AudioContext);
  if (!value) throw new Error("useAudioPlayer must be used inside AudioProvider");
  return value;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [track, setTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    void supabase.from("music_tracks").select("id,title,composer,audio_url,duration,is_featured").order("is_featured", { ascending: false }).then(({ data }) => {
      const loadedTracks = (data ?? []) as MusicTrack[];
      setTracks(loadedTracks);
      const featured = loadedTracks.find((item) => item.is_featured);
      if (featured) setTrack(featured);
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    audio.src = track.audio_url;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [muted, volume]);

  function selectTrack(nextTrack: MusicTrack, play = true) {
    setTrack(nextTrack);
    if (play) window.setTimeout(() => { void audioRef.current?.play(); setIsPlaying(true); }, 0);
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (audio.paused) { void audio.play(); setIsPlaying(true); } else { audio.pause(); setIsPlaying(false); }
  }

  function seek(time: number) { if (audioRef.current) audioRef.current.currentTime = time; setCurrentTime(time); }
  function setVolume(volumeValue: number) { setVolumeState(volumeValue); }
  function toggleMute() { setMuted((current) => !current); }

  return <AudioContext.Provider value={{ track, tracks, isPlaying, currentTime, duration, volume, muted, selectTrack, togglePlay, seek, setVolume, toggleMute }}><audio ref={audioRef} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} /><AudioPlayer />{children}</AudioContext.Provider>;
}

export default function AudioPlayer() {
  const { track, isPlaying, currentTime, duration, volume, muted, togglePlay, seek, setVolume, toggleMute } = useAudioPlayer();
  const [hidden, setHidden] = useState(false);
  if (!track || hidden) return track ? <button className="audio-player-reopen" onClick={() => setHidden(false)} aria-label="Show audio player">♫</button> : null;
  return <aside className="audio-player" aria-label="Audio player"><div className="audio-player-info"><span>Now listening</span><strong>{track.title} {isPlaying && <span className="audio-equalizer" aria-label="Playing"><i /><i /><i /></span>}</strong><small>{track.composer || "Namirembe Cathedral Choir"}</small></div><button className="audio-player-toggle" onClick={togglePlay} aria-label={isPlaying ? "Pause track" : "Play track"}>{isPlaying ? "||" : "▶"}</button><input className="audio-player-progress" type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration || 0)} onChange={(event) => seek(Number(event.target.value))} aria-label="Playback progress" /><label className="audio-player-volume" aria-label="Volume"><span>{muted ? "×" : "♪"}</span><input type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => { setVolume(Number(event.target.value)); if (muted) toggleMute(); }} /></label><button className="audio-player-mute" onClick={toggleMute} aria-label={muted ? "Unmute track" : "Mute track"}>{muted ? "Unmute" : "Mute"}</button><button className="audio-player-close" onClick={() => setHidden(true)} aria-label="Minimize audio player">×</button></aside>;
}
