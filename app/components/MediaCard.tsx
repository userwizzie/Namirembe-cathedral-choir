"use client";

import { useEffect, useRef, useState } from "react";

export type MediaCardItem = { id: string; url: string; caption: string; category: string; description: string | null };

const PREVIEW_SECONDS = 30;

function getYouTubeId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1);
    return parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop() || null;
  } catch { return null; }
}

function PlayIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>;
}

// YouTube cards swap to a muted, controls-free preview on hover and revert after 30s or mouse-leave.
export default function MediaCard({ item, isYouTube, onOpen }: { item: MediaCardItem; isYouTube: boolean; onOpen: () => void }) {
  const [previewing, setPreviewing] = useState(false);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const videoId = isYouTube ? getYouTubeId(item.url) : null;

  function clearTimers() {
    if (timeoutRef.current) { window.clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    if (intervalRef.current) { window.clearInterval(intervalRef.current); intervalRef.current = null; }
  }

  function stopPreview() {
    clearTimers();
    setPreviewing(false);
    setProgress(0);
  }

  function startPreview() {
    if (!videoId) return;
    setPreviewing(true);
    setProgress(0);
    const startedAt = Date.now();
    intervalRef.current = window.setInterval(() => setProgress(Math.min(100, ((Date.now() - startedAt) / (PREVIEW_SECONDS * 1000)) * 100)), 100);
    timeoutRef.current = window.setTimeout(stopPreview, PREVIEW_SECONDS * 1000);
  }

  useEffect(() => () => clearTimers(), []);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-[#0b090a] border border-[#1b4332]/20 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div
        className="relative aspect-video w-full shrink-0 cursor-pointer overflow-hidden rounded-t-xl bg-black"
        onMouseEnter={startPreview}
        onMouseLeave={stopPreview}
        onClick={onOpen}
        role="button"
        tabIndex={0}
        aria-label={`Play ${item.caption}`}
      >
        {previewing && videoId ? (
          <iframe
            className="pointer-events-none h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=0&start=0`}
            title={item.caption}
            allow="autoplay; encrypted-media"
          />
        ) : videoId ? (
          <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={item.caption} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <video muted preload="metadata" src={item.url} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        )}

        {!previewing && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/30 to-black/20 transition-colors duration-300 group-hover:from-black/90 group-hover:via-black/50">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c9aa5c] text-[#0b090a] shadow-lg transition-transform duration-300 group-hover:scale-110">
              <PlayIcon />
            </span>
          </div>
        )}

        {previewing && (
          <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-white/25">
            <div className="h-full bg-[#c9aa5c]" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      <div className="flex h-40 flex-col justify-between p-5 bg-[#0b090a] text-white rounded-b-xl border-t border-[#c9aa5c]/20">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#c9aa5c] mb-1 block">{item.category}</span>
          <h3 className="text-base font-bold text-white leading-snug line-clamp-1">{item.caption}</h3>
          {item.description && (
            <p className="text-xs md:text-sm text-gray-300 mt-1.5 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
