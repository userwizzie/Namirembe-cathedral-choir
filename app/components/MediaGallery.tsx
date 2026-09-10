"use client";

import { useState } from "react";
import { gallery } from "./choir/data";

type ManagedMedia = { id: string; media_type: "Photos" | "Videos"; url: string; caption: string; category: string; description: string | null };
type NormalizedMedia = ManagedMedia & { media_type: "Photos" | "Videos" };

function isVideo(item: ManagedMedia) {
  const type = item.media_type.trim().toLowerCase();
  return type === "videos" || type === "video" || /\.(mp4|webm|ogg)(\?|$)/i.test(item.url) || item.url.includes("youtube.com") || item.url.includes("youtu.be");
}

function isYouTube(url: string) { return url.includes("youtube.com") || url.includes("youtu.be"); }

function youtubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const videoId = parsed.hostname.includes("youtu.be") ? parsed.pathname.slice(1) : parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop();
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } catch { return url; }
}

const fallbackPhotos: ManagedMedia[] = [
  { id: "local-interior", media_type: "Photos", url: "/backgrounds/Interior.jpeg", caption: "Inside Namirembe Cathedral", category: "Worship", description: "The sacred interior where the choir serves through music." },
  { id: "local-choir", media_type: "Photos", url: "/backgrounds/Choir%20members.jpg", caption: "Voices together", category: "Choir life", description: "Moments of fellowship, rehearsal, and shared musical ministry." },
  { id: "local-cathedral", media_type: "Photos", url: "/backgrounds/Ariel_View_of_Namirembe_cathedral_in_Uganda.jpg", caption: "Namirembe Cathedral", category: "Heritage", description: "A landmark home for worship and choral tradition." },
];

export default function MediaGallery({ managedMedia = [] }: { managedMedia?: ManagedMedia[] }) {
  const [media, setMedia] = useState("Photos");
  const normalizedMedia: NormalizedMedia[] = managedMedia.map((item) => ({ ...item, media_type: isVideo(item) ? "Videos" : "Photos" }));
  const managedPhotos = normalizedMedia.filter((item) => item.media_type === "Photos");
  const photos = managedPhotos.length ? managedPhotos : fallbackPhotos;
  const videos = normalizedMedia.filter((item) => item.media_type === "Videos");

  return <>
    <div className="tab-list"><button className={media === "Photos" ? "selected" : ""} onClick={() => setMedia("Photos")}>Photo gallery</button><button className={media === "Videos" ? "selected" : ""} onClick={() => setMedia("Videos")}>Video highlights</button></div>
    {media === "Photos" ? <div className="gallery-grid">{photos.length ? photos.map((item, index) => <article className={`gallery-card gallery-${(index % 3) + 1}`} key={item.id} style={{ backgroundImage: `linear-gradient(135deg, rgba(27,67,50,.75), rgba(90,24,154,.78)), url(${item.url})`, backgroundSize: "cover" }}><div><span>{item.category}</span><h3>{item.caption}</h3>{item.description && <p>{item.description}</p>}</div></article>) : gallery.map((item, index) => <article className={`gallery-card gallery-${index + 1}`} key={item[0]}><div><span>{item[1]}</span><h3>{item[0]}</h3></div></article>)}</div> : <div className="video-grid">{videos.length ? videos.map((item) => <div className="video-card" key={item.id}>{isYouTube(item.url) ? <iframe src={youtubeEmbedUrl(item.url)} title={item.caption} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <video controls preload="metadata" src={item.url} aria-label={item.caption} />}</div>) : <><div className="video-card"><iframe src="https://www.youtube.com/embed/YIMuTMsqZXw" title="Namirembe choir worship highlights" allowFullScreen /></div><div className="video-card"><iframe src="https://www.youtube.com/embed/6WiFaufNyLY" title="Namirembe choir highlights" allowFullScreen /></div></>}</div>}
  </>;
}
