"use client";

import { useState } from "react";
import { gallery } from "./choir/data";
import MediaCard from "./MediaCard";

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
  { id: "candlelight-2016-1", media_type: "Photos", url: "/candlelight/IMG-20161003-WA0004.jpg", caption: "Carols by Candlelight", category: "Candlelight", description: "A candlelit celebration of Christmas music and fellowship." },
  { id: "candlelight-2016-2", media_type: "Photos", url: "/candlelight/IMG-20161003-WA0003.jpg", caption: "Christmas voices", category: "Candlelight", description: "The choir sharing the season's sacred repertoire." },
  { id: "candlelight-2017", media_type: "Photos", url: "/candlelight/IMG-20170826-WA0004.jpg", caption: "A treasured tradition", category: "Candlelight", description: "Continuing the choir's tradition of seasonal worship." },
];

const fallbackVideos: ManagedMedia[] = [
  { id: "local-video-1", media_type: "Videos", url: "https://www.youtube.com/embed/YIMuTMsqZXw", caption: "Namirembe choir worship highlights", category: "Worship", description: null },
  { id: "local-video-2", media_type: "Videos", url: "https://www.youtube.com/embed/6WiFaufNyLY", caption: "Namirembe choir highlights", category: "Concert", description: null },
];

export default function MediaGallery({ managedMedia = [] }: { managedMedia?: ManagedMedia[] }) {
  const [media, setMedia] = useState("Photos");
  const [lightboxVideo, setLightboxVideo] = useState<ManagedMedia | null>(null);
  const normalizedMedia: NormalizedMedia[] = managedMedia.map((item) => ({ ...item, media_type: isVideo(item) ? "Videos" : "Photos" }));
  const managedPhotos = normalizedMedia.filter((item) => item.media_type === "Photos");
  const photos = [...managedPhotos, ...fallbackPhotos];
  const videos = [...normalizedMedia.filter((item) => item.media_type === "Videos"), ...fallbackVideos];

  return <>
    <div className="flex justify-center mb-10">
      <div className="inline-flex p-1.5 bg-[#0b090a]/5 border border-[#1b4332]/20 rounded-xl">
        <button
          className={media === "Photos" ? "bg-[#1b4332] text-white shadow-md rounded-lg px-6 py-2.5 font-semibold transition-all" : "text-gray-700 hover:text-[#1b4332] px-6 py-2.5 font-medium transition-all"}
          onClick={() => setMedia("Photos")}
        >
          Photo gallery
        </button>
        <button
          className={media === "Videos" ? "bg-[#1b4332] text-white shadow-md rounded-lg px-6 py-2.5 font-semibold transition-all" : "text-gray-700 hover:text-[#1b4332] px-6 py-2.5 font-medium transition-all"}
          onClick={() => setMedia("Videos")}
        >
          Video highlights
        </button>
      </div>
    </div>
    {media === "Photos" ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {photos.map((item) => (
          <div key={item.id} className="group flex flex-col h-full overflow-hidden rounded-xl bg-[#0b090a] border border-[#1b4332]/20 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-t-xl bg-black">
              <img src={item.url} alt={item.caption} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="flex h-40 flex-col justify-between p-5 bg-[#0b090a] text-white rounded-b-xl border-t border-[#c9aa5c]/20">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#c9aa5c] mb-1 block">{item.category}</span>
                <h3 className="text-base font-bold text-white leading-snug line-clamp-1">{item.caption}</h3>
                {item.description && (
                  <p className="text-xs md:text-sm text-gray-300 mt-1.5 line-clamp-2 leading-relaxed">{item.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {videos.map((item) => (
          <MediaCard key={item.id} item={item} isYouTube={isYouTube(item.url)} onOpen={() => setLightboxVideo(item)} />
        ))}
      </div>
    )}
    {lightboxVideo && <div className="event-lightbox" role="dialog" aria-modal="true" aria-label={lightboxVideo.caption} onClick={() => setLightboxVideo(null)}>
      <div className="video-lightbox-frame" onClick={(event) => event.stopPropagation()}>
        {isYouTube(lightboxVideo.url) ? <iframe src={`${youtubeEmbedUrl(lightboxVideo.url)}?autoplay=1`} title={lightboxVideo.caption} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <video controls autoPlay preload="metadata" src={lightboxVideo.url} aria-label={lightboxVideo.caption} />}
      </div>
      <button className="circle-arrow" onClick={() => setLightboxVideo(null)} aria-label="Close video">×</button>
    </div>}
  </>;
}
