"use client";

import { useAudioPlayer, MusicTrack } from "../../components/AudioPlayer";

const fallbackTracks: MusicTrack[] = [
  { id: "anthem", title: "Sacred Choral Anthem", composer: "Namirembe Cathedral Choir", audio_url: "", duration: null, is_featured: true },
  { id: "hymn", title: "Cathedral Hymns", composer: "Namirembe Cathedral Choir", audio_url: "", duration: null, is_featured: false },
];

export default function MusicPage() {
  const { tracks, track, isPlaying, selectTrack } = useAudioPlayer();
  const playlist = tracks.length ? tracks : fallbackTracks;

  return <main><section className="intro section music-page"><div className="section-label"><span>04</span><span>Music ministry</span></div><div className="intro-grid"><div><p className="eyebrow">Repertoire &amp; formation</p><h1>Every note<br /><em>has a purpose.</em></h1></div><p className="body-large">Listen to recorded anthems, hymns and service music from the Namirembe Cathedral Choir.</p></div><div className="music-playlist"><div className="music-playlist-heading"><div><p className="eyebrow">Recorded repertoire</p><h2>Listen in your own time.</h2></div><span>{playlist.length} tracks</span></div>{playlist.map((item, index) => <article className={`music-track ${track?.id === item.id ? "selected" : ""}`} key={item.id}><span className="music-track-number">{String(index + 1).padStart(2, "0")}</span><div className="music-track-copy"><strong>{item.title}</strong><span>{item.composer || "Namirembe Cathedral Choir"}</span></div><span className="music-track-duration">{item.duration || "Audio"}</span><button className="button button-small" disabled={!item.audio_url} onClick={() => selectTrack(item)}>{track?.id === item.id && isPlaying ? "Playing" : item.audio_url ? "Listen Now" : "Coming soon"}</button></article>)}</div></section><section className="dark-section section"><p className="eyebrow light">Music education</p><h2 className="light-text">Training for a<br /><em>lifetime of service.</em></h2><div className="intro-grid"><p className="body-copy light-text muted">Weekly sectional rehearsals, sight-singing, vocal technique, theory and organ-led ensemble practice help each chorister grow.</p><p className="body-copy light-text muted">New members receive mentorship from experienced singers and learn the discipline, repertoire and worship practice of the cathedral.</p></div></section></main>;
}
