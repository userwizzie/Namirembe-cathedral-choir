import Image from "next/image";
import Link from "next/link";

const links = [
  ["About", "/about"], ["History", "/history"], ["Leadership", "/leadership"],
  ["Music", "/music"], ["Events", "/events"], ["Media", "/media"],
  ["News", "/news"], ["Contact", "/contact"],
];

export default function Header() {
  return <header className="site-header">
    <Link className="brand" href="/" aria-label="Namirembe Cathedral Choir home">
      <Image className="cathedral-logo" src="/Namirembe cathedral logo.png" alt="Namirembe Cathedral logo" width={52} height={58} priority />
      <span><strong>NAMIREMBE</strong><small>CATHEDRAL CHOIR</small></span>
    </Link>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>
    <Link className="button button-small" href="/join">Join the Choir <span>↗</span></Link>
  </header>;
}
