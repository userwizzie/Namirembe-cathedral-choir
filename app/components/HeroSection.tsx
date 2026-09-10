"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Slide = { url: string; caption: string };

const fallbackSlides: Slide[] = [
  { url: "/backgrounds/Interior.jpeg", caption: "The cathedral in worship" },
  { url: "/backgrounds/organ.jpeg", caption: "The sound behind the service" },
  { url: "/backgrounds/tint.jpeg", caption: "A living heritage" },
  { url: "/backgrounds/Choir%20members.jpg", caption: "Voices together" },
];

export default function HeroSection() {
  const [slides, setSlides] = useState<Slide[]>(fallbackSlides);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    void supabase.from("media_items").select("url,caption,media_type").in("media_type", ["Photos", "image", "Images"]).order("created_at", { ascending: false }).then(({ data }) => {
      if (mounted && data?.length) setSlides(data.map((item) => ({ url: item.url, caption: item.caption })));
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[activeIndex] ?? fallbackSlides[0];
  const showPrevious = () => setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % slides.length);

  return <section className="hero hero-dynamic" style={{ backgroundImage: "linear-gradient(110deg, rgba(11,9,10,.88), rgba(27,67,50,.7)), url('/backgrounds/Interior.jpeg')" }}><div className="hero-copy"><p className="eyebrow light">The sound of faith since 1919</p><h1>Namirembe Cathedral<br /><em>Choir</em></h1><p className="hero-lede">Serving St. Paul&apos;s Cathedral Namirembe through sacred choral music.</p><div className="hero-actions"><Link className="button button-light" href="/join">Join Us <span>↗</span></Link><Link className="text-link light" href="/events">Explore Music &amp; Events <span>→</span></Link></div></div><div className="hero-art hero-carousel" style={{ backgroundImage: `linear-gradient(135deg, rgba(11,9,10,.18), rgba(11,9,10,.64)), url(${activeSlide.url})` }} role="region" aria-label="Namirembe Cathedral Choir image slideshow"><div className="art-caption"><span>{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span><strong>{activeSlide.caption}</strong></div><div className="carousel-controls"><button type="button" onClick={showPrevious} aria-label="Previous image">&#8592;</button><div className="carousel-dots" aria-label="Choose slideshow image">{slides.map((slide, index) => <button type="button" className={index === activeIndex ? "active" : ""} key={`${slide.url}-${index}`} onClick={() => setActiveIndex(index)} aria-label={`Show image ${index + 1}`} aria-current={index === activeIndex ? "true" : undefined} />)}</div><button type="button" onClick={showNext} aria-label="Next image">&#8594;</button></div></div><div className="scroll-hint">Explore our ministry <span>↓</span></div></section>;
}
