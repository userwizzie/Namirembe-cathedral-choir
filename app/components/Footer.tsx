import Image from "next/image";
import Link from "next/link";
import DeveloperCredits from "./DeveloperCredits";

export default function Footer() {
  return <footer className="footer">
    <div className="footer-top">
      <div className="footer-brand"><Image className="cathedral-logo footer-logo" src="/Namirembe cathedral logo.png" alt="Namirembe Cathedral logo" width={72} height={80} /><h3>Namirembe<br /><em>Cathedral Choir</em></h3></div>
      <p className="footer-quote">“Make a joyful noise unto the Lord,<br />all ye lands.” <span>Psalm 100:1</span></p>
      <div className="footer-links"><a href="tel:+256700000000">+256 700 000 000</a><a href="https://www.google.com/maps/search/?api=1&query=Namirembe+Cathedral%2C+Namirembe+Hill%2C+Kampala%2C+Uganda" target="_blank" rel="noreferrer">Namirembe Cathedral, Namirembe Hill, Kampala</a><div className="social-links"><a className="social-logo" href="https://namirembecathedral.org" target="_blank" rel="noreferrer" aria-label="Namirembe Cathedral website"><Image src="/Namirembe cathedral logo.png" alt="Cathedral website" width={30} height={34} /></a><a className="social-logo youtube-logo" href="https://www.youtube.com/@NamirembeCathedralChoir" target="_blank" rel="noreferrer" aria-label="YouTube"><Image src="/youtube.svg" alt="YouTube" width={38} height={28} /></a></div></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Namirembe Cathedral Choir</span><span>Serving God through music since 1919</span><DeveloperCredits /><Link href="/">Back to top ↑</Link></div>
  </footer>;
}
