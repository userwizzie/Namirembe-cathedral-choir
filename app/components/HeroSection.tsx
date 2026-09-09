import Link from "next/link";

export default function HeroSection() {
  return <section className="hero"><div className="hero-copy"><p className="eyebrow light">The sound of faith since 1919</p><h1>Serving God<br /><em>through music.</em></h1><p className="hero-lede">The boys and men of Namirembe Cathedral Choir carry a living tradition of sacred music, disciplined musicianship and joyful worship.</p><div className="hero-actions"><Link className="button button-light" href="/about">Discover our choir <span>↗</span></Link><Link className="text-link light" href="/events">Upcoming events <span>→</span></Link></div></div><div className="hero-art" role="img" aria-label="Choir members singing in worship"><div className="art-caption"><span>01 / 04</span><strong>One voice.<br />Many hearts.</strong></div><div className="sound-wave">∿ ∿ ∿ ∿</div></div><div className="scroll-hint">Explore our ministry <span>↓</span></div></section>;
}
