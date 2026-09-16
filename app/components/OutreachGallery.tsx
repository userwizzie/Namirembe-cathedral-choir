import Image from "next/image";

const outreachImages = [
  { src: "/outreach/IMG-20170629-WA0033.jpg", title: "Shared fellowship", text: "Building community through music, friendship, and joyful gathering." },
  { src: "/outreach/IMG-20170629-WA0032.jpg", title: "A welcoming ministry", text: "The choir's outreach grows through hospitality and service." },
  { src: "/outreach/IMG-20170629-WA0031.jpg", title: "Community in practice", text: "Faith and music meeting people where they are." },
  { src: "/outreach/IMG-20170629-WA0030.jpg", title: "Serving together", text: "Moments of connection beyond the cathedral walls." },
  { src: "/outreach/IMG-20170629-WA0029.jpg", title: "Music and mission", text: "A living expression of the choir's wider ministry." },
];

export default function OutreachGallery() {
  return <section className="outreach-section section" aria-labelledby="outreach-title"><div className="section-label"><span>Outreach</span><span>Faith in community</span></div><div className="outreach-heading"><div><p className="eyebrow">Beyond the cathedral</p><h2 id="outreach-title">A ministry<br /><em>that reaches out.</em></h2></div><p className="body-large">The choir's ministry is shaped by fellowship, service, and the people we meet beyond the Sunday service.</p></div><div className="outreach-grid">{outreachImages.map((image, index) => <article className={`outreach-card outreach-card-${index + 1}`} key={image.src}><Image src={image.src} alt={image.title} fill sizes="(max-width: 800px) 100vw, 33vw" /><div><span>{image.title}</span><p>{image.text}</p></div></article>)}</div></section>;
}
