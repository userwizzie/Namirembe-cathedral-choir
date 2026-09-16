"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = { id: number; url: string; title: string; subtitle: string };

const heroSlides: Slide[] = [
  {
    id: 1,
    url: "/backgrounds/Choir%20members.jpg",
    title: "Vibrant Choral Ministry",
    subtitle: "A dedicated family of voices serving through sacred music since 1919.",
  },
  {
    id: 2,
    url: "/backgrounds/Interior.jpeg",
    title: "Sacred Cathedral Space",
    subtitle: "A sanctuary filled with prayer and the majestic echo of praise.",
  },
  {
    id: 3,
    url: "/backgrounds/organ.jpeg",
    title: "The Great Organ",
    subtitle: "Accompanying our worship and filling the sanctuary with sound.",
  },
];

export default function HeroSection() {
  const [slides] = useState<Slide[]>(heroSlides);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[activeIndex] ?? heroSlides[0];
  const showPrevious = () => setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % slides.length);

  return <section className="hero hero-dynamic" style={{ backgroundImage: "linear-gradient(110deg, rgba(11,9,10,.88), rgba(27,67,50,.7)), url('/backgrounds/Interior.jpeg')" }}><div className="hero-copy"><p className="eyebrow light">The sound of faith since 1919</p><h1>Namirembe Cathedral<br /><em>Choir</em></h1><p className="hero-lede">Serving St. Paul&apos;s Cathedral Namirembe through sacred choral music.</p><div className="hero-actions"><Link className="button button-light" href="/join">Join Us <span>↗</span></Link><Link className="text-link light" href="/events">Explore Music &amp; Events <span>→</span></Link></div></div><div className="hero-art hero-carousel" role="region" aria-label="Namirembe Cathedral Choir image slideshow"><div key={activeSlide.id} className="hero-carousel-bg hero-carousel-bg-transition" style={{ backgroundImage: `linear-gradient(135deg, rgba(11,9,10,.18), rgba(11,9,10,.64)), url(${activeSlide.url})` }} /><div className="art-caption"><span>{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span><strong>{activeSlide.title}</strong>{activeSlide.subtitle && <p className="hero-slide-subtitle">{activeSlide.subtitle}</p>}</div><div className="carousel-controls"><button type="button" onClick={showPrevious} aria-label="Previous image">&#8592;</button><div className="carousel-dots" aria-label="Choose slideshow image">{slides.map((slide, index) => <button type="button" className={index === activeIndex ? "active" : ""} key={`${slide.url}-${index}`} onClick={() => setActiveIndex(index)} aria-label={`Show image ${index + 1}`} aria-current={index === activeIndex ? "true" : undefined}><span /></button>)}</div><button type="button" onClick={showNext} aria-label="Next image">&#8594;</button></div></div><div className="scroll-hint">Explore our ministry <span>↓</span></div></section>;
}
