"use client";

import Image from "next/image";
import { useState } from "react";
import { developers } from "../../data/developers";

export default function DeveloperCredits() {
  const [open, setOpen] = useState(false);

  return <>
    <button className="developer-credits-link" type="button" onClick={() => setOpen(true)}>Platform Credits &amp; Technical Team</button>
    {open && <div className="credits-backdrop" role="presentation" onClick={() => setOpen(false)}><section className="credits-modal" role="dialog" aria-modal="true" aria-labelledby="credits-title" onClick={(event) => event.stopPropagation()}><button className="credits-close" type="button" onClick={() => setOpen(false)} aria-label="Close platform credits">×</button><p className="eyebrow">Platform credits</p><h2 id="credits-title">Built with <em>care.</em></h2><div className="developer-grid">{developers.map((developer) => <article className="developer-card" key={developer.name}><Image src={developer.image} alt={developer.name} width={180} height={180} /><div><span>{developer.role}</span><h3>{developer.name}</h3><strong>{developer.qualifications}</strong><p>{developer.caption}</p></div></article>)}</div></section></div>}
  </>;
}
