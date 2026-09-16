"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  ["Home", "/"], ["About", "/about"], ["History", "/history"], ["Leadership", "/leadership"],
  ["Music", "/music"], ["Events", "/events"], ["Media", "/media"],
  ["News", "/news"], ["Contact", "/contact"],
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <Link className="brand" href="/" aria-label="Namirembe Cathedral Choir home">
      <Image className="cathedral-logo" src="/Namirembe cathedral logo.png" alt="Namirembe Cathedral logo" width={52} height={58} priority />
      <span><strong>NAMIREMBE</strong><small>CATHEDRAL CHOIR</small></span>
    </Link>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <Link className={pathname === href ? "active" : ""} href={href} key={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav>
    <button className="mobile-menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? "×" : "☰"}</button>
    <Link className="button button-small" href="/join">Join the Choir <span>↗</span></Link>
    {menuOpen && <nav className="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation">{links.map(([label, href]) => <Link className={pathname === href ? "active" : ""} href={href} key={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setMenuOpen(false)}>{label}</Link>)}</nav>}
  </header>;
}
