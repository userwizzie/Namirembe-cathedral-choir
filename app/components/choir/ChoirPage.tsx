"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

const leaders = [
  ["Mr. Paul Luggya", "Chief Organist", "PL"],
  ["Mr. Mutesasira Francis", "Director", "MF"],
  ["Mr. John Ssekibaala", "Administrator", "JS"],
  ["Mr. Duncan Katimbo", "Chairman", "DK"],
];
const milestones = [
  ["1919", "A sacred beginning", "The boys and men's choir begins its ministry in the heart of Namirembe Hill."],
  ["1960", "A growing sound", "A new generation of choristers carries the cathedral tradition beyond Sunday worship."],
  ["1998", "Voices in concert", "The choir's concert ministry becomes a treasured part of Kampala's cultural calendar."],
  ["Today", "A living legacy", "Faith, discipline and musical excellence continue to shape every rehearsal and service."],
];
const events = [
  ["Services", "07", "DEC", "Advent Eucharist", "10:00 AM", "Namirembe Cathedral"],
  ["Concerts", "14", "DEC", "Lessons & Carols", "5:00 PM", "Cathedral Nave"],
  ["Rehearsals", "18", "DEC", "Christmas rehearsal", "6:30 PM", "Choir Room"],
  ["Services", "21", "DEC", "Festival Service", "10:00 AM", "Namirembe Cathedral"],
];
const gallery = [
  ["Sunday procession", "Worship"],
  ["A quiet rehearsal", "Behind the music"],
  ["Voices together", "Community"],
];

export default function ChoirPage() {
  const [filter, setFilter] = useState("All");
  const [media, setMedia] = useState("Photos");
  const [milestone, setMilestone] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const shownEvents = filter === "All" ? events : events.filter((item) => item[0] === filter);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }

  return <main>
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Namirembe Cathedral Choir home"><Image className="cathedral-logo" src="/Namirembe cathedral logo.png" alt="Namirembe Cathedral logo" width={52} height={58} priority /><span><strong>NAMIREMBE</strong><small>CATHEDRAL CHOIR</small></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{[["About Us", "about"], ["Music Ministry", "ministry"], ["Events", "events"], ["Media", "media"], ["News", "news"], ["Contact", "contact"]].map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>
      <a className="button button-small" href="#join">Join the Choir <span>↗</span></a>
    </header>

    <section className="hero" id="home"><div className="hero-copy"><p className="eyebrow light">The sound of faith since 1919</p><h1>Serving God<br /><em>through music.</em></h1><p className="hero-lede">The boys and men of Namirembe Cathedral Choir carry a living tradition of sacred music, disciplined musicianship and joyful worship.</p><div className="hero-actions"><a className="button button-light" href="#about">Discover our choir <span>↗</span></a><a className="text-link light" href="#events">Upcoming events <span>→</span></a></div></div><div className="hero-art" role="img" aria-label="Choir members singing in worship"><div className="art-caption"><span>01 / 04</span><strong>One voice.<br />Many hearts.</strong></div><div className="sound-wave">∿ ∿ ∿ ∿</div></div><div className="scroll-hint">Scroll to explore <span>↓</span></div></section>

    <section className="intro section" id="about"><div className="section-label"><span>01</span><span>Our heritage</span></div><div className="intro-grid"><div><p className="eyebrow">A living legacy</p><h2>More than a choir.<br /><em>A ministry.</em></h2></div><div><p className="body-large">For over a century, the Namirembe Cathedral Choir has enriched worship with a sound that is both deeply rooted and always reaching forward.</p><p className="body-copy">From the first note to the final amen, we believe music is a form of service. Our rehearsals build more than harmony; they build character, brotherhood and a shared devotion to God.</p><a className="text-link dark" href="#ministry">Meet our ministry <span>→</span></a></div></div><div className="timeline"><div className="timeline-line" />{milestones.map((item, index) => <button className={`timeline-item ${milestone === index ? "active" : ""}`} key={item[0]} onClick={() => setMilestone(index)}><span className="timeline-dot" /><span className="timeline-year">{item[0]}</span><strong>{item[1]}</strong></button>)}</div><div className="milestone-detail"><span>{milestones[milestone][0]}</span><p>{milestones[milestone][2]}</p></div></section>

    <section className="dark-section section" id="ministry"><div className="section-label light-border"><span>02</span><span>Our ministry</span></div><div className="section-heading-row"><div><p className="eyebrow light">The people behind the music</p><h2 className="light-text">Led with <em>purpose.</em></h2></div><p className="body-copy light-text muted">A community of musicians, mentors and servants committed to excellence in every note.</p></div><div className="leader-grid">{leaders.map((leader, index) => <article className="leader-card" key={leader[0]}><div className={`leader-avatar avatar-${index + 1}`}><span>{leader[2]}</span></div><div className="leader-meta"><span>0{index + 1}</span><h3>{leader[0]}</h3><p>{leader[1]}</p></div></article>)}</div></section>

    <section className="events section" id="events"><div className="section-label"><span>03</span><span>Gather with us</span></div><div className="section-heading-row"><div><p className="eyebrow">The calendar</p><h2>Make a joyful <em>noise.</em></h2></div><div className="filter-list">{["All", "Services", "Concerts", "Rehearsals"].map((name) => <button className={filter === name ? "selected" : ""} key={name} onClick={() => setFilter(name)}>{name}</button>)}</div></div><div className="events-list">{shownEvents.map((item) => <article className="event-row" key={item[3]}><div className="event-date"><strong>{item[1]}</strong><span>{item[2]}</span></div><div className="event-info"><span className="event-type">{item[0]}</span><h3>{item[3]}</h3></div><div className="event-detail"><span>{item[4]}</span><span>{item[5]}</span></div><button className="circle-arrow" aria-label={`View details for ${item[3]}`}>↗</button></article>)}</div><a className="text-link dark" href="#contact">View full calendar <span>→</span></a></section>

    <section className="media-section section" id="media"><div className="section-label"><span>04</span><span>In the frame</span></div><div className="section-heading-row"><div><p className="eyebrow">Listen. Watch. Remember.</p><h2>Moments in <em>harmony.</em></h2></div><div className="tab-list"><button className={media === "Photos" ? "selected" : ""} onClick={() => setMedia("Photos")}>Photo gallery</button><button className={media === "Videos" ? "selected" : ""} onClick={() => setMedia("Videos")}>Video highlights</button></div></div>{media === "Photos" ? <div className="gallery-grid">{gallery.map((item, index) => <article className={`gallery-card gallery-${index + 1}`} key={item[0]}><div><span>{item[1]}</span><h3>{item[0]}</h3></div></article>)}</div> : <div className="video-grid"><div className="video-card"><iframe src="https://www.youtube.com/embed/YIMuTMsqZXw" title="Namirembe Cathedral Choir worship highlights" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div className="video-card"><iframe src="https://www.youtube.com/embed/6WiFaufNyLY" title="Namirembe Cathedral Choir highlights" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></div>}</section>

    <section className="join-section" id="join"><div className="join-art" aria-hidden="true"><span>♪</span><span>♫</span><span>♬</span></div><div className="join-content"><p className="eyebrow light">Your voice belongs here</p><h2 className="light-text">Come sing<br /><em>with us.</em></h2><p className="body-copy light-text muted">Whether you are discovering choral music or have years of experience, there is a place for your voice in this ministry.</p><form onSubmit={submit}>{submitted ? <div className="success-message"><strong>Thank you for reaching out.</strong><span>Our choir office will be in touch soon.</span></div> : <><div className="form-row"><label>Name<input name="name" required placeholder="Your full name" /></label><label>Voice type<select name="voice" defaultValue=""><option value="" disabled>Select a section</option><option>Soprano</option><option>Alto</option><option>Tenor</option><option>Bass</option></select></label></div><div className="form-row"><label>Email<input name="email" type="email" required placeholder="you@example.com" /></label><label>Phone<input name="phone" type="tel" required placeholder="+256" /></label></div><label>Tell us about your musical background<textarea name="background" rows={3} placeholder="A little about your experience..." /></label><button className="button button-light submit-button" type="submit">Send my application <span>↗</span></button></>}</form></div></section>

    <footer className="footer" id="contact"><div className="footer-top"><div className="footer-brand"><Image className="cathedral-logo footer-logo" src="/Namirembe cathedral logo.png" alt="Namirembe Cathedral logo" width={72} height={80} /><h3>Namirembe<br /><em>Cathedral Choir</em></h3></div><p className="footer-quote">“Make a joyful noise unto the Lord,<br />all ye lands.” <span>Psalm 100:1</span></p><div className="footer-links"><a href="tel:+256700000000">+256 700 000 000</a><span>Namirembe Hill, Kampala</span><div className="social-links"><a className="social-logo" href="https://namirembecathedral.org" target="_blank" rel="noreferrer" aria-label="Namirembe Cathedral website"><Image src="/Namirembe cathedral logo.png" alt="Namirembe Cathedral website" width={30} height={34} /></a><a className="social-logo youtube-logo" href="https://www.youtube.com/@NamirembeCathedralChoir" target="_blank" rel="noreferrer" aria-label="Namirembe Cathedral Choir YouTube channel"><Image src="/youtube.svg" alt="YouTube" width={38} height={28} /></a></div></div></div><div className="footer-bottom"><span>© 2026 Namirembe Cathedral Choir</span><a href="#home">Back to top ↑</a></div></footer>
  </main>;
}
